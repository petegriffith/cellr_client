<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">Are you sure you want to delete {{ props.currentWine.name || `Wine ${props.currentWine.id}`}}</div>
        <p>All encounters accociated with {{ props.currentWine.name || `Wine ${props.currentWine.id}`}} will also be deleted.</p>
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
import { AccessWineStore } from 'src/global/store/wineStore';
import { wines } from 'src/global/apicalls';

export default defineComponent({
  props: {
    currentWine: {
      type: Object,
      required: true
    },
  },
  setup(props, context) {
    const wineState = AccessWineStore();

    const deleteWine = async () => {
      if (props.currentWine) {
        try {
          const id = props.currentWine.id as number;
          await wines.deleteWine(id);
          context.emit('rerenderList');
        } catch (err) {
          throw err;
        }
      }
    };
    return { props, wineState, deleteWine };
  },
});
</script>
