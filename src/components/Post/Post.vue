<template>
  <!-- post -->
  <div class="posts">
    <aside class="col-lg-1 col-lg-offset-1">
        <div class="btns social-btns">
            <div class="title">PARTAGE</div>
            <span @click="share" class="ico fb"></span>
            <!--<span class="ico tw"></span>-->
            <!-- <span class="ico share"></span> -->
            <span @click="Bmk(post.links.Bookmark)" class="ico bookmark"></span>
        </div>
    </aside>
    <article class="col-12 col-lg-8">
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

            <div class="title" v-html="title"></div>

            <div class="content">
              <router-link :to="{ name: 'Post', params: {id: post.id} }">
                <preview-image v-if="type === 'picture'" v-bind:path="path" v-bind:thumb="thumb"></preview-image>
                <preview-video v-if="type === 'video'" v-bind:path="path" v-bind:thumb="thumb"></preview-video>
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
  data () {
    return {
      type: false,
      path: false
    }
  },
  props: ['post'],
  components: {
    PreviewImage,
    PreviewVideo
  },
  mounted () {
    this.type = this.post.meta.file_type
    this.path = this.post.meta.file_path
    this.thumb = this.post.meta.file_thumb
  },
  computed: {
    format: function () {
      return this.$moment(this.post.created_at.date).startOf('hour').fromNow()
    },
    bookmark: function () {
      if (this.post.info.nbBookmarks > 1) {
        return this.post.info.nbBookmarks + ' Signets'
      }
      return this.post.info.nbBookmarks + ' Signet'
    },
    comments: function () {
      if (this.post.info.nbComments > 1) {
        return this.post.info.nbComments + ' Commentaires'
      }
      return this.post.info.nbComments + ' Commentaire'
    },
    votes: function () {
      if (this.post.info.nbVotes > 1) {
        return this.post.info.nbVotes + ' Votes'
      }
      return this.post.info.nbVotes + ' Vote'
    },
    title: function () {
      if (!this.post.title) {
        return
      }
      // /search/tag/
      const regex = /#\S+/g
      const str = this.post.title
      var fixed = str.replace(regex, function (match) {
        var urlparam = match.replace('#', '')
        return '<a class="hashtag" href="/search/tag/' + urlparam + '">' + match + '</a>'
      })
      return fixed
    }
  },
  methods: {
    action: function (uri) {
      this.$http.post(uri)
      .then((response) => {
        this.post.info.agVotes = response.body.data.vote
      })
      .catch((errorResponse) => {
        // console.log(errorResponse)
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
        // console.log(errorResponse)
      })
    },
    share: function () {
      var path = this.$router.match({name: 'Post', params: {id: this.post.id}})
      var url = this.$URL + path.fullPath
      var obj = {method: 'feed',link: url, picture: this.post.meta.file_thumb,name: this.post.title,description: 'Un déchêt dans la dechetterie'};
      function callback(response){}
      FB.ui(obj, callback);
    }
  }
}
</script>
<style>
  #tags{
    padding: 0 15px;
    margin: 10px 0
  }
  a.hashtag{
    color: white;
    background: #1f5584;
    padding: 2px 5px;
    font-weight: 100;
  }
  a.hashtag:hover{
    text-decoration: underline;
  }
</style>