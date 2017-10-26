<template>
    <!-- settings -->
    <div class="settings">
        <div class="col-lg-8 col-lg-offset-2">
            <div class="col-lg-12">
                <header>
                    <div class="title">Paramètres</div>
                </header>
                <div class="setting">
                    <div class="section-title">Compte</div>
                    <hr>
                    <div class="flex col">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" class="col-lg-6">
                    </div>
                    <div class="flex col"> 
                        <label for="bio">Bio</label>
                        <textarea name="bio" id="bio" class="col-lg-8"></textarea>
                    </div>
                    <div class="flex col">
                        <label for="name">Nom affiché</label>
                        <input type="text" name="name" id="name" class="col-lg-8">
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
                    </div>
                </div>
                <div class="setting">
                    <div class="section-title">Connections</div>
                    <hr>
                    <a v-show="isLoggedIn" v-on:click="logout" href="#">
                        Se deconnecter
                    </a>

                    <label class="title-social">Facebook</label>
                    <a href="#" class="social facebook">
                        Se connecter avec Facebook
                    </a>

                    <label class="title-social">Twitter</label>
                    <a href="#" class="social twitter">
                        Se connecter avec Twitter
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'settings',
    data () {
      return {
        isLoggedIn: false
      }
    },
    mounted () {
      this.isLoggedIn = this.$store.state.auth.isLoggedIn
    },
    methods: {
      logout: function () {
        this.$auth.logout()
      }
    }
  }
</script>