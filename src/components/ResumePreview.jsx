// ================================================
// RESUME PREVIEW — All 7 templates
// ================================================

import MinimalistTemplate    from "./templates/MinimalistTemplate";
import CreativeTemplate      from "./templates/CreativeTemplate";
import ExecutiveTemplate     from "./templates/ExecutiveTemplate";
import CorporateTemplate     from "./templates/CorporateTemplate";
import AcademicTemplate      from "./templates/AcademicTemplate";
import CreativeArtsTemplate  from "./templates/CreativeArtsTemplate";
import ProfessionalCVTemplate from "./templates/ProfessionalCVTemplate";

export default function ResumePreview({ data, template, accentColor, fontStyle }) {
  const props = { data, accentColor, fontStyle };
  return (
    <div style={{ background: "#ffffff", minHeight: "100%", padding: 0 }}>
      {template === "minimalist"      && <MinimalistTemplate    {...props} />}
      {template === "creative"        && <CreativeTemplate      {...props} />}
      {template === "executive"       && <ExecutiveTemplate     {...props} />}
      {template === "corporate"       && <CorporateTemplate     {...props} />}
      {template === "academic"        && <AcademicTemplate      {...props} />}
      {template === "creativearts"    && <CreativeArtsTemplate  {...props} />}
      {template === "professionalcv"  && <ProfessionalCVTemplate {...props} />}
    </div>
  );
}