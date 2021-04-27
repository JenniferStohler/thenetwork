<template>
  <div class="row container-fluid d-flex flex-wrap flex-growth justify-center">
    <div class="posts col-4"></div>
    <div class="col-4 position-center">
      <div class="card d-flex flex-grow p-2">
        <div class="card-body d-flex flex-wrap flex-growth text-wrap justify-content-center p-4">
          <div class="text-wrap">
            {{ post.creator.name }}
            <div class="text-wrap">
              {{ post.createdAt }}
            </div>
            <div class="text-wrap">
              {{ post.body }}
              <div class="mr-1 text-left">
                <button type="btn btn-success" @click="like(id)">
                  Like
                  {{ post.likes.length }}
                </button>
                <button type="btn btn-danger" @click="deletePost(id)">
                  Delete
                </button>
              </div>
            </div>
            <div class="post m-2 bg-white w-75 shadow">
            </div>

            <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
              <img v-if="post.imgUrl != null" :src="post.imgUrl">
              <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
              <div class="text-left">
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService'
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deletePost() {
        try {
          postsService.deletePost(props.post.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 img{
   width: 100%
 }

 .small-img{
   width: 2em;
   left: 0;
   top: 5px
 }
 .text-wrap{
   overflow: hidden;
   white-space: nowrap;
 }
</style>
