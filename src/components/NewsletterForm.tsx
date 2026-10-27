'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Prescripción aceptada con éxito.');
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Algo salió mal. Intenta de nuevo.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Error al contactar con el consultorio.');
    }
  };

  return (
    <div className="newsletter-banner">
      <div style={{ maxWidth: '640px' }}>
        <div className="badge-tag toxic" style={{ marginBottom: '1rem' }}>
          [ LA RECETA SEMANAL // BOLETÍN SIN CENSURA ]
        </div>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          marginBottom: '0.85rem',
          lineHeight: 1.1
        }}>
          Recibe tu dosis de bilis directo al correo
        </h2>

        <p style={{
          color: '#b0b0b0',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          lineHeight: 1.6,
          marginBottom: '1.75rem'
        }}>
          Cero consejos de autoayuda, cero positividad tóxica, cero promesas de éxito. Solo análisis mordaz de la vida moderna una vez por semana.
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'var(--accent-toxic)',
            color: '#000',
            border: '2px solid #fff',
            padding: '1rem 1.25rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <CheckCircle2 size={20} />
            <span>{feedbackMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{
                position: 'relative',
                flex: '1 1 280px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', color: '#666' }} />
                <input
                  type="email"
                  required
                  placeholder="ingresa_tu_email_aqui@algo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.8rem',
                    background: '#1a1a1c',
                    color: '#ffffff',
                    border: '2px solid #444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    borderRadius: 0
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="brutal-btn"
                style={{ padding: '0.85rem 1.5rem', whiteSpace: 'nowrap' }}
              >
                {status === 'loading' ? 'EXPIDIENDO RECETA...' : 'RECETARME'}
                <ArrowRight size={16} />
              </button>
            </div>

            {status === 'error' && (
              <div style={{
                color: 'var(--accent-danger)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '0.3rem'
              }}>
                <AlertCircle size={15} />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#71717a',
              marginTop: '0.5rem'
            }}>
              * Desuscripción con 1 solo clic en cualquier momento. No nos importa si te vas.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
