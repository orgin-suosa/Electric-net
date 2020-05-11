<template>
  <div>
    <section class="preview_box">
      <header class="preview_header">温馨提示</header>
      <div class="preview_content">
        <p class="preview_tips">亲，该客户已处于48小时会话失效外，你发送的信息将以微信通知消息的形式发送给客户。</p>
        <div class="preview_data">
          <p class="preview_data_title">
            <span>发送内容</span>
          </p>
          <div class="preview_data_introduce">
            <p>
              <span>{{ comeToNothingData }}</span>
            </p>
          </div>
        </div>
        <ul class="sendWay">
          <li>
            <p class="send_way_name">发送方式</p>
            <div>
              <el-radio v-model="selectWx" label="1">微信</el-radio>
            </div>
          </li>
          <li>
            <p class="send_way_name">发送时间</p>
            <div>
              <el-radio v-model="selectTimeD" label="1">定时发送</el-radio>
            </div>
            <div class="send_way_select">
              <el-select v-model="selectTiemData" placeholder="请选择">
                <el-option
                  v-for="item in selectTime"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
        </ul>
      </div>
      <div class="preview_send">
        <el-button type="info" @click="closeWindow">取消</el-button>
        <el-button type="primary" @click="nothingFn">确认</el-button>
      </div>
      <div class="close_icon">
        <i class="iconfont icon-guanbi" @click="closeWindow"></i>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectWx: "1",
      selectTimeD: "1",
      selectTime: [
        {
          value: "",
          label: "17:30"
        }
      ],
      selectTiemData: "",
      comeToNothingDataList: ""
    };
  },
  props: ["comeToNothingData"],
  mounted() {
    this.comeToNothingDataList = this.comeToNothingData;
  },
  methods: {
    closeWindow() {
      this.$emit("fetch");
    },
    nothingFn() {
      this.$emit("nothingFn");
      this.$emit("fetch");
    }
  }
};
</script>

<style lang="scss" scoped>
.preview_box {
  width: 340px;
  height: 500px;
  padding: 20px;
  box-sizing: border-box;
  background: #f1f1f1;
  margin: 13% auto 20px;
  position: relative;
  box-shadow: 0px 0px 10px #000 inset;
  .preview_header {
    font-size: 20px;
    line-height: 25px;
  }
  .preview_content {
    margin-top: 50px;
    font-size: 16px;
    p.preview_tips {
      color: #ff0000;
    }
    p {
      text-align: justify;
      font-size: 14px;
    }
    .preview_data {
      width: 100%;
      margin: 20px auto;
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 7px;
      .preview_data_title {
        font-size: 16px;
      }
      .preview_data_introduce {
        display: flex;
        margin-top: 5px;
        p {
          font-size: 14px;
          color: #aaaaaa;
          text-align: justify;
          margin-right: 10px;
        }
        div {
          img {
            width: 50px;
            display: block;
          }
        }
      }
    }
    .sendWay {
      li {
        display: flex;
        line-height: 40px;
        .send_way_name {
          width: 83px;
        }
        .send_way_select {
          width: 100px;
          margin-left: 35px;
        }
        .el-radio__label {
          font-size: 16px;
        }
      }
    }
  }
  .close_icon {
    position: absolute;
    top: 2px;
    right: 2px;
    i {
      font-size: 32px;
      color: #aaaaaa;
      cursor: pointer;
    }
  }
  .preview_send {
    text-align: center;
    margin-top: 50px;
  }
}
</style>
