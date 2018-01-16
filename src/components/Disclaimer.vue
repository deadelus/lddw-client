<template>
  <div class="container">
    <div class="row">
      <div class="disclaimer">
        <brand></brand>
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>
<script>
  import Brand from '@/Brand'
  export default {
    name: 'disclaimer',
    components: { Brand }
  }
</script>
<style>
  .disclaimer {
    text-align: left;
    margin: auto;
    width: 100%;
    max-width: 750px;
  }
</style>