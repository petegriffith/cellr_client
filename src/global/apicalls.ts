import axios, { AxiosResponse } from 'axios';
import { Wine, WineEncounter, NewWine } from '../typescript/wineTypes';
import { UserData } from '../typescript/authTypes';

const instance = axios.create({
  timeout: 10000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (url: string, data: any) => instance.post(url, data).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const users = {
  getUsers: (): Promise<UserData[]> => requests.get('./users'),
};

export const wines = {
  getWines: (): Promise<Wine[]> => requests.get('./wines/allWines'),
  postWine: (wine: NewWine): Promise<void> => requests.post('./wines/post', wine),
  deleteWine: (wine_id: number): Promise<void> => requests.delete(`/wines/delete/${wine_id}`),
};

export const encounters = {
  getEncountersByWineId: (wine_id: number): Promise<WineEncounter[]> => requests.get(`./encounters/byID/${wine_id}`),
  getEncountersByWineName: (wine_name: string): Promise<WineEncounter[]> => requests.get(`./encounters/byName/${wine_name}`),
  postEncounter: (newEncounter: WineEncounter, wine_id: number): Promise<WineEncounter> =>
    requests.post(`./encounters/post/${wine_id}`, newEncounter),
  deleteEncounter: (encounter_id: number): Promise<void> => requests.delete(`/encounters/delete/${encounter_id}`),
};
