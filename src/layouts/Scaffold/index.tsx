import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as I from "assets/images/personagens";

interface Props extends React.PropsWithChildren<{}> {}

const Scaffold: React.FC<Props> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.StyledContainer>
      <S.Paper>
        <S.Lines>
          {isMobile ? <S.SAsideMenu /> : <S.STopMenu />}
          {children}
        </S.Lines>
        <S.TiltedImage src={I.imgCaramelo} />
      </S.Paper>
    </S.StyledContainer>
  );
};

export default Scaffold;
