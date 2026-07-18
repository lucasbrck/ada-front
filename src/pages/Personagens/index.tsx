import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import ModalCharacters from "components/ModalCharacter";
import { InfoChars, infoChars } from "./data/info";

const Character: React.FC<{
  character: InfoChars;
  handleModal: (character: InfoChars) => void;
}> = ({ character, handleModal }) => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        void character.loadImage().then(setImageSource);
        observer.disconnect();
      },
      { rootMargin: "180px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [character]);

  return (
    <S.ImageContainer
      ref={cardRef}
      type="button"
      onClick={() => handleModal(character)}
      fold={character.fold || 1}
      aria-label={`Conhecer ${character.name}`}
    >
      <S.Hint>{character.presentation}</S.Hint>
      {imageSource ? (
        <S.Image src={imageSource} alt={`Ilustração de ${character.name}`} decoding="async" />
      ) : (
        <S.ImagePlaceholder aria-hidden="true" />
      )}
      <S.Name>{character.name}</S.Name>
    </S.ImageContainer>
  );
};

const Personagens: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<InfoChars>(infoChars[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleModal = useCallback((character: InfoChars) => {
    setSelectedCharacter(character);
    setSelectedImage(null);
    setModalOpen(true);
    void character.loadImage().then(setSelectedImage);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <S.Container>
      <ModalCharacters
        open={modalOpen}
        handleClose={handleCloseModal}
        imgSrc={selectedImage}
        text={selectedCharacter.info}
        title={selectedCharacter.name}
      />
      <S.PageHeader>
        <S.Eyebrow>A turma da Ada</S.Eyebrow>
        <S.PageTitle>Personagens que transformam perguntas em descobertas.</S.PageTitle>
        <S.PageIntro>Escolha alguém para conhecer sua história.</S.PageIntro>
      </S.PageHeader>
      <S.CharacterGrid>
        {infoChars.map((character) => (
          <Character handleModal={handleModal} key={character.name} character={character} />
        ))}
      </S.CharacterGrid>
    </S.Container>
  );
};

export default Personagens;
