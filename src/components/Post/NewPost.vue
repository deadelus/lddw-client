<template>

  

  <div id="new-post">
    <div class="col-lg-8 col-lg-offset-2">
      <div class="flex col">
        <h1>Nouvelle publication ({{char}})</h1>

        <success v-if="success.code" v-bind:msg="success.msg"></success>
        <loading v-if="load"></loading>
        <error v-if="errors.length" v-bind:errors="errors"></error>

        <textarea v-if="!load" v-model="title" @keydown="autoresize" id="title-post" type="text" placeholder="Un peu de texte..."></textarea>

      </div>
      
      <media v-if="!load"></media>
      
      <div v-if="showBtn" @click="upload" class="btn post-btn">Envoyer</div>

    </div>
  </div>
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'
  import Media from '@/components/Media/Media.vue'

  export default {
    name: 'new-post',
    data () {
      return {
        load: false,
        title: '',
        tags: '',
        post: {},
        success: {
          code: false,
          msg: 'Vous êtes déja connecté'
        },
        errors: []
      }
    },
    components: { Media, Loading, Error, Success },
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
        var t = this
        t.$Progress.tempColor('#2ecc71')
        t.$Progress.start()

        this.load = true
        this.errors = []
        var data = new FormData()
        if (this.title !== '') {
          data.append('title', this.title)
        }
        data.append('file', this.post.file)
        this.$http({
          url: this.$store.getters.user.actions.new_post,
          body: data,
          method: 'POST',
          progress: function (pe) {
            // if (pe.lengthComputable) {
            //   var val = pe.loaded / pe.total
            //   // console.log(pe.loaded + '/' + pe.total)
            //   // console.log((100 * val) + '%')
            //   t.$Progress.set(100 + val)
            // }
          }
        })
        .then((response) => {
          t.$Progress.finish()
          this.$store.commit('CLEAR_POST')
          this.reset()
          this.load = false
          this.success.code = 200
          this.success.msg = 'Déchet publié !'
          this.$router.push({name: 'Home'})
          console.log(response)
        })
        .catch((errorResponse) => {
          // console.log(errorResponse)
          this.$Progress.fail()
          this.load = false
          if (errorResponse.status === 500) {
            this.errors.push({
              name: 'Fichier non supporté.'
            })
          }
          if (errorResponse.error.title) {
            this.errors.push({
              name: 'Titre trop long. (max: 250 caractères)'
            })
          }
        })
      },
      reset: function () {
        this.title = ''
      },
      autoresize: function (e) {
        var el = e.target
        setTimeout(function () {
          el.style.cssText = 'height:auto'
          el.style.cssText = 'height:' + el.scrollHeight + 'px'
        }, 0)
      }
    },
    computed: {
      showBtn: function () {
        return this.post.isLoading
      },
      char: function () {
        var max = 250
        var long = this.title.length
        var char = max - long
        if (char < 0) {
          this.title = this.title.slice(0, max)
        }
        return this.title.length + '/' + max
      }
    }
  }
</script>
<style>
  #title-post{
    height: 100px;
  }
</style>
