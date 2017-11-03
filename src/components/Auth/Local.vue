<template>
    <!-- subscribe -->
    <div class="setting">
        <div v-show="loading">
            Inscription...
        </div>
        <div v-show="!loading">
            <div class="flex col">
                <label for="name">Nom affiché</label>
                <input v-model="nom" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="col-lg-12">
            </div>
            <div class="flex col">
                <label for="password">Password</label>
                <input v-model="passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <label for="c_password">Password (confimation)</label>
                <input v-model="c_passw" type="password" class="col-lg-8">
            </div>
            <div class="flex col">
                <div v-on:click="subscribe" class="login-btn col-lg-12">S'inscrire</div>
            </div>
        </div>
        <!--<div class="flex col"> 
            <label for="bio">Bio</label>
            <textarea name="bio" id="bio" class="col-lg-8"></textarea>
        </div>
        <div class="flex col">
            <label for="photo">Photo</label>
            <div class="flex flex-row photo">
                <div class="old">
                    <img src="http://placehold.it/50x50" alt="">
                </div>
                <div class="btn">
                    Changer le photo
                </div>
                <input type="file" name="photo" class="hide" id="photo">
            </div>
        </div>-->
    <router-link :to="{ name: 'Auth' }">
        <span class="linkauth">Je souhaite me connecter.</span>
    </router-link> 
    </div>  
</template>
<script>
  export default {
    name: 'local',
    data () {
      return {
        loading: false,
        nom: '',
        email: '',
        passw: '',
        c_passw: ''
      }
    },
    methods: {
      subscribe: function () {
        // this.$http.post('')
        console.log(this)
        let creds = {
          name: this.nom,
          email: this.email,
          password: this.passw,
          c_password: this.c_passw
        }
        this.$http.post(this.$apiURL + '/auth/register', creds)
          .then((response) => {
            console.log(response)
          })
          .catch((errorResponse) => {
            console.log(errorResponse)
          })
      }
    }
  }
</script>