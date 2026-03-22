import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const Hero = ({ settings }) => {
  const { products } = useAdmin();
  const displayProducts = products.slice(0, 6);
  const [hovered, setHovered] = useState(null);
  const [counted, setCounted] = useState(false);
  const [counter, setCounter] = useState({ clients: 0, items: 0, years: 0, rate: 0 });

  useEffect(() => {
    if (counted) return;
    setCounted(true);
    const targets = { clients: 500, items: 10000, years: 6, rate: 100 };
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounter({
        clients: Math.round(targets.clients * progress),
        items: Math.round(targets.items * progress),
        years: Math.round(targets.years * progress),
        rate: Math.round(targets.rate * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [counted]);

  const tagColors = ["#C9A84C", "#7846FF", "#FF6B9D", "#FFB800", "#8B6914", "#FF6B35"];

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
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}>

        {/* ── ROW 1: HEADLINE + STATS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "20px",
          alignItems: "center",
        }} className="hero-top-row">

          {/* Headline */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "50px",
              padding: "5px 16px",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "7px", height: "7px",
                borderRadius: "50%",
                background: "#C9A84C",
                boxShadow: "0 0 10px #C9A84C",
              }} />
              <span style={{
                color: "#C9A84C",
                fontSize: "11px", fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
              }}>
                Nairobi's Premier Print Studio
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(38px, 5.5vw, 72px)",
              lineHeight: "0.92",
              color: "#2C1810",
              letterSpacing: "2px",
              marginBottom: "14px",
            }}>
              Premium
              <br />
              <span style={{
                background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Printing
              </span>
              {" "}&amp;{" "}
              <span style={{ color: "#2C1810" }}>Branding</span>
            </h1>

            <p style={{
              color: "#8B6E5A",
              fontSize: "13px",
              lineHeight: "1.7",
              fontFamily: "'Outfit', sans-serif",
              maxWidth: "400px",
              marginBottom: "18px",
            }}>
              {settings?.heroSubtitle ||
                "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya."}
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                    color: "#2C1810", border: "none",
                    borderRadius: "50px",
                    padding: "12px 28px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(201,168,76,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.4)";
                  }}
                >
                  Browse Products
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    color: "#2C1810",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    padding: "12px 28px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "600", fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}>
            {[
              { value: `${counter.clients}+`, label: "Happy Clients", color: "#C9A84C" },
              { value: `${counter.items.toLocaleString()}+`, label: "Items Printed", color: "#7846FF" },
              { value: `${counter.years}+`, label: "Years Experience", color: "#FFB800" },
              { value: `${counter.rate}%`, label: "Satisfaction Rate", color: "#FF6B9D" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px 12px",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = `${stat.color}40`;
                  e.currentTarget.style.background = `${stat.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                <div style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "30px",
                  color: stat.color,
                  letterSpacing: "2px",
                  lineHeight: "1",
                  marginBottom: "4px",
                  textShadow: `0 0 20px ${stat.color}60`,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: "#8B6E5A",
                  fontSize: "10px", fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2: SECTION LABEL ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "4px", height: "22px",
              borderRadius: "2px",
              background: "linear-gradient(to bottom, #C9A84C, #8B6914)",
            }} />
            <span style={{
              color: "#5C3D2E",
              fontSize: "12px", fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Featured Products
            </span>
          </div>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span style={{
              color: "#C9A84C",
              fontSize: "12px", fontWeight: "700",
              fontFamily: "'Outfit', sans-serif",
              cursor: "pointer",
              transition: "opacity 0.3s",
            }}>
              View All Products →
            </span>
          </Link>
        </div>

        {/* ── ROW 3: EQUAL 6-GRID PRODUCTS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
          className="hero-product-grid"
        >
          {Array.from({ length: 6 }).map((_, idx) => {
            const product = displayProducts[idx];
            const color = tagColors[idx % tagColors.length];

            if (!product) {
              return (
                <Link
                  key={`cta-${idx}`}
                  to={idx === 0 ? "/contact" : "/products"}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    height: "200px",
                    borderRadius: "16px",
                    background: idx === 0
                      ? "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,105,20,0.2))"
                      : "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    border: idx === 0
                      ? "1px solid rgba(201,168,76,0.3)"
                      : "1px dashed rgba(255,255,255,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {idx === 0 ? (
                      <>
                        <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎨</div>
                        <h4 style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: "18px", color: "#2C1810",
                          letterSpacing: "2px", marginBottom: "6px",
                        }}>
                          Custom Order
                        </h4>
                        <p style={{
                          color: "#8B6E5A",
                          fontSize: "11px",
                          fontFamily: "'Outfit', sans-serif",
                          marginBottom: "12px", lineHeight: "1.5",
                        }}>
                          Upload your design — we print it!
                        </p>
                        <span style={{
                          background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                          color: "#2C1810", borderRadius: "50px",
                          padding: "6px 16px", fontSize: "11px",
                          fontWeight: "700",
                          fontFamily: "'Outfit', sans-serif",
                        }}>
                          Start Order →
                        </span>
                      </>
                    ) : (
                      <p style={{
                        color: "rgba(255,255,255,0.15)",
                        fontSize: "11px",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        Add more products
                      </p>
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  height: "200px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  background: "white",
                  border: `2px solid ${hovered === idx ? color : "rgba(255,255,255,0)"}`,
                  transition: "all 0.35s ease",
                  transform: hovered === idx ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hovered === idx
                    ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${color}30`
                    : "0 4px 20px rgba(0,0,0,0.25)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* Image */}
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "8px",
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
                      background: "rgba(255,255,255,0.97)",
                    }}>
                      <div style={{ fontSize: "28px", opacity: 0.2, marginBottom: "6px" }}>📷</div>
                      <p style={{
                        fontSize: "10px",
                        fontFamily: "'Outfit', sans-serif",
                        color: "#9CA3AF",
                        textAlign: "center",
                        padding: "0 8px",
                      }}>
                        No photo yet
                      </p>
                    </div>
                  )}

                  {/* Bottom gradient overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0) 50%)",
                    pointerEvents: "none",
                  }} />

                  {/* Category tag */}
                  <div style={{
                    position: "absolute",
                    top: "10px", left: "10px",
                    background: color,
                    borderRadius: "50px",
                    padding: "3px 10px",
                    boxShadow: `0 4px 12px ${color}70`,
                    zIndex: 2,
                  }}>
                    <span style={{
                      color: "#2C1810",
                      fontSize: "9px", fontWeight: "800",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {product.category}
                    </span>
                  </div>

                  {/* Product info */}
                  <div style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "12px", right: "12px",
                    zIndex: 2,
                  }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "13px", fontWeight: "800",
                      color: "#2C1810",
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                    }}>
                      {product.name}
                    </h3>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "17px",
                        color: "#C9A84C",
                        letterSpacing: "1px",
                        textShadow: "0 0 12px rgba(201,168,76,0.7)",
                      }}>
                        KSh {product.price.toLocaleString()}
                      </span>
                      <span style={{
                        background: color,
                        color: "#2C1810",
                        borderRadius: "50px",
                        padding: "3px 10px",
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

        {/* ── ROW 4: 4 FEATURE CARDS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
          className="hero-feature-cards"
        >
          {[
            { icon: "⚡", color: "#FFB800", bg: "rgba(255,184,0,0.1)", title: "Fast Delivery", desc: "Quick turnaround across Kenya" },
            { icon: "🎯", color: "#C9A84C", bg: "rgba(201,168,76,0.1)", title: "100% Quality", desc: "Premium materials guaranteed" },
            { icon: "✏️", color: "#7846FF", bg: "rgba(120,70,255,0.1)", title: "Custom Design", desc: "Upload artwork or we design" },
            { icon: "💎", color: "#FF6B9D", bg: "rgba(255,107,157,0.1)", title: "Best Prices", desc: "Bulk order discounts available" },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = f.bg;
                e.currentTarget.style.borderColor = `${f.color}30`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "40px", height: "40px",
                borderRadius: "10px",
                background: f.bg,
                border: `1px solid ${f.color}25`,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  color: "#2C1810", marginBottom: "2px",
                }}>
                  {f.title}
                </h4>
                <p style={{
                  color: "#8B6E5A",
                  fontSize: "11px", lineHeight: "1.4",
                  fontFamily: "'Outfit', sans-serif",
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
          .hero-product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .hero-top-row {
            grid-template-columns: 1fr !important;
          }
          .hero-feature-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hero-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-feature-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .hero-product-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-feature-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
