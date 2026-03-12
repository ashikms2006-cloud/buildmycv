// ================================================
// DUMMY AUTO-FILL DATA
// ================================================

export const DUMMY_DATA = {
  personal: {
    name: "Alexandra Chen",
    title: "Senior Product Designer",
    email: "alex.chen@email.com",
    phone: "+1 (415) 555-0192",
    location: "San Francisco, CA",
    website: "alexchen.design",
    linkedin: "linkedin.com/in/alexchen",
    summary: "Results-driven product designer with 7+ years crafting intuitive digital experiences. Passionate about bridging the gap between user needs and business objectives through data-informed design decisions.",
  },
  experience: [
    {
      id: "e1",
      company: "Stripe",
      role: "Senior Product Designer",
      period: "2021 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Led end-to-end redesign of Stripe Dashboard increasing merchant activation by 34%",
        "Managed design system used by 60+ engineers across 8 product teams",
        "Conducted 200+ user interviews to inform roadmap prioritization",
      ],
    },
    {
      id: "e2",
      company: "Figma",
      role: "Product Designer",
      period: "2019 – 2021",
      location: "Remote",
      bullets: [
        "Designed onboarding flows that reduced time-to-first-value by 42%",
        "Built and maintained component library with 300+ tokens",
        "Collaborated cross-functionally with PM and engineering on 12 major releases",
      ],
    },
    {
      id: "e3",
      company: "Airbnb",
      role: "UX Designer",
      period: "2017 – 2019",
      location: "San Francisco, CA",
      bullets: [
        "Revamped search experience serving 150M+ monthly active users",
        "A/B tested 25 design variants to optimize conversion funnel",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "Carnegie Mellon University",
      degree: "M.S. Human-Computer Interaction",
      period: "2015 – 2017",
      gpa: "3.9/4.0",
    },
    {
      id: "ed2",
      institution: "UC Berkeley",
      degree: "B.A. Cognitive Science",
      period: "2011 – 2015",
      gpa: "3.8/4.0",
    },
  ],
  skills: [
    { id: "s1", name: "Figma / Sketch", level: 98 },
    { id: "s2", name: "User Research", level: 92 },
    { id: "s3", name: "Prototyping", level: 95 },
    { id: "s4", name: "React / HTML / CSS", level: 78 },
    { id: "s5", name: "Data Analysis", level: 70 },
    { id: "s6", name: "Design Systems", level: 90 },
  ],
};

// ================================================
// EMPTY DATA — default state when app loads
// ================================================

export const EMPTY_DATA = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
};