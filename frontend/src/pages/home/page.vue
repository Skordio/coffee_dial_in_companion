<template>
	<div class="flex-container-vert">
		<div>
			<b-row v-if="isAuthenticated">
				<b-col cols="12">
					<p style="font-size: xx-large">YOU ARE LOGGED IN NICE</p>
				</b-col>
				<b-col>
					<button
						class="big-button-style"
						v-if="isAuthenticated"
						@click="getListCofPull()"
					>
						Get Coffee Pulls
					</button>
				</b-col>
				<b-col>
					{{ message }}
				</b-col>
			</b-row>
			<b-row v-else>
				<b-col>
					<p style="font-size: xx-large">YOU ARE NOT LOGGED IN</p>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
import { useAuth0 } from "@auth0/auth0-vue"
import cofpullapi from "@/api/cofpull"

export default defineComponent({
	components: {},
	props: {},
	setup(props) {
		const auth0 = useAuth0()
		const message = ref("No data")

		const getListCofPull = () => {
			cofpullapi.list().then((response: any) => {
				message.value = response
			})
		}
		return {
			user: auth0.user,
			isAuthenticated: auth0.isAuthenticated,
			isLoading: auth0.isLoading,
			message,
			getListCofPull,
		}
	},
})
</script>

<style>
@import "../../assets/homestyle.css";

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
