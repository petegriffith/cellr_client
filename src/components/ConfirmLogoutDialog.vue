<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <div class="text-h6">Are you sure you want to logout?</div>
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
                logout();
              }
            "
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { logoutUser } from 'src/global/utility/authFunctions';
import { resetCurrentUser } from 'src/global/store/setters';
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await logoutUser();
  resetCurrentUser();
  console.log(router);
  await router.push({ name: 'Splash' });
};
</script>
