<script setup lang="ts">
import { useStore } from '../store';
import { reactive } from 'vue';

import OrderItem from './OrderItem.vue';
const store = useStore();

interface Local {
	order: {
		type: 'lemon' | 'nutella' | 'strawberry';
		name: '';
	};
}
const local = reactive<Local>({
	order: {
		type: 'nutella',
		name: '',
	},
});

async function submitOrder() {
	if (!local.order.type || !local.order.name) return;
	await store.createOrder(local.order.type, local.order.name);
	local.order.type = 'nutella';
	local.order.name = '';
}
</script>

<template>
	<div id="main" class="flex flex-row justify-center w-full">
		<div>
			<h1 class="text-3xl font-semibold">New Order</h1>

			<div class="flex flex-row mt-4 justify-center w-full">
				<div>
					<button class="mx-1 bg-yellow-300 px-5 rounded-lg text-lg font-semibold py-2" @click="local.order.type = 'lemon'">Lemon</button>
				</div>
				<div>
					<button class="mx-1 bg-red-900 text-light-100 px-5 rounded-lg text-lg font-semibold py-2" @click="local.order.type = 'nutella'"
						>Nutella</button
					>
				</div>
				<div>
					<button class="mx-1 bg-red-400 px-5 rounded-lg text-lg font-semibold py-2" @click="local.order.type = 'strawberry'"
						>Nut + Straw</button
					>
				</div>
			</div>
			<p>{{ local.order.type }}</p>
			<input type="text" placeholder="name" class="mt-2 outline-solid-gray-500 rouned-sm" v-model="local.order.name" />
			<button class="ml-3 mt-4 bg-green-400 px-5 rounded-lg text-lg font-semibold py-1" @click="submitOrder">submit</button>

			<div v-if="store.$state.orders.ordered.length" class="w-full">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Ordered</h2>
				<OrderItem v-for="order in store.$state.orders.ordered" :order="order" />
			</div>
			<div v-if="store.$state.orders.completed.length" class="w-full">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Completed</h2>
				<OrderItem v-for="order in store.$state.orders.completed" :order="order" />
			</div>
			<div v-if="store.$state.orders.rejected.length" class="w-full">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Rejected</h2>
				<OrderItem v-for="order in store.$state.orders.rejected" :order="order" />
			</div>
		</div>
	</div>
</template>

<style scoped>
#main {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
