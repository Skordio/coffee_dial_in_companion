<template>
	<div class="flex-container-vert">
		<div v-if="isAuthenticated">
			<p style="font-size: xx-large">YOU ARE LOGGED IN NICE</p>
		</div>
		<div class="flex-container">
			<button
				class="big-button-style"
				v-if="!isAuthenticated"
				@click="login()"
			>
				Log In
			</button>

			<button
				class="big-button-style"
				v-if="isAuthenticated"
				@click="logout()"
			>
				Log Out
			</button>
			{{ message }}
			<br />
		</div>
		<div class="flex-container">
			<button
				class="big-button-style"
				v-if="isAuthenticated"
				@click="getListCofPull()"
			>
				Get Coffee Pulls
			</button>
			<br />
		</div>
	</div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"
import { ref, defineComponent } from "vue"
// import AuthService from './auth/AuthService'
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-vue"
import cofpullapi from "./api/cofpull"

// const API_URL = 'http://localhost:8000'
// const auth = new AuthService()

export default defineComponent({
	components: {},
	props: {},
	setup(props) {
		const auth0 = useAuth0()
		const message = ref("")

		// let login = () => 					{auth.login()}
		// let handleAuthentication = () => 	{auth.handleAuthentication()}
		// let logout = () => 					{auth.logout()}

		const login = () => {
			auth0.loginWithRedirect()
		}

		const logout = () => {
			auth0.logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
			})
		}

		const getListCofPull = () => {
			cofpullapi
				.list()
				.then((response: any) => {
					console.log(response.data)
				})
				.catch((e: any) => {
					console.log(e)
				})
		}
		// let privateMessage = () => {
		// 	const url = `${API_URL}/api/private/`
		// 	return axios.get(url, {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}}).then((response) => {
		// 		console.log(response.data)
		// 		message.valueOf = response.data || ''
		// 	})
		// }

		// auth.authNotifier.on('authChange', authState => {
		// 	authenticated.value = authState.authenticated
		// })

		return {
			user: auth0.user,
			isAuthenticated: auth0.isAuthenticated,
			isLoading: auth0.isLoading,
			message,
			login,
			logout,
			getListCofPull
		}
	},
})
</script>

<style>
@import "./assets/homestyle.css";

.flex-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-content: center;
}
.flex-container-vert {
	display: flex;
	flex-flow: column nowrap;
	justify-self: center;
	align-self: center;
	align-content: center;
	justify-content: center;
}
.big-button-style {
	font-size: xx-large;
}
</style>
