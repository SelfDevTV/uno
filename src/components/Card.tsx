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
  const discardPile = useUnoStore((state) => state.discardedCards);
  const playCard = useUnoStore((state) => state.playCard);

  const handlePlayCard = () => {
    // if the card that was clicked is a player card and if the card is
    // "compatible" with the current visible discard pile card

    // get visible card on pile
    const topCard = discardPile.at(0);

    if (belongsTo == "player") {
      if (
        topCard?.cardColor == cardColor ||
        topCard?.cardNumber == cardNumber
      ) {
        playCard(id, "player");
        console.log("card compatible");
      } else {
        console.log("card not compatible");
      }
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
      onClick={handlePlayCard}
    />
  );
};

export default Card;
