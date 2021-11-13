<template>
  <q-dialog>
    <q-card v-if="props.currentWine" style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">What would you like to edit?</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="cursor-pointer">
          {{ props.currentWine.name || 'Add a name' }}
          <q-popup-edit v-model="props.currentWine.name" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ props.currentWine.varietal || 'Add a varietal' }}
          <q-popup-edit v-model="props.currentWine.varietal" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ props.currentWine.vintage || 'Add a vintage' }}
          <q-popup-edit v-model="props.currentWine.vintage" auto-save v-slot="scope">
            <q-input type="number" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ props.currentWine.color }}
          <q-popup-edit v-model="props.currentWine.color" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </q-card-section>

      <q-separator inset></q-separator>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" dense v-close-popup></q-btn>
          <q-btn
            flat
            label="Edit Wine"
            color="primary"
            dense
            v-close-popup
            @click="
              () => {
                editWine();
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

export default defineComponent({
  props: { currentWine: Object },
  setup(props, context) {
    const editWine = async () => {
      if (props.currentWine && props.currentWine.id) {
        try {
          await wines.patchWine(props.currentWine.id, props.currentWine); 
          await fetchAndSetAllWines()
        } catch (err) {
          throw err;
        }
        context.emit('rerenderList');
      } else {
        alert('something is wrong in the prop passing!');
      }
    };
    return { props, editWine };
  },
});
</script>
