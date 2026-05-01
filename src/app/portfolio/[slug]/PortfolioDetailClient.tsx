"use client";
import { Fragment, use, useEffect, useRef } from "react";
import Link from "next/link";
import s from "@/styles/portfolio.module.css";
import { projects } from "@/data/projects";
import { getRelatedProjects } from "@/utils";
import { notFound } from "next/navigation";
import type { TagColor } from "@/types";

import type { Project } from "@/types";

const ACCENT_COLORS = ["#00ff88","#00e5ff","#aaff00","#00ff88"];

function tagCls(c: TagColor) {
  if (c === "purple") return "techTag techTagCyan";
  if (c === "green")  return "techTag techTagAcid";
  return "techTag";
}

export default function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const ref = useRef<HTMLDivElement>(null);
  const related = getRelatedProjects(projects, slug, 3);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    ref.current.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <Fragment>
<div className={s.page} ref={ref}>
        {/* ── Hero ── */}
        <header className={`${s.detailHero} gridBg scanline`}>
          <div className={s.detailTopBar} />
          <div className={s.detailGlow} style={{ background:`radial-gradient(circle, ${project.color}08, transparent 70%)` }} />
          <div className={s.detailCorner} />

          <div className={s.innerMd}>
            {/* Breadcrumb */}
            <nav className={s.breadcrumb}>
              <Link href="/" className={s.breadcrumbLink}>HOME</Link>
              <span className={s.breadcrumbSep}>›</span>
              <Link href="/portfolio" className={s.breadcrumbLink}>PORTFOLIO</Link>
              <span className={s.breadcrumbSep}>›</span>
              <span className={s.breadcrumbCurrent}>{project.title.toUpperCase().replace(/ /g,"_")}</span>
            </nav>

            {/* Meta */}
            <div className={s.detailMetaRow}>
              <span className={s.detailCat}>{project.category}</span>
              <span className={s.detailSep}>|</span>
              <span className={s.detailYear}>{project.year}</span>
              {project.featured && <span className={s.detailBadge}>FEATURED</span>}
            </div>

            <h1 className={s.detailTitle}>{project.title.toUpperCase()}</h1>
            <p className={s.detailDesc}>{project.longDescription}</p>

            <div className={s.detailTags}>
              {project.tags.map(tag => <span key={tag} className={tagCls(project.tagColor)}>{tag}</span>)}
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <div className={s.detailContent}>
          <div className={s.innerMd}>

            {/* Results */}
            <section data-reveal>
              <div className={s.subLabel}>
                <span className={s.subLabelText}>// RESULTS_LOG</span>
                <div className={s.subLabelLine} />
              </div>
              <div className={s.metricsGrid}>
                {project.impact.map((m, i) => (
                  <div key={m} className={s.metricBox}>
                    <div className={s.metricNum}
                      style={{ color: ACCENT_COLORS[i%4], textShadow:`0 0 10px ${ACCENT_COLORS[i%4]}60` }}>
                      {m.split(" ")[0]}
                    </div>
                    <div className={s.metricText}>{m.split(" ").slice(1).join(" ")}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenge / Solution */}
            <section data-reveal>
              <div className={s.csGrid}>
                <div className={s.csBox}>
                  <div className={s.csBoxTopLine}
                    style={{ background:"linear-gradient(to right, rgba(0,255,136,0.4), transparent)" }} />
                  <div className={s.csBoxLabel} style={{ color:"var(--neon)" }}>// THE_CHALLENGE</div>
                  <p className={s.csBoxText}>{project.challenge}</p>
                </div>
                <div className={s.csBox}>
                  <div className={s.csBoxTopLine}
                    style={{ background:"linear-gradient(to right, rgba(170,255,0,0.4), transparent)" }} />
                  <div className={s.csBoxLabel} style={{ color:"var(--acid)" }}>// THE_SOLUTION</div>
                  <p className={s.csBoxText}>{project.solution}</p>
                </div>
              </div>
            </section>

            {/* Screenshots */}
            <section data-reveal>
              <div className={s.subLabel}>
                <span className={`${s.subLabelText} ${s.subLabelTextCyan}`}>// SCREENSHOTS</span>
                <div className={`${s.subLabelLine} ${s.subLabelLineCyan}`} />
              </div>
              <div className={s.screenshotsGrid}>
                {[1, 2].map(n => (
                  <div key={n} className={s.screenshotPlaceholder}>
                    <div className={s.screenshotLabel}>[SCREENSHOT_{n}]</div>
                    <div className={s.screenshotSubLabel}>Replace with actual screenshots</div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section data-reveal>
              <div className={s.ctaBox}>
                <div className={s.ctaGlow} />
                <p className={s.ctaNote}>// LIKE_WHAT_YOU_SEE?</p>
                <h3 className={s.ctaTitle}>LET&apos;S BUILD SOMETHING.</h3>
                <p className={s.ctaSubtext}>Available for freelance and consulting missions.</p>
                <a href="/#contact" className={s.ctaBtn}>INITIATE_CONTACT →</a>
              </div>
            </section>

          </div>
        </div>

        {/* ── More projects ── */}
        <div className={s.moreSection}>
          <div className={s.inner}>
            <div className={s.moreHeader}>
              <span className={s.moreTitle}>// MORE_PROJECTS</span>
              <div className={s.moreLine} />
              <Link href="/portfolio" className={s.moreViewAll}>VIEW_ALL →</Link>
            </div>
            <div className={s.moreGrid}>
              {related.map(p => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className={s.moreCard}>
                  <div className={s.moreCardCat}>{p.category}</div>
                  <h4 className={s.moreCardTitle}>{p.title}</h4>
                  <p className={s.moreCardDesc}>{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
