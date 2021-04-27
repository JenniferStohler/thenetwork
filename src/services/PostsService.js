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
    AppState.activePosts = res.data.posts
  }

  async getByProfileId(id) {
    const res = await api.get(`api/posts?creatorId=${id}`)
    AppState.activePosts = res.data.posts
  }

  async create(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'Post', params: { id: res.data.id } })
    console.log(res.data.id)
    // this.getAll()
  }
  // eslint-disable-next-line lines-between-class-members
  async deletePost(id) {
    await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
  }

  async addPost(postId) {
    await api.post(`api/posts/${postId}/`)
    this.getActive(postId)
  }
}
export const postsService = new PostsService()
