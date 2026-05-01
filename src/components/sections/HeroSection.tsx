"use client";
import { useEffect, useRef, useState } from "react";
import s from "@/styles/HeroSection.module.css";

const roles = ["SENIOR_SOFTWARE_ENGINEER","REACT_NATIVE_SPECIALIST","FLUTTER_&_MOBILE_DEV","FULL_STACK_ARCHITECT"];
const stats = [
  { num:"15+", label:"YRS_EXPERIENCE",  color:"var(--neon)"  },
  { num:"50+", label:"PROJECTS_SHIPPED", color:"var(--cyan)"  },
  { num:"6",   label:"TECH_STACKS",      color:"var(--acid)"  },
  { num:"∞",   label:"COFFEE_CONSUMED",  color:"var(--neon)"  },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cur = roles[roleIndex];
    if (!deleting && displayed.length < cur.length)
      t.current = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 55);
    else if (!deleting && displayed.length === cur.length)
      t.current = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    else { setDeleting(false); setRoleIndex(i => (i + 1) % roles.length); }
    return () => { if (t.current) clearTimeout(t.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <section className={`${s.hero} gridBg scanline`}>
      <div className={s.glowLeft} />
      <div className={s.glowRight} />
      <div className={s.cornerTL} /><div className={s.cornerTR} />
      <div className={s.cornerBL} /><div className={s.cornerBR} />

      <div className={s.sideLabel}>
        <span className={s.sideLabelText}>SYSTEM :: ONLINE :: AVAILABLE</span>
        <div className={s.sideLine} />
      </div>

      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.badge}>
            <span className={s.badgeDot} />
            <span className={s.badgeText}>STATUS::OPEN_TO_WORK // LOCATION::BANGKOK_TH</span>
          </div>

          <h1 className={s.heading}>
            <span className={s.headingLine}>I BUILD</span>
            <span className={s.headingNeon}>PRODUCTS</span>
            <span className={s.headingLine}>PEOPLE USE.</span>
          </h1>

          <div className={s.typewriter}>
            <span className={s.typePrefix}>&gt;_</span>
            <span className={s.typeText}>{displayed}</span>
            <span className={s.typeCursor}>█</span>
          </div>

          <p className={s.description}>
            15+ years crafting web & mobile systems across React, Flutter, Swift, and Kotlin.
            Startup MVPs to enterprise-scale — clean architecture, high performance, shipped on time.
          </p>

          <div className={s.ctaGroup}>
            <a href="#portfolio" className={s.ctaPrimary}>
              VIEW_WORK <span>→</span>
            </a>
            <a href="#products" className={s.ctaSecondary}>PRODUCTS</a>
            <a href="#contact"  className={s.ctaTertiary}>HIRE_ME</a>
          </div>

          <div className={s.stats}>
            {stats.map(stat => (
              <div key={stat.label}>
                <div className={s.statNum} style={{ color:stat.color, textShadow:`0 0 12px ${stat.color}80` }}>
                  {stat.num}
                </div>
                <div className={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={s.scrollHint}>
        <span className={s.scrollText}>SCROLL::DOWN</span>
        <div className={s.scrollLine} />
      </div>
    </section>
  );
}
