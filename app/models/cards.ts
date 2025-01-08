export interface Card {
  id: string;
  name: string;
  number: string;
  expiryDate: string;
  cvv: string;
  type: string;
  default: boolean;
}

export interface CardsState {
  cards: Card[];
}
