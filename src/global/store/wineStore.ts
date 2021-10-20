import { reactive } from 'vue';
import { Wine, WineStoreContents } from '../../typescript/wineTypes';

// maybe not necessary?
const allWinesList: Wine[] = [];

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
});

export function AccessWineStore(): WineStoreContents {
  return wineState;
}
