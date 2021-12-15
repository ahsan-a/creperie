<script setup lang="ts">
import { useStore } from '../store';
import { ref } from 'vue';
const store = useStore();

const input = ref('');
function submitPasssword() {
	if (input.value === store.$state.password) store.$state.verified = true;
}
</script>

<template>
	<div id="unverified">
		<h1 class="text-2xl font-bold">Enter the password:</h1>
		<input v-model="input" type="password" class="bg-white mt-4" />
		<button class="ml-4 bg-green-400 px-4 py-2 font-semibold rounded-md border-dark-100" @click="submitPasssword">Submit</button>
	</div>
</template>

<style scoped>
#unverified {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
