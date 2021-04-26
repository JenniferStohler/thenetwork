<template>
  <div class="home col-2 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <!-- <img src="https://s.gravatar.com/avatar/4e7ba3d86d9d42cf4d65f708d3bb040e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fun.png" alt="CodeWorks Logo">
    <h1 class="my-2 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Gwen Stohler</span>
    </h1>
  </div> -->
    <Commercials v-for="commercial in state.commercials" :key="commercial.id" :commercial="commercial" />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { commercialsService } from '../services/CommercialsService'
import { AppState } from '../AppState'
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
