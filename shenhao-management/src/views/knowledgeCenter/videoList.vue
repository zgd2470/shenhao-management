<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="课程名称">
                <a-input v-decorator="['title']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="是否推荐">
                <a-select placeholder="请选择" v-decorator="['isRecommended']" :allowClear="true">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="标签">
                <a-input v-decorator="['text']" placeholder :allowClear="true" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handleGetVideoList">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="newBnt">
        <a-button type="primary" @click="newVideoDetail">新建知识视频</a-button>
      </div>
      <div>
        <z-table :columns="columns" :data-source="videoList" :scroll="{x:1000}" :loading="loading"></z-table>
      </div>
      <max-img :changeImgUrl="changeImgUrl" :imgUrl="imgUrl"></max-img>
      <a-modal
        :visible="videoUrl !==null"
        @ok="changeVideoUrl(null)"
        @cancel="changeVideoUrl(null)"
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
import { getVideoList, deleteVideo } from '../../api/shenhaoApi'
import { isRecommendedEnum } from '../../utils/enum'
import maxImg from '../../components/maxImg/maxImg'
import videoBody from '../../components/videoBody/videoBody'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'VideoList',
  components: {
    maxImg,
    videoBody,
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      videoList: [],
      imgUrl: '',
      videoUrl: null,
      loading: false,
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: '150px',
        },
        {
          title: '封面',
          dataIndex: 'imgPmCode',
          key: 'imgPmCode',
          width: '120px',
          customRender: (text) => {
            return <img src={text} alt class="img" onClick={this.changeImgUrl.bind(this, text)} />
          },
        },
        {
          title: '是否推荐',
          dataIndex: 'isRecommended',
          key: 'isRecommended',
          width: '120px',
          customRender: (text) => {
            return <div>{text}</div>
          },
        },
        {
          title: '是否猜你喜欢',
          dataIndex: 'isGuessLike',
          key: 'isGuessLike',
          width: '120px',
          customRender: (text) => {
            return <div>{text}</div>
          },
        },
        {
          title: '排序',
          dataIndex: 'sorting',
          key: 'sorting',
          width: '100px',
        },
        {
          title: '人数',
          dataIndex: 'number',
          key: 'number',
          width: '100px',
        },
        {
          title: '视频简介',
          dataIndex: 'introduction',
          key: 'introduction',
          width: '400px',
        },
        {
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
          width: '200px',
          customRender: (text) => {
            return (
              <div>
                {text.map((info) => (
                  <a-tag>{info}</a-tag>
                ))}
              </div>
            )
          },
        },
        {
          title: '操作',
          key: 'operation',
          width: '200px',
          fixed: 'right',
          customRender: (_, record) => {
            return (
              <div>
                <a onClick={this.changeVideoUrl.bind(this, record)}>查看视频</a>
                <a-divider type="vertical" />
                <a onClick={this.goVideoDetail.bind(this, record.pmCode)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.deleteVideo.bind(this, record.pmCode)}
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
    this.handleGetVideoList()
  },
  methods: {
    changeImgUrl(value) {
      console.log(value)
      this.imgUrl = value
    },

    changeVideoUrl(info) {
      this.videoUrl = info
    },

    goVideoDetail(pmCode) {
      let query = ''
      if (pmCode) {
        query = `?pmCode=${pmCode}`
      }
      this.$router.push(`/knowledgeCenter/videoDetail${query}`)
    },

    newVideoDetail(pmCode) {
      this.$router.push(`/knowledgeCenter/videoDetail`)
    },

    reset() {
      this.form.resetFields()
      this.handleGetVideoList()
    },

    // 删除
    deleteVideo(pmCode) {
      deleteVideo({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.handleGetVideoList()
      })
    },

    handleGetVideoList() {
      // 数量不多，先写死数量
      const curren = 1,
        pageSize = 200
      const formValue = this.form.getFieldsValue()
      const { title = '', isRecommended = '', text = '' } = formValue
      this.loading = true
      getVideoList({ title, isRecommended, curren, pageSize, text }).then((res) => {
        this.loading = false
        if (res.success) {
          const { data } = res
          // 数据转化
          this.videoList = data.list.map((info) => {
            return {
              ...info,
              isRecommended: isRecommendedEnum[info.isRecommended],
              isGuessLike: isRecommendedEnum[info.isGuessLike],
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
