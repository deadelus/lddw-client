<template>
  <div class="404">
    <article class="col-lg-4 col-lg-offset-4">
      <h1>Oulala la belle 404.</h1>
      <h3>La page n'est pas dispo alors joue a Mario !</h3>
      <div class="game-wapper">
        <iframe 
        src="http://supermarioemulator.com/mario.php" width="100%" height="800" id="mario" name="sizabletable" border="0" frameborder="0" scrolling="yes">
        &lt;p&gt;Votre navigateur ne n'accepte pas les Iframe. Pour jouer gratuitement, vous devez activer cette option dans votre navigateur.&lt;/p&gt;
      </iframe>
      </div>
    </article>            
  </div>
</template>

<script>
export default {
  name: 'p404'
}
</script>
<style>
  .game-wapper{
    height: 504px;
    overflow: hidden;
  }
</style>