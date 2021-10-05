import { createApp } from 'vue';

import App from './App';
import BaseButton from './components/base/BaseButton';
import router from './router';
import store from './store/store';

const app = createApp(App);

app.component('base-button', BaseButton);

app.use(router);
app.use(store);

app.mount('#app');
