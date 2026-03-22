import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => { setHovered(true); setImgIndex(1); }}
        onMouseLeave={() => { setHovered(false); setImgIndex(0); }}
        style={{
          background: "white",
          borderRadius: "14px", overflow: "hidden",
          border: `1px solid ${hovered ? "#0099CC" : "#EEF2F7"}`,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 35px rgba(0,153,204,0.15)"
            : "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "#F0F4F8" }}>
          <img
            src={product.images[imgIndex] || product.images[0]}
            alt={product.name}
            style={{
              width: "100%", height: "100%", objectFit: "contain",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.07)" : "scale(1)",
            }}
            loading="lazy"
          />
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            background: "#0099CC", borderRadius: "20px", padding: "3px 10px",
          }}>
            <span style={{
              color: "white", fontSize: "9px", fontWeight: "700",
              letterSpacing: "1px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              {product.category}
            </span>
          </div>
          {hovered && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,153,204,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                background: "#0099CC", color: "white",
                padding: "8px 20px", borderRadius: "50px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700", fontSize: "12px",
              }}>
                View Product
              </span>
            </div>
          )}
        </div>
        <div style={{ padding: "14px 16px" }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px", fontWeight: "700",
            color: "#1A2332", marginBottom: "6px",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {product.name}
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "20px", color: "#0099CC", letterSpacing: "1px",
            }}>
              KSh {product.price.toLocaleString()}
            </span>
            <span style={{
              background: "#0099CC", color: "white",
              borderRadius: "50px", padding: "5px 12px",
              fontSize: "11px", fontWeight: "700",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Order
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
