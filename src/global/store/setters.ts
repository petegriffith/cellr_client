import { AccessAuthStore } from './authStore';
import { AccessWineStore } from './wineStore';
import { wines, users } from '../apicalls';
import { Wine } from '../../typescript/wineTypes';

const wineStore = AccessWineStore();
const authStore = AccessAuthStore();

// Not currently being used, table is fetching directly from the server
export const setAllWines = async (): Promise<void> => {
  const getter = await wines.getWines();
  console.log('geting')
  for (const element of getter) {
    wineStore.allWinesList.push(element);
  }
};

export const setCurrentWine = (clickedWine: Wine): void => {
  wineStore.currentWine = clickedWine;
};

export const setCurrentWineEditable = (clickedWine: Wine): void => {
  const filteredWine = { name: clickedWine.name, varietal: clickedWine.varietal, vintage: clickedWine.vintage, color: clickedWine.color}
  wineStore.currentWineEditable = filteredWine;
};

export const resetCurrentWineEditable = (): void => {
  wineStore.currentWineEditable = {
    name: '',
    varietal: '',
    vintage: 0,
    color: '',
  }
};

export const setAllUsers = async (): Promise<void> => {
  const getter = await users.getUsers();
  for (const element of getter) {
    authStore.userList.push(element);
  }
};
