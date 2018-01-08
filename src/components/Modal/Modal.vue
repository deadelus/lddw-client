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
      <div class="modal-layer" @click="show = false"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal'
  }
</script>