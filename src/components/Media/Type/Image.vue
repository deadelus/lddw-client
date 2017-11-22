<template>
  <div id="preview-image">
    
    <!-- Image / Gif -->
    <img :src="path" alt="Image"/>

  </div>
</template>
<script>
  export default {
    name: 'preview-image',
    props: ['path']
  }
</script>