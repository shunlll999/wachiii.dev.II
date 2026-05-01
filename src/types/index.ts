// ─────────────────────────────────────────────
// Primitive aliases
// ─────────────────────────────────────────────
export type TagColor    = "orange" | "purple" | "green";
export type AccentColor = "neon" | "cyan" | "acid" | "magenta";
export type ProductType = "TEMPLATE" | "COURSE" | "EBOOK";
export type BudgetRange = "under-50k" | "50k-150k" | "150k-plus" | "ongoing" | "";
export type ThemeColor  = `#${string}`;

// ─────────────────────────────────────────────
// Project / Portfolio
// ─────────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  tagColor: TagColor;
  description: string;
  longDescription: string;
  impact: string[];
  challenge: string;
  solution: string;
  year: string;
  color: ThemeColor;
  gradient: string;
  featured: boolean;
  screenshots?: string[];
  liveUrl?: string;
  repoUrl?: string;
}

// ─────────────────────────────────────────────
// Product / Shop
// ─────────────────────────────────────────────
export interface Product {
  id: string;
  type: ProductType;
  title: string;
  description: string;
  priceTHB: number;
  priceUSD: number;
  badge: string;
  badgeColor: string;
  color: ThemeColor;
  features: string[];
  cta: string;
  ctaStyle: string;
  available: boolean;
  gumroadUrl?: string;
}

// ─────────────────────────────────────────────
// Testimonial
// ─────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  color: ThemeColor;
  verified: boolean;
}

// ─────────────────────────────────────────────
// Timeline
// ─────────────────────────────────────────────
export interface TimelineEntry {
  year: string;
  company: string;
  role: string;
  current: boolean;
  description?: string;
}

// ─────────────────────────────────────────────
// Contact form
// ─────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  budget: BudgetRange;
  message: string;
}

export interface ContactFormState extends ContactFormData {
  submitted: boolean;
  error: string | null;
}

// ─────────────────────────────────────────────
// Easter egg — hidden profile card
// ─────────────────────────────────────────────
export interface HiddenProfile {
  codename: string;
  realName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  avatarUrl: string;
  unlocked: boolean;
}

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

// ─────────────────────────────────────────────
// Typewriter
// ─────────────────────────────────────────────
export interface TypewriterState {
  displayed: string;
  roleIndex: number;
  deleting: boolean;
}
