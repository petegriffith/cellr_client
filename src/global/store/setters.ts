import { AccessAuthStore } from './authStore';
import { AccessWineStore } from './wineStore';
import { wines, users } from '../apicalls';
import { Wine } from '../../typescript/wineTypes';

const wineStore = AccessWineStore();
const authStore = AccessAuthStore();

// Not currently being used, table is fetching directly from the server
export const fetchAndSetAllWines = async (): Promise<void> => {
  wineStore.allWinesList = await wines.getWines() 
};

export const setCurrentWine = (selectedWine: Wine): void => {
  wineStore.currentWine = selectedWine;
};

export const resetCurrentWine = () => {
  wineStore.currentWine = {
    id: 0,
    name: '',
    varietal: '',
    vintage: 0,
    color: '',
    created_at: '',
  }
}

export const setAllUsers = async (): Promise<void> => {
  const getter = await users.getUsers();
  for (const element of getter) {
    authStore.userList.push(element);
  }
};
