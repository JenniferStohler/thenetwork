<template>
  <div class="post col-md-3">
    <div class=" position-relative">
      <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
        <img :src="post.imgUrl">
        <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
        <div class="text-left">
          <h4>{{ post.body }}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { commercialsService } from '../services/CommercialsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  name: 'Commercials',
  setup() {
    const state = reactive({
      commercials: computed(() => AppState.commercials)
    })
    onMounted(async() => {
      try {
        await commercialsService.getCommercials()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  },
  commercials: {}
}
</script>

<style lang="scss" scoped>
 img{
   width: 100%
 }

 .small-img{
   width: 1em;
   left: 0;
   top: 5px
 }
</style>
