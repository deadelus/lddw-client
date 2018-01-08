<template>
  <div id="preview-gif">
    
    <!-- Image / Gif -->
    <img :src="source" alt="Image" @click="showLightBox = true"/>
    <div class="play-gif">
      <span class="circle">
        <span>GIF</span>
      </span>
    </div>
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
    name: 'preview-gif',
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
<style>
  #preview-gif {
    position: relative;
  }
  .play-gif {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: #000000a8
  }
  .play-gif span.circle{
    height: 50px;
    width: 50px;
    border: 3px dashed white;
    margin: auto;
    border-radius: 25px;
    position: relative;
  }
  .play-gif span.circle span{
    display: block;
    width: 100%;
    height: 100%;
    font-size: 15px;
    line-height: 40px;
    color: #FFF;
    text-align: center;
    line-height: 44px;
  }
</style>