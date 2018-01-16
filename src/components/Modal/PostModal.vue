<template>
  <div id="post-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            
            <post
              v-show="!loading"
              v-bind:post="post"
              v-bind:key="post.id"
            ></post>

          
            <loadpost v-show="loading"></loadpost>

          <div class="container">
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
                        v-for="(comment, index) in comments"
                        v-bind:comment="comment"
                        v-bind:key="comment.id"
                        v-on:remove="comments.splice(index, 1)"
                      ></post-comment>
                      <!-- END COMMENT FEED -->


                      <post-comment-form
                          v-show="isLoggedIn"
                          v-bind:url="post.links.Comment_create"
                          @add="addcomment"
                      ></post-comment-form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-layer" @click="cancel()"></div>
    </div>
  </div>
</template>
<script>
  import Post from '@/components/Post/Post.vue'
  import PostComment from '@/components/Post/PostComment.vue'
  import PostCommentForm from '@/components/Post/PostCommentForm.vue'
  import Loadpost from '@/components/Info/Loadpost'

  export default {
    name: 'post-modal',
    props: ['post'],
    data () {
      return {
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
    components: {Post, PostComment, PostCommentForm, Loadpost},
    mounted () {
      this.isLoggedIn = this.$store.state.auth.isLoggedIn
      this.fetchComment(this.post.links.Comment_read)
      this.loading = false
      this.$freeze(true)
    },
    // Other Solution
    // beforeDestroy () {
    //   window.document.body.style.overflow = ''
    // },
    methods: {
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
      },
      cancel () {
        this.$freeze(false)
        this.$emit('close')
      }
    }
  }
</script>