<template>
  <div id="preview-video">
    
    <!-- Video -->
    <video ref="videopreview" width="400" controls>
      <source :src="path">
      Your browser does not support HTML5 video.
    </video>

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