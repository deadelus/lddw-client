<template>
  <div class="content">
    <preview-image v-if="image" v-bind:path="path"></preview-image>
    <preview-video v-if="video" v-bind:path="path"></preview-video>
  </div>
</template>
<script>
  import PreviewImage from '@/components/Media/Type/Image.vue'
  import PreviewVideo from '@/components/Media/Type/Video.vue'
  // import Gif from '@/component/Media/Type/Gif.vue'

  export default {
    name: 'preview',
    data () {
      return {
        image: false,
        video: false
      }
    },
    props: ['path', 'type'],
    components: {
      PreviewImage,
      PreviewVideo
    },
    watch: {
      type: function () {
        this.video = false
        this.image = false
        switch (this.type) {
          case 'video/mp4':
            this.video = true
            break
          case 'image/png':
          case 'image/gif':
          case 'image/jpeg':
            this.image = true
            break
        }
      }
    }
  }
</script>