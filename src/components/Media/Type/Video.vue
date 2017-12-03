<template>
  <div id="preview-video">
    <div class="video-wrapper">
      <video controls preload="auto" :poster="thumb">
          <source :src="path" type="video/mp4"></source>
          <source :src="path" type="video/webm"></source>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
      </video>
      <!--<div class="layer-play-pause"><span class="ico play"></span></div>
      <div class="video-controls">
           Video Controls 
          <button type="button" class="play-pause">Play</button>
          <input type="range" class="seek-bar" value="0">
          <button type="button" class="mute">Mute</button>
          <input type="range" class="volume-bar" min="0" max="1" step="0.1" value="1">
          <button type="button" class="full-screen">Full-Screen</button>
      </div>-->
    </div>

    <!--<d-player :video="video"
              :autoplay="autoplay"
              :contextmenu="contextmenu"
              :screenshot="screenshot"
              :lang="lang"
              @play="play"
              ref="player">
    </d-player>-->
  </div>
</div>

  </div>
</template>
<script>
  // import VueDPlayer from 'vue-dplayer'

  export default {
    name: 'preview-video',
    props: ['path', 'thumb'],
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
      // 'd-player': VueDPlayer
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
      // this.player = this.$refs.player.dp
    },
    methods: {
      play: function () {
        console.log('play callback')
      },
      pause: function () {
        console.log('pause callback')
      }
    }
  }
</script>
<style>
  /*.dplayer {
    width: 100%;
    max-width: 770px;
  }
  @media (max-width: 768px) {
    .dplayer {
      width: 100%;
    }
  }*/
  
  video {
    width: 100% !important;
    height: auto !important;
    max-height: 500px;
  }

  video::-internal-media-controls-download-button {
    display:none;
  }

  video::-webkit-media-controls-enclosure {
      overflow:hidden;
  }

  video::-webkit-media-controls-panel {
      width: calc(100% + 30px);  /*Adjust as needed */
  }

  .video-wrapper {
    display: inline-block;
    position: relative;
    z-index: 100;
    width: 100%;
    background: black;
    font-size: 0;
  }

  .video-controls {
    opacity: 0;
    transition: opacity .35s ease-out;
  }

  .video-controls--show {
    opacity: 1;
  }

  [data-media] {
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  [data-media="play-pause"] {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: opacity .35s ease-out;
  }
  .paused [data-media="play-pause"] {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 30px 0 30px 52px;
    border-color: transparent transparent transparent #fff;
  }
  .playing [data-media="play-pause"] {
    width: 52px;
    height: 60px;
    border: 16px solid #fff;
    border-top: none;
    border-bottom: none;
  }
  .hide-playhead [data-media="play-pause"] {
    opacity: 0;
  }

  [data-media="mute-unmute"] {
    display: block;
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>