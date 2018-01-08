<template>
  <div id="light-box">
    <div class="modal-mask" @click="cancel()">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <img :src="path" alt="lightbox"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'light-box',
    props: ['path'],
    mounted () {
      this.freeze(true)
      console.log('ok')
    },
    // Other Solution
    // beforeDestroy () {
    //   window.document.body.style.overflow = ''
    // },
    methods: {
      freeze (bool) {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = bool ? 'hidden' : ''
      },
      cancel () {
        this.freeze(false)
        this.$emit('close')
      }
    }
  }
</script>
<style>
  #light-box .modal-body {
    padding: 8px !important;
  }
  #light-box .modal-wrapper {
    margin: auto;
    padding: 10px;
    z-index: 9999;
    max-width: 100% !important;
    width: auto;
  }
</style>