<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户账号">
                <a-input v-decorator="['username']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handlegetUserList(1,10)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="newBnt">
        <a-button type="primary" @click="newUserDetail">新增用户</a-button>
      </div>
      <div>
        <z-table
          :columns="columns"
          :data-source="userLsit"
          :scroll="{x:1000}"
          :loading="loading"
          :pagination="pagination"
        ></z-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getUserList, deleteUser, setBanner } from '../../api/shenhaoApi'
import { pageType, stateEnum } from '../../utils/enum'
import bannerImg from '../../components/maxImg/bannerImg'
import ZTable from '../../components/ZTable/ZTable.js'
import moment from 'moment'

export default {
  name: 'BannerList',
  components: {
    bannerImg,
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      userLsit: [],
      loading: false,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        onChange: (current, pageSize) => {
          this.handlegetUserList(current, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.handlegetUserList(current, pageSize)
        },
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '60px',
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '账号',
          dataIndex: 'username',
          key: 'username',
          width: '200px',
        },
        {
          title: '昵称',
          dataIndex: 'name',
          key: 'name',
          width: '180px',
        },

        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '300px',
          customRender: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          title: '操作',
          key: 'operation',
          width: '200px',
          fixed: 'right',
          customRender: (_, record) => {
            if (record.username === 'admin' || record.username === this.$store.state.user.username) {
              return
            }

            return (
              <div>
                <a onClick={this.goBannerDetail.bind(this, record.pmCode)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.deleteUser.bind(this, record.pmCode)}
                >
                  <template slot="title">
                    <p>确定删除该用户吗？</p>
                  </template>
                  <a>删除</a>
                </a-popconfirm>
              </div>
            )
          },
        },
      ],
    }
  },
  created() {
    this.handlegetUserList()
  },
  methods: {
    goBannerDetail(pmCode) {
      let query = ''
      if (pmCode) {
        query = `?pmCode=${pmCode}`
      }
      this.$router.push(`/setting/userManagementDetail${query}`)
    },

    newUserDetail(pmCode) {
      this.$router.push(`/setting/userManagementDetail`)
    },

    reset() {
      this.form.resetFields()
      this.handlegetUserList()
    },

    // 删除
    deleteUser(pmCode) {
      deleteUser({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        const { current, pageSize } = this.pagination
        this.handlegetUserList(current, pageSize)
      })
    },

    handlegetUserList(current = 1, pageSize = 10) {
      const formValue = this.form.getFieldsValue()
      const { username = '' } = formValue
      this.loading = true
      getUserList({ username, current, pageSize }).then((res) => {
        this.loading = false
        if (res.success) {
          const { data } = res
          // 数据转化
          this.userLsit = data.list
          this.pagination = {
            ...this.pagination,
            total: data.total,
            current: current,
            pageSize: pageSize,
          }
        }
      })
    },
  },
}
</script>

<style>
.bntBody {
  display: flex;
  justify-content: flex-end;
}
.newBnt {
  margin-bottom: 20px;
}
.bannerImg {
  width: 180px;
  height: 80px;
  cursor: pointer;
}
.body {
  margin: 20px;
  padding: 50px 0px;
}
</style>
