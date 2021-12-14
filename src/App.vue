<script setup lang="ts">
import Main from './components/Main.vue';
import Unverified from './components/Unverified.vue';
import { useStore } from './store';
const store = useStore();
store.getOrders();
</script>

<template>
	<Unverified v-if="!store.$state.verified" />
	<Main v-else />
</template>

<style></style>
