<template>
  <!-- post -->
  <div class="post col-lg-6">
      <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <div class="title">
            {{ post.title || 'Sans titre' }}
          </div>      
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