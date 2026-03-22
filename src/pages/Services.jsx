import React, { useState } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    icon: "🖨️",
    title: "Printing",
    tagline: "Print That Speaks Volumes",
    color: "#E3F2FD",
    accent: "#2196F3",
    description: "From business cards to large-format banners, we deliver crisp, vibrant, and professional print outputs every time.",
    offerings: [
      "Business Cards & Letterheads",
      "Flyers & Brochures",
      "Posters & Banners",
      "Pull-up Banners & Standees",
      "Stickers & Labels",
      "Calendars & Diaries",
      "Certificates & Awards",
      "Large Format Printing",
    ],
  },
  {
    id: 2,
    icon: "🎨",
    title: "Branding",
    tagline: "Build a Brand That Lasts",
    color: "#F3E5F5",
    accent: "#9C27B0",
    description: "We craft powerful brand identities that make your business unforgettable — from logo to full brand systems.",
    offerings: [
      "Logo Design & Identity",
      "Brand Style Guides",
      "Corporate Stationery",
      "Brand Strategy",
      "Vehicle Branding & Wraps",
      "Uniform & Apparel Branding",
      "Event Branding",
      "Social Media Brand Kits",
    ],
  },
  {
    id: 3,
    icon: "✏️",
    title: "Graphic Design",
    tagline: "Design That Converts",
    color: "#E8F5E9",
    accent: "#4CAF50",
    description: "Our experienced designers turn your ideas into stunning visuals that communicate, engage and inspire action.",
    offerings: [
      "Marketing Materials Design",
      "Social Media Graphics",
      "Packaging Design",
      "Menu & Catalogue Design",
      "Infographic Design",
      "Photo Editing & Retouching",
      "Presentation Design",
      "Digital Ad Creatives",
    ],
  },
  {
    id: 4,
    icon: "🏗️",
    title: "3D Signages",
    tagline: "Signs That Stop People in Their Tracks",
    color: "#FFF3E0",
    accent: "#FF9800",
    description: "Premium 3D fabricated signs that command attention and elevate your brand presence at any location.",
    offerings: [
      "3D Acrylic Letter Signs",
      "Illuminated LED Signs",
      "Shop Front Signage",
      "Office Name Boards",
      "Directional Signage",
      "Billboard Design & Print",
      "Window Graphics",
      "Exhibition & Event Stands",
    ],
  },
  {
    id: 5,
    icon: "⚙️",
    title: "Fabrication",
    tagline: "Built Strong. Built to Impress.",
    color: "#FCE4EC",
    accent: "#E91E63",
    description: "Custom metalwork, acrylic and aluminium fabrication for signage structures, displays and branded installations.",
    offerings: [
      "Metal Frame Structures",
      "Acrylic Display Stands",
      "Aluminium Composite Panels",
      "Cut-out Letter Fabrication",
      "Light Box Fabrication",
      "Retail Display Units",
      "Trade Show Booths",
      "Custom Brand Installations",
    ],
  },
  {
    id: 6,
    icon: "👕",
    title: "Screen Printing",
    tagline: "Wear Your Brand With Pride",
    color: "#E0F7FA",
    accent: "#00BCD4",
    description: "High-quality screen and heat transfer printing on all types of apparel — perfect for teams, events, and merchandise.",
    offerings: [
      "T-Shirt Screen Printing",
      "Hoodie & Jacket Printing",
      "Cap & Hat Printing",
      "Polo Shirt Embroidery",
      "Bulk Corporate Uniforms",
      "School & Club Jerseys",
      "Promotional Bags & Totes",
      "Custom Merchandise",
    ],
  },
];

const Services = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      paddingTop: "70px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "28px 5%",
      }}>

        {/* ── PAGE HEADER ── */}
        <div style={{
          textAlign: "center",
          marginBottom: "32px",
        }}>
          <span style={{
            background: "rgba(201,168,76,0.1)",
            color: "#C9A84C", fontSize: "11px",
            fontWeight: "700", letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "50px",
            display: "inline-block", marginBottom: "10px",
            border: "1px solid rgba(201,168,76,0.2)",
          }}>
            What We Offer
          </span>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "3px", color: "#1A2332",
            lineHeight: "1", marginBottom: "10px",
          }}>
            Our <span style={{ color: "#C9A84C" }}>Services</span>
          </h1>
          <p style={{
            color: "#6B7C93", fontSize: "14px",
            maxWidth: "520px", margin: "0 auto",
            lineHeight: "1.7",
          }}>
            From a single business card to a full corporate rebrand —
            Manuprints delivers world-class printing and branding solutions
            for every business in Kenya.
          </p>
        </div>

        {/* ── SERVICES GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "28px",
        }} className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === service.id ? service.color : "white",
                border: `1px solid ${hovered === service.id ? service.accent + "40" : "#EEF2F7"}`,
                borderRadius: "16px",
                padding: "22px",
                transition: "all 0.3s ease",
                transform: hovered === service.id ? "translateY(-5px)" : "translateY(0)",
                boxShadow: hovered === service.id
                  ? `0 16px 40px ${service.accent}22`
                  : "0 2px 8px rgba(0,0,0,0.04)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background number watermark */}
              <div style={{
                position: "absolute",
                top: "-10px", right: "10px",
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "80px",
                color: service.accent,
                opacity: 0.06,
                lineHeight: "1",
                pointerEvents: "none",
                userSelect: "none",
              }}>
                0{service.id}
              </div>

              {/* Top row */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "14px",
              }}>
                <div style={{
                  width: "48px", height: "48px",
                  borderRadius: "14px",
                  background: service.color,
                  display: "flex", alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px", flexShrink: 0,
                  border: `1px solid ${service.accent}30`,
                  transition: "transform 0.3s",
                  transform: hovered === service.id ? "scale(1.1) rotate(-5deg)" : "scale(1)",
                }}>
                  {service.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "22px", letterSpacing: "2px",
                    color: "#1A2332", lineHeight: "1",
                    marginBottom: "3px",
                    transition: "color 0.3s",
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    color: service.accent,
                    fontSize: "11px", fontWeight: "700",
                    letterSpacing: "0.5px",
                  }}>
                    {service.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{
                color: "#4A6080",
                fontSize: "12px",
                lineHeight: "1.6",
                marginBottom: "14px",
              }}>
                {service.description}
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: hovered === service.id
                  ? `${service.accent}30`
                  : "#F0F4F8",
                marginBottom: "14px",
                transition: "background 0.3s",
              }} />

              {/* Offerings list — 2 columns */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
              }}>
                {service.offerings.map((item) => (
                  <div key={item} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <div style={{
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: service.accent,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      color: "#4A6080",
                      fontSize: "11px",
                      lineHeight: "1.3",
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              {hovered === service.id && (
                <div style={{ marginTop: "16px" }}>
                  <Link to="/contact" style={{ textDecoration: "none" }}>
                    <button style={{
                      background: service.accent,
                      color: "#2C1810", border: "none",
                      borderRadius: "50px",
                      padding: "8px 20px",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: "700", fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}>
                      Get a Quote →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA BANNER ── */}
        <div style={{
          background: "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)",
          borderRadius: "16px",
          padding: "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "28px", letterSpacing: "2px",
              color: "#2C1810", lineHeight: "1", marginBottom: "6px",
            }}>
              Ready To Get Started?
            </h3>
            <p style={{
              color: "#2C1810",
              fontSize: "13px", fontFamily: "'Outfit', sans-serif",
            }}>
              Contact us today for a free quote on any of our services.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open("https://wa.me/254740643789", "_blank")}
              style={{
                background: "#25D366", color: "#2C1810",
                border: "none", borderRadius: "50px",
                padding: "12px 28px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700", fontSize: "13px",
                cursor: "pointer", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              📱 WhatsApp Us
            </button>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                background: "rgba(255,255,255,0.97)", color: "#C9A84C",
                border: "none", borderRadius: "50px",
                padding: "12px 28px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700", fontSize: "13px",
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Get Free Quote
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
