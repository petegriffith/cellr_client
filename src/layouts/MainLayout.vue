<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> cellr. </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Wine Drawer </q-item-label>

        <DrawerLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerLink from 'components/DrawerLink.vue';
import { ref } from 'vue';
const leftDrawerOpen = ref(false);

const linksList = [
  {
    title: 'AllWines?',
    caption: 'All Wines in your cellr',
    icon: 'wine_bar',
    link: '#',
  },
  {
    title: 'Recent Encounters',
    caption: 'A list of your most recent encounters',
    icon: 'list_alt',
    link: '#',
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>
