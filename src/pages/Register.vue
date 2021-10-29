<template>
  <q-card v-if="!isRegistering" class="text-center" style="max-width: 40vw">
    <q-card-section>
      <div class="text-h4">Let's get you registered...</div>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-section class="q-gutter-y-md column">
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input v-model="email" filled type="email" hint="email" />
      <q-input v-model="username" filled type="text" hint="username" />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat @click="handleRegisterClick">Register</q-btn>
    </q-card-actions>
    <q-card-section class="text-center">
      <p>NOTE: for now you will be registered into cellr {{ cellr_id }}. Don't worry about it.</p>
    </q-card-section>
  </q-card>
  <q-card v-else class="text-center" style="max-width: 40vw">
    <q-card-section>
      <div class="text-h4">Registering...</div>
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
import { registerUser } from 'src/global/utility/authFunctions';
import { UserData } from 'src/typescript/adminTypes';
import { users } from 'src/global/apicalls';
import { fetchAndSetCurrentUser } from 'src/global/store/setters';

const isRegistering = ref(false);
const isPwd = ref(true);
const password = ref('');
const email = ref('');
const username = ref('');
// Need to sort out how to set this
const cellr_id = ref(1);

const router = useRouter();

const handleRegisterClick = async () => {
  isRegistering.value = true;
  //validate password and email here
  const userCredential = await registerUser(email.value, password.value);
  // automatically sending user through (no email validation, etc)
  if (userCredential) {
    const newUser: UserData = {
      email: email.value,
      username: username.value,
      cellr_id: cellr_id.value,
    };
    await users.postUser(newUser);
    await fetchAndSetCurrentUser(userCredential.user.email!);
  }
  isRegistering.value = false;

  await router.replace({ name: 'userCellr' });
};
</script>
