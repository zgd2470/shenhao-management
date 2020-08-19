<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="body">
        <div>
          <a-button type="primary" @click="visible=true">新增年份</a-button>
          <a-button type="danger" style="margin-left:10px">删除</a-button>
          <div class="yearBody">
            <a-tree
              v-model="checkedKeys"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :selected-keys="selectedKeys"
              :tree-data="treeData"
              :pagination="pagination"
              @select="onSelect"
            />
          </div>
        </div>
        <div class="table-Body">
          <h2>当期年份：</h2>
          <z-table
            :columns="columns"
            :data-source="eventList"
            :scroll="{x:1000}"
            :loading="loading"
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
import { getDevelopmentYear, getDevelopmentEvent } from '../../api/shenhaoApi'
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
        },
      ],
      loading: false,
      eventList: [],
      pagination: false,
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys
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
.body {
  display: flex;
}
.yearBody {
  padding-top: 20px;
  width: 170px;
  margin-top: 5px;
  margin-bottom: 20px;
  height: 300px;
  border: 1px solid rgb(222, 222, 222);
}
.table-Body {
  margin-left: 20px;
  flex: 1;
  overflow-x: hidden;
}
</style>