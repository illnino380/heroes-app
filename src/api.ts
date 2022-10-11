/* eslint-disable no-underscore-dangle */
import { Hero, HeroData } from './types/Hero';
import { Id } from './types/Id';
import { client, ENDPOINTS } from './utils/heroClient';

export const getHeroes = (): Promise<Hero[]> => {
  return client.get<Hero[]>(ENDPOINTS.heroes);
};

export const createHero = (data: HeroData): Promise<Hero> => {
  return client.post<Hero>(ENDPOINTS.heroes, data);
};

export const updateHero = (data: Hero): Promise<Hero> => {
  return client.patch<Hero>(ENDPOINTS.heroById(data._id), data);
};

export const deleteHeroById = (id: Id) => {
  return client.delete(ENDPOINTS.heroById(id));
};
