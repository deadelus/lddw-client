<template>
  <!-- post -->
  <div class="post">
      <router-link :to="{ name: 'Post', params: { id: post.id } }">   
          <div class="content" v-if="type === 'video'">
            <div class="layer-video">
              <div class="round">
                <div class="play">
                </div>
              </div>
            </div>
            <img :src="this.thumb" :alt="'post-' + post.id">
          </div>

          <div class="content" v-if="type === 'gif'">
            <div class="layer-video">
              <div class="round">
                <span class="gif">GIF</span>
              </div>
            </div>
            <img class="gif" :src="this.thumb" :alt="'post-' + post.id">
          </div>

          <div class="content" v-if="type === 'picture'">
            <img class="pic" :src="this.thumb" :alt="'post-' + post.id">
          </div>

      </router-link>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['post'],
  data () {
    return {
      thumb: '',
      type: '',
      host: '',
      videoID: ''
    }
  },
  mounted () {
    var url = this.post.meta.file_url
    this.type = this.post.meta.file_type
    if (url && this.type === 'video') {
      if (url.indexOf('youtu.be') > 0 || url.indexOf('youtube') > 0) {
        this.host = 'youtube'
        this.videoID = this.extractVideoID(url)
      } else if (url.indexOf('vimeo') > 0) {
        this.host = 'vimeo'
        this.videoID = this.extractVideoID(url)
      } else {
        this.host = 'local'
        this.thumb = this.$API + this.post.meta.file_thumb
      }
    } else {
      this.host = 'local'
      this.thumb = this.$API + this.post.meta.file_thumb
    }
    // console.log(this.post.id + '/' + this.post.meta.file_type + ' - ' + this.post.meta.file_path)
    // console.log(this.post.id + '/' + this.post.meta.file_type + ' - ' + this.post.meta.file_url)
    // console.log(this.post.id + '/' + this.post.meta.file_type + ' - ' + this.post.meta.file_thumb)
  },
  methods: {
    extractVideoID: function (url) {
      var reg = /^.*((youtu.be\/|vimeo.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\\&\\?]*).*/
      var match = url.match(reg)

      if (match && match[7]) {
        return match[7]
      } else {
        alert('Invalid Video URL')
      }
    },
    youtubeUrl: function () {
      return '//youtube.com/embed/' + this.videoID + '?modestbranding=0&autohide=1&showinfo=0&rel=0&autoplay=0'
    },
    vimeoUrl: function () {
      return '//player.vimeo.com/video/' + this.videoID + '?portrait=0&byline=0&badge=0&title=0&autoplay=0'
    }
  },
  computed: {
    videoThumb: function () {
      var thumbUrl
      if (this.host === 'youtube') {
        thumbUrl = [
          'http://img.youtube.com/vi/' + this.videoID + '/0.jpg',
          'http://img.youtube.com/vi/' + this.videoID + '/1.jpg',
          'http://img.youtube.com/vi/' + this.videoID + '/2.jpg',
          'http://img.youtube.com/vi/' + this.videoID + '/3.jpg'
        ]
        this.thumb = thumbUrl[1]
      } else if (this.host === 'vimeo') {
        this.$http.get('https://api.vimeo.com/videos/' + this.videoID + '/pictures').then((response) => {
          thumbUrl = [
            response.data[0].sizes[1].link,
            response.data[0].sizes[3].link,
            response.data[0].sizes[4].link,
            response.data[0].sizes[6].link
          ]
        })
        .catch((errorResponse) => {
          console.log(errorResponse)
        })
        this.thumb = thumbUrl[1]
      }
    }
  }
}
</script>