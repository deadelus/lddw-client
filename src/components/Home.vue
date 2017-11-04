<template>
  <section class="container">
      
      <div class="row">
        <!--<router-link :to="{ name: 'New' }"><span class="ico add"></span></router-link>-->
        <!--<span v-on:click="toggle" class="ico add"></span>-->
        <!--<new-post v-if="add"></new-post>-->
      </div>

      <div class="row" v-on:click="toggle">
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
import NewPost from '@/components/Post/NewPost'

export default {
  name: 'home',
  components: { Post, NewPost },
  data () {
    return {
      posts: [],
      errors: [],
      add: false
    }
  },
  mounted () {
    this.$http.get(this.$apiURL + '/feed')
      .then((response) => {
        this.posts = response.body.data
        console.log(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  },
  methods: {
    toggle: function () {
      this.add = !this.add
    }
  }
}
</script>