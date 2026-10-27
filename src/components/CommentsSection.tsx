'use client';

import React, { useState, useEffect } from 'react';
import { Comment } from '@/types';
import { MessageSquare, Send, CheckCircle2, AlertCircle, User, Tag } from 'lucide-react';

interface CommentsSectionProps {
  postSlug: string;
  postCode: string;
}

const TAG_OPTIONS = [
  { label: '🎯 ME IDENTIFIQUÉ', value: 'ME IDENTIFIQUÉ', color: 'var(--accent-toxic)' },
  { label: '🤬 ESTOY OFENDIDO', value: 'OFENDIDO', color: 'var(--accent-danger)' },
  { label: '☕ CÍNICO', value: 'CÍNICO', color: '#ffffff' },
  { label: '💊 PACIENTE GRAVE', value: 'PACIENTE GRAVE', color: '#ffcc00' },
];

export function CommentsSection({ postSlug, postCode }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [selectedTag, setSelectedTag] = useState(TAG_OPTIONS[0].value);
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Cargar comentarios
  useEffect(() => {
    let isMounted = true;
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
        const data = await res.json();
        if (isMounted && data.comments) {
          setComments(data.comments);
        }
      } catch (err) {
        console.error('Error al cargar comentarios:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  // Enviar comentario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!content.trim() || content.trim().length < 3) {
      setErrorMsg('Escribe al menos 3 caracteres en tu testimonio.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_slug: postSlug,
          author_name: authorName.trim() || 'Paciente Anónimo',
          author_tag: selectedTag,
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Fallo al publicar testimonio');
      }

      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setContent('');
        setSuccessMsg('Testimonio ingresado al expediente clínico con éxito.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error de conexión.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffSecs = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSecs < 60) return 'Hace unos segundos';
      const diffMins = Math.floor(diffSecs / 60);
      if (diffMins < 60) return `Hace ${diffMins} min`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `Hace ${diffHours} h`;
      const diffDays = Math.floor(diffHours / 24);
      return `Hace ${diffDays} d`;
    } catch {
      return 'Reciente';
    }
  };

  return (
    <section
      style={{
        marginTop: '3.5rem',
        borderTop: '3.5px solid var(--border-color)',
        paddingTop: '2.5rem',
      }}
    >
      {/* Encabezado de Sección */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div
            className="badge-tag toxic"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}
          >
            <MessageSquare size={13} /> BUZÓN DE DESAHOGO PÚBLICO
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#0c0c0c',
              margin: 0,
            }}
          >
            Expediente de Testimonios // {postCode}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#555',
              marginTop: '0.3rem',
            }}
          >
            Comentarios sin filtro ni censura. No necesitas registrarte; solo deja tu catarsis.
          </p>
        </div>

        <div
          style={{
            background: '#0c0c0c',
            color: 'var(--accent-toxic)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 800,
            padding: '0.4rem 0.8rem',
            border: '2px solid #000',
            boxShadow: '3px 3px 0px #000',
          }}
        >
          {comments.length} {comments.length === 1 ? 'REGISTRO' : 'REGISTROS'}
        </div>
      </div>

      {/* Formulario de Comentario */}
      <div
        className="brutal-box"
        style={{
          background: '#ffffff',
          border: 'var(--border-heavy)',
          boxShadow: 'var(--shadow-base)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#000',
            marginBottom: '1rem',
            borderBottom: '1.5px solid #000',
            paddingBottom: '0.5rem',
          }}
        >
          <User size={14} /> DEJA TU TESTIMONIO EN EL EXPEDIENTE
        </div>

        <form onSubmit={handleSubmit}>
          {/* Fila: Alias + Selector de Etiqueta */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  marginBottom: '0.35rem',
                  color: '#222',
                }}
              >
                TU ALIAS O SEUDÓNIMO:
              </label>
              <input
                type="text"
                placeholder="ej. Godín Desencantado, Paciente #404..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={40}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  border: '2px solid #000',
                  background: '#fcfcfc',
                  outline: 'none',
                  boxShadow: '2px 2px 0px #000',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  marginBottom: '0.35rem',
                  color: '#222',
                }}
              >
                ESTADO DE ÁNIMO // DIAGNÓSTICO:
              </label>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => setSelectedTag(tag.value)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.45rem 0.65rem',
                      border: '1.5px solid #000',
                      cursor: 'pointer',
                      background: selectedTag === tag.value ? tag.color : '#ffffff',
                      color: selectedTag === tag.value && tag.value === 'OFENDIDO' ? '#ffffff' : '#000000',
                      boxShadow: selectedTag === tag.value ? '2px 2px 0px #000' : 'none',
                      transform: selectedTag === tag.value ? 'translateY(-1px)' : 'none',
                      transition: 'all 0.1s ease',
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Textarea del Comentario */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                marginBottom: '0.35rem',
                color: '#222',
              }}
            >
              <span>DICTAMEN DEL PACIENTE // TU COMENTARIO:</span>
              <span style={{ color: content.length > 550 ? '#ff3333' : '#777' }}>
                {content.length}/600
              </span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Escribe tu trauma, experiencia similar o reclamo al Dr. Bilis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={600}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                border: '2px solid #000',
                background: '#ffffff',
                outline: 'none',
                boxShadow: '3px 3px 0px #000',
                resize: 'vertical',
                minHeight: '85px',
              }}
            />
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div
              style={{
                background: '#ffebee',
                color: '#c62828',
                border: '1.5px solid #c62828',
                padding: '0.5rem 0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <AlertCircle size={15} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                background: '#f1f8e9',
                color: '#2e7d32',
                border: '1.5px solid #2e7d32',
                padding: '0.5rem 0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <CheckCircle2 size={15} /> {successMsg}
            </div>
          )}

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={submitting}
            className="brutal-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              padding: '0.7rem 1.4rem',
            }}
          >
            <Send size={15} />
            {submitting ? 'INGRESANDO AL EXPEDIENTE...' : 'PUBLICAR EN EL EXPEDIENTE →'}
          </button>
        </form>
      </div>

      {/* Lista de Testimonios */}
      {loading ? (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#777',
            padding: '2rem 0',
            textAlign: 'center',
          }}
        >
          [ CONSULTANDO BASE DE DATOS CLÍNICA... ]
        </div>
      ) : comments.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            border: '2px dashed #000',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0c0c0c', marginBottom: '0.3rem' }}>
            ESTE EXPEDIENTE AÚN ESTÁ VACÍO.
          </p>
          <p style={{ fontSize: '0.78rem', color: '#666' }}>
            Sé el primer paciente en dejar su diagnóstico o desahogo arriba.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {comments.map((c) => (
            <article
              key={c.id}
              style={{
                background: '#ffffff',
                border: 'var(--border-base)',
                boxShadow: 'var(--shadow-sm)',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              {/* Barra superior de cada comentario */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 900,
                      color: '#0c0c0c',
                    }}
                  >
                    {c.author_name}
                  </span>
                  {c.author_tag && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        background:
                          c.author_tag.includes('OFENDIDO')
                            ? 'var(--accent-danger)'
                            : c.author_tag.includes('IDENTIFIQUÉ')
                            ? 'var(--accent-toxic)'
                            : '#f0f0f0',
                        color: c.author_tag.includes('OFENDIDO') ? '#ffffff' : '#000000',
                        padding: '0.15rem 0.45rem',
                        border: '1px solid #000',
                      }}
                    >
                      [{c.author_tag}]
                    </span>
                  )}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#888',
                  }}
                >
                  {formatRelativeTime(c.created_at)}
                </span>
              </div>

              {/* Contenido del comentario */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  lineHeight: 1.55,
                  color: '#222',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {c.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
