<template>
  <div id="preview-video">
    <!--<div class="video-wrapper">
      <video controls>
          <source :src="path" type="video/mp4"></source>
          <source :src="path" type="video/webm"></source>
          Your browser does not support the <code>video</code> tag.
      </video>
      <div class="video-controls">
          <button data-media="play-pause"></button>
          <button data-media="mute-unmute"></button>
      </div>
    </div>-->
    <d-player :video="video"
              :autoplay="autoplay"
              :contextmenu="contextmenu"
              :screenshot="screenshot"
              :lang="lang"
              @play="play"
              ref="player">
    </d-player>
  </div>
</div>

  </div>
</template>
<script>
  import VueDPlayer from 'vue-dplayer'

  export default {
    name: 'preview-video',
    props: ['name'],
    data () {
      return {
        video: {
          url: '',
          pic: ''
        },
        lang: 'en',
        autoplay: false,
        screenshot: true,
        player: null,
        contextmenu: [
          {
            text: 'La déchetterie',
            link: ''
          }
        ]
      }
    },
    components: {
      'd-player': VueDPlayer
    },
    created () {
      // console.log('Video Mouted')
      // https://github.com/MoePlayer/vue-dplayer
      this.video.url = this.$API + '/video/' + this.name
      // console.log(this.video.url)

      // this.video.url = 'https://api.ladechetterieduweb.com/storage/videos/10efc42647454d05ad3d8a68aade4756.mp4'
      // this.video.url = 'http://local.dev.foo:8000/video/test.mp4'
      // this.video.url = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
    },
    mounted () {
      this.player = this.$refs.player.dp
    },
    methods: {
      play: function () {
        console.log('play callback')
      }
    }
  }
</script>
<style>
  .dplayer {
    width: 100%;
    max-width: 770px;
  }
  @media (max-width: 768px) {
    .dplayer {
      width: 100%;
    }
  }
</style>