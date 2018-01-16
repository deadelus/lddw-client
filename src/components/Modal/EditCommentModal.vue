<template>
  <div id="edit-comment-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>Edition ({{char}})</h3>
          </div>

          <div class="modal-body">
            <loading v-if="load"></loading>
            <error v-if="errors.length" v-bind:errors="errors"></error>
            <textarea v-if="!load" type="text" v-model="replaceBody" placeholder="Un peu de texte..."></textarea>
          </div>

          <div class="modal-footer">

            
            <div class="modal-default-button cancel" @click="cancel()">
              Annuler
            </div>
            
            <div class="modal-default-button yes" @click="ok()">
              Enregistrer
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
    name: 'edit-comment-modal',
    props: ['body', 'uri'],
    data () {
      return {
        replaceBody: '',
        load: false,
        errors: []
      }
    },
    components: { Loading, Error },
    mounted () {
      this.replaceBody = this.body
      this.$freeze(true)
    },
    computed: {
      char: function () {
        var max = 1000
        var long = this.replaceBody.length
        var char = max - long
        if (char < 0) {
          this.replaceBody = this.replaceBody.slice(0, max)
        }
        return this.replaceBody.length + '/' + max
      }
    },
    methods: {
      upload: function () {
        this.load = true
        var data = new FormData()
        data.append('_method', 'PUT')
        data.append('body', this.replaceBody)
        this.$http({
          url: this.uri,
          body: data,
          method: 'POST'
        })
        .then((response) => {
          // console.log(response)
          this.load = false
          this.$emit('edit', this.replaceBody)
          this.$emit('close')
        })
        .catch((errorResponse) => {
          this.load = false
          if (errorResponse.status === 500) {
            this.errors.push({
              name: 'Une erreur s\'est produite.'
            })
          }
          if (errorResponse.error.title) {
            this.errors.push({
              name: 'Titre trop long. (max: 1000 caractères)'
            })
          }
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