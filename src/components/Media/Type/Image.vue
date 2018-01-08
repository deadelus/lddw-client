<template>
  <div id="preview-image">
    
    <!-- Image / Gif -->
    <img :src="source" alt="Image" @click="showLightBox = true"/>
    
    <light-box 
      v-if="showLightBox" 
      v-bind:path="this.path" 
      @close="showLightBox = false" 
    ></light-box>

  </div>
</template>
<script>
  import LightBox from '@/components/Modal/LightBox'

  export default {
    name: 'preview-image',
    props: ['path', 'thumb'],
    data () {
      return {
        source: '',
        showLightBox: false
      }
    },
    mounted () {
      this.source = this.thumb ? this.$API + this.thumb : this.path
    },
    components: {
      LightBox
    }
  }
</script>