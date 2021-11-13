import { ref, Ref } from 'vue'

// maybe not necessary? 
const allWinesList: Wine[] = [];

const currentWine: Ref<Wine> = ref({
  id: 0,
  name: '',
  varietal: '',
  vintage: 0,
  color: '',
  created_at: '',
  cellr_id: 0,
})

const wineState = {
  allWinesList: allWinesList,
  currentWine: currentWine,
};

export function AccessWineStore() {
  return wineState;
}
