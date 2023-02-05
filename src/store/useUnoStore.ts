import uuid from "react-uuid";
import { CardOwner, ICard, IPlayer, Mapping } from "types";
import { create } from "zustand";

interface UnoState {
  deck: ICard[];
  discardedCards: ICard[];
  player: IPlayer;
  ki: IPlayer;
  currentTurn: string;
  dealCardsTo: (name: string, quant: number) => void;
  start: () => void;
  init: () => void;
  playCard: (cardId: string, source: CardOwner) => boolean;
  drawCard: (source: CardOwner) => boolean;
}

const generateUnoCards = (): ICard[] => {
  const baseImgPath = "/assets/cards/large/";
  let cards = [];

  // color and number cards
  const colorDict: Mapping = {
    0: "green",
    1: "blue",
    2: "red",
    3: "yellow",
  };

  const actionsDict: Mapping = {
    0: "picker",
    1: "reverse",
    2: "skip",
  };

  const wildDict: Mapping = {
    0: "wild-color-changer",
    1: "wild-pick-four",
  };
  // colors
  for (let i = 0; i < 4; i++) {
    // numbers
    for (let j = 0; j < 10; j++) {
      if (j === 0) {
        // 0 card only add once
        const card: ICard = {
          id: uuid(),
          cardColor: colorDict[i],
          cardNumber: j,
          imageUrl: `${baseImgPath}${colorDict[i]}_${j}_large.png`,
        };
        cards.push(card);
      } else {
        // 1 - 9 card, add twice
        const card: ICard = {
          id: uuid(),
          cardColor: colorDict[i],
          cardNumber: j,
          imageUrl: `${baseImgPath}${colorDict[i]}_${j}_large.png`,
        };
        cards.push(card);
        cards.push(card);
      }
    }
    // action cards, draw-2, reverse, skip
    for (let k = 0; k < 3; k++) {
      const card: ICard = {
        id: uuid(),
        cardColor: colorDict[i],
        cardAction: actionsDict[k],
        imageUrl: `${baseImgPath}${colorDict[i]}_${actionsDict[k]}_large.png`,
      };
      cards.push(card);
      cards.push(card);
    }
  }

  // wild cards, wild, wild-draw-4,
  for (let l = 0; l < 2; l++) {
    const card: ICard = {
      id: uuid(),
      cardWild: wildDict[l],
      imageUrl: `${baseImgPath}${wildDict[l]}_large.png`,
    };
    cards.push(card);
    cards.push(card);
    cards.push(card);
    cards.push(card);
  }

  cards = cards.map((card: ICard) => ({
    ...card,
    cardHiddenUrl: baseImgPath + "card_back_large.png",
  }));

  return cards;
};

const shuffleArray = (array: ICard[]): ICard[] => {
  const arrCopy = array;
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrCopy[i];
    arrCopy[i] = arrCopy[j];
    arrCopy[j] = temp;
  }
  return arrCopy;
};

const isAllowedToDraw = (lastCardFromDiscardPile: ICard, source: IPlayer) => {
  console.log("last card from disc pile: ", lastCardFromDiscardPile);
  console.log("players current hand: ", source.hand);
  let allowedToDraw = true;
  source.hand.forEach((card: ICard) => {
    if (
      card.cardWild ||
      card.cardColor === lastCardFromDiscardPile.cardColor ||
      card.cardNumber === lastCardFromDiscardPile.cardNumber
    ) {
      allowedToDraw = false;
    }
  });

  return allowedToDraw;
};

const useUnoStore = create<UnoState>((set, get) => ({
  deck: [],
  discardedCards: [],
  currentTurn: "player",
  ki: {
    hand: [],
    name: "ki",
  },
  player: {
    hand: [],
    name: "player",
  },
  dealCardsTo: (name: string, quant: number) =>
    set((state) => {
      console.log("deal cards to ", name);
      let copyOfDeck = state.deck;
      const cards = copyOfDeck.splice(0, quant);
      if (name == "player") {
        return {
          deck: copyOfDeck,
          player: {
            ...state.player,
            hand: [...state.player.hand, ...cards],
          },
        };
      } else {
        return {
          ...state,
          deck: copyOfDeck,
          ki: {
            ...state.ki,
            hand: [...state.ki.hand, ...cards],
          },
        };
      }
    }),
  init: () => {
    console.log("init");
    set((state) => ({
      deck: shuffleArray(generateUnoCards()),
    }));
  },
  start: () => {
    console.log("start");
    set((state) => ({
      discardedCards: [state.deck.at(-1)!],
      deck: [...state.deck.slice(0, -1)],
    }));

    get().dealCardsTo("player", 7);
    get().dealCardsTo("ki", 7);
  },
  playCard: (cardId: string, source: CardOwner) => {
    // filter out the card from
    if (source === "player") {
      // find the card in hand
      const playedCard: ICard = get().player.hand.find(
        (card: ICard) => card.id === cardId
      );

      const topPileCard = get().discardedCards[0];

      // check if player is allowed to play card

      if (
        playedCard.cardWild ||
        playedCard.cardColor === topPileCard.cardColor ||
        playedCard.cardNumber === topPileCard.cardNumber
      ) {
        const newHand = get().player.hand.filter(
          (card: ICard) => card.id !== cardId
        );
        set((state) => ({
          discardedCards: [playedCard, ...state.discardedCards],
          player: {
            ...state.player,
            hand: newHand,
          },
        }));
        return true;
      } else {
      }
      return false;
    }

    return false;
  },
  drawCard: (source: CardOwner) => {
    // check if allowed to even draw a card

    // get first card of deck and put into players hand

    const lastCardFromDeck = get().deck[0];
    const lastCardFromDiscardPile = get().discardedCards[0];
    let copyOfDeck = get().deck;
    copyOfDeck.shift();

    if (source === "player") {
      if (!isAllowedToDraw(lastCardFromDiscardPile, get().player)) return false;

      set((state) => ({
        deck: copyOfDeck,
        player: {
          ...state.player,
          hand: [...state.player.hand, lastCardFromDeck],
        },
      }));
      return true;
    }

    if (source === "ki") {
      if (!isAllowedToDraw(lastCardFromDiscardPile, get().ki)) return false;
      set((state) => ({
        deck: copyOfDeck,
        ki: {
          ...state.ki,
          hand: [...state.ki.hand, lastCardFromDeck],
        },
      }));
      return true;
    }

    return false;
  },
}));

export default useUnoStore;
