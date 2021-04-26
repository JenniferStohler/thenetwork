import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class CommercialsService {
  async getCommercials() {
    const res = await api.get('api/ads')
    console.log(res.data)
    AppState.commercials = res.data
  }

  async create(data) {
    const res = await api.post('api/ads', data)
    router.push({ name: 'Commercials', params: { id: res.data } })
    this.getAll()
  }
}

export const commercialsService = new CommercialsService()
