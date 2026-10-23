"use client";
import { useEffect, useRef } from "react";
import s from "@/styles/sections.module.css";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useDocuments } from "@/hooks/useDocuments";
import type { Project } from "@/types";

// screenshots come back from Firestore as DocumentReferences (or ids), keyed by mediaCollection id
const firstScreenshotId = (p: Project): string | undefined => {
  const first = p.screenshots?.[0] as unknown as string | { id?: string } | undefined;
  return typeof first === "string" ? first : first?.id;
};

export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { portfolios } = useProducts();
  const { medias } = useDocuments();
  const items = portfolios.filter(p => p.showInProducts);
  const thumbOf = (p: Project) => {
    const id = firstScreenshotId(p);
    return medias.find(m => m.id === id)?.downloadURL;
  };
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1 });
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [items.length]);

  return (
    <section className={s.section} ref={ref} id="products">
      <div className={s.inner}>
        <div className={`${s.sectionLabel} sectionReveal`}>
          <span className={s.sectionLabelText}>// 03_PRODUCTS</span>
          <div className={s.sectionLabelLine} />
        </div>
        <h2 className={`${s.heading} sectionReveal`}>
          <span className={s.headingSnow}>TOOLS I BUILT</span>
          <span className={s.headingCyan}>SO YOU SHIP FASTER.</span>
        </h2>
        <p className={`${s.productDesc} sectionReveal`}>15 years distilled into templates and courses — the setup I wish I had earlier.</p>

        <div className={s.productGrid}>
          {items.map(p => (
            <Link key={p.id} href={`/portfolio/portf?slug=${p.slug}`} className={`${s.productCard} sectionReveal`}>
              {thumbOf(p) && (
                <div className={s.productThumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbOf(p)} alt={p.title} loading="lazy" />
                </div>
              )}
              <div className={s.productHeader}>
                <span className={s.productType}>{p.category}</span>
                <span className={s.productBadge}>{p.year}</span>
              </div>
              <h3 className={s.productTitle}>{p.title}</h3>
              <p className={s.productDesc2}>{p.description}</p>
              <ul className={s.productFeatures}>
                {p.tags.map(t => <li key={t} className={s.productFeature}><span>▶</span>{t}</li>)}
              </ul>
            </Link>
          ))}
          {items.length === 0 && (
            <div className={`${s.productCard} sectionReveal`}>
                🚧 Under construction... Please check back later for real products!
            </div>
          )}
        </div>
        <div className={`${s.guarantee} sectionReveal`}>
          <span>🔒</span>
          <p className={s.guaranteeText}><strong className={s.guaranteeStrong}>30-day money-back</strong> on all products.</p>
        </div>
      </div>
    </section>
  );
}
