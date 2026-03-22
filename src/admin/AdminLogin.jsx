import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAdminLoggedIn } = useAdmin();
  const navigate = useNavigate();

  if (isAdminLoggedIn) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleLogin = async () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const success = login(password);
    if (success) {
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Incorrect password. Try: manuprints2024");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Background Grid */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,201,167,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,201,167,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.97)",
        border: "1px solid rgba(0,201,167,0.2)",
        borderRadius: "20px", padding: "52px 44px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,201,167,0.05)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "64px", height: "64px",
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Bebas Neue', cursive", fontSize: "28px",
            color: "#000", margin: "0 auto 16px",
            boxShadow: "0 0 30px rgba(0,201,167,0.4)",
          }}>
            MP
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "32px",
            letterSpacing: "3px", color: "#F0F6FF", marginBottom: "6px",
          }}>
            MANU<span style={{ color: "#C9A84C" }}>PRINTS</span>
          </h1>
          <p style={{ color: "#7A8BA8", fontSize: "13px", letterSpacing: "1px" }}>
            Admin Dashboard Access
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,201,167,0.3), transparent)",
          marginBottom: "36px",
        }} />

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              color: "#7A8BA8", fontSize: "12px", fontWeight: "600",
              letterSpacing: "1.5px", textTransform: "uppercase",
              display: "block", marginBottom: "8px",
            }}>
              Admin Password
            </label>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", background: "transparent",
                border: "1px solid rgba(0,201,167,0.2)",
                borderRadius: "10px", padding: "14px 18px",
                color: "#F0F6FF", fontSize: "15px",
                fontFamily: "'Outfit', sans-serif", outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,201,167,0.2)")}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: loading
                ? "rgba(0,201,167,0.3)"
                : "linear-gradient(135deg, #C9A84C, #8B6914)",
              color: "#000", border: "none", borderRadius: "10px",
              padding: "15px", fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "15px", letterSpacing: "1px",
              textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: loading ? "none" : "0 0 25px rgba(0,201,167,0.35)",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(0,201,167,0.6)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = loading ? "none" : "0 0 25px rgba(0,201,167,0.35)";
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: "16px", height: "16px",
                  border: "2px solid rgba(0,0,0,0.3)",
                  borderTop: "2px solid #000",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                Verifying...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </div>

        <p style={{
          textAlign: "center", marginTop: "28px",
          color: "#7A8BA8", fontSize: "12px",
        }}>
          Default password:{" "}
          <span style={{ color: "#C9A84C", fontWeight: "600" }}>
            manuprints2024
          </span>
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdminLogin;
