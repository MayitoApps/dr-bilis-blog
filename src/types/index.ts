export interface Post {
  slug: string;
  code: string; // e.g. "DX-081"
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: 'CULTURA' | 'TRABAJO' | 'TECH' | 'RELACIONES' | 'AUTOAYUDA';
  tag: string;
  summary: string;
  punchlineQuote: string;
  coverImage?: string;
  content: {
    dictamen: string;
    sections: {
      heading: string;
      paragraphs: string[];
      cynicalNote?: string;
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
    }[];
    veredictoFinal: string;
  };
}

export interface ReactionCounts {
  ofendido: number;
  crudaRealidad: number;
  necesitabaEsto: number;
}

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  author_tag?: string;
  content: string;
  created_at: string;
}
