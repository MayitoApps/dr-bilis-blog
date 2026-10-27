'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types';
import { Share2, MessageCircle, Twitter, Facebook, Link2, Check, Instagram } from 'lucide-react';
import { StoryCardModal } from './StoryCardModal';

interface ShareBarProps {
  post: Post;
}

export function ShareBar({ post }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareText = `"${post.punchlineQuote}" — Lee este diagnóstico del Dr. Bilis: ${post.title}`;

  // WhatsApp share url
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\n${currentUrl || ''}`
  )}`;

  // Twitter/X share url
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${post.punchlineQuote}" — ${post.title}`
  )}&url=${encodeURIComponent(currentUrl || '')}&via=DrBilis`;

  // Facebook share url
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl || ''
  )}`;

  // Native share if supported on mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Dr. Bilis: ${post.title}`,
          text: `"${post.punchlineQuote}"`,
          url: currentUrl,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <div className="share-toolbar">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#333' }}>
          DIFUNDIR EL VENENO //
        </span>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
          title="Compartir en WhatsApp"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
          title="Compartir en X"
        >
          <Twitter size={16} />
          X / Twitter
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
          title="Compartir en Facebook"
        >
          <Facebook size={16} />
          Facebook
        </a>

        {/* Instagram Story Generator */}
        <button
          type="button"
          onClick={() => setIsStoryModalOpen(true)}
          className="share-btn story"
          title="Ficha para Instagram Stories"
        >
          <Instagram size={16} />
          Ficha Instagram Story
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="share-btn"
          style={{ background: copied ? 'var(--accent-toxic)' : '#fff' }}
          title="Copiar enlace directo"
        >
          {copied ? <Check size={16} color="#000" /> : <Link2 size={16} />}
          {copied ? '[¡ENLACE COPIADO!]' : 'Copiar Link'}
        </button>

        {/* Mobile Native Share Button */}
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="share-btn"
            style={{ marginLeft: 'auto', background: 'var(--accent-muted)' }}
          >
            <Share2 size={15} />
            Más...
          </button>
        )}
      </div>

      <StoryCardModal
        post={post}
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />
    </>
  );
}
