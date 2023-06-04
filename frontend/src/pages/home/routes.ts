import HomePage from "@/pages/home"
import type { RouteConfig } from "@/types"

const home_routes: Array<RouteConfig> = [
	{ path: "/", component: HomePage, name: "home" },
	{ path: "/home", redirect: "/" },
]
export default home_routes
