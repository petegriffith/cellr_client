<template>
  <div class="q-pa-md row justify-center">
    <q-table class="col-8" title="All Wines" :rows="rows" :columns="columns" row-key="id" @request="fetchWines">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand; "
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td>
            <q-btn dense round flat color="grey" @click="handleEditWineClick(props.row)" icon="edit"></q-btn>
            <q-btn dense round flat color="grey" @click="handleDeleteWineClick(props.row)" icon="delete"></q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="20%">
            <div class="text-left">
              Encounters for {{ props.row.name }} may appear here soon. In the meantime...
              <q-btn
                dense
                color="primary"
                @click="wineState.currentWineId = props.row.name;"
                to="/WineEncounters"
                label="see encounters"
              ></q-btn>
            </div>
          </q-td>
        </q-tr>
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
import DeleteWineDialog from 'src/components/DeleteWineDialog.vue';
import { wines } from 'src/global/apicalls';
import { AccessWineStore } from 'src/global/store/wineStore';

const showDeleteDialog = ref(false);
const rows: Ref<Wine[]> = ref([]);
const wineState = AccessWineStore();

const columns = [
  { name: 'Wine Name', align: 'center', label: 'Wine Name', field: 'name', sortable: true },
  { name: 'Varietal', label: 'Varietal', field: 'varietal', sortable: true },
  { name: 'Vintage', label: 'Vintage', field: 'vintage', sortable: true },
  { name: 'Color', label: 'Color', field: 'color', sortable: true },
  { name: 'Date Added', label: 'Date Added', field: 'created_at', sortable: true },
  /* { name: 'actions', label: 'Actions', field: '', align: 'center' }, */
];

const fetchWines = async () => {
  // this is where a loading animation should go
  const wineList = await wines.getWines();
  rows.value = wineList.map((row) => {
    row.created_at = convertSQLTimestamp(row.created_at);
    return row;
  });
};

const handleEditWineClick = (row: LooseDictionary) => {
  wineState.currentWineId = (row as Wine).id;
};

const handleDeleteWineClick = (row: LooseDictionary) => {
  showDeleteDialog.value = true;
};

fetchWines().catch((err) => {
  throw err;
});
</script>
