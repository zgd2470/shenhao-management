<template>
  <a-modal :visible="Boolean(imgUrl)" @ok="cilck" @cancel="cilck" :footer="null">
    <div class="body">
      <img :src="imgUrl" alt class="maxImg" />
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    changeImgUrl: {
      type: Function,
      required: true,
    },
  },
  methods: {
    cilck() {
      this.changeImgUrl('')
    },
  },
}
</script>

<style>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.maxImg {
  width: 400px;
  height: 400px;
}
.ant-modal-body {
  padding: 0;
}
</style>