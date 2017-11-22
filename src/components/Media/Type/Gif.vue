<template>
  <div id="preview-gif">
    
    <!-- Image / Gif -->
    <img :src="path" alt="Image"/>

  </div>
</template>
<script>
  export default {
    name: 'preview-gif',
    props: ['path']
  }
</script>