<template>
  <div id="rules">
    <h2>Les 3 rêgles de base</h2>
    <p>      
      1. Pas d'insulte ici, on est la pour se marrer.
      <br>2. Si tu n'est pas l'auteur d'une publication cite au moins la source.
      <br>3. Publication Trash (ex: scène de guerre ou mort d’humains) strictement interdite ici! 
    </p>
    <p class="warning">
      Tout utilisateur qui ne respecte pas les règles sera banni !
    </p>
    <br>
    <h2>Conseils pour bien débuter</h2>
    <p>
      1. Balance ici tous les plus gros déchets du net.
      <br>2. Evite de mettre des doublons si tu veux pas perdre de points.
      <br>3. Ajoute des <a href="#" class="hashtag">#Tags</a> à tes posts pour permettre aux autres de retrouver la publi.
      <br>4. Si ton déchet est trop sale publie le dans <span class="nsfw">NSFW</span> (Not Safe For Work) sinon tu prendra un malus.
    </p>
    <p class="info-box">
      NSFW : Initiales de not safe for work (« pas sûr pour le travail ») ou not suitable for work (« pas convenable pour le travail »).<br><br>
      Indication qu'un texte, une image, une vidéo, un son ou un lien contient des éléments jugés particulièrement inappropriés pour un écran de travail, s'agissant généralement de contenu indécent : vulgaire, à caractère sexuel ou violent.
    </p>
  </div>  
</template>
<script>
  export default {
    name: 'rules',
    mounted () {
      this.$Progress.start()
      this.$Progress.finish()
    }
  }
</script>
<style>
  #rules {
    padding: 5px;
  }
  .rules {
    text-align: left;
    margin: auto;
    width: 100%;
    max-width: 750px;
    padding: 0 15px;
  }
  .warning, .info-box {
    padding: 15px;
    color: white;
    background: #b31f48;
  }
  .warning {
    background: #b31f48;
  }
  .info-box {
    background: #000;
  }
  .nsfw {
    background: black;
    color: white !important;
    padding: 0 10px;
  }
</style>