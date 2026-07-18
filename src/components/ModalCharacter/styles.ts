import styled from "styled-components";
import { Paper } from "@mui/material";
import { Fonts } from "styles/constants";

export const ModalPaper = styled(Paper)`
  background: #fffdf6;
  border-radius: 26px;
  border: 3px solid #ff0800;
  box-shadow:
    0 0 0 6px #f0ffff,
    0 24px 36px rgba(0, 15, 85, 0.2);
  max-width: min(760px, 92vw);
  width: 100%;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 35px;
  font-weight: bolder;
  padding-bottom: 8px;
  grid-area: 1 / 2 / 2 / 3;
  color: #000f55;
  margin: 0;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: -6px;
    right: -6px;
    bottom: 4px;
    height: 10px;
    background: rgba(255, 8, 0, 0.2);
    border-radius: 999px;
    transform: skew(-8deg);
    z-index: -1;
  }

  @media (width <= 700px) {
    grid-area: auto;
    text-align: center;
  }
`;

export const Text = styled.p`
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 20px;
  font-weight: bolder;
  max-width: 360px;
  padding-bottom: 8px;
  color: #000f55;
  grid-area: 2 / 2 / 3 / 3;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;

  @media (width <= 700px) {
    grid-area: auto;
    text-align: center;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(240px, 1.1fr);
  grid-template-rows: auto;
  gap: 14px 24px;
  padding: clamp(18px, 3vw, 36px);
  align-items: center;
  position: relative;

  @media (width <= 700px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  border: 2px solid #ff0800;
  background: #fffdf6;
  color: #000f55;
  font-family: ${Fonts.Marker}, cursive;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 0 4px #f0ffff, 0 10px 16px rgba(0, 15, 85, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 0 4px #f0ffff, 0 14px 20px rgba(0, 15, 85, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0 0 4px #f0ffff, 0 8px 14px rgba(0, 15, 85, 0.18);
  }
`;

export const Img = styled.img`
  grid-area: 1 / 1 / 3 / 2;
  width: min(280px, 70vw);
  filter:
    drop-shadow(2px 0 0 #f0ffff)
    drop-shadow(-2px 0 0 #f0ffff)
    drop-shadow(0 2px 0 #f0ffff)
    drop-shadow(0 -2px 0 #f0ffff)
    drop-shadow(0 10px 16px rgba(120, 120, 120, 0.28));

  @media (width <= 700px) {
    grid-area: auto;
  }
`;

export const ImageLoading = styled.div`
  display: grid;
  grid-area: 1 / 1 / 3 / 2;
  width: min(280px, 70vw);
  aspect-ratio: 0.72;
  place-items: center;
  color: #43596b;
  font-family: ${Fonts.GilroySemiBold}, sans-serif;
  background: #e7f3f4;

  @media (width <= 700px) {
    grid-area: auto;
  }
`;
