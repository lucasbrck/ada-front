export interface InfoChars {
  name: string;
  presentation: string;
  info: string;
  loadImage: () => Promise<string>;
  fold?: 1 | 2 | 3 | 4;
}

const imageModules = import.meta.glob<string>(
  "../../../assets/images/personagens/*.png",
  { query: "?url", import: "default" }
);

const getImageLoader = (file: string) => {
  const load = imageModules[`../../../assets/images/personagens/${file}`];

  if (!load) {
    throw new Error(`Imagem do personagem nao encontrada: ${file}`);
  }

  return load;
};

export const infoChars: InfoChars[] = [
  {
    name: "Ada",
    loadImage: getImageLoader("ada.png"),
    presentation: "Olá novamente! Clique em mim para me conhecer melhor!",
    info: "Ada tem sete anos. É uma menina divertida, inteligente e apaixonada por matemática. Seu nome foi escolhido em homenagem a Ada Lovelace, considerada a primeira programadora do mundo. Fã da Mafalda e muito ligada à sua escola, Ada busca compreender qual é o seu lugar no mundo, usando a linguagem da matemática para decifrar e transformar a realidade ao seu redor. Seu maior sonho é se tornar programadora ou escritora.",
    fold: 3,
  },
  {
    name: "Caramelo",
    loadImage: getImageLoader("caramelo.png"),
    presentation: "AU-aU! AU! AUUU! \n\n *ESTOU MUITO FELIZ! AMO A ADA! UHUL!*",
    info: "É o cachorro que Ada encontrou abandonado na rua e levou para casa. O irmão de Caramelo também foi adotado, mas por Leonardo.",
    fold: 1,
  },
  {
    name: "Mãe da Ada",
    loadImage: getImageLoader("mae_da_ada.png"),
    presentation: "Oi, sou a mãe da Ada você a viu por aí?",
    info: "Ela é uma mulher forte, inteligente e independente. A Ada tem a mãe como principal referência. Ela é a maior responsável por administrar as finanças da casa.",
    fold: 3,
  },
  {
    name: "Pai da Ada",
    loadImage: getImageLoader("pai_da_ada.png"),
    presentation: "Olá! Você é amigo(a) da minha filha Ada?",
    info: "É um homem trabalhador e que tem pouco tempo para a família. Ele tem uma visão mais fechada do mundo, mas sempre aprende muito com a sua filha.",
    fold: 4,
  },
  {
    name: "Euclides",
    loadImage: getImageLoader("euclides.png"),
    presentation: "Se X é igual a 42, então... Oi, não tinha visto você aí, prazer em conhecê-lo(a)!",
    info: "É o melhor aluno em matemática e ciências. Ele é um menino humilde que ama estudar e sonha em ser um cientista. Embora tímido, Euclides é muito estudioso, um garoto ligado aos programas de sua comunidade, como a coleta de materiais recicláveis e preservação da natureza, e atua na proteção dos animais.",
    fold: 3,
  },
  {
    name: "Isaac",
    loadImage: getImageLoader("isaac.png"),
    presentation: "Olá! Me chamo Isaac, você tem algum hobby?",
    info: "É um garoto alegre e que ama aventuras. Embora possua limitações, isso não o impediu de se tornar um aventureiro. Fã de esportes, Isaac é campeão de natação e xadrez. Ele adora assistir televisão e séries, sempre na companhia do melhor amigo Leonardo.",
    fold: 1,
  },
  {
    name: "Kauane",
    loadImage: getImageLoader("kauane.png"),
    presentation: "Olá! Sou a melhor amiga da Ada!",
    info: "É uma menina de descendência indígena, que ama aprender sobre a história do Brasil, elá é a melhor amiga de Ada, e adora ouvir música e jogos de tabuleiro. Kauane mora com os avós na mesma rua da sua melhor amiga.",
    fold: 4,
  },
  {
    name: "Leonardo",
    loadImage: getImageLoader("Leonardo.png"),
    presentation: "Olá amigo(a), me chamo Leonardo, o prazer é todo meu!",
    info: "É muito dedicado e sempre tira notas boas na escola. Ele gosta muito de arte, pois aprendeu com os pais que arte é uma importante fonte de conhecimento. Os seus hobbys preferidos são ir ao cinema, ao teatro ou ler história em quadrinhos. Leonardo pretende ser médico ou advogado, assim como os seus pais.",
    fold: 3,
  },
  {
    name: "Margarete",
    loadImage: getImageLoader("margarete.png"),
    presentation: "Olá, sou a Margarete! Prazer em conhecê-lo(a)",
    info: "Ela tem uma personalidade forte, defensora dos animais e companheira das meninas. Margarete ama literatura, principalmente poemas. Ela mora apenas com sua mãe e é prima de Leonardo. Como sua amiga Ada, deseja um mundo mais seguro e igualitário, especialmente pensando nas mulheres. O seu sonho é ser escritora ou artista plástica, bem como a sua mãe.",
    fold: 1,
  },
  {
    name: "Professora",
    loadImage: getImageLoader("professora.png"),
    presentation: "'No ato de ensinar o professor também aprende.' - Paulo Freire",
    info: "Sempre buscando criar situações desencadeadoras de aprendizagem, visando não apenas o desenvolvimento intelectual dos alunos, mas também o desenvolvimento do aspect cidadão. Na sua prática, ela inclui instrumentos de mediação como tirinhas e as tecnologias.",
    fold: 2,
  },
];
