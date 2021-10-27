<template>
  <q-dialog>
    <q-card v-if="wineUpdates" style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">What would you like to edit?</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="cursor-pointer">
          {{ wineUpdates.name || "Add a name" }}
          <q-popup-edit v-model="wineUpdates.name" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ wineUpdates.varietal || "Add a varietal" }}
          <q-popup-edit v-model="wineUpdates.varietal" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ wineUpdates.vintage || "Add a vintage" }}
          <q-popup-edit v-model="wineUpdates.vintage" auto-save v-slot="scope">
            <q-input type="number" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div class="cursor-pointer">
          {{ wineUpdates.color }}
          <q-popup-edit v-model="wineUpdates.color" auto-save v-slot="scope">
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
import { setAllWines, resetCurrentWineEditable } from 'src/global/store/setters';
import { getCurrentEdittableWine } from 'src/global/store/getters';
import { AccessWineStore } from 'src/global/store/wineStore';

export default defineComponent({
  setup(props, context) {
    const wineState = AccessWineStore();
    const wineUpdates = getCurrentEdittableWine();

    const editWine = async () => {
      if (wineUpdates)
        try {
          const id = wineState.currentWineId as number;
          await wines.patchWine(id, wineUpdates.value);
          resetCurrentWineEditable();
          context.emit('rerenderList');
        } catch (err) {
          alert(err);
        }
    };

    return { wineUpdates, editWine };
  },
});
</script>
