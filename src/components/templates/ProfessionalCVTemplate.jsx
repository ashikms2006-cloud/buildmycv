// ================================================
// PROFESSIONAL CV TEMPLATE
// All white · Black + Gold · Header + 2-col body
// Multi-page ready · Senior / Executive roles
// ================================================

const GOLD = "#b8860b";
const GOLD_LIGHT = "#d4a843";
const BLACK = "#0a0a0a";
const DARK = "#1a1a1a";
const GRAY = "#4a4a4a";
const LIGHT_GRAY = "#8a8a8a";
const RULE = "#e8e2d4";
const BG_SIDEBAR = "#faf9f7";

// ── Section heading ──
function SectionHeading({ title, accent }) {
  return (
    <div style={{ marginBottom: 14, marginTop: 4 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <h2 style={{
          fontSize: 10.5,
          fontWeight: 900,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: accent || GOLD,
          margin: 0,
          whiteSpace: "nowrap",
        }}>
          {title}
        </h2>
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, ${accent || GOLD}, transparent)`,
        }} />
      </div>
    </div>
  );
}

// ── Sidebar section heading ──
function SidebarHeading({ title, accent }) {
  return (
    <div style={{ marginBottom: 10, marginTop: 4 }}>
      <h2 style={{
        fontSize: 9.5,
        fontWeight: 900,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: accent || GOLD,
        margin: "0 0 6px",
      }}>
        {title}
      </h2>
      <div style={{ height: 1.5, background: accent || GOLD, width: 28, borderRadius: 1 }} />
    </div>
  );
}

export default function ProfessionalCVTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || GOLD;
  const {
    personal: p,
    experience = [],
    education  = [],
    skills     = [],
    projects   = [],
    certifications = [],
    awards     = [],
    references = [],
    customSections = [],
  } = data;

  return (
    <div style={{
      fontFamily: fontStyle || "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      color: BLACK,
      fontSize: 10.5,
      lineHeight: 1.55,
      minHeight: 1122,
    }}>

      {/* ══════════════════════════════════════
          HEADER — Full width premium bar
      ══════════════════════════════════════ */}
      <div style={{
        background: BLACK,
        padding: "36px 48px 30px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Gold decorative lines */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${accent}, ${GOLD_LIGHT}, ${accent})`,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 48, right: 48,
          height: 0.5, background: `${accent}60`,
        }} />

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
        }}>
          {/* Name + title */}
          <div style={{ flex: 1 }}>
            {/* Photo if available */}
            {p.photo && (
              <img src={p.photo} alt="profile" style={{
                width: 72, height: 72,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${accent}`,
                marginBottom: 14,
                display: "block",
              }} />
            )}

            <h1 style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              margin: "0 0 6px",
              letterSpacing: "0.04em",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.1,
            }}>
              {p.name || "Your Full Name"}
            </h1>

            <div style={{
              fontSize: 13,
              color: accent,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'Arial', sans-serif",
            }}>
              {p.title || "Professional Title"}
            </div>
          </div>

          {/* Contact block */}
          <div style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            flexShrink: 0,
          }}>
            {[
              { val: p.email,    icon: "✉" },
              { val: p.phone,    icon: "☎" },
              { val: p.location, icon: "⌖" },
              { val: p.linkedin, icon: "in" },
              { val: p.website,  icon: "⊕" },
            ].filter((c) => c.val).map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                justifyContent: "flex-end", gap: 8,
              }}>
                <span style={{
                  fontSize: 9, color: "#ffffff",
                  lineHeight: 1.4, letterSpacing: "0.02em",
                }}>
                  {c.val}
                </span>
                <span style={{
                  fontSize: 10, color: accent,
                  fontFamily: "sans-serif",
                  width: 16, textAlign: "center",
                }}>
                  {c.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BODY — 2 column layout
      ══════════════════════════════════════ */}
      <div style={{ display: "flex", minHeight: 900 }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: "30%",
          background: BG_SIDEBAR,
          borderRight: `1px solid ${RULE}`,
          padding: "28px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}>

          {/* Summary */}
          {p.summary && (
            <div>
              <SidebarHeading title="Profile" accent={accent} />
              <p style={{
                fontSize: 10, color: GRAY,
                lineHeight: 1.75,
                fontStyle: "italic",
                borderLeft: `2px solid ${accent}`,
                paddingLeft: 10,
              }}>
                {p.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SidebarHeading title="Core Skills" accent={accent} />
              {skills.map((s) => (
                <div key={s.id} style={{ marginBottom: 9 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}>
                    <span style={{ fontSize: 10, color: DARK, fontWeight: 600 }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: 9, color: LIGHT_GRAY }}>
                      {s.level >= 90 ? "Expert" :
                       s.level >= 75 ? "Advanced" :
                       s.level >= 55 ? "Proficient" : "Familiar"}
                    </span>
                  </div>
                  <div style={{
                    height: 3, background: "#e8e8e8",
                    borderRadius: 2,
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      background: `linear-gradient(90deg, ${accent}, ${GOLD_LIGHT})`,
                      width: `${s.level}%`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <SidebarHeading title="Education" accent={accent} />
              {education.map((e) => (
                <div key={e.id} style={{ marginBottom: 12 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 800,
                    color: DARK, marginBottom: 2,
                    lineHeight: 1.4,
                  }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: 9.5, color: accent, fontWeight: 600, marginBottom: 1 }}>
                    {e.institution}
                  </div>
                  <div style={{ fontSize: 9, color: LIGHT_GRAY }}>
                    {e.period}
                    {e.gpa ? ` · GPA: ${e.gpa}` : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <SidebarHeading title="Certifications" accent={accent} />
              {certifications.map((c) => (
                <div key={c.id} style={{
                  marginBottom: 8,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${RULE}`,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: DARK, marginBottom: 1 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 9, color: LIGHT_GRAY }}>
                    {c.issuer} · {c.year}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Sections in sidebar */}
          {customSections.map((sec) => (
            <div key={sec.id}>
              <SidebarHeading title={sec.title} accent={accent} />
              {sec.items.filter((i) => i.text).map((item) => (
                <div key={item.id} style={{
                  display: "flex", gap: 6,
                  marginBottom: 5, alignItems: "flex-start",
                }}>
                  <span style={{
                    color: accent, fontWeight: 700,
                    marginTop: 1, flexShrink: 0, fontSize: 10,
                  }}>◆</span>
                  <span style={{ fontSize: 9.5, color: GRAY, lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* References */}
          {references.length > 0 && (
            <div>
              <SidebarHeading title="References" accent={accent} />
              {references.map((r) => (
                <div key={r.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: DARK }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: 9.5, color: accent, fontWeight: 600, marginBottom: 2 }}>
                    {r.title}
                  </div>
                  {r.email && (
                    <div style={{ fontSize: 9, color: LIGHT_GRAY }}>{r.email}</div>
                  )}
                  {r.phone && (
                    <div style={{ fontSize: 9, color: LIGHT_GRAY }}>{r.phone}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT MAIN COLUMN ── */}
        <div style={{
          flex: 1, padding: "28px 36px",
          display: "flex", flexDirection: "column", gap: 24,
        }}>

          {/* ── Experience ── */}
          {experience.length > 0 && (
            <div>
              <SectionHeading title="Professional Experience" accent={accent} />
              {experience.map((e, idx) => (
                <div key={e.id} style={{
                  marginBottom: 18,
                  paddingBottom: idx < experience.length - 1 ? 18 : 0,
                  borderBottom: idx < experience.length - 1
                    ? `1px solid ${RULE}` : "none",
                }}>
                  {/* Role + period */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 3,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 12, fontWeight: 900,
                        color: BLACK, letterSpacing: "0.02em",
                      }}>
                        {e.role}
                      </div>
                      <div style={{
                        fontSize: 10.5, fontWeight: 700,
                        color: accent, marginTop: 1,
                      }}>
                        {e.company}
                        {e.location ? (
                          <span style={{ color: LIGHT_GRAY, fontWeight: 400, marginLeft: 8 }}>
                            · {e.location}
                          </span>
                        ) : ""}
                      </div>
                    </div>
                    <div style={{
                      background: `${accent}10`,
                      border: `1px solid ${accent}30`,
                      borderRadius: 3,
                      padding: "2px 10px",
                      fontSize: 9, color: accent,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}>
                      {e.period}
                    </div>
                  </div>

                  {/* Bullets */}
                  <div style={{ marginTop: 7 }}>
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 9,
                        marginBottom: 4, alignItems: "flex-start",
                      }}>
                        <div style={{
                          width: 5, height: 5,
                          borderRadius: "50%",
                          background: accent,
                          flexShrink: 0,
                          marginTop: 4,
                        }} />
                        <span style={{
                          color: GRAY, lineHeight: 1.6,
                          fontSize: 10.5,
                        }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Projects ── */}
          {projects.length > 0 && (
            <div>
              <SectionHeading title="Key Projects" accent={accent} />
              {projects.map((proj, idx) => (
                <div key={proj.id} style={{
                  marginBottom: 16,
                  paddingBottom: idx < projects.length - 1 ? 16 : 0,
                  borderBottom: idx < projects.length - 1
                    ? `1px solid ${RULE}` : "none",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 4,
                  }}>
                    <div>
                      <span style={{
                        fontSize: 11.5, fontWeight: 800,
                        color: BLACK,
                      }}>
                        {proj.name}
                      </span>
                      {proj.role && (
                        <span style={{
                          fontSize: 10, color: accent,
                          fontWeight: 600, marginLeft: 10,
                        }}>
                          {proj.role}
                        </span>
                      )}
                    </div>
                    {proj.period && (
                      <span style={{
                        fontSize: 9, color: LIGHT_GRAY,
                        fontStyle: "italic", flexShrink: 0, marginLeft: 10,
                      }}>
                        {proj.period}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{
                      fontSize: 10, color: GRAY,
                      lineHeight: 1.65, margin: "0 0 4px",
                    }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.link && (
                    <div style={{
                      fontSize: 9, color: accent,
                      fontWeight: 600, letterSpacing: "0.02em",
                    }}>
                      ⊕ {proj.link}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Awards ── */}
          {awards.length > 0 && (
            <div>
              <SectionHeading title="Awards & Achievements" accent={accent} />
              {awards.map((a, idx) => (
                <div key={a.id} style={{
                  display: "flex", gap: 14,
                  marginBottom: 12,
                  paddingBottom: idx < awards.length - 1 ? 12 : 0,
                  borderBottom: idx < awards.length - 1
                    ? `1px solid ${RULE}` : "none",
                }}>
                  {/* Gold star */}
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: "50%",
                    background: `${accent}12`,
                    border: `1.5px solid ${accent}40`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 14,
                  }}>
                    ★
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: BLACK }}>
                        {a.title}
                      </span>
                      <span style={{
                        fontSize: 9, color: LIGHT_GRAY,
                        fontStyle: "italic", flexShrink: 0, marginLeft: 8,
                      }}>
                        {a.org} · {a.year}
                      </span>
                    </div>
                    {a.description && (
                      <p style={{
                        fontSize: 10, color: GRAY,
                        lineHeight: 1.6, margin: "3px 0 0",
                      }}>
                        {a.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER — Page number / branding
      ══════════════════════════════════════ */}
      <div style={{
        borderTop: `1px solid ${RULE}`,
        padding: "10px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: BG_SIDEBAR,
      }}>
        <span style={{ fontSize: 9, color: LIGHT_GRAY, letterSpacing: "0.08em" }}>
          {p.name?.toUpperCase()} · CURRICULUM VITAE
        </span>
        <div style={{
          display: "flex", gap: 16,
          fontSize: 9, color: LIGHT_GRAY,
        }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
        </div>
      </div>

    </div>
  );
}