<template>
  <div class="container">
    <div class="row">
      <div class="disclaimer">
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>
<script>
  export default {
    name: 'disclaimer'
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