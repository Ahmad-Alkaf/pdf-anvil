// Portuguese tool pages. Slugs follow the most searched Brazilian phrase
// (see NOTES.md); ids keep the English slug so hreflang links line up.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "Meus arquivos são enviados para um servidor?",
  a: "Não. O PDF Anvil funciona inteiramente no seu navegador. O arquivo é aberto por JavaScript no seu próprio dispositivo, e o resultado também é criado ali. Nada é enviado para nós. Você pode desligar a internet depois que a página carregar, e a ferramenta continua funcionando.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Existe limite de tamanho de arquivo ou de uso diário?",
  a: "Não. Não há limite de páginas, limite de quantidade de arquivos nem cota diária. O único limite é a memória do seu dispositivo. Arquivos acima de 100 MB mostram um aviso, mas ainda funcionam na maioria dos computadores.",
};

const FREE_FAQ: ToolFaq = {
  q: "É grátis mesmo? Preciso de conta?",
  a: "Sim, é grátis, e não há conta. Sem cadastro, sem e-mail, sem marca d'água e sem plano premium. O PDF Anvil é um projeto paralelo da KafLabs que existe para ser útil.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Solte uma ou mais imagens na caixa, ou clique para escolher.",
  "Arraste as imagens para a ordem certa e escolha um tamanho de página.",
  "Clique em Criar PDF. O arquivo é baixado na hora.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "O que significa \"Ajustar à imagem\"?",
  a: "Cada página recebe o tamanho exato da sua imagem, sem margens. Use essa opção para digitalizações e capturas de tela. Escolha A4 ou Carta (Letter) quando quiser páginas normais para impressão, com a imagem centralizada.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Posso colocar muitas imagens em um PDF?",
  a: "Sim. Adicione quantas imagens quiser. Cada imagem vira uma página, na ordem da lista. Arraste uma imagem para cima ou para baixo para mudar a ordem.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Solte um PDF na caixa, ou clique para escolher.",
  "Escolha o formato de imagem e a resolução de que você precisa.",
  "Clique em Converter em imagens. Um ZIP com todas as imagens é baixado na hora. Você também pode baixar cada imagem separadamente.",
];

const DPI_FAQ: ToolFaq = {
  q: "Qual resolução devo usar?",
  a: "72 DPI gera arquivos pequenos, bons para a web. 150 DPI é um bom padrão para telas e apresentações. 300 DPI é para impressão. Um DPI maior gera arquivos maiores e demora mais.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Posso converter só uma página?",
  a: "Sim. Depois que o arquivo carregar, clique nas páginas que você quer na grade. Só as páginas selecionadas são convertidas.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Meu PDF ou minha senha são enviados?",
  a: "Não. O arquivo e a senha ficam no seu navegador. A ferramenta executa o programa de código aberto qpdf como WebAssembly no seu próprio dispositivo. Nenhuma requisição leva o seu arquivo ou a sua senha. Você pode desligar a internet depois que a página carregar, e a ferramenta continua funcionando.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Qual é a diferença entre a senha de usuário e a senha de proprietário?",
  a: "Um PDF pode ter duas senhas. A senha de usuário abre o arquivo. A senha de proprietário dá acesso total e remove os limites de impressão, cópia e edição. Um leitor de PDF aplica as permissões só a quem abre o arquivo com a senha de usuário.",
};

export const pages: readonly LocalePage[] = [
  // ---- merge ----
  {
    id: "merge-pdf",
    slug: "juntar-pdf",
    kind: "merge",
    nav: true,
    priority: 1, // "juntar pdf" 434K
    name: "Juntar PDF",
    navLabel: "Juntar",
    title: "Juntar PDF Online – Grátis, Privado, Sem Envio",
    description:
      "Junte vários arquivos PDF em um só documento no seu navegador. Arraste para definir a ordem. Grátis, sem envio, sem conta, sem limite de páginas, sem marca d'água.",
    h1: "Juntar arquivos PDF",
    intro:
      "Junte dois ou mais PDFs em um único arquivo. Arraste os arquivos para a ordem que você quiser. Tudo acontece no seu navegador.",
    actionLabel: "Juntar PDFs",
    steps: [
      "Solte dois ou mais arquivos PDF na caixa, ou clique para escolher.",
      "Arraste os arquivos para a ordem em que eles devem aparecer.",
      "Clique em Juntar PDFs. O arquivo combinado é baixado na hora.",
    ],
    faq: [
      {
        q: "Como mudo a ordem dos arquivos?",
        a: "Arraste um arquivo para cima ou para baixo na lista, ou use os botões de seta. O PDF final segue a ordem da lista, de cima para baixo.",
      },
      {
        q: "Juntar os arquivos muda a qualidade das páginas?",
        a: "Não. As páginas são copiadas como estão. Fontes, imagens e gráficos vetoriais ficam exatamente iguais. A ferramenta não renderiza de novo nem comprime nada.",
      },
      {
        q: "Posso juntar PDFs protegidos por senha?",
        a: "Não diretamente. Remova a senha com a ferramenta Desbloquear PDF primeiro e depois junte essa cópia. Você precisa saber a senha do arquivo.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: [
      "juntar pdf",
      "juntar arquivos pdf",
      "juntar pdf online",
      "juntar pdf grátis",
      "unir pdf",
      "combinar pdf",
      "mesclar pdf",
      "juntar pdf em um só",
    ],
  },
  {
    // Variant of "merge" for "unir pdf" / "combinar pdf".
    id: "combine-pdf",
    slug: "unir-pdf",
    kind: "merge",
    nav: false,
    priority: 15,
    name: "Unir PDF",
    navLabel: "Unir",
    title: "Unir PDF Online – Combine Arquivos PDF Grátis, Sem Envio",
    description:
      "Una vários arquivos PDF em um único documento com uma ferramenta grátis que funciona no navegador. Defina a ordem, clique uma vez e baixe. Sem envio, sem conta.",
    h1: "Unir arquivos PDF",
    intro:
      "Coloque dois ou mais arquivos PDF juntos em um único documento. Adicione os arquivos, defina a ordem e baixe o resultado. Seus arquivos ficam no seu dispositivo.",
    actionLabel: "Unir PDFs",
    steps: [
      "Adicione os arquivos PDF que você quer unir. Solte na caixa, ou clique para escolher.",
      "Coloque os arquivos na ordem correta. Arraste, ou use os botões de seta.",
      "Clique em Unir PDFs. O navegador monta um único PDF e baixa o arquivo.",
    ],
    faq: [
      {
        q: "Como uno vários arquivos PDF em um só?",
        a: "Abra esta página e adicione os seus arquivos PDF. Coloque na ordem certa. Clique em Unir PDFs. A ferramenta copia todas as páginas para um novo PDF e baixa o arquivo. Não é preciso instalar nenhum programa.",
      },
      {
        q: "Esta ferramenta para unir PDF é grátis?",
        a: "Sim. Sem custo, sem conta, sem marca d'água e sem limite de quantidade de arquivos. Use quantas vezes quiser.",
      },
      {
        q: "Posso unir arquivos PDF no celular?",
        a: "Sim. Abra esta página no navegador do seu celular ou tablet. Toque na caixa para escolher os arquivos. O PDF unido é salvo na pasta de downloads.",
      },
      {
        q: "Qual é a diferença entre unir, juntar e combinar?",
        a: "Nenhuma. Unir, juntar, combinar e mesclar querem dizer a mesma coisa: colocar vários arquivos PDF em um só. Esta página e a página Juntar PDF usam a mesma ferramenta.",
      },
      {
        q: "As páginas mantêm o tamanho e a qualidade?",
        a: "Sim. Cada página é copiada como está. Nada é renderizado de novo nem comprimido. Páginas de tamanhos diferentes podem ficar lado a lado em um mesmo arquivo.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: ["unir pdf", "unir arquivos pdf", "combinar pdf", "unir pdf online", "unir pdf grátis", "mesclar pdf online"],
  },

  // ---- split ----
  {
    id: "split-pdf",
    slug: "dividir-pdf",
    kind: "split",
    nav: true,
    priority: 6,
    name: "Dividir PDF",
    navLabel: "Dividir",
    title: "Dividir PDF Online – Extraia Páginas ou Divida por Intervalo",
    description:
      "Divida um PDF em arquivos separados, um por página, ou extraia intervalos como 1-3, 5, 8-. Funciona no seu navegador. Grátis, privado, sem envio, sem limites.",
    h1: "Dividir PDF",
    intro:
      "Transforme um PDF em vários. Salve cada página como um arquivo próprio, ou digite os intervalos de páginas de que você precisa. O arquivo fica no seu dispositivo.",
    actionLabel: "Dividir PDF",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Escolha \"Cada página\" ou digite intervalos como 1-3, 5, 8-.",
      "Clique em Dividir PDF. Um ZIP com todas as partes é baixado na hora. Você também pode baixar cada parte separadamente.",
    ],
    faq: [
      {
        q: "Como divido um PDF em arquivos separados?",
        a: "Adicione o PDF e escolha \"Cada página\". Clique em Dividir PDF. Cada página vira um arquivo PDF próprio. Você recebe todos os arquivos em um ZIP, ou baixa cada um separadamente.",
      },
      {
        q: "Como escrevo os intervalos de páginas?",
        a: "Separe os itens com vírgulas. \"3\" é uma página. \"1-3\" são as páginas de 1 a 3. \"8-\" vai da página 8 até o fim. Cada item vira um arquivo PDF. Exemplo: 1-3, 5, 8- gera três arquivos.",
      },
      {
        q: "Como extraio só algumas páginas de um PDF?",
        a: "Escolha \"Intervalos de páginas\" e digite as páginas que você quer, por exemplo 2, 7-9. Só essas páginas são salvas. O arquivo original não é alterado.",
      },
      {
        q: "Por que recebo um arquivo ZIP?",
        a: "Quando a divisão gera mais de um arquivo, o navegador não consegue salvar vários arquivos de uma vez sem perguntar a cada um. O ZIP reúne todos eles. Você também pode baixar cada arquivo separadamente na lista de resultados.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "dividir pdf",
      "dividir pdf online",
      "dividir pdf em páginas",
      "separar páginas pdf",
      "extrair páginas pdf",
      "dividir pdf grátis",
      "cortar pdf",
    ],
  },
  {
    // Locale-only variant of "split" for "separar pdf".
    id: "split:separar",
    slug: "separar-pdf",
    kind: "split",
    nav: false,
    priority: 16,
    name: "Separar PDF",
    navLabel: "Separar",
    title: "Separar PDF Online – Separe as Páginas de um PDF Grátis, Sem Envio",
    description:
      "Separe as páginas de um PDF em arquivos individuais, ou separe só as páginas que você quer. Grátis, no seu navegador, sem envio, sem conta, sem marca d'água.",
    h1: "Separar páginas de um PDF",
    intro:
      "Separe um PDF em partes. Cada página pode virar um arquivo próprio, ou você escolhe as páginas que quer guardar. Nada sai do seu dispositivo.",
    actionLabel: "Separar PDF",
    steps: [
      "Adicione o PDF. Solte na caixa, ou clique para escolher.",
      "Escolha \"Cada página\" para separar todas as páginas, ou \"Intervalos de páginas\" para escolher só algumas, por exemplo 1, 4-6.",
      "Clique em Separar PDF. As partes são baixadas em um ZIP, ou você baixa cada uma separadamente.",
    ],
    faq: [
      {
        q: "Como separo as páginas de um PDF?",
        a: "Adicione o arquivo e escolha \"Cada página\". Clique em Separar PDF. Cada página vira um PDF de uma página só. Todos os arquivos vêm em um ZIP, e você também pode baixar um por um.",
      },
      {
        q: "Posso separar só uma página do PDF?",
        a: "Sim. Escolha \"Intervalos de páginas\" e digite o número da página, por exemplo 3. A ferramenta salva essa página como um novo PDF. O original não muda.",
      },
      {
        q: "Separar é o mesmo que dividir?",
        a: "Sim. Separar, dividir e cortar um PDF são a mesma operação: transformar um arquivo em vários. Esta página e a página Dividir PDF usam a mesma ferramenta.",
      },
      {
        q: "Posso separar as páginas e depois juntar de novo em outra ordem?",
        a: "Sim. Separe as páginas aqui e depois use a ferramenta Juntar PDF para montar um novo arquivo na ordem que quiser. Se você só quer reordenar, a ferramenta Organizar PDF faz isso em um passo.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "merge-pdf", "organize-pdf"],
    keywords: ["separar pdf", "separar páginas pdf", "separar pdf online", "separar pdf grátis", "separar arquivo pdf", "separar folhas pdf"],
  },
  {
    // Variant of "split" for "extrair páginas pdf".
    id: "extract-pdf-pages",
    slug: "extrair-paginas-pdf",
    kind: "split",
    nav: false,
    priority: 20,
    name: "Extrair páginas do PDF",
    navLabel: "Extrair páginas",
    title: "Extrair Páginas de um PDF Online – Grátis, Sem Envio",
    description:
      "Extraia as páginas de que você precisa de um PDF e salve em um novo arquivo. Digite números ou intervalos de páginas. Grátis, no navegador, sem envio, sem conta.",
    h1: "Extrair páginas de um PDF",
    intro:
      "Tire de um PDF as páginas de que você precisa e salve em um novo arquivo. Digite os números das páginas, clique uma vez e baixe. O PDF não sai do seu dispositivo.",
    actionLabel: "Extrair páginas",
    steps: [
      "Adicione o seu PDF. Solte na caixa, ou clique para escolher.",
      "Escolha \"Intervalos de páginas\" e digite as páginas que você quer, por exemplo 2, 5-7, 10-. Ou escolha \"Cada página\" para receber cada página em um arquivo próprio.",
      "Clique em Extrair páginas. Cada intervalo vira um PDF. Você recebe um ZIP, ou baixa cada arquivo separadamente.",
    ],
    faq: [
      {
        q: "Como extraio páginas de um PDF?",
        a: "Adicione o PDF e escolha \"Intervalos de páginas\". Digite os números das páginas que você quer. Clique em Extrair páginas. Só essas páginas vão para o novo arquivo. O PDF original não é alterado.",
      },
      {
        q: "Posso extrair uma única página de um PDF?",
        a: "Sim. Digite um número de página, por exemplo 4. A ferramenta salva essa página como um novo PDF de uma página.",
      },
      {
        q: "Posso salvar cada página como um PDF separado?",
        a: "Sim. Escolha \"Cada página\". Cada página vira um arquivo PDF próprio. Todos os arquivos vêm em um ZIP, e você também pode baixar um por um.",
      },
      {
        q: "Posso extrair páginas que não estão em sequência?",
        a: "Sim. Separe os itens com vírgulas, por exemplo 1, 4, 9-11. Cada item vira um arquivo. Se quiser todas em um único arquivo, extraia primeiro e depois junte os arquivos com a ferramenta Unir PDF.",
      },
      {
        q: "Esta ferramenta de extrair páginas é grátis?",
        a: "Sim. Sem custo, sem conta, sem marca d'água e sem limite de páginas. O PDF é processado no seu navegador e nunca é enviado.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: [
      "extrair páginas pdf",
      "extrair páginas de pdf",
      "extrair página pdf",
      "salvar páginas pdf em novo arquivo",
      "extrair páginas pdf online grátis",
    ],
  },

  // ---- rotate ----
  {
    id: "rotate-pdf",
    slug: "girar-pdf",
    kind: "rotate",
    nav: true,
    priority: 9,
    name: "Girar PDF",
    navLabel: "Girar",
    title: "Girar PDF Online – Corrija Páginas Deitadas, Grátis",
    description:
      "Gire todas as páginas ou só algumas páginas de um PDF em 90, 180 ou 270 graus e salve o resultado. Funciona no navegador. Grátis, sem envio, sem marca d'água.",
    h1: "Girar páginas de um PDF",
    intro:
      "Corrija páginas deitadas ou de cabeça para baixo. Gire o documento inteiro ou só as páginas que você escolher, depois salve um novo PDF.",
    actionLabel: "Salvar PDF girado",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Gire todas as páginas com os botões de cima, ou passe o mouse sobre uma página e gire só essa.",
      "Clique em Salvar PDF girado. O arquivo é baixado na hora.",
    ],
    faq: [
      {
        q: "A rotação é permanente?",
        a: "Sim. Ao contrário do botão de girar de um leitor de PDF, que só muda a visualização, esta ferramenta grava a rotação no arquivo. A página abre na nova orientação em qualquer leitor e em qualquer dispositivo.",
      },
      {
        q: "Posso girar só uma página?",
        a: "Sim. Passe o mouse sobre a miniatura de uma página e use os botões de girar dela. Cada página pode ter a sua própria rotação. Os botões de cima giram todas as páginas de uma vez.",
      },
      {
        q: "Girar reduz a qualidade?",
        a: "Não. A ferramenta muda uma propriedade da página. O conteúdo não é renderizado de novo nem comprimido, então a qualidade é idêntica.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["girar pdf", "girar páginas pdf", "girar pdf e salvar", "rodar pdf", "virar pdf", "girar pdf online grátis"],
  },

  // ---- organize ----
  {
    id: "organize-pdf",
    slug: "organizar-pdf",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "Organizar PDF",
    navLabel: "Organizar",
    title: "Organizar Páginas de PDF – Reordene e Exclua Páginas Online",
    description:
      "Arraste as páginas de um PDF para uma nova ordem, exclua as que não precisa e baixe o resultado. Funciona no navegador. Grátis, privado, sem envio, sem limites.",
    h1: "Organizar páginas de um PDF",
    intro:
      "Reordene as páginas arrastando, exclua as que você não precisa e salve um novo PDF limpo. Nada sai do seu dispositivo.",
    actionLabel: "Salvar PDF organizado",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Arraste as páginas para uma nova ordem. Passe o mouse sobre uma página para excluir ou girar.",
      "Clique em Salvar PDF organizado. O arquivo é baixado na hora.",
    ],
    faq: [
      {
        q: "Como excluo páginas de um PDF?",
        a: "Passe o mouse sobre a página e clique no ícone de lixeira. A página sai do resultado. As páginas excluídas não ficam no arquivo salvo, então o arquivo fica menor.",
      },
      {
        q: "Posso reordenar as páginas no celular?",
        a: "Sim. Toque e segure uma página, depois arraste para o novo lugar. Quem usa teclado pode focar uma página, pressionar Espaço, mover com as setas e pressionar Espaço de novo.",
      },
      {
        q: "Excluí a página errada. Posso desfazer?",
        a: "Sim. Use o botão Desfazer que aparece depois de uma exclusão, ou clique em Redefinir para voltar à ordem original com todas as páginas.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: ["organizar pdf", "reordenar páginas pdf", "excluir páginas pdf", "ordenar páginas pdf", "remover páginas de pdf", "apagar página pdf"],
  },

  // ---- images to PDF ----
  {
    id: "image-to-pdf",
    slug: "imagem-para-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 4,
    name: "Imagem para PDF",
    navLabel: "Imagem para PDF",
    title: "Imagem para PDF – Converta JPG, PNG e WebP em PDF, Grátis",
    description:
      "Converta qualquer imagem em um PDF: JPG, PNG e WebP, até misturados. Escolha o tamanho da página e a ordem. Grátis, privado, no seu navegador, sem envio.",
    h1: "Converter imagens em PDF",
    intro:
      "Junte imagens JPG, PNG e WebP em um único PDF. Misture os formatos à vontade, escolha um tamanho de página e arraste as imagens para a ordem certa. Nada sai do seu dispositivo.",
    actionLabel: "Criar PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Quais formatos de imagem funcionam?",
        a: "JPG, PNG e WebP. JPG e PNG são incorporados diretamente. WebP é decodificado e convertido em PNG antes de ser adicionado. Você pode misturar os três em um PDF.",
      },
      {
        q: "Posso criar um PDF com as fotos do celular?",
        a: "Sim. Abra esta página no celular, toque na caixa e escolha as fotos da galeria. O PDF é criado no próprio celular e salvo na pasta de downloads.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "O PDF mantém a resolução completa das imagens?",
        a: "Sim. Os dados da imagem são incorporados sem reamostragem. Isso também significa que o PDF fica mais ou menos do tamanho das imagens somadas.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: [
      "imagem para pdf",
      "converter imagem em pdf",
      "converter para pdf",
      "criar pdf",
      "foto para pdf",
      "fotos para pdf",
      "imagens para pdf online grátis",
      "transformar imagem em pdf",
    ],
  },
  {
    id: "jpg-to-pdf",
    slug: "jpg-para-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 12,
    name: "JPG para PDF",
    navLabel: "JPG para PDF",
    title: "JPG para PDF – Converta Imagens JPG em PDF Online, Grátis",
    description:
      "Transforme fotos e digitalizações JPG em um único PDF no seu navegador. Páginas A4, Carta ou ajustadas à imagem. Grátis, sem envio, sem conta, sem marca d'água.",
    h1: "Converter JPG em PDF",
    intro:
      "Transforme um JPG ou um conjunto inteiro de fotos em um único PDF. Escolha o tamanho da página e arraste as imagens para a ordem certa. Suas fotos nunca saem do seu dispositivo.",
    actionLabel: "Criar PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "O PDF mantém a qualidade completa do meu JPG?",
        a: "Sim. Os dados do JPG são colocados no PDF exatamente como estão, sem nova compressão. Uma foto de 12 megapixels continua com 12 megapixels. O PDF fica mais ou menos do tamanho das imagens somadas.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "A foto do meu celular fica deitada. Por quê?",
        a: "Alguns celulares guardam a rotação como uma etiqueta oculta em vez de girar os pixels. Esta versão ainda não lê essa etiqueta. Abra a foto em qualquer editor, salve uma vez e adicione de novo.",
      },
      {
        q: "Posso misturar JPG com arquivos PNG ou WebP?",
        a: "Sim. A mesma ferramenta aceita JPG, PNG e WebP juntos. Cada imagem vira uma página.",
      },
      PRIVACY_FAQ,
      {
        q: "Converter JPG em PDF aqui é grátis?",
        a: "Sim. É grátis, sem limite de quantidade de imagens e sem marca d'água. O PDF é criado no seu navegador, então as fotos não são enviadas. Você não precisa de conta.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: [
      "jpg para pdf",
      "converter jpg em pdf",
      "jpg para pdf grátis",
      "jpeg para pdf",
      "foto para pdf",
      "transformar jpg em pdf",
      "jpg para pdf online",
    ],
  },
  {
    id: "png-to-pdf",
    slug: "png-para-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 18,
    name: "PNG para PDF",
    navLabel: "PNG para PDF",
    title: "PNG para PDF – Converta Imagens PNG em PDF Online, Grátis",
    description:
      "Converta capturas de tela, diagramas e gráficos PNG em um PDF sem perder qualidade. A transparência é mantida. Grátis, no navegador, sem envio, sem marca d'água.",
    h1: "Converter PNG em PDF",
    intro:
      "Transforme imagens PNG em um PDF sem perda de qualidade. Capturas de tela, gráficos e logotipos com transparência funcionam. Tudo acontece no seu navegador.",
    actionLabel: "Criar PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "PNG para PDF é sem perdas?",
        a: "Sim. PNG é um formato sem perdas, e o PDF incorpora os dados do PNG sem alterar nada. O texto das capturas de tela continua nítido, e as cores não mudam.",
      },
      {
        q: "O que acontece com a transparência?",
        a: "O PDF mantém o canal alfa. As áreas transparentes mostram o fundo da página, que é branco na maioria dos leitores. Nada é achatado nem preenchido.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Qual tamanho de página é melhor para capturas de tela?",
        a: "Use \"Ajustar à imagem\" para que cada página tenha o tamanho exato em pixels da captura, sem margens. Use A4 ou Carta (Letter) se quiser imprimir as páginas.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png para pdf", "converter png em pdf", "png para pdf online grátis", "captura de tela para pdf", "imagem para pdf sem perdas"],
  },
  {
    id: "scan-to-pdf",
    slug: "digitalizar-para-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 21,
    name: "Digitalizar para PDF",
    navLabel: "Digitalizar",
    title: "Digitalizar Documentos para PDF Online – Com a Câmera do Celular, Grátis",
    description:
      "Digitalize documentos em papel para PDF com a câmera do celular ou com fotos que você já tem. Coloque as páginas em ordem, escolha A4 ou Carta. Grátis, sem envio.",
    h1: "Digitalizar documentos para PDF",
    intro:
      "Tire uma foto de cada página com a câmera do celular, ou adicione fotos que você já tem. Coloque as páginas em ordem e receba um único PDF. Nada é enviado.",
    actionLabel: "Criar PDF",
    steps: [
      "Toque em Tirar uma foto e fotografe a primeira página. Ou toque na caixa para adicionar fotos que você já tem.",
      "Repita para cada página. Arraste as páginas para a ordem certa e escolha um tamanho de página.",
      "Toque em Criar PDF. O arquivo é baixado na hora.",
    ],
    faq: [
      {
        q: "Como digitalizo um documento com o celular?",
        a: "Abra esta página no celular. Toque em Tirar uma foto. A câmera abre. Fotografe a primeira página e confirme. Toque em Tirar uma foto de novo para a próxima página. Quando todas as páginas estiverem na lista, toque em Criar PDF. O PDF é salvo no celular.",
      },
      {
        q: "Posso usar isso em um computador?",
        a: "Sim. No computador, o botão Tirar uma foto abre o seletor de arquivos normal. Escolha fotos ou digitalizações que já estão no computador, coloque em ordem e crie o PDF.",
      },
      {
        q: "Minhas fotos são enviadas para um servidor?",
        a: "Não. A foto vai da câmera do celular direto para a página no seu navegador. O PDF também é criado ali. Nada é enviado para nós. Você pode desligar a internet depois que a página carregar, e a ferramenta continua funcionando.",
      },
      {
        q: "Como consigo páginas retas e legíveis?",
        a: "Coloque o documento em uma superfície plana com fundo liso. Use boa iluminação e evite sombras da mão ou do celular. Segure o celular paralelo à página e preencha o quadro com a página. Toque na tela para focar antes de fotografar. A ferramenta não recorta nem endireita a foto.",
      },
      {
        q: "Qual tamanho de página devo escolher?",
        a: "Escolha A4 ou Carta (Letter) para ter páginas normais de impressão com a foto centralizada. A4 é o padrão. Escolha \"Ajustar à imagem\" para que cada página tenha o tamanho exato da foto, sem margens.",
      },
      {
        q: "Posso digitalizar muitas páginas em um único PDF?",
        a: "Sim. Tire uma foto por página. Cada foto vira uma página, na ordem da lista. Não há limite de páginas. Arraste uma página para cima ou para baixo para mudar a ordem.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: [
      "digitalizar para pdf",
      "digitalizar documento pdf",
      "escanear para pdf",
      "escanear documento pdf celular",
      "scanner pdf celular",
      "tirar foto e transformar em pdf",
    ],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF to images ----
  {
    id: "pdf-to-image",
    slug: "pdf-para-imagem",
    kind: "pdf-to-images",
    nav: true,
    priority: 5,
    name: "PDF para imagem",
    navLabel: "PDF para imagem",
    title: "PDF para Imagem – Converta Páginas de PDF em JPG ou PNG Online",
    description:
      "Converta páginas de PDF em imagens. Escolha JPG ou PNG e 72, 150 ou 300 DPI. Selecione as páginas de que precisa. Grátis, no seu navegador, sem envio, sem limites.",
    h1: "Converter PDF em imagens",
    intro:
      "Transforme páginas de PDF em arquivos de imagem. Escolha JPG para fotos e digitalizações ou PNG para texto e diagramas, defina a resolução e baixe as páginas de que precisa.",
    actionLabel: "Converter em imagens",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG ou PNG?",
        a: "JPG é menor e ideal para fotos e páginas digitalizadas. PNG é sem perdas e ideal para texto, diagramas e capturas de tela, onde as bordas nítidas importam.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Posso ter uma única imagem do documento inteiro?",
        a: "Cada página vira uma imagem própria. Se você precisa de uma imagem alta com tudo, converta as páginas e junte em um editor de imagens.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf para imagem", "converter pdf em imagem", "transformar pdf em imagem", "página pdf para imagem", "pdf para imagem online grátis"],
  },
  {
    id: "pdf-to-jpg",
    slug: "pdf-para-jpg",
    kind: "pdf-to-images",
    nav: false,
    priority: 13,
    name: "PDF para JPG",
    navLabel: "PDF para JPG",
    title: "PDF para JPG – Converta Páginas de PDF em Imagens JPG Online",
    description:
      "Exporte cada página de um PDF como imagem JPG em 72, 150 ou 300 DPI. Funciona no seu navegador. Grátis, privado, sem envio, sem marca d'água, sem limites.",
    h1: "Converter PDF em JPG",
    intro:
      "Salve cada página de um PDF como uma imagem JPG. Escolha a resolução, selecione as páginas e baixe uma imagem ou todas em um ZIP.",
    actionLabel: "Converter em imagens",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Como salvo um PDF como JPG?",
        a: "Adicione o PDF a esta página. Mantenha JPG como formato e escolha uma resolução. Clique em Converter em imagens. Cada página é salva como um arquivo JPG. Baixe uma por uma ou todas juntas em um ZIP.",
      },
      DPI_FAQ,
      {
        q: "Quando devo escolher JPG em vez de PNG?",
        a: "JPG é menor e ideal para fotos e páginas digitalizadas. Mude para PNG em texto, diagramas e capturas de tela, onde as bordas nítidas importam.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "O JPG contém a página inteira?",
        a: "Sim. A página completa é renderizada, com imagens, gráficos vetoriais e texto, exatamente como um leitor de PDF mostra. Campos de formulário e anotações aparecem como estão.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: [
      "pdf para jpg",
      "converter pdf em jpg",
      "transformar pdf em jpg",
      "salvar pdf como jpg",
      "pdf para jpeg",
      "pdf para jpg online grátis",
      "página pdf para jpg",
    ],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-para-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 19,
    name: "PDF para PNG",
    navLabel: "PDF para PNG",
    title: "PDF para PNG – Converta Páginas de PDF em Imagens PNG Online",
    description:
      "Exporte páginas de PDF como imagens PNG sem perdas em 72, 150 ou 300 DPI. Texto e diagramas nítidos. No seu navegador. Grátis, privado, sem envio, sem marca d'água.",
    h1: "Converter PDF em PNG",
    intro:
      "Salve páginas de PDF como imagens PNG sem perdas. Texto, diagramas e capturas de tela continuam nítidos. Escolha a resolução e as páginas, depois baixe.",
    actionLabel: "Converter em imagens",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Por que escolher PNG em vez de JPG?",
        a: "PNG é sem perdas. Bordas de texto, linhas finas e cores uniformes ficam exatas, sem artefatos de compressão. É a escolha certa para apresentações, diagramas, formulários e qualquer coisa que você pretende editar depois.",
      },
      DPI_FAQ,
      {
        q: "O fundo do PNG é transparente?",
        a: "Não. As páginas de PDF têm fundo branco por definição, e o PNG mantém esse fundo. Use um editor de imagens se precisar remover.",
      },
      {
        q: "O PNG fica maior que o JPG?",
        a: "Em geral, sim. O PNG guarda cada pixel sem perdas, então uma página com fotos pode ficar várias vezes maior do que em JPG. Em texto e diagramas, a diferença é pequena, e a nitidez compensa.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf para png", "converter pdf em png", "pdf para png online grátis", "página pdf para png", "pdf para png alta resolução"],
  },

  // ---- compress ----
  {
    id: "compress-pdf",
    slug: "comprimir-pdf",
    kind: "compress",
    nav: true,
    priority: 3,
    name: "Comprimir PDF",
    navLabel: "Comprimir",
    title: "Comprimir PDF Online – Reduza o Tamanho do PDF Grátis, Sem Envio",
    description:
      "Comprima um PDF no seu navegador. Escolha sem perdas, equilibrado ou menor tamanho. Fotos grandes encolhem, o texto continua nítido. Grátis, sem envio, sem conta.",
    h1: "Comprimir PDF",
    intro:
      "Deixe um PDF menor. Escolha um nível, clique uma vez e baixe. Texto e gráficos vetoriais continuam nítidos. O arquivo nunca sai do seu dispositivo.",
    actionLabel: "Comprimir PDF",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Escolha um nível. Sem perdas mantém cada pixel. Equilibrado é a melhor escolha para a maioria dos arquivos. Menor tamanho gera o arquivo mais leve.",
      "Clique em Comprimir PDF. A ferramenta mostra o tamanho antigo e o novo, e o arquivo é baixado na hora.",
    ],
    faq: [
      {
        q: "Quanto menor o meu PDF vai ficar?",
        a: "Depende do que há no arquivo. Um PDF cheio de fotos grandes ou digitalizações pode encolher de 50 a 90 por cento no nível Equilibrado. Um PDF só com texto e gráficos vetoriais encolhe bem menos, em geral de 5 a 20 por cento, porque não há nada grande para recodificar. A ferramenta mostra o tamanho antigo e o novo depois de cada execução.",
      },
      {
        q: "Qual nível devo escolher?",
        a: "Equilibrado é a melhor escolha para a maioria dos arquivos. Ele limita as imagens a 1600 pixels no lado maior, o que é nítido na tela e bom para impressão comum. Escolha Menor tamanho para anexos de e-mail e limites de envio. Ele limita as imagens a 1100 pixels e usa uma compressão JPEG mais forte. Escolha Sem perdas quando as imagens precisam ficar exatamente como estão. Ele só limpa a estrutura do arquivo e remove dados sem uso.",
      },
      {
        q: "A compressão reduz a qualidade do texto?",
        a: "Não. Texto, fontes, linhas e gráficos vetoriais não são alterados em nenhum nível. Só fotos grandes e digitalizações são recodificadas, e só nos níveis Equilibrado e Menor tamanho. Se a nova imagem não ficar menor que a antiga, a antiga é mantida.",
      },
      {
        q: "Por que o meu arquivo não ficou menor?",
        a: "Alguns arquivos já são tão pequenos quanto podem ser. As imagens já são JPEGs pequenos, ou o arquivo não tem imagens, só texto e formas vetoriais. Arquivos que outra ferramenta já comprimiu também mudam pouco. Nesse caso, a ferramenta avisa que o arquivo já estava compacto.",
      },
      {
        q: "Quais imagens a ferramenta comprime?",
        a: "Imagens JPEG e imagens RGB ou em tons de cinza sem compressão ou com compressão Flate, com pelo menos 64 KB e pelo menos 200 pixels de largura ou altura. Imagens com transparência, cores indexadas, CMYK ou espaços de cor incomuns são mantidas como estão, para as cores não saírem erradas.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["comprimir pdf", "compactar pdf", "reduzir tamanho pdf", "diminuir pdf", "comprimir pdf online grátis", "compressor de pdf"],
  },
  {
    // Variant of "compress" for "reduzir tamanho pdf".
    id: "reduce-pdf-size",
    slug: "reduzir-tamanho-pdf",
    kind: "compress",
    nav: false,
    priority: 17,
    name: "Reduzir tamanho do PDF",
    navLabel: "Reduzir tamanho",
    title: "Reduzir o Tamanho de um PDF Online – Grátis, Sem Envio",
    description:
      "Reduza o tamanho de um PDF para e-mail e formulários. Ferramenta grátis que funciona no seu navegador. Três níveis, tamanho antes e depois. Sem envio, sem conta.",
    h1: "Reduzir o tamanho de um PDF",
    intro:
      "Deixe um PDF abaixo do limite de um e-mail ou de um formulário de envio. Escolha o quanto ele deve encolher, clique uma vez e veja o tamanho antigo e o novo. O PDF fica no seu dispositivo.",
    actionLabel: "Reduzir tamanho",
    steps: [
      "Adicione o seu PDF. Solte na caixa, ou clique para escolher.",
      "Escolha um nível. Comece com Equilibrado. Se o arquivo ainda estiver grande demais, repita com Menor tamanho.",
      "Clique em Reduzir tamanho. A ferramenta mostra quantos por cento economizou, e o arquivo menor é baixado na hora.",
    ],
    faq: [
      {
        q: "Como reduzo o tamanho de um PDF?",
        a: "Adicione o PDF a esta página e escolha um nível. Clique em Reduzir tamanho. A ferramenta reescreve o arquivo, remove dados sem uso e diminui as fotos grandes. O novo PDF é baixado na hora, e a página mostra o tamanho antigo e o novo.",
      },
      {
        q: "Como deixo um PDF com menos de 1 MB ou menos de 5 MB?",
        a: "Processe o arquivo no nível Equilibrado e veja o novo tamanho. Se ainda estiver acima do limite, repita com Menor tamanho. Se mesmo assim ficar grande demais, o arquivo tem muitas páginas de imagens. Divida em partes com a ferramenta Dividir PDF e envie cada parte.",
      },
      {
        q: "Reduzir o tamanho altera o texto?",
        a: "Não. Texto e gráficos vetoriais são copiados como estão. Só fotos grandes e digitalizações são diminuídas. O texto continua nítido na tela e na impressão.",
      },
      {
        q: "Por que o meu PDF é tão grande?",
        a: "Na maioria dos casos, o arquivo tem fotos ou páginas digitalizadas em resolução muito alta. Uma página digitalizada em 600 DPI pode ocupar vários megabytes. O nível Equilibrado limita as imagens a 1600 pixels no lado maior, o que basta para leitura e impressão comum.",
      },
      {
        q: "Esta ferramenta de reduzir PDF é grátis?",
        a: "Sim. Sem custo, sem conta, sem marca d'água e sem limite de quantidade de arquivos. O PDF é processado no seu navegador e nunca é enviado.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "reduzir tamanho pdf",
      "diminuir tamanho pdf",
      "reduzir pdf",
      "diminuir tamanho do arquivo pdf",
      "reduzir pdf online grátis",
      "deixar pdf menor",
    ],
  },

  // ---- passwords ----
  {
    id: "unlock-pdf",
    slug: "desbloquear-pdf",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "Desbloquear PDF",
    navLabel: "Desbloquear",
    title: "Desbloquear PDF – Remova a Senha de um PDF Online, Grátis, Sem Envio",
    description:
      "Remova a senha de um PDF quando você a conhece. Digite a senha, clique uma vez e receba uma cópia que abre sem senha. Grátis, no seu navegador, sem envio.",
    h1: "Desbloquear um PDF",
    intro:
      "Remova a senha de um PDF. Digite a senha que você conhece, clique uma vez e baixe uma cópia que abre sem senha. O arquivo fica no seu dispositivo.",
    actionLabel: "Desbloquear PDF",
    steps: [
      "Solte um PDF protegido por senha na caixa, ou clique para escolher.",
      "Digite a senha do arquivo. A senha que abre o arquivo ou a senha de proprietário funcionam.",
      "Clique em Desbloquear PDF. Uma cópia sem senha e sem limites é baixada na hora.",
    ],
    faq: [
      {
        q: "Esqueci a senha. Vocês conseguem remover?",
        a: "Não. A ferramenta precisa da senha. Ela não adivinha, não quebra nem contorna senhas. Um PDF com criptografia AES não pode ser aberto sem a senha correta. Se você não a conhece, peça a quem criou o arquivo.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Qual senha eu digito aqui?",
        a: "Qualquer uma das duas. Se você só conhece a senha que abre o arquivo, digite essa. Se conhece a senha de proprietário, digite essa. O resultado não tem senha nem limites.",
      },
      {
        q: "Por que o meu PDF não abre aqui?",
        a: "Três causas são comuns. A senha não está correta: confira maiúsculas e espaços e tente de novo. O arquivo está danificado: abra em um leitor de PDF para conferir. O arquivo usa um certificado ou um sistema de direitos digitais em vez de senha: a ferramenta não abre esses arquivos.",
      },
      {
        q: "Posso remover só os limites e manter a senha de abertura?",
        a: "Não. O resultado não tem senha nenhuma. Para definir uma nova senha, abra o resultado na ferramenta Proteger PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: [
      "desbloquear pdf",
      "remover senha pdf",
      "tirar senha de pdf",
      "remover senha de pdf online",
      "desproteger pdf",
      "desbloquear pdf grátis",
    ],
  },
  {
    id: "protect-pdf",
    slug: "proteger-pdf",
    kind: "protect",
    nav: true,
    priority: 10,
    name: "Proteger PDF",
    navLabel: "Proteger",
    title: "Proteger PDF – Coloque Senha em um PDF Online, Grátis, Sem Envio",
    description:
      "Coloque senha em um PDF com criptografia AES-256 no seu navegador. Defina quem pode imprimir, copiar ou editar. Grátis, sem envio, sem conta, sem marca d'água.",
    h1: "Proteger um PDF com senha",
    intro:
      "Coloque uma senha em um PDF. O arquivo é criptografado com AES-256 no seu navegador, e só quem tem a senha pode abrir. Nada é enviado.",
    actionLabel: "Proteger PDF",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Digite a senha que abre o arquivo. Defina uma senha de proprietário e as permissões, se precisar.",
      "Clique em Proteger PDF. O arquivo criptografado é baixado na hora.",
    ],
    faq: [
      {
        q: "Qual criptografia a ferramenta usa?",
        a: "AES-256, a criptografia mais forte do padrão PDF (PDF 2.0). Todo leitor de PDF atual abre esse arquivo: Adobe Reader, Chrome, Edge, Firefox, Safari e a Pré-Visualização do Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "O que acontece se eu deixar a senha de proprietário vazia?",
        a: "A ferramenta usa a senha que abre o arquivo nas duas funções. Nesse caso, as permissões não limitam quem conhece essa senha. Defina uma senha de proprietário diferente quando as permissões precisarem valer.",
      },
      {
        q: "O que as permissões fazem?",
        a: "Elas dizem ao leitor de PDF o que quem tem a senha de usuário pode fazer: imprimir o arquivo, copiar texto e imagens e editar o arquivo. Quem tem a senha de proprietário pode fazer tudo. A maioria dos leitores respeita as permissões, mas elas são um sinal, não uma tranca. A senha é a proteção de verdade.",
      },
      {
        q: "Posso remover a senha depois?",
        a: "Sim. Abra o arquivo na ferramenta Desbloquear PDF e digite a senha. Você recebe uma cópia sem senha. Guarde a senha em um lugar seguro. Sem ela, o arquivo não pode ser aberto.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Qual deve ser o tamanho da senha?",
        a: "Use pelo menos 12 caracteres, com letras, números e símbolos. AES-256 é forte, mas um programa consegue adivinhar uma senha curta. Não mande a senha no mesmo e-mail que o arquivo.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: ["proteger pdf", "colocar senha em pdf", "proteger pdf com senha", "criptografar pdf", "bloquear pdf", "senha em pdf online grátis"],
  },

  // ---- viewer ----
  {
    id: "pdf-viewer",
    slug: "abrir-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Leitor de PDF",
    navLabel: "Abrir",
    title: "Abrir PDF Online – Leitor de PDF Grátis, Sem Envio",
    description:
      "Abra e leia um arquivo PDF no seu navegador. Role as páginas, amplie e imprima. Leitor de PDF grátis, sem envio, sem conta e sem instalar programas da Adobe.",
    h1: "Abrir e ler um PDF",
    intro:
      "Abra um arquivo PDF e leia no seu navegador. Role as páginas, amplie e imprima. O arquivo fica no seu dispositivo.",
    actionLabel: "Imprimir",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher.",
      "Role as páginas. Use a barra de ferramentas para ir a uma página, ampliar, reduzir ou ajustar a página à largura da janela.",
      "Clique em Imprimir para abrir o arquivo em uma nova aba e imprimir pelo navegador. Clique no X ao lado do nome do arquivo para abrir outro arquivo.",
    ],
    faq: [
      {
        q: "Como abro um arquivo PDF sem o Adobe?",
        a: "Solte o arquivo nesta página, ou clique na caixa e escolha. Você não precisa do Adobe Acrobat nem do Adobe Reader. A página desenha o PDF com o mesmo motor de código aberto que o Firefox usa. Funciona no Chrome, Edge, Firefox e Safari. Não há nada para instalar.",
      },
      {
        q: "O que é um leitor de PDF?",
        a: "Um leitor de PDF é um programa que abre arquivos PDF e mostra as páginas na tela. O Adobe Reader é um exemplo. A maioria dos navegadores também tem um leitor embutido. Esta página é um leitor de PDF que funciona como página web. Ela desenha cada página no seu navegador e não envia o arquivo para lugar nenhum.",
      },
      {
        q: "Meu PDF é enviado quando eu abro?",
        a: "Não. O arquivo é lido por JavaScript no seu próprio dispositivo e desenhado na tela ali mesmo. Nada vai para um servidor. Você pode conferir no painel de rede do navegador: nenhuma requisição leva o seu arquivo.",
      },
      {
        q: "O visualizador funciona offline?",
        a: "Em grande parte. O arquivo é aberto no seu navegador, e nenhum dado vai para um servidor. O código do visualizador e algumas fontes são carregados do nosso site quando são necessários pela primeira vez. Abra a página e um arquivo enquanto estiver online. Depois disso, você pode abrir mais arquivos sem conexão até fechar a aba.",
      },
      {
        q: "Posso imprimir o PDF?",
        a: "Sim. Clique em Imprimir na barra de ferramentas. O arquivo abre em uma nova aba, no leitor de PDF do navegador. Pressione Ctrl+P (Cmd+P no Mac) nessa aba para imprimir. O navegador imprime o arquivo original, então o texto sai nítido no papel.",
      },
      {
        q: "Posso ampliar?",
        a: "Sim. Use os botões de mais e menos na barra de ferramentas, ou clique em Ajustar à largura para a página ocupar toda a largura da janela. Cada página é desenhada de novo no novo tamanho, então o texto continua nítido em qualquer zoom.",
      },
      {
        q: "Posso editar o PDF aqui?",
        a: "Não. Esta ferramenta só mostra o arquivo. Para adicionar texto, cobrir partes, inserir imagens ou uma assinatura sobre uma página, use a ferramenta Editar PDF. Para girar, reordenar, excluir, dividir, juntar ou converter páginas, use as outras ferramentas deste site.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "abrir pdf",
      "leitor de pdf",
      "leitor pdf online",
      "visualizar pdf online",
      "abrir pdf online",
      "ler pdf sem adobe",
      "abrir arquivo pdf",
    ],
  },

  // ---- edit ----
  {
    id: "edit-pdf",
    slug: "editar-pdf",
    kind: "edit",
    nav: true,
    priority: 2,
    name: "Editar PDF",
    navLabel: "Editar",
    title: "Editar PDF Online – Adicione Texto, Cubra Partes e Imagens, Grátis",
    description:
      "Edite um PDF no seu navegador: adicione texto, cubra partes com branco, destaque trechos, insira imagens e desenhe uma assinatura. Grátis, sem envio, sem conta.",
    h1: "Editar um PDF",
    intro:
      "Adicione texto, retângulos brancos, destaques, imagens e uma assinatura desenhada sobre as páginas de um PDF. A ferramenta não altera o texto que já está no arquivo; ela coloca conteúdo novo por cima. Tudo acontece no seu navegador.",
    actionLabel: "Salvar PDF",
    steps: [
      "Solte um PDF na caixa, ou clique para escolher. Escolha uma página na faixa à esquerda.",
      "Escolha uma ferramenta na barra. Clique na página para adicionar uma caixa de texto, arraste para desenhar um retângulo branco ou um destaque, adicione uma imagem ou desenhe com a caneta. Arraste um item para mover, puxe o canto para redimensionar e pressione Delete para remover.",
      "Clique em Salvar PDF. O arquivo editado é baixado na hora.",
    ],
    faq: [
      {
        q: "O que posso editar em um PDF com esta ferramenta?",
        a: "Você pode colocar conteúdo novo sobre qualquer página: caixas de texto, retângulos brancos para cobrir partes, destaques amarelos, imagens (PNG ou JPG) e traços livres feitos com o mouse ou o dedo. Você pode mover, redimensionar e excluir cada item antes de salvar. O conteúdo original da página continua por baixo.",
      },
      {
        q: "Posso alterar o texto que já está no PDF?",
        a: "Não. Esta ferramenta não edita o texto existente. Ela adiciona conteúdo novo sobre a página. Para trocar uma palavra ou um número, desenhe um retângulo branco por cima e adicione uma caixa de texto. O texto antigo fica coberto na tela e no papel, mas continua no arquivo, então um programa que copia texto do PDF ainda pode encontrá-lo.",
      },
      {
        q: "Como assino um PDF?",
        a: "Escolha a ferramenta Desenhar e desenhe a sua assinatura na página com o mouse, uma caneta ou o dedo. Ou escolha Imagem e selecione uma foto da sua assinatura em PNG ou JPG. Mova a assinatura para o lugar certo, redimensione e clique em Salvar PDF. A página Assinar PDF já começa com a ferramenta Desenhar selecionada.",
      },
      {
        q: "Meu PDF é enviado para um servidor?",
        a: "Não. O arquivo é aberto por JavaScript no seu próprio dispositivo. As edições são gravadas no arquivo pela biblioteca de código aberto pdf-lib, no seu navegador. Nada é enviado para nós. Você pode desligar a internet depois que a página carregar, e a ferramenta continua funcionando.",
      },
      {
        q: "Quais fontes posso usar?",
        a: "Helvetica, Times e Courier. São as fontes padrão do PDF, então o arquivo fica pequeno e todo leitor de PDF as mostra sem precisar de um arquivo de fonte incorporado. Você pode definir o tamanho e a cor de cada caixa de texto.",
      },
      {
        q: "Por que um caractere especial aparece como ponto de interrogação?",
        a: "As fontes padrão do PDF contêm os caracteres latinos das línguas da Europa Ocidental (o conjunto WinAnsi). As letras acentuadas do português, como ã, ç e é, funcionam. Um caractere fora desse conjunto, como um caractere chinês, um emoji ou alguns símbolos, não pode ser codificado, então a ferramenta grava um ponto de interrogação no lugar. Digite o texto com caracteres do alfabeto latino, ou adicione como imagem.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: [
      "editar pdf",
      "editor de pdf",
      "editor de pdf grátis",
      "editar pdf online",
      "editar pdf grátis",
      "como editar pdf",
      "adicionar texto em pdf",
      "editor pdf online",
    ],
  },
  {
    id: "sign-pdf",
    slug: "assinar-pdf",
    kind: "edit",
    nav: false,
    priority: 14,
    name: "Assinar PDF",
    navLabel: "Assinar",
    title: "Assinar PDF Online – Desenhe ou Insira sua Assinatura, Grátis, Sem Envio",
    description:
      "Assine um PDF no seu navegador. Desenhe a sua assinatura com o mouse ou o dedo, ou insira uma imagem dela, posicione e salve. Grátis, sem envio, sem conta.",
    h1: "Assinar um PDF",
    intro:
      "Desenhe a sua assinatura na página, ou insira uma imagem dela. Mova para o lugar certo, redimensione e salve o arquivo. O PDF não sai do seu dispositivo.",
    actionLabel: "Salvar PDF",
    steps: [
      "Solte o PDF na caixa, ou clique para escolher. Escolha na faixa à esquerda a página que precisa da assinatura.",
      "A ferramenta Desenhar já está selecionada. Desenhe a sua assinatura na página com o mouse, uma caneta ou o dedo. Ou clique em Imagem e escolha um PNG ou JPG da sua assinatura. Arraste para o lugar certo e puxe o canto para redimensionar. Use a ferramenta Texto para adicionar a data ou o seu nome.",
      "Clique em Salvar PDF. O arquivo assinado é baixado na hora.",
    ],
    faq: [
      {
        q: "Como assino um PDF sem imprimir?",
        a: "Adicione o PDF e desenhe a sua assinatura na página com a ferramenta Desenhar. Você pode usar o mouse, uma caneta ou o dedo em uma tela sensível ao toque. Mova e redimensione a assinatura, depois clique em Salvar PDF. A assinatura passa a fazer parte da página. Não precisa de impressora nem de scanner.",
      },
      {
        q: "Posso usar uma foto da minha assinatura?",
        a: "Sim. Assine em uma folha branca, tire uma foto ou digitalize e salve como PNG ou JPG. Clique em Imagem, escolha o arquivo e posicione na página. Um PNG com fundo transparente fica melhor. A imagem é incorporada ao PDF com a qualidade completa.",
      },
      {
        q: "Isso é uma assinatura eletrônica com validade legal?",
        a: "A ferramenta desenha uma imagem da sua assinatura na página. Ela não adiciona um certificado digital e não verifica quem assinou. Muitos acordos aceitam uma assinatura desenhada, mas as regras mudam de país para país e de contrato para contrato. Se a outra parte exigir uma assinatura com certificado, use um serviço que emita uma.",
      },
      {
        q: "Posso assinar no celular?",
        a: "Sim. A página funciona no navegador de um celular ou tablet. Desenhe com o dedo ou com uma caneta stylus. Use o gesto de pinça para ampliar o navegador se o campo for pequeno. O arquivo fica no celular.",
      },
      {
        q: "Posso adicionar a data ao lado da assinatura?",
        a: "Sim. Escolha a ferramenta Texto, clique na página e digite a data. Você pode definir o tamanho da fonte e a cor. Arraste a caixa de texto para perto da assinatura.",
      },
      {
        q: "Meu documento assinado é enviado?",
        a: "Não. O PDF e a assinatura ficam no seu navegador. A assinatura é gravada no arquivo por JavaScript no seu próprio dispositivo. Nada é enviado para nós.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: [
      "assinar pdf",
      "assinar pdf online",
      "assinatura em pdf",
      "assinar pdf grátis",
      "colocar assinatura em pdf",
      "assinar documento pdf",
      "desenhar assinatura em pdf",
    ],
    defaults: { tool: "draw" },
  },
];
