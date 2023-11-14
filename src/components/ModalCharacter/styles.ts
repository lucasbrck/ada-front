import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Title = styled.h1`
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 35px;
  font-weight: bolder;
  padding-bottom: 8px;
  grid-area: 1 / 2 / 2 / 3;
  color: #000f55;
`;

export const Text = styled.p`
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 20px;
  font-weight: bolder;
  max-width: 300px;
  padding-bottom: 8px;
  color: #000f55;
  grid-area: 2 / 2 / 3 / 3;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const Img = styled.img`
  grid-area: 1 / 1 / 3 / 2;
  width:  250px;
`
