<template>
  <div id="edit-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>Edition ({{char}})</h3>
          </div>

          <div class="modal-body">
            <loading v-if="load"></loading>
            <error v-if="errors.length" v-bind:errors="errors"></error>
            <textarea v-if="!load" type="text" v-model="replaceTitle" placeholder="Un peu de texte..."></textarea>
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
    name: 'edit-modal',
    props: ['title', 'uri'],
    data () {
      return {
        replaceTitle: '',
        load: false,
        errors: []
      }
    },
    components: { Loading, Error },
    mounted () {
      this.replaceTitle = this.title
      this.$freeze(true)
    },
    computed: {
      char: function () {
        var max = 250
        var long = this.replaceTitle.length
        var char = max - long
        if (char < 0) {
          this.replaceTitle = this.replaceTitle.slice(0, max)
        }
        return this.replaceTitle.length + '/' + max
      }
    },
    methods: {
      upload: function () {
        this.load = true
        var data = new FormData()
        data.append('_method', 'PUT')
        data.append('title', this.replaceTitle)
        this.$http({
          url: this.uri,
          body: data,
          method: 'POST'
        })
        .then((response) => {
          // console.log(response)
          this.load = false
          this.$emit('edit', this.replaceTitle)
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
              name: 'Titre trop long. (max: 250 caractères)'
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