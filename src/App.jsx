import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar          from "./components/Navbar";
import LandingPage     from "./components/LandingPage";
import TemplateGallery from "./components/TemplateGallery";
import EditorPage      from "./components/EditorPage";
import { EMPTY_DATA }  from "./data/dummyData";

const MAX_HISTORY = 30;

export default function App() {
  const [page, setPage]         = useState("landing");
  const [template, setTemplate] = useState("minimalist");
  const historyRef              = useRef([EMPTY_DATA]);
  const histIdxRef              = useRef(0);
  const [, forceRender]         = useState(0);
  const debounceTimer           = useRef(null);

  const getData = () => historyRef.current[histIdxRef.current];

  const setData = useCallback((updater) => {
    const current = historyRef.current[histIdxRef.current];
    const next    = typeof updater === "function" ? updater(current) : updater;
    if (JSON.stringify(next) === JSON.stringify(current)) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    const isLarge =
      JSON.stringify(next).length - JSON.stringify(current).length > 100;
    const push = () => {
      const newHistory = historyRef.current.slice(0, histIdxRef.current + 1);
      newHistory.push(next);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();
      historyRef.current = newHistory;
      histIdxRef.current = newHistory.length - 1;
      forceRender((n) => n + 1);
    };
    if (isLarge) {
      push();
    } else {
      historyRef.current = [
        ...historyRef.current.slice(0, histIdxRef.current),
        next,
        ...historyRef.current.slice(histIdxRef.current + 1),
      ];
      forceRender((n) => n + 1);
      debounceTimer.current = setTimeout(push, 600);
    }
  }, []);

  const undo = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    if (histIdxRef.current > 0) {
      histIdxRef.current -= 1;
      forceRender((n) => n + 1);
    }
  }, []);

  const redo = useCallback(() => {
    if (histIdxRef.current < historyRef.current.length - 1) {
      histIdxRef.current += 1;
      forceRender((n) => n + 1);
    }
  }, []);

  const canUndo = histIdxRef.current > 0;
  const canRedo = histIdxRef.current < historyRef.current.length - 1;

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault(); undo();
      }
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault(); redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  const data = getData();

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#0a0a0b" }}>
      <Navbar
        page={page} setPage={setPage}
        canUndo={canUndo} canRedo={canRedo}
        onUndo={undo} onRedo={redo}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          style={{ width: "100%" }}
        >
          {page === "landing" && <LandingPage setPage={setPage} />}
          {page === "templates" && (
            <TemplateGallery
              setPage={setPage}
              selectedTemplate={template}
              setSelectedTemplate={setTemplate}
            />
          )}
          {page === "editor" && (
            <EditorPage
              data={data}
              setData={setData}
              template={template}
              setTemplate={setTemplate}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={undo}
              onRedo={redo}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}