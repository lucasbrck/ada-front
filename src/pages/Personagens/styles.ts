import styled, { keyframes } from 'styled-components';
import { Fonts } from 'styles/constants';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 15px;
  row-gap: 45px;
  margin-left: 90px;
`;

export const Image = styled.img`
  justify-self: center;
  align-self: center;
  width: 250px;
  height: auto;
  z-index: 1;
`;

const moveLeftRight = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15px);
  }
`;

export const Eraser = styled.img`
  align-self: center;
  margin-top: 50px;
  width: 200px;
  height: auto;
  z-index: 2;
  &&:hover{
    animation: ${moveLeftRight} 0.5s infinite;
  }
`;

export const Pencil = styled.img`
  position: absolute;
  left: 45%;
  justify-self: center;
  align-self: center;
  height: 350px;
  z-index: 3;
  transform: rotate(-9deg);
  &&:hover{
    transform: rotate(-11deg);
    animation: ease;
  }
`;

const handleFold = (position:number, angle: number = 45) => {
  switch(position){
    case 1: 
      return `${angle}px 0 0 0` 
    case 2:
      return `0 ${angle}px 0 0`
    case 3:
      return `0 0 0 ${angle}px`
    case 4:
      return `0 0 ${angle}px 0`

  }
}
const handleTape = (tape: number) =>{
  switch(tape){
    case 1:
      return "-15px"
    case 2:
      return "30%"
    case 3:
      return "70%"
  }
}
interface TapeProps{
  tape: 1 | 2 | 3 
  tapeColor?: string,
  fold:  1 | 2 | 3 | 4
  foldAngle: number
}
export const Hint = styled.div`
  z-index: 2;
  position: absolute;
  display: none;
  padding: 15px 15px;
  background-color: white;
  border-radius: 55px 55px 55px 0px;
  border: solid 1px black;
  left: 80%;
  font-family: ${Fonts.Marker};
  font-size: 15px;
  text-align: center;
  min-width: 150px;
  user-select: none;
  color: black;
  animation: HintAnim 200ms ease;
`;
export const ImageContainer = styled.div<TapeProps>`
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: whitesmoke;
  border-radius: ${(p:TapeProps) => handleFold(p.fold, p.foldAngle)};
  position: relative; // Add this line
  padding-bottom: 5px;

  &::before {
    content: '';
    position: absolute;
    left: ${p => handleTape(p.tape)};
    opacity: 0.5;
    border-top: 50px solid ${p=>p.tapeColor || "red"};
    border-right: 100px solid ${p=>p.tapeColor || "red"};
    transform: ${p => p.tape === 3 ? `rotate(55deg)` : `rotate(-55deg)`};
    clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
  }
  h1 {
    font-family: ${Fonts.HomemadeApple}, cursive;
    font-size: 35px;
    font-weight: bolder;
    padding-bottom:8px;
    color: #000f55
  }
  &:hover {
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

export const Handwrite = styled.h1`
  font-family: ${Fonts.HomemadeApple}, cursive;
  position: absolute;
  transform-origin: top right;
  font-size: 55px;
  opacity: 75%;
  z-index: 1;
  transform: rotate(-45deg);
  user-select: none;
`
