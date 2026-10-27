import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dr. Bilis // Diagnóstico Social Sin Anestesia',
    short_name: 'Dr. Bilis',
    description: 'Comentario cínico, directo y despiadado sobre la vida moderna, relaciones y el circo corporativo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2f1eb',
    theme_color: '#0c0c0c',
    lang: 'es-MX',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
