import React from "react";
import * as S from "./styles";

interface Props {
  textData: string;
  handleClick?: (e: any) => void;
  className?: string;
}
const StickerText: React.FC<Props> = ({ textData, handleClick = () => {},className = '', }) => {
  return (
    <S.Container onClick={handleClick}>
      <S.StickerText className={className} data-stroke={textData}>{textData}</S.StickerText>
    </S.Container>
  );
};
export const StickerOptions: React.FC<Props> = ({
  textData,
  handleClick = () => {},
  className = '',
}) => {
  return (
    <S.Container onClick={handleClick}>
      <S.StickerOptions className={className} data-stroke={textData}>{textData}</S.StickerOptions>
    </S.Container>
  );
};

export default StickerText;
