// ================================================
// LANDING PAGE — Full width responsive layout
// ================================================

import { motion } from "framer-motion";
import { Edit3, Eye, Download, Zap, Sparkles, LayoutTemplate } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";

const COLORS = {
  bg: "#0a0a0b",
  card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(99,179,237,0.35)",
  accent: "#3B82F6",
  accentLime: "#84cc16",
  accentGlow: "rgba(59,130,246,0.25)",
  text: "#e8e8f0",
  muted: "#6b7280",
  white: "#ffffff",
};

export default function LandingPage({ setPage }) {
  const titles = [
    "Product Designer",
    "Software Engineer",
    "Marketing Manager",
    "Data Scientist",
    "UX Researcher",
    "Full Stack Developer",
    "Creative Director",
  ];
  const typed = useTypewriter(titles);

  const features = [
    { icon: <Zap size={20} />,           title: "Live Preview",        desc: "See your resume update in real-time as you type." },
    { icon: <LayoutTemplate size={20} />, title: "6 Premium Templates", desc: "Minimalist, Creative, Executive and more." },
    { icon: <Download size={20} />,       title: "1-Click PDF Export",  desc: "Download a pixel-perfect A4 PDF instantly." },
    { icon: <Sparkles size={20} />,       title: "Auto-Fill Mode",      desc: "Populate with sample data to preview templates." },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: COLORS.bg,
      paddingTop: 64,
      overflowX: "hidden",
    }}>

      {/* ── Grid background ── */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Glow blobs ── */}
      <div style={{
        position: "fixed", top: "20%", left: "10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", top: "50%", right: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Main content ── */}
      <div style={{
        width: "100%",
        maxWidth: "100vw",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── HERO SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            padding: "100px 24px 80px",
            width: "100%",
          }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: 100, padding: "6px 18px", marginBottom: 36,
          }}>
            <Sparkles size={13} color={COLORS.accent} />
            <span style={{
              fontSize: 12, color: COLORS.accent,
              fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              Premium Resume Builder
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Lexend', sans-serif",
            fontSize: "clamp(40px, 8vw, 96px)",
            fontWeight: 900, lineHeight: 1.0,
            color: COLORS.white,
            margin: "0 auto 20px",
            letterSpacing: "-3px",
            maxWidth: 900,
          }}>
            The Resume That<br />
            <span style={{ color: COLORS.accent }}>
              Gets You Hired
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{
            fontSize: "clamp(18px, 3vw, 28px)",
            color: COLORS.muted,
            marginBottom: 52,
            fontWeight: 300,
          }}>
            Built for{" "}
            <span style={{
              color: COLORS.accentLime,
              fontWeight: 700,
              fontFamily: "monospace",
            }}>
              {typed}
              <span style={{ animation: "blink 1s infinite" }}>|</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: "flex", gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0 24px",
          }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPage("editor")}
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
                border: "none", color: "#fff",
                padding: "16px 40px", borderRadius: 14,
                cursor: "pointer", fontSize: 17, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 0 40px rgba(59,130,246,0.35)",
              }}>
              <Edit3 size={19} /> Start Building Free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPage("templates")}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "16px 40px", borderRadius: 14,
                cursor: "pointer", fontSize: 17, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 10,
              }}>
              <Eye size={19} /> View Templates
            </motion.button>
          </div>
        </motion.div>

        {/* ── FLOATING RESUME MOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 24px",
            marginBottom: 100,
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
            {/* Glow under card */}
            <div style={{
              position: "absolute", bottom: -30,
              left: "50%", transform: "translateX(-50%)",
              width: "70%", height: 60,
              background: `radial-gradient(ellipse, ${COLORS.accentGlow} 0%, transparent 70%)`,
              filter: "blur(20px)",
            }} />

            {/* Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                width: "100%",
                background: "#1a1a2e",
                borderRadius: 20,
                border: "1px solid rgba(59,130,246,0.2)",
                padding: "28px 32px",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                transform: "perspective(1000px) rotateX(2deg)",
                position: "relative",
              }}
            >
              {/* Header strip */}
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 18,
                marginBottom: 22, paddingBottom: 22,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 14, background: "rgba(255,255,255,0.15)", borderRadius: 4, width: "65%", marginBottom: 10 }} />
                  <div style={{ height: 10, background: "rgba(59,130,246,0.4)", borderRadius: 4, width: "42%", marginBottom: 8 }} />
                  <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, width: "85%" }} />
                </div>
              </div>

              {/* Skeleton lines */}
              {[100, 85, 92, 70, 60, 95, 78].map((w, i) => (
                <div key={i} style={{
                  height: 8, borderRadius: 4, marginBottom: 10,
                  background: i % 3 === 0
                    ? "rgba(59,130,246,0.18)"
                    : "rgba(255,255,255,0.06)",
                  width: `${w}%`,
                }} />
              ))}

              {/* Skill tags */}
              <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Figma", "React", "UX Research", "Prototyping"].map((s) => (
                  <div key={s} style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 7, padding: "5px 12px",
                    fontSize: 11, color: COLORS.accent, fontWeight: 600,
                  }}>
                    {s}
                  </div>
                ))}
              </div>

              {/* Live badge */}
              <div style={{
                position: "absolute", top: -14, right: 24,
                background: "#10b981", borderRadius: 20,
                padding: "5px 14px", fontSize: 11,
                fontWeight: 700, color: "#fff",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 4px 12px rgba(16,185,129,0.4)",
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#fff",
                  animation: "pulse 1.5s infinite",
                }} />
                LIVE PREVIEW
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── FEATURES GRID ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: "0 24px 100px" }}
        >
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800, color: COLORS.white,
            marginBottom: 16,
            fontFamily: "'Lexend', sans-serif",
            letterSpacing: "-1px",
          }}>
            Everything You Need to Stand Out
          </h2>
          <p style={{
            textAlign: "center",
            color: COLORS.muted,
            fontSize: 17, marginBottom: 52,
          }}>
            Professional tools to build a resume that gets callbacks.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            maxWidth: 1100,
            margin: "0 auto",
          }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 18, padding: 30,
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.accent, marginBottom: 18,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize: 17, fontWeight: 700,
                  color: COLORS.white, marginBottom: 10,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: 14, color: COLORS.muted, lineHeight: 1.7,
                }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(59,130,246,0.06)",
            borderTop: "1px solid rgba(59,130,246,0.15)",
            borderBottom: "1px solid rgba(59,130,246,0.15)",
            padding: "40px 24px",
            marginBottom: 0,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 60,
            maxWidth: 800,
            margin: "0 auto",
          }}>
            {[
              { num: "6",     label: "Premium Templates" },
              { num: "100%",  label: "ATS Optimized" },
              { num: "A4",    label: "Perfect PDF Export" },
              { num: "Free",  label: "No Sign-up Needed" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "clamp(28px, 5vw, 42px)",
                  fontWeight: 900, color: COLORS.accent,
                  fontFamily: "'Lexend', sans-serif",
                  letterSpacing: "-1px",
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: 13, color: COLORS.muted,
                  fontWeight: 500, marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.6)} }
      `}</style>
    </div>
  );
}