<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept=".csv, .xlsx"
    />
    <button @click="uploadFile">Upload File</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      selectedFile: null,
      downloadURL: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      const storage = getStorage();
      const storageRef = ref(storage, "uploads/" + this.selectedFile.name);

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, this.selectedFile);

      // Get download URL of the uploaded file
      this.downloadURL = await getDownloadURL(storageRef);

      console.log("File uploaded. Download URL:", this.downloadURL);
    },
  },
};
</script>
