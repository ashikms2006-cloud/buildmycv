// ================================================
// NAVBAR — Fixed top navigation bar
// ================================================

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Navbar({ page, setPage }) {
  const links = [
    { label: "Templates", p: "templates" },
    { label: "Editor",    p: "editor" },
  ];

  return (
    <nav style={{
      background: "rgba(10,10,11,0.92)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      width: "100%",
    }}>
      <div style={{
        width: "100%",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        boxSizing: "border-box",
      }}>

        {/* ── Logo ── */}
        <button
          onClick={() => setPage("landing")}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "none", border: "none", cursor: "pointer",
            flexShrink: 0,
          }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg, #3B82F6, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FileText size={17} color="#fff" />
          </div>
          <span style={{
            fontFamily: "'Lexend', sans-serif",
            fontWeight: 800, fontSize: 19,
            color: "#fff", letterSpacing: "-0.5px",
          }}>
            Build<span style={{ color: "#3B82F6" }}>My</span>CV
          </span>
        </button>

        {/* ── Nav Links + CTA ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          {links.map((l) => (
            <button
              key={l.p}
              onClick={() => setPage(l.p)}
              style={{
                background: page === l.p
                  ? "rgba(59,130,246,0.12)"
                  : "none",
                border: page === l.p
                  ? "1px solid rgba(59,130,246,0.3)"
                  : "1px solid transparent",
                color: page === l.p ? "#3B82F6" : "#6b7280",
                padding: "8px 18px", borderRadius: 8,
                cursor: "pointer", fontSize: 14, fontWeight: 500,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}>
              {l.label}
            </button>
          ))}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage("editor")}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #6366f1)",
              border: "none", color: "#fff",
              padding: "9px 22px", borderRadius: 9,
              cursor: "pointer", fontSize: 14, fontWeight: 700,
              marginLeft: 6, whiteSpace: "nowrap",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}>
            Build Resume →
          </motion.button>
        </div>
      </div>
    </nav>
  );
}