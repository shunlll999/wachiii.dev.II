import type { ContactFormData, Project, TagColor } from "@/types";

// ─────────────────────────────────────────────
// String utilities
// ─────────────────────────────────────────────

/** Convert a title to a URL-safe slug */
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate a string to maxLen chars, appending ellipsis */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3).trimEnd() + "...";
}

/** Capitalise the first letter of each word */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Snake_case to readable label: "SNAKE_CASE" → "Snake Case" */
export function snakeToLabel(str: string): string {
  return str
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// ─────────────────────────────────────────────
// Number / price formatting
// ─────────────────────────────────────────────

/** Format THB price: 990 → "฿990" */
export function formatTHB(amount: number): string {
  return `฿${amount.toLocaleString("th-TH")}`;
}

/** Format USD price: 27 → "$27" */
export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

// ─────────────────────────────────────────────
// Tailwind / style helpers
// ─────────────────────────────────────────────

/** Return the tech-tag className for a given TagColor */
export function tagClassName(color: TagColor): string {
  const map: Record<TagColor, string> = {
    orange: "tech-tag",
    purple: "tech-tag tech-tag-cyan",
    green:  "tech-tag tech-tag-acid",
  };
  return map[color];
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────

/** Basic email format check */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate the contact form and return an error message or null */
export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name.trim())           return "Name is required.";
  if (!data.email.trim())          return "Email is required.";
  if (!isValidEmail(data.email))   return "Please enter a valid email.";
  if (!data.message.trim())        return "Message is required.";
  if (data.message.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}

// ─────────────────────────────────────────────
// Project helpers
// ─────────────────────────────────────────────

/** Filter projects by tag name */
export function filterProjectsByTag(projects: Project[], tag: string): Project[] {
  if (tag === "ALL") return projects;
  return projects.filter((p) => p.tags.some((t) => t.includes(tag)));
}

/** Get featured projects */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.featured);
}

/** Get "more projects" — excludes current, returns up to `limit` */
export function getRelatedProjects(projects: Project[], currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

// ─────────────────────────────────────────────
// Easter egg — Konami code detector
// ─────────────────────────────────────────────

export const KONAMI_CODE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
] as const;

export type KonamiKey = typeof KONAMI_CODE[number];

/**
 * Returns true if the last N keys in `sequence` match the Konami code.
 * Usage: call with each keydown event, pass the accumulating key list.
 */
export function isKonamiComplete(sequence: string[]): boolean {
  const code = KONAMI_CODE as readonly string[];
  if (sequence.length < code.length) return false;
  const tail = sequence.slice(-code.length);
  return tail.every((k, i) => k === code[i]);
}
