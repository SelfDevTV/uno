import { CardOwner, ICard } from "types";
import Card from "./Card";

interface IPlayerProps {
  hand: ICard[];
}

const Player = ({ hand = [] }: IPlayerProps) => {
  return (
    <div className="row-start-3 col-start-1 row-span-1 col-span-3 flex border">
      <h2>Player:</h2>
      <div className="flex flex-row h-full p-4  overflow-y-visible overflow-x-scroll">
        {hand.map((card: ICard, id: number) => (
          <Card src={card.imageUrl!} key={id} belongsTo="player" {...card} />
        ))}
      </div>
    </div>
  );
};

export default Player;
