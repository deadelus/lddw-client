<template>
  <section class="container">

      <div class="row" v-on:click="toggle">
        <thumb
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.id"
        ></thumb>

        <span class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</span>

      </div>
  </section>
</template>

<script>
import Thumb from '@/components/Post/Thumb'
import NewPost from '@/components/Post/NewPost'

export default {
  name: 'search',
  components: { Thumb, NewPost },
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
    console.log('ok')
    this.$http.get(this.$apiURL + '/search/' + this.tagname)
      .then((response) => {
        console.log(response)
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