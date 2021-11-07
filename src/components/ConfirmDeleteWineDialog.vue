<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">Are you sure you want to delete {{ props.currentWine.name || `Wine ${props.currentWine.id}` }}</div>
        <p>All encounters accociated with {{ props.currentWine.name || `Wine ${props.currentWine.id}` }} will also be deleted.</p>
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
            @click="
              () => {
                deleteWine();
              }
            "
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { wines } from 'src/global/apicalls';
import { fetchAndSetAllWines } from 'src/global/store/setters';

export default defineComponent({
  props: {
    currentWine: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const deleteWine = async () => {
      if (props.currentWine) {
        try {
          await wines.deleteWine(props.currentWine.id);
          await fetchAndSetAllWines();
        } catch (err) {
          throw err;
        }
        context.emit('rerenderList');
      } else {
        alert('something is wrong in the prop passing!');
      }
    };
    return { deleteWine, props };
  },
});
</script>
