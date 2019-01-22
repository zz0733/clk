<template>
  <div class="agency_number">
     <mi-nav></mi-nav>
    <mi-title :titleList="['时间','总人数','新增用户','存款人数']" style="margin-top:.2rem;"></mi-title>
    <div class="content-view">
        <div class="row" v-for="item in 30">
                   <span>
                      <p>2018-10-20</p>
                      <p>星期四</p>
                   </span>
          <span>0</span>
          <span>0</span>
          <span>0</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    this.$http
      .post("/frontend/v1/agency/lowerPeople", { date: 1 }, this.$headers)
      .then(res => {});
  }
};
</script>

<style lang="less" scoped>
.agency_number {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height: 100%;
  .content-view {
    flex: 1;
    background: #fff;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .row {
      height: 1rem;
      line-height: 1rem;
      display: flex;
      span {
        flex: 1;
        font-size: 0.28rem;
        color: #888888;
        text-align: center;
        p {
          &:nth-child(1) {
            line-height: 0.6rem;
          }
          &:nth-child(2) {
            line-height: 0.3rem;
          }
        }
        &:last-child {
          color: #ff0000;
        }
      }

      &::after {
        content: "";
        width: 0.3rem;
        height: 1px;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
