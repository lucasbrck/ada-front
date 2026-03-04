import styled, { keyframes } from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(18px, 3vw, 32px);
  padding: 70px 40px 80px 90px;
  margin: 0 auto;
  max-width: 1200px;
  align-items: start;

  @media (width <= 900px) {
    padding: 60px 24px 60px 70px;
  }

  @media (width <= 600px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    padding: 50px 18px 50px 40px;
  }
`;

export const Image = styled.img`
  justify-self: center;
  align-self: center;
  width: min(240px, 80%);
  height: auto;
  z-index: 1;
  filter:
    drop-shadow(2px 0 0 #f0ffff)
    drop-shadow(-2px 0 0 #f0ffff)
    drop-shadow(0 2px 0 #f0ffff)
    drop-shadow(0 -2px 0 #f0ffff)
    drop-shadow(0 0 10px rgba(120, 120, 120, 0.28))
    drop-shadow(0 0 14px rgba(120, 120, 120, 0.22));
  transition: transform 0.2s ease, filter 0.2s ease;
  @media (width <= 600px) {
    width: 150px;
    height: auto;
  }
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
interface TapeProps {
  tape: 1 | 2 | 3;
  tapeColor?: string;
  fold: 1 | 2 | 3 | 4;
  foldAngle: number;
}
export const Hint = styled.div`
  z-index: 2;
  position: absolute;
  padding: 15px 15px;
  background-color: ${Colors.White};
  border-radius: 55px 55px 55px 0px;
  border: solid 3px #ff0800;
  box-shadow: 0 0 0 6px #f0ffff, 0 12px 18px rgba(0, 15, 85, 0.18);
  left: 80%;
  font-family: ${Fonts.Marker};
  font-size: 15px;
  text-align: center;
  min-width: 150px;
  user-select: none;
  color: #000f55;
  opacity: 0;
  transform: translateY(10px) scale(0.96);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  @media (width <= 600px) {
    padding: 5px 5px;
    font-size: 10px;
    text-align: center;
    min-width: 80px;
  }
`;
export const ImageContainer = styled.div<TapeProps>`
  position: relative;
  padding: 6px 0 12px;
  display: grid;
  justify-items: center;
  row-gap: 6px;
  cursor: pointer;
  transform: rotate(${(p) => handleTilt(p.fold)});
  transition: transform 0.2s ease;
  @media (width <= 600px) {
    width: 120px;
    height: auto;
  }
  &::before {
    content: "";
    display: none;
  }
  h1 {
    font-family: ${Fonts.HomemadeApple}, cursive;
    font-size: 35px;
    font-weight: bolder;
    padding-bottom: 8px;
    color: #000f55;
    margin: 0;
    text-align: center;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      left: -6px;
      right: -6px;
      bottom: 6px;
      height: 10px;
      background: rgba(255, 8, 0, 0.2);
      z-index: -1;
      transform: skew(-8deg);
      border-radius: 999px;
    }
    @media (width <= 600px) {
      font-size: 15px;
    }
  }
  &:hover {
    transform: rotate(0deg) translateY(-8px);

    ${Image} {
      transform: scale(1.02);
      filter:
        drop-shadow(2px 0 0 #f0ffff)
        drop-shadow(-2px 0 0 #f0ffff)
        drop-shadow(0 2px 0 #f0ffff)
        drop-shadow(0 -2px 0 #f0ffff)
        drop-shadow(0 0 14px rgba(120, 120, 120, 0.3))
        drop-shadow(0 0 18px rgba(120, 120, 120, 0.26));
    }

    ${Hint} {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
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
