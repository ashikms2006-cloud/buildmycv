// ================================================
// NAVBAR — With undo/redo buttons
// ================================================

import { motion } from "framer-motion";
import { FileText, Undo2, Redo2 } from "lucide-react";

export default function Navbar({
  page, setPage,
  canUndo, canRedo, onUndo, onRedo,
}) {
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
      width: "100vw", zIndex: 1000,
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        height: 64, paddingLeft: 32, paddingRight: 32,
        width: "100%", boxSizing: "border-box",
      }}>

        {/* Logo */}
        <button onClick={() => setPage("landing")} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "none", border: "none",
          cursor: "pointer", flexShrink: 0,
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

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

          {/* Undo / Redo — only show on editor */}
          {page === "editor" && (
            <div style={{
              display: "flex", gap: 4,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8, padding: "4px 6px",
              marginRight: 6,
            }}>
              <button
                onClick={onUndo} disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                style={{
                  background: "none", border: "none",
                  color: canUndo ? "#e8e8f0" : "rgba(255,255,255,0.2)",
                  cursor: canUndo ? "pointer" : "not-allowed",
                  padding: "4px 8px", borderRadius: 6,
                  display: "flex", alignItems: "center",
                  transition: "color 0.2s",
                }}>
                <Undo2 size={15} />
              </button>
              <button
                onClick={onRedo} disabled={!canRedo}
                title="Redo (Ctrl+Y)"
                style={{
                  background: "none", border: "none",
                  color: canRedo ? "#e8e8f0" : "rgba(255,255,255,0.2)",
                  cursor: canRedo ? "pointer" : "not-allowed",
                  padding: "4px 8px", borderRadius: 6,
                  display: "flex", alignItems: "center",
                  transition: "color 0.2s",
                }}>
                <Redo2 size={15} />
              </button>
            </div>
          )}

          {/* Nav links */}
          {links.map((l) => (
            <button key={l.p} onClick={() => setPage(l.p)} style={{
              background: page === l.p ? "rgba(59,130,246,0.12)" : "none",
              border: page === l.p ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
              color: page === l.p ? "#3B82F6" : "#6b7280",
              padding: "8px 18px", borderRadius: 8,
              cursor: "pointer", fontSize: 14, fontWeight: 500,
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>
              {l.label}
            </button>
          ))}

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage("editor")}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #6366f1)",
              border: "none", color: "#fff",
              padding: "9px 22px", borderRadius: 9,
              cursor: "pointer", fontSize: 14, fontWeight: 700,
              marginLeft: 4, whiteSpace: "nowrap",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}>
            Build Resume →
          </motion.button>
        </div>
      </div>
    </nav>
  );
}