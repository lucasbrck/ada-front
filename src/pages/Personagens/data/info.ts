import * as I from "assets/images/personagens";

export interface InfoChars {
  name: string;
  presentation: string;
  info: string;
  img: string;
  tape?: 1 | 2 | 3;
  tapeColor?: string;
  fold?: 1 | 2 | 3 | 4;
  foldAngle?: number;
}
export const infoChars: InfoChars[] = [
  {
    name: "Ada",
    img: I.imgAda,
    presentation: "Olá novamente! Clique em mim para me conhecer melhor!",
    info: "Tem sete anos, é uma menina divertida, inteligente e que adora matemática. O seu nome foi dado em homenagem à Ada Lovelace, considerada a primeira programadora do mundo.\nEla é fã da Mafalda e adora a sua escola, Ada busca compreender qual o seu lugar no mundo, procurando usar a linguagem matemática para decifrar e transformar a sua realidade. O seu maior sonho é ser uma programadora ou escritora.",
    fold: 3,
    foldAngle: 45,
    tape: 1,
  },
  {
    name: "Caramelo",
    img: I.imgCaramelo,
    presentation: "AU-aU! AU! AUUU! \n\n *ESTOU MUITO FELIZ! AMO A ADA! UHUL!*",
    info: "É o cachorro que Ada encontrou abandonado na rua e que o levou para casa. O irmão de caramelo também foi adotado, mas por Leonardo.",
    fold: 1,
    foldAngle: 45,
    tape: 2,
    tapeColor: "#39ff14",
  },
  {
    name: "Mãe da Ada",
    img: I.imgMaeDaAda,
    presentation: "Oi, sou a mãe da Ada você a viu por aí?",
    info: "Ela é uma mulher forte, inteligente e independente. A Ada tem a mãe como principal referência. Ela é a maior responsável por administrar as finanças da casa.",
    fold: 3,
    foldAngle: 15,
    tape: 3,
  },
  {
    name: "Pai da Ada",
    img: I.imgPaiDaAda,
    presentation: "Olá! Você é amigo(a) da minha filha Ada?",
    info: "É um homem trabalhador e que tem pouco tempo para a família. Ele tem uma visão mais fechada do mundo, mas sempre aprende muito com a sua filha.",
    fold: 4,
    foldAngle: 85,
    tape: 2,
    tapeColor: "#39ff14",
  },
  {
    name: "Euclides",
    img: I.imgEuclides,
    presentation: "Se X é igual a 42, então... Oi, não tinha visto você aí, prazer em conhecê-lo(a)!",
    info: "É o melhor aluno em matemática e ciências. Ele é um menino humilde que ama estudar e sonha em ser um cientista. Embora tímido, Euclides é muito estudioso, um garoto ligado aos programas de sua comunidade, como a coleta de materiais recicláveis e preservação da natureza, e atua na proteção dos animais.",
    fold: 3,
    foldAngle: 25,
    tape: 2,
  },
  {
    name: "Isaac",
    img: I.imgIsaac,
    presentation: "Olá! Me chamo Isaac, você tem algum hobby?",
    info: "É um garoto alegre e que ama aventuras. Embora possua limitações, isso não o impediu de se tornar um aventureiro. Fã de esportes, Isaac é campeão de natação e xadrez. Ele adora assistir televisão e séries, sempre na companhia do melhor amigo Leonardo.",
    fold: 1,
    foldAngle: 85,
    tape: 3,
    tapeColor: "#ffA500",
  },
  {
    name: "Kauane",
    img: I.imgKauane,
    presentation: "Olá! Sou a melhor amiga da Ada!",
    info: "É uma menina de descendência indígena, que ama aprender sobre a história do Brasil, elá é a melhor amiga de Ada, e adora ouvir música e jogos de tabuleiro. Kauane mora com os avós na mesma rua da sua melhor amiga.",
    fold: 4,
    foldAngle: 35,
    tape: 1,
    tapeColor: "#39ff14",
  },
  {
    name: "Leonardo",
    img: I.imgLeonardo,
    presentation: "Olá amigo(a), me chamo Leonardo, o prazer é todo meu!",
    info: "É muito dedicado e sempre tira notas boas na escola. Ele gosta muito de arte, pois aprendeu com os pais que arte é uma importante fonte de conhecimento. Os seus hobbys preferidos são ir ao cinema, ao teatro ou ler história em quadrinhos. Leonardo pretende ser médico ou advogado, assim como os seus pais.",
    fold: 3,
    foldAngle: 45,
    tape: 3,
  },
  {
    name: "Margarete",
    img: I.imgMargarete,
    presentation: "Olá, sou a Margarete! Prazer em conhecê-lo(a)",
    info: "Ela tem uma personalidade forte, defensora dos animais e companheira das meninas. Margarete ama literatura, principalmente poemas. Ela mora apenas com sua mãe e é prima de Leonardo. Como sua amiga Ada, deseja um mundo mais seguro e igualitário, especialmente pensando nas mulheres. O seu sonho é ser escritora ou artista plástica, bem como a sua mãe.",
    fold: 1,
    foldAngle: 85,
    tape: 2,
  },
  {
    name: "Professora",
    img: I.imgProfessora,
    presentation: "'No ato de ensinar o professor também aprende.' - Paulo Freire",
    info: "Sempre buscando criar situações desencadeadoras de aprendizagem, visando não apenas o desenvolvimento intelectual dos alunos, mas também o desenvolvimento do aspect cidadão. Na sua prática, ela inclui instrumentos de mediação como tirinhas e as tecnologias.",
    fold: 2,
    foldAngle: 45,
    tape: 1,
    tapeColor: "#ffA500",
  },
];
