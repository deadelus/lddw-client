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
                        <label for="bio">Mini bio ({{ char }})</label>
                        <textarea v-model="update.bio" id="bio" class="col-lg-8" :placeholder="user.bio"></textarea>
                    </div>
                    <div class="flex col">
                        <label for="name">Nom affiché</label>
                        <input v-model="update.name" type="text" id="name" class="col-lg-8" :placeholder="user.name">
                    </div>
                </div>
                <div class="setting">
                    <div class="section-title">Connections</div>
                    <!--<hr>
                    
                    <a href="#" class="social facebook">
                        Ajouter mon compte Facebook
                    </a>

                    <a href="#" class="social twitter">
                        Ajouter mon compte Twitter
                    </a>-->

                    <a class="social btn-logout" @click.prevent="logout" href="#">
                        Se deconnecter
                    </a>
                </div>
                <div class="setting">
                </div>
                <div class="btn-save" @click="updateInfo" v-if="filled">
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
        update: {
          name: '',
          bio: '',
          email: ''
        }
      }
    },
    mounted () {
      this.$Progress.start()
      this.user = this.$store.getters.user
      this.$Progress.finish()
    },
    methods: {
      updateInfo: function () {
        if (!this.filled) {
          return
        }
        var data = new FormData()
        data.append('_method', 'PUT')
        if (this.update.name !== '') {
          data.append('name', this.update.name)
        }
        if (this.update.bio !== '') {
          data.append('bio', this.update.bio)
        }
        if (this.update.email !== '') {
          data.append('email', this.update.email)
        }

        this.$http.post(this.user.actions.updateInfo, data)
        .then((response) => {
          this.user.name = response.body.data.name
          this.user.bio = response.body.data.bio
          this.user.email = response.body.data.email

          this.reset()

          this.$store.commit('UPDATE_USER', this.user)
          // console.log(response)
        })
        .catch((errorResponse) => {
          // console.log(errorResponse)
        })
      },
      logout: function () {
        this.$auth.logout()
      },
      reset: function () {
        this.update = {
          name: '',
          bio: '',
          email: ''
        }
      }
    },
    computed: {
      char: function () {
        var max = 40
        var long = this.update.bio.length
        var char = max - long
        if (char < 0) {
          this.update.bio = this.update.bio.slice(0, max)
        }
        return this.update.bio.length + '/' + max
      },
      filled: function () {
        if (this.update.name === '' && this.update.bio === '' && this.update.email === '') {
          return false
        }
        return true
      }
    }
  }
</script>