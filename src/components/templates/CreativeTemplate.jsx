export default function CreativeTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || "#60a5fa";
  const { personal: p, experience, education, skills, customSections } = data;

  return (
    <div style={{
      fontFamily: fontStyle || "'Arial', sans-serif",
      display: "flex", minHeight: 900,
      fontSize: 11, background: "#fff",
    }}>
      {/* ── Sidebar ── */}
      <div style={{
        width: "36%", background: "#1e3a5f",
        padding: "36px 24px", color: "#fff",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        {/* Photo / Initial */}
        <div style={{ textAlign: "center" }}>
          {p.photo ? (
            <img src={p.photo} alt="profile" style={{
              width: 90, height: 90, borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${accent}`,
              marginBottom: 10,
            }} />
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: `3px solid ${accent}`,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: 28, fontWeight: 900,
              color: "#fff", margin: "0 auto 10px",
            }}>
              {(p.name || "?").charAt(0)}
            </div>
          )}
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{p.name || "Your Name"}</div>
          <div style={{ fontSize: 10, color: accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {p.title}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>Contact</h3>
          {[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).map((val, i) => (
            <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginBottom: 5, wordBreak: "break-all" }}>{val}</div>
          ))}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Skills</h3>
            {skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 10, color: "rgba(255,255,255,0.85)" }}>
                  <span>{s.name}</span><span style={{ color: accent }}>{s.level}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 10 }}>
                  <div style={{ height: "100%", borderRadius: 10, background: accent, width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections in sidebar */}
        {(customSections || []).map((sec) => (
          <div key={sec.id}>
            <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
              {sec.title}
            </h3>
            {sec.items.filter((i) => i.text).map((item) => (
              <div key={item.id} style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginBottom: 5 }}>
                • {item.text}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, padding: "36px 28px" }}>
        {/* Summary */}
        {p.summary && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1e3a5f", marginBottom: 6, borderLeft: `3px solid ${accent}`, paddingLeft: 10 }}>Summary</h2>
            <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 11 }}>{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1e3a5f", marginBottom: 12, borderLeft: `3px solid ${accent}`, paddingLeft: 10 }}>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 12, fontWeight: 800 }}>{e.role}</strong>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{e.period}</span>
                </div>
                <div style={{ color: accent, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>
                  {e.company}{e.location ? ` · ${e.location}` : ""}
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                    <span style={{ color: accent, flexShrink: 0, fontWeight: 700 }}>›</span>
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
            <h2 style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1e3a5f", marginBottom: 10, borderLeft: `3px solid ${accent}`, paddingLeft: 10 }}>Education</h2>
            {education.map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>{e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ""}</div>
                </div>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{e.period}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}