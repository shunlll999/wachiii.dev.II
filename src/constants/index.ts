import type { NavItem, SocialLink, HiddenProfile, TimelineEntry } from "@/types";

export const SITE_URL = "https://wachiii-dev0.web.app";
export const SITE_NAME = "wAcii — Senior Software Engineer";
export const SITE_DESC = "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building high-impact products.";
export const OG_IMAGE = "https://wachiii-dev0.web.app/images/logo/screenshot.png";

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "About",     href: "#about"     },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Products",  href: "#products"  },
  { label: "Contact",   href: "#contact"   },
];

// ─────────────────────────────────────────────
// Social links (no Twitter/X)
// ─────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/wachara-nilsonti-b6529779/" },
  { label: "GitHub",    href: "https://github.com/shunlll999"                           },
  { label: "Facebook",  href: "https://www.facebook.com/wachiii.livis"                 },
  { label: "Instagram", href: "https://www.instagram.com/shunlll999/"                  },
  { label: "TikTok",    href: "https://www.tiktok.com/@wachiii3"                       },
];

// ─────────────────────────────────────────────
// Asset URLs
// ─────────────────────────────────────────────
export const ASSETS = {
  logo:    "/images/logo/wachiii.png",
  favicon: "/images/logo/wachiii-fav.ico",
  apple: "/images/logo/wachiii-fav.png",
  avatar:  "/images/avatars/wachii.jpg",
} as const;

// ─────────────────────────────────────────────
// Easter egg — hidden profile
// Unlock: Konami code (↑↑↓↓←→←→BA)
// ─────────────────────────────────────────────
export const HIDDEN_PROFILE: HiddenProfile = {
  codename:  "wAchiii",
  realName:  "Wachara Nilsonti",
  title:     "Software Engineer",
  location:  "Bangkok, TH 🇹🇭",
  phone:     "(+66) 084-553-1451",
  email:     "rafael5715@gmail.com",
  avatarUrl: ASSETS.avatar,
  unlocked:  false,
};

// ─────────────────────────────────────────────
// Working timeline (full history)
// ─────────────────────────────────────────────
export const TIMELINE: TimelineEntry[] = [
  { year: "2024 - PRESENT",   company: "ttb Spark",                role: "SOFTWARE ENGINEER SPECIALIST",  current: true  },
  { year: "2018 - 2024",      company: "MOHARA BKK",               role: "SENIOR SOFTWARE ENGINEER",  current: false  },
  { year: "2016 - 2017",      company: "NIMBLE",                   role: "FRONT END ENGINEER",        current: false },
  { year: "2015 - 2016",      company: "NADIA THAILAND",           role: "JAVASCRIPT DEVELOPER",      current: false },
  { year: "2015.1 - 2015.1",  company: "HAPPY FRESH",              role: "",                          current: false },
  { year: "2013 - 2015",      company: "MILYN INNOVATION / PRANEAT", role: "UNITY DEVELOPER",         current: false },
  { year: "- 2013.2",         company: "DENTSU 360",               role: "FLASH PROGRAMMER",          current: false },
  { year: "- 2013",           company: "MOFUNZONE.COM",            role: "",                          current: false },
  { year: "- 2012",           company: "MINTERACTION",             role: "FLASH PROGRAMMER",          current: false },
  { year: "- 2009",           company: "CODEGENT BANGKOK",         role: "FLASH PROGRAMMER",          current: false },
];

// ─────────────────────────────────────────────
// Konami unlock hint (shown subtly in footer)
// ─────────────────────────────────────────────
export const KONAMI_HINT = "↑↑↓↓←→←→BA";
