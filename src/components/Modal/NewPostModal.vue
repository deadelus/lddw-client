<template>
  <div id="new-post">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h1>Nouvelle publication ({{char}})</h1>
          </div>

          <div class="modal-body">
            <success v-if="success.code" v-bind:msg="success.msg"></success>
            <loading v-if="load"></loading>
            <error v-if="errors.length" v-bind:errors="errors"></error>

            <div v-if="step == 2">
              <textarea v-if="!load" v-model="title" @keydown="autoresize" id="title-post" type="text" placeholder="#tague ta publication"></textarea>
              <div class="nsfwcheckbox">
                <input type="checkbox" name="nsfw" :value="isNsfw" @click="isNsfw = !isNsfw" id="isNsfw"/>
                <label for="isNsfw">Attention, si cette publication est de type NSFW (Not Safe For Work / Pas sur pour le travail) cochez la case. Une publication mal catégorisée sera SUPRIMÉ et l'auteur banni si récidive.</label>
              </div>
            </div>

            <div v-if="step == 1">
              <div v-if="linkImage">
                <label for="pic">Taper ou coller le lien vers l'image</label><br><br>
                <input id="pic" type="text" placeholder="http:// Lien de la source du fichier" v-model="sourceImage"/>
              </div>
              
              <div v-if="linkVideo">
                <label for="video">Taper ou coller le lien vers la video</label><br><br>
                <input id="video" type="text" placeholder="http:// Lien de la source du fichier" v-model="sourceVideo"/>
              </div>

              <media v-if="!load && !linkImage && !linkVideo"></media>

              <div class="choices" v-if="!linkImage && !linkVideo">
                <div class="pic" @click="linkImage = true">
                  <svg viewBox="0 0 37 33"><path id="Painting" d="M34.006,0c1.11,0.006 2,0.899 2,2l0,20.033l0,0l0,0l0,7.973c0,1.105 -0.895,2 -2,2l-24.021,0l-0.001,0l0,0l-7.984,0c-1.104,0 -2,-0.895 -2,-2l0,-28.006c0,-1.101 0.89,-1.994 2,-2l32.006,0Zm-2.001,17.215l0,-12.214c0,-0.552 -0.447,-1 -1,-1l-26.004,0c-0.553,0 -1,0.448 -1,1l0,22.004c0,0.553 0.447,1.001 1,1.001l4.197,0l15.175,-15.176c0.061,-0.09 0.131,-0.172 0.209,-0.25c0.391,-0.391 0.905,-0.584 1.417,-0.577c0.514,-0.007 1.032,0.187 1.425,0.58c0.089,0.089 0.168,0.185 0.235,0.286l4.346,4.346Zm0,5.578l-5.993,-5.993l-11.205,11.206l16.198,0c0.558,-0.006 1,-0.452 1,-1.001l0,-4.212Zm-16.002,-10.791c0,2.21 -1.791,4.001 -4.001,4.001c-2.209,0 -4.001,-1.791 -4.001,-4.001c0,-2.209 1.792,-4 4.001,-4c2.21,0 4.001,1.791 4.001,4Z"/></svg>
                  <span>Déposer un lien vers une Image</span>
                </div>
                <div class="movie" @click="linkVideo = true">
                  <svg viewBox="0 0 25 28"><path id="Play" d="M4,5.828l13.83,8.172l-13.83,8.172l0,-16.344m-2,-5.828c-1.105,0 -2,0.895 -2,2l0,24c0,1.105 0.895,2 2,2l21.139,-12.491c0.534,-0.316 0.861,-0.889 0.861,-1.509c0,-0.62 -0.327,-1.193 -0.861,-1.509l-21.139,-12.491l0,0Z" style="fill-rule:nonzero;"/></svg>
                  <span>Déposer un lien vers une Video</span>
                </div>
                <div class="meme">
                  <img src="./../../assets/trollface.png" />
                  <span>Créer un meme</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-default-button cancel" @click="$emit('close')">
              Annuler
            </div>
            <div class="modal-default-button yes" v-if="step === 2" @click="prev">
              Précédent
            </div>
            <div class="modal-default-button yes" v-if="showBtn && step === 1 || linkImage || linkVideo" @click="next">
              Suivant
            </div>
            <div class="modal-default-button yes" v-if="step === 2" @click="upload">
              Enregistrer
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'
  import Media from '@/components/Media/Media.vue'

  export default {
    name: 'new-post-modal',
    data () {
      return {
        load: false,
        title: '',
        isNsfw: false,
        sourceImage: '',
        sourceVideo: '',
        linkImage: false,
        linkVideo: false,
        step: 1,
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
        if (this.sourceImage !== '') {
          data.append('image_url', this.sourceImage)
        }
        if (this.sourceVideo !== '') {
          data.append('video_url', this.sourceVideo)
        }
        if (this.sourceImage === '' || this.sourceVideo === '') {
          data.append('file', this.post.file)
        }
        data.append('nsfw', this.isNsfw)

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
          // console.log(response)
          this.$emit('close')
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
        this.sourceVideo = false
        this.sourceImage = false
      },
      autoresize: function (e) {
        var el = e.target
        setTimeout(function () {
          el.style.cssText = 'height:auto'
          el.style.cssText = 'height:' + el.scrollHeight + 'px'
        }, 0)
      },
      next: function () {
        if (this.step === 1) {
          this.step = 2
        }
      },
      prev: function () {
        if (this.step === 2) {
          this.step = 1
        }
        this.linkImage = false
        this.linkVideo = false
      }
    },
    computed: {
      sourceVideo: function () {
        this.sourceImage = false
      },
      sourceImage: function () {
        this.sourceVideo = false
      },
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

  @keyframes showModal {
    from {
      opacity: 0
    }

    to {
      opacity: 1
    }
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    animation-duration: 0.3s;
    animation-name: showModal;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 100%;
    max-width: 750px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-footer {
    padding: 10px 15px;
    /*border-top: 1px #ccc solid;*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  .modal-header{
    color: white;
    background: #000;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 2rem;
  }

  .modal-header,
  .modal-body {
    padding: 15px;
    line-height: 2rem;
  }

  .modal-default-button {
    margin-left: 5px;
    /* border: 1px solid; */
    padding: 5px 15px;
    cursor: pointer;
  }

  .modal-default-button.cancel:hover {
    text-decoration: underline;
  }

  .modal-default-button.yes:hover{
    opacity: 0.8;
  }
  .modal-default-button.yes{
    /*font-weight: bold;*/
    color: white;
    background: #000;
    border-radius: 2px;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>