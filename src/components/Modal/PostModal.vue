<template>
  <div id="post-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="close-layer" @click="$emit('close')"></div>
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
      window.document.body.style.overflow = 'hidden'
      this.loading = false
    },
    beforeDestroy () {
      window.document.body.style.overflow = ''
    },
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
      }
    }
  }
</script>
<style>
  @keyframes showModal {
    from {
      opacity: 0
    }

    to {
      opacity: 1
    }
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    animation-duration: 0.3s;
    animation-name: showModal;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  #post-modal .close-layer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  #post-modal .modal-container .container{
    padding: 0 15px
  }
  #post-modal .modal-container {
    width: calc(100% - 15px);
    max-width: 1170px;
    max-height: 80vh;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    z-index: 999999;
    overflow: scroll
  }

  .modal-body {
    padding-top: 15px !important;
    overflow-y: scroll !important;
  }
  .modal-footer {
    padding: 10px 15px;
    /*border-top: 1px #ccc solid;*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  /*  */
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