import { createApp } from "vue"
import App from "./App.vue"
import BootstrapVueNext from "bootstrap-vue-next"
import { createPinia } from "pinia"
import { createWebHashHistory, createRouter } from "vue-router"
import type { RouterOptions } from "vue-router"

import "./assets/main.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"

// Router
const routes = (await import("./routes")).default as RouterOptions["routes"]
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes: routes,
})

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
	components,
	directives,
})

const app = createApp(App)
const pinia = createPinia()

// app.use(BootstrapVueNext)
app.use(pinia)
app.use(router)
app.use(vuetify)

// app.use(
// 	createAuth0({
// 		domain: "dev-0rhw0i4lr3uasosb.us.auth0.com",
// 		clientId: "NhHd68XyPUcvORzEGsAWCVXwDEjOtkRf",
// 		authorizationParams: {
// 			redirect_uri: window.location.origin,
// 		},
// 	})
// )

app.mount("#app")
