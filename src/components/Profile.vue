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
                                <span class="name">
                                  {{ user.name }}
                                </span>
                                <span class="desc">{{ user.bio }}</span>
                                <span class="links">
                                    <span class="level">
                                      <span class="ico poo"></span>
                                      <span>Newbie</span>
                                    </span>
                                    <span class="gold">
                                      <span class="ico coins"></span>
                                      <span>199</span>
                                    </span>
                                    <span class="tosetting">
                                        <router-link :to="{ name: 'UserSettings' }">
                                            <span class="ico gear"></span>
                                            <span>Paramètres</span>
                                        </router-link>
                                    </span>
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
                            <span for="dechet" class="nb-dechet">{{ dechets }}</span>
                        </router-link>
                        /
                        <router-link :to="{ name: 'UserBookmarks' }">
                            <span for="dechet" class="nb-dechet">{{ bookmarks }}</span>
                        </router-link>
                        /
                        <router-link :to="{ name: 'UserTrophies' }">
                            <span for="reward" class="nb-dechet">{{ trophies }}</span> 
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
// import axios from 'axios'

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
  created () {
    this.user = this.$store.getters.user
    // this.$store.watch((state) => {
    //   this.user.avatar = this.$store.state.user.avatar || 'http://placehold.it/50X50'
    // })
  },
  methods: {
    reset: function () {
      this.remove()
    },
    upload: function (e) {
      var data = new FormData()
      var file = this.files[0]
      data.append('_method', 'PUT')
      data.append('avatar', file)
      this.$http({
        url: this.user.actions.updateAvatar,
        body: data,
        method: 'POST'
      })
      .then((response) => {
        this.user.avatar = response.body.data.avatar
        this.$store.commit('UPDATE_USER', this.user)
        this.reset()
      })
      .catch((errorResponse) => {
        // console.log(errorResponse)
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
  },
  computed: {
    dechets: function () {
      var char = this.user.info.nb_posts + ' déchet'
      if (this.user.info.nb_posts > 1) {
        return char + 's'
      }
      return char
    },
    trophies: function () {
      var char = 1 + ' trophé'
      return char
    },
    bookmarks: function () {
      var char = this.user.info.nb_bookmarks + ' bookmark'
      if (this.user.info.nb_bookmarks > 1) {
        return char + 's'
      }
      return char
    },
    followers: function () {
      var char = this.user.info.nb_followers + ' follower'
      if (this.user.info.nb_followers > 1) {
        return char + 's'
      }
      return char
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

