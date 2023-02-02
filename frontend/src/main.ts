import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createAuth0 } from "@auth0/auth0-vue"

import "./assets/main.css"

const app = createApp(App)

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
