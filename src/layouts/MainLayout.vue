<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> cellr. </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
import { ref } from 'vue';
import { setAllWines } from '../global/store/setters';
const isLoading = ref(false);
const leftDrawerOpen = ref(false);

/* const setStores = async () => {
  await setAllWines();
};

setStores().then(
  () => {
    isLoading.value = false;
  },
  (error) => {
    return error;
  }
); */

const linksList = [
  {
    title: 'AllWines?',
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
  
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
