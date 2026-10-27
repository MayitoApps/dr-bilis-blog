import { Post } from '@/types';

/**
 * ARCHIVO DE EXPEDIENTES CLÍNICOS DEL DR. BILIS
 */
export const POSTS: Post[] = [
  {
    slug: 'ponte-la-camiseta-explotacion-laboral-sueldo-minimo',
    code: 'DX-001',
    title: '"Ponte la camiseta": el truco más viejo para que hagas el trabajo de tres por el sueldo de uno',
    subtitle: 'Cómo las empresas disfrazan la explotación laboral de "oportunidad de crecimiento" y pagan horas extra con rebanadas de pizza fría.',
    date: '2026-10-27',
    readTime: '4 MIN',
    category: 'TRABAJO',
    tag: '#PONTE_LA_CAMISETA',
    summary: 'Te contrataron como analista, pero a los seis meses ya eres diseñador, redactor, psicólogo del jefe y mensajero ocasional. Todo por el mismo sueldo y con la promesa de que "pronto vendrán cosas mejores".',
    punchlineQuote: 'Ponerse la camiseta es una metáfora preciosa hasta que te das cuenta de que la tela te la descuentan de la nómina y la sangre la pones tú.',
    content: {
      dictamen: 'Cuadro agudo de delirio gerencial. El empleador sufre de esquizofrenia presupuestaria: exige resultados de multinacional de Wall Street mientras financia la operación con el presupuesto de una kermesse de primaria.',
      sections: [
        {
          heading: '1. La trampa del "perfil multitarea" (o cómo ser una navaja suiza mal pagada)',
          paragraphs: [
            'En el anuncio de empleo decía algo elegante como "profesional dinámico con orientación a resultados". Traducido del lenguaje de Recursos Humanos al español forense: "Buscamos a alguien lo suficientemente ingenuo o desesperado para asumir el puesto de tres personas que renunciaron el mes pasado por agotamiento".',
            'Empiezas haciendo lo que firmaste en tu contrato. Pero al segundo mes, tu superior te suelta la frase mágica: "¿Nos podrías apoyar con esto rapidito? Es que tú le sabes bien". Seis meses después, estás administrando servidores, redactando minutas, diseñando flyers en Canva y cerrando ventas en frío a las ocho de la noche por exactamente la misma miseria quincenal.',
            'Y lo peor de todo: si en algún momento cometes un error en una de las diez tareas que ni siquiera te corresponden, te evalúan como si fuera tu responsabilidad primordial.'
          ],
          cynicalNote: 'Fórmula matemática del Dr. Bilis: A mayor uso de la palabra "sinergia" en una oficina, menor es la probabilidad de que te paguen horas extra.'
        },
        {
          heading: '2. La moneda de curso legal llamada "visibilidad y aprendizaje"',
          paragraphs: [
            'Cuando finalmente reúnes el coraje de pedir una compensación justa por haber triplicado tu carga laboral, el jefe no saca la chequera: saca su discurso de orador motivacional de segunda mano.',
            'Te habla de "ver esto como una inversión en tu futuro", de cómo "el negocio está en una etapa crucial donde todos debemos apretarnos el cinturón", y de la invaluable "visibilidad" que estás ganando frente a la dirección.',
            'He ido al supermercado con tres kilos de "visibilidad" y dos docenas de "experiencia invaluable", y la cajera insistió en que tenía que pagar la leche con dinero de verdad. Qué falta de visión corporativa de su parte.'
          ],
          cynicalNote: 'Diagnóstico clínico: El jefe siempre llega en auto del año a la reunión donde anuncia que "no habrá aumentos este trimestre por la coyuntura macroeconómica mundial".'
        },
        {
          heading: '3. El soborno supremo: pizza grasosa un viernes a las 9:00 PM',
          paragraphs: [
            'No hay nada más insultante en la psicología laboral que la llegada de dos cajas de cartón con pizza tibia un viernes en la noche para compensar cuatro horas de trabajo no remunerado.',
            'Cincuenta pesos de harina, queso de dudosa procedencia y embutidos rancios para ahorrarle a la compañía mil dólares en liquidaciones y honorarios legales. Y todavía esperan que sonrías, te tomes una foto para el LinkedIn de la empresa y pongas en el pie de foto: "¡Gran equipo, construyendo el futuro!".',
            'Si tu lealtad a una empresa se compra con pepperoni barato, no tienes un empleo: tienes síndrome de Estocolmo con carbohidratos.'
          ]
        }
      ],
      veredictoFinal: 'Tu contrato estipula 40 horas a la semana y una lista finita de responsabilidades. Cualquier cosa que sobrepase eso tiene un nombre: trabajo extra, y el trabajo se paga con dinero contante y sonante. Deja de sentir culpa por apagar tu computadora a tu hora exacta de salida. El panteón está lleno de "empleados indispensables" cuyos puestos vacantes se publicaron en internet antes de que se enfriara el café de su velorio.'
    }
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS;
}
