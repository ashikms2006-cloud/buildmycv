export default function ExecutiveTemplate({ data, accentColor, fontStyle }) {
  const accent = accentColor || "#b45309";
  const { personal: p, experience, education, skills, customSections } = data;

  const Section = ({ title }) => (
    <div style={{ marginBottom: 10, marginTop: 20 }}>
      <h2 style={{
        fontSize: 11, fontWeight: 900,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: accent, margin: "0 0 6px",
        textAlign: "center",
      }}>{title}</h2>
      <div style={{ height: 1.5, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    </div>
  );

  return (
    <div style={{
      fontFamily: fontStyle || "'Times New Roman', serif",
      color: "#1a1a1a", background: "#fff",
      padding: "52px 56px", fontSize: 11,
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        {p.photo && (
          <img src={p.photo} alt="profile" style={{
            width: 80, height: 80, borderRadius: "50%",
            objectFit: "cover", border: `3px solid ${accent}`,
            marginBottom: 12,
          }} />
        )}
        <h1 style={{
          fontSize: 30, fontWeight: 900,
          color: "#0a0a0a", margin: "0 0 6px",
          letterSpacing: "2px", textTransform: "uppercase",
        }}>
          {p.name || "Your Name"}
        </h1>
        <div style={{ fontSize: 13, color: accent, fontWeight: 600, marginBottom: 8, fontStyle: "italic" }}>
          {p.title}
        </div>
        <div style={{ height: 2, background: accent, margin: "10px auto", width: 80 }} />
        <div style={{ fontSize: 10, color: "#555", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "3px 16px" }}>
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <>
          <Section title="Professional Summary" />
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 11, textAlign: "justify" }}>{p.summary}</p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <Section title="Professional Experience" />
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {e.role}
                </strong>
                <span style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>{e.period}</span>
              </div>
              <div style={{ color: accent, fontWeight: 600, fontSize: 11, marginBottom: 5 }}>
                {e.company}{e.location ? ` · ${e.location}` : ""}
              </div>
              {e.bullets.filter(Boolean).map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span style={{ color: accent, fontWeight: 900, flexShrink: 0 }}>◆</span>
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
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <strong style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{e.degree}</strong>
                <div style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>
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
          <Section title="Core Competencies" />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {skills.map((s) => (
              <span key={s.id} style={{
                border: `1px solid ${accent}`,
                color: accent, borderRadius: 3,
                padding: "3px 14px", fontSize: 10, fontWeight: 600,
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
            {sec.items.filter((i) => i.text).map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 8, width: "100%", marginBottom: 3 }}>
                <span style={{ color: accent, fontWeight: 700 }}>◆</span>
                <span style={{ color: "#4b5563" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}