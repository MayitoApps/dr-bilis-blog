'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Post } from '@/types';
import { X, Download, Copy, Check, Sparkles, Zap, Moon, FileText } from 'lucide-react';

interface StoryCardModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

type TemplateTheme = 'toxic' | 'dark' | 'paper';

export function StoryCardModal({ post, isOpen, onClose }: StoryCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [theme, setTheme] = useState<TemplateTheme>('toxic');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper function to split text into wrapped lines for Canvas
  const getWrappedLines = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = ctx.measureText(testLine).width;
        if (width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      return lines;
    },
    []
  );

  // Render the minimalist 1080x1920 story card
  const renderStory = useCallback(
    (canvas: HTMLCanvasElement, activeTheme: TemplateTheme) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1920;

      // Clean the quote so it doesn't duplicate quotation marks
      const rawQuote = (post.punchlineQuote || post.summary || '').trim();
      const cleanQuote = rawQuote.replace(/^["“]|["”]$/g, '').trim();
      const quoteText = `“${cleanQuote}”`;

      // Dynamic sizing based on quote length
      const quoteLength = cleanQuote.length;
      let fontSize = 54;
      let lineHeight = 78;

      if (quoteLength < 75) {
        fontSize = 64;
        lineHeight = 92;
      } else if (quoteLength < 125) {
        fontSize = 54;
        lineHeight = 78;
      } else if (quoteLength < 180) {
        fontSize = 46;
        lineHeight = 68;
      } else {
        fontSize = 40;
        lineHeight = 60;
      }

      ctx.save();

      // ==========================================
      // TEMA 1: TÓXICO (Amarillo neobrutalista)
      // ==========================================
      if (activeTheme === 'toxic') {
        // Fondo amarillo tóxico característico
        ctx.fillStyle = '#e1ff00';
        ctx.fillRect(0, 0, 1080, 1920);

        // Marco exterior brutalista negro
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 14;
        ctx.strokeRect(52, 52, 976, 1816);

        // Esquinas decorativas sutiles
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(45, 45, 32, 32);
        ctx.fillRect(1003, 45, 32, 32);
        ctx.fillRect(45, 1843, 32, 32);
        ctx.fillRect(1003, 1843, 32, 32);

        // Header minimalista: DR. BILIS
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 52px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DR. BILIS', 540, 360);

        // Línea divisoria sutil bajo el nombre
        ctx.beginPath();
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 4;
        ctx.moveTo(480, 410);
        ctx.lineTo(600, 410);
        ctx.stroke();

        // Frase central del post
        ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
        const lines = getWrappedLines(ctx, quoteText, 840);
        const totalHeight = lines.length * lineHeight;
        let currentY = 960 - totalHeight / 2 + lineHeight / 2;

        ctx.fillStyle = '#0c0c0c';
        lines.forEach((line) => {
          ctx.fillText(line, 540, currentY);
          currentY += lineHeight;
        });

        // Footer minimalista
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#222222';
        ctx.fillText('DRBILIS.COM', 540, 1580);
      }

      // ==========================================
      // TEMA 2: CARBÓN (Modo oscuro minimalista)
      // ==========================================
      else if (activeTheme === 'dark') {
        // Fondo negro carbón mate
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(0, 0, 1080, 1920);

        // Marco exterior brutalista blanco
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 12;
        ctx.strokeRect(52, 52, 976, 1816);

        // Esquinas blancas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(46, 46, 28, 28);
        ctx.fillRect(1006, 46, 28, 28);
        ctx.fillRect(46, 1846, 28, 28);
        ctx.fillRect(1006, 1846, 28, 28);

        // Header minimalista: DR. BILIS con acento amarillo tóxico
        ctx.fillStyle = '#e1ff00';
        ctx.font = '900 52px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DR. BILIS', 540, 360);

        // Línea divisoria bajo el nombre
        ctx.beginPath();
        ctx.strokeStyle = '#e1ff00';
        ctx.lineWidth = 4;
        ctx.moveTo(480, 410);
        ctx.lineTo(600, 410);
        ctx.stroke();

        // Frase central del post
        ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
        const lines = getWrappedLines(ctx, quoteText, 840);
        const totalHeight = lines.length * lineHeight;
        let currentY = 960 - totalHeight / 2 + lineHeight / 2;

        ctx.fillStyle = '#ffffff';
        lines.forEach((line) => {
          ctx.fillText(line, 540, currentY);
          currentY += lineHeight;
        });

        // Footer minimalista
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#777777';
        ctx.fillText('DRBILIS.COM', 540, 1580);
      }

      // ==========================================
      // TEMA 3: RECETA / PAPEL (Hueso editorial)
      // ==========================================
      else if (activeTheme === 'paper') {
        // Fondo papel hueso
        ctx.fillStyle = '#f2f1eb';
        ctx.fillRect(0, 0, 1080, 1920);

        // Marco exterior doble de estilo editorial
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 8;
        ctx.strokeRect(52, 52, 976, 1816);

        ctx.lineWidth = 2;
        ctx.strokeRect(68, 68, 944, 1784);

        // Header minimalista: DR. BILIS
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 50px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DR. BILIS', 540, 360);

        // Línea divisoria
        ctx.beginPath();
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 3;
        ctx.moveTo(480, 410);
        ctx.lineTo(600, 410);
        ctx.stroke();

        // Frase central del post en tinta negra profunda
        ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
        const lines = getWrappedLines(ctx, quoteText, 840);
        const totalHeight = lines.length * lineHeight;
        let currentY = 960 - totalHeight / 2 + lineHeight / 2;

        ctx.fillStyle = '#0c0c0c';
        lines.forEach((line) => {
          ctx.fillText(line, 540, currentY);
          currentY += lineHeight;
        });

        // Footer minimalista
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#666666';
        ctx.fillText('DRBILIS.COM', 540, 1580);
      }

      ctx.restore();
    },
    [post, getWrappedLines]
  );

  // Redraw when modal opens, font is loaded, or theme changes
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (document.fonts) {
      document.fonts.ready.then(() => {
        renderStory(canvas, theme);
      });
    } else {
      renderStory(canvas, theme);
    }
  }, [isOpen, theme, renderStory]);

  const handleCopyQuote = async () => {
    const rawQuote = (post.punchlineQuote || post.summary || '').trim();
    const cleanQuote = rawQuote.replace(/^["“]|["”]$/g, '').trim();
    const textToCopy = `“${cleanQuote}” — Dr. Bilis (https://drbilis.com/post/${post.slug})`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    try {
      const link = document.createElement('a');
      link.download = `dr-bilis-${post.code}-${theme}-story.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="brutal-box"
        style={{
          background: '#0c0c0c',
          color: '#ffffff',
          width: '100%',
          maxWidth: '540px',
          padding: '1.25rem',
          position: 'relative',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.9rem',
          }}
        >
          <div
            className="badge-tag toxic"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
            }}
          >
            <Sparkles size={14} /> FICHA HISTORIA INSTAGRAM (9:16)
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="brutal-btn-ghost"
            style={{
              padding: '0.35rem',
              border: '1.5px solid #fff',
              background: '#222',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Theme Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.4rem',
            marginBottom: '0.9rem',
          }}
        >
          <button
            type="button"
            onClick={() => setTheme('toxic')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              background: theme === 'toxic' ? 'var(--accent-toxic)' : '#1a1a1a',
              color: theme === 'toxic' ? '#0c0c0c' : '#ffffff',
              border: '2px solid #ffffff',
              padding: '0.45rem 0.2rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.72rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Zap size={13} /> TÓXICO
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              background: theme === 'dark' ? '#ffffff' : '#1a1a1a',
              color: theme === 'dark' ? '#0c0c0c' : '#ffffff',
              border: '2px solid #ffffff',
              padding: '0.45rem 0.2rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.72rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Moon size={13} /> CARBÓN
          </button>

          <button
            type="button"
            onClick={() => setTheme('paper')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              background: theme === 'paper' ? '#f2f1eb' : '#1a1a1a',
              color: theme === 'paper' ? '#0c0c0c' : '#ffffff',
              border: '2px solid #ffffff',
              padding: '0.45rem 0.2rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.72rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileText size={13} /> PAPEL
          </button>
        </div>

        {/* Live 9:16 Canvas Preview */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            background: '#141416',
            border: '2px solid #333',
            padding: '0.75rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.9rem',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              maxWidth: '240px',
              height: 'auto',
              aspectRatio: '9 / 16',
              border: '3px solid #000',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              display: 'block',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadCard}
            disabled={isExporting}
            className="brutal-btn"
            style={{
              flex: '1 1 200px',
              fontSize: '0.82rem',
              padding: '0.65rem 1rem',
            }}
          >
            <Download size={16} />
            {isExporting ? 'GENERANDO ARCHIVO...' : 'DESCARGAR HISTORIA (1080x1920 PNG)'}
          </button>

          <button
            onClick={handleCopyQuote}
            className="brutal-btn brutal-btn-ghost"
            style={{
              background: '#222',
              color: '#fff',
              border: '2px solid #fff',
              fontSize: '0.82rem',
              padding: '0.65rem 0.9rem',
            }}
          >
            {copied ? <Check size={16} color="#00ff66" /> : <Copy size={16} />}
            {copied ? '¡COPIADO!' : 'COPIAR CITA'}
          </button>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#888',
            marginTop: '0.6rem',
            textAlign: 'center',
          }}
        >
          Diseño minimalista de alta resolución (1080×1920) optimizado para historias de Instagram, Facebook y estados de WhatsApp.
        </p>
      </div>
    </div>
  );
}
