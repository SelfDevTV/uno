import useUnoStore from "@/store/useUnoStore";
import Image from "next/image";
import { CardOwner, ICard } from "types";

interface CardProps extends ICard {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  isHoverable?: boolean;
  belongsTo?: CardOwner;
}

const Card = ({
  src,
  width = 120,
  height = 160,
  className = "",
  isHoverable = true,
  belongsTo = "player",
  cardColor,
  cardAction,
  cardNumber,
  cardWild,
  id,
}: CardProps) => {
  const playCard = useUnoStore((state) => state.playCard);
  const drawCard = useUnoStore((state) => state.drawCard);

  const handleClickCard = () => {
    // if the card that was clicked is a player card and if the card is
    // "compatible" with the current visible discard pile card

    // get visible card on pile
    if (belongsTo === "player") {
      const success = playCard(id, belongsTo);
      console.log("suceess playing card: ", success);
    }

    if (belongsTo === "deck") {
      const sucess = drawCard("player");
      console.log("success drawing card: ", sucess);
    }
  };
  return (
    <Image
      className={`${className} ${
        isHoverable ? "hover:-translate-y-4 transition-all transform" : ""
      } z-20`}
      src={src}
      alt="Uno Card"
      width={width}
      height={height}
      onClick={handleClickCard}
    />
  );
};

export default Card;
