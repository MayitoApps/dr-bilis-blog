'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POSTS } from '@/data/posts';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowRight, AlertTriangle, Flame, Clock, Stethoscope } from 'lucide-react';

const CATEGORIES = ['TODOS', 'AUTOAYUDA', 'TRABAJO', 'TECH', 'RELACIONES'] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');

  const filteredPosts = activeCategory === 'TODOS'
    ? POSTS
    : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="container-wide" style={{ paddingTop: '2.5rem' }}>
      {/* Hero: Sala de Espera / Manifiesto */}
      <section style={{
        background: '#fff',
        border: 'var(--border-heavy)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        marginBottom: '3rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--accent-danger)',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '0.3rem 0.75rem',
          border: '1.5px solid #000',
          marginBottom: '1.25rem'
        }}>
          <AlertTriangle size={15} /> AVISO DE ADMISIÓN OBLIGATORIO
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.8rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1.0,
          marginBottom: '1.25rem',
          letterSpacing: '-0.04em'
        }}>
          La verdad no está aquí <br />
          <span style={{
            background: 'var(--accent-toxic)',
            padding: '0 0.4rem',
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000'
          }}>para caerte bien.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#333',
          maxWidth: '750px',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          Bienvenido al consultorio del <strong>Dr. Bilis</strong>. Aquí no hay discursos motivacionales, ni palmaditas en la espalda, ni consejos para manifestar tu mejor versión. Solo diagnósticos fríos, directos y despiadados sobre la comedia involuntaria que llamamos sociedad moderna.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderTop: '2px dashed #000',
          paddingTop: '1.5rem'
        }}>
          <a href="#expedientes" className="brutal-btn">
            REVISAR EXPEDIENTES CLÍNICOS <ArrowRight size={16} />
          </a>
          <a href="#newsletter" className="brutal-btn brutal-btn-ghost">
            SUSCRÍBETE A LA RECETA
          </a>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#777',
            marginLeft: 'auto'
          }}>
            [TIEMPO DE ESPERA: CERO SEGUNDOS]
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section id="expedientes" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div className="badge-tag dark" style={{ marginBottom: '0.4rem' }}>
              ARCHIVO DE CASOS //
            </div>
            <h2 style={{ fontSize: '1.8rem', textTransform: 'uppercase' }}>
              Expedientes Diagnósticos
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="brutal-btn"
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.75rem',
                  background: activeCategory === cat ? 'var(--accent-toxic)' : '#fff',
                  boxShadow: activeCategory === cat ? 'var(--shadow-base)' : '2px 2px 0 #000'
                }}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="brutal-box"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                background: '#ffffff'
              }}
            >
              <div>
                {/* Meta header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  borderBottom: '1.5px solid #eee',
                  paddingBottom: '0.75rem'
                }}>
                  <span className="badge-tag danger">{post.code}</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#666',
                    fontWeight: 700
                  }}>
                    <Clock size={13} /> {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  marginBottom: '0.75rem',
                  lineHeight: 1.2
                }}>
                  <Link href={`/post/${post.slug}`} style={{ color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h3>

                {/* Subtitle / Excerpt */}
                <p style={{
                  fontSize: '0.92rem',
                  color: '#4a4a4a',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {post.summary}
                </p>

                {/* Cynical quote pill */}
                <div style={{
                  background: 'var(--accent-muted)',
                  borderLeft: '4px solid #000',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: '#222',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{post.punchlineQuote.slice(0, 95)}..."
                </div>
              </div>

              {/* Action bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1.5px solid #000',
                paddingTop: '1rem',
                marginTop: 'auto'
              }}>
                <span className="badge-tag toxic">
                  {post.tag}
                </span>

                <Link
                  href={`/post/${post.slug}`}
                  className="brutal-btn brutal-btn-dark"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem' }}
                >
                  LEER CASO <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Anchor Section */}
      <section id="newsletter">
        <NewsletterForm />
      </section>
    </div>
  );
}
