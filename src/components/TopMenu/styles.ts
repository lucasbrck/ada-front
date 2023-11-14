import StickerText, { StickerOptions } from "components/StickerText";
import styled, { css } from "styled-components";
import { Colors } from "styles/constants";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px;
  column-gap: 35px;
  margin-left: 80px;
`;

interface Props {
  type: 'primary' | 'secondary'
}
export const StyledSticker = styled(StickerText)<Props>`
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
    border-bottom: solid 15px rgba(238,111,87,0.5)`
  }
}`
