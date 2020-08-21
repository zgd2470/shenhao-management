<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" class="card-body">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="页面"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-select
            placeholder="请选择"
            v-decorator="[
              'type',
              {rules: [{ required: true, message: '请选择页面' }]}
            ]"
            :allowClear="true"
          >
            <a-select-option value="index">首页</a-select-option>
            <a-select-option value="s7">S7</a-select-option>
            <a-select-option value="s5">S5</a-select-option>
            <a-select-option value="wage">工资宝</a-select-option>
            <a-select-option value="accounting">云会计</a-select-option>
            <a-select-option value="save">云进销存</a-select-option>
            <a-select-option value="partner">伙伴发展</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group v-decorator="['state' ,{rules: [{ required: true, message: '请选择状态' }]}]">
            <a-radio value="1">启用</a-radio>
            <a-radio value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="排序"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input-number
            v-decorator="['sorting' ,{rules: [{ required: true, message: '请输入序号' }]}]"
          />
        </a-form-item>

        <a-form-item
          label="备注"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea rows="3" placeholder="备注" v-decorator="[
              'note']" />
        </a-form-item>

        <a-form-item
          label="上传Banner"
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
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:400px;height:200px" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传Banner</div>
            </div>
          </a-upload>
        </a-form-item>

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

import { setBanner, getBannerDetail } from '../../api/shenhaoApi'
export default {
  name: 'BannerDetail',
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      imgPmCode: '',
      upUrl: `/api/file`,
      loading: false,
      bntLoading: false,
      inputVisible: false,
    }
  },
  created() {
    const { pmCode } = this.$route.query
    // 如果有值说明是编辑
    if (!pmCode) {
      return
    }
    getBannerDetail({ pmCode }).then((res) => {
      if (!res.success) {
        this.$message.error(res.message)
        return
      }
      const { data = {} } = res
      this.form.setFieldsValue(data)
      this.imageUrl = `/api/file/${data.imgPmCode}`
      this.imgPmCode = data.imgPmCode
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

          this.bntLoading = true

          setBanner({
            ...values,
            pmCode: this.pmCode,
            imgPmCode: this.imgPmCode,
          }).then((res) => {
            const { message, success } = res
            this.bntLoading = false
            if (!success) {
              this.$message.error(message)
              return
            }
            this.$message.success(message)
            this.$router.push('/banner/bannerList')
          })
        }
      })
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
