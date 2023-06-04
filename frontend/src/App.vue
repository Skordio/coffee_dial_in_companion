<template>
	<v-app dark>
		<v-navigation-drawer expand-on-hover rail>
			<v-list density="compact" nav>
				<v-list-item
					:to="{ name: 'home' }"
					prepend-icon="home-circle"
					title="Home"
					value="home"
				></v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
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
