<template>
    <!-- header profile -->
    <div id="profile">
        <section class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="profile">
                        <header>
                            <div class="avatar">
                                <img src="http://placehold.it/50x50" alt="">
                            </div>
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
  name: 'profile'
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