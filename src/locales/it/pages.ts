// Italian tool pages. Slugs follow the most searched Italian phrase (Bing,
// 3 months, 2026). Ids mirror the English slugs; `split:separare` is a
// locale-only variant. See NOTES.md for the choices.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "I miei file vengono caricati su un server?",
  a: "No. PDF Anvil funziona interamente nel tuo browser. Il file viene aperto da JavaScript sul tuo dispositivo, e anche il risultato viene creato lì. Non ci viene inviato nulla. Puoi scollegarti da internet una volta aperta la pagina e lo strumento continua a funzionare.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "C'è un limite di dimensione o un limite giornaliero?",
  a: "No. Non c'è nessun limite di pagine, di numero di file o di quota giornaliera. L'unico limite è la memoria del tuo dispositivo. I file sopra i 100 MB mostrano un avviso, ma funzionano sulla maggior parte dei computer.",
};

const FREE_FAQ: ToolFaq = {
  q: "È davvero gratis? Serve un account?",
  a: "Sì, è gratis e non serve nessun account. Nessuna registrazione, nessuna email, nessuna filigrana, nessun piano premium. PDF Anvil è un progetto parallelo di KafLabs che esiste per essere utile.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Trascina una o più immagini nel riquadro, oppure fai clic per sceglierle.",
  "Trascina le immagini nell'ordine che vuoi e scegli un formato pagina.",
  "Fai clic su Crea PDF. Il file viene scaricato subito.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "Cosa significa «Adatta all'immagine»?",
  a: "Ogni pagina prende le dimensioni esatte della sua immagine, senza margini. Usalo per scansioni e screenshot. Scegli A4 o Lettera (Letter) se vuoi pagine normali da stampare, con l'immagine centrata.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Posso mettere molte immagini in un solo PDF?",
  a: "Sì. Aggiungi tutte le immagini che vuoi. Ogni immagine diventa una pagina, nell'ordine dell'elenco. Trascina un'immagine in alto o in basso per cambiare l'ordine.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
  "Scegli il formato immagine e la risoluzione che ti serve.",
  "Fai clic su Converti in immagini. Uno ZIP con tutte le immagini viene scaricato subito. Puoi anche scaricare ogni immagine da sola.",
];

const DPI_FAQ: ToolFaq = {
  q: "Quale risoluzione devo usare?",
  a: "72 DPI dà file piccoli, adatti al web. 150 DPI è una buona scelta predefinita per schermi e presentazioni. 300 DPI è per la stampa. Più DPI significa file più grandi e più tempo di elaborazione.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Posso convertire solo una pagina?",
  a: "Sì. Quando il file è aperto, fai clic sulle pagine che vuoi nella griglia. Vengono convertite solo le pagine selezionate.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Il mio PDF o la mia password vengono caricati?",
  a: "No. Il file e la password restano nel tuo browser. Lo strumento esegue il programma open source qpdf come WebAssembly sul tuo dispositivo. Nessuna richiesta trasporta il tuo file o la tua password. Puoi scollegarti da internet una volta aperta la pagina e lo strumento continua a funzionare.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Che differenza c'è tra password utente e password del proprietario?",
  a: "Un PDF può avere due password. La password utente apre il file. La password del proprietario dà accesso completo e rimuove i limiti di stampa, copia e modifica. Un lettore PDF applica le autorizzazioni solo a chi apre il file con la password utente.",
};

export const pages: readonly LocalePage[] = [
  // ---- merge ----
  {
    id: "merge-pdf",
    slug: "unisci-pdf",
    kind: "merge",
    nav: true,
    priority: 1, // "unisci pdf" 109K
    name: "Unire PDF",
    navLabel: "Unire",
    title: "Unisci PDF online – Unire file PDF gratis, senza caricare nulla",
    description:
      "Unisci più file PDF in un solo documento nel tuo browser. Trascina i file per metterli in ordine. Gratis, senza caricamento, senza account, senza filigrana.",
    h1: "Unire file PDF",
    intro: "Unisci due o più PDF in un unico file. Trascina i file nell'ordine che vuoi. Tutto avviene nel tuo browser.",
    actionLabel: "Unisci PDF",
    steps: [
      "Trascina due o più file PDF nel riquadro, oppure fai clic per sceglierli.",
      "Trascina i file nell'ordine in cui vuoi che compaiano.",
      "Fai clic su Unisci PDF. Il file unito viene scaricato subito.",
    ],
    faq: [
      {
        q: "Come cambio l'ordine dei file?",
        a: "Trascina un file in alto o in basso nell'elenco, oppure usa i pulsanti con le frecce. Il PDF unito segue l'ordine dell'elenco, dall'alto in basso.",
      },
      {
        q: "Unire i file cambia la qualità delle pagine?",
        a: "No. Le pagine vengono copiate così come sono. Font, immagini e grafica vettoriale restano identici. Lo strumento non esegue nessun rendering e non comprime nulla.",
      },
      {
        q: "Posso unire PDF protetti da password?",
        a: "Non direttamente. Rimuovi prima la password con lo strumento Sbloccare PDF, poi unisci quella copia. Ti serve la password del file.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: ["unisci pdf", "unire pdf", "unire file pdf", "unisci pdf online", "unire pdf gratis", "unione pdf", "unire più pdf in uno", "unire pdf online gratis"],
  },
  {
    // Variant of "merge" for "combinare pdf" / "mettere insieme pdf".
    id: "combine-pdf",
    slug: "combinare-pdf",
    kind: "merge",
    nav: false,
    priority: 15,
    name: "Combinare PDF",
    navLabel: "Combinare",
    title: "Combinare PDF online – Metti insieme più PDF in uno, gratis",
    description:
      "Combina più file PDF in un solo documento con uno strumento gratis che funziona nel tuo browser. Metti i file in ordine, un clic e scarica. Senza account.",
    h1: "Combinare file PDF",
    intro:
      "Metti insieme due o più file PDF in un solo documento. Aggiungi i file, sistemali in ordine e scarica il risultato. I tuoi file restano sul tuo dispositivo.",
    actionLabel: "Combina PDF",
    steps: [
      "Aggiungi i file PDF che vuoi combinare. Trascinali nel riquadro, oppure fai clic per sceglierli.",
      "Metti i file nell'ordine giusto. Trascinali, oppure usa i pulsanti con le frecce.",
      "Fai clic su Combina PDF. Il browser crea un unico PDF e lo scarica.",
    ],
    faq: [
      {
        q: "Come combino più file PDF in uno?",
        a: "Apri questa pagina e aggiungi i tuoi file PDF. Mettili in ordine. Fai clic su Combina PDF. Lo strumento copia tutte le pagine in un nuovo PDF e lo scarica. Non c'è nessun programma da installare.",
      },
      {
        q: "Combinare PDF qui è gratis?",
        a: "Sì. Non costa nulla, non serve un account, non c'è filigrana e non c'è limite al numero di file. Usalo tutte le volte che vuoi.",
      },
      {
        q: "Posso combinare PDF dal telefono?",
        a: "Sì. Apri questa pagina nel browser del telefono o del tablet. Tocca il riquadro per scegliere i file. Il PDF combinato viene salvato nei download.",
      },
      {
        q: "Che differenza c'è tra combinare e unire?",
        a: "Nessuna. Combinare, unire e mettere insieme significano la stessa cosa: raccogliere più file PDF in uno solo. Questa pagina e la pagina Unire PDF usano lo stesso strumento.",
      },
      {
        q: "Le pagine mantengono dimensioni e qualità?",
        a: "Sì. Ogni pagina viene copiata così com'è. Nulla viene renderizzato di nuovo o compresso. Pagine di dimensioni diverse possono stare una accanto all'altra nello stesso file.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: ["combinare pdf", "combina pdf", "combinare file pdf", "mettere insieme pdf", "combinare pdf online gratis", "unire due pdf in uno"],
  },

  // ---- split ----
  {
    id: "split-pdf",
    slug: "dividere-pdf",
    kind: "split",
    nav: true,
    priority: 4, // "dividere pdf"
    name: "Dividere PDF",
    navLabel: "Dividere",
    title: "Dividere PDF online – Per pagina o per intervalli, gratis",
    description:
      "Dividi un PDF in file separati, uno per pagina, oppure per intervalli come 1-3, 5, 8-. Funziona nel tuo browser. Gratis, privato, senza caricamento, senza limiti.",
    h1: "Dividere un PDF",
    intro:
      "Trasforma un PDF in tanti file. Salva ogni pagina come file a sé, oppure digita gli intervalli di pagine che ti servono. Il file resta sul tuo dispositivo.",
    actionLabel: "Dividi PDF",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Scegli «Ogni pagina» oppure digita intervalli di pagine come 1-3, 5, 8-.",
      "Fai clic su Dividi PDF. Uno ZIP con tutte le parti viene scaricato subito. Puoi anche scaricare ogni parte da sola.",
    ],
    faq: [
      {
        q: "Come divido un PDF in file separati?",
        a: "Aggiungi il PDF e scegli «Ogni pagina». Fai clic su Dividi PDF. Ogni pagina diventa un file PDF a sé. Ricevi tutti i file in uno ZIP, oppure scarichi ognuno da solo.",
      },
      {
        q: "Come scrivo gli intervalli di pagine?",
        a: "Separa le voci con virgole. «3» è una pagina. «1-3» sono le pagine da 1 a 3. «8-» va dalla pagina 8 alla fine. Ogni voce diventa un file PDF a sé. Esempio: 1-3, 5, 8- crea tre file.",
      },
      {
        q: "Come salvo solo alcune pagine di un PDF?",
        a: "Scegli «Intervalli di pagine» e digita le pagine che vuoi, per esempio 2, 7-9. Vengono salvate solo quelle pagine. Il file originale non cambia.",
      },
      {
        q: "Perché ricevo un file ZIP?",
        a: "Quando la divisione crea più di un file, il browser non può salvare molti file in una volta senza chiedere conferma ogni volta. Lo ZIP li contiene tutti. Puoi anche scaricare ogni file da solo dall'elenco dei risultati.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["dividere pdf", "dividi pdf", "dividere pdf online", "dividere pdf in più file", "dividere pdf per pagine", "tagliare pdf", "dividere pdf gratis"],
  },
  {
    // Variant of "split" for "estrarre pagine pdf" (the extract-pages angle).
    id: "extract-pdf-pages",
    slug: "estrarre-pagine-pdf",
    kind: "split",
    nav: false,
    priority: 17,
    name: "Estrarre pagine PDF",
    navLabel: "Estrarre pagine",
    title: "Estrarre pagine da un PDF online – Gratis, senza caricare nulla",
    description:
      "Estrai le pagine che ti servono da un PDF e salvale come nuovo file. Digita i numeri di pagina o gli intervalli. Gratis, nel tuo browser, senza caricamento.",
    h1: "Estrarre pagine da un PDF",
    intro:
      "Prendi le pagine che ti servono da un PDF e salvale come nuovo file. Digita i numeri di pagina, un clic e scarica. Il PDF non lascia il tuo dispositivo.",
    actionLabel: "Estrai pagine",
    steps: [
      "Aggiungi il tuo PDF. Trascinalo nel riquadro, oppure fai clic per sceglierlo.",
      "Scegli «Intervalli di pagine» e digita le pagine che vuoi, per esempio 2, 5-7, 10-. Oppure scegli «Ogni pagina» per avere ogni pagina come file a sé.",
      "Fai clic su Estrai pagine. Ogni intervallo diventa un PDF. Ricevi uno ZIP, oppure scarichi ogni file da solo.",
    ],
    faq: [
      {
        q: "Come estraggo le pagine da un PDF?",
        a: "Aggiungi il PDF e scegli «Intervalli di pagine». Digita i numeri delle pagine che vuoi. Fai clic su Estrai pagine. Solo quelle pagine finiscono nel nuovo file. Il PDF originale non cambia.",
      },
      {
        q: "Posso estrarre una sola pagina da un PDF?",
        a: "Sì. Digita un solo numero di pagina, per esempio 4. Lo strumento salva quella pagina come nuovo PDF di una pagina.",
      },
      {
        q: "Posso salvare ogni pagina come PDF a sé?",
        a: "Sì. Scegli «Ogni pagina». Ogni pagina diventa un file PDF a sé. Tutti i file arrivano in uno ZIP, e puoi anche scaricarli uno per uno.",
      },
      {
        q: "Posso estrarre pagine che non sono consecutive?",
        a: "Sì. Separa le voci con virgole, per esempio 1, 4, 9-11. Ogni voce diventa un file. Se le vuoi tutte in un solo file, estraile prima e poi metti insieme i file con lo strumento Combinare PDF.",
      },
      {
        q: "Estrarre pagine da un PDF qui è gratis?",
        a: "Sì. Non costa nulla, non serve un account, non c'è filigrana e non c'è limite di pagine. Il PDF viene elaborato nel tuo browser e non viene mai caricato.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "split:separare", "organize-pdf", "combine-pdf"],
    keywords: ["estrarre pagine pdf", "estrarre pagine da pdf", "estrai pagine pdf", "estrarre una pagina da un pdf", "salvare pagine pdf come nuovo file", "estrarre pagine pdf online gratis"],
  },
  {
    // Locale-only variant of "split" for "separare pdf" / "separare pagine pdf".
    id: "split:separare",
    slug: "separare-pdf",
    kind: "split",
    nav: false,
    priority: 18,
    name: "Separare PDF",
    navLabel: "Separare",
    title: "Separare PDF online – Separa le pagine in file diversi, gratis",
    description:
      "Separa un PDF in più file nel tuo browser: una pagina per file, due metà o gli intervalli che scegli tu. Gratis, privato, senza caricare nulla e senza account.",
    h1: "Separare le pagine di un PDF",
    intro:
      "Separa un PDF in più file. Una pagina per file, il documento in due metà, oppure gli intervalli che decidi tu. Nulla lascia il tuo dispositivo.",
    actionLabel: "Separa PDF",
    steps: [
      "Trascina il PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Scegli «Ogni pagina» per avere un file per pagina, oppure «Intervalli di pagine» e digita le parti, per esempio 1-10, 11-.",
      "Fai clic su Separa PDF. Le parti arrivano in uno ZIP, e puoi scaricare ogni file anche da solo.",
    ],
    faq: [
      {
        q: "Come separo le pagine di un PDF?",
        a: "Aggiungi il PDF. Scegli «Ogni pagina» se vuoi un file per ogni pagina, oppure «Intervalli di pagine» e digita le parti che vuoi. Fai clic su Separa PDF. Ogni parte diventa un file PDF a sé.",
      },
      {
        q: "Come separo un PDF a metà?",
        a: "Guarda quante pagine ha il file. Scegli «Intervalli di pagine» e digita le due metà, per esempio 1-10, 11- per un PDF di 20 pagine. Ricevi due file.",
      },
      {
        q: "Che differenza c'è tra separare e dividere?",
        a: "Nessuna. Separare, dividere e tagliare un PDF significano la stessa cosa: fare più file da uno. Questa pagina e la pagina Dividere PDF usano lo stesso strumento.",
      },
      {
        q: "Posso separare un PDF dal telefono?",
        a: "Sì. Apri questa pagina nel browser del telefono o del tablet, tocca il riquadro e scegli il file. Le parti vengono salvate nei download come ZIP.",
      },
      {
        q: "Le pagine separate perdono qualità?",
        a: "No. Ogni pagina viene copiata nel nuovo file così com'è, con i suoi font, le immagini e la grafica vettoriale. Nulla viene renderizzato di nuovo o compresso.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "extract-pdf-pages", "merge-pdf"],
    keywords: ["separare pdf", "separa pdf", "separare pagine pdf", "separare un pdf in più file", "separare fogli pdf", "separare pdf online gratis"],
  },

  // ---- rotate ----
  {
    id: "rotate-pdf",
    slug: "ruotare-pdf",
    kind: "rotate",
    nav: true,
    priority: 10,
    name: "Ruotare PDF",
    navLabel: "Ruotare",
    title: "Ruotare PDF online – Raddrizza le pagine e salva il file, gratis",
    description:
      "Ruota tutte le pagine o solo alcune di un PDF di 90, 180 o 270 gradi e salva il risultato. Funziona nel tuo browser. Gratis, senza caricamento, senza filigrana.",
    h1: "Ruotare le pagine di un PDF",
    intro: "Sistema le pagine storte o capovolte. Ruota tutto il documento o solo le pagine che scegli, poi salva un nuovo PDF.",
    actionLabel: "Salva PDF ruotato",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Ruota tutte le pagine con i pulsanti in alto, oppure passa il mouse su una pagina e ruota solo quella.",
      "Fai clic su Salva PDF ruotato. Il file viene scaricato subito.",
    ],
    faq: [
      {
        q: "La rotazione è permanente?",
        a: "Sì. A differenza del pulsante di rotazione di un lettore PDF, che cambia solo la visualizzazione, questo strumento scrive la rotazione nel file. La pagina si apre con il nuovo orientamento in ogni lettore e su ogni dispositivo.",
      },
      {
        q: "Posso ruotare una sola pagina?",
        a: "Sì. Passa il mouse sulla miniatura di una pagina e usa i suoi pulsanti di rotazione. Ogni pagina può avere la sua rotazione. I pulsanti in alto ruotano tutte le pagine insieme.",
      },
      {
        q: "Ruotare riduce la qualità?",
        a: "No. Lo strumento cambia una sola proprietà della pagina. Il contenuto non viene renderizzato di nuovo né compresso, quindi la qualità è identica.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["ruotare pdf", "ruota pdf", "ruotare pagine pdf", "girare pdf", "ruotare pdf e salvare", "ruotare pdf online gratis"],
  },

  // ---- organize ----
  {
    id: "organize-pdf",
    slug: "riordinare-pagine-pdf",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "Riordinare pagine PDF",
    navLabel: "Riordinare",
    title: "Riordinare pagine PDF – Sposta ed elimina pagine online, gratis",
    description:
      "Trascina le pagine di un PDF in un nuovo ordine, elimina quelle inutili e scarica il risultato. Funziona nel tuo browser. Gratis, privato, senza caricamento.",
    h1: "Riordinare le pagine di un PDF",
    intro: "Riordina le pagine trascinandole, elimina quelle che non ti servono e salva un nuovo PDF pulito. Nulla lascia il tuo dispositivo.",
    actionLabel: "Salva PDF riordinato",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Trascina le pagine in un nuovo ordine. Passa il mouse su una pagina per eliminarla o ruotarla.",
      "Fai clic su Salva PDF riordinato. Il file viene scaricato subito.",
    ],
    faq: [
      {
        q: "Come elimino le pagine da un PDF?",
        a: "Passa il mouse sulla pagina e fai clic sull'icona del cestino. La pagina viene tolta dal risultato. Le pagine eliminate non sono nel file salvato, quindi il file diventa più piccolo.",
      },
      {
        q: "Posso riordinare le pagine dal telefono?",
        a: "Sì. Tieni premuta una pagina, poi trascinala nella nuova posizione. Da tastiera, raggiungi una pagina con Tab, premi Spazio, spostala con le frecce e premi di nuovo Spazio.",
      },
      {
        q: "Ho eliminato la pagina sbagliata. Posso annullare?",
        a: "Sì. Usa il pulsante Annulla che compare dopo un'eliminazione, oppure fai clic su Ripristina per tornare all'ordine originale con tutte le pagine.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: ["riordinare pagine pdf", "eliminare pagine pdf", "organizzare pdf", "spostare pagine pdf", "cambiare ordine pagine pdf", "rimuovere pagine da pdf", "cancellare pagine pdf"],
  },

  // ---- images to PDF: one component, five pages ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 12, // "jpg in pdf"
    name: "JPG in PDF",
    navLabel: "JPG in PDF",
    title: "JPG in PDF – Convertire immagini JPG in PDF online, gratis",
    description:
      "Trasforma foto e scansioni JPG in un solo PDF nel tuo browser. Scegli A4, Lettera o adatta all'immagine. Gratis, senza caricamento, senza account, senza filigrana.",
    h1: "Convertire JPG in PDF",
    intro:
      "Trasforma un JPG o un'intera serie di foto in un solo PDF. Scegli il formato pagina e trascina le immagini nell'ordine che vuoi. Le tue foto non lasciano mai il tuo dispositivo.",
    actionLabel: "Crea PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Il PDF mantiene tutta la qualità del mio JPG?",
        a: "Sì. I dati del JPG vengono inseriti nel PDF così come sono, senza una nuova compressione. Una foto da 12 megapixel resta una foto da 12 megapixel. Il PDF pesa più o meno quanto le immagini messe insieme.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "La foto del telefono esce girata. Perché?",
        a: "Alcuni telefoni salvano la rotazione come etichetta nascosta invece di girare i pixel. Questa versione non legge ancora quell'etichetta. Apri la foto in un qualsiasi editor, salvala una volta e aggiungila di nuovo.",
      },
      {
        q: "Posso mescolare JPG con file PNG o WebP?",
        a: "Sì. Lo stesso strumento accetta JPG, PNG e WebP insieme. Ogni immagine diventa una pagina.",
      },
      PRIVACY_FAQ,
      {
        q: "Convertire JPG in PDF qui è gratis?",
        a: "Sì. È gratis, senza limite al numero di immagini e senza filigrana. Il PDF viene creato nel tuo browser, quindi le tue foto non vengono caricate. Non serve un account.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: ["jpg in pdf", "convertire jpg in pdf", "da jpg a pdf", "jpeg in pdf", "foto in pdf", "trasformare jpg in pdf", "jpg in pdf online gratis"],
  },
  {
    id: "png-to-pdf",
    slug: "png-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 19,
    name: "PNG in PDF",
    navLabel: "PNG in PDF",
    title: "PNG in PDF – Convertire immagini PNG in PDF online, gratis",
    description:
      "Converti screenshot, diagrammi e grafiche PNG in un PDF senza perdere qualità. La trasparenza viene mantenuta. Gratis, nel tuo browser, senza caricamento.",
    h1: "Convertire PNG in PDF",
    intro:
      "Trasforma immagini PNG in un PDF senza perdita di qualità. Screenshot, grafici e loghi con trasparenza funzionano tutti. Tutto avviene nel tuo browser.",
    actionLabel: "Crea PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "PNG in PDF è senza perdita?",
        a: "Sì. PNG è un formato senza perdita e il PDF incorpora i dati PNG senza modificarli. Il testo degli screenshot resta nitido e i colori non cambiano.",
      },
      {
        q: "Cosa succede alla trasparenza?",
        a: "Il PDF mantiene il canale alfa. Le aree trasparenti mostrano lo sfondo della pagina, che nella maggior parte dei lettori è bianco. Nulla viene appiattito o riempito.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Qual è il formato pagina migliore per gli screenshot?",
        a: "Usa «Adatta all'immagine», così ogni pagina ha le dimensioni esatte in pixel dello screenshot e nessun margine. Usa A4 o Lettera (Letter) se vuoi stampare le pagine.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png in pdf", "convertire png in pdf", "da png a pdf", "png in pdf online gratis", "screenshot in pdf"],
  },
  {
    id: "webp-to-pdf",
    slug: "webp-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 22,
    name: "WebP in PDF",
    navLabel: "WebP in PDF",
    title: "WebP in PDF – Convertire immagini WebP in PDF online, gratis",
    description:
      "Converti immagini WebP in un PDF nel tuo browser. Nessun programma, nessun caricamento, nessun account. Metti insieme molti file WebP in un solo documento, gratis.",
    h1: "Convertire WebP in PDF",
    intro: "Le immagini WebP prese dal web non si aprono in molti strumenti PDF. Questo le converte nel tuo browser e le mette insieme in un solo PDF.",
    actionLabel: "Crea PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Come viene convertito il WebP?",
        a: "Il browser decodifica l'immagine WebP e lo strumento salva i pixel come PNG dentro il PDF. Quel passaggio è senza perdita, quindi il PDF è identico al WebP originale.",
      },
      {
        q: "Perché altri strumenti rifiutano i miei file WebP?",
        a: "Il formato PDF non supporta WebP in modo nativo, e molti convertitori gestiscono solo JPG e PNG. PDF Anvil usa il decodificatore del browser stesso, che supporta WebP in ogni browser moderno.",
      },
      {
        q: "Il WebP animato funziona?",
        a: "Viene usato solo il primo fotogramma. Una pagina PDF è un'immagine fissa.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["png-to-pdf", "jpg-to-pdf", "image-to-pdf"],
    keywords: ["webp in pdf", "convertire webp in pdf", "da webp a pdf", "webp in pdf online gratis"],
  },
  {
    id: "image-to-pdf",
    slug: "immagine-in-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 5, // "immagine in pdf"; the general term is the nav page, as in English
    name: "Immagine in PDF",
    navLabel: "Immagine in PDF",
    title: "Immagine in PDF – Convertire JPG, PNG e WebP in PDF gratis",
    description:
      "Converti qualsiasi immagine in un PDF: JPG, PNG e WebP, anche mescolati. Scegli formato pagina e ordine. Gratis, privato, nel tuo browser, senza caricamento.",
    h1: "Convertire immagini in PDF",
    intro:
      "Metti insieme immagini JPG, PNG e WebP in un solo PDF. Mescola i formati liberamente, scegli un formato pagina e trascina le immagini nell'ordine che vuoi. Nulla lascia il tuo dispositivo.",
    actionLabel: "Crea PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Quali formati di immagine funzionano?",
        a: "JPG, PNG e WebP. JPG e PNG vengono incorporati così come sono. WebP viene decodificato e convertito in PNG prima di essere aggiunto. Puoi mescolare tutti e tre nello stesso PDF.",
      },
      {
        q: "Posso fare un PDF con le foto del telefono?",
        a: "Sì. Apri questa pagina sul telefono, tocca il riquadro e scegli le foto dalla galleria. Il PDF viene creato sul telefono e salvato nei download.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Il PDF mantiene tutta la risoluzione delle mie immagini?",
        a: "Sì. I dati dell'immagine vengono incorporati senza ricampionamento. Questo significa anche che il PDF pesa più o meno quanto le immagini messe insieme.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: ["immagine in pdf", "convertire immagine in pdf", "immagini in pdf", "da immagine a pdf", "foto in pdf", "convertire in pdf", "creare pdf", "immagine in pdf online gratis"],
  },
  {
    id: "scan-to-pdf",
    slug: "scansionare-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 21,
    name: "Scansionare in PDF",
    navLabel: "Scansionare in PDF",
    title: "Scansionare documenti in PDF online – Con la fotocamera del telefono, gratis",
    description:
      "Scansiona documenti in PDF con la fotocamera del telefono o con foto che hai già. Ordina le pagine e scegli A4 o Lettera. Gratis, privato, nulla viene caricato.",
    h1: "Scansionare documenti in PDF",
    intro:
      "Scatta una foto di ogni pagina con la fotocamera del telefono, oppure aggiungi foto che hai già. Metti le pagine in ordine e ottieni un solo PDF. Nulla viene caricato.",
    actionLabel: "Crea PDF",
    steps: [
      "Tocca Scatta una foto e fotografa la prima pagina. Oppure tocca il riquadro per aggiungere foto che hai già.",
      "Ripeti per ogni pagina. Trascina le pagine nell'ordine che vuoi e scegli un formato pagina.",
      "Tocca Crea PDF. Il file viene scaricato subito.",
    ],
    faq: [
      {
        q: "Come scansiono un documento con il telefono?",
        a: "Apri questa pagina sul telefono. Tocca Scatta una foto. Si apre la fotocamera. Fotografa la prima pagina e confermala. Tocca di nuovo Scatta una foto per la pagina successiva. Quando tutte le pagine sono nell'elenco, tocca Crea PDF. Il PDF viene salvato sul telefono.",
      },
      {
        q: "Posso usarlo su un computer?",
        a: "Sì. Su un computer, il pulsante Scatta una foto apre la normale finestra di scelta dei file. Scegli foto o scansioni che hai già sul computer, mettile in ordine e crea il PDF.",
      },
      {
        q: "Le mie foto vengono caricate su un server?",
        a: "No. La foto passa dalla fotocamera del telefono alla pagina nel tuo browser. Anche il PDF viene creato lì. Non ci viene inviato nulla. Puoi scollegarti da internet una volta aperta la pagina e lo strumento continua a funzionare.",
      },
      {
        q: "Come ottengo pagine dritte e leggibili?",
        a: "Metti il documento su una superficie piana con uno sfondo uniforme. Usa una buona luce ed evita le ombre della mano o del telefono. Tieni il telefono parallelo alla pagina e riempi l'inquadratura con la pagina. Tocca lo schermo per mettere a fuoco prima di scattare. Lo strumento non ritaglia e non raddrizza la foto.",
      },
      {
        q: "Quale formato pagina devo scegliere?",
        a: "Scegli A4 o Lettera (Letter) per avere pagine normali da stampare, con la foto centrata. A4 è il formato predefinito. Scegli «Adatta all'immagine» per dare a ogni pagina le dimensioni esatte della foto, senza margini.",
      },
      {
        q: "Posso scansionare molte pagine in un solo PDF?",
        a: "Sì. Scatta una foto per pagina. Ogni foto diventa una pagina, nell'ordine dell'elenco. Non c'è limite di pagine. Trascina una pagina in alto o in basso per cambiare l'ordine.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: ["scansionare in pdf", "scansionare documenti in pdf", "scansione pdf con telefono", "scanner pdf gratis", "fotocamera in pdf", "scannerizzare in pdf"],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF to images: one component, three pages ----
  {
    id: "pdf-to-jpg",
    slug: "pdf-in-jpg",
    kind: "pdf-to-images",
    nav: false,
    priority: 13,
    name: "PDF in JPG",
    navLabel: "PDF in JPG",
    title: "PDF in JPG – Convertire le pagine di un PDF in immagini JPG online",
    description:
      "Esporta ogni pagina di un PDF come immagine JPG a 72, 150 o 300 DPI. Funziona nel tuo browser. Gratis, privato, senza caricamento, senza filigrana, senza limiti.",
    h1: "Convertire PDF in JPG",
    intro: "Salva ogni pagina di un PDF come immagine JPG. Scegli la risoluzione, seleziona le pagine e scarica una sola immagine o tutte in uno ZIP.",
    actionLabel: "Converti in immagini",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Come salvo un PDF come JPG?",
        a: "Aggiungi il PDF a questa pagina. Lascia JPG come formato e scegli una risoluzione. Fai clic su Converti in immagini. Ogni pagina viene salvata come file JPG. Scaricale una per una o tutte insieme in uno ZIP.",
      },
      DPI_FAQ,
      {
        q: "Quando scegliere JPG invece di PNG?",
        a: "JPG è più leggero e ideale per foto e pagine scansionate. Passa a PNG per testo, diagrammi e screenshot, dove contano i bordi nitidi.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Il JPG contiene tutta la pagina?",
        a: "Sì. Viene renderizzata l'intera pagina, con immagini, grafica vettoriale e testo, esattamente come la mostra un lettore PDF. I campi dei moduli e le annotazioni sono inclusi così come appaiono.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf in jpg", "convertire pdf in jpg", "da pdf a jpg", "salvare pdf come jpg", "pdf in jpeg", "pdf in jpg online gratis", "pagina pdf in jpg"],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-in-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 20,
    name: "PDF in PNG",
    navLabel: "PDF in PNG",
    title: "PDF in PNG – Convertire le pagine di un PDF in immagini PNG online",
    description:
      "Esporta le pagine di un PDF come immagini PNG senza perdita a 72, 150 o 300 DPI. Testo e diagrammi nitidi. Nel tuo browser. Gratis, privato, senza caricamento.",
    h1: "Convertire PDF in PNG",
    intro:
      "Salva le pagine di un PDF come immagini PNG senza perdita. Testo, diagrammi e screenshot restano nitidi. Scegli la risoluzione e le pagine, poi scaricale.",
    actionLabel: "Converti in immagini",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Perché scegliere PNG invece di JPG?",
        a: "PNG è senza perdita. I bordi del testo, le linee sottili e i colori uniformi restano esatti, senza artefatti di compressione. È la scelta giusta per presentazioni, diagrammi, moduli e tutto ciò che vuoi continuare a modificare.",
      },
      DPI_FAQ,
      {
        q: "Lo sfondo del PNG è trasparente?",
        a: "No. Le pagine di un PDF hanno lo sfondo bianco per definizione, e il PNG lo mantiene. Usa un editor di immagini se devi rimuoverlo.",
      },
      {
        q: "A quale risoluzione converto per la stampa?",
        a: "Usa 300 DPI. È la risoluzione normale di stampa e il PNG conserva ogni pixel. Per schermi e presentazioni, 150 DPI dà file più piccoli con una buona nitidezza.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf in png", "convertire pdf in png", "da pdf a png", "pdf in png online gratis", "pdf in png alta risoluzione"],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-in-immagine",
    kind: "pdf-to-images",
    nav: true,
    priority: 6,
    name: "PDF in immagine",
    navLabel: "PDF in immagine",
    title: "PDF in immagine – Convertire le pagine di un PDF in JPG o PNG online",
    description:
      "Converti le pagine di un PDF in immagini. Scegli JPG o PNG e 72, 150 o 300 DPI. Seleziona le pagine che ti servono. Gratis, nel tuo browser, senza caricamento.",
    h1: "Convertire PDF in immagini",
    intro:
      "Trasforma le pagine di un PDF in file immagine. Scegli JPG per foto e scansioni o PNG per testo e diagrammi, imposta la risoluzione e scarica le pagine che ti servono.",
    actionLabel: "Converti in immagini",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG o PNG?",
        a: "JPG è più leggero e ideale per foto e pagine scansionate. PNG è senza perdita e ideale per testo, diagrammi e screenshot, dove contano i bordi nitidi.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Posso avere una sola immagine di tutto il documento?",
        a: "Ogni pagina diventa un'immagine a sé. Se ti serve una sola immagine alta, converti le pagine e uniscile in un editor di immagini.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf in immagine", "convertire pdf in immagine", "da pdf a immagine", "pdf in foto", "pagina pdf in immagine", "pdf in immagine online gratis"],
  },

  // ---- compress: one component, two pages ----
  {
    id: "compress-pdf",
    slug: "comprimere-pdf",
    kind: "compress",
    nav: true,
    priority: 2, // "comprimere pdf"
    name: "Comprimere PDF",
    navLabel: "Comprimere",
    title: "Comprimere PDF online – Riduci le dimensioni gratis, senza caricare nulla",
    description:
      "Comprimi un PDF nel tuo browser. Scegli senza perdita, bilanciato o minimo. Le foto grandi vengono ricodificate, il testo resta nitido. Gratis, senza caricamento.",
    h1: "Comprimere un PDF",
    intro:
      "Rendi un PDF più leggero. Scegli un livello, un clic e scarica. Testo e grafica vettoriale restano nitidi. Il file non lascia mai il tuo dispositivo.",
    actionLabel: "Comprimi PDF",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Scegli un livello. Senza perdita conserva ogni pixel. Bilanciato è la scelta migliore per la maggior parte dei file. Minimo dà il file più piccolo.",
      "Fai clic su Comprimi PDF. Lo strumento mostra la dimensione prima e dopo, e il file viene scaricato subito.",
    ],
    faq: [
      {
        q: "Di quanto si ridurrà il mio PDF?",
        a: "Dipende da cosa contiene il file. Un PDF pieno di foto grandi o scansioni può ridursi dal 50 al 90 per cento con il livello Bilanciato. Un PDF che contiene solo testo e grafica vettoriale si riduce molto meno, spesso dal 5 al 20 per cento, perché non c'è nulla di grande da ricodificare. Lo strumento mostra la dimensione prima e dopo a ogni esecuzione.",
      },
      {
        q: "Quale livello devo scegliere?",
        a: "Bilanciato è la scelta migliore per la maggior parte dei file. Limita le immagini a 1600 pixel sul lato lungo, che è nitido su schermo e va bene per una stampa normale. Scegli Minimo per gli allegati email e i limiti di caricamento. Limita le immagini a 1100 pixel e usa una compressione JPEG più forte. Scegli Senza perdita quando le immagini devono restare esattamente come sono. Pulisce solo la struttura del file e rimuove i dati inutilizzati.",
      },
      {
        q: "La compressione riduce la qualità del testo?",
        a: "No. Testo, font, linee e grafica vettoriale non vengono modificati a nessun livello. Vengono ricodificate solo le foto e le scansioni grandi, e solo nei livelli Bilanciato e Minimo. Se la nuova immagine non è più piccola della vecchia, viene mantenuta la vecchia.",
      },
      {
        q: "Perché il mio file non è diventato più piccolo?",
        a: "Alcuni file sono già piccoli quanto possono essere. Le loro immagini sono già JPEG piccoli, oppure il file non ha immagini, solo testo e forme vettoriali. Anche i file che un altro strumento ha già compresso cambiano poco. In quel caso lo strumento ti dice che il file era già compatto.",
      },
      {
        q: "Quali immagini comprime lo strumento?",
        a: "Immagini JPEG, e immagini RGB e in scala di grigi non compresse o compresse con Flate, che pesano almeno 64 KB e misurano almeno 200 pixel in larghezza o in altezza. Le immagini con trasparenza, colori indicizzati, CMYK o spazi colore insoliti vengono mantenute così come sono, così i colori restano corretti.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["comprimere pdf", "comprimi pdf", "comprimere pdf online", "comprimere pdf gratis", "compressore pdf", "ridurre pdf", "alleggerire pdf", "comprimere pdf senza perdere qualità"],
  },
  {
    // Variant of "compress" for "ridurre dimensioni pdf" / "ridurre peso pdf".
    id: "reduce-pdf-size",
    slug: "ridurre-dimensioni-pdf",
    kind: "compress",
    nav: false,
    priority: 16,
    name: "Ridurre dimensioni PDF",
    navLabel: "Ridurre dimensioni",
    title: "Ridurre le dimensioni di un PDF online – Gratis, senza caricare nulla",
    description:
      "Riduci le dimensioni di un PDF per inviarlo via email o caricarlo su un portale. Nel tuo browser, con tre livelli e dimensione prima e dopo. Gratis, senza account.",
    h1: "Ridurre le dimensioni di un PDF",
    intro:
      "Porta un PDF sotto il limite di un'email o di un portale. Scegli quanto deve ridursi, un clic e vedi la dimensione prima e dopo. Il PDF resta sul tuo dispositivo.",
    actionLabel: "Riduci dimensioni",
    steps: [
      "Aggiungi il tuo PDF. Trascinalo nel riquadro, oppure fai clic per sceglierlo.",
      "Scegli un livello. Inizia con Bilanciato. Se il file è ancora troppo grande, elaboralo di nuovo con Minimo.",
      "Fai clic su Riduci dimensioni. Lo strumento mostra la percentuale risparmiata, e il file più leggero viene scaricato subito.",
    ],
    faq: [
      {
        q: "Come riduco le dimensioni di un PDF?",
        a: "Aggiungi il PDF a questa pagina e scegli un livello. Fai clic su Riduci dimensioni. Lo strumento riscrive il file, rimuove i dati inutilizzati e rimpicciolisce le foto grandi. Il nuovo PDF viene scaricato subito, e la pagina mostra la dimensione prima e dopo.",
      },
      {
        q: "Come porto un PDF sotto 1 MB o sotto 5 MB?",
        a: "Elabora il file con il livello Bilanciato e guarda la nuova dimensione. Se è ancora sopra il limite, elaboralo di nuovo con Minimo. Se il file è ancora troppo grande, contiene molte pagine di immagini. Dividilo in parti con lo strumento Dividere PDF e invia ogni parte.",
      },
      {
        q: "Ridurre le dimensioni cambia il testo?",
        a: "No. Testo e grafica vettoriale vengono copiati così come sono. Vengono rimpicciolite solo le foto e le scansioni grandi. Il testo resta nitido su schermo e in stampa.",
      },
      {
        q: "Perché il mio PDF è così pesante?",
        a: "Nella maggior parte dei casi il file contiene foto o pagine scansionate a una risoluzione molto alta. Una pagina scansionata a 600 DPI può occupare diversi megabyte. Il livello Bilanciato limita le immagini a 1600 pixel sul lato lungo, che basta per leggere e per una stampa normale.",
      },
      {
        q: "Ridurre le dimensioni di un PDF qui è gratis?",
        a: "Sì. Non costa nulla, non serve un account, non c'è filigrana e non c'è limite al numero di file. Il PDF viene elaborato nel tuo browser e non viene mai caricato.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["ridurre dimensioni pdf", "ridurre dimensione pdf", "ridurre peso pdf", "rimpicciolire pdf", "ridurre pdf online gratis", "pdf più leggero"],
  },

  // ---- passwords ----
  {
    id: "unlock-pdf",
    slug: "sbloccare-pdf",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "Sbloccare PDF",
    navLabel: "Sbloccare",
    title: "Sbloccare PDF – Rimuovere la password da un PDF online, gratis",
    description:
      "Rimuovi la password da un PDF quando la conosci. Digitala, un clic e ottieni una copia che si apre senza password. Gratis, nel tuo browser, senza caricare nulla.",
    h1: "Sbloccare un PDF",
    intro:
      "Rimuovi la password da un PDF. Digita la password che conosci, un clic e scarica una copia che si apre senza password. Il file resta sul tuo dispositivo.",
    actionLabel: "Sblocca PDF",
    steps: [
      "Trascina un PDF protetto da password nel riquadro, oppure fai clic per sceglierlo.",
      "Digita la password del file. Va bene sia la password che apre il file sia la password del proprietario.",
      "Fai clic su Sblocca PDF. Una copia senza password e senza limiti viene scaricata subito.",
    ],
    faq: [
      {
        q: "Ho dimenticato la password. Potete rimuoverla?",
        a: "No. Lo strumento ha bisogno della password. Non indovina, non forza e non aggira le password. Un PDF con crittografia AES non può essere aperto senza la password corretta. Se non la conosci, chiedila a chi ha creato il file.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Quale password devo digitare qui?",
        a: "Una delle due. Se conosci solo la password che apre il file, digita quella. Se conosci la password del proprietario, digita quella. Il risultato non ha password né limiti.",
      },
      {
        q: "Perché il mio PDF non si apre qui?",
        a: "Le cause comuni sono tre. La password non è corretta: controlla maiuscole e spazi, e riprova. Il file è danneggiato: aprilo in un lettore PDF per verificarlo. Il file usa un certificato o un sistema di gestione dei diritti digitali invece di una password: lo strumento non può aprire quei file.",
      },
      {
        q: "Posso rimuovere solo i limiti e tenere la password di apertura?",
        a: "No. Il risultato non ha nessuna password. Per impostare una nuova password, apri il risultato nello strumento Proteggere PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: ["sbloccare pdf", "sblocca pdf", "rimuovere password pdf", "togliere password pdf", "eliminare password pdf", "pdf senza password", "sbloccare pdf online gratis"],
  },
  {
    id: "protect-pdf",
    slug: "proteggere-pdf",
    kind: "protect",
    nav: true,
    priority: 9,
    name: "Proteggere PDF",
    navLabel: "Proteggere",
    title: "Proteggere PDF – Mettere una password a un PDF online, gratis",
    description:
      "Metti una password a un PDF con crittografia AES-256 nel tuo browser. Decidi chi può stampare, copiare o modificare. Gratis, senza caricamento, senza account.",
    h1: "Proteggere un PDF con password",
    intro:
      "Metti una password a un PDF. Il file viene crittografato con AES-256 nel tuo browser, e solo chi ha la password può aprirlo. Nulla viene caricato.",
    actionLabel: "Proteggi PDF",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Digita la password che apre il file. Imposta una password del proprietario e le autorizzazioni se ti servono.",
      "Fai clic su Proteggi PDF. Il file crittografato viene scaricato subito.",
    ],
    faq: [
      {
        q: "Quale crittografia usa lo strumento?",
        a: "AES-256, la crittografia più forte dello standard PDF (PDF 2.0). Ogni lettore PDF attuale la apre: Adobe Reader, Chrome, Edge, Firefox, Safari e Anteprima su Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "Cosa succede se lascio vuota la password del proprietario?",
        a: "Lo strumento usa la password che apre il file per entrambe. In quel caso le autorizzazioni non limitano chi conosce quella password. Imposta una password del proprietario diversa quando le autorizzazioni devono valere.",
      },
      {
        q: "A cosa servono le autorizzazioni?",
        a: "Dicono a un lettore PDF cosa può fare chi ha la password utente: stampare il file, copiare testo e immagini, modificare il file. Chi ha la password del proprietario può fare tutto. La maggior parte dei lettori rispetta le autorizzazioni, ma sono un segnale, non un lucchetto. La vera protezione è la password.",
      },
      {
        q: "Posso rimuovere la password più tardi?",
        a: "Sì. Apri il file nello strumento Sbloccare PDF e digita la password. Ottieni una copia senza password. Conserva la password in un posto sicuro. Senza, il file non si può aprire.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Quanto deve essere lunga la password?",
        a: "Usa almeno 12 caratteri con lettere, cifre e simboli. AES-256 è forte, ma un programma può indovinare una password corta. Non inviare la password nella stessa email del file.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: ["proteggere pdf", "proteggi pdf", "proteggere pdf con password", "mettere password a pdf", "crittografare pdf", "bloccare pdf", "proteggere pdf online gratis"],
  },

  // ---- viewer ----
  {
    id: "pdf-viewer",
    slug: "aprire-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Lettore PDF",
    navLabel: "Aprire",
    title: "Aprire PDF online – Lettore PDF gratis, senza caricare nulla",
    description:
      "Apri e leggi un file PDF nel tuo browser. Scorri le pagine, ingrandisci e stampa. Lettore PDF gratis, senza caricamento, senza account e senza installare Adobe.",
    h1: "Aprire e leggere un PDF",
    intro: "Apri un file PDF e leggilo nel tuo browser. Scorri le pagine, ingrandisci e stampa. Il file resta sul tuo dispositivo.",
    actionLabel: "Stampa",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo.",
      "Scorri le pagine. Usa la barra degli strumenti per andare a una pagina, ingrandire, ridurre o adattare la pagina alla larghezza della finestra.",
      "Fai clic su Stampa per aprire il file in una nuova scheda e stamparlo dal browser. Fai clic sulla X accanto al nome del file per aprirne un altro.",
    ],
    faq: [
      {
        q: "Come apro un file PDF senza Adobe?",
        a: "Trascina il file su questa pagina, oppure fai clic sul riquadro e sceglilo. Non ti servono Adobe Acrobat né Adobe Reader. La pagina disegna il PDF con lo stesso motore open source che usa Firefox. Funziona in Chrome, Edge, Firefox e Safari. Non c'è nulla da installare.",
      },
      {
        q: "Cos'è un lettore PDF?",
        a: "Un lettore PDF è un programma che apre i file PDF e mostra le pagine sullo schermo. Adobe Reader è un esempio. Anche la maggior parte dei browser ne ha uno integrato. Questa pagina è un lettore PDF che funziona come pagina web. Disegna ogni pagina nel tuo browser e non invia il file da nessuna parte.",
      },
      {
        q: "Il mio PDF viene caricato quando lo apro?",
        a: "No. Il file viene letto da JavaScript sul tuo dispositivo e disegnato lì, sul tuo schermo. Nulla viene inviato a un server. Puoi verificarlo nel pannello di rete del browser: nessuna richiesta trasporta il tuo file.",
      },
      {
        q: "Il lettore funziona offline?",
        a: "In gran parte sì. Il file si apre nel tuo browser e nessun dato va a un server. Il codice del lettore e alcuni font arrivano dal nostro sito la prima volta che servono. Apri la pagina e un file mentre sei online. Dopo puoi aprire altri file senza connessione, finché non chiudi la scheda.",
      },
      {
        q: "Posso stampare il PDF?",
        a: "Sì. Fai clic su Stampa nella barra degli strumenti. Il file si apre in una nuova scheda, nel lettore PDF del browser. Premi Ctrl+P (Cmd+P su Mac) lì per stamparlo. Il browser stampa il file originale, quindi il testo resta nitido su carta.",
      },
      {
        q: "Posso ingrandire?",
        a: "Sì. Usa i pulsanti più e meno nella barra degli strumenti, oppure fai clic su Adatta alla larghezza per far occupare alla pagina tutta la larghezza della finestra. Ogni pagina viene disegnata di nuovo alla nuova dimensione, quindi il testo resta nitido a ogni livello di zoom.",
      },
      {
        q: "Posso modificare il PDF qui?",
        a: "No. Questo strumento mostra solo il file. Per aggiungere testo, bianchetto, immagini o una firma sopra una pagina, usa lo strumento Modificare PDF. Per ruotare, riordinare, eliminare, dividere, unire o convertire pagine, usa gli altri strumenti di questo sito.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["aprire pdf", "aprire pdf online", "leggere pdf", "lettore pdf", "lettore pdf online", "visualizzatore pdf", "aprire pdf senza adobe", "leggere pdf online gratis"],
  },

  // ---- edit: one component, two pages ----
  {
    id: "edit-pdf",
    slug: "modificare-pdf",
    kind: "edit",
    nav: true,
    priority: 3, // "modificare pdf" + "editor pdf"
    name: "Modificare PDF",
    navLabel: "Modificare",
    title: "Modificare PDF online – Editor PDF gratis: testo, immagini e firma",
    description:
      "Modifica un PDF nel tuo browser: aggiungi testo, copri con il bianchetto, evidenzia, inserisci immagini e disegna la firma. Gratis, senza caricamento né account.",
    h1: "Modificare un PDF",
    intro:
      "Aggiungi testo, bianchetto, evidenziazioni, immagini e una firma disegnata sopra le pagine di un PDF. Lo strumento non cambia il testo già presente nel file; mette nuovo contenuto sopra. Tutto avviene nel tuo browser.",
    actionLabel: "Salva PDF",
    steps: [
      "Trascina un PDF nel riquadro, oppure fai clic per sceglierlo. Scegli una pagina nel pannello a sinistra.",
      "Scegli uno strumento nella barra. Fai clic sulla pagina per aggiungere una casella di testo, trascina per disegnare un bianchetto o un'evidenziazione, aggiungi un'immagine o disegna con la penna. Trascina un elemento per spostarlo, trascina l'angolo per ridimensionarlo e premi Canc per eliminarlo.",
      "Fai clic su Salva PDF. Il file modificato viene scaricato subito.",
    ],
    faq: [
      {
        q: "Cosa posso modificare in un PDF con questo strumento?",
        a: "Puoi mettere nuovo contenuto sopra qualsiasi pagina: caselle di testo, rettangoli bianchi (bianchetto), evidenziazioni gialle, immagini (PNG o JPG) e linee a mano libera disegnate con il mouse o con il dito. Puoi spostare, ridimensionare ed eliminare ogni elemento prima di salvare. Il contenuto originale della pagina resta sotto.",
      },
      {
        q: "Posso cambiare il testo già presente nel PDF?",
        a: "No. Questo strumento non modifica il testo esistente. Aggiunge nuovo contenuto sopra la pagina. Per sostituire una parola o un numero, disegna un bianchetto sopra e aggiungi una casella di testo. Il vecchio testo è coperto su schermo e su carta, ma resta nel file, quindi un programma che copia il testo dal PDF può ancora trovarlo.",
      },
      {
        q: "Come firmo un PDF?",
        a: "Scegli lo strumento Disegna e disegna la tua firma sulla pagina con il mouse, una penna o il dito. Oppure scegli Immagine e aggiungi una foto della tua firma come PNG o JPG. Sposta la firma nel punto giusto, ridimensionala e fai clic su Salva PDF. La pagina Firmare PDF parte con lo strumento Disegna già selezionato.",
      },
      {
        q: "Il mio PDF viene caricato su un server?",
        a: "No. Il file viene aperto da JavaScript sul tuo dispositivo. Le modifiche vengono disegnate nel file con la libreria open source pdf-lib nel tuo browser. Non ci viene inviato nulla. Puoi scollegarti da internet una volta aperta la pagina e lo strumento continua a funzionare.",
      },
      {
        q: "Quali font posso usare?",
        a: "Helvetica, Times e Courier. Sono i font standard del PDF, quindi il file resta piccolo e ogni lettore PDF li mostra senza bisogno di un font incorporato. Puoi impostare la dimensione e il colore di ogni casella di testo.",
      },
      {
        q: "Perché un carattere speciale appare come punto interrogativo?",
        a: "I font standard del PDF contengono le lettere latine delle lingue dell'Europa occidentale (il set WinAnsi), comprese le vocali accentate dell'italiano come à, è, é, ì, ò e ù. Un carattere fuori da quel set, come un ideogramma cinese, un'emoji o alcuni simboli, non può essere codificato, quindi lo strumento scrive un punto interrogativo al suo posto. Digita il testo con lettere dell'alfabeto latino, oppure aggiungilo come immagine.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: ["modificare pdf", "modifica pdf", "editor pdf", "editor pdf gratis", "modificare pdf online", "modificare pdf gratis", "come modificare un pdf gratis", "aggiungere testo a pdf", "coprire testo pdf"],
  },
  {
    id: "sign-pdf",
    slug: "firmare-pdf",
    kind: "edit",
    nav: false,
    priority: 14,
    name: "Firmare PDF",
    navLabel: "Firmare",
    title: "Firmare PDF online – Disegna la firma o usa un'immagine, gratis",
    description:
      "Firma un PDF nel tuo browser. Disegna la firma con il mouse o il dito, oppure usa un'immagine, posizionala e salva. Gratis, senza caricamento, senza account.",
    h1: "Firmare un PDF",
    intro:
      "Disegna la tua firma sulla pagina, oppure aggiungi un'immagine della firma. Spostala nel punto giusto, ridimensionala e salva il file. Il PDF non lascia il tuo dispositivo.",
    actionLabel: "Salva PDF",
    steps: [
      "Trascina il PDF nel riquadro, oppure fai clic per sceglierlo. Scegli la pagina da firmare nel pannello a sinistra.",
      "Lo strumento Disegna è già selezionato. Disegna la tua firma sulla pagina con il mouse, una penna o il dito. Oppure fai clic su Immagine e scegli un PNG o un JPG della tua firma. Trascinala al posto giusto e trascina l'angolo per ridimensionarla. Usa lo strumento Testo per aggiungere la data o il tuo nome.",
      "Fai clic su Salva PDF. Il file firmato viene scaricato subito.",
    ],
    faq: [
      {
        q: "Come firmo un PDF senza stamparlo?",
        a: "Aggiungi il PDF e disegna la tua firma sulla pagina con lo strumento Disegna. Puoi usare il mouse, una penna o il dito su uno schermo touch. Sposta e ridimensiona la firma, poi fai clic su Salva PDF. La firma diventa parte della pagina. Non servono né stampante né scanner.",
      },
      {
        q: "Posso usare una foto della mia firma?",
        a: "Sì. Firma su un foglio bianco, fotografalo o scansionalo e salvalo come PNG o JPG. Fai clic su Immagine, scegli il file e posizionalo sulla pagina. Un PNG con lo sfondo trasparente rende meglio. L'immagine viene incorporata nel PDF a piena qualità.",
      },
      {
        q: "È una firma elettronica con valore legale?",
        a: "Lo strumento disegna un'immagine della tua firma nella pagina. Non aggiunge un certificato digitale e non verifica chi ha firmato. Molti accordi accettano una firma disegnata, ma le regole cambiano da paese a paese e da contratto a contratto. Se l'altra parte richiede una firma basata su certificato, usa un servizio che la rilascia.",
      },
      {
        q: "Posso firmare dal telefono?",
        a: "Sì. La pagina funziona nel browser di un telefono o di un tablet. Disegna con il dito o con un pennino. Ingrandisci con due dita nel browser se il campo è piccolo. Il file resta sul telefono.",
      },
      {
        q: "Posso aggiungere la data accanto alla firma?",
        a: "Sì. Scegli lo strumento Testo, fai clic sulla pagina e digita la data. Puoi impostare la dimensione e il colore del font. Trascina la casella di testo accanto alla firma.",
      },
      {
        q: "Il mio documento firmato viene caricato?",
        a: "No. Il PDF e la firma restano nel tuo browser. La firma viene disegnata nel file da JavaScript sul tuo dispositivo. Non ci viene inviato nulla.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: ["firmare pdf", "firma pdf", "firmare pdf online", "firmare pdf gratis", "aggiungere firma a pdf", "inserire firma in pdf", "mettere la firma su un pdf", "firmare documento pdf"],
    defaults: { tool: "draw" },
  },
];
