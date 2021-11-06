<template>
  <q-layout class="bg-primary">
    <q-toolbar>
      <LocaleSwitcher />
    </q-toolbar>
    <q-page-container>
      <q-page class="fit row justify-center items-center">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LocaleSwitcher from 'src/components/LocaleSwitcher.vue';
</script>