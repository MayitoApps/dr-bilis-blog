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

  // Vector Eye Logo with medical cross
  const drawBilisEye = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      strokeColor: string,
      pupilColor: string,
      fillIris?: string
    ) => {
      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = size * 0.12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 1. Horizontal upper brow bar
      const barW = size * 1.55;
      const barH = size * 0.22;
      ctx.fillRect(cx - barW / 2, cy - size * 0.78, barW, barH);

      // 2. Eye outer contour (almond shape)
      ctx.beginPath();
      ctx.moveTo(cx - size, cy);
      ctx.quadraticCurveTo(cx, cy - size * 0.78, cx + size, cy);
      ctx.quadraticCurveTo(cx, cy + size * 0.78, cx - size, cy);
      ctx.closePath();
      ctx.stroke();

      // 3. Iris
      const irisR = size * 0.52;
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      if (fillIris) {
        ctx.fillStyle = fillIris;
        ctx.fill();
      }
      ctx.stroke();

      // 4. Medical cross inside iris
      const crossW = irisR * 0.58;
      const crossThick = irisR * 0.38;
      ctx.fillStyle = pupilColor;
      // Vertical bar
      ctx.fillRect(cx - crossThick / 2, cy - crossW, crossThick, crossW * 2);
      // Horizontal bar
      ctx.fillRect(cx - crossW, cy - crossThick / 2, crossW * 2, crossThick);

      ctx.restore();
    },
    []
  );

  // Hazard / Caution stripes
  const drawCautionTape = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      y: number,
      height: number,
      colorA: string,
      colorB: string,
      stripeW: number = 36
    ) => {
      ctx.save();
      ctx.fillStyle = colorA;
      ctx.fillRect(0, y, 1080, height);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, y, 1080, height);
      ctx.clip();

      ctx.strokeStyle = colorB;
      ctx.lineWidth = stripeW * 0.52;
      for (let x = -height; x < 1080 + height; x += stripeW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + height, y + height);
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = '#0c0c0c';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, y, 1080, height);
      ctx.restore();
    },
    []
  );

  // Barcode simulation
  const drawBarcode = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      color: string
    ) => {
      ctx.save();
      ctx.fillStyle = color;
      const bars = [3, 2, 5, 2, 7, 3, 2, 6, 4, 2, 8, 3, 4, 7, 2, 5, 3, 2, 6, 4, 3, 6, 2, 4];
      let curX = x;
      const total = bars.reduce((a, b) => a + b, 0);
      const scale = w / total;
      for (let i = 0; i < bars.length; i++) {
        const barW = bars[i] * scale;
        if (i % 2 === 0) {
          ctx.fillRect(curX, y, barW, h);
        }
        curX += barW;
      }
      ctx.restore();
    },
    []
  );

  // Helper text wrap for Canvas
  const wrapText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ): number => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY;
    },
    []
  );

  // Render the 1080x1920 canvas story card
  const renderStory = useCallback(
    (canvas: HTMLCanvasElement, activeTheme: TemplateTheme) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1920;

      // ==========================================
      // TEMA 1: AMARILLO TÓXICO // NEO-BRUTALISMO
      // ==========================================
      if (activeTheme === 'toxic') {
        // Fondo amarillo tóxico
        ctx.fillStyle = '#e1ff00';
        ctx.fillRect(0, 0, 1080, 1920);

        // Patrón sutil de puntos / semitonos
        ctx.fillStyle = 'rgba(12, 12, 12, 0.08)';
        for (let x = 30; x < 1080; x += 40) {
          for (let y = 30; y < 1920; y += 40) {
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Cintas de precaución arriba y abajo
        drawCautionTape(ctx, 0, 48, '#e1ff00', '#0c0c0c', 40);
        drawCautionTape(ctx, 1872, 48, '#e1ff00', '#0c0c0c', 40);

        // Marco exterior negro grueso
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 14;
        ctx.strokeRect(40, 70, 1000, 1780);

        // Barra superior de expediente
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(80, 110, 920, 72);
        ctx.fillStyle = '#e1ff00';
        ctx.font = '800 28px "JetBrains Mono", monospace';
        ctx.fillText(`FICHA CLÍNICA // ${post.code}`, 110, 156);

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 22px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('ESTADO: CRÍTICO', 960, 156);
        ctx.textAlign = 'left';

        // Logotipo Dr. Bilis + Título consultorio
        drawBilisEye(ctx, 160, 290, 70, '#0c0c0c', '#e1ff00', '#0c0c0c');

        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 68px "Space Grotesk", sans-serif';
        ctx.fillText('DR. BILIS', 260, 280);

        ctx.font = '700 24px "JetBrains Mono", monospace';
        ctx.fillStyle = '#333333';
        ctx.fillText('DIAGNÓSTICO SOCIAL SIN ANESTESIA', 260, 320);

        // Badge categoría
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(80, 385, 340, 52);
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 4;
        ctx.strokeRect(80, 385, 340, 52);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 24px "JetBrains Mono", monospace';
        ctx.fillText(`CATEGORÍA: ${post.category}`, 105, 420);

        // Tarjeta central principal de la cita (con sombra sólida desplazada)
        const boxX = 80;
        const boxY = 470;
        const boxW = 920;
        const boxH = 920;
        const shadowOffset = 18;

        // Sombra negra sólida
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(boxX + shadowOffset, boxY + shadowOffset, boxW, boxH);

        // Caja blanca
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 8;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Barra superior interna de la tarjeta
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(boxX, boxY, boxW, 64);
        ctx.fillStyle = '#e1ff00';
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillText('DICTAMEN CLÍNICO EMITIDO', boxX + 30, boxY + 42);

        // Código de barras arriba a la derecha de la caja
        drawBarcode(ctx, boxX + boxW - 220, boxY + 16, 180, 32, '#e1ff00');

        // Comillas gigantes de fondo sutil
        ctx.fillStyle = '#f4f4f4';
        ctx.font = '900 260px "Space Grotesk", serif';
        ctx.fillText('“', boxX + 40, boxY + 300);

        // Título del post
        ctx.fillStyle = '#777777';
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillText(`CASO: ${post.title.slice(0, 48).toUpperCase()}...`, boxX + 40, boxY + 130);

        // Cita principal
        const quoteLength = post.punchlineQuote.length;
        let quoteFontSize = 52;
        let quoteLineHeight = 72;
        if (quoteLength > 130) {
          quoteFontSize = 42;
          quoteLineHeight = 58;
        } else if (quoteLength < 70) {
          quoteFontSize = 60;
          quoteLineHeight = 82;
        }

        ctx.fillStyle = '#0c0c0c';
        ctx.font = `900 ${quoteFontSize}px "Space Grotesk", sans-serif`;
        const lastY = wrapText(
          ctx,
          `"${post.punchlineQuote}"`,
          boxX + 40,
          boxY + 230,
          boxW - 80,
          quoteLineHeight
        );

        // Sello angular de tinta roja
        ctx.save();
        ctx.translate(boxX + 60, lastY + 80);
        ctx.rotate(-0.06);
        ctx.strokeStyle = '#ff3333';
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, 360, 60);
        ctx.fillStyle = '#ff3333';
        ctx.font = '900 26px "JetBrains Mono", monospace';
        ctx.fillText('★ REALIDAD CRUDA', 30, 42);
        ctx.restore();

        // Firma en la tarjeta
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 34px "Space Grotesk", sans-serif';
        ctx.fillText('— DR. BILIS', boxX + boxW - 280, boxY + boxH - 60);
        ctx.fillStyle = '#777777';
        ctx.font = '600 20px "JetBrains Mono", monospace';
        ctx.fillText('RECETA IRREVERSIBLE', boxX + boxW - 280, boxY + boxH - 30);

        // Footer / Llamada a la acción
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(80, 1440, 920, 150);
        ctx.fillStyle = '#e1ff00';
        ctx.font = '800 26px "JetBrains Mono", monospace';
        ctx.fillText('LEE EL ARTÍCULO COMPLETO Y MÁS DIAGNÓSTICOS EN:', 120, 1495);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 52px "Space Grotesk", sans-serif';
        ctx.fillText('DRBILIS.COM', 120, 1555);

        // Tagline final abajo
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '800 28px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('"LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN"', 540, 1680);

        ctx.font = '700 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#555555';
        ctx.fillText('INSTAGRAM & WEB: @DRBILIS // DRBILIS.COM', 540, 1725);
        ctx.textAlign = 'left';
      }

      // ==========================================
      // TEMA 2: CARBÓN CLÍNICO // MODO OSCURO
      // ==========================================
      else if (activeTheme === 'dark') {
        // Fondo negro profundo
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(0, 0, 1080, 1920);

        // Cuadrícula sutil de laboratorio
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < 1080; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 1920);
          ctx.stroke();
        }
        for (let y = 0; y < 1920; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1080, y);
          ctx.stroke();
        }

        // Cintas de precaución arriba y abajo
        drawCautionTape(ctx, 0, 48, '#e1ff00', '#0c0c0c', 36);
        drawCautionTape(ctx, 1872, 48, '#e1ff00', '#0c0c0c', 36);

        // Marco neón blanco exterior
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 10;
        ctx.strokeRect(40, 70, 1000, 1780);

        // Barra superior
        ctx.fillStyle = '#e1ff00';
        ctx.fillRect(80, 110, 420, 60);
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 26px "JetBrains Mono", monospace';
        ctx.fillText(`EXPEDIENTE // ${post.code}`, 105, 150);

        ctx.fillStyle = '#ff3333';
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('● ACCESO RESTRINGIDO', 960, 150);
        ctx.textAlign = 'left';

        // Logo
        drawBilisEye(ctx, 160, 275, 68, '#e1ff00', '#0c0c0c', '#e1ff00');

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 68px "Space Grotesk", sans-serif';
        ctx.fillText('DR. BILIS', 260, 270);

        ctx.font = '700 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('DIAGNÓSTICO SOCIAL // ZERO COMPASIÓN', 260, 310);

        // Caja central
        const boxX = 80;
        const boxY = 380;
        const boxW = 920;
        const boxH = 980;

        // Sombra amarilla tóxica
        ctx.fillStyle = '#e1ff00';
        ctx.fillRect(boxX + 16, boxY + 16, boxW, boxH);

        // Caja carbón
        ctx.fillStyle = '#141416';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Decoración superior
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(boxX, boxY, 260, 52);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px "JetBrains Mono", monospace';
        ctx.fillText(`[ ${post.category} ]`, boxX + 24, boxY + 36);

        drawBarcode(ctx, boxX + boxW - 200, boxY + 14, 160, 30, '#ffffff');

        // Comillas de impacto
        ctx.fillStyle = '#e1ff00';
        ctx.font = '900 120px "Space Grotesk", serif';
        ctx.fillText('“', boxX + 40, boxY + 190);

        // Texto de la cita
        const quoteLen = post.punchlineQuote.length;
        const qSize = quoteLen > 130 ? 44 : quoteLen < 70 ? 58 : 50;
        const qLine = quoteLen > 130 ? 60 : quoteLen < 70 ? 78 : 68;

        ctx.fillStyle = '#ffffff';
        ctx.font = `900 ${qSize}px "Space Grotesk", sans-serif`;
        const endY = wrapText(
          ctx,
          post.punchlineQuote,
          boxX + 40,
          boxY + 280,
          boxW - 80,
          qLine
        );

        // Línea divisoria
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(boxX + 40, boxY + boxH - 140);
        ctx.lineTo(boxX + boxW - 40, boxY + boxH - 140);
        ctx.stroke();

        ctx.fillStyle = '#e1ff00';
        ctx.font = '900 36px "Space Grotesk", sans-serif';
        ctx.fillText('— DR. BILIS', boxX + 40, boxY + boxH - 65);

        ctx.fillStyle = '#888888';
        ctx.font = '600 22px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('DOSIS DE REALIDAD SEMANAL', boxX + boxW - 40, boxY + boxH - 65);
        ctx.textAlign = 'left';

        // Footer
        ctx.fillStyle = '#1c1c1f';
        ctx.fillRect(80, 1420, 920, 160);
        ctx.strokeStyle = '#e1ff00';
        ctx.lineWidth = 4;
        ctx.strokeRect(80, 1420, 920, 160);

        ctx.fillStyle = '#888888';
        ctx.font = '700 24px "JetBrains Mono", monospace';
        ctx.fillText('ENCUENTRA LA VERDAD EN:', 120, 1475);

        ctx.fillStyle = '#e1ff00';
        ctx.font = '900 58px "Space Grotesk", sans-serif';
        ctx.fillText('DRBILIS.COM', 120, 1545);

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 26px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('"LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN"', 540, 1675);

        ctx.font = '600 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#666666';
        ctx.fillText('COMPARTIR ES VOLUNTARIO. OFENDERSE ES INEVITABLE.', 540, 1720);
        ctx.textAlign = 'left';
      }

      // ==========================================
      // TEMA 3: RECETA MÉDICA // PAPEL HUESO
      // ==========================================
      else if (activeTheme === 'paper') {
        // Fondo periódico hueso
        ctx.fillStyle = '#f2f1eb';
        ctx.fillRect(0, 0, 1080, 1920);

        // Cuadrícula médica sutil
        ctx.strokeStyle = '#e3e1d5';
        ctx.lineWidth = 1;
        for (let x = 0; x < 1080; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 1920);
          ctx.stroke();
        }
        for (let y = 0; y < 1920; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1080, y);
          ctx.stroke();
        }

        // Marco doble hospitalario
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 8;
        ctx.strokeRect(40, 50, 1000, 1820);
        ctx.lineWidth = 2;
        ctx.strokeRect(55, 65, 970, 1790);

        // Encabezado de receta médica
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 36px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('HOSPITAL EDITORIAL SOCIAL // DR. BILIS', 540, 130);

        ctx.font = '700 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#555555';
        ctx.fillText(`RECETARIO OFICIAL • EXP: ${post.code} • DEPARTAMENTO DE REALISMO CRÍTICO`, 540, 170);
        ctx.textAlign = 'left';

        // Línea divisoria
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, 210);
        ctx.lineTo(1000, 210);
        ctx.stroke();

        // Ojo Dr. Bilis a la izquierda
        drawBilisEye(ctx, 160, 310, 65, '#0c0c0c', '#ffffff', '#0c0c0c');

        ctx.fillStyle = '#0c0c0c';
        ctx.font = '900 56px "Space Grotesk", sans-serif';
        ctx.fillText('DR. BILIS', 260, 305);

        ctx.font = '700 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#444444';
        ctx.fillText(`CASO: ${post.title.slice(0, 40).toUpperCase()}...`, 260, 345);

        // Tarjeta estilo recetario médico (Rx)
        const boxX = 80;
        const boxY = 410;
        const boxW = 920;
        const boxH = 960;

        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(boxX + 16, boxY + 16, boxW, boxH);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#0c0c0c';
        ctx.lineWidth = 6;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Símbolo Rx médico clásico grande
        ctx.fillStyle = '#ff3333';
        ctx.font = '900 110px "Space Grotesk", serif';
        ctx.fillText('℞', boxX + 40, boxY + 130);

        ctx.fillStyle = '#0c0c0c';
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillText('DIAGNÓSTICO DEFINITIVO:', boxX + 160, boxY + 95);

        ctx.font = '600 18px "JetBrains Mono", monospace';
        ctx.fillStyle = '#666666';
        ctx.fillText(`PACIENTE: SOCIEDAD MODERNA // CATEGORÍA: ${post.category}`, boxX + 160, boxY + 130);

        // Cita
        const qLenP = post.punchlineQuote.length;
        const qSizeP = qLenP > 130 ? 42 : qLenP < 70 ? 56 : 48;
        const qLineP = qLenP > 130 ? 58 : qLenP < 70 ? 76 : 66;

        ctx.fillStyle = '#0c0c0c';
        ctx.font = `900 ${qSizeP}px "Space Grotesk", sans-serif`;
        const lastY = wrapText(
          ctx,
          `"${post.punchlineQuote}"`,
          boxX + 50,
          boxY + 270,
          boxW - 100,
          qLineP
        );

        // Sello circular en tinta roja
        ctx.save();
        ctx.translate(boxX + boxW - 200, boxY + boxH - 240);
        ctx.rotate(-0.1);
        ctx.strokeStyle = '#ff3333';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 85, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ff3333';
        ctx.font = '900 18px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SIN ANESTESIA', 0, -20);
        ctx.fillText('★ DR. BILIS ★', 0, 10);
        ctx.fillText('NO TIENE CURA', 0, 40);
        ctx.restore();

        // Firma del doctor
        ctx.fillStyle = '#0c0c0c';
        ctx.font = '800 28px "Space Grotesk", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Firma Médica: Dr. Bilis', boxX + 50, boxY + boxH - 70);

        ctx.font = '600 18px "JetBrains Mono", monospace';
        ctx.fillStyle = '#777777';
        ctx.fillText('Cédula: 00-BILIS-CRÍTICO // RECETA VIGENTE', boxX + 50, boxY + boxH - 35);

        // Bloque inferior
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(80, 1440, 920, 160);

        ctx.fillStyle = '#e1ff00';
        ctx.font = '800 24px "JetBrains Mono", monospace';
        ctx.fillText('CONSULTORIO DISPONIBLE 24/7 EN LÍNEA:', 120, 1500);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 56px "Space Grotesk", sans-serif';
        ctx.fillText('DRBILIS.COM', 120, 1565);

        ctx.fillStyle = '#0c0c0c';
        ctx.font = '800 28px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('"LA VERDAD NO ESTÁ AQUÍ PARA CAERTE BIEN"', 540, 1680);

        ctx.font = '700 20px "JetBrains Mono", monospace';
        ctx.fillStyle = '#666666';
        ctx.fillText('HISTORIAS // ESTADOS // DRBILIS.COM', 540, 1720);
        ctx.textAlign = 'left';
      }
    },
    [post, drawBilisEye, drawCautionTape, drawBarcode, wrapText]
  );

  // Redraw when modal opens or theme changes
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
    const textToCopy = `"${post.punchlineQuote}" — Dr. Bilis (https://drbilis.com/post/${post.slug})`;
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
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
          <div className="badge-tag toxic" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
            <Sparkles size={14} /> GENERADOR DE HISTORIAS INSTAGRAM (9:16)
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
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Theme Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.4rem',
          marginBottom: '0.9rem'
        }}>
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
              transition: 'all 0.15s ease'
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
              transition: 'all 0.15s ease'
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
              color: '#0c0c0c',
              border: '2px solid #ffffff',
              padding: '0.45rem 0.2rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.72rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={13} /> RECETA
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
            marginBottom: '0.9rem'
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
              display: 'block'
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
              padding: '0.65rem 1rem'
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
              padding: '0.65rem 0.9rem'
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
            textAlign: 'center'
          }}
        >
          Formato 9:16 de alta resolución (1080×1920) listo para historias de Instagram, Facebook y estados de WhatsApp.
        </p>
      </div>
    </div>
  );
}
