<template>
  <div id="new-post">
    <div class="col-lg-8 col-lg-offset-2">
      <div class="flex col">
        <h1>Nouvelle publication</h1>
        <div v-model="title" class="title col-lg-12" contenteditable></div>
      </div>
      <media></media>
    </div>
  </div>
</template>
<script>
  import Media from '@/components/Media/Media.vue'

  export default {
    name: 'new-post',
    data () {
      return {
        title: ''
      }
    },
    components: { Media }
  }
</script>