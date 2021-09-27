<template>
  <div class="upload">
    <h1>Загрузить данные</h1>

    <a-row>
      <a-col :md="24" :lg="12">
        <div id="upload-description" class="container left">
            Вы можете загрузить файлы размером не более 10 мб. Поддерживаемые типы файлов: pdf, png, jpeg, gif, doc, docx, xls, xlsx, csv, rtf, txt, zip, rar, 7z.
        </div>
      </a-col>

      <a-col :md="24" :lg="12">
        <div id="upload-files" class="container left">
            <a-textarea class="input-description" v-model="description" placeholder="Описание" :auto-size="{ minRows: 1, maxRows: 9 }" :maxLength=1000 />
            <div class="wrapper">
                <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" @change="handleChange" >
                    <a-button> <a-icon type="upload" /> Выбрать файл </a-button>
                </a-upload>
                <a-button class="upload-button" type="primary" :disabled="fileList.length === 0" :loading="uploading" @click="handleUpload">
                        {{ uploading ? 'Загрузка' : 'Начать загрузку' }}
                </a-button>
            </div>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import reqwest from 'reqwest';
import axios from 'axios'
import moment from 'moment';

export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      description: ''
    };
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      console.log(this.fileList)
      console.log('desc: ' + this.description)

      this.uploading = true;
      const now = moment().format('DD-MM-YYYY-hh-mm');

      this.fileList.forEach((file, i) => {
        const formData = new FormData();
        const config = { 'content-type': 'multipart/form-data' }
        formData.append('folder', now.toString())
        formData.append('description', this.description)
        formData.append('attachment', file);

        axios.post('/', formData, config)
                .then(response => {
                    this.fileList = this.fileList.filter(item => item !== file)
                    console.log('removing file: ' + file )
                })
                .catch(error => {
                    file.status = 'error'
                    file.error = ' (Недопустимый файл)'
                    console.log(error)
                })
      });
      this.uploading = false;
    },
    handleChange(info) {
    }
  },
};
</script>

<style scoped>
.right {
  text-align: right;
  padding-right: 20px;
}
.left {
  text-align: left;
  padding-left: 20px;
}
.input-description {
  margin-bottom: 20px;
}
#upload-description {
  padding: 20px;
  min-height: 14vh;
}
#upload-files {
  padding: 20px;
  min-height: 14vh;
}
.wrapper {
  position: relative;
}
.upload-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
