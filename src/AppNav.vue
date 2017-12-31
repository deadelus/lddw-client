<template>
    <section class="container-fluid bartop" id="app-nav">
        <div class="navbar desktop">
            
            <div class="brand">
                <router-link :to="{ name: 'Home' }">
                    <svg class="logo" viewBox="0 0 612 588" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                        <path d="M434.345,395.297c-27.214,34.435 -67.991,57.656 -114.266,61.603l-9.718,17.063l72.67,114.037l5.086,-48.343l77.729,-6.024c36.585,-1.59 46.492,-44.29 45.193,-66.745c-1.278,-22.105 -16.193,-48.34 -31.454,-72.022l-45.24,0.431Zm25.876,-155.722c6.008,17.025 9.277,35.343 9.277,54.425c0,14.686 -1.937,28.921 -5.568,42.461l42.134,68.441c14.844,20.842 28.009,52.032 17.455,88.733l85.333,-150.258c9.147,-25.195 -3.149,-54.271 -20.927,-81.252l-46.002,-73.566l-81.702,51.016Zm-33.255,53.855c12.527,12.301 19.723,26.674 19.723,42.03c0,45.432 -62.988,82.262 -140.689,82.262c-77.701,0 -140.689,-36.83 -140.689,-82.262c0,-14.944 6.815,-28.957 18.726,-41.035c1.066,-10.11 5.311,-19.68 12.119,-28.325c0.331,-13.087 6.565,-25.279 17.114,-35.587c11.909,-32.465 48.722,-56.12 92.289,-56.12c9.882,0 36.433,-3.65 43.148,-13.349c9.754,-14.087 -0.852,-17.52 6.053,-14.018c21.825,11.071 38.796,53.928 44.794,85.209c9.513,9.933 15.096,21.5 15.408,33.865c6.584,8.361 10.771,17.587 12.004,27.33Zm-169.388,156.778c-33.464,-10.361 -62.331,-31.18 -82.782,-58.637l-81.819,-0.573c-25.555,1.535 -59.001,-3.836 -84.556,-32.228l82.301,151.938c16.535,21.102 47.727,26.09 80.046,25.322l86.81,0l0,-85.822Zm-112.139,-125.197c-1.928,-10.04 -2.937,-20.408 -2.937,-31.011c0,-24.664 5.461,-48.052 15.24,-69.021l-19.669,-36.419l-135.288,1.151l38.331,29.927l-36.077,69.062c-18.039,31.846 12.95,62.869 32.695,73.667c19.437,10.631 49.606,11.894 77.791,11.511l29.914,-48.867Zm120.887,-92.22c13.517,0 24.474,10.957 24.474,24.474c0,13.516 -10.957,24.473 -24.474,24.473c-13.516,0 -24.473,-10.957 -24.473,-24.473c0,-13.517 10.957,-24.474 24.473,-24.474Zm78.948,0c13.516,0 24.473,10.957 24.473,24.474c0,13.516 -10.957,24.473 -24.473,24.473c-13.517,0 -24.474,-10.957 -24.474,-24.473c0,-13.517 10.957,-24.474 24.474,-24.474Zm-155.12,-54.01c24.643,-24.898 56.439,-40.89 90.237,-46.352l38.288,-72.309c10.44,-23.376 30.648,-50.564 67.632,-60.12l-172.773,2.843c-26.353,4.922 -45.18,30.286 -59.423,59.308l-40.086,77.001l76.125,39.629Zm162.831,-41.657c9.797,2.926 19.459,6.818 28.864,11.714c21.877,11.389 40.1,27.033 54.185,45.389l41.386,-0.629l61.45,-120.533l-44.246,20.181l-44.599,-63.891c-19.918,-30.705 -61.745,-17.543 -80.441,-5.016c-18.404,12.333 -33.456,38.509 -46.131,63.686l29.532,49.099Z"/>
                    </svg>
                </router-link>
            </div>

            <div class="menu">
                <router-link :to="{ name: 'Gif' }">
                    <span>GIF</span>
                </router-link>
                <router-link :to="{ name: 'Video' }">
                    <span>VIDEO</span>
                </router-link>
                <router-link :to="{ name: 'NSFW' }">
                    <span class="nsfw">NSFW</span>
                </router-link>
                <a id="shop" href="https://bit.ly/Déchet-Shop" target="_blank">
                    <span>BOUTIQUE</span>
                </a>
            </div>
       
            <!-- If user are logued -->
            <div class="add-btn" v-show="isLoggedIn">
                <svg viewBox="0 0 32 33"><path d="M16,0c-8.837,0 -16,7.163 -16,16c0,8.837 7.163,16 16,16c8.836,0 16,-7.163 16,-16c0,-8.837 -7.164,-16 -16,-16Zm0,28c-6.617,0 -12,-5.383 -12,-12c0,-6.617 5.383,-12 12,-12c6.617,0 12,5.383 12,12c0,6.617 -5.383,12 -12,12Zm0.02,-20c1.101,0.008 1.98,0.891 1.98,1.98l0,4.02l4.02,0c1.093,0 1.98,0.887 1.98,1.98l0,0.04c0,1.093 -0.887,1.98 -1.98,1.98l-4.02,0l0,4.02c0,1.093 -0.887,1.98 -1.98,1.98l-0.04,0c-1.094,0 -1.98,-0.887 -1.98,-1.98l0,-4.02l-4.02,0c-1.101,-0.008 -1.98,-0.891 -1.98,-1.98l0,-0.04c0,-1.089 0.879,-1.972 1.98,-1.98l4.02,0l0,-4.02c0,-1.089 0.879,-1.972 1.98,-1.98l0.04,0Z"/></svg>
                <span>Télécharger</span>
            </div>
            <div v-show="isLoggedIn" class="profile">
                <router-link :to="{ name: 'UserPosts' }">
                    <div class="avatar">
                        <img v-if="avatar" :src="avatar" alt="avatar">
                        <img v-if="!avatar" src="./assets/user.png" alt="avatar">
                    </div>
                </router-link>
            </div>
            <!-- Else -->
            <div v-show="!isLoggedIn" class="profile">
                <router-link :to="{ name: 'Auth' }">
                    <span>
                    Se connecter
                    </span>
                </router-link>
            </div>

        </div>
        <div class="navbar mobile">
            <div class="burguer" @click="collapse">
                <span class="ico medium burguer"></span>
            </div>

            <div class="title">
                <router-link :to="{ name: 'Home' }">
                    La Déchetterie
                </router-link>
            </div>

            <div class="add-btn" @click="showAddModal = true">
                <svg viewBox="0 0 32 33"><path d="M16,0c-8.837,0 -16,7.163 -16,16c0,8.837 7.163,16 16,16c8.836,0 16,-7.163 16,-16c0,-8.837 -7.164,-16 -16,-16Zm0,28c-6.617,0 -12,-5.383 -12,-12c0,-6.617 5.383,-12 12,-12c6.617,0 12,5.383 12,12c0,6.617 -5.383,12 -12,12Zm0.02,-20c1.101,0.008 1.98,0.891 1.98,1.98l0,4.02l4.02,0c1.093,0 1.98,0.887 1.98,1.98l0,0.04c0,1.093 -0.887,1.98 -1.98,1.98l-4.02,0l0,4.02c0,1.093 -0.887,1.98 -1.98,1.98l-0.04,0c-1.094,0 -1.98,-0.887 -1.98,-1.98l0,-4.02l-4.02,0c-1.101,-0.008 -1.98,-0.891 -1.98,-1.98l0,-0.04c0,-1.089 0.879,-1.972 1.98,-1.98l4.02,0l0,-4.02c0,-1.089 0.879,-1.972 1.98,-1.98l0.04,0Z"/></svg>
                <span>Télécharger</span>
            </div>

            <div class="menu">
                <div v-bind:class="{ active: collapsed }" class="list">
                    <ul>
                        <li>
                            <!-- if log -->
                            <router-link v-show="isLoggedIn" :to="{ name: 'UserPosts' }">
                                <span class="link">
                                    <img v-if="avatar" :src="avatar" alt="avatar" class="avatar">
                                    <img v-if="!avatar" src="./assets/user.png" alt="avatar" class="avatar">
                                    <span>Mon compte</span>
                                </span>
                            </router-link>
                            <!-- else -->
                            <router-link v-show="!isLoggedIn" :to="{ name: 'Auth' }">
                                <span class="link">
                                    <img v-if="!avatar" src="./assets/user.png" alt="avatar" class="avatar">                                
                                    <span>Se connecter</span>
                                </span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'NSFW' }">
                                <span class="nsfw link">
                                    <img src="./assets/shock.png" alt="home alone shock">                                
                                    <span class="nsfw">
                                        NSFW
                                    </span>
                                </span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Gif' }">
                                <span class="link">
                                    <img src="./assets/nyan.gif" alt="nyan cat">                                
                                    <span>Gif</span>
                                </span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Video' }">
                                <span class="link">
                                    <svg viewBox="0 0 37 28"><path d="M34,0c1.107,0.002 2,0.897 2,2l0,24c0,1.103 -0.893,1.998 -2,2l-32,0c-1.105,0 -2,-0.895 -2,-2l0,-24c0,-1.103 0.894,-1.998 2,-2l32,0Zm-26,24l0,-4l-4,0l0,4l4,0Zm4,-20l0,20l12,0l0,-20l-12,0Zm16,20l4,0l0,-4l-4,0l0,4Zm-24,-12l0,4l4,0l0,-4l-4,0Zm4,-8l-4,0l0,4l4,0l0,-4Zm24,0l-4,0l0,4l4,0l0,-4Zm-4,12l4,0l0,-4l-4,0l0,4Z"/></svg>
                                    <span>Video</span>
                                </span>
                            </router-link>
                        </li>
                        <li>
                            <a id="shop" href="https://bit.ly/Déchet-Shop" target="_blank">
                                <span class="link">
                                    <svg viewBox="0 0 32 33"><path d="M11.995,29c0,1.657 -1.342,3 -2.998,3c-1.657,0 -2.999,-1.343 -2.999,-3c0,-1.657 1.342,-3 2.999,-3c1.656,0 2.998,1.343 2.998,3Zm15.994,0c0,1.657 -1.342,3 -2.999,3c-1.656,0 -2.998,-1.343 -2.998,-3c0,-1.657 1.342,-3 2.998,-3c1.657,0 2.999,1.343 2.999,3Zm0.998,-29c1.954,0.003 3.383,1.836 2.91,3.728l-2.362,9.964c-0.32,1.353 -1.528,2.308 -2.918,2.308l-18.62,0l0,4l19.992,0c1.105,0 2,0.895 2,2c0,1.103 -0.893,1.997 -2,2l-20.992,0c-1.656,0 -2.999,-1.343 -2.999,-3l0,-17l-1.999,0c-1.106,-0.003 -1.999,-0.897 -1.999,-2c0,-1.103 0.893,-1.997 1.999,-2l26.988,0Zm-3.16,12l1.896,-8l-19.726,0l0,8l17.83,0Z"/></svg>
                                    <span>Boutique</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <nav-lateral></nav-lateral>
                </div>
            </div>
        </div>

        <new-post-modal 
            v-if="showAddModal" 
            @close="showAddModal = false">
        </new-post-modal>
    </section>
</template>
<script>
  import NewPostModal from '@/components/Modal/NewPostModal'
  import NavLateral from '@/NavLateral'

  export default {
    name: 'app-nav',
    data () {
      return {
        collapsed: false,
        isLoggedIn: false,
        showAddModal: false,
        avatar: 'http://placehold.it/50X50'
      }
    },
    components: {
      NewPostModal,
      NavLateral
    },
    // Vue 2.2
    // beforeRouteUpdate (to, from, next) {
    //   console.log('yest')
    //   this.collapsed = false
    //   next()
    // },
    watch: {
      '$route' (to, from) {
        this.collapsed = false
      }
    },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
        this.avatar = this.$store.state.user.avatar
      })
    },
    methods: {
      collapse: function () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
<style>
    .nsfw{
        background: black;
        color: white !important;
        padding: 0 10px;
    }
    #add{
        font-size: 1.2rem;
        line-height: 30px;
        margin: 10px 15px;
        height: 30px;
        padding: 0 10px;
        position: absolute;
        left: -110px;
        font-weight: bold;
        background: #000;
        color: white;
    }
</style>