import styled from "styled-components";
import { Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: ${Fonts.Rancho}, cursive;
  width: fit-content;
  color: #000f55;
  font-size: 40px;
  &:after {
    content: "";
    width: 100%;
    display: block;
    position: relative;
    top: -18px;
    transform: skew(-12deg);
    border-bottom: solid 15px rgba(238, 111, 87, 0.5);
  }
`;

export const TextsContainer = styled.div`
width:95%;
z-index:1;
display:grid;
row-gap: 35px;
grid-template-columns: 1fr 1fr;
`
export const ContentContainer = styled.div`
  background-color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  text-align: justify;
  &:before {
    content: "";
    position: relative;
    left: -15px;
    opacity: 0.5;
    border-top: 50px solid "red";
    border-right: 100px solid "red";
    transform: rotate(-55deg);
    clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
  }
`;
export const Content = styled.text`
  font-family: ${Fonts.GilroySemiBold}, cursive;
  color: #000f55;
  font-size: 20px;
  line-height: 1;
  text-align: justify;
`;

export const Image = styled.img`
justify-self: center;
align-self: center;
max-width:300px
`