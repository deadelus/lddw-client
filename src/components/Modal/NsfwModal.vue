<template>
  <div id="nsfw-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>Déclarer cette publication NSFW ?</h3>
          </div>

          <div class="modal-body">
            <loading v-if="load"></loading>
            <error v-if="errors.length" v-bind:errors="errors"></error>
            <p>
              Indication qu'un texte, une image, une vidéo, un son ou un lien contient des éléments jugés particulièrement <b>inappropriés</b> pour un écran de travail, s'agissant généralement de contenu indécent : vulgaire, à caractère sexuel ou violent.
            </p>
          </div>

          <div class="modal-footer">

            <div class="modal-default-button cancel" @click="cancel()">
              Annuler
            </div>
            
            <div class="modal-default-button yes" @click="ok()">
              Oui
            </div>
          </div>
        </div>
      </div>
      <div class="modal-layer" @click="cancel()"></div>
    </div>
  </div>
</template>
<script>
  import Error from '@/components/Info/Error'
  import Loading from '@/components/Info/Loading'

  export default {
    name: 'nsfw-modal',
    props: ['uri'],
    data () {
      return {
        load: false,
        errors: []
      }
    },
    mounted () {
      this.$freeze(true)
    },
    components: { Loading, Error },
    methods: {
      upload: function () {
        this.load = true
        this.$http({
          url: this.uri,
          method: 'POST'
        })
        .then((response) => {
          this.load = false
          this.$emit('close')
        })
        .catch((errorResponse) => {
          this.load = false
          this.errors.push({
            name: 'Une erreur s\'est produite.'
          })
        })
      },
      cancel () {
        this.$freeze(false)
        this.$emit('close')
      },
      ok () {
        this.$freeze(false)
        this.upload()
      }
    }
  }
</script>