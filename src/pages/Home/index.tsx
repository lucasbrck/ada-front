import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import AdaPresent from "assets/images/ada_espiando.png";
import FeaturedComic from "assets/images/tirinhas/002.jpg";

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.Hero>
        <S.InfoWrapper>
          <S.Tag>Aprender em quadrinhos</S.Tag>
          <S.Presentation>
            Toda curiosidade pode virar uma boa <S.Highlight>história.</S.Highlight>
          </S.Presentation>
          <S.Subtitle>
            Acompanhe Ada e sua turma em tirinhas que tornam ideias do dia a dia
            mais leves, divertidas e fáceis de entender.
          </S.Subtitle>
          <S.Actions>
            <S.PrimaryAction as={Link} to="/tiras">
              Explorar tirinhas
              <span aria-hidden="true">→</span>
            </S.PrimaryAction>
            <S.SecondaryAction as={Link} to="/personagens">
              Conhecer a turma
            </S.SecondaryAction>
          </S.Actions>
          <S.Topics aria-label="Temas das tirinhas">
            <span>Ciência</span>
            <span>Matemática</span>
            <span>Cidadania</span>
          </S.Topics>
        </S.InfoWrapper>

        <S.ImgContainer>
          <S.Hint>Olá! Eu sou a Ada. Vamos descobrir algo novo hoje?</S.Hint>
          <S.Image
            src={AdaPresent}
            alt="Ada, personagem principal das Tirinhas da Ada"
            decoding="async"
          />
          <S.Doodle aria-hidden="true">?</S.Doodle>
        </S.ImgContainer>
      </S.Hero>

      <S.FeaturedSection>
        <S.FeaturedHeading>
          <S.SectionLabel>Para começar</S.SectionLabel>
          <S.SectionTitle>Uma tirinha para abrir a conversa</S.SectionTitle>
        </S.FeaturedHeading>
        <S.ComicLink to="/tiras" aria-label="Ver todas as tirinhas">
          <S.ComicImage
            src={FeaturedComic}
            alt="Prévia de uma tirinha educativa da Ada"
            loading="lazy"
            decoding="async"
          />
          <S.ComicCaption>
            <span>Leia, pense e compartilhe</span>
            <strong>Ver tirinhas <span aria-hidden="true">→</span></strong>
          </S.ComicCaption>
        </S.ComicLink>
      </S.FeaturedSection>
    </S.Container>
  );
};

export default Home;
