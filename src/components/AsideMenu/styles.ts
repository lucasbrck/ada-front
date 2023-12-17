import StickerText, { StickerOptions } from "components/StickerText";
import styled, { css } from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 25px;
`;
export const Container = styled.div<{active:boolean}>`
  display: ${p=>p.active? "flex" : "none"};
  flex-direction: column;
  background:white;
  z-index:3;
  padding:30px;
  margin-left: 0;
`;

export const Header = styled.div`
width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: space-around;
`;
interface Props {
  type: "primary" | "secondary";
}
export const StyledSticker = styled(StickerText)<Props>`
  justify-self: left;
`;

interface OptionsProps {
  active: boolean;
}

export const Menu = styled.img`
  width: 35px;
  height: 35px;
  background-color: white;
  z-index: 3;
`;
export const StyledOptions = styled(StickerOptions)<OptionsProps>`
  margin-bottom: 5px;
  justify-self: left;
  width: fit-content;
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
