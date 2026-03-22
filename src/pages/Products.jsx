import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const ITEMS_PER_PAGE = 9;
const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.85)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

const categories = ["All", "T-Shirts", "Hoodies", "Caps", "3D Signages", "Corporate Branding", "Promotional"];

const Products = () => {
  const { products } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div style={{
      minHeight: "100vh",
      paddingTop: "68px",
      fontFamily: "'Outfit', sans-serif",
    }}>

      {/* PAGE HEADER */}
      <div style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${CARD_BORDER}`,
        padding: "28px 5%",
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <p style={{
              color: GOLD, fontSize: "11px", fontWeight: "700",
              letterSpacing: "3px", textTransform: "uppercase",
              marginBottom: "4px",
            }}>
              Our Collection
            </p>
            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "2px", color: DARK, lineHeight: "1",
            }}>
              All <span style={{ color: GOLD }}>Products</span>
            </h1>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: "14px", top: "50%",
              transform: "translateY(-50%)", fontSize: "14px", color: LIGHT,
            }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "50px",
                padding: "10px 18px 10px 40px",
                color: DARK, fontSize: "13px",
                fontFamily: "'Outfit', sans-serif",
                outline: "none", width: "260px",
                transition: "all 0.3s",
                boxShadow: "0 2px 8px rgba(139,105,20,0.08)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = GOLD;
                e.target.style.boxShadow = `0 0 0 3px rgba(139,105,20,0.1)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = CARD_BORDER;
                e.target.style.boxShadow = "0 2px 8px rgba(139,105,20,0.08)";
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 5%" }}>

        {/* CATEGORY FILTER */}
        <div style={{
          display: "flex", gap: "8px",
          flexWrap: "wrap", marginBottom: "24px", alignItems: "center",
        }}>
          <span style={{
            color: MID, fontSize: "11px", fontWeight: "700",
            letterSpacing: "1px", textTransform: "uppercase", marginRight: "4px",
          }}>
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                background: activeCategory === cat
                  ? `linear-gradient(135deg, ${GOLD}, #6B5010)`
                  : CARD_BG,
                color: activeCategory === cat ? "white" : DARK,
                border: `1px solid ${activeCategory === cat ? "transparent" : CARD_BORDER}`,
                borderRadius: "50px", padding: "7px 18px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "600", fontSize: "12px",
                cursor: "pointer", transition: "all 0.25s",
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

        {/* Results Count */}
        <p style={{ color: MID, fontSize: "13px", marginBottom: "20px" }}>
          Showing{" "}
          <strong style={{ color: DARK }}>
            {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
          </strong>{" "}
          of <strong style={{ color: GOLD }}>{filtered.length}</strong> products
        </p>

        {/* PRODUCT GRID */}
        {paginated.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 0",
            background: CARD_BG,
            borderRadius: "20px", border: `1px solid ${CARD_BORDER}`,
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "28px",
              color: DARK, letterSpacing: "2px", marginBottom: "8px",
            }}>
              No Products Found
            </h3>
            <p style={{ color: MID, fontSize: "14px" }}>
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px", marginBottom: "36px",
          }} className="product-grid">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "8px", paddingTop: "8px",
          }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                background: currentPage === 1 ? "rgba(139,105,20,0.05)" : CARD_BG,
                color: currentPage === 1 ? LIGHT : DARK,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "8px", padding: "9px 18px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "600", fontSize: "13px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.color = GOLD;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.color = DARK;
                }
              }}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  background: currentPage === page
                    ? `linear-gradient(135deg, ${GOLD}, #6B5010)`
                    : CARD_BG,
                  color: currentPage === page ? "white" : DARK,
                  border: `1px solid ${currentPage === page ? "transparent" : CARD_BORDER}`,
                  borderRadius: "8px",
                  width: "38px", height: "38px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", transition: "all 0.25s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: currentPage === page
                    ? `0 4px 15px rgba(139,105,20,0.4)` : "none",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.color = GOLD;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.borderColor = CARD_BORDER;
                    e.currentTarget.style.color = DARK;
                  }
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                background: currentPage === totalPages ? "rgba(139,105,20,0.05)" : CARD_BG,
                color: currentPage === totalPages ? LIGHT : DARK,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "8px", padding: "9px 18px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "600", fontSize: "13px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.color = GOLD;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.color = DARK;
                }
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const tagColors = [GOLD, "#A0892A", "#C49A3C", "#8B6914", "#6B5010", "#C9A84C"];
  const color = tagColors[Math.abs(product.id) % tagColors.length] || GOLD;

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => { setHovered(true); if (product.images.length > 1) setImgIndex(1); }}
        onMouseLeave={() => { setHovered(false); setImgIndex(0); }}
        style={{
          background: "white",
          borderRadius: "16px", overflow: "hidden",
          border: `2px solid ${hovered ? color : "transparent"}`,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.15)`
            : "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        {/* Image */}
        <div style={{
          position: "relative", height: "200px",
          background: "#FDF8F0",
          display: "flex", alignItems: "center",
          justifyContent: "center", padding: "8px",
          overflow: "hidden",
        }}>
          {product.images && product.images[imgIndex] ? (
            <img
              src={product.images[imgIndex]}
              alt={product.name}
              style={{
                maxWidth: "100%", maxHeight: "100%",
                objectFit: "contain",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.07)" : "scale(1)",
              }}
              loading="lazy"
            />
          ) : (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              color: LIGHT, width: "100%", height: "100%",
            }}>
              <div style={{ fontSize: "36px", marginBottom: "6px", opacity: 0.3 }}>📷</div>
              <p style={{ fontSize: "11px", fontFamily: "'Outfit', sans-serif", color: LIGHT }}>
                No photo yet
              </p>
            </div>
          )}

          {/* Category Badge */}
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            background: color,
            borderRadius: "20px", padding: "3px 10px",
            boxShadow: `0 2px 8px ${color}50`,
          }}>
            <span style={{
              color: "white", fontSize: "9px", fontWeight: "700",
              letterSpacing: "1px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              {product.category}
            </span>
          </div>

          {/* Image dots */}
          {product.images && product.images.length > 1 && (
            <div style={{
              position: "absolute", bottom: "8px", right: "8px",
              display: "flex", gap: "3px",
            }}>
              {product.images.map((_, i) => (
                <div key={i} style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: i === imgIndex ? GOLD : "rgba(139,105,20,0.3)",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          {hovered && (
            <div style={{
              position: "absolute", inset: 0,
              background: `${color}12`,
              display: "flex", alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{
                background: color, color: "white",
                padding: "9px 22px", borderRadius: "50px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700", fontSize: "12px",
                boxShadow: `0 4px 15px ${color}50`,
              }}>
                View Product
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px", fontWeight: "700",
            color: DARK, marginBottom: "4px",
            whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {product.name}
          </h3>

          {product.sizes && product.sizes[0] !== "Custom" && (
            <div style={{
              display: "flex", gap: "4px",
              flexWrap: "wrap", marginBottom: "10px",
            }}>
              {product.sizes.slice(0, 4).map((size) => (
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
              {product.sizes.length > 4 && (
                <span style={{ color: GOLD, fontSize: "9px", fontWeight: "600", fontFamily: "'Outfit', sans-serif" }}>
                  +{product.sizes.length - 4}
                </span>
              )}
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
              background: hovered ? color : "rgba(139,105,20,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
              boxShadow: hovered ? `0 4px 12px ${color}50` : "none",
            }}>
              <span style={{
                color: hovered ? "white" : GOLD,
                fontSize: "14px", fontWeight: "700",
                transition: "color 0.3s",
              }}>
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Products;
