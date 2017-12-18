<template>
  <!-- post -->
  <div v-if="post">
      
    <post
      v-show="!loading"
      v-bind:post="post"
      v-bind:key="post.id"
    ></post>

    <loadpost v-show="loading"></loadpost>

    <div class="col-12 col-lg-8 col-lg-offset-2">    
      <div class="comment-block">
        <div class="comments">
            <div class="title">
                Commentaires
            </div>
            <span class="more" v-if="paginate.next_uri" v-on:click="nextComment(paginate.next_uri)">Plus de commentaire</span>
            <!-- COMMENT FEED -->
            <post-comment  
              v-if="comment"
              v-for="(comment, index) in comments"
              v-bind:comment="comment"
              v-bind:key="comment.id"
              v-on:remove="comments.splice(index, 1)"
            ></post-comment>
            <!-- END COMMENT FEED -->
        </div>

        <post-comment-form
          v-show="isLoggedIn"
          v-bind:url="post.links.Comment_create"
          @add="addcomment"
        ></post-comment-form>
      </div>
    </div>

  </div>
</template>

<script>
import Post from '@/components/Post/Post.vue'
import PostComment from '@/components/Post/PostComment.vue'
import PostCommentForm from '@/components/Post/PostCommentForm.vue'
import Loadpost from '@/components/Info/Loadpost'

export default {
  name: 'posts',
  components: {Post, PostComment, PostCommentForm, Loadpost},
  data () {
    return {
      post: false,
      owner: '',
      title: '',
      loading: true,
      isLoggedIn: false,
      comments: [],
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.fetchData(this.$apiURL + '/post/' + this.$route.params.id)
    }
  },
  mounted () {
    this.isLoggedIn = this.$store.state.auth.isLoggedIn
  },
  methods: {
    fetchData: function (uri) {
      this.$Progress.start()

      this.$http.get(uri)
      .then((response) => {
        this.post = response.body.data
        this.owner = this.post.owner.name
        this.loading = false
        this.fetchComment(this.post.links.Comment_read)
      })
      .catch((errorResponse) => {
        this.$Progress.fail()
      })
    },
    fetchComment: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        let comments = response.body.data
        this.comments = comments.reverse()
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
        this.$Progress.finish()
      })
      .catch((errorResponse) => {
        this.$Progress.fail()
      })
    },
    nextComment: function (url) {
      this.$http.get(url)
      .then((response) => {
        let com = response.body.data
        let old = this.comments
        this.comments = com.reverse().concat(old)
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
      })
      .catch((errorResponse) => {
      })
    },
    addcomment: function (comment) {
      let old = this.comments
      this.comments = old.concat(comment)
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
  }
  .more:hover {
    text-decoration: underline;
  }
</style>