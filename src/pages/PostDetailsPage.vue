<template>
  <!-- Adding the v-if prevents the page from trying to load before the data returns -->
  <div class="post-details container flex-grow text-wrap" v-if="state.post">
    <div class="row mt-5 ml-3">
      <div class="col-12 post">
        <div class="d-flex">
          <router-link :to="{name: 'Account', params: {id: state.post.creator.id}}">
            <img class="rounded-circle" :src="state.post.creator.picture" alt="Creator image">
          </router-link>
          <div class=" overflow ml-3 d-flex flex-column justify-content-center">
            <h3 class="text-secondary">
              {{ state.post.creator.name }}
            </h3>
            <h3 class="m-0">
              {{ state.post.body }}
            </h3>
          </div>
        </div>
      </div>
      <!-- The v-if here prevents people who are not the creator from accessing the form within this div -->
      <div class="col-12" v-if="state.account.id === state.post.creatorId">
        <form @submit.prevent="getAll()">
          <div class="form-group">
            <label for="imgUrl">Image Url</label>
            <input type="text"
                   class="form-control"
                   name="imgUrl"
                   id="imgUrl"
                   aria-describedby="helpId"
                   placeholder="Image Url..."
                   v-model="state.newPost.imgUrl"
            >
            <label for="body">Comment</label>
            <input type="text"
                   class="form-control"
                   name="body"
                   id="body"
                   aria-describedby="helpId"
                   placeholder="Comment..."
                   v-model="state.newPost.body"
                   required
            >
          </div>
          <div class="col-3" v-for="post in state.post.posts" :key="post.id">
            <div class="card">
              <div class="card-body">
                <img class="w-100" :src="post.imgUrl" alt="">
                <p>{{ post.body }}</p>
              </div>
            </div>
            <button v-if="state.account.id === state.post.creatorId">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <h1>Loading...</h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const state = reactive({
      post: {},
      project: computed(() => AppState.activePost),
      // USER has a few bonus properties such as user.isAuthenticated
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })

    onMounted(async() => {
      try {
        await postsService.getActive(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route,
      async addPost() {
        try {
          await postsService.addPost(route.params.id, state.post)
          state.post = {}
          Notification.toast('Added Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.project-header {
  img {
    width: 100px;
  }
}
.overflow{
  overflow:hidden;
  white-space: nowrap;
}
</style>
