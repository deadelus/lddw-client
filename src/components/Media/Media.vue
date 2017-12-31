<template>
  <div id="media">
    <div id="dragzone" v-show="!filepath">
      <input id="fileInput" type="file" @change="onFileChange" @dragenter="hilight" v-on:dragleave.drop="reset" accept="image/*;video/*;"></input>
      <label for="fileInput">
        <span>
          <span class="ico drag dragfile"></span>
          Balancez votre déchêt ou ... <span class="btn-drag">{{ msg || 'Choisir parmis les fichiers' }}</span>
        </span>
      </label>
    </div>

    <!--<div id="preview" @click="remove" v-show="filepath" v-if="image">
      <span ref="closePreview" class="close-btn" v-show="filepath" @click="remove">
        <svg viewBox="0 0 33 33"><path id="Cross" d="M16,0c-8.837,0 -16,7.163 -16,16c0,8.837 7.163,16 16,16c8.836,0 16,-7.163 16,-16c0,-8.837 -7.164,-16 -16,-16Zm0,28c-6.617,0 -12,-5.383 -12,-12c0,-6.617 5.383,-12 12,-12c6.617,0 12,5.383 12,12c0,6.617 -5.383,12 -12,12Zm5.443,-17.416l-0.027,-0.027c-0.742,-0.743 -1.945,-0.743 -2.688,0l-2.728,2.728l-2.728,-2.728c-0.743,-0.743 -1.946,-0.743 -2.688,0l-0.027,0.027c-0.743,0.742 -0.743,1.945 0,2.687l2.728,2.729l-2.728,2.729c-0.743,0.742 -0.743,1.945 0,2.687l0.027,0.027c0.742,0.742 1.945,0.742 2.688,0l2.728,-2.728l2.728,2.728c0.743,0.742 1.946,0.742 2.688,0l0.027,-0.027c0.743,-0.742 0.743,-1.945 0,-2.687l-2.728,-2.729l2.728,-2.729c0.743,-0.742 0.743,-1.945 0,-2.687Z"/></svg>
      </span>

      <preview-image v-if="image" v-bind:path="filepath"></preview-image>
    </div>-->

    <p id="other-file" @click="remove" v-show="filepath">
      Fichier selectionné (cliquer ici pour annuler)
    </p>

  </div>
</template>
<script>
  import PreviewImage from '@/components/Media/Type/Image.vue'

  export default {
    name: 'media',
    data () {
      return {
        filepath: false,
        filetype: false,
        image: false,
        msg: false
      }
    },
    components: {
      PreviewImage
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
        this.$emit('selected', file)
      },
      remove: function () {
        URL.revokeObjectURL(this.filepath)
        this.filepath = false
        document.getElementById('fileInput').value = ''
        this.$emit('cancel')
      }
    }
  }
</script>
<style>
  #other-file{
    background: #49a69b;
    padding: 5px;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>