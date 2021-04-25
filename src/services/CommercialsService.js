import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class CommercialsService {
  async getAll() {
    const res = await api.get('api/ads')
    AppState.commercials = res.data.commercials
  }

  async create(data) {
    const res = await api.post('api/ads', data)
    router.push({ name: 'Commercials', params: { id: res.data.id } })
    this.getAll()
  }
}

export const commercialsService = new CommercialsService()
