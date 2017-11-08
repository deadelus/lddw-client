<template>
    <!-- subscribe -->
    <div class="setting">
        <error v-if="errors.length" v-bind:errors="errors"></error>
        <success v-if="success.code" v-bind:msg="success.msg"></success>
        <loading v-if="load"></loading>

        <div class="login-form" v-show="!load">
            <div class="flex col">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="col-lg-12">
            </div>
            <div v-on:click="forgot" class="login-btn">Envoyer</div>
        </div>
    </div>
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'

  export default {
    name: 'forgot',
    data () {
      return {
        load: false,
        email: '',
        success: {
          code: false,
          msg: 'Vous êtes déja connecté'
        },
        errors: []
      }
    },
    components: {Loading, Error, Success},
    methods: {
      forgot: function () {
        this.load = true
        this.errors = []

        const credential = {
          email: this.email
        }

        this.$http.post(this.$apiURL + '/auth/password/forgot', credential)
        .then((response) => {
          this.load = false
          this.success.code = 200
          this.success.msg = 'Un email de récupération vous à été envoyé.'
          this.email = ''
          return
        })
        .catch((errorResponse) => {
          this.errors = [{
            name: 'L\'utilisateur n\'existe pas.'
          }]
          this.load = false
        })
      }
    }
  }
</script>