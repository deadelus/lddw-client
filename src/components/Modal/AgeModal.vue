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
            
            <div class="modal-default-button yes" @click="$emit('close')">
              Je suis majeur
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'age-modal',
    methods: {
      redirFragile: function () {
        document.location.href = 'https://www.google.fr/search?q=fragile'
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

  .ageicon {
    fill: white;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
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
    background: #b31f48;
    display: flex;
    flex-direction: row;
  }

  .modal-header h3 {
    margin: auto 0;
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
    background: #b31f48;
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