<template>
  <div id="preview-image">
    
    <!-- Image / Gif -->
    <img :src="path" />

  </div>
</template>
<script>
  export default {
    name: 'preview-image',
    props: ['path'],
    mounted () {
      // console.log('Image Mouted')
    }
  }
</script>