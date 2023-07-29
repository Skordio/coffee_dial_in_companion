import AboutPage from "@/pages/about"
import type { RouteConfig } from "@/types"
import { ABOUT } from "@/route/names"

const about_routes: Array<RouteConfig> = [
	{ path: "/about", component: AboutPage, name: ABOUT.PAGE },
]

export default about_routes
