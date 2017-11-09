<template>
  <section class="container">

      <div class="row" v-on:click="toggle">
        <post
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

export default {
  name: 'search',
  components: { Post, NewPost },
  data () {
    return {
      posts: [],
      errors: [],
      add: false,
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  props: ['tagname'],
  mounted () {
    this.$http.get(this.$apiURL + '/post/search/' + this.tagname)
      .then((response) => {
        this.posts = response.body.data
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
      })
      .catch((errorResponse) => {
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
        // console.log(errorResponse)
      })
    }
  }
}
</script>