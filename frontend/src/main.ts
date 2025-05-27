import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';


import './style.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   
import 'primeflex/primeflex.css';



const app = createApp(App);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    locale: {
        accept: 'Aceitar',
        reject: 'Recusar',

    },
    ripple: true 
});
app.directive('tooltip', Tooltip);
app.mount('#app');