<template>
  <div id="ctrl">
    
    <div id="dragzone" v-show="!filepath">
      <input id="fileInput" type="file" @change="onFileChange" @dragenter="hilight" v-on:dragleave.drop="reset" accept="image/*;video/*;capture=camcorder"></input>
      <label for="fileInput">
        <span>
          <span class="ico drag camera"></span>
          <span class="btn-drag">{{ msg || 'Prendre une photo / video' }}</span>
        </span>
      </label>
    </div>

    <div id="preview" @click="remove" v-show="filepath">
      <span class="close-btn" v-show="filepath" @click="remove">
        <svg viewBox="0 0 33 33"><path id="Cross" d="M16,0c-8.837,0 -16,7.163 -16,16c0,8.837 7.163,16 16,16c8.836,0 16,-7.163 16,-16c0,-8.837 -7.164,-16 -16,-16Zm0,28c-6.617,0 -12,-5.383 -12,-12c0,-6.617 5.383,-12 12,-12c6.617,0 12,5.383 12,12c0,6.617 -5.383,12 -12,12Zm5.443,-17.416l-0.027,-0.027c-0.742,-0.743 -1.945,-0.743 -2.688,0l-2.728,2.728l-2.728,-2.728c-0.743,-0.743 -1.946,-0.743 -2.688,0l-0.027,0.027c-0.743,0.742 -0.743,1.945 0,2.687l2.728,2.729l-2.728,2.729c-0.743,0.742 -0.743,1.945 0,2.687l0.027,0.027c0.742,0.742 1.945,0.742 2.688,0l2.728,-2.728l2.728,2.728c0.743,0.742 1.946,0.742 2.688,0l0.027,-0.027c0.743,-0.742 0.743,-1.945 0,-2.687l-2.728,-2.729l2.728,-2.729c0.743,-0.742 0.743,-1.945 0,-2.687Z"/></svg>
      </span>

      <preview
        v-bind:path="filepath"
        v-bind:type="filetype"
      >
      </preview>
    </div>

  </div>
</template>
<script>
  import preview from '@/components/Media/Preview.vue'

  export default {
    name: 'ctrl',
    data () {
      return {
        filepath: false,
        filetype: false,
        msg: false
      }
    },
    components: {
      preview
    },
    methods: {
      hilight: function () {
        this.msg = 'Déposer votre fichier ici !'
      },
      reset: function () {
        this.remove()
        this.msg = false
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createFile(e, files[0])
      },
      createFile: function (e, file) {
        this.filepath = URL.createObjectURL(file)
        this.filetype = file.type

        var post = {
          isLoading: true,
          file: file
        }
        this.$store.commit('UPDATE_POST', post)
      },
      remove: function () {
        this.$store.commit('CLEAR_POST')
        URL.revokeObjectURL(this.filepath)
        this.filepath = false
        this.filetype = false
        document.getElementById('fileInput').value = ''
      }
    }
  }
</script>