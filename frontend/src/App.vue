<template>
	<v-card>
		<v-layout>
			<v-navigation-drawer expand-on-hover rail>
				<v-list>
					<v-list-item
						prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
						title="Sandra Adams"
						subtitle="sandra_a88@gmailcom"
					></v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list density="compact" nav>
					<v-list-item
						prepend-icon="mdi-folder"
						title="My Files"
						value="myfiles"
					></v-list-item>
					<v-list-item
						prepend-icon="mdi-account-multiple"
						title="Shared with me"
						value="shared"
					></v-list-item>
					<v-list-item
						prepend-icon="mdi-star"
						title="Starred"
						value="starred"
					></v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-main style="height: 250px"></v-main>
		</v-layout>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
	setup() {
		const router = useRouter()

		return {
			router,
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
