// ================================================
// CREATIVE TEMPLATE
// Two-column layout with dark sidebar
// ================================================

const SIDEBAR_BG = "#1e3a5f";
const SIDEBAR_ACCENT = "#60a5fa";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean);
}

export default function CreativeTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  return (
    <div style={{
      background: "#fff",
      color: "#1a1a2e",
      fontFamily: "'Helvetica Neue', sans-serif",
      display: "flex",
      minHeight: "100%",
      fontSize: 11,
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: "36%",
        background: SIDEBAR_BG,
        color: "#e2e8f0",
        padding: "36px 20px",
        flexShrink: 0,
      }}>

        {/* Avatar initial */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: SIDEBAR_ACCENT,
          display: "flex", alignItems: "center",
          justifyContent: "center",
          marginBottom: 16, fontSize: 22,
          fontWeight: 900, color: SIDEBAR_BG,
        }}>
          {(p.name || "?").charAt(0)}
        </div>

        {/* Name & Title */}
        <h1 style={{
          fontSize: 16, fontWeight: 900,
          lineHeight: 1.2, marginBottom: 4, color: "#fff",
        }}>
          {p.name || "Your Name"}
        </h1>
        <div style={{
          fontSize: 10, color: SIDEBAR_ACCENT,
          fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 20,
        }}>
          {p.title || "Job Title"}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 9, fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: SIDEBAR_ACCENT, marginBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: 5,
          }}>
            Contact
          </div>
          {contactLine(p).map((c, i) => (
            <div key={i} style={{
              fontSize: 9.5, color: "#cbd5e1",
              marginBottom: 5, lineHeight: 1.4,
              wordBreak: "break-all",
            }}>
              {c}
            </div>
          ))}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 9, fontWeight: 800,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: SIDEBAR_ACCENT, marginBottom: 10,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: 5,
            }}>
              Skills
            </div>
            {skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 8 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", marginBottom: 3,
                }}>
                  <span style={{ fontSize: 9.5, color: "#e2e8f0" }}>{s.name}</span>
                  <span style={{ fontSize: 8.5, color: SIDEBAR_ACCENT }}>{s.level}%</span>
                </div>
                <div style={{
                  height: 3,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                }}>
                  <div style={{
                    height: "100%",
                    background: SIDEBAR_ACCENT,
                    borderRadius: 2,
                    width: `${s.level}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, padding: "36px 24px" }}>

        {/* Summary */}
        {p.summary && (
          <div style={{ marginBottom: 18 }}>
            <h2 style={{
              fontSize: 9, fontWeight: 900,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: SIDEBAR_BG, marginBottom: 6,
              borderLeft: `3px solid ${SIDEBAR_ACCENT}`,
              paddingLeft: 8,
            }}>
              Profile
            </h2>
            <p style={{ lineHeight: 1.65, color: "#4b5563", fontSize: 10.5 }}>
              {p.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <h2 style={{
              fontSize: 9, fontWeight: 900,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: SIDEBAR_BG, marginBottom: 10,
              borderLeft: `3px solid ${SIDEBAR_ACCENT}`,
              paddingLeft: 8,
            }}>
              Experience
            </h2>
            {experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 14, paddingLeft: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>
                    {e.role || "Role"}
                  </strong>
                  <span style={{
                    fontSize: 9, color: "#9ca3af", fontStyle: "italic",
                  }}>
                    {e.period}
                  </span>
                </div>
                <div style={{
                  fontSize: 10, color: SIDEBAR_ACCENT,
                  fontWeight: 700, marginBottom: 5,
                }}>
                  {e.company}
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                    <span style={{
                      color: SIDEBAR_ACCENT, flexShrink: 0, marginTop: 1,
                    }}>▸</span>
                    <span style={{ color: "#4b5563", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={{
              fontSize: 9, fontWeight: 900,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: SIDEBAR_BG, marginBottom: 10,
              borderLeft: `3px solid ${SIDEBAR_ACCENT}`,
              paddingLeft: 8,
            }}>
              Education
            </h2>
            {education.map((e) => (
              <div key={e.id} style={{ marginBottom: 10, paddingLeft: 8 }}>
                <strong style={{ fontSize: 11, fontWeight: 800 }}>
                  {e.degree || "Degree"}
                </strong>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10, color: "#6b7280" }}>
                    {e.institution}
                  </span>
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>
                    {e.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}