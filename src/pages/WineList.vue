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
              @click="props.expand = !props.expand"
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
                @click="handleEncountersClick"
                to="/WineEncounters"
                label="see encounters"
              ></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <ConfirmDeleteWineDialog v-model="showDeleteDialog" :currentWine="currentWine" @rerenderList="fetchWines" />
    <EditWineDialog v-model="showEditDialog" :currentWine="currentWine" @rerenderList="fetchWines" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { convertSQLTimestamp } from 'src/global/utility/miscFunctions';
import { Wine } from 'src/typescript/wineTypes';
import { LooseDictionary } from 'quasar';
import ConfirmDeleteWineDialog from 'src/components/ConfirmDeleteWineDialog.vue';
import EditWineDialog from 'src/components/EditWineDialog.vue';
import { wines } from 'src/global/apicalls';
import { setCurrentWine } from 'src/global/store/setters'

const showDeleteDialog = ref(false);
const rows: Ref<Wine[]> = ref([]);
const showEditDialog = ref(false);
const currentWine: Ref<Wine> = ref({
  id: 0,
  name: '',
  varietal: '',
  vintage: 0,
  color: '',
  created_at: '',
});

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
  const wineList: Wine[] = await wines.getWines();
  rows.value = wineList.map((row) => {
    row.created_at = convertSQLTimestamp(row.created_at);
    return row;
  });
};

const handleEncountersClick = (row: LooseDictionary) => {
  setCurrentWine(row as Wine)
}

const handleEditWineClick = (row: LooseDictionary) => {
  currentWine.value = row as Wine;
  showEditDialog.value = true;
};

const handleDeleteWineClick = (row: LooseDictionary) => {
  currentWine.value = row as Wine;
  showDeleteDialog.value = true;
};

fetchWines().catch((err) => {
  throw err;
});
</script>
