import { reactive } from 'vue';
import { Wine, WineStoreContents } from '../../typescript/wineTypes';

// maybe not necessary?
const allWinesList: Wine[] = [];

const currentWineId: number | null = null

const currentWine: Wine = {
  id: 0,
  name: '',
  varietal: '',
  vintage: 0,
  color: '',
  created_at: '',
}

const wineState: WineStoreContents = reactive({
  allWinesList: allWinesList,
  currentWine: currentWine,
  currentWineId: currentWineId
});

export function AccessWineStore(): WineStoreContents {
  return wineState;
}
