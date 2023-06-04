<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" md="8">
				<v-card color="#795548" class="mx-auto">
					<v-img
						class="white--text align-end"
						height="200px"
						src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						gradient="to bottom, rgba(121,85,72,.8), rgba(121,85,72,.7)"
					>
						<v-card-title
							>Welcome to Coffee Dial In Companion!</v-card-title
						>
					</v-img>

					<v-card-text class="text-white">
						<p>
							I've always been passionate about coffee and
							espresso. However, keeping track of the perfect
							espresso shot was quite a hassle. Using a notebook
							was an option, but I thought, why not make this
							experience digital, convenient, and open to
							everyone?
						</p>
						<p>
							I found that there were applications offering such
							functionality but they came with a monthly fee. So,
							I decided to make my own open-source application to
							help coffee enthusiasts like me keep track of their
							espresso shots.
						</p>
						<p>
							I hope you find this application useful and
							enjoyable. Feel free to contribute and share!
						</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
import { CoffeeApiFactory } from "@/openapi"

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
