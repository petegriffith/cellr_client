<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> cellr. </q-toolbar-title>

        <q-btn flat round dense icon="person_search" @click="checkUserHandler">{{ $t('checkUser') }}</q-btn>
        <q-btn flat round dense icon="logout" @click="logoutUserHandler">{{ $t('logout') }} </q-btn>
        <LocaleSwitcher />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Wine Drawer </q-item-label>

        <DrawerLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
    <q-page-container v-if="isLoading"> App Loading... </q-page-container>
    <q-page-container v-else>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerLink from 'components/DrawerLink.vue';
import LocaleSwitcher from 'src/components/LocaleSwitcher.vue';
import { ref, onBeforeMount } from 'vue';
import { fetchAndSetAllWines, fetchAndSetCurrentCellr, resetCurrentUser } from 'src/global/store/setters';
import { getCurrentUser } from 'src/global/store/getters';
import { checkFirebaseUser, logoutUser } from 'src/global/utility/authFunctions';
/* import { useRouter } from 'vue-router'; */

const isLoading = ref(true);
const leftDrawerOpen = ref(false);

const setStores = async () => {
  try {
    const currentUser = getCurrentUser();
    console.log('currentUser test:', currentUser);
    await fetchAndSetCurrentCellr(currentUser.cellr_id);
    console.log('setting wines');
    const test = await fetchAndSetAllWines(currentUser.cellr_id);
    console.log('fetch and set wines test:', test)
  } catch (err) {
    throw err;
  }
};

onBeforeMount(async () => {
  console.log('logging in...');
  await setStores();
  isLoading.value = false;
});

const linksList = [
  {
    title: 'AllWines',
    caption: 'All of the wines in your cellr',
    icon: 'wine_bar',
    link: '/WineList',
  },
  {
    title: 'Recent Encounters',
    caption: 'A list of your most recent encounters',
    icon: 'list_alt',
    link: '#',
  },
  {
    title: 'Add a Wine',
    caption: 'Add a new wine to your cellr',
    icon: 'wine_bar',
    link: '/AddWine',
  },
  {
    title: 'Add an Encounter',
    caption: 'Add a new encounter to one of your wines',
    icon: 'wine_bar',
    link: '/AddEncounter',
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const checkUserHandler = () => {
  const firebaseUserData = checkFirebaseUser();
  const localUserData = getCurrentUser();
  console.log('firebase:', firebaseUserData.currentUser);
  console.log('local:', localUserData);
};

const logoutUserHandler = async () => {
  await logoutUser();
  resetCurrentUser();
  /* const router = useRouter();
  await router.replace({ name: 'PreAuth Layout' }); */
};
</script>
