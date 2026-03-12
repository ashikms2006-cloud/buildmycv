// ================================================
// APP.JSX — Root Component
// Handles page routing and global state
// ================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import TemplateGallery from "./components/TemplateGallery";
import EditorPage from "./components/EditorPage";

// Data
import { EMPTY_DATA } from "./data/dummyData";

export default function App() {
  const [page, setPage] = useState("landing");
  const [data, setData] = useState(EMPTY_DATA);
  const [template, setTemplate] = useState("minimalist");

  return (
    <div style={{
      fontFamily: "'Lexend', 'Inter', system-ui, sans-serif",
      background: "#0a0a0b",
      minHeight: "100vh",
      color: "#e8e8f0"
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        input::placeholder, textarea::placeholder { color: rgba(107,114,128,0.8); }
      `}</style>

      {/* Fixed top navigation */}
      <Navbar page={page} setPage={setPage} />

      {/* Page transitions */}
      <AnimatePresence mode="wait">

        {page === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage setPage={setPage} />
          </motion.div>
        )}

        {page === "templates" && (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TemplateGallery
              setPage={setPage}
              selectedTemplate={template}
              setSelectedTemplate={setTemplate}
            />
          </motion.div>
        )}

        {page === "editor" && (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100vh" }}
          >
            <EditorPage
              data={data}
              setData={setData}
              template={template}
              setTemplate={setTemplate}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}