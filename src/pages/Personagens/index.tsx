import React, { useCallback, useMemo, useState } from "react";
import * as I from "assets/images/personagens";
import * as S from "./styles";
import ModalCharacters from "components/ModalCharacter";
import { InfoChars, infoChars } from "./data/info";

const Character: React.FC<{
  character: InfoChars;
  handleModal: (character: InfoChars) => void;
}> = ({ character, handleModal }) => {
  return (
    <S.ImageContainer
      onClick={() => handleModal(character)}
      fold={character.fold || 1}
      foldAngle={character.foldAngle || 45}
      tape={character.tape || 1}
      tapeColor={character.tapeColor}
    >
      <S.Hint>{character.presentation}</S.Hint>
      <S.Image src={character.img} />
      <h1>{character.name}</h1>
    </S.ImageContainer>
  );
};

const Personagens: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<InfoChars>({
    name: "Ada",
    img: I.imgAda,
    presentation: "Olá novamente! Clique em mim para me conhecer melhor!",
    info: "Exemplo",
  });

  const handleModal = useCallback(
    (character: InfoChars) => {
      setModalOpen((prev) => !prev);
      setSelectedCharacter(character);
    },
    []
  );

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const characters = useMemo(() => {
    const charactersArray = infoChars.map((character) => (
      <Character handleModal={handleModal} key={character.name} character={character} />
    ));

    const kauaneIndex = charactersArray.findIndex(
      (character) => character.props.character.name === "Margarete"
    );

    const newArray = [...charactersArray];
    newArray.splice(
      kauaneIndex,
      0,
      <>
        {/* <S.Ornaments key="ornaments">
          <S.Eraser src={Eraser} />
          <S.Pencil src={Pencil} />
        </S.Ornaments> */}
      </>
    );

    return newArray;
  }, [handleModal]);

  return (
    <S.Container>
      <ModalCharacters
        open={modalOpen}
        handleClose={handleCloseModal}
        imgSrc={selectedCharacter ? selectedCharacter.img : ''}
        text={selectedCharacter ? selectedCharacter.info : ''}
        title={selectedCharacter ? selectedCharacter.name : ''}
      />
      {characters}
    </S.Container>
  );
};

export default Personagens;
