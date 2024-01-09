import {AxiosPromise} from 'axios';
import {httpClient} from '../httpClient';

const {get} = httpClient;

interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface IHistory<T> {
  info: IInfo;
  results: T[];
}

interface ICharacterListParams {
  page?: number;
}

export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

type NameAndLinkObject = {
  name: string;
  url: string;
};

export interface ICharacter {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: NameAndLinkObject;
  location: NameAndLinkObject;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getCharacterList = (
  params: ICharacterListParams,
): AxiosPromise<IHistory<ICharacter>> => get('/character', {params});
