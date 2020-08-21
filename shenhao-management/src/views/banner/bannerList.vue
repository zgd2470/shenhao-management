<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="页面">
                <a-select placeholder="请选择" v-decorator="['type']" :allowClear="true">
                  <a-select-option value="index">首页</a-select-option>
                  <a-select-option value="s7">S7</a-select-option>
                  <a-select-option value="s5">S5</a-select-option>
                  <a-select-option value="wage">工资宝</a-select-option>
                  <a-select-option value="accounting">云会计</a-select-option>
                  <a-select-option value="save">云进销存</a-select-option>
                  <a-select-option value="partner">伙伴发展</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="handlegetBannerList">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="newBnt">
        <a-button type="primary" @click="newBannerDetail">新增Banner</a-button>
      </div>
      <div>
        <z-table :columns="columns" :data-source="videoList" :scroll="{x:1000}" :loading="loading"></z-table>
      </div>
      <banner-img :changeImgUrl="changeImgUrl" :imgUrl="imgUrl"></banner-img>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getBannerList, deleteVideo, setBanner } from '../../api/shenhaoApi'
import { pageType, stateEnum } from '../../utils/enum'
import bannerImg from '../../components/maxImg/bannerImg'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'BannerList',
  components: {
    bannerImg,
    ZTable,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      videoList: [],
      imgUrl: '',
      videoUrl: '',
      loading: false,
      columns: [
        {
          title: '页面',
          dataIndex: 'type',
          key: 'title',
          width: '150px',
          customRender: (text) => pageType[text],
        },
        {
          title: '图片',
          dataIndex: 'imgPmCode',
          key: 'imgPmCode',
          width: '200px',
          customRender: (text) => {
            return <img src={text} alt class="img" onClick={this.changeImgUrl.bind(this, text)} />
          },
        },
        {
          title: '排序',
          dataIndex: 'sorting',
          key: 'sorting',
          width: '100px',
        },

        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          width: '100px',
          customRender: (text) => {
            if (Number(text) === 0) {
              return <div style="color:red">{stateEnum[text]}</div>
            }
            return <div style="color:green">{stateEnum[text]}</div>
          },
        },
        {
          title: '备注',
          dataIndex: 'note',
          key: 'note',
          width: '300px',
        },
        {
          title: '操作',
          key: 'operation',
          width: '200px',
          fixed: 'right',
          customRender: (_, record) => {
            let text = ''
            if (record.state === '0') {
              text = '启用'
            }
            if (record.state === '1') {
              text = '禁用'
            }
            return (
              <div>
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.changeState.bind(this, record)}
                >
                  <template slot="title">
                    <p>确定{text}该banner吗？</p>
                  </template>
                  <a>{text}</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a onClick={this.goBannerDetail.bind(this, record.pmCode)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  onConfirm={this.deleteVideo.bind(this, record.pmCode)}
                >
                  <template slot="title">
                    <p>确定删除该Banner吗？</p>
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
    this.handlegetBannerList()
  },
  methods: {
    changeImgUrl(value) {
      console.log(value)
      this.imgUrl = value
    },

    changeState(data) {
      const info = {
        ...data,
        imgPmCode: data.imgPmCode.split('/')[3],
        state: Number(data.state) ? 0 : 1,
      }
      setBanner(info).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.handlegetBannerList()
      })
    },

    goBannerDetail(pmCode) {
      let query = ''
      if (pmCode) {
        query = `?pmCode=${pmCode}`
      }
      this.$router.push(`/banner/bannerDetail${query}`)
    },

    newBannerDetail(pmCode) {
      this.$router.push(`/banner/bannerDetail`)
    },

    reset() {
      this.form.resetFields()
      this.handlegetBannerList()
    },

    // 删除
    deleteVideo(pmCode) {
      deleteVideo({ pmCode }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.handlegetBannerList()
      })
    },

    handlegetBannerList() {
      // 数量不多，先写死数量
      const curren = 1,
        pageSize = 200
      const formValue = this.form.getFieldsValue()
      const { type = '' } = formValue
      this.loading = true
      getBannerList({ type, curren, pageSize }).then((res) => {
        this.loading = false
        if (res.success) {
          const { data } = res
          // 数据转化
          this.videoList = data.list.map((info) => {
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
  width: 180px;
  height: 80px;
  cursor: pointer;
}
.body {
  margin: 20px;
  padding: 50px 0px;
}
</style>
