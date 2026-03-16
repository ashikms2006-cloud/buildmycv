// ================================================
// DUMMY DATA — Full professional CV sample data
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
    summary:
      "Senior Product Designer with 7+ years of experience crafting intuitive digital products used by millions. Led design systems at Stripe, Figma, and Airbnb. Passionate about the intersection of design and engineering.",
    photo: "",
  },
  experience: [
    {
      id: "e1",
      company: "Stripe",
      role: "Senior Product Designer",
      period: "2021 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Led redesign of the Stripe Dashboard, improving user retention by 34%",
        "Built and maintained a design system used by 120+ engineers",
        "Collaborated with PMs and engineers to ship 12 major product features",
      ],
    },
    {
      id: "e2",
      company: "Figma",
      role: "Product Designer",
      period: "2019 – 2021",
      location: "San Francisco, CA",
      bullets: [
        "Designed the community plugins marketplace from 0 to 1",
        "Conducted 50+ user interviews to shape the product roadmap",
        "Reduced onboarding drop-off by 28% through iterative UX improvements",
      ],
    },
    {
      id: "e3",
      company: "Airbnb",
      role: "UX Designer",
      period: "2017 – 2019",
      location: "San Francisco, CA",
      bullets: [
        "Redesigned the host onboarding flow, increasing host signups by 19%",
        "Created motion design guidelines adopted company-wide",
      ],
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "Carnegie Mellon University",
      degree: "M.S. Human-Computer Interaction",
      period: "2015 – 2017",
      gpa: "3.9",
    },
    {
      id: "ed2",
      institution: "UC Berkeley",
      degree: "B.A. Cognitive Science",
      period: "2011 – 2015",
      gpa: "3.7",
    },
  ],
  skills: [
    { id: "s1", name: "Figma",            level: 98 },
    { id: "s2", name: "User Research",    level: 90 },
    { id: "s3", name: "Prototyping",      level: 88 },
    { id: "s4", name: "React / HTML/CSS", level: 75 },
    { id: "s5", name: "Design Systems",   level: 92 },
    { id: "s6", name: "Motion Design",    level: 80 },
  ],
  customSections: [
    {
      id: "cs1",
      title: "Certifications",
      items: [
        { id: "ci1", text: "Google UX Design Certificate — 2023" },
        { id: "ci2", text: "AWS Certified Cloud Practitioner — 2022" },
      ],
    },
    {
      id: "cs2",
      title: "Languages",
      items: [
        { id: "ci3", text: "English — Native" },
        { id: "ci4", text: "Mandarin — Fluent" },
        { id: "ci5", text: "Spanish — Intermediate" },
      ],
    },
  ],
  // ── Professional CV extra sections ──
  projects: [
    {
      id: "p1",
      name: "Design System — Stripe",
      role: "Lead Designer",
      period: "2022 – 2023",
      description: "Built a comprehensive design system with 200+ components, adopted by 120 engineers across 8 product teams.",
      link: "stripe.com/design",
    },
    {
      id: "p2",
      name: "Plugins Marketplace — Figma",
      role: "Product Designer",
      period: "2020 – 2021",
      description: "Designed and shipped the Figma community plugins marketplace from concept to launch, reaching 1M+ users in 6 months.",
      link: "figma.com/community",
    },
  ],
  certifications: [
    { id: "cert1", name: "Google UX Design Certificate", issuer: "Google", year: "2023" },
    { id: "cert2", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2022" },
    { id: "cert3", name: "Interaction Design Foundation", issuer: "IDF", year: "2021" },
  ],
  awards: [
    { id: "aw1", title: "Design Excellence Award", org: "Stripe", year: "2023", description: "Awarded for outstanding contribution to the Stripe Dashboard redesign." },
    { id: "aw2", title: "Top Designer — Community Choice", org: "Figma", year: "2021", description: "Voted top designer by the Figma community for the plugins marketplace." },
  ],
  references: [
    { id: "ref1", name: "Michael Torres", title: "VP of Design, Stripe", email: "m.torres@stripe.com", phone: "+1 (415) 555-0011" },
    { id: "ref2", name: "Sarah Kim", title: "Head of Product, Figma", email: "s.kim@figma.com", phone: "+1 (415) 555-0022" },
  ],
};

export const EMPTY_DATA = {
  personal: {
    name: "", title: "", email: "", phone: "",
    location: "", website: "", linkedin: "", summary: "", photo: "",
  },
  experience:    [],
  education:     [],
  skills:        [],
  customSections: [],
  projects:      [],
  certifications: [],
  awards:        [],
  references:    [],
};