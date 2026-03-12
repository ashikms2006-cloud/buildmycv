// ================================================
// CORPORATE TEMPLATE
// Formal business layout with navy blue accents
// ================================================

const NAVY = "#1e3a5f";
const NAVY_LIGHT = "#2d5a8e";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean)
    .join("  |  ");
}

export default function CorporateTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  return (
    <div style={{
      background: "#fff",
      color: "#1a1a2e",
      fontFamily: "'Arial', sans-serif",
      minHeight: "100%",
      fontSize: 11,
    }}>

      {/* ── Top Navy Header Bar ── */}
      <div style={{
        background: NAVY,
        padding: "28px 40px",
        color: "#fff",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}>
          {/* Photo or Initial */}
          {p.photo ? (
            <img
              src={p.photo}
              alt="profile"
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}
            />
          ) : (
            <div style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: NAVY_LIGHT,
              border: "3px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 900,
              color: "#fff",
              flexShrink: 0,
            }}>
              {(p.name || "?").charAt(0)}
            </div>
          )}

          {/* Name and Title */}
          <div>
            <h1 style={{
              fontSize: 26,
              fontWeight: 900,
              margin: "0 0 4px",
              color: "#fff",
              letterSpacing: "0.02em",
            }}>
              {p.name || "Your Name"}
            </h1>
            <div style={{
              fontSize: 13,
              color: "#93c5fd",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              {p.title || "Professional Title"}
            </div>
          </div>
        </div>

        {/* Contact bar */}
        <div style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          fontSize: 9.5,
          color: "#bfdbfe",
          letterSpacing: "0.03em",
        }}>
          {contactLine(p)}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex" }}>

        {/* ── Main Column ── */}
        <div style={{ flex: 1, padding: "24px 32px" }}>

          {/* Summary */}
          {p.summary && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}>
                <div style={{
                  height: 16,
                  width: 4,
                  background: NAVY,
                  borderRadius: 2,
                }} />
                <h2 style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: NAVY,
                  margin: 0,
                }}>
                  Professional Summary
                </h2>
              </div>
              <div style={{
                height: 1,
                background: "#e2e8f0",
                marginBottom: 10,
              }} />
              <p style={{
                lineHeight: 1.7,
                color: "#374151",
                fontSize: 10.5,
              }}>
                {p.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}>
                <div style={{
                  height: 16,
                  width: 4,
                  background: NAVY,
                  borderRadius: 2,
                }} />
                <h2 style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: NAVY,
                  margin: 0,
                }}>
                  Professional Experience
                </h2>
              </div>
              <div style={{
                height: 1,
                background: "#e2e8f0",
                marginBottom: 12,
              }} />

              {experience.map((e) => (
                <div key={e.id} style={{ marginBottom: 16 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 3,
                  }}>
                    <div>
                      <strong style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#111",
                      }}>
                        {e.role || "Role"}
                      </strong>
                      <span style={{
                        fontSize: 10,
                        color: NAVY_LIGHT,
                        fontWeight: 700,
                        marginLeft: 8,
                      }}>
                        @ {e.company}
                      </span>
                    </div>
                    <div style={{
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontSize: 9,
                      color: NAVY,
                      fontWeight: 600,
                    }}>
                      {e.period}
                    </div>
                  </div>

                  {e.location && (
                    <div style={{
                      fontSize: 9.5,
                      color: "#6b7280",
                      marginBottom: 5,
                    }}>
                      {e.location}
                    </div>
                  )}

                  {e.bullets.filter(Boolean).map((b, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 3,
                    }}>
                      <span style={{
                        color: NAVY,
                        flexShrink: 0,
                        fontWeight: 700,
                      }}>
                        —
                      </span>
                      <span style={{
                        lineHeight: 1.55,
                        color: "#4b5563",
                      }}>
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
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}>
                <div style={{
                  height: 16,
                  width: 4,
                  background: NAVY,
                  borderRadius: 2,
                }} />
                <h2 style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: NAVY,
                  margin: 0,
                }}>
                  Education
                </h2>
              </div>
              <div style={{
                height: 1,
                background: "#e2e8f0",
                marginBottom: 12,
              }} />

              {education.map((e) => (
                <div key={e.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}>
                  <div>
                    <strong style={{
                      fontSize: 11,
                      fontWeight: 800,
                    }}>
                      {e.degree || "Degree"}
                    </strong>
                    <div style={{
                      fontSize: 10,
                      color: "#6b7280",
                    }}>
                      {e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ""}
                    </div>
                  </div>
                  <div style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 9,
                    color: NAVY,
                    fontWeight: 600,
                    alignSelf: "flex-start",
                  }}>
                    {e.period}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <div style={{
          width: "30%",
          background: "#f8fafc",
          borderLeft: "1px solid #e2e8f0",
          padding: "24px 20px",
        }}>
          {skills.length > 0 && (
            <div>
              <h2 style={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: NAVY,
                marginBottom: 12,
              }}>
                Core Skills
              </h2>

              {skills.map((s) => (
                <div key={s.id} style={{ marginBottom: 10 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}>
                    <span style={{
                      fontSize: 10,
                      color: "#374151",
                      fontWeight: 600,
                    }}>
                      {s.name}
                    </span>
                    <span style={{
                      fontSize: 9,
                      color: NAVY_LIGHT,
                      fontWeight: 700,
                    }}>
                      {s.level}%
                    </span>
                  </div>
                  <div style={{
                    height: 5,
                    background: "#e2e8f0",
                    borderRadius: 10,
                  }}>
                    <div style={{
                      height: "100%",
                      borderRadius: 10,
                      background: `linear-gradient(90deg, ${NAVY}, ${NAVY_LIGHT})`,
                      width: `${s.level}%`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}