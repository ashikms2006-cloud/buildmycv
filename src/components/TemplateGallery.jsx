// ================================================
// TEMPLATE GALLERY — All 7 templates
// ================================================

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const COLORS = {
  bg: "#0a0a0b", card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6", accentLime: "#84cc16",
  muted: "#6b7280", white: "#ffffff",
};

function TemplateMiniPreview({ type, accent }) {
  const container = {
    width: "100%", maxWidth: 200,
    background: "#fff", borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    fontSize: 0, lineHeight: 0,
  };

  if (type === "minimalist") return (
    <div style={{ ...container, padding: 14 }}>
      <div style={{ height: 20, background: "#111", borderRadius: 3, width: "70%", marginBottom: 6 }} />
      <div style={{ height: 8, background: accent, borderRadius: 2, width: "45%", marginBottom: 10 }} />
      <div style={{ height: 1, background: "#e5e7eb", marginBottom: 10 }} />
      {[100, 80, 90, 70].map((w, i) => (
        <div key={i} style={{ height: 5, background: "#d1d5db", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />
      ))}
      <div style={{ height: 8, background: "#111", borderRadius: 2, width: "50%", marginTop: 10, marginBottom: 6 }} />
      {[85, 75, 90].map((w, i) => (
        <div key={i} style={{ height: 5, background: "#e5e7eb", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />
      ))}
    </div>
  );

  if (type === "creative") return (
    <div style={{ ...container, display: "flex" }}>
      <div style={{ width: "38%", background: "#1e3a5f", padding: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.2)", margin: "0 auto 8px" }} />
        {[60, 80, 50, 70].map((w, i) => (
          <div key={i} style={{ height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />
        ))}
        <div style={{ height: 6, background: "rgba(255,255,255,0.5)", borderRadius: 2, width: "80%", marginTop: 8, marginBottom: 5 }} />
        {[70, 90, 60].map((w, i) => (
          <div key={i} style={{ height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ height: 10, background: "#111", borderRadius: 2, width: "80%", marginBottom: 5 }} />
        <div style={{ height: 5, background: accent, borderRadius: 2, width: "60%", marginBottom: 8 }} />
        {[90, 80, 95, 70, 85].map((w, i) => (
          <div key={i} style={{ height: 4, background: "#d1d5db", borderRadius: 2, width: `${w}%`, marginBottom: 4 }} />
        ))}
      </div>
    </div>
  );

  if (type === "executive") return (
    <div style={{ ...container, padding: 12 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ height: 12, background: "#111", borderRadius: 2, width: "60%", margin: "0 auto 4px" }} />
        <div style={{ height: 6, background: "#888", borderRadius: 2, width: "50%", margin: "0 auto 4px" }} />
        <div style={{ height: 4, background: "#ccc", borderRadius: 2, width: "80%", margin: "0 auto" }} />
      </div>
      <div style={{ height: 2, background: accent, marginBottom: 8 }} />
      <div style={{ height: 7, background: "#333", borderRadius: 2, width: "40%", marginBottom: 5 }} />
      {[100, 95, 90, 100, 95, 88].map((w, i) => (
        <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 2, width: `${w}%`, marginBottom: 4 }} />
      ))}
    </div>
  );

  if (type === "corporate") return (
    <div style={{ ...container }}>
      <div style={{ background: "#1e3a5f", padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#2d5a8e", flexShrink: 0 }} />
          <div>
            <div style={{ height: 8, background: "#fff", borderRadius: 2, width: 70, marginBottom: 4 }} />
            <div style={{ height: 5, background: "#93c5fd", borderRadius: 2, width: 50 }} />
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.15)", marginTop: 6 }} />
        <div style={{ height: 4, background: "rgba(191,219,254,0.5)", borderRadius: 2, width: "80%", marginTop: 5 }} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "8px 10px" }}>
          <div style={{ height: 5, background: "#1e3a5f", borderRadius: 2, width: "40%", marginBottom: 6 }} />
          {[100, 85, 90, 75].map((w, i) => (
            <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 2, width: `${w}%`, marginBottom: 4 }} />
          ))}
        </div>
        <div style={{ width: "35%", background: "#f8fafc", padding: "8px 8px", borderLeft: "1px solid #e2e8f0" }}>
          {[80, 95, 70, 85, 60].map((w, i) => (
            <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ height: 3, background: "#e2e8f0", borderRadius: 2, marginBottom: 2 }}>
                <div style={{ height: "100%", background: "#1e3a5f", borderRadius: 2, width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (type === "academic") return (
    <div style={{ ...container, padding: 12 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${accent}20`, border: `2px solid ${accent}`, margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />
        </div>
        <div style={{ height: 10, background: "#111", borderRadius: 2, width: "60%", margin: "0 auto 4px" }} />
        <div style={{ height: 6, background: accent, borderRadius: 2, width: "45%", margin: "0 auto 4px" }} />
        <div style={{ height: 4, background: "#ccc", borderRadius: 2, width: "75%", margin: "0 auto" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>
      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 8 }}>
        {[90, 80, 95, 70].map((w, i) => (
          <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />
        ))}
      </div>
    </div>
  );

  if (type === "creativearts") return (
    <div style={{ ...container }}>
      <div style={{ height: 5, background: "linear-gradient(90deg, #7c3aed, #ec4899, #f97316, #0d9488)" }} />
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #7c3aed, #ec4899)", flexShrink: 0 }} />
          <div>
            <div style={{ height: 8, background: "linear-gradient(90deg, #7c3aed, #ec4899)", borderRadius: 2, width: 70, marginBottom: 3 }} />
            <div style={{ height: 5, background: "#f97316", borderRadius: 2, width: 50 }} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
          {["#7c3aed", "#ec4899", "#f97316"].map((c, i) => (
            <div key={i} style={{ height: 14, background: `${c}20`, border: `1px solid ${c}40`, borderRadius: 10, width: 40 }} />
          ))}
        </div>
        {[100, 85, 90].map((w, i) => (
          <div key={i} style={{ height: 4, background: "#f3f4f6", borderRadius: 2, width: `${w}%`, marginBottom: 4, borderLeft: `3px solid ${["#7c3aed", "#ec4899", "#f97316"][i]}` }} />
        ))}
      </div>
      <div style={{ height: 4, background: "linear-gradient(90deg, #0d9488, #f97316, #ec4899, #7c3aed)" }} />
    </div>
  );

  if (type === "professionalcv") return (
    <div style={{ ...container }}>
      {/* Gold top bar */}
      <div style={{ height: 5, background: "linear-gradient(90deg, #b8860b, #d4a843, #b8860b)" }} />
      {/* Black header */}
      <div style={{ background: "#0a0a0a", padding: "10px 12px" }}>
        <div style={{ height: 12, background: "#fff", borderRadius: 2, width: "55%", marginBottom: 5 }} />
        <div style={{ height: 7, background: "#b8860b", borderRadius: 2, width: "40%" }} />
      </div>
      {/* Two column body */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: "30%", background: "#faf9f7", borderRight: "1px solid #e8e2d4", padding: "8px 8px" }}>
          <div style={{ height: 4, background: "#b8860b", width: 20, borderRadius: 1, marginBottom: 6 }} />
          {[70, 90, 60, 80].map((w, i) => (
            <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ height: 3, background: "#e8e8e8", borderRadius: 1, marginBottom: 2 }}>
                <div style={{ height: "100%", background: "#b8860b", borderRadius: 1, width: `${w}%` }} />
              </div>
            </div>
          ))}
          <div style={{ height: 4, background: "#b8860b", width: 20, borderRadius: 1, marginBottom: 6, marginTop: 8 }} />
          {[85, 70, 95].map((w, i) => (
            <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 1, width: `${w}%`, marginBottom: 4 }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: "8px 10px" }}>
          <div style={{ height: 4, background: "#b8860b", width: 24, borderRadius: 1, marginBottom: 6 }} />
          {[100, 85, 90, 75, 88, 70, 95, 80].map((w, i) => (
            <div key={i} style={{ height: 4, background: i % 4 === 0 ? "#1a1a1a" : "#e5e7eb", borderRadius: 1, width: `${w}%`, marginBottom: 4 }} />
          ))}
          <div style={{ height: 4, background: "#b8860b", width: 24, borderRadius: 1, marginBottom: 6, marginTop: 8 }} />
          {[90, 75, 85, 60].map((w, i) => (
            <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 1, width: `${w}%`, marginBottom: 4 }} />
          ))}
        </div>
      </div>
      {/* Footer */}
      <div style={{ background: "#faf9f7", borderTop: "1px solid #e8e2d4", padding: "4px 10px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ height: 3, background: "#d1d5db", borderRadius: 1, width: "40%" }} />
        <div style={{ height: 3, background: "#d1d5db", borderRadius: 1, width: "30%" }} />
      </div>
    </div>
  );

  return null;
}

export default function TemplateGallery({ setPage, selectedTemplate, setSelectedTemplate }) {
  const templates = [
    {
      id: "minimalist",
      name: "The Minimalist",
      desc: "Clean whitespace, bold headings, timeless clarity.",
      tags: ["Clean", "Modern", "ATS-Friendly"],
      accent: COLORS.accent,
    },
    {
      id: "creative",
      name: "The Creative",
      desc: "Two-column sidebar layout for maximum visual impact.",
      tags: ["Bold", "Two-column", "Design-forward"],
      accent: COLORS.accentLime,
    },
    {
      id: "executive",
      name: "The Executive",
      desc: "Traditional, high-density, elegant for senior roles.",
      tags: ["Professional", "Dense", "Classic"],
      accent: "#f59e0b",
    },
    {
      id: "corporate",
      name: "The Corporate",
      desc: "Formal business layout with navy blue header bar.",
      tags: ["Formal", "Business", "Navy"],
      accent: "#1e3a5f",
    },
    {
      id: "academic",
      name: "The Academic",
      desc: "Research and professor style with elegant structure.",
      tags: ["Research", "Professor", "Formal"],
      accent: "#7c3aed",
    },
    {
      id: "creativearts",
      name: "Creative Arts",
      desc: "Colorful bold design for creative professionals.",
      tags: ["Colorful", "Bold", "Creative"],
      accent: "#ec4899",
    },
    {
      id: "professionalcv",
      name: "⭐ Professional CV",
      desc: "Premium multi-page CV for senior, executive and high-level positions. Gold accents, sidebar layout, projects, awards and references.",
      tags: ["Executive", "Multi-page", "Premium"],
      accent: "#b8860b",
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      paddingTop: 100,
      paddingBottom: 80,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            textAlign: "center", color: COLORS.accent,
            fontWeight: 600, fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12,
          }}>
            Templates
          </p>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, color: COLORS.white,
            marginBottom: 16,
            fontFamily: "'Lexend', sans-serif",
            letterSpacing: "-1.5px",
          }}>
            Choose Your Style
          </h2>
          <p style={{
            textAlign: "center", color: COLORS.muted,
            fontSize: 17, marginBottom: 60,
          }}>
            Seven distinctive designs — all export-ready and ATS-optimized.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => { setSelectedTemplate(t.id); setPage("editor"); }}
              style={{
                background: t.id === "professionalcv"
                  ? "linear-gradient(135deg, #16161a, #1a1505)"
                  : COLORS.card,
                border: `2px solid ${selectedTemplate === t.id
                  ? t.accent
                  : t.id === "professionalcv"
                    ? "rgba(184,134,11,0.3)"
                    : COLORS.border}`,
                borderRadius: 20, overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: selectedTemplate === t.id
                  ? `0 0 24px ${t.accent}40`
                  : t.id === "professionalcv"
                    ? "0 0 24px rgba(184,134,11,0.15)"
                    : "none",
              }}
            >
              {/* Premium badge for Pro CV */}
              {t.id === "professionalcv" && (
                <div style={{
                  background: "linear-gradient(90deg, #b8860b, #d4a843)",
                  padding: "6px 16px",
                  fontSize: 11, fontWeight: 800,
                  color: "#fff", letterSpacing: "0.08em",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}>
                  ⭐ Premium Multi-Page CV Template
                </div>
              )}

              {/* Preview */}
              <div style={{
                background: t.id === "professionalcv" ? "#0d0c07" : "#0d0d10",
                height: 220,
                display: "flex", alignItems: "center",
                justifyContent: "center", padding: 20,
                position: "relative",
              }}>
                <TemplateMiniPreview type={t.id} accent={t.accent} />
                {selectedTemplate === t.id && (
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: t.accent, borderRadius: 20,
                    padding: "4px 12px", fontSize: 11,
                    fontWeight: 700, color: "#fff",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <Check size={11} /> Selected
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: 22 }}>
                <h3 style={{
                  fontSize: 17, fontWeight: 800,
                  color: COLORS.white, marginBottom: 6,
                  fontFamily: "'Lexend', sans-serif",
                }}>
                  {t.name}
                </h3>
                <p style={{
                  fontSize: 13, color: COLORS.muted,
                  lineHeight: 1.6, marginBottom: 14,
                }}>
                  {t.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {t.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 600,
                      color: t.accent,
                      background: `${t.accent}18`,
                      border: `1px solid ${t.accent}30`,
                      borderRadius: 6, padding: "3px 10px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}