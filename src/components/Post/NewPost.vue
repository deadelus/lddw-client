<template>
  <div id="new-post">
    <div class="col-lg-8 col-lg-offset-2">
      <div class="flex col">
        <h1>Nouvelle publication</h1>
        <input v-model="title" id="title-post" type="text"/>
        <!--<div class="title col-lg-12">{{ msg }}</div>-->
      </div>
      <media></media>
      <div v-if="showBtn" @click="upload" class="btn post-btn">Envoyer</div>
    </div>
  </div>
</template>
<script>
  import Media from '@/components/Media/Media.vue'

  export default {
    name: 'new-post',
    data () {
      return {
        title: '',
        post: {}
      }
    },
    components: { Media },
    mounted () {
      /**
        *
        * Todo
        * Make a Post file like auth for
        * managing state and files local storage
        *
       */
      this.$store.commit('CLEAR_POST')
      this.$store.watch((state) => {
        this.post = this.$store.getters.post
      })
    },
    methods: {
      upload: function () {
        var data = new FormData()
        if (this.title !== '') {
          data.append('title', this.title)
        }
        data.append('file', this.post.file)
        this.$http({
          url: this.$store.getters.user.actions.new_post,
          body: data,
          method: 'POST'
        })
        .then((response) => {
          this.$store.commit('CLEAR_POST')
          this.reset()
        })
        .catch((errorResponse) => {
          // console.log(errorResponse)
        })
      },
      reset: function () {
        this.title = ''
      }
    },
    computed: {
      showBtn: function () {
        return this.post.isLoading
      }
    }
  }
</script>