<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="课程名称">
                <a-input placeholder />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="是否推荐">
                <a-select placeholder="请选择">
                  <a-select-option value="ture">是</a-select-option>
                  <a-select-option value="false">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24"></a-col>
            <a-col :md="6" :sm="24">
              <span class="bntBody">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="newBnt">
        <a-button type="primary">新建知识视频</a-button>
      </div>
      <div>
        <a-table :columns="columns" :data-source="videoList">
          <span slot="operation" slot-scope="text">
            <a>查看视频</a>
            <a-divider type="vertical" />
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </span>
        </a-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      videoList: [
        {
          title: 'testTitle',
        },
      ],
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '封面',
          dataIndex: 'imgPmCode ',
          key: 'imgPmCode ',
        },
        {
          title: '是否推荐',
          dataIndex: 'isRecommended ',
          key: 'isRecommended ',
          width: '120px',
        },
        {
          title: '人数',
          dataIndex: 'number ',
          key: 'number ',
          width: '80px',
        },
        {
          title: '视频简介',
          dataIndex: 'introduction ',
          key: 'introduction ',
          width: '400px',
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: '200px',
        },
      ],
    }
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
</style>
