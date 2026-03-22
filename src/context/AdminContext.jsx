import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

const defaultProducts = [
  {
    id: 1,
    name: "Custom Printed T-Shirt",
    category: "T-Shirts",
    price: 850,
    delivery: 200,
    description: "High-quality cotton t-shirt with custom screen printing. Available in all sizes. Perfect for corporate events, teams, and promotions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fabric: "100% Cotton",
    images: [],
    featured: true,
  },
  {
    id: 2,
    name: "Branded Hoodie",
    category: "Hoodies",
    price: 1800,
    delivery: 200,
    description: "Premium fleece hoodie with embroidered or printed branding. Perfect for corporate teams and events.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "80% Cotton, 20% Polyester",
    images: [],
    featured: true,
  },
  {
    id: 3,
    name: "Custom Printed Cap",
    category: "Caps",
    price: 650,
    delivery: 150,
    description: "Stylish caps with embroidered logo or printed design. One size fits all with adjustable strap.",
    sizes: ["One Size"],
    fabric: "Polyester / Cotton blend",
    images: [],
    featured: true,
  },
  {
    id: 4,
    name: "3D Signage Board",
    category: "3D Signages",
    price: 12000,
    delivery: 500,
    description: "Eye-catching 3D fabricated signage for shops, offices, and events. Custom size and design.",
    sizes: ["Custom"],
    fabric: "Acrylic / Aluminum",
    images: [],
    featured: true,
  },
  {
    id: 5,
    name: "Corporate Branding Package",
    category: "Corporate Branding",
    price: 25000,
    delivery: 0,
    description: "Complete corporate branding package including logo design, business cards, letterheads, and branded merchandise.",
    sizes: ["Custom"],
    fabric: "Various",
    images: [],
    featured: false,
  },
  {
    id: 6,
    name: "Promotional Merchandise",
    category: "Promotional",
    price: 300,
    delivery: 150,
    description: "Branded pens, mugs, bags, and more. Minimum order of 50 units. Perfect for events and giveaways.",
    sizes: ["Custom"],
    fabric: "Various",
    images: [],
    featured: false,
  },
];

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("manuprints_products");
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("manuprints_settings");
      return saved ? JSON.parse(saved) : {
        heroTitle: "Premium Printing & Branding Solutions",
        heroSubtitle: "We bring your brand to life with world-class printing, branding, and fabrication services across Kenya.",
      };
    } catch {
      return {
        heroTitle: "Premium Printing & Branding Solutions",
        heroSubtitle: "We bring your brand to life with world-class printing, branding, and fabrication services across Kenya.",
      };
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("manuprints_admin") === "true";
  });

  useEffect(() => {
    try {
      localStorage.setItem("manuprints_products", JSON.stringify(products));
    } catch (e) {
      console.warn("Storage full — consider reducing image sizes.");
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("manuprints_settings", JSON.stringify(siteSettings));
    } catch (e) {
      console.warn("Storage error.");
    }
  }, [siteSettings]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const login = (password) => {
    if (password === "manuprints2024") {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("manuprints_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("manuprints_admin");
  };

  return (
    <AdminContext.Provider value={{
      products,
      siteSettings,
      setSiteSettings,
      addProduct,
      updateProduct,
      deleteProduct,
      isAdminLoggedIn,
      login,
      logout,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);