import { ICard } from "types";
import Card from "./Card";

interface DiscardDeckProps {
  discardedCards: ICard[];
}

const DiscardDeck = ({ discardedCards = [] }: DiscardDeckProps) => {
  console.log("discarded cards: ", discardedCards);
  if (discardedCards.length === 0) {
    return <p>Loading..</p>;
  }
  return (
    <div className="row-start-2 col-start-2 border flex items-center justify-around">
      <h1 className="text-2xl w-24 font-bold">Discarded Cards:</h1>

      <Card
        src={discardedCards[0].imageUrl!}
        belongsTo="discardPile"
        {...discardedCards[0]}
      />
    </div>
  );
};

export default DiscardDeck;
