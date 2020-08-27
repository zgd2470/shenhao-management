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
        <a-form-item
          label="文章简介"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请输入文章简介"
            v-decorator="[
              'introduce',
              {rules: [{ required: true, message: '请输入文章简介' }]}
            ]"
            name="introduce"
          />
        </a-form-item>
        <a-form-item
          label="文章来源"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'auth',
              {rules: [{ required: false, message: '请输入文章来源' }]}
            ]"
            name="auth"
            placeholder="请输入文章来源"
            style="width:180px"
          />
        </a-form-item>
        <a-form-item
          label="虚拟阅读人数"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input-number
            v-decorator="[
              'number',
              {rules: [{ required: false, message: '请输入虚拟阅读人数' }]}
            ]"
            name="number"
            placeholder="请输入虚拟阅读人数"
            style="width:180px"
          />
        </a-form-item>
        <a-form-item
          label="seo关键词"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'seo',
              {rules: [{ required: false, message: '请输入seo关键词' }]}
            ]"
            name="seo"
            placeholder="请输入seo关键词"
          />
        </a-form-item>
        <a-form-item
          label="是否为首页推荐"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group
            v-decorator="['indexRecommended' ,{rules: [{ required: true, message: '请选择是否推荐' }]}]"
            name="indexRecommended"
          >
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="文章类型"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group
            v-decorator="['type' ,{rules: [{ required: true, message: '请选择文章类型' }]}]"
            name="type"
          >
            <a-radio :value="0">行业资讯</a-radio>
            <a-radio :value="1">案例分享</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="标签"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-tag
            closable
            v-for="(item,i) in tags"
            :key="tags[i]"
            @close="closeTags(tags[i])"
          >{{tags[i]}}</a-tag>
          <a-input
            v-if="inputVisible"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="tabsvalue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="inputVisible=true">
            <a-icon type="plus" />新增tag
          </a-tag>
        </a-form-item>

        <a-form-item
          label="上传封面图片"
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
          label="编辑正文"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 15}, sm: {span: 17} }"
          :required="true"
        >
          <editor :init="editorConfig" v-model="myValue" />
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
import { url as baseurl } from '../../utils/config'
import videoBody from '../../components/videoBody/videoBody'
import { setVideoDetail, getNewsDetail, getVideoPath, setNewsDetail } from '../../api/shenhaoApi'
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce'
import 'tinymce/themes/silver'

export default {
  name: 'NewsDetail',
  components: {
    videoBody,
    Editor,
  },
  data() {
    const toolbarValue =
      'undo redo | formatselect |image bold italic backcolor |' +
      'alignleft aligncenter alignright alignjustify |' +
      ' bullist numlist outdent indent | removeformat | help'
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
      tags: [],
      tabsValue: '',
      inputVisible: false,
      myValue: this.value,
      editorConfig: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar: toolbarValue,
        base_url: '/tinymce',
        language: 'zh_CN',
        language_url: '/tinymce/langs/zh_CN.js',
        plugins: 'image paste',
        // paste_data_images: true,
        // image_uploadtab: true,
        // images_upload_url: '/api/file',
        images_upload_handler: (blobInfo, succFun, failFun) => {
          let that = this
          var xhr, formData
          var file = blobInfo.blob() //转化为易于理解的file对象
          console.log('file', file)
          if (file.name.length > 46) {
            that.$message.error('文件名不能超过46个字符，请修改后重新上传')
            failFun('文件名不能超过46个字符，请修改后重新上传') //将url显示在弹框输入框中
            return
          }
          if (file.size > 1024 * 1024 * 10) {
            that.$message.error('文件过大请重新上传小于10M的文件')
            failFun('文件过大请重新上传小于10M的文件')
            return
          }
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', 'http://192.168.0.100:8080/api/file')
          //xhr.setRequestHeader('X-Access-Token', Vue.ls.get(ACCESS_TOKEN)) // 可以定义请求头带给后端
          xhr.withCredentials = self.credentials
          // 文件上传进度条（当文件过大时）
          // xhr.upload.onprogress = function(e) {
          //   // 进度(e.loaded / e.total * 100)
          //   let percent = (e.loaded / e.total) * 100
          //   if (percent < 100) {
          //     tinymce.activeEditor.setProgressState(true) //是否显示loading状态：1（显示）0（隐藏）
          //   } else {
          //     tinymce.activeEditor.setProgressState(false)
          //   }
          // }
          xhr.onerror = function () {
            that.$message.error('文件上传失败')
            return
          }
          xhr.onload = function () {
            let json
            if (xhr.status < 200 || xhr.status >= 300) {
              that.$message.error('文件上传失败')
              return
            }
            json = JSON.parse(xhr.responseText)
            console.log('json', json)
            //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
            if (json.success) {
              let allurl = baseurl + '/api/file'
              //接口返回的文件保存地址
              if (that.message) {
                succFun(`${allurl}/${json.data}`, { title: json.message }) //将url显示在弹框输入框中
              } else {
                setTimeout(() => {
                  succFun(`${allurl}/${json.data}`, { title: json.message })
                }, 200)
              }
              setTimeout(() => {
                that.$message.success(json.message + '上传成功!')
              }, 300)
            } else {
              that.$message.error('文件上传失败')
              failFun('文件上传失败')
              return
            }
          }
          formData = new FormData()
          //假设接口接收参数为file,值为选中的文件
          formData.append('file', file)
          //正式使用将下面被注释的内容恢复
          xhr.send(formData)
        },
      },
    }
  },
  created() {
    const { pmCode } = this.$route.query
    // 如果有值说明是编辑
    if (!pmCode) {
      return
    }
    getNewsDetail({ pmCode }).then((res) => {
      if (!res.success) {
        this.$message.error(res.message)
        return
      }
      const { data = {} } = res
      this.form.setFieldsValue({ ...data, indexRecommended: Number(data.indexRecommended), type: Number(data.type) })
      this.imageUrl = `/api/file/${data.imgPmCode}`
      this.imgPmCode = data.imgPmCode
      this.videoUrl = data.videoPath
      this.videoPmCode = data.videoPmCode
      this.pmCode = pmCode
      this.tags = data.tags
      this.myValue = data.text
    })
  },
  methods: {
    closeTags(name) {
      this.tags = this.tags.filter((info) => info !== name)
    },
    handleInputChange(e) {
      this.tabsValue = e.target.value
    },
    handleInputConfirm() {
      this.tags.push(this.tabsValue)

      this.tabsValue = ''
      this.inputVisible = false
    },
    // handler
    handleSubmit(e) {
      console.log('富文本', this.myValue)
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          if (!this.imgPmCode) {
            this.$message.error('请上传封面图片')
            return
          } else if (!this.myValue) {
            this.$message.error('请输入正文内容')
            return
          }
          this.bntLoading = true
          setNewsDetail({
            ...values,
            pmCode: this.pmCode,
            imgPmCode: this.imgPmCode,
            text: this.myValue,
            tags: this.tags,
          }).then((res) => {
            const { message, success } = res
            this.bntLoading = false
            if (!success) {
              this.$message.error(message)
              return
            }
            this.$message.success(message)
            this.$router.push(`/newsManagement/newsList`)
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
