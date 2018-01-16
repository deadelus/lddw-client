<template>
  <div id="disclaimer-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>Accepter le rêglement</h3>
          </div>

          <div class="modal-body">
            <div class="checkMsg">
              <input class="hide" id="rules" type="checkbox" v-model="rules"/>
              <div class="checkRow" @click="rules = !rules">
                <svg class="check" v-if="!rules" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <svg class="check" v-if="rules" viewBox="0 0 24 24"><path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <label for="rules">J'ai lu et j'accepte le <span class="link" @click="showRules = true">rêglement du site.</span></label>
              </div>
              <div class="showBox" v-if="showRules">
                <rules></rules>
              </div>
            </div>
            <div class="checkMsg">
              <input class="hide" id="cgu" type="checkbox" v-model="cgu"/>
              <div class="checkRow" @click="cgu = !cgu">
                <svg class="check" v-if="!cgu" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <svg class="check" v-if="cgu" viewBox="0 0 24 24"><path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <label for="cgu">J'ai lu et j'accepte les <span class="link" @click="showCGU = true">conditions générales d'utilisation.</span></label>
              </div>
              <div class="showBox" v-if="showCGU">
                <cgu></cgu>
              </div>
            </div>
            <div class="checkMsg">
              <input class="hide" id="age" type="checkbox" v-model="age"/>
              <div class="checkRow" @click="age = !age">
                <svg class="check" v-if="!age" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <svg class="check" v-if="age" viewBox="0 0 24 24"><path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                <label for="age">Je confirme que je suis <b>Majeur</b>.</label>
              </div>
              <div class="showBox" v-if="showCGU">
                <cgu></cgu>
              </div>
            </div>
            <p class="bottom-text">
              Vous pouvez à tout moment retrouvrer les rêgles, cgu et notre formulaire de contact en cliquant sur les liens qui figurent tout en bas dans le menu.
            </p>
          </div>

          
          <div class="modal-footer" v-if="cgu && rules && age">
            <div class="modal-default-button yes" @click="ok()">
              Accéder au site
            </div>
          </div>
        </div>
      </div>
      <div class="modal-layer"></div>
    </div>
  </div>
</template>
<script>
  import Cgu from '@/components/Disclaimer/Cgu'
  import Rules from '@/components/Disclaimer/Rules'

  export default {
    name: 'diclaimer-modal',
    data () {
      return {
        showCGU: false,
        showRules: false,
        age: false,
        rules: false,
        cgu: false
      }
    },
    components: { Cgu, Rules },
    mounted () {
      this.$freeze(true)
    },
    methods: {
      ok () {
        this.$freeze(false)
        this.$emit('ok')
      }
    }
  }
</script>
<style>
  .agetitle {
    display: inline;
    line-height: 50px;
    vertical-align: top;
  }
  .ageicon {
    fill: white;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .checkMsg {
    padding: 5px;
    cursor: pointer;
  }
  .check {
    width: 20px;
    margin-right: 10px;
  }
  .checkRow {
    display: flex;
    height: auto;
    align-items: center;
  }
  .checkMsg label {
    line-height: 20px;
    width: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .checkMsg label span{
    color: #094f84;
    font-weight: bold;
    text-decoration: underline;
  }
  .showBox {
    max-height: 150px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0,0,0);
  }
  .showBox {
    border: 2px solid #eaeaea;
    margin: 5px 0;
    box-sizing: border-box;
  }
  .bottom-txt {
    line-height: 1.5rem;
    font-size: 1.1rem;
  }
</style>