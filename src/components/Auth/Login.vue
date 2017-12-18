<template>
    <!-- subscribe -->
    <div class="setting" v-if="!isLoggedIn">
        <error v-if="errors.length" v-bind:errors="errors"></error>
        <success v-if="isLoggedIn" v-bind:msg="success.msg"></success>
        <loading v-if="load"></loading>

        <social></social>

        <br>

        <div class="login-form" v-show="!load">
            <div class="flex col">
                <label for="username">Email</label>
                <input v-model="username" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="pawword">Mot de passe</label>
                <input v-model="password" type="password" class="col-lg-12">
            </div>
            <div v-on:click="login" class="login-btn">Se connecter</div> 
        </div>
    </div>
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'
  import Social from '@/components/Auth/Social'

  export default {
    name: 'login',
    data () {
      return {
        load: false,
        isLoggedIn: false,
        username: '',
        password: '',
        success: {
          code: false,
          msg: 'Vous êtes déja connecté'
        },
        errors: []
      }
    },
    components: {Loading, Error, Success, Social},
    methods: {
      login: function () {
        this.load = true
        this.isLoggedIn = false
        this.errors = []

        const credential = {
          username: this.username,
          password: this.password
        }

        this.$auth.login(credential, false)
        .then((response) => {
          if (response.status !== 200) {
            this.errors = [{
              name: 'L\'utilisateur n\'existe pas.'
            }]
            this.load = false
            return
          }

          this.load = false
          this.success.code = 200
          this.success.msg = 'Vous êtes connecté !'
          this.username = ''
          this.password = ''
          this.$emit('loggued')
        })
      }
    }
  }
</script>