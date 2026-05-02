"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import s from "@/styles/portfolio.module.css";
import { projects } from "@/data/projects";
import { filterProjectsByTag } from "@/utils";
import type { TagColor } from "@/types";

const FILTERS = ["ALL", "React Native", "Flutter", "React", "Unity", "Next.js"];

function tagCls(c: TagColor) {
  if (c === "purple") return "techTag techTagCyan";
  if (c === "green")  return "techTag techTagAcid";
  return "techTag";
}

export default function PortfolioPage() {
  const [active, setActive] = useState("ALL");
  const ref = useRef<HTMLDivElement>(null);
  const filtered = filterProjectsByTag(projects, active);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll("[data-card]");
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    cards.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <div>
      <div className={`${s.page} gridBg`} ref={ref}>

        {/* Header */}
        <header className={`${s.listHeader} scanline`}>
          <div className={s.headerGlow} />
          <div className={s.cornerTL} /><div className={s.cornerTR} />
          <div className={s.inner}>
            <Link href="/" className={s.backLink}>← BACK_TO_HOME</Link>
            <div className={s.labelRow}>
              <span className={s.labelText}>// PORTFOLIO</span>
              <div className={s.labelLine} />
            </div>
            <h1 className={s.listHeading}>
              <span className={s.listHeadingSnow}>ALL</span>
              <span className={s.listHeadingNeon}>PROJECTS</span>
            </h1>
            <p className={s.listSubtitle}>{projects.length}_PROJECTS :: SHIPPED</p>
          </div>
        </header>

        {/* Filter */}
        <div className={s.filterBar}>
          <div className={s.filterInner}>
            <span className={s.filterLabel}>FILTER::</span>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActive(f)}
                className={`${s.filterBtn} ${active === f ? s.filterBtnActive : ""}`}>
                {f}
              </button>
            ))}
            <span className={s.filterCount}>[{filtered.length}_RESULTS]</span>
          </div>
        </div>

        {/* Grid */}
        <div className={s.gridWrap}>
          <div className={s.grid} style={{ maxWidth:1152, margin:"0 auto" }}>
            {filtered.map((p, i) => (
              <Link key={p.id} href={`/portfolio/${p.slug}`}
                className={s.card} data-card style={{ transitionDelay:`${i*50}ms` }}>
                <div className={s.cardTopLine} />
                <div className={s.cardMeta}>
                  <span className={s.cardYear}>{p.year}</span>
                  {p.featured && <span className={s.cardFeatured}>FEATURED</span>}
                </div>
                <div className={s.cardCat}>{p.category}</div>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <p className={s.cardDesc}>{p.description}</p>
                <div className={s.cardTags}>
                  {p.tags.map(tag => <span key={tag} className={tagCls(p.tagColor)}>{tag}</span>)}
                </div>
                <div className={s.cardFooter}>
                  <span className={s.cardImpact}>✓ {p.impact[0]}</span>
                  <span className={s.cardArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
