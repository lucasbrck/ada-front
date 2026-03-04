import React from "react";
import * as S from "./styles";
import AdaPresent from "assets/images/ada_espiando.png";

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.ImgContainer>
        <S.Hint>{"Olá, eu me chamo Ada! Prazer em conhecê-lo!"}</S.Hint>
        <S.Image src={AdaPresent} alt="Ada" />
      </S.ImgContainer>
      <S.InfoWrapper>
        <S.Tag>Portal da Ada</S.Tag>
        <S.Presentation>
          Bem-vindos ao portal da <S.Highlight>Ada</S.Highlight>!
        </S.Presentation>
        <S.Subtitle>
          Tirinhas, personagens curiosos e descobertas para aprender
          brincando.
        </S.Subtitle>
      </S.InfoWrapper>
    </S.Container>
  );
};

export default Home;
