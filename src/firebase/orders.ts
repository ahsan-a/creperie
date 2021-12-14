import { firebase } from '.';

export interface OrderType {
	id: string;
	name: string;
	status: 'ordered' | 'completed' | 'rejected';
	type: 'lemon' | 'nutella' | 'strawberry';
	timestamp: firebase.firestore.Timestamp;
}
