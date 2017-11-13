<template>
  <!-- post -->
  <section class="container" v-if="post">
      <div class="row singlepost">
          
        <post
          v-bind:post="post"
          v-bind:url="url"
          v-bind:key="post.id"
        ></post>
          
      </div>

      <div class="row">
          <div class="col-lg-8 col-lg-offset-2">
              <div class="comments">
                  <div class="title">
                      Commentaires
                  </div>
                  <span class="more" v-if="paginate.next_uri" v-on:click="nextComment(paginate.next_uri)">Plus de commentaire</span>
                  <!-- COMMENT FEED -->
                  <post-comment  
                    v-if="comment"
                    v-for="comment in comments"
                    v-bind:comment="comment"
                    v-bind:key="comment.id"
                  ></post-comment>
                  <!-- END COMMENT FEED -->
              </div>

              <post-comment-form
                v-bind:url="post.links.Comment_create"
              ></post-comment-form>

          </div>  
      </div>
  </section>
</template>

<script>
import Post from '@/components/Post/Post.vue'
import PostComment from '@/components/Post/PostComment.vue'
import PostCommentForm from '@/components/Post/PostCommentForm.vue'

export default {
  name: 'posts',
  components: { Post, PostComment, PostCommentForm },
  data () {
    return {
      post: false,
      owner: '',
      title: '',
      url: '',
      loading: false,
      comments: [],
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  metaInfo () {
    return {
      title: this.title,
      titleTemplate: null,
      meta: [
        {property: 'og:title', content: this.title},
        {property: 'or:author', content: this.owner},
        {property: 'or:description', content: 'Encore un déchet recyclé dans La Déchetterie !'},
        {property: 'og:url', content: this.url}
      ]
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.fetchData(this.$apiURL + '/post/' + this.$route.params.id)
    }
  },
  methods: {
    fetchData: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        this.post = response.body.data
        this.owner = this.post.owner.name
        this.url = this.makeURL()
        var txt = this.post.title
        this.title = txt.slice(0, 20)
        this.fetchComment(this.post.links.Comment_read)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
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
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
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
        console.log(this.comments)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    },
    makeURL: function () {
      let path = this.$router.match({name: 'Post', params: {id: this.post.id}})
      let url = this.$URL + path.fullPath
      return url
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