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
                        <input v-model="update.email" type="text" id="email" class="col-lg-6" :placeholder="user.email">
                    </div>
                    <div class="flex col"> 
                        <label for="bio">Bio</label>
                        <textarea v-model="update.bio" id="bio" class="col-lg-8" :placeholder="user.bio"></textarea>
                    </div>
                    <div class="flex col">
                        <label for="name">Nom affiché</label>
                        <input v-model="update.name" type="text" id="name" class="col-lg-8" :placeholder="user.name">
                    </div>
                </div>
                <div class="setting">
                    <div class="section-title">Connections</div>
                    <hr>
                    
                    <a href="#" class="social facebook">
                        Ajouter mon compte Facebook
                    </a>

                    <a href="#" class="social twitter">
                        Ajouter mon compte Twitter
                    </a>

                    <a class="social btn-logout" @click.prevent="logout" href="#">
                        Se deconnecter
                    </a>
                </div>
                <div class="setting">
                </div>
                <div class="btn-save">
                  Enregistrer les modifications
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
        user: {},
        update: {}
      }
    },
    mounted () {
      this.user = this.$store.getters.user
    },
    methods: {
      logout: function () {
        this.$auth.logout()
      },
      upload: function () {
        return false
      }
    }
  }
</script>