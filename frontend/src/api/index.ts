import axios from "axios"

const baseAPI = "http://localhost:8000/api/"
const methods = ["get", "post", "delete", "put", "patch"]

function API(this: any, relativeURL = "") {
	axios.defaults.baseURL = baseAPI + relativeURL
	axios.defaults.xsrfHeaderName = "X-CSRFToken"
	this.api = axios.create({
		baseURL: baseAPI + relativeURL,
		timeout: 300000,
		headers: {
			"Content-Type": "application/json",
		},
	})
}

Audio.prototype.prefetchHeader = function (AuthService: any) {
	return AuthService.ResourceLogin()
}

methods.forEach(function (method) {
	API.prototype[method] = function (...args: any) {
		return this.api[method](...args).then((response: any) => response.data)
	}
})

export default API
