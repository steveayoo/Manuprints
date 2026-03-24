import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, orderBy, query
} from "firebase/firestore";
import {
  ref, uploadBytes, getDownloadURL, deleteObject
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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login with Firebase Auth
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

  // Upload image to Firebase Storage
  const uploadImage = async (file, productName) => {
    try {
      const timestamp = Date.now();
      const fileName = `products/${productName}-${timestamp}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
      return null;
    }
  };

  // Add product to Firestore
  const addProduct = async (productData, imageFiles) => {
    try {
      toast.loading("Uploading images...");
      const imageURLs = [];
      for (const file of imageFiles) {
        if (file) {
          const url = await uploadImage(file, productData.name);
          if (url) imageURLs.push(url);
        }
      }
      toast.dismiss();
      const newProduct = {
        ...productData,
        images: imageURLs,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "products"), newProduct);
      toast.success("Product added successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error adding product:", error);
      toast.error("Error adding product.");
      return false;
    }
  };

  // Update product in Firestore
  const updateProduct = async (id, productData, newImageFiles, existingImages) => {
    try {
      toast.loading("Updating product...");
      const imageURLs = [...existingImages];
      for (const file of newImageFiles) {
        if (file) {
          const url = await uploadImage(file, productData.name);
          if (url) imageURLs.push(url);
        }
      }
      toast.dismiss();
      const updatedProduct = {
        ...productData,
        images: imageURLs,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(doc(db, "products", id), updatedProduct);
      toast.success("Product updated successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
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
      uploadImage,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContext;