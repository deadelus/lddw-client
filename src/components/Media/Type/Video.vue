<template>
  <div id="preview-video">
    <div class="video-wrapper">
      <video controls>
          <source :src="path" type="video/mp4"></source>
          <!--<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg"></source>-->
          Your browser does not support the <code>video</code> tag.
      </video>
      <div class="video-controls">
          <button data-media="play-pause"></button>
          <button data-media="mute-unmute"></button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>
<script>
  export default {
    name: 'preview-video',
    props: ['path'],
    mounted () {
      // console.log('Video Mouted')
    },
    watch: {
      path: function () {
        this.$refs.videopreview.load()
      }
    }
  }
</script>
<style>
  video {
    width: 750px !important;
    max-width: 100% !important;
    height: auto !important;
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