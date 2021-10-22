<template>
    <div>Here are your encounters for wine {{wineState.currentWineId}}</div>
</template>

<script setup lang="ts">
import { AccessWineStore } from 'src/global/store/wineStore';

const wineState = AccessWineStore()
</script>