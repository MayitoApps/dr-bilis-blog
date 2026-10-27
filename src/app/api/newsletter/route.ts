import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Ingresa un correo electrónico válido si pretendes que te mandemos algo.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Modo de prueba / Local sin API Key configurada todavía
      console.log(`[Dr. Bilis Newsletter] Nuevo paciente registrado (Modo Demo): ${email}`);
      return NextResponse.json({
        success: true,
        message: 'Prescripción aceptada. En cuanto actives tu RESEND_API_KEY en Vercel, recibirás el veneno en tu bandeja.',
        demo: true
      });
    }

    const resend = new Resend(apiKey);

    // Enviar correo de bienvenida con Resend
    const { data, error } = await resend.emails.send({
      from: 'Dr. Bilis <consultorio@resend.dev>', // Cambiable por tu dominio verificado
      to: [email],
      subject: '[RECETA #001] Bienvenido al consultorio del Dr. Bilis',
      html: `
        <div style="background-color: #f2f1eb; font-family: monospace; padding: 30px; color: #0c0c0c;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 3px solid #0c0c0c; padding: 25px; box-shadow: 6px 6px 0px #0c0c0c;">
            <div style="background: #e1ff00; border: 2px solid #0c0c0c; padding: 6px 12px; font-weight: bold; display: inline-block; margin-bottom: 20px;">
              FICHA CLÍNICA // CONFIDENCIAL
            </div>
            <h1 style="font-family: sans-serif; font-size: 26px; margin: 0 0 15px 0; text-transform: uppercase;">
              Has sido ingresado al expediente.
            </h1>
            <p style="font-size: 15px; line-height: 1.6;">
              No sé qué esperabas encontrar aquí. No regalamos libros de motivación, no te vamos a decir que "todo pasa por algo", ni te venderemos cursos para manifestar dinero en pijamas.
            </p>
            <p style="font-size: 15px; line-height: 1.6;">
              Cada semana recibirás una dosis de realidad cruda, diagnósticos de la sociedad moderna y opiniones sin filtro. Si te ofendes, hay un botón de desuscripción al final. A nadie le importará si te vas.
            </p>
            <div style="border-top: 2px dashed #0c0c0c; margin-top: 25px; padding-top: 15px; font-size: 12px; color: #666;">
              — Dr. Bilis // <a href="https://drbilis.vercel.app" style="color: #0c0c0c; font-weight: bold;">drbilis.com</a><br/>
              <em>La verdad no está aquí para caerte bien.</em>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error enviando con Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Prescripción médica confirmada. Revisa tu bandeja de entrada.',
      data
    });
  } catch (err: any) {
    console.error('Error en newsletter API:', err);
    return NextResponse.json(
      { error: 'Error del servidor al procesar la receta.' },
      { status: 500 }
    );
  }
}
