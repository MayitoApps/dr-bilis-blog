import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/data/posts';
import { ShareBar } from '@/components/ShareBar';
import { ReactionBox } from '@/components/ReactionBox';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowLeft, ArrowRight, Clock, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

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

  return {
    title: `${post.code}: ${post.title} // Dr. Bilis`,
    description: post.summary,
    openGraph: {
      title: `${post.code}: ${post.title}`,
      description: `"${post.punchlineQuote}" — Lee el diagnóstico completo en el consultorio del Dr. Bilis.`,
      type: 'article',
      authors: ['Dr. Bilis'],
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.code}: ${post.title} — Dr. Bilis`,
      description: post.punchlineQuote,
      images: [ogUrl],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = allPosts.length > 1 ? allPosts[(currentIndex + 1) % allPosts.length] : null;

  return (
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
  );
}
