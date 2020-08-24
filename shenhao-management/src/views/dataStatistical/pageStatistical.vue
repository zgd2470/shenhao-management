<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="访问类型">
                <a-radio-group v-model="value" @change="onChange">
                  <a-radio :value="0">页面访问</a-radio>
                  <a-radio :value="1">按钮访问</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"></a-col>
            <a-col :md="8" :sm="24"></a-col>
          </a-row>
        </a-form>
      </div>

      <div>
        <z-table
          :columns="columns"
          :data-source="dataStatisticalList"
          :scroll="{x:1000}"
          :loading="loading"
          :pagination="pagination"
          :rowKey="record => record.typeTwo"
        >
          <span slot="index" slot-scope="text,record,index">
            <div>{{index+1}}</div>
          </span>
        </z-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getStatistical } from '../../api/shenhaoApi'
import ZTable from '../../components/ZTable/ZTable.js'

export default {
  name: 'pageStatistical',
  components: {
    ZTable,
  },
  data() {
    return {
      value: 0,
      pagination: false,
      loading: false,
      dataStatisticalList: [],
      pagination: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          scopedSlots: { customRender: 'index' },
          width: '60px',
          align: 'center',
        },
        {
          title: '页面名称',
          dataIndex: 'typeTwo',
          key: 'typeTwo',
          width: '180px',
          align: 'center',
        },
        {
          title: '被访问次数',
          dataIndex: 'number',
          key: 'number',
          width: '120px',
          align: 'center',
          sorter: (a, b) => a.number - b.number,
          sortDirections: ['ascend', 'descend'],
        },
      ],
    }
  },
  created() {
    this.getDataStatisticalList()
  },
  methods: {
    onChange(e) {
      console.log('radio checked', e.target.value)
      this.value = e.target.value
      this.getDataStatisticalList()
    },

    getDataStatisticalList() {
      getStatistical({ typeOne: this.value, typeTwo: 0 }).then((res) => {
        if (res.success) {
          if (this.value == '0') {
            let pageAccessDataObj = [
              {
                typeTwo: '0',
                number: 0,
              },
              {
                typeTwo: '1',
                number: 0,
              },
              {
                typeTwo: '2',
                number: 0,
              },
              {
                typeTwo: '3',
                number: 0,
              },
              {
                typeTwo: '4',
                number: 0,
              },
              {
                typeTwo: '5',
                number: 0,
              },
              {
                typeTwo: '6',
                number: 0,
              },
              {
                typeTwo: '7',
                number: 0,
              },
              {
                typeTwo: '8',
                number: 0,
              },
            ]

            for (var i = 0; i < pageAccessDataObj.length; i++) {
              for (var j = 0; j < res.data.length; j++) {
                if (pageAccessDataObj[i].typeTwo == res.data[j].typeTwo) {
                  pageAccessDataObj[i] = res.data[j]
                }
              }
            }

            for (var i = 0; i < pageAccessDataObj.length; i++) {
              switch (Number(pageAccessDataObj[i].typeTwo)) {
                case 0:
                  pageAccessDataObj[i].typeTwo = '首页'
                  break
                case 1:
                  pageAccessDataObj[i].typeTwo = '知识中心'
                  break
                case 2:
                  pageAccessDataObj[i].typeTwo = '伙伴发展'
                  break
                case 3:
                  pageAccessDataObj[i].typeTwo = '关于甚好'
                  break
                case 4:
                  pageAccessDataObj[i].typeTwo = 'S7'
                  break
                case 5:
                  pageAccessDataObj[i].typeTwo = 'S5'
                  break
                case 6:
                  pageAccessDataObj[i].typeTwo = '工资宝'
                  break
                case 7:
                  pageAccessDataObj[i].typeTwo = '云会计'
                  break
                case 8:
                  pageAccessDataObj[i].typeTwo = '云进销存'
                  break
              }
            }
            this.dataStatisticalList = pageAccessDataObj
          } else if (this.value == '1') {
            let btnAccessDataObj = [
              {
                typeTwo: '0',
                number: 0,
              },
              {
                typeTwo: '1',
                number: 0,
              },
              {
                typeTwo: '2',
                number: 0,
              },
              {
                typeTwo: '3',
                number: 0,
              },
              {
                typeTwo: '4',
                number: 0,
              },
            ]

            for (var i = 0; i < btnAccessDataObj.length; i++) {
              for (var j = 0; j < res.data.length; j++) {
                if (btnAccessDataObj[i].typeTwo == res.data[j].typeTwo) {
                  btnAccessDataObj[i] = res.data[j]
                }
              }
            }

            for (var i = 0; i < btnAccessDataObj.length; i++) {
              switch (Number(btnAccessDataObj[i].typeTwo)) {
                case 0:
                  btnAccessDataObj[i].typeTwo = 'S7页面按钮访问'
                  break
                case 1:
                  btnAccessDataObj[i].typeTwo = 'S5页面按钮访问'
                  break
                case 2:
                  btnAccessDataObj[i].typeTwo = '工资宝页面按钮访问'
                  break
                case 3:
                  btnAccessDataObj[i].typeTwo = '云会计页面按钮访问'
                  break
                case 4:
                  btnAccessDataObj[i].typeTwo = '云进销存页面按钮访问'
                  break
              }
            }
            this.dataStatisticalList = btnAccessDataObj
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
