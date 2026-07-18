import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.header`
  display: flex;
  width: min(1180px, calc(100% - 96px));
  min-height: 64px;
  margin: 0 auto;
  padding: 0 0 14px;
  border-bottom: 1px solid rgba(61, 89, 105, 0.28);
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

export const Brand = styled.button`
  display: grid;
  gap: 1px;
  color: #d7463a;
  text-align: left;

  span {
    font-family: ${Fonts.Rancho}, cursive;
    font-size: 36px;
    line-height: 0.9;
  }

  small {
    color: #43596b;
    font-family: ${Fonts.GilroySemiBold}, sans-serif;
    font-size: 11px;
    text-transform: uppercase;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface OptionsProps {
  active: boolean;
}

export const NavButton = styled.button<OptionsProps>`
  position: relative;
  min-height: 38px;
  padding: 8px 12px;
  color: #2f4b5b;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 15px;

  &::after {
    content: "";
    position: absolute;
    right: 12px;
    bottom: 4px;
    left: 12px;
    height: 2px;
    background: #df493c;
    transform: scaleX(0);
    transition: transform 160ms ease;
  }

  &:hover,
  &:focus-visible {
    color: #b63f35;
  }

  &:focus-visible {
    outline: 2px solid #1ab1f3;
    outline-offset: 2px;
  }

  ${p => p.active && css`
    color: #b63f35;
    &::after { transform: scaleX(1); }
  `}
`;
