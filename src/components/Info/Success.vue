<template>
  <div id="success-wrapper">
    <div>{{ msg }}</div>
  </div>
</template>
<script>
export default {
  name: 'success',
  props: ['msg']
}
</script>
<style>
#success-wrapper {
  background: #008000;
  width: 100%;
  padding: 15px;
}
#success-wrapper div {
  margin: 0;
  color: #eaeaea;
  font-size: 1.2rem;
}
</style>