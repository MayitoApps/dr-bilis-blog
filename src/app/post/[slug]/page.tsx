import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/data/posts';
import { ShareBar } from '@/components/ShareBar';
import { ReactionBox } from '@/components/ReactionBox';
import { CommentsSection } from '@/components/CommentsSection';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowLeft, ArrowRight, Clock, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drbilis.com';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Caso No Encontrado // Dr. Bilis',
    };
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&code=${encodeURIComponent(post.code)}&tag=${encodeURIComponent(post.tag)}`;
  const canonicalUrl = `${SITE_URL}/post/${post.slug}`;
  const absoluteImageUrl = post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}${ogUrl}`;

  return {
    title: `${post.code}: ${post.title}`,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      post.title,
      post.category,
      post.tag,
      'Dr. Bilis',
      'Diagnóstico social',
      'Crítica laboral',
      'Cinismo',
    ],
    openGraph: {
      title: `${post.code}: ${post.title} // Dr. Bilis`,
      description: `"${post.punchlineQuote}" — Lee el diagnóstico completo en el consultorio del Dr. Bilis.`,
      url: canonicalUrl,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [`${SITE_URL}/manifiesto`],
      section: post.category,
      tags: [post.tag, post.category, 'Dr. Bilis'],
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.code}: ${post.title} — Dr. Bilis`,
      description: post.punchlineQuote,
      images: [absoluteImageUrl],
      creator: '@DrBilis',
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/post/${post.slug}`;
  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&code=${encodeURIComponent(post.code)}&tag=${encodeURIComponent(post.tag)}`;
  const absoluteImageUrl = post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}${ogUrl}`;

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = allPosts.length > 1 ? allPosts[(currentIndex + 1) % allPosts.length] : null;

  // Approximate word count for schema
  const totalWords = [
    post.title,
    post.summary,
    post.content.dictamen,
    ...post.content.sections.flatMap((s) => s.paragraphs),
    post.content.veredictoFinal,
  ]
    .join(' ')
    .split(/\s+/).length;

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Expedientes',
            item: `${SITE_URL}/#archivo`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}/#article`,
        isPartOf: {
          '@type': 'Blog',
          '@id': `${SITE_URL}/#blog`,
          name: 'Dr. Bilis // Diagnóstico Social',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        headline: post.title,
        description: post.summary,
        image: [absoluteImageUrl],
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        inLanguage: 'es-MX',
        wordCount: totalWords,
        articleSection: post.category,
        keywords: [post.tag, post.category, 'Dr. Bilis', 'Opinión cínica', 'Diagnóstico social'],
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#author`,
          name: 'Dr. Bilis',
          url: `${SITE_URL}/manifiesto`,
          jobTitle: 'Analista Forense y Crítico Cultural',
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Dr. Bilis',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/icon`,
            width: 512,
            height: 512,
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <article className="container-narrow" style={{ paddingTop: '2rem' }}>
        {/* Back link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            href="/"
            className="badge-tag"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
          <ArrowLeft size={14} /> VOLVER AL ARCHIVO GENERAL
        </Link>
      </div>

      {/* Header Case Report */}
      <header style={{
        background: '#fff',
        border: 'var(--border-heavy)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          borderBottom: '2px solid #000',
          paddingBottom: '0.85rem',
          marginBottom: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge-tag danger">{post.code}</span>
            <span className="badge-tag toxic">{post.category}</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', color: '#555' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} /> {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={13} /> DOSIS: {post.readTime}
            </span>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1rem'
        }}>
          {post.title}
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: '#444',
          lineHeight: 1.5,
          borderLeft: '4px solid var(--accent-danger)',
          paddingLeft: '0.85rem'
        }}>
          {post.subtitle}
        </p>
      </header>

      {/* Cover Image / Evidencia Fotográfica */}
      {post.coverImage && (
        <div style={{
          marginBottom: '2rem',
          border: 'var(--border-heavy)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          background: '#0c0c0c',
          position: 'relative'
        }}>
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              aspectRatio: '16 / 9',
              objectFit: 'cover'
            }}
          />
          <div style={{
            background: '#0c0c0c',
            color: 'var(--accent-toxic)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '0.45rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #000'
          }}>
            <span>[ ARCHIVO FOTOGRÁFICO CLÍNICO // {post.code} ]</span>
            <span style={{ color: '#ffffff' }}>DRBILIS.COM</span>
          </div>
        </div>
      )}

      {/* Social Share Toolbar (Top) */}
      <ShareBar post={post} />

      {/* Medical Admission / Dictamen Preliminar */}
      <div className="dictamen-box">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: 'var(--accent-danger)',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          [ SÍNTESIS FORENSE DEL DR. BILIS // LECTURA PREVIA ]
        </div>
        <p style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          fontStyle: 'italic',
          lineHeight: 1.6,
          color: '#111'
        }}>
          "{post.content.dictamen}"
        </p>
      </div>

      {/* Main Body */}
      <div className="article-body">
        {post.content.sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: '2.5rem' }}>
            <h2>{section.heading}</h2>

            {section.paragraphs.map((pText, pIdx) => (
              <p key={pIdx}>{pText}</p>
            ))}

            {section.cynicalNote && (
              <div className="cynical-callout">
                {section.cynicalNote}
              </div>
            )}
          </section>
        ))}

        {/* Punchline Highlight */}
        <div className="quote-highlight">
          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: '#000',
            marginBottom: '0.5rem'
          }}>
            PUNCHLINE // PARA GRABARSE EN LA FRENTE:
          </div>
          “{post.punchlineQuote}”
        </div>

        {/* Veredicto Final */}
        <div style={{
          background: '#0c0c0c',
          color: '#ffffff',
          border: 'var(--border-heavy)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-lg)',
          marginTop: '3rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-toxic)',
            fontWeight: 800,
            marginBottom: '0.75rem'
          }}>
            [ VEREDICTO FINAL Y ALTA MÉDICA ]
          </div>
          <p style={{
            color: '#ffffff',
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.6,
            marginBottom: '1rem'
          }}>
            {post.content.veredictoFinal}
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#888',
            borderTop: '1px solid #333',
            paddingTop: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>FIRMA: DR. BILIS</span>
            <span>CONSULTA FINALIZADA</span>
          </div>
        </div>
      </div>

      {/* Public Reaction Box */}
      <ReactionBox initialCode={post.code} />

      {/* Social Share Toolbar (Bottom for high conversion after reading!) */}
      <div style={{ marginTop: '2rem' }}>
        <ShareBar post={post} />
      </div>

      {/* Public Comments Section */}
      <CommentsSection postSlug={post.slug} postCode={post.code} />

      {/* Next Article Card */}
      {nextPost && (
        <div style={{
          background: '#fff',
          border: 'var(--border-base)',
          boxShadow: 'var(--shadow-base)',
          padding: '1.5rem',
          marginTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#666' }}>
              SIGUIENTE CASO POR DESECHAR //
            </div>
            <Link
              href={`/post/${nextPost.slug}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#000'
              }}
            >
              {nextPost.title}
            </Link>
          </div>
          <Link
            href={`/post/${nextPost.slug}`}
            className="brutal-btn"
            style={{ padding: '0.6rem 1rem' }}
          >
            PASAR AL SIGUIENTE <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Newsletter */}
      <div style={{ marginTop: '3.5rem' }}>
        <NewsletterForm />
      </div>
    </article>
    </>
  );
}
