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
import { wines } from 'src/global/apicalls';
import { fetchAndSetAllWines } from 'src/global/store/setters';
import { getCurrentCellr } from 'src/global/store/getters';

export default defineComponent({
  props: {
    newWine: Object,
  },
  setup(props, context) {
    const addWine = async () => {
      if (props.newWine)
        try {
          const test1 = await wines.postWine(props.newWine as NewWine);
          console.log('post wine test:', test1)
          const test2 = await fetchAndSetAllWines(getCurrentCellr().id);
          console.log('fetch and set wines test:', test2)
          context.emit('posted');
        } catch (err) {
          alert(err);
        }
    };

    return { addWine };
  },
});
</script>
