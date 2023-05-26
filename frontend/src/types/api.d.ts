export interface GenericResource {
	list(...args: any[]): Promise<any>
	get(...args: any[]): Promise<any>
}

export interface Resource<T> {
	list(...args: any[]): Promise<T>
	get(...args: any[]): Promise<T>
}

export interface GenericPageResponse {
	/**
	 * This page's items
	 */
	results: any[]
	/**
	 * Total count of items in list
	 */
	count: number
	/**
	 * Url to hit to get next page
	 */
	next: string | ""
	/**
	 * Url to hit to get prev page
	 */
	prev: string | ""
}

export interface PageResponse<T> extends GenericPageResponse {
	/**
	 * This page's items
	 */
	results: T[]
}
