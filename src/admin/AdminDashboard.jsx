import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import toast from "react-hot-toast";
import ManageProducts from "./ManageProducts";

const AdminDashboard = () => {
  const { isAdminLoggedIn, logout, products, siteSettings, setSiteSettings } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isAdminLoggedIn) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: "#C9A84C" },
    { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: "🏷️", color: "#25D366" },
    { label: "Featured Items", value: products.filter((p) => p.featured).length, icon: "⭐", color: "#FFD700" },
    { label: "Avg. Price (KSh)", value: Math.round(products.reduce((a, b) => a + b.price, 0) / products.length).toLocaleString(), icon: "💰", color: "#FF6B6B" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "settings", label: "Site Settings", icon: "⚙️" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#2D1B69",
      fontFamily: "'Outfit', sans-serif", display: "flex",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "260px", minHeight: "100vh",
        background: "rgba(255,255,255,0.97)",
        borderRight: "1px solid rgba(0,201,167,0.12)",
        padding: "32px 20px",
        display: "flex", flexDirection: "column",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: "40px", paddingLeft: "8px" }}>
          <div style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "22px",
            letterSpacing: "3px", color: "#F0F6FF",
          }}>
            MANU<span style={{ color: "#C9A84C" }}>PRINTS</span>
          </div>
          <p style={{ color: "#7A8BA8", fontSize: "11px", letterSpacing: "1px", marginTop: "2px" }}>
            Admin Dashboard
          </p>
        </div>

        {/* Nav Tabs */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id
                  ? "rgba(0,201,167,0.12)" : "transparent",
                border: `1px solid ${activeTab === tab.id ? "rgba(0,201,167,0.35)" : "transparent"}`,
                borderRadius: "10px", padding: "12px 16px",
                color: activeTab === tab.id ? "#C9A84C" : "#7A8BA8",
                fontFamily: "'Outfit', sans-serif", fontWeight: "600",
                fontSize: "14px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
                transition: "all 0.3s", textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "rgba(0,201,167,0.05)";
                  e.currentTarget.style.color = "#F0F6FF";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#7A8BA8";
                }
              }}
            >
              <span style={{ fontSize: "16px" }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link to="/" target="_blank" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "transparent",
              border: "1px solid rgba(0,201,167,0.2)",
              borderRadius: "10px", padding: "11px 16px",
              color: "#7A8BA8", fontFamily: "'Outfit', sans-serif",
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9A84C";
                e.currentTarget.style.borderColor = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7A8BA8";
                e.currentTarget.style.borderColor = "rgba(0,201,167,0.2)";
              }}
            >
              🌐 View Website
            </button>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", background: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.2)",
              borderRadius: "10px", padding: "11px 16px",
              color: "#FF6B6B", fontFamily: "'Outfit', sans-serif",
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,107,107,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,107,107,0.08)";
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", overflow: "auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "40px",
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "36px",
              letterSpacing: "3px", color: "#F0F6FF", lineHeight: "1",
            }}>
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p style={{ color: "#7A8BA8", fontSize: "13px", marginTop: "4px" }}>
              {new Date().toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px", marginBottom: "40px",
            }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{
                  background: "rgba(255,255,255,0.97)",
                  border: "1px solid rgba(0,201,167,0.12)",
                  borderRadius: "14px", padding: "24px",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(0,201,167,0.35)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(0,201,167,0.12)"}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{stat.icon}</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', cursive", fontSize: "40px",
                    color: stat.color, letterSpacing: "2px", lineHeight: "1",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#7A8BA8", fontSize: "13px", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Products */}
            <div style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(0,201,167,0.12)",
              borderRadius: "14px", padding: "28px",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "24px",
              }}>
                <h3 style={{
                  fontFamily: "'Bebas Neue', cursive", fontSize: "22px",
                  letterSpacing: "2px", color: "#F0F6FF",
                }}>
                  Recent Products
                </h3>
                <button
                  onClick={() => setActiveTab("products")}
                  style={{
                    background: "transparent", border: "1px solid rgba(0,201,167,0.3)",
                    borderRadius: "8px", padding: "7px 16px",
                    color: "#C9A84C", fontSize: "12px", fontWeight: "600",
                    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  Manage All →
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "12px", borderRadius: "10px",
                    background: "rgba(0,201,167,0.03)",
                    border: "1px solid rgba(0,201,167,0.08)",
                  }}>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{
                        width: "48px", height: "48px", borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: "#F0F6FF", fontWeight: "600", fontSize: "14px",
                        marginBottom: "2px",
                      }}>
                        {p.name}
                      </p>
                      <p style={{ color: "#7A8BA8", fontSize: "12px" }}>{p.category}</p>
                    </div>
                    <span style={{
                      fontFamily: "'Bebas Neue', cursive", fontSize: "20px",
                      color: "#C9A84C", letterSpacing: "1px",
                    }}>
                      KSh {p.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && <ManageProducts />}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <SiteSettings settings={siteSettings} onSave={setSiteSettings} />
        )}
      </div>
    </div>
  );
};

const SiteSettings = ({ settings, onSave }) => {
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    onSave(form);
    toast.success("Settings saved successfully!");
  };

  const inputStyle = {
    width: "100%", background: "#2D1B69",
    border: "1px solid rgba(0,201,167,0.2)",
    borderRadius: "10px", padding: "13px 18px",
    color: "#F0F6FF", fontSize: "14px",
    fontFamily: "'Outfit', sans-serif", outline: "none",
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.97)",
      border: "1px solid rgba(0,201,167,0.12)",
      borderRadius: "14px", padding: "36px",
      maxWidth: "640px",
    }}>
      <h3 style={{
        fontFamily: "'Bebas Neue', cursive", fontSize: "24px",
        letterSpacing: "2px", color: "#F0F6FF", marginBottom: "28px",
      }}>
        Homepage Settings
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{
            color: "#7A8BA8", fontSize: "12px", fontWeight: "600",
            letterSpacing: "1px", textTransform: "uppercase",
            display: "block", marginBottom: "8px",
          }}>
            Hero Title
          </label>
          <input
            type="text"
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(0,201,167,0.2)")}
          />
        </div>

        <div>
          <label style={{
            color: "#7A8BA8", fontSize: "12px", fontWeight: "600",
            letterSpacing: "1px", textTransform: "uppercase",
            display: "block", marginBottom: "8px",
          }}>
            Hero Subtitle
          </label>
          <textarea
            rows={3}
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(0,201,167,0.2)")}
          />
        </div>

        <div style={{
          background: "rgba(0,201,167,0.05)",
          border: "1px solid rgba(0,201,167,0.15)",
          borderRadius: "10px", padding: "16px",
        }}>
          <p style={{ color: "#7A8BA8", fontSize: "13px", lineHeight: "1.7" }}>
            💡 <strong style={{ color: "#F0F6FF" }}>Tip:</strong> Changes to settings are saved
            to your browser's local storage. They will persist across sessions on this device.
          </p>
        </div>

        <button
          onClick={handleSave}
          style={{
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            color: "#000", border: "none", borderRadius: "10px",
            padding: "14px", fontFamily: "'Outfit', sans-serif",
            fontWeight: "700", fontSize: "14px", letterSpacing: "1px",
            textTransform: "uppercase", cursor: "pointer",
            boxShadow: "0 0 25px rgba(0,201,167,0.3)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 0 40px rgba(0,201,167,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 0 25px rgba(0,201,167,0.3)";
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
