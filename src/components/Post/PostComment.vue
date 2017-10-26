<template>
    <div class="comment">
        <header>
            <div class="avatar">
                <img src="http://placehold.it/50x50" alt="">
            </div>
            <div class="info">
                <span class="name">John Snow</span>
                <span class="date">{{ format }}</span>
            </div>
        </header>
        <div class="content">
        {{ comment.body }}
        </div>
    </div>
</template>
<script>
export default {
  name: 'post-comment',
  props: ['comment'],
  computed: {
    format: function () {
      return this.$moment(this.comment.created_at.date).startOf('hour').fromNow()
    }
  },
  methods: {
    action: function (uri) {
      this.$http.post(uri)
      .then((response) => {
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    }
  }
}
</script>