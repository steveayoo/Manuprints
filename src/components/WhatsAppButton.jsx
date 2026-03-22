import React, { useState } from "react";

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = "254740643789";
  const msg = "Hello Manuprints! I would like to enquire about your services.";
  const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);

  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "linear-gradient(135deg, #7C3AED, #A855F7)",
        borderRadius: "50px",
        padding: hovered ? "14px 20px" : "14px",
        boxShadow: "0 4px 25px rgba(37,211,102,0.5)",
        textDecoration: "none",
        transition: "all 0.4s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        overflow: "hidden",
        maxWidth: hovered ? "220px" : "52px",
      },
    },
    React.createElement(
      "span",
      {
        style: {
          color: "white",
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          fontSize: "20px",
        },
      },
      "??"
    ),
    React.createElement(
      "span",
      {
        style: {
          color: "white",
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          fontSize: "14px",
          whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        },
      },
      "Chat with us"
    )
  );
}

export default WhatsAppButton;
