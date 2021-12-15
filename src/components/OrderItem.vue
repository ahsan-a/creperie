<script setup lang="ts">
import { useStore } from '../store';
import { OrderType } from '../firebase/orders';

const store = useStore();

const props = defineProps<{ order: OrderType }>();

const getTimestamp = () => (!props.order.timestamp ? new Date().toISOString() : props.order.timestamp.toDate());
</script>

<template>
	<div class="grid grid-cols-6 grid-rows-5 rounded-lg auto-rows-min my-5">
		<div
			class="col-span-2 rounded-tl-lg py-2 font-bold border"
			:class="{
				'bg-yellow-300': order.status === 'ordered',
				'border-yellow-400 ': order.status === 'ordered',
				'bg-green-500': order.status === 'completed',
				'border-green-600 ': order.status === 'completed',
				'bg-red-400': order.status === 'rejected',
				'border-red-500 ': order.status === 'rejected',
				'bg-emerald-300': order.status === 'ready',
				'border-green-400 ': order.status === 'ready',
			}"
			>Type</div
		>
		<div class="col-span-4 py-2 border-gray-300 border rounded-tr-lg">{{ order.type }}</div>
		<div
			class="col-span-2 py-2 font-bold border"
			:class="{
				'bg-yellow-300': order.status === 'ordered',
				'border-yellow-400 ': order.status === 'ordered',
				'bg-green-500': order.status === 'completed',
				'border-green-600 ': order.status === 'completed',
				'bg-red-400': order.status === 'rejected',
				'border-red-500 ': order.status === 'rejected',
				'bg-emerald-300': order.status === 'ready',
				'border-green-400 ': order.status === 'ready',
			}"
			>Name</div
		>
		<div class="col-span-4 py-2 border-gray-300 border">{{ order.name }}</div>
		<div
			class="col-span-2 py-2 font-bold border"
			:class="{
				'bg-yellow-300': order.status === 'ordered',
				'border-yellow-400 ': order.status === 'ordered',
				'bg-green-500': order.status === 'completed',
				'border-green-600 ': order.status === 'completed',
				'bg-red-400': order.status === 'rejected',
				'border-red-500 ': order.status === 'rejected',
				'bg-emerald-300': order.status === 'ready',
				'border-green-400 ': order.status === 'ready',
			}"
			>Pre-Order?</div
		>
		<div class="col-span-4 py-2 border-gray-300 border">{{ order.preorder }}</div>
		<div
			class="col-span-2 py-2 font-bold border"
			:class="{
				'bg-yellow-300': order.status === 'ordered',
				'border-yellow-400 ': order.status === 'ordered',
				'bg-green-500': order.status === 'completed',
				'border-green-600 ': order.status === 'completed',
				'bg-red-400': order.status === 'rejected',
				'border-red-500 ': order.status === 'rejected',
				'bg-emerald-300': order.status === 'ready',
				'border-green-400 ': order.status === 'ready',
			}"
			>Time Ago</div
		>
		<div class="col-span-4 py-2 border-gray-300 border"><timeago :autoUpdate="5" :datetime="getTimestamp()" /></div>
		<div
			class="col-span-2 rounded-bl-lg py-2 font-bold border"
			:class="{
				'bg-yellow-300': order.status === 'ordered',
				'border-yellow-400 ': order.status === 'ordered',
				'bg-green-500': order.status === 'completed',
				'border-green-600 ': order.status === 'completed',
				'bg-red-400': order.status === 'rejected',
				'border-red-500 ': order.status === 'rejected',
				'bg-emerald-300': order.status === 'ready',
				'border-green-400 ': order.status === 'ready',
			}"
			>Actions</div
		>
		<div class="col-span-4 py-2 border-gray-300 border flex flex-row justify-around rounded-br-lg">
			<button class="text-green-600" @click="store.changeOrderStatus('completed', order.id)">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current h-6 w-6">
					<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
				</svg>
			</button>
			<button class="text-emerald-400" @click="store.changeOrderStatus('ready', order.id)">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current h-6 w-6">
					<path
						d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"
					/>
				</svg>
			</button>
			<button class="text-yellow-500" @click="store.changeOrderStatus('ordered', order.id)">
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current h-6 w-6">
					<path
						d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.595-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-4h-2v3h-1v-3h-3v3h-1v-7zm-8-6.339c-.233-.921-1.807-.917-2 0v11.997c.408-.421 1.383-.724 2-.658v-11.339zm9 6.339v3h6v-3h-6z"
					/>
				</svg>
			</button>
			<button class="text-red-500" @click="store.changeOrderStatus('rejected', order.id)">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current h-6 w-6">
					<path
						d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- <div class="flex flex-row items-center w-full justify-around py-2">
		<h1 class="text-sm">{{ order.type }}</h1>
		<h1 class="text-sm">{{ order.name }}</h1>
		<button class="text-green-600" @click="store.changeOrderStatus('completed', order.id)" v-if="order.status !== 'completed'">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current h-6 w-6">
				<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
			</svg>
		</button>
		<button class="text-yellow-500" @click="store.changeOrderStatus('ordered', order.id)" v-if="order.status !== 'ordered'">
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current h-6 w-6">
				<path
					d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.595-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-4h-2v3h-1v-3h-3v3h-1v-7zm-8-6.339c-.233-.921-1.807-.917-2 0v11.997c.408-.421 1.383-.724 2-.658v-11.339zm9 6.339v3h6v-3h-6z"
				/>
			</svg>
		</button>
		<button class="text-red-500" @click="store.changeOrderStatus('rejected', order.id)" v-if="order.status !== 'rejected'">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current h-6 w-6">
				<path
					d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
				/>
			</svg>
		</button>
	</div> -->
</template>

<style scoped></style>
