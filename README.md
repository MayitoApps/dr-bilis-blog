# 🩺 DR. BILIS — CONSULTORIO CLÍNICO // BLOG NEO-BRUTALISTA

> **"La verdad no está aquí para caerte bien."**  
> Blog editorial, cínico, mordaz y directo sobre la sociedad moderna, la cultura laboral, la autoayuda vacía y los delirios tecnológicos.

---

## ⚡ Estética y Filosofía de Diseño
* **Estilo:** Neo-Brutalismo Editorial (*Swiss Punk* minimalista).
* **Tipografía:** *Space Grotesk* para titulares demoledores + *JetBrains Mono* para códigos clínicos y etiquetas de sistema + *Plus Jakarta Sans* para una lectura de alta legibilidad sin fatiga.
* **Paleta:** Hueso periódico (`#f2f1eb`), tinta negra carbón (`#0c0c0c`), acentos en amarillo tóxico (`#e1ff00`) y rojo alerta (`#ff3333`).
* **Micro-interacciones:** Botones con sombra sólida proyectada (`box-shadow`), ticker marquee de advertencias médicas y tarjetas con estampado de código de diagnóstico `[DX-094]`.

---

## 🚀 Características Principales

### 1. Difusión en Redes Sociales (Viralidad Cínica)
* **WhatsApp:** Botón directo con mensaje y cita formateada para enviar con 1 solo toque.
* **X / Twitter & Facebook:** Compartir directo con mención y enlaces codificados.
* **Ficha para Instagram Stories:** Generador integrado en el navegador que convierte cualquier cita del artículo en una **imagen 9:16 en alta resolución (1080x1920)** con sello de diagnóstico del Dr. Bilis, lista para descargar y subir a historias o estados.
* **Previsualización Dinámica (Open Graph / Cards):** Motor en tiempo real (`/api/og`) que genera tarjetas oscuras de impacto cuando pegas el enlace en WhatsApp, iMessage, Twitter o Facebook.

### 2. Newsletter Integrado con Resend (Opción B)
* Formulario interactivo con feedback visual de receta clínica.
* Ruta `/api/newsletter` lista para enviar correos usando **Resend**.
* Correo de bienvenida con diseño Neo-Brutalista personalizado.
* Funciona en modo demo localmente si aún no has agregado tu `RESEND_API_KEY`.

### 3. Votación de Reacción de Lectores
* Registro anónimo por artículo:
  * `💊 CRUDA REALIDAD`
  * `🎯 ME IDENTIFIQUÉ`
  * `🤬 ESTOY OFENDIDO`

---

## 🛠️ Cómo Probar Localmente

1. En tu terminal ejecuta:
   ```bash
   npm run dev
   ```
2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🌐 Cómo Subirlo a GitHub y Desplegarlo en Vercel

### Paso 1: Subir el proyecto a GitHub
1. Abre tu cuenta de [GitHub](https://github.com) y crea un nuevo repositorio llamado `dr-bilis-blog` (público o privado).
2. En la terminal de esta carpeta, corre los siguientes comandos:
   ```bash
   git add .
   git commit -m "feat: Consultorio Dr. Bilis con Neo-brutalismo, Resend y Social Sharing"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/dr-bilis-blog.git
   git push -u origin main
   ```

### Paso 2: Desplegar en Vercel
1. Entra a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..." ➔ "Project"**.
3. Selecciona tu repositorio `dr-bilis-blog` y dale a **Deploy**.
4. ¡Listo! Vercel te dará una URL pública tipo `dr-bilis-blog.vercel.app`.

### Paso 3: Activar el Newsletter con Resend (Opcional)
1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita.
2. Copia tu `API Key` (empieza por `re_...`).
3. En el panel de tu proyecto en Vercel, ve a **Settings ➔ Environment Variables**.
4. Agrega la variable:
   * **Key:** `RESEND_API_KEY`
   * **Value:** `tu_api_key_de_resend`
5. Vuelve a desplegar o guarda los cambios. A partir de ese momento, cada persona que se suscriba recibirá el correo de bienvenida del Dr. Bilis.

---

## ✍️ Cómo Publicar un Nuevo Caso / Artículo

Para agregar un nuevo diagnóstico médico, solo abre `src/data/posts.ts` y añade un nuevo objeto con el código `DX-XXX`:

```typescript
{
  slug: 'titulo-del-caso',
  code: 'DX-095',
  title: 'El título demoledor',
  subtitle: 'Subtítulo cínico explicativo',
  date: '2026-10-27',
  readTime: '3 MIN',
  category: 'CULTURA', // 'CULTURA' | 'TRABAJO' | 'TECH' | 'RELACIONES' | 'AUTOAYUDA'
  tag: '#COACHING_FALSO',
  summary: 'Resumen para la tarjeta de inicio...',
  punchlineQuote: 'La frase para la tarjeta de Instagram y WhatsApp',
  content: {
    dictamen: 'El análisis clínico inicial...',
    sections: [
      {
        heading: '1. El encabezado',
        paragraphs: ['Párrafo 1...', 'Párrafo 2...'],
        cynicalNote: 'Nota del Dr. Bilis...'
      }
    ],
    veredictoFinal: 'La conclusión demoledora.'
  }
}
```
Haces `git commit` y `git push`, y Vercel lo publicará automáticamente.
