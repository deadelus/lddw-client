<template>
  <div id="post">

    <loadpost v-show="loading"></loadpost>

    <thumb
      v-show="!loading"
      v-bind:post="post"
      v-bind:key="post.id"
    ></thumb>

  </div>
</template>
<script>
import Thumb from '@/components/Post/Thumb'
import Loadpost from '@/components/Info/Loadpost'

export default {
  name: 'post',
  components: { Thumb, Loadpost },
  data () {
    return {
      post: {},
      errors: [],
      loading: true
    }
  },
  mounted () {
    this.$Progress.start()
    this.fetchData(this.$apiURL + '/post/' + this.$route.params.id)
  },
  methods: {
    fetchData: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        this.post = response.body.data
        this.$Progress.finish()
        this.loading = false
      })
      .catch((errorResponse) => {
        this.$route.push('/404')
      })
    }
  }
}
</script>