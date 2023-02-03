export interface ICard {
  id: string;
  cardNumber?: number;
  cardColor?: string;
  cardAction?: string;
  cardWild?: string;
  imageUrl?: string;
  cardHiddenUrl?: string;
}

export interface IPlayer {
  name: string?;
  hand: Card[];
}

export interface Deck {
  cards: Card[];
}

export interface GameTable {
  deck: Deck;
  players: Player[];
  discardStack: Card[];
  round: number;
}

export interface Mapping {
  [key: number]: string;
}

export type CardOwner = "player" | "ki" | "deck" | "discardPile";
