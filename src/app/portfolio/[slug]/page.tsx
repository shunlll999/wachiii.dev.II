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
    },
    twitter: {
      title: `${title} | wAcii`,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <PortfolioDetailClient params={Promise.resolve({ slug: project.slug })} />;
}
