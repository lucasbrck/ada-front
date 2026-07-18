import { TilingMode } from "types";

export interface Challenge {
  id: string;
  title: string;
  mode: TilingMode;
  prompt: string;
  tip: string;
}

export const challenges: Challenge[] = [
  {
    id: "translation",
    title: "Passos da Ada",
    mode: "translation",
    prompt: "Desenhe uma marca e corte uma borda para criar uma faixa que se repete.",
    tip: "Na translação, a peça só desliza para os lados.",
  },
  {
    id: "rotation",
    title: "Meia-volta",
    mode: "rotation-180",
    prompt: "Crie uma forma que continue bonita quando gira meia-volta.",
    tip: "A cada peça alternada, o padrão gira 180 graus.",
  },
  {
    id: "reflection",
    title: "Espelho curioso",
    mode: "reflection",
    prompt: "Faça um desenho assimétrico e descubra a versão espelhada.",
    tip: "A reflexão inverte direita e esquerda sem mudar o tamanho.",
  },
  {
    id: "glide",
    title: "Deslize espelhado",
    mode: "glide-reflection",
    prompt: "Misture uma marca, um espelho e um pequeno deslocamento.",
    tip: "Glide reflection combina reflexão com um deslizamento.",
  },
];

export const wallpaperGroups = [
  ["p1", "Somente translação"], ["p2", "Meia-volta"], ["pm", "Espelho paralelo"],
  ["pg", "Reflexão deslizante"], ["cm", "Espelhos alternados"], ["pmm", "Dois espelhos"],
  ["pmg", "Espelho e deslizamento"], ["pgg", "Dois deslizamentos"], ["cmm", "Espelhos centrados"],
  ["p4", "Rotações de quarto de volta"], ["p4m", "Quartos de volta e espelhos"],
  ["p4g", "Quartos de volta e deslizamentos"], ["p3", "Rotações de um terço"],
  ["p3m1", "Triângulos espelhados"], ["p31m", "Triângulos alternados"],
  ["p6", "Rotações de sexto de volta"], ["p6m", "Hexágonos e espelhos"],
] as const;
