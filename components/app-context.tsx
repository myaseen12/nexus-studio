"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Project {
  id: string;
  name: string;
  type: string;
  blurb: string;
  outcome: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export interface Estimate {
  id: string;
  name: string;
  email: string;
  scope: string;
  pages: string;
  timeline: string;
  calculatedBudget: string;
  date: string;
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  role: string;
  portfolioUrl: string;
  notes: string;
  date: string;
}

export interface ProjectRoadmap {
  id: string;
  projectCode: string;
  projectName: string;
  status: string;
  progressVal: number;
  updatesLog: string[];
}

export interface User {
  email: string;
  name: string;
}

interface AppContextType {
  user: User | null;
  projects: Project[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  consultations: Consultation[];
  blogPosts: BlogPost[];
  estimates: Estimate[];
  jobApplications: JobApplication[];
  roadmaps: ProjectRoadmap[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addMessage: (name: string, email: string, message: string) => void;
  deleteMessage: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  deleteProject: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (id: string) => void;
  addConsultation: (consultation: Omit<Consultation, "id">) => void;
  deleteConsultation: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, "id" | "slug" | "date">) => void;
  deleteBlogPost: (id: string) => void;
  addEstimate: (estimate: Omit<Estimate, "id" | "date">) => void;
  deleteEstimate: (id: string) => void;
  addJobApplication: (app: Omit<JobApplication, "id" | "date">) => void;
  deleteJobApplication: (id: string) => void;
  updateRoadmap: (roadmap: ProjectRoadmap) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProjects: Project[] = [
  {
    id: "1",
    name: "Pulse Labs",
    type: "SaaS rebrand",
    outcome: "B2B launch experience",
    blurb: "A bold product narrative and immersive launch hub that doubled activation in 30 days.",
  },
  {
    id: "2",
    name: "Aurelia AI",
    type: "AI concierge",
    outcome: "Conversational onboarding",
    blurb: "An intelligent onboarding experience with conversational automation and premium visuals.",
  },
  {
    id: "3",
    name: "Northstar Studio",
    type: "Creative platform",
    outcome: "Creative portfolio",
    blurb: "A cinematic portfolio with motion-led storytelling for a fast-scaling studio brand.",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Nexus Studio transformed our product narrative into an experience that felt unmistakably premium.",
    author: "Mina Chen",
    role: "Founder, Pulse Labs",
  },
  {
    id: "2",
    quote: "Every touchpoint feels intentional. The team blended strategy, motion, and AI in a way that felt effortless.",
    author: "Daniel Ortiz",
    role: "CMO, Aurelia AI",
  },
];

const defaultMessages: ContactMessage[] = [
  {
    id: "m1",
    name: "Sarah Jenkins",
    email: "sarah@vertex.io",
    message: "Hi, we are looking for a studio to design our upcoming SaaS product launching in Q4. Love your visual aesthetic!",
    date: "2026-08-28T14:30:00.000Z",
  },
];

const defaultConsultations: Consultation[] = [
  {
    id: "c1",
    name: "Aisha Khan",
    email: "aisha@quantum.tech",
    date: "2026-09-02",
    time: "02:00 PM",
    service: "AI Copilots & Automation",
  },
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Shift to Cinematic Web Design",
    slug: "shift-to-cinematic-web-design",
    category: "Design",
    excerpt: "Why modern digital experiences are abandoning layout boxes in favor of storytelling, typography, and motion.",
    content: "The web is evolving. Users are tired of standard template grid columns that look identical across every SaaS landing page. Cinematic web experiences prioritize motion design, large font hierarchy styles, and linear storytelling flows. In this article, we dissect how layout transitions and micro-interactions elevate engagement metrics.",
    author: "Yaseen Khan",
    date: "2026-08-27T10:00:00.000Z"
  },
  {
    id: "b2",
    title: "Designing Friction-Free AI Onboardings",
    slug: "designing-friction-free-ai-onboardings",
    category: "AI",
    excerpt: "Best practices for building conversational verification steps that maintain a high conversion rate.",
    content: "When users encounter artificial intelligence tools, onboarding friction is one of the highest drop-off indicators. Integrating context-aware validators, automated loaders, and inline prompts simplifies registration metrics. Here, we outline the exact structures used inside Aurelia AI to scale sign-up activations.",
    author: "Marcus Vance",
    date: "2026-08-29T11:30:00.000Z"
  }
];

const defaultEstimates: Estimate[] = [
  {
    id: "e1",
    name: "Thomas Drake",
    email: "t.drake@drakedigital.com",
    scope: "AI Automation Hub",
    pages: "6 - 10 pages",
    timeline: "Express (3 weeks)",
    calculatedBudget: "$8,500 - $11,500",
    date: "2026-08-29T16:45:00.000Z"
  }
];

const defaultJobApplications: JobApplication[] = [
  {
    id: "ja1",
    name: "Lina Sterling",
    email: "lina@sterlingdesign.me",
    role: "Senior UI/UX Designer",
    portfolioUrl: "https://portfolio.sterlingdesign.me",
    notes: "I have 5+ years of experience building design tokens and reusable layouts. Love your motion systems!",
    date: "2026-08-29T15:20:00.000Z"
  }
];

const defaultRoadmaps: ProjectRoadmap[] = [
  {
    id: "r1",
    projectCode: "PULSE-101",
    projectName: "Pulse Labs",
    status: "Design Phase",
    progressVal: 45,
    updatesLog: [
      "Project initialized and design brief finalized.",
      "Design tokens and brand palette setup completed.",
      "V1 Interactive landing page wireframes presented for feedback."
    ]
  },
  {
    id: "r2",
    projectCode: "AURELIA-202",
    projectName: "Aurelia AI",
    status: "Development Phase",
    progressVal: 75,
    updatesLog: [
      "High-fidelity UI screens completed and approved.",
      "AI assistant prompt mapping and system triggers integrated.",
      "Performance testing completed with 99 Lighthouse score."
    ]
  }
];

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);
  const [consultations, setConsultations] = useState<Consultation[]>(defaultConsultations);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [estimates, setEstimates] = useState<Estimate[]>(defaultEstimates);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(defaultJobApplications);
  const [roadmaps, setRoadmaps] = useState<ProjectRoadmap[]>(defaultRoadmaps);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client-side mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nexus_user");
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedProjects = localStorage.getItem("nexus_projects");
      if (storedProjects) setProjects(JSON.parse(storedProjects));

      const storedTestimonials = localStorage.getItem("nexus_testimonials");
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedMessages = localStorage.getItem("nexus_messages");
      if (storedMessages) setMessages(JSON.parse(storedMessages));

      const storedConsultations = localStorage.getItem("nexus_consultations");
      if (storedConsultations) setConsultations(JSON.parse(storedConsultations));

      const storedBlogs = localStorage.getItem("nexus_blogs");
      if (storedBlogs) setBlogPosts(JSON.parse(storedBlogs));

      const storedEstimates = localStorage.getItem("nexus_estimates");
      if (storedEstimates) setEstimates(JSON.parse(storedEstimates));

      const storedApps = localStorage.getItem("nexus_applications");
      if (storedApps) setJobApplications(JSON.parse(storedApps));

      const storedRoadmaps = localStorage.getItem("nexus_roadmaps");
      if (storedRoadmaps) setRoadmaps(JSON.parse(storedRoadmaps));
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  const saveToStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
  };

  const login = (email: string, password: string): boolean => {
    if (email.toLowerCase() === "admin@nexus.dev" && password === "admin123") {
      const loggedUser: User = { email, name: "Nexus Admin" };
      setUser(loggedUser);
      saveToStorage("nexus_user", loggedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("nexus_user");
    } catch (e) {
      console.error("Error clearing user storage", e);
    }
  };

  const addMessage = (name: string, email: string, message: string) => {
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };
    const updated = [newMessage, ...messages];
    setMessages(updated);
    saveToStorage("nexus_messages", updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveToStorage("nexus_messages", updated);
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProj: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveToStorage("nexus_projects", updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveToStorage("nexus_projects", updated);
  };

  const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
    const newTest: Testimonial = {
      ...testimonial,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [newTest, ...testimonials];
    setTestimonials(updated);
    saveToStorage("nexus_testimonials", updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    saveToStorage("nexus_testimonials", updated);
  };

  const addConsultation = (consultation: Omit<Consultation, "id">) => {
    const newConsultation: Consultation = {
      ...consultation,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [newConsultation, ...consultations];
    setConsultations(updated);
    saveToStorage("nexus_consultations", updated);
  };

  const deleteConsultation = (id: string) => {
    const updated = consultations.filter((c) => c.id !== id);
    setConsultations(updated);
    saveToStorage("nexus_consultations", updated);
  };

  const addBlogPost = (post: Omit<BlogPost, "id" | "slug" | "date">) => {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      slug,
      date: new Date().toISOString()
    };
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    saveToStorage("nexus_blogs", updated);
  };

  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter((b) => b.id !== id);
    setBlogPosts(updated);
    saveToStorage("nexus_blogs", updated);
  };

  const addEstimate = (estimate: Omit<Estimate, "id" | "date">) => {
    const newEst: Estimate = {
      ...estimate,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    const updated = [newEst, ...estimates];
    setEstimates(updated);
    saveToStorage("nexus_estimates", updated);
  };

  const deleteEstimate = (id: string) => {
    const updated = estimates.filter((e) => e.id !== id);
    setEstimates(updated);
    saveToStorage("nexus_estimates", updated);
  };

  const addJobApplication = (app: Omit<JobApplication, "id" | "date">) => {
    const newApp: JobApplication = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    const updated = [newApp, ...jobApplications];
    setJobApplications(updated);
    saveToStorage("nexus_applications", updated);
  };

  const deleteJobApplication = (id: string) => {
    const updated = jobApplications.filter((ja) => ja.id !== id);
    setJobApplications(updated);
    saveToStorage("nexus_applications", updated);
  };

  const updateRoadmap = (roadmap: ProjectRoadmap) => {
    const updated = roadmaps.map((r) => r.id === roadmap.id ? roadmap : r);
    setRoadmaps(updated);
    saveToStorage("nexus_roadmaps", updated);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        testimonials,
        messages,
        consultations,
        blogPosts,
        estimates,
        jobApplications,
        roadmaps,
        login,
        logout,
        addMessage,
        deleteMessage,
        addProject,
        deleteProject,
        addTestimonial,
        deleteTestimonial,
        addConsultation,
        deleteConsultation,
        addBlogPost,
        deleteBlogPost,
        addEstimate,
        deleteEstimate,
        addJobApplication,
        deleteJobApplication,
        updateRoadmap
      }}
    >
      {isLoaded ? children : <div className="min-h-screen bg-slate-950" />}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
