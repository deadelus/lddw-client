<template>
  <section id="result">

        <thumb
          v-for="post in posts"
          v-bind:post="post"
          v-bind:key="post.id"
        ></thumb>

        <span class="more" v-if="paginate.next_uri" v-on:click="next(paginate.next_uri)">Voir plus</span>

      </div>
  </section>
</template>

<script>
import Thumb from '@/components/Post/Thumb'

export default {
  name: 'search',
  components: { Thumb },
  data () {
    return {
      posts: [],
      errors: [],
      add: false,
      paginate: {
        uri: '',
        next_uri: '',
        prev_uri: ''
      }
    }
  },
  props: ['tagname'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      this.$http.get(this.$apiURL + '/search/' + this.tagname.replace('#', '%23'))
        .then((response) => {
          this.posts = response.body.data
          this.paginate.next_uri = response.body.links.next
          this.paginate.uri = response.body.links.current
          this.paginate.prev_uri = response.body.links.prev
        })
        .catch((errorResponse) => {
          // console.log(errorResponse)
        })
    },
    toggle: function () {
      this.add = !this.add
    },
    next: function (uri) {
      this.$http.get(uri)
      .then((response) => {
        let com = response.body.data
        let old = this.posts
        this.posts = old.concat(com)
        this.paginate.next_uri = response.body.links.next
        this.paginate.uri = response.body.links.current
        this.paginate.prev_uri = response.body.links.prev
      })
      .catch((errorResponse) => {
        // console.log(errorResponse)
      })
    }
  }
}
</script>