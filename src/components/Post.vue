<template>
  <div class="row container-fluid d-flex flex-wrap flex-growth justify-center">
    <div class="posts col-4">
      <div class="col position-center">
        <div class="card d-flex flex-grow">
          <div class="card-body d-flex flex-wrap flex-growth text-wrap justify-content-center">
            <h3>{{ post.creator.name }}</h3>
            <h5>
              {{ post.body }}</h4>
              <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
                <img :src="post.imgUrl">
                <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
                <div class="text-left">
                </div>
              </router-link>
            </h5>
          </div>
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
   width: 1em;
   left: 0;
   top: 5px
 }
</style>
