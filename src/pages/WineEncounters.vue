<template>
  <div class="q-pa-md fit column content-center">
    Here are your encounters for {{ currentWine.name || `Wine ${currentWine.id}` }}
    <q-btn
                dense
                color="primary"
                to="/AddEncounter"
                label="Add an Encounter"
              ></q-btn>
    <q-table
      grid
      title="Encounters"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      @request="fetchEncounters"
    >
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
import { ref, Ref } from 'vue';
import { encounters } from 'src/global/apicalls';
import { convertSQLTimestamp } from 'src/global/utility/miscFunctions';
import { getCurrentWine } from 'src/global/store/getters';

const currentWine = getCurrentWine();

const filter = ref('');
const rows: Ref<WineEncounter[]> = ref([]);

const columns = [
  { name: 'bottle_price', label: 'Bottle Price', field: 'bottle_price', sortable: true },
  { name: 'purchase_location', align: 'center', label: 'Purchase Location', field: 'purchase_location', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', sortable: true },
  { name: 'notes', label: 'Notes', field: 'notes' },
  { name: 'encounter_date', label: 'Date', field: 'encounter_date' },
];

const fetchEncounters = async () => {
  // this is where a loading animation should go
  try {
    const encountersList: WineEncounter[] = await encounters.getEncountersByWineId(currentWine.id);
    rows.value = encountersList.map((row) => {
      row.encounter_date = convertSQLTimestamp(row.encounter_date);
      return row;
    });
  } catch (err) {
    throw err;
  }
};

fetchEncounters().catch((err) => {
  throw err;
});
</script>
