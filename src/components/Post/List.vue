<template>
  <!-- post -->
  <div class="post">
      <router-link :to="{ name: 'Post', params: { id: post.id } }">   
          <div class="content">
            <img src="http://placehold.it/1024x1024" alt="">
          </div>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['post']
}
</script>