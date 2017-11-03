<template>
  <!-- post -->
  <section class="container">
      <div class="row">
          <new-post></new-post>
      </div>
  </section>
</template>

<script>
import NewPost from '@/components/Post/NewPost.vue'

export default {
  name: 'new',
  components: { NewPost }
}
</script>