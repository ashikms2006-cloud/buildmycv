// ================================================
// MINIMALIST TEMPLATE
// Clean whitespace, bold headings, ATS friendly
// ================================================

const ACCENT = "#3B82F6";

function contactLine(p) {
  return [p.email, p.phone, p.location, p.website]
    .filter(Boolean)
    .join("  ·  ");
}

export default function MinimalistTemplate({ data }) {
  const { personal: p, experience, education, skills } = data;

  return (
    <div style={{
      background: "#fff",
      color: "#1a1a2e",
      fontFamily: "'Georgia', serif",
      padding: "40px 44px",
      minHeight: "100%",
      fontSize: 11,
    }}>

      {/* ── Header ── */}
      <div style={{
        borderBottom: "2px solid #1a1a2e",
        paddingBottom: 16,
        marginBottom: 20,
      }}>
        <h1 style={{
          fontSize: 28, fontWeight: 900,
          letterSpacing: "-1px", margin: "0 0 4px",
          fontFamily: "'Helvetica Neue', sans-serif",
          color: "#0a0a0f",
        }}>
          {p.name || "Your Name"}
        </h1>
        <div style={{
          fontSize: 13, fontWeight: 700,
          color: ACCENT, letterSpacing: "0.05em",
          marginBottom: 6, textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}>
          {p.title || "Job Title"}
        </div>
        <div style={{
          fontSize: 10, color: "#6b7280",
          letterSpacing: "0.03em", fontFamily: "sans-serif",
        }}>
          {contactLine(p)}
        </div>
      </div>

      {/* ── Summary ── */}
      {p.summary && (
        <div style={{ marginBottom: 18 }}>
          <h2 style={{
            fontSize: 9, fontWeight: 900,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#374151", marginBottom: 6, fontFamily: "sans-serif",
          }}>
            Summary
          </h2>
          <p style={{ lineHeight: 1.65, color: "#374151", fontSize: 10.5 }}>
            {p.summary}
          </p>
        </div>
      )}

      {/* ── Experience ── */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <h2 style={{
            fontSize: 9, fontWeight: 900,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#374151", marginBottom: 10,
            fontFamily: "sans-serif",
            borderBottom: "1px solid #e5e7eb", paddingBottom: 5,
          }}>
            Experience
          </h2>
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{
                  fontSize: 11, fontFamily: "sans-serif", fontWeight: 800,
                }}>
                  {e.role || "Role"}
                </strong>
                <span style={{
                  fontSize: 9, color: "#6b7280", fontFamily: "sans-serif",
                }}>
                  {e.period}
                </span>
              </div>
              <div style={{
                fontSize: 10, color: ACCENT,
                fontFamily: "sans-serif", fontWeight: 600, marginBottom: 5,
              }}>
                {e.company}{e.location ? ` — ${e.location}` : ""}
              </div>
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span style={{ color: ACCENT, flexShrink: 0 }}>▸</span>
                  <span style={{ lineHeight: 1.55, color: "#4b5563" }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {education.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <h2 style={{
            fontSize: 9, fontWeight: 900,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#374151", marginBottom: 10,
            fontFamily: "sans-serif",
            borderBottom: "1px solid #e5e7eb", paddingBottom: 5,
          }}>
            Education
          </h2>
          {education.map((e) => (
            <div key={e.id} style={{
              display: "flex", justifyContent: "space-between", marginBottom: 10,
            }}>
              <div>
                <strong style={{
                  fontSize: 11, fontFamily: "sans-serif", fontWeight: 800,
                }}>
                  {e.degree || "Degree"}
                </strong>
                <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "sans-serif" }}>
                  {e.institution}{e.gpa ? ` · GPA ${e.gpa}` : ""}
                </div>
              </div>
              <span style={{
                fontSize: 9, color: "#6b7280", fontFamily: "sans-serif",
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
            fontSize: 9, fontWeight: 900,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#374151", marginBottom: 8,
            fontFamily: "sans-serif",
            borderBottom: "1px solid #e5e7eb", paddingBottom: 5,
          }}>
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skills.map((s) => (
              <span key={s.id} style={{
                background: "#f0f9ff",
                border: `1px solid ${ACCENT}40`,
                color: ACCENT, padding: "3px 10px",
                borderRadius: 20, fontSize: 9.5,
                fontFamily: "sans-serif", fontWeight: 600,
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}