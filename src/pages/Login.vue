<template>
  <q-card class="text-center" style="max-width: 40vw">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from 'src/global/utility/authFunctions'

const password = ref('')
const email = ref('')
const isPwd = ref(true)
const router = useRouter()

const handleLoginClick = async () => {
  const firebaseResponse = await loginUser(email.value, password.value)
  console.log(firebaseResponse)
  // route user
  await router.replace({ name: 'Splash' })
}
</script>
