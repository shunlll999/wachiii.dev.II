"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import s from "@/styles/sections.module.css";
import { formatTHB, formatUSD } from "@/utils";

const products = [
  { type:"TEMPLATE", title:"React Native Starter Kit", desc:"Production-ready RN boilerplate. Auth, navigation, state, dark mode, CI/CD. Save 40+ hours.", priceTHB:990, priceUSD:27, badge:"BEST_SELLER", badgeStyle:{ color:"var(--neon)", background:"rgba(0,255,136,0.1)", borderColor:"rgba(0,255,136,0.25)" }, accentColor:"var(--neon)", features:["Auth (JWT+OAuth)","Navigation stack","Zustand state","Dark/Light mode","CI/CD config"], cta:"BUY_TEMPLATE", ctaBg:"bg-neon" },
  { type:"TEMPLATE", title:"Flutter UI Component Kit",  desc:"50+ premium Flutter widgets. Design tokens + Figma file. Pixel-perfect, dark mode ready.", priceTHB:790, priceUSD:22, badge:"NEW", badgeStyle:{ color:"var(--cyan)", background:"rgba(0,229,255,0.1)", borderColor:"rgba(0,229,255,0.25)" }, accentColor:"var(--cyan)", features:["50+ components","Design tokens","Dark mode","Figma file","Lifetime updates"], cta:"BUY_KIT", ctaBg:"bg-cyan" },
  { type:"COURSE",   title:"Ship Mobile Apps Fast",     desc:"Build & launch cross-platform app in 30 days. React Native + Expo. Zero to App Store.", priceTHB:2490, priceUSD:69, badge:"COMING_SOON", badgeStyle:{ color:"var(--acid)", background:"rgba(170,255,0,0.1)", borderColor:"rgba(170,255,0,0.25)" }, accentColor:"var(--acid)", features:["8hrs video","30-day plan","Source code","Community","1:1 Q&A"], cta:"JOIN_WAITLIST", ctaBg:"bg-acid" },
];

export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1 });
    ref.current?.querySelectorAll(".sectionReveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
          {products.map(p => (
            <div key={p.title} className={`${s.productCard} sectionReveal`}>
              <div className={s.productTopLine} style={{ background:`linear-gradient(90deg, transparent, ${p.accentColor}60, transparent)` }} />
              <div className={s.productHeader}>
                <span className={s.productType}>{p.type}</span>
                <span className={s.productBadge} style={p.badgeStyle as CSSProperties}>{p.badge}</span>
              </div>
              <h3 className={s.productTitle}>{p.title}</h3>
              <p className={s.productDesc2}>{p.desc}</p>
              <ul className={s.productFeatures}>
                {p.features.map(f => <li key={f} className={s.productFeature}><span style={{ color:p.accentColor }}>▶</span>{f}</li>)}
              </ul>
              <div className={s.productFooter}>
                <div className={s.productPriceRow}>
                  <span className={s.productPrice}>{formatTHB(p.priceTHB)}</span>
                  <span className={s.productPriceUSD}>{formatUSD(p.priceUSD)}</span>
                </div>
                <button className={s.productCta} style={{ color:p.accentColor==="var(--neon)"?"var(--void)":p.accentColor, background:p.accentColor==="var(--neon)"?"var(--neon)":"transparent", borderColor:`${p.accentColor}40` }}>
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={`${s.guarantee} sectionReveal`}>
          <span>🔒</span>
          <p className={s.guaranteeText}><strong className={s.guaranteeStrong}>30-day money-back</strong> on all products.</p>
        </div>
      </div>
    </section>
  );
}
