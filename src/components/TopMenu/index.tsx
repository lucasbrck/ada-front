import { useMemo } from "react";
import * as S from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

const TopMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { label: "Personagens", path: "/personagens" },
      { label: "Tiras", path: "/tiras" },
      { label: "Sobre", path: "/sobre" },
    ],
    []
  );

  const handleNavigate = (path: string) => navigate(path);

  const isActive = (path: string) => path === location.pathname;

  return (
    <S.Container>
      <S.StyledSticker handleClick={() => handleNavigate("/")} textData="Tirinhas da Ada" />
      {navItems.map(({ label, path }) => (
        <S.StyledOptions
          key={path}
          active={isActive(path)}
          handleClick={() => handleNavigate(path)}
          textData={label}
        />
      ))}
    </S.Container>
  );
};

export default TopMenu;
