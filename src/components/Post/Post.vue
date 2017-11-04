<template>
  <!-- post -->
  <div class="posts">
    <aside class="col-lg-1 col-lg-offset-1">
        <div class="btns social-btns">
            <div class="title">SHARE</div>
            <span class="ico fb"></span>
            <span class="ico tw"></span>
            <!-- <span class="ico share"></span> -->
            <span @click="Bmk(post.links.Bookmark)" class="ico bookmark"></span>
        </div>
    </aside>
    <article class="col-lg-8">
        <div class="post">
            <header>
                <div class="avatar">
                    <img :src="post.owner.avatar || 'http://placehold.it/50x50'" alt="">
                </div>
                <div class="info">
                    <span class="name">{{ post.owner.name }}</span>
                    <span class="date">{{ format }}</span>
                </div>
            </header>

            <div class="title">
                {{ post.title }}
            </div>
            
            <div class="content thumb">
                <router-link :to="{ name: 'Post', params: { id: post.id } }">
                    
                    <img v-if="post.meta.file_type != 'video'" :src="post.meta.file_thumb" alt="">
                    <div class="play-btn">
                      <svg version="1.1" x="0px" y="0px" viewBox="0 0 420 420" style="enable-background:new 0 0 420 420;" xml:space="preserve"><path d="M210,21c104.216,0,189,84.784,189,189s-84.784,189-189,189S21,314.216,21,210S105.784,21,210,21 M210,0 C94.031,0,0,94.024,0,210s94.031,210,210,210s210-94.024,210-210S325.969,0,210,0L210,0z"/><path d="M293.909,187.215l-111.818-73.591C162.792,100.926,147,109.445,147,132.545V287.42c0,23.1,15.813,31.647,35.147,18.998 L293.86,233.31C313.187,220.647,313.208,199.913,293.909,187.215z M279.006,217.868l-99.295,64.981 c-6.44,4.221-11.711,1.372-11.711-6.328V143.437c0-7.7,5.264-10.535,11.697-6.3l99.33,65.366 C285.46,206.731,285.453,213.647,279.006,217.868z"/></svg>
                    </div>

                </router-link>
            </div>

            <footer>
                <div class="action">
                    <span class="ico comment"></span>
                    <span class="label">{{ comments }}</span>
                </div>
                <div class="action">
                    <span class="ico bookmark"></span>
                    <span class="label">{{ bookmark }}</span>
                </div>
                <div class="action">
                    <span class="ico vote"></span>
                    <span class="label">{{ votes }}</span>
                </div>
            </footer>
            
        </div>
    </article>
    <aside class="col-lg-1">
        <div class="btns">
            <div class="title">&nbsp;</div>
            <span v-on:click="action(post.links.Vote_up)" class="ico vote_up"></span>
            <span class="title">{{ post.info.agVotes }}°</span>
            <span v-on:click="action(post.links.Vote_down)" class="ico vote_down"></span>
        </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['post'],
  computed: {
    format: function () {
      return this.$moment(this.post.created_at.date).startOf('hour').fromNow()
    },
    bookmark: function () {
      if (this.post.info.nbBookmarks > 1) {
        return this.post.info.nbBookmarks + ' Bookmarks'
      }
      return this.post.info.nbBookmarks + ' Bookmark'
    },
    comments: function () {
      if (this.post.info.nbComments > 1) {
        return this.post.info.nbComments + ' Comments'
      }
      return this.post.info.nbComments + ' Comment'
    },
    votes: function () {
      if (this.post.info.nbVotes > 1) {
        return this.post.info.nbVotes + ' Votes'
      }
      return this.post.info.nbVotes + ' Vote'
    }
  },
  methods: {
    action: function (uri) {
      this.$http.post(uri)
      .then((response) => {
        this.post.info.agVotes = response.body.data.vote
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    },
    Bmk: function (uri) {
      this.$http.post(uri)
      .then((response) => {
        if (response.body.data.attached.length) {
          this.post.info.nbBookmarks++
        }
        if (response.body.data.detached.length) {
          this.post.info.nbBookmarks--
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  }
}
</script>