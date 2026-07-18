import React from "react";
import * as S from "./styles";
import Ada from "assets/images/ada_menu.png";
import Almanaque from "assets/images/apenas_almanaque.png";
import Autora from "assets/images/autora.jpg";

export const About: React.FC = () => {
  return (
      <S.Container>
        <S.PageHeader>
          <S.Eyebrow>Conheça o projeto</S.Eyebrow>
          <S.PageTitle>Histórias para aprender, pensar e conversar.</S.PageTitle>
          <S.Intro>O Portal da Ada aproxima educação, arte e cotidiano por meio das tirinhas.</S.Intro>
        </S.PageHeader>
        <S.StorySection>
          <S.ContentContainer>
            <S.SectionTitle>Quem é Ada?</S.SectionTitle>
            <S.Content>
              Ada foi uma personagem criada por uma discente da pós-graduação em
              Educação, juntamente com um artista gráfico no ano de 2019. A
              personagem foi idealizada e materializada a partir da necessidade
              em criar tiras para o ensino da matemática nas escolas. As tiras
              iniciais exploravam os conceitos matemáticos, como a série de
              histórias denominada: “A matemática é arte”, em que são explorados
              os conceitos como pavimentação do plano e simetria, a partir da
              relação com as obras do artista gráfico holandês- Maurits Cornelis
              Escher.{" "}
            </S.Content>
          </S.ContentContainer>
          <S.Image src={Ada} alt="Ilustração da Ada" />
        </S.StorySection>
        <S.StorySection $reverse>
          <S.Image src={Almanaque} alt="Almanaque da Ada" />

          <S.ContentContainer>
            <S.SectionTitle>O Almanaque</S.SectionTitle>
            <S.Content>
              Incialmente, a criação das histórias da Ada tinha uma
              intencionalidade pedagógica, contudo, o projeto se expandiu e
              surgiu a ideia de criar um Almanaque, com o desenvolvimento também
              de diversos personagens, jogos e exercícios, bem como a ideia das
              tiras, o Almanaque da Ada também possui intencionalidade de
              explorar a relação da arte e da matemática, além de incluir outras
              histórias que visam a educação financeira dos alunos nas escolas.
            </S.Content>
          </S.ContentContainer>
        </S.StorySection>
        <S.ContentContainer>
          <S.SectionTitle>{"Aqui estamos (e de cara nova!)"}</S.SectionTitle>
          <S.Content>
            Novamente, o projeto foi ampliado, o que resultou na materialização
            de um novo produto pedagógico, o portal da Ada. No entanto, o portal
            não tem apenas uma intenção pedagógica, mas também busca divulgar e
            socializar os materiais e as diferentes histórias da Ada, que
            exploram distintas situações do cotidiano, como: política,
            brincadeiras, educação, humor, entre outros.{" "}
          </S.Content>
        </S.ContentContainer>
        <S.StorySection>
          <S.ContentContainer>
            <S.SectionTitle>Idealizadores</S.SectionTitle>
            <S.Content>
              Isabely Melo da Silva, graduada em Letras (2018) em Língua
              Portuguesa e Inglesa, na Universidade Federal de São João del-Rei
              (UFSJ). Pós-graduada em Educação pela Universidade Federal de
              Lavras (UFLA). Pós-graduada em Neuropsicopedagogia pelo Centro
              Universitário Presidente Tancredo de Almeida Neves (UNIPTAN).
              Graduanda em Psicologia pelo Centro Universitário Presidente
              Tancredo de Almeida Neves. Juntamente com Davi Batista, aluno da
              graduação de Ciências da Computação na Universidade Federal de São
              João del-Rei, que possui uma empresa de design gráfico.
            </S.Content>
            <S.InstagramLink href="https://www.instagram.com/davibatnas/" target="_blank" rel="noreferrer">
              Perfil de Davi Batista no Instagram
            </S.InstagramLink>
          </S.ContentContainer>
          <S.Image src={Autora} alt="Foto da autora Isabely Melo" loading="lazy" decoding="async" />
        </S.StorySection>
      </S.Container>
  );
};

export default About;
