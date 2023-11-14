import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  cursor: default;
  font-family: ${Fonts.Rancho}, cursive;
`;

export const StickerOptions = styled.p`
  font-size: clamp(50px, 0.22rem, 50px);
  justify-self: center;
  align-self: center;
  height: fit-content;
  user-select: none;
  cursor: pointer;
  text-align: center;
  width: 100%;
  line-height: 55px;
  color: #ff0800;
  filter: drop-shadow(0 0 5px #777);
  position: relative;
  z-index: 1;

  &:before {
    content: attr(data-stroke);
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    -webkit-text-stroke: 10px #f0ffff;
    z-index: -1;
    text-shadow: none;
  }
`;
export const StickerText = styled.p`
  font-size: clamp(65px, 0.22rem, 50px);
  text-align: center;
  line-height: 55px;
  color: #ff0800;
  cursor: pointer;
  user-select: none;
  filter: drop-shadow(0 0 5px #777);
  position: relative;
  z-index: 1;

  &:before {
    content: attr(data-stroke);
    position: absolute;
    top: 0;
    left: 0;
    -webkit-text-stroke: 10px #f0ffff;
    z-index: -1;
    text-shadow: none;
  }
`;
