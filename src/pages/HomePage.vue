<template>
  <div class="row justify-content-center">
    <div class="images col-12 d-flex justify-content-center">
      <div class="col-12">
        <img v-for="commercial in state.commercials" :key="commercial.title" :src="commercial.square" />
      </div>
    </div>
  </div>
  <Post v-for="post in state.posts" :key="post.id" :post="post" />
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { postsService } from '../services/PostsService'
import { commercialsService } from '../services/CommercialsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      commercials: computed(() => AppState.commercials)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
        await commercialsService.getCommercials()
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
  .images{
    height: 50px;
    width:50px
  }
}
</style>
