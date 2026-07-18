import styled, { keyframes } from "styled-components";
import { Colors } from "styles/constants";
import TopMenu from "components/TopMenu";
import AsideMenu from "components/AsideMenu";

export const STopMenu = styled(TopMenu)`
  display: block;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const SAsideMenu = styled(AsideMenu)`
  display: none;

  @media (min-width: 601px) {
    display: block;
  }
`;

export const Paper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 22px;
  padding-bottom: 40px;
  background-color: #fffef9;
  box-shadow: 0 0 24px rgba(31, 54, 70, 0.12);
  &&::before {
    content: "";
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: max(48px, calc((100% - 1180px) / 2 - 32px));
    background-color: rgba(222, 73, 60, 0.45);
    @media (width <= 600px) {
      left: 40px;
    }
  }
`;

export const Lines = styled.div`
  height: 100%;
  min-height: 100vh;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 31px,
    rgba(73, 159, 176, 0.16) 32px,
    transparent 33px
  );
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
    transform: scaleX(-1);
  }
  49% {
    transform: scaleX(-1);
  }
  50% {
    left: 80%;
    transform: scaleX(1);
  }
  99% {
    transform: scaleX(1);
  }
  100% {
    left: 0;
    transform: scaleX(-1);
  }
`;

const wagAnimation = keyframes`
  0% {
    transform: rotate(-4deg) translateY(0);
  }
  50% {
    transform: rotate(6deg) translateY(-6px);
  }
  100% {
    transform: rotate(-4deg) translateY(0);
  }
`;

export const TiltedImage = styled.div`
  position: fixed;
  margin-left: 50px;
  bottom: 0;
  z-index: 2;
  width: 100px;
  animation: ${tiltAnimation} 10s linear infinite;
  transition: filter 0.2s ease, transform 0.2s ease;

  &:hover {
    animation-play-state: paused;

    img {
      filter: drop-shadow(0 10px 12px rgba(0, 15, 85, 0.25));
    }
  }

  @media (width <= 600px) {
    width: 50px;
  }
`;

export const TiltedImageDog = styled.img`
  width: 100%;
  height: auto;
  animation: ${wagAnimation} 0.6s ease-in-out infinite;
  transition: filter 0.2s ease;
`;

export const PageContainer = styled.div``;
