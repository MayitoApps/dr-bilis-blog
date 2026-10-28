import { Post } from '@/types';

/**
 * ARCHIVO DE EXPEDIENTES CLÍNICOS DEL DR. BILIS
 * La verdad no está aquí para caerte bien.
 */
export const POSTS: Post[] = [
  {
    slug: 'la-caida-de-guadalupe-taddei-ine-renuncia-corrupcion',
    code: 'DX-005',
    title: 'La renuncia de Guadalupe Taddei: de la tómbola democrática a la puerta trasera del INE',
    subtitle: 'Cómo la guardiana de la pureza electoral terminó arrinconada por adjudicaciones directas, empresas consentidas y el clásico virus del presupuesto público.',
    date: '2026-10-28',
    readTime: '5 MIN',
    category: 'CULTURA',
    tag: '#EL_INE_NO_SE_TOCA_PERO_SE_FACTURA',
    summary: 'Llegó ungida por una tómbola legislativa, prometió la salvación de la austeridad republicana y sale por la puerta de servicio entre expedientes de la Auditoría Superior y empresas de compadres. La historia de siempre: en México no se combate la corrupción, solo se rota de beneficiario.',
    punchlineQuote: 'En la política mexicana nadie llega a transformar el sistema; solo llegan a cambiar el nombre del titular en las facturas de adjudicación directa.',
    coverImage: '/images/posts/dx-005.jpg',
    content: {
      dictamen: 'Necrosis ética institucional fulminante. La paciente presentaba delirios de pureza presupuestaria que colapsaron súbitamente al contacto con licitaciones a modo y empresas de allegados. Pronóstico: amnesia judicial colectiva en menos de seis meses.',
      sections: [
        {
          heading: '1. El milagro de la tómbola y la comedia de la pureza republicana',
          paragraphs: [
            'Recordemos la apoteosis de abril de 2023: la democracia mexicana decidió que el método más científico para designar a la máxima autoridad electoral de la nación no era el consenso de talentos, sino sacar un papelito de una urna de cristal en San Lázaro. De la suerte divina emergió Guadalupe Taddei, presentada ante las masas como la antítesis de los viejos "burócratas dorados" del INE.',
            'Prometieron bajarse el sueldo, barrer las escaleras de arriba hacia abajo y desmantelar el dispendio electoral. Pero la administración pública tiene una ley de gravedad inviolable: cuando le entregas una chequera con miles de millones de pesos a un funcionario convencido de su propia superioridad moral, los principios franciscanos tardan exactamente tres quincenas en evaporarse.',
            'Lo que comenzó como una gesta de redención institucional se convirtió en un déjà vu grotesco donde los discursos sobre "el pueblo sabio" se financiaban con adjudicaciones directas sin pudor alguno.'
          ],
          image: {
            src: '/images/posts/dx-005-sede-ine.jpg',
            alt: 'Sede central del Instituto Nacional Electoral en Tlalpan',
            caption: 'Instalaciones centrales del INE en Tlalpan: el templo sagrado donde la fe democrática se traduce en contratos millonarios y sobreprecios de confianza.'
          },
          cynicalNote: 'Axioma del Dr. Bilis: Cuando un funcionario te jura que "no son iguales a los de antes", tiene toda la razón: son exactamente los mismos, pero con peor ortografía en los expedientes de compras.'
        },
        {
          heading: '2. Corporativo ZEG y Cajas Graf: la familia y los compadres no se equivocan',
          paragraphs: [
            'El libreto nunca decepciona por su falta de originalidad. Los reportajes de CNN y las pesquisas periodísticas destaparon lo que en cualquier país con Estado de derecho provocaría renuncias en cadena: contratos multimillonarios para material electoral otorgados por la vía rápida a empresas vinculadas a colaboradores cercanos, familiares y operadores políticos de Sonora.',
            'Cajas electorales de cartón a precio de estuche Louis Vuitton, triangulaciones de recursos que harían palidecer a un contador de Wall Street y una Auditoría Superior de la Federación que, por una vez en la vida, no pudo mirar hacia otro lado ante el descaro de las cifras.',
            'La primera línea de defensa fue el gastado estribillo de siempre: "es una campaña mediática de los conservadores para desestabilizar la transformación". Desgraciadamente para su equipo legal, los sellos de hacienda y los números de cuenta no tienen ideología partidista: o cuadran o son un delito.'
          ],
          cynicalNote: 'Regla de adquisiciones gubernamentales: En México no existe el conflicto de interés; existe únicamente el milagro providencial de que tus primos abran empresas justo en el giro que tu secretaría necesita contratar de urgencia.'
        },
        {
          heading: '3. La herradura solitaria y el arte de la renuncia preventiva',
          paragraphs: [
            'El tiro de gracia no vino de la oposición moralina, sino del mismo Palacio Nacional. En cuanto Claudia Sheinbaum soltó en la mañanera que "en el INE no debe haber ninguna sombra de corrupción", el cronómetro de Taddei marcó cero. En el ecosistema político mexicano, cuando el poder supremo te pide "transparentar", lo que te está entregando es una pluma para que firmes tu renuncia antes de que la Fiscalía te invite a declarar.',
            'El comunicado final fue una joya de la hipocresía burocrática: afirmó dimitir "por la estabilidad del Instituto y la salud de la democracia". Traducido del dialecto oficial al español forense: "me cacharon con las manos en el cajón de las licitaciones y prefiero irme a mi casa con pensión a esperar que un juez federal me congele las cuentas bancarias".',
            'La mítica "Herradura de la Democracia" se quedó vacía una mañana de octubre, dejando una silla ejecutiva que ahora huele a auditoría inconclusa y a material electoral facturado con sobreprecio.'
          ],
          image: {
            src: '/images/posts/dx-005-herradura.jpg',
            alt: 'La sala de sesiones del Consejo General del INE con el sillón presidencial vacío',
            caption: 'La Sala del Consejo General del INE tras el portazo: el sillón presidencial desierto mientras los expedientes de la ASF ocupan el lugar de los discursos solemnes.'
          },
          cynicalNote: 'Diagnóstico de salida: En la burocracia nacional nadie renuncia jamás por vergüenza; renuncian cuando el presupuesto de abogados particulares supera el finiquito de liquidación.'
        }
      ],
      veredictoFinal: 'Guadalupe Taddei pasará a los libros de texto como otra lección profiláctica para la ciudadanía ingenua: las instituciones no se pudren por las tres letras de su logotipo, sino por la incorregible voracidad de los mortales que se sientan en su trono. Puedes refundar el árbitro electoral mil veces, inventar tómbolas con niños cantores y prometer austeridad franciscana; pero mientras el control del presupuesto público quede en manos de mesías de cartón, la democracia seguirá siendo una rifa donde el pueblo pone los votos y los amigos del poder cobran los cheques.'
    }
  },
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
    coverImage: '/images/posts/dx-001.jpg',
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
  },
  {
    slug: 'la-mentira-del-pensamiento-positivo-y-los-vendehumos-del-agradecimiento',
    code: 'DX-002',
    title: 'La estafa del pensamiento positivo: por qué "vibrar alto" no va a pagar tu renta ni curar tu gastritis',
    subtitle: 'Cómo la industria de la autoayuda tóxica te convenció de que ser infeliz o llegar justo a fin de mes es culpa de tus "bloqueos mentales" y no del costo de la vida.',
    date: '2026-10-27',
    readTime: '4 MIN',
    category: 'AUTOAYUDA',
    tag: '#VIBRAR_ALTO_MIS_POLAINAS',
    summary: 'Te dicen que manifiestes abundancia mientras ellos manifiestan depósitos bancarios vendiéndote cursos de afirmaciones matutinas. El negocio redondo de hacerte sentir culpable hasta de tu propio cansancio.',
    punchlineQuote: 'El pensamiento positivo es el anestésico perfecto para una sociedad rota: en vez de exigir que arreglen el mundo, te enseñan a sonreír mientras se te cae el techo encima.',
    coverImage: '/images/posts/dx-002.jpg',
    content: {
      dictamen: 'Intoxicación aguda por positivismo tóxico. El paciente ha sustituido el pensamiento crítico por mantras de autoayuda escritos por personas que heredaron sus departamentos y creen que madrugar a las 5:00 AM es el único secreto del éxito.',
      sections: [
        {
          heading: '1. La culpa es tuya por no "decretarlo con suficiente fe"',
          paragraphs: [
            'Fíjate en la perversa genialidad del modelo de negocio: si compras su libro de doce pasos y consigues el ascenso, el gurú se adjudica el milagro de sus enseñanzas. Pero si sigues ganando una miseria y comiendo atún de lata a fin de mes, la culpa no es del método: es que "en el fondo tienes bloqueos de escasez" o "no lo sentiste desde el chakra correcto".',
            'Es la única industria del planeta donde el cliente es declarado culpable cuando el producto defectuoso no funciona. No importa que la inflación esté al ocho por ciento ni que los sueldos lleven estancados una década: para tu coach de cabecera, la culpa es que no agradeciste lo suficiente al despertar.'
          ],
          cynicalNote: 'Regla clínica del Dr. Bilis: Quien te dice que "el dinero es solo energía" invariablemente te cobra esa energía mediante transferencia bancaria no reembolsable.'
        },
        {
          heading: '2. La tiranía de la sonrisa obligatoria y la fobia al dolor',
          paragraphs: [
            'Hemos creado una generación aterrorizada de sentir tristeza, rabia o frustración. Si tienes un día miserable porque tu trabajo apesta o tu vida no va como querías, el protocolo moderno te exige que lo tapes inmediatamente con un podcast motivacional y una taza que dice "Sonríe, la vida es bella".',
            'Estar enojado frente a una injusticia es un mecanismo biológico sano. Es lo que provocó las revoluciones, los derechos laborales y el fin de la esclavitud. Pero el sistema prefiere gente que haga yoga respiratorio para calmar el pánico de no poder pagar el alquiler en lugar de gente furiosa exigiendo condiciones dignas.'
          ],
          cynicalNote: 'Receta médica: La próxima vez que alguien te diga "todo pasa por algo", recuérdale que el vómito y los accidentes viales también pasan por algo, y nadie los aplaude.'
        },
        {
          heading: '3. El agradecimiento como arma de sumisión masiva',
          paragraphs: [
            '"Al menos tienes trabajo", te dicen. "Hay gente en situaciones peores", insisten. Ese es el verdadero veneno del agradecimiento forzado: usar la miseria ajena como techo para que no aspires a una vida decente.',
            'Agradece lo que tienes, por supuesto; pero jamás uses la gratitud como una mordaza para tolerar abusos. Estar agradecido con la vida no significa tener que besarle los pies a un sistema que te exprime doce horas al día.'
          ]
        }
      ],
      veredictoFinal: 'Tienes derecho a tener días malos, a mandar todo al diablo y a reconocer que hay cosas que están jodidas sin necesidad de encontrarles una "lección cósmica de crecimiento". La vida a veces simplemente apesta y no hay ningún universo conspirando a tu favor ni en tu contra: el universo está demasiado ocupado expandiéndose en el vacío como para fijarse en tu tablero de manifestación.'
    }
  },
  {
    slug: 'delirios-de-inteligencia-artificial-y-los-gurus-de-linkedin',
    code: 'DX-003',
    title: 'La histeria de la IA: miles de "expertos" que hace un año vendían criptos y hoy te enseñan a ser millonario con prompts',
    subtitle: 'De cómo un modelo de autocompletado probabilístico desató la mayor epidemia de charlatanes digitales desde la fiebre del oro del siglo XIX.',
    date: '2026-10-27',
    readTime: '4 MIN',
    category: 'TECH',
    tag: '#GURUS_DEL_PROMPT',
    summary: 'Ayer eran traders de Bitcoin, anteayer gurús de NFTs, y hoy te venden un PDF con "los 50 prompts secretos que te harán ganar 10,000 dólares al mes". El circo tecnológico cambia de carpa, pero los payasos siguen siendo los mismos.',
    punchlineQuote: 'La inteligencia artificial no nos va a quitar el empleo; nos lo van a quitar los directores ejecutivos mediocres que creen que un prompt de tres líneas puede reemplazar a un humano con criterio.',
    coverImage: '/images/posts/dx-003.jpg',
    content: {
      dictamen: 'Psicosis tecnológica inducida por FOMO (miedo a quedarse fuera). Los pacientes experimentan alucinaciones donde una red neuronal que no sabe cuántas "r" tiene la palabra "fresa" va a construir utopías financieras automáticas mientras ellos duermen en la playa.',
      sections: [
        {
          heading: '1. El reciclaje incesante del vendehumos profesional',
          paragraphs: [
            'Observa con atención el perfil de LinkedIn de tu "AI Thought Leader" de confianza. En 2017 era consultor de Growth Hacking. En 2020 era experto en dropshipping con Shopify. En 2021 te explicaba por qué comprar el dibujo pixelado de un mono con gorra te aseguraba la jubilación anticipada en el metaverso.',
            'Hoy, tras un curso de tres horas en YouTube, es "Estratega Senior de Inteligencia Artificial Generativa". Su conocimiento técnico se reduce a pedirle a un chatbot que redacte correos electrónicos con tono empático y luego copiar y pegar el resultado sin leerlo.',
            'No hay tecnología lo suficientemente avanzada que no pueda ser secuestrada por un ejército de oportunistas vendiendo palas en una mina sin oro.'
          ],
          cynicalNote: 'Observación clínica: Si el curso de IA cuesta $97 dólares y promete hacerte millonario, el único millonario es quien se lo vendió a diez mil ingenuos.'
        },
        {
          heading: '2. La ilusión de la productividad vacía',
          paragraphs: [
            'Ahora la gente presume generar cincuenta publicaciones de blog al día, treinta carruseles de Instagram en cinco minutos y cientos de correos automatizados. Nadie se detiene a preguntar lo esencial: ¿quién carajos quiere leer semejante montaña de basura sintética?',
            'Hemos automatizado la producción de ruido para alimentar algoritmos que nadie disfruta, leídos por robots que resumen textos escritos por otros robots. Es una orgía de datos inservibles donde lo único que se evapora es la autenticidad humana.'
          ],
          cynicalNote: 'Diagnóstico de consultorio: Si no sabías escribir un argumento coherente antes de ChatGPT, ahora solo escribes mediocridad con una velocidad diez veces mayor.'
        },
        {
          heading: '3. El pánico del desempleo y la soberbia de las cúpulas',
          paragraphs: [
            'Las grandes corporaciones despiden a miles de trabajadores bajo la promesa de que la IA hará el trabajo el próximo trimestre. Seis meses después, los sistemas colapsan, los clientes están enfurecidos con bots que no entienden un reclamo básico y las empresas tienen que volver a contratar humanos a escondidas y con salarios de emergencia.',
            'La IA es una herramienta formidable de cálculo y síntesis; el problema nunca fue la máquina, sino la estupidez humana de quienes creen que la intuición, la ética y el criterio se pueden comprimir en un archivo de pesos sinápticos.'
          ]
        }
      ],
      veredictoFinal: 'Usa las herramientas digitales para ahorrarte el trabajo tedioso, pero no te tragues el cuento de hadas de los profetas de oficina. Un algoritmo puede predecir la siguiente palabra más probable en una oración; lo que jamás podrá tener es una opinión propia, una herida en el orgullo o la capacidad de asumir la responsabilidad cuando las cosas salgan mal.'
    }
  },
  {
    slug: 'responsabilidad-afectiva-el-nuevo-manual-para-justificar-el-desinteres',
    code: 'DX-004',
    title: 'Responsabilidad afectiva: el manual pop para desmantelar relaciones sin sentirte mala persona',
    subtitle: 'Cómo la terapia de TikTok transformó el amor en una transacción de recursos humanos donde nadie quiere arriesgar, pero todos exigen garantías por escrito.',
    date: '2026-10-27',
    readTime: '4 MIN',
    category: 'RELACIONES',
    tag: '#TERAPIA_DE_TIKTOK',
    summary: 'Ahora nadie te deja porque ya no le gustas; te dejan porque "están honrando sus propios límites" y "priorizando su espacio energético". El nuevo glosario clínico para esconder la cobardía sentimental.',
    punchlineQuote: 'Hemos patologizado tanto las emociones humanas que ahora cualquier desacuerdo es una "red flag" y tener ganas de huir se bautizó como "cuidar mi paz mental".',
    coverImage: '/images/posts/dx-004.jpg',
    content: {
      dictamen: 'Neurosis relacional contemporánea. Los pacientes han sustituido la honestidad brutal por un dialecto pseudo-terapéutico para romper corazones con la frialdad protocolaria de un memorándum de despido de recursos humanos.',
      sections: [
        {
          heading: '1. El comunicado de prensa en lugar de una conversación honesta',
          paragraphs: [
            'Antes, si alguien ya no quería salir contigo, te decía la verdad o inventaba una excusa mundana. Hoy te envían un párrafo de trescientas palabras redactado como si lo hubiera aprobado un comité de bioética: "Hola, en este momento de mi proceso evolutivo no tengo el ancho de banda emocional para sostener este vínculo desde un lugar de reciprocidad consciente, por lo que elijo poner este límite sano".',
            'Traducción real: "No me interesas, pero me aterra que pienses que soy una mala persona, así que me escondo detrás de términos clínicos para que sientas que mi desinterés es en realidad un acto de madurez espiritual".'
          ],
          cynicalNote: 'Regla del Dr. Bilis: Cuando alguien empieza un mensaje con la frase "quiero ser transparente contigo desde mi proceso", prepárate para la puñalada más calculada de tu semana.'
        },
        {
          heading: '2. La epidemia de las "red flags" universales',
          paragraphs: [
            'Se ha vuelto deporte olímpico en redes sociales catalogar cualquier rasgo de personalidad que no encaje con tu comodidad como una "bandera roja". Si la persona no contesta en cinco minutos: apego evitativo. Si contesta muy rápido: apego ansioso. Si tiene una opinión distinta sobre un tema: narcisista manipulador.',
            'La gente no busca compañeros de vida; busca candidatos prediseñados que encajen en una hoja de especificaciones sin causar la más mínima fricción. La tragedia es que el amor maduro requiere tolerar la imperfección del otro, algo inadmisible para quienes consumen psicología en videos de cuarenta segundos.'
          ],
          cynicalNote: 'Diagnóstico: El narcisismo de nuestra era consiste en creer que uno es un cristal purísimo y que el resto de la humanidad son piedras destinadas a romperlo.'
        },
        {
          heading: '3. El pánico al compromiso disfrazado de amor propio',
          paragraphs: [
            'Bajo la bandera de "no conformarse con menos", miles de personas terminan completamente solas y resentidas con el mundo. Exigen empatía incondicional, disponibilidad inmediata y comprensión absoluta, mientras ofrecen a cambio frialdad calculada y advertencias de que "su prioridad son ellos mismos".',
            'El amor propio es necesario para no permitir abusos; pero cuando tu amor propio te impide mostrar vulnerabilidad, pedir perdón o ceder un centímetro de tu orgullo, ya no es autoestima: es aislamiento voluntario.'
          ]
        }
      ],
      veredictoFinal: 'Vincularse con otro ser humano es riesgoso, desprolijo y a veces doloroso. Deja de buscar garantías notariales en tus relaciones. Si alguien no te quiere, que te lo diga de frente y sin florituras terapéuticas; y si te toca ser quien se va, ten la decencia de aceptar que le vas a doler a alguien sin intentar pasar a la historia como un maestro de la iluminación emocional.'
    }
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS;
}
