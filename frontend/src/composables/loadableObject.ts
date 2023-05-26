import { AxiosPromise } from "axios"
import { Ref, ref, reactive, readonly, DeepReadonly } from "vue"
/**
 * ex:
 * const p = ProfileResource
 * const newProfile = useLoadableObject<Employee, typeof p.getProfile>(() => p.getProfile())
 */
interface LoadableObject<T, F extends (...args: any[]) => AxiosPromise<T>> {
	value: DeepReadonly<T | undefined>
	loading: Readonly<boolean>
	downloadedAtLeastOnce: Readonly<boolean>
	reloadPromise: (...args: Parameters<F>) => Promise<LoadableObject<T, F>>
	clearObject: () => LoadableObject<T, F>
	reload: (...args: Parameters<F>) => LoadableObject<T, F>
}

export function useLoadableObject<
	T,
	F extends (...args: any[]) => AxiosPromise<T>
>(list_endpoint: F, inital_value: T = Object as T): LoadableObject<T, F> {
	const downloadedAtLeastOnce = ref<boolean>(false)

	const loading = ref<boolean>(false)
	const startLoad = () => {
		loading.value = true
	}
	const stopLoad = () => {
		loading.value = false
	}

	const object = ref<T>(inital_value) as Ref<T>

	const reloadPromise = (...args: Parameters<F> | []) => {
		startLoad()
		return list_endpoint(...args).then((response) => {
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
	const reload = (...args: Parameters<F> | []) => {
		reloadPromise(...args)
		return returnObject
	}

	const returnObject: LoadableObject<T, F> = reactive({
		value: readonly(object),
		loading: readonly(loading),
		downloadedAtLeastOnce: readonly(downloadedAtLeastOnce),
		reload,
		reloadPromise,
		clearObject,
	})

	return returnObject
}
