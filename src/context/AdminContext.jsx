import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, orderBy, query
} from "firebase/firestore";
import {
  ref, uploadBytesResumable, getDownloadURL
} from "firebase/storage";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";
import { db, storage, auth } from "../firebase";
import toast from "react-hot-toast";

const AdminContext = createContext();

const defaultSettings = {
  heroTitle: "Premium Printing & Branding Solutions",
  heroSubtitle: "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya.",
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "45.qualitywriters@gmail.com") {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore products in real time
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, Admin!");
      return true;
    } catch (error) {
      toast.error("Invalid email or password.");
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  // Upload a single image file to Firebase Storage and return its download URL
  const uploadImageToFirebase = (file, productName) => {
    return new Promise((resolve, reject) => {
      const timestamp = Date.now();
      const cleanName = productName.replace(/\s+/g, "_");
      const fileName = `products/${cleanName}_${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  };

  // Add product — uploads images first then saves to Firestore
  const addProduct = async (productData, imageFiles) => {
    try {
      const toastId = toast.loading("Uploading images to Firebase...");
      const imageURLs = [];

      for (const file of imageFiles) {
        if (file) {
          try {
            const url = await uploadImageToFirebase(file, productData.name);
            imageURLs.push(url);
            console.log("Image uploaded successfully:", url);
          } catch (err) {
            console.error("Failed to upload one image:", err);
          }
        }
      }

      toast.dismiss(toastId);

      if (imageURLs.length === 0 && imageFiles.filter(Boolean).length > 0) {
        toast.error("Image upload failed. Check Firebase Storage rules.");
        return false;
      }

      toast.loading("Saving product to database...");

      const newProduct = {
        ...productData,
        images: imageURLs,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), newProduct);
      toast.dismiss();
      toast.success("Product added successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error adding product:", error);
      toast.error("Error adding product: " + error.message);
      return false;
    }
  };

  // Update product — uploads new images then saves to Firestore
  const updateProduct = async (id, productData, newImageFiles, existingImages) => {
    try {
      const toastId = toast.loading("Uploading new images...");
      const newURLs = [];

      for (const file of newImageFiles) {
        if (file) {
          try {
            const url = await uploadImageToFirebase(file, productData.name);
            newURLs.push(url);
          } catch (err) {
            console.error("Failed to upload image:", err);
          }
        }
      }

      toast.dismiss(toastId);
      toast.loading("Updating product...");

      const allImages = [...existingImages, ...newURLs];

      const updatedProduct = {
        ...productData,
        images: allImages,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "products", id), updatedProduct);
      toast.dismiss();
      toast.success("Product updated successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error updating product:", error);
      toast.error("Error updating product: " + error.message);
      return false;
    }
  };

  // Delete product from Firestore
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product.");
      return false;
    }
  };

  // Update site settings
  const updateSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider value={{
      products,
      isAdminLoggedIn,
      siteSettings,
      loading,
      authLoading,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      updateSettings,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContext;
