<template>
    <div class="comment">
        <header>
            <div class="avatar">
                <img v-if="comment.owner.avatar" :src="comment.owner.avatar" alt="avatar">
                <img v-if="!comment.owner.avatar" src="./../../assets/user.png" alt="avatar">
            </div>
            <div class="info">
                <span class="name">{{ comment.owner.name }}</span>
                <span class="date">{{ format }}</span>
            </div>
            <div v-if="comment.owner.id === currentUserID || isModerator" class="dropdown">
              <span class="btn" @click="collapse">
                <svg width="100%" height="100%" viewBox="0 0 33 33"><path id="Cogwheel" d="M30.329,13.721l-2.65,-0.441c-0.306,-1.315 -0.826,-2.544 -1.524,-3.653l1.476,-2.066c0.563,-0.788 0.473,-1.868 -0.211,-2.553l-0.428,-0.428c-0.685,-0.684 -1.765,-0.774 -2.553,-0.211l-2.066,1.476c-1.109,-0.698 -2.338,-1.218 -3.653,-1.524l-0.441,-2.65c-0.161,-0.964 -0.996,-1.671 -1.973,-1.671l-0.612,0c-0.977,0 -1.812,0.707 -1.973,1.671l-0.441,2.65c-1.315,0.306 -2.544,0.826 -3.653,1.524l-2.066,-1.476c-0.788,-0.563 -1.868,-0.473 -2.553,0.211l-0.428,0.428c-0.684,0.685 -0.774,1.765 -0.211,2.553l1.476,2.066c-0.698,1.109 -1.218,2.338 -1.524,3.653l-2.65,0.441c-0.964,0.161 -1.671,0.996 -1.671,1.973l0,0.612c0,0.977 0.707,1.812 1.671,1.973l2.65,0.441c0.306,1.315 0.826,2.544 1.524,3.653l-1.476,2.067c-0.563,0.787 -0.473,1.867 0.211,2.551l0.428,0.429c0.685,0.685 1.765,0.774 2.553,0.211l2.066,-1.476c1.109,0.698 2.338,1.218 3.653,1.524l0.441,2.65c0.161,0.964 0.996,1.671 1.973,1.671l0.612,0c0.977,0 1.812,-0.707 1.973,-1.671l0.441,-2.65c1.315,-0.306 2.544,-0.826 3.653,-1.524l2.066,1.476c0.788,0.563 1.868,0.474 2.553,-0.211l0.428,-0.429c0.684,-0.684 0.774,-1.764 0.211,-2.551l-1.476,-2.067c0.698,-1.109 1.218,-2.338 1.524,-3.653l2.65,-0.441c0.964,-0.161 1.671,-0.996 1.671,-1.973l0,-0.612c0,-0.977 -0.707,-1.812 -1.671,-1.973Zm-14.329,8.279c-3.314,0 -6,-2.686 -6,-6c0,-3.314 2.686,-6 6,-6c3.314,0 6,2.686 6,6c0,3.314 -2.686,6 -6,6Z" /></svg>
              </span>
              <ul class="dropdown-menu" v-bind:class="{ active: collapsed }">
                <!--<li @click="showNSFWModal = true">NSFW ?</li>-->
                <!--<li @click="showReportModal = true">Signaler</li>-->
                <li v-if="comment.owner.id === currentUserID" @click="showEditModal = true">Editer</li>
                <li v-confirm="destroy">Supprimer</li>
              </ul>
            </div>
        </header>
        <div class="content">
        {{ body }}
        </div>
        <edit-comment-modal 
          v-if="showEditModal" 
          v-bind:body="body" 
          v-bind:uri="comment.actions.update"
          @close="showEditModal = false" 
          @edit="edit"
        ></edit-comment-modal>
    </div>
</template>
<script>
import EditCommentModal from '@/components/Modal/EditCommentModal'

export default {
  name: 'post-comment',
  data () {
    return {
      body: '',
      collapsed: false,
      showEditModal: false
    }
  },
  props: ['comment'],
  mounted () {
    this.body = this.comment.body
  },
  components: {
    EditCommentModal
  },
  computed: {
    currentUserID: function () {
      return this.$store.getters.user.id
    },
    isModerator: function () {
      var roles = this.$store.getters.user.roles
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          return true
        }
      }
      return false
    },
    format: function () {
      // console.log(this.comment.created_at)
      return this.$moment(this.comment.created_at.date).startOf('minutes').fromNow()
    }
  },
  methods: {
    destroy: function () {
      var data = new FormData()
      data.append('_method', 'DELETE')
      this.$http({
        url: this.comment.actions.delete,
        body: data,
        method: 'POST'
      })
      .then((response) => {
        this.$emit('remove')
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
    },
    edit: function (value) {
      this.body = value
    },
    collapse: function () {
      this.collapsed = !this.collapsed
    },
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