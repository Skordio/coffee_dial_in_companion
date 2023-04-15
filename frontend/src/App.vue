<template>
	<b-container>
		<router-view></router-view>
	</b-container>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
import { ref, defineComponent } from "vue"
import { useAuth0 } from "@auth0/auth0-vue"
import { useRouter } from "vue-router"

// const API_URL = 'http://localhost:8000'
// const auth = new AuthService()

export default defineComponent({
	setup() {
		const router = useRouter
		return {
			router,
		}
	},
})
</script>

<style>
@import "./assets/homestyle.css";
</style>
