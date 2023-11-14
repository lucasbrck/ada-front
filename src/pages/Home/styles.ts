import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
`;

export const Hint = styled.div`
  z-index: 2;
  position: absolute;
  display: none;
  padding: 10px 15px;
  background-color: white;
  border-radius: 55px 55px 55px 0px;
  border: solid 2px black;
  left: 200px;
  top: 40%;
  font-family: ${Fonts.Marker};
  font-size: 20px;
  text-align: center;
  user-select: none;
  color: black;
  animation: HintAnim 200ms ease;
`;

export const Image = styled.img`
  width: 250px;
  height: auto;
  z-index: 1;
`;
export const ImgContainer = styled.div`
  z-index: 1;
  &:hover {
    ${Image} {
      transform: scale(0.98);
    }
    ${Hint} {
      display: block;
      @keyframes HintAnim {
        from {
          transform: scale(0.5) translateY(70%);
        }
        to {
          transform: scale(1) translateY(0%);
        }
      }
    }
  }
`;

export const Presentation = styled.h1`
  font-family: ${Fonts.HomemadeApple}, cursive;
  width: fit-content;
  height: fit-content;
  user-select: none;
  /* background: #dfff00; */
  color: #000f55;
  overflow: hidden;
  padding: 30px;
  /* box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 0 0 0 30px/45px; */
  font-size: 50px;
`;

export const Info = styled.h1`
  font-family: ${Fonts.Marker}, cursive;
  color: #000f55;
  font-size: 25px;
`;

export const InfoWrapper = styled.div`
  display: grid;
`;
