import { createSlice } from "@reduxjs/toolkit";

import { CardsState } from "../models/cards";

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    addCard(state, action) {
      const newCard = action.payload;

      // Check if `default` key is true in the new card
      if (newCard.default) {
        // Set `default` to false for all existing cards
        state.cards = state.cards.map((card) =>
          card.default ? { ...card, default: false } : card
        );
      }

      // Add the new card
      state.cards.push(newCard);
    },
    removeCard(state, action) {
      const idToRemove = action.payload;

      // Filter out the card with the matching ID
      state.cards = state.cards.filter((card) => card.id !== idToRemove);
    },
  },
});

export const { setCards, addCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
