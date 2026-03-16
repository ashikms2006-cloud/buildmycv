// ================================================
// EDITOR FORM — Complete clean version
// ================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  User, Briefcase, GraduationCap, Code, LayoutList,
  Plus, Trash2, GripVertical, Zap, Upload,
  ChevronUp, ChevronDown, Image, Link,
} from "lucide-react";

const COLORS = {
  surface: "#111114", card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6", accentLime: "#84cc16",
  text: "#e8e8f0", muted: "#6b7280",
};

function calcCompletion(data) {
  let score = 0;
  const p = data.personal;
  if (p.name)     score += 8;
  if (p.title)    score += 5;
  if (p.email)    score += 5;
  if (p.phone)    score += 5;
  if (p.location) score += 4;
  if (p.summary)  score += 8;
  if (p.photo)    score += 5;
  if ((data.experience || []).length >= 1)             score += 15;
  if ((data.experience || []).length >= 2)             score += 10;
  if ((data.education || []).length >= 1)              score += 10;
  if ((data.skills || []).length >= 3)                 score += 10;
  if ((data.projects || []).length >= 1)               score += 5;
  if ((data.certifications || []).length >= 1)         score += 5;
  if ((data.awards || []).length >= 1)                 score += 5;
  return Math.min(score, 100);
}

function parseLinkedInUrl(url) {
  const clean = url.trim().replace(/\/$/, "");
  const match = clean.match(/linkedin\.com\/in\/([^/?]+)/i);
  return match ? `linkedin.com/in/${match[1]}` : clean;
}

export default function EditorForm({
  data, setData, onAutoFill, accentColor,
  missingFields = new Set(), onTabChange,
}) {
  const [tab, setTab]                   = useState("personal");
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [linkedInUrl, setLinkedInUrl]   = useState("");
  const [linkedInMsg, setLinkedInMsg]   = useState("");
  const photoInputRef                   = useRef();
  const completion                      = calcCompletion(data);
  const accent                          = accentColor || COLORS.accent;

  useEffect(() => {
    if (onTabChange) onTabChange(tab);
  }, [tab]);

  const tabs = [
    { id: "personal",   label: "Personal",   icon: <User size={13} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={13} /> },
    { id: "education",  label: "Education",  icon: <GraduationCap size={13} /> },
    { id: "skills",     label: "Skills",     icon: <Code size={13} /> },
    { id: "custom",     label: "Sections",   icon: <LayoutList size={13} /> },
  ];

  const plainInput = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8, padding: "10px 14px",
    color: COLORS.text, fontSize: 14,
    outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border-color 0.2s",
  };

  const plainLabel = {
    display: "block", fontSize: 11, fontWeight: 600,
    color: COLORS.muted, letterSpacing: "0.06em",
    textTransform: "uppercase", marginBottom: 6,
  };

  const smallInput = { ...plainInput, padding: "8px 12px", fontSize: 13 };
  const smallLabel = { ...plainLabel, marginBottom: 4 };

  const reqInput = (field) => ({
    ...plainInput,
    background: missingFields.has(field) ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${missingFields.has(field) ? "rgba(239,68,68,0.4)" : COLORS.border}`,
    boxShadow: missingFields.has(field) ? "0 0 8px rgba(239,68,68,0.15)" : "none",
  });

  const reqLabel = (field) => ({
    ...plainLabel,
    color: missingFields.has(field) ? "#ef4444" : COLORS.muted,
  });

  const addBtn = (onClick, label, color) => (
    <button onClick={onClick} style={{
      width: "100%", marginTop: 12,
      background: color ? `${color}08` : `${accent}0a`,
      border: `1px dashed ${color ? `${color}50` : `${accent}50`}`,
      color: color || accent, borderRadius: 10,
      padding: "12px", cursor: "pointer",
      fontSize: 13, fontWeight: 600,
      display: "flex", alignItems: "center",
      justifyContent: "center", gap: 8,
    }}>
      <Plus size={15} /> {label}
    </button>
  );

  // ── Personal ──
  const up = (field, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => up("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleLinkedInImport = () => {
    if (!linkedInUrl.trim()) { setLinkedInMsg("Please enter a LinkedIn URL."); return; }
    const parsed = parseLinkedInUrl(linkedInUrl);
    up("linkedin", parsed);
    const parts = parsed.split("/in/");
    if (parts[1] && !data.personal.name) {
      const formatted = parts[1].replace(/-/g, " ").replace(/\d+/g, "").trim()
        .split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").trim();
      if (formatted) up("name", formatted);
    }
    setLinkedInMsg("✅ LinkedIn URL saved!");
    setTimeout(() => { setShowLinkedIn(false); setLinkedInMsg(""); setLinkedInUrl(""); }, 2000);
  };

  // ── Experience ──
  const addExp = () => setData((d) => ({
    ...d, experience: [...(d.experience || []),
      { id: Date.now().toString(), company: "", role: "", period: "", location: "", bullets: [""] }],
  }));
  const removeExp = (id) => setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));
  const updateExp = (id, field, value) =>
    setData((d) => ({ ...d, experience: d.experience.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  const addBullet = (expId) =>
    setData((d) => ({ ...d, experience: d.experience.map((e) => e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e) }));
  const removeBullet = (expId, idx) =>
    setData((d) => ({ ...d, experience: d.experience.map((e) => e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e) }));
  const updateBullet = (expId, idx, val) =>
    setData((d) => ({ ...d, experience: d.experience.map((e) => e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? val : b) } : e) }));
  const moveExp = (id, dir) => {
    const arr = [...(data.experience || [])];
    const idx = arr.findIndex((e) => e.id === id);
    const ni = idx + dir;
    if (ni < 0 || ni >= arr.length) return;
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    setData((d) => ({ ...d, experience: arr }));
  };

  // ── Education ──
  const addEdu = () => setData((d) => ({
    ...d, education: [...(d.education || []),
      { id: Date.now().toString(), institution: "", degree: "", period: "", gpa: "" }],
  }));
  const removeEdu = (id) => setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  const updateEdu = (id, field, value) =>
    setData((d) => ({ ...d, education: d.education.map((e) => e.id === id ? { ...e, [field]: value } : e) }));
  const moveEdu = (id, dir) => {
    const arr = [...(data.education || [])];
    const idx = arr.findIndex((e) => e.id === id);
    const ni = idx + dir;
    if (ni < 0 || ni >= arr.length) return;
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    setData((d) => ({ ...d, education: arr }));
  };

  // ── Skills ──
  const addSkill = () => setData((d) => ({
    ...d, skills: [...(d.skills || []), { id: Date.now().toString(), name: "", level: 75 }],
  }));
  const removeSkill = (id) => setData((d) => ({ ...d, skills: d.skills.filter((s) => s.id !== id) }));
  const updateSkill = (id, field, value) =>
    setData((d) => ({ ...d, skills: d.skills.map((s) => s.id === id ? { ...s, [field]: value } : s) }));

  // ── Projects ──
  const addProject = () => setData((d) => ({
    ...d, projects: [...(d.projects || []),
      { id: Date.now().toString(), name: "", role: "", period: "", description: "", link: "" }],
  }));
  const removeProject = (id) => setData((d) => ({ ...d, projects: (d.projects || []).filter((p) => p.id !== id) }));
  const updateProject = (id, field, value) =>
    setData((d) => ({ ...d, projects: (d.projects || []).map((p) => p.id === id ? { ...p, [field]: value } : p) }));

  // ── Certifications ──
  const addCert = () => setData((d) => ({
    ...d, certifications: [...(d.certifications || []),
      { id: Date.now().toString(), name: "", issuer: "", year: "" }],
  }));
  const removeCert = (id) => setData((d) => ({ ...d, certifications: (d.certifications || []).filter((c) => c.id !== id) }));
  const updateCert = (id, field, value) =>
    setData((d) => ({ ...d, certifications: (d.certifications || []).map((c) => c.id === id ? { ...c, [field]: value } : c) }));

  // ── Awards ──
  const addAward = () => setData((d) => ({
    ...d, awards: [...(d.awards || []),
      { id: Date.now().toString(), title: "", org: "", year: "", description: "" }],
  }));
  const removeAward = (id) => setData((d) => ({ ...d, awards: (d.awards || []).filter((a) => a.id !== id) }));
  const updateAward = (id, field, value) =>
    setData((d) => ({ ...d, awards: (d.awards || []).map((a) => a.id === id ? { ...a, [field]: value } : a) }));

  // ── References ──
  const addRef = () => setData((d) => ({
    ...d, references: [...(d.references || []),
      { id: Date.now().toString(), name: "", title: "", email: "", phone: "" }],
  }));
  const removeRef = (id) => setData((d) => ({ ...d, references: (d.references || []).filter((r) => r.id !== id) }));
  const updateRef = (id, field, value) =>
    setData((d) => ({ ...d, references: (d.references || []).map((r) => r.id === id ? { ...r, [field]: value } : r) }));

  // ── Custom Sections ──
  const addSection = () => setData((d) => ({
    ...d, customSections: [...(d.customSections || []),
      { id: Date.now().toString(), title: "New Section", items: [{ id: Date.now().toString() + "i", text: "" }] }],
  }));
  const removeSection = (id) => setData((d) => ({ ...d, customSections: (d.customSections || []).filter((s) => s.id !== id) }));
  const updateSectionTitle = (id, title) =>
    setData((d) => ({ ...d, customSections: (d.customSections || []).map((s) => s.id === id ? { ...s, title } : s) }));
  const addSectionItem = (secId) =>
    setData((d) => ({ ...d, customSections: (d.customSections || []).map((s) => s.id === secId ? { ...s, items: [...s.items, { id: Date.now().toString(), text: "" }] } : s) }));
  const removeSectionItem = (secId, itemId) =>
    setData((d) => ({ ...d, customSections: (d.customSections || []).map((s) => s.id === secId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s) }));
  const updateSectionItem = (secId, itemId, text) =>
    setData((d) => ({ ...d, customSections: (d.customSections || []).map((s) => s.id === secId ? { ...s, items: s.items.map((i) => i.id === itemId ? { ...i, text } : i) } : s) }));

  const PRESETS = ["Languages", "Hobbies", "Volunteering", "Publications", "Interests"];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: COLORS.surface }}>

      {/* ── Progress ── */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>Resume Completion</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: completion >= 80 ? "#10b981" : accent }}>{completion}%</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
          <motion.div animate={{ width: `${completion}%` }} transition={{ duration: 0.5 }}
            style={{ height: "100%", borderRadius: 4, background: completion >= 80 ? "linear-gradient(90deg, #10b981, #06d6a0)" : `linear-gradient(90deg, ${accent}, #6366f1)` }} />
        </div>

        {missingFields.size > 0 && (
          <div style={{ marginTop: 8, padding: "6px 10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 7, fontSize: 11, color: "#ef4444", fontWeight: 600 }}>
            ⚠ {missingFields.size} required field{missingFields.size > 1 ? "s" : ""} missing
          </div>
        )}

        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={onAutoFill} style={{ background: "rgba(132,204,22,0.1)", border: "1px solid rgba(132,204,22,0.25)", color: COLORS.accentLime, padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={12} /> Auto-Fill
          </button>
          <button onClick={() => setShowLinkedIn((s) => !s)} style={{ background: "rgba(10,102,194,0.12)", border: "1px solid rgba(10,102,194,0.3)", color: "#60a5fa", padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
            <Link size={12} /> LinkedIn
          </button>
        </div>

        <AnimatePresence>
          {showLinkedIn && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
              <div style={{ marginTop: 10, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>Paste your LinkedIn URL to extract your name.</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} placeholder="https://linkedin.com/in/yourname"
                    style={{ ...plainInput, flex: 1, padding: "8px 12px", fontSize: 12 }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    onKeyDown={(e) => e.key === "Enter" && handleLinkedInImport()} />
                  <button onClick={handleLinkedInImport} style={{ background: accent, border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Import</button>
                </div>
                {linkedInMsg && <p style={{ fontSize: 11, marginTop: 8, color: linkedInMsg.startsWith("✅") ? "#10b981" : "#f59e0b" }}>{linkedInMsg}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, padding: "8px 12px", gap: 3 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: tab === t.id ? `${accent}18` : "none",
            border: tab === t.id ? `1px solid ${accent}40` : "1px solid transparent",
            color: tab === t.id ? accent : COLORS.muted,
            padding: "7px 2px", borderRadius: 7, cursor: "pointer",
            fontSize: 10, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            transition: "all 0.2s",
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

            {/* ══ PERSONAL ══ */}
            {tab === "personal" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Photo */}
                <div>
                  <label style={plainLabel}>Profile Photo</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: data.personal.photo ? "transparent" : "rgba(255,255,255,0.06)", border: `2px dashed ${data.personal.photo ? accent : COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                      {data.personal.photo ? <img src={data.personal.photo} alt="p" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Image size={20} color={COLORS.muted} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <input type="file" accept="image/*" ref={photoInputRef} onChange={handlePhotoUpload} style={{ display: "none" }} />
                      <button onClick={() => photoInputRef.current?.click()} style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent, padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <Upload size={12} /> {data.personal.photo ? "Change" : "Upload Photo"}
                      </button>
                      {data.personal.photo && (
                        <button onClick={() => up("photo", "")} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>Remove</button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fields */}
                {[
                  { f: "name",     l: "Full Name",    p: "Alexandra Chen",          req: true },
                  { f: "title",    l: "Job Title",    p: "Senior Product Designer", req: true },
                  { f: "email",    l: "Email",        p: "alex@email.com",          req: true },
                  { f: "phone",    l: "Phone",        p: "+1 (415) 555-0192",       req: true },
                  { f: "location", l: "Location",     p: "San Francisco, CA",       req: true },
                  { f: "website",  l: "Website",      p: "yoursite.com",            req: false },
                  { f: "linkedin", l: "LinkedIn",     p: "linkedin.com/in/you",     req: false },
                ].map(({ f, l, p, req }) => (
                  <div key={f}>
                    <label style={req ? reqLabel(f) : plainLabel}>
                      {l} {req && missingFields.has(f) && <span style={{ fontSize: 10 }}>— required</span>}
                    </label>
                    <input value={data.personal[f] || ""} onChange={(e) => up(f, e.target.value)} placeholder={p}
                      style={req ? reqInput(f) : plainInput}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = req && missingFields.has(f) ? "rgba(239,68,68,0.4)" : COLORS.border)} />
                  </div>
                ))}

                {/* Summary */}
                <div>
                  <label style={reqLabel("summary")}>Professional Summary {missingFields.has("summary") && <span style={{ fontSize: 10 }}>— required</span>}</label>
                  <textarea value={data.personal.summary || ""} onChange={(e) => up("summary", e.target.value)}
                    placeholder="A brief summary of your background..." rows={4}
                    style={{ ...reqInput("summary"), resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = missingFields.has("summary") ? "rgba(239,68,68,0.4)" : COLORS.border)} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>{(data.personal.summary || "").length} chars {(data.personal.summary || "").length < 100 && "— aim for 100+"}</span>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>{(data.personal.summary || "").split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                </div>
              </div>
            )}

            {/* ══ EXPERIENCE ══ */}
            {tab === "experience" && (
              <div>
                <Reorder.Group axis="y" values={data.experience || []} onReorder={(exp) => setData((d) => ({ ...d, experience: exp }))}
                  style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  {(data.experience || []).map((exp, expIdx) => (
                    <Reorder.Item key={exp.id} value={exp} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, cursor: "default" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <GripVertical size={14} color={COLORS.muted} style={{ cursor: "grab" }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Experience {expIdx + 1}</span>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => moveExp(exp.id, -1)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "3px 6px", cursor: "pointer" }}><ChevronUp size={12} /></button>
                          <button onClick={() => moveExp(exp.id, 1)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "3px 6px", cursor: "pointer" }}><ChevronDown size={12} /></button>
                          <button onClick={() => removeExp(exp.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        {[{ f: "company", p: "Company" }, { f: "role", p: "Job Title" }, { f: "period", p: "2021 – Present" }, { f: "location", p: "City, State" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={exp[f] || ""} onChange={(e) => updateExp(exp.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                      <label style={plainLabel}>Bullet Points</label>
                      {(exp.bullets || []).map((b, bi) => (
                        <div key={bi} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                          <span style={{ color: accent, marginTop: 9, flexShrink: 0, fontWeight: 700 }}>•</span>
                          <input value={b} onChange={(e) => updateBullet(exp.id, bi, e.target.value)} placeholder="Key achievement..."
                            style={{ ...smallInput, flex: 1 }}
                            onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          {exp.bullets.length > 1 && (
                            <button onClick={() => removeBullet(exp.id, bi)} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", padding: "0 4px" }}><Trash2 size={11} /></button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => addBullet(exp.id)} style={{ background: "none", border: `1px dashed ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, marginTop: 4 }}>+ Add bullet</button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
                {addBtn(addExp, "Add Experience")}
              </div>
            )}

            {/* ══ EDUCATION ══ */}
            {tab === "education" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {(data.education || []).map((edu, eduIdx) => (
                    <div key={edu.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Education {eduIdx + 1}</span>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => moveEdu(edu.id, -1)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "3px 6px", cursor: "pointer" }}><ChevronUp size={12} /></button>
                          <button onClick={() => moveEdu(edu.id, 1)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "3px 6px", cursor: "pointer" }}><ChevronDown size={12} /></button>
                          <button onClick={() => removeEdu(edu.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[{ f: "institution", p: "University" }, { f: "degree", p: "Degree & Major" }, { f: "period", p: "2015–2019" }, { f: "gpa", p: "GPA (optional)" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={edu[f] || ""} onChange={(e) => updateEdu(edu.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {addBtn(addEdu, "Add Education")}
              </div>
            )}

            {/* ══ SKILLS ══ */}
            {tab === "skills" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(data.skills || []).map((sk) => (
                    <div key={sk.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 14 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                        <input value={sk.name || ""} onChange={(e) => updateSkill(sk.id, "name", e.target.value)} placeholder="Skill name"
                          style={{ ...smallInput, flex: 1 }}
                          onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                        <button onClick={() => removeSkill(sk.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "7px 9px", cursor: "pointer" }}><Trash2 size={12} /></button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: COLORS.muted, width: 36 }}>{sk.level}%</span>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, cursor: "pointer" }}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                            updateSkill(sk.id, "level", Math.min(100, Math.max(10, pct)));
                          }}>
                          <div style={{ height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${accent}, #6366f1)`, width: `${sk.level}%`, pointerEvents: "none" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {addBtn(addSkill, "Add Skill")}
              </div>
            )}

            {/* ══ CUSTOM SECTIONS ══ */}
            {tab === "custom" && (
              <div>

                {/* Projects */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, background: "#b8860b", borderRadius: 2 }} />
                    <p style={{ ...plainLabel, margin: 0, color: "#b8860b" }}>Projects</p>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>— ⭐ Pro CV</span>
                  </div>
                  {(data.projects || []).map((proj) => (
                    <div key={proj.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Project</span>
                        <button onClick={() => removeProject(proj.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        {[{ f: "name", p: "Project Name" }, { f: "role", p: "Your Role" }, { f: "period", p: "2023–2024" }, { f: "link", p: "project-link.com" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={proj[f] || ""} onChange={(e) => updateProject(proj.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                      <label style={smallLabel}>Description</label>
                      <textarea value={proj.description || ""} onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                        placeholder="Brief description..." rows={2}
                        style={{ ...smallInput, resize: "vertical", width: "100%" }}
                        onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                    </div>
                  ))}
                  {addBtn(addProject, "Add Project", "#b8860b")}
                </div>

                {/* Certifications */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, background: "#b8860b", borderRadius: 2 }} />
                    <p style={{ ...plainLabel, margin: 0, color: "#b8860b" }}>Certifications</p>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>— ⭐ Pro CV</span>
                  </div>
                  {(data.certifications || []).map((cert) => (
                    <div key={cert.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Certification</span>
                        <button onClick={() => removeCert(cert.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 10 }}>
                        {[{ f: "name", p: "Certificate Name" }, { f: "issuer", p: "Organization" }, { f: "year", p: "Year" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={cert[f] || ""} onChange={(e) => updateCert(cert.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {addBtn(addCert, "Add Certification", "#b8860b")}
                </div>

                {/* Awards */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, background: "#b8860b", borderRadius: 2 }} />
                    <p style={{ ...plainLabel, margin: 0, color: "#b8860b" }}>Awards & Achievements</p>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>— ⭐ Pro CV</span>
                  </div>
                  {(data.awards || []).map((award) => (
                    <div key={award.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Award</span>
                        <button onClick={() => removeAward(award.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 10, marginBottom: 10 }}>
                        {[{ f: "title", p: "Award Title" }, { f: "org", p: "Organization" }, { f: "year", p: "Year" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={award[f] || ""} onChange={(e) => updateAward(award.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                      <label style={smallLabel}>Description</label>
                      <input value={award.description || ""} onChange={(e) => updateAward(award.id, "description", e.target.value)}
                        placeholder="Brief description..." style={smallInput}
                        onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                    </div>
                  ))}
                  {addBtn(addAward, "Add Award", "#b8860b")}
                </div>

                {/* References */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, background: "#b8860b", borderRadius: 2 }} />
                    <p style={{ ...plainLabel, margin: 0, color: "#b8860b" }}>References</p>
                    <span style={{ fontSize: 10, color: COLORS.muted }}>— ⭐ Pro CV</span>
                  </div>
                  {(data.references || []).map((ref) => (
                    <div key={ref.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>Reference</span>
                        <button onClick={() => removeRef(ref.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}><Trash2 size={12} /></button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[{ f: "name", p: "Full Name" }, { f: "title", p: "Job Title & Company" }, { f: "email", p: "Email" }, { f: "phone", p: "Phone" }].map(({ f, p }) => (
                          <div key={f}>
                            <label style={smallLabel}>{p}</label>
                            <input value={ref[f] || ""} onChange={(e) => updateRef(ref.id, f, e.target.value)} placeholder={p} style={smallInput}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {addBtn(addRef, "Add Reference", "#b8860b")}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: COLORS.border, margin: "4px 0 20px" }} />

                {/* Custom Sections */}
                <div>
                  <p style={{ ...plainLabel, marginBottom: 10 }}>Custom Sections</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {PRESETS.map((name) => {
                      const exists = (data.customSections || []).some((s) => s.title.toLowerCase() === name.toLowerCase());
                      return (
                        <button key={name} disabled={exists}
                          onClick={() => setData((d) => ({ ...d, customSections: [...(d.customSections || []), { id: Date.now().toString(), title: name, items: [{ id: Date.now().toString() + "i", text: "" }] }] }))}
                          style={{ background: exists ? "rgba(255,255,255,0.02)" : `${accent}10`, border: `1px solid ${exists ? COLORS.border : `${accent}30`}`, color: exists ? COLORS.muted : accent, padding: "5px 12px", borderRadius: 20, cursor: exists ? "default" : "pointer", fontSize: 11, fontWeight: 600, opacity: exists ? 0.5 : 1 }}>
                          {exists ? "✓" : "+"} {name}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {(data.customSections || []).map((section) => (
                      <div key={section.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                          <input value={section.title} onChange={(e) => updateSectionTitle(section.id, e.target.value)} placeholder="Section Title"
                            style={{ ...smallInput, flex: 1, fontWeight: 700 }}
                            onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                          <button onClick={() => removeSection(section.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 6, padding: "7px 9px", cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                        {(section.items || []).map((item, idx) => (
                          <div key={item.id} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                            <span style={{ color: accent, marginTop: 9, flexShrink: 0, fontWeight: 700 }}>•</span>
                            <input value={item.text} onChange={(e) => updateSectionItem(section.id, item.id, e.target.value)}
                              placeholder={`${section.title} item ${idx + 1}`}
                              style={{ ...smallInput, flex: 1 }}
                              onFocus={(e) => (e.target.style.borderColor = accent)} onBlur={(e) => (e.target.style.borderColor = COLORS.border)} />
                            {section.items.length > 1 && (
                              <button onClick={() => removeSectionItem(section.id, item.id)} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", padding: "0 4px" }}><Trash2 size={11} /></button>
                            )}
                          </div>
                        ))}
                        <button onClick={() => addSectionItem(section.id)} style={{ background: "none", border: `1px dashed ${COLORS.border}`, color: COLORS.muted, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, marginTop: 4 }}>+ Add item</button>
                      </div>
                    ))}
                  </div>
                  {addBtn(addSection, "Add Custom Section")}
                  <p style={{ fontSize: 11, color: COLORS.muted, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                    ⭐ Projects, Certifications, Awards & References are used by the Pro CV template.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}