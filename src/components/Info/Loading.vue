<template>
  <div id="loading-wrapper">
    <div class="loading"></div>
  </div>
</template>
<script>
export default {
  name: 'loading'
}
</script>
<style>
#loading-wrapper .loading {
  display: block;
  width: 40px;
  height: 40px;
  border-left: 4px solid #2d3e51;
  border-bottom: 4px solid #2d3e51;
  border-top: 4px solid #eaeaea;
  border-right: 4px solid #eaeaea;
  border-radius: 50%;
  -webkit-animation: loading 1.2s infinite linear;
  animation: loading 1.2s infinite linear;
}
@-moz-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  to {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>