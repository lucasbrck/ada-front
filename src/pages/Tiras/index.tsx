import React from "react";
import * as S from "./styles";
import ImageCarousel from "components/ImageCarousel";
import { data } from "./tiras/stripes";


const Tirinhas: React.FC = () => {
  return (
    <S.Container>
      <S.PageHeader>
        <S.Eyebrow>Tirinhas da Ada</S.Eyebrow>
        <S.Title>Uma leitura curta, uma ideia para levar com voce.</S.Title>
        <S.Intro>Escolha uma tirinha e acompanhe as descobertas da turma.</S.Intro>
      </S.PageHeader>
      <ImageCarousel images={data} />
    </S.Container>
  );
};

export default Tirinhas;
