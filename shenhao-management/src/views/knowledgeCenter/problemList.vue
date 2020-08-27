<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="问题类型">
                <a-select placeholder="请选择" v-decorator="['type']" :allowClear="true">
                  <a-select-option value="1">操作类</a-select-option>
                  <a-select-option value="2">技术类</a-select-option>
                  <a-select-option value="3">商务类</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="问题内容">
                <a-input v-decorator="['title']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24"></a-col>
            <a-col :md="6" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handleGetProblemList">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-button type="primary" @click="visible=true;isEdit=false">新增问题</a-button>
      <div>
        <z-table
          :columns="columns"
          :data-source="problemList"
          :scroll="{x:1000}"
          :loading="loading"
        ></z-table>
      </div>
      <problem-pop
        :handleGetProblemList="handleGetProblemList"
        :dataInfo="dataInfo"
        :visible="visible"
        :closePop="closePop"
        :isEdit="isEdit"
      ></problem-pop>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getProblemList, deleteProblem } from '../../api/shenhaoApi'
import { problemType } from '../../utils/enum'
import ZTable from '../../components/ZTable/ZTable.js'
import ProblemPop from './problemPop.js'

export default {
  name: 'ProblemList',
  components: {
    ZTable,
    ProblemPop,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      isEdit: false,
      problemList: [],
      dataInfo: {},
      loading: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '60px',
          customRender: (text, render, index) => {
            return <div>{index + 1}</div>
          },
        },
        {
          title: '问题内容',
          dataIndex: 'title',
          key: 'title',
          width: '220px',
        },
        {
          title: '问题解答',
          dataIndex: 'answer',
          key: 'answer',
          width: '400px',
        },
        {
          title: '问题类型',
          dataIndex: 'type',
          key: 'type',
          width: '100px',
          customRender: (text) => problemType[text],
        },
        {
          title: '操作',
          key: 'operation',
          width: '120px',
          fixed: 'right',
          customRender: (text, record) => {
            return (
              <div class="opera">
                <a onClick={this.editProblem.bind(this, record)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.handleDeleteProblem.bind(this, record.pmCode)}
                >
                  <template slot="title">
                    <p>确定删除该问题吗？</p>
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
    this.handleGetProblemList()
  },
  methods: {
    reset() {
      this.form.resetFields()
      this.handleGetProblemList()
    },

    editProblem(info) {
      this.visible = true
      this.dataInfo = info
      this.isEdit = true
    },

    handleGetProblemList() {
      const formValue = this.form.getFieldsValue()
      getProblemList(formValue).then((res) => {
        const { data = [] } = res
        this.problemList = data
      })
    },

    // 删除
    handleDeleteProblem(pmCode) {
      deleteProblem({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.handleGetProblemList()
      })
    },

    closePop() {
      this.visible = false
      this.dataInfo = {}
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
