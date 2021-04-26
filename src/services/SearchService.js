import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class SearchService {
  async getSearch() {
    const res = await api.get('api/posts?query=')
    console.log(res.data)
    AppState.search = res.data
  }

  async create(data) {
    const res = await api.search('api/posts?query=', data)
    router.push({ name: 'Search', params: { id: res.data } })
    this.getAll()
  }
}

export const searchService = new SearchService()
