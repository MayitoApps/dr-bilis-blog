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
      console.log(`[Dr. Bilis Newsletter] Nuevo paciente registrado (Modo Demo): ${email}`);
      return NextResponse.json({
        success: true,
        message: 'Prescripción aceptada. En cuanto actives tu RESEND_API_KEY en Vercel, recibirás el veneno en tu bandeja.',
        demo: true
      });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Dr. Bilis <recetas@drbilis.com>';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drbilis.com';

    // Enviar correo de bienvenida con Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'Tu primera dosis de realidad sin filtro — Dr. Bilis',
      html: `
        <div style="background-color: #f2f1eb; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px 15px; color: #0c0c0c;">
          <!-- Preheader invisible para vista previa en bandeja de entrada -->
          <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
            No esperes libros de autoayuda ni palmaditas en la espalda. Solo verdades sin anestesia.
          </div>
          
          <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 3px solid #0c0c0c; box-shadow: 6px 6px 0px #0c0c0c; overflow: hidden;">
            <!-- Barra superior estilo expediente -->
            <div style="background: #0c0c0c; color: #e1ff00; padding: 10px 20px; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 1px;">
              DR. BILIS // CONSULTORIO EDITORIAL // FICHA CONFIDENCIAL
            </div>

            <!-- Contenido -->
            <div style="padding: 30px 25px;">
              <!-- Cabecera con Foto de Perfil / Logotipo -->
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 22px; border-bottom: 2px dashed #0c0c0c; padding-bottom: 18px;">
                <tr>
                  <td style="width: 64px; vertical-align: middle;">
                    <img 
                      src="${siteUrl}/drbilis-logo.jpg" 
                      alt="Dr. Bilis" 
                      width="58" 
                      height="58" 
                      style="display: block; width: 58px; height: 58px; border: 2.5px solid #0c0c0c; box-shadow: 3px 3px 0px #0c0c0c; background-color: #e1ff00;" 
                    />
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 19px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; color: #0c0c0c; line-height: 1.1;">
                      DR. BILIS
                    </div>
                    <div style="font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; color: #555555; margin-top: 4px; letter-spacing: 0.5px;">
                      CONSULTORIO // DIAGNÓSTICO SOCIAL
                    </div>
                  </td>
                  <td style="vertical-align: middle; text-align: right;">
                    <div style="background: #e1ff00; border: 2px solid #0c0c0c; padding: 4px 8px; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; display: inline-block;">
                      PACIENTE #094
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background: #ff3333; color: #ffffff; border: 2px solid #0c0c0c; padding: 4px 10px; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; display: inline-block; margin-bottom: 18px;">
                ESTADO: PACIENTE REGISTRADO
              </div>

              <h1 style="font-size: 24px; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0; text-transform: uppercase; color: #0c0c0c; letter-spacing: -0.5px;">
                Has sido ingresado al expediente.
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #222222; margin: 0 0 16px 0;">
                No sé qué esperabas encontrar aquí. No regalamos libros de motivación barata, no te vamos a decir que <em>"todo pasa por algo"</em>, ni te venderemos cursos para manifestar riqueza en pijamas.
              </p>

              <p style="font-size: 15px; line-height: 1.6; color: #222222; margin: 0 0 24px 0;">
                Cada semana recibirás en tu correo una dosis de realidad cruda: diagnósticos de la sociedad moderna, disección del absurdo cotidiano y opiniones sin filtro. Si te ofendes, hay un enlace de desuscripción al final. A nadie le importará si te vas.
              </p>

              <div style="margin: 25px 0;">
                <a href="${siteUrl}" style="background: #0c0c0c; color: #ffffff; text-decoration: none; font-family: 'Courier New', monospace; font-size: 13px; font-weight: bold; padding: 12px 20px; display: inline-block; border: 2px solid #0c0c0c; text-transform: uppercase; letter-spacing: 0.5px;">
                  Entrar al Blog del Dr. Bilis →
                </a>
              </div>

              <div style="border-top: 2px dashed #0c0c0c; margin-top: 30px; padding-top: 18px; font-family: 'Courier New', monospace; font-size: 12px; color: #555555; line-height: 1.5;">
                <strong style="color: #0c0c0c;">— Dr. Bilis</strong><br/>
                <em>"La verdad no está aquí para caerte bien."</em><br/>
                <a href="${siteUrl}" style="color: #0c0c0c; text-decoration: underline;">drbilis.com</a>
              </div>
            </div>
          </div>
        </div>
      `
    });


    if (error) {
      console.warn('Aviso de Resend al enviar email:', error);
      // Si estamos en modo de prueba de Resend (que solo permite enviar a la cuenta del dueño hasta verificar dominio),
      // aún así confirmamos la suscripción al usuario para una experiencia impecable.
      return NextResponse.json({
        success: true,
        message: 'Prescripción médica confirmada. Revisa tu bandeja de entrada.',
        notice: error.message
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Prescripción médica confirmada. Revisa tu bandeja de entrada.',
      data
    });
  } catch (err: any) {
    console.error('Error en newsletter API:', err);
    return NextResponse.json(
      { error: err?.message || 'Error del servidor al procesar la receta.' },
      { status: 500 }
    );
  }
}
