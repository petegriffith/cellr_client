/* eslint-disable @typescript-eslint/no-explicit-any */
// NEED TO SORT OUT A BETTER SOLUTION FOR THE ABOVE


import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  timeout: 10000,
});


const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  get: (url: string, cellr_id: number) => instance.get(url, { headers: {'cellr_id': cellr_id}} ).then(responseBody),
  post: (url: string, data: any) => instance.post(url, data).then(responseBody),
  patch: (url: string, data: any) => instance.patch(url, data).then(responseBody),
  delete: (url: string,) => instance.delete(url).then(responseBody),
};

export const cellrs = {
  getCellrById: (cellrId: number): Promise<CellrData> => requests.get(`./cellrs/${cellrId}`, cellrId)
}

export const users = {
  getUsers: (cellrId: number): Promise<UserData[]> => requests.get('./users/all', cellrId),
  getUserByEmail: (email: string, cellrId: number): Promise<UserData> => requests.get(`./users/${email}`, cellrId),
  postUser: (user: NewUserData): Promise<void> => requests.post('./users', user),
};

export const wines = {
  getWines: (cellrId: number): Promise<Wine[]> => requests.get('./wines/all', cellrId),
  postWine: (wine: NewWine): Promise<void> => requests.post('./wines', wine),
  patchWine: (id: number, updates: WineUpdates) => requests.patch(`/wines/${id}`, updates),
  deleteWine: (id: number): Promise<void> => requests.delete(`/wines/${id}`),
};

export const encounters = {
  getEncountersByWineId: (wineId: number, cellrId: number): Promise<WineEncounter[]> => requests.get(`./encounters/fromWine/${wineId}`, cellrId),
  postEncounter: (newEncounter: NewEncounter, wine_id: number): Promise<WineEncounter> =>
    requests.post(`./encounters/toWine/${wine_id}`, newEncounter),
  deleteEncounter: (encounter_id: number): Promise<void> => requests.delete(`/encounters/${encounter_id}`)
};
