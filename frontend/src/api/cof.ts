import API from '@/api'
const RESOURCE_NAME = 'Cof'
export default new (class ProfileResource {
  api: any
  constructor() {
    this.api = new (API as any)(RESOURCE_NAME)
  }
  list() {
    return this.api.get('')
  }
  get(id: any) {
    return this.api.get(`/${id}`)
  }
  create(data: any) {
    return this.api.post(`/`, data)
  }
  update(id: any, data: any) {
    return this.api.put(`/${id}/`, data)
  }
  delete(id: any) {
    return this.api.delete(`/${id}`)
  }
})