<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="文章类型">
                <a-select placeholder="请选择" v-decorator="['type']" :allowClear="true">
                  <a-select-option value="0">行业资讯</a-select-option>
                  <a-select-option value="1">案例分享</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="文章标题">
                <a-input v-decorator="['title']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否推荐">
                <a-select placeholder="请选择" v-decorator="['indexRecommended']" :allowClear="true">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="发布时间">
                <a-range-picker v-decorator="['releaseTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"></a-col>

            <a-col :md="8" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handleGetNewsList(1,200)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="newBnt">
        <a-button type="primary" @click="newNewsDetail">新建文章</a-button>
      </div>
      <div>
        <z-table :columns="columns" :data-source="newsList" :scroll="{x:1000}" :loading="loading"></z-table>
      </div>
      <max-img :changeImgUrl="changeImgUrl" :imgUrl="imgUrl"></max-img>
      <a-modal
        :visible="Boolean(videoUrl)"
        @ok="changeVideoUrl('')"
        @cancel="changeVideoUrl('')"
        :footer="null"
      >
        <div class="body">
          <video-body :videoUrl="videoUrl" :key="videoUrl"></video-body>
        </div>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getNewsList, deleteNews } from '../../api/shenhaoApi'
import { isRecommendedEnum } from '../../utils/enum'
import maxImg from '../../components/maxImg/maxImg'
import videoBody from '../../components/videoBody/videoBody'
import moment from 'moment'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'NewsList',
  components: {
    maxImg,
    videoBody,
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      newsList: [],
      imgUrl: '',
      videoUrl: '',
      loading: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '60px',
          align: 'center',
          customRender: (text, record, index) => {
            return <div>{index + 1}</div>
          },
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: '150px',
          align: 'center',
        },
        {
          title: '封面',
          dataIndex: 'imgPmCode',
          key: 'imgPmCode',
          width: '120px',
          align: 'center',
          customRender: (text) => {
            return <img src={text} alt class="img" onClick={this.changeImgUrl.bind(this, text)} />
          },
        },
        {
          title: '文章类型',
          dataIndex: 'type',
          key: 'type',
          width: '120px',
          align: 'center',
          customRender: (text) => {
            return <div>{text == 1 ? '案例分享' : '行业资讯'}</div>
          },
        },
        {
          title: '是否推荐',
          dataIndex: 'indexRecommended',
          key: 'indexRecommended',
          width: '120px',
          align: 'center',
          customRender: (text) => {
            return <div>{text == 1 ? '是' : '否'}</div>
          },
        },
        {
          title: '阅读次数',
          dataIndex: 'number',
          key: 'number',
          width: '100px',
          align: 'center',
        },
        {
          title: '发布时间',
          dataIndex: 'releaseTime',
          key: 'releaseTime',
          width: '180px',
          align: 'center',
          customRender: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
        },
        {
          title: '操作',
          key: 'operation',
          width: '200px',
          align: 'center',
          customRender: (_, record) => {
            return (
              <div>
                <a onClick={this.goNewsDetail.bind(this, record.pmCode)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.deleteNews.bind(this, record.pmCode)}
                >
                  <template slot="title">
                    <p>确定删除该视频吗？</p>
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
    this.handleGetNewsList()
  },
  methods: {
    changeImgUrl(value) {
      console.log(value)
      this.imgUrl = value
    },

    changeVideoUrl(value) {
      console.log(value)
      this.videoUrl = value
    },

    goNewsDetail(pmCode) {
      let query = ''
      if (pmCode) {
        query = `?pmCode=${pmCode}`
      }
      this.$router.push(`/newsManagement/newsDetail${query}`)
    },

    newNewsDetail(pmCode) {
      this.$router.push(`/newsManagement/newsDetail`)
    },

    reset() {
      this.form.resetFields()
      this.handleGetNewsList()
    },

    // 删除
    deleteNews(pmCode) {
      deleteNews({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.handleGetNewsList()
      })
    },

    handleGetNewsList(curren = 1, pageSize = 200) {
      // 数量不多，先写死数量
      const formValue = this.form.getFieldsValue()
      let startTime = '',
        endTime = ''
      const { title = '', indexRecommended = '', type = '', releaseTime } = formValue
      if (releaseTime && releaseTime.length) {
        startTime = moment(releaseTime[0]).format('YYYY-MM-DD 00:00:00')
        endTime = moment(releaseTime[1]).format('YYYY-MM-DD 23:59:59')
      }
      this.loading = true
      getNewsList({ title, indexRecommended, type, curren, pageSize, startTime, endTime }).then((res) => {
        this.loading = false
        if (res.success) {
          const { data } = res
          // 数据转化
          this.newsList = data.list.map((info) => {
            return {
              ...info,
              imgPmCode: `/api/file/${info.imgPmCode}`,
            }
          })
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
