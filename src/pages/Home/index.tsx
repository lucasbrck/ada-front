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
        <S.Presentation>Bem-vindos ao portal da Ada!</S.Presentation>
        {/* <S.Info>Nesse portal você conhecerá a Ada e seus amigos!</S.Info>
        <S.Info>
          Venha conhecer os personagens e aprender enquanto se diverte!
        </S.Info> */}
      </S.InfoWrapper>
    </S.Container>
  );
};

export default Home;
