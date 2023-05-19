<template>
	<v-card>
		<v-layout>
			<v-navigation-drawer expand-on-hover rail>
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

			<v-main style="height: 250px">
				<router-view></router-view>
			</v-main>
		</v-layout>
	</v-card>
</template>

<script setup lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<style>
@import "./assets/homestyle.css";

.navbar_styling {
	/* height: 40px; */
	margin-left: 0;
	margin-top: 0px;
}
</style>
