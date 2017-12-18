<template>
  <div class="posts">
      <div class="tuile">
        <list
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.id"
        ></list>
        <div class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</div>
      </div>
  </div>
</template>
<script>
import List from '@/components/Post/List'

export default {
  name: 'UserBookmarks',
  components: { List },
  data () {
    return {
      posts: {},
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  mounted () {
    this.$Progress.start()
    this.$http.get(this.$store.state.user.links.bookmarks)
    .then((response) => {
      this.posts = response.body.data
      this.paginate.next_uri = response.body.links.next
      this.paginate.uri = response.body.links.current
      this.paginate.prev_uri = response.body.links.prev
      this.$Progress.finish()
    })
    .catch((errorResponse) => {
      this.$Progress.fail()
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
<style>
  .singlepost .social-btns{
    display: flex !important;
  }
  .more {
    display: block;
    width: 100%;
    text-align: center;
    cursor: pointer;
    margin-top: 30px
  }
  .more:hover {
    text-decoration: underline;
  }
</style>