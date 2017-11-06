<template>
  <!-- post -->
  <div class="posts">
    <aside class="col-lg-1 col-lg-offset-1">
        <div class="btns social-btns">
            <div class="title">SHARE</div>
            <span class="ico fb"></span>
            <span class="ico tw"></span>
            <!-- <span class="ico share"></span> -->
            <span @click="Bmk(post.links.Bookmark)" class="ico bookmark"></span>
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
            
            <div id="tags">
                <router-link v-for="tag in post.tags" :to="{ name: 'Search', params: {tagname: tag.name}}">
                  <span class="tag">
                    #{{ tag.name }}
                  </span>
                </router-link>
            </div>
            

            <div class="content">
              <preview-image v-if="this.post.meta.file_type === 'picture'" v-bind:path="this.post.meta.file_path"></preview-image>
              <preview-video v-if="this.post.meta.file_type === 'video'" v-bind:path="this.post.meta.file_path"></preview-video>
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
import PreviewImage from '@/components/Media/Type/Image.vue'
import PreviewVideo from '@/components/Media/Type/Video.vue'

export default {
  name: 'post',
  props: ['post'],
  components: {
    PreviewImage,
    PreviewVideo
  },
  mounted () {
    console.log(this.post)
  },
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
      return this.post.info.nbComments + ' Comment'
    },
    votes: function () {
      if (this.post.info.nbVotes > 1) {
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
    },
    Bmk: function (uri) {
      this.$http.post(uri)
      .then((response) => {
        if (response.body.data.attached.length) {
          this.post.info.nbBookmarks++
        }
        if (response.body.data.detached.length) {
          this.post.info.nbBookmarks--
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  }
}
</script>
<style>
  #tags{
    padding: 0 15px;
    margin: 10px 0
  }
  .tag{
    margin-right: 10px;
    font-weight: bold;
    color: #2e67a5;
  }
</style>