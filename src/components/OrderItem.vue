<script setup lang="ts">
import { useStore } from '../store';
import { OrderType } from '../firebase/orders';

const store = useStore();

defineProps<{ order: OrderType }>();
</script>

<template>
	<div class="flex flex-row items-center w-full justify-around py-3">
		<h1>{{ order.type }}</h1>
		<h1>{{ order.name }}</h1>
		<button class="text-green-600" @click="store.changeOrderStatus('completed', order.id)">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
				<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
			</svg>
		</button>
		<button class="text-yellow-500" @click="store.changeOrderStatus('ordered', order.id)">
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current">
				<path
					d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.595-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-4h-2v3h-1v-3h-3v3h-1v-7zm-8-6.339c-.233-.921-1.807-.917-2 0v11.997c.408-.421 1.383-.724 2-.658v-11.339zm9 6.339v3h6v-3h-6z"
				/>
			</svg>
		</button>
		<button class="text-red-500" @click="store.changeOrderStatus('rejected', order.id)">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
				<path
					d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
				/>
			</svg>
		</button>
	</div>
</template>

<style scoped></style>
