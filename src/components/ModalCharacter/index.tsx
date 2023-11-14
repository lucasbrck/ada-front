import React from "react";
import { Modal, Paper } from "@material-ui/core";
import * as S from "./styles";

interface ModalCharactersProps {
  open: boolean;
  handleClose: () => void;
  imgSrc: string;
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
      <Paper style={{ padding: "2em" }}>
        <S.Grid>
          <S.Img src={imgSrc} alt="Modal" style={{ width: "250px" }} />

          <S.Title>{title}</S.Title>

          <S.Text>{text}</S.Text>
        </S.Grid>
      </Paper>
    </Modal>
  );
};

export default ModalCharacters;
