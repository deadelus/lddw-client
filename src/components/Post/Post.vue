<template>
  <!-- post -->
  <div class="posts">
    <aside class="col-lg-1 col-lg-offset-1">
        <div class="btns social-btns">
            <div class="title">SHARE</div>
            <span class="ico fb"></span>
            <span class="ico tw"></span>
            <!-- <span class="ico share"></span> -->
            <span class="ico bookmark"></span>
        </div>
    </aside>
    <article class="col-lg-8">
        <div class="post">
            <header>
                <div class="avatar">
                    <img :src="post.owner.avatar || 'http://placehold.it/50x50'" alt="">
                </div>
                <div class="info">
                    <span class="name">{{ post.owner.name }}</span>
                    <span class="date">{{ format }}</span>
                </div>
            </header>

            <div class="title">
                {{ post.title }}
            </div>
            
            <div class="content">
                <router-link :to="{ name: 'Post', params: { id: post.id } }">
                    <img src="http://placehold.it/1024x1024" alt="">
                </router-link>
            </div>

            <footer>
                <div class="action">
                    <span class="ico comment"></span>
                    <span class="label">{{ comments }}</span>
                </div>
                <div class="action">
                    <span class="ico bookmark"></span>
                    <span class="label">{{ bookmark }}</span>
                </div>
                <div class="action">
                    <span class="ico vote"></span>
                    <span class="label">{{ votes }}</span>
                </div>
            </footer>
            
        </div>
    </article>
    <aside class="col-lg-1">
        <div class="btns">
            <div class="title">&nbsp;</div>
            <span v-on:click="action(post.links.Vote_up)" class="ico vote_up"></span>
            <span class="title">{{ post.info.agVotes }}°</span>
            <span v-on:click="action(post.links.Vote_down)" class="ico vote_down"></span>
        </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['post'],
  computed: {
    format: function () {
      return this.$moment(this.post.created_at.date).startOf('hour').fromNow()
    },
    bookmark: function () {
      if (this.post.info.nbBookmarks > 1) {
        return this.post.info.nbBookmarks + ' Bookmarks'
      }
      return this.post.info.nbBookmarks + ' Bookmark'
    },
    comments: function () {
      if (this.post.info.nbComments > 1) {
        return this.post.info.nbComments + ' Comments'
      }
      return this.post.info.nbBookmarks + ' Comment'
    },
    votes: function () {
      if (this.post.info.nbComments > 1) {
        return this.post.info.nbVotes + ' Votes'
      }
      return this.post.info.nbVotes + ' Vote'
    }
  },
  methods: {
    action: function (uri) {
      this.$http.post(uri)
      .then((response) => {
        this.post.info.agVotes = response.body.data.vote
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  }
}
</script>