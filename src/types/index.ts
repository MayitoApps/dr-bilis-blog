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
  content: {
    dictamen: string;
    sections: {
      heading: string;
      paragraphs: string[];
      cynicalNote?: string;
    }[];
    veredictoFinal: string;
  };
}

export interface ReactionCounts {
  ofendido: number;
  crudaRealidad: number;
  necesitabaEsto: number;
}
