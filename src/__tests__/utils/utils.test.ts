import {
  toSlug,
  truncate,
  toTitleCase,
  snakeToLabel,
  formatTHB,
  formatUSD,
  tagClassName,
  clamp,
  isValidEmail,
  validateContactForm,
  filterProjectsByTag,
  getFeaturedProjects,
  getRelatedProjects,
  isKonamiComplete,
  KONAMI_CODE,
} from "@/utils";
import type { Project, ContactFormData } from "@/types";

// ─── toSlug ───────────────────────────────────
describe("toSlug", () => {
  it("converts spaces to hyphens", () => {
    expect(toSlug("Hello World")).toBe("hello-world");
  });
  it("lowercases the string", () => {
    expect(toSlug("REACT NATIVE")).toBe("react-native");
  });
  it("removes special characters", () => {
    expect(toSlug("Flutter & Dart!")).toBe("flutter-dart");
  });
  it("trims leading/trailing hyphens", () => {
    expect(toSlug("  spaces  ")).toBe("spaces");
  });
  it("collapses multiple spaces", () => {
    expect(toSlug("a   b")).toBe("a-b");
  });
});

// ─── truncate ─────────────────────────────────
describe("truncate", () => {
  it("returns string unchanged when within limit", () => {
    expect(truncate("short", 10)).toBe("short");
  });
  it("truncates and appends ellipsis", () => {
    expect(truncate("Hello World!", 8)).toBe("Hello...");
  });
  it("returns exactly maxLen chars including ellipsis", () => {
    const result = truncate("abcdefghij", 7);
    expect(result.length).toBe(7);
    expect(result.endsWith("...")).toBe(true);
  });
  it("handles string equal to maxLen", () => {
    expect(truncate("12345", 5)).toBe("12345");
  });
});

// ─── toTitleCase ──────────────────────────────
describe("toTitleCase", () => {
  it("capitalises each word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });
  it("handles already capitalised", () => {
    expect(toTitleCase("HELLO")).toBe("HELLO");
  });
  it("handles empty string", () => {
    expect(toTitleCase("")).toBe("");
  });
});

// ─── snakeToLabel ─────────────────────────────
describe("snakeToLabel", () => {
  it("converts SNAKE_CASE to Title Case", () => {
    expect(snakeToLabel("TECH_STACKS")).toBe("Tech Stacks");
  });
  it("handles single word", () => {
    expect(snakeToLabel("HELLO")).toBe("Hello");
  });
  it("handles already lowercase", () => {
    expect(snakeToLabel("years_experience")).toBe("Years Experience");
  });
});

// ─── formatTHB ────────────────────────────────
describe("formatTHB", () => {
  it("prepends ฿ symbol", () => {
    expect(formatTHB(990)).toMatch(/^฿/);
  });
  it("formats correctly", () => {
    expect(formatTHB(990)).toBe("฿990");
  });
  it("formats thousands", () => {
    expect(formatTHB(2490)).toBe("฿2,490");
  });
});

// ─── formatUSD ────────────────────────────────
describe("formatUSD", () => {
  it("prepends $ symbol", () => {
    expect(formatUSD(27)).toBe("$27");
  });
  it("formats thousands", () => {
    expect(formatUSD(1000)).toBe("$1,000");
  });
});

// ─── tagClassName ─────────────────────────────
describe("tagClassName", () => {
  it('returns "tech-tag" for orange', () => {
    expect(tagClassName("orange")).toBe("tech-tag");
  });
  it("returns cyan variant for purple", () => {
    expect(tagClassName("purple")).toContain("tech-tag-cyan");
  });
  it("returns acid variant for green", () => {
    expect(tagClassName("green")).toContain("tech-tag-acid");
  });
});

// ─── clamp ────────────────────────────────────
describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it("clamps to min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });
  it("clamps to max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
  it("handles equal min/max", () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});

// ─── isValidEmail ─────────────────────────────
describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("rafael5715@gmail.com")).toBe(true);
  });
  it("rejects missing @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });
  it("rejects missing domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });
  it("rejects empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
  it("rejects spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
  });
});

// ─── validateContactForm ──────────────────────
describe("validateContactForm", () => {
  const valid: ContactFormData = {
    name: "Jane Smith",
    email: "jane@example.com",
    budget: "50k-150k",
    message: "I have an interesting project for you.",
  };

  it("returns null for valid data", () => {
    expect(validateContactForm(valid)).toBeNull();
  });
  it("returns error when name is empty", () => {
    expect(validateContactForm({ ...valid, name: "" })).toMatch(/name/i);
  });
  it("returns error when email is empty", () => {
    expect(validateContactForm({ ...valid, email: "" })).toMatch(/email/i);
  });
  it("returns error when email is invalid", () => {
    expect(validateContactForm({ ...valid, email: "not-an-email" })).toMatch(/email/i);
  });
  it("returns error when message is empty", () => {
    expect(validateContactForm({ ...valid, message: "" })).toMatch(/message/i);
  });
  it("returns error when message is too short", () => {
    expect(validateContactForm({ ...valid, message: "Hi" })).toMatch(/10/);
  });
});

// ─── Project helpers ──────────────────────────
const mockProjects: Project[] = [
  { id:"1", slug:"rn-app", title:"RN App", category:"React Native", tags:["React Native","TypeScript"], tagColor:"orange", description:"", longDescription:"", impact:[], challenge:"", solution:"", year:"2023", color:"#f97316", gradient:"", featured:true },
  { id:"2", slug:"flutter-app", title:"Flutter App", category:"Flutter", tags:["Flutter","Dart"], tagColor:"purple", description:"", longDescription:"", impact:[], challenge:"", solution:"", year:"2022", color:"#a855f7", gradient:"", featured:false },
  { id:"3", slug:"next-app", title:"Next App", category:"NextJS", tags:["Next.js","TypeScript"], tagColor:"green", description:"", longDescription:"", impact:[], challenge:"", solution:"", year:"2023", color:"#22c55e", gradient:"", featured:true },
];

describe("filterProjectsByTag", () => {
  it('returns all projects for "ALL"', () => {
    expect(filterProjectsByTag(mockProjects, "ALL")).toHaveLength(3);
  });
  it("filters by tag substring", () => {
    expect(filterProjectsByTag(mockProjects, "Flutter")).toHaveLength(1);
    expect(filterProjectsByTag(mockProjects, "Flutter")[0].slug).toBe("flutter-app");
  });
  it("returns empty array when no match", () => {
    expect(filterProjectsByTag(mockProjects, "Unity")).toHaveLength(0);
  });
  it("handles TypeScript tag shared by two projects", () => {
    expect(filterProjectsByTag(mockProjects, "TypeScript")).toHaveLength(2);
  });
});

describe("getFeaturedProjects", () => {
  it("returns only featured projects", () => {
    const result = getFeaturedProjects(mockProjects);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.featured)).toBe(true);
  });
});

describe("getRelatedProjects", () => {
  it("excludes current project", () => {
    const result = getRelatedProjects(mockProjects, "rn-app");
    expect(result.some((p) => p.slug === "rn-app")).toBe(false);
  });
  it("respects limit", () => {
    const result = getRelatedProjects(mockProjects, "rn-app", 1);
    expect(result).toHaveLength(1);
  });
  it("defaults to 3", () => {
    const big = [...mockProjects, ...mockProjects]; // 6 items
    const result = getRelatedProjects(big, "rn-app");
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

// ─── isKonamiComplete ─────────────────────────
describe("isKonamiComplete", () => {
  it("returns false for empty sequence", () => {
    expect(isKonamiComplete([])).toBe(false);
  });
  it("returns false for partial sequence", () => {
    expect(isKonamiComplete(["ArrowUp","ArrowUp"])).toBe(false);
  });
  it("returns true for exact Konami code", () => {
    expect(isKonamiComplete([...KONAMI_CODE])).toBe(true);
  });
  it("returns true when Konami appears at end of longer sequence", () => {
    const noise = ["a","b","c"];
    expect(isKonamiComplete([...noise, ...KONAMI_CODE])).toBe(true);
  });
  it("returns false for wrong sequence", () => {
    const wrong = ["ArrowUp","ArrowDown","ArrowDown","ArrowUp","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    expect(isKonamiComplete(wrong)).toBe(false);
  });
});
