<template>
    <!-- subscribe -->
    <div class="setting">
      <error v-if="errors.length" v-bind:errors="errors"></error>
      <success v-if="success.code" v-bind:msg="success.msg"></success>
      <loading v-if="load"></loading>
      
      <div v-if="errors.length" @click="confirm">Essayer encore</div>
    </div>  
</template>
<script>
  import Loading from '@/components/Info/Loading'
  import Error from '@/components/Info/Error'
  import Success from '@/components/Info/Success'

  export default {
    name: 'confirmed',
    data () {
      return {
        load: false,
        success: {
          code: false,
          msg: ''
        },
        errors: []
      }
    },
    components: {Loading, Error, Success},
    props: ['confirmation_code'],
    mounted () {
      this.confirm()
    },
    methods: {
      redirection: function () {
        var count = 2
        var interval = setInterval(function () {
          if (count === 0) {
            clearInterval(interval)
            this.$router.push({ name: 'Home' })
          }
        }.bind(this), 1000)
      },
      confirm: function () {
        this.errors = false
        this.load = true
        let params = {
          confirmation_code: this.confirmation_code
        }
        this.$http.post(this.$apiURL + '/auth/validation', params)
          .then((response) => {
            this.load = false
            this.success.code = true
            this.success.msg = response.body.success
            this.redirection()
          })
          .catch((errorResponse) => {
            this.load = false
            this.errors = [{
              name: errorResponse.body.error
            }]
          })
      }
    }
  }
</script>