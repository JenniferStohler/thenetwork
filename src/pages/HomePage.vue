<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1>
  </div>
  <Post v-for="post in state.posts" :key="post.id" :post="post" />
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
