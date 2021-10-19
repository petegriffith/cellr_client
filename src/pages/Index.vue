<template>
<div v-if="isLoading">
  loading...
</div>
  <q-page v-else class="row items-center justify-evenly">
    {{wineState}}
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { setAllWines } from '../global/store/setters';
import { AccessWineStore } from 'src/global/store/wineStore';

 const isLoading = ref(true)
 const wineState = AccessWineStore()

 const loadWines = () => {
   setAllWines().catch((err) => alert(err))
   isLoading.value = false
 }

 loadWines()
</script>
