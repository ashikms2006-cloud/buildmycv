import EditorForm from "./EditorForm";
import ResumePreview from "./ResumePreview";
import { DUMMY_DATA } from "../data/dummyData";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download, Palette, Type, ZoomIn, ZoomOut,
  FileSearch, Sun, Moon, Target, X,
  Printer, Share2, Lightbulb, Undo2, Redo2,
  Copy, Check,
} from "lucide-react";

export default function EditorPage({
  data, setData, template, setTemplate,
  canUndo, canRedo, onUndo, onRedo,
}) {
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [fontStyle, setFontStyle]     = useState("'Inter', sans-serif");
  const [zoom, setZoom]               = useState(0.72);
  const [activeFormTab, setActiveFormTab] = useState("personal");
  const fullPreviewRef = useRef();

  const TEMPLATES = [
    { id: "minimalist",     label: "Minimalist" },
    { id: "creative",       label: "Creative" },
    { id: "executive",      label: "Executive" },
    { id: "corporate",      label: "Corporate" },
    { id: "academic",       label: "Academic" },
    { id: "creativearts",   label: "Creative Arts" },
    { id: "professionalcv", label: "⭐ Pro CV" },
  ];

  const handleDownloadPDF = async () => {
    const element = fullPreviewRef.current;
    if (!element) return;
    try {
      element.style.position  = "fixed";
      element.style.left      = "0px";
      element.style.top       = "0px";
      element.style.zIndex    = "9999";
      element.style.width     = "794px";
      element.style.background = "#ffffff";
      await new Promise((r) => setTimeout(r, 600));
      const canvas = await html2canvas(element, {
        scale: 2, useCORS: true,
        backgroundColor: "#ffffff",
        width: 794, windowWidth: 794,
      });
      element.style.left   = "-9999px";
      element.style.zIndex = "-9999";
      const A4_W_MM = 210, A4_H_MM = 297;
      const A4_W_PX = canvas.width;
      const A4_H_PX = Math.round((A4_H_MM / A4_W_MM) * A4_W_PX);
      const totalPages = Math.ceil(canvas.height / A4_H_PX);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        const pc = document.createElement("canvas");
        pc.width = A4_W_PX;
        const sliceH = Math.min(A4_H_PX, canvas.height - page * A4_H_PX);
        pc.height = sliceH;
        const ctx = pc.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pc.width, pc.height);
        ctx.drawImage(canvas, 0, page * A4_H_PX, A4_W_PX, sliceH, 0, 0, A4_W_PX, sliceH);
        pdf.addImage(pc.toDataURL("image/png"), "PNG", 0, 0, A4_W_MM, (sliceH / A4_H_PX) * A4_H_MM);
      }
      pdf.save(`${data.personal.name || "resume"}.pdf`);
    } catch (err) {
      if (fullPreviewRef.current) {
        fullPreviewRef.current.style.left   = "-9999px";
        fullPreviewRef.current.style.zIndex = "-9999";
      }
      alert("PDF error: " + err.message);
    }
  };

  return (
    <div style={{
      height: "100vh", display: "flex",
      flexDirection: "column",
      background: "#0a0a0b", paddingTop: 64,
    }}>
      {/* Toolbar */}
      <div style={{
        background: "#111114",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "8px 16px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 8, flexWrap: "wrap",
      }}>
        {/* Templates */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => setTemplate(t.id)} style={{
              background: template === t.id
                ? "rgba(59,130,246,0.15)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${template === t.id
                ? "rgba(59,130,246,0.4)"
                : "rgba(255,255,255,0.07)"}`,
              color: template === t.id ? "#3B82F6" : "#6b7280",
              padding: "5px 10px", borderRadius: 7,
              cursor: "pointer", fontSize: 11, fontWeight: 600,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={onUndo} disabled={!canUndo} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: canUndo ? "#e8e8f0" : "rgba(255,255,255,0.2)",
            padding: "6px 10px", borderRadius: 7, cursor: canUndo ? "pointer" : "default",
          }}>↩</button>
          <button onClick={onRedo} disabled={!canRedo} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: canRedo ? "#e8e8f0" : "rgba(255,255,255,0.2)",
            padding: "6px 10px", borderRadius: 7, cursor: canRedo ? "pointer" : "default",
          }}>↪</button>

          <button onClick={() => setZoom(z => Math.max(0.4, +(z-0.1).toFixed(1)))} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#6b7280", padding: "6px 10px", borderRadius: 7, cursor: "pointer" }}>−</button>
          <span style={{ fontSize: 11, color: "#e8e8f0", minWidth: 36, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.2, +(z+0.1).toFixed(1)))} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#6b7280", padding: "6px 10px", borderRadius: 7, cursor: "pointer" }}>+</button>

          <button onClick={() => setData(DUMMY_DATA)} style={{
            background: "rgba(132,204,22,0.1)",
            border: "1px solid rgba(132,204,22,0.25)",
            color: "#84cc16", padding: "6px 14px",
            borderRadius: 7, cursor: "pointer",
            fontSize: 12, fontWeight: 700,
          }}>⚡ Auto-Fill</button>

          <button onClick={handleDownloadPDF} style={{
            background: "linear-gradient(135deg, #3B82F6, #6366f1)",
            border: "none", color: "#fff",
            padding: "7px 18px", borderRadius: 8,
            cursor: "pointer", fontSize: 12, fontWeight: 700,
          }}>⬇ Download PDF</button>
        </div>
      </div>

      {/* Split pane */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "420px 1fr",
        overflow: "hidden",
      }}>
        {/* Form */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <EditorForm
            data={data}
            setData={setData}
            onAutoFill={() => setData(DUMMY_DATA)}
            accentColor={accentColor}
            missingFields={new Set()}
            onTabChange={setActiveFormTab}
          />
        </div>

        {/* Preview */}
        <div style={{ overflow: "auto", background: "#e5e7eb", position: "relative" }}>
          <div style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            minHeight: 900, background: "#fff",
            fontFamily: fontStyle,
            margin: "20px auto", width: 794,
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}>
            <ResumePreview
              data={data} template={template}
              accentColor={accentColor} fontStyle={fontStyle}
            />
          </div>

          {/* Hidden for PDF */}
          <div ref={fullPreviewRef} style={{
            position: "fixed", top: 0, left: "-9999px",
            width: 794, background: "#fff",
            fontFamily: fontStyle,
            pointerEvents: "none", zIndex: -9999,
          }}>
            <ResumePreview
              data={data} template={template}
              accentColor={accentColor} fontStyle={fontStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}