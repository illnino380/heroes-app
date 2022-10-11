import { Id } from './Id';

export interface Hero {
  _id: Id;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export type HeroData = Omit<
Hero,
'_id'
| 'createdAt'
| 'updatedAt'
| '__v'
>;
