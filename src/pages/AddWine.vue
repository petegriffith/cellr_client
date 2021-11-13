<template>
  <q-card v-if="!winePosted" class="q-ma-xl q-pa-md">
    <div class="fit row justify-center">
      <div class="q-pa-sm column col-auto">
        <q-toggle
          v-model="nameToggle"
          :label="nameToggle"
          true-value="I know the wine's name"
          false-value="I don't know the wine's name"
        />
        <q-toggle
          v-model="vintageToggle"
          :label="vintageToggle"
          true-value="I know the wine's vintage"
          false-value="I don't know the wine's vintage"
        />
        <q-toggle
          v-model="varietalToggle"
          :label="varietalToggle"
          true-value="I know the wine's varietal"
          false-value="I don't know the wine's varietal"
        />
      </div>
    </div>
    <div class="fit row justify-center">
      <q-form @submit="submitHandler" class="col-7 q-pa-lg">
        <q-input
          v-if="nameToggle === `I know the wine's name`"
          class="q-my-lg"
          filled
          v-model="wine_name"
          label="Wine Name"
          hint="What does it say on the bottle?"
        />
        <q-input
          v-if="vintageToggle === `I know the wine's vintage`"
          class="q-my-lg"
          filled
          v-model="vintage"
          label="Vintage"
          hint="The year the wine was pressed"
          maxlength="4"
          lazy-rules
          :rules="[numberRuleOne]"
        />

        <q-input
          v-if="varietalToggle === `I know the wine's varietal`"
          class="q-my-lg"
          filled
          v-model="varietal"
          label="Varietal"
          hint="Cabernet, Chardonnay, etc."
        />
        <q-input
          class="q-my-lg"
          filled
          v-model="color"
          label="Wine Color *"
          hint="Red, White, Sparkling, etc."
          lazy-rules
          :rules="[colorRule]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-card>

  <div v-else>
    You've successfully posted a wine! Would you like to post another?
    <q-btn to="/AddWine" @click="winePosted = false"> Post Another Wine</q-btn>
  </div>
  <AddWineDialog v-model="showConfirmDialog" :newWine="newWine" @posted="winePosted = true" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AddWineDialog from 'src/components/ConfirmAddWineDialog.vue';
import { getCurrentCellr } from 'src/global/store/getters';

const wine_name = ref('');
const vintage = ref(2021);
const varietal = ref('');
const color = ref('');
const showConfirmDialog = ref(false);
const winePosted = ref(false);
const nameToggle = ref("I know the wine's name");
const vintageToggle = ref("I know the wine's vintage");
const varietalToggle = ref("I know the wine's varietal");
const cellr = getCurrentCellr()
console.log(cellr)
const newWine: NewWine = { color: 'unknown', cellr_id: cellr.id };
console.log(newWine)

const colorRule = (val: string) => !!val || "Even if you don't know anything else about the wine, surely you know the color?";
const numberRuleOne = (val: string) => /^(?:19|20)\d{2}$/.test(val) || 'Please enter a four digit year beginning with 19 or 20';

const submitHandler = () => {
  if (nameToggle.value === "I know the wine's name") newWine.name = wine_name.value;
  if (vintageToggle.value === "I know the wine's vintage") newWine.vintage = vintage.value;
  if (varietalToggle.value === "I know the wine's varietal") newWine.varietal = varietal.value;
  newWine.color = color.value;
  showConfirmDialog.value = true;
};
</script>
