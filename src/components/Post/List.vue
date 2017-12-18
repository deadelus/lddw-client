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
            <img :src="this.path" :alt="'post-' + post.id">
          </div>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['post'],
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    this.path = this.post.meta.file_url || this.post.meta.file_thumb
  }
}
</script>