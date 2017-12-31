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
          </div>

          <div class="modal-footer">

            <div class="modal-default-button cancel" @click="$emit('close')">
              Annuler
            </div>
            
            <div class="modal-default-button yes" @click="$emit('show')">
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

            <div class="modal-default-button cancel" @click="$emit('close')">
              Annuler
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Login from '@/components/Auth/Login'

  export default {
    name: 'confirm-nsfw-modal',
    data () {
      return {
        isLoggedIn: false
      }
    },
    components: { Login },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
      })
    }
  }
</script>
<style>
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