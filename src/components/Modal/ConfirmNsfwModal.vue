<template>
  <div id="confirm-nsfw-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-if="isLoggedIn">

          <div class="modal-header">
            <h3>Voir cette publication NSFW ?</h3>
          </div>

          <div class="modal-body">
            <p>
              Indication qu'un texte, une image, une vidéo, un son ou un lien contient des éléments jugés particulièrement <b>inappropriés</b> pour un écran de travail, s'agissant généralement de contenu indécent : vulgaire, à caractère sexuel ou violent.
            </p>
            <div class="checkMsg">
              <input id="checkbox" type="checkbox" v-model="all"/><label for="checkbox">Voir toute les publication NSFW ?</label>
            </div>
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
  import Login from '@/components/Auth/Login'

  export default {
    name: 'confirm-nsfw-modal',
    data () {
      return {
        isLoggedIn: false,
        all: false
      }
    },
    components: { Login },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
      })
      this.$freeze(true)
    },
    methods: {
      cancel () {
        this.$freeze(false)
        this.$emit('close')
      },
      ok () {
        this.$freeze(false)
        this.$emit('show', this.all)
      }
    }
  }
</script>
<style>
  .checkMsg {
    padding: 5px;
  }

  .checkMsg input {
    width: 15px;
    height: 15px;
    margin: 0 10px 0 0;
  }
  .checkMsg label {
    line-height: 20px;
    display: inline-block;
    height: 20px;
    vertical-align: top;
    text-decoration: underline;
  }
</style>