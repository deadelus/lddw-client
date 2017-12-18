<template>
  <div class="users">
    <span class="title">Les meilleurs du moment</span>
    <ul>
      <li v-for="user in bests">
        <span class="link">
          <img v-if="user.avatar" :src="user.avatar" :alt="user.name">
          <img v-if="!user.avatar" src="./assets/user.png" alt="avatar">
          <span class="name">{{ user.name }}</span>
        </span>
      </li>
    </ul>
    <hr>
    <span class="title">Les nouveaux inscrits</span>
    <ul>
      <li v-for="user in news">
        <span class="link">
          <img v-if="user.avatar" :src="user.avatar" :alt="user.name">
          <img v-if="!user.avatar" src="./assets/user.png" alt="avatar">
          <span class="name">{{ user.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'user-info',
    data () {
      return {
        news: [],
        bests: []
      }
    },
    mounted () {
      this.fetchLastUsers()
      this.fetchBestUsers()
    },
    methods: {
      fetchLastUsers: function () {
        this.$http.get(this.$apiURL + '/userNew')
        .then((response) => {
          console.log(response)
          this.news = response.body.data
        })
        .catch((errorResponse) => {
          console.log(errorResponse)
        })
      },
      fetchBestUsers: function () {
        this.$http.get(this.$apiURL + '/userRank')
        .then((response) => {
          console.log(response)
          this.bests = response.body.data
        })
        .catch((errorResponse) => {
          console.log(errorResponse)
        })
      }
    }
  }
</script>