<template>
  <div id="error-wrapper">
    <ul class="errors">
      <li v-for="error in errors">
        {{ error.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'error',
  props: ['errors']
}
</script>
<style>
#error-wrapper {
  background: #bb3030;
  width: 100%;
  padding: 15px;
  margin: 5px 0;
}
#error-wrapper ul {
  margin: 0;
}
#error-wrapper ul li {
  color: #eaeaea;
  width: 100%;
  font-size: 1.2rem;
}
</style>