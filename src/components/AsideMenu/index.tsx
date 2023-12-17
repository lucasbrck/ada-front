import React, { useState } from "react";
import * as S from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

const AsideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setActive(false);
    const direction = e?.currentTarget.innerText;
    navigate(`/${direction?.replaceAll(" ", "")}`);
  };
  const goToHome = () => {
    setActive(false);
    navigate("/");
  };

  const activeTab = (path: string) => {
    return path === location.pathname.replace("/", "");
  };

  return (
    <S.MenuContainer>
      <S.Header>
        <S.StyledSticker handleClick={goToHome} textData="Tirinhas da Ada" />
        <S.Menu
          onClick={() => setActive(!active)}
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.2/icons/list.svg"
          alt=""
        />
      </S.Header>
      <S.Container active={active}>
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
    </S.MenuContainer>
  );
};

export default AsideMenu;
