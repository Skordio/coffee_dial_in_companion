import type { RouteConfig } from "./types"

// const timeclock_routes: Array<RouteConfig> = (await import("./pages/profile/routes")).default
const home_routes: Array<RouteConfig> = (await import("./pages/home/routes"))
	.default

var routes = ([] as Array<RouteConfig>).concat(home_routes) //, timeclock_routes, quality_routes, item_routes)

export default routes
