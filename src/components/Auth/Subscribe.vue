<template>
    <!-- subscribe -->
    <div class="setting">
        <error v-if="errors.length" v-bind:errors="errors"></error>
        <success v-if="success.code" v-bind:msg="success.msg"></success>
        <loading v-if="load"></loading>
        
        <div v-show="!load">
            <div class="flex col">
                <label for="name">Nom affiché <span class="error" v-if="this.error.name">Nom invalide. (min: 2 caractères)</span></label>
                <input v-model="nom" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="email">Email <span class="error" v-if="this.error.email">Email invalide ou déja pris.</span></label>
                <input v-model="email" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="password">Mot de passe <span class="error" v-if="this.error.password">Mot de passe invalide. (min: 6 caractères)</span></label>
                <input v-model="passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <label for="c_password">Mot de passe (confimation) <span class="error" v-if="this.error.c_password">Doit être identique au mot de passe.</span></label>
                <input v-model="c_passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <div v-on:click="subscribe" class="login-btn col-lg-12">S'inscrire</div>
            </div>
        </div>
    <router-link :to="{ name: 'Auth' }">
        <span class="linkauth">Je souhaite me connecter.</span>
    </router-link> 
    </div>  
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'

  export default {
    name: 'subscribe',
    data () {
      return {
        load: false,
        nom: '',
        email: '',
        passw: '',
        c_passw: '',
        success: {
          code: false,
          msg: ''
        },
        errors: [],
        error: false
      }
    },
    components: {Loading, Error, Success},
    methods: {
      subscribe: function () {
        // this.$http.post('')
        this.load = true
        let creds = {
          name: this.nom,
          email: this.email,
          password: this.passw,
          c_password: this.c_passw
        }
        this.$http.post(this.$apiURL + '/auth/register', creds)
          .then((response) => {
            this.load = false
            this.success.code = 200
            this.success.msg = 'Un email de confirmation vous à été envoyé.'
            this.nom = ''
            this.email = ''
            this.passw = ''
            this.c_passw = ''
            // console.log(response)
          })
          .catch((errorResponse) => {
            this.load = false
            this.error = errorResponse.body.error
            this.errors = [{
              name: 'Il y a des erreurs dans le formulaire.'
            }]
            // console.log(errorResponse)
          })
      }
    }
  }
</script>
<style>
  span.error {
    color: #bb3030;
    font-size: 1rem !important;
  }
</style>