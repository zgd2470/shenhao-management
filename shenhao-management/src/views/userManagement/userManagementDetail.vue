<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" class="card-body">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="账号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入账号"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入账号' }]}
            ]"
            :allowClear="true"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
        >
          <a-input-password
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入账号' }]}
            ]"
            :allowClear="true"
          />
        </a-form-item>

        <a-form-item
          label="昵称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入昵称"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入昵称' }]}
            ]"
            :allowClear="true"
          />
        </a-form-item>

        <a-form-item
          label="菜单权限"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
        >
          <a-checkbox-group v-decorator="[
              'permissions',
            ]">
            <a-col :span="24" v-for="item in checkboxArray" :key="item.permission">
              <a-checkbox :value="item.permission">{{item.name}}</a-checkbox>
            </a-col>
          </a-checkbox-group>
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
import { setUser, getUserDetail, getMenuArray } from '../../api/shenhaoApi'
export default {
  name: 'BannerDetail',
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      bntLoading: false,
      inputVisible: false,
      checkboxArray: [],
    }
  },
  created() {
    const { pmCode } = this.$route.query
    getMenuArray().then((res) => {
      this.checkboxArray = res.data
    })
    // 如果有值说明是编辑
    if (!pmCode) {
      return
    }

    getUserDetail({ pmCode }).then((res) => {
      if (!res.success) {
        this.$message.error(res.message)
        return
      }
      const { data = {} } = res
      this.form.setFieldsValue(data)
      this.pmCode = data.pmCode
    })
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.bntLoading = true
          setUser({
            ...values,
            pmCode: this.pmCode,
          }).then((res) => {
            const { message, success } = res
            this.bntLoading = false
            if (!success) {
              this.$message.error(message)
              return
            }
            this.$message.success(message)
            this.$router.push('/setting/userManagement')
          })
        }
      })
    },
  },
}
</script>
<style scoped>
</style>
