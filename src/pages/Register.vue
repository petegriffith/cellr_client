<template>
  <q-card class="text-center" style="max-width: 40vw">
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
        <p>NOTE: for now you will be registered into cellr {{cellr_id}}. Don't worry about it.</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { registerUser } from 'src/global/utility/authFunctions';
import { users } from 'src/global/apicalls';
import { UserData } from 'src/typescript/adminTypes';

const isPwd = ref(true)
const password = ref('')
const email = ref('')
const username = ref('')
// Need to sort out how to set this
const cellr_id = ref(1)

const handleRegisterClick = async () => {
    //validate password and email here
    const firebaseRes= await registerUser(email.value, password.value)
    // automatically sending user through (no email validation, etc)
    if (firebaseRes.user) {
        const newUser: UserData = {
            email: email.value,
            username: username.value,
            cellr_id: cellr_id.value
        }
        console.log(newUser)
        await users.postUser(newUser)
    }
}
</script>
