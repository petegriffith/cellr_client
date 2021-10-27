import { AccessWineStore } from './wineStore';

const wineState = AccessWineStore()

export const getCurrentWine = () => {
    return  wineState.currentWine
}

export const getAllWines = () => {
    return  wineState.allWinesList
}