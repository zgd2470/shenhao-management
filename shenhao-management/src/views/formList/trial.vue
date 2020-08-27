<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="手机号">
                <a-input v-decorator="['phone']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="是否处理">
                <a-select placeholder="请选择" v-decorator="['isDeal']" :allowClear="true">
                  <a-select-option :value="0">未处理</a-select-option>
                  <a-select-option :value="1">已处理</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24"></a-col>
            <a-col :md="6" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handleCommentsList(1,10)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <z-table
          :columns="columns"
          :data-source="commentsList"
          :scroll="{x:1500}"
          :loading="loading"
          :pagination="pagination"
        ></z-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { dealTrial, getTrialList } from '../../api/shenhaoApi'
import moment from 'moment'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'Demonstrate',
  components: {
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      commentsList: [],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        onChange: (current, pageSize) => {
          this.handleCommentsList(current, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.handleCommentsList(current, pageSize)
        },
      },
      imgUrl: '',
      videoUrl: '',
      loading: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '60px',
          customRender: (text, record, index) => {
            return <div>{index + 1}</div>
          },
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          width: '120px',
        },
        {
          title: '手机',
          dataIndex: 'phone',
          key: 'phone',
          width: '120px',
        },
        {
          title: '职务',
          dataIndex: 'position',
          key: 'position',
          width: '120px',
        },
        {
          title: '公司名称',
          dataIndex: 'companyName',
          key: 'companyName',
          width: '180px',
        },
        {
          title: '公司规模',
          dataIndex: 'companySize',
          key: 'companySize',
          width: '180px',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          width: '180px',
        },
        {
          title: '提交时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '180px',
          customRender: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          title: '状态',
          dataIndex: 'isDeal',
          key: 'isDeal',
          width: '90px',
          fixed: 'right',
          customRender: (text) => {
            if (text === '0') {
              return <div style="color:red">未处理</div>
            }
            if (text === '1') {
              return <div style="color:green">已处理</div>
            }
          },
        },
        {
          title: '操作',
          key: 'operation',
          width: '60px',
          fixed: 'right',
          customRender: (text, record) => {
            if (record.isDeal === '0') {
              return (
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.handleDeal.bind(this, record.pmCode)}
                >
                  <template slot="title">
                    <p>确定已处理吗？</p>
                  </template>
                  <a>处理</a>
                </a-popconfirm>
              )
            }
            return null
          },
        },
      ],
    }
  },
  created() {
    this.handleCommentsList()
  },
  methods: {
    reset() {
      this.form.resetFields()
      this.handleCommentsList()
    },

    handleDeal(pmCode) {
      dealTrial({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        const { current, pageSize } = this.pagination
        this.$message.success(res.message)
        this.handleCommentsList(current, pageSize)
      })
    },
    handleCommentsList(current = 1, pageSize = 10) {
      const formValue = this.form.getFieldsValue()
      this.loading = true
      getTrialList({ ...formValue, current, pageSize }).then((res) => {
        this.loading = false
        if (res.success) {
          const { data } = res
          // 数据转化
          this.commentsList = data.list
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

.img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.body {
  margin: 20px;
  padding: 50px 0px;
}
</style>
