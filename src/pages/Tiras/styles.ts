import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Handwrite = styled.h1`
  font-family: ${Fonts.HomemadeApple}, cursive;
  font-size: 40px;
  z-index: 1;
  user-select: none;
  @media (width <= 600px) {
      font-size: 20px;
      max-width: 80%;
    }
`
