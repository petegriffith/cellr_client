<template>
  <q-card class="text-center" style="max-width: 30vw">
    <q-card-section>
      <div class="text-h6">{{$t('splashWelcome')}}</div>
      <p>{{$t('splashWarning')}}</p>
    </q-card-section>
    <q-separator dark></q-separator>
    <q-card-actions align="center">
      <q-btn flat to="/Login">{{$t('login')}}</q-btn>
      <q-btn flat to="/Register">{{$t('register')}}</q-btn>
      <q-separator dark></q-separator>
      <q-btn flat color="teal" @click="checkUserHandler">{{$t('checkUser')}}</q-btn>
      <q-btn flat color="red" @click="logoutUserHandler">{{$t('logout')}}</q-btn>
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