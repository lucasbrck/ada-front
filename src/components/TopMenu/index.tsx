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
      { label: "Jogos", path: "/jogos" },
      { label: "Sobre", path: "/sobre" },
    ],
    []
  );

  const handleNavigate = (path: string) => navigate(path);

  const isActive = (path: string) => path === location.pathname;

  return (
    <S.Container>
      <S.Brand onClick={() => handleNavigate("/")} aria-label="Ir para a página inicial">
        <span>Tirinhas da Ada</span>
        <small>descobertas em quadrinhos</small>
      </S.Brand>
      <S.Navigation aria-label="Navegação principal">
        {navItems.map(({ label, path }) => (
          <S.NavButton key={path} active={isActive(path)} onClick={() => handleNavigate(path)}>
            {label}
          </S.NavButton>
        ))}
      </S.Navigation>
    </S.Container>
  );
};

export default TopMenu;
