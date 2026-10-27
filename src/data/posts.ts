import { Post } from '@/types';

/**
 * ARCHIVO DE EXPEDIENTES CLÍNICOS DEL DR. BILIS
 * Actualmente vacío. Para agregar un nuevo artículo, añade un objeto Post al arreglo.
 */
export const POSTS: Post[] = [];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS;
}
