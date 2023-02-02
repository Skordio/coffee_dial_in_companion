<template>
	<!-- <header>
		<img
			alt="Vue logo"
			class="logo"
			src="@/assets/logo.svg"
			width="125"
			height="125"
		/>

		<div class="wrapper">
		<HelloWorld msg="You did it!" />

		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
		</div>
	</header>

	<RouterView /> -->

	<div class="flex-container-vert">
		<div>
			<p v-if="isAuthenticated" style="font-size: xx-large">
				YOU ARE LOGGED IN NICE
			</p>
		</div>
		<div style="height: 10em"></div>
		<div class="flex-container">
			<button
				class="big-button-style"
				v-if="!isAuthenticated"
				@click="login()"
			>
				Log In
			</button>

			<!-- <button
				class="btn btn-primary btn-margin"
				
				@click="privateMessage()">
				Call Private
			</button> -->
			<!-- class="btn btn-primary btn-margin" -->
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
	</div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"
import { ref, defineComponent } from "vue"
// import AuthService from './auth/AuthService'
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-vue"

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

		let login = () => {
			auth0.loginWithRedirect()
		}

		let logout = () => {
			auth0.logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
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
