import React, { useState, useRef } from "react";
import { useAdmin } from "../context/AdminContext";
import toast from "react-hot-toast";

const categories = ["T-Shirts", "Hoodies", "Caps", "3D Signages", "Corporate Branding", "Promotional"];
const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom"];

const emptyProduct = {
  name: "", category: "T-Shirts", price: "", delivery: "",
  description: "", fabric: "", featured: false,
  sizes: ["M", "L", "XL"],
  images: ["", "", ""],
};

const ManageProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [activeTab, setActiveTab] = useState("list");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const fileRefs = [useRef(), useRef(), useRef()];

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAdd = () => {
    setForm(emptyProduct);
    setEditingProduct(null);
    setActiveTab("form");
  };

  const openEdit = (product) => {
    setForm({
      ...product,
      price: product.price.toString(),
      delivery: product.delivery.toString(),
      images: [...(product.images || []), "", "", ""].slice(0, 3),
    });
    setEditingProduct(product.id);
    setActiveTab("form");
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`Image too large. Please use images under 2MB. Current: ${(file.size / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.)");
      return;
    }

    setUploadingIndex(index);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const imgs = [...form.images];
      imgs[index] = base64;
      setForm(prev => ({ ...prev, images: imgs }));
      setUploadingIndex(null);
      toast.success(`${index === 0 ? "Front" : index === 1 ? "Side" : "Back"} view uploaded!`);
    };
    reader.onerror = () => {
      toast.error("Failed to read image. Try again.");
      setUploadingIndex(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const imgs = [...form.images];
    imgs[index] = "";
    setForm(prev => ({ ...prev, images: imgs }));
    if (fileRefs[index].current) fileRefs[index].current.value = "";
    toast.success("Image removed.");
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.description) {
      toast.error("Please fill in Name, Price and Description.");
      return;
    }
    const cleanImages = form.images.filter(img => img && img.trim() !== "");
    if (cleanImages.length === 0) {
      toast.error("Please upload at least one product photo.");
      return;
    }
    const productData = {
      ...form,
      price: parseFloat(form.price),
      delivery: parseFloat(form.delivery) || 0,
      images: cleanImages,
    };

    try {
      if (editingProduct) {
        updateProduct(editingProduct, productData);
        toast.success("Product updated successfully!");
      } else {
        addProduct(productData);
        toast.success("Product added to store!");
      }
      setActiveTab("list");
      setForm(emptyProduct);
      setEditingProduct(null);
    } catch (e) {
      toast.error("Storage full! Please use smaller images (under 1MB each).");
    }
  };

  const handleCancel = () => {
    setActiveTab("list");
    setForm(emptyProduct);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    toast.success("Product removed from store.");
  };

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const inputStyle = {
    width: "100%", background: "#F5F7FA",
    border: "1px solid #E8EFF5", borderRadius: "8px",
    padding: "11px 14px", color: "#1A2332",
    fontSize: "13px", fontFamily: "'Outfit', sans-serif",
    outline: "none", transition: "border-color 0.3s",
  };

  const labelStyle = {
    color: "#6B7C93", fontSize: "11px", fontWeight: "700",
    letterSpacing: "1px", textTransform: "uppercase",
    display: "block", marginBottom: "6px",
  };

  const viewLabels = ["Front View", "Side View", "Back View"];

  return (
    <div>
      {/* Tab Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "20px",
        flexWrap: "wrap", gap: "10px",
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => { setActiveTab("list"); setEditingProduct(null); }}
            style={{
              background: activeTab === "list" ? "#00C9A7" : "white",
              color: activeTab === "list" ? "white" : "#4A6080",
              border: "1px solid #E8EFF5", borderRadius: "8px",
              padding: "9px 18px", fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "13px", cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            📦 All Products ({products.length})
          </button>
          <button
            onClick={openAdd}
            style={{
              background: activeTab === "form" && !editingProduct ? "#00C9A7" : "white",
              color: activeTab === "form" && !editingProduct ? "white" : "#4A6080",
              border: "1px solid #E8EFF5", borderRadius: "8px",
              padding: "9px 18px", fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "13px", cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            + Add New Product
          </button>
        </div>
        {activeTab === "list" && (
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, width: "220px", padding: "9px 14px" }}
            onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
            onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
          />
        )}
      </div>

      {/* ── PRODUCT LIST ── */}
      {activeTab === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px",
              background: "white", borderRadius: "14px",
              border: "1px solid #EEF2F7",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
              <p style={{ color: "#6B7C93", fontFamily: "'Outfit', sans-serif", marginBottom: "16px" }}>
                No products yet. Add your first product!
              </p>
              <button onClick={openAdd} style={{
                background: "#00C9A7", color: "white",
                border: "none", borderRadius: "8px", padding: "10px 24px",
                fontFamily: "'Outfit', sans-serif", fontWeight: "700",
                fontSize: "13px", cursor: "pointer",
              }}>
                + Add First Product
              </button>
            </div>
          ) : (
            filtered.map((product) => (
              <div key={product.id} style={{
                background: "white", border: "1px solid #EEF2F7",
                borderRadius: "12px", padding: "14px 16px",
                display: "flex", alignItems: "center", gap: "14px",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00C9A7";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,201,167,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#EEF2F7";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Image Previews */}
                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: "52px", height: "52px",
                      borderRadius: "8px", overflow: "hidden",
                      background: "#F5F7FA",
                      border: "1px solid #E8EFF5",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: product.images[i] ? "pointer" : "default",
                      position: "relative",
                    }}
                      onClick={() => product.images[i] && setPreviewImg(product.images[i])}
                    >
                      {product.images[i] ? (
                        <>
                          <img
                            src={product.images[i]}
                            alt={viewLabels[i]}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                          <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            background: "rgba(0,201,167,0.85)",
                            padding: "1px 0", textAlign: "center",
                          }}>
                            <span style={{
                              color: "white", fontSize: "7px",
                              fontFamily: "'Outfit', sans-serif", fontWeight: "700",
                            }}>
                              {i === 0 ? "FRONT" : i === 1 ? "SIDE" : "BACK"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span style={{ fontSize: "18px", opacity: 0.3 }}>📷</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <p style={{
                      color: "#1A2332", fontWeight: "700", fontSize: "14px",
                      fontFamily: "'Outfit', sans-serif",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {product.name}
                    </p>
                    {product.featured && (
                      <span style={{
                        background: "#FFF3E0", color: "#FF9800",
                        borderRadius: "20px", padding: "1px 8px",
                        fontSize: "10px", fontWeight: "700",
                        fontFamily: "'Outfit', sans-serif", flexShrink: 0,
                      }}>
                        ⭐ Featured
                      </span>
                    )}
                    {product.images.filter(i => i).length === 0 && (
                      <span style={{
                        background: "#FFEBEE", color: "#EF4444",
                        borderRadius: "20px", padding: "1px 8px",
                        fontSize: "10px", fontWeight: "700",
                        fontFamily: "'Outfit', sans-serif", flexShrink: 0,
                      }}>
                        ⚠️ No Photos
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{
                      background: "#E3F2FD", color: "#00C9A7",
                      borderRadius: "20px", padding: "2px 10px",
                      fontSize: "10px", fontWeight: "700",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {product.category}
                    </span>
                    <span style={{ color: "#6B7C93", fontSize: "11px", fontFamily: "'Outfit', sans-serif" }}>
                      {product.images.filter(i => i).length}/3 photos
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "22px", color: "#00C9A7", letterSpacing: "1px",
                  }}>
                    KSh {product.price.toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => openEdit(product)} style={{
                    background: "rgba(0,201,167,0.1)",
                    border: "1px solid rgba(0,201,167,0.25)",
                    borderRadius: "8px", padding: "8px 14px",
                    color: "#00C9A7", fontSize: "12px", fontWeight: "700",
                    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,201,167,0.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,201,167,0.1)")}
                  >
                    ✏️ Edit
                  </button>
                  <button onClick={() => setDeleteConfirm(product.id)} style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "8px", padding: "8px 14px",
                    color: "#EF4444", fontSize: "12px", fontWeight: "700",
                    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── ADD / EDIT FORM ── */}
      {activeTab === "form" && (
        <div style={{
          background: "white", border: "1px solid #EEF2F7",
          borderRadius: "16px", padding: "24px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "20px",
          }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "22px",
              letterSpacing: "2px", color: "#1A2332",
            }}>
              {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
            </h3>
            <button onClick={handleCancel} style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px", padding: "7px 14px",
              color: "#EF4444", cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "12px",
            }}>
              ✕ Cancel
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
          }} className="form-cols">

            {/* LEFT — Product Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input
                  type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Custom Printed T-Shirt"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>Price (KSh) *</label>
                  <input
                    type="number" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="850" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Delivery (KSh)</label>
                  <input
                    type="number" value={form.delivery}
                    onChange={(e) => setForm({ ...form, delivery: e.target.value })}
                    placeholder="200" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description *</label>
                <textarea
                  rows={3} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product, printing details, customization options..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>

              <div>
                <label style={labelStyle}>Fabric / Material</label>
                <input
                  type="text" value={form.fabric}
                  onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                  placeholder="e.g. 100% Cotton" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#00C9A7")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>

              <div>
                <label style={labelStyle}>Available Sizes</label>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {allSizes.map(size => (
                    <button
                      key={size} type="button"
                      onClick={() => toggleSize(size)}
                      style={{
                        background: form.sizes.includes(size) ? "#00C9A7" : "#F5F7FA",
                        color: form.sizes.includes(size) ? "white" : "#4A6080",
                        border: `1px solid ${form.sizes.includes(size) ? "#00C9A7" : "#E8EFF5"}`,
                        borderRadius: "8px", padding: "5px 12px",
                        fontSize: "12px", fontWeight: "700",
                        cursor: "pointer", transition: "all 0.2s",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div
                onClick={() => setForm({ ...form, featured: !form.featured })}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px",
                  background: form.featured ? "rgba(255,152,0,0.08)" : "#F5F7FA",
                  border: `1px solid ${form.featured ? "rgba(255,152,0,0.3)" : "#E8EFF5"}`,
                  borderRadius: "10px", cursor: "pointer", transition: "all 0.3s",
                }}
              >
                <input
                  type="checkbox" checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: "16px", height: "16px", accentColor: "#FF9800", cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div>
                  <p style={{ color: "#1A2332", fontSize: "13px", fontWeight: "700", fontFamily: "'Outfit', sans-serif" }}>
                    ⭐ Show on Homepage
                  </p>
                  <p style={{ color: "#6B7C93", fontSize: "11px", fontFamily: "'Outfit', sans-serif" }}>
                    Featured products appear in the homepage grid
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Photo Uploader */}
            <div>
              <label style={{ ...labelStyle, marginBottom: "12px" }}>
                Product Photos — Upload From Your Computer
              </label>

              {/* Instructions */}
              <div style={{
                background: "rgba(0,201,167,0.06)",
                border: "1px solid rgba(0,201,167,0.2)",
                borderRadius: "10px", padding: "12px 14px",
                marginBottom: "16px",
              }}>
                <p style={{ color: "#00C9A7", fontSize: "12px", fontFamily: "'Outfit', sans-serif", fontWeight: "700", marginBottom: "4px" }}>
                  📸 Upload Your Own Photos
                </p>
                <p style={{ color: "#4A6080", fontSize: "11px", fontFamily: "'Outfit', sans-serif", lineHeight: "1.6" }}>
                  Take photos of your printed products and upload them here.
                  Use JPG or PNG files under <strong>2MB</strong> each for best performance.
                  Add Front, Side and Back views for a better customer experience.
                </p>
              </div>

              {/* Upload Slots */}
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{
                      background: form.images[i] ? "#4CAF50" : "#00C9A7",
                      color: "white", borderRadius: "6px",
                      padding: "2px 10px", fontSize: "10px",
                      fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                    }}>
                      {viewLabels[i]}
                    </span>
                    {form.images[i] && (
                      <button
                        onClick={() => removeImage(i)}
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "6px", padding: "2px 10px",
                          color: "#EF4444", fontSize: "10px",
                          fontWeight: "700", cursor: "pointer",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        🗑️ Remove
                      </button>
                    )}
                  </div>

                  {form.images[i] ? (
                    /* Image Preview with Replace option */
                    <div style={{
                      display: "flex", gap: "12px", alignItems: "center",
                      background: "#F5F7FA", borderRadius: "10px",
                      padding: "10px", border: "1px solid #E8EFF5",
                    }}>
                      <img
                        src={form.images[i]}
                        alt={viewLabels[i]}
                        onClick={() => setPreviewImg(form.images[i])}
                        style={{
                          width: "80px", height: "80px",
                          borderRadius: "8px", objectFit: "contain",
                          border: "2px solid #00C9A7",
                          cursor: "pointer",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{
                          color: "#4CAF50", fontSize: "12px",
                          fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                          marginBottom: "6px",
                        }}>
                          ✅ Photo uploaded
                        </p>
                        <button
                          onClick={() => fileRefs[i].current?.click()}
                          style={{
                            background: "white", color: "#00C9A7",
                            border: "1px solid #00C9A7",
                            borderRadius: "6px", padding: "5px 12px",
                            fontSize: "11px", fontWeight: "700",
                            cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          🔄 Replace Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Upload Drop Zone */
                    <div
                      onClick={() => fileRefs[i].current?.click()}
                      style={{
                        border: "2px dashed #C8DDE8",
                        borderRadius: "10px", padding: "24px",
                        textAlign: "center", cursor: "pointer",
                        background: uploadingIndex === i ? "rgba(0,201,167,0.05)" : "#F5F7FA",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#00C9A7";
                        e.currentTarget.style.background = "rgba(0,201,167,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#C8DDE8";
                        e.currentTarget.style.background = "#F5F7FA";
                      }}
                    >
                      {uploadingIndex === i ? (
                        <div>
                          <div style={{
                            width: "24px", height: "24px",
                            border: "3px solid #E8EFF5",
                            borderTop: "3px solid #00C9A7",
                            borderRadius: "50%", margin: "0 auto 8px",
                            animation: "spin 0.8s linear infinite",
                          }} />
                          <p style={{ color: "#00C9A7", fontSize: "12px", fontFamily: "'Outfit', sans-serif", fontWeight: "700" }}>
                            Uploading...
                          </p>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontSize: "28px", marginBottom: "8px" }}>📷</div>
                          <p style={{ color: "#00C9A7", fontSize: "13px", fontWeight: "700", fontFamily: "'Outfit', sans-serif", marginBottom: "4px" }}>
                            Click to upload {viewLabels[i].toLowerCase()} photo
                          </p>
                          <p style={{ color: "#6B7C93", fontSize: "11px", fontFamily: "'Outfit', sans-serif" }}>
                            JPG, PNG — Max 2MB
                          </p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={fileRefs[i]}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleImageUpload(i, file);
                    }}
                  />
                </div>
              ))}

              {/* Progress bar */}
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      flex: 1, height: "4px", borderRadius: "2px",
                      background: form.images[i] ? "#4CAF50" : "#E8EFF5",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
                <p style={{ color: "#6B7C93", fontSize: "10px", fontFamily: "'Outfit', sans-serif" }}>
                  {form.images.filter(i => i).length} of 3 photos added
                  {form.images.filter(i => i).length === 0 && " — At least 1 required"}
                </p>
              </div>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div style={{
            display: "flex", gap: "12px", marginTop: "24px",
            paddingTop: "20px", borderTop: "1px solid #EEF2F7",
          }}>
            <button onClick={handleCancel} style={{
              flex: 1, background: "#F5F7FA",
              border: "1px solid #E8EFF5", borderRadius: "10px",
              padding: "12px", color: "#6B7C93",
              fontFamily: "'Outfit', sans-serif", fontWeight: "700",
              fontSize: "14px", cursor: "pointer",
            }}>
              Cancel
            </button>
            <button onClick={handleSave} style={{
              flex: 3,
              background: "linear-gradient(135deg, #007CF0, #00C9A7)",
              color: "white", border: "none", borderRadius: "10px",
              padding: "12px", fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "14px",
              letterSpacing: "0.5px", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,201,167,0.3)",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,201,167,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,201,167,0.3)";
              }}
            >
              {editingProduct ? "✅ Update Product" : "✅ Add Product to Store"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "white", borderRadius: "16px",
            padding: "32px", maxWidth: "360px", width: "100%",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>⚠️</div>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "24px",
              letterSpacing: "2px", color: "#1A2332", marginBottom: "10px",
            }}>
              Remove Product?
            </h3>
            <p style={{
              color: "#6B7C93", fontSize: "13px", lineHeight: "1.7",
              marginBottom: "20px", fontFamily: "'Outfit', sans-serif",
            }}>
              This product will be permanently removed from your store and will no longer be visible to customers.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, background: "#F5F7FA",
                border: "1px solid #E8EFF5", borderRadius: "8px",
                padding: "11px", color: "#4A6080", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontWeight: "700", fontSize: "13px",
              }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                flex: 1, background: "#EF4444",
                border: "none", borderRadius: "8px",
                padding: "11px", color: "white", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontWeight: "700", fontSize: "13px",
              }}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", padding: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={previewImg} alt="Preview"
              style={{
                maxWidth: "80vw", maxHeight: "80vh",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
            <button style={{
              position: "absolute", top: "-12px", right: "-12px",
              width: "30px", height: "30px",
              background: "white", border: "none",
              borderRadius: "50%", fontSize: "14px",
              cursor: "pointer", fontWeight: "700",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}>
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .form-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ManageProducts;
