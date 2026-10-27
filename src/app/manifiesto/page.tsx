import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Stethoscope, AlertTriangle, ShieldAlert } from 'lucide-react';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata = {
  title: '¿Quién es el Dr. Bilis? // Manifiesto Clínico',
  description: 'Conoce al autor: un cínico desencantado que comenta sobre la sociedad contemporánea con humor negro y cero compasión.',
};

export default function ManifiestoPage() {
  return (
    <div className="container-narrow" style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href="/"
          className="badge-tag"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} /> VOLVER AL INICIO
        </Link>
      </div>

      <div style={{
        background: '#fff',
        border: 'var(--border-heavy)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        marginBottom: '3rem'
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
          padding: '0.3rem 0.75rem',
          border: '1.5px solid #000',
          marginBottom: '1.25rem'
        }}>
          [ EXPEDIENTE PERSONAL // AUTOR DESCONOCIDO ]
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem'
        }}>
          ¿Quién diablos es el <br />
          <span style={{ background: 'var(--accent-danger)', color: '#fff', padding: '0 0.4rem' }}>
            Dr. Bilis?
          </span>
        </h1>

        <div style={{
          fontSize: '1.15rem',
          lineHeight: 1.8,
          color: '#1a1a1a'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            No soy médico cirujano ni tengo bata blanca (las batas se ensucian con facilidad y huelen a hospital público). El título de <strong>"Doctor"</strong> es puramente honorífico y me lo auto-receté después de pasar una década observando la incapacidad colectiva para pensar con un mínimo de honestidad.
          </p>

          <div className="dictamen-box" style={{ margin: '2rem 0' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-danger)' }}>
              POSTULADO PRINCIPAL DEL CONSULTORIO:
            </div>
            <p style={{ fontStyle: 'italic', fontWeight: 700, marginTop: '0.5rem' }}>
              "El 95% del sufrimiento moderno no proviene de la falta de recursos, sino de la cantidad ridícula de mentiras confortables que nos contamos para no admitir lo obvio."
            </p>
          </div>

          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginTop: '2rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #000',
            paddingBottom: '0.4rem'
          }}>
            Reglas del Consultorio
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <li style={{
              background: 'var(--accent-muted)',
              border: '2px solid #000',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}>
              <strong>1. PROHIBIDA LA CONDESCENDENCIA:</strong> Si una idea es estúpida, se dirá que es estúpida. No se usarán eufemismos corporativos como "área de oportunidad" o "punto de vista divergente".
            </li>
            <li style={{
              background: 'var(--accent-muted)',
              border: '2px solid #000',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}>
              <strong>2. NO SE DEVUELVEN DIGNIDADES:</strong> Si lees un artículo y sientes que te describí a la perfección en tus peores hábitos, el problema no es el texto; el problema eres tú.
            </li>
            <li style={{
              background: 'var(--accent-muted)',
              border: '2px solid #000',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}>
              <strong>3. LA META ES EL ALIVIO:</strong> El cinismo bien calibrado no es odio al mundo; es la única defensa sana contra la histeria de la positividad tóxica. Reírte de la farsa es el primer paso para no volverte loco.
            </li>
          </ul>

          <p style={{ marginBottom: '1.5rem' }}>
            Escribo sobre lo que me da la gana: el trabajo en oficinas, la tecnología absurda, las bodas fastuosas, los coaches de finanzas, las redes sociales y la comedia de querer ser especial en un planeta habitado por 8,000 millones de primates confundidos.
          </p>

          <div style={{
            background: 'var(--accent-toxic)',
            border: '2px solid #000',
            boxShadow: '4px 4px 0px #000',
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginTop: '2rem'
          }}>
            ¿TIENES UNA DUDA O QUIERES QUE DESPELLEJE UN TEMA EN PARTICULAR?
            <br />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#333' }}>
              Suscríbete al boletín y responde directamente a cualquier correo. Leo todo, aunque finja que no.
            </span>
          </div>
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}
