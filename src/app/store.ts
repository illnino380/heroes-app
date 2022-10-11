import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../features/HeroSlice';

export const store = configureStore({
  reducer: {
    heroesState: heroesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const heroesSelector = ((state: RootState) => state.heroesState);
