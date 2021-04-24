import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
  }

  async getActive(id) {
    const res = await api.get('api/posts/' + id)
    AppState.activePost = res.data.posts
  }

  async getMyPosts() {
    const res = await api.get(`api/posts?creatorId=${AppState.account.id}`)
    AppState.myPosts = res.data.posts
  }

  async getByProfileId(id) {
    const res = await api.get(`api/posts?creatorId=${id}`)
    AppState.activePosts = res.data.posts
  }

  async create(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'PostDetails', params: { id: res.data.id } })
    this.getAll()
  }

  async addPost(postId) {
    await api.post(`api/posts/${postId}/`)
    this.getActive(postId)
  }
}

export const postsService = new PostsService()
