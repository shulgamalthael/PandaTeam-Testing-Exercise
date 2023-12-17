import { createApp } from 'vue';
import App from './App.vue';
import store from "./store/store";
import PrimeVue from "primevue/config";
// import { initAxios } from './utils/axios';

// initAxios();

const app = createApp(App);
app.use(store);
app.use(PrimeVue);

app.mount('#app');
