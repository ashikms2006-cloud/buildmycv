// ================================================
// LANDING PAGE — Fixed, full upgraded
// ================================================

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Edit3, Eye, Download, Zap, Sparkles, LayoutTemplate, CheckCircle } from "lucide-react";

const COLORS = {
  bg: "#0a0a0b", card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6", accentLime: "#84cc16",
  muted: "#6b7280", white: "#ffffff",
};

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer @ Google",
    avatar: "PS", color: "#3B82F6",
    text: "I landed my dream job at Google after using BuildMyCV. The ATS scorer told me exactly what was missing. Got 3 callbacks in the first week!",
  },
  {
    name: "James Okafor",
    role: "Product Manager @ Stripe",
    avatar: "JO", color: "#10b981",
    text: "The Job Description Matcher is genius. I tailored my resume to each application and my response rate went from 5% to 40%. Incredible tool.",
  },
  {
    name: "Sofia Mendes",
    role: "UX Designer @ Figma",
    avatar: "SM", color: "#ec4899",
    text: "The Creative Arts template is stunning. I got compliments from every recruiter about how my resume looked. Highly recommend for designers.",
  },
  {
    name: "Rahul Nair",
    role: "Data Scientist @ Meta",
    avatar: "RN", color: "#f97316",
    text: "Built my entire resume in under 20 minutes. The live preview and PDF export are flawless. This is the best free resume builder I've used.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose a Template", desc: "Pick from 7 professionally designed templates for every industry and seniority level.", icon: "🎨" },
  { step: "02", title: "Fill Your Details",  desc: "Use the smart form with live validation, auto-fill, photo upload and LinkedIn import.", icon: "✍️" },
  { step: "03", title: "Match the Job",      desc: "Paste a job description into our JD Matcher and see your match score instantly.", icon: "🎯" },
  { step: "04", title: "Download PDF",       desc: "Export a perfect A4 PDF with one click. Multi-page, crisp and print-ready.", icon: "📄" },
];

const FEATURES = [
  { icon: <Zap size={20} />,            title: "Live Preview",        desc: "See your resume update in real-time as you type." },
  { icon: <LayoutTemplate size={20} />, title: "7 Premium Templates", desc: "Professional designs for every industry." },
  { icon: <Download size={20} />,       title: "A4 PDF Export",       desc: "Pixel-perfect multi-page PDF output." },
  { icon: <Sparkles size={20} />,       title: "ATS Score Checker",   desc: "Know if your resume will pass the bots." },
];

// ── Built-in typewriter (no external hook) ──
function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    setText(words[wordIdx % words.length].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return text;
}

// ── Star component (no lucide-react Star needed) ──
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function LandingPage({ setPage }) {
  const titles = [
    "Product Designer", "Software Engineer",
    "Marketing Manager", "Data Scientist",
    "UX Researcher", "Full Stack Developer",
    "Creative Director", "Project Manager",
  ];
  const typed = useTypewriter(titles);

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      background: COLORS.bg, paddingTop: 64,
      overflowX: "hidden",
    }}>

      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Glow blobs */}
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

      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", padding: "100px 24px 80px" }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: 100, padding: "6px 18px", marginBottom: 36,
          }}>
            <Sparkles size={13} color={COLORS.accent} />
            <span style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Premium Resume Builder — 100% Free
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Lexend', sans-serif",
            fontSize: "clamp(40px, 8vw, 88px)",
            fontWeight: 900, lineHeight: 1.05,
            color: COLORS.white,
            margin: "0 auto 20px",
            letterSpacing: "-3px", maxWidth: 900,
          }}>
            The Resume That<br />
            <span style={{ color: COLORS.accent }}>Gets You Hired</span>
          </h1>

          {/* Typewriter */}
          <div style={{ fontSize: "clamp(16px, 3vw, 24px)", color: COLORS.muted, marginBottom: 52, fontWeight: 300 }}>
            Built for{" "}
            <span style={{ color: COLORS.accentLime, fontWeight: 700, fontFamily: "monospace" }}>
              {typed}
              <span style={{ animation: "blink 1s infinite" }}>|</span>
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
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
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setPage("templates")}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.border}`,
                color: "#e8e8f0",
                padding: "16px 40px", borderRadius: 14,
                cursor: "pointer", fontSize: 17, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 10,
              }}>
              <Eye size={19} /> View Templates
            </motion.button>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex" }}>
                {["#3B82F6","#10b981","#ec4899","#f97316"].map((c, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid #0a0a0b", marginLeft: i === 0 ? 0 : -8 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: COLORS.muted }}>
                <strong style={{ color: "#e8e8f0" }}>2,400+</strong> resumes built this month
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[1,2,3,4,5].map((s) => <StarIcon key={s} />)}
              <span style={{ fontSize: 13, color: COLORS.muted, marginLeft: 6 }}>
                <strong style={{ color: "#e8e8f0" }}>4.9/5</strong> rating
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── FLOATING RESUME MOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ display: "flex", justifyContent: "center", padding: "0 24px", marginBottom: 120 }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
            <div style={{
              position: "absolute", bottom: -30, left: "50%",
              transform: "translateX(-50%)",
              width: "70%", height: 60,
              background: "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
            }} />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                width: "100%", background: "#1a1a2e",
                borderRadius: 20, border: "1px solid rgba(59,130,246,0.2)",
                padding: "28px 32px",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #3B82F6, #6366f1)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 14, background: "rgba(255,255,255,0.15)", borderRadius: 4, width: "65%", marginBottom: 10 }} />
                  <div style={{ height: 10, background: "rgba(59,130,246,0.4)", borderRadius: 4, width: "42%", marginBottom: 8 }} />
                  <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, width: "85%" }} />
                </div>
              </div>
              {[100, 85, 92, 70, 60, 95, 78].map((w, i) => (
                <div key={i} style={{ height: 8, borderRadius: 4, marginBottom: 10, background: i % 3 === 0 ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.06)", width: `${w}%` }} />
              ))}
              <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Figma", "React", "UX Research", "Prototyping"].map((s) => (
                  <div key={s} style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 7, padding: "5px 12px", fontSize: 11, color: "#3B82F6", fontWeight: 600 }}>{s}</div>
                ))}
              </div>
              <div style={{ position: "absolute", top: -14, right: 24, background: "#10b981", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 12px rgba(16,185,129,0.4)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", animation: "pulse 1.5s infinite" }} />
                LIVE PREVIEW
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── HOW IT WORKS ── */}
        <div style={{ padding: "0 24px 100px" }}>
          <p style={{ textAlign: "center", color: COLORS.accent, fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            How It Works
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: COLORS.white, marginBottom: 16, letterSpacing: "-1px", fontFamily: "'Lexend', sans-serif" }}>
            From Zero to Hired in 4 Steps
          </h2>
          <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 17, marginBottom: 60 }}>
            No account needed. No credit card. Just results.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 28, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 42, fontWeight: 900, color: "rgba(255,255,255,0.04)", fontFamily: "'Lexend', sans-serif", lineHeight: 1 }}>
                  {step.step}
                </div>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{step.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div style={{ padding: "0 24px 100px" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: COLORS.white, marginBottom: 16, letterSpacing: "-1px", fontFamily: "'Lexend', sans-serif" }}>
            Everything You Need to Stand Out
          </h2>
          <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 17, marginBottom: 52 }}>
            Professional tools to build a resume that gets callbacks.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 30 }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, marginBottom: 18 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <div style={{ padding: "0 24px 100px" }}>
          <p style={{ textAlign: "center", color: COLORS.accent, fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            Success Stories
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: COLORS.white, marginBottom: 16, letterSpacing: "-1px", fontFamily: "'Lexend', sans-serif" }}>
            People Who Got the Job
          </h2>
          <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 17, marginBottom: 52 }}>
            Real results from real job seekers.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 28 }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[1,2,3,4,5].map((s) => <StarIcon key={s} />)}
                </div>
                <p style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${t.color}25`, border: `2px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: t.color, fontWeight: 600 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div style={{ background: "rgba(59,130,246,0.06)", borderTop: "1px solid rgba(59,130,246,0.15)", borderBottom: "1px solid rgba(59,130,246,0.15)", padding: "50px 24px" }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 60, maxWidth: 900, margin: "0 auto" }}>
            {[
              { num: "7",      label: "Premium Templates" },
              { num: "100%",   label: "ATS Optimized" },
              { num: "A4",     label: "Perfect PDF Export" },
              { num: "Free",   label: "No Sign-up Needed" },
              { num: "2,400+", label: "Resumes Built" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: COLORS.accent, fontFamily: "'Lexend', sans-serif", letterSpacing: "-1px" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <div style={{ textAlign: "center", padding: "100px 24px 120px" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: COLORS.white, marginBottom: 20, letterSpacing: "-2px", fontFamily: "'Lexend', sans-serif" }}>
            Ready to Get Hired?
          </h2>
          <p style={{ fontSize: 18, color: COLORS.muted, marginBottom: 40 }}>
            Build your resume in minutes. No account required.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => setPage("editor")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
              border: "none", color: "#fff",
              padding: "18px 52px", borderRadius: 16,
              cursor: "pointer", fontSize: 20, fontWeight: 800,
              display: "inline-flex", alignItems: "center", gap: 12,
              boxShadow: "0 0 60px rgba(59,130,246,0.4)",
            }}>
            <Edit3 size={22} /> Build My Resume — It's Free
          </motion.button>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24 }}>
            {["No sign-up required", "No credit card", "Download instantly"].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, color: COLORS.muted, fontSize: 13 }}>
                <CheckCircle size={14} color="#10b981" /> {text}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.6)} }
      `}</style>
    </div>
  );
}