import styled, { keyframes } from "styled-components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(280px, 1.1fr);
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
  padding: clamp(24px, 6vw, 80px) clamp(16px, 7vw, 96px) 24px;
  overflow: hidden;

  @media (width <= 900px) {
    grid-template-columns: 1fr;
    padding: 24px 20px 36px;
    text-align: center;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 8, 0, 0.12), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    top: -80px;
    right: -40px;
  }

  &::after {
    bottom: -90px;
    left: -60px;
    background: radial-gradient(circle, rgba(26, 177, 243, 0.12), transparent 70%);
  }
`;

const floatAda = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const bubblePop = keyframes`
  0% {
    opacity: 0;
    transform: translate(20%, -10%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(20%, -10%) scale(1);
  }
`;

export const Hint = styled.div`
  z-index: 2;
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: end;
  padding: 12px 18px;
  background-color: ${Colors.White};
  border-radius: 48px 48px 48px 8px;
  border: solid 3px #ff0800;
  box-shadow: 0 0 0 6px #f0ffff, 0 12px 22px rgba(0, 15, 85, 0.18);
  font-family: ${Fonts.Marker};
  font-size: 20px;
  text-align: center;
  user-select: none;
  color: #000f55;
  transform: translate(20%, -10%);
  max-width: 240px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;

  @media (width <= 900px) {
    position: relative;
    transform: none;
    margin-bottom: 12px;
    justify-self: center;
  }
`;

export const Image = styled.img`
  width: clamp(220px, 32vw, 320px);
  height: auto;
  z-index: 1;
  filter: drop-shadow(0 18px 18px rgba(0, 15, 85, 0.18));
  animation: ${floatAda} 4.5s ease-in-out infinite;
`;
export const ImgContainer = styled.div`
  z-index: 1;
  position: relative;
  display: grid;
  place-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 40% 60% 55% 45%;
    background: radial-gradient(circle, rgba(255, 8, 0, 0.12), transparent 70%);
    z-index: 0;
    transform: translate(-30%, 10%);
  }

  &:hover {
    ${Hint} {
      opacity: 1;
      transform: translate(20%, -18%);
      animation: ${bubblePop} 240ms ease;
    }
  }
`;

export const Presentation = styled.h1`
  font-family: ${Fonts.HomemadeApple}, cursive;
  user-select: none;
  color: #000f55;
  overflow: hidden;
  font-size: clamp(32px, 4vw, 58px);
  margin: 0;
  line-height: 1.4;
  @media (width <= 600px) {
    font-size: 30px;
  }
`;

export const Highlight = styled.span`
  position: relative;
  color: #ff0800;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    left: -6px;
    right: -6px;
    bottom: 6px;
    height: 12px;
    background: rgba(255, 8, 0, 0.25);
    z-index: -1;
    transform: skew(-8deg);
    border-radius: 999px;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: ${Fonts.Marker}, cursive;
  color: #000f55;
  font-size: clamp(18px, 2.2vw, 26px);
  line-height: 1.4;
  max-width: 480px;
`;

export const InfoWrapper = styled.div`
  display: grid;
  gap: 14px;
  padding: clamp(20px, 3vw, 32px);
  border-radius: 24px;
  background: #fff6e3;
  border: 3px solid #ff0800;
  box-shadow: 0 0 0 6px #f0ffff, 0 20px 32px rgba(0, 15, 85, 0.16);
  position: relative;
  z-index: 1;
  max-width: 560px;

  @media (width <= 900px) {
    justify-items: center;
  }
`;

export const Tag = styled.span`
  justify-self: start;
  font-family: ${Fonts.Marker}, cursive;
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #000f55;
  background: #f0ffff;
  border: 2px solid #ff0800;
  border-radius: 999px;
  padding: 6px 14px;
  width: fit-content;

  @media (width <= 900px) {
    justify-self: center;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (width <= 900px) {
    justify-content: center;
  }
`;

export const Badge = styled.span`
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 22px;
  color: #000f55;
  padding: 6px 14px;
  border-radius: 999px;
  border: 2px dashed rgba(255, 8, 0, 0.7);
  background: ${Colors.White};
  box-shadow: 0 8px 16px rgba(0, 15, 85, 0.12);
`;
