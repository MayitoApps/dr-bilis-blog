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
      <div style={{ width: '100%' }}>
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
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="newsletter-form-group">
              <div className="newsletter-input-wrapper">
                <Mail size={22} />
                <input
                  type="email"
                  required
                  placeholder="ingresa_tu_email_aqui@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="newsletter-input"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="newsletter-submit"
              >
                {status === 'loading' ? 'EXPIDIENDO RECETA...' : 'RECETARME'}
                <ArrowRight size={18} />
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
