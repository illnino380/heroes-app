/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createHero, deleteHeroById, getHeroes, updateHero,
} from '../api';
import { Hero } from '../types/Hero';

interface HeroesState {
  heroes: Hero[],
  status: string,
}

const initialState: HeroesState = {
  heroes: [],
  status: 'loading',
};

export const fetchHeroes = createAsyncThunk<Hero[]>(
  'heroes/fetchHeroes',
  getHeroes,
);

export const addNewHero = createAsyncThunk(
  'heroes/add_hero',
  createHero,
);

export const updateHeroById = createAsyncThunk(
  'heroes/update_hero',
  updateHero,
);

export const removeHeroById = createAsyncThunk(
  'heroes/delete_hero',
  deleteHeroById,
);

export const heroesStateSlice = createSlice({
  name: 'heroesState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchHeroes.fulfilled,
      (state, action: PayloadAction<Hero[]>) => {
        state.heroes = action.payload;
        state.status = 'loaded';
      });

    builder.addCase(fetchHeroes.rejected, (state) => {
      state.heroes = [];
      state.status = 'error';
    });

    builder.addCase(addNewHero.fulfilled,
      (state, action) => {
        state.heroes.push(action.payload);
      });

    builder.addCase(updateHeroById.fulfilled, (state, action) => {
      state.heroes = state.heroes.map(hero => (
        hero._id === action.meta.arg._id ? action.payload : hero
      ));
    });

    builder.addCase(removeHeroById.fulfilled, (state, action) => {
      state.heroes = state.heroes.filter(hero => (
        hero._id !== action.meta.arg
      ));
    });
  },
});

export default heroesStateSlice.reducer;
