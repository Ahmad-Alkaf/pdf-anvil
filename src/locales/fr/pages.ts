// French tool pages. Slugs follow the most searched French phrase (Bing,
// 3 months, 2026). Ids mirror the English slugs; "edit:editeur" is the one
// locale-only variant. See NOTES.md for the choices.
// French typography: a non-breaking space (U+00A0) sits before : ; ? ! % and
// inside the « » quotes.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "Mes fichiers sont-ils téléversés sur un serveur ?",
  a: "Non. PDF Anvil fonctionne entièrement dans votre navigateur. Votre fichier est ouvert par JavaScript sur votre propre appareil, et le résultat y est aussi construit. Rien ne nous est envoyé. Vous pouvez couper votre connexion Internet une fois la page chargée : l'outil fonctionne toujours.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Y a-t-il une limite de taille ou une limite journalière ?",
  a: "Non. Il n'y a ni limite de pages, ni limite de nombre de fichiers, ni quota journalier. La seule limite est la mémoire de votre appareil. Les fichiers de plus de 100 Mo affichent un avertissement, mais ils fonctionnent sur la plupart des ordinateurs.",
};

const FREE_FAQ: ToolFaq = {
  q: "Est-ce vraiment gratuit ? Faut-il un compte ?",
  a: "Oui, c'est gratuit, et il n'y a pas de compte. Pas d'inscription, pas d'e-mail, pas de filigrane, pas de version premium. PDF Anvil est un projet parallèle de KafLabs, fait pour être utile.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Déposez une ou plusieurs images dans la zone, ou cliquez pour les choisir.",
  "Faites glisser les images dans l'ordre voulu et choisissez une taille de page.",
  "Cliquez sur Créer le PDF. Le fichier se télécharge aussitôt.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "Que signifie « Ajuster à l'image » ?",
  a: "Chaque page prend la taille exacte de son image, sans marges. Utilisez ce réglage pour les scans et les captures d'écran. Choisissez A4 ou Lettre US si vous voulez des pages imprimables classiques, avec l'image centrée.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Puis-je mettre plusieurs images dans un seul PDF ?",
  a: "Oui. Ajoutez autant d'images que vous voulez. Chaque image devient une page, dans l'ordre de la liste. Faites glisser une image vers le haut ou vers le bas pour changer l'ordre.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
  "Choisissez le format d'image et la résolution dont vous avez besoin.",
  "Cliquez sur Convertir en images. Un ZIP avec toutes les images se télécharge aussitôt. Vous pouvez aussi télécharger chaque image séparément.",
];

const DPI_FAQ: ToolFaq = {
  q: "Quelle résolution choisir ?",
  a: "72 DPI donne des fichiers légers, adaptés au web. 150 DPI est un bon réglage par défaut pour l'écran et les présentations. 300 DPI est fait pour l'impression. Plus le DPI est élevé, plus les fichiers sont lourds et plus la conversion est longue.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Puis-je convertir une seule page ?",
  a: "Oui. Une fois le fichier chargé, cliquez sur les pages voulues dans la grille. Seules les pages sélectionnées sont converties.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Mon PDF ou mon mot de passe sont-ils téléversés ?",
  a: "Non. Le fichier et le mot de passe restent dans votre navigateur. L'outil exécute le programme open source qpdf en WebAssembly sur votre propre appareil. Aucune requête ne transporte votre fichier ni votre mot de passe. Vous pouvez couper votre connexion Internet une fois la page chargée : l'outil fonctionne toujours.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Quelle est la différence entre le mot de passe utilisateur et le mot de passe propriétaire ?",
  a: "Un PDF peut avoir deux mots de passe. Le mot de passe utilisateur ouvre le fichier. Le mot de passe propriétaire donne un accès complet et lève les restrictions d'impression, de copie et de modification. Une visionneuse PDF n'applique les autorisations qu'à la personne qui ouvre le fichier avec le mot de passe utilisateur.",
};

export const pages: readonly LocalePage[] = [
  // ---- merge ----
  {
    id: "merge-pdf",
    slug: "fusionner-pdf",
    kind: "merge",
    nav: true,
    priority: 1, // "fusionner pdf" 136K
    name: "Fusionner PDF",
    navLabel: "Fusionner",
    title: "Fusionner PDF en ligne – Gratuit, privé, sans téléversement",
    description:
      "Fusionnez plusieurs fichiers PDF en un seul dans votre navigateur. Faites glisser pour choisir l'ordre. Gratuit, sans téléversement, sans compte, sans filigrane.",
    h1: "Fusionner des fichiers PDF",
    intro: "Regroupez deux PDF ou plus en un seul fichier. Faites glisser les fichiers dans l'ordre voulu. Tout se passe dans votre navigateur.",
    actionLabel: "Fusionner les PDF",
    steps: [
      "Déposez deux fichiers PDF ou plus dans la zone, ou cliquez pour les choisir.",
      "Faites glisser les fichiers dans l'ordre où ils doivent apparaître.",
      "Cliquez sur Fusionner les PDF. Le fichier fusionné se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Comment changer l'ordre des fichiers ?",
        a: "Faites glisser un fichier vers le haut ou vers le bas dans la liste, ou utilisez les boutons fléchés. Le PDF fusionné suit l'ordre de la liste, de haut en bas.",
      },
      {
        q: "La fusion change-t-elle la qualité des pages ?",
        a: "Non. Les pages sont copiées telles quelles. Les polices, les images et les graphiques vectoriels restent exactement les mêmes. L'outil ne refait aucun rendu et ne compresse rien.",
      },
      {
        q: "Puis-je fusionner des PDF protégés par mot de passe ?",
        a: "Pas directement. Retirez d'abord le mot de passe avec l'outil Déverrouiller PDF, puis fusionnez cette copie. Il vous faut le mot de passe du fichier.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: ["fusionner pdf", "fusionner des pdf", "fusion pdf", "fusionner pdf en ligne", "fusionner pdf gratuit", "regrouper pdf", "joindre pdf", "réunir pdf"],
  },
  {
    // Variant of "merge" for "combiner pdf" / "assembler pdf".
    id: "combine-pdf",
    slug: "combiner-pdf",
    kind: "merge",
    nav: false,
    priority: 14,
    name: "Combiner PDF",
    navLabel: "Combiner",
    title: "Combiner des PDF en ligne – Assembler plusieurs PDF en un seul, gratuit",
    description:
      "Combinez plusieurs fichiers PDF en un seul avec un outil gratuit qui fonctionne dans votre navigateur. Classez les fichiers, un clic, téléchargez. Sans compte.",
    h1: "Combiner des fichiers PDF",
    intro:
      "Assemblez deux fichiers PDF ou plus en un seul document. Ajoutez les fichiers, classez-les et téléchargez le résultat. Vos fichiers restent sur votre appareil.",
    actionLabel: "Combiner les PDF",
    steps: [
      "Ajoutez les fichiers PDF à combiner. Déposez-les dans la zone, ou cliquez pour les choisir.",
      "Mettez les fichiers dans le bon ordre. Faites-les glisser, ou utilisez les boutons fléchés.",
      "Cliquez sur Combiner les PDF. Votre navigateur construit un seul PDF et le télécharge.",
    ],
    faq: [
      {
        q: "Comment combiner plusieurs fichiers PDF en un seul ?",
        a: "Ouvrez cette page et ajoutez vos fichiers PDF. Classez-les. Cliquez sur Combiner les PDF. L'outil copie toutes les pages dans un nouveau PDF et le télécharge. Il n'y a aucun logiciel à installer.",
      },
      {
        q: "Cet outil pour combiner des PDF est-il gratuit ?",
        a: "Oui. Aucun coût, aucun compte, aucun filigrane, aucune limite de nombre de fichiers. Utilisez-le aussi souvent que vous voulez.",
      },
      {
        q: "Puis-je combiner des PDF sur mon téléphone ?",
        a: "Oui. Ouvrez cette page dans le navigateur de votre téléphone ou de votre tablette. Touchez la zone pour choisir les fichiers. Le PDF combiné est enregistré dans vos téléchargements.",
      },
      {
        q: "Quelle différence entre combiner, assembler et fusionner ?",
        a: "Aucune. Combiner, assembler, regrouper et fusionner veulent dire la même chose : mettre plusieurs fichiers PDF dans un seul. Cette page et la page Fusionner PDF utilisent le même outil.",
      },
      {
        q: "Les pages gardent-elles leur taille et leur qualité ?",
        a: "Oui. Chaque page est copiée telle quelle. Rien n'est rendu de nouveau ni compressé. Des pages de tailles différentes peuvent se suivre dans un même fichier.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: ["combiner pdf", "combiner des pdf", "assembler pdf", "assembler des pdf", "combiner pdf en ligne gratuit", "regrouper plusieurs pdf en un seul"],
  },

  // ---- split ----
  {
    id: "split-pdf",
    slug: "diviser-pdf",
    kind: "split",
    nav: true,
    priority: 5, // "diviser pdf" and "séparer pdf" together
    name: "Diviser PDF",
    navLabel: "Diviser",
    title: "Diviser ou séparer un PDF en ligne – Par page ou par plages, gratuit",
    description:
      "Divisez un PDF en fichiers séparés, un par page, ou par plages comme 1-3, 5, 8-. Fonctionne dans votre navigateur. Gratuit, privé, sans téléversement, sans limite.",
    h1: "Diviser un PDF",
    intro:
      "Transformez un PDF en plusieurs. Enregistrez chaque page dans son propre fichier, ou saisissez les plages de pages dont vous avez besoin. Votre fichier reste sur votre appareil.",
    actionLabel: "Diviser le PDF",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Choisissez « Chaque page » ou saisissez des plages de pages comme 1-3, 5, 8-.",
      "Cliquez sur Diviser le PDF. Un ZIP avec toutes les parties se télécharge aussitôt. Vous pouvez aussi télécharger chaque partie séparément.",
    ],
    faq: [
      {
        q: "Comment diviser un PDF en fichiers séparés ?",
        a: "Ajoutez le PDF et choisissez « Chaque page ». Cliquez sur Diviser le PDF. Chaque page devient un fichier PDF à part. Vous recevez tous les fichiers dans un ZIP, ou vous téléchargez chacun séparément.",
      },
      {
        q: "Comment écrire les plages de pages ?",
        a: "Séparez les éléments par des virgules. « 3 » est une page. « 1-3 » va de la page 1 à la page 3. « 8- » va de la page 8 à la fin. Chaque élément devient un fichier PDF à part. Exemple : 1-3, 5, 8- produit trois fichiers.",
      },
      {
        q: "Comment séparer un PDF en deux ?",
        a: "Regardez combien de pages contient le fichier. Choisissez « Plages de pages » et saisissez les deux moitiés, par exemple 1-10, 11- pour un PDF de 20 pages. Vous recevez deux fichiers.",
      },
      {
        q: "Pourquoi est-ce que je reçois un fichier ZIP ?",
        a: "Quand la division produit plusieurs fichiers, le navigateur ne peut pas en enregistrer plusieurs d'un coup sans demander à chaque fois. Le ZIP les contient tous. Vous pouvez aussi télécharger chaque fichier séparément depuis la liste des résultats.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["diviser pdf", "diviser un pdf", "séparer pdf", "séparer un pdf", "séparer pages pdf", "diviser pdf en ligne", "découper pdf", "scinder pdf", "diviser pdf gratuit"],
  },
  {
    // Variant of "split" for "extraire pages pdf" (the extract-pages angle).
    id: "extract-pdf-pages",
    slug: "extraire-pages-pdf",
    kind: "split",
    nav: false,
    priority: 18,
    name: "Extraire des pages PDF",
    navLabel: "Extraire des pages",
    title: "Extraire des pages d'un PDF en ligne – Gratuit, sans téléversement",
    description:
      "Extrayez les pages dont vous avez besoin dans un PDF et enregistrez-les dans un nouveau fichier. Saisissez les numéros ou les plages. Gratuit, dans votre navigateur.",
    h1: "Extraire des pages d'un PDF",
    intro:
      "Récupérez les pages dont vous avez besoin dans un PDF et enregistrez-les dans un nouveau fichier. Saisissez les numéros de page, un clic, téléchargez. Le PDF ne quitte pas votre appareil.",
    actionLabel: "Extraire les pages",
    steps: [
      "Ajoutez votre PDF. Déposez-le dans la zone, ou cliquez pour le choisir.",
      "Choisissez « Plages de pages » et saisissez les pages voulues, par exemple 2, 5-7, 10-. Ou choisissez « Chaque page » pour obtenir chaque page dans son propre fichier.",
      "Cliquez sur Extraire les pages. Chaque plage devient un PDF. Vous recevez un ZIP, ou vous téléchargez chaque fichier séparément.",
    ],
    faq: [
      {
        q: "Comment extraire des pages d'un PDF ?",
        a: "Ajoutez le PDF et choisissez « Plages de pages ». Saisissez les numéros des pages voulues. Cliquez sur Extraire les pages. Seules ces pages vont dans le nouveau fichier. Le PDF d'origine n'est pas modifié.",
      },
      {
        q: "Puis-je extraire une seule page d'un PDF ?",
        a: "Oui. Saisissez un seul numéro de page, par exemple 4. L'outil enregistre cette page dans un nouveau PDF d'une page.",
      },
      {
        q: "Puis-je enregistrer chaque page dans un PDF séparé ?",
        a: "Oui. Choisissez « Chaque page ». Chaque page devient un fichier PDF à part. Tous les fichiers arrivent dans un ZIP, et vous pouvez aussi les télécharger un par un.",
      },
      {
        q: "Puis-je extraire des pages qui ne se suivent pas ?",
        a: "Oui. Séparez les éléments par des virgules, par exemple 1, 4, 9-11. Chaque élément devient un fichier. Si vous les voulez toutes dans un seul fichier, extrayez-les d'abord, puis regroupez les fichiers avec l'outil Combiner PDF.",
      },
      {
        q: "Cet outil d'extraction de pages est-il gratuit ?",
        a: "Oui. Aucun coût, aucun compte, aucun filigrane, aucune limite de pages. Le PDF est traité dans votre navigateur et n'est jamais téléversé.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: ["extraire pages pdf", "extraire des pages d'un pdf", "extraire une page pdf", "extraire page pdf en ligne", "enregistrer des pages pdf dans un nouveau fichier", "extraire pages pdf gratuit"],
  },

  // ---- rotate ----
  {
    id: "rotate-pdf",
    slug: "pivoter-pdf",
    kind: "rotate",
    nav: true,
    priority: 10,
    name: "Pivoter PDF",
    navLabel: "Pivoter",
    title: "Pivoter un PDF en ligne – Faire pivoter les pages et enregistrer, gratuit",
    description:
      "Faites pivoter toutes les pages ou certaines pages d'un PDF de 90, 180 ou 270 degrés et enregistrez le résultat. Dans votre navigateur. Gratuit, sans filigrane.",
    h1: "Faire pivoter les pages d'un PDF",
    intro: "Redressez les pages de travers ou à l'envers. Faites pivoter tout le document ou seulement les pages de votre choix, puis enregistrez un nouveau PDF.",
    actionLabel: "Enregistrer le PDF pivoté",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Faites pivoter toutes les pages avec les boutons du haut, ou survolez une page pour ne faire pivoter que celle-ci.",
      "Cliquez sur Enregistrer le PDF pivoté. Le fichier se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "La rotation est-elle définitive ?",
        a: "Oui. Contrairement au bouton de rotation d'une visionneuse PDF, qui ne change que l'affichage, cet outil écrit la rotation dans le fichier. La page s'ouvre dans la nouvelle orientation dans toutes les visionneuses et sur tous les appareils.",
      },
      {
        q: "Puis-je pivoter une seule page ?",
        a: "Oui. Survolez la vignette d'une page et utilisez ses boutons de rotation. Chaque page peut avoir sa propre rotation. Les boutons du haut pivotent toutes les pages d'un coup.",
      },
      {
        q: "La rotation réduit-elle la qualité ?",
        a: "Non. L'outil modifie une seule propriété de la page. Le contenu n'est ni rendu de nouveau ni compressé, donc la qualité est identique.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["pivoter pdf", "faire pivoter pdf", "faire pivoter un pdf", "pivoter pages pdf", "tourner pdf", "retourner pdf", "pivoter pdf et enregistrer", "pivoter pdf en ligne gratuit"],
  },

  // ---- organize ----
  {
    id: "organize-pdf",
    slug: "reorganiser-pages-pdf",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "Réorganiser PDF",
    navLabel: "Réorganiser",
    title: "Réorganiser les pages d'un PDF – Réordonner et supprimer des pages en ligne",
    description:
      "Faites glisser les pages d'un PDF dans un nouvel ordre, supprimez celles dont vous n'avez pas besoin et téléchargez le résultat. Gratuit, privé, sans téléversement.",
    h1: "Réorganiser les pages d'un PDF",
    intro: "Réordonnez les pages en les faisant glisser, supprimez celles dont vous n'avez pas besoin et enregistrez un nouveau PDF propre. Rien ne quitte votre appareil.",
    actionLabel: "Enregistrer le PDF réorganisé",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Faites glisser les pages dans un nouvel ordre. Survolez une page pour la supprimer ou la pivoter.",
      "Cliquez sur Enregistrer le PDF réorganisé. Le fichier se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Comment supprimer des pages d'un PDF ?",
        a: "Survolez la page et cliquez sur l'icône de corbeille. La page est retirée du résultat. Les pages supprimées ne sont plus du tout dans le fichier enregistré, qui devient donc plus léger.",
      },
      {
        q: "Puis-je réordonner les pages sur mon téléphone ?",
        a: "Oui. Appuyez longuement sur une page, puis faites-la glisser vers sa nouvelle place. Au clavier, placez le focus sur une page, appuyez sur Espace, déplacez-la avec les flèches et appuyez de nouveau sur Espace.",
      },
      {
        q: "J'ai supprimé la mauvaise page. Puis-je annuler ?",
        a: "Oui. Utilisez le bouton Annuler qui apparaît après une suppression, ou cliquez sur Réinitialiser pour revenir à l'ordre d'origine avec toutes les pages.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: ["réorganiser pages pdf", "réorganiser un pdf", "organiser pdf", "réordonner pages pdf", "supprimer pages pdf", "supprimer des pages d'un pdf", "changer l'ordre des pages pdf"],
  },

  // ---- images to PDF: one component, five pages ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-en-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 12, // "jpg en pdf", the most typed image phrase
    name: "JPG en PDF",
    navLabel: "JPG en PDF",
    title: "JPG en PDF – Convertir des images JPG en PDF en ligne, gratuit",
    description:
      "Transformez vos photos et scans JPG en un seul PDF dans votre navigateur. Choisissez A4, Lettre US ou ajuster à l'image. Gratuit, sans téléversement, sans compte.",
    h1: "Convertir JPG en PDF",
    intro:
      "Transformez un JPG ou toute une série de photos en un seul PDF. Choisissez la taille de page et faites glisser les images dans l'ordre. Vos photos ne quittent jamais votre appareil.",
    actionLabel: "Créer le PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Le PDF garde-t-il toute la qualité de mon JPG ?",
        a: "Oui. Les données du JPG sont placées dans le PDF telles quelles, sans nouvelle compression. Une photo de 12 mégapixels reste une photo de 12 mégapixels. Le PDF pèse à peu près autant que les images réunies.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "La photo de mon téléphone sort de travers. Pourquoi ?",
        a: "Certains téléphones enregistrent la rotation dans une balise cachée au lieu de tourner les pixels. Cette version ne lit pas encore cette balise. Ouvrez la photo dans n'importe quel éditeur, enregistrez-la une fois et ajoutez-la de nouveau.",
      },
      {
        q: "Puis-je mélanger des JPG avec des PNG ou des WebP ?",
        a: "Oui. Le même outil accepte JPG, PNG et WebP ensemble. Chaque image devient une page.",
      },
      PRIVACY_FAQ,
      {
        q: "Est-ce gratuit de convertir un JPG en PDF ici ?",
        a: "Oui. C'est gratuit, sans limite de nombre d'images et sans filigrane. Le PDF est construit dans votre navigateur, donc vos photos ne sont pas téléversées. Vous n'avez pas besoin de compte.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: ["jpg en pdf", "convertir jpg en pdf", "jpg vers pdf", "jpeg en pdf", "photo en pdf", "convertir jpg en pdf gratuit", "jpg en pdf en ligne"],
  },
  {
    id: "png-to-pdf",
    slug: "png-en-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 20,
    name: "PNG en PDF",
    navLabel: "PNG en PDF",
    title: "PNG en PDF – Convertir des images PNG en PDF en ligne, gratuit",
    description:
      "Convertissez vos captures d'écran, schémas et logos PNG en un PDF sans perte de qualité. La transparence est conservée. Gratuit, dans votre navigateur.",
    h1: "Convertir PNG en PDF",
    intro:
      "Transformez des images PNG en PDF sans perte de qualité. Captures d'écran, graphiques et logos avec transparence : tout fonctionne. Tout se passe dans votre navigateur.",
    actionLabel: "Créer le PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "La conversion PNG en PDF est-elle sans perte ?",
        a: "Oui. PNG est un format sans perte et le PDF intègre les données PNG sans les modifier. Le texte des captures d'écran reste net et les couleurs ne changent pas.",
      },
      {
        q: "Que devient la transparence ?",
        a: "Le PDF conserve le canal alpha. Les zones transparentes laissent voir le fond de la page, blanc dans la plupart des visionneuses. Rien n'est aplati ni rempli.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Quelle taille de page pour des captures d'écran ?",
        a: "Utilisez « Ajuster à l'image » pour que chaque page ait la taille exacte en pixels de la capture, sans marges. Utilisez A4 ou Lettre US si vous voulez imprimer les pages.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png en pdf", "convertir png en pdf", "png vers pdf", "png en pdf en ligne gratuit", "capture d'écran en pdf"],
  },
  {
    id: "webp-to-pdf",
    slug: "webp-en-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 22,
    name: "WebP en PDF",
    navLabel: "WebP en PDF",
    title: "WebP en PDF – Convertir des images WebP en PDF en ligne, gratuit",
    description:
      "Convertissez des images WebP en PDF dans votre navigateur. Sans logiciel, sans téléversement, sans compte. Regroupez plusieurs WebP en un seul PDF, gratuitement.",
    h1: "Convertir WebP en PDF",
    intro: "Les images WebP venues du web ne s'ouvrent pas dans beaucoup d'outils PDF. Celui-ci les convertit dans votre navigateur et les regroupe en un seul PDF.",
    actionLabel: "Créer le PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Comment le WebP est-il converti ?",
        a: "Votre navigateur décode l'image WebP et l'outil enregistre les pixels en PNG dans le PDF. Cette étape est sans perte, donc le PDF ressemble exactement au WebP d'origine.",
      },
      {
        q: "Pourquoi d'autres outils refusent-ils mes fichiers WebP ?",
        a: "Le format PDF ne prend pas en charge le WebP en natif, et beaucoup de convertisseurs n'acceptent que JPG et PNG. PDF Anvil utilise le décodeur du navigateur lui-même, qui lit le WebP dans tous les navigateurs modernes.",
      },
      {
        q: "Le WebP animé fonctionne-t-il ?",
        a: "Seule la première image est utilisée. Une page PDF est une image fixe.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["png-to-pdf", "jpg-to-pdf", "image-to-pdf"],
    keywords: ["webp en pdf", "convertir webp en pdf", "webp vers pdf", "webp en pdf en ligne gratuit"],
  },
  {
    id: "image-to-pdf",
    slug: "image-en-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 4, // "image en pdf"; the general term is the nav page, as in English
    name: "Image en PDF",
    navLabel: "Image en PDF",
    title: "Image en PDF – Convertir JPG, PNG et WebP en PDF gratuitement",
    description:
      "Convertissez n'importe quelles images en un PDF : JPG, PNG et WebP, même mélangés. Choisissez la taille de page et l'ordre. Gratuit, privé, dans votre navigateur.",
    h1: "Convertir des images en PDF",
    intro:
      "Regroupez des images JPG, PNG et WebP en un seul PDF. Mélangez les formats librement, choisissez une taille de page et faites glisser les images dans l'ordre. Rien ne quitte votre appareil.",
    actionLabel: "Créer le PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Quels formats d'image fonctionnent ?",
        a: "JPG, PNG et WebP. JPG et PNG sont intégrés tels quels. WebP est décodé et converti en PNG avant d'être ajouté. Vous pouvez mélanger les trois dans un même PDF.",
      },
      {
        q: "Puis-je faire un PDF avec les photos de mon téléphone ?",
        a: "Oui. Ouvrez cette page sur votre téléphone, touchez la zone et choisissez des photos dans votre galerie. Le PDF est construit sur le téléphone et enregistré dans vos téléchargements.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Le PDF garde-t-il toute la résolution de mes images ?",
        a: "Oui. Les données de l'image sont intégrées sans rééchantillonnage. Cela veut aussi dire que le PDF pèse à peu près autant que les images réunies.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: ["image en pdf", "convertir image en pdf", "images en pdf", "photo en pdf", "convertir en pdf", "créer un pdf", "image vers pdf", "image en pdf en ligne gratuit"],
  },
  {
    id: "scan-to-pdf",
    slug: "scanner-en-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 19,
    name: "Scanner en PDF",
    navLabel: "Scanner en PDF",
    title: "Scanner un document en PDF en ligne – Avec l'appareil photo du téléphone, gratuit",
    description:
      "Scannez des documents papier en PDF avec l'appareil photo de votre téléphone ou des photos existantes. Classez les pages, choisissez A4 ou Lettre US. Gratuit, privé.",
    h1: "Scanner des documents en PDF",
    intro:
      "Prenez une photo de chaque page avec l'appareil photo de votre téléphone, ou ajoutez des photos que vous avez déjà. Classez les pages et obtenez un seul PDF. Rien n'est téléversé.",
    actionLabel: "Créer le PDF",
    steps: [
      "Touchez Prendre une photo et photographiez la première page. Ou touchez la zone pour ajouter des photos que vous avez déjà.",
      "Répétez pour chaque page. Faites glisser les pages dans l'ordre et choisissez une taille de page.",
      "Touchez Créer le PDF. Le fichier se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Comment scanner un document avec mon téléphone ?",
        a: "Ouvrez cette page sur votre téléphone. Touchez Prendre une photo. L'appareil photo s'ouvre. Photographiez la première page et validez. Touchez de nouveau Prendre une photo pour la page suivante. Quand toutes les pages sont dans la liste, touchez Créer le PDF. Le PDF est enregistré sur votre téléphone.",
      },
      {
        q: "Puis-je l'utiliser sur un ordinateur ?",
        a: "Oui. Sur un ordinateur, le bouton Prendre une photo ouvre le sélecteur de fichiers habituel. Choisissez des photos ou des scans déjà présents sur votre ordinateur, classez-les et créez le PDF.",
      },
      {
        q: "Mes photos sont-elles téléversées sur un serveur ?",
        a: "Non. La photo passe de l'appareil photo de votre téléphone à la page dans votre navigateur. Le PDF y est aussi construit. Rien ne nous est envoyé. Vous pouvez couper votre connexion Internet une fois la page chargée : l'outil fonctionne toujours.",
      },
      {
        q: "Comment obtenir des pages droites et lisibles ?",
        a: "Posez le document sur une surface plane avec un fond uni. Utilisez une bonne lumière et évitez les ombres de votre main ou du téléphone. Tenez le téléphone parallèle à la page et remplissez le cadre avec la page. Touchez l'écran pour faire la mise au point avant de prendre la photo. L'outil ne recadre pas et ne redresse pas la photo.",
      },
      {
        q: "Quelle taille de page choisir ?",
        a: "Choisissez A4 ou Lettre US pour obtenir des pages imprimables classiques, avec la photo centrée. A4 est le réglage par défaut. Choisissez « Ajuster à l'image » pour que chaque page ait la taille exacte de la photo, sans marges.",
      },
      {
        q: "Puis-je scanner plusieurs pages dans un seul PDF ?",
        a: "Oui. Prenez une photo par page. Chaque photo devient une page, dans l'ordre de la liste. Il n'y a pas de limite de pages. Faites glisser une page vers le haut ou vers le bas pour changer l'ordre.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: ["scanner en pdf", "scanner un document en pdf", "scanner des documents en pdf", "scanner avec son téléphone en pdf", "numériser en pdf", "appareil photo en pdf"],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF to images: one component, three pages ----
  {
    id: "pdf-to-jpg",
    slug: "pdf-en-jpg",
    kind: "pdf-to-images",
    nav: false,
    priority: 13,
    name: "PDF en JPG",
    navLabel: "PDF en JPG",
    title: "PDF en JPG – Convertir les pages d'un PDF en images JPG en ligne",
    description:
      "Exportez chaque page d'un PDF en image JPG à 72, 150 ou 300 DPI. Fonctionne dans votre navigateur. Gratuit, privé, sans téléversement, sans filigrane, sans limite.",
    h1: "Convertir PDF en JPG",
    intro: "Enregistrez chaque page d'un PDF en image JPG. Choisissez la résolution, cochez les pages et téléchargez une image ou toutes dans un ZIP.",
    actionLabel: "Convertir en images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Comment enregistrer un PDF en JPG ?",
        a: "Ajoutez le PDF sur cette page. Gardez JPG comme format et choisissez une résolution. Cliquez sur Convertir en images. Chaque page est enregistrée dans un fichier JPG. Téléchargez-les un par un ou tous ensemble dans un ZIP.",
      },
      DPI_FAQ,
      {
        q: "Quand choisir JPG plutôt que PNG ?",
        a: "JPG est plus léger et convient aux photos et aux pages scannées. Passez à PNG pour le texte, les schémas et les captures d'écran, où la netteté des bords compte.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Le JPG contient-il toute la page ?",
        a: "Oui. La page entière est rendue, avec les images, les graphiques vectoriels et le texte, exactement comme une visionneuse PDF l'affiche. Les champs de formulaire et les annotations sont inclus tels qu'ils apparaissent.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf en jpg", "convertir pdf en jpg", "pdf vers jpg", "enregistrer pdf en jpg", "pdf en jpeg", "pdf en jpg en ligne gratuit", "page pdf en jpg"],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-en-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 21,
    name: "PDF en PNG",
    navLabel: "PDF en PNG",
    title: "PDF en PNG – Convertir les pages d'un PDF en images PNG en ligne",
    description:
      "Exportez les pages d'un PDF en images PNG sans perte à 72, 150 ou 300 DPI. Texte et schémas nets. Dans votre navigateur. Gratuit, privé, sans téléversement.",
    h1: "Convertir PDF en PNG",
    intro:
      "Enregistrez les pages d'un PDF en images PNG sans perte. Le texte, les schémas et les captures d'écran restent nets. Choisissez la résolution et les pages, puis téléchargez-les.",
    actionLabel: "Convertir en images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Pourquoi choisir PNG plutôt que JPG ?",
        a: "PNG est sans perte. Les bords du texte, les traits fins et les aplats de couleur restent exacts, sans artefacts de compression. C'est le bon choix pour les présentations, les schémas, les formulaires et tout ce que vous comptez retravailler.",
      },
      DPI_FAQ,
      {
        q: "Le fond du PNG est-il transparent ?",
        a: "Non. Les pages d'un PDF ont un fond blanc par définition, et le PNG le conserve. Utilisez un éditeur d'images si vous devez le retirer.",
      },
      {
        q: "Quelle résolution pour l'impression ?",
        a: "Utilisez 300 DPI. C'est la résolution d'impression habituelle et le PNG conserve chaque pixel. Pour l'écran et les présentations, 150 DPI donne des fichiers plus légers avec une bonne netteté.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf en png", "convertir pdf en png", "pdf vers png", "pdf en png en ligne gratuit", "pdf en png haute résolution"],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-en-image",
    kind: "pdf-to-images",
    nav: true,
    priority: 6,
    name: "PDF en image",
    navLabel: "PDF en image",
    title: "PDF en image – Convertir les pages d'un PDF en JPG ou PNG en ligne",
    description:
      "Convertissez les pages d'un PDF en images. Choisissez JPG ou PNG et 72, 150 ou 300 DPI. Cochez les pages voulues. Gratuit, dans votre navigateur, sans téléversement.",
    h1: "Convertir un PDF en images",
    intro:
      "Transformez les pages d'un PDF en fichiers image. Choisissez JPG pour les photos et les scans ou PNG pour le texte et les schémas, réglez la résolution et téléchargez les pages voulues.",
    actionLabel: "Convertir en images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG ou PNG ?",
        a: "JPG est plus léger et convient aux photos et aux pages scannées. PNG est sans perte et convient au texte, aux schémas et aux captures d'écran, où la netteté des bords compte.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Puis-je obtenir une seule image de tout le document ?",
        a: "Chaque page devient sa propre image. S'il vous faut une seule image en hauteur, convertissez les pages et assemblez-les dans un éditeur d'images.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf en image", "convertir pdf en image", "pdf vers image", "pdf en photo", "page pdf en image", "pdf en image en ligne gratuit"],
  },

  // ---- compress: one component, two pages ----
  {
    id: "compress-pdf",
    slug: "compresser-pdf",
    kind: "compress",
    nav: true,
    priority: 2, // "compresser pdf" 103K
    name: "Compresser PDF",
    navLabel: "Compresser",
    title: "Compresser un PDF en ligne – Réduire la taille gratuitement, sans téléversement",
    description:
      "Compressez un PDF dans votre navigateur. Choisissez sans perte, équilibré ou minimal. Les grandes photos sont réencodées, le texte reste net. Gratuit, sans compte.",
    h1: "Compresser un PDF",
    intro:
      "Rendez un PDF plus léger. Choisissez un niveau, un clic, téléchargez. Le texte et les graphiques vectoriels restent nets. Votre fichier ne quitte jamais votre appareil.",
    actionLabel: "Compresser le PDF",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Choisissez un niveau. Sans perte garde chaque pixel. Équilibré est le meilleur choix pour la plupart des fichiers. Minimal donne le fichier le plus léger.",
      "Cliquez sur Compresser le PDF. L'outil affiche l'ancienne et la nouvelle taille, et le fichier se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "De combien la taille de mon PDF va-t-elle baisser ?",
        a: "Cela dépend du contenu du fichier. Un PDF plein de grandes photos ou de scans peut perdre 50 à 90 pour cent avec le niveau Équilibré. Un PDF qui ne contient que du texte et des graphiques vectoriels perd beaucoup moins, souvent 5 à 20 pour cent, parce qu'il n'y a rien de grand à réencoder. L'outil affiche l'ancienne et la nouvelle taille après chaque passage.",
      },
      {
        q: "Quel niveau choisir ?",
        a: "Équilibré est le meilleur choix pour la plupart des fichiers. Il limite les images à 1600 pixels sur le grand côté, ce qui est net à l'écran et suffisant pour une impression courante. Choisissez Minimal pour les pièces jointes et les limites de téléversement. Il limite les images à 1100 pixels et applique une compression JPEG plus forte. Choisissez Sans perte quand les images doivent rester exactement telles quelles. Il ne fait que nettoyer la structure du fichier et retirer les données inutilisées.",
      },
      {
        q: "La compression réduit-elle la qualité du texte ?",
        a: "Non. Le texte, les polices, les traits et les graphiques vectoriels ne sont modifiés à aucun niveau. Seules les grandes photos et les scans sont réencodés, et seulement aux niveaux Équilibré et Minimal. Si la nouvelle image n'est pas plus légère que l'ancienne, l'ancienne est conservée.",
      },
      {
        q: "Pourquoi mon fichier n'est-il pas plus léger ?",
        a: "Certains fichiers sont déjà aussi légers que possible. Leurs images sont déjà de petits JPEG, ou le fichier n'a aucune image, seulement du texte et des formes vectorielles. Les fichiers qu'un autre outil a déjà compressés changent peu eux aussi. Dans ce cas, l'outil vous indique que le fichier était déjà compact.",
      },
      {
        q: "Quelles images l'outil compresse-t-il ?",
        a: "Les images JPEG, ainsi que les images RVB et en niveaux de gris non compressées ou compressées en Flate, qui pèsent au moins 64 Ko et mesurent au moins 200 pixels de large ou de haut. Les images avec transparence, couleurs indexées, CMJN ou espaces colorimétriques inhabituels sont conservées telles quelles pour que les couleurs restent justes.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["compresser pdf", "compresser un pdf", "compresser pdf en ligne", "compresser pdf gratuit", "compresseur pdf", "réduire pdf", "alléger pdf", "compresser pdf sans perte de qualité"],
  },
  {
    // Variant of "compress" for "réduire taille pdf" / "réduire poids pdf".
    id: "reduce-pdf-size",
    slug: "reduire-taille-pdf",
    kind: "compress",
    nav: false,
    priority: 15,
    name: "Réduire la taille d'un PDF",
    navLabel: "Réduire la taille",
    title: "Réduire la taille d'un PDF en ligne – Gratuit, sans téléversement",
    description:
      "Réduisez la taille d'un PDF pour l'envoyer par e-mail ou le joindre à un formulaire. Dans votre navigateur, trois niveaux, taille avant et après. Gratuit, privé.",
    h1: "Réduire la taille d'un PDF",
    intro:
      "Faites passer un PDF sous la limite d'un e-mail ou d'un formulaire. Choisissez le niveau de réduction, un clic, et comparez l'ancienne et la nouvelle taille. Le PDF reste sur votre appareil.",
    actionLabel: "Réduire la taille",
    steps: [
      "Ajoutez votre PDF. Déposez-le dans la zone, ou cliquez pour le choisir.",
      "Choisissez un niveau. Commencez par Équilibré. Si le fichier est encore trop lourd, repassez-le avec Minimal.",
      "Cliquez sur Réduire la taille. L'outil affiche le pourcentage gagné, et le fichier allégé se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Comment réduire la taille d'un PDF ?",
        a: "Ajoutez le PDF sur cette page et choisissez un niveau. Cliquez sur Réduire la taille. L'outil réécrit le fichier, retire les données inutilisées et réduit les grandes photos. Le nouveau PDF se télécharge aussitôt, et la page affiche l'ancienne et la nouvelle taille.",
      },
      {
        q: "Comment passer un PDF sous 1 Mo ou sous 5 Mo ?",
        a: "Passez le fichier au niveau Équilibré et lisez la nouvelle taille. S'il dépasse encore la limite, repassez-le avec Minimal. S'il est toujours trop lourd, il contient beaucoup de pages d'images. Divisez-le en parties avec l'outil Diviser PDF et envoyez chaque partie.",
      },
      {
        q: "La réduction modifie-t-elle le texte ?",
        a: "Non. Le texte et les graphiques vectoriels sont copiés tels quels. Seules les grandes photos et les scans sont réduits. Le texte reste net à l'écran et à l'impression.",
      },
      {
        q: "Pourquoi mon PDF est-il si lourd ?",
        a: "Le plus souvent, le fichier contient des photos ou des pages scannées à très haute résolution. Une page scannée à 600 DPI peut peser plusieurs mégaoctets. Le niveau Équilibré limite les images à 1600 pixels sur le grand côté, ce qui suffit pour lire et imprimer normalement.",
      },
      {
        q: "Est-ce gratuit de réduire la taille d'un PDF ici ?",
        a: "Oui. Aucun coût, aucun compte, aucun filigrane, aucune limite de nombre de fichiers. Le PDF est traité dans votre navigateur et n'est jamais téléversé.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["réduire taille pdf", "réduire la taille d'un pdf", "réduire poids pdf", "réduire pdf", "diminuer taille pdf", "alléger un pdf", "réduire taille pdf en ligne gratuit"],
  },

  // ---- passwords ----
  {
    id: "unlock-pdf",
    slug: "deverrouiller-pdf",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "Déverrouiller PDF",
    navLabel: "Déverrouiller",
    title: "Déverrouiller un PDF – Supprimer le mot de passe d'un PDF en ligne, gratuit",
    description:
      "Supprimez le mot de passe d'un PDF quand vous le connaissez. Saisissez-le, un clic, et obtenez une copie qui s'ouvre sans mot de passe. Gratuit, sans téléversement.",
    h1: "Déverrouiller un PDF",
    intro:
      "Supprimez le mot de passe d'un PDF. Saisissez le mot de passe que vous connaissez, un clic, et téléchargez une copie qui s'ouvre sans mot de passe. Le fichier reste sur votre appareil.",
    actionLabel: "Déverrouiller le PDF",
    steps: [
      "Déposez un PDF protégé par mot de passe dans la zone, ou cliquez pour le choisir.",
      "Saisissez le mot de passe du fichier. Le mot de passe d'ouverture et le mot de passe propriétaire fonctionnent tous les deux.",
      "Cliquez sur Déverrouiller le PDF. Une copie sans mot de passe et sans restriction se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "J'ai oublié le mot de passe. Pouvez-vous le supprimer ?",
        a: "Non. L'outil a besoin du mot de passe. Il ne devine, ne casse et ne contourne aucun mot de passe. Un PDF chiffré en AES ne peut pas être ouvert sans le bon mot de passe. Si vous ne le connaissez pas, demandez-le à la personne qui a créé le fichier.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Quel mot de passe dois-je saisir ici ?",
        a: "L'un ou l'autre. Si vous ne connaissez que le mot de passe d'ouverture, saisissez celui-là. Si vous connaissez le mot de passe propriétaire, saisissez celui-là. Le résultat n'a ni mot de passe ni restriction.",
      },
      {
        q: "Pourquoi mon PDF ne s'ouvre-t-il pas ici ?",
        a: "Trois causes sont fréquentes. Le mot de passe est incorrect : vérifiez les majuscules et les espaces, puis réessayez. Le fichier est endommagé : ouvrez-le dans une visionneuse PDF pour vérifier. Le fichier utilise un certificat ou un système de gestion des droits numériques à la place d'un mot de passe : l'outil ne peut pas ouvrir ces fichiers.",
      },
      {
        q: "Puis-je retirer seulement les restrictions et garder le mot de passe d'ouverture ?",
        a: "Non. Le résultat n'a aucun mot de passe. Pour en définir un nouveau, ouvrez le résultat dans l'outil Protéger PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: ["déverrouiller pdf", "supprimer mot de passe pdf", "enlever mot de passe pdf", "retirer le mot de passe d'un pdf", "déprotéger pdf", "débloquer pdf", "déverrouiller pdf en ligne gratuit"],
  },
  {
    id: "protect-pdf",
    slug: "proteger-pdf",
    kind: "protect",
    nav: true,
    priority: 9,
    name: "Protéger PDF",
    navLabel: "Protéger",
    title: "Protéger un PDF – Ajouter un mot de passe à un PDF en ligne, gratuit",
    description:
      "Ajoutez un mot de passe à un PDF avec un chiffrement AES-256 dans votre navigateur. Décidez qui peut imprimer, copier ou modifier le fichier. Gratuit, sans compte.",
    h1: "Protéger un PDF par mot de passe",
    intro:
      "Ajoutez un mot de passe à un PDF. Le fichier est chiffré en AES-256 dans votre navigateur, et seule une personne qui a le mot de passe peut l'ouvrir. Rien n'est téléversé.",
    actionLabel: "Protéger le PDF",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Saisissez le mot de passe d'ouverture. Définissez un mot de passe propriétaire et les autorisations si vous en avez besoin.",
      "Cliquez sur Protéger le PDF. Le fichier chiffré se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Quel chiffrement l'outil utilise-t-il ?",
        a: "AES-256, le chiffrement le plus fort du standard PDF (PDF 2.0). Toutes les visionneuses actuelles l'ouvrent : Adobe Reader, Chrome, Edge, Firefox, Safari et Aperçu sur Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "Que se passe-t-il si je laisse le mot de passe propriétaire vide ?",
        a: "L'outil utilise le mot de passe d'ouverture pour les deux. Les autorisations ne limitent alors pas une personne qui connaît ce mot de passe. Définissez un mot de passe propriétaire différent quand les autorisations doivent s'appliquer.",
      },
      {
        q: "À quoi servent les autorisations ?",
        a: "Elles indiquent à une visionneuse PDF ce qu'une personne avec le mot de passe utilisateur peut faire : imprimer le fichier, copier le texte et les images, modifier le fichier. Une personne avec le mot de passe propriétaire peut tout faire. La plupart des visionneuses respectent les autorisations, mais c'est un signal, pas un verrou. La vraie protection, c'est le mot de passe.",
      },
      {
        q: "Puis-je retirer le mot de passe plus tard ?",
        a: "Oui. Ouvrez le fichier dans l'outil Déverrouiller PDF et saisissez le mot de passe. Vous obtenez une copie sans mot de passe. Conservez le mot de passe en lieu sûr. Sans lui, le fichier ne peut pas être ouvert.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Quelle longueur pour le mot de passe ?",
        a: "Utilisez au moins 12 caractères avec des lettres, des chiffres et des symboles. AES-256 est solide, mais un programme peut deviner un mot de passe court. N'envoyez pas le mot de passe dans le même e-mail que le fichier.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: ["protéger pdf", "protéger un pdf par mot de passe", "mettre un mot de passe sur un pdf", "verrouiller pdf", "chiffrer pdf", "crypter pdf", "sécuriser pdf", "protéger pdf en ligne gratuit"],
  },

  // ---- viewer ----
  {
    id: "pdf-viewer",
    slug: "ouvrir-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Lecteur PDF",
    navLabel: "Lire",
    title: "Ouvrir un PDF en ligne – Lecteur PDF gratuit, sans téléversement",
    description:
      "Ouvrez et lisez un fichier PDF dans votre navigateur. Parcourez les pages, zoomez et imprimez. Lecteur PDF gratuit, sans téléversement, sans compte, sans Adobe.",
    h1: "Ouvrir et lire un PDF",
    intro: "Ouvrez un fichier PDF et lisez-le dans votre navigateur. Parcourez les pages, zoomez et imprimez. Le fichier reste sur votre appareil.",
    actionLabel: "Imprimer",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir.",
      "Parcourez les pages. Utilisez la barre d'outils pour aller à une page, zoomer, dézoomer ou ajuster la page à la largeur de la fenêtre.",
      "Cliquez sur Imprimer pour ouvrir le fichier dans un nouvel onglet et l'imprimer depuis votre navigateur. Cliquez sur le X à côté du nom du fichier pour en ouvrir un autre.",
    ],
    faq: [
      {
        q: "Comment ouvrir un fichier PDF sans Adobe ?",
        a: "Déposez le fichier sur cette page, ou cliquez sur la zone et choisissez-le. Vous n'avez besoin ni d'Adobe Acrobat ni d'Adobe Reader. La page affiche le PDF avec le même moteur open source que Firefox. Cela fonctionne dans Chrome, Edge, Firefox et Safari. Il n'y a rien à installer.",
      },
      {
        q: "Qu'est-ce qu'un lecteur PDF ?",
        a: "Un lecteur PDF est un programme qui ouvre les fichiers PDF et affiche leurs pages à l'écran. Adobe Reader en est un exemple. La plupart des navigateurs en ont aussi un intégré. Cette page est un lecteur PDF qui fonctionne comme une page web. Elle dessine chaque page dans votre navigateur et n'envoie le fichier nulle part.",
      },
      {
        q: "Mon PDF est-il téléversé quand je l'ouvre ?",
        a: "Non. Le fichier est lu par JavaScript sur votre propre appareil et affiché à l'écran sur cet appareil. Rien n'est envoyé à un serveur. Vous pouvez le vérifier dans le panneau réseau de votre navigateur : aucune requête ne transporte votre fichier.",
      },
      {
        q: "Le lecteur fonctionne-t-il hors ligne ?",
        a: "En grande partie. Le fichier est ouvert dans votre navigateur, et aucune donnée ne part vers un serveur. Le code du lecteur et certaines polices se chargent depuis notre site la première fois qu'ils sont nécessaires. Ouvrez la page et un fichier pendant que vous êtes en ligne. Ensuite, vous pouvez ouvrir d'autres fichiers sans connexion jusqu'à la fermeture de l'onglet.",
      },
      {
        q: "Puis-je imprimer le PDF ?",
        a: "Oui. Cliquez sur Imprimer dans la barre d'outils. Le fichier s'ouvre dans un nouvel onglet, dans la visionneuse PDF de votre navigateur. Appuyez sur Ctrl+P (Cmd+P sur Mac) dans cet onglet pour l'imprimer. Le navigateur imprime le fichier d'origine, donc le texte reste net sur le papier.",
      },
      {
        q: "Puis-je zoomer ?",
        a: "Oui. Utilisez les boutons plus et moins de la barre d'outils, ou cliquez sur Ajuster à la largeur pour que la page occupe toute la largeur de la fenêtre. Chaque page est redessinée à la nouvelle taille, donc le texte reste net à tous les niveaux de zoom.",
      },
      {
        q: "Puis-je modifier le PDF ici ?",
        a: "Non. Cet outil ne fait qu'afficher le fichier. Pour ajouter du texte, un masque blanc, des images ou une signature sur une page, utilisez l'outil Modifier PDF. Pour pivoter, réordonner, supprimer, diviser, fusionner ou convertir des pages, utilisez les autres outils de ce site.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["ouvrir pdf", "ouvrir un pdf", "ouvrir pdf en ligne", "lire pdf", "lire un pdf en ligne", "lecteur pdf", "lecteur pdf en ligne", "visionneuse pdf", "ouvrir pdf sans adobe"],
  },

  // ---- edit: one component, three pages ----
  {
    id: "edit-pdf",
    slug: "modifier-pdf",
    kind: "edit",
    nav: true,
    priority: 3, // "modifier pdf" 46K
    name: "Modifier PDF",
    navLabel: "Modifier",
    title: "Modifier un PDF en ligne – Texte, masque blanc, images, signature, gratuit",
    description:
      "Modifiez un PDF dans votre navigateur : ajoutez du texte, masquez des zones en blanc, surlignez, insérez des images et dessinez une signature. Gratuit, sans compte.",
    h1: "Modifier un PDF",
    intro:
      "Ajoutez du texte, des masques blancs, des surlignages, des images et une signature dessinée par-dessus les pages d'un PDF. L'outil ne change pas le texte déjà présent dans le fichier ; il pose du nouveau contenu par-dessus. Tout se passe dans votre navigateur.",
    actionLabel: "Enregistrer le PDF",
    steps: [
      "Déposez un PDF dans la zone, ou cliquez pour le choisir. Choisissez une page dans la bande de gauche.",
      "Choisissez un outil dans la barre. Cliquez sur la page pour ajouter une zone de texte, faites glisser pour tracer un masque blanc ou un surlignage, ajoutez une image ou dessinez avec le stylo. Faites glisser un élément pour le déplacer, tirez son coin pour le redimensionner, et appuyez sur Suppr pour le retirer.",
      "Cliquez sur Enregistrer le PDF. Le fichier modifié se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Que puis-je modifier dans un PDF avec cet outil ?",
        a: "Vous pouvez poser du nouveau contenu sur n'importe quelle page : zones de texte, rectangles blancs (masques), surlignages jaunes, images (PNG ou JPG) et traits à main levée dessinés à la souris ou au doigt. Vous pouvez déplacer, redimensionner et supprimer chaque élément avant d'enregistrer. Le contenu d'origine de la page reste en dessous.",
      },
      {
        q: "Puis-je changer le texte déjà présent dans le PDF ?",
        a: "Non. Cet outil ne modifie pas le texte existant. Il ajoute du nouveau contenu par-dessus la page. Pour remplacer un mot ou un nombre, tracez un rectangle blanc dessus et ajoutez une zone de texte par-dessus. L'ancien texte est couvert à l'écran et sur le papier, mais il reste dans le fichier : un programme qui copie le texte du PDF peut donc encore le trouver.",
      },
      {
        q: "Comment signer un PDF ?",
        a: "Choisissez l'outil Dessiner et tracez votre signature sur la page avec la souris, un stylet ou le doigt. Ou choisissez Image et ajoutez une photo de votre signature en PNG ou JPG. Déplacez la signature au bon endroit, redimensionnez-la et cliquez sur Enregistrer le PDF. La page Signer PDF démarre avec l'outil Dessiner sélectionné.",
      },
      {
        q: "Mon PDF est-il téléversé sur un serveur ?",
        a: "Non. Le fichier est ouvert par JavaScript sur votre propre appareil. Les modifications sont dessinées dans le fichier avec la bibliothèque open source pdf-lib, dans votre navigateur. Rien ne nous est envoyé. Vous pouvez couper votre connexion Internet une fois la page chargée : l'outil fonctionne toujours.",
      },
      {
        q: "Quelles polices puis-je utiliser ?",
        a: "Helvetica, Times et Courier. Ce sont les polices standard du PDF : le fichier reste léger et toutes les visionneuses les affichent sans fichier de police intégré. Vous pouvez régler la taille et la couleur de chaque zone de texte.",
      },
      {
        q: "Pourquoi un caractère spécial s'affiche-t-il en point d'interrogation ?",
        a: "Les polices standard du PDF contiennent les caractères latins des langues d'Europe de l'Ouest (le jeu WinAnsi), y compris les lettres accentuées, le ç et le œ. Un caractère hors de ce jeu, comme un caractère chinois, un emoji ou certains symboles, ne peut pas être encodé, donc l'outil écrit un point d'interrogation à sa place. Saisissez le texte avec des caractères de l'alphabet latin, ou ajoutez-le sous forme d'image.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "edit:editeur", "organize-pdf", "pdf-viewer"],
    keywords: ["modifier pdf", "modifier un pdf", "modifier pdf en ligne", "modifier pdf gratuit", "comment modifier un pdf gratuitement", "ajouter du texte à un pdf", "masquer du texte dans un pdf", "retoucher pdf"],
  },
  {
    // Locale-only variant of "edit" for "éditeur pdf" / "éditer pdf".
    id: "edit:editeur",
    slug: "editeur-pdf",
    kind: "edit",
    nav: false,
    priority: 17,
    name: "Éditeur PDF",
    navLabel: "Éditeur",
    title: "Éditeur PDF en ligne gratuit – Éditer un PDF sans téléversement",
    description:
      "Un éditeur PDF gratuit qui fonctionne dans votre navigateur. Éditez un PDF : texte, masques blancs, surlignage, images, signature. Sans installation, sans compte.",
    h1: "Éditer un PDF",
    intro:
      "Un éditeur PDF gratuit, sans installation. Posez du texte, des masques blancs, des surlignages, des images et une signature sur les pages, puis enregistrez le fichier. Le PDF reste sur votre appareil.",
    actionLabel: "Enregistrer le PDF",
    steps: [
      "Ouvrez le PDF dans l'éditeur : déposez-le dans la zone, ou cliquez pour le choisir. La bande de gauche liste les pages.",
      "Choisissez un outil : Texte, Masquer, Surligner, Image ou Dessiner. Placez l'élément sur la page, déplacez-le et redimensionnez-le. Annuler et Rétablir sont dans la barre.",
      "Cliquez sur Enregistrer le PDF. Le fichier édité se télécharge aussitôt, sans filigrane.",
    ],
    faq: [
      {
        q: "Faut-il installer un logiciel pour éditer un PDF ?",
        a: "Non. L'éditeur est une page web. Il se charge dans Chrome, Edge, Firefox ou Safari, sur ordinateur, tablette ou téléphone. Il n'y a ni logiciel, ni extension, ni compte.",
      },
      {
        q: "Cet éditeur PDF est-il vraiment gratuit ?",
        a: "Oui. Aucun coût, aucun essai limité, aucun filigrane sur le fichier enregistré. Votre appareil fait le travail, donc l'éditeur ne nous coûte rien à faire fonctionner.",
      },
      {
        q: "Quelle est la différence avec la page Modifier PDF ?",
        a: "Aucune. Éditer et modifier veulent dire la même chose ici. Cette page et la page Modifier PDF ouvrent le même outil.",
      },
      {
        q: "Puis-je remplir un formulaire PDF avec cet éditeur ?",
        a: "Vous pouvez écrire par-dessus : choisissez Texte, cliquez dans un champ et saisissez votre réponse. L'outil ne remplit pas les champs de formulaire interactifs eux-mêmes ; il pose le texte sur la page, et le résultat s'imprime et se lit comme un formulaire rempli.",
      },
      {
        q: "Puis-je annuler une modification ?",
        a: "Oui. Cliquez sur Annuler (Ctrl+Z) pour revenir en arrière et sur Rétablir (Ctrl+Shift+Z) pour la refaire. Vous pouvez aussi sélectionner un élément et appuyer sur Suppr. Tant que vous n'avez pas enregistré, le fichier d'origine n'est pas touché.",
      },
      {
        q: "L'éditeur fonctionne-t-il sur téléphone ?",
        a: "Oui. Ouvrez la page dans le navigateur de votre téléphone. Touchez la page pour poser du texte, dessinez au doigt, pincez pour zoomer. Le PDF reste sur le téléphone.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["edit-pdf", "sign-pdf", "pdf-viewer"],
    keywords: ["éditeur pdf", "éditeur pdf gratuit", "éditeur pdf en ligne", "éditer pdf", "éditer un pdf", "éditer pdf gratuit", "éditer pdf en ligne gratuit"],
  },
  {
    id: "sign-pdf",
    slug: "signer-pdf",
    kind: "edit",
    nav: false,
    priority: 16,
    name: "Signer PDF",
    navLabel: "Signer",
    title: "Signer un PDF en ligne – Dessiner ou insérer votre signature, gratuit",
    description:
      "Signez un PDF dans votre navigateur. Dessinez votre signature à la souris ou au doigt, ou insérez son image, placez-la et enregistrez. Gratuit, sans téléversement.",
    h1: "Signer un PDF",
    intro:
      "Dessinez votre signature sur la page, ou insérez son image. Déplacez-la au bon endroit, redimensionnez-la et enregistrez le fichier. Le PDF ne quitte pas votre appareil.",
    actionLabel: "Enregistrer le PDF",
    steps: [
      "Déposez le PDF dans la zone, ou cliquez pour le choisir. Choisissez la page à signer dans la bande de gauche.",
      "L'outil Dessiner est sélectionné. Tracez votre signature sur la page avec la souris, un stylet ou le doigt. Ou cliquez sur Image et choisissez un PNG ou un JPG de votre signature. Faites-la glisser au bon endroit et tirez le coin pour la redimensionner. Utilisez l'outil Texte pour ajouter la date ou votre nom.",
      "Cliquez sur Enregistrer le PDF. Le fichier signé se télécharge aussitôt.",
    ],
    faq: [
      {
        q: "Comment signer un PDF sans l'imprimer ?",
        a: "Ajoutez le PDF et tracez votre signature sur la page avec l'outil Dessiner. Vous pouvez utiliser la souris, un stylet ou le doigt sur un écran tactile. Déplacez et redimensionnez la signature, puis cliquez sur Enregistrer le PDF. La signature fait partie de la page. Ni imprimante ni scanner ne sont nécessaires.",
      },
      {
        q: "Puis-je utiliser une image de ma signature ?",
        a: "Oui. Signez sur une feuille blanche, prenez une photo ou un scan, et enregistrez-le en PNG ou JPG. Cliquez sur Image, choisissez le fichier et placez-le sur la page. Un PNG à fond transparent donne le meilleur résultat. L'image est intégrée au PDF en pleine qualité.",
      },
      {
        q: "Est-ce une signature électronique à valeur légale ?",
        a: "L'outil dessine une image de votre signature dans la page. Il n'ajoute pas de certificat numérique et ne vérifie pas qui a signé. Beaucoup d'accords acceptent une signature dessinée, mais les règles changent selon le pays et le contrat. Si l'autre partie exige une signature à certificat, utilisez un service qui en délivre.",
      },
      {
        q: "Puis-je signer sur mon téléphone ?",
        a: "Oui. La page fonctionne dans le navigateur d'un téléphone ou d'une tablette. Dessinez au doigt ou au stylet. Pincez pour zoomer dans le navigateur si le champ est petit. Le fichier reste sur le téléphone.",
      },
      {
        q: "Puis-je ajouter la date à côté de la signature ?",
        a: "Oui. Choisissez l'outil Texte, cliquez sur la page et saisissez la date. Vous pouvez régler la taille et la couleur de la police. Faites glisser la zone de texte à côté de la signature.",
      },
      {
        q: "Mon document signé est-il téléversé ?",
        a: "Non. Le PDF et la signature restent dans votre navigateur. La signature est dessinée dans le fichier par JavaScript sur votre propre appareil. Rien ne nous est envoyé.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: ["signer pdf", "signer un pdf", "signer pdf en ligne", "signer pdf gratuit", "signature pdf", "ajouter une signature à un pdf", "signer un document pdf"],
    defaults: { tool: "draw" },
  },
];
