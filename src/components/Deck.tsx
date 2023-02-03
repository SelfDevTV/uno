import { CardOwner } from "types";
import Card from "./Card";

const Deck = () => {
  return (
    <div className="row-start-2 col-start-1 border flex items-center justify-around space-x-4">
      <h2 className="text-4xl font-bold">Deck:</h2>
      <div className="relative w-full h-full ">
        <Card
          src="/assets/cards/large/card_back_large.png"
          width={120}
          height={160}
          isHoverable={false}
          className="absolute right-10"
          belongsTo="deck"
          id={"1"}
        />
        <Card
          src="/assets/cards/large/card_back_large.png"
          width={120}
          height={160}
          isHoverable={false}
          className="absolute  right-12"
          belongsTo="deck"
          id={"2"}
        />
        <Card
          src="/assets/cards/large/card_back_large.png"
          width={120}
          height={160}
          className="absolute right-14"
          belongsTo="deck"
          id={"3"}
        />
      </div>
    </div>
  );
};

export default Deck;
