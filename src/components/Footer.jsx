import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const services = [
    "Printing", "Branding", "Graphic Design",
    "3D Signages", "Fabrication", "Screen Printing",
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <footer
      style={{
        background: "rgba(44,24,16,0.95)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        padding: "80px 5% 30px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
          marginBottom: "60px",
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "28px",
                letterSpacing: "3px",
                color: "#2C1810",
              }}
            >
              MANU<span style={{ color: "#C9A84C" }}>PRINTS</span>
            </div>
          </div>
          <p style={{ color: "#7A8BA8", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px" }}>
            Nairobi's premier printing and branding studio. We bring your vision to life with
            precision, creativity, and world-class quality.
          </p>

          {/* Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "📱", text: "0740 643 789 (WhatsApp)" },
              { icon: "📞", text: "0711 499 798" },
              { icon: "✉️", text: "elphasopiyo17@gmail.com" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px" }}>{item.icon}</span>
                <span style={{ color: "#7A8BA8", fontSize: "13px" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4
            style={{
              color: "#2C1810",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              paddingBottom: "12px",
            }}
          >
            Services
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            {services.map((service) => (
              <li key={service} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#C9A84C", fontSize: "10px" }}>▶</span>
                <span style={{ color: "#7A8BA8", fontSize: "14px", transition: "color 0.3s" }}>
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              color: "#2C1810",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              paddingBottom: "12px",
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    color: "#7A8BA8",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#C9A84C")}
                  onMouseLeave={(e) => (e.target.style.color = "#7A8BA8")}
                >
                  <span style={{ color: "#C9A84C", fontSize: "10px" }}>▶</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Box */}
        <div>
          <h4
            style={{
              color: "#2C1810",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              paddingBottom: "12px",
            }}
          >
            Start a Project
          </h4>
          <p style={{ color: "#7A8BA8", fontSize: "14px", lineHeight: "1.8", marginBottom: "20px" }}>
            Ready to bring your brand to life? Get in touch with us today.
          </p>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                padding: "12px 24px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Get Free Quote
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <p style={{ color: "#7A8BA8", fontSize: "13px" }}>
          © {year} Manuprints. All rights reserved.
        </p>
        <p style={{ color: "#7A8BA8", fontSize: "12px", textAlign: "center" }}>
          Website designed, developed & maintained by{" "}
          <span style={{ color: "#C9A84C", fontWeight: "600" }}>
            Techari Digital Solutions
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
