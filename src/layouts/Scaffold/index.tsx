import React from "react";
import * as S from "./styles";
import TopMenu from "components/TopMenu";

interface Props extends React.PropsWithChildren<{}> {}

const Scaffold: React.FC<Props> = ({ children }) => {
  return (
    <S.StyledContainer>
      <S.Paper>
        <S.Lines>
          <TopMenu/>
          {children}
          </S.Lines>
      </S.Paper>
    </S.StyledContainer>
  );
};

export default Scaffold;
