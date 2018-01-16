<template>
  <div id="contact">
    <brand></brand>
    <h2>Nous contacter</h2>
    <p v-if="success" class="sucessmsg">
      Votre email à été envoyé avec succès.
    </p>
    <div class="contact-form" v-if="isLoggedIn && !success">
      <input type="text" :value="name" disabled class="mid disabled"/>
      <input type="text" :value="email" disabled class="mid disabled"/>
      <span v-if="isWarn" class="warnmsg">N'oubliez pas l'objet de votre demande</span>
      <input v-bind:class="{ warn: isWarn }" type="text" v-model="subject" placeholder="Objet de votre message"/>
      <textarea v-model="msg" placeholder="Votre message"></textarea>
      <div v-if="showBTN" class="btn" @click="upload">Envoyer</div>
    </div>
    <div v-if="!isLoggedIn" class="con">
      <p>Vous devez être connecté pour nous contacter.</p>
      <login></login>
    </div>
  </div>
</template>
<script>
  import Brand from '@/Brand'
  import Login from '@/components/Auth/Login'
  export default {
    name: 'contact',
    data () {
      return {
        name: 'John',
        email: 'john.doe@example.com',
        subject: '',
        msg: '',
        error: '',
        success: false,
        isLoggedIn: false
      }
    },
    components: { Brand, Login },
    mounted () {
      this.$Progress.start()
      this.$Progress.finish()
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
      })
    },
    methods: {
      upload: function () {
        var data = new FormData()
        data.append('_method', 'POST')
        data.append('subject', this.subject)
        data.append('msg', this.msg)

        this.$http({
          url: this.$apiURL + '/contact',
          body: data,
          method: 'POST'
        })
        .then((response) => {
          this.success = true
          this.msg = ''
          this.subject = ''
        })
        .catch((errorResponse) => {
          this.error = 'Impossible d\'envoyer le mail.'
        })
      }
    },
    computed: {
      // à chaque fois que la question change, cette fonction s'exécutera
      showBTN: function () {
        if (this.msg !== '' && this.subject !== '') {
          return true
        }
      },
      isWarn: function () {
        if (this.msg !== '' && this.subject === '') {
          return true
        }
      }
    }
  }
</script>
<style>
  #contact {
    padding: 5px;
  }
  .sucessmsg {
    padding: 15px;
    border: #eaeaea 2px solid;
    text-align: center;
    color: #333;
  }
  .con {
    max-width: 500px;
  }
  .warnmsg {
    color: #c50000 !important
  }
  .warn {
    border-color: #c50000 !important
  }
  .disabled {
    background: #FAFAFA;
    color: #999;
  }
  .contact {
    padding: 5px;
  }
  .contact-form {
    position: relative;
  }
  .contact-form input{
    display: block;
    margin-bottom: 15px;
  }
  .contact-form textarea{
    min-height: 200px
  }
  .contact-form input.mid{
    max-width: 500px;
  }
  .contact-form .btn{
    padding: 10px;
    background: black;
    color: white;
    font-size: 1.4rem;
    text-align: center;
    margin-top: 10px;
    width: 100%;
    cursor: pointer;
  }
</style>