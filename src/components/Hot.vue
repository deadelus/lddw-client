<template>
      <div id="hot">

        <loadpost v-show="loading"></loadpost>

        <thumb
          v-show="!loading"
          v-for="(post, index) in posts"
          v-bind:post="post"
          v-bind:key="post.id"
          v-on:remove="posts.splice(index, 1)"
        ></thumb>

        <span class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</span>

      </div>
      
</template>
<script>
import Thumb from '@/components/Post/Thumb'
import NewPost from '@/components/Post/NewPost'
import Loadpost from '@/components/Info/Loadpost'

export default {
  name: 'hot',
  components: { Thumb, NewPost, Loadpost },
  data () {
    return {
      posts: [],
      errors: [],
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

    this.$http.get(this.$apiURL + '/popular')
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