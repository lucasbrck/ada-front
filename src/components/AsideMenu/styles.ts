import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";

export const MenuContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 12px 16px 8px;
  margin-bottom: 8px;
`;

export const Backdrop = styled.button<{ active: boolean }>`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(0, 15, 85, 0.18);
  opacity: ${(p) => (p.active ? 1 : 0)};
  pointer-events: ${(p) => (p.active ? "auto" : "none")};
  transition: opacity 0.2s ease;
  z-index: 1;
`;

export const Container = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  top: calc(100% + 10px);
  right: 16px;
  min-width: min(280px, calc(100vw - 40px));
  padding: 10px;
  border-radius: 6px;
  background: #fffef9;
  box-shadow: 6px 6px 0 #d8edf0;
  border: 1px solid #b6ccd2;
  z-index: 2;
  opacity: ${(p) => (p.active ? 1 : 0)};
  transform: ${(p) => (p.active ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${(p) => (p.active ? "auto" : "none")};
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 4px 12px;
  border-bottom: 1px solid rgba(61, 89, 105, 0.28);
  position: relative;
  z-index: 2;
`;

export const Brand = styled.button`
  display: grid;
  min-width: 0;
  gap: 1px;
  color: #d7463a;
  text-align: left;

  span {
    font-family: ${Fonts.Rancho}, cursive;
    font-size: 30px;
    line-height: 0.9;
  }

  small {
    color: #43596b;
    font-family: ${Fonts.GilroySemiBold}, sans-serif;
    font-size: 9px;
    text-transform: uppercase;
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: #e8f4f5;
  border: 1px solid #b6ccd2;
  border-radius: 5px;
  padding: 9px 10px;
  cursor: pointer;
`;

export const MenuLabel = styled.span`
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 14px;
  line-height: 1;
  color: #000f55;
`;

interface OptionsProps {
  active: boolean;
}

export const MenuIcon = styled.span<{ active: boolean }>`
  position: relative;
  display: inline-flex;
  width: 24px;
  height: 18px;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 999px;
    background: #ff0800;
    transition: transform 0.2s ease, opacity 0.2s ease, top 0.2s ease;
  }

  span:nth-child(1) {
    top: ${(p) => (p.active ? "7px" : "0")};
    transform: ${(p) => (p.active ? "rotate(45deg)" : "none")};
  }

  span:nth-child(2) {
    top: 7px;
    opacity: ${(p) => (p.active ? 0 : 1)};
  }

  span:nth-child(3) {
    top: ${(p) => (p.active ? "7px" : "14px")};
    transform: ${(p) => (p.active ? "rotate(-45deg)" : "none")};
  }
`;

export const NavButton = styled.button<OptionsProps>`
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  color: #2f4b5b;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 16px;
  text-align: left;
  border-radius: 4px;

  &:hover,
  &:focus-visible {
    color: #b63f35;
    background: #fde4dd;
  }

  &:focus-visible {
    outline: 2px solid #1ab1f3;
    outline-offset: 2px;
  }

  ${(p) =>
    p.active &&
    css`
      color: #b63f35;
      background: #fde4dd;
    `}
`;
