import { AccessWineStore } from './wineStore';
import { computed } from 'vue';

const wineState = AccessWineStore()

export const getCurrentEdittableWine = () => {
    return computed(() => wineState.currentWineEditable)
}