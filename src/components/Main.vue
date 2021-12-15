<script setup lang="ts">
import { useStore } from '../store';
import { reactive } from 'vue';

import OrderItem from './OrderItem.vue';
const store = useStore();

interface Local {
	order: {
		type: 'lemon' | 'nutella' | 'strawberry';
		name: string;
		preorder: boolean;
	};
}
const local = reactive<Local>({
	order: {
		type: 'nutella',
		name: '',
		preorder: false,
	},
});

async function submitOrder() {
	if (!local.order.type || !local.order.name) return;
	await store.createOrder(local.order.type, local.order.name, local.order.preorder);
	local.order.type = 'nutella';
	local.order.name = '';
}
</script>

<template>
	<div id="main" class="w-full">
		<div class="w-full">
			<h1 class="text-3xl font-semibold">La Creperie de Noel</h1>

			<div class="flex flex-row mt-4 justify-center w-full">
				<div>
					<button
						class="mx-1 bg-yellow-300 px-2 rounded-lg text-lg font-semibold py-1 border-black"
						:class="{ 'border-2': local.order.type === 'lemon' }"
						@click="local.order.type = 'lemon'"
						>Lemon</button
					>
				</div>
				<div>
					<button
						class="border-black mx-1 bg-red-900 text-light-100 px-2 rounded-lg text-lg font-semibold py-1"
						:class="{ 'border-2': local.order.type === 'nutella' }"
						@click="local.order.type = 'nutella'"
						>Nutella</button
					>
				</div>
				<div>
					<button
						class="mx-1 bg-red-400 px-2 rounded-lg text-lg font-semibold py-1 border-black"
						:class="{ 'border-2': local.order.type === 'strawberry' }"
						@click="local.order.type = 'strawberry'"
						>Nut + Straw</button
					>
				</div>
			</div>
			<div class="mt-2 flex flex-row items-center justify-center">
				Pre-Order? <input type="checkbox" class="ml-3" v-model="local.order.preorder" />
			</div>
			<input type="text" placeholder="name" class="mt-4 outline-solid-gray-500 rounded-sm" v-model="local.order.name" />
			<button class="ml-3 mt-1 bg-green-400 px-5 rounded-lg text-lg font-semibold py-1" @click="submitOrder">submit</button>

			<div v-if="store.$state.orders.ready.length" class="w-full lg:w-1/2 xl:w-3/8 mx-auto">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Ready</h2>
				<OrderItem v-for="order in store.$state.orders.ready" :order="order" />
			</div>
			<div v-if="store.$state.orders.ordered.length" class="w-full lg:w-1/2 xl:w-3/8 mx-auto">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Ordered</h2>
				<OrderItem v-for="order in store.$state.orders.ordered" :order="order" />
			</div>
			<div v-if="store.$state.orders.completed.length" class="w-full lg:w-1/2 xl:w-3/8 mx-auto">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Completed</h2>
				<OrderItem v-for="order in store.$state.orders.completed" :order="order" />
			</div>
			<div v-if="store.$state.orders.rejected.length" class="w-full lg:w-1/2 xl:w-3/8 mx-auto">
				<h2 class="text-2xl font-semibold mt-4 mb-1">Rejected</h2>
				<OrderItem v-for="order in store.$state.orders.rejected" :order="order" />
			</div>

			<div>
				<button class="mx-1 mt-75 bg-red-500 px-5 rounded-lg text-lg font-semibold py-2" @click="store.nukeOrders">NUKE ALL</button>
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
	margin-top: 40px;
}
</style>
