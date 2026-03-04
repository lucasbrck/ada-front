import React, { useMemo, useState } from "react";
import * as S from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

const AsideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Personagens", path: "/personagens" },
      { label: "Tiras", path: "/tiras" },
      { label: "Sobre", path: "/sobre" },
    ],
    []
  );

  const handleNavigate = (path: string) => {
    setActive(false);
    navigate(path);
  };
  const goToHome = () => {
    setActive(false);
    navigate("/");
  };

  const isActive = (path: string) => path === location.pathname;

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
        {navItems.map(({ label, path }) => (
          <S.StyledOptions
            key={path}
            active={isActive(path)}
            handleClick={() => handleNavigate(path)}
            textData={label}
          />
        ))}
      </S.Container>
    </S.MenuContainer>
  );
};

export default AsideMenu;
