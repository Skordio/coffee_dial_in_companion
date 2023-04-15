import { createApp, h } from "vue"
import App from "./App.vue"
import BootstrapVueNext from "bootstrap-vue-next"
import { createAuth0 } from "@auth0/auth0-vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"
import router from "./router"

import "./assets/main.css"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"
import "bootstrap/dist/css/bootstrap.css"

const app = createApp(App)
const pinia = createPinia()

app.use(BootstrapVueNext)
app.use(pinia)
app.use(router)

app.use(
	createAuth0({
		domain: "dev-0rhw0i4lr3uasosb.us.auth0.com",
		clientId: "NhHd68XyPUcvORzEGsAWCVXwDEjOtkRf",
		authorizationParams: {
			redirect_uri: window.location.origin,
		},
	})
)

app.mount("#app")
