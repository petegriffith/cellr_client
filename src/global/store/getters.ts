import { AccessWineStore } from './wineStore';

const wineState = AccessWineStore()

export const getCurrentWine = () => {3
    return  wineState.currentWine
}

export const getAllWines = () => {
    return  wineState.allWinesList
}