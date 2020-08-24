<template>
  <a-modal
    :visible="Boolean(imgUrl)"
    @ok="cilck"
    @cancel="cilck"
    :footer="null"
    :bodyStyle="bodyStyle"
    width="900px"
  >
    <div class="body">
      <img :src="imgUrl" alt class="popBannerImg" />
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      bodyStyle: { height: '450px', width: '600px' },
    }
  },
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
.popBannerImg {
  width: 900px;
  height: 450px;
  position: relative;
  left: 150px;
  top: -50px;
}
.ant-modal-body {
  padding: 0;
}
</style>