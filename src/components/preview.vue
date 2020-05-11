<template>
  <div>
      <section class="preview_box">
          <header class="preview_header" >{{ PreviewTitleName }}</header>
          <div v-if=" PreviewTitleName=='短信预览'">
              <!-- zp -->
               <div class="preview_content1">
              <hgroup>{{ PreviewData.moduleName }}</hgroup>
              <div class="preview_data1">
                  <p class="preview_data_title1">
                      <span>{{ PreviewData.mainTitle }}</span>
                  </p>
                  <div class="preview_data_introduce1">
                      <p>
                          <span v-html="PreviewData.subTitle.replace(/\%25/ig,'%')"></span>
                      </p>
                      <!-- <div v-if="PreviewTitleName == '微信预览'">
                          <img :src="'/tpdwt_web/tm/getFile.html?filePath='+PreviewData.accessimgurl" alt="">
                      </div> -->
                  </div>
              </div>    
          </div>
              <!-- zp -->
          </div>

 <div v-if=" PreviewTitleName=='微信预览'">

          <div class="preview_content">
              <hgroup>{{ PreviewData.moduleName }}</hgroup>
              <div class="preview_data">
                  <p class="preview_data_title">
                      <span>{{ PreviewData.slug }}</span>
                  </p>
                  <div class="preview_data_introduce">
                      <p>
                          <span v-html="PreviewData.subTitle.replace(/\%25/ig,'%')"></span>
                      </p>
                      <div v-if="PreviewTitleName == '微信预览'">
                          <img :src="'/tpdwt_web/tm/getFile.html?filePath='+PreviewData.accessimgurl" alt="">
                      </div>
                  </div>
              </div>    
          </div>
         </div>

          <div class="preview_send">
            <el-button type="primary" @click="sendContent">发送</el-button>
            <el-button type="info" @click="close_icon">取消</el-button>
        </div>
        <div class="close_icon">
            <i class="iconfont icon-guanbi" @click="close_icon"></i>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  data() {
      return {
          previewDisabelData: false,
          isSms: true,
      }
  },
  props: ['PreviewData','PreviewTitleName'],
  methods: {
      close_icon() {
          this.$emit('fetch')
      },
      sendContent() {
          if (this.PreviewTitleName == '微信预览'){
              this.$emit('sendWechatData')
          }else{
              this.$emit('sendNoteData2')
          }
          this.$emit('fetch')
      },

  }
}
// console.log( PreviewData.subTitle );
</script>

<style lang="scss" scoped>
.preview_box{
    width: 340px;
    height: 500px;
    padding: 20px;
    box-sizing: border-box;
    background: #f1f1f1;
    margin: 13% auto 20px;
    position: relative;
    box-shadow: 0px 0px 10px #000 inset;
    .preview_header{
        font-size: 20px;
        line-height: 25px;
    }
    .preview_content{
        hgroup{
            text-align: center;
            margin: 50px 0;
            // margin: 25px 0 25px;
            font-size: 18px;
        }
        .preview_data{
            width: 95%;
            margin: 0 auto;
            background: #fff;
            padding: 15px;
            // padding: 23px;
            box-sizing: border-box;
            border-radius: 7px;
            height: 150px;
            overflow-y: auto;
            .preview_data_title{
                font-size: 18px;
                // text-align: center;
                // margin-bottom: 15px;
            }
            .preview_data_introduce{
                display: flex;
                p{
                    font-size: 14px;
                    color: #aaaaaa;
                    text-align: justify;
                    margin-right: 10px;
                    // margin-right: 30px;
                    width: 70%;
                    //    width: 100%;
                }
                div{
                    img{
                        width: 50px;
                        height: 50px;
                        display: block;
                    }
                }
            }
        }
    }
    .close_icon{
        position: absolute;
        top: 2px;
        right: 2px;
        i{
            font-size: 32px;
            color: #aaaaaa;
            cursor: pointer;
        }
    }
}
// 短信
.preview_box{
    width: 340px;
    height: 500px;
    padding: 20px;
    box-sizing: border-box;
    background: #f1f1f1;
    margin: 13% auto 20px;
    position: relative;
    box-shadow: 0px 0px 10px #000 inset;
    .preview_header{
        font-size: 20px;
        line-height: 25px;
    }
    .preview_content1{
        hgroup{
            text-align: center;
            // margin: 50px 0;
            margin: 25px 0 25px;
            font-size: 18px;
        }
        .preview_data1{
            width: 95%;
            margin: 0 auto;
            background: #fff;
            // padding: 15px;
            padding: 23px;
            box-sizing: border-box;
            border-radius: 7px;
            // height: 150px;
            // overflow-y: auto;
            .preview_data_title1{
                font-size: 18px;
                text-align: center;
                margin-bottom: 15px;
            }
            .preview_data_introduce1{
                display: flex;
                p{
                    font-size: 14px;
                    color: #aaaaaa;
                    text-align: justify;
                    // margin-right: 10px;
                    // margin-right: 30px;
                    // width: 70%;
                       width: 100%;
                      span{
                          display: inline-block;
                          word-break: break-all;
                          width: 100%;
                      }
                }
                // div{
                //     img{
                //         width: 50px;
                //         height: 50px;
                //         display: block;
                //     }
                // }
            }
        }
    }
    .close_icon{
        position: absolute;
        top: 2px;
        right: 2px;
        i{
            font-size: 32px;
            color: #aaaaaa;
            cursor: pointer;
        }
    }
}
</style>
