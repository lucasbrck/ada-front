import styled, { keyframes } from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  position: relative;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(36px, 5vw, 64px) 0 72px;

  @media (width <= 900px) {
    width: min(100% - 40px, 760px);
  }

  @media (width <= 600px) {
    width: min(100% - 32px, 540px);
  }
`;

export const PageHeader = styled.header`
  display: grid;
  gap: 12px;
  max-width: 720px;
  margin-bottom: 38px;
`;

export const Eyebrow = styled.span`
  color: #b63f35;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 13px;
  text-transform: uppercase;
`;

export const PageTitle = styled.h1`
  color: #142b47;
  font-family: ${Fonts.Fredoka}, sans-serif;
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.08;
`;

export const PageIntro = styled.p`
  color: #43596b;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 19px;
`;

export const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px 18px;

  @media (width <= 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (width <= 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 12px;
  }
`;

export const Image = styled.img`
  justify-self: center;
  align-self: center;
  width: min(240px, 80%);
  height: auto;
  z-index: 1;
  filter: drop-shadow(0 8px 8px rgba(23, 54, 76, 0.2));
  will-change: transform;
  backface-visibility: hidden;
  transition: transform 160ms ease-out;
  @media (width <= 600px) {
    width: 150px;
    height: auto;
  }
`;

export const ImagePlaceholder = styled.div`
  width: min(240px, 80%);
  aspect-ratio: 0.72;
  align-self: center;
  background: rgba(203, 231, 235, 0.55);
  border: 1px dashed #9ab7c2;
`;

const moveLeftRight = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15px);
  }
`;

export const Eraser = styled.img`
  align-self: center;
  width: 160px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 10px 16px rgba(0, 15, 85, 0.2));
  &&:hover {
    animation: ${moveLeftRight} 0.5s infinite;
  }
  @media (width <= 600px) {
    display: none;
  }
`;

export const Pencil = styled.img`
  height: 300px;
  z-index: 3;
  transform: rotate(-10deg) translateY(12px);
  filter: drop-shadow(0 14px 18px rgba(0, 15, 85, 0.2));
  transition: transform 0.2s ease;
  &&:hover {
    transform: rotate(-12deg) translateY(12px);
  }
  @media (width <= 600px) {
    display: none;
  }
`;

const handleTilt = (fold: number) => {
  switch (fold) {
    case 1:
      return "-2.5deg";
    case 2:
      return "1.5deg";
    case 3:
      return "-1deg";
    case 4:
      return "2deg";
    default:
      return "0deg";
  }
};
interface CardProps {
  fold: 1 | 2 | 3 | 4;
}
export const Hint = styled.div`
  z-index: 2;
  position: absolute;
  top: -6px;
  left: 62%;
  padding: 12px 14px;
  background-color: ${Colors.White};
  border: solid 2px #df493c;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #f7c948;
  font-family: ${Fonts.Marker};
  font-size: 14px;
  line-height: 1.3;
  text-align: left;
  min-width: 170px;
  max-width: 220px;
  user-select: none;
  color: #000f55;
  opacity: 0;
  transform: translateY(10px) scale(0.96);
  pointer-events: none;
  transition: opacity 160ms ease-out, transform 160ms ease-out;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 20px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    bottom: -15px;
    border-width: 15px 13px 0 0;
    border-color: #df493c transparent transparent transparent;
  }

  &::after {
    bottom: -11px;
    left: 22px;
    border-width: 12px 10px 0 0;
    border-color: ${Colors.White} transparent transparent transparent;
  }

  @media (width <= 600px) {
    top: -10px;
    left: 45%;
    padding: 8px 9px;
    font-size: 11px;
    min-width: 105px;
    max-width: 140px;
  }
`;
export const ImageContainer = styled.button<CardProps>`
  position: relative;
  padding: 6px 0 12px;
  display: grid;
  justify-items: center;
  row-gap: 6px;
  color: inherit;
  transform: rotate(${(p) => handleTilt(p.fold)});
  will-change: transform;
  transition: transform 160ms ease-out;
  @media (width <= 600px) {
    width: 120px;
    height: auto;
  }
  &::before {
    content: "";
    display: none;
  }
  &:hover {
    transform: rotate(0deg) translateY(-8px);

    ${Image} {
      transform: scale(1.035);
    }

    ${Hint} {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:focus-visible {
    outline: 3px solid #1ab1f3;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    ${Image},
    ${Hint} {
      transition: none;
    }
  }
`;

export const Name = styled.h2`
  position: relative;
  display: inline-block;
  margin: 0;
  padding-bottom: 5px;
  color: #142b47;
  font-family: ${Fonts.Fredoka}, sans-serif;
  font-size: 24px;
  line-height: 1;

  &::after {
    content: "";
    position: absolute;
    right: -3px;
    bottom: 0;
    left: -3px;
    height: 5px;
    background: rgba(247, 201, 72, 0.7);
    z-index: -1;
  }

  @media (width <= 600px) {
    font-size: 19px;
  }
`;

export const Handwrite = styled.h1`
  font-family: ${Fonts.HomemadeApple}, cursive;
  position: absolute;
  transform-origin: top right;
  font-size: 55px;
  opacity: 75%;
  z-index: 1;
  transform: rotate(-45deg);
  user-select: none;
  color: #000f55;
  top: -10px;
  left: 140px;
  @media (width <= 600px) {
    display: none;
  }
`;

export const Ornaments = styled.div`
  position: absolute;
  top: 28px;
  left: 80px;
  right: auto;
  display: grid;
  grid-auto-flow: column;
  gap: 18px;
  align-items: end;
  z-index: 1;
  pointer-events: none;

  ${Eraser},
  ${Pencil} {
    pointer-events: auto;
  }

  @media (width <= 900px) {
    left: 40px;
    top: 12px;
    gap: 10px;
  }

  @media (width <= 600px) {
    display: none;
  }
`;
