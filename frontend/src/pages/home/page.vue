<template></template>

<script lang="ts">
import { ref, defineComponent } from "vue"

export default defineComponent({
	components: {},
	props: {},
	setup(props) {
		const message = ref("No data")
		return {
			message,
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
