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
  {
    id: "m2",
    name: "Marcus Vance",
    email: "marcus@helium.design",
    message: "Would love to discuss potential collaborations on dynamic motion UI design for some of our enterprise clients.",
    date: "2026-08-29T09:15:00.000Z",
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

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);
  const [consultations, setConsultations] = useState<Consultation[]>(defaultConsultations);

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
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  // Save changes to localStorage helper
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

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        testimonials,
        messages,
        consultations,
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
      }}
    >
      {children}
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
