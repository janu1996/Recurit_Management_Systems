import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer
  }
});

// Save favorites to LocalStorage
store.subscribe(() => {
  const favorites = store.getState().favorites;

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
});