// ================================================
// EDITOR PAGE — Full featured with A4 PDF export
// ================================================

import { useRef, useState } from "react";
import { Download, Palette, Type, ZoomIn, ZoomOut, FileSearch } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EditorForm from "./EditorForm";
import ResumePreview from "./ResumePreview";
import { DUMMY_DATA } from "../data/dummyData";

const COLORS = {
  bg: "#0a0a0b",
  surface: "#111114",
  card: "#16161a",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6",
  muted: "#6b7280",
  text: "#e8e8f0",
};

const TEMPLATES = [
  { id: "minimalist",   label: "Minimalist" },
  { id: "creative",     label: "Creative" },
  { id: "executive",    label: "Executive" },
  { id: "corporate",    label: "Corporate" },
  { id: "academic",     label: "Academic" },
  { id: "creativearts", label: "Creative Arts" },
];

const FONTS = [
  { id: "sans",   label: "Modern",  value: "'Inter', sans-serif" },
  { id: "serif",  label: "Classic", value: "'Georgia', serif" },
  { id: "mono",   label: "Tech",    value: "'Courier New', monospace" },
  { id: "lexend", label: "Lexend",  value: "'Lexend', sans-serif" },
];

const ACCENT_COLORS = [
  { id: "blue",   label: "Blue",   value: "#3B82F6" },
  { id: "purple", label: "Purple", value: "#7c3aed" },
  { id: "green",  label: "Green",  value: "#10b981" },
  { id: "red",    label: "Red",    value: "#ef4444" },
  { id: "orange", label: "Orange", value: "#f97316" },
  { id: "pink",   label: "Pink",   value: "#ec4899" },
  { id: "teal",   label: "Teal",   value: "#0d9488" },
  { id: "gold",   label: "Gold",   value: "#b45309" },
];

// ── ATS Score Calculator ──
function calcATSScore(data) {
  let score = 0;
  const issues = [];
  const tips = [];
  const p = data.personal;

  if (p.name)     { score += 10; } else { issues.push("Missing full name"); }
  if (p.email)    { score += 8;  } else { issues.push("Missing email address"); }
  if (p.phone)    { score += 7;  } else { issues.push("Missing phone number"); }
  if (p.location) { score += 5;  } else { issues.push("Missing location"); }
  if (p.linkedin) { score += 5;  } else { tips.push("Add LinkedIn profile URL"); }
  if (p.title)    { score += 8;  } else { issues.push("Missing job title"); }

  if (p.summary) {
    score += 10;
    if (p.summary.length < 100) tips.push("Summary too short — aim for 100+ characters");
  } else {
    issues.push("Missing professional summary");
  }

  if (data.experience.length === 0) {
    issues.push("No work experience added");
  } else if (data.experience.length === 1) {
    score += 10;
    tips.push("Add more experience entries if available");
  } else {
    score += 20;
  }

  const totalBullets = data.experience.reduce(
    (acc, e) => acc + e.bullets.filter(Boolean).length, 0
  );
  if (totalBullets >= 6)      { score += 10; }
  else if (totalBullets > 0)  { score += 5; tips.push("Add more bullet points (2-3 per role)"); }
  else                        { issues.push("Add bullet points to experience entries"); }

  if (data.education.length === 0) { issues.push("No education added"); }
  else { score += 10; }

  if (data.skills.length === 0)      { issues.push("No skills added"); }
  else if (data.skills.length < 4)   { score += 5; tips.push("Add more skills (aim for 5+)"); }
  else                               { score += 7; }

  return {
    score: Math.min(score, 100),
    issues, tips,
    grade: score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D",
    color: score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444",
  };
}

export default function EditorPage({ data, setData, template, setTemplate }) {
  const fullPreviewRef              = useRef();
  const [accentColor, setAccentColor]       = useState("#3B82F6");
  const [fontStyle, setFontStyle]           = useState(FONTS[0].value);
  const [zoom, setZoom]                     = useState(0.72);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker]   = useState(false);
  const [showATS, setShowATS]               = useState(false);
  const [isGenerating, setIsGenerating]     = useState(false);

  const ats = calcATSScore(data);

  // ── A4 PDF Download ──
  const handleDownloadPDF = async () => {
    const element = fullPreviewRef.current;
    if (!element) return;
    setIsGenerating(true);

    try {
      // Temporarily make it full size for capture
      const originalStyle = element.style.cssText;
      element.style.cssText = `
        width: 794px !important;
        transform: none !important;
        position: absolute !important;
        top: -9999px !important;
        left: 0 !important;
        background: white !important;
      `;

      // Wait for reflow
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        windowWidth: 794,
      });

      // Restore original style
      element.style.cssText = originalStyle;

      // A4 dimensions
      const A4_WIDTH_MM  = 210;
      const A4_HEIGHT_MM = 297;
      const A4_WIDTH_PX  = canvas.width;
      const A4_HEIGHT_PX = Math.round((A4_HEIGHT_MM / A4_WIDTH_MM) * A4_WIDTH_PX);

      const totalPages = Math.ceil(canvas.height / A4_HEIGHT_PX);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const pageCanvas  = document.createElement("canvas");
        pageCanvas.width  = A4_WIDTH_PX;
        const sliceHeight = Math.min(
          A4_HEIGHT_PX,
          canvas.height - page * A4_HEIGHT_PX
        );
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0, page * A4_HEIGHT_PX,
          A4_WIDTH_PX, sliceHeight,
          0, 0,
          A4_WIDTH_PX, sliceHeight
        );

        const imgData       = pageCanvas.toDataURL("image/png");
        const pageHeightMM  = (sliceHeight / A4_HEIGHT_PX) * A4_HEIGHT_MM;

        pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH_MM, pageHeightMM);
      }

      pdf.save(`${data.personal.name || "resume"}.pdf`);

    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF error: " + err.message);
    }

    setIsGenerating(false);
  };

  return (
    <div style={{
      height: "100vh", display: "flex",
      flexDirection: "column",
      background: COLORS.bg, paddingTop: 64,
    }}>

      {/* ── Toolbar ── */}
      <div style={{
        background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "8px 16px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        gap: 10, flexWrap: "wrap",
      }}>

        {/* Template switcher */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => setTemplate(t.id)}
              style={{
                background: template === t.id
                  ? "rgba(59,130,246,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${template === t.id
                  ? "rgba(59,130,246,0.4)"
                  : COLORS.border}`,
                color: template === t.id ? COLORS.accent : COLORS.muted,
                padding: "5px 12px", borderRadius: 7,
                cursor: "pointer", fontSize: 11, fontWeight: 600,
                transition: "all 0.2s",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Right tools */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

          {/* Zoom */}
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8, padding: "4px 8px",
          }}>
            <button
              onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(1)))}
              style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", padding: "2px 4px" }}>
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: 11, color: COLORS.text, width: 36, textAlign: "center" }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.2, +(z + 0.1).toFixed(1)))}
              style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", padding: "2px 4px" }}>
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Color picker */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setShowColorPicker((s) => !s); setShowFontPicker(false); setShowATS(false); }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text, padding: "6px 12px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: accentColor }} />
              <Palette size={13} /> Color
            </button>

            {showColorPicker && (
              <div style={{
                position: "absolute", top: "110%", right: 0,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: 14,
                zIndex: 200, width: 200,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, fontWeight: 600 }}>
                  Accent Color
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ACCENT_COLORS.map((c) => (
                    <button key={c.id}
                      onClick={() => { setAccentColor(c.value); setShowColorPicker(false); }}
                      title={c.label}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: c.value, cursor: "pointer",
                        border: accentColor === c.value
                          ? "3px solid #fff"
                          : "3px solid transparent",
                        boxShadow: accentColor === c.value
                          ? `0 0 8px ${c.value}`
                          : "none",
                      }}
                    />
                  ))}
                </div>
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: 10, color: COLORS.muted, marginBottom: 5 }}>Custom</p>
                  <input type="color" value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{ width: "100%", height: 32, borderRadius: 6, border: "none", cursor: "pointer" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Font picker */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setShowFontPicker((s) => !s); setShowColorPicker(false); setShowATS(false); }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text, padding: "6px 12px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
              <Type size={13} /> Font
            </button>

            {showFontPicker && (
              <div style={{
                position: "absolute", top: "110%", right: 0,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: 14,
                zIndex: 200, width: 180,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, fontWeight: 600 }}>
                  Font Style
                </p>
                {FONTS.map((f) => (
                  <button key={f.id}
                    onClick={() => { setFontStyle(f.value); setShowFontPicker(false); }}
                    style={{
                      width: "100%", textAlign: "left",
                      background: fontStyle === f.value
                        ? "rgba(59,130,246,0.12)"
                        : "none",
                      border: `1px solid ${fontStyle === f.value
                        ? "rgba(59,130,246,0.3)"
                        : "transparent"}`,
                      color: fontStyle === f.value ? COLORS.accent : COLORS.text,
                      padding: "8px 12px", borderRadius: 8,
                      cursor: "pointer", marginBottom: 4,
                      fontFamily: f.value, fontSize: 13,
                    }}>
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ATS Score */}
          <button
            onClick={() => { setShowATS((s) => !s); setShowColorPicker(false); setShowFontPicker(false); }}
            style={{
              background: `${ats.color}18`,
              border: `1px solid ${ats.color}40`,
              color: ats.color, padding: "6px 12px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 6,
            }}>
            <FileSearch size={13} />
            ATS: {ats.score}%
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
              border: "none", color: "#fff",
              padding: "7px 18px", borderRadius: 8,
              cursor: isGenerating ? "wait" : "pointer",
              fontSize: 12, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 7,
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              opacity: isGenerating ? 0.7 : 1,
            }}>
            <Download size={14} />
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* ── ATS Panel ── */}
      {showATS && (
        <div style={{
          background: COLORS.card,
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "16px 24px",
          display: "flex", gap: 32,
          alignItems: "flex-start", flexWrap: "wrap",
        }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              border: `4px solid ${ats.color}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: `${ats.color}12`,
            }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: ats.color }}>
                {ats.grade}
              </span>
            </div>
            <p style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>
              {ats.score}/100
            </p>
          </div>

          {ats.issues.length > 0 && (
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>
                ❌ Issues to Fix
              </p>
              {ats.issues.map((issue, i) => (
                <div key={i} style={{ fontSize: 11, color: COLORS.text, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: "#ef4444" }}>•</span> {issue}
                </div>
              ))}
            </div>
          )}

          {ats.tips.length > 0 && (
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", marginBottom: 8 }}>
                💡 Tips to Improve
              </p>
              {ats.tips.map((tip, i) => (
                <div key={i} style={{ fontSize: 11, color: COLORS.text, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: "#f59e0b" }}>•</span> {tip}
                </div>
              ))}
            </div>
          )}

          {ats.issues.length === 0 && ats.tips.length === 0 && (
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, color: "#10b981", fontWeight: 700 }}>
                ✅ Your resume looks great! ATS optimized.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Split Pane ── */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "420px 1fr",
        overflow: "hidden",
      }}>

        {/* Left: Form */}
        <div style={{ borderRight: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
          <EditorForm
            data={data}
            setData={setData}
            onAutoFill={() => setData(DUMMY_DATA)}
            accentColor={accentColor}
          />
        </div>

        {/* Right: Preview wrapper */}
        <div style={{ overflow: "auto", background: "#e5e7eb", position: "relative" }}>

          {/* Visible scaled preview */}
          <div style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            minHeight: 900,
            background: "#fff",
            fontFamily: fontStyle,
          }}>
            <ResumePreview
              data={data}
              template={template}
              accentColor={accentColor}
              fontStyle={fontStyle}
            />
          </div>

          {/* Hidden full-size div used only for PDF capture */}
          <div
            ref={fullPreviewRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: 794,
              background: "#fff",
              fontFamily: fontStyle,
              pointerEvents: "none",
              opacity: 0,
              zIndex: -1,
            }}
          >
            <ResumePreview
              data={data}
              template={template}
              accentColor={accentColor}
              fontStyle={fontStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}