import { createApp, h } from "vue"
import App from "./App.vue"
import BootstrapVueNext from "bootstrap-vue-next"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"
import { createAuth0 } from "@auth0/auth0-vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"

// page imports
import Home from "./pages/home/page.vue"

import "./assets/main.css"

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "",
			name: "Home",
			component: Home,
		},
		{
			path: "/about/:id",
			name: "About",
			component: {
				name: "About",
				props: { id: [Number, String] },
				render() {
					return h("h1", {}, `About page ${this.props.id}`)
				},
			},
			props: true,
		},
	],
})

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
