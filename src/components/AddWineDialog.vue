<template>
  <q-dialog>
    <q-card v-if="newWine" style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h5">You're going to add the following wine to your cellr:</div>
        <p class="text-h5">
          Wine Name: <span v-if="newWine.name">{{ newWine.name }}</span> <span class="grayed-out" v-else>(unknown)</span>
        </p>
        <p class="text-h5">
          Vintage: <span v-if="newWine.vintage">{{ newWine.vintage }}</span> <span class="grayed-out" v-else>(unknown)</span>
        </p>
        <p class="text-h5">
          Varietal: <span v-if="newWine.varietal">{{ newWine.varietal }}</span> <span class="grayed-out" v-else>(unknown)</span>
        </p>
        <p class="text-h5">
          Color: {{ newWine.color }}
          <span class="grayed-out" v-if="!newWine.name && !newWine.vintage && !newWine.varietal"
            >(hey, at least you knew the color!)</span
          >
        </p>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none"> </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" dense v-close-popup></q-btn>
          <q-btn
            flat
            label="Add Wine"
            color="primary"
            dense
            v-close-popup
            @click="
              () => {
                addWine();
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
import { defineComponent } from 'vue';
import { AccessWineStore } from 'src/global/store/wineStore';
import { wines } from 'src/global/apicalls';
import { setAllWines } from 'src/global/store/setters';

export default defineComponent({
  props: {
    newWine: Object,
  },
  setup(props, context) {
    const wineState = AccessWineStore();

    const addWine = async () => {
      if (props.newWine)
        try {
            console.log(props.newWine)
            // this fails if vintage isn't set. Need to find a solution!
          await wines.postWine(props.newWine);
          await setAllWines();
          context.emit('posted')
        } catch (err) {
          alert(err);
        }
    };

    return { wineState, addWine };
  },
});
</script>
