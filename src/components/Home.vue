<template>
  <section class="container">
      
      <!--<div class="row">
        <router-link :to="{ name: 'New' }"><span class="ico add"></span></router-link>
        <span v-on:click="toggle" class="ico add"></span>
        <new-post v-if="add"></new-post>
      </div>-->

      <div class="row" v-on:click="toggle">

        <loadpost v-show="loading"></loadpost>

        <post
          v-show="!loading"
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.id"
        ></post>

        <span class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</span>

      </div>
  </section>
</template>
<script>
import Post from '@/components/Post/Post'
import NewPost from '@/components/Post/NewPost'
import Loadpost from '@/components/Info/Loadpost'

export default {
  name: 'home',
  components: { Post, NewPost, Loadpost },
  data () {
    return {
      posts: [],
      errors: [],
      add: false,
      loading: true,
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  mounted () {
    this.$Progress.start()

    this.$http.get(this.$apiURL + '/feed')
      .then((response) => {
        this.posts = response.body.data
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
        this.$Progress.finish()
        this.loading = false
      })
      .catch((errorResponse) => {
        this.$Progress.fail()
        // console.log(errorResponse)
      })
  },
  methods: {
    toggle: function () {
      this.add = !this.add
    },
    next: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        let com = response.body.data
        let old = this.posts
        this.posts = old.concat(com)
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  }
}
</script>