import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Skull, AlertOctagon, HeartPulse, Activity } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://drbilis.vercel.app'),
  title: 'DR. BILIS // Diagnóstico Social Sin Anestesia',
  description: 'Comentario cínico, directo y despiadado sobre la vida moderna, relaciones, tecnología y el circo corporativo.',
  keywords: ['Dr Bilis', 'Blog cínico', 'Crítica social', 'Humor negro', 'Opinión directa'],
  authors: [{ name: 'Dr. Bilis' }],
  openGraph: {
    title: 'DR. BILIS // Diagnóstico Social Sin Anestesia',
    description: 'La verdad no está aquí para caerte bien. Comentario mordaz y directo sobre la realidad contemporánea.',
    url: 'https://drbilis.vercel.app',
    siteName: 'Dr. Bilis',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DR. BILIS // Diagnóstico Social',
    description: 'La verdad no está aquí para caerte bien.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* Running Ticker Tape */}
        <div className="ticker-wrapper">
          <div className="ticker-content">
            ⚠ AVISO CLÍNICO // EL DR. BILIS NO PIDE DISCULPAS // LECTURA BAJO SU PROPIO RIESGO // CASOS ATENDIDOS: 14,892 // DIAGNÓSTICOS HOSTILES SIN FILTRO // SUSCRÍBETE AL BOLETÍN // LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN // RECUERDA: TODO ES PEOR DE LO QUE PARECE //&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="ticker-content">
            ⚠ AVISO CLÍNICO // EL DR. BILIS NO PIDE DISCULPAS // LECTURA BAJO SU PROPIO RIESGO // CASOS ATENDIDOS: 14,892 // DIAGNÓSTICOS HOSTILES SIN FILTRO // SUSCRÍBETE AL BOLETÍN // LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN // RECUERDA: TODO ES PEOR DE LO QUE PARECE //&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* Site Header */}
        <header className="site-header">
          <div className="header-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartPulse size={14} color="#ff3333" />
              <span>CONSULTORIO ABIERTO // ESTADO: HOSTIL</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>MATRÍCULA: 00-BILIS-94</span>
              <span>VERSIÓN: 2026.1</span>
            </div>
          </div>

          <div className="container-wide">
            <div className="header-main">
              <Link href="/" className="brand-logo">
                <div className="brand-title">
                  DR. BILIS <span className="pill">M.D.</span>
                </div>
                <div className="brand-subtitle">
                  [ DIAGNÓSTICO SOCIAL // COMENTARIO CÍNICO Y DIRECTO ]
                </div>
              </Link>

              <nav style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href="/" className="badge-tag">
                  [ EXPEDIENTES ]
                </Link>
                <Link href="/#newsletter" className="badge-tag toxic">
                  [ RECETA (NEWSLETTER) ]
                </Link>
                <Link href="/manifiesto" className="badge-tag dark">
                  [ EL MÉDICO ]
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ flex: 1, paddingBottom: '4rem' }}>
          {children}
        </main>

        {/* Site Footer */}
        <footer className="site-footer">
          <div className="container-wide">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
              marginBottom: '2.5rem'
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  marginBottom: '0.5rem',
                  color: 'var(--accent-toxic)'
                }}>
                  DR. BILIS.
                </div>
                <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Observador implacable de la ridiculez humana. Escribo porque me sobra criterio y me falta paciencia para tolerar el autoengaño ajeno.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-danger)', marginBottom: '0.75rem' }}>
                  [ AVISO LEGAL CLÍNICO ]
                </div>
                <p style={{ color: '#888', fontSize: '0.78rem', lineHeight: 1.6 }}>
                  Ninguna opinión expresada en este sitio sustituye el sentido común que usted debió adquirir a los 18 años. Si se sintió aludido por alguno de los diagnósticos, felicidades: ha comenzado su rehabilitación.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                  [ NAVEGACIÓN RÁPIDA ]
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  <Link href="/" style={{ color: '#ddd' }}>➔ Todos los expedientes</Link>
                  <Link href="/manifiesto" style={{ color: '#ddd' }}>➔ ¿Quién es el Dr. Bilis?</Link>
                  <Link href="/#newsletter" style={{ color: 'var(--accent-toxic)' }}>➔ Dosis semanal al correo</Link>
                </div>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid #333',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.72rem',
              color: '#666'
            }}>
              <div>
                © 2026 DR. BILIS — TODOS LOS DESACUERDOS RESERVADOS.
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <span className="badge-tag dark" style={{ border: '1px solid #444', fontSize: '0.65rem' }}>
                  HECHO PARA GITHUB + VERCEL
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
