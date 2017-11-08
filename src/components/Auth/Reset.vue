<template>
    <!-- reset -->
    <div class="setting">
        <error v-if="errors.length" v-bind:errors="errors"></error>
        <success v-if="success.code" v-bind:msg="success.msg"></success>
        <loading v-if="load"></loading>
        
        <div v-show="!load">
            <div class="flex col">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="password">Mot de passe 
                  <!--<span class="error" v-if="this.error.password">Mot de passe invalide. (min: 6 caractères)</span>-->
                </label>
                <input v-model="passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <label for="c_password">Mot de passe (confimation) 
                <!--<span class="error" v-if="this.error.c_password">Doit être identique au mot de passe.</span>-->
                </label>
                <input v-model="c_passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <div v-on:click="reset" class="login-btn col-lg-12">Changer mon mot de passe</div>
            </div>
        </div>
    </div>  
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'

  export default {
    name: 'reset',
    data () {
      return {
        load: false,
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
    props: ['token'],
    methods: {
      redirection: function () {
        var count = 2
        var interval = setInterval(function () {
          if (count === 0) {
            clearInterval(interval)
            this.$router.push({ name: 'Login' })
          }
        }.bind(this), 1000)
      },
      reset: function () {
        var data = new FormData()
        this.load = true
        data.append('_method', 'PUT')
        data.append('email', this.email)
        data.append('password', this.passw)
        data.append('c_password', this.c_passw)
        data.append('token', this.token)

        this.$http({
          url: this.$apiURL + '/auth/password/reset',
          body: data,
          method: 'POST'
        })
        .then((response) => {
          this.load = false
          this.success.code = 200
          this.success.msg = 'Votre mot de passe à été changé'
          this.email = ''
          this.passw = ''
          this.c_passw = ''
        })
        .catch((errorResponse) => {
          this.load = false
          this.error = errorResponse.body.error
          this.errors = [{
            name: 'Il y a des erreurs dans le formulaire.'
          }]
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