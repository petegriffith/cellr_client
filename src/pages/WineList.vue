<template>
  <div class="q-pa-md">
    <q-table title="All Wines" :rows="rows" :columns="columns" row-key="wine name" @request="fetchWines">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="handleEditWineClick(props.row)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="handleDeleteWineClick(props.row)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
    <delete-wine-dialog v-model="showDeleteDialog" @rerenderList="fetchWines" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { convertSQLTimestamp } from 'src/global/utility/miscFunctions';
import { Wine } from 'src/typescript/wineTypes';
import { LooseDictionary } from 'quasar';
import { setCurrentWine } from 'src/global/store/setters';
import DeleteWineDialog from 'src/components/DeleteWineDialog.vue';
import { wines } from 'src/global/apicalls';

const showDeleteDialog = ref(false);
const rows: Ref<Wine[]> = ref([])

const columns = [
  { name: 'Wine Name', align: 'center', label: 'Wine Name', field: 'name', sortable: true },
  { name: 'Varietal', label: 'Varietal', field: 'varietal', sortable: true },
  { name: 'Vintage', label: 'Vintage', field: 'vintage', sortable: true },
  { name: 'Color', label: 'Color', field: 'color', sortable: true },
  { name: 'Date Added', label: 'Date Added', field: 'created_at', sortable: true },
  { name: 'actions', label: 'Actions', field: '', align: 'center' },
];

const fetchWines = async () => {
  // this is where a loading animation should go
  const wineList = await wines.getWines()
  rows.value = wineList.map((row) => {
    row.created_at = convertSQLTimestamp(row.created_at);
    return row;
  });
};

const handleEditWineClick = (row: LooseDictionary) => {
  console.log((row as Wine).id);
};

const handleDeleteWineClick = (row: LooseDictionary) => {
  setCurrentWine(row as Wine);
  showDeleteDialog.value = true;
};

fetchWines().catch((err) => {throw err} ) 
</script>
