<template>
    <div class="comment">
        <header>
            <div class="avatar">
                <img :src="comment.owner.name || 'http://placehold.it/50x50'" alt="Avatar">
            </div>
            <div class="info">
                <span class="name">{{ comment.owner.name }}</span>
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
      console.log(this.comment.created_at)
      return this.$moment(this.comment.created_at.date).startOf('minutes').fromNow()
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