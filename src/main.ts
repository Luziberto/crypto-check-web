import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import './index.css'
import router from "./router";
import Alert from '@/components/global/Alert.vue';

const app = createApp(App);

app.use(router);
app.component('AlertPopup', Alert );

app.mount('#app')


