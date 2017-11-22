<template>
  <div class="posts">
    <article class="col-lg-8 col-lg-offset-2">
      <div class="tuile">
      
        <list
        v-for="post in posts"
        v-bind:post="post"
        v-bind:key="post.id"
      ></list>



      </div>
      <span class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</span>
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
    this.$http.get(this.$store.state.user.links.posts)
    .then((response) => {
      this.posts = response.body.data
      this.paginate.next_uri = response.body.links.next
      this.paginate.uri = response.body.links.current
      this.paginate.prev_uri = response.body.links.prev
      this.$Progress.finish()
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