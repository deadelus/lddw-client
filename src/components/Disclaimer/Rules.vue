<template>
  <div class="rules">
    <brand></brand>
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
      <br>3. Ajoute des <b>#Tags</b> à tes posts pour permettre aux autres de retrouver la publi.
      <br>4. Si ton déchet est trop sale publie le dans <span class="nsfw">NSFW</span> (Not Safe For Work) sinon tu prendra un malus.
    </p>
  </div>  
</template>
<script>
  import Brand from '@/Brand'
  export default {
    name: 'rules',
    components: { Brand },
    mounted () {
      this.$Progress.start()
      this.$Progress.finish()
    }
  }
</script>
<style>
  .rules {
    text-align: left;
    margin: auto;
    width: 100%;
    max-width: 750px;
    padding: 0 15px;
  }
  .warning {
    padding: 15px;
    color: white;
    background: #b31f48;
  }
  .nsfw {
    background: black;
    color: white !important;
    padding: 0 10px;
  }
</style>