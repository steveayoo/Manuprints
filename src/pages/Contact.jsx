import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  const services = [
    "Printing", "Branding", "Graphic Design",
    "3D Signages", "Fabrication", "Screen Printing", "Other",
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message.");
      return;
    }
    const msg = `Hello Manuprints!%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Service:* ${form.service}%0A%0A*Message:*%0A${form.message}`;
    window.open(`https://wa.me/254740643789?text=${msg}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "1px solid #E8EFF5",
    borderRadius: "10px",
    padding: "11px 16px",
    color: "#1A2332",
    fontSize: "13px",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      paddingTop: "70px",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        flex: 1,
        maxWidth: "1300px",
        margin: "0 auto",
        width: "100%",
        padding: "28px 5%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>

        {/* ── PAGE TITLE ── */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            color: "#C9A84C", fontSize: "11px", fontWeight: "700",
            letterSpacing: "3px", textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            Reach Out
          </p>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(28px, 4vw, 42px)",
            letterSpacing: "2px", color: "#1A2332", lineHeight: "1",
          }}>
            Get In <span style={{ color: "#C9A84C" }}>Touch</span>
          </h1>
        </div>

        {/* ── CONTACT INFO CARDS ROW ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
        }} className="contact-info-grid">
          {[
            {
              icon: "📱",
              label: "WhatsApp",
              value: "0740 643 789",
              link: "https://wa.me/254740643789",
              bg: "#E8F5E9",
              iconBg: "#4CAF50",
            },
            {
              icon: "📞",
              label: "Phone",
              value: "0711 499 798",
              link: "tel:0711499798",
              bg: "#E3F2FD",
              iconBg: "#2196F3",
            },
            {
              icon: "✉️",
              label: "Email",
              value: "elphasopiyo17@gmail.com",
              link: "mailto:elphasopiyo17@gmail.com",
              bg: "#FFF3E0",
              iconBg: "#FF9800",
            },
            {
              icon: "📍",
              label: "Location",
              value: "Nairobi, Kenya",
              link: null,
              bg: "#F3E5F5",
              iconBg: "#9C27B0",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid #EEF2F7",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.3s",
                cursor: item.link ? "pointer" : "default",
              }}
              onClick={() => item.link && window.open(item.link, "_blank")}
              onMouseEnter={(e) => {
                if (item.link) {
                  e.currentTarget.style.borderColor = "#C9A84C";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(201,168,76,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#EEF2F7";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "42px", height: "42px",
                borderRadius: "12px",
                background: item.bg,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: "20px", flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  color: "#6B7C93", fontSize: "10px",
                  fontWeight: "700", letterSpacing: "1px",
                  textTransform: "uppercase", marginBottom: "2px",
                }}>
                  {item.label}
                </p>
                <p style={{
                  color: "#C9A84C", fontSize: "12px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT: FORM + HOURS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "20px",
          flex: 1,
        }} className="contact-main-grid">

          {/* LEFT — Contact Form */}
          <div style={{
            background: "rgba(255,255,255,0.97)",
            borderRadius: "16px",
            padding: "28px",
            border: "1px solid #EEF2F7",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "24px", letterSpacing: "2px",
              color: "#1A2332", marginBottom: "20px",
            }}>
              Send A <span style={{ color: "#C9A84C" }}>Message</span>
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }} className="form-row">
              <div>
                <label style={{
                  color: "#6B7C93", fontSize: "11px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  display: "block", marginBottom: "6px",
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>
              <div>
                <label style={{
                  color: "#6B7C93", fontSize: "11px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  display: "block", marginBottom: "6px",
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }} className="form-row">
              <div>
                <label style={{
                  color: "#6B7C93", fontSize: "11px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  display: "block", marginBottom: "6px",
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="07XX XXX XXX"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                />
              </div>
              <div>
                <label style={{
                  color: "#6B7C93", fontSize: "11px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  display: "block", marginBottom: "6px",
                }}>
                  Service Needed
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{
                color: "#6B7C93", fontSize: "11px", fontWeight: "700",
                letterSpacing: "1px", textTransform: "uppercase",
                display: "block", marginBottom: "6px",
              }}>
                Your Message *
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your project, quantity needed, design details..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                onBlur={(e) => (e.target.style.borderColor = "#E8EFF5")}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  background: "#25D366",
                  color: "#2C1810", border: "none",
                  borderRadius: "10px", padding: "13px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  letterSpacing: "0.5px",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,211,102,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                📱 Send via WhatsApp
              </button>
              <button
                onClick={() => {
                  if (!form.name) { toast.error("Please enter your name."); return; }
                  window.location.href = `mailto:elphasopiyo17@gmail.com?subject=Enquiry from ${form.name}&body=${form.message}`;
                }}
                style={{
                  flex: 1,
                  background: "#C9A84C",
                  color: "#2C1810", border: "none",
                  borderRadius: "10px", padding: "13px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                ✉️ Send via Email
              </button>
            </div>
          </div>

          {/* RIGHT — Hours + Quick Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Business Hours */}
            <div style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid #EEF2F7",
              borderRadius: "16px", padding: "22px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "20px", letterSpacing: "2px",
                color: "#1A2332", marginBottom: "16px",
              }}>
                Business <span style={{ color: "#C9A84C" }}>Hours</span>
              </h3>
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM", open: true },
                { day: "Saturday", hours: "9:00 AM – 4:00 PM", open: true },
                { day: "Sunday", hours: "Closed", open: false },
              ].map((h) => (
                <div key={h.day} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #F0F4F8",
                }}>
                  <span style={{
                    color: "#4A6080", fontSize: "13px",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {h.day}
                  </span>
                  <span style={{
                    color: h.open ? "#C9A84C" : "#EF4444",
                    fontSize: "12px", fontWeight: "700",
                    fontFamily: "'Outfit', sans-serif",
                    background: h.open ? "rgba(201,168,76,0.08)" : "rgba(239,68,68,0.08)",
                    padding: "3px 10px", borderRadius: "20px",
                  }}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Contact Buttons */}
            <div style={{
              background: "linear-gradient(135deg, #C9A84C, #C9A84C)",
              borderRadius: "16px", padding: "22px",
              textAlign: "center",
            }}>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "20px", letterSpacing: "2px",
                color: "#2C1810", marginBottom: "6px",
              }}>
                Need Help Now?
              </h3>
              <p style={{
                color: "#2C1810",
                fontSize: "12px", lineHeight: "1.5",
                fontFamily: "'Outfit', sans-serif", marginBottom: "16px",
              }}>
                Chat with us directly for instant support
              </p>
              <button
                onClick={() => window.open("https://wa.me/254740643789", "_blank")}
                style={{
                  background: "#25D366", color: "#2C1810",
                  border: "none", borderRadius: "50px",
                  padding: "11px 24px", width: "100%",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", marginBottom: "10px",
                  transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                📱 WhatsApp Now
              </button>
              <button
                onClick={() => window.location.href = "tel:0711499798"}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#2C1810",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "50px", padding: "11px 24px",
                  width: "100%",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", transition: "all 0.3s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
              >
                📞 Call Us Now
              </button>
            </div>

            {/* Services Quick List */}
            <div style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid #EEF2F7",
              borderRadius: "16px", padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "18px", letterSpacing: "2px",
                color: "#1A2332", marginBottom: "12px",
              }}>
                Our <span style={{ color: "#C9A84C" }}>Services</span>
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}>
                {["Printing", "Branding", "Design", "3D Signages", "Fabrication", "Screen Print"].map((s) => (
                  <div key={s} style={{
                    display: "flex", alignItems: "center",
                    gap: "6px",
                  }}>
                    <div style={{
                      width: "6px", height: "6px",
                      borderRadius: "50%", background: "#C9A84C",
                      flexShrink: 0,
                    }} />
                    <span style={{
                      color: "#4A6080", fontSize: "12px",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: "500",
                    }}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-info-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .contact-info-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
