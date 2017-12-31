<template>
  <div id="preview-video">
    <div class="video-wrapper">
      <!-- normal -->
      <video v-if="type === 'normal'" controls preload="auto" :poster="thumb">
          <source :src="path" type="video/mp4"></source>
          <source :src="path" type="video/webm"></source>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
      </video>
      <!-- youtube -->
      <iframe v-if="type === 'youtube'" width="100%" height="300px" :src="youtubeUrl()" frameborder="0" allowfullscreen></iframe>
      <!-- vimeo -->
      <iframe v-if="type === 'vimeo'" width="100%" height="300px" :src="vimeoUrl()" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</div>

  </div>
</template>
<script>
  export default {
    name: 'preview-video',
    props: ['path', 'thumb'],
    data () {
      return {
        type: '',
        videoID: ''
      }
    },
    mounted () {
      if (this.path.indexOf('youtu.be') > 0 || this.path.indexOf('youtube') > 0) {
        this.type = 'youtube'
        this.videoID = this.extractVideoID(this.path)
      } else if (this.path.indexOf('vimeo') > 0) {
        this.type = 'vimeo'
        this.videoID = this.extractVideoID(this.path)
      } else {
        this.type = 'normal'
      }
      console.log(this.type)
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
    }
  }
</script>
<style>
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