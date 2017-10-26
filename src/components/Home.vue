<template>
  <section class="container">
      <div class="row">
        <post
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.id"
        ></post>
      </div>
  </section>
</template>
  
  
  
  
  <!--<div>
    <button v-on:click="feedBox">Click-Me</button>
    <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.title}}</strong></p>
        <p>{{post.body}}</p>
      </li>
    </ul>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>-->



<script>
import Post from '@/components/Post/Post'

export default {
  name: 'home',
  components: { Post },
  data () {
    return {
      posts: [],
      errors: []
    }
  },
  mounted () {
    this.$http.get(this.$apiURL + '/feed')
      .then((response) => {
        this.posts = response.body.data
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  },
  methods: {
  }
}
</script>