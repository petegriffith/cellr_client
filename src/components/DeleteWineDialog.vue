<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">Are you sure you want to delete {{ wineState.currentWine.name }}?</div>
        <p>All encounters accociated with {{ wineState.currentWine.name }} will also be deleted.</p>
        <p>This is a PERMANENT change</p>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none"> </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" dense v-close-popup></q-btn>
          <q-btn
            flat
            label="OK"
            color="primary"
            dense
            v-close-popup
            @click="() => {deleteWine()}"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccessWineStore } from 'src/global/store/wineStore';
import { wines } from 'src/global/apicalls';
import { setAllWines } from 'src/global/store/setters';

export default defineComponent ({
  setup(_, context) {
    const wineState = AccessWineStore();
    
    const deleteWine = async () => {
      await wines.deleteWine(wineState.currentWine.id);
      console.log('setting')
      await setAllWines()
      context.emit('rerenderList')
    };
  return {wineState, deleteWine}
  }
})

</script>
