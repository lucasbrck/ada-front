import React from "react";
import * as S from "./styles";
import TopMenu from "components/TopMenu";
import * as I from "assets/images/personagens";


interface Props extends React.PropsWithChildren<{}> {}

const Scaffold: React.FC<Props> = ({ children }) => {
  return (
    <S.StyledContainer>
      <S.Paper>
        <S.Lines>
          <TopMenu/>
          {children}
          </S.Lines>
          <S.TiltedImage src={I.imgCaramelo}/>
      </S.Paper>
    </S.StyledContainer>
  );
};

export default Scaffold;
