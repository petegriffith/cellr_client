<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section> Let's pick a wine... </q-card-section>
      <q-select outlined v-model="selectedWineName" :options="wines" label="Select A Wine" />
      <q-separator inset></q-separator>
      <q-btn v-close-popup color="primary" v-if="selectedWineName.length > 1" class="primary" @click="handleSetWineClick"
        >Encounter {{ selectedWineName }}</q-btn
      >
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAllWines } from 'src/global/store/getters';
import { setCurrentWine } from 'src/global/store/setters';

const wines = getAllWines().map((wine) => wine.name);
const selectedWineName = ref('');

const handleSetWineClick = () => {
  const selectedWine = getAllWines().filter((wine) => wine.name === selectedWineName.value);
  console.log(selectedWine[0]);
  setCurrentWine(selectedWine[0]);
};
</script>
