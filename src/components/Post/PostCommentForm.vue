<template>
  <!-- COMMENT FORM -->
  <form action="" class="comment-form">
      <header>
          <div class="avatar">
              <img :src="user.avatar" alt="Avatar de l'utilisateur">
          </div>
          <div class="info">
              <span class="name">{{ user.name }}</span>
              <span class="date">{{ now }}</span>
          </div>
      </header>
      <textarea class="comment-edit" v-model="msg"  placeholder="Votre commentaire"></textarea>
      <div v-on:click="comment" class="comment-btn">
          Commenter
      </div>
  </form>
  <!-- END COMMENT FORM -->
</template>
<script>
export default {
  name: 'post-comment-form',
  data () {
    return {
      msg: '',
      now: null
    }
  },
  props: ['url'],
  mounted () {
    setInterval(function () {
      this.now = "Aujourd'hui à " + this.$moment().format('LTS')
    }.bind(this), 1000)
  },
  methods: {
    comment: function () {
      this.$http.post(this.url, {
        body: this.msg
      })
      .then((response) => {
        this.msg = ''
        console.log(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    }
  }
}
</script>