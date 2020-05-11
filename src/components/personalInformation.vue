<template>
  <div id="personal">
    <ul class="per_title">
      <li
        v-for="(item, index) in titleLists"
        :class="item.titleClass"
        @click="titleOPeration(index)"
        :key="index"
      >
        <span>{{ item.titleName }}</span>
      </li>
    </ul>
    <div v-show="isCardContent" class="per_box">
      <div class="per_box_select" ref="perBoxSelect">
        <div class="per_new_content" @click="perSelect(false)">
          <!-- <transition name="per-new-fade"> -->
          <div class="per_new_bg" ref="perNew"></div>
          <!-- </transition> -->
          <div class="per_new_two_bg">
            <p v-for="(item, index) in perSelectData" :key="index" class="pitch_on">
              <span>{{ item.contentSelect }}</span>
            </p>
          </div>
        </div>
      </div>
      <ul class="per_content_one" v-show="isShowSelect">
        <li v-for="(item, index) in selectableListData" :class="item.pitchOn" :key="index">
          <div class="pitch_title" @click="Designate(index)">
            <div class="icon_one">
              <i class="iconfont" :class="item.selectableIcon"></i>
            </div>
            <p>
              <span>{{ item.MODULENAME }}</span>
            </p>
            <div class="icon_two">
              <i class="iconfont icon-xiangxia2"></i>
            </div>
          </div>
          <div class="pitch_on_data" v-show="item.isShowContent">
            <!-- <div v-for="(cardList, index) in item.selectableContent.temlist" :key="index"> -->
            <ul class="my_card_list">
              <li
                class="new-li-list"
                v-for="(cardListData, indexTwo) in item.temlist"
                :key="indexTwo"
              >
                <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-if="(cardListData.ISOPENJHS=='4'||starNumTwo.position!='TSR')&&(cardListData.ISOPENJHS=='4'||cardListData.ISOPENJHS=='3'||cardListData.ISOPENJHS=='6')"
                ></div>
                <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-else-if="!isMineClick&&(cardListData.ISOPENJHS=='4'||cardListData.ISOPENJHS=='3')"
                ></div>
                <!-- <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-else-if="cardListData.isAllow!='Y'"
                ></div>-->
                <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-else-if="cardListData.MODULEID=='4'&&cardListData.isAllow!='Y'||cardListData.MODULEID=='5'&&cardListData.isAllow!='Y'"
                ></div>
                <!-- <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-else-if="cardListData.MODULEID=='5'"
                ></div>-->
                <div class="my_card_list_img" @click="selectCard(indexTwo)" v-else></div>
                <div class="new-li-list-div" @click="selectCard(indexTwo)">
                  <div class="card_checkbox">
                    <div v-if="cardListData.ISOPENJHS=='1'" class="icon_two">
                      <i class="iconfont icon-xiangxia2"></i>
                    </div>
                    <el-checkbox v-else v-model="cardListData.isCardSelect"></el-checkbox>
                  </div>
                  <p
                    :class="(((cardListData.ISOPENJHS=='4'||starNumTwo.position!='TSR')&&(cardListData.ISOPENJHS=='4'||cardListData.ISOPENJHS=='3'||cardListData.ISOPENJHS=='6'))||(!isMineClick&&(cardListData.ISOPENJHS=='4'||cardListData.ISOPENJHS=='3'|| cardListData.MODULEID=='4'&&cardListData.isAllow!='Y'|| cardListData.MODULEID=='5'&&cardListData.isAllow!='Y')))?'disableColor':''"
                  >{{ cardListData.SLUG}}</p>
                </div>

                <div v-if="cardListData.isCardSelect&&cardListData.ISOPENJHS=='1'">
                  <!-- <div> -->
                  <ul>
                    <li
                      class="new-li-list-two"
                      v-for="(item,index) in cardListData.booksListData"
                      style="margin-left:10px;"
                      :key="index"
                    >
                      <!-- {{(item,index) in cardListData.booksListData}}0000 -->
                      <div v-if="item.isOpenClick" class="new-li-list-two-mengban"></div>
                      <div
                        style="display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;height:40px;"
                        v-else
                        class="new-li-list-two-mengban-two"
                      >
                        <!-- <div
                          style="width:10%;height:40px;"
                          @click="openPlanBooksContent(index,false)"
                        ></div>-->
                        <div
                          style="width:10%;height:40px;"
                          @click="openPlanBooksContent(index,false)"
                        ></div>
                        <div
                          style="width:90%;height:40px;"
                          @click="openPlanBooksContent(index,true)"
                        ></div>
                      </div>
                      <div class="card_checkbox">
                        <el-checkbox v-model="item.isBooksSelect"></el-checkbox>
                      </div>
                      <p :class="item.isOpenClick?'disableColor':''">{{item.booksName}}</p>
                      <!-- <p
                        style="z-index:9999;"
                        :class="item.isOpenClick?'disableColor':''"
                        @click="openPlanBooksContent(index,true)"
                      >{{item.booksName}}888</p>-->
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <!-- </div> -->
          </div>
        </li>
      </ul>
      <ul class="per_content_one" v-show="!isShowSelect">
        <li v-for="(item, index) in selectableListData" :class="item.pitchOn" :key="index">
          <div class="pitch_title" @click="Designate(index)">
            <div class="icon_one">
              <i class="iconfont" :class="item.selectableIcon"></i>
            </div>
            <p>
              <span>{{ item.MODULENAME }}</span>
            </p>
            <div class="icon_two">
              <i class="iconfont icon-xiangxia2"></i>
            </div>
          </div>
          <div class="pitch_on_data" v-show="item.isShowContent">
            <!-- <div v-for="(cardList, index) in item.selectableContent.temlist" :key="index"> -->
            <ul class="my_card_list">
              <li
                class="new-li-list"
                v-for="(cardListData, indexTwo) in item.temlist"
                :key="indexTwo"
              >
                <div
                  class="my_card_list_img"
                  style="background: rgba(255, 255, 255, 0.3);z-index:5;"
                  v-if="cardListData.MODULEID=='4'&&cardListData.isAllow!='Y'||cardListData.MODULEID=='5'&&cardListData.isAllow!='Y'"
                ></div>
                <div class="my_card_list_img" @click="selectCard(indexTwo)" v-else></div>

                <div class="new-li-list-div" @click="selectCard(indexTwo)">
                  <div class="card_checkbox">
                    <div v-if="cardListData.ISOPENJHS=='1'" class="icon_two">
                      <i class="iconfont icon-xiangxia2"></i>
                    </div>
                    <el-checkbox v-else v-model="cardListData.isCardSelect"></el-checkbox>
                  </div>
                  <p
                    :class="(((cardListData.MODULEID=='4'&&cardListData.isAllow!='Y'|| cardListData.MODULEID=='5'&&cardListData.isAllow!='Y')))?'disableColor':''"
                  >{{ cardListData.MAINTITLE}}</p>
                </div>
                <div v-if="cardListData.isCardSelect&&cardListData.ISOPENJHS=='1'">
                  <!-- <div> -->
                  <ul>
                    <li
                      class="new-li-list-two"
                      v-for="(item,index) in cardListData.booksListData"
                      style="margin-left:10px;"
                      :key="index"
                    >
                      <div v-if="item.isOpenClick" class="new-li-list-two-mengban"></div>
                      <div
                        v-else
                        style="display:-ms-flexbox;display:-webkit-flex;display:flex;height:40px;"
                        class="new-li-list-two-mengban-two"
                      >
                        <!-- <div
                          style="width:10%;height:40px;"
                          @click="openPlanBooksContent(index,false)"
                        ></div>-->
                        <div
                          style="width:10%;height:40px;"
                          @click="openPlanBooksContent(index,false)"
                        ></div>
                        <div
                          style="width:90%;height:40px;;"
                          @click="openPlanBooksContent(index,true)"
                        ></div>
                      </div>
                      <div class="card_checkbox">
                        <el-checkbox v-model="item.isBooksSelect"></el-checkbox>
                      </div>
                      <p
                        :class="item.isOpenClick?'disableColor':''"
                        @click="openPlanBooksContent(index,true)"
                      >{{item.booksName}}</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <!-- </div> -->
          </div>
        </li>
      </ul>
      <div class="send_btn">
        <div v-if="isShowSelect">
          <el-button
            class="btn_style"
            type="primary"
            @click="sendWechat"
            :disabled="isDisabel"
            plain
          >
            <i class="iconfont icon-weixin1"></i>&nbsp;微信发送
          </el-button>
          <el-button
            class="btn_style"
            type="primary"
            @click="WechatPreview"
            :disabled="isDisabel"
            plain
          >
            <i class="iconfont icon-weixin1"></i>&nbsp;微信预览
          </el-button>
        </div>
        <div v-else>
          <el-button class="btn_style" type="primary" @click="sendNote"   :disabled="isDisabel1" plain>
            <i class="iconfont icon-duanxin1"></i>&nbsp;短信发送
          </el-button>
          <el-button class="btn_style" type="primary" @click="NotePreview" :disabled="isDisabel1" plain>
            <i class="iconfont icon-duanxin1"></i>&nbsp;短信预览
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="isClient" class="client_perview_two">
      <div class="client_data">
        <p class="client_data_title">微信资料</p>
        <div class="client_data_content">
          <div class="client_data_content_img">
            <img
              :src="'/tpdwt_web/chat/getFile.html?filePath='+clientPortrayalDataList.HEADERIMG"
              alt
            >
          </div>
          <div class="client_data_content_message">
            <p>
              姓名：
              <span>{{ clientPortrayalDataList.NICKNAME }}</span>
              <span class="client_data_content_sex" v-if="clientPortrayalDataList!=''">
                <i
                  class="iconfont icon-nan"
                  style="color: #3a8ee6"
                  v-if="clientPortrayalDataList.SEX=='1'"
                ></i>
                <i class="iconfont icon-nv" v-else style="color: #fc3bfa"></i>
              </span>
            </p>
            <p>
              地区：
              <span>{{ clientPortrayalDataList.ADDRESS }}</span>
            </p>
          </div>
          <!-- <div class="client_data_content_sex" v-if="clientPortrayalDataList!=''">
                      <i class="iconfont icon-nan" style="color: #3a8ee6" v-if="clientPortrayalDataList.SEX=='1'"></i>
                      <i class="iconfont icon-nv" v-else style="color: #fc3bfa"></i>
          </div>-->
        </div>
      </div>
      <div>
        <img src="../../static/images/separate.jpg" alt width="100%">
      </div>
      <div class="client_data">
        <p class="client_data_title">
          客户标签
          <span style="float: right;">
            {{ clientPortrayalDataList.clientPortrayalNo }}
            <i v-if="clientPortrayalDataList != ''">个</i>
          </span>
        </p>
        <div class="client_data_list">
          <!-- <el-tag type="success" v-for="(item, index) in clientPortrayalDataList.laber" :key="index">{{ item }}</el-tag> -->
          <ul>
            <li
              v-for="(item, index) in clientPortrayalDataList.laber"
              :key="index"
              class="tips_content"
            >{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="isFooter" class="footer_content_box">
      <div class="footer_content">
        <div class="footer_left"></div>
        <ul class="footer_right">
          <li :class="item.addClassNameData" v-for="(item, index) in clientFooterData" :key="index">
            <div class="icon_yuan"></div>
            <p class="footer_time">{{ item.INSERT_TIME }}</p>
            <div class="footer_icon">
              <i class="iconfont" :class="item.iconContent"></i>
              <span>{{ item.clientOperation }}</span>
            </div>
            <div class="footer_list_content">
              <div class="footer_sanj"></div>
              <p>{{ item.FOOTPRINT_CONTENT }}</p>
              <!-- <p><a href="http://baoxian.cntaiping">http://baoxian.cntaiping</a></p> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="booksBg" v-if="isShowBooks">
      <div class="books-content">
        <img :src="newbannerImg" width="100%">
        <div class="books-banner-box">
          <p class="books-name">
            {{booksListContent.NAME}}{{booksListContent.sex}}
            <span class="span-one">您好</span>
            <span class="span-two">{{booksListContent.age}}岁</span>
          </p>
          <div class="books-no">
            <div>
              <img :src="newTipsIconTwo" alt>
            </div>
            <p>临时保单号:{{booksListContent.TempPolicyNum}}</p>
          </div>
          <div class="books-content-list">
            <hgroup class="books-list-hgroup">
              <div></div>
              <p>保险信息</p>
            </hgroup>
            <ul class="books-list-ul">
              <li class="books-list-li">
                <p>保险名称</p>
                <p>{{booksListContent.MAINTITLE}}</p>
              </li>
              <li class="books-list-li">
                <p>保障期限</p>
                <!-- <p>20年/25岁/保至70周岁</p> -->
                <p>{{booksListContent.COVER_T_style}}</p>
              </li>
              <li class="books-list-li">
                <p>缴费方式</p>
                <p>{{booksListContent.PAY_T_style}}</p>
              </li>
              <li class="books-list-li">
                <p>缴费期限</p>
                <p>{{booksListContent.CRG_T_style}}</p>
              </li>
              <li class="books-list-li">
                <p>生效日期</p>
                <p>{{booksListContent.DateTime}}</p>
              </li>
              <li class="books-list-li">
                <p>保费</p>
                <p>{{booksListContent.PREMIUM}}元</p>
              </li>
              <li class="books-list-li">
                <p>份数</p>
                <p>{{booksListContent.UNIT}}份</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="new-close-icon" @click="closeBooksFn">
          <img :src="newCloseIconTwo" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../store/types.js";
import { mapActions } from "vuex";
const log = console.log;
export default {
  data() {
    return {
      isMineClick: false,
      nowNewNum: 1,
      zp: false,
      nowLongBx: "", //当前保险ID
      booksListContent: {
        NAME: "",
        sex: "",
        age: "",
        TempPolicyNum: "",
        xzName: "",
        PAY_T: "",
        CRG_Y: "",
        PAY_T_style: "",
        CRG_Y: ""
      },
      policyType: "1",
      policyCode: "",
      hallid: "",
      policyPhone: "",
      listNoThree: "",
      starNum: "",
      starNumTwo: "",
      booksListData: [
        {
          isOpenClick: false,
          booksName: "产品简介",
          isBooksSelect: true
        },
        {
          isOpenClick: true,
          booksName: "计划书",
          isBooksSelect: false
        },
        // {
        //   isOpenClick: true,
        //   booksName: "确认书",
        //   isBooksSelect: false
        // }
      ],
      isSureBooksNo: false,
      isplanBooksNo: false,
      isShowBooks: false,
      newbannerImg: require("../../static/images/bannerImg.png"),
      newTipsIconTwo: require("../../static/images/newTipsIconTwo.png"),
      newCloseIconTwo: require("../../static/images/newCloseIconTwo.png"),
      titleLists: [
        {
          titleName: "可选内容",
          titleClass: "pitch_on"
        },
        {
          titleName: "客户画像",
          titleClass: ""
        },
        {
          titleName: "客户足迹",
          titleClass: ""
        }
      ],
      isSms: false,
      geshu: "",
      isCardCompany: false,
      isCardMy: false,
      isCardContent: true,
      isClient: false,
      isFooter: false,
      clientFooterDataTwo: [],
      perSelectData: [
        {
          contentSelect: "微信"
        },
        {
          contentSelect: "短信"
        }
      ],
      isShowSelect: false,
      pitchDataNo: 0,
      selectableListData: [
        {
          MODULENAME: "引导区",
          isShowContent: true,
          pitchOn: "pitch_on_li",
          selectableIcon: "icon-shouyefill",
          temlist: [
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            },
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            }
          ]
        },
        {
          MODULENAME: "保险理念",
          isShowContent: false,
          selectableIcon: "icon-pengyoufill",
          pitchOn: "",
          temlist: [
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            }
          ]
        },
        {
          MODULENAME: "活动测试",
          isShowContent: false,
          selectableIcon: "icon-salefill",
          pitchOn: "",
          temlist: [
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            }
          ]
        },
        {
          MODULENAME: "短险购买",
          isShowContent: false,
          selectableIcon: "icon-tishifill",
          pitchOn: "",
          temlist: [
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            }
          ]
        },
        {
          MODULENAME: "长险测保",
          isShowContent: false,
          selectableIcon: "icon-xinxifill",
          pitchOn: "",
          temlist: [
            {
              ID: "46546546",
              SLUG: "测试使用1",
              isCardSelect: false,
              MODULEID: "1",
              TYPE: "2"
            }
          ]
        }
      ],
      listOneNo: 0,
      listTwoNo: 0,
      newTsrId: ""
    };
  },
  props: [
    "clientPortrayalDataList",
    "clientFooterData",
    "isDisabel",
    'isDisabel1',
    "isPhoneDisabel",
    "isJudge"
  ],
  created() {
    // alert(999999);
    this.enterPage();

    this.getJhsMessageFntwo();
  },
  mounted() {
    this.newmodelListterId();
    this.modelListData(1);
  },
  methods: {
    ...mapActions({
      queryProCode: types.QUERYPROCODE, //赵盼添加员工编号
      modelList: types.MODELLIST,
      getJhsMessageFn: types.GETJHSMESSAGE
    }),

    //点击我自己时所有的都不能发送
    clickMines() {
      this.isMineClick = false;
      for (let i = 0; i < this.selectableListData.length; i++) {
        for (let j = 0; j < this.selectableListData[i].temlist.length; j++) {
          for (let item of this.selectableListData[i].temlist[j]
            .booksListData) {
            item.isOpenClick = true;
          }
          this.selectableListData[i].temlist[
            j
          ].booksListData[0].isOpenClick = false;
        }
      }
    },

    //进入页面加载的是否有发送
    enterPage() {
      // return false
      // this.starNum = this.$utils.getUrlKey("content");
      this.starNum = unescape(
        $.base64.decode(this.$utils.getUrlKey("content"))
      ); //chen
      this.starNumTwo = JSON.parse(this.starNum);

      this.isMineClick = true;
      if (this.starNumTwo.tempPolicyNum) {
        this.policyType = this.starNumTwo.policyType;
        this.policyCode = this.starNumTwo.tempPolicyNum;

        this.isMineClick = true;
      }
    },
    //足迹添加样式内容
    clientFooterList() {},
    //可选内容区选择事件
    Designate(index) {
      this.listOneNo = index;
      if (this.selectableListData[index].isShowContent == false) {
        for (let i = 0; i < this.selectableListData.length; i++) {
          this.selectableListData[i].pitchOn = "";
          this.selectableListData[i].isShowContent = false;
        }
        this.selectableListData[index].pitchOn = "pitch_on_li";
        this.selectableListData[index].isShowContent = true;
      } else {
        this.selectableListData[index].pitchOn = "";
        this.selectableListData[index].isShowContent = false;
      }
    },

    newmodelListterId() {
      let userTsr = JSON.parse(window.localStorage.getItem("userTsr"));
      let tsrno = userTsr.TSR_SESSION.tsrno;

      let tsrid = new FormData();

      tsrid.append("tsrid", tsrno);
      this.queryProCode({
        tsrid,
        successCallback: result => {
          this.newTsrId = result;
          this.modelListData(1);
        }
      });
    },
    //获取名片内容
    modelListData(num) {
      this.nowNewNum = num;
      let modelListWechat = new FormData();

      modelListWechat.append("wechatNo", num);
      modelListWechat.append("codeList", this.newTsrId.result);

      this.modelList({
        modelListWechat,
        successCallback: result => {
          let policyTypeNum = this.policyType;
          policyTypeNum--;

          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].temlist.length; j++) {
              result[i].temlist[j].booksListData = this.booksListData;
            }
          }

          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].temlist.length; j++) {
              if (result[i].temlist[j].INSURANCECODE == this.nowLongBx) {
              }
            }
          }

          for (let i = 0; i < result.length; i++) {
            result[i].temlist.isCardSelect = false;

            this.$set(this.selectableListData[i], "temlist", result[i].temlist);
          }
        },
        failCallback: () => {}
      });
    },
    //顶部切换
    titleOPeration(index) {
      if (index === 0) {
        for (let i = 0; i < this.titleLists.length; i++) {
          this.titleLists[i].titleClass = "";
        }
        this.titleLists[0].titleClass = "pitch_on";
        this.isCardContent = true;
        this.isClient = false;
        this.isFooter = false;
      }
      if (index === 1) {
        if (this.isJudge) {
          for (let i = 0; i < this.titleLists.length; i++) {
            this.titleLists[i].titleClass = "";
          }
          this.titleLists[1].titleClass = "pitch_on";
          this.isCardContent = false;
          this.isClient = true;
          this.isFooter = false;
          this.$emit("clientPortrayalData");
        }
      }
      if (index === 2) {
        if (this.isJudge) {
          for (let i = 0; i < this.titleLists.length; i++) {
            this.titleLists[i].titleClass = "";
          }
          this.titleLists[2].titleClass = "pitch_on";
          this.isCardContent = false;
          this.isClient = false;
          this.isFooter = true;
          this.$emit("clientFooterDataL");
        }
      }
    },
    perSelectTwo(isme, ismeTwo) {
      
      this.isSms = ismeTwo;

      if (isme) {
        this.$refs.perNew.style.left = "50%";
        this.isShowSelect = true;
        this.modelListData(2);
      } else {
        this.$refs.perNew.style.left = "0%";
        this.isShowSelect = false;
        this.modelListData(1);
      }
    },
    perSelect() {
      
      if (this.isSms) {
        return false;
      }
      if (this.$refs.perNew.style.left == "50%") {
        this.isShowSelect = false;
        this.modelListData(1);
        this.$refs.perNew.style.left = "0%";
      } else {
        this.isShowSelect = true;
        this.modelListData(2);
        this.$refs.perNew.style.left = "50%";
      }
    },
    //微信预览
    WechatPreview() {
      if (this.listNoThree.isCardSelect == false) {
        return false;
      }

      if (this.listNoThree.isCardSelect) {
        this.$emit("openContent", this.listNoThree);
      }
    },
    //短信预览
    NotePreview() {
      if (this.listNoThree.isCardSelect) {
        this.$emit("openContentNote", this.listNoThree);
      }
    },
    //sendWechatData微信发送
    sendWechat() {
      
      if (this.listNoThree.isCardSelect) {
        this.$emit("sendWechatData", this.listNoThree);
      }
    },
    //短信发送
    sendNote() {
      if (this.listNoThree.isCardSelect) {
        this.$emit("sendNoteData", this.listNoThree);
      }
    },
    //民片选择
    selectCard(index) {
      
      this.listTwoNo = index;
      let policyTypeNum = this.policyType;
      policyTypeNum--;
      for (let i = 0; i < this.selectableListData.length; i++) {
        for (let j = 0; j < this.selectableListData[i].temlist.length; j++) {
          this.selectableListData[i].temlist[j].isCardSelect = false;
        }
      }
      if (
        this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
          .ISOPENJHS == "1"
      ) {
        for (let item of this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].booksListData) {
          item.isBooksSelect = false;
        }
        this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].booksListData[0].isBooksSelect = true;
        this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].booksCode = "0";
        if (
          this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
            .INSURANCECODE == this.nowLongBx &&
          this.isMineClick
        ) {
          this.selectableListData[this.listOneNo].temlist[
            this.listTwoNo
          ].booksListData[policyTypeNum].isOpenClick = false;
          this.selectableListData[this.listOneNo].temlist[
            this.listTwoNo
          ].booksListData[0].isOpenClick = false;
        } else {
          this.selectableListData[this.listOneNo].temlist[
            this.listTwoNo
          ].booksListData[policyTypeNum].isOpenClick = true;
          this.selectableListData[this.listOneNo].temlist[
            this.listTwoNo
          ].booksListData[0].isOpenClick = false;
        }
      }
      this.selectableListData[this.listOneNo].temlist[
        this.listTwoNo
      ].booksCode = "0";
      this.selectableListData[this.listOneNo].temlist[
        this.listTwoNo
      ].isCardSelect = true;
      this.$set(
        this.selectableListData[this.listOneNo].temlist,
        this.listTwoNo,
        this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
      );

      this.listNoThree = this.selectableListData[this.listOneNo].temlist[
        this.listTwoNo
      ];
    },

    //
    getJhsMessageFntwo() {
      if (!this.starNumTwo.tempPolicyNum) {
        return false;
      }

      let planData = new FormData();
      planData.append("policyType", this.policyType);
      planData.append("policyCode", this.policyCode);
      this.getJhsMessageFn({
        planData,
        successCallback: result => {
          this.nowLongBx = result.PTS[0].PT.ID;

          if (result.SEX == "1") {
            result.sex = "先生";
          } else {
            result.sex = "女士";
          }

          result.PREMIUM = 0;
          for (let i = 0; i < result.PTS.length; i++) {
            if (result.PTS[i].PT.ID == this.nowLongBx) {
              if (result.PTS[i].PT.PAY_T == "0") {
                result.PAY_T_style = "无关或不确定";
              } else if (result.PTS[i].PT.PAY_T == "1") {
                result.PAY_T_style = "年交";
              } else if (result.PTS[i].PT.PAY_T == "2") {
                result.PAY_T_style = "半年交";
              } else if (result.PTS[i].PT.PAY_T == "3") {
                result.PAY_T_style = "季交";
              } else if (result.PTS[i].PT.PAY_T == "4") {
                result.PAY_T_style = "月交";
              } else if (result.PTS[i].PT.PAY_T == "5") {
                result.PAY_T_style = "趸交";
              } else if (result.PTS[i].PT.PAY_T == "6") {
                result.PAY_T_style = "不定期";
              } else if (result.PTS[i].PT.PAY_T == "7") {
                result.PAY_T_style = "趸交按月付款";
              }

              if (result.PTS[i].PT.COVER_T == "0") {
                result.COVER_T_style = "无关";
              } else if (result.PTS[i].PT.COVER_T == "1") {
                result.COVER_T_style = "保终身";
              } else if (result.PTS[i].PT.COVER_T == "2") {
                // result.PT.COVER_T_style = '按年限保'
                result.COVER_T_style = result.PTS[0].PT.COVER_Y + "年";
              } else if (result.PTS[i].PT.COVER_T == "3") {
                // result.PT.COVER_T_style = '保至某确定年龄'
                result.COVER_T_style = "保至" + result.PTS[0].PT.COVER_Y + "岁";
              } else if (result.PTS[i].PT.COVER_T == "4") {
                // result.PT.COVER_T_style = '按月保'
                result.COVER_T_style = result.PTS[0].PT.COVER_Y + "月";
              } else if (result.PTS[i].PT.COVER_T == "5") {
                // result.PT.COVER_T_style = '按天保'
                result.COVER_T_style = result.PTS[0].PT.COVER_Y + "天";
              }

              if (result.PTS[i].PT.CRG_T == "0") {
                result.CRG_T_style = "无关";
              } else if (result.PTS[i].PT.CRG_T == "1") {
                result.CRG_T_style = "趸交";
              } else if (result.PTS[i].PT.CRG_T == "2") {
                // result.PT.CRG_T_style = '按年限保'
                result.CRG_T_style = result.PTS[i].PT.CRG_Y + "年";
              } else if (result.PTS[i].PT.CRG_T == "3") {
                // result.PT.CRG_T_style = '交至某确定年龄'
                result.CRG_T_style = "交至" + result.PTS[i].PT.CRG_Y + "岁";
              } else if (result.PTS[i].PT.CRG_T == "4") {
                result.CRG_T_style = "终生交费";
              } else if (result.PTS[i].PT.CRG_T == "5") {
                result.CRG_T_style = "不定期交";
              } else if (result.PTS[i].PT.CRG_T == "6") {
                // result.PT.CRG_T_style = '按月交'
                result.CRG_T_style = result.PTS[i].PT.CRG_Y + "月";
              }

              //份数
              result.UNIT = result.PTS[i].PT.UNIT;
            }

            //金额
            result.PREMIUM = (
              Number(result.PREMIUM) + Number(result.PTS[i].PT.PREMIUM)
            ).toFixed(2);
          }

          var dateTime = new Date();
          dateTime = dateTime.setDate(dateTime.getDate() + 1);
          dateTime = new Date(dateTime);
          let monthData = dateTime.getMonth() + 1;
          let dateData = dateTime.getDate();
          if (monthData < 10) {
            monthData = "0" + monthData;
          }
          if (dateData < 10) {
            dateData = "0" + dateData;
          }
          result.DateTime =
            dateTime.getFullYear() +
            "-" +
            monthData +
            "-" +
            dateData +
            " 00:00:00";
          let nowYear = new Date();
          result.age = nowYear.getFullYear() - result.BIRTH.slice(0, 4);
          result.MAINTITLE = this.selectableListData[this.listOneNo].temlist[
            this.listTwoNo
          ].MAINTITLE;
          this.booksListContent = result;
        },
        failCallback: () => {}
      });
    },
    //打开计划书和确认书
    // alert('-----index');
    openPlanBooksContent(index, isOpenjhs) {
      this.selectableListData[this.listOneNo].temlist[
        this.listTwoNo
      ].booksCode = JSON.stringify(index);
      this.getJhsMessageFntwo();
      if (index == 1) {
        this.zp = false;
        // console.log(this.selectableListData[this.listOneNo].temlist[this.listTwoNo])
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].jhs.isCardSelect = true;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].jhs.policyType = this.policyType;
        //       this.policyType = '2'
        // this.policyCode = '0100358629'
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].jhs.policyCode = this.policyCode;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].jhs;
      }
      if (index == 2) {
        this.zp = true;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].qrs.isCardSelect = true;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].qrs.policyType = this.policyType;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].qrs.policyCode = this.policyCode;
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ].qrs;
      }
      if (index == 0) {
        this.listNoThree = this.selectableListData[this.listOneNo].temlist[
          this.listTwoNo
        ];
      }
      for (let item of this.booksListData) {
        item.isBooksSelect = false;
      }
      this.booksListData[index].isBooksSelect = true;

      if (index == 0) {
        return false;
      }

      if (isOpenjhs) {
        this.isShowBooks = true;
      }
    },
    //关闭计划书和确认书
    closeBooksFn() {
      this.isShowBooks = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#personal {
  width: 310px;
  height: 700px;
  .per_title {
    width: 310px;
    box-sizing: border-box;
    height: 45px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    // padding-bottom: 20px;
    // background: #5fb2ec;
    li {
      width: 33.3%;
      text-align: center;
      color: #8e9094;
      line-height: 45px;
      border-right: 1px solid #d5d5d5;
      box-sizing: border-box;
      background: linear-gradient(#fdfdfd, #ebebeb);
      cursor: pointer;
    }
    li:last-child {
      border-right: none;
    }
    li.pitch_on {
      color: #fff;
      background: linear-gradient(#abdbfa, #5fb2ec);
    }
  }
  .per_box {
    width: 310px;
    height: 600px;
    .per_box_select {
      width: 100%;
      height: 50px;
      cursor: pointer;
      color: #767676;
      background: #eae2d2;
      overflow: hidden;
      // padding-top: 5px;
      .per_new_content {
        background: linear-gradient(#3c8338, #8bd389);
        width: 65%;
        margin: 7px auto;
        border-radius: 5px;
        box-shadow: 0px 0px 5px #111;
        position: relative;
        height: 37px;
        .per_new_bg {
          position: absolute;
          width: 50%;
          height: 37px;
          border-radius: 5px;
          left: 0%;
          top: 0;
          background: linear-gradient(#fafafa, #939393);
          border: 1px solid #2f2f2f;
          box-sizing: border-box;
          transition: all 0.3s;
          z-index: 9;
        }
        .per_new_two_bg {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
        }
      }
      p {
        // line-height: 44px;
        width: 50%;
        text-align: center;

        // padding-top: 10px;
        // border-radius: 40px 40px 0 0;
        // color: #fff;
        // background: #c5c4c4;
        span {
          display: block;
          line-height: 40px;
          text-align: center;
          // border-radius: 40px 40px 0 0;
          color: #767676;
          // background: #c5c4c4;
          height: 37px;
        }
      }
      p.pitch_on {
        // cursor: not-allowed;
        // color: #000;
        // background: -webkit-gradient(linear, left top, left bottom, from(#abdbfa), to(#5fb2ec));
        // background: linear-gradient(#abdbfa, #5fb2ec);
        // background: #fff;
        padding-top: 0px;
        span {
          color: #fff;
          transition: all 0.3s;
          // background: #fff;
          // line-height: 40px;
        }
      }
    }
  }
  .per_content_one {
    width: 310px;
    height: 450px;
    li {
      width: 100%;
      cursor: pointer;
      .pitch_on_data {
        height: 245px;
        overflow-y: auto;
        padding: 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #e1e5e7;
        .myCard {
          color: #509ee2;
          font-size: 18px;
        }
        .my_card_list {
          li.new-li-list {
            width: 100%;
            line-height: 40px;
            border-bottom: 1px solid #e1e5e7;
            position: relative;
            // .my_card_list_img{
            //     width: 20%;
            //     div{
            //         width: 46px;
            //         border-radius: 46px;
            //         overflow: hidden;
            //         img{
            //             width: 46px;
            //             display: block;
            //         }
            //     }
            // }
            .new-li-list-div {
              display: -webkit-box;
              display: -moz-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              display: flex;
              justify-content: space-around;
            }
            .my_card_list_img {
              position: absolute;
              width: 100%;
              height: 40px;
              z-index: 9;
              z-index: 9\0; //兼容ie10
              z-index: \99; //兼容ie10
              left: 0;
              top: 0;
            }
            p {
              width: 85%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .new-li-list-two {
              display: -webkit-box;
              display: -moz-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              display: flex;
              justify-content: space-around;
              position: relative;
              .new-li-list-two-mengban {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: rgba(255, 255, 255, 0.3);
                z-index: 5;
              }
              .new-li-list-two-mengban-two {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                display: -ms-flexbox;
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                background: rgba(255, 255, 255, 0);
                z-index: 5;
              }
            }
            .card_checkbox {
              width: 10%;
            }
          }
          li.margin_20 {
            margin: 20px 0;
          }
        }
      }
    }
    .pitch_title {
      height: 45px;
      line-height: 45px;
      padding: 0 25px 0 15px;
      font-size: 18px;
      background: #fff;
      border-bottom: 1px solid #e1e5e7;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      box-sizing: border-box;
      p {
        display: block;
        width: 70%;
      }
      div {
        width: 40px;
        text-align: center;
        font-size: 22px;
        height: 45px;
        overflow: hidden;
      }
      i {
        font-size: 22px;
        width: 40px;
        text-align: center;
        color: #c5cdd1;
      }
      // i:first-child{
      //     color: #c5cdd1;
      // }
    }
    li.pitch_on_li {
      .pitch_title {
        color: #ffffff;
        font-size: 18px;
        background: linear-gradient(#abdbfa, #5fb2ec);
        border-bottom: 1px solid #5fb2ec;
        i {
          color: #ffffff;
        }
        .icon_two:last-child {
          transform: rotate(180deg);
        }
      }
    }
  }
  .send_btn {
    text-align: center;
    // padding: 40px 0 0 0;
    margin-top: 30px;
    width: 310px;
    height: 100px;
    box-sizing: border-box;
    > div {
      margin-bottom: 15px;
      button {
        padding: 12px 30px;
      }
    }
    .btn_style {
      width: 130px;
      padding: 12px;
    }
  }
  .client_perview_two {
    width: 285px;
    height: 650px;
  }
  .client_data {
    padding: 25px 10px 0px;
    padding: 25px 10px 0px;
    box-sizing: border-box;
    .client_data_title {
      font-size: 18px;
      color: #509ee2;
      height: 25px;
    }
    .client_data_content {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      margin-top: 20px;
      height: 80px;
      position: relative;
      .client_data_content_img {
        img {
          width: 73px;
          height: 73px;
          display: block;
        }
      }
      .client_data_content_message {
        margin: 0 0 0 10px;

        p {
          height: 36px;
          line-height: 36px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 207px;
        }
      }
      .client_data_content_sex {
        // padding-top: 7px;
        // height: 80px;
        // overflow: hidden;
        // box-sizing: border-box;
        // position: absolute;
        // right: 5px;
        // top: 0px;
        margin-inline-start: 8px;
        i {
          font-size: 20px;
          color: rgb(59, 153, 252);
        }
      }
    }
    .client_data_list {
      margin-top: 10px;
      height: 400px;
      overflow-y: auto;
    }
    .tips_content {
      margin: 5px;
      font-size: 16px;
      padding: 0 16px;
      background: #fff;
      color: #67c23a;
      display: inline-block;
      line-height: 30px;
      box-sizing: border-box;
      border: 1px solid rgba(64, 158, 255, 0.2);
      border-color: #67c23a;
      border-radius: 4px;
    }
  }
  .footer_content_box {
    height: 620px;
    overflow-y: auto;
  }
  .footer_content {
    padding: 15px 20px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;

    .footer_left {
      width: 8px;
      background: #b9bab9;
      border-radius: 8px;
    }
    .footer_right {
      width: 95%;
      max-width: 300px;
      padding: 8px 0px 8px 20px;
      box-sizing: border-box;
      li {
        position: relative;
        margin-bottom: 20px;
        .icon_yuan {
          position: absolute;
          width: 25px;
          height: 25px;
          background: #fff;
          border: 8px solid #8e908e;
          left: -37px;
          top: 0px;
          box-sizing: border-box;
          border-radius: 25px;
        }
        .footer_time {
          color: #888888;
          height: 18px;
        }
        .footer_icon {
          margin: 8px 0;
          color: #888888;
          height: 25px;
          i {
            font-size: 22px;
          }
        }
        .footer_list_content {
          position: relative;
          padding: 15px;
          background: #fff;
          line-height: 18px;
          border: 1px solid #dededd;
          border-radius: 7px;
          p:last-child {
            margin-top: 5px;
            a {
              color: #4796e7;
              text-decoration: none;
            }
          }
          .footer_sanj {
            position: absolute;
            width: 15px;
            height: 15px;
            border-left: 1px solid #dededd;
            border-bottom: 1px solid #dededd;
            background: #fff;
            transform: rotate(45deg);
            left: -8.25px;
            top: 11px;
          }
        }
      }
      li.footer_one {
        .icon_yuan {
          border-color: #129611;
        }
        .footer_icon {
          i {
            color: #129611;
          }
        }
      }
    }
  }
  // .per-new-fade-enter-active, .per-new-fadeleave-active {
  //     transition: transform .3s ease;
  // }
  // .per-new-fade-enter, .per-new-fade-leave-to
  // /* .component-fade-leave-active for below version 2.1.8 */ {
  //     transform: translateX(1rem);
  // }
}
.booksBg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  z-index: 9;

  .books-content {
    width: 500px;
    height: 600px;
    background: #efeff4;
    margin: 150px auto 0;
    position: relative;
    .new-close-icon {
      width: 60px;
      height: 60px;
      position: absolute;
      right: -75px;
      top: -75px;
    }
    .books-banner-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 40px 18.7px 15px;
      box-sizing: border-box;
      .books-name {
        text-align: center;
        font-size: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        .span-one {
          margin-left: 9px;
        }
        .span-two {
          margin-left: 19px;
          font-size: 20px;
        }
      }
      .books-no {
        width: 463px;
        height: 47px;
        background: rgba(254, 255, 234, 1);
        border-radius: 23px;
        padding: 11.3px 21.3px;
        box-sizing: border-box;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        margin-top: 23.7px;
        div {
          img {
            width: 24px;
          }
        }
        p {
          line-height: 24px;
          margin-left: 16px;
        }
      }
      .books-content-list {
        width: 463px;
        height: 417px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;
        margin-top: 10.9px;
        .books-list-hgroup {
          padding: 20.7px 21.3px;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          border-bottom: 1px solid rgba(244, 244, 248, 1);
          div {
            width: 7px;
            height: 23px;
            background: rgba(255, 43, 0, 1);
          }
          p {
            font-size: 22px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(57, 57, 60, 1);
            line-height: 24px;
            margin-left: 7.3px;
          }
        }
        .books-list-ul {
          padding: 0 21.3px;
          .books-list-li {
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 24px;
            margin-top: 22px;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            p:last-child {
              color: rgba(57, 57, 60, 1);
            }
          }
        }
      }
    }
  }
}
.disableColor {
  color: #908b8b;
}
</style>


