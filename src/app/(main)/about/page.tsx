import s from "@/styles/about.module.css";
import Link from "next/link";
import MobileGame from "@/components/about/MobileGame";
import { ASSETS, HIDDEN_PROFILE, SOCIAL_LINKS } from "@/constants";

const CV_URL = "/cv/Wachara_Nilsonti_CV_2026.pdf";

const summary = "Results-driven Front-End Engineer and Technical Lead with over 15 years of experience specializing in scalable web and mobile applications, interactive experiences, and front-end architecture. Proven expertise in JavaScript, TypeScript, React, and React Native. Adept at leading cross-functional teams, optimizing application performance, and establishing robust engineering best practices. Passionate about leveraging emerging technologies like AI, tRPC, and WebAssembly to elevate user experiences and deliver high-impact digital products.";

const skillGroups = [
  { label: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "C#", "Dart", "Swift", "Kotlin"] },
  { label: "Frameworks & Libraries", items: ["React", "Next.js", "NestJS", "React Native", "Node.js", "Vue.js", "Flutter", "Socket.IO"] },
  { label: "Engineering Practices", items: ["Front-end Architecture", "Component-Driven UI", "Performance Optimization", "API Integration", "Technical Documentation", "Mentorship"] },
  { label: "Interactive & Emerging Tech", items: ["AI-assisted Development", "Unity (C#)", "tRPC", "WebAssembly", "Webflow"] },
];

const works = [
  { name: "Wiiwave", url: "https://wiiwave.com", desc: "Digital music technology platform tailored for dance music culture, featuring B2B DJ pools, audio fingerprinting for copyright management, and scalable B2C music streaming capabilities." },
  { name: "Lurjing", url: "https://lurjing.web.app", desc: "Full-stack web application hosted on Firebase, demonstrating modern architectural patterns, responsive UI design, and seamless API integrations." },
  { name: "Open Source & Technical Assessments", url: "https://github.com/shunlll999", desc: "Advanced full-stack work, including a Next.js and NestJS monorepo for a concert ticket booking application using Docker containerization and WebSockets." },
  { name: "Personal Portfolio", url: "https://wchiii.com", desc: "Professional portfolio showcasing interactive digital experiences, front-end architecture, and independent technical projects." },
];

const experience = [
  { role: "Software Engineer Specialist / IT Custodian", company: "ttb Spark - Bangkok", period: "Nov 2024 – Sep 2026", points: [
    "Drive front-end delivery for critical web and mobile applications, ensuring high standards of code quality, readability, and system maintainability.",
    "Coordinate cross-functionally with network and security teams to resolve environment blockers, align compliance controls, and ensure timely project delivery.",
    "Act as IT Custodian for the team, documenting engineering resources and device specifications.",
  ] },
  { role: "Senior Software Engineer / Project Lead", company: "MOHARA - Bangkok", period: "Jan 2018 – Oct 2024", points: [
    "Architected and maintained robust web and mobile applications using JavaScript/TypeScript, prioritizing seamless and intuitive user experiences.",
    "Drove front-end engineering best practices across the team, emphasizing component reusability, performance optimization, and rigorous code reviews.",
    "Supported production operations and implemented continuous improvement initiatives to sustain high system performance and reliability.",
    "Collaborated extensively with clients and multidisciplinary teams to define technical requirements, deliver high-value products, and foster strong stakeholder relationships.",
  ] },
  { role: "Javascript Developer (Interactive Web)", company: "Nadia Thailand (Japanese Interactive Production) - Bangkok", period: "2015 – 2016", points: [
    "Developed high-performance interactive websites and digital experiences for global brand campaigns, including New Balance, Nike, and Umbro.",
    "Collaborated with UI/UX designers and producers to translate creative concepts into engaging, performant web animations and interactions using HTML5, CSS3, and modern JavaScript.",
  ] },
  { role: "Game Developer", company: "Milyn Innovation / Praneat - Bangkok", period: "2013 – 2015", points: [
    "Engineered interactive games and applications to support digital marketing campaigns and brand activations using Unity and C#.",
    "Implemented complex gameplay systems and interactive features, collaborating with creative teams to deliver optimized experiences on tight deadlines.",
  ] },
  { role: "Interactive Programmer", company: "Dentsu 360 - Bangkok", period: "2012 – 2013", points: [
    "Prototyped and built interactive experiences within a fast-paced creative agency environment, integrating modern web technologies into campaign deliverables.",
  ] },
  { role: "Flash Programmer", company: "mInteraction - Bangkok", period: "2009 – 2012", points: [
    "Created rich interactive media and web experiences for digital advertising campaigns and microsites using ActionScript 2/3.",
  ] },
];

const education = [
  { title: "B.Sc. Information Technology", place: "Rattana Bundit University, Bangkok", period: "2003 – 2007" },
  { title: "High School Diploma", place: "Klonghat Pittayakom School, Sa Kaeo", period: "Graduated 2003" },
];

const stats = [
  { num: "15+", label: "YEARS_EXPERIENCE" },
  { num: "30+", label: "PROJECTS_SHIPPED" },
  { num: "6",   label: "TECH_STACKS" },
  { num: "3",   label: "PLATFORMS" },
];

const Page = () => {
  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Link href="/" className={s.backLink}>← BACK_TO_HOME</Link>

        <div className={s.labelRow}>
          <span className={s.labelText}>// ABOUT_ME</span>
          <div className={s.labelLine} />
        </div>

        {/* Intro */}
        <section className={s.hero}>
          <div className={s.avatarWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.avatar} src={ASSETS.avatar} alt={HIDDEN_PROFILE.realName} />
          </div>
          <div>
            <h1 className={s.name}>{HIDDEN_PROFILE.realName}</h1>
            <div className={s.role}>{HIDDEN_PROFILE.title} · {HIDDEN_PROFILE.location}</div>
            <p className={s.bio}>{summary}</p>
            <div className={s.actions}>
              <a className={s.btnPrimary} href={CV_URL} target="_blank" rel="noopener noreferrer">View CV</a>
              <a className={s.btnGhost} href={CV_URL} download="Wachara_Nilsonti_CV_2026.pdf">Download PDF</a>
            </div>
            <div className={s.contactRow}>
              <a href={`mailto:${HIDDEN_PROFILE.email}`}>{HIDDEN_PROFILE.email}</a>
              <span>{HIDDEN_PROFILE.phone}</span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className={s.stats}>
          {stats.map(st => (
            <div key={st.label} className={s.stat}>
              <div className={s.statNum}>{st.num}</div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <section className={s.block}>
          <h2 className={s.h2}>Core Technical Skills</h2>
          <dl className={s.skillList}>
            {skillGroups.map(g => (
              <div key={g.label} className={s.skillRow}>
                <dt className={s.skillLabel}>{g.label}</dt>
                <dd className={s.skills}>{g.items.map(i => <span key={i} className={s.skill}>{i}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Selected works */}
        <section className={s.block}>
          <h2 className={s.h2}>Projects &amp; Selected Works</h2>
          <div className={s.workGrid}>
            {works.map(w => (
              <a key={w.name} className={s.workCard} href={w.url} target="_blank" rel="noopener noreferrer">
                <div className={s.workName}>{w.name}</div>
                <div className={s.workUrl}>{w.url.replace("https://", "")}</div>
                <p className={s.workDesc}>{w.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className={s.block}>
          <h2 className={s.h2}>Professional Experience</h2>
          <ul className={s.timeline}>
            {experience.map((e, i) => (
              <li key={e.role + e.company} className={`${s.timelineItem} ${i === 0 ? s.timelineCurrent : ""}`}>
                <div className={s.timelineHead}>
                  <div className={s.timelineRole}>{e.role}</div>
                  <div className={s.timelineYear}>{e.period}</div>
                </div>
                <div className={s.timelineCompany}>{e.company}</div>
                <ul className={s.points}>{e.points.map(p => <li key={p}>{p}</li>)}</ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Education + languages */}
        <div className={s.grid}>
          <section>
            <h2 className={s.h2}>Education</h2>
            {education.map(ed => (
              <div key={ed.title} className={s.eduItem}>
                <div className={s.timelineHead}>
                  <div className={s.timelineRole}>{ed.title}</div>
                  <div className={s.timelineYear}>{ed.period}</div>
                </div>
                <div className={s.timelineCompany}>{ed.place}</div>
              </div>
            ))}
          </section>
          <section>
            <h2 className={s.h2}>Languages</h2>
            <p className={s.bio}><strong>Thai</strong> (Native) · <strong>English</strong> (Professional Working Proficiency)</p>
          </section>
        </div>

        {/* Social */}
        <h2 className={s.h2}>Find me</h2>
        <div className={s.social}>
          {SOCIAL_LINKS.map(l => (
            <a key={l.label} className={s.socialLink} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>

        {/* VOID GP (mobile only) */}
        <MobileGame />

        {/* Game iframe (kept) */}
        <h2 className={s.h2}>Play: HTML5 Game (2014)</h2>
        <p className={s.gameNote}>A little game I built back in 2014 with Phaser — give it a try.</p>
        <div className={s.frameWrap}>
          <iframe className={s.frame} src="/projects/html5Game/2014/game/" title="HTML5 Game 2014" />
        </div>
      </div>
    </div>
  );
};

export default Page;
