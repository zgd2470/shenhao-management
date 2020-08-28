<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="视频标题">
                <a-select placeholder="请选择" v-decorator="['videoPmCode']" :allowClear="true">
                  <a-select-option
                    v-for="item in videoList"
                    :key="item.pmCode"
                    :value="item.pmCode"
                  >{{item.title}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24">
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
          :scroll="{x:1000}"
          :loading="loading"
          :pagination="pagination"
        ></z-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getVideoList, deleteComments, getCommentsList } from '../../api/shenhaoApi'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'CommentsList',
  components: {
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      videoList: [],
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
          title: '视频标题',
          dataIndex: 'title',
          key: 'title',
          width: '180px',
        },
        {
          title: '昵称',
          dataIndex: 'name',
          key: 'name',
          width: '120px',
        },
        {
          title: '评价分数',
          dataIndex: 'score',
          key: 'score',
          width: '120px',
        },
        {
          title: '评价内容',
          dataIndex: 'content',
          key: 'content',
          width: '400px',
        },
        {
          title: '评价时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '200px',
        },
        {
          title: '操作',
          key: 'operation',
          width: '60px',
          customRender: (text, record) => {
            return (
              <a-popconfirm
                placement="top"
                ok-text="确定"
                cancel-text="取消"
                onConfirm={this.handleDeleteComment.bind(this, record.pmCode)}
              >
                <template slot="title">
                  <p>确定删除该评论吗？</p>
                </template>
                <a>删除</a>
              </a-popconfirm>
            )
          },
        },
      ],
    }
  },
  created() {
    this.handleGetVideoList()
    this.handleCommentsList()
  },
  methods: {
    reset() {
      this.form.resetFields()
      this.handleCommentsList()
    },

    // 删除
    handleDeleteComment(pmCode) {
      deleteComments({ pmCode }).then((res) => {
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
      getCommentsList({ ...formValue, current, pageSize }).then((res) => {
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

    handleGetVideoList(curren = 1, pageSize = 200) {
      // 数量不多，先写死数量
      getVideoList({ curren, pageSize }).then((res) => {
        if (res.success) {
          const { data } = res
          // 数据转化
          this.videoList = data.list
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
