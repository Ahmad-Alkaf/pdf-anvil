// Spanish tool pages. Slugs follow the most searched Spanish phrase (Bing,
// 3 months, 2026). Ids mirror the English slugs. See NOTES.md for the choices.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "¿Mis archivos se suben a un servidor?",
  a: "No. PDF Anvil funciona por completo en tu navegador. Tu archivo lo abre JavaScript en tu propio dispositivo, y el resultado también se crea ahí. No nos envías nada. Puedes desconectar internet cuando la página haya cargado y la herramienta sigue funcionando.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "¿Hay un límite de tamaño o un límite diario?",
  a: "No. No hay límite de páginas, ni de número de archivos, ni cuota diaria. El único límite es la memoria de tu dispositivo. Los archivos de más de 100 MB muestran un aviso, pero funcionan en la mayoría de las computadoras.",
};

const FREE_FAQ: ToolFaq = {
  q: "¿Es gratis de verdad? ¿Necesito una cuenta?",
  a: "Sí, es gratis y no hay cuenta. Sin registro, sin correo, sin marca de agua y sin versión premium. PDF Anvil es un proyecto paralelo de KafLabs que existe para ser útil.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Arrastra una o varias imágenes al recuadro, o haz clic para elegirlas.",
  "Ordena las imágenes arrastrándolas y elige un tamaño de página.",
  "Haz clic en Crear PDF. El archivo se descarga al instante.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "¿Qué significa «Ajustar a la imagen»?",
  a: "Cada página toma el tamaño exacto de su imagen, sin márgenes. Úsalo para escaneos y capturas de pantalla. Elige A4 o Carta (Letter) si quieres páginas normales para imprimir, con la imagen centrada.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "¿Puedo poner muchas imágenes en un solo PDF?",
  a: "Sí. Añade todas las imágenes que quieras. Cada imagen se convierte en una página, en el orden de la lista. Arrastra una imagen hacia arriba o hacia abajo para cambiar el orden.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
  "Elige el formato de imagen y la resolución que necesitas.",
  "Haz clic en Convertir a imágenes. Un ZIP con todas las imágenes se descarga al instante. También puedes descargar cada imagen por separado.",
];

const DPI_FAQ: ToolFaq = {
  q: "¿Qué resolución debo usar?",
  a: "72 DPI da archivos pequeños, buenos para la web. 150 DPI es una buena opción por defecto para pantallas y presentaciones. 300 DPI es para imprimir. A más DPI, archivos más grandes y más tiempo de proceso.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "¿Puedo convertir solo una página?",
  a: "Sí. Cuando el archivo cargue, haz clic en las páginas que quieras en la cuadrícula. Solo se convierten las páginas seleccionadas.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "¿Se suben mi PDF o mi contraseña?",
  a: "No. El archivo y la contraseña se quedan en tu navegador. La herramienta ejecuta el programa de código abierto qpdf como WebAssembly en tu propio dispositivo. Ninguna petición lleva tu archivo ni tu contraseña. Puedes desconectar internet cuando la página haya cargado y la herramienta sigue funcionando.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "¿Cuál es la diferencia entre la contraseña de usuario y la de propietario?",
  a: "Un PDF puede tener dos contraseñas. La contraseña de usuario abre el archivo. La contraseña de propietario da acceso completo y quita los límites de impresión, copia y edición. Un visor de PDF aplica los permisos solo a quien abre el archivo con la contraseña de usuario.",
};

export const pages: readonly LocalePage[] = [
  // ---- merge ----
  {
    id: "merge-pdf",
    slug: "unir-pdf",
    kind: "merge",
    nav: true,
    priority: 1, // "unir pdf" 1.0M
    name: "Unir PDF",
    navLabel: "Unir",
    title: "Unir PDF online – Gratis, privado y sin subir archivos",
    description:
      "Une varios archivos PDF en un solo documento desde tu navegador. Arrastra para ordenarlos. Gratis, sin subir archivos, sin cuenta, sin límites, sin marca de agua.",
    h1: "Unir archivos PDF",
    intro: "Une dos o más PDF en un solo archivo. Arrastra los archivos en el orden que quieras. Todo ocurre en tu navegador.",
    actionLabel: "Unir PDF",
    steps: [
      "Arrastra dos o más archivos PDF al recuadro, o haz clic para elegirlos.",
      "Arrastra los archivos en el orden en que quieres que aparezcan.",
      "Haz clic en Unir PDF. El archivo unido se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cómo cambio el orden de los archivos?",
        a: "Arrastra un archivo hacia arriba o hacia abajo en la lista, o usa los botones de flecha. El PDF unido sigue el orden de la lista, de arriba abajo.",
      },
      {
        q: "¿Unir los archivos cambia la calidad de las páginas?",
        a: "No. Las páginas se copian tal cual. Las fuentes, las imágenes y los gráficos vectoriales se quedan exactamente igual. La herramienta no renderiza ni comprime nada.",
      },
      {
        q: "¿Puedo unir PDF protegidos con contraseña?",
        a: "No directamente. Quita primero la contraseña con la herramienta Desbloquear PDF y después une esa copia. Necesitas la contraseña del archivo.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: ["unir pdf", "unir archivos pdf", "juntar pdf", "fusionar pdf", "unir pdf online", "unir pdf gratis", "unificar pdf", "unir varios pdf en uno"],
  },
  {
    // Variant of "merge" for "combinar pdf" / "juntar pdf".
    id: "combine-pdf",
    slug: "combinar-pdf",
    kind: "merge",
    nav: false,
    priority: 16,
    name: "Combinar PDF",
    navLabel: "Combinar",
    title: "Combinar PDF online – Junta varios PDF en uno, gratis",
    description:
      "Combina varios archivos PDF en un solo documento con una herramienta gratis que funciona en tu navegador. Ordena los archivos, un clic y descarga. Sin cuenta.",
    h1: "Combinar archivos PDF",
    intro:
      "Junta dos o más archivos PDF en un solo documento. Añade los archivos, ponlos en orden y descarga el resultado. Tus archivos se quedan en tu dispositivo.",
    actionLabel: "Combinar PDF",
    steps: [
      "Añade los archivos PDF que quieres combinar. Arrástralos al recuadro, o haz clic para elegirlos.",
      "Pon los archivos en el orden correcto. Arrástralos, o usa los botones de flecha.",
      "Haz clic en Combinar PDF. Tu navegador crea un solo PDF y lo descarga.",
    ],
    faq: [
      {
        q: "¿Cómo combino varios archivos PDF en uno?",
        a: "Abre esta página y añade tus archivos PDF. Ponlos en orden. Haz clic en Combinar PDF. La herramienta copia todas las páginas en un PDF nuevo y lo descarga. No hay que instalar ningún programa.",
      },
      {
        q: "¿Es gratis combinar PDF aquí?",
        a: "Sí. No cuesta nada, no hay cuenta, ni marca de agua, ni límite en el número de archivos. Úsalo tantas veces como quieras.",
      },
      {
        q: "¿Puedo combinar PDF desde el teléfono?",
        a: "Sí. Abre esta página en el navegador de tu teléfono o tableta. Toca el recuadro para elegir los archivos. El PDF combinado se guarda en tus descargas.",
      },
      {
        q: "¿Hay diferencia entre combinar, juntar y unir?",
        a: "No. Combinar, juntar, unir y fusionar significan lo mismo: poner varios archivos PDF en uno solo. Esta página y la página Unir PDF usan la misma herramienta.",
      },
      {
        q: "¿Las páginas conservan su tamaño y su calidad?",
        a: "Sí. Cada página se copia tal cual. Nada se renderiza de nuevo ni se comprime. Páginas de distintos tamaños pueden convivir en un mismo archivo.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: ["combinar pdf", "combinar archivos pdf", "juntar pdf", "juntar archivos pdf", "combinar pdf online gratis", "juntar varios pdf en uno"],
  },

  // ---- split ----
  {
    id: "split-pdf",
    slug: "dividir-pdf",
    kind: "split",
    nav: true,
    priority: 4, // "dividir pdf" 221K
    name: "Dividir PDF",
    navLabel: "Dividir",
    title: "Dividir PDF online – Por páginas o por rangos, gratis",
    description:
      "Divide un PDF en archivos separados, uno por página, o por rangos como 1-3, 5, 8-. Funciona en tu navegador. Gratis, privado, sin subir archivos, sin límites.",
    h1: "Dividir PDF",
    intro:
      "Convierte un PDF en varios. Guarda cada página como un archivo propio, o escribe los rangos de páginas que necesitas. Tu archivo se queda en tu dispositivo.",
    actionLabel: "Dividir PDF",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Elige «Cada página» o escribe rangos de páginas como 1-3, 5, 8-.",
      "Haz clic en Dividir PDF. Un ZIP con todas las partes se descarga al instante. También puedes descargar cada parte por separado.",
    ],
    faq: [
      {
        q: "¿Cómo divido un PDF en archivos separados?",
        a: "Añade el PDF y elige «Cada página». Haz clic en Dividir PDF. Cada página se convierte en un archivo PDF propio. Recibes todos los archivos en un ZIP, o descargas cada uno por separado.",
      },
      {
        q: "¿Cómo escribo los rangos de páginas?",
        a: "Separa los elementos con comas. «3» es una página. «1-3» son las páginas 1 a 3. «8-» es de la página 8 hasta el final. Cada elemento se convierte en un archivo PDF propio. Ejemplo: 1-3, 5, 8- genera tres archivos.",
      },
      {
        q: "¿Cómo divido un PDF por la mitad?",
        a: "Mira cuántas páginas tiene el archivo. Elige «Rangos de páginas» y escribe las dos mitades, por ejemplo 1-10, 11- para un PDF de 20 páginas. Recibes dos archivos.",
      },
      {
        q: "¿Por qué recibo un archivo ZIP?",
        a: "Cuando la división genera más de un archivo, el navegador no puede guardar muchos archivos a la vez sin preguntar cada vez. El ZIP los contiene todos. También puedes descargar cada archivo por separado desde la lista de resultados.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["dividir pdf", "dividir pdf online", "dividir pdf en varios archivos", "dividir pdf por páginas", "cortar pdf", "partir pdf", "dividir pdf gratis"],
  },
  {
    // Variant of "split" for "separar pdf" / "separar páginas de un pdf" (the extract-pages angle).
    id: "extract-pdf-pages",
    slug: "separar-pdf",
    kind: "split",
    nav: false,
    priority: 15, // "separar pdf" 102K
    name: "Separar PDF",
    navLabel: "Separar",
    title: "Separar páginas de un PDF online – Extrae las páginas que necesitas",
    description:
      "Separa las páginas que necesitas de un PDF y guárdalas como un archivo nuevo. Escribe los números de página o los rangos. Gratis, en tu navegador, sin subir nada.",
    h1: "Separar páginas de un PDF",
    intro:
      "Saca las páginas que necesitas de un PDF y guárdalas como un archivo nuevo. Escribe los números de página, haz un clic y descarga. El PDF no sale de tu dispositivo.",
    actionLabel: "Separar páginas",
    steps: [
      "Añade tu PDF. Arrástralo al recuadro, o haz clic para elegirlo.",
      "Elige «Rangos de páginas» y escribe las páginas que quieres, por ejemplo 2, 5-7, 10-. O elige «Cada página» para obtener cada página como archivo propio.",
      "Haz clic en Separar páginas. Cada rango se convierte en un PDF. Recibes un ZIP, o descargas cada archivo por separado.",
    ],
    faq: [
      {
        q: "¿Cómo separo páginas de un PDF?",
        a: "Añade el PDF y elige «Rangos de páginas». Escribe los números de las páginas que quieres. Haz clic en Separar páginas. Solo esas páginas van al archivo nuevo. El PDF original no cambia.",
      },
      {
        q: "¿Puedo extraer una sola página de un PDF?",
        a: "Sí. Escribe un solo número de página, por ejemplo 4. La herramienta guarda esa página como un PDF nuevo de una página.",
      },
      {
        q: "¿Puedo guardar cada página como un PDF independiente?",
        a: "Sí. Elige «Cada página». Cada página se convierte en un archivo PDF propio. Todos los archivos vienen en un ZIP, y también puedes descargarlos uno por uno.",
      },
      {
        q: "¿Puedo separar páginas que no están seguidas?",
        a: "Sí. Separa los elementos con comas, por ejemplo 1, 4, 9-11. Cada elemento se convierte en un archivo. Si quieres todas en un solo archivo, sepáralas primero y después junta los archivos con la herramienta Combinar PDF.",
      },
      {
        q: "¿Es gratis separar páginas de un PDF aquí?",
        a: "Sí. No cuesta nada, no hay cuenta, ni marca de agua, ni límite de páginas. El PDF se procesa en tu navegador y nunca se sube.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: ["separar pdf", "separar páginas de un pdf", "separar hojas de un pdf", "extraer páginas de un pdf", "extraer páginas pdf", "separar pdf online gratis"],
  },

  // ---- rotate ----
  {
    id: "rotate-pdf",
    slug: "rotar-pdf",
    kind: "rotate",
    nav: true,
    priority: 11,
    name: "Rotar PDF",
    navLabel: "Rotar",
    title: "Rotar PDF online – Gira las páginas y guarda el archivo, gratis",
    description:
      "Rota todas las páginas o solo algunas de un PDF 90, 180 o 270 grados y guarda el resultado. Funciona en tu navegador. Gratis, sin subir archivos, sin marca de agua.",
    h1: "Rotar páginas de un PDF",
    intro: "Arregla las páginas que están de lado o boca abajo. Rota todo el documento o solo las páginas que elijas, y guarda un PDF nuevo.",
    actionLabel: "Guardar PDF rotado",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Rota todas las páginas con los botones de arriba, o pasa el cursor sobre una página y rota solo esa.",
      "Haz clic en Guardar PDF rotado. El archivo se descarga al instante.",
    ],
    faq: [
      {
        q: "¿La rotación es permanente?",
        a: "Sí. A diferencia del botón de rotar de un visor de PDF, que solo cambia la vista, esta herramienta escribe la rotación en el archivo. La página se abre con la nueva orientación en cualquier visor y en cualquier dispositivo.",
      },
      {
        q: "¿Puedo rotar solo una página?",
        a: "Sí. Pasa el cursor sobre la miniatura de una página y usa sus botones de rotar. Cada página puede tener su propia rotación. Los botones de arriba rotan todas las páginas a la vez.",
      },
      {
        q: "¿Rotar reduce la calidad?",
        a: "No. La herramienta cambia una sola propiedad de la página. El contenido no se renderiza de nuevo ni se comprime, así que la calidad es idéntica.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["rotar pdf", "girar pdf", "rotar páginas pdf", "girar páginas de un pdf", "rotar pdf y guardar", "rotar pdf online gratis"],
  },

  // ---- organize ----
  {
    id: "organize-pdf",
    slug: "organizar-pdf",
    kind: "organize",
    nav: true,
    priority: 8, // "ordenar pdf" 38K
    name: "Organizar PDF",
    navLabel: "Organizar",
    title: "Organizar PDF – Ordena y elimina páginas online, gratis",
    description:
      "Arrastra las páginas de un PDF a un nuevo orden, elimina las que no necesitas y descarga el resultado. Funciona en tu navegador. Gratis, privado, sin subir archivos.",
    h1: "Organizar páginas de un PDF",
    intro: "Reordena las páginas arrastrándolas, elimina las que no necesitas y guarda un PDF nuevo y limpio. Nada sale de tu dispositivo.",
    actionLabel: "Guardar PDF organizado",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Arrastra las páginas a un nuevo orden. Pasa el cursor sobre una página para eliminarla o rotarla.",
      "Haz clic en Guardar PDF organizado. El archivo se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cómo elimino páginas de un PDF?",
        a: "Pasa el cursor sobre la página y haz clic en el icono de la papelera. La página se quita del resultado. Las páginas eliminadas no están en el archivo guardado, así que el archivo se hace más pequeño.",
      },
      {
        q: "¿Puedo reordenar páginas desde el teléfono?",
        a: "Sí. Mantén presionada una página y arrástrala a su nuevo lugar. Con el teclado, enfoca una página, presiona Espacio, muévela con las flechas y presiona Espacio otra vez.",
      },
      {
        q: "Eliminé la página equivocada. ¿Puedo deshacerlo?",
        a: "Sí. Usa el botón Deshacer que aparece después de eliminar, o haz clic en Restablecer para volver al orden original con todas las páginas.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: ["organizar pdf", "ordenar pdf", "ordenar páginas pdf", "eliminar páginas de un pdf", "reordenar páginas pdf", "quitar páginas de un pdf"],
  },

  // ---- images to PDF: one component, five pages ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-a-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 12, // "jpg a pdf" 118K + "convertir jpg a pdf" 110K
    name: "JPG a PDF",
    navLabel: "JPG a PDF",
    title: "JPG a PDF – Convertir imágenes JPG a PDF online, gratis",
    description:
      "Convierte fotos y escaneos JPG en un solo PDF desde tu navegador. Elige A4, Carta o ajustar a la imagen. Gratis, sin subir archivos, sin cuenta, sin marca de agua.",
    h1: "Convertir JPG a PDF",
    intro:
      "Convierte un JPG o un conjunto entero de fotos en un solo PDF. Elige el tamaño de página y ordena las imágenes arrastrándolas. Tus fotos nunca salen de tu dispositivo.",
    actionLabel: "Crear PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "¿El PDF conserva toda la calidad de mi JPG?",
        a: "Sí. Los datos del JPG se colocan en el PDF tal cual, sin volver a comprimirlos. Una foto de 12 megapíxeles sigue siendo una foto de 12 megapíxeles. El PDF pesa más o menos lo mismo que las imágenes juntas.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "La foto de mi teléfono sale girada. ¿Por qué?",
        a: "Algunos teléfonos guardan la rotación como una etiqueta oculta en vez de girar los píxeles. Esta versión todavía no lee esa etiqueta. Abre la foto en cualquier editor, guárdala una vez y añádela de nuevo.",
      },
      {
        q: "¿Puedo mezclar JPG con archivos PNG o WebP?",
        a: "Sí. La misma herramienta acepta JPG, PNG y WebP juntos. Cada imagen se convierte en una página.",
      },
      PRIVACY_FAQ,
      {
        q: "¿Es gratis convertir JPG a PDF aquí?",
        a: "Sí. Es gratis, sin límite en el número de imágenes y sin marca de agua. El PDF se crea en tu navegador, así que tus fotos no se suben. No necesitas una cuenta.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: ["jpg a pdf", "convertir jpg a pdf", "jpg a pdf gratis", "pasar jpg a pdf", "jpeg a pdf", "foto a pdf", "jpg a pdf online"],
  },
  {
    id: "png-to-pdf",
    slug: "png-a-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 17,
    name: "PNG a PDF",
    navLabel: "PNG a PDF",
    title: "PNG a PDF – Convertir imágenes PNG a PDF online, gratis",
    description:
      "Convierte capturas de pantalla, diagramas y gráficos PNG en un PDF sin perder calidad. Se conserva la transparencia. Gratis, en tu navegador, sin subir archivos.",
    h1: "Convertir PNG a PDF",
    intro:
      "Convierte imágenes PNG en un PDF sin pérdida de calidad. Capturas de pantalla, gráficos y logotipos con transparencia funcionan. Todo se ejecuta en tu navegador.",
    actionLabel: "Crear PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "¿PNG a PDF es sin pérdida?",
        a: "Sí. PNG es un formato sin pérdida y el PDF incrusta los datos PNG sin cambiarlos. El texto de las capturas de pantalla sigue nítido y los colores no cambian.",
      },
      {
        q: "¿Qué pasa con la transparencia?",
        a: "El PDF conserva el canal alfa. Las zonas transparentes muestran el fondo de la página, que es blanco en la mayoría de los visores. Nada se aplana ni se rellena.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "¿Qué tamaño de página es mejor para capturas de pantalla?",
        a: "Usa «Ajustar a la imagen» para que cada página tenga el tamaño exacto en píxeles de la captura y ningún margen. Usa A4 o Carta (Letter) si quieres imprimir las páginas.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png a pdf", "convertir png a pdf", "pasar png a pdf", "png a pdf online gratis", "captura de pantalla a pdf"],
  },
  {
    id: "webp-to-pdf",
    slug: "webp-a-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 21,
    name: "WebP a PDF",
    navLabel: "WebP a PDF",
    title: "WebP a PDF – Convertir imágenes WebP a PDF online, gratis",
    description:
      "Convierte imágenes WebP en un PDF desde tu navegador. Sin programas, sin subir archivos, sin cuenta. Junta muchos archivos WebP en un solo documento, gratis.",
    h1: "Convertir WebP a PDF",
    intro: "Las imágenes WebP de la web no se abren en muchas herramientas PDF. Esta las convierte en tu navegador y las junta en un solo PDF.",
    actionLabel: "Crear PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "¿Cómo se convierte el WebP?",
        a: "Tu navegador decodifica la imagen WebP y la herramienta guarda los píxeles como PNG dentro del PDF. Ese paso es sin pérdida, así que el PDF se ve exactamente igual que el WebP original.",
      },
      {
        q: "¿Por qué otras herramientas rechazan mis archivos WebP?",
        a: "PDF no admite WebP de forma nativa, y muchos conversores solo manejan JPG y PNG. PDF Anvil usa el decodificador del propio navegador, que admite WebP en todos los navegadores modernos.",
      },
      {
        q: "¿Funciona el WebP animado?",
        a: "Solo se usa el primer fotograma. Una página de PDF es una imagen fija.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["png-to-pdf", "jpg-to-pdf", "image-to-pdf"],
    keywords: ["webp a pdf", "convertir webp a pdf", "webp a pdf online gratis", "pasar webp a pdf"],
  },
  {
    id: "image-to-pdf",
    slug: "imagen-a-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 5, // "imagen a pdf" 58K; the general term is the nav page, as in English
    name: "Imagen a PDF",
    navLabel: "Imagen a PDF",
    title: "Imagen a PDF – Convertir JPG, PNG y WebP a PDF gratis",
    description:
      "Convierte cualquier imagen en un PDF: JPG, PNG y WebP, incluso mezclados. Elige el tamaño de página y el orden. Gratis, privado, en tu navegador, sin subir archivos.",
    h1: "Convertir imágenes a PDF",
    intro:
      "Junta imágenes JPG, PNG y WebP en un solo PDF. Mezcla formatos sin problema, elige un tamaño de página y ordena las imágenes arrastrándolas. Nada sale de tu dispositivo.",
    actionLabel: "Crear PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "¿Qué formatos de imagen funcionan?",
        a: "JPG, PNG y WebP. JPG y PNG se incrustan tal cual. WebP se decodifica y se convierte a PNG antes de añadirlo. Puedes mezclar los tres en un mismo PDF.",
      },
      {
        q: "¿Puedo hacer un PDF con las fotos de mi teléfono?",
        a: "Sí. Abre esta página en tu teléfono, toca el recuadro y elige fotos de tu galería. El PDF se crea en el teléfono y se guarda en tus descargas.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "¿El PDF conserva toda la resolución de mis imágenes?",
        a: "Sí. Los datos de la imagen se incrustan sin remuestreo. Eso también significa que el PDF pesa más o menos lo mismo que las imágenes juntas.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: ["imagen a pdf", "convertir imagen a pdf", "imágenes a pdf", "pasar imagen a pdf", "fotos a pdf", "convertir a pdf", "crear pdf", "imagen a pdf online gratis"],
  },
  {
    id: "scan-to-pdf",
    slug: "escanear-a-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 20,
    name: "Escanear a PDF",
    navLabel: "Escanear a PDF",
    title: "Escanear documentos a PDF online – Con la cámara del teléfono, gratis",
    description:
      "Escanea documentos en papel a PDF con la cámara de tu teléfono o con fotos que ya tienes. Ordena las páginas y elige A4 o Carta. Gratis, privado, sin subir nada.",
    h1: "Escanear documentos a PDF",
    intro:
      "Toma una foto de cada página con la cámara de tu teléfono, o añade fotos que ya tienes. Ordena las páginas y obtén un solo PDF. No se sube nada.",
    actionLabel: "Crear PDF",
    steps: [
      "Toca Tomar una foto y fotografía la primera página. O toca el recuadro para añadir fotos que ya tienes.",
      "Repite con cada página. Ordena las páginas arrastrándolas y elige un tamaño de página.",
      "Toca Crear PDF. El archivo se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cómo escaneo un documento con el teléfono?",
        a: "Abre esta página en tu teléfono. Toca Tomar una foto. Se abre la cámara. Fotografía la primera página y confírmala. Toca Tomar una foto otra vez para la página siguiente. Cuando todas las páginas estén en la lista, toca Crear PDF. El PDF se guarda en tu teléfono.",
      },
      {
        q: "¿Puedo usarlo en una computadora?",
        a: "Sí. En una computadora, el botón Tomar una foto abre el selector de archivos normal. Elige fotos o escaneos que ya tengas en la computadora, ponlos en orden y crea el PDF.",
      },
      {
        q: "¿Mis fotos se suben a un servidor?",
        a: "No. La foto pasa de la cámara de tu teléfono a la página en tu navegador. El PDF también se crea ahí. No nos envías nada. Puedes desconectar internet cuando la página haya cargado y la herramienta sigue funcionando.",
      },
      {
        q: "¿Cómo consigo páginas rectas y legibles?",
        a: "Pon el documento sobre una superficie plana con un fondo liso. Usa buena luz y evita las sombras de tu mano o del teléfono. Sostén el teléfono paralelo a la página y llena el encuadre con la página. Toca la pantalla para enfocar antes de tomar la foto. La herramienta no recorta ni endereza la foto.",
      },
      {
        q: "¿Qué tamaño de página debo elegir?",
        a: "Elige A4 o Carta (Letter) para obtener páginas normales para imprimir, con la foto centrada. A4 es la opción por defecto. Elige «Ajustar a la imagen» para que cada página tenga el tamaño exacto de la foto, sin márgenes.",
      },
      {
        q: "¿Puedo escanear muchas páginas en un solo PDF?",
        a: "Sí. Toma una foto por página. Cada foto se convierte en una página, en el orden de la lista. No hay límite de páginas. Arrastra una página hacia arriba o hacia abajo para cambiar el orden.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: ["escanear a pdf", "escanear documentos a pdf", "escanear con el celular a pdf", "escáner pdf gratis", "cámara a pdf"],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF to images: one component, three pages ----
  {
    id: "pdf-to-jpg",
    slug: "pdf-a-jpg",
    kind: "pdf-to-images",
    nav: false,
    priority: 13,
    name: "PDF a JPG",
    navLabel: "PDF a JPG",
    title: "PDF a JPG – Convertir páginas de PDF a imágenes JPG online",
    description:
      "Exporta cada página de un PDF como imagen JPG a 72, 150 o 300 DPI. Funciona en tu navegador. Gratis, privado, sin subir archivos, sin marca de agua, sin límites.",
    h1: "Convertir PDF a JPG",
    intro: "Guarda cada página de un PDF como una imagen JPG. Elige la resolución, marca las páginas y descarga una imagen o todas en un ZIP.",
    actionLabel: "Convertir a imágenes",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "¿Cómo guardo un PDF como JPG?",
        a: "Añade el PDF a esta página. Deja JPG como formato y elige una resolución. Haz clic en Convertir a imágenes. Cada página se guarda como un archivo JPG. Descárgalos uno por uno o todos juntos en un ZIP.",
      },
      DPI_FAQ,
      {
        q: "¿Cuándo elegir JPG en vez de PNG?",
        a: "JPG es más pequeño e ideal para fotos y páginas escaneadas. Cambia a PNG para texto, diagramas y capturas de pantalla, donde importan los bordes nítidos.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "¿El JPG contiene la página entera?",
        a: "Sí. Se renderiza la página completa, con imágenes, gráficos vectoriales y texto, exactamente como la muestra un visor de PDF. Los campos de formulario y las anotaciones se incluyen tal como se ven.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf a jpg", "convertir pdf a jpg", "pasar pdf a jpg", "guardar pdf como jpg", "pdf a jpeg", "pdf a jpg online gratis", "página de pdf a jpg"],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-a-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 19,
    name: "PDF a PNG",
    navLabel: "PDF a PNG",
    title: "PDF a PNG – Convertir páginas de PDF a imágenes PNG online",
    description:
      "Exporta las páginas de un PDF como imágenes PNG sin pérdida a 72, 150 o 300 DPI. Texto y diagramas nítidos. En tu navegador. Gratis, privado, sin subir archivos.",
    h1: "Convertir PDF a PNG",
    intro:
      "Guarda las páginas de un PDF como imágenes PNG sin pérdida. El texto, los diagramas y las capturas de pantalla se mantienen nítidos. Elige la resolución y las páginas, y descárgalas.",
    actionLabel: "Convertir a imágenes",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "¿Por qué elegir PNG en vez de JPG?",
        a: "PNG es sin pérdida. Los bordes del texto, las líneas finas y los colores planos se conservan exactos, sin artefactos de compresión. Es la opción correcta para presentaciones, diagramas, formularios y todo lo que vayas a seguir editando.",
      },
      DPI_FAQ,
      {
        q: "¿El fondo del PNG es transparente?",
        a: "No. Las páginas de un PDF tienen fondo blanco por definición, y el PNG lo conserva. Usa un editor de imágenes si necesitas quitarlo.",
      },
      {
        q: "¿A qué resolución convierto para imprimir?",
        a: "Usa 300 DPI. Es la resolución habitual de impresión y el PNG conserva cada píxel. Para pantallas y presentaciones, 150 DPI da archivos más pequeños con buena nitidez.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf a png", "convertir pdf a png", "pasar pdf a png", "pdf a png online gratis", "pdf a png alta resolución"],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-a-imagen",
    kind: "pdf-to-images",
    nav: true,
    priority: 6,
    name: "PDF a imagen",
    navLabel: "PDF a imagen",
    title: "PDF a imagen – Convertir páginas de PDF a JPG o PNG online",
    description:
      "Convierte las páginas de un PDF en imágenes. Elige JPG o PNG y 72, 150 o 300 DPI. Marca las páginas que necesitas. Gratis, en tu navegador, sin subir archivos.",
    h1: "Convertir PDF a imágenes",
    intro:
      "Convierte las páginas de un PDF en archivos de imagen. Elige JPG para fotos y escaneos o PNG para texto y diagramas, elige la resolución y descarga las páginas que necesitas.",
    actionLabel: "Convertir a imágenes",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "¿JPG o PNG?",
        a: "JPG es más pequeño e ideal para fotos y páginas escaneadas. PNG es sin pérdida e ideal para texto, diagramas y capturas de pantalla, donde importan los bordes nítidos.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "¿Puedo obtener una sola imagen de todo el documento?",
        a: "Cada página se convierte en su propia imagen. Si necesitas una sola imagen alta, convierte las páginas y únelas en un editor de imágenes.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf a imagen", "convertir pdf a imagen", "pasar pdf a imagen", "pdf a foto", "página de pdf a imagen", "pdf a imagen online gratis"],
  },

  // ---- compress: one component, two pages ----
  {
    id: "compress-pdf",
    slug: "comprimir-pdf",
    kind: "compress",
    nav: true,
    priority: 2, // "comprimir pdf" 389K
    name: "Comprimir PDF",
    navLabel: "Comprimir",
    title: "Comprimir PDF online – Reduce el tamaño gratis y sin subir archivos",
    description:
      "Comprime un PDF en tu navegador. Elige sin pérdida, equilibrado o mínimo. Las fotos grandes se recodifican, el texto sigue nítido. Gratis, sin subir archivos.",
    h1: "Comprimir PDF",
    intro:
      "Haz un PDF más pequeño. Elige un nivel, haz un clic y descarga. El texto y los gráficos vectoriales siguen nítidos. Tu archivo nunca sale de tu dispositivo.",
    actionLabel: "Comprimir PDF",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Elige un nivel. Sin pérdida conserva cada píxel. Equilibrado es la mejor opción para la mayoría de los archivos. Mínimo da el archivo más pequeño.",
      "Haz clic en Comprimir PDF. La herramienta muestra el tamaño anterior y el nuevo, y el archivo se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cuánto se reducirá mi PDF?",
        a: "Depende de lo que contenga el archivo. Un PDF lleno de fotos grandes o escaneos puede reducirse entre un 50 y un 90 por ciento con el nivel Equilibrado. Un PDF que solo tiene texto y gráficos vectoriales se reduce mucho menos, a menudo entre un 5 y un 20 por ciento, porque no hay nada grande que recodificar. La herramienta muestra el tamaño anterior y el nuevo después de cada ejecución.",
      },
      {
        q: "¿Qué nivel debo elegir?",
        a: "Equilibrado es la mejor opción para la mayoría de los archivos. Limita las imágenes a 1600 píxeles en el lado largo, que es nítido en pantalla y suficiente para una impresión normal. Elige Mínimo para adjuntos de correo y límites de subida. Limita las imágenes a 1100 píxeles y usa una compresión JPEG más fuerte. Elige Sin pérdida cuando las imágenes deban quedarse exactamente como están. Solo limpia la estructura del archivo y elimina los datos sin usar.",
      },
      {
        q: "¿La compresión reduce la calidad del texto?",
        a: "No. El texto, las fuentes, las líneas y los gráficos vectoriales no se cambian en ningún nivel. Solo se recodifican las fotos y los escaneos grandes, y solo en los niveles Equilibrado y Mínimo. Si la imagen nueva no es más pequeña que la anterior, se conserva la anterior.",
      },
      {
        q: "¿Por qué mi archivo no se hizo más pequeño?",
        a: "Algunos archivos ya son tan pequeños como pueden ser. Sus imágenes ya son JPEG pequeños, o el archivo no tiene imágenes, solo texto y formas vectoriales. Los archivos que otra herramienta ya comprimió también cambian poco. En ese caso la herramienta te dice que el archivo ya era compacto.",
      },
      {
        q: "¿Qué imágenes comprime la herramienta?",
        a: "Imágenes JPEG, e imágenes RGB y en escala de grises sin comprimir o comprimidas con Flate, que pesan al menos 64 KB y miden al menos 200 píxeles de ancho o de alto. Las imágenes con transparencia, colores indexados, CMYK o espacios de color poco comunes se conservan tal cual para que los colores no salgan mal.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["comprimir pdf", "comprimir pdf online", "comprimir pdf gratis", "compresor pdf", "reducir pdf", "bajar peso pdf", "comprimir pdf sin perder calidad"],
  },
  {
    // Variant of "compress" for "reducir tamaño pdf" / "reducir peso pdf".
    id: "reduce-pdf-size",
    slug: "reducir-tamano-pdf",
    kind: "compress",
    nav: false,
    priority: 18,
    name: "Reducir tamaño de PDF",
    navLabel: "Reducir tamaño",
    title: "Reducir el tamaño de un PDF online – Gratis y sin subir archivos",
    description:
      "Reduce el tamaño de un PDF para enviarlo por correo o subirlo a un formulario. En tu navegador, con tres niveles y tamaño antes y después. Gratis, sin cuenta.",
    h1: "Reducir el tamaño de un PDF",
    intro:
      "Deja un PDF por debajo del límite de un correo o de un formulario. Elige cuánto debe reducirse, haz un clic y mira el tamaño anterior y el nuevo. El PDF se queda en tu dispositivo.",
    actionLabel: "Reducir tamaño",
    steps: [
      "Añade tu PDF. Arrástralo al recuadro, o haz clic para elegirlo.",
      "Elige un nivel. Empieza con Equilibrado. Si el archivo sigue siendo demasiado grande, vuelve a pasarlo con Mínimo.",
      "Haz clic en Reducir tamaño. La herramienta muestra el porcentaje ahorrado y el archivo más pequeño se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cómo reduzco el tamaño de un PDF?",
        a: "Añade el PDF a esta página y elige un nivel. Haz clic en Reducir tamaño. La herramienta reescribe el archivo, elimina los datos sin usar y hace más pequeñas las fotos grandes. El PDF nuevo se descarga al instante, y la página muestra el tamaño anterior y el nuevo.",
      },
      {
        q: "¿Cómo dejo un PDF por debajo de 1 MB o de 5 MB?",
        a: "Pasa el archivo con el nivel Equilibrado y mira el tamaño nuevo. Si sigue por encima del límite, vuelve a pasarlo con Mínimo. Si aún es demasiado grande, contiene muchas páginas de imágenes. Divídelo en partes con la herramienta Dividir PDF y envía cada parte.",
      },
      {
        q: "¿Reducir el tamaño cambia el texto?",
        a: "No. El texto y los gráficos vectoriales se copian tal cual. Solo se hacen más pequeñas las fotos y los escaneos grandes. El texto sigue nítido en pantalla y en papel.",
      },
      {
        q: "¿Por qué mi PDF pesa tanto?",
        a: "En la mayoría de los casos, el archivo contiene fotos o páginas escaneadas a una resolución muy alta. Una página escaneada a 600 DPI puede ocupar varios megabytes. El nivel Equilibrado limita las imágenes a 1600 píxeles en el lado largo, suficiente para leer e imprimir con normalidad.",
      },
      {
        q: "¿Es gratis reducir el tamaño de un PDF aquí?",
        a: "Sí. No cuesta nada, no hay cuenta, ni marca de agua, ni límite en el número de archivos. El PDF se procesa en tu navegador y nunca se sube.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["reducir tamaño pdf", "reducir tamaño de pdf", "reducir peso pdf", "reducir pdf", "hacer pdf más pequeño", "reducir tamaño pdf online gratis"],
  },

  // ---- passwords ----
  {
    id: "unlock-pdf",
    slug: "desbloquear-pdf",
    kind: "unlock",
    nav: true,
    priority: 9,
    name: "Desbloquear PDF",
    navLabel: "Desbloquear",
    title: "Desbloquear PDF – Quitar la contraseña de un PDF online, gratis",
    description:
      "Quita la contraseña de un PDF cuando la conoces. Escríbela, haz un clic y obtén una copia que se abre sin contraseña. Gratis, en tu navegador, sin subir archivos.",
    h1: "Desbloquear un PDF",
    intro:
      "Quita la contraseña de un PDF. Escribe la contraseña que conoces, haz un clic y descarga una copia que se abre sin contraseña. El archivo se queda en tu dispositivo.",
    actionLabel: "Desbloquear PDF",
    steps: [
      "Arrastra un PDF protegido con contraseña al recuadro, o haz clic para elegirlo.",
      "Escribe la contraseña del archivo. Sirve tanto la contraseña que abre el archivo como la contraseña de propietario.",
      "Haz clic en Desbloquear PDF. Una copia sin contraseña y sin límites se descarga al instante.",
    ],
    faq: [
      {
        q: "Olvidé la contraseña. ¿Pueden quitarla?",
        a: "No. La herramienta necesita la contraseña. No adivina, ni descifra, ni salta contraseñas. Un PDF con cifrado AES no se puede abrir sin la contraseña correcta. Si no la conoces, pídesela a la persona que creó el archivo.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "¿Qué contraseña escribo aquí?",
        a: "Cualquiera de las dos. Si solo conoces la contraseña que abre el archivo, escribe esa. Si conoces la contraseña de propietario, escribe esa. El resultado no tiene contraseña ni límites.",
      },
      {
        q: "¿Por qué mi PDF no se abre aquí?",
        a: "Hay tres causas habituales. La contraseña no es correcta: revisa las mayúsculas y los espacios, y vuelve a intentarlo. El archivo está dañado: ábrelo en un visor de PDF para comprobarlo. El archivo usa un certificado o un sistema de derechos digitales en vez de una contraseña: la herramienta no puede abrir esos archivos.",
      },
      {
        q: "¿Puedo quitar solo los límites y mantener la contraseña de apertura?",
        a: "No. El resultado no tiene ninguna contraseña. Para poner una contraseña nueva, abre el resultado en la herramienta Proteger PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: ["desbloquear pdf", "quitar contraseña pdf", "quitar contraseña a un pdf", "eliminar contraseña pdf", "desproteger pdf", "desbloquear pdf online gratis"],
  },
  {
    id: "protect-pdf",
    slug: "proteger-pdf",
    kind: "protect",
    nav: true,
    priority: 10,
    name: "Proteger PDF",
    navLabel: "Proteger",
    title: "Proteger PDF – Poner contraseña a un PDF online, gratis",
    description:
      "Pon una contraseña a un PDF con cifrado AES-256 en tu navegador. Decide quién puede imprimir, copiar o editar el archivo. Gratis, sin subir archivos, sin cuenta.",
    h1: "Proteger un PDF con contraseña",
    intro:
      "Pon una contraseña a un PDF. El archivo se cifra con AES-256 en tu navegador, y solo quien tenga la contraseña puede abrirlo. No se sube nada.",
    actionLabel: "Proteger PDF",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Escribe la contraseña que abre el archivo. Define una contraseña de propietario y los permisos si los necesitas.",
      "Haz clic en Proteger PDF. El archivo cifrado se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Qué cifrado usa la herramienta?",
        a: "AES-256, el cifrado más fuerte del estándar PDF (PDF 2.0). Todos los visores actuales lo abren: Adobe Reader, Chrome, Edge, Firefox, Safari y Vista Previa en Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "¿Qué pasa si dejo vacía la contraseña de propietario?",
        a: "La herramienta usa la contraseña que abre el archivo para ambas. Entonces los permisos no limitan a quien conoce esa contraseña. Define una contraseña de propietario distinta cuando los permisos deban aplicarse.",
      },
      {
        q: "¿Qué hacen los permisos?",
        a: "Le dicen al visor de PDF qué puede hacer quien tiene la contraseña de usuario: imprimir el archivo, copiar texto e imágenes y editar el archivo. Quien tiene la contraseña de propietario puede hacerlo todo. La mayoría de los visores respetan los permisos, pero son una señal, no un candado. La protección real es la contraseña.",
      },
      {
        q: "¿Puedo quitar la contraseña más tarde?",
        a: "Sí. Abre el archivo en la herramienta Desbloquear PDF y escribe la contraseña. Obtienes una copia sin contraseña. Guarda la contraseña en un lugar seguro. Sin ella, el archivo no se puede abrir.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "¿Qué longitud debe tener la contraseña?",
        a: "Usa al menos 12 caracteres con letras, cifras y símbolos. AES-256 es fuerte, pero un programa puede adivinar una contraseña corta. No envíes la contraseña en el mismo correo que el archivo.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: ["proteger pdf", "proteger pdf con contraseña", "poner contraseña a un pdf", "cifrar pdf", "bloquear pdf", "encriptar pdf", "proteger pdf online gratis"],
  },

  // ---- viewer ----
  {
    id: "pdf-viewer",
    slug: "abrir-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Visor de PDF",
    navLabel: "Ver",
    title: "Abrir PDF online – Visor de PDF gratis, sin subir archivos",
    description:
      "Abre y lee un archivo PDF en tu navegador. Recorre las páginas, haz zoom e imprime. Visor de PDF gratis, sin subir archivos, sin cuenta y sin instalar Adobe.",
    h1: "Abrir y leer un PDF",
    intro: "Abre un archivo PDF y léelo en tu navegador. Recorre las páginas, haz zoom e imprime. El archivo se queda en tu dispositivo.",
    actionLabel: "Imprimir",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo.",
      "Recorre las páginas. Usa la barra de herramientas para ir a una página, acercar, alejar o ajustar la página al ancho de la ventana.",
      "Haz clic en Imprimir para abrir el archivo en una pestaña nueva e imprimirlo desde tu navegador. Haz clic en la X junto al nombre del archivo para abrir otro archivo.",
    ],
    faq: [
      {
        q: "¿Cómo abro un archivo PDF sin Adobe?",
        a: "Arrastra el archivo a esta página, o haz clic en el recuadro y elígelo. No necesitas Adobe Acrobat ni Adobe Reader. La página dibuja el PDF con el mismo motor de código abierto que usa Firefox. Funciona en Chrome, Edge, Firefox y Safari. No hay nada que instalar.",
      },
      {
        q: "¿Qué es un lector de PDF?",
        a: "Un lector de PDF es un programa que abre archivos PDF y muestra las páginas en tu pantalla. Adobe Reader es un ejemplo. La mayoría de los navegadores también traen uno integrado. Esta página es un lector de PDF que funciona como página web. Dibuja cada página en tu navegador y no envía el archivo a ningún sitio.",
      },
      {
        q: "¿Mi PDF se sube cuando lo abro?",
        a: "No. JavaScript lee el archivo en tu propio dispositivo y lo dibuja ahí, en tu pantalla. No se envía nada a un servidor. Puedes comprobarlo en el panel de red de tu navegador: ninguna petición lleva tu archivo.",
      },
      {
        q: "¿El visor funciona sin conexión?",
        a: "En su mayor parte. El archivo se abre en tu navegador y ningún dato va a un servidor. El código del visor y algunas fuentes se cargan desde nuestro sitio la primera vez que hacen falta. Abre la página y un archivo mientras tienes conexión. Después puedes abrir más archivos sin conexión hasta que cierres la pestaña.",
      },
      {
        q: "¿Puedo imprimir el PDF?",
        a: "Sí. Haz clic en Imprimir en la barra de herramientas. El archivo se abre en una pestaña nueva, en el visor de PDF de tu navegador. Presiona Ctrl+P (Cmd+P en Mac) ahí para imprimirlo. El navegador imprime el archivo original, así que el texto sale nítido en papel.",
      },
      {
        q: "¿Puedo hacer zoom?",
        a: "Sí. Usa los botones de más y menos de la barra de herramientas, o haz clic en Ajustar al ancho para que la página ocupe todo el ancho de la ventana. Cada página se dibuja de nuevo al nuevo tamaño, así que el texto se mantiene nítido en cualquier nivel de zoom.",
      },
      {
        q: "¿Puedo editar el PDF aquí?",
        a: "No. Esta herramienta solo muestra el archivo. Para añadir texto, tapar zonas, poner imágenes o una firma sobre una página, usa la herramienta Editar PDF. Para rotar, reordenar, eliminar, dividir, unir o convertir páginas, usa las otras herramientas de este sitio.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["abrir pdf", "abrir pdf online", "visor de pdf", "visor pdf online", "lector de pdf", "leer pdf online", "ver pdf online", "abrir pdf sin adobe"],
  },

  // ---- edit: one component, two pages ----
  {
    id: "edit-pdf",
    slug: "editar-pdf",
    kind: "edit",
    nav: true,
    priority: 3, // "editar pdf" 277K + "editor de pdf" 65K
    name: "Editar PDF",
    navLabel: "Editar",
    title: "Editar PDF online – Editor de PDF gratis: texto, imágenes y firma",
    description:
      "Edita un PDF en tu navegador: añade texto, tapa partes con blanco, resalta, inserta imágenes y dibuja tu firma. Gratis, sin subir archivos, sin cuenta.",
    h1: "Editar un PDF",
    intro:
      "Añade texto, rectángulos blancos, resaltados, imágenes y una firma dibujada sobre las páginas de un PDF. La herramienta no cambia el texto que ya está en el archivo; pone contenido nuevo encima. Todo se ejecuta en tu navegador.",
    actionLabel: "Guardar PDF",
    steps: [
      "Arrastra un PDF al recuadro, o haz clic para elegirlo. Elige una página en la tira de la izquierda.",
      "Elige una herramienta en la barra. Haz clic en la página para añadir un cuadro de texto, arrastra para dibujar un rectángulo blanco o un resaltado, añade una imagen o dibuja con el lápiz. Arrastra un elemento para moverlo, arrastra su esquina para cambiar el tamaño y presiona Supr para eliminarlo.",
      "Haz clic en Guardar PDF. El archivo editado se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Qué puedo editar en un PDF con esta herramienta?",
        a: "Puedes poner contenido nuevo sobre cualquier página: cuadros de texto, rectángulos blancos para tapar, resaltados amarillos, imágenes (PNG o JPG) y líneas a mano alzada dibujadas con el ratón o el dedo. Puedes mover, redimensionar y eliminar cada elemento antes de guardar. El contenido original de la página se queda debajo.",
      },
      {
        q: "¿Puedo cambiar el texto que ya está en el PDF?",
        a: "No. Esta herramienta no edita el texto existente. Añade contenido nuevo sobre la página. Para sustituir una palabra o un número, dibuja un rectángulo blanco encima y añade un cuadro de texto sobre él. El texto antiguo queda tapado en pantalla y en papel, pero sigue en el archivo, así que un programa que copie texto del PDF todavía puede encontrarlo.",
      },
      {
        q: "¿Cómo firmo un PDF?",
        a: "Elige la herramienta Dibujar y dibuja tu firma en la página con el ratón, un lápiz o el dedo. O elige Imagen y añade una foto de tu firma como PNG o JPG. Mueve la firma al lugar correcto, ajusta su tamaño y haz clic en Guardar PDF. La página Firmar PDF empieza con la herramienta Dibujar seleccionada.",
      },
      {
        q: "¿Mi PDF se sube a un servidor?",
        a: "No. JavaScript abre el archivo en tu propio dispositivo. Las ediciones se dibujan en el archivo con la biblioteca de código abierto pdf-lib en tu navegador. No nos envías nada. Puedes desconectar internet cuando la página haya cargado y la herramienta sigue funcionando.",
      },
      {
        q: "¿Qué fuentes puedo usar?",
        a: "Helvetica, Times y Courier. Son las fuentes estándar de PDF, así que el archivo se mantiene pequeño y todos los visores las muestran sin necesidad de incrustar la fuente. Puedes definir el tamaño y el color de cada cuadro de texto.",
      },
      {
        q: "¿Por qué un carácter especial aparece como un signo de interrogación?",
        a: "Las fuentes estándar de PDF contienen los caracteres latinos de las lenguas de Europa occidental (el conjunto WinAnsi), incluidas la ñ y las vocales con tilde. Un carácter fuera de ese conjunto, como un carácter chino, un emoji o algunos símbolos, no se puede codificar, así que la herramienta escribe un signo de interrogación en su lugar. Escribe el texto con caracteres del alfabeto latino, o añádelo como imagen.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: ["editar pdf", "editor de pdf", "editor pdf gratis", "editar pdf online", "editar pdf gratis", "modificar pdf", "cómo editar un pdf gratis", "añadir texto a pdf", "tapar texto en pdf"],
  },
  {
    id: "sign-pdf",
    slug: "firmar-pdf",
    kind: "edit",
    nav: false,
    priority: 14,
    name: "Firmar PDF",
    navLabel: "Firmar",
    title: "Firmar PDF online – Dibuja tu firma o usa una imagen, gratis",
    description:
      "Firma un PDF en tu navegador. Dibuja tu firma con el ratón o el dedo, o usa una imagen de ella, colócala y guarda. Gratis, sin subir archivos, sin cuenta.",
    h1: "Firmar un PDF",
    intro:
      "Dibuja tu firma en la página, o añade una imagen de ella. Muévela al lugar correcto, ajusta su tamaño y guarda el archivo. El PDF no sale de tu dispositivo.",
    actionLabel: "Guardar PDF",
    steps: [
      "Arrastra el PDF al recuadro, o haz clic para elegirlo. Elige la página que necesita la firma en la tira de la izquierda.",
      "La herramienta Dibujar está seleccionada. Dibuja tu firma en la página con el ratón, un lápiz o el dedo. O haz clic en Imagen y elige un PNG o un JPG de tu firma. Arrástrala a su lugar y arrastra la esquina para ajustar el tamaño. Usa la herramienta Texto para añadir la fecha o tu nombre.",
      "Haz clic en Guardar PDF. El archivo firmado se descarga al instante.",
    ],
    faq: [
      {
        q: "¿Cómo firmo un PDF sin imprimirlo?",
        a: "Añade el PDF y dibuja tu firma en la página con la herramienta Dibujar. Puedes usar el ratón, un lápiz o el dedo en una pantalla táctil. Mueve y ajusta la firma, y haz clic en Guardar PDF. La firma pasa a formar parte de la página. No hacen falta ni impresora ni escáner.",
      },
      {
        q: "¿Puedo usar una imagen de mi firma?",
        a: "Sí. Firma en una hoja de papel blanca, tómale una foto o escanéala y guárdala como PNG o JPG. Haz clic en Imagen, elige el archivo y colócalo en la página. Un PNG con fondo transparente queda mejor. La imagen se incrusta en el PDF con toda su calidad.",
      },
      {
        q: "¿Es una firma electrónica con validez legal?",
        a: "La herramienta dibuja una imagen de tu firma en la página. No añade un certificado digital y no comprueba quién firmó. Muchos acuerdos aceptan una firma dibujada, pero las normas cambian según el país y el contrato. Si la otra parte necesita una firma basada en certificado, usa un servicio que la emita.",
      },
      {
        q: "¿Puedo firmar desde el teléfono?",
        a: "Sí. La página funciona en el navegador de un teléfono o una tableta. Dibuja con el dedo o con un lápiz táctil. Haz zoom con dos dedos en el navegador si el campo es pequeño. El archivo se queda en el teléfono.",
      },
      {
        q: "¿Puedo añadir la fecha junto a la firma?",
        a: "Sí. Elige la herramienta Texto, haz clic en la página y escribe la fecha. Puedes definir el tamaño y el color de la fuente. Arrastra el cuadro de texto junto a la firma.",
      },
      {
        q: "¿Mi documento firmado se sube?",
        a: "No. El PDF y la firma se quedan en tu navegador. JavaScript dibuja la firma en el archivo en tu propio dispositivo. No nos envías nada.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: ["firmar pdf", "firmar pdf online", "firmar pdf gratis", "firma digital pdf", "añadir firma a pdf", "poner firma en pdf", "firmar documento pdf"],
    defaults: { tool: "draw" },
  },
];
