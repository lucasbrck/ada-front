import React, { useState } from "react";
import styled from "styled-components";
import { Fonts } from "styles/constants";

interface ImageCarouselProps {
  images: { image: string }[];
}

const CarouselContainer = styled.div`
  display: grid;
  align-items: center;
  align-self: center;
  justify-content: center;
  row-gap: 20px;
  min-height: 300px;
  width: 100%;
  @media (width <= 600px) {
    row-gap: 5px;
  }
`;

const Image = styled.img`
  width: 100%;
  z-index: 2;
  grid-column: 1 / 3;
`;

const Button = styled.button`
  padding: 10px;
  font-family: ${Fonts.HomemadeApple}, cursive;
  color: #000f55;
  font-size: 40px;
  align-self: center;
  justify-self: center;
  border: none;
  cursor: pointer;
`;

const PrevButton = styled(Button)`
  left: 10px;
  grid-column: 1 / 2;
  @media (width <= 600px) {
    font-size: 20px;
  }
`;

const NextButton = styled(Button)`
  right: 10px;
  grid-column: 2 / 3;
  @media (width <= 600px) {
    font-size: 20px;
  }
`;

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    window.innerWidth <= 600 ? setIsZoomed(!isZoomed) : setIsZoomed(false);
  };

  const imageStyle = {
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    transform: `scale(${isZoomed ? 1.2 : 1}) rotate(${
      isZoomed ? "90deg" : "0deg"
    })`,
  };

  const changeImage = (direction: number) => {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
  };

  return (
    <CarouselContainer>
      <Image
        onClick={toggleZoom}
        style={imageStyle}
        src={`${images[currentIndex].image}`}
      />
      <PrevButton onClick={() => changeImage(-1)}>Anterior</PrevButton>
      <NextButton onClick={() => changeImage(1)}>Próxima</NextButton>
    </CarouselContainer>
  );
};

export default ImageCarousel;
