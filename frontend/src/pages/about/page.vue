<template>
	<v-container fluid class="h-100 w-100 overflow-y-auto">
		<v-card class="rounded-xl d-flex">
			<v-img
				cover
				content-class="px-3"
				aspect-ratio="4"
				src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				gradient="to bottom, rgba(121,85,72,.8), rgba(121,85,72,.7)"
			>
				<v-row class="d-flex justify-end my-n2">
					<v-col lg="5" cols="12" class="d-flex justify-end">
						<span class="text-h4 text-end font-weight-bold">
							Welcome to Coffee Dial In Companion!
						</span>
					</v-col>
				</v-row>
				<v-row class="d-flex flex-column text-h6 mt-10 mb-2">
					<v-col md="5">
						<v-card :class="textCardBreakClass" variant="tonal">
							I've always been passionate about coffee and
							espresso.
						</v-card>
					</v-col>
					<v-col md="5" class="align-self-end">
						<v-card :class="textCardBreakClass" variant="tonal">
							However, keeping track of the perfect espresso shot
							was quite a hassle.
						</v-card>
					</v-col>
					<v-col md="5">
						<v-card :class="textCardBreakClass" variant="tonal">
							I could use a notebook, but I wanted a digital
							solution that I could access anywhere.
						</v-card>
					</v-col>
					<v-col md="5" class="align-self-end">
						<v-card :class="textCardBreakClass" variant="tonal">
							I found applications for such a task, but many came
							with a monthly fee.
						</v-card>
					</v-col>
					<v-col md="5">
						<v-card :class="textCardBreakClass" variant="tonal">
							So, I decided to make my own open-source application
							to help coffee enthusiasts like me keep track of
							their espresso shots.
						</v-card>
					</v-col>
					<v-col md="5" class="align-self-end">
						<v-card :class="textCardBreakClass" variant="tonal">
							I hope you find this application useful and
							enjoyable. Feel free to contribute and share!
						</v-card>
					</v-col>
				</v-row>
			</v-img>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
import { ref, defineComponent } from "vue"
import { CoffeeApiFactory } from "@/openapi"
import { useDisplay } from "vuetify/lib/framework.mjs"
import { computed } from "vue"
import { watch } from "vue"
import { reactive } from "vue"
import { useTitle } from "@vueuse/core"
import { onMounted } from "vue"

const display = useDisplay()

const title = useTitle()

const message = ref("No data")

watch(
	[display.xs, display.sm, display.md, display.lg, display.xl, display.xxl],
	(newVal) => {
		console.log(newVal)
	}
)

const textCardBreakClass = computed(() => {
	let returnString = "pa-1 pe-3 my-n2 elevation-5 "
	returnString += display.smAndDown.value ? "ps-1 " : ""
	returnString += display.mdAndUp.value ? "rounded-pill " : ""
	returnString += display.md.value ? "px-8 " : ""
	returnString += display.lgAndUp.value ? "px-6 " : ""
	return returnString
})

onMounted(() => {
	title.value = "About"
})
</script>
