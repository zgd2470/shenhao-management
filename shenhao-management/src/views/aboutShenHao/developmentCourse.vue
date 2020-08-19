<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="developbBody">
        <div>
          <a-button type="primary" @click="visible=true">新增年份</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" @confirm="deleteYear">
            <template slot="title">
              <p>确定删除吗？</p>
            </template>
            <a-button type="danger" style="margin-left:10px">删除</a-button>
          </a-popconfirm>

          <div class="yearBody">
            <a-tree
              v-model="checkedKeys"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :selected-keys="selectedKeys"
              :tree-data="treeData"
              @select="onSelect"
            />
          </div>
        </div>
        <div class="table-Body" style="margin-bottom:30px">
          <h2>当期年份：{{year}}</h2>
          <z-table
            :columns="columns"
            :data-source="eventList"
            :scroll="{x:1000}"
            :loading="loading"
            :pagination="pagination"
            rowKey="id"
          ></z-table>
        </div>
      </div>
      <year-pop :visible="visible" :closePop="closePop" :getYear="getYear"></year-pop>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import ZTable from '../../components/ZTable/ZTable.js'
import YearPop from './yearPop.js'
import {
  getDevelopmentYear,
  getDevelopmentEvent,
  deleteDevelopmentYear,
  setDevelopmentEvent,
} from '../../api/shenhaoApi'
export default {
  components: {
    ZTable,
    YearPop,
  },
  data() {
    return {
      visible: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      year: '',
      treeData: [
        {
          title: '2020',
          key: '2020',
        },
        {
          title: '2019',
          key: '2019',
        },
      ],
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
          title: '月份',
          dataIndex: 'month',
          key: 'month',
          width: '120px',
        },
        {
          title: '事件',
          dataIndex: 'event',
          key: 'event',
          width: '320px',
          customRender: (text, record) => {
            if (this.isEdit && record.pmCode === this.editInfo.pmCode) {
              return <a-input v-model={this.newEvent} allowClear={true} />
            }
            return text
          },
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          width: '80px',
          customRender: (_, record) => {
            if (this.isEdit && record.pmCode === this.editInfo.pmCode) {
              return (
                <div>
                  <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" onConfirm={this.saveEvent.bind(this)}>
                    <template slot="title">
                      <p>确定保存吗？</p>
                    </template>
                    <a>保存</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="top"
                    ok-text="确定"
                    cancel-text="取消"
                    onConfirm={() => {
                      this.editInfo = null
                      this.isEdit = false
                    }}
                  >
                    <template slot="title">
                      <p>确定取消吗？</p>
                    </template>
                    <a>取消</a>
                  </a-popconfirm>
                </div>
              )
            }
            return (
              <a disabled={this.isEdit} onClick={this.edit.bind(this, record)}>
                编辑
              </a>
            )
          },
        },
      ],
      loading: false,
      eventList: [],
      isEdit: false,
      editInfo: null,
      newEvent: '',
      pagination: {
        hideOnSinglePage: true,
        pageSize: 50,
      },
    }
  },
  methods: {
    saveEvent() {
      const newInfo = {
        ...this.editInfo,
        event: this.newEvent,
      }
      setDevelopmentEvent(newInfo).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.getEventList(this.selectedKeys[0])
        this.isEdit = false
        this.editInfo = null
      })
    },
    edit(record) {
      this.isEdit = true
      this.editInfo = record
      this.newEvent = record.event
    },
    deleteYear() {
      if (!this.selectedKeys.length) {
        this.$message.error('请选择要删除的年份')
        return
      }
      deleteDevelopmentYear({ pmCode: this.selectedKeys[0] }).then((res) => {
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.getYear()
        this.year = ''
        this.eventList = []
        this.selectedKeys = []
      })
    },
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys
      this.editInfo = null
      this.isEdit = false
      this.getEventList(selectedKeys[0])
      this.year = info.selectedNodes[0].data.props.title
    },
    getEventList(yearPmCode) {
      getDevelopmentEvent({ yearPmCode }).then((res) => {
        if (res.success) {
          this.eventList = res.data
        }
      })
    },
    getYear() {
      getDevelopmentYear().then((res) => {
        if (res.success) {
          this.treeData = res.data
        }
      })
    },
    closePop() {
      this.visible = false
    },
  },
  created() {
    this.getYear()
  },
}
</script>

<style>
.developbBody {
  display: flex;
}
.yearBody {
  padding-top: 20px;
  width: 170px;
  margin-top: 5px;
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid rgb(222, 222, 222);
  overflow-y: auto;
}
.table-Body {
  margin-left: 20px;
  flex: 1;
  overflow-x: hidden;
}
</style>