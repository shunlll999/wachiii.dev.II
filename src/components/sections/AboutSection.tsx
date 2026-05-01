"use client";
import { useEffect, useRef } from "react";
import s from "@/styles/sections.module.css";
import { TIMELINE } from "@/constants";
import type { TagColor } from "@/types";
import { tagClassName } from "@/utils";

const skills = ["ReactJS","React Native","Flutter","Swift","Kotlin","C# Unity","NodeJS","TypeScript","Firebase","AWS"];
const skillColors: TagColor[] = ["orange","orange","purple","green","orange","purple","green","orange","purple","green"];

const statBoxes = [
  { num:"15+", label:"YEARS_EXPERIENCE",  color:"var(--neon)"  },
  { num:"50+", label:"PROJECTS_SHIPPED",  color:"var(--cyan)"  },
  { num:"6",   label:"TECH_STACKS",       color:"var(--acid)"  },
  { num:"3",   label:"PLATFORMS",         color:"var(--neon)"  },
];

function skillTagClass(color: TagColor) {
  if (color === "purple") return `${s.skillTag} ${s.skillTagCyan}`;
  if (color === "green")  return `${s.skillTag} ${s.skillTagAcid}`;
  return s.skillTag;
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <div className={`${s.sectionLabel} sectionReveal`}>
          <span className={s.sectionLabelText}>// 01_ABOUT</span>
          <div className={s.sectionLabelLine} />
        </div>

        <div className={`${s.aboutGrid} sectionReveal`}>
          {/* Bio */}
          <div>
            <h2 className={s.heading}>
              <span className={s.headingSnow}>ENGINEER BY CRAFT,</span>
              <span className={s.headingNeon}>BUILDER BY NATURE.</span>
            </h2>
            <p className={s.bio}>Hey, I&apos;m Wachara — known as <strong className={s.bioHighlightSnow}>Wachiii</strong> in the Bangkok tech scene. 15+ years turning product ideas into shipped software.</p>
            <p className={s.bio} style={{ marginTop:16 }}>Sweet spot: <strong className={s.bioHighlightNeon}>cross-platform mobile & web</strong> — React Native, Flutter, and modern web stacks. Performance, clean architecture, products that feel <em>right</em>.</p>
            <p className={s.bio} style={{ marginTop:16 }}>Outside client work, I create <strong className={s.bioHighlightCyan}>digital products</strong> — templates and courses that help developers ship faster.</p>
            <div className={s.skillsWrap}>
              {skills.map((sk, i) => <span key={sk} className={skillTagClass(skillColors[i])}>{sk}</span>)}
            </div>
          </div>

          {/* Timeline */}
          <div className={`${s.sectionReveal} ${s.timeline}`}>
          <h3 className={s.timelineTitle}>WORKING TIMELINE</h3>
          <div className={s.timelineDivider} />
          <div className={s.timelineList}>
            <div className={s.timelineCenterLine} />
            {TIMELINE.map((item, i) => (
              <div key={i} className={s.timelineRow}>
                <div className={`${s.timelineYear} ${item.current ? s.timelineYearCurrent : s.timelineYearPast}`}>
                  {item.year}
                </div>
                <div className={`${s.timelineDot} ${item.current ? s.timelineDotCurrent : s.timelineDotPast}`} />
                <div className={s.timelineCompany}>
                  <span className={`${s.timelineCompanyName} ${item.current ? s.timelineCompanyCurrent : s.timelineCompanyPast}`}>
                    {item.company}
                    {item.role && <span className={s.timelineRole}> / {item.role}</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Stats */}
        <div className={s.statsGrid}>
            {statBoxes.map(st => (
              <div key={st.label} className={s.statBox}>
                <div className={s.statBoxLine} style={{ background:`linear-gradient(90deg, ${st.color}60, transparent)` }} />
                <div className={s.statNum} style={{ color:st.color, textShadow:`0 0 12px ${st.color}60` }}>{st.num}</div>
                <div className={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
