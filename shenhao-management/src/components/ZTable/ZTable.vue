<template>
  <div ref="table">
    <a-table v-bind="this.$attrs"></a-table>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$refs.table.offsetHeight)
    console.log(document.getElementsByClassName('ant-table-thead').clientHeight)
  },
}
</script>

<style>
</style>