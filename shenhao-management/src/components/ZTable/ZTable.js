import T from 'ant-design-vue/es/table/Table'

export default {
  data() {
    return {}
  },
  props: {
    ...T.props
  },
  render() {
    let props = {}
    let top = 0
    let headerHeight = 0
    let page = 65
    Object.keys(T.props).forEach(info => {
      if (this[info]) {
        props[info] = this[info]
      }
    })

    if (this.$refs.tableBody) {
      top = this.$refs.tableBody.getBoundingClientRect().top
      const childrenList = this.$refs.tableBody.getElementsByClassName('ant-table-thead')

      if (childrenList && childrenList.length) {
        headerHeight = childrenList[0].clientHeight // 表头高度
      }
    }

    let tableHeight = document.body.clientHeight - top - page - headerHeight // 表格高度：用屏幕高度减去表头和分页所占的高度

    const scroll = {
      ...props.scroll,
      y: tableHeight
    }
    props = {
      ...props,
      scroll
    }
    return (
      <div ref="tableBody" class="tableBody">
        <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }}></a-table>
      </div>
    )
  }
}
