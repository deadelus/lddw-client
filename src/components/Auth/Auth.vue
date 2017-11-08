<template>
    <div id="subscribe">
        <section class="container">
            <div class="row">
                <div class="settings">
                    <div class="col-lg-6">
                        <div class="col-lg-12">
                            <header>
                                <div class="title">Bienvenue sur La Déchetterie Du Web !</div>
                                <p>
                                    Le site est actuellement en beta (version d'essaie) car Facebook met la pression avec la fermeture des groupes..<br><br>
                                </p>
                            </header>
                            <ul>
                                <h2>Bientôt</h2>
                                <li>Monetisation de vos posts ! $$$</li>
                                <li>Editeurs de mêmes</li>
                                <li>Et tout les truc a la con des réseaux sociaux (Follow.. ect..)</li>
                                <li>Plein d'autres choses</li>
                                <br><br>
                                <h2>Les rêgles de base</h2>
                                <li>Balance ici tous les plus gros déchets du net</li>
                                <li>Tag tes posts <b>NSFW</b> si c'est hard..</li>
                                <li>Si tu es fragile et te sens pas prêt à voir du sale, je t'invite à revenir plus tard.</li>
                                <li>Tout membre qui signale une publication sera immédiatement bloqué du groupe (les modérateurs en sont averti).</li>
                                <br><br>
                                <h2>Retrouve nous aussi</h2>
                                <li>🎥 &nbsp;Youtube: bit.ly/LadéchetterieTV</li>
                                <li>💩 &nbsp;La Page: bit.ly/Fb-Ladéchetterie</li>
                                <li>☢️ &nbsp;Twitter: bit.ly/Twitter-Ladéchetterie</li>
                                <li>👻 &nbsp;Snapchat / Instagram: "ladechetterie"</li>
                                <br><br>
                                Merci à tous de votre grande ouverture d'esprit sur ce site, ne rien prendre au premier degré ici
                            </ul>
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
    name: 'auth',
    data () {
      return {
        form: false
      }
    },
    mounted () {
    }
  }
</script>
<style>
    #shop {
        color: #23527c
    }
    #shop:hover {
        text-decoration: underline;
    }
    #cover{
        width: 100%;
    }
    #cover img {
        width: 100%;
    }
</style>