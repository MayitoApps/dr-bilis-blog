'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POSTS } from '@/data/posts';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowRight, AlertTriangle, Clock, Stethoscope, ShieldAlert, Sparkles } from 'lucide-react';

const CATEGORIES = ['TODOS', 'AUTOAYUDA', 'TRABAJO', 'TECH', 'RELACIONES'] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');

  const filteredPosts = activeCategory === 'TODOS'
    ? POSTS
    : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="container-wide" style={{ paddingTop: '2rem' }}>
      {/* Hero: Sala de Espera / Manifiesto */}
      <section style={{
        background: '#fff',
        border: 'var(--border-heavy)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        marginBottom: '2.5rem',
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
          border: 'var(--border-thin)',
          marginBottom: '1.25rem'
        }}>
          <AlertTriangle size={15} /> AVISO DE ADMISIÓN OBLIGATORIO
        </div>

        <h1 style={{
          fontSize: 'clamp(1.9rem, 5.5vw, 3.6rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1.05,
          marginBottom: '1.25rem',
          letterSpacing: '-0.04em'
        }}>
          La verdad no está aquí <br />
          <span style={{
            background: 'var(--accent-toxic)',
            padding: '0.1rem 0.4rem',
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000',
            display: 'inline-block',
            marginTop: '0.2rem'
          }}>
            para caerte bien.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#2a2a2a',
          width: '100%',
          lineHeight: 1.65,
          marginBottom: '2rem'
        }}>
          Bienvenido al consultorio del <strong>Dr. Bilis</strong>. Aquí no hay discursos motivacionales, ni palmaditas en la espalda, ni fórmulas mágicas para "manifestar tu mejor versión". Solo diagnósticos fríos, directos y despiadados sobre la comedia involuntaria que llamamos sociedad moderna.
        </p>

        <div className="hero-btn-group" style={{
          display: 'flex',
          gap: '0.85rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderTop: '2px dashed #000',
          paddingTop: '1.5rem'
        }}>
          <a href="#newsletter" className="brutal-btn">
            PRESCRIBIRME A LA RECETA <ArrowRight size={16} />
          </a>
          <Link href="/manifiesto" className="brutal-btn brutal-btn-ghost">
            ¿QUIÉN ES EL DR. BILIS?
          </Link>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#666',
            marginLeft: 'auto'
          }}>
            [TIEMPO DE ESPERA: CERO SEGUNDOS]
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="expedientes" style={{ marginBottom: '2.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div className="badge-tag dark" style={{ marginBottom: '0.4rem' }}>
              ARCHIVO GENERAL //
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', textTransform: 'uppercase' }}>
              Expedientes Diagnósticos
            </h2>
          </div>

          {/* Category Tabs (Only if there are posts) */}
          {POSTS.length > 0 && (
            <div className="category-scroll-container">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="brutal-btn"
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    background: activeCategory === cat ? 'var(--accent-toxic)' : '#fff',
                    boxShadow: activeCategory === cat ? 'var(--shadow-base)' : '2px 2px 0 #000',
                    minHeight: '36px'
                  }}
                >
                  [{cat}]
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CASE 1: No Posts Published Yet (Empty State) */}
        {POSTS.length === 0 ? (
          <div className="brutal-box" style={{
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            background: '#ffffff',
            border: 'var(--border-heavy)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--accent-toxic)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.3rem 0.65rem',
              border: '1.5px solid #000',
              marginBottom: '1.25rem'
            }}>
              <Stethoscope size={15} /> [ SALA DE ESPERA VACÍA // EXPEDIENTES EN OBSERVACIÓN ]
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.15,
              marginBottom: '1rem'
            }}>
              El Dr. Bilis está afilando el bisturí.
            </h3>

            <p style={{
              fontSize: '1.05rem',
              color: '#333',
              lineHeight: 1.7,
              width: '100%',
              marginBottom: '2rem'
            }}>
              Actualmente no hay diagnósticos públicos archivados en este registro. El doctor está observando la comedia involuntaria de la sociedad moderna y redactando los primeros casos forenses.
            </p>

            <div style={{
              background: 'var(--accent-muted)',
              border: 'var(--border-base)',
              padding: '1.25rem',
              width: '100%',
              marginBottom: '2rem'
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--accent-danger)',
                marginBottom: '0.75rem'
              }}>
                [ EN OBSERVACIÓN CLÍNICA PARA PRÓXIMA PUBLICACIÓN ]
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}>
                <li>🔴 <strong>CASO 01:</strong> La religión del "despiértate a las 5:00 AM y sé tu propio jefe".</li>
                <li>🔴 <strong>CASO 02:</strong> Por qué tu empresa dice que "aquí somos una familia" justo antes de recortar personal.</li>
                <li>🔴 <strong>CASO 03:</strong> La tragedia estética de las bodas organizadas para impresionar en Instagram.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a href="#newsletter" className="brutal-btn">
                RECIBIR EL PRIMER CASO AL CORREO <ArrowRight size={15} />
              </a>
              <Link href="/manifiesto" className="brutal-btn brutal-btn-ghost">
                LEER EL MANIFIESTO DEL DOCTOR
              </Link>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="brutal-box" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#666' }}>
              No hay expedientes archivados bajo la categoría [{activeCategory}]. Selecciona [TODOS] para ver los demás casos.
            </p>
          </div>
        ) : (
          /* Posts Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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

                  {post.coverImage && (
                    <Link
                      href={`/post/${post.slug}`}
                      style={{
                        display: 'block',
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        border: '2px solid #000',
                        boxShadow: '3px 3px 0 #000',
                        background: '#0c0c0c',
                      }}
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '16 / 9',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </Link>
                  )}

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

                  <p style={{
                    fontSize: '0.92rem',
                    color: '#4a4a4a',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {post.summary}
                  </p>

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
        )}
      </section>

      {/* Newsletter Anchor Section */}
      <section id="newsletter">
        <NewsletterForm />
      </section>
    </div>
  );
}
