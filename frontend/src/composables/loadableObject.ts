import type { AxiosPromise } from "axios"
import { ref, reactive, readonly } from "vue"
import type { DeepReadonly } from "vue"
/**
 * ex:
 * const p = ProfileResource
 * const newProfile = useLoadableObject<Employee, typeof p.getProfile>(() => p.getProfile())
 */
interface LoadableObject<T, F extends (...args: any[]) => AxiosPromise<T>> {
	value: DeepReadonly<T | undefined>
	loading: Readonly<boolean>
	downdloadedAtLeastOnce: Readonly<boolean>
	reloadObject: (...args: Parameters<F>) => Promise<LoadableObject<T, F>>
	clearObject: () => void
}

export function useLoadableObject<
	T,
	F extends (...args: any[]) => AxiosPromise<T>
>(list_endpoint: F): LoadableObject<T, F> {
	const downdloadedAtLeastOnce = ref<boolean>(false)

	const loading = ref<boolean>(false)
	const startLoad = () => {
		loading.value = true
	}
	const stopLoad = () => {
		loading.value = false
	}

	const object = ref<T>()
	object.value = Object as T

	const reloadObject = async (...args: Parameters<F> | []) => {
		startLoad()
		object.value = (await list_endpoint(...args)).data
		downdloadedAtLeastOnce.value = true
		stopLoad()
		return returnObject
	}
	const clearObject = () => {
		object.value = Object as T
		return returnObject
	}

	const returnObject: LoadableObject<T, F> = reactive({
		value: readonly(object),
		loading: readonly(loading),
		downdloadedAtLeastOnce: readonly(downdloadedAtLeastOnce),
		reloadObject,
		clearObject,
	})
	return returnObject
}
