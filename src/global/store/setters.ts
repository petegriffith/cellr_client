import { AccessAdminStore } from './adminStore';
import { AccessWineStore } from './wineStore';
import { wines, users, cellrs } from '../apicalls';
import { Wine } from '../../typescript/wineTypes';

const wineStore = AccessWineStore();
const adminStore = AccessAdminStore();

export const fetchAndSetCurrentUser = async (userId: number): Promise<void> => {
  adminStore.currentUser = await users.getUserById(userId)
}

export const fetchAndSetCurrentCellr = async (cellrId: number): Promise<void> => {
  adminStore.currentCellr = await cellrs.getCellrById(cellrId)
}

export const fetchAndSetAllWines = async (): Promise<void> => {
  wineStore.allWinesList = await wines.getWines();
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
  };
};

