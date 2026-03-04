import { useEffect, useId, useMemo, useState } from "react";
import * as S from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

const AsideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const menuId = useId();

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

  useEffect(() => {
    setActive(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <S.MenuContainer>
      <S.Backdrop
        type="button"
        active={active}
        aria-label="Fechar menu"
        onClick={() => setActive(false)}
      />
      <S.Header>
        <S.StyledSticker handleClick={goToHome} textData="Tirinhas da Ada" />
        <S.MenuButton
          type="button"
          onClick={() => setActive((current) => !current)}
          aria-controls={menuId}
          aria-expanded={active}
          aria-label={active ? "Fechar menu" : "Abrir menu"}
        >
          <S.MenuLabel>{active ? "Fechar" : "Menu"}</S.MenuLabel>
          <S.MenuIcon active={active} aria-hidden="true">
            <span />
            <span />
            <span />
          </S.MenuIcon>
        </S.MenuButton>
      </S.Header>
      <S.Container id={menuId} active={active}>
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
