<template>
  <div class="posts">
    <article class="col-lg-8 col-lg-offset-2">
      <list
        v-for="post in posts"
        v-bind:post="post"
        v-bind:key="post.id"
      ></list>
    </article>            
  </div>
</template>
<script>
import List from '@/components/Post/List'

export default {
  name: 'UserPost',
  components: { List },
  data () {
    return {
      posts: {}
    }
  },
  mounted () {
    this.$http.get(this.$store.state.user.links.posts)
    .then((response) => {
      this.posts = response.body.data
      console.log(this.posts)
    })
    .catch((errorResponse) => {
      console.log(errorResponse)
    })
  }
}
</script>