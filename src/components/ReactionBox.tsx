'use client';

import React, { useState } from 'react';

interface ReactionBoxProps {
  initialCode: string;
}

export function ReactionBox({ initialCode }: ReactionBoxProps) {
  const [reactions, setReactions] = useState({
    ofendido: 29,
    crudaRealidad: 142,
    meIdentifique: 64,
  });

  const [selected, setSelected] = useState<string | null>(null);

  const handleVote = (type: 'ofendido' | 'crudaRealidad' | 'meIdentifique') => {
    if (selected === type) return;

    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
      ...(selected && selected !== type ? { [selected]: prev[selected as keyof typeof prev] - 1 } : {}),
    }));
    setSelected(type);
  };

  return (
    <div style={{
      background: '#fff',
      border: 'var(--border-base)',
      boxShadow: 'var(--shadow-base)',
      padding: '1.25rem',
      margin: '2.5rem 0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.85rem',
        borderBottom: '1.5px solid #000',
        paddingBottom: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 800
      }}>
        <span>REGISTRO DE REACCIÓN PÚBLICA // {initialCode}</span>
        <span style={{ color: '#888' }}>[VOTA ANÓNIMO]</span>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        marginBottom: '1rem',
        color: '#444'
      }}>
        ¿Cómo te dejó este diagnóstico? Sé honesto, no te juzgaremos (más de lo habitual):
      </p>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleVote('crudaRealidad')}
          className="brutal-btn"
          style={{
            flex: '1 1 180px',
            background: selected === 'crudaRealidad' ? 'var(--accent-toxic)' : '#fff',
            color: '#000',
            fontSize: '0.78rem'
          }}
        >
          💊 CRUDA REALIDAD ({reactions.crudaRealidad})
        </button>

        <button
          onClick={() => handleVote('meIdentifique')}
          className="brutal-btn"
          style={{
            flex: '1 1 180px',
            background: selected === 'meIdentifique' ? 'var(--accent-muted)' : '#fff',
            color: '#000',
            fontSize: '0.78rem'
          }}
        >
          🎯 ME IDENTIFIQUÉ ({reactions.meIdentifique})
        </button>

        <button
          onClick={() => handleVote('ofendido')}
          className="brutal-btn"
          style={{
            flex: '1 1 180px',
            background: selected === 'ofendido' ? 'var(--accent-danger)' : '#fff',
            color: selected === 'ofendido' ? '#fff' : '#000',
            fontSize: '0.78rem'
          }}
        >
          🤬 ESTOY OFENDIDO ({reactions.ofendido})
        </button>
      </div>

      {selected && (
        <div style={{
          marginTop: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent-danger)',
          fontWeight: 700
        }}>
          * Tu voto ha sido archivado en el expediente clínico del Dr. Bilis.
        </div>
      )}
    </div>
  );
}
