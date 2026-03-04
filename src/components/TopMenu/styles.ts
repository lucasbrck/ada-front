import StickerText, { StickerOptions } from "components/StickerText";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 35px;
`;

export const StyledSticker = styled(StickerText)`
`;

interface OptionsProps {
  active: boolean
}
export const StyledOptions = styled(StickerOptions)<OptionsProps>`
  ${p => p.active && css`
  &::after{
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: -5px;
    transform: skew(-12deg);
    border-bottom: solid 15px rgba(238,111,87,0.5);
  }`
}`
