import React, { useMemo, useState } from "react";
import * as I from "assets/images/personagens";
import Pencil from "assets/images/lapisAda.png";
import Eraser from "assets/images/eraserCaramelo.png";
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

  const handleModal = (character: InfoChars) => {
    setModalOpen(!modalOpen);
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const characters = useMemo(() => {
    const charactersArray = infoChars.map((character) => (
      <Character handleModal={handleModal} key={character.name} character={character} />
    ));

    const kauaneIndex = charactersArray.findIndex(
      (character) => character.props.character.name === "Kauane"
    );

    const newArray = [...charactersArray];
    newArray.splice(
      kauaneIndex,
      0,
      <>
        <div>
          <S.Handwrite>Personagens</S.Handwrite>
        </div>
        <div>
          <S.Eraser src={Eraser} />
          <S.Pencil src={Pencil} />
        </div>
      </>
    );

    return newArray;
  }, [infoChars,handleModal]);

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
