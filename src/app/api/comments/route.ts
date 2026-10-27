import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Comment } from '@/types';

// Comentarios iniciales de muestra por si aún no han conectado Supabase
const DEFAULT_COMMENTS: Record<string, Comment[]> = {
  'ponte-la-camiseta-explotacion-laboral-sueldo-minimo': [
    {
      id: 'demo-1',
      post_slug: 'ponte-la-camiseta-explotacion-laboral-sueldo-minimo',
      author_name: 'Lic. Godínez Agotado',
      author_tag: 'SÍNDROME DE ESTOCOLMO',
      content: 'Lloré mientras comía mi rebanada de pizza fría en la sala de juntas a las 9:15 PM. Saludos desde mi turno no pagado.',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'demo-2',
      post_slug: 'ponte-la-camiseta-explotacion-laboral-sueldo-minimo',
      author_name: 'Ex-Empleado del Mes',
      author_tag: 'PACIENTE DADO DE ALTA',
      content: 'Renuncié ayer después de leer este diagnóstico. Mi jefe me dijo que "le faltaba lealtad a mi generación". Le respondí que a la nómina le faltaban ceros.',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    }
  ]
};

// GET: Obtener comentarios del post
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Falta el parámetro slug' }, { status: 400 });
  }

  // 1. Si Supabase está conectado, consultar la base de datos real
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', slug)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al consultar Supabase comments:', error);
        return NextResponse.json({ comments: DEFAULT_COMMENTS[slug] || [] });
      }

      return NextResponse.json({ comments: data || [] });
    } catch (err) {
      console.error('Fallo de conexión Supabase:', err);
      return NextResponse.json({ comments: DEFAULT_COMMENTS[slug] || [] });
    }
  }

  // 2. Modo fallback demostrativo
  const fallback = DEFAULT_COMMENTS[slug] || [];
  return NextResponse.json({ comments: fallback, demo: true });
}

// POST: Enviar un nuevo comentario
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { post_slug, author_name, author_tag, content } = body;

    if (!post_slug || !content || content.trim().length < 3) {
      return NextResponse.json(
        { error: 'El testimonio debe contener al menos 3 caracteres.' },
        { status: 400 }
      );
    }

    if (content.length > 600) {
      return NextResponse.json(
        { error: 'El comentario no puede superar los 600 caracteres. Sintetiza tu trauma.' },
        { status: 400 }
      );
    }

    const cleanAuthor = author_name?.trim() || 'Paciente Anónimo';
    const cleanTag = author_tag?.trim() || 'PACIENTE';
    const cleanContent = content.trim();

    // 1. Guardar en Supabase si está disponible
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_slug,
            author_name: cleanAuthor,
            author_tag: cleanTag,
            content: cleanContent,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error al guardar comentario en Supabase:', error);
        return NextResponse.json(
          { error: 'Error al registrar testimonio en la base de datos clínica.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, comment: data });
    }

    // 2. Respuesta en modo local o demo
    const newDemoComment: Comment = {
      id: `local-${Date.now()}`,
      post_slug,
      author_name: cleanAuthor,
      author_tag: cleanTag,
      content: cleanContent,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      comment: newDemoComment,
      notice: 'Comentario recibido en modo demo. Conecta tu Supabase para sincronización global permanente.'
    });
  } catch (err) {
    console.error('Error general en POST /api/comments:', err);
    return NextResponse.json({ error: 'Fallo al procesar el testimonio' }, { status: 500 });
  }
}
