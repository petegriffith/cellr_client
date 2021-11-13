import { AccessAdminStore } from './adminStore';
import { AccessWineStore } from './wineStore';
import { wines, users, cellrs } from '../apicalls';

const wineStore = AccessWineStore();
const adminStore = AccessAdminStore();

export const fetchAndSetCurrentUser = async (email: string, cellrId: number): Promise<void> => {
  adminStore.currentUser = await users.getUserByEmail(email, cellrId);
};

export const fetchAndSetCurrentCellr = async (cellrId: number): Promise<void> => {
  adminStore.currentCellr = await cellrs.getCellrById(cellrId);
};

export const fetchAndSetAllWines = async (cellrId: number): Promise<void> => {
  wineStore.allWinesList = await wines.getWines(cellrId);
};

export const setCurrentWine = (selectedWine: Wine): void => {
  wineStore.currentWine.value = selectedWine;
};

export const resetCurrentWine = () => {
  wineStore.currentWine.value = {
    id: 0,
    name: '',
    varietal: '',
    vintage: 0,
    color: '',
    created_at: '',
  };
};

export const resetCurrentUser = () => {
  adminStore.currentUser = {
    id: 0,
    username: '',
    email: '',
    cellr_id: 0,
  };
};
