import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(36px, 5vw, 64px) 0 72px;

  @media (width <= 600px) {
    width: min(100% - 32px, 540px);
  }
`;

export const PageHeader = styled.header`
  display: grid;
  gap: 12px;
  max-width: 720px;
  margin: 0 auto 26px;
  text-align: center;
`;

export const Eyebrow = styled.span`
  color: #b63f35;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 13px;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  color: #142b47;
  font-family: ${Fonts.Fredoka}, sans-serif;
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.08;
`;

export const Intro = styled.p`
  color: #43596b;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 19px;
`;
