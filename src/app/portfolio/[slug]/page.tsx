// ไม่มี "use client" !!
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <PortfolioDetailClient params={Promise.resolve({ slug: project.slug })} />;
}
