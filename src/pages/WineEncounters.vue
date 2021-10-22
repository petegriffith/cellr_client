<template>
  <div class="q-pa-md fit column content-center">
    Here are your encounters for wine {{ wineState.currentWineId
    }}<q-table grid title="Encounters" :rows="rows" :columns="columns" row-key="name" :filter="filter" hide-header @request="fetchEncounters">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { AccessWineStore } from 'src/global/store/wineStore';
import { ref, Ref } from 'vue';
import { WineEncounter } from 'src/typescript/wineTypes';
import { encounters } from 'src/global/apicalls';
import { convertSQLTimestamp } from 'src/global/utility/miscFunctions';

const wineState = AccessWineStore();

const filter = ref('');
const rows: Ref<WineEncounter[]> = ref([]);

const columns = [
  { name: 'bottle_price', label: 'Bottle Price', field: 'bottle_price', sortable: true },
  { name: 'purchase_location', align: 'center', label: 'Purchase Location', field: 'purchase_location', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', sortable: true },
  { name: 'notes', label: 'Notes', field: 'notes' },
];

const fetchEncounters = async () => {
  // this is where a loading animation should go
  try {
      // this is a dev function because of the name/id quandary
      const encountersList = await encounters.getEncountersByWineName(wineState.currentWineId as string);
      console.log(encountersList)
      rows.value = encountersList.map((row) => {
        row.encounter_date = convertSQLTimestamp(row.encounter_date);
        return row;
      });
  } catch (err) {
      throw (err)
  }
};

fetchEncounters().catch((err) => {
    throw (err)
})
</script>
