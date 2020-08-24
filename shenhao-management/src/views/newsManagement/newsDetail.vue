<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" class="card-body">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="文章标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入文章标题' }]}
            ]"
            name="title"
            placeholder="请输入文章标题"
          />
        </a-form-item>
        <!-- <a-form-item
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
        </a-form-item>-->
        <a-form-item
          label="虚拟阅读人数"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input-number
            v-decorator="[
              'number',
              {rules: [{ required: true, message: '请输入虚拟阅读人数' }]}
            ]"
            name="number"
            placeholder="请输入虚拟阅读人数"
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
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
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
        <!-- <a-form-item
          label="上传视频"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <video-body v-if="videoUrl" :videoUrl="videoUrl" :key="videoUrl"></video-body>
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upUrl"
            accept=".MP4"
            @change="handleChangeVideo"
          >
            <div>
              <a-icon :type="loadingVideo ? 'loading' : 'plus'" />
              <div class="ant-upload-text">{{videoUrl? '重新上传':"上传视频"}}</div>
            </div>
          </a-upload>
        </a-form-item>-->
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary" style="width:150px" :loading="bntLoading">提交</a-button>
          <a-button style="margin-left:80px;width:150px" @click="$router.back()">返回</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { url } from '../../utils/config'
import videoBody from '../../components/videoBody/videoBody'
import { setVideoDetail, getVideoDetail, getVideoPath } from '../../api/shenhaoApi'
export default {
  name: 'VideoDetail',
  components: {
    videoBody,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      imgPmCode: '',
      upUrl: `/api/file`,
      loading: false,
      loadingVideo: false,
      bntLoading: false,
      videoUrl: '',
      videoPmCode: '',
    }
  },
  created() {
    const { pmCode } = this.$route.query
    // 如果有值说明是编辑
    if (!pmCode) {
      return
    }
    getVideoDetail({ pmCode }).then((res) => {
      if (!res.success) {
        this.$message.error(res.message)
        return
      }
      const { data = {} } = res
      this.form.setFieldsValue({ ...data, isRecommended: Number(data.isRecommended) })
      this.imageUrl = `/api/file/${data.imgPmCode}`
      this.imgPmCode = data.imgPmCode
      this.videoUrl = data.videoPath
      this.videoPmCode = data.videoPmCode
      this.pmCode = data.pmCode
    })
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!this.imgPmCode) {
            this.$message.error('请上传图片')
            return
          }
          if (!this.videoPmCode) {
            this.$message.error('请上传视频')
            return
          }

          this.bntLoading = true
          setVideoDetail({
            ...values,
            pmCode: this.pmCode,
            imgPmCode: this.imgPmCode,
            videoPmCode: this.videoPmCode,
            videoPath: this.videoUrl,
          }).then((res) => {
            const { message, success } = res
            this.bntLoading = false
            if (!success) {
              this.$message.error(message)
              return
            }
            this.$message.success(message)
            this.$router.push('/knowledgeCenter/videoList')
          })
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
        getVideoPath({ pmCode: this.videoPmCode }).then((res) => {
          if (!res.success) {
            return
          }
          this.videoUrl = res.data
        })
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
        this.imgPmCode = response.data
        this.imageUrl = '/api/file/' + this.imgPmCode
      }
    },
  },
}
</script>
<style scoped>
</style>
