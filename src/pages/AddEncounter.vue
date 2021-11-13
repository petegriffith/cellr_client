<template>
  <q-card v-if="!encounterPosted" class="q-ma-xl q-pa-md">
    <div class="card-title fit row justify-center">
      <h5>Adding an encounter for {{ currentWine.name }}</h5>
    </div>
    <div class="fit row justify-center">
      <div class="q-pa-sm column col-auto">
        <q-toggle
          v-model="priceToggle"
          :label="priceToggle"
          true-value="I know the bottle price"
          false-value="I don't know the bottle price"
        />
        <q-toggle
          v-model="locationToggle"
          :label="locationToggle"
          true-value="I know where the wine was bought"
          false-value="I don't know where the wine was bought"
        />
        <q-toggle
          v-model="ratingToggle"
          :label="ratingToggle"
          true-value="I want to rate the wine"
          false-value="I don't want to rate the wine"
        />
        <q-toggle
          v-model="dateToggle"
          :label="dateToggle"
          true-value="I want to set the encounter date"
          false-value="I encountered this wine today"
        />
        <q-toggle
          v-model="notesToggle"
          :label="notesToggle"
          true-value="I want to add some notes"
          false-value="I don't want to add any notes"
        />
      </div>
    </div>
    <div class="fit row justify-center">
      <q-form @submit="submitHandler" class="col-7 q-pa-lg">
        <q-input
          v-if="priceToggle === `I know the bottle price`"
          class="q-my-lg"
          filled
          v-model.number="bottle_price"
          type="number"
          label="Bottle Price"
          prefix="¥"
          hint="How much did a bottle cost?"
        />
        <q-input
          v-if="locationToggle === `I know where the wine was bought`"
          class="q-my-lg"
          filled
          v-model="purchase_location"
          label="Purchase Location"
          hint="Where was the wine bought?"
        />
        <q-input
          v-if="ratingToggle === `I want to rate the wine`"
          class="q-my-lg"
          filled
          v-model.number="rating"
          type="number"
          label="Rating"
          min="0"
          max="5"
          hint="Rating from 0-5"
          :rules="[lowRatingRule, highRatingRule, wholeRatingRule]"
        />
        <q-input
          v-if="dateToggle === `I want to set the encounter date`"
          class="q-my-lg"
          filled
          v-model="date"
          type="date"
          hint="If the wine was encountered today, you can ignore this!"
        />
        <q-input
          v-if="notesToggle === `I want to add some notes`"
          class="q-my-lg"
          filled
          v-model="notes"
          type="textarea"
          label="Notes..."
          hint="Anything you want to remember about the wine or the encounter"
        />
        <div v-if="cheekyEncouterChecker()">
          <p class="text-red">Adding an encounter without any data at all? Cheeky. I like your style.</p>
        </div>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-card>

  <div v-else>
    You've successfully added your encounter!
  </div>
  <AddEncounterDialog v-model="showConfirmDialog" :newEncounter="newEncounter" @posted="encounterPosted = true"/>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AddEncounterDialog from 'src/components/ConfirmAddEncounterDialog.vue';
import { getCurrentUser, getCurrentWine } from 'src/global/store/getters';

const currentWine = getCurrentWine();
const currentUser = getCurrentUser()

const bottle_price = ref(0);
const purchase_location = ref('');
const rating = ref(0);
const date = ref('');
const notes = ref('');
const showConfirmDialog = ref(false);
const encounterPosted = ref(false)
const priceToggle = ref('I know the bottle price');
const locationToggle = ref('I know where the wine was bought');
const ratingToggle = ref('I want to rate the wine');
const dateToggle = ref('I want to set the encounter date');
const notesToggle = ref('I want to add some notes');
const newEncounter: NewEncounter = { notes: '', wine_id: currentWine.id, user_id: currentUser.id };

if (currentWine.name) newEncounter.wine_name = currentWine.name

const lowRatingRule = (val: number) =>
  val >= 0 || "You can't go lower than zero. Zero is the lowest rating. You are a barbarian.";
const highRatingRule = (val: number) =>
  val <= 5 || 'Ratings above 5 will inevitably cause runaway inflation and cause the rating market to crash.';
const wholeRatingRule = (val: number) => val % 1 == 0 || 'Ratings must be whole numbers. Everyone knows that.';

const cheekyEncouterChecker = () => {
  if (
    priceToggle.value === "I don't know the bottle price" &&
    locationToggle.value === "I don't know where the wine was bought" &&
    ratingToggle.value === "I don't want to rate the wine" &&
    dateToggle.value === 'I encountered this wine today' &&
    notesToggle.value === "I don't want to add any notes"
  )
    return true;
};

const submitHandler = () => {
  if (priceToggle.value === 'I know the bottle price') newEncounter.bottle_price = bottle_price.value;
  if (locationToggle.value === 'I know where the wine was bought') newEncounter.purchase_location = purchase_location.value;
  if (ratingToggle.value === 'I want to rate the wine') newEncounter.rating = rating.value;
  if (dateToggle.value === 'I want to set the encounter date') newEncounter.encounter_date = date.value;
  if (notesToggle.value === 'I want to add some notes') newEncounter.notes = notes.value;
  showConfirmDialog.value = true;
};
</script>
