import { createApp } from 'vue';

import App from './App';
import BaseButton from './components/base/BaseButton';
import BaseCard from './components/base/BaseCard';
import BaseBadge from './components/base/BaseBadge';
import BaseSpinner from './components/base/BaseSpinner';
import router from './router';
import store from './store/store';

const app = createApp(App);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.use(router);
app.use(store);

app.mount('#app');
