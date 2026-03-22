import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const useVisible = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.85)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

/* ─────────────────────────────────────
   HERO SECTION
───────────────────────────────────── */
const HeroSection = ({ settings, products }) => {
  const [hovered, setHovered] = useState(null);
  const [counter, setCounter] = useState({ clients: 0, items: 0, years: 0, rate: 0 });
  const displayProducts = products.slice(0, 6);
  const tagColors = [GOLD, "#C9A84C", "#8B6914", "#A0892A", "#6B4C3B", "#C49A3C"];

  useEffect(() => {
    const targets = { clients: 500, items: 10000, years: 6, rate: 100 };
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({
        clients: Math.round(targets.clients * p),
        items: Math.round(targets.items * p),
        years: Math.round(targets.years * p),
        rate: Math.round(targets.rate * p),
      });
      if (step >= steps) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      paddingTop: "68px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        flex: 1,
        maxWidth: "1380px",
        margin: "0 auto",
        width: "100%",
        padding: "20px 24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>

        {/* TOP — Headline + Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "24px",
          alignItems: "center",
        }} className="hero-top-row">

          {/* Headline */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(139,105,20,0.12)",
              border: "1px solid rgba(139,105,20,0.35)",
              borderRadius: "50px", padding: "5px 16px",
              marginBottom: "14px",
            }}>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: GOLD, boxShadow: `0 0 10px ${GOLD}`,
              }} />
              <span style={{
                color: GOLD, fontSize: "11px", fontWeight: "700",
                letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
              }}>
                Nairobi's Premier Print Studio
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: "0.92", color: DARK,
              letterSpacing: "2px", marginBottom: "14px",
            }}>
              Premium{" "}
              <span style={{ color: GOLD }}>Printing</span>
              <br />
              &amp; Branding Solutions
            </h1>

            <p style={{
              color: MID, fontSize: "14px",
              lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
              maxWidth: "420px", marginBottom: "20px",
            }}>
              {settings?.heroSubtitle ||
                "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya."}
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <button style={{
                  background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                  color: "white", border: "none",
                  borderRadius: "50px", padding: "12px 30px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: `0 6px 24px rgba(139,105,20,0.45)`,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 12px 32px rgba(139,105,20,0.55)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 6px 24px rgba(139,105,20,0.45)`;
                  }}
                >
                  Browse Products
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "rgba(44,24,16,0.08)",
                  color: DARK,
                  border: `1px solid rgba(44,24,16,0.25)`,
                  borderRadius: "50px", padding: "12px 30px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(44,24,16,0.14)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(44,24,16,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { value: `${counter.clients}+`, label: "Happy Clients", color: GOLD },
              { value: `${counter.items.toLocaleString()}+`, label: "Items Printed", color: "#A0892A" },
              { value: `${counter.years}+`, label: "Years Experience", color: "#8B6914" },
              { value: `${counter.rate}%`, label: "Satisfaction Rate", color: "#C49A3C" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: CARD_BG,
                backdropFilter: "blur(12px)",
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "14px", padding: "16px 12px",
                textAlign: "center", transition: "all 0.3s",
                boxShadow: "0 2px 12px rgba(139,105,20,0.1)",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(139,105,20,0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(139,105,20,0.1)";
                }}
              >
                <div style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "30px", color: stat.color,
                  letterSpacing: "2px", lineHeight: "1",
                  marginBottom: "4px",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: MID, fontSize: "10px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Label */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "4px", height: "22px", borderRadius: "2px",
              background: `linear-gradient(to bottom, ${GOLD}, #6B5010)`,
            }} />
            <span style={{
              color: DARK, fontSize: "12px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Featured Products
            </span>
          </div>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span style={{
              color: GOLD, fontSize: "12px", fontWeight: "700",
              fontFamily: "'Outfit', sans-serif", cursor: "pointer",
            }}>
              View All Products →
            </span>
          </Link>
        </div>

        {/* 6 EQUAL PRODUCT GRIDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }} className="hero-product-grid">
          {Array.from({ length: 6 }).map((_, idx) => {
            const product = displayProducts[idx];
            const color = tagColors[idx % tagColors.length];

            if (!product) {
              return (
                <Link key={`empty-${idx}`} to={idx === 0 ? "/contact" : "/products"}
                  style={{ textDecoration: "none" }}>
                  <div style={{
                    height: "200px", borderRadius: "16px",
                    background: idx === 0
                      ? `linear-gradient(135deg, rgba(139,105,20,0.2), rgba(107,80,16,0.2))`
                      : "rgba(139,105,20,0.05)",
                    border: idx === 0
                      ? `1px solid rgba(139,105,20,0.35)`
                      : `1px dashed rgba(139,105,20,0.2)`,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center", padding: "20px",
                    cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 16px 40px rgba(139,105,20,0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {idx === 0 && (
                      <>
                        <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎨</div>
                        <h4 style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: "18px", color: DARK,
                          letterSpacing: "2px", marginBottom: "6px",
                        }}>Custom Order</h4>
                        <p style={{
                          color: MID, fontSize: "11px",
                          fontFamily: "'Outfit', sans-serif",
                          marginBottom: "12px", lineHeight: "1.5",
                        }}>
                          Upload your design and we print it
                        </p>
                        <span style={{
                          background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                          color: "white", borderRadius: "50px",
                          padding: "6px 16px", fontSize: "11px",
                          fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                        }}>
                          Start Order →
                        </span>
                      </>
                    )}
                    {idx !== 0 && (
                      <p style={{ color: LIGHT, fontSize: "11px", fontFamily: "'Outfit', sans-serif" }}>
                        Add more products
                      </p>
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <Link key={product.id} to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  height: "200px", borderRadius: "16px",
                  overflow: "hidden", position: "relative",
                  background: "white",
                  border: `2px solid ${hovered === idx ? color : "transparent"}`,
                  transition: "all 0.35s ease",
                  transform: hovered === idx ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hovered === idx
                    ? `0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px ${color}30`
                    : "0 4px 20px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}>
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name}
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "contain", padding: "8px",
                        background: "white",
                        transition: "transform 0.5s ease",
                        transform: hovered === idx ? "scale(1.06)" : "scale(1)",
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      background: "#FDF8F0",
                    }}>
                      <div style={{ fontSize: "28px", opacity: 0.25, marginBottom: "6px" }}>📷</div>
                      <p style={{ fontSize: "10px", fontFamily: "'Outfit', sans-serif", color: LIGHT }}>
                        No photo yet
                      </p>
                    </div>
                  )}

                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(44,24,16,0.8) 0%, transparent 50%)",
                    pointerEvents: "none",
                  }} />

                  <div style={{
                    position: "absolute", top: "10px", left: "10px",
                    background: color, borderRadius: "50px", padding: "3px 10px",
                    boxShadow: `0 4px 12px ${color}70`, zIndex: 2,
                  }}>
                    <span style={{
                      color: "white", fontSize: "9px", fontWeight: "800",
                      letterSpacing: "1px", textTransform: "uppercase",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {product.category}
                    </span>
                  </div>

                  <div style={{
                    position: "absolute", bottom: "10px",
                    left: "12px", right: "12px", zIndex: 2,
                  }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "13px", fontWeight: "800",
                      color: "white", marginBottom: "4px",
                      whiteSpace: "nowrap", overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                    }}>
                      {product.name}
                    </h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "17px", color: "#FFD700",
                        letterSpacing: "1px",
                        textShadow: "0 0 12px rgba(255,215,0,0.7)",
                      }}>
                        KSh {product.price.toLocaleString()}
                      </span>
                      <span style={{
                        background: color, color: "white",
                        borderRadius: "50px", padding: "3px 10px",
                        fontSize: "9px", fontWeight: "700",
                        fontFamily: "'Outfit', sans-serif",
                        opacity: hovered === idx ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}>
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 4 FEATURE CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }} className="hero-feature-cards">
          {[
            { icon: "⚡", color: "#8B6914", bg: "rgba(139,105,20,0.1)", title: "Fast Delivery", desc: "Quick turnaround across Kenya" },
            { icon: "🎯", color: "#6B5010", bg: "rgba(107,80,16,0.1)", title: "100% Quality", desc: "Premium materials guaranteed" },
            { icon: "✏️", color: "#A0892A", bg: "rgba(160,137,42,0.1)", title: "Custom Design", desc: "Upload artwork or we design" },
            { icon: "💎", color: "#C49A3C", bg: "rgba(196,154,60,0.1)", title: "Best Prices", desc: "Bulk order discounts available" },
          ].map((f) => (
            <div key={f.title} style={{
              background: CARD_BG,
              backdropFilter: "blur(10px)",
              borderRadius: "12px", padding: "14px 16px",
              display: "flex", alignItems: "center", gap: "12px",
              border: `1px solid ${CARD_BORDER}`,
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(139,105,20,0.08)",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = f.bg;
                e.currentTarget.style.borderColor = `${f.color}40`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,105,20,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CARD_BG;
                e.currentTarget.style.borderColor = CARD_BORDER;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(139,105,20,0.08)";
              }}
            >
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: f.bg, border: `1px solid ${f.color}25`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "18px", flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: "700",
                  fontSize: "13px", color: DARK, marginBottom: "2px",
                }}>
                  {f.title}
                </h4>
                <p style={{
                  color: MID, fontSize: "11px",
                  lineHeight: "1.4", fontFamily: "'Outfit', sans-serif",
                }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-top-row { grid-template-columns: 1fr !important; }
          .hero-feature-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-feature-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────── */
const services = [
  { icon: "🖨️", title: "Printing", desc: "High-quality digital and offset printing for flyers, banners, brochures and more.", color: "rgba(139,105,20,0.1)", accent: "#8B6914" },
  { icon: "🎨", title: "Branding", desc: "Complete brand identity solutions — logo design, guidelines and visual systems.", color: "rgba(160,137,42,0.1)", accent: "#A0892A" },
  { icon: "✏️", title: "Graphic Design", desc: "Creative designs for print and digital — marketing materials, social media and more.", color: "rgba(196,154,60,0.1)", accent: "#C49A3C" },
  { icon: "🏗️", title: "3D Signages", desc: "Eye-catching 3D fabricated signs for shops, offices, malls and events.", color: "rgba(107,80,16,0.1)", accent: "#6B5010" },
  { icon: "⚙️", title: "Fabrication", desc: "Custom metal and acrylic fabrication for signage, displays and installations.", color: "rgba(139,105,20,0.12)", accent: "#8B6914" },
  { icon: "👕", title: "Screen Printing", desc: "Premium printing on t-shirts, hoodies, caps, bags and all types of apparel.", color: "rgba(201,168,76,0.12)", accent: "#C9A84C" },
];

const ServicesSection = () => {
  const [ref, visible] = useVisible();
  const [hovered, setHovered] = useState(null);

  return (
    <section ref={ref} style={{
      padding: "80px 5%",
      background: "rgba(255,255,255,0.3)",
      borderTop: `1px solid rgba(139,105,20,0.15)`,
      borderBottom: `1px solid rgba(139,105,20,0.15)`,
    }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,105,20,0.1)",
            border: "1px solid rgba(139,105,20,0.3)",
            borderRadius: "50px", padding: "5px 16px", marginBottom: "14px",
          }}>
            <span style={{
              color: GOLD, fontSize: "11px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              What We Do
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(32px, 5vw, 54px)",
            letterSpacing: "3px", color: DARK,
            lineHeight: "1", marginBottom: "12px",
          }}>
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <p style={{
            color: MID, fontSize: "14px",
            maxWidth: "500px", margin: "0 auto",
            lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
          }}>
            From concept to creation — end-to-end printing and branding solutions for every business in Kenya.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="services-grid">
          {services.map((s, i) => (
            <div key={s.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? s.color : CARD_BG,
                backdropFilter: "blur(12px)",
                border: `1px solid ${hovered === i ? `${s.accent}40` : CARD_BORDER}`,
                borderRadius: "18px", padding: "28px",
                transition: "all 0.35s ease",
                transform: visible
                  ? hovered === i ? "translateY(-6px)" : "translateY(0)"
                  : "translateY(30px)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.08}s`,
                cursor: "default",
                boxShadow: hovered === i
                  ? `0 20px 50px rgba(139,105,20,0.2)`
                  : "0 2px 12px rgba(139,105,20,0.08)",
              }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: s.color, border: `1px solid ${s.accent}30`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "24px",
                marginBottom: "18px",
                transform: hovered === i ? "scale(1.1) rotate(-5deg)" : "scale(1)",
                transition: "transform 0.3s",
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "22px", letterSpacing: "2px",
                color: hovered === i ? s.accent : DARK,
                marginBottom: "10px", transition: "color 0.3s",
              }}>
                {s.title}
              </h3>
              <p style={{
                color: MID, fontSize: "13px",
                lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
                marginBottom: hovered === i ? "16px" : "0",
              }}>
                {s.desc}
              </p>
              {hovered === i && (
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${s.accent}, #6B5010)`,
                    color: "white", border: "none",
                    borderRadius: "50px", padding: "8px 20px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "12px",
                    cursor: "pointer",
                    boxShadow: `0 4px 15px ${s.accent}40`,
                  }}>
                    Get Quote →
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────
   PRODUCTS SECTION
───────────────────────────────────── */
const ProductsSection = () => {
  const { products } = useAdmin();
  const [ref, visible] = useVisible();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState(null);
  const categories = ["All", "T-Shirts", "Hoodies", "Caps", "3D Signages", "Corporate Branding"];
  const tagColors = [GOLD, "#A0892A", "#C49A3C", "#8B6914", "#6B5010", "#C9A84C"];

  const filtered = products
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .slice(0, 8);

  return (
    <section ref={ref} style={{ padding: "80px 5%" }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,105,20,0.1)",
            border: "1px solid rgba(139,105,20,0.3)",
            borderRadius: "50px", padding: "5px 16px", marginBottom: "14px",
          }}>
            <span style={{
              color: GOLD, fontSize: "11px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Our Work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(32px, 5vw, 54px)",
            letterSpacing: "3px", color: DARK,
            lineHeight: "1", marginBottom: "12px",
          }}>
            Featured <span style={{ color: GOLD }}>Products</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div style={{
          display: "flex", gap: "8px", flexWrap: "wrap",
          justifyContent: "center", marginBottom: "36px",
        }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat
                ? `linear-gradient(135deg, ${GOLD}, #6B5010)`
                : CARD_BG,
              color: activeCategory === cat ? "white" : DARK,
              border: `1px solid ${activeCategory === cat ? "transparent" : CARD_BORDER}`,
              borderRadius: "50px", padding: "8px 20px",
              fontFamily: "'Outfit', sans-serif", fontWeight: "600",
              fontSize: "12px", cursor: "pointer", transition: "all 0.25s",
              boxShadow: activeCategory === cat
                ? `0 4px 15px rgba(139,105,20,0.4)` : "none",
            }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.background = "rgba(139,105,20,0.1)";
                  e.currentTarget.style.borderColor = `rgba(139,105,20,0.3)`;
                  e.currentTarget.style.color = GOLD;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.background = CARD_BG;
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.color = DARK;
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px", marginBottom: "36px",
        }} className="products-section-grid">
          {filtered.map((product, i) => {
            const color = tagColors[i % tagColors.length];
            return (
              <Link key={product.id} to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: "white",
                  borderRadius: "16px", overflow: "hidden",
                  border: `2px solid ${hovered === i ? color : "transparent"}`,
                  transition: "all 0.35s ease",
                  transform: visible
                    ? hovered === i ? "translateY(-6px)" : "translateY(0)"
                    : "translateY(30px)",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.07}s`,
                  boxShadow: hovered === i
                    ? `0 20px 50px rgba(0,0,0,0.15)`
                    : "0 4px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                }}>
                  <div style={{
                    height: "180px", overflow: "hidden",
                    background: "#FDF8F0", position: "relative",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", padding: "8px",
                  }}>
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name}
                        style={{
                          maxWidth: "100%", maxHeight: "100%",
                          objectFit: "contain",
                          transition: "transform 0.5s ease",
                          transform: hovered === i ? "scale(1.07)" : "scale(1)",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center", color: LIGHT,
                      }}>
                        <div style={{ fontSize: "28px", marginBottom: "6px", opacity: 0.4 }}>📷</div>
                        <p style={{ fontSize: "10px", fontFamily: "'Outfit', sans-serif" }}>No photo</p>
                      </div>
                    )}
                    <div style={{
                      position: "absolute", top: "8px", left: "8px",
                      background: color, borderRadius: "20px", padding: "2px 10px",
                      boxShadow: `0 3px 10px ${color}60`,
                    }}>
                      <span style={{
                        color: "white", fontSize: "9px", fontWeight: "800",
                        letterSpacing: "1px", textTransform: "uppercase",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {product.category}
                      </span>
                    </div>
                    {hovered === i && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: `${color}15`,
                        display: "flex", alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <span style={{
                          background: color, color: "white",
                          padding: "8px 20px", borderRadius: "50px",
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: "700", fontSize: "12px",
                          boxShadow: `0 4px 15px ${color}50`,
                        }}>
                          View Product →
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14px", fontWeight: "700",
                      color: DARK, marginBottom: "6px",
                      whiteSpace: "nowrap", overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {product.name}
                    </h3>
                    {product.sizes && product.sizes[0] !== "Custom" && (
                      <div style={{ display: "flex", gap: "3px", flexWrap: "wrap", marginBottom: "8px" }}>
                        {product.sizes.slice(0, 4).map(size => (
                          <span key={size} style={{
                            background: "rgba(139,105,20,0.08)",
                            border: `1px solid rgba(139,105,20,0.2)`,
                            borderRadius: "4px", padding: "1px 6px",
                            fontSize: "9px", fontWeight: "600",
                            color: GOLD, fontFamily: "'Outfit', sans-serif",
                          }}>
                            {size}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: "20px", color: GOLD,
                          letterSpacing: "1px", lineHeight: "1",
                        }}>
                          KSh {product.price.toLocaleString()}
                        </div>
                        {product.delivery > 0 && (
                          <div style={{ color: LIGHT, fontSize: "10px", fontFamily: "'Outfit', sans-serif" }}>
                            + KSh {product.delivery} delivery
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: hovered === i ? color : "rgba(139,105,20,0.1)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", transition: "all 0.3s",
                        boxShadow: hovered === i ? `0 4px 12px ${color}50` : "none",
                      }}>
                        <span style={{
                          color: hovered === i ? "white" : GOLD,
                          fontSize: "14px", fontWeight: "700",
                          transition: "color 0.3s",
                        }}>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button style={{
              background: CARD_BG, color: DARK,
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: "50px", padding: "12px 36px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "14px",
              cursor: "pointer", transition: "all 0.3s",
              boxShadow: "0 2px 12px rgba(139,105,20,0.1)",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${GOLD}, #6B5010)`;
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(139,105,20,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CARD_BG;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.borderColor = CARD_BORDER;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(139,105,20,0.1)";
              }}
            >
              View All Products →
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .products-section-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .products-section-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-section-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────── */
const HowItWorksSection = () => {
  const [ref, visible] = useVisible();
  const steps = [
    { num: "01", icon: "📤", title: "Upload Design", desc: "Share your artwork via WhatsApp, email, or our contact form.", color: GOLD },
    { num: "02", icon: "👕", title: "Choose Product", desc: "Pick from our wide range of printable products and apparel.", color: "#A0892A" },
    { num: "03", icon: "🛒", title: "Place Order", desc: "Confirm details, quantity and make payment to get started.", color: "#8B6914" },
    { num: "04", icon: "🚚", title: "Delivery", desc: "We print, package and deliver your order across Kenya.", color: "#C49A3C" },
  ];

  return (
    <section ref={ref} style={{
      padding: "80px 5%",
      background: "rgba(255,255,255,0.3)",
      borderTop: `1px solid rgba(139,105,20,0.15)`,
      borderBottom: `1px solid rgba(139,105,20,0.15)`,
    }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,105,20,0.1)",
            border: "1px solid rgba(139,105,20,0.3)",
            borderRadius: "50px", padding: "5px 16px", marginBottom: "14px",
          }}>
            <span style={{
              color: GOLD, fontSize: "11px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Simple Process
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(32px, 5vw, 54px)",
            letterSpacing: "3px", color: DARK, lineHeight: "1",
          }}>
            How It <span style={{ color: GOLD }}>Works</span>
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }} className="how-grid">
          {steps.map((step, i) => (
            <div key={step.num} style={{
              background: CARD_BG,
              backdropFilter: "blur(12px)",
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: "18px", padding: "28px",
              position: "relative", overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease",
              transitionDelay: `${i * 0.12}s`,
              boxShadow: "0 2px 12px rgba(139,105,20,0.08)",
            }}>
              <div style={{
                position: "absolute", top: "-10px", right: "10px",
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "72px", color: step.color,
                opacity: 0.08, lineHeight: "1", pointerEvents: "none",
              }}>
                {step.num}
              </div>
              <div style={{
                width: "50px", height: "50px", borderRadius: "14px",
                background: `${step.color}15`,
                border: `1px solid ${step.color}30`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px", marginBottom: "16px",
              }}>
                {step.icon}
              </div>
              <div style={{
                width: "32px", height: "3px", borderRadius: "2px",
                background: step.color, marginBottom: "14px",
              }} />
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "16px", fontWeight: "700",
                color: DARK, marginBottom: "8px",
              }}>
                {step.title}
              </h3>
              <p style={{
                color: MID, fontSize: "13px",
                lineHeight: "1.6", fontFamily: "'Outfit', sans-serif",
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .how-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────── */
const testimonials = [
  { name: "James Mwangi", role: "Manager, TechStartup Kenya", text: "Manuprints delivered our corporate branded t-shirts in record time. Outstanding quality and a very professional team throughout.", rating: 5, color: GOLD },
  { name: "Amina Hassan", role: "Events Manager", text: "We have used Manuprints for three major events. Their 3D signage work is world-class. Our booth always stands out!", rating: 5, color: "#A0892A" },
  { name: "Kevin Otieno", role: "Small Business Owner", text: "Affordable pricing, top-tier quality, and amazing service. Manuprints is my go-to for all branding and printing needs!", rating: 5, color: "#C49A3C" },
];

const TestimonialsSection = () => {
  const [ref, visible] = useVisible();
  return (
    <section ref={ref} style={{ padding: "80px 5%" }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,105,20,0.1)",
            border: "1px solid rgba(139,105,20,0.3)",
            borderRadius: "50px", padding: "5px 16px", marginBottom: "14px",
          }}>
            <span style={{
              color: GOLD, fontSize: "11px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Client Reviews
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(32px, 5vw, 54px)",
            letterSpacing: "3px", color: DARK, lineHeight: "1",
          }}>
            What Clients <span style={{ color: GOLD }}>Say</span>
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              background: CARD_BG,
              backdropFilter: "blur(12px)",
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: "18px", padding: "28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease",
              transitionDelay: `${i * 0.12}s`,
              boxShadow: "0 2px 12px rgba(139,105,20,0.08)",
            }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} style={{ color: GOLD, fontSize: "16px" }}>★</span>
                ))}
              </div>
              <p style={{
                color: MID, fontSize: "14px",
                lineHeight: "1.8", fontFamily: "'Outfit', sans-serif",
                marginBottom: "20px", fontStyle: "normal",
              }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}, #6B5010)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "20px", color: "white",
                  boxShadow: `0 4px 15px ${t.color}40`,
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ color: DARK, fontWeight: "700", fontSize: "14px", fontFamily: "'Outfit', sans-serif" }}>
                    {t.name}
                  </div>
                  <div style={{ color: t.color, fontSize: "12px", fontFamily: "'Outfit', sans-serif" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────
   CTA SECTION
───────────────────────────────────── */
const CTASection = () => {
  const [ref, visible] = useVisible();
  return (
    <section ref={ref} style={{ padding: "80px 5%" }}>
      <div style={{
        maxWidth: "1380px", margin: "0 auto",
        background: `linear-gradient(135deg, rgba(139,105,20,0.15), rgba(107,80,16,0.15))`,
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(139,105,20,0.3)`,
        borderRadius: "24px", padding: "60px 40px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s ease",
        boxShadow: "0 8px 40px rgba(139,105,20,0.15)",
      }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(36px, 5vw, 64px)",
          letterSpacing: "3px", color: DARK,
          lineHeight: "1", marginBottom: "16px",
        }}>
          Ready To Build <span style={{ color: GOLD }}>Your Brand?</span>
        </h2>
        <p style={{
          color: MID, fontSize: "15px",
          lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
          maxWidth: "520px", margin: "0 auto 36px",
        }}>
          Contact us today and lets create something amazing together.
          Fast turnaround, premium quality, unbeatable prices.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
              color: "white", border: "none",
              borderRadius: "50px", padding: "14px 40px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "15px",
              cursor: "pointer",
              boxShadow: `0 6px 24px rgba(139,105,20,0.45)`,
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(139,105,20,0.55)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 6px 24px rgba(139,105,20,0.45)`;
              }}
            >
              Start Your Order
            </button>
          </Link>
          <button
            onClick={() => window.open("https://wa.me/254740643789", "_blank")}
            style={{
              background: "#25D366", color: "white",
              border: "none", borderRadius: "50px",
              padding: "14px 40px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "15px",
              cursor: "pointer", transition: "all 0.3s",
              boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,211,102,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,211,102,0.35)";
            }}
          >
            WhatsApp Us
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────
   MAIN HOME PAGE
───────────────────────────────────── */
const Home = () => {
  const { siteSettings, products } = useAdmin();
  return (
    <div style={{ minHeight: "100vh" }}>
      <HeroSection settings={siteSettings} products={products} />
      <ServicesSection />
      <ProductsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
