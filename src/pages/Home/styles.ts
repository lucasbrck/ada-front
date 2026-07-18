import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  position: relative;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(36px, 5vw, 72px) 0 56px;
  overflow: hidden;

  @media (width <= 600px) {
    width: min(100% - 32px, 540px);
    padding-top: 28px;
  }
`;

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(310px, 0.9fr);
  align-items: center;
  gap: clamp(32px, 7vw, 96px);
  min-height: 510px;

  @media (width <= 820px) {
    grid-template-columns: 1fr;
    gap: 12px;
    min-height: 0;
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

export const Hint = styled.div`
  position: absolute;
  z-index: 2;
  top: 8%;
  left: -6%;
  padding: 13px 16px;
  background-color: ${Colors.White};
  border-radius: 6px;
  border: solid 2px #e64b3d;
  box-shadow: 4px 4px 0 #f7c948;
  font-family: ${Fonts.Marker};
  font-size: 16px;
  line-height: 1.35;
  text-align: left;
  user-select: none;
  color: #000f55;
  max-width: 220px;

  @media (width <= 820px) {
    top: 2%;
    left: 5%;
  }
`;

export const Image = styled.img`
  width: min(100%, 350px);
  height: auto;
  z-index: 1;
  filter: drop-shadow(0 20px 16px rgba(0, 15, 85, 0.18));
  animation: ${floatAda} 4.5s ease-in-out infinite;
`;
export const ImgContainer = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
  min-height: 440px;

  &::before {
    content: "";
    position: absolute;
    width: 290px;
    height: 290px;
    border-radius: 50%;
    background: #dff3f6;
    border: 2px solid rgba(0, 100, 120, 0.18);
    z-index: 0;
  }

  @media (width <= 820px) {
    grid-row: 1;
    min-height: 350px;
  }
`;

export const Doodle = styled.span`
  position: absolute;
  right: 4%;
  bottom: 15%;
  color: #e64b3d;
  font-family: ${Fonts.Marker};
  font-size: 54px;
  line-height: 1;
  transform: rotate(12deg);
`;

export const Presentation = styled.h1`
  font-family: ${Fonts.Fredoka}, sans-serif;
  color: #000f55;
  font-size: clamp(40px, 4.5vw, 66px);
  margin: 0;
  line-height: 1.04;
  letter-spacing: 0;
  @media (width <= 600px) {
    font-size: 42px;
  }
`;

export const Highlight = styled.span`
  position: relative;
  color: #df493c;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    left: -6px;
    right: -6px;
    bottom: 2px;
    height: 10px;
    background: rgba(247, 201, 72, 0.65);
    z-index: -1;
    transform: skew(-8deg);
    border-radius: 2px;
  }
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  color: #33415c;
  font-size: 20px;
  line-height: 1.5;
  max-width: 540px;
`;

export const InfoWrapper = styled.div`
  display: grid;
  gap: 20px;
  position: relative;
  z-index: 1;

  @media (width <= 820px) {
    text-align: center;
    justify-items: center;
  }
`;

export const Tag = styled.span`
  justify-self: start;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 13px;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #9f3028;
  background: #fde4dd;
  border: 1px solid #edb2a9;
  border-radius: 4px;
  padding: 7px 10px;
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

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  @media (width <= 820px) {
    justify-content: center;
  }
`;

const actionStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 18px;
  border-radius: 5px;
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 16px;
  transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid #1ab1f3;
    outline-offset: 3px;
  }
`;

export const PrimaryAction = styled(Link)`
  ${actionStyles}
  gap: 12px;
  color: #fff;
  background: #df493c;
  box-shadow: 0 4px 0 #aa3027;

  &:hover {
    background: #c93b31;
    box-shadow: 0 6px 0 #aa3027;
  }
`;

export const SecondaryAction = styled(Link)`
  ${actionStyles}
  color: #19304d;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid #9ab7c2;

  &:hover {
    background: #fff;
  }
`;

export const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    color: #3d5969;
    font-family: ${Fonts.GilroySemiBold}, sans-serif;
    font-size: 14px;
  }

  span:not(:last-child)::after {
    content: "•";
    margin-left: 8px;
    color: #d96d55;
  }
`;

export const FeaturedSection = styled.section`
  display: grid;
  grid-template-columns: minmax(220px, 0.48fr) minmax(0, 0.8fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;
  margin-top: 12px;
  padding-top: 38px;
  border-top: 1px solid rgba(61, 89, 105, 0.26);

  @media (width <= 720px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const FeaturedHeading = styled.div`
  display: grid;
  gap: 10px;
`;

export const SectionLabel = styled.span`
  font-family: ${Fonts.GilroyBold}, sans-serif;
  color: #b63f35;
  font-size: 13px;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  color: #142b47;
  font-family: ${Fonts.Fredoka}, sans-serif;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.1;
`;

export const ComicLink = styled(Link)`
  display: grid;
  overflow: hidden;
  color: #19304d;
  background: #fff;
  border: 1px solid #b6ccd2;
  border-radius: 6px;
  box-shadow: 6px 6px 0 #d8edf0;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 9px 9px 0 #d8edf0;
  }

  &:focus-visible {
    outline: 3px solid #1ab1f3;
    outline-offset: 3px;
  }
`;

export const ComicImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 1;
  object-fit: cover;
  object-position: center;
`;

export const ComicCaption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 16px;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 15px;

  strong {
    color: #b63f35;
    font-family: ${Fonts.GilroyBold}, sans-serif;
    white-space: nowrap;
  }
`;
