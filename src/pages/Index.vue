<template>
  <div v-if="isLoading">loading your cellr...</div>
  <!-- <q-page v-else class="row items-center justify-evenly">
    {{wineState}}
  </q-page> -->
  <div v-else class="q-pa-md">
    <q-table title="All Wines" :rows="rows" :columns="columns" row-key="wine name" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AccessWineStore } from 'src/global/store/wineStore';

const isLoading = ref(false);
const wineState = AccessWineStore();


const columns = [
  { name: 'Wine Name', align: 'center', label: 'Wine Name', field: 'name', sortable: true },
  { name: 'Varietal', label: 'Varietal', field: 'varietal', sortable: true },
  { name: 'Vintage', label: 'Vintage', field: 'vintage', sortable: true },
  { name: 'Color', label: 'color', field: 'color', sortable: true },
  { name: 'Date Added', label: 'Date Added', field: 'created_at', sortable: true },
];
  const rows = wineState.allWinesList.map((row) => {
    const newDate = new Date(row.created_at).toDateString();
    row.created_at = newDate;
    return row;
  });
</script>
