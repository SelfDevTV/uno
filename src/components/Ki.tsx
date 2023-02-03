import { CardOwner, ICard } from "types";
import Card from "./Card";

interface KiProps {
  hand: ICard[];
}

const Ki = ({ hand = [] }: KiProps) => {
  return (
    <div className="row-span-1 row-start-1 col-start-2 col-span-2 border p-4">
      <div className="relative w-full bg-slate-600">
        {hand.map((card: ICard, id: number) => {
          console.log("i is: ", id * 4);
          return (
            // Why are the cards no applying the left
            <div
              key={id}
              className="absolute"
              style={{
                left: id * 20,
              }}
            >
              <Card
                isHoverable={false}
                src={card.cardHiddenUrl!}
                belongsTo="ki"
                {...card}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ki;
