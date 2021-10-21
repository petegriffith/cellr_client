<template>
  <div v-if="!winePosted" class="q-pa-md" style="max-width: 400px">
    <q-form @submit="showConfirmDialog = true" class="q-gutter-md">
      <q-input filled v-model="wine_name" label="Wine Name" hint="What does it say on the bottle?" />

      <q-input filled v-model="vintage" label="Vintage"  hint="The year the wine was pressed" />
      <q-input filled v-model="varietal" label="Varietal" hint="Cabernet, Chardonnay, etc." />
      <q-input filled v-model="color" label="Wine Color *" hint="Red, White, Sparkling, etc." lazy-rules :rules="[colorRule]" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
  <div v-else>You've successfully posted a wine! Would you like to post another? <q-btn to="/AddWine" @click="winePosted = false"> Post Another Wine</q-btn></div>
  <AddWineDialog v-model="showConfirmDialog" :newWine="{ name: wine_name, vintage: vintage, varietal: varietal, color: color }" @posted="winePosted = true" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AddWineDialog from 'src/components/AddWineDialog.vue';

const wine_name = ref('');
const vintage = ref(2021);
const varietal = ref('');
const color = ref('');
const showConfirmDialog = ref(false);
const winePosted = ref(false)

const colorRule = (val: string) => !!val || `Even if you don't know anything about the wine, surely you know the color?`;

/* const newWine: NewWine = reactive({
  name: '',
}); */
</script>
