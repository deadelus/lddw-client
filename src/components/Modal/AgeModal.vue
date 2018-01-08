<template>
  <div id="age-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <svg class="ageicon" viewBox="0 0 328.863 328.863">
              <g>
                <g>
                  <path d="M104.032,220.434V131.15H83.392V108.27h49.121v112.164H104.032z"/>
                </g>
                <g>
                  <path d="M239.552,137.23c0,9.76-5.28,18.4-14.08,23.201c12.319,5.119,20,15.84,20,28.32c0,20.16-17.921,32.961-45.921,32.961
                    c-28.001,0-45.921-12.641-45.921-32.48c0-12.801,8.32-23.682,21.28-28.801c-9.44-5.281-15.52-14.24-15.52-24
                    c0-17.922,15.681-29.281,40.001-29.281C224.031,107.15,239.552,118.83,239.552,137.23z M180.51,186.352
                    c0,9.441,6.721,14.721,19.041,14.721c12.32,0,19.2-5.119,19.2-14.721c0-9.279-6.88-14.561-19.2-14.561
                    C187.23,171.791,180.51,177.072,180.51,186.352z M183.391,138.83c0,8.002,5.76,12.48,16.16,12.48c10.4,0,16.16-4.479,16.16-12.48
                    c0-8.318-5.76-12.959-16.16-12.959C189.15,125.871,183.391,130.512,183.391,138.83z"/>
                </g>
                <g>
                  <path d="M292.864,120.932c4.735,13.975,7.137,28.592,7.137,43.5c0,74.752-60.816,135.568-135.569,135.568
                    S28.862,239.184,28.862,164.432c0-74.754,60.816-135.568,135.569-135.568c14.91,0,29.527,2.4,43.5,7.137V5.832
                    C193.817,1.963,179.24,0,164.432,0C73.765,0,0.001,73.764,0.001,164.432s73.764,164.432,164.431,164.432
                    S328.862,255.1,328.862,164.432c0-14.807-1.962-29.385-5.831-43.5H292.864z"/>
                </g>
                <g>
                  <polygon points="284.659,44.111 284.659,12.582 261.987,12.582 261.987,44.111 230.647,44.111 230.647,66.781 261.987,66.781 
                    261.987,98.309 284.659,98.309 284.659,66.781 316.186,66.781 316.186,44.111 		"/>
                </g>
              </g>
            </svg>
            <h3>Es-tu majeur ?</h3>
          </div>

          <div class="modal-body">
            
            Le contenu de ce site peux <strong>heurter</strong> les âmes sensibles, nous réservons donc l'accès uniquement pour les personnes majeurs.
          </div>

          <div class="modal-footer">

            <div class="modal-default-button cancel" @click="redirFragile">
              Je suis mineur
            </div>
            
            <div class="modal-default-button yes" @click="majeur()">
              Je suis majeur
            </div>
          </div>
        </div>
      </div>
      <div class="modal-layer"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'age-modal',
    mounted () {
      this.freeze(true)
    },
    methods: {
      redirFragile: function () {
        document.location.href = 'https://www.google.fr/search?q=fragile'
      },
      freeze (bool) {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = bool ? 'hidden' : ''
      },
      majeur () {
        this.freeze(false)
        this.$emit('majeur')
      }
    }
  }
</script>
<style>
  .ageicon {
    fill: white;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
</style>