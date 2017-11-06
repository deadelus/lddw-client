<template>
    <!-- subscribe -->
    <div class="setting">
      <error v-if="errors.length" v-bind:errors="errors"></error>
      <success v-if="success.code" v-bind:msg="success.msg"></success>
      <loading v-if="load"></loading>
      <div v-if="success.code">
        {{ this.redirectionMsg }}
      </div>
      <!--<div @click="confirm">Essayer encore</div>-->
    </div>  
</template>
<script>
  import loading from '@/components/info/loading'
  import error from '@/components/info/error'
  import success from '@/components/info/success'

  export default {
    name: 'confirmed',
    data () {
      return {
        load: false,
        redirectionMsg: '',
        success: {
          code: false,
          msg: ''
        },
        errors: []
      }
    },
    components: {loading, error, success},
    props: ['confirmation_code'],
    mounted () {
      this.confirm()
    },
    methods: {
      redirection: function () {
        this.redirectionMsg = 'Redirection dans'
        var count = 5
        var interval = setInterval(function () {
          this.redirectionMsg = this.redirectionMsg + '  ...' + count--
          if (count === 0) {
            clearInterval(interval)
            this.$router.push({ name: 'Auth' })
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