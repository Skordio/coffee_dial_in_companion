import {
	Ref,
	ref,
	nextTick,
	watch,
	onMounted,
	computed,
	VueElement,
	reactive,
} from "vue"
import { useRoute, useRouter } from "vue-router"
import { PageResponse } from "@/types"
import { TableField, TableItem } from "bootstrap-vue-next"

interface ResponseCache<T> {
	[key: number]: PageResponse<T>
}

const noFunction = () => null

/**
 * Vue 3 composable function that provides utility functions to manage and interact with a paginated list of items.
 *
 * @param listEndpoint - Function to call for fetching the data from the server.
 * @param tableRef - A reference to the table component in the parent.
 * @param fields - The fields for the BTable.
 * @param active - Whether this table is currently being viewed or not. IMPORTANT: BEFORE SETTING THIS TABLE AS ACTIVE, SET THE ROUTE QUERY APPROPRIATELY
 * @param refresh - When this ref becomes true momentarily, the table will reload its data.
 * @param page_sizes - An array of page sizes for the user to select from.
 *
 * @returns {Object} A reactive object containing utility functions to interact with the paginated list.
 */
export function usePaginatedTable<T>(
	listEndpoint: Ref<
		(page_num: number, page_size: number) => Promise<PageResponse<T>>
	>,
	tableRef: Ref,
	fields: { key: string; label: string; sortable: boolean }[],
	active: Ref<boolean> = ref(true),
	refresh: Ref<boolean> = ref(false),
	route_name: string = "",
	page_sizes: number[] = [10, 20, 30, 40, 50, 100, 150],
	handleSelectRow: Ref<(row: any) => void> = ref(noFunction)
) {
	const route = useRoute()
	const router = useRouter()
	// table variables
	const sort_by = ref("")
	const sort_desc = ref(true)
	const current_page = ref(1)
	const total = ref(0)
	const per_page = ref(page_sizes[0])
	const loading = ref(true)
	// item and response data storage
	const items = ref([] as T[])
	const responses = ref({} as ResponseCache<T>)

	let justChangedQuery = false
	// Helper Functions

	const getPageResponse = (page_num: number) => {
		return responses.value[page_num]
	}
	const setPageResponse = (page_num: number, response: PageResponse<T>) => {
		responses.value[page_num] = response
	}

	const set_items = (new_items: T[]) => {
		;(items.value as T[]) = new_items
	}
	const sortDescToggle = () => {
		sort_desc.value = !sort_desc.value
	}
	const defaultSelectRow = (row: any) => {
		nextTick().then(() => {
			tableRef.value.clearSelected()
			row._showDetails = !row._showDetails
		})
	}
	if (handleSelectRow.value == noFunction)
		handleSelectRow.value = defaultSelectRow
	/**
	 * Attempts to load the data from the cache for the specified page number.
	 * Returns true if successful, false otherwise.
	 *
	 * @param {number} page_num - The page number of the specific page to load from cache.
	 * @returns {boolean} True if the data is successfully loaded from cache, false otherwise.
	 */
	const tryLoadCached = (page_num: number = current_page.value) => {
		loading.value = true
		const cached_response = getPageResponse(page_num)
		if (cached_response === undefined) {
			return false
		} else {
			set_items(cached_response.results)
			total.value = cached_response.count
			loading.value = false
			return true
		}
	}
	/**
	 * Fetches the data from the server for the specified page number and
	 * updates the list of items and their count.
	 *
	 * @param {number} page_num - The page number of the specific page to fetch from the server.
	 * @returns {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
	 */
	const loadFromServer = (page_num: number = current_page.value) => {
		loading.value = true
		return listEndpoint
			.value(page_num, per_page.value)
			.then((response: PageResponse<T>) => {
				set_items(response.results)
				setPageResponse(page_num, response)
				current_page.value = page_num
				total.value = response.count
				nextTick(() => {
					loading.value = false
				})
			})
			.catch((error: any) => {
				// if we have errored, then we were looking for an out of range page. get page 1
				current_page.value = 1
				changeRouteQuery()
				loadFromServer(current_page.value)
			})
	}
	/**
	 * Updates the route query parameters with the specified page number and page size, or current page num and size if not specified.
	 *
	 * @param {number} [page_num] - The page number to set in the route query parameters (default: current page or 1 if not set).
	 * @param {number} [page_size] - The page size to set in the route query parameters (default: current page size or 1 if not set).
	 */
	const changeRouteQuery = (
		page_num: number = current_page.value,
		page_size: number = per_page.value
	) => {
		justChangedQuery = true
		return router.replace({
			name: route_name == "" ? route.name : (route_name as any),
			query: { page: page_num, page_size: page_size },
		})
	}
	/**
	 * Sets the current page number and page size based on the route query parameters.
	 * If the query parameters are not valid or not present, the current page number and page size are used as defaults.
	 */
	const setDataFromQuery = () => {
		let current_page_num = current_page.value
		let current_per_page = per_page.value
		if (
			!(
				route.query.page === undefined ||
				route.query.page === "" ||
				isNaN(route.query.page as any)
			)
		) {
			current_page.value = parseInt(route.query.page as string)
		}
		if (
			!(
				route.query.page_size === undefined ||
				route.query.page_size === "" ||
				isNaN(route.query.page_size as any)
			)
		) {
			per_page.value = parseInt(route.query.page_size as string)
		}
		per_page.value != current_per_page ? setPageSize() : null
		current_page.value != current_page_num ? changePage() : null
	}

	// Functions accessible from outside composable

	const changePage = (
		bvEvent: any = null,
		page_num: number = current_page.value
	) => {
		current_page.value = page_num
		changeRouteQuery(page_num, per_page.value).then(() => {
			if (!tryLoadCached(page_num)) {
				loadFromServer(page_num)
			}
		})
	}
	const sortBy = (sortString: string) => {
		if (sort_by.value == sortString) {
			sortDescToggle()
		} else {
			sort_by.value = sortString
		}
	}
	const setPageSize = (new_page_size: number = per_page.value) => {
		per_page.value = new_page_size
		changeRouteQuery()
		reload()
	}
	const isContentOverflowing = computed(() => {
		if (!loading.value && tableRef.value && tableRef.value.$el) {
			return tableRef.value.$el.offsetHeight > window.innerHeight
		}
		return false
	})
	const reload = () => {
		items.value = []
		responses.value = {}
		loadFromServer()
	}
	onMounted(() => {
		if (!active.value) return
		setDataFromQuery()
		if (tryLoadCached(current_page.value)) return
		loadFromServer(current_page.value)
	})
	// watches refresh, and if we have decided to refresh and this is the active table, load from the server,
	watch(refresh, (currentVal, oldVal) => {
		currentVal && active.value ? loadFromServer() : null
	})
	// watch whether the table is active, and if we have just switched to this table, try to load cached page and query params
	watch(active, (currentVal, oldVal) => {
		if (currentVal)
			changeRouteQuery().then(() =>
				tryLoadCached() ? null : loadFromServer()
			)
	})
	// this deep watches the route and allows us to update the page num and size from the route, so if it is dynamically updated the table will load data for those parameters
	watch(route, (currentVal, oldVal) => {
		if (!active.value) return
		nextTick(() => {
			setDataFromQuery()
		})
	})
	return reactive({
		/**A reactive array of items to be displayed in the table.*/
		items: computed(() => {
			return items.value as any as TableItem[]
		}),
		/**An array of field objects describing the columns of the table, for use with a bootstrap BTable.*/
		fields,
		/**A reactive reference to the current number of items per page.*/
		per_page,
		/**A reactive reference to the total number of items available.*/
		total,
		/**A reactive reference to the current page number.*/
		current_page,
		/**A reactive reference indicating whether the table is currently loading data.*/
		loading,
		/**A reactive reference to the current sorting criteria.*/
		sort_by,
		/**A reactive reference indicating whether the table is sorted in descending order.*/
		sort_desc,
		/** An array of available page sizes for the user to choose from.*/
		page_sizes,
		/** The ref to the table that this tableHelper is helping with */
		tableRef,
		/** A computed property that tells us whether the table is overflowing past the bottom of the page */
		isContentOverflowing,

		/**
		 * Toggles the display of details for the selected row.
		 *
		 * @param {any} row - The row object containing the data for the selected item.
		 */
		handleSelectRow,
		/**
		 * Sorts the data based on the provided sort string. If the data is already sorted
		 * by the same string, the sort order is toggled.
		 *
		 * @param {string} sortString - The string specifying the sorting criteria.
		 */
		sortBy,
		/**
		 * Changes the current page to the specified page number. If the data is
		 * available in the cache, it loads from the cache, otherwise, it fetches the
		 * data from the server.
		 *
		 * @param {any} bvEvent - The event object emitted by the pagination component.
		 * @param {number} page_num - The page number to change to.
		 */
		changePage,
		/**
		 * Changes the current page size to the specified value and reloads the data from the server
		 * with the new page size. Also updates the route query parameter for page size.
		 *
		 * @param {number} new_page_size - The new page size to set and fetch data with.
		 */
		setPageSize,
		reload,
	})
}
