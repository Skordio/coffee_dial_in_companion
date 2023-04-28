<template>
	<div class="flex-container-vert">
		<div>
			<b-row>
				<b-col>
					<button class="big-button-style" @click="getListCofPull()">
						Get Coffee Pulls
					</button>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
import cofpullapi from "@/api/cofpull"

export default defineComponent({
	components: {},
	props: {},
	setup(props) {
		const message = ref("No data")

		const getListCofPull = () => {
			cofpullapi.list().then((response: any) => {
				message.value = response
			})
		}
		return {
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
