<template>
  <!-- post -->
  <div class="posts">
    <aside class="col-lg-3">
        <div class="btns social-btns">
            <div class="title">PARTAGE</div>
            <span @click="share" class="ico fb"></span>
            <!--<span class="ico tw"></span>-->
            <!-- <span class="ico share"></span> -->
            <span @click="Bmk(post.links.Bookmark)" class="ico bookmark"></span>
        </div>
    </aside>
    <article class="col-12 col-lg-6">
        <div class="post">
            <header>
                <div class="avatar">
                    <img v-if="post.owner.avatar" :src="post.owner.avatar" alt="avatar">
                    <img v-if="!post.owner.avatar" src="./../../assets/user.png" alt="avatar">
                </div>
                <div class="info">
                    <span class="name">{{ post.owner.name }}</span>
                    <span class="date">{{ format }}</span>
                </div>
                <div v-if="this.post.owner.id === currentUserID || isModerator" class="dropdown">
                  <span class="btn" @click="collapse">
                    <svg width="100%" height="100%" viewBox="0 0 33 33"><path id="Cogwheel" d="M30.329,13.721l-2.65,-0.441c-0.306,-1.315 -0.826,-2.544 -1.524,-3.653l1.476,-2.066c0.563,-0.788 0.473,-1.868 -0.211,-2.553l-0.428,-0.428c-0.685,-0.684 -1.765,-0.774 -2.553,-0.211l-2.066,1.476c-1.109,-0.698 -2.338,-1.218 -3.653,-1.524l-0.441,-2.65c-0.161,-0.964 -0.996,-1.671 -1.973,-1.671l-0.612,0c-0.977,0 -1.812,0.707 -1.973,1.671l-0.441,2.65c-1.315,0.306 -2.544,0.826 -3.653,1.524l-2.066,-1.476c-0.788,-0.563 -1.868,-0.473 -2.553,0.211l-0.428,0.428c-0.684,0.685 -0.774,1.765 -0.211,2.553l1.476,2.066c-0.698,1.109 -1.218,2.338 -1.524,3.653l-2.65,0.441c-0.964,0.161 -1.671,0.996 -1.671,1.973l0,0.612c0,0.977 0.707,1.812 1.671,1.973l2.65,0.441c0.306,1.315 0.826,2.544 1.524,3.653l-1.476,2.067c-0.563,0.787 -0.473,1.867 0.211,2.551l0.428,0.429c0.685,0.685 1.765,0.774 2.553,0.211l2.066,-1.476c1.109,0.698 2.338,1.218 3.653,1.524l0.441,2.65c0.161,0.964 0.996,1.671 1.973,1.671l0.612,0c0.977,0 1.812,-0.707 1.973,-1.671l0.441,-2.65c1.315,-0.306 2.544,-0.826 3.653,-1.524l2.066,1.476c0.788,0.563 1.868,0.474 2.553,-0.211l0.428,-0.429c0.684,-0.684 0.774,-1.764 0.211,-2.551l-1.476,-2.067c0.698,-1.109 1.218,-2.338 1.524,-3.653l2.65,-0.441c0.964,-0.161 1.671,-0.996 1.671,-1.973l0,-0.612c0,-0.977 -0.707,-1.812 -1.671,-1.973Zm-14.329,8.279c-3.314,0 -6,-2.686 -6,-6c0,-3.314 2.686,-6 6,-6c3.314,0 6,2.686 6,6c0,3.314 -2.686,6 -6,6Z" /></svg>
                  </span>
                  <ul class="dropdown-menu" v-bind:class="{ active: collapsed }">
                    <!--<li @click="showNSFWModal = true">NSFW ?</li>-->
                    <!--<li @click="showReportModal = true">Signaler</li>-->
                    <li v-if="post.owner.id === currentUserID" @click="showEditModal = true">Editer</li>
                    <li v-confirm="destroy">Supprimer</li>
                  </ul>
                </div>
            </header>

            <div v-if="title" class="title" v-html="titleParsed"></div>

            <div class="content" v-if="this.showNSFW">
                <preview-image v-if="this.post.meta.file_type === 'picture'" v-bind:path="this.post.meta.file_path" v-bind:thumb="this.post.meta.file_thumb"></preview-image>
                <preview-gif v-if="this.post.meta.file_type === 'gif'" v-bind:path="this.post.meta.file_path" v-bind:thumb="this.post.meta.file_thumb"></preview-gif>
                <preview-video 
                  v-if="this.post.meta.file_type === 'video'" 
                  v-bind:path="this.post.meta.file_path"
                  v-bind:thumb="this.post.meta.file_thumb">
                </preview-video>
            </div>
            
            <div class="content" v-if="!this.showNSFW" @click="showConfirmNSFW = true">
              <img src="./../../assets/nsfw.jpg" alt="nsfw"/>
            </div>

            <footer class="desktop">
                <div class="action" @click="showComment">
                    <span class="ico comment"></span>
                    <span class="label">{{ nbcomments }}</span>
                </div>
                <div class="action">
                    <span class="ico bookmark" @click="Bmk(post.links.Bookmark)"></span>
                    <span class="label">{{ bookmark }}</span>
                </div>
                <div class="action">
                    <span class="ico vote"></span>
                    <span class="label">{{ votes }}</span>
                </div>
            </footer>

            <footer class="mobile">
                <div class="action" @click="share">
                    <span class="ico fb"></span>
                    <span class="label">Partager</span>
                </div>
                <div class="action" @click="showComment">
                    <span class="ico comment"></span>
                    <span class="label">{{ nbcomments }}</span>
                </div>
                <div class="action" @click="Bmk(post.links.Bookmark)">
                    <span class="ico bookmark"></span>
                    <span class="label">{{ bookmark }}</span>
                </div>
                <div class="action">
                    <span v-on:click="action(post.links.Vote_up)" class="ico vote_up"></span>
                    <span class="label">{{ post.info.agVotes }}°</span>
                    <span v-on:click="action(post.links.Vote_down)" class="ico vote_down"></span>
                </div>
            </footer>

            <div class="comment-block" v-if="boxComment">
                <div class="comments">
                  <div v-if="comments.length === 0" class="title">
                      Aucun commentaire
                  </div>
                  <div v-if="comments > 0" class="title">
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
                
                <span class="more" @click="boxComment = false">Fermer</span>

                <post-comment-form
                  v-bind:url="post.links.Comment_create"
                  @add="addcomment"
                ></post-comment-form>
            </div>
        </div>
    </article>
    <aside class="col-lg-3">
        <div class="btns">
            <span v-on:click="action(post.links.Vote_up)" class="ico vote_up"></span>
            <span class="title">{{ post.info.agVotes }}°</span>
            <span v-on:click="action(post.links.Vote_down)" class="ico vote_down"></span>
        </div>
    </aside>
    
    <edit-modal 
      v-if="showEditModal" 
      v-bind:title="title" 
      v-bind:uri="post.actions.update" 
      @close="showEditModal = false" 
      @edit="edit"
    ></edit-modal>
    
    <nsfw-modal 
      v-if="showNSFWModal" 
      v-bind:uri="post.actions.update" 
      @close="showNSFWModal = false" 
    ></nsfw-modal>

    <confirm-nsfw-modal
      v-if="showConfirmNSFW" 
      @close="showConfirmNSFW = false"
      @show="show"
    ></confirm-nsfw-modal>
    
    <report-modal 
      v-if="showReportModal" 
      v-bind:uri="post.actions.update" 
      @close="showReportModal = false" 
    ></report-modal>
    
    </div>
</template>

<script>
import PreviewImage from '@/components/Media/Type/Image.vue'
import PreviewGif from '@/components/Media/Type/Gif.vue'
import PreviewVideo from '@/components/Media/Type/Video.vue'
import PostComment from '@/components/Post/PostComment.vue'
import PostCommentForm from '@/components/Post/PostCommentForm.vue'
import Loadpost from '@/components/Info/Loadpost'
import EditModal from '@/components/Modal/EditModal'
import ReportModal from '@/components/Modal/ReportModal'
import NsfwModal from '@/components/Modal/NsfwModal'
import ConfirmNsfwModal from '@/components/Modal/ConfirmNsfwModal'


export default {
  name: 'thumb',
  data () {
    return {
      title: '',
      collapsed: false,
      showEditModal: false,
      showReportModal: false,
      showNSFWModal: false, 
      showConfirmNSFW: false, 
      boxComment: false,
      firstloadComment: true,
      loading: true,
      isLoggedIn: false,
      showNSFW: false,
      comments: [],
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  props: ['post'],
  components: {
    PreviewImage,
    PreviewGif,
    PreviewVideo,
    EditModal,
    ReportModal,
    NsfwModal,
    PostCommentForm,
    PostComment,
    ConfirmNsfwModal
  },
  mounted () {
    this.title = this.post.title
    this.showNSFW = !this.post.nsfw
    this.nbVotes = this.post.info.nbVotes
    this.isLoggedIn = this.$store.state.auth.isLoggedIn
  },
  computed: {
    currentUserID: function () {
      return this.$store.getters.user.id
    },
    isModerator: function () {
      var roles = this.$store.getters.user.roles
      if (roles) {
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            return true
          }
        }
      }
      return false
    },
    format: function () {
      return this.$moment(this.post.created_at.date).startOf('hour').fromNow()
    },
    bookmark: function () {
      if (this.post.info.nbBookmarks > 1) {
        return this.post.info.nbBookmarks + ' Favoris'
      }
      return this.post.info.nbBookmarks + ' Favoris'
    },
    nbcomments: function () {
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
    titleParsed: function () {
      if (!this.title) {
        return
      }
      // /search/tag/
      const regex = /#\S+/g
      const str = this.title
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

      var obj = {
        method: 'share', 
        display: 'popup',
        href: this.$API + '/redirect/'+ this.post.id +'/?redirect_url=' + this.url(),
        hashtag: '#ladechetterie',
      };

      function callback(response){}
      FB.ui(obj, callback);
    },
    destroy: function () {
      var data = new FormData()
      data.append('_method', 'DELETE')
      this.$http({
        url: this.post.actions.delete,
        body: data,
        method: 'POST'
      })
      .then((response) => {
        this.$emit('remove')
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    },
    edit: function (value) {
      this.title = value
    },
    report: function () {
      /** Todo report Post */
      console.log('OK')
    },
    show: function () {
      this.showNSFW = true
      this.showConfirmNSFW = false
    },
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    url: function () {
      let path = this.$router.match({name: 'Post', params: {id: this.post.id}})
      let url = this.$URL + path.fullPath
      return url
    },
    showComment: function () {
      this.boxComment = !this.boxComment
      if (this.firstloadComment) {
        this.firstloadComment = false
        this.fetchComments(this.post.links.Comment_read)
      }
    },
    fetchComments: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        let comments = response.body.data
        this.comments = comments.reverse()
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
      })
      .catch((errorResponse) => {
        // error
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