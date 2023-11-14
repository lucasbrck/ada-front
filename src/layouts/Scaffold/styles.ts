import styled, { css } from "styled-components";
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

export const PageContainer = styled.div``;
