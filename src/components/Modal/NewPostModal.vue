<template>
  <div id="new-post">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-if="isLoggedIn">

          <div class="modal-header">
            <h1>Nouvelle publication ({{char}})</h1>
          </div>

          <div class="modal-body">
            <success v-if="success.code" v-bind:msg="success.msg"></success>
            <loading v-if="load"></loading>
            <error v-if="errors.length" v-bind:errors="errors"></error>

            <div v-if="step == 4">
              <textarea v-if="!load" v-model="title" @keydown="autoresize" id="title-post" type="text" placeholder="#tague ta publication"></textarea>
              <div class="nsfwcheckbox">
                <input type="checkbox" name="nsfw" :value="isNsfw" @click="isNsfw = !isNsfw" id="isNsfw"/>
                <label for="isNsfw">Attention, si cette publication est de type NSFW (Not Safe For Work / Pas sur pour le travail) cochez la case. Une publication mal catégorisée sera SUPRIMÉ et l'auteur banni si récidive.</label>
              </div>
            </div>

            <div v-if="step == 3">
              <label for="pic">Lien vers l'image</label><br><br>
              <input id="pic" type="text" placeholder="http:// Lien de la source du fichier" v-model="linkImage" @change="linkVideo = null, file = null"/>
            </div>
            <div v-if="step == 2">
              <label for="video">Lien vers la video (Youtube, Vimeo ou MP4)</label><br><br>
              <input id="video" type="text" placeholder="http:// Lien de la source du fichier" v-model="linkVideo" @change="linkImage = null, file = null"/>
            </div>

            <div v-if="step === 1">
              <media
                @selected="loadFile"
                @cancel="reset">
              </media>

              <div class="choices">
                <div class="pic" @click="step = 3">
                  <svg viewBox="0 0 37 33"><path id="Painting" d="M34.006,0c1.11,0.006 2,0.899 2,2l0,20.033l0,0l0,0l0,7.973c0,1.105 -0.895,2 -2,2l-24.021,0l-0.001,0l0,0l-7.984,0c-1.104,0 -2,-0.895 -2,-2l0,-28.006c0,-1.101 0.89,-1.994 2,-2l32.006,0Zm-2.001,17.215l0,-12.214c0,-0.552 -0.447,-1 -1,-1l-26.004,0c-0.553,0 -1,0.448 -1,1l0,22.004c0,0.553 0.447,1.001 1,1.001l4.197,0l15.175,-15.176c0.061,-0.09 0.131,-0.172 0.209,-0.25c0.391,-0.391 0.905,-0.584 1.417,-0.577c0.514,-0.007 1.032,0.187 1.425,0.58c0.089,0.089 0.168,0.185 0.235,0.286l4.346,4.346Zm0,5.578l-5.993,-5.993l-11.205,11.206l16.198,0c0.558,-0.006 1,-0.452 1,-1.001l0,-4.212Zm-16.002,-10.791c0,2.21 -1.791,4.001 -4.001,4.001c-2.209,0 -4.001,-1.791 -4.001,-4.001c0,-2.209 1.792,-4 4.001,-4c2.21,0 4.001,1.791 4.001,4Z"/></svg>
                  <span>Lien Image</span>
                </div>
                <div class="movie" @click="step = 2">
                  <svg viewBox="0 0 25 28"><path id="Play" d="M4,5.828l13.83,8.172l-13.83,8.172l0,-16.344m-2,-5.828c-1.105,0 -2,0.895 -2,2l0,24c0,1.105 0.895,2 2,2l21.139,-12.491c0.534,-0.316 0.861,-0.889 0.861,-1.509c0,-0.62 -0.327,-1.193 -0.861,-1.509l-21.139,-12.491l0,0Z" style="fill-rule:nonzero;"/></svg>
                  <span>Lien Video</span>
                </div>
                <div class="meme">
                  <img src="./../../assets/trollface.png" />
                  <!--<span>Créer un meme</span>-->
                  <span>* Bientôt *</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-default-button cancel" @click="cancel()">
              Annuler
            </div>
            <div class="modal-default-button yes" v-if="step >= 2" @click="step = 1">
              Précédent
            </div>
            <div class="modal-default-button yes" v-if="(step == 2 || step == 3) && (linkImage || linkVideo)" @click="step = 4">
              Suivant
            </div>
            <div class="modal-default-button yes" v-if="step === 4" @click="ok()">
              Enregistrer
            </div>
          </div>
        </div>

        <div class="modal-container" v-if="!isLoggedIn">

          <div class="modal-header">
            <h3>Connection requise</h3>
          </div>

          <div class="modal-body">
            <login></login>
          </div>

          <div class="modal-footer">

            <div class="modal-default-button cancel" @click="cancel()">
              Annuler
            </div>
          </div>
        </div>

      </div>
      <div class="modal-layer" @click="cancel()"></div>
    </div>
  </div>
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'
  import Media from '@/components/Media/Media.vue'
  import Login from '@/components/Auth/Login'

  export default {
    name: 'new-post-modal',
    data () {
      return {
        load: false,
        title: '',
        isNsfw: false,
        file: null,
        linkImage: null,
        linkVideo: null,
        step: 1,
        tags: null,
        post: {},
        isLoggedIn: false,
        success: {
          code: false,
          msg: 'Vous êtes déja connecté'
        },
        errors: []
      }
    },
    components: { Media, Loading, Error, Success, Login },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
      })
      this.$store.watch((state) => {
        this.post = this.$store.getters.post
      })
      this.freeze(true)
    },
    methods: {
      loadFile: function (file) {
        this.file = file
        this.linkImage = null
        this.linkVideo = null
        this.step = 4
      },
      uploadLink: function () {
        var data = new FormData()
        var uri = ''
        data.append('title', this.title)
        data.append('nsfw', this.isNsfw)
        uri = this.$store.getters.user.actions.new_post_link
        if (this.linkImage) {
          data.append('link', this.linkImage)
          data.append('type', 'picture')
        }
        if (this.linkVideo) {
          data.append('link', this.linkVideo)
          data.append('type', 'video')
        }

        this.load = true
        this.errors = []

        this.$http({
          url: uri,
          body: data,
          method: 'POST'
        })
        .then((response) => {
          this.reset()
          this.load = false
          this.success.code = 200
          this.success.msg = 'Déchet publié !'
          this.$router.push({name: 'Home'})
          this.$emit('close')
        })
        .catch((errorResponse) => {
          this.load = false
          if (errorResponse.status === 500) {
            this.errors.push({
              name: 'Lien incorrect.'
            })
          }
          if (errorResponse.error.title) {
            this.errors.push({
              name: 'Titre trop long. (max: 250 caractères)'
            })
          }
        })
      },
      uploadFile: function () {
        var data = new FormData()
        data.append('title', this.title)
        data.append('file', this.file)
        data.append('nsfw', this.isNsfw)
        this.load = true
        this.errors = []

        this.$http({
          url: this.$store.getters.user.actions.new_post_file,
          body: data,
          method: 'POST'
        })
        .then((response) => {
          this.reset()
          this.load = false
          this.success.code = 200
          this.success.msg = 'Déchet publié !'
          this.$router.push({name: 'Home'})
          this.$emit('close')
        })
        .catch((errorResponse) => {
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
      upload: function () {
        if (this.file) {
          this.uploadFile()
        }
        if (this.linkImage || this.linkVideo) {
          this.uploadLink()
        }
      },
      reset: function () {
        this.title = ''
        this.linkImage = null
        this.linkVideo = null
        this.file = null
      },
      autoresize: function (e) {
        var el = e.target
        setTimeout(function () {
          el.style.cssText = 'height:auto'
          el.style.cssText = 'height:' + el.scrollHeight + 'px'
        }, 0)
      },
      freeze (bool) {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = bool ? 'hidden' : ''
      },
      cancel () {
        this.freeze(false)
        this.$emit('close')
      },
      ok () {
        this.freeze(false)
        this.upload()
      }
    },
    computed: {
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