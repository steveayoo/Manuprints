import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const AdminContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const defaultSettings = {
  heroTitle: "Premium Printing & Branding Solutions",
  heroSubtitle: "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya.",
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("manuprints_token") || null);

  // Check token on load
  useEffect(() => {
    const savedToken = localStorage.getItem("manuprints_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("manuprints_token", data.token);
        setToken(data.token);
        setIsAdminLoggedIn(true);
        toast.success("Welcome back, Admin!");
        return true;
      } else {
        toast.error(data.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      toast.error("Login failed. Check your connection.");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("manuprints_token");
    setToken(null);
    setIsAdminLoggedIn(false);
    toast.success("Logged out successfully.");
  };

  // Add product with images
  const addProduct = async (productData, imageFiles) => {
    try {
      const toastId = toast.loading("Uploading product and images...");
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("delivery", productData.delivery || 0);
      formData.append("description", productData.description || "");
      formData.append("fabric", productData.fabric || "");
      formData.append("sizes", JSON.stringify(productData.sizes || []));
      formData.append("featured", productData.featured ? "true" : "false");

      imageFiles.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to add product");
        return false;
      }

      await fetchProducts();
      toast.success("Product added successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error adding product:", error);
      toast.error("Error adding product.");
      return false;
    }
  };

  // Update product
  const updateProduct = async (id, productData, newImageFiles, existingImages) => {
    try {
      const toastId = toast.loading("Updating product...");
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("delivery", productData.delivery || 0);
      formData.append("description", productData.description || "");
      formData.append("fabric", productData.fabric || "");
      formData.append("sizes", JSON.stringify(productData.sizes || []));
      formData.append("featured", productData.featured ? "true" : "false");
      formData.append("existingImages", JSON.stringify(existingImages || []));

      newImageFiles.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to update product");
        return false;
      }

      await fetchProducts();
      toast.success("Product updated successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
      return false;
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to delete product");
        return false;
      }

      await fetchProducts();
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
      token,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      updateSettings,
      fetchProducts,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContext;