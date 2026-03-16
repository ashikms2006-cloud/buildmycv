export default function AcademicTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || "#7c3aed";
  const { personal: p, experience, education, skills, customSections } = data;

  const Section = ({ title }) => (
    <div style={{ marginTop: 20, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <h2 style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: accent, margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: `${accent}30` }} />
      </div>
    </div>
  );

  return (
    <div style={{
      fontFamily: fontStyle || "'Georgia', serif",
      color: "#1a1a1a", background: "#fff",
      padding: "48px 52px", fontSize: 11,
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        {p.photo && (
          <img src={p.photo} alt="profile" style={{
            width: 86, height: 86, borderRadius: "50%",
            objectFit: "cover", border: `3px solid ${accent}`,
            marginBottom: 12,
          }} />
        )}
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0a0a0a", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
          {p.name || "Your Name"}
        </h1>
        <div style={{ fontSize: 13, color: accent, fontWeight: 600, marginBottom: 8 }}>{p.title}</div>
        <div style={{ fontSize: 10, color: "#6b7280", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "3px 14px" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0 0" }}>
          <div style={{ flex: 1, height: 1, background: `${accent}30` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent }} />
          <div style={{ flex: 1, height: 1, background: `${accent}30` }} />
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <>
          <Section title="Research Interests & Profile" />
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 11, borderLeft: `3px solid ${accent}30`, paddingLeft: 14, fontStyle: "italic" }}>
            {p.summary}
          </p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <Section title="Academic & Professional Experience" />
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14, borderLeft: `2px dashed ${accent}30`, paddingLeft: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12, fontWeight: 800 }}>{e.role}</strong>
                <span style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>{e.period}</span>
              </div>
              <div style={{ color: accent, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>
                {e.company}{e.location ? `, ${e.location}` : ""}
              </div>
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span style={{ color: "#4b5563", lineHeight: 1.6 }}>{b}</span>
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
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, paddingLeft: 14 }}>
              <div>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 10, color: "#6b7280" }}>{e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ""}</div>
              </div>
              <span style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>{e.period}</span>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <Section title="Skills & Expertise" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, paddingLeft: 14 }}>
            {skills.map((s) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#374151" }}>{s.name}</span>
                <span style={{ fontSize: 10, color: accent, marginLeft: "auto" }}>{s.level}%</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Custom Sections */}
      {(customSections || []).map((sec) => (
        <div key={sec.id}>
          <Section title={sec.title} />
          <div style={{ paddingLeft: 14 }}>
            {sec.items.filter((i) => i.text).map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ color: accent, fontWeight: 700 }}>•</span>
                <span style={{ color: "#4b5563" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}