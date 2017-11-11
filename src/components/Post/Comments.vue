<template>
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
</template>
<script>
  import PostCommentForm from '@/components/Post/PostCommentForm.vue'

  export default {
    name: 'comments',
    components: {
      PostCommentForm
    }
  }
</script>