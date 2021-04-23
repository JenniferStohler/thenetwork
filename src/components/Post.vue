<template>
  <div class="post-photo col-md-3">
    <div class=" position-relative">
      <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
        <img :src="post.imgUrl">
        <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
        <div class="text-left">
          <h4>{{ post.title }}</h4>
        </div>
      </router-link>
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
   width: 1em;
   left: 0;
   top: 5px
 }
</style>
