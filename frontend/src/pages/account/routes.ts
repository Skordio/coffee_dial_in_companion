import accountPage from "./index"
import type { RouteConfig } from "@/types"

const item_routes: Array<RouteConfig> = [
	{
		path: "/account",
		component: accountPage,
		name: "account",
		// redirect: { name: "item-search" },
		// children: [
		// 	{
		// 		path: "",
		// 		component: list,
		// 		name: "item-search",
		// 	},
		// 	{
		// 		path: ":item_recordid",
		// 		redirect: { name: "item-overview" },
		// 		children: [
		// 			{
		// 				path: "",
		// 				component: item_overview,
		// 				name: "item-overview",
		// 				children: [
		// 					{ path: "salesorder", component: item_overview, name: "item-salesorder" },
		// 					{ path: "purchaseorder", component: item_overview, name: "item-purchaseorder" },
		// 				],
		// 			},
		// 		],
		// 	},
		// ],
	},
]
export default item_routes
