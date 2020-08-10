<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="视频标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'titile',
              {rules: [{ required: true, message: '请输入视频标题' }]}
            ]"
            name="titile"
            placeholder="请输入视频标题"
          />
        </a-form-item>
        <a-form-item
          label="视频简介"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请输入视频简介"
            v-decorator="[
              'introduction',
              {rules: [{ required: true, message: '请输入视频简介' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="虚拟观看人数"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input-number
            v-decorator="[
              'number',
              {rules: [{ required: true, message: '请输入虚拟观看人数' }]}
            ]"
            name="number"
            placeholder="请输入虚拟观看人数"
            style="width:180px"
          />
        </a-form-item>
        <a-form-item
          label="是否为推荐"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group
            v-decorator="['isRecommended' ,{rules: [{ required: true, message: '请选择是否推荐' }]}]"
          >
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="上传图片"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upUrl"
            accept=".jpg, .png, .jpeg"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:150px;height:150px" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="上传视频"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upUrl"
            accept=".MP4"
            @change="handleChangeVideo"
          >
            <video v-if="videoUrl" :src="videoUrl" alt="avatar" style="width:150px;height:150px" />
            <div v-else>
              <a-icon :type="loadingVideo ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传视频</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" style="width:180px">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { url } from '../../utils/config'
export default {
  name: 'VideoDetail',
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      imagePmCode: '',
      upUrl: `/api/file`,
      loading: false,
      loadingVideo: false,
      videoUrl: '',
      videoPmCode: '',
    }
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleChangeVideo(info) {
      if (info.file.status === 'uploading') {
        this.loadingVideo = true
        return
      }
      if (info.file.status === 'done') {
        const { response = {} } = info.file
        this.loadingVideo = false
        this.videoPmCode = response.data
        this.videoUrl = '/api/file/' + this.videoPmCode
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.loading = false
        const { response = {} } = info.file
        console.log(response.data)
        this.imagePmCode = response.data
        this.imageUrl = '/api/file/' + this.imagePmCode
      }
    },
  },
}
</script>
