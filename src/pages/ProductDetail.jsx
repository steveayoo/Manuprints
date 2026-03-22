import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useAdmin();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{
        minHeight: "100vh", background: "transparent",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingTop: "70px", fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😕</div>
        <h2 style={{
          fontFamily: "'Bebas Neue', cursive", fontSize: "32px",
          color: "#1A2332", letterSpacing: "2px", marginBottom: "12px",
        }}>
          Product Not Found
        </h2>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#C9A84C", color: "#2C1810", border: "none",
            borderRadius: "8px", padding: "10px 24px",
            fontFamily: "'Outfit', sans-serif", fontWeight: "700", cursor: "pointer",
          }}>
            Back to Products
          </button>
        </Link>
      </div>
    );
  }

  const total = product.price * quantity + (product.delivery || 0);

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello Manuprints! I would like to enquire about:\n\nProduct: ${product.name}\nSize: ${selectedSize || "Not specified"}\nQuantity: ${quantity}\nTotal: KSh ${total.toLocaleString()}\n\nPlease confirm availability and payment details.`;
    window.open(`https://wa.me/254740643789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleEmailEnquiry = () => {
    window.location.href = `mailto:elphasopiyo17@gmail.com?subject=Enquiry: ${product.name}&body=Hi Manuprints,%0A%0AI would like to enquire about:%0AProduct: ${product.name}%0ASize: ${selectedSize || "TBD"}%0AQuantity: ${quantity}%0AEstimated Total: KSh ${total.toLocaleString()}%0A%0APlease confirm availability and payment details.%0A%0AThank you.`;
  };

  const viewLabels = ["Front View", "Side View", "Back View"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      paddingTop: "70px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px 5%",
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "rgba(255,255,255,0.97)", border: "1px solid #E8EFF5",
            borderRadius: "8px", padding: "7px 16px",
            color: "#4A6080", fontFamily: "'Outfit', sans-serif",
            fontSize: "12px", fontWeight: "600",
            cursor: "pointer", display: "flex",
            alignItems: "center", gap: "6px",
            marginBottom: "16px", transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#C9A84C";
            e.currentTarget.style.color = "#C9A84C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E8EFF5";
            e.currentTarget.style.color = "#4A6080";
          }}
        >
          ← Back
        </button>

        {/* Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }} className="detail-grid">

          {/* ── LEFT — Images ── */}
          <div>
            {/* Main Image */}
            <div style={{
              width: "100%",
              height: "380px",
              borderRadius: "14px",
              border: "1px solid #E8EFF5",
              marginBottom: "10px",
              position: "relative",
              background: "rgba(255,255,255,0.97)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              {product.images && product.images[activeImg] ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "all 0.4s ease",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  color: "#B0BEC5",
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>📷</div>
                  <p style={{ fontSize: "13px", fontFamily: "'Outfit', sans-serif" }}>
                    No photo available
                  </p>
                </div>
              )}

              {/* View Label */}
              {product.images && product.images[activeImg] && (
                <div style={{
                  position: "absolute", bottom: "14px", left: "14px",
                  background: "#C9A84C",
                  borderRadius: "20px", padding: "4px 14px",
                }}>
                  <span style={{
                    color: "#2C1810", fontSize: "10px", fontWeight: "700",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {viewLabels[activeImg] || `View ${activeImg + 1}`}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: "76px", height: "76px",
                      borderRadius: "10px",
                      border: `2px solid ${activeImg === i ? "#C9A84C" : "#E8EFF5"}`,
                      transition: "all 0.3s",
                      background: "rgba(255,255,255,0.97)",
                      display: "flex", alignItems: "center",
                      justifyContent: "center",
                      padding: "4px", cursor: "pointer",
                      boxShadow: activeImg === i
                        ? "0 0 0 3px rgba(201,168,76,0.2)"
                        : "none",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img}
                      alt={viewLabels[i] || `View ${i + 1}`}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "contain",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* View Labels below thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                {product.images.map((_, i) => (
                  <div key={i} style={{
                    width: "76px", textAlign: "center",
                  }}>
                    <span style={{
                      color: activeImg === i ? "#C9A84C" : "#6B7C93",
                      fontSize: "9px", fontWeight: "700",
                      fontFamily: "'Outfit', sans-serif",
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>
                      {viewLabels[i] || `View ${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT — Product Details ── */}
          <div>
            {/* Category Badge */}
            <div style={{
              display: "inline-block",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "20px", padding: "3px 14px",
              marginBottom: "10px",
            }}>
              <span style={{
                color: "#C9A84C", fontSize: "11px", fontWeight: "700",
                letterSpacing: "1px", textTransform: "uppercase",
              }}>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(20px, 3vw, 30px)",
              fontWeight: "800", color: "#1A2332",
              lineHeight: "1.15", marginBottom: "10px",
            }}>
              {product.name}
            </h1>

            {/* Description */}
            <p style={{
              color: "#6B7C93", fontSize: "13px",
              lineHeight: "1.7", marginBottom: "16px",
            }}>
              {product.description}
            </p>

            {/* Specs Grid */}
            <div style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid #EEF2F7",
              borderRadius: "10px", padding: "14px 16px",
              marginBottom: "14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              {[
                { label: "Material", value: product.fabric || "N/A" },
                { label: "Available Sizes", value: product.sizes?.join(", ") || "N/A" },
                { label: "Customization", value: "Full custom print" },
                { label: "Min. Order", value: "1 unit" },
              ].map((spec) => (
                <div key={spec.label} style={{
                  padding: "6px 0",
                  borderBottom: "1px solid #F5F7FA",
                }}>
                  <p style={{
                    color: "#6B7C93", fontSize: "10px",
                    fontWeight: "700", textTransform: "uppercase",
                    letterSpacing: "0.5px", marginBottom: "3px",
                  }}>
                    {spec.label}
                  </p>
                  <p style={{
                    color: "#1A2332", fontSize: "12px", fontWeight: "600",
                  }}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes[0] !== "Custom" && (
              <div style={{ marginBottom: "14px" }}>
                <p style={{
                  color: "#1A2332", fontSize: "12px", fontWeight: "700",
                  textTransform: "uppercase", letterSpacing: "1px",
                  marginBottom: "8px",
                }}>
                  Select Size
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        background: selectedSize === size ? "#C9A84C" : "white",
                        color: selectedSize === size ? "white" : "#4A6080",
                        border: `1px solid ${selectedSize === size ? "#C9A84C" : "#E8EFF5"}`,
                        borderRadius: "8px", padding: "6px 14px",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: "600", fontSize: "12px",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== size) {
                          e.currentTarget.style.borderColor = "#C9A84C";
                          e.currentTarget.style.color = "#C9A84C";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size) {
                          e.currentTarget.style.borderColor = "#E8EFF5";
                          e.currentTarget.style.color = "#4A6080";
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: "14px" }}>
              <p style={{
                color: "#1A2332", fontSize: "12px", fontWeight: "700",
                textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px",
              }}>
                Quantity
              </p>
              <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: "36px", height: "36px",
                    background: "rgba(255,255,255,0.97)",
                    border: "1px solid #E8EFF5",
                    borderRadius: "8px 0 0 8px",
                    color: "#C9A84C", fontSize: "18px",
                    cursor: "pointer", fontWeight: "700",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E3F2FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  −
                </button>
                <div style={{
                  width: "52px", height: "36px",
                  background: "rgba(255,255,255,0.97)",
                  border: "1px solid #E8EFF5",
                  borderLeft: "none", borderRight: "none",
                  display: "flex", alignItems: "center",
                  justifyContent: "center",
                  color: "#1A2332", fontWeight: "700", fontSize: "14px",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: "36px", height: "36px",
                    background: "rgba(255,255,255,0.97)",
                    border: "1px solid #E8EFF5",
                    borderRadius: "0 8px 8px 0",
                    color: "#C9A84C", fontSize: "18px",
                    cursor: "pointer", fontWeight: "700",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E3F2FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div style={{
              background: "rgba(201,168,76,0.05)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "10px", padding: "14px 16px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <p style={{
                  color: "#6B7C93", fontSize: "11px",
                  fontFamily: "'Outfit', sans-serif", marginBottom: "2px",
                }}>
                  {quantity} × KSh {product.price.toLocaleString()}
                  {product.delivery > 0 ? ` + KSh ${product.delivery} delivery` : " (Free delivery)"}
                </p>
                <p style={{
                  color: "#6B7C93", fontSize: "11px",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  Total Amount
                </p>
              </div>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "30px", color: "#C9A84C",
                letterSpacing: "1px",
              }}>
                KSh {total.toLocaleString()}
              </span>
            </div>

            {/* Enquiry Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={handleWhatsAppEnquiry}
                style={{
                  background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                  color: "#2C1810", border: "none",
                  borderRadius: "10px", padding: "14px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "14px",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  boxShadow: "0 4px 15px rgba(201,168,76,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(201,168,76,0.3)";
                }}
              >
                📱 Enquire via WhatsApp
              </button>

              <button
                onClick={handleEmailEnquiry}
                style={{
                  background: "rgba(255,255,255,0.97)",
                  color: "#C9A84C",
                  border: "2px solid #C9A84C",
                  borderRadius: "10px", padding: "12px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "14px",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C9A84C";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#C9A84C";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                ✉️ Enquire via Email
              </button>

              {/* Info Note */}
              <div style={{
                background: "#FFF8E1",
                border: "1px solid #FFE082",
                borderRadius: "8px", padding: "10px 14px",
                display: "flex", gap: "8px", alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "14px", flexShrink: 0 }}>ℹ️</span>
                <p style={{
                  color: "#F57F17", fontSize: "11px",
                  fontFamily: "'Outfit', sans-serif", lineHeight: "1.5",
                }}>
                  Click enquire to send your order details to Manuprints.
                  Our team will confirm availability, exact pricing and
                  payment method within a few hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentId={product.id} category={product.category} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

/* ── Related Products ── */
const RelatedProducts = ({ currentId, category }) => {
  const { products } = useAdmin();
  const related = products
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div style={{ marginTop: "36px" }}>
      <h3 style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "24px", letterSpacing: "2px",
        color: "#1A2332", marginBottom: "16px",
      }}>
        Related <span style={{ color: "#C9A84C" }}>Products</span>
      </h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
      }} className="related-grid">
        {related.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: "rgba(255,255,255,0.97)",
              borderRadius: "12px", overflow: "hidden",
              border: "1px solid #EEF2F7",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#EEF2F7";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                height: "140px",
                background: "rgba(255,255,255,0.97)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                borderBottom: "1px solid #EEF2F7",
              }}>
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "6px",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div style={{
                    fontSize: "32px", color: "#B0BEC5",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", width: "100%", height: "100%",
                  }}>
                    📷
                  </div>
                )}
              </div>
              <div style={{ padding: "12px" }}>
                <p style={{
                  color: "#1A2332", fontWeight: "700",
                  fontSize: "13px", marginBottom: "4px",
                  fontFamily: "'Outfit', sans-serif",
                  whiteSpace: "nowrap", overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {product.name}
                </p>
                <span style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "18px", color: "#C9A84C",
                }}>
                  KSh {product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .related-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
