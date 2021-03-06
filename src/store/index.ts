import { defineStore } from 'pinia';
import { OrderType } from '../firebase/orders';
import { db, firebase } from '../firebase';

const oof = new Audio('https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3');

interface Store {
	verified: boolean;
	password: string;
	orders: {
		ordered: OrderType[];
		ready: OrderType[];
		completed: OrderType[];
		rejected: OrderType[];
		waiting: OrderType[];
	};
}

export const useStore = defineStore('main', {
	state: (): Store => ({
		verified: false,
		password: (import.meta.env.VITE_PASSWORD as string) || '1234',
		orders: {
			ordered: [],
			ready: [],
			completed: [],
			rejected: [],
			waiting: [],
		},
	}),
	actions: {
		async getOrders() {
			db.collection('orders')
				.orderBy('timestamp', 'asc')
				.onSnapshot(async (snapshot) => {
					this.$state.orders = {
						ordered: [],
						ready: [],
						completed: [],
						rejected: [],
						waiting: [],
					};
					if (!snapshot.docs.length) oof.play();

					snapshot.docs
						.map((doc) => doc.data())
						.forEach((doc) => {
							const data = doc as OrderType;

							switch (data.status) {
								case 'ordered':
									this.$state.orders.ordered.push(data);
									break;
								case 'completed':
									this.$state.orders.completed.push(data);
									break;
								case 'rejected':
									this.$state.orders.rejected.push(data);
									break;
								case 'ready':
									this.$state.orders.ready.push(data);
									break;
								case 'waiting':
									this.$state.orders.waiting.push(data);
									break;
							}
						});
				});
		},
		async createOrder(type: OrderType['type'], name: string, preorder: boolean) {
			const order = db.collection('orders').doc();

			order.set({
				id: order.id,
				name,
				status: preorder ? 'waiting' : 'ordered',
				type,
				preorder,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		},

		async changeOrderStatus(type: OrderType['status'], id: string) {
			const order = db.collection('orders').doc(id);

			await order.update({
				status: type,
			});
		},

		async nukeOrders() {
			await db
				.collection('orders')
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						doc.ref.delete();
					});
				});
		},
	},
});
