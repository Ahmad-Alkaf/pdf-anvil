// German tool pages. Slugs follow the most searched German phrase (Bing,
// 3 months, 2026), umlauts written as ae/oe/ue. Ids mirror the English slugs;
// "merge:zusammenfuehren" is the one locale-only variant. See NOTES.md.
//
// Every h1 starts with an acronym ("PDF", "JPG") on purpose: toolShell.howToName
// must use {h1Lower}, and lowerFirst() leaves an acronym alone, so no German
// noun is ever lowercased in the HowTo name.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "Werden meine Dateien auf einen Server hochgeladen?",
  a: "Nein. PDF Anvil läuft vollständig in Ihrem Browser. JavaScript öffnet Ihre Datei auf Ihrem eigenen Gerät, und auch das Ergebnis entsteht dort. Nichts wird an uns gesendet. Sie können die Internetverbindung trennen, sobald die Seite geladen ist – das Tool funktioniert weiter.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Gibt es ein Größen- oder Tageslimit?",
  a: "Nein. Es gibt kein Seitenlimit, kein Limit für die Anzahl der Dateien und kein Tageskontingent. Die einzige Grenze ist der Arbeitsspeicher Ihres Geräts. Bei Dateien über 100 MB erscheint eine Warnung, aber auf den meisten Computern funktionieren sie trotzdem.",
};

const FREE_FAQ: ToolFaq = {
  q: "Ist es wirklich kostenlos? Brauche ich ein Konto?",
  a: "Ja, es ist kostenlos, und es gibt kein Konto. Keine Registrierung, keine E-Mail-Adresse, kein Wasserzeichen und keine Premium-Version. PDF Anvil ist ein Nebenprojekt von KafLabs, das einfach nützlich sein soll.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Legen Sie ein oder mehrere Bilder im Feld ab, oder klicken Sie, um sie auszuwählen.",
  "Ziehen Sie die Bilder in die gewünschte Reihenfolge und wählen Sie eine Seitengröße.",
  "Klicken Sie auf PDF erstellen. Die Datei wird sofort heruntergeladen.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "Was bedeutet „An Bild anpassen“?",
  a: "Jede Seite bekommt genau die Größe ihres Bildes, ohne Ränder. Verwenden Sie das für Scans und Screenshots. Wählen Sie A4 oder US Letter, wenn Sie normale druckbare Seiten mit dem Bild in der Mitte möchten.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Kann ich viele Bilder in eine PDF-Datei packen?",
  a: "Ja. Fügen Sie so viele Bilder hinzu, wie Sie möchten. Jedes Bild wird eine Seite, in der Reihenfolge der Liste. Ziehen Sie ein Bild nach oben oder unten, um die Reihenfolge zu ändern.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
  "Wählen Sie das Bildformat und die Auflösung, die Sie brauchen.",
  "Klicken Sie auf In Bilder umwandeln. Eine ZIP-Datei mit allen Bildern wird sofort heruntergeladen. Sie können auch jedes Bild einzeln herunterladen.",
];

const DPI_FAQ: ToolFaq = {
  q: "Welche Auflösung soll ich wählen?",
  a: "72 DPI ergibt kleine Dateien und eignet sich für das Web. 150 DPI ist ein guter Standard für Bildschirme und Präsentationen. 300 DPI ist für den Druck. Höhere DPI-Werte ergeben größere Dateien und dauern länger.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Kann ich nur eine Seite umwandeln?",
  a: "Ja. Sobald die Datei geladen ist, klicken Sie im Raster auf die gewünschten Seiten. Nur die ausgewählten Seiten werden umgewandelt.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Werden meine PDF-Datei oder mein Passwort hochgeladen?",
  a: "Nein. Datei und Passwort bleiben in Ihrem Browser. Das Tool führt das Open-Source-Programm qpdf als WebAssembly auf Ihrem eigenen Gerät aus. Keine Anfrage enthält Ihre Datei oder Ihr Passwort. Sie können die Internetverbindung trennen, sobald die Seite geladen ist – das Tool funktioniert weiter.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Was ist der Unterschied zwischen Benutzerpasswort und Besitzerpasswort?",
  a: "Eine PDF-Datei kann zwei Passwörter haben. Das Benutzerpasswort öffnet die Datei. Das Besitzerpasswort gibt vollen Zugriff und hebt die Einschränkungen beim Drucken, Kopieren und Bearbeiten auf. Ein PDF-Viewer wendet die Berechtigungen nur auf eine Person an, die die Datei mit dem Benutzerpasswort öffnet.",
};

export const pages: readonly LocalePage[] = [
  // ---- merge: nav page plus two synonym variants ----
  {
    id: "merge-pdf",
    slug: "pdf-zusammenfuegen",
    kind: "merge",
    nav: true,
    priority: 1, // "pdf zusammenfügen" 168K
    name: "PDF zusammenfügen",
    navLabel: "Zusammenfügen",
    title: "PDF zusammenfügen – Online, kostenlos, ohne Upload",
    description:
      "Mehrere PDF-Dateien in Ihrem Browser zu einem Dokument zusammenfügen. Reihenfolge per Drag-and-drop. Kostenlos, ohne Upload, ohne Konto, ohne Wasserzeichen.",
    h1: "PDF-Dateien zusammenfügen",
    intro:
      "Fügen Sie zwei oder mehr PDF-Dateien zu einer Datei zusammen. Ziehen Sie die Dateien in die gewünschte Reihenfolge. Alles passiert in Ihrem Browser.",
    actionLabel: "PDFs zusammenfügen",
    steps: [
      "Legen Sie zwei oder mehr PDF-Dateien im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Ziehen Sie die Dateien in die Reihenfolge, in der sie erscheinen sollen.",
      "Klicken Sie auf PDFs zusammenfügen. Die zusammengefügte Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie ändere ich die Reihenfolge der Dateien?",
        a: "Ziehen Sie eine Datei in der Liste nach oben oder unten, oder verwenden Sie die Pfeiltasten. Die zusammengefügte PDF-Datei folgt der Reihenfolge der Liste von oben nach unten.",
      },
      {
        q: "Verändert das Zusammenfügen die Qualität meiner Seiten?",
        a: "Nein. Die Seiten werden so kopiert, wie sie sind. Schriften, Bilder und Vektorgrafiken bleiben exakt gleich. Das Tool rendert nichts neu und komprimiert nichts.",
      },
      {
        q: "Kann ich passwortgeschützte PDF-Dateien zusammenfügen?",
        a: "Nicht direkt. Entfernen Sie das Passwort zuerst mit dem Tool PDF entsperren und fügen Sie dann diese Kopie zusammen. Sie brauchen das Passwort der Datei.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: [
      "pdf zusammenfügen",
      "pdf zusammenfügen kostenlos",
      "pdf zusammenfügen online",
      "pdfs zusammenfügen",
      "mehrere pdf zusammenfügen",
      "pdf dateien zusammenfügen",
      "pdf zusammenführen",
      "pdf verbinden",
    ],
  },
  {
    // Variant of "merge" for "pdf verbinden".
    id: "combine-pdf",
    slug: "pdf-verbinden",
    kind: "merge",
    nav: false,
    priority: 17,
    name: "PDF verbinden",
    navLabel: "Verbinden",
    title: "PDF verbinden – Mehrere PDF-Dateien online zu einer verbinden, kostenlos",
    description:
      "Verbinden Sie mehrere PDF-Dateien zu einem Dokument, direkt im Browser. Dateien hinzufügen, Reihenfolge festlegen, ein Klick, herunterladen. Ohne Upload, ohne Konto.",
    h1: "PDF-Dateien verbinden",
    intro:
      "Verbinden Sie zwei oder mehr PDF-Dateien zu einem Dokument. Fügen Sie die Dateien hinzu, legen Sie die Reihenfolge fest und laden Sie das Ergebnis herunter. Ihre Dateien bleiben auf Ihrem Gerät.",
    actionLabel: "PDFs verbinden",
    steps: [
      "Fügen Sie die PDF-Dateien hinzu, die Sie verbinden möchten. Legen Sie sie im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Bringen Sie die Dateien in die richtige Reihenfolge. Ziehen Sie sie, oder verwenden Sie die Pfeiltasten.",
      "Klicken Sie auf PDFs verbinden. Ihr Browser erstellt eine PDF-Datei und lädt sie herunter.",
    ],
    faq: [
      {
        q: "Wie verbinde ich mehrere PDF-Dateien zu einer?",
        a: "Öffnen Sie diese Seite und fügen Sie Ihre PDF-Dateien hinzu. Bringen Sie sie in die richtige Reihenfolge. Klicken Sie auf PDFs verbinden. Das Tool kopiert alle Seiten in eine neue PDF-Datei und lädt sie herunter. Sie müssen keine Software installieren.",
      },
      {
        q: "Ist das Verbinden von PDF-Dateien hier kostenlos?",
        a: "Ja. Es kostet nichts, es gibt kein Konto, kein Wasserzeichen und kein Limit für die Anzahl der Dateien. Nutzen Sie es so oft, wie Sie möchten.",
      },
      {
        q: "Kann ich PDF-Dateien auf dem Handy verbinden?",
        a: "Ja. Öffnen Sie diese Seite im Browser Ihres Handys oder Tablets. Tippen Sie auf das Feld, um Dateien auszuwählen. Die verbundene PDF-Datei landet in Ihren Downloads.",
      },
      {
        q: "Was ist der Unterschied zwischen verbinden, zusammenfügen und zusammenführen?",
        a: "Es gibt keinen. Verbinden, zusammenfügen, zusammenführen und kombinieren bedeuten dasselbe: mehrere PDF-Dateien zu einer machen. Diese Seite und die Seite PDF zusammenfügen nutzen dasselbe Tool.",
      },
      {
        q: "Behalten die Seiten ihre Größe und Qualität?",
        a: "Ja. Jede Seite wird so kopiert, wie sie ist. Nichts wird neu gerendert oder komprimiert. Seiten mit unterschiedlichen Größen können in einer Datei nebeneinander stehen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: ["pdf verbinden", "pdf dateien verbinden", "pdf verbinden kostenlos", "pdf verbinden online", "mehrere pdf verbinden", "zwei pdf verbinden"],
  },
  {
    // Locale-only variant of "merge" for "pdf zusammenführen" (Adobe's wording, heavily searched).
    id: "merge:zusammenfuehren",
    slug: "pdf-zusammenfuehren",
    kind: "merge",
    nav: false,
    priority: 15,
    name: "PDF zusammenführen",
    navLabel: "Zusammenführen",
    title: "PDF zusammenführen – Kostenlos im Browser, ohne Upload",
    description:
      "Führen Sie mehrere PDF-Dateien zu einer zusammen. Läuft in Ihrem Browser, nichts wird hochgeladen. Reihenfolge per Drag-and-drop, kein Konto, kein Wasserzeichen.",
    h1: "PDF zusammenführen",
    intro:
      "Führen Sie mehrere PDF-Dateien zu einem einzigen Dokument zusammen. Reihenfolge festlegen, ein Klick, fertig. Die Dateien bleiben in Ihrem Browser.",
    actionLabel: "PDFs zusammenführen",
    steps: [
      "Legen Sie alle PDF-Dateien im Feld ab, oder klicken Sie, um sie auszuwählen. Sie können später weitere hinzufügen.",
      "Sortieren Sie die Liste per Drag-and-drop oder mit den Pfeiltasten.",
      "Klicken Sie auf PDFs zusammenführen. Die fertige Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie führe ich mehrere PDF-Dateien zu einer zusammen?",
        a: "Fügen Sie die Dateien auf dieser Seite hinzu und bringen Sie sie in die richtige Reihenfolge. Klicken Sie auf PDFs zusammenführen. Alle Seiten werden in eine neue PDF-Datei kopiert, die Ihr Browser sofort speichert. Es ist keine Installation nötig.",
      },
      {
        q: "Wie viele PDF-Dateien kann ich zusammenführen?",
        a: "So viele, wie Sie möchten. Es gibt kein Limit für die Anzahl der Dateien oder Seiten. Bei sehr vielen großen Dateien zählt nur der Arbeitsspeicher Ihres Geräts.",
      },
      {
        q: "Kann ich Dateien mit unterschiedlichen Seitenformaten zusammenführen?",
        a: "Ja. Jede Seite behält ihre Größe und Ausrichtung. A4-Seiten, Querformat-Seiten und Scans können in einer Datei aufeinanderfolgen.",
      },
      {
        q: "Kann ich auch Bilder mit in die PDF-Datei aufnehmen?",
        a: "Nicht auf dieser Seite. Wandeln Sie die Bilder zuerst mit dem Tool Bild in PDF um und führen Sie dann die PDF-Dateien zusammen.",
      },
      {
        q: "Funktioniert das Zusammenführen auf dem Handy?",
        a: "Ja. Öffnen Sie die Seite im Browser Ihres Handys, tippen Sie auf das Feld und wählen Sie die Dateien aus. Das Ergebnis wird in Ihren Downloads gespeichert.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "combine-pdf", "organize-pdf"],
    keywords: [
      "pdf zusammenführen",
      "pdf zusammenführen kostenlos",
      "pdf zusammenführen online",
      "pdf dateien zusammenführen",
      "mehrere pdf zusammenführen",
      "pdf kombinieren",
    ],
  },

  // ---- split ----
  {
    id: "split-pdf",
    slug: "pdf-teilen",
    kind: "split",
    nav: true,
    priority: 6,
    name: "PDF teilen",
    navLabel: "Teilen",
    title: "PDF teilen – Seiten einzeln speichern oder nach Bereichen aufteilen",
    description:
      "Teilen Sie eine PDF-Datei in einzelne Dateien, eine pro Seite, oder nach Seitenbereichen wie 1-3, 5, 8-. Läuft im Browser. Kostenlos, ohne Upload, ohne Limits.",
    h1: "PDF teilen",
    intro:
      "Machen Sie aus einer PDF-Datei mehrere. Speichern Sie jede Seite als eigene Datei, oder geben Sie die Seitenbereiche ein, die Sie brauchen. Ihre Datei bleibt auf Ihrem Gerät.",
    actionLabel: "PDF teilen",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Wählen Sie „Jede Seite“, oder geben Sie Seitenbereiche wie 1-3, 5, 8- ein.",
      "Klicken Sie auf PDF teilen. Eine ZIP-Datei mit allen Teilen wird sofort heruntergeladen. Sie können auch jeden Teil einzeln herunterladen.",
    ],
    faq: [
      {
        q: "Wie teile ich eine PDF-Datei in einzelne Dateien?",
        a: "Fügen Sie die PDF-Datei hinzu und wählen Sie „Jede Seite“. Klicken Sie auf PDF teilen. Jede Seite wird eine eigene PDF-Datei. Sie bekommen alle Dateien in einer ZIP-Datei, oder Sie laden jede einzeln herunter.",
      },
      {
        q: "Wie schreibe ich Seitenbereiche?",
        a: "Trennen Sie die Einträge mit Kommas. „3“ ist eine Seite. „1-3“ sind die Seiten 1 bis 3. „8-“ ist Seite 8 bis zum Ende. Jeder Eintrag wird eine eigene PDF-Datei. Beispiel: 1-3, 5, 8- ergibt drei Dateien.",
      },
      {
        q: "Wie speichere ich nur einige Seiten aus einer PDF-Datei?",
        a: "Wählen Sie „Seitenbereiche“ und geben Sie die gewünschten Seiten ein, zum Beispiel 2, 7-9. Nur diese Seiten werden gespeichert. Die Originaldatei wird nicht verändert.",
      },
      {
        q: "Warum bekomme ich eine ZIP-Datei?",
        a: "Wenn beim Teilen mehr als eine Datei entsteht, kann der Browser nicht viele Dateien auf einmal speichern, ohne jedes Mal nachzufragen. Die ZIP-Datei enthält alle. Sie können jede Datei auch einzeln aus der Ergebnisliste herunterladen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "pdf teilen",
      "pdf teilen kostenlos",
      "pdf teilen online",
      "pdf aufteilen",
      "pdf splitten",
      "pdf seiten teilen",
      "pdf in einzelne seiten teilen",
      "pdf trennen",
    ],
  },
  {
    // Variant of "split" for "pdf trennen" / "pdf seiten extrahieren" (the extract-pages angle).
    id: "extract-pdf-pages",
    slug: "pdf-trennen",
    kind: "split",
    nav: false,
    priority: 18,
    name: "PDF trennen",
    navLabel: "Trennen",
    title: "PDF trennen – Seiten aus einer PDF herauslösen und speichern, kostenlos",
    description:
      "Trennen Sie die gewünschten Seiten aus einer PDF-Datei und speichern Sie sie als neue Datei. Seitenzahlen eingeben, fertig. Kostenlos, im Browser, ohne Upload.",
    h1: "PDF-Seiten trennen",
    intro:
      "Lösen Sie einzelne Seiten aus einer PDF-Datei heraus und speichern Sie sie als neue Datei. Seitenzahlen eingeben, ein Klick, herunterladen. Die PDF-Datei verlässt Ihr Gerät nicht.",
    actionLabel: "Seiten trennen",
    steps: [
      "Fügen Sie Ihre PDF-Datei hinzu. Legen Sie sie im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Wählen Sie „Seitenbereiche“ und geben Sie die gewünschten Seiten ein, zum Beispiel 2, 5-7, 10-. Oder wählen Sie „Jede Seite“, um jede Seite als eigene Datei zu bekommen.",
      "Klicken Sie auf Seiten trennen. Jeder Bereich wird eine PDF-Datei. Sie bekommen eine ZIP-Datei, oder Sie laden jede Datei einzeln herunter.",
    ],
    faq: [
      {
        q: "Wie trenne ich Seiten aus einer PDF-Datei?",
        a: "Fügen Sie die PDF-Datei hinzu und wählen Sie „Seitenbereiche“. Geben Sie die gewünschten Seitenzahlen ein. Klicken Sie auf Seiten trennen. Nur diese Seiten kommen in die neue Datei. Die ursprüngliche PDF-Datei wird nicht verändert.",
      },
      {
        q: "Kann ich eine einzelne Seite aus einer PDF-Datei extrahieren?",
        a: "Ja. Geben Sie eine einzelne Seitenzahl ein, zum Beispiel 4. Das Tool speichert diese Seite als neue PDF-Datei mit einer Seite.",
      },
      {
        q: "Kann ich jede Seite als eigene PDF-Datei speichern?",
        a: "Ja. Wählen Sie „Jede Seite“. Jede Seite wird eine eigene PDF-Datei. Alle Dateien kommen in einer ZIP-Datei, und Sie können sie auch einzeln herunterladen.",
      },
      {
        q: "Kann ich Seiten trennen, die nicht aufeinanderfolgen?",
        a: "Ja. Trennen Sie die Einträge mit Kommas, zum Beispiel 1, 4, 9-11. Jeder Eintrag wird eine Datei. Wenn Sie alle in einer Datei möchten, trennen Sie sie zuerst und fügen Sie die Dateien dann mit dem Tool PDF verbinden zusammen.",
      },
      {
        q: "Ist das Trennen von PDF-Seiten hier kostenlos?",
        a: "Ja. Es kostet nichts, es gibt kein Konto, kein Wasserzeichen und kein Seitenlimit. Die PDF-Datei wird in Ihrem Browser verarbeitet und nie hochgeladen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: [
      "pdf trennen",
      "pdf seiten trennen",
      "pdf seiten extrahieren",
      "seiten aus pdf extrahieren",
      "pdf seiten herauslösen",
      "einzelne seiten aus pdf speichern",
      "pdf trennen kostenlos",
    ],
  },

  // ---- rotate ----
  {
    id: "rotate-pdf",
    slug: "pdf-drehen",
    kind: "rotate",
    nav: true,
    priority: 10,
    name: "PDF drehen",
    navLabel: "Drehen",
    title: "PDF drehen – Seiten online drehen und speichern, kostenlos",
    description:
      "Drehen Sie alle oder einzelne Seiten einer PDF-Datei um 90, 180 oder 270 Grad und speichern Sie das Ergebnis. Kostenlos, im Browser, ohne Upload, ohne Wasserzeichen.",
    h1: "PDF-Seiten drehen",
    intro:
      "Bringen Sie seitlich liegende oder auf dem Kopf stehende Seiten in die richtige Lage. Drehen Sie das ganze Dokument oder nur einzelne Seiten und speichern Sie eine neue PDF-Datei.",
    actionLabel: "Gedrehte PDF speichern",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Drehen Sie alle Seiten mit den Schaltflächen oben, oder fahren Sie mit der Maus über eine Seite und drehen Sie nur diese.",
      "Klicken Sie auf Gedrehte PDF speichern. Die Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Ist die Drehung dauerhaft?",
        a: "Ja. Anders als die Drehen-Schaltfläche in einem PDF-Viewer, die nur die Ansicht ändert, schreibt dieses Tool die Drehung in die Datei. Die Seite öffnet sich in jedem Viewer und auf jedem Gerät in der neuen Ausrichtung.",
      },
      {
        q: "Kann ich nur eine Seite drehen?",
        a: "Ja. Fahren Sie mit der Maus über die Miniaturansicht einer Seite und verwenden Sie ihre Drehen-Schaltflächen. Jede Seite kann ihre eigene Drehung haben. Die Schaltflächen oben drehen alle Seiten auf einmal.",
      },
      {
        q: "Verringert das Drehen die Qualität?",
        a: "Nein. Das Tool ändert nur eine Eigenschaft der Seite. Der Inhalt wird nicht neu gerendert oder komprimiert, die Qualität bleibt also identisch.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: [
      "pdf drehen",
      "pdf drehen und speichern",
      "pdf seiten drehen",
      "pdf drehen kostenlos",
      "pdf drehen online",
      "pdf ausrichtung ändern",
      "pdf einzelne seite drehen",
    ],
  },

  // ---- organize ----
  {
    id: "organize-pdf",
    slug: "pdf-seiten-sortieren",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "PDF-Seiten sortieren",
    navLabel: "Sortieren",
    title: "PDF-Seiten sortieren und löschen – Online, kostenlos, ohne Upload",
    description:
      "Seiten einer PDF-Datei neu anordnen, überflüssige Seiten löschen, Ergebnis herunterladen. Kostenlos, im Browser, ohne Upload, ohne Konto, ohne Wasserzeichen.",
    h1: "PDF-Seiten sortieren",
    intro:
      "Sortieren Sie Seiten per Drag-and-drop, löschen Sie die Seiten, die Sie nicht brauchen, und speichern Sie eine neue, saubere PDF-Datei. Nichts verlässt Ihr Gerät.",
    actionLabel: "Sortierte PDF speichern",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Ziehen Sie die Seiten in eine neue Reihenfolge. Fahren Sie mit der Maus über eine Seite, um sie zu löschen oder zu drehen.",
      "Klicken Sie auf Sortierte PDF speichern. Die Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie lösche ich Seiten aus einer PDF-Datei?",
        a: "Fahren Sie mit der Maus über die Seite und klicken Sie auf das Papierkorb-Symbol. Die Seite wird aus dem Ergebnis entfernt. Gelöschte Seiten sind in der gespeicherten Datei gar nicht mehr enthalten, die Datei wird also kleiner.",
      },
      {
        q: "Kann ich Seiten auf dem Handy sortieren?",
        a: "Ja. Halten Sie eine Seite gedrückt und ziehen Sie sie an ihren neuen Platz. Mit der Tastatur: Seite fokussieren, Leertaste drücken, mit den Pfeiltasten verschieben und erneut die Leertaste drücken.",
      },
      {
        q: "Ich habe die falsche Seite gelöscht. Kann ich das rückgängig machen?",
        a: "Ja. Verwenden Sie die Schaltfläche Rückgängig, die nach dem Löschen erscheint, oder klicken Sie auf Zurücksetzen, um zur ursprünglichen Reihenfolge mit allen Seiten zurückzukehren.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: [
      "pdf seiten sortieren",
      "pdf seiten löschen",
      "pdf sortieren",
      "pdf seiten neu anordnen",
      "pdf seiten verschieben",
      "seiten aus pdf entfernen",
      "pdf seiten ordnen",
    ],
  },

  // ---- images to PDF: one component, five pages ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 12,
    name: "JPG in PDF",
    navLabel: "JPG in PDF",
    title: "JPG in PDF umwandeln – Online und kostenlos, ohne Upload",
    description:
      "Wandeln Sie JPG-Fotos und Scans im Browser in eine PDF-Datei um. Wählen Sie A4, US Letter oder Bildgröße. Kostenlos, ohne Upload, ohne Konto, ohne Wasserzeichen.",
    h1: "JPG in PDF umwandeln",
    intro:
      "Machen Sie aus einem JPG oder einer ganzen Fotoserie eine einzige PDF-Datei. Wählen Sie die Seitengröße und ziehen Sie die Bilder in die richtige Reihenfolge. Ihre Fotos verlassen nie Ihr Gerät.",
    actionLabel: "PDF erstellen",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Behält die PDF-Datei die volle Qualität meines JPG?",
        a: "Ja. Die JPG-Daten werden genau so in die PDF-Datei übernommen, wie sie sind, ohne erneute Komprimierung. Ein Foto mit 12 Megapixeln bleibt ein Foto mit 12 Megapixeln. Die PDF-Datei ist etwa so groß wie alle Bilder zusammen.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Mein Handyfoto liegt auf der Seite. Warum?",
        a: "Manche Handys speichern die Drehung als versteckte Markierung, statt die Pixel zu drehen. Diese Version liest diese Markierung noch nicht. Öffnen Sie das Foto in einem beliebigen Bildprogramm, speichern Sie es einmal und fügen Sie es erneut hinzu.",
      },
      {
        q: "Kann ich JPG mit PNG- oder WebP-Dateien mischen?",
        a: "Ja. Dasselbe Tool akzeptiert JPG, PNG und WebP zusammen. Jedes Bild wird eine Seite.",
      },
      PRIVACY_FAQ,
      {
        q: "Ist es kostenlos, hier JPG in PDF umzuwandeln?",
        a: "Ja. Es ist kostenlos, ohne Limit für die Anzahl der Bilder und ohne Wasserzeichen. Die PDF-Datei entsteht in Ihrem Browser, Ihre Fotos werden also nicht hochgeladen. Sie brauchen kein Konto.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: ["jpg in pdf", "jpg in pdf umwandeln", "jpg zu pdf", "jpeg in pdf", "foto in pdf umwandeln", "jpg in pdf umwandeln kostenlos", "jpg in pdf online"],
  },
  {
    id: "png-to-pdf",
    slug: "png-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 19,
    name: "PNG in PDF",
    navLabel: "PNG in PDF",
    title: "PNG in PDF umwandeln – Verlustfrei, online und kostenlos",
    description:
      "Wandeln Sie PNG-Screenshots, Diagramme und Grafiken ohne Qualitätsverlust in eine PDF-Datei um. Transparenz bleibt erhalten. Kostenlos, im Browser, ohne Upload.",
    h1: "PNG in PDF umwandeln",
    intro:
      "Machen Sie aus PNG-Bildern eine PDF-Datei, ohne Qualitätsverlust. Screenshots, Diagramme und Logos mit Transparenz funktionieren alle. Alles läuft in Ihrem Browser.",
    actionLabel: "PDF erstellen",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Ist PNG in PDF verlustfrei?",
        a: "Ja. PNG ist ein verlustfreies Format, und die PDF-Datei bettet die PNG-Daten unverändert ein. Text in Screenshots bleibt scharf, und die Farben verschieben sich nicht.",
      },
      {
        q: "Was passiert mit der Transparenz?",
        a: "Die PDF-Datei behält den Alphakanal. Transparente Bereiche zeigen den Seitenhintergrund, der in den meisten Viewern weiß ist. Nichts wird abgeflacht oder aufgefüllt.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Welche Seitengröße ist für Screenshots am besten?",
        a: "Verwenden Sie „An Bild anpassen“, damit jede Seite genau die Pixelgröße des Screenshots hat und keine Ränder. Verwenden Sie A4 oder US Letter, wenn Sie die Seiten drucken möchten.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png in pdf", "png in pdf umwandeln", "png zu pdf", "png in pdf umwandeln kostenlos", "screenshot in pdf umwandeln"],
  },
  {
    id: "webp-to-pdf",
    slug: "webp-in-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 22,
    name: "WebP in PDF",
    navLabel: "WebP in PDF",
    title: "WebP in PDF umwandeln – Online und kostenlos, ohne Upload",
    description:
      "Wandeln Sie WebP-Bilder im Browser in eine PDF-Datei um. Kein Upload, kein Konto. Fassen Sie mehrere WebP-Dateien kostenlos in einem Dokument zusammen.",
    h1: "PDF aus WebP-Bildern erstellen",
    intro:
      "WebP-Bilder aus dem Web lassen sich in vielen PDF-Tools nicht öffnen. Dieses Tool wandelt sie in Ihrem Browser um und fasst sie in einer einzigen PDF-Datei zusammen.",
    actionLabel: "PDF erstellen",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Wie wird WebP umgewandelt?",
        a: "Ihr Browser dekodiert das WebP-Bild, und das Tool speichert die Pixel als PNG in der PDF-Datei. Dieser Schritt ist verlustfrei, die PDF-Datei sieht also genau wie das ursprüngliche WebP aus.",
      },
      {
        q: "Warum lehnen andere Tools meine WebP-Dateien ab?",
        a: "PDF unterstützt WebP nicht von Haus aus, und viele Konverter verarbeiten nur JPG und PNG. PDF Anvil nutzt den Decoder des Browsers selbst, der WebP in jedem modernen Browser unterstützt.",
      },
      {
        q: "Funktioniert animiertes WebP?",
        a: "Es wird nur das erste Einzelbild verwendet. Eine PDF-Seite ist ein Standbild.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["png-to-pdf", "jpg-to-pdf", "image-to-pdf"],
    keywords: ["webp in pdf", "webp in pdf umwandeln", "webp zu pdf", "webp in pdf umwandeln kostenlos"],
  },
  {
    id: "image-to-pdf",
    slug: "bild-in-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 4, // "bild in pdf"; the general term is the nav page, as in English
    name: "Bild in PDF",
    navLabel: "Bild in PDF",
    title: "Bild in PDF umwandeln – JPG, PNG und WebP in PDF, kostenlos",
    description:
      "Wandeln Sie beliebige Bilder in eine PDF-Datei um: JPG, PNG und WebP, auch gemischt. Seitengröße und Reihenfolge wählen. Kostenlos, privat, im Browser, ohne Upload.",
    h1: "JPG, PNG oder WebP in PDF umwandeln",
    intro:
      "Fassen Sie JPG-, PNG- und WebP-Bilder in einer einzigen PDF-Datei zusammen. Mischen Sie die Formate frei, wählen Sie eine Seitengröße und ziehen Sie die Bilder in die richtige Reihenfolge. Nichts verlässt Ihr Gerät.",
    actionLabel: "PDF erstellen",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Welche Bildformate funktionieren?",
        a: "JPG, PNG und WebP. JPG und PNG werden direkt eingebettet. WebP wird dekodiert und in PNG umgewandelt, bevor es hinzugefügt wird. Sie können alle drei in einer PDF-Datei mischen.",
      },
      {
        q: "Kann ich aus Fotos auf meinem Handy eine PDF-Datei machen?",
        a: "Ja. Öffnen Sie diese Seite auf Ihrem Handy, tippen Sie auf das Feld und wählen Sie Fotos aus Ihrer Galerie. Die PDF-Datei entsteht auf dem Handy und wird in Ihren Downloads gespeichert.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Behält die PDF-Datei die volle Auflösung meiner Bilder?",
        a: "Ja. Die Bilddaten werden ohne Neuberechnung eingebettet. Das bedeutet auch, dass die PDF-Datei etwa so groß ist wie alle Bilder zusammen.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: [
      "bild in pdf",
      "bild in pdf umwandeln",
      "bilder in pdf umwandeln",
      "bild zu pdf",
      "foto in pdf",
      "in pdf umwandeln",
      "pdf erstellen",
      "bild in pdf umwandeln kostenlos",
    ],
  },
  {
    id: "scan-to-pdf",
    slug: "als-pdf-scannen",
    kind: "images-to-pdf",
    nav: false,
    priority: 21,
    name: "Als PDF scannen",
    navLabel: "Scannen",
    title: "Dokumente als PDF scannen – Mit der Handykamera, online und kostenlos",
    description:
      "Scannen Sie Papierdokumente mit der Kamera Ihres Handys oder aus vorhandenen Fotos als PDF. Seiten sortieren, A4 oder US Letter wählen. Kostenlos, ohne Upload.",
    h1: "PDF mit dem Handy scannen",
    intro:
      "Fotografieren Sie jede Seite mit der Kamera Ihres Handys, oder fügen Sie vorhandene Fotos hinzu. Bringen Sie die Seiten in die richtige Reihenfolge und erhalten Sie eine PDF-Datei. Nichts wird hochgeladen.",
    actionLabel: "PDF erstellen",
    steps: [
      "Tippen Sie auf Foto aufnehmen und fotografieren Sie die erste Seite. Oder tippen Sie auf das Feld, um vorhandene Fotos hinzuzufügen.",
      "Wiederholen Sie das für jede Seite. Ziehen Sie die Seiten in die richtige Reihenfolge und wählen Sie eine Seitengröße.",
      "Tippen Sie auf PDF erstellen. Die Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie scanne ich ein Dokument mit dem Handy?",
        a: "Öffnen Sie diese Seite auf Ihrem Handy. Tippen Sie auf Foto aufnehmen. Die Kamera öffnet sich. Fotografieren Sie die erste Seite und bestätigen Sie das Foto. Tippen Sie für die nächste Seite erneut auf Foto aufnehmen. Wenn alle Seiten in der Liste sind, tippen Sie auf PDF erstellen. Die PDF-Datei wird auf Ihrem Handy gespeichert.",
      },
      {
        q: "Kann ich das auch am Computer nutzen?",
        a: "Ja. Am Computer öffnet die Schaltfläche Foto aufnehmen die normale Dateiauswahl. Wählen Sie Fotos oder Scans, die bereits auf Ihrem Computer liegen, bringen Sie sie in die richtige Reihenfolge und erstellen Sie die PDF-Datei.",
      },
      {
        q: "Werden meine Fotos auf einen Server hochgeladen?",
        a: "Nein. Das Foto geht von der Kamera Ihres Handys direkt in die Seite in Ihrem Browser. Auch die PDF-Datei entsteht dort. Nichts wird an uns gesendet. Sie können die Internetverbindung trennen, sobald die Seite geladen ist – das Tool funktioniert weiter.",
      },
      {
        q: "Wie bekomme ich gerade, gut lesbare Seiten?",
        a: "Legen Sie das Dokument auf eine ebene Fläche mit einfarbigem Hintergrund. Sorgen Sie für gutes Licht und vermeiden Sie Schatten von Hand oder Handy. Halten Sie das Handy parallel zur Seite und füllen Sie den Bildausschnitt mit der Seite. Tippen Sie vor dem Foto auf den Bildschirm, um scharfzustellen. Das Tool schneidet das Foto nicht zu und begradigt es nicht.",
      },
      {
        q: "Welche Seitengröße soll ich wählen?",
        a: "Wählen Sie A4 oder US Letter für normale druckbare Seiten mit dem Foto in der Mitte. A4 ist die Voreinstellung. Wählen Sie „An Bild anpassen“, damit jede Seite genau die Größe des Fotos hat, ohne Ränder.",
      },
      {
        q: "Kann ich viele Seiten in eine PDF-Datei scannen?",
        a: "Ja. Machen Sie ein Foto pro Seite. Jedes Foto wird eine Seite, in der Reihenfolge der Liste. Es gibt kein Seitenlimit. Ziehen Sie eine Seite nach oben oder unten, um die Reihenfolge zu ändern.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: ["als pdf scannen", "dokument scannen pdf", "mit handy scannen pdf", "scannen in pdf", "handy scanner pdf", "dokumente als pdf scannen"],
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
    title: "PDF in JPG umwandeln – Seiten online als JPG speichern, kostenlos",
    description:
      "Speichern Sie jede Seite einer PDF-Datei als JPG-Bild mit 72, 150 oder 300 DPI. Läuft im Browser. Kostenlos, privat, ohne Upload, ohne Wasserzeichen, ohne Limits.",
    h1: "PDF in JPG umwandeln",
    intro:
      "Speichern Sie jede Seite einer PDF-Datei als JPG-Bild. Wählen Sie die Auflösung und die Seiten und laden Sie ein Bild oder alle als ZIP-Datei herunter.",
    actionLabel: "In Bilder umwandeln",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Wie speichere ich eine PDF-Datei als JPG?",
        a: "Fügen Sie die PDF-Datei auf dieser Seite hinzu. Lassen Sie JPG als Format und wählen Sie eine Auflösung. Klicken Sie auf In Bilder umwandeln. Jede Seite wird als JPG-Datei gespeichert. Laden Sie die Bilder einzeln oder alle zusammen als ZIP-Datei herunter.",
      },
      DPI_FAQ,
      {
        q: "Wann sollte ich JPG statt PNG wählen?",
        a: "JPG ist kleiner und ideal für Fotos und gescannte Seiten. Wechseln Sie zu PNG für Text, Diagramme und Screenshots, bei denen scharfe Kanten wichtig sind.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Enthält das JPG die ganze Seite?",
        a: "Ja. Die komplette Seite wird gerendert, mit Bildern, Vektorgrafiken und Text, genau wie ein PDF-Viewer sie anzeigt. Formularfelder und Anmerkungen werden so übernommen, wie sie erscheinen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf in jpg", "pdf in jpg umwandeln", "pdf zu jpg", "pdf als jpg speichern", "pdf in jpeg", "pdf in jpg umwandeln kostenlos", "pdf seite als jpg"],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-in-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 20,
    name: "PDF in PNG",
    navLabel: "PDF in PNG",
    title: "PDF in PNG umwandeln – Seiten verlustfrei als PNG speichern",
    description:
      "Speichern Sie PDF-Seiten als verlustfreie PNG-Bilder mit 72, 150 oder 300 DPI. Scharfer Text und scharfe Diagramme. Im Browser, kostenlos, privat, ohne Upload.",
    h1: "PDF in PNG umwandeln",
    intro:
      "Speichern Sie PDF-Seiten als verlustfreie PNG-Bilder. Text, Diagramme und Screenshots bleiben scharf. Wählen Sie die Auflösung und die Seiten und laden Sie sie herunter.",
    actionLabel: "In Bilder umwandeln",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Warum PNG statt JPG?",
        a: "PNG ist verlustfrei. Textkanten, dünne Linien und Flächenfarben bleiben exakt, ohne Kompressionsartefakte. Es ist die richtige Wahl für Folien, Diagramme, Formulare und alles, was Sie weiterbearbeiten möchten.",
      },
      DPI_FAQ,
      {
        q: "Ist der PNG-Hintergrund transparent?",
        a: "Nein. PDF-Seiten haben per Definition einen weißen Hintergrund, und das PNG behält ihn. Verwenden Sie ein Bildprogramm, wenn Sie ihn entfernen möchten.",
      },
      {
        q: "Mit welcher Auflösung wandle ich für den Druck um?",
        a: "Verwenden Sie 300 DPI. Das ist die übliche Druckauflösung, und das PNG behält jeden Pixel. Für Bildschirme und Präsentationen ergibt 150 DPI kleinere Dateien bei guter Schärfe.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf in png", "pdf in png umwandeln", "pdf zu png", "pdf in png umwandeln kostenlos", "pdf seite als png", "pdf in png hohe auflösung"],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-in-bild",
    kind: "pdf-to-images",
    nav: true,
    priority: 5,
    name: "PDF in Bild",
    navLabel: "PDF in Bild",
    title: "PDF in Bild umwandeln – Seiten als JPG oder PNG speichern, kostenlos",
    description:
      "Wandeln Sie PDF-Seiten in Bilder um. Wählen Sie JPG oder PNG und 72, 150 oder 300 DPI. Wählen Sie die Seiten, die Sie brauchen. Kostenlos, im Browser, ohne Upload.",
    h1: "PDF in Bilder umwandeln",
    intro:
      "Machen Sie aus PDF-Seiten Bilddateien. Wählen Sie JPG für Fotos und Scans oder PNG für Text und Diagramme, wählen Sie die Auflösung und laden Sie die gewünschten Seiten herunter.",
    actionLabel: "In Bilder umwandeln",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG oder PNG?",
        a: "JPG ist kleiner und ideal für Fotos und gescannte Seiten. PNG ist verlustfrei und ideal für Text, Diagramme und Screenshots, bei denen scharfe Kanten wichtig sind.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Kann ich ein einziges Bild vom ganzen Dokument bekommen?",
        a: "Jede Seite wird ein eigenes Bild. Wenn Sie ein einziges hohes Bild brauchen, wandeln Sie die Seiten um und setzen Sie sie in einem Bildprogramm zusammen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf in bild", "pdf in bild umwandeln", "pdf zu bild", "pdf als bild speichern", "pdf seite als bild", "pdf in bild umwandeln kostenlos"],
  },

  // ---- compress: one component, two pages ----
  {
    id: "compress-pdf",
    slug: "pdf-komprimieren",
    kind: "compress",
    nav: true,
    priority: 2,
    name: "PDF komprimieren",
    navLabel: "Komprimieren",
    title: "PDF komprimieren – Dateigröße online verringern, kostenlos, ohne Upload",
    description:
      "Komprimieren Sie eine PDF-Datei im Browser. Verlustfrei, ausgewogen oder kleinste Datei. Fotos werden neu kodiert, Text bleibt scharf. Kostenlos, ohne Upload.",
    h1: "PDF komprimieren",
    intro:
      "Machen Sie eine PDF-Datei kleiner. Stufe wählen, ein Klick, herunterladen. Text und Vektorgrafiken bleiben scharf. Ihre Datei verlässt nie Ihr Gerät.",
    actionLabel: "PDF komprimieren",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Wählen Sie eine Stufe. Verlustfrei behält jeden Pixel. Ausgewogen ist die beste Wahl für die meisten Dateien. Kleinste Datei drückt die Größe so weit wie möglich.",
      "Klicken Sie auf PDF komprimieren. Das Tool zeigt die alte und die neue Größe, und die Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie viel kleiner wird meine PDF-Datei?",
        a: "Das hängt vom Inhalt ab. Eine PDF-Datei voller großer Fotos oder Scans kann mit der Stufe Ausgewogen um 50 bis 90 Prozent schrumpfen. Eine PDF-Datei, die nur Text und Vektorgrafiken enthält, schrumpft viel weniger, oft um 5 bis 20 Prozent, weil es nichts Großes neu zu kodieren gibt. Das Tool zeigt nach jedem Durchlauf die alte und die neue Größe.",
      },
      {
        q: "Welche Stufe soll ich wählen?",
        a: "Ausgewogen ist die beste Wahl für die meisten Dateien. Bilder werden auf 1600 Pixel an der langen Seite begrenzt, das ist scharf am Bildschirm und gut für normalen Druck. Wählen Sie Kleinste Datei für E-Mail-Anhänge und Upload-Limits. Bilder werden auf 1100 Pixel begrenzt und stärker als JPEG komprimiert. Wählen Sie Verlustfrei, wenn die Bilder exakt so bleiben müssen, wie sie sind. Dann wird nur die Dateistruktur bereinigt, und ungenutzte Daten werden entfernt.",
      },
      {
        q: "Verringert die Komprimierung die Qualität des Textes?",
        a: "Nein. Text, Schriften, Linien und Vektorgrafiken werden auf keiner Stufe verändert. Nur große Fotos und Scans werden neu kodiert, und nur auf den Stufen Ausgewogen und Kleinste Datei. Wenn das neue Bild nicht kleiner als das alte ist, bleibt das alte erhalten.",
      },
      {
        q: "Warum ist meine Datei nicht kleiner geworden?",
        a: "Manche Dateien sind schon so klein, wie sie sein können. Ihre Bilder sind bereits kleine JPEGs, oder die Datei enthält gar keine Bilder, nur Text und Vektorformen. Auch Dateien, die ein anderes Tool schon komprimiert hat, ändern sich kaum. In dem Fall meldet das Tool, dass die Datei bereits kompakt war.",
      },
      {
        q: "Welche Bilder komprimiert das Tool?",
        a: "JPEG-Bilder sowie unkomprimierte oder Flate-komprimierte RGB- und Graustufenbilder mit mindestens 64 KB und mindestens 200 Pixeln Breite oder Höhe. Bilder mit Transparenz, indizierten Farben, CMYK oder ungewöhnlichen Farbräumen bleiben unverändert, damit die Farben nicht verfälscht werden.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "pdf komprimieren",
      "pdf komprimieren kostenlos",
      "pdf komprimieren online",
      "pdf verkleinern",
      "pdf dateigröße verringern",
      "pdf reduzieren",
      "pdf komprimieren ohne qualitätsverlust",
    ],
  },
  {
    // Variant of "compress" for "pdf verkleinern".
    id: "reduce-pdf-size",
    slug: "pdf-verkleinern",
    kind: "compress",
    nav: false,
    priority: 14,
    name: "PDF verkleinern",
    navLabel: "Verkleinern",
    title: "PDF verkleinern – Dateigröße für E-Mail und Upload reduzieren, kostenlos",
    description:
      "Verkleinern Sie eine PDF-Datei für E-Mail und Uploads. Läuft im Browser, mit drei Stufen und Größe vorher und nachher. Kostenlos, ohne Upload, ohne Konto.",
    h1: "PDF verkleinern",
    intro:
      "Bringen Sie eine PDF-Datei unter das Limit eines E-Mail-Postfachs oder eines Upload-Formulars. Wählen Sie, wie klein sie werden soll, klicken Sie einmal und sehen Sie die alte und die neue Größe. Die PDF-Datei bleibt auf Ihrem Gerät.",
    actionLabel: "PDF verkleinern",
    steps: [
      "Fügen Sie Ihre PDF-Datei hinzu. Legen Sie sie im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Wählen Sie eine Stufe. Beginnen Sie mit Ausgewogen. Wenn die Datei immer noch zu groß ist, lassen Sie sie erneut mit Kleinste Datei durchlaufen.",
      "Klicken Sie auf PDF verkleinern. Das Tool zeigt, wie viel Prozent gespart wurden, und die kleinere Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie verkleinere ich eine PDF-Datei?",
        a: "Fügen Sie die PDF-Datei auf dieser Seite hinzu und wählen Sie eine Stufe. Klicken Sie auf PDF verkleinern. Das Tool schreibt die Datei neu, entfernt ungenutzte Daten und verkleinert große Fotos. Die neue PDF-Datei wird sofort heruntergeladen, und die Seite zeigt die alte und die neue Größe.",
      },
      {
        q: "Wie bekomme ich eine PDF-Datei unter 1 MB oder unter 5 MB?",
        a: "Lassen Sie die Datei mit der Stufe Ausgewogen durchlaufen und lesen Sie die neue Größe ab. Liegt sie noch über dem Limit, lassen Sie sie erneut mit Kleinste Datei durchlaufen. Ist die Datei dann immer noch zu groß, enthält sie viele Seiten mit Bildern. Teilen Sie sie mit dem Tool PDF teilen in Teile und senden Sie jeden Teil einzeln.",
      },
      {
        q: "Verändert das Verkleinern den Text?",
        a: "Nein. Text und Vektorgrafiken werden so kopiert, wie sie sind. Nur große Fotos und Scans werden verkleinert. Der Text bleibt am Bildschirm und im Druck scharf.",
      },
      {
        q: "Warum ist meine PDF-Datei so groß?",
        a: "Meistens enthält die Datei Fotos oder gescannte Seiten in sehr hoher Auflösung. Eine mit 600 DPI gescannte Seite kann mehrere Megabyte belegen. Die Stufe Ausgewogen begrenzt Bilder auf 1600 Pixel an der langen Seite, was zum Lesen und für normalen Druck reicht.",
      },
      {
        q: "Ist das Verkleinern von PDF-Dateien hier kostenlos?",
        a: "Ja. Es kostet nichts, es gibt kein Konto, kein Wasserzeichen und kein Limit für die Anzahl der Dateien. Die PDF-Datei wird in Ihrem Browser verarbeitet und nie hochgeladen.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "pdf verkleinern",
      "pdf verkleinern kostenlos",
      "pdf verkleinern online",
      "pdf datei verkleinern",
      "pdf größe reduzieren",
      "pdf kleiner machen",
      "pdf verkleinern für e-mail",
    ],
  },

  // ---- passwords ----
  {
    id: "unlock-pdf",
    slug: "pdf-entsperren",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "PDF entsperren",
    navLabel: "Entsperren",
    title: "PDF entsperren – Passwort aus PDF entfernen, online und kostenlos",
    description:
      "Entfernen Sie ein Passwort, das Sie kennen, aus einer PDF-Datei. Passwort eingeben, ein Klick, Kopie ohne Passwort herunterladen. Kostenlos, im Browser, ohne Upload.",
    h1: "PDF entsperren",
    intro:
      "Entfernen Sie das Passwort aus einer PDF-Datei. Geben Sie das Passwort ein, das Sie kennen, klicken Sie einmal und laden Sie eine Kopie herunter, die sich ohne Passwort öffnet. Die Datei bleibt auf Ihrem Gerät.",
    actionLabel: "PDF entsperren",
    steps: [
      "Legen Sie eine passwortgeschützte PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Geben Sie das Passwort der Datei ein. Das Passwort zum Öffnen und das Besitzerpasswort funktionieren beide.",
      "Klicken Sie auf PDF entsperren. Eine Kopie ohne Passwort und ohne Einschränkungen wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Ich habe das Passwort vergessen. Können Sie es entfernen?",
        a: "Nein. Das Tool braucht das Passwort. Es errät, knackt oder umgeht keine Passwörter. Eine PDF-Datei mit AES-Verschlüsselung lässt sich ohne das richtige Passwort nicht öffnen. Wenn Sie es nicht kennen, fragen Sie die Person, die die Datei erstellt hat.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Welches Passwort gebe ich hier ein?",
        a: "Eines von beiden. Wenn Sie nur das Passwort zum Öffnen kennen, geben Sie dieses ein. Wenn Sie das Besitzerpasswort kennen, geben Sie dieses ein. Das Ergebnis hat kein Passwort und keine Einschränkungen.",
      },
      {
        q: "Warum lässt sich meine PDF-Datei hier nicht öffnen?",
        a: "Drei Ursachen sind häufig. Das Passwort ist nicht korrekt: Prüfen Sie Großbuchstaben und Leerzeichen und versuchen Sie es erneut. Die Datei ist beschädigt: Öffnen Sie sie zur Kontrolle in einem PDF-Viewer. Die Datei verwendet ein Zertifikat oder ein Rechteverwaltungssystem statt eines Passworts: Solche Dateien kann das Tool nicht öffnen.",
      },
      {
        q: "Kann ich nur die Einschränkungen entfernen und das Passwort zum Öffnen behalten?",
        a: "Nein. Das Ergebnis hat überhaupt kein Passwort. Um ein neues Passwort zu setzen, öffnen Sie das Ergebnis im Tool PDF schützen.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: [
      "pdf entsperren",
      "pdf passwort entfernen",
      "pdf passwortschutz entfernen",
      "pdf kennwort entfernen",
      "pdf entschlüsseln",
      "pdf schutz aufheben",
      "pdf entsperren kostenlos",
    ],
  },
  {
    id: "protect-pdf",
    slug: "pdf-schuetzen",
    kind: "protect",
    nav: true,
    priority: 9,
    name: "PDF schützen",
    navLabel: "Schützen",
    title: "PDF schützen – PDF mit Passwort verschlüsseln, online und kostenlos",
    description:
      "Schützen Sie eine PDF-Datei im Browser mit Passwort und AES-256. Legen Sie fest, wer drucken, kopieren oder bearbeiten darf. Kostenlos, ohne Upload, ohne Konto.",
    h1: "PDF mit Passwort schützen",
    intro:
      "Versehen Sie eine PDF-Datei mit einem Passwort. Die Datei wird in Ihrem Browser mit AES-256 verschlüsselt, und nur wer das Passwort kennt, kann sie öffnen. Nichts wird hochgeladen.",
    actionLabel: "PDF schützen",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Geben Sie das Passwort zum Öffnen der Datei ein. Legen Sie bei Bedarf ein Besitzerpasswort und die Berechtigungen fest.",
      "Klicken Sie auf PDF schützen. Die verschlüsselte Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Welche Verschlüsselung verwendet das Tool?",
        a: "AES-256, die stärkste Verschlüsselung im PDF-Standard (PDF 2.0). Jeder aktuelle PDF-Viewer öffnet sie: Adobe Reader, Chrome, Edge, Firefox, Safari und die Vorschau auf dem Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "Was passiert, wenn ich das Besitzerpasswort leer lasse?",
        a: "Das Tool verwendet das Passwort zum Öffnen für beides. Dann schränken die Berechtigungen niemanden ein, der dieses Passwort kennt. Legen Sie ein anderes Besitzerpasswort fest, wenn die Berechtigungen gelten sollen.",
      },
      {
        q: "Was bewirken die Berechtigungen?",
        a: "Sie sagen einem PDF-Viewer, was eine Person mit dem Benutzerpasswort darf: die Datei drucken, Text und Bilder kopieren und die Datei bearbeiten. Eine Person mit dem Besitzerpasswort darf alles. Die meisten Viewer halten sich an die Berechtigungen, aber sie sind ein Hinweis, kein Schloss. Der echte Schutz ist das Passwort.",
      },
      {
        q: "Kann ich das Passwort später entfernen?",
        a: "Ja. Öffnen Sie die Datei im Tool PDF entsperren und geben Sie das Passwort ein. Sie erhalten eine Kopie ohne Passwort. Bewahren Sie das Passwort an einem sicheren Ort auf. Ohne Passwort lässt sich die Datei nicht öffnen.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Wie lang sollte das Passwort sein?",
        a: "Verwenden Sie mindestens 12 Zeichen mit Buchstaben, Ziffern und Sonderzeichen. AES-256 ist stark, aber ein Programm kann ein kurzes Passwort erraten. Senden Sie das Passwort nicht in derselben E-Mail wie die Datei.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: [
      "pdf schützen",
      "pdf mit passwort schützen",
      "pdf verschlüsseln",
      "pdf passwort setzen",
      "pdf passwortschutz",
      "pdf sperren",
      "pdf schützen kostenlos",
    ],
  },

  // ---- viewer ----
  {
    id: "pdf-viewer",
    slug: "pdf-oeffnen",
    kind: "view",
    nav: true,
    priority: 7,
    name: "PDF öffnen",
    navLabel: "Öffnen",
    title: "PDF öffnen – Kostenloser PDF-Viewer im Browser, ohne Upload",
    description:
      "Öffnen und lesen Sie eine PDF-Datei in Ihrem Browser. Blättern, zoomen, drucken. Kostenloser PDF-Viewer ohne Upload, ohne Konto und ohne Adobe-Software.",
    h1: "PDF öffnen und lesen",
    intro:
      "Öffnen Sie eine PDF-Datei und lesen Sie sie in Ihrem Browser. Blättern Sie durch die Seiten, zoomen Sie hinein und drucken Sie. Die Datei bleibt auf Ihrem Gerät.",
    actionLabel: "Drucken",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen.",
      "Blättern Sie durch die Seiten. Mit der Symbolleiste springen Sie zu einer Seite, zoomen hinein oder heraus oder passen die Seite an die Fensterbreite an.",
      "Klicken Sie auf Drucken, um die Datei in einem neuen Tab zu öffnen und aus Ihrem Browser zu drucken. Klicken Sie auf das X neben dem Dateinamen, um eine andere Datei zu öffnen.",
    ],
    faq: [
      {
        q: "Wie öffne ich eine PDF-Datei ohne Adobe?",
        a: "Legen Sie die Datei auf dieser Seite ab, oder klicken Sie auf das Feld und wählen Sie sie aus. Sie brauchen weder Adobe Acrobat noch Adobe Reader. Die Seite zeichnet die PDF-Datei mit derselben Open-Source-Engine, die Firefox verwendet. Es funktioniert in Chrome, Edge, Firefox und Safari. Es muss nichts installiert werden.",
      },
      {
        q: "Was ist ein PDF-Reader?",
        a: "Ein PDF-Reader ist ein Programm, das PDF-Dateien öffnet und die Seiten auf Ihrem Bildschirm anzeigt. Adobe Reader ist ein Beispiel. Die meisten Browser haben auch einen eingebaut. Diese Seite ist ein PDF-Reader, der als Webseite läuft. Sie zeichnet jede Seite in Ihrem Browser und sendet die Datei nirgendwohin.",
      },
      {
        q: "Wird meine PDF-Datei hochgeladen, wenn ich sie öffne?",
        a: "Nein. JavaScript liest die Datei auf Ihrem eigenen Gerät und zeichnet sie dort auf Ihren Bildschirm. Nichts wird an einen Server gesendet. Sie können das im Netzwerk-Panel Ihres Browsers prüfen: Keine Anfrage enthält Ihre Datei.",
      },
      {
        q: "Funktioniert der Viewer offline?",
        a: "Größtenteils. Die Datei wird in Ihrem Browser geöffnet, und keine Daten gehen an einen Server. Der Code des Viewers und einige Schriften werden beim ersten Bedarf von unserer Website geladen. Öffnen Sie die Seite und eine Datei, solange Sie online sind. Danach können Sie ohne Verbindung weitere Dateien öffnen, bis Sie den Tab schließen.",
      },
      {
        q: "Kann ich die PDF-Datei drucken?",
        a: "Ja. Klicken Sie in der Symbolleiste auf Drucken. Die Datei öffnet sich in einem neuen Tab im PDF-Viewer Ihres Browsers. Drücken Sie dort Ctrl+P (Cmd+P auf dem Mac), um sie zu drucken. Der Browser druckt die Originaldatei, der Text bleibt auf Papier also scharf.",
      },
      {
        q: "Kann ich hineinzoomen?",
        a: "Ja. Verwenden Sie die Plus- und Minus-Schaltflächen in der Symbolleiste, oder klicken Sie auf An Breite anpassen, damit die Seite so breit wie das Fenster wird. Jede Seite wird in der neuen Größe neu gezeichnet, der Text bleibt also bei jeder Zoomstufe scharf.",
      },
      {
        q: "Kann ich die PDF-Datei hier bearbeiten?",
        a: "Nein. Dieses Tool zeigt die Datei nur an. Um Text, Abdeckungen, Bilder oder eine Unterschrift über eine Seite zu legen, verwenden Sie das Tool PDF bearbeiten. Zum Drehen, Sortieren, Löschen, Teilen, Zusammenfügen oder Umwandeln von Seiten verwenden Sie die anderen Tools auf dieser Website.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "pdf öffnen",
      "pdf öffnen online",
      "pdf anzeigen",
      "pdf viewer",
      "pdf viewer online",
      "pdf reader online",
      "pdf lesen online",
      "pdf öffnen ohne adobe",
    ],
  },

  // ---- edit: one component, two pages ----
  {
    id: "edit-pdf",
    slug: "pdf-bearbeiten",
    kind: "edit",
    nav: true,
    priority: 3,
    name: "PDF bearbeiten",
    navLabel: "Bearbeiten",
    title: "PDF bearbeiten – Kostenloser PDF-Editor: Text, Bilder, Unterschrift",
    description:
      "Bearbeiten Sie eine PDF-Datei im Browser: Text hinzufügen, abdecken, markieren, Bilder einfügen und Unterschrift zeichnen. Kostenlos, ohne Upload, ohne Konto.",
    h1: "PDF bearbeiten",
    intro:
      "Legen Sie Text, Abdeckungen, Markierungen, Bilder und eine gezeichnete Unterschrift über die Seiten einer PDF-Datei. Das Tool ändert den vorhandenen Text nicht; es legt neuen Inhalt darüber. Alles läuft in Ihrem Browser.",
    actionLabel: "PDF speichern",
    steps: [
      "Legen Sie eine PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen. Wählen Sie in der Leiste links eine Seite.",
      "Wählen Sie ein Werkzeug in der Symbolleiste. Klicken Sie auf die Seite, um ein Textfeld hinzuzufügen, ziehen Sie, um eine Abdeckung oder eine Markierung zu zeichnen, fügen Sie ein Bild hinzu oder zeichnen Sie mit dem Stift. Ziehen Sie ein Element, um es zu verschieben, ziehen Sie an seiner Ecke, um die Größe zu ändern, und drücken Sie Entf, um es zu entfernen.",
      "Klicken Sie auf PDF speichern. Die bearbeitete Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Was kann ich mit diesem Tool in einer PDF-Datei bearbeiten?",
        a: "Sie können neuen Inhalt über jede Seite legen: Textfelder, weiße Rechtecke (Abdeckungen), gelbe Markierungen, Bilder (PNG oder JPG) und Freihandlinien, gezeichnet mit der Maus oder dem Finger. Sie können jedes Element verschieben, in der Größe ändern und löschen, bevor Sie speichern. Der ursprüngliche Seiteninhalt bleibt darunter erhalten.",
      },
      {
        q: "Kann ich den Text ändern, der schon in der PDF-Datei steht?",
        a: "Nein. Dieses Tool bearbeitet den vorhandenen Text nicht. Es legt neuen Inhalt über die Seite. Um ein Wort oder eine Zahl zu ersetzen, zeichnen Sie eine Abdeckung darüber und setzen Sie ein Textfeld darauf. Der alte Text ist am Bildschirm und auf Papier verdeckt, bleibt aber in der Datei. Ein Programm, das Text aus der PDF-Datei kopiert, kann ihn also noch finden.",
      },
      {
        q: "Wie unterschreibe ich eine PDF-Datei?",
        a: "Wählen Sie das Werkzeug Zeichnen und zeichnen Sie Ihre Unterschrift mit der Maus, einem Stift oder dem Finger auf die Seite. Oder wählen Sie Bild und fügen Sie ein Foto Ihrer Unterschrift als PNG oder JPG hinzu. Schieben Sie die Unterschrift an die richtige Stelle, passen Sie die Größe an und klicken Sie auf PDF speichern. Die Seite PDF unterschreiben startet mit dem Werkzeug Zeichnen.",
      },
      {
        q: "Wird meine PDF-Datei auf einen Server hochgeladen?",
        a: "Nein. JavaScript öffnet die Datei auf Ihrem eigenen Gerät. Die Änderungen werden mit der Open-Source-Bibliothek pdf-lib in Ihrem Browser in die Datei gezeichnet. Nichts wird an uns gesendet. Sie können die Internetverbindung trennen, sobald die Seite geladen ist – das Tool funktioniert weiter.",
      },
      {
        q: "Welche Schriftarten kann ich verwenden?",
        a: "Helvetica, Times und Courier. Das sind die Standardschriften von PDF, die Datei bleibt also klein, und jeder PDF-Viewer zeigt sie ohne eingebettete Schriftdatei an. Größe und Farbe können Sie für jedes Textfeld festlegen.",
      },
      {
        q: "Warum wird ein Sonderzeichen als Fragezeichen angezeigt?",
        a: "Die Standardschriften von PDF enthalten die lateinischen Zeichen der westeuropäischen Sprachen (den WinAnsi-Zeichensatz), darunter auch ä, ö, ü und ß. Ein Zeichen außerhalb dieses Satzes, etwa ein chinesisches Zeichen, ein Emoji oder manche Symbole, lässt sich nicht kodieren, darum schreibt das Tool an seiner Stelle ein Fragezeichen. Tippen Sie den Text mit Zeichen des lateinischen Alphabets, oder fügen Sie ihn als Bild hinzu.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: [
      "pdf bearbeiten",
      "pdf editor",
      "pdf editor kostenlos",
      "pdf bearbeiten kostenlos",
      "pdf bearbeiten online",
      "pdf online bearbeiten",
      "pdf editor online",
      "text in pdf einfügen",
      "pdf abdecken",
    ],
  },
  {
    id: "sign-pdf",
    slug: "pdf-unterschreiben",
    kind: "edit",
    nav: false,
    priority: 16,
    name: "PDF unterschreiben",
    navLabel: "Unterschreiben",
    title: "PDF unterschreiben – Unterschrift zeichnen oder als Bild einfügen, kostenlos",
    description:
      "Unterschreiben Sie eine PDF-Datei im Browser. Unterschrift mit Maus oder Finger zeichnen oder als Bild einfügen, platzieren, speichern. Kostenlos, ohne Upload.",
    h1: "PDF unterschreiben",
    intro:
      "Zeichnen Sie Ihre Unterschrift auf die Seite, oder fügen Sie ein Bild davon ein. Schieben Sie sie an die richtige Stelle, passen Sie die Größe an und speichern Sie die Datei. Die PDF-Datei verlässt Ihr Gerät nicht.",
    actionLabel: "PDF speichern",
    steps: [
      "Legen Sie die PDF-Datei im Feld ab, oder klicken Sie, um sie auszuwählen. Wählen Sie in der Leiste links die Seite, die unterschrieben werden soll.",
      "Das Werkzeug Zeichnen ist ausgewählt. Zeichnen Sie Ihre Unterschrift mit der Maus, einem Stift oder dem Finger auf die Seite. Oder klicken Sie auf Bild und wählen Sie ein PNG oder JPG Ihrer Unterschrift. Ziehen Sie sie an die richtige Stelle und ziehen Sie an der Ecke, um die Größe zu ändern. Mit dem Werkzeug Text fügen Sie das Datum oder Ihren Namen hinzu.",
      "Klicken Sie auf PDF speichern. Die unterschriebene Datei wird sofort heruntergeladen.",
    ],
    faq: [
      {
        q: "Wie unterschreibe ich eine PDF-Datei, ohne sie auszudrucken?",
        a: "Fügen Sie die PDF-Datei hinzu und zeichnen Sie Ihre Unterschrift mit dem Werkzeug Zeichnen auf die Seite. Sie können die Maus, einen Stift oder den Finger auf einem Touchscreen verwenden. Verschieben Sie die Unterschrift, passen Sie die Größe an und klicken Sie auf PDF speichern. Die Unterschrift wird Teil der Seite. Drucker und Scanner sind nicht nötig.",
      },
      {
        q: "Kann ich ein Bild meiner Unterschrift verwenden?",
        a: "Ja. Unterschreiben Sie auf einem weißen Blatt Papier, fotografieren oder scannen Sie es und speichern Sie es als PNG oder JPG. Klicken Sie auf Bild, wählen Sie die Datei und platzieren Sie sie auf der Seite. Ein PNG mit transparentem Hintergrund sieht am besten aus. Das Bild wird in voller Qualität in die PDF-Datei eingebettet.",
      },
      {
        q: "Ist das eine rechtsgültige elektronische Signatur?",
        a: "Das Tool zeichnet ein Bild Ihrer Unterschrift in die Seite. Es fügt kein digitales Zertifikat hinzu und prüft nicht, wer unterschrieben hat. Viele Vereinbarungen akzeptieren eine gezeichnete Unterschrift, aber die Regeln unterscheiden sich je nach Land und Vertrag. Wenn die Gegenseite eine zertifikatsbasierte Signatur verlangt, verwenden Sie einen Dienst, der eine ausstellt.",
      },
      {
        q: "Kann ich auf dem Handy unterschreiben?",
        a: "Ja. Die Seite funktioniert im Browser eines Handys oder Tablets. Zeichnen Sie mit dem Finger oder einem Eingabestift. Zoomen Sie den Browser mit zwei Fingern, wenn das Feld klein ist. Die Datei bleibt auf dem Handy.",
      },
      {
        q: "Kann ich das Datum neben die Unterschrift setzen?",
        a: "Ja. Wählen Sie das Werkzeug Text, klicken Sie auf die Seite und tippen Sie das Datum. Schriftgröße und Farbe können Sie festlegen. Ziehen Sie das Textfeld neben die Unterschrift.",
      },
      {
        q: "Wird mein unterschriebenes Dokument hochgeladen?",
        a: "Nein. Die PDF-Datei und die Unterschrift bleiben in Ihrem Browser. JavaScript zeichnet die Unterschrift auf Ihrem eigenen Gerät in die Datei. Nichts wird an uns gesendet.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: [
      "pdf unterschreiben",
      "pdf signieren",
      "pdf unterschreiben kostenlos",
      "pdf unterschreiben online",
      "unterschrift in pdf einfügen",
      "pdf digital unterschreiben",
      "pdf unterschrift einfügen",
    ],
    defaults: { tool: "draw" },
  },
];
