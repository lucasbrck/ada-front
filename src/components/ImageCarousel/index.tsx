import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Fonts } from "styles/constants";

interface ImageCarouselProps {
  images: { image: string }[];
}

const imageReveal = keyframes`
  0% {
    opacity: 0;
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
`;

const CarouselShell = styled.section`
  --carousel-ink: #000f55;
  --carousel-accent: #ff0800;
  --carousel-paper: #ffffffff;
  --carousel-sky: #c43333ff;
  --carousel-border: rgba(255, 8, 0, 0.18);

  width: min(980px, 92vw);
  margin: 16px auto 32px;
  padding: 26px 28px 22px;
  border-radius: 26px;
  border: 2px solid var(--carousel-border);
  background: var(--carousel-paper);
  box-shadow: 0 18px 36px rgba(19, 32, 68, 0.16);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    display: none;
  }

  @media (width <= 600px) {
    padding: 18px 16px;
    border-radius: 18px;
  }
`;

const Viewport = styled.div`
  position: relative;
  padding: 22px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.75);
  border: 2px dashed rgba(255, 8, 0, 0.25);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.8);
  display: grid;
  place-items: center;

  @media (width <= 600px) {
    padding: 12px;
  }
`;

const Frame = styled.div`
  width: 100%;
  border-radius: 18px;
  background: #fff;
  padding: 10px;
  box-shadow: 0 14px 30px rgba(19, 32, 68, 0.16);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  max-height: min(70vh, 560px);
  object-fit: contain;
  border-radius: 14px;
  animation: ${imageReveal} 320ms ease;
`;

const Controls = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;

  @media (width <= 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 2px solid var(--carousel-border);
  background: linear-gradient(135deg, #fff, #ffffffff);
  color: var(--carousel-ink);
  font-family: ${Fonts.Marker}, cursive;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(19, 32, 68, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 24px rgba(19, 32, 68, 0.18);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 8px 16px rgba(19, 32, 68, 0.14);
  }

  @media (width <= 600px) {
    font-size: 20px;
    padding: 8px 14px;
    width: 100%;
    justify-content: center;
  }
`;

const NavArrow = styled.span`
  font-size: 34px;
  line-height: 1;
  font-family: ${Fonts.Marker}, cursive;
`;

const Dots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const DotButton = styled.button<{ active: boolean }>`
  width: ${(p) => (p.active ? "20px" : "10px")};
  height: 10px;
  border-radius: 999px;
  border: none;
  background: ${(p) =>
    p.active ? "var(--carousel-accent)" : "rgba(0, 15, 85, 0.28)"};
  transition: transform 0.2s ease, width 0.2s ease, background 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Counter = styled.div`
  margin-top: 10px;
  text-align: center;
  font-family: ${Fonts.Rancho}, cursive;
  font-size: 20px;
  color: var(--carousel-ink);
  opacity: 0.8;
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
    transform: `scale(${isZoomed ? 1.12 : 1})`,
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
    <CarouselShell>
      <Viewport>
        <Frame>
          <Image
            key={currentIndex}
            onClick={toggleZoom}
            style={imageStyle}
            src={`${images[currentIndex].image}`}
            alt={`Tirinha ${currentIndex + 1}`}
            loading="lazy"
          />
        </Frame>
      </Viewport>
      <Controls>
        <NavButton
          type="button"
          onClick={() => changeImage(-1)}
          aria-label="Anterior"
        >
          <NavArrow>{"<"}</NavArrow>
          Anterior
        </NavButton>
        <Dots>
          {images.map((_, index) => (
            <DotButton
              key={`dot-${index}`}
              type="button"
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para tirinha ${index + 1}`}
            />
          ))}
        </Dots>
        <NavButton
          type="button"
          onClick={() => changeImage(1)}
          aria-label="Próxima"
        >
          Próxima
          <NavArrow>{">"}</NavArrow>
        </NavButton>
      </Controls>
      <Counter>
        {currentIndex + 1} / {images.length}
      </Counter>
    </CarouselShell>
  );
};

export default ImageCarousel;
