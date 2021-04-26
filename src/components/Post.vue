<template>
  <div class="row container-fluid d-flex flex-wrap flex-growth justify-center">
    <div class="posts col-4"></div>
    <div class="col-4 position-center">
      <div class="card d-flex flex-grow p-2">
        <div class="card-body d-flex flex-wrap flex-growth text-wrap justify-content-center p-4">
          <h3 class="text-wrap">
            {{ post.creator.name }}
          </h3>
          <h5 class="text-wrap">
            {{ post.body }}
          </h5>
          <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
            <img :src="post.imgUrl">
            <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
            <div class="text-left">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
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
