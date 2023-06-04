import type { AxiosPromise } from "axios"
import { ref, reactive, readonly, type DeepReadonly, type Ref } from "vue"

interface LoadableObject<T, F extends (...args: unknown[]) => AxiosPromise<T>> {
	value: DeepReadonly<T | undefined>
	loading: Readonly<boolean>
	downloadedAtLeastOnce: Readonly<boolean>
	reload: (...args: Parameters<F>) => Promise<LoadableObject<T, F>>
	clearObject: () => LoadableObject<T, F>
}

export function useLoadableObject<T>(
	listEndpoint: (...args: unknown[]) => AxiosPromise<T>,
	inital_value: T = Object as T
): LoadableObject<T, typeof listEndpoint> {
	const downloadedAtLeastOnce = ref<boolean>(false)

	const loading = ref<boolean>(false)
	const startLoad = () => {
		loading.value = true
	}
	const stopLoad = () => {
		loading.value = false
	}

	const object = ref<T>(inital_value) as Ref<T>

	const reload = (...args: Parameters<typeof listEndpoint> | []) => {
		startLoad()
		return listEndpoint(...args).then((response) => {
			object.value = response.data
			downloadedAtLeastOnce.value = true
			stopLoad()
			return returnObject
		})
	}
	const clearObject = () => {
		object.value = Object as T
		return returnObject
	}

	const returnObject: LoadableObject<T, typeof listEndpoint> = reactive({
		value: readonly(object),
		loading: readonly(loading),
		downloadedAtLeastOnce: readonly(downloadedAtLeastOnce),
		reload,
		clearObject,
	})

	return returnObject
}
