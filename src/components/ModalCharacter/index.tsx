import React from "react";
import { Modal } from "@mui/material";
import * as S from "./styles";

interface ModalCharactersProps {
  open: boolean;
  handleClose: () => void;
  imgSrc: string | null;
  title: string;
  text: string;
}

const ModalCharacters: React.FC<ModalCharactersProps> = ({
  open,
  handleClose,
  imgSrc,
  title,
  text,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <S.ModalPaper elevation={0}>
        <S.Grid>
          <S.CloseButton
            type="button"
            aria-label="Fechar modal"
            onClick={handleClose}
          >
            Fechar
          </S.CloseButton>
          {imgSrc ? (
            <S.Img src={imgSrc} alt={`Ilustração de ${title}`} decoding="async" />
          ) : (
            <S.ImageLoading>Carregando personagem...</S.ImageLoading>
          )}

          <S.Title>{title}</S.Title>

          <S.Text>{text}</S.Text>
        </S.Grid>
      </S.ModalPaper>
    </Modal>
  );
};

export default ModalCharacters;
