import React from "react";
import * as S from "./styles";
import ImageCarousel from "components/ImageCarousel";
import { data } from "./tiras/stripes";


const Tirinhas: React.FC = () => {
  return (
    <S.Container>
      <S.Handwrite>Leia e divirta-se com as tirinhas da Ada!</S.Handwrite>
      <ImageCarousel images={data}/>
    </S.Container>
  );
};

export default Tirinhas;
