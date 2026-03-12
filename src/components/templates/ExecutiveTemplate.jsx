// ================================================
// EXECUTIVE TEMPLATE
// Traditional, elegant, high-density layout
// ================================================

const GOLD = "#b45309";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean)
    .join("  ·  ");
}

export default function ExecutiveTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  return (
    <div style={{
      background: "#fff",
      color: "#1c1c1c",
      fontFamily: "'Times New Roman', serif",
      padding: "36px 44px",
      minHeight: "100%",
      fontSize: 10.5,
    }}>

      {/* ── Header ── */}
      <div style={{
        textAlign: "center",
        marginBottom: 18,
        borderBottom: `2px solid ${GOLD}`,
        paddingBottom: 16,
      }}>
        <h1 style={{
          fontSize: 24, fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: "0 0 4px",
          color: "#0a0a0f",
          fontFamily: "sans-serif",
        }}>
          {p.name || "Your Name"}
        </h1>
        <div style={{
          fontSize: 11, color: GOLD,
          fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "sans-serif", marginBottom: 6,
        }}>
          {p.title || "Professional Title"}
        </div>
        <div style={{
          fontSize: 9.5, color: "#6b7280",
          letterSpacing: "0.04em", fontFamily: "sans-serif",
        }}>
          {contactLine(p)}
        </div>
      </div>

      {/* ── Summary ── */}
      {p.summary && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{
            fontSize: 10, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#111", marginBottom: 6, fontFamily: "sans-serif",
          }}>
            Executive Summary
          </h2>
          <div style={{
            height: 1, background: `${GOLD}60`, marginBottom: 8,
          }} />
          <p style={{
            lineHeight: 1.7, color: "#374151",
            fontStyle: "italic", fontSize: 10.5,
          }}>
            {p.summary}
          </p>
        </div>
      )}

      {/* ── Experience ── */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{
            fontSize: 10, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#111", marginBottom: 6, fontFamily: "sans-serif",
          }}>
            Professional Experience
          </h2>
          <div style={{
            height: 1, background: `${GOLD}60`, marginBottom: 10,
          }} />
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}>
                <div>
                  <strong style={{
                    fontSize: 11, fontFamily: "sans-serif",
                    fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {e.role || "Role"}
                  </strong>
                  <span style={{
                    fontSize: 10, color: GOLD,
                    fontFamily: "sans-serif",
                    fontWeight: 700, marginLeft: 8,
                  }}>
                    {e.company}
                  </span>
                </div>
                <span style={{
                  fontSize: 9, color: "#6b7280",
                  fontFamily: "sans-serif", fontStyle: "italic",
                }}>
                  {e.period}{e.location ? ` | ${e.location}` : ""}
                </span>
              </div>
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, marginTop: 4,
                }}>
                  <span style={{
                    color: GOLD, flexShrink: 0, fontSize: 9,
                  }}>◆</span>
                  <span style={{ lineHeight: 1.6, color: "#374151" }}>
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
        <div style={{ marginBottom: 16 }}>
          <h2 style={{
            fontSize: 10, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#111", marginBottom: 6, fontFamily: "sans-serif",
          }}>
            Education
          </h2>
          <div style={{
            height: 1, background: `${GOLD}60`, marginBottom: 10,
          }} />
          {education.map((e) => (
            <div key={e.id} style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}>
              <div>
                <strong style={{
                  fontSize: 11, fontFamily: "sans-serif", fontWeight: 800,
                }}>
                  {e.degree || "Degree"}
                </strong>
                <div style={{
                  fontSize: 10, color: "#6b7280", fontFamily: "sans-serif",
                }}>
                  {e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ""}
                </div>
              </div>
              <span style={{
                fontSize: 9, color: "#6b7280",
                fontFamily: "sans-serif", fontStyle: "italic",
              }}>
                {e.period}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Skills ── */}
      {skills.length > 0 && (
        <div>
          <h2 style={{
            fontSize: 10, fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#111", marginBottom: 6, fontFamily: "sans-serif",
          }}>
            Core Competencies
          </h2>
          <div style={{
            height: 1, background: `${GOLD}60`, marginBottom: 8,
          }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
            {skills.map((s) => (
              <span key={s.id} style={{
                fontSize: 10, color: "#374151", fontFamily: "sans-serif",
              }}>
                ◆ {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

