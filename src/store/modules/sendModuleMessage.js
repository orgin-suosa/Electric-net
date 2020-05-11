import promise from 'es6-promise'
promise.polyfill()
import axios from 'axios'
import * as types from '../types.js'

const state = {
  cardData: '',
  cardDataList: '',
  cardDataListData: '',
  qrcodeLogionData: '',
  cardListData: [],
  WechatPreviewData: '',
  idSend: '',
  messageNoDataList: '',
}
const mutations = {

}

const actions = {
  //员工信息编辑
  [types.CLIENT_COMPILE]({
    commit
  }, {
    tsrcardData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/cardDeploy.html',
      data: tsrcardData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        state.cardData = result.result
        successCallback()
      } else {
        console.log('数据未取到初始')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('员工信息编辑 ' + res)
      }
    })
  },
  //员工信息编辑
  [types.PISDEFAULT]({
    commit
  }, {
    pisDefaultData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/pisDefault.html',
      data: pisDefaultData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        // state.cardData = result.result
        // successCallback()
      } else {
        console.log('数据未取到初始')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('员工信息编辑 ' + res)
      }
    })
  },
  [types.TITLELISTDATA]({
    commit
  }, {
    ValueData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/getTitleList.html',
      data: ValueData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        state.cardDataList = result.result
        successCallback()
      } else {
        console.log('数据未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('名片编辑' + res)
      }
    })
  },
  //保存内容
  [types.SAVELISTDATA]({
    commit
  }, {
    saveList,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/addTsrinfo.html',
      data: saveList,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        // state.cardDataList = result.result
        successCallback()
      } else {
        // alert('数据未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('保存内容' + res)
      }
    })
  },
  //保存内容
  [types.RESTORDATA]({
    commit
  }, {
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/queryTextList.html',
      data: ''
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        state.cardDataListData = result.result
        successCallback()
      } else {
        // alert('数据未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('初始内容 ' + res)
      }
    })
  },
  //生成二维码
  [types.QRCODELOGION]({
    commit
  }, {
    bindingData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/toQrcodeLogion.html',
      data: bindingData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        state.qrcodeLogionData = result.result
        successCallback()
      } else {
        console.log('数据未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('二维码地址获取不到' + res)
      }
    })
  },
  //获取名片信息
  [types.MODELLIST]({
    commit
  }, {
    modelListWechat,
    codeList,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/modellist.html',
      data: modelListWechat,
      codeList
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        // state.cardListData = result.result
        successCallback(result.result)
      } else {
        console('modelList未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('获取名片信息' + res)
      }
    })
  },
  //获取工号信息
  [types.QUERYPROCODE]({
    commit
  }, {
    tsrid,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      //url: '/tpdwt_web/tm/queryProCode.html?tsrid=sdu1t1tsr1',
      url: '/tpdwt_web/tm/queryProCode.html',
      data: tsrid
    }).then((res) => {
      console.log(res);
      // console.log('员工编号' + res.data.result)
      var result = res.data
      //console.log(result.responseCode)
      if (result.responseCode == '0') {
        // state.cardListData = result.result
        successCallback(result)
        // window.localStorage.setItem('codeList', JSON.stringify(result))

      } else {
        console('querprold未取到')
      }

    }).catch(function (err) {
      // failCallback()
      // let res = err.data.result
      // if (err) {
      console.log('获取员工编号' + err)
      // }
    })
  },
  //模版预览
  [types.SHOWTM]({
    commit
  }, {
    showtmData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/showtm.html',
      data: showtmData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        state.WechatPreviewData = result.result
        successCallback()
      } else {
        console.log('预览数据未取到')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('预览数据未取到' + res)
      }
    })
  },
  //微信发送
  [types.TEMPWECHAT]({
    commit
  }, {
    wechataData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/tempwechat.html',
      data: wechataData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      if (result.responseCode == 0) {
        // state.WechatPreviewData = result.result
        successCallback()
      } else {
        alert(result.msg)
        failCallback(result.result)
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('微信发送失败' + res)
      }
    })
  },
  //短信发送
  [types.TEMPSMS]({
    commit
  }, {
    NoteData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/tempsms.html',
      data: NoteData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //  console.log(result)
      if (result.responseCode == 0) {
        state.idSend = result.result
        successCallback(state.idSend)
      } else {
        console.log('短信发送失败')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('短信发送失败' + res)
      }
    })
  },
  //获取手机号码
  [types.GETCLIENTPHONENO]({
    commit
  }, {
    getPhoneNoData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/getClientPhoneNo.html',
      data: getPhoneNoData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        // state.idSend = result.result
        successCallback(result.result)
      } else {
        console.log('获取手机号码失败')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('获取手机号码失败' + res)
      }
    })
  },
  //会话开关
  [types.UPDATACHAT]({
    commit
  }, {
    unDataChat,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/chat/updateChatStatusAuto.html',
      data: unDataChat,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        successCallback(result.result)
      } else {
        console.log('开始会话失败')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('开始会话失败' + res)
      }
    })
  },
  //会话开关
  [types.UPDATACHATSTATUS]({
    commit
  }, {
    unDataChat,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/chat/updateChatStatus.html',
      data: unDataChat,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //   console.log(result)
      if (result.responseCode == 0) {
        successCallback()
      } else {
        console.log('开始会话失败')
      }

    }).catch(function (err) {
      failCallback()
      let res = err.response
      if (err) {
        console.log('开始会话失败' + res)
      }
    })
  },
  //绑定完成
  [types.TO_LOGION_CKECK]({
    commit
  }, {
    tsrcodeData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/toLogionCkeck.html',
      data: tsrcodeData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      if (result.responseCode == 0) {
        successCallback()
      } else {
        failCallback()
      }

    }).catch(function (err) {
      console.log(err)
      let res = err.response
      if (err) {
        console.log('绑定完成失败' + res)
      }
    })
  },
  //消息轮训
  [types.MESSAGE_LX]({
    commit
  }, {
    messageNoData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/chat/getUnReadSum.html',
      data: messageNoData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //  console.log(result)
      if (result.responseCode == 0) {
        state.messageNoDataList = result.result
        successCallback()
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('消息轮训' + res)
      }
    })
  },
  //消息轮训
  [types.NOTHINGMESSAGE]({
    commit
  }, {
    toSaveOffData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/toSaveOfflineMessage.html',
      data: toSaveOffData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {
        // state.messageNoDataList = result.result
        successCallback()
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('消息轮训' + res)
      }
    })
  },
  //返回列表
  [types.RETURNDX]({
    commit
  }, {
    returnDxData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/chat/returnDX.html',
      data: returnDxData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      // console.log(result)
      if (result.responseCode == 0) {

        if (result.result.customerKey != '' && result.result.customerKey != undefined && result.result.customerKey != null) {
          successCallback(result.result.customerKey)
        } else {
          alert(result.result.errorMsg)
        }
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('返回列表' + res)
      }
    })
  },
  [types.TSRUNBIND]({
    commit
  }, {
    returnDxData2,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tsrUnbind.html',
      data: returnDxData2,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //    console.log(result)
      if (result.responseCode == 0) {

        // if (1=1) {
        successCallback(result.msg)
        console.log(result.msg);
        // } else {
        // alert(result.result.errorMsg)
        // }
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('返回列表' + res)
      }
    })
  },
  //计划书确认书
  [types.GETJHSMESSAGE]({
    commit
  }, {
    planData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/tm/getJhsMessage.html',
      data: planData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //    console.log(result)
      if (result.responseCode == 0) {

        // if (1=1) {
        successCallback(result.result)
        // console.log(result);
        // } else {
        // alert(result.result.errorMsg)
        // }
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('计划书' + res)
      }
    })
  },

  //快捷回复接口
  [types.GETFASTREPLY]({
    commit
  }, {
    fastReplyData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/getFastReply.html',
      data: fastReplyData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //    console.log(result)
      if (result.responseCode == 0) {
        // window.localStorage.setItem('userTsr', JSON.stringify(result.result))
        successCallback(result.result)
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('快捷回复接口' + res)
      }
    })
  },

  //添加快捷回复接口
  [types.ADDFASTREPLY]({
    commit
  }, {
    addfastReplyData,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    axios({
      method: 'post',
      url: '/tpdwt_web/addFastReply.html',
      data: addfastReplyData,
      "Content-Type": "multipart/form-data"
    }).then((res) => {
      var result = res.data
      //console.log(result)
      if (result.responseCode == 0) {

        // if (1=1) {
        successCallback()
        // console.log(result);
        // } else {
        // alert(result.result.errorMsg)
        // }
      } else {
        failCallback()
      }

    }).catch(function (err) {

      let res = err.response
      if (err) {
        console.log('添加快捷回复接口' + res)
      }
    })
  },
}

const getters = {
  cardData(state) {
    return state.cardData
  },
  cardDataList(state) {
    return state.cardDataList
  },
  cardDataListData(state) {
    return state.cardDataListData
  },
  qrcodeLogionData(state) {
    return state.qrcodeLogionData
  },
  cardListData(state) {
    return state.cardListData
  },
  WechatPreviewData(state) {
    return state.WechatPreviewData
  },
  idSend(state) {
    return state.idSend
  },
  messageNoDataList(state) {
    return state.messageNoDataList
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
