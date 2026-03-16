export default function CreativeArtsTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || "#ec4899";
  const { personal: p, experience, education, skills, customSections } = data;
  const GRAD = `linear-gradient(135deg, #7c3aed, ${accent}, #f97316)`;

  return (
    <div style={{
      fontFamily: fontStyle || "'Arial', sans-serif",
      background: "#fff", fontSize: 11,
    }}>
      {/* Top gradient bar */}
      <div style={{ height: 6, background: GRAD }} />

      <div style={{ padding: "32px 44px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
          {p.photo ? (
            <img src={p.photo} alt="profile" style={{
              width: 80, height: 80, borderRadius: 16,
              objectFit: "cover",
              border: `3px solid transparent`,
              background: GRAD,
              flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: 70, height: 70, borderRadius: 16,
              background: GRAD,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: 28, fontWeight: 900,
              color: "#fff", flexShrink: 0,
            }}>
              {(p.name || "?").charAt(0)}
            </div>
          )}
          <div>
            <h1 style={{
              fontSize: 28, fontWeight: 900, margin: "0 0 4px",
              background: GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}>
              {p.name || "Your Name"}
            </h1>
            <div style={{ fontSize: 13, color: "#f97316", fontWeight: 700, marginBottom: 8 }}>{p.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((val, i) => (
                <span key={i} style={{
                  background: "#f9f5ff", border: "1px solid #e9d5ff",
                  borderRadius: 20, padding: "2px 10px",
                  fontSize: 9, color: "#7c3aed", fontWeight: 600,
                }}>{val}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        {p.summary && (
          <div style={{ marginBottom: 18, background: "#fdf4ff", borderRadius: 10, padding: 14, border: "1px solid #f3e8ff" }}>
            <p style={{ color: "#374151", lineHeight: 1.7, margin: 0, fontStyle: "italic", fontSize: 11 }}>{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 10 }}>
              Experience
            </h2>
            {experience.map((e, idx) => {
              const colors = ["#7c3aed", accent, "#f97316", "#0d9488"];
              const c = colors[idx % colors.length];
              return (
                <div key={e.id} style={{ marginBottom: 14, borderLeft: `3px solid ${c}`, paddingLeft: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 12, fontWeight: 800 }}>{e.role}</strong>
                    <span style={{ fontSize: 10, color: "#9ca3af" }}>{e.period}</span>
                  </div>
                  <div style={{ color: c, fontWeight: 600, fontSize: 11, marginBottom: 5 }}>
                    {e.company}{e.location ? ` · ${e.location}` : ""}
                  </div>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                      <span style={{ color: c, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <span style={{ color: "#4b5563", lineHeight: 1.5 }}>{b}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Education + Skills side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 14 }}>
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
                Education
              </h2>
              {education.map((e) => (
                <div key={e.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 11 }}>{e.degree}</strong>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>{e.institution}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>{e.period}{e.gpa ? ` · GPA: ${e.gpa}` : ""}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
                Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {skills.map((s, idx) => {
                  const colors = ["#7c3aed", accent, "#f97316", "#0d9488"];
                  const c = colors[idx % colors.length];
                  return (
                    <span key={s.id} style={{
                      background: `${c}12`, border: `1px solid ${c}30`,
                      color: c, borderRadius: 20,
                      padding: "3px 10px", fontSize: 10, fontWeight: 600,
                    }}>
                      {s.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Custom Sections */}
        {(customSections || []).map((sec) => (
          <div key={sec.id} style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
              {sec.title}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {sec.items.filter((i) => i.text).map((item, idx) => {
                const colors = ["#7c3aed", accent, "#f97316", "#0d9488"];
                const c = colors[idx % colors.length];
                return (
                  <span key={item.id} style={{
                    background: `${c}10`, border: `1px solid ${c}25`,
                    color: c, borderRadius: 20,
                    padding: "3px 12px", fontSize: 10, fontWeight: 600,
                  }}>
                    {item.text}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, #0d9488, #f97316, ${accent}, #7c3aed)` }} />
    </div>
  );
}