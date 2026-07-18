export interface Stripe {
  load: () => Promise<string>;
}

const imageModules = import.meta.glob<string>(
  "../../../assets/images/tirinhas/*.jpg",
  { query: "?url", import: "default" }
);

const files = [
  "001.jpg",
  "002.jpg",
  "003.jpg",
  "004.jpg",
  "005.jpg",
  "006.jpg",
  "007.jpg",
  "007B.jpg",
  "008_prisma_triangular.jpg",
  "009_adabismo.jpg",
  "010_Museu.jpg",
  "011_Fake_News_no_Supermercado.jpg",
  "012_Juros.jpg",
  "013.jpg",
  "014.jpg",
  "015.jpg",
  "016.jpg",
  "017.jpg",
  "018.jpg",
  "019.jpg",
  "020.jpg",
  "21.jpg",
  "022.jpg",
];

export const data: Stripe[] = files.map((file) => {
  const load = imageModules[`../../../assets/images/tirinhas/${file}`];

  if (!load) {
    throw new Error(`Imagem da tirinha nao encontrada: ${file}`);
  }

  return { load };
});
