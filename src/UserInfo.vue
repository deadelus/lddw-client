<template>
  <div class="users">
    <span class="nb">
      Vous êtes actuellement<br>
      <span>{{ this.nb }}</span><br>
      membres inscrits
      <i></i>
    </span>
    <span class="title">Les meilleurs membres</span>
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
        bests: [],
        nb: 0
      }
    },
    mounted () {
      this.fetchInfo()
    },
    methods: {
      fetchInfo: function () {
        this.$http.get(this.$apiURL + '/userInfo')
        .then((response) => {
          console.log(response)
          this.news = response.body.userLast.data
          this.bests = response.body.userRank.data
          this.nb = response.body.userNB
        })
        .catch((errorResponse) => {
          // console.log(errorResponse)
        })
      }
    }
  }
</script>
<style>
.users span.nb {
  /*  styling */
  display: inline-block;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 2px;
  color: #FAFAFA;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;
  background: #b31f48;
  -webkit-transition: background 0.15s ease-in-out;
  -moz-transition: background 0.15s ease-in-out;
  -ms-transition: background 0.15s ease-in-out;
  -o-transition: background 0.15s ease-in-out;
  transition: background 0.15s ease-in-out;
}
.users span.nb span {
  font-size: 2rem;
}

.users span.nb i {
  /*   positioning */
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  /*   gradient   */
  background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 1%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0.85) 71%, rgba(255, 255, 255, 0) 100%);
  /* FF3.6+ */
  background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(1%, rgba(255, 255, 255, 0.03)), color-stop(30%, rgba(255, 255, 255, 0.85)), color-stop(50%, rgba(255, 255, 255, 0.85)), color-stop(70%, rgba(255, 255, 255, 0.85)), color-stop(71%, rgba(255, 255, 255, 0.85)), color-stop(100%, rgba(255, 255, 255, 0)));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 1%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0.85) 71%, rgba(255, 255, 255, 0) 100%);
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 1%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0.85) 71%, rgba(255, 255, 255, 0) 100%);
  /* Opera 11.10+ */
  background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 1%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0.85) 71%, rgba(255, 255, 255, 0) 100%);
  /* IE10+ */
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 1%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0.85) 71%, rgba(255, 255, 255, 0) 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
  /* IE6-9 */
  /*  forming the shine element
      play around with the width, skew and gradient to get different effects
    */
  width: 15%;
  height: 100%;
  transform: skew(-10deg, 0deg);
  -webkit-transform: skew(-10deg, 0deg);
  -moz-transform: skew(-10deg, 0deg);
  -ms-transform: skew(-10deg, 0deg);
  -o-transform: skew(-10deg, 0deg);
  /*  animating it  */
  animation: move 2s;
  animation-iteration-count: infinite;
  animation-delay: 1s;
  -webkit-animation: move 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-delay: 1s;
  -moz-transform: skew(-10deg, 0deg);
  -moz-animation: move 2s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-delay: 1s;
  -ms-transform: skew(-10deg, 0deg);
  -ms-animation: move 2s;
  -ms-animation-iteration-count: infinite;
  -ms-animation-delay: 1s;
  -o-transform: skew(-10deg, 0deg);
  -o-animation: move 2s;
  -o-animation-iteration-count: infinite;
  -o-animation-delay: 1s;
}

/*  */
@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  5% {
    opacity: 0.0;
  }
  48% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.0;
  }
  100% {
    left: 82%;
  }
}
@-webkit-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  5% {
    opacity: 0.0;
  }
  48% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.0;
  }
  100% {
    left: 82%;
  }
}
@-moz-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  5% {
    opacity: 0.0;
  }
  48% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.0;
  }
  100% {
    left: 88%;
  }
}
@-ms-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  5% {
    opacity: 0.0;
  }
  48% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.0;
  }
  100% {
    left: 82%;
  }
}
@-o-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  5% {
    opacity: 0.0;
  }
  48% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.0;
  }
  100% {
    left: 82%;
  }
}
</style>