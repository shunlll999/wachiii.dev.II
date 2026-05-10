"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import s from "@/styles/sections.module.css";
import { getFeaturedProjects } from "@/utils";
import type { Project, TagColor } from "@/types";

function tagCls(c: TagColor) {
  if (c==="purple") return `techTag techTagCyan`;
  if (c==="green")  return `techTag techTagAcid`;
  return "techTag";
}

export default function PortfolioSection({ featuredProjects }: { featuredProjects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProjects(featuredProjects);

  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1 });
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={s.sectionAlt} ref={ref} id="portfolio">
      <div className={s.inner}>
        <div className={`${s.sectionLabel} sectionReveal`}>
          <span className={s.sectionLabelText}>// 02_PORTFOLIO</span>
          <div className={s.sectionLabelLine} />
        </div>

        <div className={`${s.portfolioHeader} sectionReveal`}>
          <h2 className={s.heading}>
            <span className={s.headingSnow}>SELECTED_WORKS</span>
            <span className={s.headingNeon}>THAT_SHIPPED.</span>
          </h2>
          <Link href="/portfolio" className={s.viewAllBtn}>VIEW_ALL →</Link>
        </div>

        <div className={`${s.projectGrid} sectionReveal`}>
            {featured.map(p => (
              <Link key={p.id} href={`/portfolio/portf?slug=${p.slug}`} className={s.projectCard}>
                <div className={s.projectCardTopLine} />
                <div className={s.projectId}>[{p.id}]</div>
                <div className={s.projectCat}>{p.category}</div>
                <h3 className={s.projectTitle}>{p.title}</h3>
                <p className={s.projectDesc}>{p.description}</p>
                <div className={s.impactList}>
                  {p.impact.map(m => <span key={m} className={s.impactBadge}>✓ {m}</span>)}
                </div>
                <div className={s.projectFooter}>
                  <div className={s.tagList}>
                    {p.tags.map(tag => <span key={tag} className={tagCls(p.tagColor)}>{tag}</span>)}
                  </div>
                  <span className={s.arrow}>→</span>
                </div>
              </Link>
            ))}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
