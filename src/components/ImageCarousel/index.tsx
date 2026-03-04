import React, { useEffect, useState } from "react";
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

const Frame = styled.div<{ $isZoomed: boolean }>`
  width: 100%;
  border-radius: 18px;
  background: #fff;
  padding: 10px;
  box-shadow: 0 14px 30px rgba(19, 32, 68, 0.16);
  overflow: hidden;

  @media (width <= 600px) {
    overflow: ${(p) => (p.$isZoomed ? "auto" : "hidden")};
    padding: 8px;
    -webkit-overflow-scrolling: touch;
  }
`;

const Image = styled.img<{ $isMobile: boolean; $isZoomed: boolean }>`
  width: ${(p) => (p.$isMobile && p.$isZoomed ? "160%" : "100%")};
  max-height: min(70vh, 560px);
  object-fit: contain;
  border-radius: 14px;
  animation: ${imageReveal} 320ms ease;
  cursor: ${(p) => (p.$isMobile ? (p.$isZoomed ? "zoom-out" : "zoom-in") : "default")};

  @media (width <= 600px) {
    max-height: none;
    min-width: ${(p) => (p.$isZoomed ? "160%" : "100%")};
  }
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

  @media (width <= 600px) {
    width: 100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 2px 2px 8px;
    -webkit-overflow-scrolling: touch;
  }
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

  @media (width <= 600px) {
    flex-shrink: 0;
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

const MobileHint = styled.p`
  margin-top: 12px;
  text-align: center;
  font-family: ${Fonts.Marker}, cursive;
  font-size: 16px;
  color: rgba(0, 15, 85, 0.82);

  @media (min-width: 601px) {
    display: none;
  }
`;

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileViewport = window.innerWidth <= 600;

      setIsMobile(mobileViewport);

      if (!mobileViewport) {
        setIsZoomed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleZoom = () => {
    if (!isMobile) {
      return;
    }

    setIsZoomed((current) => !current);
  };

  const changeImage = (direction: number) => {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setIsZoomed(false);
    setCurrentIndex(newIndex);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isZoomed) {
      return;
    }

    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || isZoomed) {
      setTouchStartX(null);
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 45) {
      changeImage(swipeDistance > 0 ? -1 : 1);
    }

    setTouchStartX(null);
  };

  return (
    <CarouselShell>
      <Viewport>
        <Frame
          $isZoomed={isZoomed}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={currentIndex}
            onClick={toggleZoom}
            $isMobile={isMobile}
            $isZoomed={isZoomed}
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
              onClick={() => {
                setIsZoomed(false);
                setCurrentIndex(index);
              }}
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
      <MobileHint>
        Toque para ampliar e arraste para trocar de tirinha.
      </MobileHint>
    </CarouselShell>
  );
};

export default ImageCarousel;
