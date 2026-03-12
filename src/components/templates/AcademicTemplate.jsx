// ================================================
// ACADEMIC TEMPLATE
// Research/professor style with formal structure
// ================================================

const DARK = "#1a1a2e";
const ACCENT = "#7c3aed";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean)
    .join("  ·  ");
}

export default function AcademicTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  return (
    <div style={{
      background: "#fff",
      color: DARK,
      fontFamily: "'Georgia', serif",
      padding: "40px 50px",
      minHeight: "100%",
      fontSize: 11,
    }}>

      {/* ── Header ── */}
      <div style={{
        textAlign: "center",
        marginBottom: 24,
        paddingBottom: 20,
      }}>
        {/* Photo */}
        {p.photo ? (
          <img src={p.photo} alt="profile" style={{
            width: 80, height: 80, borderRadius: "50%",
            objectFit: "cover", marginBottom: 12,
            border: `3px solid ${ACCENT}`,
          }} />
        ) : (
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `${ACCENT}20`,
            border: `3px solid ${ACCENT}`,
            display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 12px",
            fontSize: 28, fontWeight: 900, color: ACCENT,
          }}>
            {(p.name || "?").charAt(0)}
          </div>
        )}

        <h1 style={{
          fontSize: 26, fontWeight: 900,
          letterSpacing: "0.04em",
          margin: "0 0 6px", color: DARK,
          fontFamily: "'Georgia', serif",
        }}>
          {p.name || "Your Name"}
        </h1>

        <div style={{
          fontSize: 12, color: ACCENT,
          fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "sans-serif", marginBottom: 10,
        }}>
          {p.title || "Academic Title"}
        </div>

        <div style={{
          fontSize: 9.5, color: "#6b7280",
          fontFamily: "sans-serif",
        }}>
          {contactLine(p)}
        </div>

        {/* Decorative line */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: 12, marginTop: 16,
        }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: ACCENT,
          }} />
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>
      </div>

      {/* ── Research Summary ── */}
      {p.summary && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 900,
            color: DARK, marginBottom: 8,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
          }}>
            Research Interests & Profile
          </h2>
          <p style={{
            lineHeight: 1.8, color: "#374151",
            fontSize: 10.5, fontStyle: "italic",
            borderLeft: `3px solid ${ACCENT}`,
            paddingLeft: 14,
          }}>
            {p.summary}
          </p>
        </div>
      )}

      {/* ── Academic Experience ── */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 900,
            color: DARK, marginBottom: 4,
            fontFamily: "'Georgia', serif",
          }}>
            Academic & Professional Experience
          </h2>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
            marginBottom: 14,
          }} />
          {experience.map((e) => (
            <div key={e.id} style={{
              marginBottom: 16,
              paddingLeft: 16,
              borderLeft: `1px dashed #d1d5db`,
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}>
                <strong style={{
                  fontSize: 11, fontWeight: 800,
                  color: DARK, fontFamily: "sans-serif",
                }}>
                  {e.role || "Position"}
                </strong>
                <span style={{
                  fontSize: 9.5, color: "#6b7280",
                  fontFamily: "sans-serif", fontStyle: "italic",
                }}>
                  {e.period}
                </span>
              </div>
              <div style={{
                fontSize: 10, color: ACCENT,
                fontWeight: 700, fontFamily: "sans-serif",
                marginBottom: 6,
              }}>
                {e.company}{e.location ? `, ${e.location}` : ""}
              </div>
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{
                  display: "flex", gap: 8, marginBottom: 4,
                }}>
                  <span style={{
                    color: ACCENT, flexShrink: 0,
                    fontSize: 10, marginTop: 1,
                  }}>
                    ○
                  </span>
                  <span style={{
                    lineHeight: 1.65, color: "#374151",
                    fontFamily: "sans-serif", fontSize: 10.5,
                  }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 900,
            color: DARK, marginBottom: 4,
            fontFamily: "'Georgia', serif",
          }}>
            Education
          </h2>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
            marginBottom: 14,
          }} />
          {education.map((e) => (
            <div key={e.id} style={{
              marginBottom: 12,
              paddingLeft: 16,
              borderLeft: `1px dashed #d1d5db`,
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
              }}>
                <strong style={{
                  fontSize: 11, fontWeight: 800,
                  fontFamily: "sans-serif",
                }}>
                  {e.degree || "Degree"}
                </strong>
                <span style={{
                  fontSize: 9.5, color: "#6b7280",
                  fontFamily: "sans-serif", fontStyle: "italic",
                }}>
                  {e.period}
                </span>
              </div>
              <div style={{
                fontSize: 10, color: "#6b7280",
                fontFamily: "sans-serif",
              }}>
                {e.institution}
                {e.gpa ? (
                  <span style={{
                    color: ACCENT, fontWeight: 700, marginLeft: 8,
                  }}>
                    GPA: {e.gpa}
                  </span>
                ) : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Skills / Competencies ── */}
      {skills.length > 0 && (
        <div>
          <h2 style={{
            fontSize: 13, fontWeight: 900,
            color: DARK, marginBottom: 4,
            fontFamily: "'Georgia', serif",
          }}>
            Research Skills & Competencies
          </h2>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
            marginBottom: 12,
          }} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}>
            {skills.map((s) => (
              <div key={s.id} style={{
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: ACCENT, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 10.5, color: "#374151",
                  fontFamily: "sans-serif",
                }}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}