import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleStubPage } from "@/components/site/resources/ArticleStub";
import { ARTICLES, getArticle } from "@/components/site/resources/articles";

/* Pass 5 Cycle 4 — /resources/[slug] article stubs. */

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: `${article.title}`,
    description: article.excerpt,
    alternates: { canonical: `/resources/${slug}` },
  };
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <ArticleStubPage article={article} />
      </main>
      <SiteFooter />
    </div>
  );
}
