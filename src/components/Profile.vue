<template>
    <!-- header profile -->
    <div id="profile">
        <section class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="profile">
                        <form enctype="multipart/form-data" action="" metods="POST">
                        <input type="hidden" name="_method" value="PUT"/>
                        <header>
                            <label for="avatar" class="avatar" v-if="!filepath">
                                <img :src="user.avatar || 'http://placehold.it/50x50'" alt="avatar">
                            </label>
                            <div class="avatar" @click="reset" v-if="filepath">
                                <img :src="filepath" alt="avatar">
                            </div>

                            <input @change="sync" id="avatar" name="avatar" type="file" accept="image/*;" class="hide">
                            
                            <div class="info">
                                <span class="name">John Snow 
                                    <router-link :to="{ name: 'UserSettings' }">
                                        <span class="ico gear"></span>
                                    </router-link>
                                </span>
                                <span class="desc">Une bio de 40 caractères</span>
                                <span class="social">
                                    <span class="ico fb"></span>
                                    <span class="ico tw"></span>
                                </span>
                            </div>
                        </header>
                        <span @click="upload" class="btn-save" v-if="filepath">
                            Enregistrer
                        </span>
                        </form>
                    </div>
                </div>
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="col-lg-12">
                        <router-link :to="{ name: 'UserPosts' }">
                            <span for="dechet" class="nb-dechet">122 déchêts postés</span>
                        </router-link>
                        |
                        <router-link :to="{ name: 'UserBookmarks' }">
                            <span for="dechet" class="nb-dechet">122 déchêts sauvegardés</span>
                        </router-link>
                        |
                        <router-link :to="{ name: 'UserTrophies' }">
                            <span for="reward" class="nb-dechet">1 trophé obtenu</span> 
                        </router-link>
                    </div>
                </div>
            </div>
        </section>    
        <hr>
        <!-- posts -->
        <section class="container">
            <div class="row">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      user: {},
      files: [],
      filepath: false,
      imageData: ''
    }
  },
  mounted () {
    this.user = this.$store.getters.user
  },
  methods: {
    reset: function () {
      this.remove()
    },
    upload: function (e) {
      var data = new FormData()
      var file = this.files[0]

      data.append('test', 1234)
      data.append('avatar', file)

      this.$http({
        url: this.user.actions.updateAvatar,
        body: data,
        method: 'POST',
        responseType: 'json',
        before: function (request) {
          console.log(request)
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    },
    sync: function (e) {
      e.preventDefault()
      this.files = e.target.files || e.dataTransfer.files
      if (!this.files.length) {
        return
      }
      this.createFile(e, this.files[0])
    },
    createFile: function (e, file) {
      this.filepath = URL.createObjectURL(file)
    },
    remove: function () {
      URL.revokeObjectURL(this.filepath)
      this.filepath = false
      this.files = []
      document.getElementById('avatar').value = ''
    }
  }
}
</script>

<style>
    .hide{
        opacity: 0;
        position: absolute;
        top: -1000;
        z-index: -9999;
    }
    label{
        cursor: pointer;
    }
</style>