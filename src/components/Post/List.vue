<template>
  <!-- post -->
  <div class="post">
      <router-link :to="{ name: 'Post', params: { id: post.id } }">   
          <div class="content">
            <div v-if="this.post.meta.file_type === 'video'" class="layer-video">
              <div class="round">
                <div class="play">
                </div>
              </div>
            </div>
            <img :src="post.meta.file_thumb" :alt="'post-' + post.id">
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