export default function MinimalistTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || "#3B82F6";
  const { personal: p, experience, education, skills, customSections } = data;

  const Section = ({ title }) => (
    <div style={{ marginBottom: 6, marginTop: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h2 style={{
          fontSize: 11, fontWeight: 900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#111", margin: 0,
        }}>{title}</h2>
        <div style={{ flex: 1, height: 1.5, background: accent }} />
      </div>
    </div>
  );

  return (
    <div style={{
      fontFamily: fontStyle || "'Arial', sans-serif",
      color: "#1a1a1a", background: "#fff",
      padding: "48px 52px", fontSize: 11, lineHeight: 1.5,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#0a0a0a", margin: "0 0 4px", letterSpacing: "-1px" }}>
            {p.name || "Your Name"}
          </h1>
          <div style={{ fontSize: 13, color: accent, fontWeight: 700, marginBottom: 8 }}>
            {p.title || "Professional Title"}
          </div>
          <div style={{ fontSize: 10, color: "#6b7280", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
            {p.email    && <span>{p.email}</span>}
            {p.phone    && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
            {p.website  && <span>{p.website}</span>}
          </div>
        </div>
        {p.photo && (
          <img src={p.photo} alt="profile" style={{
            width: 72, height: 72, borderRadius: "50%",
            objectFit: "cover", border: `3px solid ${accent}`,
            marginLeft: 20, flexShrink: 0,
          }} />
        )}
      </div>

      {/* Summary */}
      {p.summary && (
        <>
          <Section title="Summary" />
          <p style={{ color: "#374151", lineHeight: 1.7, fontSize: 11 }}>{p.summary}</p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <Section title="Experience" />
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <strong style={{ fontSize: 12, fontWeight: 800 }}>{e.role}</strong>
                  <span style={{ color: accent, fontWeight: 600, marginLeft: 8 }}>{e.company}</span>
                </div>
                <span style={{ fontSize: 10, color: "#6b7280" }}>{e.period}</span>
              </div>
              {e.location && <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{e.location}</div>}
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span style={{ color: "#4b5563", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <Section title="Education" />
          {education.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 10, color: "#6b7280" }}>
                  {e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ""}
                </div>
              </div>
              <span style={{ fontSize: 10, color: "#6b7280" }}>{e.period}</span>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <Section title="Skills" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skills.map((s) => (
              <span key={s.id} style={{
                background: `${accent}12`, border: `1px solid ${accent}30`,
                color: accent, borderRadius: 20,
                padding: "3px 12px", fontSize: 10, fontWeight: 600,
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Custom Sections */}
      {(customSections || []).map((sec) => (
        <div key={sec.id}>
          <Section title={sec.title} />
          {sec.items.filter((i) => i.text).map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              <span style={{ color: accent, fontWeight: 700 }}>•</span>
              <span style={{ color: "#4b5563" }}>{item.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}