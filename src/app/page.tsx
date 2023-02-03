"use client";
import Deck from "@/components/Deck";
import DiscardDeck from "@/components/DiscardDeck";
import GameTable from "@/components/GameTable";
import Ki from "@/components/Ki";
import Player from "@/components/Player";
import Ui from "@/components/Ui";
import useUnoStore from "@/store/useUnoStore";
import { useEffect } from "react";

export default function Home() {
  const unoGame = useUnoStore((state) => state);
  const initGame = useUnoStore((state) => state.init);
  const startGame = useUnoStore((state) => state.start);

  useEffect(() => {
    initGame();
    startGame();
  }, [initGame, startGame]);

  /* TODO:
    * keep track of enemy hand
    * keep track of player hand
    * kepp track of deck and cards and playing pile

  */

  /* TODO:

    * Game starts: player sees a staple of cards and his own hands with 7 cards, 
    he also sees enemy player hand with 7 cards but turned over
    * Decide who can start the round, create the "pile"
    * the player that can start will play, if it's the KI the ki will play first card and player waits
    * if the player can play the card he will see and indicator that shows this
    * player can only play cards that are visually displayed in his hand
    * player needs to drag the card to the pile, if he can't he has to click the drawing pile
    * switch players turns until the game is over

    */
  return (
    <GameTable>
      <Ki hand={unoGame.ki.hand} />
      <Player hand={unoGame.player.hand} />
      <Deck />
      <DiscardDeck discardedCards={unoGame.discardedCards} />
      <Ui currentTurn={unoGame.currentTurn} />
    </GameTable>
  );
}
