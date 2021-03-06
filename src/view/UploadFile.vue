<template>
  <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
    <label for="file-input">
      <span v-if="dropZoneActive">
        <span>Drop Them Here</span>
        <span class="smaller">to add them</span>
      </span>
      <span v-else>
        <span>Drag Your Files Here</span>
        <span class="smaller">
          or <strong><em>click here</em></strong> to select files
        </span>
      </span>

      <input type="file" id="file-input" multiple @change="onInputChange" />
    </label>
    <ul class="image-list" v-show="files.length">
      <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
    </ul>
  </DropZone>
  <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button>
</template>

<script lang="ts" setup>
// Components
import DropZone from '../components/DropZone.vue'
import FilePreview from '../components/FilePreview.vue'
// File Management
import useFileList from '../compositions/file-list'
// Uploader
import createUploader from '../compositions/file-uploader'
//app config
import AppConfig from '../config/app'
const { files, addFiles, removeFile } = useFileList()
function onInputChange(e: any) {
  addFiles(e.target.files)
  e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
}
const { uploadFiles } = createUploader(AppConfig.URL_UPLOAD_FILE);
</script>

<style lang="css">
html {
  height: 100%;
  width: 100%;
  background-color: #b6d6f5;
/* Overlapping Stripes Background, based off https://codepen.io/MinzCode/pen/Exgpqpe */
  --color1: rgba(55,165,255,0.35);
  --color2: rgba(96,181,250,0.35);
  --rotation: 135deg;
  --size: 10px;
  background-blend-mode: multiply;
  background-image: repeating-linear-gradient(var(--rotation), var(--color1) calc(var(--size) * 0), var(--color1) calc(var(--size) * 9), var(--color2) calc(var(--size) * 9), var(--color2) calc(var(--size) * 12), var(--color1) calc(var(--size) * 12)), repeating-linear-gradient(calc(var(--rotation) + 90deg), var(--color1) calc(var(--size) * 0), var(--color1) calc(var(--size) * 9), var(--color2) calc(var(--size) * 9), var(--color2) calc(var(--size) * 12), var(--color1) calc(var(--size) * 12));
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="css">
.drop-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: rgba(255,255,255,0.333);
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transition: 0.2s ease;
}
.drop-area[data-active=true] {
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  background: rgba(255,255,255,0.8);
}
label {
  font-size: 36px;
  cursor: pointer;
  display: block;
}
label span {
  display: block;
}
label input[type=file]:not(:focus-visible) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
label .smaller {
  font-size: 16px;
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
button {
  cursor: pointer;
}

</style>