import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './firebase';
import 'virtual:windi.css';

// @ts-ignore
import timeago from 'vue-timeago3';

createApp(App)
	.use(createPinia())
	.use(timeago, { converterOptions: { includeSeconds: true } })
	.mount('#app');
