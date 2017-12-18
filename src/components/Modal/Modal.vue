<template>
  <div id="modal-template" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="show = false">
        <div class="modal-container">

          <div class="modal-header">
            <h3>Attention</h3>
          </div>

          <div class="modal-body">
            Êtes-vous sur de vouloir faire cela ?
          </div>

          <div class="modal-footer">

            
            <div class="modal-default-button cancel" @click="show = false">
              Annuler
            </div>
            
            <div class="modal-default-button yes" @click="doYes">
              Oui
            </div>

          </div>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal'
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

  #modal-template .modal-mask {
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

  #modal-template .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  #modal-template .modal-container {
    width: 300px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  #modal-template .modal-footer {
    padding: 10px 15px;
    /*border-top: 1px #ccc solid;*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  #modal-template .modal-header{
    color: white;
    background: #b31f48;
  }

  #modal-template .modal-header h3 {
    margin: 0;
    font-size: 2rem;
  }

  #modal-template .modal-header,
  #modal-template .modal-body {
    padding: 15px;
    line-height: 2rem;
  }

  #modal-template .modal-default-button {
    margin-left: 5px;
    /* border: 1px solid; */
    padding: 5px 15px;
    cursor: pointer;
  }

  #modal-template .modal-default-button.cancel:hover {
    text-decoration: underline;
  }

  #modal-template .modal-default-button.yes:hover{
    opacity: 0.8;
  }
  #modal-template .modal-default-button.yes{
    /*font-weight: bold;*/
    color: white;
    background: #b31f49;
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

  #modal-template .modal-enter {
    opacity: 0;
  }

  #modal-template .modal-leave-active {
    opacity: 0;
  }

  #modal-template .modal-enter #modal-template .modal-container,
  #modal-template .modal-leave-active #modal-template .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>