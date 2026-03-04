import StickerText, { StickerOptions } from "components/StickerText";
import styled, { css } from "styled-components";
import { Fonts } from "styles/constants";

export const MenuContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 16px 16px 10px 20px;
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
  gap: 12px;
  position: absolute;
  top: calc(100% + 10px);
  right: 16px;
  min-width: min(280px, calc(100vw - 40px));
  padding: 20px 18px 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 30px rgba(0, 15, 85, 0.16);
  border: 2px solid rgba(238, 111, 87, 0.18);
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
  padding: 14px 16px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 14px 24px rgba(0, 15, 85, 0.12);
  border: 1px solid rgba(238, 111, 87, 0.14);
  backdrop-filter: blur(8px);
  position: relative;
  z-index: 2;
`;

export const StyledSticker = styled(StickerText)`
  justify-self: left;
  max-width: calc(100% - 96px);
  flex: 1;
  min-width: 0;

  @media (width <= 600px) {
    font-size: clamp(22px, 6vw, 28px);
    line-height: 1;
    white-space: nowrap;

    &::before {
      white-space: nowrap;
    }
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: rgba(240, 255, 255, 0.95);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 15, 85, 0.12);
`;

export const MenuLabel = styled.span`
  font-family: ${Fonts.Marker}, cursive;
  font-size: 20px;
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

export const StyledOptions = styled(StickerOptions)<OptionsProps>`
  margin-bottom: 2px;
  justify-self: left;
  width: fit-content;
  line-height: 1;
  ${(p) =>
    p.active &&
    css`
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: -5px;
        transform: skew(-12deg);
        border-bottom: solid 8px rgba(238, 111, 87, 0.5);
      }
    `}
`;
