import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from '@auth0/auth0-vue';

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
