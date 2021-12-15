import { firebase } from '.';

export interface OrderType {
	id: string;
	name: string;
	status: 'ordered' | 'completed' | 'rejected' | 'ready';
	type: 'lemon' | 'nutella' | 'strawberry';
	preorder: boolean;
	timestamp: firebase.firestore.Timestamp;
}
