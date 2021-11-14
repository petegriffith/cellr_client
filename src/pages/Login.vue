<template>
  <q-card v-if="!isLoggingIn" class="text-center" style="max-width: 40vw">
    <q-card-section>
      <div class="text-h4">Let's log you in...</div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-section class="q-gutter-y-md column">
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input v-model="email" filled type="email" hint="email" />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat @click="handleLoginClick">Login</q-btn>
      <q-btn flat @click="$router.replace({ name: 'Splash' })">Back to Splash</q-btn>
    </q-card-actions>
  </q-card>
  <q-card v-else class="text-center" style="max-width: 40vw">
    <q-card-section>
      <div class="text-h4">Logging in...</div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-section>
      <div>
        <q-spinner-hourglass color="primary" size="4em" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from 'src/global/utility/authFunctions';
import { fetchAndSetCurrentUser } from 'src/global/store/setters';
import { getCurrentCellr, getCurrentUser } from 'src/global/store/getters';

const isLoggingIn = ref(false);
const password = ref('');
const email = ref('');
const isPwd = ref(true);

const router = useRouter();

const handleLoginClick = async () => {
  isLoggingIn.value = true;

  console.log('logging into firebase...')
  const userCredential = await loginUser(email.value, password.value);
  console.log('logged into firebase:', userCredential)

  if (userCredential && userCredential.user.email) {
    await fetchAndSetCurrentUser(userCredential.user.email, getCurrentCellr().id);
  }

  const user = getCurrentUser()
  sessionStorage.setItem('current user', JSON.stringify(user))

  isLoggingIn.value = false;
  // route user
  await router.replace({ name: 'userCellr' });
};
</script>
