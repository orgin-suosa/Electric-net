<template>
  <section class="chat_box">
     <!-- <div @mouseenter.native ="oneenter(1)" >21212121俄慰问慰问</div> -->
    <div class="qiantao">
      <iframe :src="iframeNameData" frameborder="0" ref="iframeName"></iframe>
    </div>
    <!-- {{position}}sajasdjjdsajsadjsadjadsjasdjasdjsadjjadsjasdjsadjsadjasdjasdjsadjjsdajdasjdas -->
    
    <div class="chat_list">
      <div class="toast" v-show="toastshow">成功移除已取消关注用户</div>
      <div class="chat_list_one" v-show="ischatListShow">
        <div class="chat_select">
          <ul>
            <li>
              <el-input v-model="clientName" placeholder="输入客户姓名"></el-input>
            </li>
            <li>
              <!-- <el-input type="search" v-model="phoneNO" placeholder="请输入内容" :maxlength="3" @keyup="isNumberPd()"></el-input> -->
              <!-- <el-input type="text" v-model="phoneNO" placeholder="输入客户手机号最后三位" :maxlength="3" @keyup="isNumberPd()"></el-input> -->
              <input
                class="input_text"
                type="text"
                v-model="phoneNO"
                placeholder="输入客户手机号最后三位"
                :maxlength="3"
                @keyup="isNumberPd(phoneNO)"
              >
            </li>
            <li>
              <el-select v-model="selectData" placeholder="请选择" style="
                  width: 160px;
              ">    
                <el-option
                  v-for="item in selectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- {{isSelectName}}-- -->
              <!-- <div @clicki ="entersearchmethod(1)" >sdfsffsdsfdsfdsdfsdfdsffsdsfdfsdfsdfsdfd</div> -->
              <button class="setbtn" :class="{'hovercolor':entersearch}" @click="selectClientName" @mouseenter.stop="entersearchmethod(1)" @mouseleave.stop="entersearchmethod(2)" :disabled="isSelectName" style="
                width: 51px;
                padding: 0;
                margin-left: 0px;
            ">查询</button>
            <button @mouseenter="enterdelmethod(1)" @mouseleave="enterdelmethod(2)" class=" normalbtn" @click="del" :disabled="disdel" :class="{'mysetbtn':!disdel, 'hovercolor':enterdel}" style="
                width: 51px;
                padding: 0;
                margin-left: 0;
             
            ">删除</button>
            </li>
          </ul>
        </div>
        <ul class="clientList">
          <li
            v-for="(item, index) in clientListData"
            :key="index"
            :class="item.className"
            @click="selectChat(index)"
          >
            <div class="client_data_no" v-if="item.UNREADSUM != '0'">
              <span>{{ item.UNREADSUM }}</span>
            </div>
            <div class="clientList_content">
              <div class="portrait_img">
                <div v-if="item.NICKNAME == '我自己'">
                  <img src="../../static/images/headPortrait.jpg" alt v-if="isMeImgPt">
                  <img
                    :src="'/tpdwt_web/chat/getFile.html?a='+Math.random()+'&filePath='+item.HEADERIMG"
                    alt
                    v-else
                  >
                </div>
                <div v-else>
                  <img :src="'/tpdwt_web/chat/getFile.html?filePath='+item.HEADERIMG" alt>
                </div>
              </div>
              <div class="clientContent">
                <p>{{ item.NICKNAME }}</p>
                <p class="clientContentTwo" v-html="item.MSGCONTENT"></p>
                <p class="client_time">{{ item.SENDTIME}}</p>
              </div>
            </div>
            <div class="clientContent_img" v-if="item.NICKNAME != '我自己'">
              <img src="../../static/images/bank_icon.png" @click="returnBtn(index)" alt>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat_content">
      <hgroup class="chat_hgroup">
        <div class="chat_message_staff">
          <div class="chat_message_left">
            <el-button @click="isChatList">
              <span class="chat_list_left" v-if="isChatListleft">&gt;&gt;</span>
              <span class="chat_list_left" v-else>&lt;&lt;</span> 客户列表
            </el-button>
          </div>

          <!-- <a href="" class="chat_message_left clickMessage" style="width:130px!important;" download="imgload">
            消息列表导出
          </a>-->
          <div class="chat_message_rihgt">
            <!-- / <p @click="bindingOperation">{{ tsrnoBadingData}}</p> -->
            <p @click="bindingOperationOne">{{ tsrnoBadingData}}</p>
            <!-- / <p  @click="returnBtn(1)"> {{ tsrnoBadingData}}</p> -->
            <div @click="newPoto">
              <img src="../../static/images/headPortrait.jpg" alt v-if="isMeImgPt">
              <img
                :src="'/tpdwt_web/chat/getFile.html?a='+Math.random()+'&filePath='+accessphotourl"
                alt
                v-else
              >
            </div>
            <p @click="cardRedact()">编辑名片>></p>
          </div>
        </div>
      </hgroup>
      <div class="chat_content_dwon">
        <div class="chat_interface">
          <div style="position: relative;">
            <!-- 历史消息查询 -->
            <!-- v-if="isShowHistoryMessage" -->
            <section class="histroy-box" v-if="isShowHistoryMessage">
              <header class="hb-header">
                <div
                  class="hb-header-list"
                  :class="item.selectClientStyle"
                  @click="historyMessageFn(index)"
                  v-for="(item,index) in historySelectMessage"
                  :key="index"
                >
                  <div class="hb-header-list-div">
                    <img :src="item.profilePhoto" alt>
                  </div>
                  <p v-text="item.clientName"></p>
                </div>
                <!-- <div class="hb-header-list">
                  <div class="hb-header-list-div">
                    <img src="../../static/images/bigkhIcon.png" alt="">
                  </div>
                  <p>客户</p>
                </div>-->
              </header>

              <!-- 历史消息关闭按钮 -->
              <div class="close-icon-btn" @click="closeHistoryMessageFn">
                <img src="../../static/images/newClostThree.png" alt>
              </div>

              <div class="chat_message_list" ref="chat_window_box_two" @scroll="getMoreTwo">
                <ul ref="chat_window_down" class="listpt">
                  <li v-for="(item, index) in historyMesageList" :key="index">
                    <div class="chat_message_text">
                      <div class="chai_time" >{{ item.CreateTime }}  
                        <!-- <div style="height:500px"></div> -->
                        <div class="setimg" v-if=" item.isShield=='Y'" >
                            <img :src="src3" alt="">
                      </div>
                      </div>
                      <div class="chat_images" v-if="isChatTsrOuKh == '2'">
                        <img :src="'/tpdwt_web/chat/getFile.html?filePath='+imgulrNow" alt>
                      </div>
                      <div class="chat_images" v-else>
                        <img src="../../static/images/headPortrait.jpg" alt v-if="isMeImgPt">
                        <img
                          :src="'/tpdwt_web/chat/getFile.html?a='+Math.random()+'&filePath='+accessphotourl"
                          alt
                          v-else
                        >
                      </div>
                      <div class="text_content_box" >
                         
                        <div class="chai_text_data" v-if="item.msgMold=='2'" :class="{'setcolor': item.isShield=='Y'}">
                         <!-- -1 -->
                          <div class="send_sb" v-if="item.sendStatus != '1'">
                            <div>!</div>
                          </div>
                          <div class="send_sb" v-if="item.sendStatus == '0'">
                            <!-- <div @click="nothingMessage(index)">!</div> -->
                            <img src="../../static/images/loading.png" alt>
                          </div>
                          <div class="imgContent">
                            <span>{{ item.Content }}</span>
                          </div>
                        </div>
                        <div class="chai_text_data" :class="{'setcolor': item.isShield=='Y'}" v-else>
                           <!-- -1 -->
                          <div class="send_sb" v-if="item.sendStatus != '1'">
                            <div>!</div>
                          </div>
                          <div class="send_sb" v-if="item.sendStatus == '0'">
                            <!-- <div @click="nothingMessage(index)">!</div> -->
                            <img src="../../static/images/loading.png" alt>
                          </div>
                          <div class="imgContent" :class="{'setcolor': item.isShield=='Y'}">
                            <img
                              v-if="item.MsgType=='2'"
                              :src="'/tpdwt_web/chat/getFile.html?filePath='+item.localPicUrl"
                              alt
                              @click="imgbig(item.localPicUrl)"
                            >
                            <div v-else-if="item.MsgType=='5'" :class="{'setcolor': item.isShield=='Y'}">
                              <audio
                                :src="item.localPicUrl"
                                :autoplay="isPlayiing"
                                ref="palyMuisc"
                                controls
                                class="audio_music"
                              ></audio>
                            </div>
                            <!-- bzcli -->
                            <div v-else-if="item.MsgType=='3'">
                              <div class="myCardStyle">
                                <div class="myCardStyleTop">
                                  <div
                                    class="myCardStyleTopOne"
                                    v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'&&item.imgurl"
                                  >
                                    <img
                                      :src="'/tpdwt_web/tm/getFile.html?filePath='+item.imgurl"
                                      alt
                                    >
                                  </div>
                                  <div class="myCardStyleTopTwo">
                                    <p>{{ item.mainTitle }}</p>
                                    <p v-html="item.subTitle.replace(/\%25/ig,'%')"></p>
                                  </div>
                                </div>
                                <div class="myCardStyleDwon">
                                  {{ item.moduleName }}
                                  <span
                                    style="float:right;"
                                    v-if="!(item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'&&item.imgurl)"
                                  >{{ item.ToPhone | filterphone(hallid) }}</span>
                                </div>
                              </div>
                            </div>
                            <!-- <span v-else>{{ item.Content }}</span> -->
                            <div
                            :class="{'setcolor': item.isShield=='Y'}"
                              v-else
                              v-html="item.Content.replace(/\😄/gi,'[笑脸]').replace(/\😷/gi,'[生病]').replace(/\😂/gi,'[破涕为笑]').replace(/\😝/gi,'[吐舌]').replace(/\😳/gi,'[脸红]').replace(/\😱/gi,'[恐惧]').replace(/\😔/gi,'[失望]').replace(/\😒/gi,'[无语]').replace(/\👻/gi,'[鬼魂]').replace(/\🙏/gi,'[合十]').replace(/\💪/gi,'[强壮]').replace(/\🎉/gi,'[庆祝]').replace(/\🎁/gi,'[礼物]').replace(/\[[\u4E00-\u9FA5]{1,4}\]/gi, emotion).replace(/\[[A-Z]{1,2}\]/gi, emotion)"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <div class="chat_window_title">
              <p class="chat_window_name" style="width:85%">{{ clientNameNow }}</p>
              <div style="width: 9%;" class="download-icon">
                <div class="clickMessage" style="display:flex;" @click="clickPtTwo">
                  <div style="padding-top:3px;padding-right: 3px;">
                    <el-tooltip content="导出记录" placement="bottom" effect="light">
                      <img :src="downLoadIcon" width="25px" height="26px">
                    </el-tooltip>
                  </div>
                  <!-- <span style="display:block;line-height:33px;">导出记录</span> -->
                </div>
              </div>
              <div class="chat_window_close">
                <div @click="historyMessageFn(0)">
                  <!-- <img src="../../static/images/historyMessageIcon.png" width="24px" height="24px"> -->
                  <el-tooltip content="查看记录" placement="bottom" effect="light">
                    <img
                      src="../../static/images/historyMessageIcon.png"
                      width="24px"
                      height="24px"
                    >
                  </el-tooltip>
                </div>
                <!-- <p @click="closeConversation()">结束会话</p> -->
              </div>
            </div>
             <!-- @scroll="getMore" -->
            <div class="chat_message_list" ref="chat_window_box"  @scroll="getMore">
              <ul ref="chat_window_down" class="listpt">
                <li v-for="(item, index) in mesageList" :key="index">
                  <div class="chat_message_text" v-if="!item.isMe">
                    <div class="chai_time">
                      {{ item.CreateTime }} 
                       <!--position=='CSR' -->
                      <div class="setimg" v-if="position=='CSR'&&item.MsgType!='3'">
                            <div class="tip" v-if="item.changesrc && item.isShield=='Y'">
                                解除屏蔽
                            </div>
                            <div class="tip" v-if="item.changesrc2 && item.isShield=='N'">
                              屏蔽
                            </div> 
                            <img :src="item.changesrc?src02:src2" alt="" v-if="item.isShield=='Y'"  @mouseenter.stop="oneenter(index)"  @mouseleave.stop="oneleave(index)" @click.stop="oneclick(index, item.id)">
                            <!-- 已被屏蔽  -->
                            <img :src="item.changesrc2?src01:src1" alt=""  v-if="item.isShield=='N'"  @mouseenter.stop="twoenter(index)"  @mouseleave.stop="twoleave(index)" @click.stop="twoclick(index, item.id)" >
                      </div>
                      <!--position!='CSR' && 已被屏蔽  -->
                       <div class="setimg" v-if="position!='CSR'&& item.isShield=='Y'&&item.MsgType!='3'">
                            <img :src="src3" alt="">
                      </div>
                    </div>
                    <div class="chat_images">
                      <!--  tsrHeadImage-->
                      <!-- {{item.tsrHeadImage}}--- -->
                      <img :src="'/tpdwt_web/chat/getFile.html?filePath='+item.IMGURLNOW" alt> 
                    </div>
                    <div class="text_content_box">
                      <div class="chai_text_data" v-if="item.msgMold=='2'" :class="{'setcolor': item.isShield=='Y'}" >
                        <div class="imgContent" >
                          <span style="color:#dbec28;" >{{ item.Content }}</span>
                          <!-- <span>{{ item.Content }}</span> -->
                          <!-- <img :src="" alt=""> -->
                        </div>
                       
                      </div>
                      <div class="chai_text_data" :class="{'setcolor': item.isShield=='Y'}" v-else>
                        <div class="imgContent">
                          <img
                           v-if="item.MsgType=='2'"
                           :src="'/tpdwt_web/chat/getFile.html?filePath='+item.localPicUrl"
                            alt
                            @click="imgbig(item.localPicUrl, 'flag',item)"
                          >
                          <div v-else-if="item.MsgType=='5'">
                            <!-- <span>yinyue</span> -->
                            <audio
                              :src="item.localPicUrl"
                              :autoplay="isPlayiing"
                              ref="palyMuisc"
                              controls
                              class="audio_music"
                            ></audio>
                          </div>
                          <!-- <span v-else>{{ item.Content }}</span> -->
                          <div
                            v-else
                            
                          >
                           <div v-if="item.Content" v-html="item.Content.replace(/\😄/gi,'[笑脸]').replace(/\😷/gi,'[生病]').replace(/\😂/gi,'[破涕为笑]').replace(/\😝/gi,'[吐舌]').replace(/\😳/gi,'[脸红]').replace(/\😱/gi,'[恐惧]').replace(/\😔/gi,'[失望]').replace(/\😒/gi,'[无语]').replace(/\👻/gi,'[鬼魂]').replace(/\🙏/gi,'[合十]').replace(/\💪/gi,'[强壮]').replace(/\🎉/gi,'[庆祝]').replace(/\🎁/gi,'[礼物]').replace(/\[[\u4E00-\u9FA5]{1,4}\]/gi, emotion).replace(/\[[A-Z]{1,2}\]/gi, emotion)"></div>
                          </div>
                          <!-- <span>{{ item.Content }}</span> -->
                          <!-- <img :src="" alt=""> -->
                        </div>
                      </div>
                    </div>
                     
                  </div>
                  <div class="chai_me_text" v-else>
                    <div class="chai_time">{{ item.CreateTime }}
                      <div class="setimg" v-if="position=='CSR'&&item.MsgType!='3'">
                            <div class="tip" v-if="item.changesrc && item.isShield=='Y'">
                                解除屏蔽
                            </div>
                            <div class="tip" v-if="item.changesrc2 && item.isShield=='N'">
                              屏蔽
                            </div> 
                            <img :src="item.changesrc?src02:src2" alt="" v-if="item.isShield=='Y'"  @mouseenter.stop="oneenter(index)"  @mouseleave.stop="oneleave(index)" @click.stop="oneclick(index, item.id)">
                            <!-- 已被屏蔽  -->
                            <img :src="item.changesrc2?src01:src1" alt=""  v-if="item.isShield=='N'"  @mouseenter.stop="twoenter(index)"  @mouseleave.stop="twoleave(index)" @click.stop="twoclick(index, item.id)" >
                      </div>
                      <!--position!='CSR'&& item.isShield=='Y'&&item.MsgType!='3'  -->
                       <div class="setimg" v-if="position!='CSR'&& item.isShield=='Y'&&item.MsgType!='3'">
                            <img :src="src3" alt="">
                      </div>
                    </div>
                    <div class="chai_me_text_data">
                      <div class="send_sb" v-if="item.sendStatus != '1'">
                        <div @click="nothingMessage(index)">!</div>
                      </div>
                      <div class="send_sb" v-if="item.sendStatus == '0'">
                        <!-- <div @click="nothingMessage(index)">!</div> -->
                        <img src="../../static/images/loading.png" alt>
                      </div>
                      <div v-if="true" class="text_content_box" >
                        <div class="chai_text_data_me" :class="{'setcolor': item.isShield=='Y'}">
                          <!-- bzcli -->
                          <div v-if="item.MsgType=='3'" >
                            <div class="myCardStyle">
                              <div class="myCardStyleTop">
                                <div
                                  class="myCardStyleTopOne"
                                  v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'&&item.imgurl"
                                >
                                  <!-- <div v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'"> -->
                                  <img
                                    :src="'/tpdwt_web/tm/getFile.html?filePath='+item.imgurl"
                                    alt
                                  >
                                  <!-- </div> -->
                                </div>
                                <div class="myCardStyleTopTwo">
                                  <p>{{ item.mainTitle }}</p>
                                  <p v-html="item.subTitle.replace(/\%25/ig,'%')"></p>
                                </div>
                              </div>
                              <div class="myCardStyleDwon">
                                {{ item.moduleName }}
                                <span
                                  style="float:right;"
                                  v-if="!(item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'&&item.imgurl)"
                                >{{ item.ToPhone | filterphone(hallid) }}</span>
                              </div>
                            </div>
                          </div>
                          <div v-else >
                            <div v-if="item.Content" v-html="item.Content.replace(/\😄/gi,'[笑脸]').replace(/\😷/gi,'[生病]').replace(/\😂/gi,'[破涕为笑]').replace(/\😝/gi,'[吐舌]').replace(/\😳/gi,'[脸红]').replace(/\😱/gi,'[恐惧]').replace(/\😔/gi,'[失望]').replace(/\😒/gi,'[无语]').replace(/\👻/gi,'[鬼魂]').replace(/\🙏/gi,'[合十]').replace(/\💪/gi,'[强壮]').replace(/\🎉/gi,'[庆祝]').replace(/\🎁/gi,'[礼物]').replace(/\[[\u4E00-\u9FA5]{1,4}\]/gi, emotion).replace(/\[[A-Z]{1,2}\]/gi, emotion)">
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="chat_images">
                        <!-- sdkfkfsdkfdkskdfskfdskfdkfsdkkfdskfdsk -->
                        <!-- {{isMeImgPt}}--- -->
                        
                         <img
                          :src="'/tpdwt_web/chat/getFile.html?filePath='+accessphotourl"
                          alt
                          v-if="item.tianjia"
                        >
                        <img
                          :src="'/tpdwt_web/chat/getFile.html?filePath='+item.tsrHeadImage"
                          alt
                          v-else
                        >
                        <!-- <img src="../../static/images/headPortrait.jpg" alt v-if="isMeImgPt"> -->
                        <!-- <img
                          :src="'/tpdwt_web/chat/getFile.html?filePath='+accessphotourl"
                          alt
                          v-else
                        > -->
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat_input">
              <div v-if="isCloseConversation" class="chat_star">
                <el-button
                  type="success"
                  @click="openConversationTwo()"
                  :disabled="isDisabelStar"
                >开始会话</el-button>
              </div>
              <div v-else class="chat_input_box">
                <div class="reply_box">
                  <div class="quick_emjio" @click="isShowEmotionFn">
                    <el-tooltip content="表情" placement="top" effect="light">
                      <img src="../../static/images/emjioIcon.png" width="24px" height="24px">
                    </el-tooltip>
                  </div>
                  <div class="input_reply_message" @click="qucikMessageInput">
                    <el-tooltip content="快捷回复" placement="top" effect="light">
                      <img
                        src="../../static/images/inputMessageIcon.png"
                        width="24px"
                        height="24px"
                      >
                    </el-tooltip>
                  </div>
                </div>
                <div class="emotion_style" v-if="isShowEmotion">
                  <emotion @emotion="handleEmotion" :height="200"></emotion>
                </div>
                <!-- <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="chat_textarea"
                  @keyup.enter.native="sendKeydown"
                  >
                </el-input>-->
                <div class="el-textarea">
                  <textarea
                    placeholder="请输入内容(Enter为发送；Ctrl＋Enter为换行)"
                    @focus="isShowEmotion=false"
                    v-model="chat_textarea"
                    @keydown="sendKeydown"
                    type="textarea"
                    rows="3"
                    autocomplete="off"
                    validateevent="true"
                    class="el-textarea__inner"
                    style="min-height: 34px;"
                  ></textarea>
                </div>
                <el-button type="success" @click="sendOperation()" :disabled="isSengContent">发送↵</el-button>
                <el-button type="success" @click="closeConversation()" :disabled="isSengContent">结束</el-button>
              </div>

              <!-- 快捷回复输入框 -->
              <section class="qucik-box" v-if="isOpenQucik">
                <div class="qucik-one">
                  <p>设置快捷回复（200字以内）</p>
                  <el-select v-model="qucikValue" @change="qucikListFn" placeholder="请选择">
                    <el-option
                      v-for="item in qucikLists"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="el-textarea">
                  <textarea
                    placeholder="请输入"
                    maxlength="200"
                    v-model="qucikListsNow"
                    type="textarea"
                    rows="3"
                    autocomplete="off"
                    validateevent="true"
                    class="el-textarea__inner"
                    style="height: 96px;"
                  ></textarea>
                </div>
                <el-button type="success" @click="saveMessageFn">确定</el-button>
                <div class="cose_btn" @click="qucikMessageInput">
                  <img src="../../static/images/newCloseIconThree.png" alt>
                </div>
              </section>

              <!-- 快捷回复列表 -->
              <section class="qucik-list" v-if="isShowqucikList">
                <ul>
                  <li
                    v-for="(item,index) in qucikLists"
                    :key="index"
                    @click="addQucikMessageContent(item)"
                  >
                    <p v-html="item.content"></p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <div class="chat_message">
          <Personal
            @clientFooterDataL="clientFooterDataL"
            @clientPortrayalData="clientPortrayalData"
            :isPhoneDisabel="isPhoneDisabel"
            :isDisabel="isDisabel"
            @sendNoteData="sendNoteData"
            @sendWechatData="sendWechatData"
            @openContent="openContentC"
            @openContentNote="openContentNote"
            :clientPortrayalDataList="clientPortrayalDataList"
            :clientFooterData="clientFooterData"
            :isJudge="isJudge"
            ref="personalOn"
            :clientPortrayalNo="clientPortrayalNo"
          ></Personal>
        </div>
      </div>
    </div> 
    <!-- v-if="isbigImg" -->
    <div  class="big_img_style"  v-if="isbigImg" > 
      <div style="position: relative;width: 900px;height: 500px;">
        <img src="../assets/deletImg.png" alt="" style="position: absolute;top: -33px;right:-135px; cursor: pointer;"  @click="closeBigImg">
        <img :src="bigImgData" alt  id="testImg" style="position: absolute;left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);max-width: 900px;max-height: 500px;   cursor: pointer;" >
        <div v-if="showimgLength  && imgFalg != 0"  @click="showimg('jian')">
          <img v-if="leftImgenterFlag"  @mouseenter.stop="leftImgenterFlag=false"   @mouseleave.stop="leftImgenterFlag=true" src="../assets/leftImgenter.png" alt="" style=" cursor: pointer;position: absolute;top: 50%; transform: translateY(-50%) translateX(-50%);left:-95px;">
          <img v-else @mouseenter.stop="leftImgenterFlag=true"  @mouseleave.stop="leftImgenterFlag=false" src="../assets/leftImg.png" alt="" style=" cursor: pointer;position: absolute;top: 50%; transform: translateY(-50%) translateX(-50%);left:-95px;">
        </div>
        <div v-if="showimgLength && imgFalg !=  isMearr.length -1" @click="showimg('jia')">
          <img v-if="rightImgenterFlag" @mouseenter.stop="rightImgenterFlag=false"  @mouseleave.stop="rightImgenterFlag=true" src="../assets/rigntImgenter.png" alt="" style=" cursor: pointer;position: absolute;top: 50%; transform: translateY(-50%) translateX(50%);right:-95px;" >
          <img v-else @mouseenter.stop="rightImgenterFlag=true"  @mouseleave.stop="rightImgenterFlag=false"  src="../assets/rigntImg.png" alt="" style=" cursor: pointer;position: absolute;top: 50%; transform: translateY(-50%) translateX(50%);right:-95px;">
        </div>
        <div class="imgdown" @click="downimg"><img src="../assets/downicon.png" alt="" style=" cursor: pointer;margin-right:8px" > 下载</div>
      </div>
    </div>
    <div class="supernatant_bg" v-if="idSupernatant">
      <!-- 输入手机号码-star -->
      <div class="input-phone" v-if="isShowInputPhone">
        <div class="new-close-style" @click="closeOperation">
          <img :src="newCloseIcon" width="100%">
        </div>
        <div class="new-tips-style">
          <img :src="newTipsIcon" width="100%">
        </div>
        <p class="new-tips-content">{{ phoneTitle }}</p>
        <div class="new-input-phone" v-if="hasPhoneNo">
          <el-input v-model="newInpurPhone" placeholder="请输入用户手机号"></el-input>
        </div>
        <div class="new-input-phone" v-else>
          <ul class="new-phone-list">
            <li v-for="(item,index) in phoneListData" :key="index" @click="selectPhoneNoFn(index)">
              <div class="new-phone-select">
                <p v-if="item.isSelectNowPhoneNo" class="new-phone-icon"></p>
              </div>
              <p class="new-phone-number">{{ item.phoneNewData | filterphone(hallid) }}</p>
            </li>
          </ul>
        </div>
        <div class="new-input-btn">
          <el-button type="primary" @click="newInputFn">确认</el-button>
        </div>
      </div>
      <!-- 输入手机号码-end -->
      <MyCard v-if="isMyCard" @fetch="closeOperation" :cardDataList="cardDataList"></MyCard>
      <Preview
        v-if="isPreview"
        @fetch="closeOperation"
        @sendNoteData2="sendNoteData2"
        @sendWechatData="sendWechatData"
        :PreviewData="PreviewData"
        :PreviewTitleName="PreviewTitleName"
        :previewDisabel="previewDisabel"
      ></Preview>
      <Binding
        v-if="isBinding"
        @fetch="closeOperation"
        :qrcodeLogionData="qrcodeLogionData"
        @baindingOver="baindingOver"
        ref="bindingFn"
      ></Binding>
      <comeToNothing
        v-if="isComeToNothing"
        @fetch="closeOperation"
        @nothingFn="nothingFn"
        :comeToNothingData="comeToNothingData"
      ></comeToNothing>
    </div>
  </section>
</template>

<script>
import promise from "es6-promise";
promise.polyfill();
import axios from "axios";
import html2canvas from "html2canvas";
import Personal from "../components/personalInformation";
import MyCard from "../components/myCard";
import Preview from "../components/preview";
import Binding from "../components/binding";
import comeToNothing from "../components/comeToNothing";
import { toPhone } from "@/filter/filterphone.js";
import * as types from "../store/types.js";
import { mapActions } from "vuex";
import Emotion from "@/components/Emotion/index";

export default {
  components: {
    Personal,
    MyCard,
    Preview,
    Binding,
    comeToNothing,
    Emotion
  },
  data: function() {
    return {
      // ../assets/ypb2.png
      // ../assets/pb3.png
      isMearr:"",
      imgruldata:"",
      imgFalg:0,
      leftImgenterFlag:false,
      rightImgenterFlag:false,
      entersearch:false,
      enterdel:false,
      saveclientMessage: null,
      msgId:"",
      falg:true,
      src3:require("@/assets/pb3.png"),
      src2:require("@/assets/ypb2.png"),
      src1: require("@/assets/pb2.png"),
      src01:require("@/assets/pb1.png"),
      src02:require("@/assets/ypb1.png"),
      changesrc:false,
      changesrc2:false,
      position:"",
      routertsrname: '',
      hallid: "",
      hasPhoneNo: false,
      nowPhoneNoTwo: "",
      downLoadIcon: require("../../static/images/downLoadIcon.png"),
      newCloseIcon: require("../../static/images/newCloseIcon.png"),
      newTipsIcon: require("../../static/images/newTipsIcon.png"),
      phoneTitle: "系统中没有用户手机号，请输入后发送",
      newInpurPhone: "",
      isShowInputPhone: false, //是否显示手机号码输入
      isbigImg: false, //图片放大蒙版是否显示
      bigImgData: "", //大图路径
      ylorsend: "",
      isMeImgPt: false,
      clickMessageData: "111",
      tenData: "",
      contentText: false,
      getmessagelist: "",
      isSelectName: "", //查询按钮
      disdel:true,
      isJudge: "",
      accessphotourl: "", //
      messageNoList: "",
      iframeNameData: "",
      isPlayiing: false,
      midId: "",
      nowChatFlag: "",
      starNum: "",
      starToken: "",
      isDisabelStar: "",
      qrcodeLogionData: "",
      imgurlNow: "",
      messageTypeData: "text",
      send_error: false,
      isDisabel: true, //判断开始绘画按钮
      tsrnoBadingData: "工号已经绑定",
      isPhoneDisabel: true,
      previewDisabel: false,
      nowOpenIdData: "", //当前OPenId
      nowPhoneNo: "", //当前手机号码
      sendNowPhoneNo: "", //发送手机号码
      phoneListData: [], //获取到的手机号码列表
      NotePreviewData: "",
      WechatPreviewData: "",
      PreviewData: "",
      PreviewTitleName: "",
      cardDataList: "", //名片内容
      selectIndex: "",
      chatFlag: "", //轮训
      userTsrL: "",
      comeToNothingData: "",
      isCloseConversation: true,
      clientName: "", //客户姓名
      clientNameNow: "我自己", //当前聊天客户姓名
      phoneNO: "", //手机号码
      isMyCard: false, //名片编辑
      isPreview: false, //预览
      isComeToNothing: false, //离线消息
      chat_textarea: "",
      idSupernatant: false, //浮层显示是否
      ischatListShow: true, //列表是否显示
      toastshow:false,
      isChatListleft: true,
      isSengContent: false, //发送按钮
      isBinding: false, //绑定页面
      clientPortrayalDataList: "", //画像
      clientPortrayalNo: "", //个数
      clientFooterData: "", //足迹
      selectList: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "2",
          label: "有微信互动"
        },
        {
          value: "1",
          label: "有短信互动"
        },
        {
          value: "Y",
          label: "已取消关注"
        }
      ],
      selectData: "",
      clientListData: [],
      mesageList: [
        {
          messageTiem: "",
          isMe: true,
          clientImg: "",
          Content: ""
        }
      ],

      //表情显示
      isShowEmotion: false,

      //历史消息
      isShowHistoryMessage: false,
      ishistoryPhoto: require("../../static/images/headPortrait.jpg"),
      isChatTsrOuKh: "",
      historyMesageList: [
        {
          messageTiem: "",
          clientImg: "",
          Content: ""
        }
      ],
      historySelectMessage: [
        {
          profilePhoto: require("../../static/images/bigTSLIcon.png"),
          clientName: "坐席",
          selectClientStyle: "hb-header-select"
        },
        {
          profilePhoto: require("../../static/images/bigkhIcon.png"),
          clientName: "客户",
          selectClientStyle: ""
        }
      ],

      //快捷回复列表
      isOpenQucik: false, //是否打开快捷回复
      isShowqucikList: false, //是否打开快捷回复列表
      qucikListsNow: "",
      qucikLists: [
        {
          value: "1",
          content: ""
        },
        {
          value: "2",
          content: ""
        },
        {
          value: "3",
          content: ""
        },
        {
          value: "4",
          content: ""
        },
        {
          value: "5",
          content: ""
        },
        {
          value: "6",
          content: ""
        },
        {
          value: "7",
          content: ""
        },
        {
          value: "8",
          content: ""
        },
        {
          value: "9",
          content: ""
        },
        {
          value: "10",
          content: ""
        }
      ],
      qucikValue: "1"
    };
  },
  filters: {
    filterphone(phoneNo, hallid) {
      return toPhone(phoneNo, hallid);
    }
  },
  created() {
    // this.toastshow = true
    // this.starNum = this.$utils.getUrlKey("content");
    this.starNum = unescape($.base64.decode(this.$utils.getUrlKey("content")))//chen
    this.hallid = JSON.parse(this.starNum).hallid;
    this.position = JSON.parse(this.starNum).position
    this.routertsrname = JSON.parse(this.starNum).tsrName
    // console.log('this.routertsrnameqqqq', this.routertsrname)
    // this.starToken = this.$utils.getUrlKey('token');
  },
  computed:{
    showimgLength(){
      // if(this.isMearr.length > 0){
      //   let res = this.isMearr.filter((item)=> {
      //     return item.localPicUrl
      //   })
        let res = this.isMearr
        console.log('res--', res)
        if(res && res.length >1){
          return true
        } else {
          return false
        }
      }
      
    // }
  },
  mounted() {
    // 获取员工信息
    this.openWindow();
    this.goOnFnTwo();
    this.bottomshow();
    this.judge();

    this.selsectWindow();

    this.getFastReplyFnBox();
    // this.clickPt()
  },
  methods: {
    ...mapActions({
      unfollow:types.UNFOLLOW,
      shieldmethod: types.SHIELD,
      clientList: types.CLIENT_LIST,
      clientListGain: types.CLIENT_LIST_GAIN,
      clientListEecord: types.CLIENT_LIST_RECORD,
      sendMessageData: types.SEND_MESSAGE,
      clientPortrayal: types.CLIENT_PORTRAYAL,
      clientFooter: types.CLIENT_FOOTER,
      clientCompile: types.CLIENT_COMPILE,
      qrcodeLogion: types.QRCODELOGION,
      modelList: types.MODELLIST,
      queryProCode: types.QUERYPROCODE, //赵盼员工编号
      showtmList: types.SHOWTM,
      tempWechat: types.TEMPWECHAT,
      tempSms: types.TEMPSMS,
      updataChat: types.UPDATACHAT,
      toLogionCkeck: types.TO_LOGION_CKECK,
      messageLx: types.MESSAGE_LX,
      nothingMessageFn: types.NOTHINGMESSAGE,
      returnDxFn: types.RETURNDX,
      returnDxFn1: types.TSRUNBIND,
      getMoreMess: types.GET_MORE_MESS,
      upSataStatus: types.UPDATACHATSTATUS,
      getTsrHeadFn: types.GETTSRHEAD,
      getvicerecord: types.VOICERECORD,
      getClientPhoneNoFn: types.GETCLIENTPHONENO,
      getFastReplyFn: types.GETFASTREPLY, //获取快捷回复列表
      addFastReplyFn: types.ADDFASTREPLY //添加快捷回复列表
    }),
    downimg(){
        var img = document.getElementById('testImg'); // 获取要下载的图片
        var url = img.src;                            // 获取图片地址
        var a = document.createElement('a');          // 创建一个a节点插入的document
        var event = new MouseEvent('click')           // 模拟鼠标click点击事件
        a.download =Math.random()*10+".JPG"         // 设置a节点的download属性值
        a.href = url;                                 // 将图片的src赋值给a节点的href
        a.dispatchEvent(event)     
    },
    showimg(flag){
      if(flag =='jia'){
           this.imgFalg = this.imgFalg +1
      }  else {
          this.imgFalg =  this.imgFalg - 1
      }
    if( this.imgFalg == '-1'){  // 图片为-1
      //  this.imgFalg =   parseInt( this.isMearr.length)  -1
   return
     }
     
    if( parseInt(this.isMearr.length)  == this.imgFalg){ // 找不到对应图片
        // this.imgFalg =  0
        return
    }
    console.log(' this.isMearr',  this.isMearr)
     let imgruldata = this.isMearr[this.imgFalg].localPicUrl
      console.log('imgruldata', imgruldata)
      console.log('i', this.imgFalg )
      console.log(' this.isMearr',  this.isMearr) 
      this.bigImgData =   "/tpdwt_web/chat/getFile.html?filePath=" + imgruldata
    },
    enterdelmethod(i){
      // console.log('this.disdel',this.disdel)
      if(!this.disdel){
        if(i == 1){
          this.enterdel = true
        } else {
          this.enterdel = false
        }
      }
    },
    entersearchmethod(i){
      // debugger
      if(i == 1){
        this.entersearch = true
      } else {
        this.entersearch = false
      }
    },
    oneenter(index){
      let data = this.mesageList[index];
      data.changesrc = true
      this.$set(this.mesageList, index, data); 
      // this.mesageList[index].changesrc = true
 
    },
    oneleave(index){
      let data = this.mesageList[index];
      data.changesrc = false
      this.$set(this.mesageList, index, data);

      // this.mesageList[index].changesrc = false
    },
    oneclick(index, msgid){
      let shieldparams = new FormData();
      shieldparams.append("msgId", msgid);
      shieldparams.append("isShield", "N");
      this.shieldmethod({
        shieldparams,
        successCallback: result => {
          let data = this.mesageList[index];
          data.isShield = "N"
          this.$set(this.mesageList, index, data);
        },
        failCallback: (res) => {
          alert(res)
        }
      });
    },
    twoenter(index){
      let data = this.mesageList[index];
      data.changesrc2 =true
      this.$set(this.mesageList, index, data);

    },
    twoleave(index){
      let data = this.mesageList[index];
      data.changesrc2 =false
      this.$set(this.mesageList, index, data);

      // this.mesageList[index].changesrc2 = false
    },
    twoclick(index, msgid){
      let shieldparams = new FormData();
      shieldparams.append("msgId", msgid);
      shieldparams.append("isShield", "Y");
      this.shieldmethod({
        shieldparams,
        successCallback: result => {
          let data = this.mesageList[index];
          data.isShield = "Y"
          this.$set(this.mesageList, index, data);
        },
        failCallback: (res) => {
          alert(res)
        }
      });
      // let data = this.mesageList[index];
      // data.isShield ="Y"
      // this.$set(this.mesageList, index, data);
    },
  
    //点击生成图片的方法
    clickPtTwo() {
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let ptData = new FormData();
      ptData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      ptData.append("openId", this.nowOpenIdData);
      ptData.append("position", this.position);
      this.getvicerecord({
        ptData,
        successCallback: result => {
          window.open(result);
        },
        failCallback: () => {}
      });
    },

    //发送表情
    handleEmotion(i) {
      this.chat_textarea += i;
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\[|\]/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "囧",
        "抓狂",
        "吐",
        "偷笑",
        "愉快",
        "白眼",
        "傲慢",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "悠闲",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "咖啡",
        "猪头",
        "玫瑰",
        "凋谢",
        "嘴唇",
        "爱心",
        "心碎",
        "蛋糕",
        "炸弹",
        "便便",
        "月亮",
        "太阳",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "OK",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "笑脸",
        "生病",
        "破涕为笑",
        "吐舌",
        "脸红",
        "恐惧",
        "失望",
        "无语",
        "嘿哈",
        "捂脸",
        "奸笑",
        "机智",
        "皱眉",
        "耶",
        "鬼魂",
        "合十",
        "强壮",
        "庆祝",
        "礼物",
        "红包",
        "發",
        "小狗"
      ];
      let index = list.indexOf(word);
      // return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" alt="${word}">`
      // .replace(/\[笑脸\]/g, "😄").replace(/\[生病\]/g, "😷").replace(/\[破涕为笑\]/g, "😂").replace(/\[吐舌\]/g, "😝").replace(/\[脸红\]/g, "😳").replace(/\[恐惧\]/g, "😱").replace(/\[失望\]/g, "😔").replace(/\[无语\]/g, "😒").replace(/\[鬼魂\]/g, "👻").replace(/\[合十\]/g, "🙏").replace(/\[强壮\]/g, "💪").replace(/\[庆祝\]/g, "🎉").replace(/\[礼物\]/g, "🎁");

      return `<img src="./static/images/emotion/${index}.png" alt="${word}" width="18px" height="18px">`;
    },
    emotionTwo(res) {
      return res;
    },
    //打开表情
    isShowEmotionFn() {
      // this.newCloseWindowFn()
      this.isOpenQucik = false;
      this.isShowEmotion = !this.isShowEmotion;
    },
    //关闭表情和历史消息列表
    newCloseWindowFn() {
      this.isShowEmotion = false;
      this.isOpenQucik = false;
      this.isShowqucikList = false;
    },

    //历史消息列表
    historyMessageFn(index) {
      this.newCloseWindowFn();

      this.isShowHistoryMessage = true;
      for (let item of this.historySelectMessage) {
        item.selectClientStyle = "";
      }
      this.historySelectMessage[index].selectClientStyle = "hb-header-select";

      let num = index;
      num++;

      this.isChatTsrOuKh = num;
      let nowPhoneNo = ""
      if(this.nowPhoneNo){
        nowPhoneNo = $.base64.encode(this.nowPhoneNo)
      } else {
        nowPhoneNo = this.nowPhoneNo
      }
      var chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", this.nowOpenIdData);
      chatRecordMessageL.append("phoneNo", nowPhoneNo);
      chatRecordMessageL.append("select", num);
      chatRecordMessageL.append("position", this.position);
      this.clientListEecord({
        chatRecordMessageL,
        successCallback: () => {
          // for(let i = 0; i < this.$store.getters.hostoryChatRecordList.length; i ++){
          //   // console.log(this.isChatTsrOuKh)
          //   if(this.isChatTsrOuKh == '2'){
          //     this.$store.getters.hostoryChatRecordList[i].IMGURLNOW = this.imgulrNow;
          //   }else{
          //     // console.log(this.isMeImgPt)
          //       if(this.isMeImgPt){
          //         // console.log(this.ishistoryPhoto)
          //         this.$store.getters.hostoryChatRecordList[i].IMGURLNOW =this.ishistoryPhoto
          //       }else{
          //         this.$store.getters.hostoryChatRecordList[i].IMGURLNOW = this.accessphotourl
          //       }
          //     // this.$store.getters.hostoryChatRecordList[i].IMGURLNOW = '/tpdwt_web/chat/getFile.html?filePath='+this.accessphotourl
          //   }

          // }

          this.historyMesageList = this.$store.getters.hostoryChatRecordList;
          this.bottomshowTwo();
        },
        failCallback: () => {}
      });
    },
    //关闭历史消息
    closeHistoryMessageFn() {
      this.isShowHistoryMessage = false;
    },
    //获取更多信息
    getMoreTwo() {
      // return
      // console.log('99')
      let chat_scroll_height = this.$refs.chat_window_box_two.scrollHeight;
      if (this.$refs.chat_window_box_two.scrollTop == 0) {
        if (this.historyMesageList.length == 0) {
          return false;
        }
        let getMoreMessData = new FormData();
        let nowPhoneNo = ""
        if(this.nowPhoneNo){
          nowPhoneNo = $.base64.encode(this.nowPhoneNo)
        } else {
          nowPhoneNo = this.nowPhoneNo
        }
        getMoreMessData.append("id", this.historyMesageList[0].id);
        getMoreMessData.append("openId",  this.nowOpenIdData);
        getMoreMessData.append("phoneNo",  nowPhoneNo);
        getMoreMessData.append("select", this.isChatTsrOuKh);
        getMoreMessData.append("position", this.position);
        this.getMoreMess({
          getMoreMessData,
          successCallback: () => {
            // for (let i = 0; i < this.mesageList.length; i++) {
            //   this.$store.getters.chatRecordList[i].isMe = "";
            //   this.$store.getters.chatRecordList[i].IMGURLNOW = this.imgulrNow;
            // for (
            //   let i = 0;
            //   i < this.$store.getters.getHistoryMoreMessage.length;
            //   i++
            // ){
            //   if(this.isChatTsrOuKh == '2'){
            //     this.$store.getters.getHistoryMoreMessage[i].IMGURLNOW = this.imgulrNow;
            //   }else{
            //     if(this.isMeImgPt){
            //       this.$store.getters.getHistoryMoreMessage[i].IMGURLNOW =this.ishistoryPhoto
            //     }else{
            //       this.$store.getters.getHistoryMoreMessage[i].IMGURLNOW = this.accessphotourl
            //     }
            //   }
            // }

            this.$store.getters.getHistoryMoreMessage.reverse();
            for (
              let i = 0;
              i < this.$store.getters.getHistoryMoreMessage.length;
              i++
            ) {
              this.$store.getters.getHistoryMoreMessage[
                i
              ].IMGURLNOW = this.imgulrNow;
              this.historyMesageList.unshift(
                this.$store.getters.getHistoryMoreMessage[i]
              );
            }
            if (this.$store.getters.getHistoryMoreMessage.length > 8) {
              this.$refs.chat_window_box_two.scrollTop = 900;
            }
          },
          failCallback: () => {}
        });
      }
    },

    //选择快捷回复列表
    qucikListFn() {
      // this.newCloseWindowFn()
      let qucikNum = this.qucikValue;
      qucikNum--;
      this.qucikListsNow = this.qucikLists[qucikNum].content;
    },

    //快捷回复录入
    qucikMessageInput() {
      this.isShowEmotion = false;
      let qucikNum = this.qucikValue;
      qucikNum--;
      this.qucikListsNow = this.qucikLists[qucikNum].content;
      this.isOpenQucik = !this.isOpenQucik;
    },

    //保存快捷回复
    saveMessageFn() {
      let qucikNum = this.qucikValue;
      qucikNum--;
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let addfastReplyData = new FormData();
      addfastReplyData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      addfastReplyData.append("serialnum", this.qucikValue);
      addfastReplyData.append("content", this.qucikListsNow);
      addfastReplyData.append("id", this.qucikLists[qucikNum].ID);
      // console.log(this.qucikListsNow)
      // console.log(userTsrL.TSR_SESSION.tsrno)
      // console.log(this.qucikValue)
      this.addFastReplyFn({
        addfastReplyData,
        successCallback: () => {
          // console.log(this.qucikListsNow)
          let qucikNum = this.qucikValue;
          qucikNum--;
          this.$set(this.qucikLists[qucikNum], "content", this.qucikListsNow);
          this.$message.success("添加成功");
        },
        failCallback: () => {}
      });
    },

    //获取快捷回复列表
    getFastReplyFnBox() {
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let fastReplyData = new FormData();
      fastReplyData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      // console.log(userTsrL.TSR_SESSION.tsrno)
      this.getFastReplyFn({
        fastReplyData,
        successCallback: result => {
          // console.log(result)
          for (let i = 0; i < result.length; i++) {
            let serialnum = result[i].SERIALNUM;
            serialnum--;
            this.$set(this.qucikLists[serialnum], "content", result[i].CONTENT);
            this.qucikLists[serialnum].ID = result[i].ID;
          }
          // console.log(this.qucikLists)
        },
        failCallback: () => {}
      });
    },

    //将快捷回复内容加入输入框
    addQucikMessageContent(result) {
      this.chat_textarea = result.content;
      this.isShowqucikList = !this.isShowqucikList;
    },

    clickPt() {
      //创建一个新的canvas
      let canvas2 = document.createElement("canvas");
      let _canvas = document.querySelector("div");
      let w = parseInt(window.getComputedStyle(_canvas).width);
      let h = parseInt(window.getComputedStyle(_canvas).height);
      //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 2;
      canvas2.height = h * 2;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      //可以按照自己的需求，对context的参数修改,translate指的是偏移量
      //  var context = canvas.getContext("2d");
      //  context.translate(0,0);
      let context = canvas2.getContext("2d");
      context.scale(2, 2);
      html2canvas(document.querySelector(".listpt"), { canvas: canvas2 }).then(
        function(canvas) {
          document.body.appendChild(canvas);
          //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          // this.$refs.clickMessage.setAttribute('href', canvas.toDataURL());
          // console.log(this.clickMessageData)
          // this.clickMessageData = canvas.toDataURL()
          // console.log(canvas.toDataURL());
          document
            .querySelector(".clickMessage")
            .setAttribute("href", canvas.toDataURL());
        }
      );
      canvas2.style.display = "none";
    },
    //点击更新头像的方法
    newPoto() {
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let getTsrHeadData = new FormData();
      getTsrHeadData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      this.getTsrHeadFn({
        getTsrHeadData,
        successCallback: () => {
          // console.log("刷新");
          window.location.reload();
        },
        failCallback: () => {}
      });
    },
    //切换页面函数
    selsectWindow() {
      // var newMun;
      // window.onblur = () => {

      //   newMun = this.selectIndex;
      //   this.selectChat(0);
      // };
      // window.onfocus = () => {
      //   this.selectChat(newMun);
      // };
    },
    //轮训函数
    goOnFnTwo() {
      setTimeout(() => {
        // this.goOnFn()
        this.selectClientNameDataTwo();
      }, 5000);
    },
    goOnFn() {
      let clientMessageData = {};
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let messageNoData = new FormData();
      messageNoData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      messageNoData.append("openId", this.nowOpenIdData);
      this.messageLx({
        messageNoData,
        successCallback: () => {
          // this.clientListData[0].arrNumber = '0'
          // console.log(this.$store.getters.messageNoDataList)
          for (let i = 0; i < this.clientListData.length; i++) {
            // this.clientListData[0].arrNumber = '9999-99-99 99:99:99'
            // console.log(this.clientListData[0])

            for (
              let j = 0;
              j < this.$store.getters.messageNoDataList.length;
              j++
            ) {
              if (
                this.clientListData[i].OPENID ==
                this.$store.getters.messageNoDataList[j].MSGFROM
              ) {
                this.clientListData[
                  i
                ].UNREADSUM = this.$store.getters.messageNoDataList[
                  j
                ].UNREADSUM;
                this.clientListData[
                  i
                ].MSGCONTENT = this.$store.getters.messageNoDataList[
                  j
                ].MSGCONTENT;
                this.clientListData[
                  i
                ].SENDTIME = this.$store.getters.messageNoDataList[j].SENDTIME;
              }
            }
            // console.log(this.clientListData[i].SENDTIME)
            if (
              this.clientListData[i].SENDTIME != "" &&
              this.clientListData[i].SENDTIME != undefined &&
              this.clientListData[i].SENDTIME != null
            ) {
              let arrNumberData = this.clientListData[i].SENDTIME.split(
                " "
              )[1].split(":");
              let arrNumberDataTwo = this.clientListData[i].SENDTIME.split(
                " "
              )[0].split("-");
              // console.log(arrNumberData[0] + '-' + arrNumberData[1] + '-' + arrNumberData[2] + '-' + arrNumberDataTwo[2])
              this.clientListData[i].arrNumber =
                arrNumberDataTwo[0] * 12 * 30 * 24 * 3600 +
                arrNumberDataTwo[1] * 30 * 24 * 3600 +
                arrNumberDataTwo[2] * 24 * 3600 +
                arrNumberData[0] * 3600 +
                arrNumberData[1] * 60 +
                arrNumberData[2];
              //  console.log(this.clientListData[i].SENDTIME)
              //  console.log(arrNumberDataTwo[0])
              // this.clientListData[0].arrNumber = '999999999999999999999'
              if (this.clientListData[i].NICKNAME === "我自己") {
                this.clientListData[i].arrNumber = "999999999999999999999";
              }
            }
          }
          this.clientListData.sort((a, b) => {
            if (a.arrNumber < b.arrNumber) {
              return 1;
            } else if (a.arrNumber > b.arrNumber) {
              return -1;
            }
            return 0;
          });
          // console.log('--------------------------------------')
          // console.log(this.clientListData)
          // setTimeout(()=>{
          //   this.goOnFn()
          //   this.selectClientNameDataTwo()
          // },3000)
        },
        failCallback: () => {}
      });
    },       
    //图片放大函数
    imgbig(imgruldata, f, item) {
      // alert(imgruldata);
      console.log('item', item)
      console.log('--------', this.mesageList)
      this.isbigImg = true;
      this.bigImgData = "/tpdwt_web/chat/getFile.html?filePath=" + imgruldata;
      if(f){
        this.isMearr =  this.mesageList.filter((item)=>{
            return !item.isMe && item.localPicUrl
          })
          console.log('this.isMearr', this.isMearr)
        let needindex ="" 
          this.isMearr.forEach((item, i)=> {
            // console("htere", item.localPicUrl)
            console.log('mmmm')
            if(imgruldata==item.localPicUrl){
              needindex = i
              console.log('i', i)
            }
          })
          this.imgFalg = needindex
          console.log('ooooo', this.imgFalg)
        }
    },
    //关闭图片放大
    closeBigImg() {
      this.isbigImg = false;
    },
    selectClientNameDataTwo() {
      
      let clientMessage = new FormData()
      if(!this.saveclientMessage){
        let clientMessageData = {};
        this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
        if (this.userTsrL.fromType == 1) {
          clientMessageData = {
            tsrno: this.userTsrL.TSR_SESSION.tsrno,
            fromType: this.userTsrL.fromType,
            mobile: $.base64.encode(this.userTsrL.userInfo.mobile) ,
            userName: this.userTsrL.userInfo.userName,
            realname: this.userTsrL.userInfo.realname
          };
        }
        if(this.selectData == "Y" ){
          clientMessageData.unfollow = "Y"
        } else {
          clientMessageData.unfollow = ""
        }
        if (this.userTsrL.fromType == 2) {
          clientMessageData = {
            tsrno: this.userTsrL.TSR_SESSION.tsrno,
            fromType: this.userTsrL.fromType
          };
        }
        clientMessageData.position =this.position
        clientMessageData = JSON.stringify(clientMessageData);
        clientMessage.append("clientmessage", clientMessageData);
      } else {
        // clientMessage = this.saveclientMessage
        clientMessage.append("clientmessage", this.saveclientMessage);
      }
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          
          this.clientListData.length = 1;
          if (this.userTsrL.fromType == 1) {
            
            if (
              this.$store.getters.nowChat != "" &&
              this.$store.getters.nowChat != undefined
            ) {
              console.log(1, this.$store.getters.nowChat)
              this.clientListData.push(this.$store.getters.nowChat);
              this.mesageList = this.$store.getters.chatRecordList;
            }
          }
          
          console.log('b1', this.clientListData)
          if (
            this.$store.getters.chatData != "" &&
            this.$store.getters.chatData != undefined &&
            this.$store.getters.chatData != null
          ) {
            
            // console.log(this.$store.getters.chatData)
            for (var i = 0; i < this.$store.getters.chatData.length; i++) {
              console.log('2', this.$store.getters.chatData[i])
              this.clientListData.push(this.$store.getters.chatData[i]);
            }
            console.log('sfdfd', this.clientListData)
          }
         console.log('dsds',this.clientListData)
          for (let i = 0; i < this.clientListData.length; i++) {
            // console.log(this.clientListData[i].PHONENO)
            this.clientListData[i].chatFlag = "";
            // if(this.userTsrL.fromType == 1){
            if (
              this.clientListData[i].OPENID == this.nowOpenIdData &&
              this.clientListData[i].PHONENO == this.nowPhoneNo
            ) {
              this.clientListData[i].className = "examine";
              this.clientListData[i].chatFlag = "start";
              // console.log(i +'+'+this.clientListData[i].OPENID +'+'+ this.nowPhoneNo)
              // console.log(this.clientListData[i])
              // this.selectChat(i)
              // this.clientNameNow = this.clientListData[i].NICKNAME
              // this.mesageList = this.$store.getters.chatRecordList
              // for (let i = 0; i < this.mesageList.length; i ++){
              //   if (this.mesageList[i].ToUserName == this.userTsrL.userInfo.openid){
              //     this.mesageList[i].isMe = true
              //   }
              // }
            }
            // this.ischatListShow = false
            // this.isChatListleft = false
            // }
          }
          // console.log(this.clientListData)
          // if(this.userTsrL.fromType == 2){
          //     this.selectChat(0)
          //   }
        },
        failCallback: () => {}
      });
      setTimeout(() => {
        // this.goOnFn()
        this.selectClientNameDataTwo();
      }, 30000);
    },
    //判定
    judge() {
      let starNumDat = this.starNum;
      var starNumData = new FormData();
      starNumData.append("params", starNumDat);
      this.clientList({
        starNumData,
        successCallback: (userTsrL) => {
          // debugger
          // let userTsr = JSON.parse(window.localStorage.getItem("userTsr"));
        // console.log('userTsr',userTsr)
        // console.log('TSR_SESSION--', userTsr.TSR_SESSION)
        // console.log('userTsrL.TSR_SESSION.tsrposition', userTsrL.TSR_SESSION.tsrposition,  userTsrL.TSR_SESSION.tsrposition == "TSR")
         if (
            userTsrL.TSR_SESSION.tsrposition == "TSR" ||
            userTsrL.TSR_SESSION.tsrposition == "CSR" ||
            userTsrL.TSR_SESSION.tsrposition == "HQL" ||
            userTsrL.TSR_SESSION.tsrposition == "QL" ||
            userTsrL.TSR_SESSION.tsrposition == "CSL"
          ) {
            // debugger
            this.isDisabelStar = false;
            this.isSelectName = false;
          } else {
            // debugger
            this.isSelectName = true;
          }
          if (
            userTsrL.TSR_SESSION.tsrposition == "TSR" ||
            userTsrL.TSR_SESSION.tsrposition == "CSR" ||
            userTsrL.TSR_SESSION.tsrposition == "TL" ||
            userTsrL.TSR_SESSION.tsrposition == "CSL"
          ) {
            this.isJudge = true;
            this.isDisabelStar = false;
          } else {
            this.isJudge = false;
          }
          if (
            userTsrL.TSR_SESSION.tsrposition == "HQL" ||
            userTsrL.TSR_SESSION.tsrposition == "QL"
          ) {
            this.isDisabelStar = true;
            this.isDisabel = true;
          }
        },
        failCallback: () => {}
      });
      // console.log(userTsrL.TSR_SESSION.tsrposition)
      
    },
    //开始会话
    openConversationTwo() {
      this.chat_textarea = "";
      this.isCloseConversation = false;
      // this.openConversation()
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "1");
      this.upSataStatus({
        unDataChat,
        successCallback: () => {
          // this.get_message_reply('/tpdwt_web/chat/getMessage.html', this.nowOpenIdData, this.userTsrL.TSR_SESSION.tsrno, '1', '');
        },
        failCallback: () => {}
      });
    },
    openConversation() {
      this.chat_textarea = "";
      // this.isCloseConversation = false
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "1");
      // console.log(this.userTsrL.TSR_SESSION.tsrno+'-'+this.nowOpenIdData)
      this.updataChat({
        unDataChat,
        successCallback: result => {
          if (result == "1") {
            this.isCloseConversation = false;
          }
          // alert(11)
          //  clearTimeout(() => {
          //   this.getmessagelist
          // })
          // console.log(this.nowOpenIdData +'+'+this.userTsrL.TSR_SESSION.tsrno)
          this.get_message_reply(
            "/tpdwt_web/chat/getMessage1.html",
            this.nowOpenIdData,
            this.userTsrL.TSR_SESSION.tsrno
          );
          // this.get_message_reply('/tpdwt_web/chat/getMessage.html', this.nowOpenIdData, this.userTsrL.TSR_SESSION.tsrno, '1', '');
        },
        failCallback: () => {}
      });
    },
    closeConversation() {
      this.chat_textarea = "";
      if (this.isCloseConversation) {
        return false;
      }
      // alert(11)
      this.isCloseConversation = true;
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "0");
      this.upSataStatus({
        unDataChat,
        successCallback: () => {},
        failCallback: () => {}
      });
    },
    //打开页面调取内容
    openWindow() {

      let starNumDat = this.starNum;
      var starNumData = new FormData();
      starNumData.append("params", starNumDat);
      this.clientList({
        starNumData,
        successCallback: () => {
          let userTsr = JSON.parse(window.localStorage.getItem("userTsr"));
          // console.log(userTsr.TSR_SESSION.tsrOpenid);
          if (
            userTsr.TSR_SESSION.tsrOpenid == "" ||
            userTsr.TSR_SESSION.tsrOpenid == undefined ||
            userTsr.TSR_SESSION.tsrOpenid == null
          ) {
            this.tsrnoBadingData = "绑定工号";
          }
          this.accessphotourl = userTsr.TSR_SESSION.accessphotourl;
          // console.log(userTsr.TSR_SESSION.f_photourl_is_default)
          if (userTsr.TSR_SESSION.f_photourl_is_default == "0") {
            this.isMeImgPt = true;
          } else {
            this.isMeImgPt = false;
          }
          // this.tsrCardMessage()
          this.selectClientNameData();
          this.getFastReplyFnBox();
        },
        failCallback: () => {}
      });
    },
    //获取名片信息
    // tsrCardMessage() {
    //   let userTsr = JSON.parse(window.localStorage.getItem('userTsr'))
    //   let tsrno = userTsr.TSR_SESSION.tsrno
    //   var tsrcardData = new FormData()
    //       tsrcardData.append('tsrcard', tsrno)
    //       this.clientCompile({
    //         tsrcardData,
    //         successCallback: () => {
    //           this.cardDataList = this.$store.getters.cardData
    //           console.log(this.cardDataList)
    //         },
    //         failCallback: () => {
    //         }
    //       })
    // },
    //选择会话
    selectChat(index) {
      // debugger
      this.newCloseWindowFn();
      //关闭历史消息
      this.closeHistoryMessageFn();
      //  if (index == 0){
      //    this.$refs.personalOn.perSelectTwo(true)
      //  }else {
      //    this.$refs.personalOn.perSelectTwo(false)
      //  }
      // console.log(this.clientListData[index])
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));

      this.selectIndex = index;
      for (let i = 0; i < this.clientListData.length; i++) {
        // this.clientListData[i].UNREADSUM = 0
        this.clientListData[i].className = "";
        this.clientListData[i].chatFlag = "end";
      }
      // console.log(this.clientListData)
      //console.log(this.clientListData[index].UNREADSUM);
      if (this.clientListData && this.clientListData[index] &&  this.clientListData[index].UNREADSUM != undefined) {
        this.clientListData[index].UNREADSUM = 0;
      }

      // console.log(this.clientListData[index])
      if (
        this.clientListData &&
        this.clientListData[index] &&
        this.clientListData[index].OPENID != "" &&
        this.clientListData[index].OPENID != undefined &&
        this.clientListData[index].OPENID != null &&
        (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
          userTsrL.TSR_SESSION.tsrposition == "HQL" ||
          userTsrL.TSR_SESSION.tsrposition == "QL" ||
          userTsrL.TSR_SESSION.tsrposition == "CSR")
      ) {
        // console.log(this.clientListData[index])
        this.isDisabelStar = false;
        this.isDisabel = false;
        this.previewDisabel = false;
        // this.$refs.personalOn.perSelectTwo(false, false)
      } else {
        this.isDisabelStar = true;
        this.isDisabel = true;
        this.previewDisabel = true;
        // this.$refs.personalOn.perSelectTwo(true, true)
      }
      
      if (index == "0") {
        // console.log(index)
        this.$refs.personalOn.perSelectTwo(true, true);
        if (
          this.clientListData &&
          this.clientListData[index]&&
          this.clientListData[index].OPENID != "" &&
          this.clientListData[index].OPENID != undefined &&
          this.clientListData[index].OPENID != null &&
          (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
            userTsrL.TSR_SESSION.tsrposition == "CSR" ||
            userTsrL.TSR_SESSION.tsrposition == "TL" ||
            userTsrL.TSR_SESSION.tsrposition == "HQL" ||
            userTsrL.TSR_SESSION.tsrposition == "QL" ||
            userTsrL.TSR_SESSION.tsrposition == "UM")
        ) {
          //console.log(this.clientListData[index])
          this.isDisabelStar = false;
          this.isDisabel = false;
          this.previewDisabel = false;
        } else {
          this.isDisabelStar = true;
          this.isDisabel = true;
          this.previewDisabel = true;
        }
      }

      if (
        this.clientListData &&
        this.clientListData[index] &&
        this.clientListData[index].PHONENO != "" &&
        this.clientListData[index].PHONENO != undefined &&
        this.clientListData[index].PHONENO != null &&
        (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
          userTsrL.TSR_SESSION.tsrposition == "CSR" ||
          userTsrL.TSR_SESSION.tsrposition == "TL")
      ) {
        // console.log(this.clientListData[index].PHONENO)
        // this.$refs.personalOn.perSelectTwo(false, false)
        this.isPhoneDisabel = false;
        this.previewDisabel = false;
      } else {
        // this.$refs.personalOn.perSelectTwo(false, true)
        // console.log(this.clientListData[index].PHONENO)
        this.isPhoneDisabel = false;
        this.previewDisabel = false;
      }
      if (
        this.clientListData &&
        this.clientListData[index] &&
        this.clientListData[index].OPENID != "" &&
        this.clientListData[index].OPENID != undefined &&
        this.clientListData[index].OPENID != null
      ) {
        // console.log(this.clientListData[index])
        // this.isDisabelStar = false
        // this.isDisabel = false
        // this.previewDisabel = false
        if (
          this.clientListData &&
          this.clientListData[index] &&
          this.clientListData[index].PHONENO != "" &&
          this.clientListData[index].PHONENO != undefined &&
          this.clientListData[index].PHONENO != null
        ) {
          this.$refs.personalOn.perSelectTwo(true, false);
        } else {
          this.$refs.personalOn.perSelectTwo(true, false);
        }
      } else {
        if (
          this.clientListData &&
          this.clientListData[index] &&
          this.clientListData[index].PHONENO != "" &&
          this.clientListData[index].PHONENO != undefined &&
          this.clientListData[index].PHONENO != null
        ) {
          this.$refs.personalOn.perSelectTwo(false, true);
        } else {
          // this.$refs.personalOn.perSelectTwo(false, true);
        }
        // this.isDisabelStar = true
        // this.isDisabel = true
        // this.previewDisabel = true
        // this.$refs.personalOn.perSelectTwo(false, true)
      }
      if (
        userTsrL.TSR_SESSION &&
        userTsrL.TSR_SESSION.tsrposition &&
        userTsrL.TSR_SESSION.tsrposition == "HQL" ||
        userTsrL.TSR_SESSION.tsrposition == "QL"
      ) {
        this.isPhoneDisabel = true;
        this.isDisabel = true;
      }
      if (
        this.clientListData &&
        this.clientListData[index] &&
        this.clientListData[index].PHONENO != "" &&
        this.clientListData[index].PHONENO != undefined &&
        this.clientListData[index].PHONENO != null &&
        (userTsrL.TSR_SESSION.tsrposition == "HQL" ||
          userTsrL.TSR_SESSION.tsrposition == "QL")
      ) {
        // console.log(this.clientListDa   a[index].PHONENO)
        // this.$refs.personalOn.perSelectTwo(false, false)
        this.isDisabelStar = false;
      } else if (
        index != "0" &&
        (userTsrL.TSR_SESSION.tsrposition == "HQL" ||
          userTsrL.TSR_SESSION.tsrposition == "QL")
      ) {
        this.isDisabelStar = true;
      }
      if (index == "0") {
        // console.log(index)
        this.$refs.personalOn.perSelectTwo(true, true);
        setTimeout(() => {
          this.$refs.personalOn.clickMines();
        }, 200);
      } else {
        this.$refs.personalOn.enterPage();
      }
     
      //发送按钮解冻
      this.isSengContent = false;
      //取当前头像
      // deb
      this.imgulrNow = this.clientListData[index].HEADERIMG;
      this.chat_textarea = "";
      this.isCloseConversation = true;
      // this.closeConversation()
      this.clientListData[index].chatFlag = "start";
      this.clientListData[index].className = "examine";
      this.clientNameNow = this.clientListData[index].NICKNAME;
      let chatRecordMessageLs = this.clientListData[index].OPENID;
      this.nowOpenIdData = this.clientListData[index].OPENID;
      // debugger
      console.log(')))))))', this.clientListData)
      // if(this.clientListData && this.clientListData[index] && this.clientListData[index].PHONENO){
      //   this.nowPhoneNo = $.base64.decode(this.clientListData[index].PHONENO);
      // } else {
      //   this.nowPhoneNo = this.clientListData[index].PHONENO
      // }
      
      console.log(this.clientListData, index)
      this.nowPhoneNo = this.clientListData[index].PHONENO
      let nowPhoneNo = ''
      if(this.nowPhoneNo){
        nowPhoneNo = $.base64.encode(this.nowPhoneNo)
      } else {
        nowPhoneNo = this.nowPhoneNo
      }
      console.log('here0', this.nowPhoneNo)
      this.nowChatFlag = this.clientListData[index].chatFlag;
      var chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", chatRecordMessageLs);
      chatRecordMessageL.append("phoneNo", nowPhoneNo);
      chatRecordMessageL.append("position", this.position);
      // this.clientPortrayalData (chatRecordMessageL)
      // this.clientFooterDataL(chatRecordMessageL)
      this.clientListEecord({
        chatRecordMessageL,
        successCallback: () => {
          this.mesageList = this.$store.getters.chatRecordList;
          // console.log(this.mesageList);
          if (this.$store.getters.chatRecordList != "0") {
            // alert(11)
            for (let i = 0; i < this.mesageList.length; i++) {
              this.$store.getters.chatRecordList[i].isMe = "";
              this.$store.getters.chatRecordList[i].IMGURLNOW = this.imgulrNow;
              // console.log(this.mesageList[i].FromUserName)
              if (
                this.mesageList[i].ToUserName ==
                this.clientListData[index].OPENID
              ) {
                this.mesageList[i].isMe = true;
              }

              if (
                this.mesageList[i].ToUserName ==
                this.clientListData[index].PHONENO
              ) {
                this.mesageList[i].isMe = true;
              }
              // console.log(this.mesageList[i].toPhone)
              if (
                this.mesageList[i].ToPhone != "" &&
                this.mesageList[i].ToPhone != undefined &&
                this.mesageList[i].ToPhone != null
              ) {
                
                this.mesageList[i].isMe = true;
              }

              // if (
              //   this.mesageList[i].mainTitle != "" &&
              //   this.mesageList[i].mainTitle != undefined &&
              //   this.mesageList[i].mainTitle != null
              // ) {
              //   this.mesageList[i].isMe = true;
              // }
              // if(this.mesageList[i].Content!=''&&this.mesageList[i].Content!=undefined){
              //   this.$set(
              //   this.mesageList[i],
              //   "Content",
              //   this.mesageList[i].Content.replace(/\/\:\:\)/g, "[微笑]").replace(/\/\:\:\~/g, "[撇嘴]")
              // );
              // }
            }
          }

          // setInterval(() => {

          // }, 5000)

          this.bottomshow();
        },
        failCallback: () => {}
      });
      this.openConversation();
      // this.clientPortrayalData ()
      // this.clientFooterDataL()
      this.$refs.personalOn.titleOPeration(0);
      // this.clickPt()  //导出图片函数
      // this.$refs.personalOn.clientFooterList()
    },
    get_message_reply(url, reciver_uid, sender_uid) {
      // get_message_reply(url, reciver_uid, sender_uid, request_type, send_data) {
      var getMessageData = new FormData();
      getMessageData.append("reciver_uid", reciver_uid);
      getMessageData.append("sender_uid", sender_uid);
      // getMessageData.append('request_type', request_type)
      // getMessageData.append('send_data', send_data)
      axios({
        method: "post",
        url: url,
        data: getMessageData,
        traditional: true //属性在这里设置
      })
        .then(res => {
          let response = res.data;
          // console.log(response)
          if (response.responseCode == "0") {
            // alert(11)
            // if (response.msg == 'is_read') {
            // console.log(response.msg)
            //将消息写入到消息盒子
            var messages = response.result;
            // console.log(this.nowOpenIdData)
            // console.log(messages)
            // this.chatRecordList.push(messages)
            var id_arr = [];
            if (messages != undefined && messages != "" && messages != null) {
              for (let i = 0; i < messages.length; i++) {
                if (
                  messages[i].FromUserName == this.nowOpenIdData ||
                  messages[i].ToUserName == this.nowOpenIdData ||
                  messages[i].FromUserName == this.nowPhoneNo ||
                  messages[i].ToUserName == this.nowPhoneNo
                ) {
                  id_arr.push(messages[i].id);
                  if (messages[i].FromUserName == "system") {
                    messages[i].isMe = true;
                  }
                  // alert(11)/\b\w+\b/g
                  messages[i].IMGURLNOW = this.imgulrNow;
                  //         console.log(messages[i].Content.replace(/\/\:\:\)/g, "[微笑]"));
                  //         this.$set(
                  //   messages[i],
                  //   "Content",
                  //   messages[i].Content.replace(/\/\:\:\)/g, "[微笑]").replace(/\/\:\:\~/g, "[撇嘴]")
                  // );
                  this.mesageList.push(messages[i]);
                  
                } else {
                  // alert(22)
                  return false;
                }
              }
              this.bottomshow();
            }
            // alert(22)
            // console.log(getmessagelist)
            clearTimeout(this.getmessagelist);
            this.getmessagelist = setTimeout(() => {
              // console.log(this.nowOpenIdData +'+'+this.userTsrL.TSR_SESSION.tsrno)
              // alert(11)
              // this.get_message_reply('/tpdwt_web/chat/getMessage.html', reciver_uid, sender_uid, '2', id_arr);
              // getmessagelist
              this.get_message_reply(
                "/tpdwt_web/chat/getMessage1.html",
                this.nowOpenIdData,
                this.userTsrL.TSR_SESSION.tsrno
              );
            }, 3000);
            // console.log(this.getmessagelist)

            // } else if (response.msg == 'is_connecting') {
            // clearTimeout(() => {
            //     this.get_message_reply
            //   })
            //  if(this.nowChatFlag == 'start'){
            //     // setTimeout(() => {
            //       // console.log(22)
            //       this.get_message_reply('/tpdwt_web/chat/getMessage.html', reciver_uid, sender_uid, '1', '');
            //     // },500)
            //   }
            // }
          } else {
            // alert(11)
          }
        })
        .catch(function(err) {
          // console.log("消息轮训出错");
          // failCallback()
          // let res = err.response
          // if (err) {
          //     window.alert('api error, HTTP CODE: ' + res)
          // }
        });
    },
    //获取客户画像
    clientPortrayalData() {
      let chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", this.nowOpenIdData);
      this.clientPortrayal({
        chatRecordMessageL,
        successCallback: () => {
          this.clientPortrayalDataList = "";
          this.clientPortrayalDataList = this.$store.getters.clientPortrayalData;
          this.clientPortrayalDataList.HEADERIMG = this.imgulrNow;
          this.clientPortrayalDataList.clientPortrayalNo = this.$store.getters.clientPortrayalData.laber.length;
          // console.log(this.clientPortrayalDataList)
        },
        failCallback: () => {
          this.clientPortrayalDataList = "";
          // this.clientPortrayalDataList.HEADERIMG = ''
          // this.clientPortrayalDataList.clientPortrayalNo = ''
        }
      });
    },
    //获取客户足迹
    clientFooterDataL() {
      // console.log(chatRecordMessageL)
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", this.nowOpenIdData);
      chatRecordMessageL.append("tsrNo", userTsrL.TSR_SESSION.tsrno);
      this.clientFooter({
        chatRecordMessageL,
        successCallback: () => {
          this.clientFooterData = "";
          this.clientFooterData = this.$store.getters.clientFooterData;
          for (let i = 0; i < this.clientFooterData.length; i++) {
            this.clientFooterData[i].addClassNameData = "";
            this.clientFooterData[i].clientOperation = "";
            this.clientFooterData[i].iconContent = "";
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 1) {
              this.clientFooterData[i].clientOperation = "提交";
              this.clientFooterData[i].iconContent = "icon-tijiao";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 2) {
              this.clientFooterData[i].clientOperation = "发消息";
              this.clientFooterData[i].iconContent = "icon-duanxin";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 3) {
              this.clientFooterData[i].clientOperation = "点击";
              this.clientFooterData[i].iconContent = "icon-quxiaoguanzhu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 4) {
              this.clientFooterData[i].clientOperation = "预约";
              this.clientFooterData[i].iconContent = "icon-shijian";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 5) {
              this.clientFooterData[i].clientOperation = "提取";
              this.clientFooterData[i].iconContent = "icon-tiqujilu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 6) {
              this.clientFooterData[i].clientOperation = "关注";
              this.clientFooterData[i].iconContent = "icon-guanzhu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 7) {
              this.clientFooterData[i].clientOperation = "取关";
              this.clientFooterData[i].iconContent = "icon-quxiaoguanzhu";
            }
            this.clientFooterData[0].addClassNameData = "footer_one";
          }
          // console.log(this.clientFooterData)
        },
        failCallback: () => {
          this.clientFooterData = "";
        }
      });
    },
    //是否显示聊天列表
    isChatList() {
      this.ischatListShow = !this.ischatListShow;
      this.isChatListleft = !this.isChatListleft;
    },
    del(){
      // console.log('this.unfollow', this.unfollow)
      // debugger
      this.unfollow({
        successCallback: () => {
        //  this.clientListData = [] 
            this.toastshow = true
            let clientMessage = new FormData();
            clientMessage.append("clientmessage", this.saveclientMessage);
             this.clientListGain({
                  clientMessage,
                  successCallback: () => {
                    if (this.userTsrL.fromType == 1) {
                      this.clientListData.length = 2;
                    } else {
                      this.clientListData.length = 1;
                    }
                    if (this.$store.getters.chatData.length == 0) {
                      this.clientListData.push();
                    }
                    // console.log(this.clientListData)
                    // console.log(this.userTsrL.fromType)
                    for (var i = 0; i < this.$store.getters.chatData.length; i++) {
                      
                      console.log('3', this.$store.getters.chatData[i])
                      this.clientListData.push(this.$store.getters.chatData[i]);
                    }
                    // console.log(this.$store.getters.chatData)
                  },
                  failCallback: () => {}
            });
          setTimeout(()=>{
            this.toastshow = false
          },3000)
        },
        failCallback: (res) => {
          // console.log('resss',res)
          alert(res)
        }
      });
    },
    //查询客户姓名
    selectClientName() {
      // debugger
      var selectDataNm = {
        clientName: this.clientName,
        phoneNO: this.phoneNO,
        selectData: this.selectData,
        tsrno: this.userTsrL.TSR_SESSION.tsrno,
        queryflag: "Y",
        fromType: this.userTsrL.fromType,
       position :this.position
      };
      // debugger
      if(this.selectData == "Y"  ){
        this.disdel = false
        selectDataNm.unfollow = "Y"
      } else {
        this.disdel = true
        selectDataNm.unfollow = ""
      }
      selectDataNm = JSON.stringify(selectDataNm);
      let clientMessage = new FormData();
      clientMessage.append("clientmessage", selectDataNm);
      this.saveclientMessage = selectDataNm 
      // console.log('clientMessage11111',clientMessage)
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          if (this.userTsrL.fromType == 1) {
            this.clientListData.length = 2;
          } else {
            this.clientListData.length = 1;
          }
          if (this.$store.getters.chatData.length == 0) {
            console.log('000')
            this.clientListData.push();
          }
          // console.log(this.clientListData)
          // console.log(this.userTsrL.fromType)
          for (var i = 0; i < this.$store.getters.chatData.length; i++) {
            
            console.log('4', this.$store.getters.chatData[i])
            this.clientListData.push(this.$store.getters.chatData[i]);
          }
          // console.log(this.$store.getters.chatData)
        },
        failCallback: () => {}
      });
    },
    //查询函数初始加入
    selectClientNameData() {
     
      
     let clientMessage = new FormData();
      if(!this.saveclientMessage){
        let clientMessageData = {};
        this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
        if (this.userTsrL.fromType == 1) {
          clientMessageData = {
            tsrno: this.userTsrL.TSR_SESSION.tsrno,
            fromType: this.userTsrL.fromType,
            mobile: $.base64.encode(this.userTsrL.userInfo.mobile),
            userName: this.userTsrL.userInfo.userName,
            realname: this.userTsrL.userInfo.realname
          };
        }
        if(this.selectData == "Y" ){
          clientMessageData.unfollow = "Y"
        } else {
          clientMessageData.unfollow = ""
        }
        if (this.userTsrL.fromType == 2) {
          clientMessageData = {
            tsrno: this.userTsrL.TSR_SESSION.tsrno,
            fromType: this.userTsrL.fromType
          };
        }
        clientMessageData.position =this.position
        clientMessageData = JSON.stringify(clientMessageData);
        // let clientMessage = new FormData();
        clientMessage.append("clientmessage", clientMessageData);
      } else {
        // clientMessage = this.saveclientMessage
        clientMessage.append("clientmessage", this.saveclientMessage);
      }
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          
          //console.log(this.$store.getters.myChatData);
          if (this.userTsrL.fromType == 2) {
            // this.selectChat(0)
// debugger
            //当前聊天
            console.log('dssdsdsdsdsdds', this.$store.getters.myChatData)
            this.$store.getters.myChatData.className = "examine";
            this.clientNameNow = this.$store.getters.myChatData.NICKNAME;
            this.mesageList = this.$store.getters.chatRecordList;
            // changesrc
            // changesrc2

            for (let i = 0; i < this.mesageList.length; i++) {
              if (
                this.mesageList[i].ToUserName ==
                this.$store.getters.myChatData.OPENID
              ) {
                this.mesageList[i].isMe = false;
              }
              this.mesageList[i].changesrc = false
              this.mesageList[i].changesrc2 = false
            }
            // this.selectChat(0)
          }
          
          this.$store.getters.myChatData.HEADERIMG = this.accessphotourl;
          console.log('sdsd', this.$store.getters.myChatData)
          
          this.clientListData.push(this.$store.getters.myChatData);
          //
          if (this.userTsrL.fromType == 1) {
            if (
              this.$store.getters.nowChat != "" &&
              this.$store.getters.nowChat != undefined
            ) {
              
              this.$store.getters.nowChat.className = "examine";
              console.log('zzzz', this.$store.getters.nowChat)
              this.clientListData.push(this.$store.getters.nowChat);
              //console.log(this.$store.getters.nowChat);
               this.nowPhoneNo = this.$store.getters.nowChat.PHONENO;
              // debugger
              // if(this.$store.getters.nowChat.PHONENO){
              //   this.nowPhoneNo =$.base64.decode(this.$store.getters.nowChat.PHONENO);
              // } else{
              //   this.nowPhoneNo =this.$store.getters.nowChat.PHONENO
              // }
              console.log('here1', this.nowPhoneNo)
              // this.selectChat(1)
              this.mesageList = this.$store.getters.chatRecordList;
            }
          }
          if (
            this.$store.getters.chatData != "" &&
            this.$store.getters.chatData != undefined &&
            this.$store.getters.chatData != null
          ) {
            
            // console.log(this.$store.getters.chatData)
            for (var i = 0; i < this.$store.getters.chatData.length; i++) {
              console.log('000', this.$store.getters.chatData[i])
              this.clientListData.push(this.$store.getters.chatData[i]);
            }
          }
          
           console.log(this.userTsrL.userInfo)
           console.log(this.clientListData)
          for (let i = 0; i < this.clientListData.length; i++) {
            
            this.clientListData[i].chatFlag = "";
            if (this.userTsrL.fromType == 1) {
              if (
                this.clientListData[i].OPENID == this.userTsrL.userInfo.openid
              ) {
                this.clientListData[i].className = "examine";
                this.clientListData[i].chatFlag = "start";
                // console.log(i)
                this.selectChat(i);
                this.clientNameNow = this.clientListData[i].NICKNAME;
                this.mesageList = this.$store.getters.chatRecordList;
                for (let i = 0; i < this.mesageList.length; i++) {
                  if (
                    this.mesageList[i].ToUserName ==
                    this.userTsrL.userInfo.openid
                  ) {
                    this.mesageList[i].isMe = true;
                  }
                }
              }
              this.ischatListShow = false;
              this.isChatListleft = false;
            }
          }
          if (this.userTsrL.fromType == 2) {
            this.selectChat(0);
          }
        },
        failCallback: () => {}
      });
    },
    // 赵盼
    bindingOperationOne() {
      // alert(789)
      if (this.tsrnoBadingData == "工号已经绑定") {
        //alert(444)
        if (confirm("确认解除工号绑定吗？")) {
          this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
          let returnDxData2 = new FormData();
          returnDxData2.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
          // console.log(this.userTsrL.TSR_SESSION.tsrno);
          // returnDxData.append('phoneno1', this.clientListData[0].PHONENO1)
          this.returnDxFn1({
            returnDxData2,
            successCallback: customerKeyzp => {
              this.$message.success(customerKeyzp);
              this.tsrnoBadingData = "绑定工号";
            },

            failCallback: () => {
              // console.log("qingqiuchengg8888");
              this.$message.error(customerKeyzp);
            }
          });
        } else {
          return false;
        }
      }
      if (this.tsrnoBadingData == "绑定工号") {
        // alert(456)
        this.idSupernatant = true;
        this.isBinding = true;
        var bindingData = new FormData();
        bindingData.append("tsrcard", this.userTsrL.TSR_SESSION.tsrno);
        this.qrcodeLogion({
          bindingData,
          successCallback: () => {
            this.qrcodeLogionData = this.$store.getters.qrcodeLogionData;
            // alert(this.qrcodeLogionData)
            this.$refs.bindingFn.useqrcode(
              this.$store.getters.qrcodeLogionData
            );
            //console.log(this.$store.getters.qrcodeLogionData);
            // this.tsrnoBadingData == '工号已经绑定'
          },
          failCallback: () => {}
        });
      }
    },
    //绑定操作
    // bindingOperation() {

    //   // if (this.tsrnoBadingData == '工号已经绑定'){
    //   //  return false
    //   //alert("hahha ");

    //   // }
    //   this.idSupernatant = true
    //   this.isBinding = true
    //   var bindingData = new FormData()
    //       bindingData.append('tsrcard', this.userTsrL.TSR_SESSION.tsrno)
    //   this.qrcodeLogion({
    //     bindingData,
    //     successCallback: () => {
    //       this.qrcodeLogionData = this.$store.getters.qrcodeLogionData
    //       // alert(this.qrcodeLogionData)
    //       this.$refs.bindingFn.useqrcode(this.$store.getters.qrcodeLogionData)
    //       console.log(this.$store.getters.qrcodeLogionData)
    //       // this.tsrnoBadingData == '工号已经绑定'
    //     },
    //     failCallback: () => {
    //     }
    //   })
    // },

    //显示预览
    openContentC(listNoThree) {
      // console.log(listNoThree)
      this.previewDisabel = this.isDisabel;
      this.WechatPreviewData = listNoThree;
      listNoThree.type = "2";
      listNoThree = JSON.stringify(listNoThree);
      var showtmData = new FormData();
      showtmData.append("showtmData", listNoThree);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewTitleName = "微信预览";
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.idSupernatant = true;
      this.isPreview = true;
    },
    //获取手机号码方法
    getPhoenNoFn() {
      
      let getPhoneNoData = new FormData();
      let nowPhoneNo = ""
      if(this.nowPhoneNo){
        
        nowPhoneNo = $.base64.encode(this.nowPhoneNo)
      } else {
        nowPhoneNo =this.nowPhoneNo
      }
      getPhoneNoData.append("phone", nowPhoneNo);
      console.log("sdosddjskkdsksdkdskkds",this.nowPhoneNo, $.base64.decode(this.nowPhoneNo))
      this.getClientPhoneNoFn({
        getPhoneNoData,
        successCallback: result => {
          // if(result.length != '0'){
          this.phoneListData.length = 0;
          for (let item of result) {
            let phoneDataJson = {
              phoneNewData: item,
              isSelectNowPhoneNo: false
            };
            this.phoneListData.push(phoneDataJson);
          }
          this.phoneListData[0].isSelectNowPhoneNo = true;
          this.sendNowPhoneNo = this.phoneListData[0].phoneNewData;
        },
        failCallback: () => {}
      });
    },
    //选择发送的手机号码
    selectPhoneNoFn(index) {
      //console.log(index);
      for (let item of this.phoneListData) {
        item.isSelectNowPhoneNo = false;
      }
      this.phoneListData[index].isSelectNowPhoneNo = true;
      this.sendNowPhoneNo = this.phoneListData[index].phoneNewData;
      // this.newInputFn()
    },
    //弹出输入手机号码
    iputPhoneNo() {
      this.newInpurPhone = "";
      this.idSupernatant = true;
      this.isShowInputPhone = true;
    },
    openContentNote(listNoThree) {
      this.ylorsend = "2";
      this.NotePreviewData = listNoThree;
      // console.log(this.nowPhoneNo);
      if (
        this.nowPhoneNo != "" &&
        this.nowPhoneNo != undefined &&
        this.nowPhoneNo != null
      ) {
        // this.openContentNote2(listNoThree);
        this.hasPhoneNo = false;
        this.phoneTitle = "该客户有多个手机号，请选择后发送";
        // this.getPhoenNoFn();
        // console.log(this.phoneListData.length)

         let nowPhoneNo = ""
         if(this.nowPhoneNo){
            nowPhoneNo = $.base64.encode(this.nowPhoneNo)
         } else {
           nowPhoneNo = this.nowPhoneNo
         }
        let getPhoneNoData = new FormData();
        getPhoneNoData.append("phone", nowPhoneNo);
        console.log('2323', nowPhoneNo)
        this.getClientPhoneNoFn({
          getPhoneNoData,
          successCallback: result => {
            // if(result.length != '0'){
            this.phoneListData.length = 0;
            for (let item of result) {
              let phoneDataJson = {
                phoneNewData: item,
                isSelectNowPhoneNo: false
              };
              this.phoneListData.push(phoneDataJson);
            }
            this.phoneListData[0].isSelectNowPhoneNo = true;
            this.sendNowPhoneNo = this.phoneListData[0].phoneNewData;
            //console.log("two========>" + this.phoneListData.length);
            if (this.phoneListData.length == 1) {
              // this.sendNowPhoneNo = this.nowPhoneNo
              this.openContentNote2(this.NotePreviewData);
            } else {
              this.iputPhoneNo();
            }
          },
          failCallback: () => {}
        });
      } else {
        //console.log(this.nowPhoneNo)
        // this.nowPhoneNoTwo = this.nowPhoneNo;
        this.hasPhoneNo = true;
        this.phoneTitle = "系统中没有用户手机号，请输入后发送";
        this.iputPhoneNo();
      }

      // return false
    },
    sendNoteData(NoteDatatDir) {
      this.ylorsend = "1";
      this.NotePreviewData = NoteDatatDir;
      // console.log(this.nowPhoneNo);
      if (
        this.nowPhoneNo != "" &&
        this.nowPhoneNo != undefined &&
        this.nowPhoneNo != null
      ) {
        // this.sendNoteData2(NoteDatatDir);
        this.hasPhoneNo = false;
        this.phoneTitle = "该客户有多个手机号，请选择后发送";
        // this.getPhoenNoFn();

        let nowPhoneNo = ""
        if(this.nowPhoneNo){
          nowPhoneNo = $.base64.encode(this.nowPhoneNo)
        } else {
          nowPhoneNo = this.nowPhoneNo
        }
        let getPhoneNoData = new FormData();
        // getPhoneNoData.append("phone", this.nowPhoneNo);
        getPhoneNoData.append("phone", nowPhoneNo);
        console.log('2323', this.nowPhoneNo)
        this.getClientPhoneNoFn({
          getPhoneNoData,
          successCallback: result => {
            // console.log(result)
            // if(result.length != '0'){
            this.phoneListData.length = 0;
            for (let item of result) {
              let phoneDataJson = {
                phoneNewData: item,
                isSelectNowPhoneNo: false
              };
              this.phoneListData.push(phoneDataJson);
            }
            this.phoneListData[0].isSelectNowPhoneNo = true;
            this.sendNowPhoneNo = this.phoneListData[0].phoneNewData;
            
            if (this.phoneListData.length == 1) {
              this.sendNoteData2(this.NotePreviewData);
            } else {
              this.iputPhoneNo();
            }
          },
          failCallback: () => {}
        });
        // console.log("========>" + this.phoneListData.length);
        // if (this.phoneListData.length == 1 || this.phoneListData.length == 0) {
        //   this.sendNoteData2(this.NotePreviewData);
        // } else {
        //   this.iputPhoneNo();
        // }
      } else {
        // this.nowPhoneNoTwo = this.nowPhoneNo;
        this.hasPhoneNo = true;
        this.phoneTitle = "系统中没有用户手机号，请输入后发送";
        this.iputPhoneNo();
      }

      // return false
    },
    //手机号码校验
    phoneFn(phoneData) {
      let regex = /^1\d{10}$/;
      let resultFlag = true;
      if (!regex.exec(phoneData)) {
        resultFlag = false;
      }
      return resultFlag;
    },
    //填写手机号码提交
    newInputFn() {
      if (
        this.nowPhoneNo == "" ||
        this.nowPhoneNo == undefined ||
        this.nowPhoneNo == null
      ) {
        if (this.newInpurPhone == "") {
          this.$message.error("请输入手机号码！");
          return false;
        }
        if (!this.phoneFn(this.newInpurPhone)) {
          this.$message.error("手机号码格式不对！");
          return false;
        }
        this.sendNowPhoneNo = this.newInpurPhone;
      }

      // this.closeOperation()
      this.idSupernatant = false;
      this.isShowInputPhone = false;
      if (this.ylorsend == "2") {
        this.openContentNote2(this.NotePreviewData);
      } else {
        this.sendNoteData2(this.NotePreviewData);
      }
    },
    //短信显示预览
    openContentNote2(listNoThree) {
      this.previewDisabel = this.isPhoneDisabel;
      this.NotePreviewData = listNoThree;
      listNoThree.type = "1";
      listNoThree = JSON.stringify(listNoThree);
      var showtmData = new FormData();
      showtmData.append("showtmData", listNoThree);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewTitleName = "短信预览";
          // console.log(this.$store.getters.WechatPreviewData);
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.idSupernatant = true;
      this.isPreview = true;
    },
    //微信发送
    sendWechatData(wechataDatatDir) {
      
      // this.tenData = true
      let wechataDatat;
      if (wechataDatatDir == "" || wechataDatatDir == undefined) {
        wechataDatat = this.WechatPreviewData;
      } else {
        wechataDatat = wechataDatatDir;
      }
      wechataDatat.type = "2";
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      wechataDatat.sender = this.userTsrL.TSR_SESSION.tsrno;
      wechataDatat.openid = this.nowOpenIdData;
      wechataDatat.tsrposition = this.userTsrL.TSR_SESSION.tsrposition;
      // tsrname
      // this.routertsrname = ''
      // console.log('this.userTsrL.TSR_SESSION==========', this.userTsrL.TSR_SESSION.tsrname, this.routertsrname)
      wechataDatat.tsrname = this.routertsrname ? this.routertsrname : this.userTsrL.TSR_SESSION.tsrname;
      wechataDatat.hallid = this.hallid;
      wechataDatat = JSON.stringify(wechataDatat);
      var wechataData = new FormData();
      wechataData.append("showtmData", wechataDatat);
      var showtmData = new FormData();
      showtmData.append("showtmData", wechataDatat);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.tempWechat({
        wechataData,
        successCallback: () => {
          // this.tenData = false
          let sendMessageContent = {};
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "1";
          sendMessageContent.imgurl = this.PreviewData.accessimgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        },
        failCallback: midIdData => {
          let sendMessageContent = {};
          sendMessageContent.minIdData = midIdData;
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "-1";
          sendMessageContent.imgurl = this.PreviewData.accessimgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        }
      });
    },
    //10s
    tenMin() {
      if (this.tenData) {
        this.$message.error("消息发送失败，请重新发送！");
        this.isSengContent = false;
      }
    },
    //短信发送
    sendNoteData2(NoteDatatDir) {
      // this.tenData = true
      let NoteDatat;
      if (NoteDatatDir == "" || NoteDatatDir == undefined) {
        NoteDatat = this.NotePreviewData;
      } else {
        NoteDatat = NoteDatatDir;
      }
      NoteDatat.type = "1";
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      NoteDatat.phoneNo = this.sendNowPhoneNo;
      NoteDatat.sender = this.userTsrL.TSR_SESSION.tsrno;
      NoteDatat.openid = this.nowOpenIdData;

      NoteDatat = JSON.stringify(NoteDatat);
      //  console.log(NoteDatat);
      var NoteData = new FormData();
      NoteData.append("showtmData", NoteDatat);
      var showtmData = new FormData();
      showtmData.append("showtmData", NoteDatat);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          // alert(11)
          this.PreviewTitleName = "短信预览";
          this.PreviewData = this.$store.getters.WechatPreviewData;
          //   this.bottomshow()
          //   let sendMessageContent = {}
          // sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno
          // sendMessageContent.userOpenId = this.clientListData[this.selectIndex].OPENID
          // sendMessageContent.isMe = true
          // sendMessageContent.messageType = '1'
          // sendMessageContent.CreateTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
          // sendMessageContent.myImg = ''
          // sendMessageContent.MsgType = '3'
          // sendMessageContent.sendStatus = '1'
          // sendMessageContent.imgurl = this.PreviewData.imgurl
          // sendMessageContent.mainTitle = this.PreviewData.mainTitle
          // sendMessageContent.subTitle = this.PreviewData.subTitle
          // sendMessageContent.moduleName = this.PreviewData.moduleName
          // this.mesageList.push(sendMessageContent)
          // this.messageTypeData = 'news'
        },
        failCallback: () => {}
      });
      // this.isPreview = false;
      this.tempSms({
        NoteData,
        successCallback: isSend => {
          // alert(22)
          // this.tenData = false
          if (isSend.isSend == 1) {
            this.$message.error("短信发送次数已达上限！");
            // sendMessageContent.sendStatus = '-1'
            return false;
          }
          this.bottomshow();
          let sendMessageContent = {};
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "1";
          sendMessageContent.imgurl = this.PreviewData.imgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = isSend.msg;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          sendMessageContent.ToPhone = this.sendNowPhoneNo;
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        },
        failCallback: () => {
          // this.$message.error("短信发送失败！");
          // this.tenData = false
          let sendMessageContent = {};
          sendMessageContent.minIdData = midIdData;
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "-1";
          sendMessageContent.imgurl = this.PreviewData.imgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.ToPhone = this.sendNowPhoneNo;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          // console.log(sendMessageContent)
          this.mesageList.push(sendMessageContent);
          this.messageTypeData = "news";
        }
      });
      // setTimeout(() => {
      //   this.tenMin()
      // }, 10000)
    },
    //名片编辑
    cardRedact() {
      if (this.userTsrL.TSR_SESSION.tsrposition != "TSR") {
        return false;
      }
      // this.tsrCardMessage()
      this.idSupernatant = true;
      this.isMyCard = true;
    },
    //关闭操作
    closeOperation() {
      this.idSupernatant = false;
      this.isMyCard = false;
      this.isPreview = false;
      this.isComeToNothing = false;
      this.isBinding = false;
      this.isShowInputPhone = false;
    },
    //键盘发送
    sendKeydown() {
      if (event.keyCode === 13) {
        if (event.ctrlKey) {
          if (this.chat_textarea == "") {
            return false;
          }
          this.chat_textarea += "\n";
        } else {
          event.returnValue = false;
          if (this.chat_textarea == "") {
            return false;
          }
          // this.contentText = true
          this.sendOperation();
        }
      }
    },
    //发送操作
    sendOperation() {
      this.tenData = true;
      let sendMessageContent = {};
      sendMessageContent.tianjia = true
      sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
      sendMessageContent.userOpenId = this.nowOpenIdData;
      sendMessageContent.isMe = true;
      sendMessageContent.messageType = "1";
      sendMessageContent.CreateTime = formatDate(
        new Date(),
        "yyyy-MM-dd hh:mm:ss"
      );
      sendMessageContent.myImg = "./static/images/bank_icon.png";
      sendMessageContent.MsgType = "1";
      sendMessageContent.send_error = false;
      this.messageTypeData = "text";
      sendMessageContent.sendStatus = "0";
      // sendMessageContent.Content = this.chat_textarea
      sendMessageContent.Content = this.chat_textarea
        .replace(/\[笑脸\]/g, "😄")
        .replace(/\[生病\]/g, "😷")
        .replace(/\[破涕为笑\]/g, "😂")
        .replace(/\[吐舌\]/g, "😝")
        .replace(/\[脸红\]/g, "😳")
        .replace(/\[恐惧\]/g, "😱")
        .replace(/\[失望\]/g, "😔")
        .replace(/\[无语\]/g, "😒")
        .replace(/\[鬼魂\]/g, "👻")
        .replace(/\[合十\]/g, "🙏")
        .replace(/\[强壮\]/g, "💪")
        .replace(/\[庆祝\]/g, "🎉")
        .replace(/\[礼物\]/g, "🎁");
      if (this.chat_textarea == "") {
        //当没有输入消息是打开消息列表
        this.isShowqucikList = !this.isShowqucikList;
        return false;
      }
      this.isSengContent = true;
      //console.log(this.$store.getters.messageData.id);
      sendMessageContent.minIdData = this.$store.getters.messageData.id;
      //console.log(this.$store.getters.messageData.id)
      this.mesageList.push(sendMessageContent);
      // console.log(this.mesageList.length)
      // console.log(sendMessageContent)
      this.bottomshow();
      let sendMessageContentD = JSON.stringify(sendMessageContent);
      var sendMessage = new FormData();
      sendMessage.append("sendMessage", sendMessageContentD);
      // console.log("------------->" + sendMessageContentD);
      this.sendMessageData({
        sendMessage,
        successCallback: () => {
          this.tenData = false;
          // this.mesageList.push(sendMessageContent);
          //console.log(this.mesageList.length);
          //console.log(this.mesageList[this.mesageList.length - 1].sendStatus);
          this.mesageList[this.mesageList.length - 1].sendStatus = 1;
          this.bottomshow();
          this.chat_textarea = "";
          this.isSengContent = false;
        },
        failCallback: () => {
          this.tenData = false;
          // sendMessageContent.minIdData = this.$store.getters.messageData.id;
          // sendMessageContent.sendStatus = "-1";
          this.mesageList[this.mesageList.length - 1].sendStatus = "-1";
          // this.mesageList.push(sendMessageContent);
          //  console.log(this.mesageList);
          this.bottomshow();
          this.chat_textarea = "";
          this.isSengContent = false;
        },
        failCallbackTwo: () => {
          this.tenData = false;
          this.isSengContent = false;
        }
      });
      this.chat_textarea = "";
      setTimeout(() => {
        this.tenMin();
      }, 10000);
      // console.log(this.chat_textarea);
    },
    sethistoryMesageList(index){

    },
    //离线消息
    nothingMessage(index) {
      // console.log(this.mesageList[index])
      this.comeToNothingData = this.mesageList[index].Content;
      this.messageNoList = index;
      this.midId = this.mesageList[index].id;
      if (
        this.mesageList[index].id == undefined ||
        this.mesageList[index].id == "" ||
        this.mesageList[index].id == null
      ) {
        this.midId = this.mesageList[index].minIdData;
      }
      this.idSupernatant = true;
      this.isComeToNothing = true;
    },
    nothingFn() {
      if (this.mesageList[this.messageNoList].MsgType == "1") {
        this.messageTypeData = "text";
      } else {
        this.messageTypeData = "news";
      }
      var toSaveOffData = new FormData();
      toSaveOffData.append("mid", this.midId);
      toSaveOffData.append("mtype", this.messageTypeData);
      this.nothingMessageFn({
        toSaveOffData,
        successCallback: () => {
          this.$message.success("离线消息发送成功！");
        },
        failCallback: () => {
          this.$message.error("离线消息发送失败！");
        }
      });
    },
    //完成绑定
    baindingOver(tsrcodeNo) {
      var tsrcodeData = new FormData();
      tsrcodeData.append("tsrcode", tsrcodeNo);
      // toSaveOffData.append('mtype', this.messageTypeData)
      this.toLogionCkeck({
        tsrcodeData,
        successCallback: () => {
          this.tsrnoBadingData = "工号已经绑定";
          this.$message.success("绑定成功！");
          this.closeOperation();
        },
        failCallback: () => {
          this.$message.error("绑定失败！");
          this.closeOperation();
        }
      });
    },
    //返回按钮
    returnBtn(index) {
      // console.log(index)
      let p = ''
      if(this.clientListData[index].PHONENO){
        p = $.base64.encode(this.clientListData[index].PHONENO)
      } else{
        p = this.clientListData[index].PHONENO
      }
      let returnDxData = new FormData();
      returnDxData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      returnDxData.append("phoneno",  p);
      if (confirm("确认跳转回该客户的电话行销页面？")) {
        this.returnDxFn({
          returnDxData,
          successCallback: customerKey => {
            this.iframeNameData =
               // 生产
              "http://10.4.211.11/WeChatNestPage.html?customerKey=" +
              // uat
              // "http://10.1.118.61/WeChatNestPage.html?customerKey=" +
              customerKey;
          },
          failCallback: () => {}
        });
      }
    },
    //获取更多信息
    getMore() {
      let chat_scroll_height = this.$refs.chat_window_box.scrollHeight;
      // console.log(chat_scroll_height)
      if (this.$refs.chat_window_box.scrollTop == 0) {
        // console.log(this.$refs.chat_window_box.scrollHeight)
        this.mesageList;
        // console.log(this.mesageList[0].id)
        if (this.mesageList.length == 0) {
          return false;
        }
        let nowPhoneNo = ""
        if(this.nowPhoneNo){
          nowPhoneNo = $.base64.encode(this.nowPhoneNo)
        } else {
          nowPhoneNo =this.nowPhoneNo
        }
        let getMoreMessData = new FormData();
        getMoreMessData.append("id", this.mesageList[0].id);
        getMoreMessData.append("openId", this.nowOpenIdData);
        getMoreMessData.append("phoneNo", nowPhoneNo);
        getMoreMessData.append("position", this.position);
        this.getMoreMess({
          getMoreMessData,
          successCallback: () => {
            // alert(this.$store.getters.getMoreMessage.length)
            for ( 
              let i = 0;
              i < this.$store.getters.getMoreMessage.length;
              i++
            ) {
              this.$store.getters.getMoreMessage[i].isMe = "";
              this.$store.getters.getMoreMessage[i].IMGURLNOW = this.imgulrNow;
              if (
                this.$store.getters.getMoreMessage[i].ToUserName ==
                  this.nowOpenIdData ||
                this.$store.getters.getMoreMessage[i].ToUserName ==
                  this.nowPhoneNo
              ) {
                this.$store.getters.getMoreMessage[i].isMe = true;
              }
              if (
                this.$store.getters.getMoreMessage[i].ToPhone != "" &&
                this.$store.getters.getMoreMessage[i].ToPhone != undefined &&
                this.$store.getters.getMoreMessage[i].ToPhone != null
              ) {
                this.$store.getters.getMoreMessage[i].isMe = true;
              }

              // if (
              //   this.mesageList[i].mainTitle != "" &&
              //   this.mesageList[i].mainTitle != undefined &&
              //   this.mesageList[i].mainTitle != null
              // ) {
              //   this.mesageList[i].isMe = true;
              // }
            }
            this.$store.getters.getMoreMessage.reverse();
            // console.log(this.$store.getters.getMoreMessage)
            for (
              let i = 0;
              i < this.$store.getters.getMoreMessage.length;
              i++
            ) {
              this.mesageList.unshift(this.$store.getters.getMoreMessage[i]);
              // console.log('2' + '-' +this.$refs.chat_window_box.scrollHeight)
            }

            // console.log('2' + '-' +this.$refs.chat_window_box.scrollHeight)
            if (this.$store.getters.getMoreMessage.length > 8) {
              //console.log(this.$store.getters.getMoreMessage);
              this.$refs.chat_window_box.scrollTop = 900;
              // this.clickPt()
            }
          },
          failCallback: () => {}
        });
      }
    },
    //显示最底部信息
    bottomshow() {
      let count = 0;
      let interval = setInterval(() => {
        if (count > 200) {
          clearInterval(interval);
        }
        count++;
        if (
          this.$refs.chat_window_box.scrollTop !=
          this.$refs.chat_window_box.scrollHeight
        ) {
          this.$refs.chat_window_box.scrollTop = this.$refs.chat_window_box.scrollHeight;
        }
        if (
          this.$refs.chat_window_box.scrollTop ==
          this.$refs.chat_window_box.scrollHeight
        ) {
          clearInterval(interval);
        }
      }, 0);
    },

    //显示最底部信息
    bottomshowTwo() {
      let count = 0;
      let interval = setInterval(() => {
        if (count > 200) {
          clearInterval(interval);
        }
        count++;
        if (
          this.$refs.chat_window_box_two.scrollTop !=
          this.$refs.chat_window_box_two.scrollHeight
        ) {
          this.$refs.chat_window_box_two.scrollTop = this.$refs.chat_window_box_two.scrollHeight;
        }
        if (
          this.$refs.chat_window_box_two.scrollTop ==
          this.$refs.chat_window_box_two.scrollHeight
        ) {
          clearInterval(interval);
        }
      }, 0);
    },
    //音乐播放
    audioPlay() {
      // alert(this.$refs.palyMuisc);
      this.isPlayiing = true;
      // this.$refs.palyMuisc.palyMuisc
    },
    //输入判定
    isNumberPd(contentData) {
      // alert(111)
      contentData = this.phoneNO.replace(/\D/g, "");
      // console.log(contentData)
      this.phoneNO = contentData;
    }
  },
  watch: {
    mesageList(v){
    if(this.mesageList && this.mesageList.length > 0){
     this.mesageList.forEach((item) => {
        if(item.changesrc){ // 存在属性 赋值
          item.changesrc = item.changesrc
        } else { // 不存在 强制加 上changesrc = false
          item.changesrc = false
        }
        if(item.changesrc2){
          item.changesrc2 = item.changesrc2
        } else {
          item.changesrc2 = false
        }
        if (item.isShield == "Y"){
          item.isShield = item.isShield 
        } else {
          item.isShield = "N"
        }
      })
    }
    }
  }
};
</script>

<style lang="scss">
.hovercolor{
  border-color: #66b1ff !important;
  background-color:#66b1ff !important;
}
.normalbtn{
    background: rgb(201, 201, 201); 
    border:1px solid rgb(201, 201, 201);
    width:52px;
    height:38px;
    padding: 0px;
    margin-left: 0px;
    outline: none;
    color: #fff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    font-size: 14px;
    border-radius: 3px;
}
.chat_select .setbtn{
    width:52px;
    height:38px;
    background:rgba(64,158,254,1);
    border-radius:3px;
    padding: 0px;
    margin-left: 0px;
    // background: #66b1ff;
    // border-color: #66b1ff;
    border:1px solid rgba(64,158,254,1);
    outline: none;
    color: #fff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    font-size: 14px;
    border-radius: 3px;
}
.mysetbtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    background: #d8dce5;
    color: #fff;
    // border: 1px solid #d8dce5;
    text-align: center;
    font-size: 14px;
    // background:rgba(201,201,201,1);
    border-radius:3px;
    background:rgba(64,158,254,1);
    border:1px solid rgba(64,158,254,1);
}
.toast{
    position: absolute;
    width: 178px;
    height: 38px;
    background: black;
    border-radius: 4px;
    opacity: 0.7;
    text-align: center;
    line-height: 38px;
    color: #fff;
    font-size: 14px;
    z-index: 999;
    top: 310px;
    left: 66px;
}
.setdisdel{
    background-color: #409EFF !important;;
    border-color: #409EFF !important;;
}
.setcolor{
  background:#f7f7f7 !important;
  color:#b2b2b2 !important;
}
.setcolor span {
  color:#B2B2B2 !important;
}
.chai_me_text  .chai_time .setimg{
   left: -67px !important;
}

.setimg img{
  width: 23px !important;
  height: 21px !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 15px !important;
}

// .setdisdel{
//     background-color: #409EFF !important;;
//     border-color: #409EFF !important;;
// }
// .setcolor{
//   // background:#f7f7f7 !important;
//   color:#b2b2b2 !important;
// }
// .setcolor span {
//   color:#B2B2B2 !important;
// }
// .chai_me_text  .chai_time .setimg{
//    left: -67px !important;
// }

// .setimg img{
//   width: 23px !important;
//   height: 21px !important;
//   position: absolute !important;
//   bottom: 0 !important;
//   left: 15px !important;
// }
.tip{
  width: 67px;
  height: 21px;
  background: url('../assets/sharp.png');
  background-size: cover;
  font-size: 12px;
  color: #fff;
  text-align: center;
  // sharp.png
}
.setimg{
    position: absolute;
    top: -26px;
    right: -67px;
    width: 67px;
    height: 42px;
    // background: red;
}
.big_img_style {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.86);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  text-align: center;
  padding: 50px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.chat_box {
  width: 1280px;
  // max-width: 1440px;
  margin: 0 auto;
  height: 98vh;
  display: flex;
  display: -webkit-flex;
  min-height: 700px;
  overflow-y: auto;
  .chat_list {
    width: 310px;
    // width: 22%;
    height: 100vh;
    height: 773px;
    overflow: hidden;
    position: relative;
    .chat_list_one {
      width: 100%;
      height: 100%;
      background: #f1f5f8;
    }
    .chat_select {
      height: 190px;
      padding: 20px;
      box-sizing: border-box;
      background: #d0dce5;
      ul li {
        margin-bottom: 13px;
        display: flex;
        justify-content: space-between;
      }
    }
    .clientList {
      height: 580px;
      background: #f1f5f8;
      overflow-x: hidden;
      overflow-y: auto;

      li {
        padding: 20px 15px 10px;
        height: 100px;
        box-sizing: border-box;
        position: relative;
        border-bottom: 1px solid #d8e0e6;
        cursor: pointer;
        background: transparent;

        .clientList_content {
          display: flex;
          position: relative;
          cursor: pointer;
        }
        .portrait_img {
          width: 16%;
          min-width: 60px;
          img {
            width: 56px;
            height: 56px;
            display: block;
          }
        }
        .clientContent {
          width: 84%;
          position: relative;
          line-height: 23px;
          padding-left: 10px;
          box-sizing: border-box;
          p {
            font-size: 16px;
            color: #000;
          }
          p.clientContentTwo {
            color: #aaaaaa;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p.client_time {
            color: #aaaaaa;
            font-size: 14px;
          }
        }
        .clientContent_img {
          position: absolute;
          right: 15px;
          top: 18px;
        }
        .client_data_no {
          position: absolute;
          top: 10px;
          left: 0px;
          width: 35px;
          height: 35px;
          border-radius: 35px;
          background: #fc0000;
          border: 3px solid #fff;
          text-align: center;
          line-height: 31px;
          color: #fff;
          font-size: 18px;
          box-sizing: border-box;
          z-index: 5;
        }
      }
      li.examine {
        background: #fff;
      }
    }
  }
  .chat_content {
    width: 970px;
    height: 773px;
    overflow: hidden;
    background: #f1f5f8;
    .chat_hgroup {
      width: 970px;
      height: 82px;
      background: #509ee2;
      padding: 10px 10px 12px;
      box-sizing: border-box;
      .chat_message_staff {
        display: flex;
        .chat_message_left {
          padding-top: 10px;
          width: 70%;
          // min-width: 660px;
          .chat_list_left {
            display: inline-block;
            transform: scaleY(1.2);
          }
        }
        .chat_message_rihgt {
          width: 30%;
          min-width: 310px;
          display: flex;
          color: #fff;
          p {
            width: 35%;
            padding-top: 20px;
            text-align: center;
            cursor: pointer;
            text-decoration: underline;
          }
          div {
            width: 30%;
            text-align: center;
            img {
              width: 56px;
              height: 56px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .chat_content_dwon {
      width: 970px;
      display: flex;
      display: -webkit-flex;
      height: 690px;
      .chat_interface {
        width: 660px;
        height: 690px;
        background: #ffffff;

        //历史消息列表样式
        .histroy-box {
          position: absolute;
          width: 100%;
          height: 140%;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 8px rgba(1, 8, 11, 0.2);
          z-index: 9;
          left: 0px;
          top: 0px;
          .chat_message_list {
            height: 600px;
          }
          .hb-header {
            display: flex;
            .hb-header-list {
              width: 50%;
              height: 64px;
              cursor: pointer;
              border-bottom: 1px solid rgba(1, 8, 11, 0.2);
              display: flex;
              justify-content: center;
              box-sizing: border-box;
              padding: 14px 0;
              line-height: 32px;
              .hb-header-list-div {
                img {
                  width: 32px;
                  height: 32px;
                  display: block;
                }
              }
              p {
                margin-left: 12px;
                font-size: 24px;
                font-family: Adobe Heiti Std R;
                font-weight: normal;
                color: rgba(3, 153, 218, 1);
              }
            }
            .hb-header-select {
              background: rgba(241, 245, 248, 1);
            }
            .hb-header-list:first-child {
              border-right: 1px solid rgba(1, 8, 11, 0.2);
            }
          }
          .close-icon-btn {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 30px;
            cursor: pointer;
            img {
              width: 30px;
              height: 30px;
              display: block;
            }
          }
          // .chai_time{
          //   left: auto!important;
          //   right: 66px!important;
          // }
        }

        .chat_window_title {
          height: 65px;
          padding: 20px 15px 15px;
          box-sizing: border-box;
          border-bottom: 1px solid #d7dfe6;
          display: flex;
          .chat_window_name {
            width: 85%;
            font-size: 20px;
            color: #509ee2;
          }
          .chat_window_close {
            width: 5%;
            display: flex;
            line-height: 29px;
            cursor: pointer;
            div {
              width: 25%;
              padding-top: 3px;
              img {
                width: 26px;
                height: 26px;
              }
            }
          }
        }
        .chat_message_list {
          height: 385px;
          padding: 0 10px;
          box-sizing: border-box;
          overflow-y: auto;
          border-bottom: 1px solid #d7dfe6;
          li {
            margin: 30px 0;
            .chat_message_text {
              position: relative;
              width: 550px;
              display: flex;
              .text_content_box {
                max-width: 400px;
                position: relative;
                margin-top: 20px; //new
              }
              .chai_time {
                color: #999;
                font-size: 14px;
                position: absolute;
                left: 66px;
              }
              .chat_images {
                width: 56px;
                height: 56px;
                img {
                  width: 56px;
                  height: 56px;
                  display: block;
                }
              }
              .chai_text_data {
                word-wrap: break-word;
                padding: 10px;
                margin-left: 10px;
                background: #509ee2;
                color: #fff;
                border-radius: 7px;
                // margin-top: 20px;
                .imgContent {
                  img {
                    max-width: 300px;
                    max-height: 300px;
                  }
                  .audio_music {
                    width: 300px !important;
                  }
                }
              }
              .chai_text_data_1 {
                word-wrap: break-word;
                padding: 10px;
                margin-left: 10px;
                background: #a60a11;
                color: #fff;
                border-radius: 7px;
                margin-top: 20px;
                .imgContent {
                  img {
                    max-width: 300px;
                    max-height: 300px;
                  }
                  .audio_music {
                    width: 300px !important;
                  }
                }
              }
            }
            .text_content_box{
              .send_sb {
                  position: absolute;
                  right: -34px;
                  top: 20px;
                  // padding: 20px 10px 0 0;
                  box-sizing: border-box;
                  div {
                    width: 20px;
                    height: 20px;
                    background: red;
                    color: #fff;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 30px;
                    cursor: pointer;
                  }
                  img {
                    width: 30px;
                    height: 30px;
                    animation: loadingAni 1s linear;
                  }
                }
            }
            .chai_me_text {
              display: flex;
              justify-content: flex-end;
              position: relative;
              .chai_time {
                color: #999;
                font-size: 14px;
                position: absolute;
                right: 66px;
              }
              .chai_me_text_data {
                width: 550px;
                display: flex;
                justify-content: flex-end;
                margin-top: 20px;
                .text_content_box {
                  max-width: 400px;
                }
                .send_sb {
                  padding: 20px 10px 0 0;
                  box-sizing: border-box;
                  div {
                    width: 20px;
                    height: 20px;
                    background: red;
                    color: #fff;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 30px;
                    cursor: pointer;
                  }
                  img {
                    width: 30px;
                    height: 30px;
                    animation: loadingAni 1s linear;
                  }
                }
                .chai_text_data_me {
                  word-wrap: break-word;
                  padding: 10px;
                  margin-right: 10px;
                  background: #f1f5f8;
                  color: #000;
                  border-radius: 7px;
                  // margin-top: 20px;
                  .myCardStyle {
                    .myCardStyleTop {
                      display: flex;
                      padding-bottom: 10px;
                      .myCardStyleTopOne {
                        width: 75px;
                        img {
                          width: 56px;
                          height: 56px;
                          display: block;
                        }
                      }
                      .myCardStyleTopTwo {
                        width: 200px;
                        p {
                          width: 200px;
                          line-height: 28px;
                          font-size: 18px;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        }
                        p:last-child {
                          width: 200px;
                          line-height: 28px;
                          font-size: 16px;
                        }
                      }
                    }
                    .myCardStyleDwon {
                      font-size: 14px;
                      color: #8a8989;
                      padding-top: 10px;
                      border-top: 1px solid #8a8989;
                    }
                  }
                }
                .chat_images {
                  width: 56px;
                  img {
                    width: 56px;
                    height: 56px;
                    display: block;
                  }
                }
              }
            }
          }
        }
        .chat_input {
          width: 660px;
          height: 130px;
          // min-height: 232px;
          box-sizing: border-box;
          position: relative;
          .chat_input_box {
            width: 660px;
            height: 130px;
            .reply_box {
              padding: 10px 20px 5px;
              display: flex;
              .quick_emjio {
                width: 40px;
                img {
                  display: block;
                  width: 24px;
                }
              }
              .input_reply_message {
                img {
                  display: block;
                  width: 24px;
                }
              }
            }
          }
          .chat_star {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            text-align: center;
            button {
              float: none;
              margin-top: 30px;
            }
          }
          .el-textarea__inner {
            border: none;
            outline: 0px;
            resize: none;
            font-size: 16px;
          }
          button {
            float: right;
            font-size: 20px;
            margin-right: 15px;
          }
          .qucik-box {
            width: 490px;
            height: 220px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 1px 0px 5px rgba(1, 8, 11, 0.2);
            position: absolute;
            left: 3px;
            top: -225px;
            padding: 10px 14px 13px;
            box-sizing: border-box;
            .qucik-one {
              display: flex;
              line-height: 26px;
              p {
                font-size: 16px;
                font-family: Adobe Heiti Std R;
                font-weight: normal;
                color: rgba(51, 51, 51, 1);
              }
              .el-select {
                width: 68px;
                margin-left: 68px;
                .el-input__inner {
                  line-height: 26px;
                  height: 26px;
                }
              }
            }
            .el-textarea {
              margin-top: 16px;
              textarea {
                padding: 0;
                width: 462px;
                height: 96px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(142, 148, 157, 1);
                padding: 10px;
                box-sizing: border-box;
              }
            }
            button {
              margin: 14px auto;
              float: none;
              display: block;
              width: 69px;
              height: 36px;
              border-radius: 4px;
              font-size: 14px;
              padding: 0;
            }
            .cose_btn {
              position: absolute;
              width: 25px;
              right: 8px;
              top: 8px;
              cursor: pointer;
              img {
                width: 100%;
                height: 25px;
                display: block;
              }
            }
          }
          // 快捷回复列表样式
          .qucik-list {
            position: absolute;
            bottom: 0;
            right: -300px;
            width: 300px;
            height: 302px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(142, 148, 157, 1);
            overflow-y: auto;
            box-sizing: border-box;
            z-index: 10;
            ul {
              li {
                line-height: 30px;
                padding: 0 16px;
                p {
                  width: 100%;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              li:hover {
                background: rgba(241, 245, 248, 1);
                cursor: pointer;
              }
            }
          }
        }
      }
      .chat_message {
        width: 310px;
        height: 700px;
        background: #f1f5f8;
        //  overflow-y: scroll;
        //  overflow-x: hidden;
      }
    }
  }
  .supernatant_bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.86);
    left: 0;
    top: 0;
    z-index: 999;
  }
  .preview_send {
    text-align: center;
    margin-top: 77px;
  }
  .qiantao {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0;
    left: 0;
    visibility: hidden;
    iframe {
      width: 10px;
      height: 10px;
    }
  }
  .input_text {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
}
.clickMessage {
  display: flex;
}

@keyframes loadingAni {
  0%,
  100% {
    transform: scaleZ(0deg);
  }
  50% {
    transform: scaleZ(360deg);
  }
}
.download-icon:hover {
  cursor: pointer;
}
.input-phone {
  margin: 13% auto 20px;
  width: 580px;
  padding-bottom: 48px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  position: relative;
  .new-close-style {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .new-tips-style {
    width: 75px;
    margin: 0px auto;
    padding: 30px 0;
  }
  .new-tips-content {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .new-input-phone {
    width: 270px;
    margin: 30px auto 0;
    input {
      text-align: center;
    }
  }
  .new-input-btn {
    width: 270px;
    margin: 24px auto 0;
    button {
      width: 100%;
    }
  }
}
.new-phone-list {
  li {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }
  .new-phone-select {
    width: 22px;
    height: 22px;
    border: 2px solid rgba(80, 158, 226, 1);
    border-radius: 50%;
    box-sizing: border-box;
    padding: 5px;
    .new-phone-icon {
      width: 8px;
      height: 8px;
      background: rgba(80, 158, 226, 1);
      border-radius: 50%;
    }
  }
  .new-phone-number {
    line-height: 22px;
    margin-left: 12px;
    font-size: 20px;
    color: #333;
  }
}

.myCardStyle {
  .myCardStyleTop {
    display: flex;
    padding-bottom: 10px;
    .myCardStyleTopOne {
      width: 75px;
      img {
        width: 56px;
        height: 56px;
        display: block;
      }
    }
    .myCardStyleTopTwo {
      width: 200px;
      p {
        width: 200px;
        line-height: 28px;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p:last-child {
        width: 200px;
        line-height: 28px;
        font-size: 16px;
      }
    }
  }
  .myCardStyleDwon {
    font-size: 14px;
    color: #8a8989;
    padding-top: 10px;
    border-top: 1px solid #8a8989;
  }
}

.histroy-box {
  .chat_message_list {
    .listpt {
      li {
        .chat_message_text {
          .text_content_box {
            .chai_text_data {
              background: rgba(241, 245, 248, 1) !important;
              color: rgba(51, 51, 51, 1) !important;
            }
          }
        }
      }
    }
  }
}
.emotion_style {
  position: absolute;
  left: 0;
  top: -300px;
  height: 290px;
  width: 400px;
  background: #fff;
}
.histroy-box .chat_message_list .listpt li .chat_message_text .text_content_box .setcolor {
  background:#f7f7f7 !important;
  color:#B2B2B2 !important;
}
.imgdown{
      width: 102px;
    height: 34px;
    background: rgba(64,158,254,1);
    border-radius: 3px;
    font-size: 16px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    // left: 50%;
   transform: translateX(-50%); 
   bottom:-64px;
   left:50%;
}
</style>


