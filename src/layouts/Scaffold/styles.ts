import styled, { css, keyframes } from "styled-components";
import { Colors } from "styles/constants";

export const Paper = styled.div`
  width: 85vw;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px #888;
  &&::before {
    content: "";
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 80px;
    background-color: rgba(255, 0, 0, 0.6);
  }
`;

export const Lines = styled.div`
  height: 100%;
  min-height: 100vh;
  background-image: repeating-linear-gradient(white 0px, white 24px, teal 26px);
`;
export const StyledContainer = styled.div`
  display: flex;
  background: ${Colors.Gray20};
  height: 100%;
  min-height: 100vh;
  position: relative;
`;


const tiltAnimation = keyframes`
  0% {
    left: 0;
    transform: rotateY(180deg);
  }
  49% {
    transform: rotateY(180deg);
  }
  50% {
    left: 80%;
    transform: rotateY(0deg);
  }
  99% {
    transform: rotateY(0deg);
  }
  100% {
    left: 0;
    transform: rotateY(180deg);
  }
 
`;

export const TiltedImage = styled.img`
  position: fixed;
  margin-left: 50px;
  bottom: 0;
  z-index: 2;
  width: 100px;
  animation: ${tiltAnimation} 10s linear infinite;
`;

export const PageContainer = styled.div``;
