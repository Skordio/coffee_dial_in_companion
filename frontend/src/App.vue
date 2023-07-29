<template>
	<v-app>
		<v-layout>
			<v-app-bar>
				<template #prepend>
					<v-app-bar-nav-icon
						icon="fa-solid fa-bars"
						@click.stop="showingDrawer = !showingDrawer"
					></v-app-bar-nav-icon>
				</template>
				<v-app-bar-title class="text-h5"
					>Coffee Dial in Companion</v-app-bar-title
				>
				<template #append>
					<v-btn icon="fa-solid fa-ellipsis-vertical"></v-btn>
				</template>
			</v-app-bar>
			<v-navigation-drawer expand-on-hover rail v-model="showingDrawer">
				<v-list density="compact" nav>
					<v-list-item
						:to="{ name: 'home' }"
						prepend-icon="fa-solid fa-house"
						title="Home"
						value="home"
					></v-list-item>
				</v-list>
			</v-navigation-drawer>
			<v-main class="h-screen">
				<router-view />
			</v-main>
		</v-layout>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const showingDrawer = ref(true)
</script>

<style>
@import "https://use.fontawesome.com/releases/v6.4.0/css/all.css";
</style>

<style lang="sass">
@import './assets/native.sass'
</style>
