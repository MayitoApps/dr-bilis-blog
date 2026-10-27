import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Diagnóstico Social Sin Anestesia';
    const code = searchParams.get('code') || 'DX-CLINICAL';
    const tag = searchParams.get('tag') || '#DR_BILIS';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0c0c0c',
            border: '18px solid #ffffff',
            padding: '60px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#e1ff00',
                color: '#000000',
                fontSize: 24,
                fontWeight: 900,
                padding: '8px 18px',
                border: '3px solid #ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              DR. BILIS // {code}
            </div>

            <div
              style={{
                backgroundColor: '#ff3333',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 700,
                padding: '8px 16px',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '30px 0',
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '3px solid #333333',
              paddingTop: '25px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#e1ff00', fontSize: 28, fontWeight: 900 }}>
                DRBILIS.COM
              </span>
              <span style={{ color: '#888888', fontSize: 18, marginTop: '4px' }}>
                LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN
              </span>
            </div>

            <div
              style={{
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 700,
                border: '2px solid #555',
                padding: '6px 14px',
              }}
            >
              [CASO FORENSE]
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
