// ================================================
// EDITOR FORM — With photo upload + section reorder
// ================================================

import { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  User, Briefcase, GraduationCap, Code,
  Plus, Trash2, GripVertical, Zap, Upload,
  ChevronUp, ChevronDown, Image,
} from "lucide-react";

const COLORS = {
  surface: "#111114",
  card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6",
  accentLime: "#84cc16",
  text: "#e8e8f0",
  muted: "#6b7280",
};

// ── Completion calculator ──
function calcCompletion(data) {
  let score = 0;
  const p = data.personal;
  if (p.name)     score += 10;
  if (p.title)    score += 5;
  if (p.email)    score += 5;
  if (p.phone)    score += 5;
  if (p.location) score += 5;
  if (p.summary)  score += 10;
  if (p.photo)    score += 5;
  if (data.experience.length >= 1) score += 15;
  if (data.experience.length >= 2) score += 10;
  if (data.education.length >= 1)  score += 15;
  if (data.skills.length >= 3)     score += 15;
  return Math.min(score, 100);
}

export default function EditorForm({ data, setData, onAutoFill, accentColor }) {
  const [tab, setTab]       = useState("personal");
  const photoInputRef       = useRef();
  const completion          = calcCompletion(data);
  const accent              = accentColor || COLORS.accent;

  const tabs = [
    { id: "personal",   label: "Personal",   icon: <User size={14} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={14} /> },
    { id: "education",  label: "Education",  icon: <GraduationCap size={14} /> },
    { id: "skills",     label: "Skills",     icon: <Code size={14} /> },
  ];

  // ── Input styles ──
  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    color: COLORS.text,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11, fontWeight: 600,
    color: COLORS.muted,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  // ── Personal updaters ──
  const updatePersonal = (field, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));

  // ── Photo upload handler ──
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updatePersonal("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Experience updaters ──
  const addExperience = () => setData((d) => ({
    ...d,
    experience: [...d.experience, {
      id: Date.now().toString(),
      company: "", role: "", period: "", location: "", bullets: [""],
    }],
  }));
  const removeExperience = (id) =>
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));
  const updateExp = (id, field, value) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  const updateBullet = (expId, idx, val) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? val : b)) }
          : e
      ),
    }));
  const addBullet = (expId) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    }));
  const removeBullet = (expId, idx) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) }
          : e
      ),
    }));

  // ── Education updaters ──
  const addEducation = () => setData((d) => ({
    ...d,
    education: [...d.education, {
      id: Date.now().toString(),
      institution: "", degree: "", period: "", gpa: "",
    }],
  }));
  const removeEducation = (id) =>
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  const updateEdu = (id, field, value) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));

  // ── Skills updaters ──
  const addSkill = () => setData((d) => ({
    ...d,
    skills: [...d.skills, {
      id: Date.now().toString(), name: "", level: 75,
    }],
  }));
  const removeSkill = (id) =>
    setData((d) => ({ ...d, skills: d.skills.filter((s) => s.id !== id) }));
  const updateSkill = (id, field, value) =>
    setData((d) => ({
      ...d,
      skills: d.skills.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));

  // ── Section reorder helpers ──
  const moveExp = (id, dir) => {
    const arr = [...data.experience];
    const idx = arr.findIndex((e) => e.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setData((d) => ({ ...d, experience: arr }));
  };

  const moveEdu = (id, dir) => {
    const arr = [...data.education];
    const idx = arr.findIndex((e) => e.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setData((d) => ({ ...d, education: arr }));
  };

  return (
    <div style={{
      height: "100%", display: "flex",
      flexDirection: "column",
      background: COLORS.surface,
    }}>

      {/* ── Progress Bar ── */}
      <div style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 8,
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>
            Resume Completion
          </span>
          <span style={{
            fontSize: 13, fontWeight: 800,
            color: completion >= 80 ? "#10b981" : accent,
          }}>
            {completion}%
          </span>
        </div>

        <div style={{
          height: 4, background: "rgba(255,255,255,0.06)",
          borderRadius: 4, overflow: "hidden",
        }}>
          <motion.div
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              height: "100%", borderRadius: 4,
              background: completion >= 80
                ? "linear-gradient(90deg, #10b981, #06d6a0)"
                : `linear-gradient(90deg, ${accent}, #6366f1)`,
            }}
          />
        </div>

        {/* Auto fill button */}
        <div style={{ marginTop: 10 }}>
          <button onClick={onAutoFill} style={{
            background: "rgba(132,204,22,0.1)",
            border: "1px solid rgba(132,204,22,0.25)",
            color: COLORS.accentLime,
            padding: "6px 14px", borderRadius: 7,
            cursor: "pointer", fontSize: 12, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Zap size={12} /> Auto-Fill Sample Data
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "8px 12px", gap: 4,
      }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1,
            background: tab === t.id ? `${accent}18` : "none",
            border: tab === t.id ? `1px solid ${accent}40` : "1px solid transparent",
            color: tab === t.id ? accent : COLORS.muted,
            padding: "7px 4px", borderRadius: 7,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 4,
            transition: "all 0.2s",
          }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── Form Content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >

            {/* ══ PERSONAL TAB ══ */}
            {tab === "personal" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Photo upload */}
                <div>
                  <label style={labelStyle}>Profile Photo</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Preview */}
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: data.personal.photo
                        ? "transparent"
                        : "rgba(255,255,255,0.06)",
                      border: `2px dashed ${data.personal.photo ? accent : COLORS.border}`,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", overflow: "hidden",
                      flexShrink: 0,
                    }}>
                      {data.personal.photo ? (
                        <img src={data.personal.photo} alt="profile"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Image size={20} color={COLORS.muted} />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <input
                        type="file" accept="image/*"
                        ref={photoInputRef}
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                      />
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        style={{
                          background: `${accent}12`,
                          border: `1px solid ${accent}30`,
                          color: accent,
                          padding: "7px 14px", borderRadius: 8,
                          cursor: "pointer", fontSize: 12,
                          fontWeight: 600,
                          display: "flex", alignItems: "center", gap: 6,
                          marginBottom: 6,
                        }}>
                        <Upload size={12} />
                        {data.personal.photo ? "Change Photo" : "Upload Photo"}
                      </button>
                      {data.personal.photo && (
                        <button
                          onClick={() => updatePersonal("photo", "")}
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#ef4444",
                            padding: "5px 12px", borderRadius: 7,
                            cursor: "pointer", fontSize: 11, fontWeight: 600,
                          }}>
                          Remove
                        </button>
                      )}
                      <p style={{ fontSize: 10, color: COLORS.muted, marginTop: 4 }}>
                        JPG or PNG, max 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Text fields */}
                {[
                  { f: "name",     l: "Full Name",    placeholder: "Alexandra Chen" },
                  { f: "title",    l: "Job Title",    placeholder: "Senior Product Designer" },
                  { f: "email",    l: "Email",        placeholder: "alex@email.com" },
                  { f: "phone",    l: "Phone",        placeholder: "+1 (415) 555-0192" },
                  { f: "location", l: "Location",     placeholder: "San Francisco, CA" },
                  { f: "website",  l: "Website",      placeholder: "yoursite.com" },
                  { f: "linkedin", l: "LinkedIn",     placeholder: "linkedin.com/in/you" },
                ].map(({ f, l, placeholder }) => (
                  <div key={f}>
                    <label style={labelStyle}>{l}</label>
                    <input
                      value={data.personal[f] || ""}
                      onChange={(e) => updatePersonal(f, e.target.value)}
                      placeholder={placeholder}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    />
                  </div>
                ))}

                {/* Summary */}
                <div>
                  <label style={labelStyle}>Professional Summary</label>
                  <textarea
                    value={data.personal.summary || ""}
                    onChange={(e) => updatePersonal("summary", e.target.value)}
                    placeholder="A brief summary of your background and key achievements..."
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                  />
                  <p style={{ fontSize: 10, color: COLORS.muted, marginTop: 4 }}>
                    {(data.personal.summary || "").length} characters
                    {(data.personal.summary || "").length < 100 && " (aim for 100+)"}
                  </p>
                </div>
              </div>
            )}

            {/* ══ EXPERIENCE TAB ══ */}
            {tab === "experience" && (
              <div>
                <Reorder.Group
                  axis="y"
                  values={data.experience}
                  onReorder={(exp) => setData((d) => ({ ...d, experience: exp }))}
                  style={{
                    listStyle: "none", padding: 0, margin: 0,
                    display: "flex", flexDirection: "column", gap: 16,
                  }}
                >
                  {data.experience.map((exp, expIdx) => (
                    <Reorder.Item key={exp.id} value={exp}
                      style={{
                        background: COLORS.card,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 12, padding: 16,
                        cursor: "default",
                      }}
                    >
                      {/* Header row */}
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 12,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <GripVertical size={14} color={COLORS.muted}
                            style={{ cursor: "grab" }} />
                          <span style={{
                            fontSize: 12, fontWeight: 700, color: accent,
                          }}>
                            Experience {expIdx + 1}
                          </span>
                        </div>

                        {/* Move up/down + delete */}
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => moveExp(exp.id, -1)}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: `1px solid ${COLORS.border}`,
                              color: COLORS.muted, borderRadius: 6,
                              padding: "3px 6px", cursor: "pointer",
                            }}>
                            <ChevronUp size={12} />
                          </button>
                          <button onClick={() => moveExp(exp.id, 1)}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: `1px solid ${COLORS.border}`,
                              color: COLORS.muted, borderRadius: 6,
                              padding: "3px 6px", cursor: "pointer",
                            }}>
                            <ChevronDown size={12} />
                          </button>
                          <button onClick={() => removeExperience(exp.id)}
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              color: "#ef4444", borderRadius: 6,
                              padding: "3px 7px", cursor: "pointer",
                            }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Fields grid */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10, marginBottom: 10,
                      }}>
                        {[
                          { f: "company",  p: "Company" },
                          { f: "role",     p: "Job Title" },
                          { f: "period",   p: "2021 – Present" },
                          { f: "location", p: "City, State" },
                        ].map(({ f, p }) => (
                          <div key={f}>
                            <label style={{ ...labelStyle, marginBottom: 4 }}>{p}</label>
                            <input
                              value={exp[f]}
                              onChange={(e) => updateExp(exp.id, f, e.target.value)}
                              placeholder={p}
                              style={{ ...inputStyle, padding: "8px 12px", fontSize: 13 }}
                              onFocus={(e) => (e.target.style.borderColor = accent)}
                              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Bullets */}
                      <label style={labelStyle}>Bullet Points</label>
                      {exp.bullets.map((b, bi) => (
                        <div key={bi} style={{
                          display: "flex", gap: 6, marginBottom: 6,
                        }}>
                          <span style={{
                            color: accent, marginTop: 9, flexShrink: 0,
                          }}>•</span>
                          <input
                            value={b}
                            onChange={(e) => updateBullet(exp.id, bi, e.target.value)}
                            placeholder="Key achievement or responsibility..."
                            style={{ ...inputStyle, flex: 1, padding: "8px 12px", fontSize: 13 }}
                            onFocus={(e) => (e.target.style.borderColor = accent)}
                            onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                          />
                          {exp.bullets.length > 1 && (
                            <button onClick={() => removeBullet(exp.id, bi)}
                              style={{
                                background: "none",
                                border: "none",
                                color: COLORS.muted,
                                cursor: "pointer", padding: "0 4px",
                                flexShrink: 0,
                              }}>
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => addBullet(exp.id)} style={{
                        background: "none",
                        border: `1px dashed ${COLORS.border}`,
                        color: COLORS.muted, borderRadius: 6,
                        padding: "5px 12px", cursor: "pointer",
                        fontSize: 12, marginTop: 4,
                      }}>
                        + Add bullet
                      </button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>

                <button onClick={addExperience} style={{
                  width: "100%", marginTop: 12,
                  background: `${accent}0a`,
                  border: `1px dashed ${accent}50`,
                  color: accent, borderRadius: 10,
                  padding: "12px", cursor: "pointer",
                  fontSize: 14, fontWeight: 600,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                }}>
                  <Plus size={16} /> Add Experience
                </button>
              </div>
            )}

            {/* ══ EDUCATION TAB ══ */}
            {tab === "education" && (
              <div>
                <div style={{
                  display: "flex", flexDirection: "column", gap: 16,
                }}>
                  {data.education.map((edu, eduIdx) => (
                    <div key={edu.id} style={{
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12, padding: 16,
                    }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        marginBottom: 12,
                      }}>
                        <span style={{
                          fontSize: 12, fontWeight: 700, color: accent,
                        }}>
                          Education {eduIdx + 1}
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => moveEdu(edu.id, -1)}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: `1px solid ${COLORS.border}`,
                              color: COLORS.muted, borderRadius: 6,
                              padding: "3px 6px", cursor: "pointer",
                            }}>
                            <ChevronUp size={12} />
                          </button>
                          <button onClick={() => moveEdu(edu.id, 1)}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: `1px solid ${COLORS.border}`,
                              color: COLORS.muted, borderRadius: 6,
                              padding: "3px 6px", cursor: "pointer",
                            }}>
                            <ChevronDown size={12} />
                          </button>
                          <button onClick={() => removeEducation(edu.id)}
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              color: "#ef4444", borderRadius: 6,
                              padding: "3px 7px", cursor: "pointer",
                            }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr", gap: 10,
                      }}>
                        {[
                          { f: "institution", p: "University" },
                          { f: "degree",      p: "Degree & Major" },
                          { f: "period",      p: "2015 – 2019" },
                          { f: "gpa",         p: "GPA (optional)" },
                        ].map(({ f, p }) => (
                          <div key={f}>
                            <label style={{ ...labelStyle, marginBottom: 4 }}>{p}</label>
                            <input
                              value={edu[f]}
                              onChange={(e) => updateEdu(edu.id, f, e.target.value)}
                              placeholder={p}
                              style={{ ...inputStyle, padding: "8px 12px", fontSize: 13 }}
                              onFocus={(e) => (e.target.style.borderColor = accent)}
                              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={addEducation} style={{
                  width: "100%", marginTop: 12,
                  background: `${accent}0a`,
                  border: `1px dashed ${accent}50`,
                  color: accent, borderRadius: 10,
                  padding: "12px", cursor: "pointer",
                  fontSize: 14, fontWeight: 600,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                }}>
                  <Plus size={16} /> Add Education
                </button>
              </div>
            )}

            {/* ══ SKILLS TAB ══ */}
            {tab === "skills" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {data.skills.map((sk) => (
                    <div key={sk.id} style={{
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 10, padding: 14,
                    }}>
                      <div style={{
                        display: "flex", gap: 10,
                        alignItems: "center", marginBottom: 10,
                      }}>
                        <input
                          value={sk.name}
                          onChange={(e) => updateSkill(sk.id, "name", e.target.value)}
                          placeholder="Skill name"
                          style={{ ...inputStyle, flex: 1, padding: "8px 12px", fontSize: 13 }}
                          onFocus={(e) => (e.target.style.borderColor = accent)}
                          onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                        />
                        <button onClick={() => removeSkill(sk.id)} style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          color: "#ef4444", borderRadius: 6,
                          padding: "7px 9px", cursor: "pointer", flexShrink: 0,
                        }}>
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        <span style={{
                          fontSize: 11, color: COLORS.muted, width: 60,
                        }}>
                          {sk.level}%
                        </span>
                        <div
                          style={{
                            flex: 1, height: 6,
                            background: "rgba(255,255,255,0.08)",
                            borderRadius: 4, cursor: "pointer",
                            position: "relative",
                          }}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                            updateSkill(sk.id, "level", Math.min(100, Math.max(10, pct)));
                          }}
                        >
                          <div style={{
                            height: "100%", borderRadius: 4,
                            background: `linear-gradient(90deg, ${accent}, #6366f1)`,
                            width: `${sk.level}%`,
                            pointerEvents: "none",
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={addSkill} style={{
                  width: "100%", marginTop: 12,
                  background: `${accent}0a`,
                  border: `1px dashed ${accent}50`,
                  color: accent, borderRadius: 10,
                  padding: "12px", cursor: "pointer",
                  fontSize: 14, fontWeight: 600,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                }}>
                  <Plus size={16} /> Add Skill
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}