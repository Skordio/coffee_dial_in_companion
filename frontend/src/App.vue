<template>
	<b-navbar class="navbar_styling" variant="light" fixed="top">
		<b-navbar-nav>
			<b-nav-item
				><router-link
					style="text-decoration: none"
					:to="{ name: 'home' }"
					>Home</router-link
				></b-nav-item
			>
			<b-nav-item
				><router-link
					style="text-decoration: none"
					:to="{ name: 'about' }"
					>About</router-link
				></b-nav-item
			>
		</b-navbar-nav>

		<b-nav-item-dropdown right>
			<!-- Using 'button-content' slot -->
			<template #button-content>
				<em>User</em>
			</template>
			<template v-if="isAuthenticated">
				<b-dropdown-item>Profile</b-dropdown-item>
				<b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
			</template>
			<template v-if="!isAuthenticated">
				<b-dropdown-item @click="login()">Sign In</b-dropdown-item>
			</template>
		</b-nav-item-dropdown>
	</b-navbar>
	<b-container :fluid="true">
		<b-row>
			<b-col cols="12"
				><div style="visibility: hidden">--------------</div></b-col
			>
			<b-col>
				<router-view></router-view>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAuth0 } from "@auth0/auth0-vue"
import { useRouter } from "vue-router"

export default defineComponent({
	setup() {
		const router = useRouter
		const auth0 = useAuth0()
		const login = () => {
			auth0
				.loginWithPopup()
				.then(() => {
					if (auth0.isAuthenticated) {
						console.log("logged in")
					}
				})
				.catch((error) => {
					console.log("not logged in")
				})
		}
		const logout = () => {
			auth0.logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
			})
		}
		return {
			router,
			user: auth0.user,
			isAuthenticated: auth0.isAuthenticated,
			isLoading: auth0.isLoading,
			login,
			logout,
		}
	},
})
</script>

<style>
@import "./assets/homestyle.css";

.navbar_styling {
	/* height: 40px; */
	margin-left: 0;
	margin-top: 0px;
}
</style>
