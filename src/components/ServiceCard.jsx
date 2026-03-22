import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? service.color || "#E3F2FD" : "white",
        border: `1px solid ${hovered ? "#0099CC" : "#EEF2F7"}`,
        borderRadius: "16px", padding: "24px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 35px rgba(0,153,204,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
      }}
    >
      <div style={{
        width: "50px", height: "50px", borderRadius: "14px",
        background: service.color || "#E3F2FD",
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "24px",
        marginBottom: "14px",
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.1)" : "scale(1)",
      }}>
        {service.icon}
      </div>
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "16px", fontWeight: "700",
        color: "#1A2332", marginBottom: "8px",
      }}>
        {service.title}
      </h3>
      <p style={{
        color: "#6B7C93", fontSize: "13px",
        lineHeight: "1.6", fontFamily: "'Outfit', sans-serif",
        marginBottom: hovered ? "14px" : "0",
      }}>
        {service.desc}
      </p>
      {hovered && (
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#0099CC", color: "white",
            border: "none", borderRadius: "50px",
            padding: "7px 18px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "700", fontSize: "12px",
            cursor: "pointer",
          }}>
            Get Quote →
          </button>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;