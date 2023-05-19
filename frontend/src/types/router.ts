import type { Component } from "vue"
import type { RouteParams } from "vue-router"

/**
 * Object representing a route for vue router
 */
export interface RouteConfig {
	path: string | String
	component?: Component
	name?: string // for named routes
	components?: { [name: string]: Component } // for named views
	redirect?: string | Location | Function | RouteParams
	props?: boolean | Object | Function
	alias?: string | Array<string>
	children?: Array<RouteConfig> // for nested routes
	beforeEnter?: (to: RouteParams, from: RouteParams, next: Function) => void
	meta?: any

	// 2.6.0+
	caseSensitive?: boolean // use case sensitive match? (default: false)
	pathToRegexpOptions?: Object // path-to-regexp options for compiling regex
}

/**
 * Object representing what the :to="" prop for router-link is expecting
 */
export interface PushRouteConfig {
	path?: string | String
	name?: string // for named routes
	params?: {}
	query?: {}
}
