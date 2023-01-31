
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

	<div class="login-buttons-container">
		<button
			class="btn btn-primary btn-margin"
			v-if="!authenticated"
			@click="login()">
			Log In
		</button>

		<button
			class="btn btn-primary btn-margin"
			
			@click="privateMessage()">
			Call Private
		</button>

		<button
			class="btn btn-primary btn-margin"
			
			@click="logout()">
			Log Out
		</button>
		{{message}}
		<br>
	</div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
    import { ref, defineComponent } from 'vue'
import AuthService from './auth/AuthService'
import axios from 'axios'


const API_URL = 'http://localhost:8000'
const auth = new AuthService()

export default defineComponent({
        components: {
        },
        props: {
        },
        setup(props) {
			const message = ref('')
			const authenticated = ref(false);

			let login = () => 					{auth.login()}
			let handleAuthentication = () => 	{auth.handleAuthentication()}
			let logout = () => 					{auth.logout()}

			let privateMessage = () => {
				const url = `${API_URL}/api/private/`
				return axios.get(url, {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}}).then((response) => {
					console.log(response.data)
					message.valueOf = response.data || ''
				})
			}

			auth.authNotifier.on('authChange', authState => {
				authenticated.value = authState.authenticated
			})
            return {
				authenticated,
				message,
				login,
				logout,
				handleAuthentication,
				privateMessage

            }
        }
})



</script>

<style>
@import './assets/homestyle.css';

	.login-buttons-container {
		display: flex;
		flex-flow: row nowrap;
	}
</style>