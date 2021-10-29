<template>
  <q-card class="text-center" style="max-width: 30vw">
    <q-card-section>
      <div class="text-h6">Welcome to Cellr!</div>
      <p>In the future, there will be an about page. For now, contact Peter for questions.</p>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-actions align="center">
      <q-btn flat to="/Login">Login</q-btn>
      <q-btn flat to="/Register">Register</q-btn>
      <q-separator dark></q-separator>
      <q-btn flat color="teal" @click="checkUserHandler">Check User</q-btn>
      <q-btn flat color="red" @click="logoutUserHandler">Logout User</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { checkFirebaseUser, logoutUser } from 'src/global/utility/authFunctions';
import { getCurrentUser } from 'src/global/store/getters';
import { resetCurrentUser } from 'src/global/store/setters';

const checkUserHandler = () => {
  const firebaseUserData = checkFirebaseUser()
  const localUserData = getCurrentUser()
  console.log('firebase:', firebaseUserData.currentUser)
  console.log('local:', localUserData)
}

const logoutUserHandler = async () => {
  await logoutUser()
  resetCurrentUser()
}
</script>