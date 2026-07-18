import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: grid;
  width: min(1040px, calc(100% - 48px));
  gap: 48px;
  margin: 0 auto;
  padding: clamp(36px, 5vw, 64px) 0 72px;

  @media (width <= 600px) {
    width: min(100% - 32px, 540px);
    gap: 34px;
  }
`;

export const PageHeader = styled.header`
  display: grid;
  gap: 12px;
  max-width: 720px;
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

export const Intro = styled.p`
  color: #43596b;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 19px;
  line-height: 1.5;
`;

export const StorySection = styled.section<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.72fr);
  gap: clamp(28px, 6vw, 72px);
  align-items: center;

  ${(p) => p.$reverse && "grid-template-columns: minmax(220px, 0.72fr) minmax(0, 1fr);"}

  @media (width <= 700px) {
    grid-template-columns: 1fr;
    gap: 22px;

    img {
      grid-row: 1;
    }
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  gap: 16px;
  max-width: 720px;
`;

export const SectionTitle = styled.h2`
  color: #142b47;
  font-family: ${Fonts.Fredoka}, sans-serif;
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.1;
`;

export const Content = styled.p`
  color: #43596b;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 18px;
  line-height: 1.55;
`;

export const Image = styled.img`
  justify-self: center;
  align-self: center;
  width: min(100%, 300px);
  max-height: 330px;
  object-fit: contain;
  filter: drop-shadow(0 12px 10px rgba(23, 54, 76, 0.16));
  @media (width <= 600px) {
    max-width: 240px;
  }
`;

export const InstagramLink = styled.a`
  width: fit-content;
  color: #b63f35;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 16px;
  border-bottom: 2px solid #f7c948;
`;
