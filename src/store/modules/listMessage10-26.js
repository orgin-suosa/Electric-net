import promise from "es6-promise";
promise.polyfill();
import axios from "axios";
import * as types from "../types.js";

const state = {
  userTsr: "", //员工信息
  chatData: "", //聊天列表
  myChatData: "", //我自己
  nowChat: "", //当前聊天
  chatRecordList: "",
  hostoryChatRecordList: "",
  chatRecordMessageL: "",
  clientPortrayalData: "",
  clientFooterData: "",
  messageData: "",
  getMoreMessage: "",
  getHistoryMoreMessage: "",
  shield:"",
};
const mutations = {};

const actions = {
  // 删除
  [types.UNFOLLOW](
    { commit },
    {  successCallback = () => { }, failCallback = () => { } }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/unfollow.html",
      // data: shieldparams,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        //////console.log('ew', res)
        var result = res.data;
        if (result.responseCode == 0) {
          successCallback(result);
        } else {
          failCallback(res.data.msg)
        }
      })
      .catch(function (err) {
        // failCallback();
        let res = err.response;
        if (err) {
          ////console.log("第一次请求" + res);
        }
      });
  },
  // 屏蔽
  [types.SHIELD](
    { commit },
    { shieldparams, successCallback = () => { }, failCallback = () => { } }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/shield.html",
      data: shieldparams,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        if (result.responseCode == 0) {
          successCallback(result);
        } else {
          failCallback(res.data.msg)
        }
      })
      .catch(function (err) {
        // failCallback();
        let res = err.response;
        if (err) {
          ////console.log("第一次请求" + res);
        }
      });
  },
  //员工信息
  [types.CLIENT_LIST](
    { commit },
    { starNumData, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/toChatIndex.html",
      data: starNumData,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        // ////console.log(result)
        if (result.responseCode == 0) {
          state.userTsr = result.result;
          window.localStorage.setItem("userTsr", JSON.stringify(result.result));
          successCallback(result.result);
        } else {
          ////console.log("数据未取到");
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("第一次请求" + res);
        }
      });
  },
  // 客户列表
  [types.CLIENT_LIST_GAIN](
    { commit },
    { clientMessage, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/getChatList.html",
      data: clientMessage,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        // ////console.log(result)
        if (result.responseCode == 0) {
          state.myChatData = result.result.selfChatList;
          console.log("state.myChatData", state.myChatData)
          let chatList = result.result.chatList
          for (let item of chatList){
            if (item.PHONENO){
              item.PHONENO = $.base64.decode(item.PHONENO)
            }
          };
          // state.chatData = result.result.chatList;
          state.chatData = chatList;
          let nowChat = state.nowChat
          for (let item of nowChat) {
            if (item.PHONENO) {
              item.PHONENO = $.base64.decode(item.PHONENO)
            }
          };
          state.nowChat = nowChat
          // state.nowChat = result.result.OnlineChatList;
          // state.chatRecordList = result.result.chatRecordList
          successCallback();
        } else {
          ////console.log("列表未取到，请联系管理员！");
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("查询列表出错1111111 " + res);
        }
      });
  },
  // 客户列表聊天信息
  [types.CLIENT_LIST_RECORD](
    { commit },
    { chatRecordMessageL, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/getChatRecord.html",
      data: chatRecordMessageL,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        if (result.responseCode == 0) {
          if (result.msg == "1" || result.msg == "2") {
            result.result.forEach((item) => {
              item.changesrc = false
              item.changesrc2 = false
              if (item.ToPhone && item.ToUserName){
                item.ToUserName = $.base64.decode(item.ToUserName)
              }
              if (item.isShield == "Y") {
                item.isShield = item.isShield
              } else {
                item.isShield = "N"
              }
            })
            state.hostoryChatRecordList = result.result;
            ////console.log('dssd', result.result)
          } else {
            result.result.forEach((item) => {
              item.changesrc = false
              item.changesrc2 = false
              if (item.isShield == "Y"){
                item.isShield = item.isShield 
              } else {
                item.isShield = "N"
              }
              if (item.ToPhone && item.ToUserName) {
                item.ToUserName = $.base64.decode(item.ToUserName)
              }
            })
            state.chatRecordList = result.result;
          }
          console.log('CLIENT_LIST_RECORD', result.result)
          successCallback();
        } else {
          ////console.log("客户列表聊天信息");
        }
      })
      .catch(function(err) {
        ////console.log(err);
        failCallback();
        let res = err.response;
        if (err) {
          // window.alert('api error, HTTP CODE: ' + res)
        }
      });
  },
  // 客户列表聊天信息轮循
  [types.SEND_MESSAGE](
    { commit },
    {
      sendMessage,
      successCallback = () => {},
      failCallback = () => {},
      failCallbackTwo = () => {}
    }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/sendMessage.html",
      data: sendMessage,
      traditional: true //属性在这里设置
    })
      .then(res => {
        var result = res.data;
        // ////console.log(res)
        if (result.responseCode == 0) {
          state.messageData = result.result;
          successCallback();
        } else if (result.responseCode == 1) {
          alert(result.msg);
          failCallback();
        } else if (result.responseCode == 3) {
          alert(result.msg);
          failCallback();
        } else if (result.responseCode == 9) {
          alert(result.msg);
          failCallbackTwo();
        }
      })
      .catch(function(err) {
        failCallbackTwo();
        let res = err.response;
        if (err) {
          ////console.log("客户信息轮播出错" + res);
        }
      });
  },
  // 客户画像
  [types.CLIENT_PORTRAYAL](
    { commit },
    { chatRecordMessageL, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/toGetClient.html",
      data: chatRecordMessageL,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        // ////console.log(result)
        if (result.responseCode == 0) {
          state.clientPortrayalData = result.result;
          successCallback();
        } else {
          failCallback();
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("画像 " + res);
        }
      });
  },
  // 客户足迹
  [types.CLIENT_FOOTER](
    { commit },
    { chatRecordMessageL, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/toGetClientFootprint.html",
      data: chatRecordMessageL,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        // ////console.log(result)
        if (result.responseCode == 0) {
          state.clientFooterData = result.result;
          successCallback();
        } else {
          failCallback();
          // alert('列表未取到客户足迹')
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("足迹 " + res);
        }
      });
  },
  // 滚动消息刷新
  [types.GET_MORE_MESS](
    { commit },
    { getMoreMessData, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/chat/getChatRecord.html",
      data: getMoreMessData,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        if (result.responseCode == 0) {
          if (result.result && result.result.lengtn > 0){
            result.result.forEach((item) => {
              if (item.ToPhone && item.ToUserName) {
                item.ToUserName = $.base64.decode(item.ToUserName)
              }
            })
          }
          if (result.msg == "1" || result.msg == "2") {
            state.getHistoryMoreMessage = result.result;
          } else {
            state.getMoreMessage = result.result;
          }
          successCallback();
        } else {
          failCallback();
        }
        console.log('GET_MORE_MESS', result.result)
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("向上滚动获取消息失败 " + res);
        }
      });
  },
  // 头像更新方法
  [types.GETTSRHEAD](
    { commit },
    { getTsrHeadData, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/getTSRhead.html",
      data: getTsrHeadData,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        // ////console.log(result)
        if (result.responseCode == 0) {
          // state.getMoreMessage = result.result
          successCallback();
        } else {
          failCallback();
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("头像更新失败 " + res);
        }
      });
  },
  // 生成图片方法
  [types.VOICERECORD](
    { commit },
    { ptData, successCallback = () => {}, failCallback = () => {} }
  ) {
    axios({
      method: "post",
      url: "/tpdwt_web/getVoiceRecord.html",
      data: ptData,
      "Content-Type": "multipart/form-data"
    })
      .then(res => {
        var result = res.data;
        //  ////console.log(result)
        if (result.responseCode == 0) {
          successCallback(result.result);
        } else {
          failCallback();
        }
      })
      .catch(function(err) {
        failCallback();
        let res = err.response;
        if (err) {
          ////console.log("生成图片方法 " + res);
        }
      });
  }
};

const getters = {
  userTsr(state) {
    return state.userTsr;
  },
  chatData(state) {
    return state.chatData;
  },
  myChatData(state) {
    return state.myChatData;
  },
  nowChat(state) {
    return state.nowChat;
  },
  chatRecordList(state) {
    return state.chatRecordList;
  },
  hostoryChatRecordList(state) {
    return state.hostoryChatRecordList;
  },
  clientPortrayalData(state) {
    return state.clientPortrayalData;
  },
  clientFooterData(state) {
    return state.clientFooterData;
  },
  messageData(state) {
    return state.messageData;
  },
  getMoreMessage(state) {
    return state.getMoreMessage;
  },
  getHistoryMoreMessage(state) {
    return state.getHistoryMoreMessage;
  }
};
export default {
  state,
  actions,
  mutations,
  getters
};
