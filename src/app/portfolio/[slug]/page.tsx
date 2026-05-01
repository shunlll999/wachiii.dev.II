// ไม่มี "use client" !!
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  const title = project.title;
  const description = project.description;
  const url = `https://wachiii-dev0.web.app/portfolio/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | wAcii`,
      description,
      url,
      type: "article",
      images: [
        {
          url: project.screenshots ? project.screenshots[0] : "https://wachiii-dev0.web.app/images/logo/screenshot.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: `${title} | wAcii`,
      description,
      images: [
        {
          url: project.screenshots ? project.screenshots[0] : "https://wachiii-dev0.web.app/images/logo/screenshot.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <PortfolioDetailClient params={Promise.resolve({ slug: project.slug })} />;
}
