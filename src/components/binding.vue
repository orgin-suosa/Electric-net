<template>
  <div>
    <section class="preview_box">
      <header class="preview_header">绑定操作</header>
      <div class="preview_content">
        <div class="preview_data">
          <div class="preview_data_introduce">
            <div class="binding_list">
              <p class="preview_data_title">
                <span>步骤</span>
              </p>
              <ul>
                <li>
                  <span>1.打开微信扫一扫</span>
                </li>
                <li>
                  <span>2.点击关注完成绑定</span>
                </li>
                <li>
                  <span>注：绑定后不可随意解绑</span>
                </li>
              </ul>
            </div>
            <div class="binding_ewm" id="code">
              <canvas id="canvas" width="150px" height="150px"></canvas>
              <!-- <img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFd8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyOEpvMWxsWXVmUmkxMDAwMHcwMzEAAgQSXR5aAwQAAAAA" alt=""> -->
              <!-- <img :src="qrcodeLogionData" alt="" width="150px" height="150px"> -->
            </div>
          </div>
        </div>
      </div>
      <div class="preview_send">
        <el-button type="primary" @click="bindingOverClick">完成绑定</el-button>
      </div>
      <div class="close_icon">
        <i class="iconfont icon-guanbi" @click="closeWindow"></i>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode";
Vue.use(QRCode);
export default {
  data() {
    return {
      //   qrcodeLogionData: ''
    };
  },
  props: ["qrcodeLogionData"],
  mounted() {
    //    let userTsrL = JSON.parse(window.localStorage.getItem('userTsr'))
    //生成的二维码内容，可以添加变量
    // 　　　　 this.QueryDetail='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFd8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyOEpvMWxsWXVmUmkxMDAwMHcwMzEAAgQSXR5aAwQAAAAA&tsrNo=' + userTsrL.TSR_SESSION.tsrno;
  },
  methods: {
    closeWindow() {
      this.$emit("fetch");
    },
    useqrcode(urlData) {
      // let userTsrL = JSON.parse(window.localStorage.getItem('userTsr'))
      //生成的二维码内容，可以添加变量
      // 　　　　 this.QueryDetail='https://10.7.181.184/tpdwt_new/toPrivateAdvisor.html';
      // 　　　　 this.QueryDetail='http://tpwxtest.life.cntaiping.com/tpdwt_new/toTsrBingLogion.html?tsrno=' + userTsrL.TSR_SESSION.tsrno;
      // function () {
      //     alert(11)
      // }
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, urlData, function(error) {
        if (error) console.error(error);
        console.log("success!");
      });
    },
    bindingOverClick() {
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      this.$emit("baindingOver", userTsrL.TSR_SESSION.tsrno);
    }
  },
  mounted() {
    //   this.useqrcode()
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  width: 150px !important;
  height: 150px !important;
}
.preview_box {
  width: 400px;
  height: 300px;
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
    hgroup {
      text-align: center;
      margin: 50px 0;
      font-size: 18px;
    }
    .preview_data {
      margin-top: 25px;

      .preview_data_introduce {
        display: flex;
        .binding_list {
          width: 60%;
        }
        .preview_data_title {
          font-size: 18px;
          text-align: center;
          line-height: 40px;
        }
        ul {
          li {
            line-height: 30px;
          }
          li:last-child {
            color: #aaaaaa;
          }
        }
        .binding_ewm {
          img {
            width: 150px;
          }
        }
      }
    }
  }
  .close_icon {
    width: 32px;
    height: 35px;
    position: absolute;
    top: 2px;
    right: 2px;
    i {
      font-size: 32px;
      color: #aaaaaa;
      cursor: pointer;
    }
  }
}
.preview_send {
  text-align: center;
  margin-top: 20px;
}
</style>
