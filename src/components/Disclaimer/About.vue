<template>
      <div class="about">
        <brand></brand>
        <h2>À propos</h2>
        <p>
          Comme vous l’avez surement remarqué, le groupe facebook n’est plus ce qu’il était à ses débuts… Malheureusement la politique de Facebook sur le contenu nous a forcé nous restreindre à des publications bien plus « fragile » pour maintenir le groupe en vie… 
          <br><br>
          Heureusement, ici nous allons enfin pouvoir nous exprimer librement et sans aucunes limites! 🙌 &nbsp;
          Plus de signalement de publication, de blocage ou bannissement de profil, plus de censure, et plus besoin d’attendre 10 ans que l’on approuve votre publication! Les petits fragiles iront chialer pendant que vous bourrinerez leurs mères ! 😘 
          <br><br>
          Le site est actuellement en beta (version d'essai) car Facebook met la pression avec la fermeture des groupes…
          <br><br>
          Merci à tous de votre grande ouverture d'esprit sur ce site, ne rien prendre au premier degré ici ! 
          <b class="sign">&mdash;&nbsp;Geoffrey, Arthur, Baptiste</b>
        </p>
        <br>
        <h2>Bientôt / État d'avancement</h2>
        <div class="soon">
          <p>
            <b>5%</b> Monétisation des publications
            <span class="load green Cqx"></span>
          </p>
          <p>
            <b>20%</b> Système de points avec classement 
            <span class="load orange Vgx"></span>
          </p>
          <p>
            <b>40%</b> Classement des meilleurs Déchets 
            <span class="load blue Qtx"></span>
          </p>
          <p>
            <b>40%</b> Les notifications 
            <span class="load brown Qtx"></span>
          <p>
          </p>
            <b>20%</b> Editeurs de mêmes
            <span class="load red Vgx"></span>
          </p>
          <p>
            <b>50%</b> Appli Mobile
            <span class="load green Cqx"></span>
          </p>
          <p>
            <b>90%</b> Fonctions basiques des réseaux sociaux (Suivre un profil,Tag d’amis, Chat, ect..)
            <span class="load blue Ndx"></span>
          </p>
          <p>
            Et plein d'autres choses! Stay tunned :)
          </p>
        </div>
        <br>
        <span class="social">
          <b>Retrouvez-nous aussi sur&nbsp;</b>
          <a href="https://bit.ly/Fb-Ladéchetterie" target="_blank"><span class="ico small facebook"></span></a>
          &nbsp;
          <a href="https://bit.ly/Twitter-Ladéchetterie" target="_blank"><span class="ico small twitter"></span></a>
          &nbsp;
          <span class="ico small snapchat"></span>
          &nbsp;
          <a href="https://www.instagram.com/ladechetterie/?hl=fr" target="_blank"><span class="ico small insta"></span></a>
          &nbsp;
          <a href="https://bit.ly/LadéchetterieTV" target="_blank"><span class="ico small youtube"></span></a>
        </span>
      </div>

</template>
<script>
  import Brand from '@/Brand'
  export default {
    name: 'about',
    components: { Brand },
    mounted () {
      this.$Progress.start()
      this.$Progress.finish()
    }
  }
</script>
<style>
  .sign {
    display: block;
    text-align: right;
    margin: 30px 0 0 0;
  }
  .about {
    text-align: left;
    margin: auto;
    width: 100%;
    max-width: 750px;
    padding: 0 15px;
  }
  .soon span.load {
    display: block;
    height: 0;
    border: 1px solid;
    margin-bottom: 10px;
  }
  span.load.red {
    border-color: #b31f48;
  }
  span.load.blue {
    border-color: #1f61b3;
  }
  span.load.green {
    border-color: #1fb381;
  }
  span.load.orange {
    border-color: #ec9900;
  }
  span.load.brown {
    border-color: #b3631f;
  }

  span.load.Cqx {
    width: 5%;
  }
  span.load.Vgx {
    width: 20%;
  }
  span.load.Qtx {
    width: 40%;
  }
  span.load.Sdx {
    width: 70%;
  }
  span.load.Ndx {
    width: 90%;
  }

</style>