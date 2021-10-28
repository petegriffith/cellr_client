/* eslint-disable @typescript-eslint/no-explicit-any */
// NEED TO SORT OUT A BETTER SOLUTION FOR THE ABOVE


import axios, { AxiosResponse } from 'axios';
import { Wine, WineEncounter, NewWine, WineUpdates } from '../typescript/wineTypes';
import { UserData } from '../typescript/adminTypes';
import { CustomAxiosRequestConfig } from 'src/typescript/apiTypes';

const instance = axios.create({
  timeout: 10000,
  cellr_id: 1
} as CustomAxiosRequestConfig);

const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, data: any) => instance.post(url, data).then(responseBody),
  patch: (url: string, data: any) => instance.patch(url, data).then(responseBody),
  delete: (url: string,) => instance.delete(url).then(responseBody),
};

export const users = {
  getUsers: (): Promise<UserData[]> => requests.get('./users'),
  getUserById: (userId: number): Promise<UserData> => requests.get(`./users${userId}`)
};

export const wines = {
  getWines: (): Promise<Wine[]> => requests.get('./wines/all'),
  postWine: (wine: NewWine): Promise<void> => requests.post('./wines', wine),
  patchWine: (id: number, updates: WineUpdates) => requests.patch(`/wines/${id}`, updates),
  deleteWine: (id: number): Promise<void> => requests.delete(`/wines/${id}`),
};

export const encounters = {
  getEncountersByWineId: (wineId: number): Promise<WineEncounter[]> => requests.get(`./encounters/${wineId}`),
  postEncounter: (newEncounter: WineEncounter, wine_id: number): Promise<WineEncounter> =>
    requests.post(`./encounters/post/${wine_id}`, newEncounter),
  deleteEncounter: (encounter_id: number): Promise<void> => requests.delete(`/encounters/${encounter_id}`)
};
