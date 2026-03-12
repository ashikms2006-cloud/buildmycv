// ================================================
// RESUME PREVIEW — Renders all 6 templates
// ================================================

import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import CreativeArtsTemplate from "./templates/CreativeArtsTemplate";

export default function ResumePreview({ data, template }) {
  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100%",
      padding: 0,
    }}>
      {template === "minimalist"   && <MinimalistTemplate   data={data} />}
      {template === "creative"     && <CreativeTemplate     data={data} />}
      {template === "executive"    && <ExecutiveTemplate    data={data} />}
      {template === "corporate"    && <CorporateTemplate    data={data} />}
      {template === "academic"     && <AcademicTemplate     data={data} />}
      {template === "creativearts" && <CreativeArtsTemplate data={data} />}
    </div>
  );
}