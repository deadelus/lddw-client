<template>
    <!-- subscribe -->
    <div id="subscribe">
        <section class="container">
            <div class="row">
                <div class="settings">
                    <div class="col-lg-6">
                        <div class="col-lg-12">
                            <header>
                                <div class="title">Bienvenue sur <br>La Déchetterie Du Web !</div>
                            </header>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac pretium est. Fusce consequat nec turpis porttitor condimentum. Etiam vitae eros vitae metus facilisis euismod eu eget ex. 
                                Maecenas interdum nulla est, eu consectetur lacus auctor eu. Pellentesque vestibulum nibh at fermentum convallis. Quisque quis risus mattis, pretium orci id, maximus lacus. 
                                Vestibulum ex ipsum, viverra eu hendrerit in, convallis luctus purus.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="col-lg-12">
                            <div class="section-title">Connexion / Inscription</div>
                            <hr>
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
  export default {
    name: 'subscribe',
    data () {
      return {
        form: false
      }
    },
    mounted () {
    }
  }
</script>