'use client';

import React, { useRef, useState } from 'react';
import { Post } from '@/types';
import { X, Download, Copy, Check, Sparkles } from 'lucide-react';

interface StoryCardModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryCardModal({ post, isOpen, onClose }: StoryCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyQuote = async () => {
    const textToCopy = `"${post.punchlineQuote}" — Dr. Bilis (${post.code}: ${post.title})`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCard = () => {
    setIsExporting(true);
    // Draw canvas client-side for ultra-crisp Instagram Story export (1080x1920)
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Background
    ctx.fillStyle = '#0c0c0c';
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle Grid pattern
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 1;
    const step = 60;
    for (let x = 0; x < 1080; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1920);
      ctx.stroke();
    }
    for (let y = 0; y < 1920; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // Outer Brutalist Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14;
    ctx.strokeRect(60, 60, 960, 1800);

    // Accent Yellow Corner Tag
    ctx.fillStyle = '#e1ff00';
    ctx.fillRect(90, 90, 360, 64);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 30px monospace';
    ctx.fillText(`FICHA MÉDICA // ${post.code}`, 110, 134);

    // Header info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('CONSULTORIO DEL DR. BILIS', 90, 220);

    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(90, 250);
    ctx.lineTo(990, 250);
    ctx.stroke();

    // Red Danger Box: Category
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(90, 290, 240, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`CATEGORÍA: ${post.category}`, 106, 323);

    // Post Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px sans-serif';
    wrapText(ctx, post.title.toUpperCase(), 90, 420, 900, 68);

    // Big Punchline Quote Box
    ctx.fillStyle = '#18181b';
    ctx.fillRect(90, 720, 900, 680);
    ctx.strokeStyle = '#e1ff00';
    ctx.lineWidth = 8;
    ctx.strokeRect(90, 720, 900, 680);

    // Quote mark
    ctx.fillStyle = '#e1ff00';
    ctx.font = '900 130px serif';
    ctx.fillText('“', 120, 830);

    // Quote text
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 48px sans-serif';
    wrapText(ctx, post.punchlineQuote, 130, 900, 820, 66);

    // Signature stamp
    ctx.fillStyle = '#e1ff00';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('— DR. BILIS', 130, 1340);
    ctx.fillStyle = '#888888';
    ctx.font = '24px monospace';
    ctx.fillText('DIAGNÓSTICO SOCIAL SIN RECETA', 130, 1375);

    // Footer of Story
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('LEE EL ARTÍCULO COMPLETO EN:', 90, 1660);
    ctx.fillStyle = '#e1ff00';
    ctx.font = '900 44px sans-serif';
    ctx.fillText('DRBILIS.COM', 90, 1720);

    ctx.fillStyle = '#666666';
    ctx.font = '24px monospace';
    ctx.fillText('LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN', 90, 1770);

    // Export to download
    const link = document.createElement('a');
    link.download = `dr-bilis-${post.code}-story.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  // Helper text wrap for Canvas
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="brutal-box"
        style={{
          background: '#0c0c0c',
          color: '#ffffff',
          width: '100%',
          maxWidth: '460px',
          padding: '1.5rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div className="badge-tag toxic">
            <Sparkles size={14} /> FICHA PARA INSTAGRAM & HISTORIAS
          </div>
          <button
            onClick={onClose}
            className="brutal-btn-ghost"
            style={{
              padding: '0.35rem',
              border: '1.5px solid #fff',
              background: '#222',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Card Preview */}
        <div
          ref={cardRef}
          style={{
            background: '#121214',
            border: '2px solid #ffffff',
            padding: '1.5rem',
            boxShadow: '4px 4px 0px var(--accent-toxic)',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-toxic)', fontWeight: 800 }}>
              CONSULTORIO DR. BILIS
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888' }}>
              {post.code}
            </span>
          </div>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#fff',
            marginBottom: '1rem',
            borderLeft: '3px solid var(--accent-danger)',
            paddingLeft: '0.75rem'
          }}>
            "{post.punchlineQuote}"
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #333',
            paddingTop: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem'
          }}>
            <div>
              <div style={{ color: '#aaa' }}>TEMA: {post.title.slice(0, 32)}...</div>
              <div style={{ color: 'var(--accent-toxic)', fontWeight: 700, marginTop: '2px' }}>DRBILIS.COM</div>
            </div>
            <div style={{ color: '#ff3333', fontWeight: 800 }}>[SIN FILTRO]</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadCard}
            disabled={isExporting}
            className="brutal-btn"
            style={{ flex: 1, minWidth: '180px' }}
          >
            <Download size={16} />
            {isExporting ? 'GENERANDO...' : 'DESCARGAR PARA STORY (PNG)'}
          </button>

          <button
            onClick={handleCopyQuote}
            className="brutal-btn brutal-btn-ghost"
            style={{ background: '#222', color: '#fff', border: '2px solid #fff' }}
          >
            {copied ? <Check size={16} color="#00ff66" /> : <Copy size={16} />}
            {copied ? '¡COPIADO!' : 'COPIAR TEXTO'}
          </button>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: '#777',
          marginTop: '0.75rem',
          textAlign: 'center'
        }}>
          Listo en proporción 9:16 de alta resolución para subir directo a tus Estados o Historias de Instagram.
        </p>
      </div>
    </div>
  );
}
