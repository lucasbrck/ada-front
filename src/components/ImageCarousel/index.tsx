import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Fonts } from "styles/constants";

interface ImageCarouselProps {
  images: { load: () => Promise<string> }[];
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
  --carousel-ink: #142b47;
  --carousel-accent: #df493c;
  --carousel-paper: #fffef9;
  --carousel-border: #b6ccd2;

  width: min(980px, 100%);
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid var(--carousel-border);
  background: var(--carousel-paper);
  box-shadow: 6px 6px 0 #d8edf0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    display: none;
  }

  @media (width <= 600px) {
    padding: 12px;
  }
`;

const Viewport = styled.div`
  position: relative;
  padding: 12px;
  background: #eaf5f6;
  border: 1px dashed #8eb8c0;
  display: grid;
  place-items: center;

  @media (width <= 600px) {
    padding: 8px;
  }
`;

const Frame = styled.div<{ $isZoomed: boolean }>`
  width: 100%;
  border-radius: 3px;
  background: #fff;
  padding: 6px;
  border: 1px solid #d5e3e5;
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
  border-radius: 1px;
  animation: ${imageReveal} 320ms ease;
  cursor: ${(p) => (p.$isMobile ? (p.$isZoomed ? "zoom-out" : "zoom-in") : "default")};

  @media (width <= 600px) {
    max-height: none;
    min-width: ${(p) => (p.$isZoomed ? "160%" : "100%")};
  }
`;

const ImageLoading = styled.div`
  display: grid;
  width: 100%;
  aspect-ratio: 3 / 1;
  place-items: center;
  color: rgba(0, 15, 85, 0.68);
  font-family: ${Fonts.GilroySemiBold}, sans-serif;
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
  border-radius: 5px;
  border: 1px solid var(--carousel-border);
  background: #fff;
  color: var(--carousel-ink);
  font-family: ${Fonts.GilroyBold}, sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease;

  &:hover {
    transform: translateY(-2px);
    background: #fde4dd;
  }

  &:active {
    transform: translateY(0);
  }

  @media (width <= 600px) {
    font-size: 16px;
    padding: 8px 14px;
    width: 100%;
    justify-content: center;
  }
`;

const NavArrow = styled.span`
  font-size: 22px;
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
  font-family: ${Fonts.GilroySemiBold}, sans-serif;
  font-size: 14px;
  color: var(--carousel-ink);
  opacity: 0.8;
`;

const MobileHint = styled.p`
  margin-top: 12px;
  text-align: center;
  font-family: ${Fonts.GilroyMedium}, sans-serif;
  font-size: 14px;
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
  const [imageSource, setImageSource] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    setImageSource(null);

    images[currentIndex].load().then((source) => {
      if (!cancelled) {
        setImageSource(source);
      }
    });

    const nextIndex = (currentIndex + 1) % images.length;
    void images[nextIndex].load();

    return () => {
      cancelled = true;
    };
  }, [currentIndex, images]);

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
          {imageSource ? (
            <Image
              key={currentIndex}
              onClick={toggleZoom}
              $isMobile={isMobile}
              $isZoomed={isZoomed}
              src={imageSource}
              alt={`Tirinha ${currentIndex + 1}`}
              decoding="async"
            />
          ) : (
            <ImageLoading aria-live="polite">Carregando tirinha...</ImageLoading>
          )}
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
