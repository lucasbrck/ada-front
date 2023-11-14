import React from "react";
import * as S from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

const TopMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    const direction = e?.currentTarget.innerText;
    navigate(`/${direction?.replaceAll(" ", "")}`);
  };
  const goToHome = () => {
    navigate("/");
  };

  const activeTab = (path: string) => {
    return path === location.pathname.replace("/","")
  };

  return (
    <S.Container>
      <S.StyledSticker handleClick={goToHome} textData="Tirinhas da Ada" />
      <S.StyledOptions
        active={activeTab("Personagens")}
        handleClick={handleClick}
        textData="Personagens"
      />
      <S.StyledOptions
        active={activeTab("Tiras")}
        handleClick={handleClick}
        textData="Tiras"
      />
      <S.StyledOptions
        active={activeTab("Sobre")}
        handleClick={handleClick}
        textData="Sobre"
      />
      <S.StyledOptions
        active={activeTab("Jogos")}
        handleClick={handleClick}
        textData="Jogos"
      />
    </S.Container>
  );
};

export default TopMenu;
