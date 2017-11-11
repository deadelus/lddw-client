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
                <router-link :to="{ name: 'New' }">
                    <span>Ajouter</span>
                </router-link>
                <router-link :to="{ name: 'Trending' }">
                    <span>Populaire</span>
                </router-link>

                <a id="shop" href="https://bit.ly/Déchet-Shop" target="_blank">
                    <span>Nos Magnifiques T-shirts</span>
                </a>
                <!--<router-link :to="{ name: 'Shop' }">
                    <span>Shop</span>
                </router-link>
                <router-link :to="{ name: 'Rewards' }">
                    <span>Trophés</span>
                </router-link>-->
            </div>


            <!--<form action="" class="col-lg-1 search">
                <input type="hidden" class="search-input">
                <span class="search-field">
                     field for search engine 
                </span>
                <span class="ico search-submit">
                    &nbsp;
                </span>
            </form>-->
                    
            <!-- If user are logued -->
            <div v-show="isLoggedIn" class="profile">
                <router-link :to="{ name: 'UserPosts' }">
                    <div class="avatar">
                        <img :src="avatar" alt="">
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
            <div class="brand">
                <router-link :to="{ name: 'Home' }">
                    <svg class="logo" viewBox="0 0 612 588" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                        <path d="M434.345,395.297c-27.214,34.435 -67.991,57.656 -114.266,61.603l-9.718,17.063l72.67,114.037l5.086,-48.343l77.729,-6.024c36.585,-1.59 46.492,-44.29 45.193,-66.745c-1.278,-22.105 -16.193,-48.34 -31.454,-72.022l-45.24,0.431Zm25.876,-155.722c6.008,17.025 9.277,35.343 9.277,54.425c0,14.686 -1.937,28.921 -5.568,42.461l42.134,68.441c14.844,20.842 28.009,52.032 17.455,88.733l85.333,-150.258c9.147,-25.195 -3.149,-54.271 -20.927,-81.252l-46.002,-73.566l-81.702,51.016Zm-33.255,53.855c12.527,12.301 19.723,26.674 19.723,42.03c0,45.432 -62.988,82.262 -140.689,82.262c-77.701,0 -140.689,-36.83 -140.689,-82.262c0,-14.944 6.815,-28.957 18.726,-41.035c1.066,-10.11 5.311,-19.68 12.119,-28.325c0.331,-13.087 6.565,-25.279 17.114,-35.587c11.909,-32.465 48.722,-56.12 92.289,-56.12c9.882,0 36.433,-3.65 43.148,-13.349c9.754,-14.087 -0.852,-17.52 6.053,-14.018c21.825,11.071 38.796,53.928 44.794,85.209c9.513,9.933 15.096,21.5 15.408,33.865c6.584,8.361 10.771,17.587 12.004,27.33Zm-169.388,156.778c-33.464,-10.361 -62.331,-31.18 -82.782,-58.637l-81.819,-0.573c-25.555,1.535 -59.001,-3.836 -84.556,-32.228l82.301,151.938c16.535,21.102 47.727,26.09 80.046,25.322l86.81,0l0,-85.822Zm-112.139,-125.197c-1.928,-10.04 -2.937,-20.408 -2.937,-31.011c0,-24.664 5.461,-48.052 15.24,-69.021l-19.669,-36.419l-135.288,1.151l38.331,29.927l-36.077,69.062c-18.039,31.846 12.95,62.869 32.695,73.667c19.437,10.631 49.606,11.894 77.791,11.511l29.914,-48.867Zm120.887,-92.22c13.517,0 24.474,10.957 24.474,24.474c0,13.516 -10.957,24.473 -24.474,24.473c-13.516,0 -24.473,-10.957 -24.473,-24.473c0,-13.517 10.957,-24.474 24.473,-24.474Zm78.948,0c13.516,0 24.473,10.957 24.473,24.474c0,13.516 -10.957,24.473 -24.473,24.473c-13.517,0 -24.474,-10.957 -24.474,-24.473c0,-13.517 10.957,-24.474 24.474,-24.474Zm-155.12,-54.01c24.643,-24.898 56.439,-40.89 90.237,-46.352l38.288,-72.309c10.44,-23.376 30.648,-50.564 67.632,-60.12l-172.773,2.843c-26.353,4.922 -45.18,30.286 -59.423,59.308l-40.086,77.001l76.125,39.629Zm162.831,-41.657c9.797,2.926 19.459,6.818 28.864,11.714c21.877,11.389 40.1,27.033 54.185,45.389l41.386,-0.629l61.45,-120.533l-44.246,20.181l-44.599,-63.891c-19.918,-30.705 -61.745,-17.543 -80.441,-5.016c-18.404,12.333 -33.456,38.509 -46.131,63.686l29.532,49.099Z"/>
                    </svg>
                </router-link>
            </div>
            <div class="menu burguer" @click="collapse">
                <a href="" @click.prevent><span class="ico menu"></span></a>
            </div>

            <div v-show="collasped" class="menu list">
                <router-link :to="{ name: 'New' }">
                    <span>Ajouter</span>
                </router-link>
                <router-link :to="{ name: 'Trending' }">
                    <span>Populaire</span>
                </router-link>
                <a id="shop" href="https://bit.ly/Déchet-Shop" target="_blank">
                    <span>Nos Magnifiques T-shirts</span>
                </a>
                <router-link v-show="isLoggedIn" :to="{ name: 'UserPosts' }">
                    <div class="avatar">
                        <img :src="avatar" alt="">
                    </div>
                </router-link>
                <!-- Else -->
                <router-link v-show="!isLoggedIn" :to="{ name: 'Auth' }">
                    <span>
                    Se connecter
                    </span>
                </router-link>
            </div>
        </div>
    </section>
</template>
<script>
  export default {
    name: 'app-nav',
    data () {
      return {
        collasped: false,
        isLoggedIn: false,
        avatar: 'http://placehold.it/50X50'
      }
    },
    mounted () {
      this.$store.watch((state) => {
        this.isLoggedIn = this.$store.state.auth.isLoggedIn
        this.avatar = this.$store.state.user.avatar || 'http://placehold.it/50X50'
      })
    },
    methods: {
      collapse: function () {
        this.collasped = !this.collasped
      }
    }
  }
</script>
<style>
    .navbar{
        position: relative;
    }

    .login{
        width: 100%;
        padding: 0;
        height: auto;
        font-size: 1rem;
    }

    .navbar .profile,
    .navbar .brand, 
    .navbar .burguer{
        position: absolute;
        top: 0;
    }
    .navbar .menu.list a div.avatar {
      margin: auto !important;
    }

    .navbar .profile,
    .navbar .burguer{
        right: 0;
    }

    .navbar .brand{
        left: 0;
    }

    .navbar .menu{
        display: flex;
        justify-content: center;
    }

    .navbar .menu.list{
      flex-direction: column;
      text-align: center;
      padding-top: 50px;
    }
    
    .navbar .menu.list a{
      margin: 0 !important;
    }

    .navbar .menu.list a:hover{
      background-color: #EAEAEA;
    }

    .navbar .burguer a {
        padding: 10px 0;
    }

    .navbar .burguer a,
    .navbar .burguer a span{
        margin: 0 !important;
    }
</style>