// ================================================
// CREATIVE ARTS TEMPLATE
// Colorful bold design with vibrant accents
// ================================================

const PURPLE = "#7c3aed";
const PINK = "#ec4899";
const ORANGE = "#f97316";
const TEAL = "#0d9488";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean);
}

export default function CreativeArtsTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  const sectionColors = [PURPLE, PINK, ORANGE, TEAL];

  return (
    <div style={{
      background: "#fff",
      color: "#1a1a2e",
      fontFamily: "'Arial', sans-serif",
      minHeight: "100%",
      fontSize: 11,
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── Decorative top bar ── */}
      <div style={{
        height: 8,
        background: `linear-gradient(90deg, ${PURPLE}, ${PINK}, ${ORANGE}, ${TEAL})`,
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: "30px 40px 24px",
        position: "relative",
      }}>

        {/* Background decoration */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 200, height: 200,
          background: `radial-gradient(circle, ${PURPLE}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>

          {/* Photo or initial */}
          {p.photo ? (
            <img src={p.photo} alt="profile" style={{
              width: 90, height: 90,
              borderRadius: 16,
              objectFit: "cover",
              border: `4px solid ${PURPLE}`,
              flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: 90, height: 90,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${PURPLE}, ${PINK})`,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: 32, fontWeight: 900,
              color: "#fff", flexShrink: 0,
            }}>
              {(p.name || "?").charAt(0)}
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 28, fontWeight: 900,
              margin: "0 0 4px",
              background: `linear-gradient(135deg, ${PURPLE}, ${PINK})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
            }}>
              {p.name || "Your Name"}
            </h1>
            <div style={{
              fontSize: 12, fontWeight: 800,
              color: ORANGE, letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 10,
            }}>
              {p.title || "Creative Professional"}
            </div>

            {/* Contact pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {contactLine(p).map((c, i) => (
                <span key={i} style={{
                  background: `${sectionColors[i % 4]}15`,
                  border: `1px solid ${sectionColors[i % 4]}40`,
                  color: sectionColors[i % 4],
                  borderRadius: 20, padding: "2px 10px",
                  fontSize: 9, fontWeight: 600,
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        {p.summary && (
          <div style={{
            marginTop: 20,
            background: `linear-gradient(135deg, ${PURPLE}08, ${PINK}08)`,
            border: `1px solid ${PURPLE}20`,
            borderRadius: 12, padding: "12px 16px",
          }}>
            <p style={{
              lineHeight: 1.7, color: "#374151",
              fontSize: 10.5, margin: 0,
            }}>
              {p.summary}
            </p>
          </div>
        )}
      </div>

      {/* ── Main Body ── */}
      <div style={{ display: "flex", gap: 0 }}>

        {/* Left main column */}
        <div style={{ flex: 1, padding: "0 40px 30px" }}>

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                  background: `linear-gradient(135deg, ${PURPLE}, ${PINK})`,
                  borderRadius: 8, padding: "4px 14px",
                }}>
                  <h2 style={{
                    fontSize: 10, fontWeight: 900,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#fff", margin: 0,
                  }}>
                    Experience
                  </h2>
                </div>
              </div>

              {experience.map((e, idx) => (
                <div key={e.id} style={{
                  marginBottom: 16,
                  paddingLeft: 16,
                  borderLeft: `3px solid ${sectionColors[idx % 4]}`,
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                    <strong style={{
                      fontSize: 11, fontWeight: 800,
                      color: "#111",
                    }}>
                      {e.role || "Role"}
                    </strong>
                    <span style={{
                      background: `${sectionColors[idx % 4]}15`,
                      border: `1px solid ${sectionColors[idx % 4]}30`,
                      color: sectionColors[idx % 4],
                      borderRadius: 6, padding: "1px 8px",
                      fontSize: 8.5, fontWeight: 700,
                      flexShrink: 0, marginLeft: 8,
                    }}>
                      {e.period}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: sectionColors[idx % 4],
                    fontWeight: 700, marginBottom: 5,
                  }}>
                    {e.company}{e.location ? ` · ${e.location}` : ""}
                  </div>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 8, marginBottom: 3,
                    }}>
                      <span style={{
                        color: sectionColors[idx % 4],
                        flexShrink: 0, fontWeight: 900,
                      }}>
                        ›
                      </span>
                      <span style={{ lineHeight: 1.55, color: "#4b5563" }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                  background: `linear-gradient(135deg, ${TEAL}, ${ORANGE})`,
                  borderRadius: 8, padding: "4px 14px",
                }}>
                  <h2 style={{
                    fontSize: 10, fontWeight: 900,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#fff", margin: 0,
                  }}>
                    Education
                  </h2>
                </div>
              </div>

              {education.map((e, idx) => (
                <div key={e.id} style={{
                  marginBottom: 12,
                  paddingLeft: 16,
                  borderLeft: `3px solid ${TEAL}`,
                }}>
                  <strong style={{ fontSize: 11, fontWeight: 800 }}>
                    {e.degree || "Degree"}
                  </strong>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                  }}>
                    <span style={{ fontSize: 10, color: "#6b7280" }}>
                      {e.institution}
                    </span>
                    <span style={{
                      fontSize: 9, color: TEAL,
                      fontWeight: 700,
                    }}>
                      {e.period}
                    </span>
                  </div>
                  {e.gpa && (
                    <span style={{
                      fontSize: 9, color: ORANGE, fontWeight: 700,
                    }}>
                      GPA: {e.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{
          width: "32%",
          background: "#fafafa",
          borderLeft: "1px solid #f0f0f0",
          padding: "0 20px 30px",
        }}>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                background: `linear-gradient(135deg, ${ORANGE}, ${PINK})`,
                borderRadius: 8, padding: "4px 14px",
                marginBottom: 14, display: "inline-block",
              }}>
                <h2 style={{
                  fontSize: 10, fontWeight: 900,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#fff", margin: 0,
                }}>
                  Skills
                </h2>
              </div>

              <div style={{
                display: "flex", flexWrap: "wrap", gap: 6,
              }}>
                {skills.map((s, i) => (
                  <span key={s.id} style={{
                    background: `${sectionColors[i % 4]}15`,
                    border: `1px solid ${sectionColors[i % 4]}35`,
                    color: sectionColors[i % 4],
                    borderRadius: 20, padding: "3px 10px",
                    fontSize: 9.5, fontWeight: 700,
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Decorative bottom bar ── */}
      <div style={{
        height: 6,
        background: `linear-gradient(90deg, ${TEAL}, ${ORANGE}, ${PINK}, ${PURPLE})`,
      }} />

    </div>
  );
}