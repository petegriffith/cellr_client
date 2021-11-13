/* eslint-disable @typescript-eslint/no-explicit-any */
// NEED TO SORT OUT A BETTER SOLUTION FOR THE ABOVE

import axios, { AxiosResponse } from 'axios';
import { getCurrentCellr } from './store/getters';

const instance = axios.create({
  timeout: 10000,
});

const serverURL = 'http://cellr-server.herokuapp.com';

const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  get: (url: string, cellr_id = getCurrentCellr().id) =>
    instance.get(url, { headers: { cellr_id: cellr_id } }).then(responseBody),
  post: (url: string, data: any) => instance.post(url, data).then(responseBody),
  patch: (url: string, data: any) => instance.patch(url, data).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const cellrs = {
  getCellrById: (cellrId: number): Promise<CellrData> => requests.get(`${serverURL}/cellrs/${cellrId}`),
};

export const users = {
  getUsers: (): Promise<UserData[]> => requests.get(`${serverURL}/users/all`),
  getUserByEmail: (email: string): Promise<UserData> => requests.get(`${serverURL}/users/${email}`),
  postUser: (user: UserData): Promise<void> => requests.post(`${serverURL}/users`, user),
};

export const wines = {
  getWines: (): Promise<Wine[]> => requests.get(`${serverURL}/wines/all`),
  postWine: (wine: NewWine): Promise<void> => requests.post(`${serverURL}/wines`, wine),
  patchWine: (id: number, updates: WineUpdates) => requests.patch(`${serverURL}/wines/${id}`, updates),
  deleteWine: (id: number): Promise<void> => requests.delete(`${serverURL}/wines/${id}`),
};

export const encounters = {
  getEncountersByWineId: (wineId: number): Promise<WineEncounter[]> => requests.get(`${serverURL}/encounters/fromWine/${wineId}`),
  postEncounter: (newEncounter: NewEncounter, wine_id: number): Promise<WineEncounter> =>
    requests.post(`${serverURL}/encounters/toWine/${wine_id}`, newEncounter),
  deleteEncounter: (encounter_id: number): Promise<void> => requests.delete(`${serverURL}/encounters/${encounter_id}`),
};
