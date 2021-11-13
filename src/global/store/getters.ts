import { AccessAdminStore } from './adminStore';
import { AccessWineStore } from './wineStore';

const wineState = AccessWineStore()
const adminState = AccessAdminStore()

export const getCurrentUser = () => {
    return adminState.currentUser
}

export const getCurrentCellr = () => {
    return adminState.currentCellr
}

export const getCurrentWine = () => {
    return  wineState.currentWine
}

export const getAllWines = () => {
    return  wineState.allWinesList
}