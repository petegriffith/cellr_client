<template>
  <q-dialog>
    <q-card v-if="newEncounter" style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h5">You're going to add the following encounter to {{ currentWine.name }}</div>
        <p class="text-h5">
          <span class="text-primary">Encounter Date:</span>
          <span v-if="newEncounter.encounter_date">{{ newEncounter.encounter_date }}</span>
          <span v-else>Today</span>
        </p>
        <p class="text-h5">
          <span class="text-primary">Bottle Price:</span
          ><span v-if="newEncounter.bottle_price">{{ newEncounter.bottle_price }}</span>
          <span class="grayed-out" v-else>(unknown)</span>
        </p>
        <p class="text-h5">
          <span class="text-primary">Purchase Location:</span
          ><span v-if="newEncounter.purchase_location">{{ newEncounter.purchase_location }}</span>
          <span class="grayed-out" v-else>(unknown)</span>
        </p>
        <p class="text-h5">
          <span class="text-primary">Rating:</span><span v-if="newEncounter.rating">{{ newEncounter.rating }}</span>
          <span class="grayed-out" v-else>(none)</span>
        </p>
        <p class="text-h5">
          <span class="text-primary">Notes:</span><span v-if="newEncounter.notes">{{ newEncounter.notes }}</span>
          <span class="grayed-out" v-else>(none)</span>
        </p>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none"> </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" dense v-close-popup></q-btn>
          <q-btn
            flat
            label="Add Encounter"
            color="primary"
            dense
            v-close-popup
            @click="
              () => {
                addEncounter();
              }
            "
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
    <q-card v-else>Something is wrong!</q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { encounters } from 'src/global/apicalls';
import { getCurrentWine } from 'src/global/store/getters';

export default defineComponent({
  props: {
    newEncounter: Object as PropType<NewEncounter>,
  },
  setup(props, context) {
    const currentWine = getCurrentWine()
    const addEncounter = async () => {
      if (props.newEncounter) {
        const newEncounter: NewEncounter = props.newEncounter;
        try {
          await encounters.postEncounter(newEncounter, newEncounter.wine_id);
          context.emit('posted');
        } catch (err) {
          alert(err);
        }
      } else {
        alert('no newEncounter or wineId, who is trying to break my app?')
      }
    };

    return { addEncounter, currentWine };
  },
});
</script>
