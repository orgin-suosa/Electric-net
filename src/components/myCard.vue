<template>
	<div class="bc-box">
		<el-row>
			<el-col :span="16">
				<header class="of-header">
					<span class="of-header-title">编辑列表</span>
				</header>
				<div class="of-select">
					<span>模块</span>
					<el-select v-model="valueSelectOne" placeholder="请选择" @change="valueSelectData(valueSelectOne)">
						<el-option v-for="item in cardDataList.MODELIST" :key="item.ID" :label="item.NAME" :value="item.ID">
						</el-option>
					</el-select>
					<span>标题</span>
					<el-select v-model="valueSelectTwo" placeholder="请选择" @change="valueSelectDataTwo(valueSelectTwo)">
						<el-option v-for="item in optionsTwo" :key="item.TITLEIDTWO" :label="item.TEXTTITLE" :value="item.TITLEIDTWO">
						</el-option>
					</el-select>
					<el-button type="primary" class="btn_select" @click="addContent()">添加</el-button>
					<el-button type="primary" class="btn_select" @click="selectPtImg()" :disabled="isDisabledImg">{{ ptContentImg }}</el-button>
				</div>
				<div>

					<el-table :data="cardDataList.TEXTLIST" border style="width: 100%">
						<el-table-column label="已选内容">
							<el-table-column label="＃" width="100">
								<template slot-scope="scope">
									<input class="input_text" :value="ListIndex(scope.$index)" disabled="disabled" />
									<!--<p v-model="ListIndex(scope.$index)"></p>-->
								</template>
							</el-table-column>
							<el-table-column prop="MODEL" label="模块" min-width="100">
							</el-table-column>
							<el-table-column prop="SLUG" label="内容名称" min-width="100">
							</el-table-column>
							<el-table-column label="" min-width="150">
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="toTop(scope.$index, cardDataList.TEXTLIST)" :disabled="isDisabled">上移</el-button>
									<el-button size="mini" type="primary" @click="toDwon(scope.$index, cardDataList.TEXTLIST)">下移</el-button>
									<el-button size="mini" type="danger" @click="deleteRow(scope.$index, cardDataList.TEXTLIST)">删除</el-button>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
				</div>
				<div class="btn-xinjian">
					<el-button size="small" type="primary" @click="restore()">还原</el-button>
					<el-button size="small" type="primary" @click="saveNew()">保存</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<div>
					<header class="of-header">
						<span class="of-header-title">名片预览</span>
					</header>
					<div class="visiting_card_style">
						<div class="card_style_box">
							<div class="card_name">
								<p class="card_name_font">{{ Ctsrname }}</p>
								<div class="card_name_content">
									<div>
										<img src="static/images/headPortrait.jpg" v-if="isMrImg"/>
										<img :src="'/tpdwt_web/getFile.html?filePath='+Caccessphotourl" v-else/>
									</div>
									<p>{{ Ctsrname }}</p>
									<p>太平顾问 &nbsp;|&nbsp; 工号:{{ Ctsrno }}</p>
								</div>
							</div>
							<div class="banner_box">
								<div class="banner_box_img">
									<div class="block">
										<el-carousel height="120px">
											<el-carousel-item v-for="(item, index) in imgList" :key="index">
												<img :src="'/tpdwt_web/getFile.html?filePath='+item.ACCESSIMGURL" class="banner_img" />
											</el-carousel-item>
										</el-carousel>
									</div>
								</div>
								<ul class="list_content">
									<li class="list_content_li" v-for="(item, index) in listData" :key="index">
										<div class="list_left">
											<p>{{ item.TITLE }}</p>
											<p>{{ item.SUBTITLE }}</p>
										</div>
										<div class="list_right">
											<img :src="'/tpdwt_web/getFile.html?filePath='+item.ACCESSIMGURL" />
										</div>
									</li>
								</ul>
							</div>
							<div class="footer">
								<div class="footer_content">
									<p>推荐给好友</p>
									<p>预约回电</p>
								</div>

							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
        <div class="close_icon">
            <i class="iconfont icon-guanbi" @click="closeWindow"></i>
        </div>
	</div>
</template>

<script>
import * as types from '../store/types.js'
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				imgList: [],
				saveIndex: 2,
				ptContentImg: '使用上传头像',
				isMrImg: true,
				addOne: '',
				saveDisabled: true,
				isDisabledImg: true,
				addTwo: '',
				addressUrl: '',
				unionId: '',
				objImg: '', //图片路径
				unused: '', //UNUSED
				subtitle: '', //SUBTITLE
				isDisabled: false,
				accessimgUrl: '',
				Ctsrname:'',
				Ctsrno:'',
				f_photourl_is_default: '',
				Caccessphotourl: '',
				optionsOne: [{
					ID: '',
					NAME: '全部'
				}],
				optionsTwo: [],
				valueSelectOne: '', //选择的内容
				valueSelectTwo: '', //选择的内容
				tableData3: [],
				cardDataList: '',
				listData: [{
					TEXTTITLE: '买保险应该先买什么？',
					SUBTITLE: '到底是买保险还是买银行储蓄？年年利滚利教你小诀窍。',
					IMGURL: 'static/images/list_img.jpg'
				},
//				{
//					listName: '买保险应该先买什么？',
//					listContent: '到底是买保险还是买银行储蓄？年年利滚利教你小诀窍。',
//					listImg: 'static/images/list_img.jpg'
//				},
//				{
//					listName: '买保险应该先买什么？',
//					listContent: '到底是买保险还是买银行储蓄？年年利滚利教你小诀窍。',
//					listImg: 'static/images/list_img.jpg'
//				}
				]
			}

		},
		// props: ['cardDataList'],
		mounted () {
			this.tsrCardMessage()
			// this.tableData3 = this.$store.getters.cardData
			// this.businessList({
			// 		successCallback: () => {
						// this.optionsOne=this.cardDataList.MODELIST
			// 			this.tableData3.push(...this.$store.getters.textListData);
			// 		},
			// 		failCallback: () => {

			// 		}
			// 	})
			// this.mpStyle()
		},
		// mounthd() {

		// },
		methods: {
			...mapActions({
			// 	businessList:'BUSINESS_LIST',
				titleListData:types.TITLELISTDATA,
				saveListData:types.SAVELISTDATA,
				restorData:types.RESTORDATA,
				clientCompile: types.CLIENT_COMPILE,
				pisDefault: types.PISDEFAULT,
			}),
			//切换头像函数
			selectPtImg() {
				if(this.ptContentImg == '使用上传头像'){
					this.isMrImg = false
					this.ptContentImg = '使用默认头像'
					this.f_photourl_is_default = '1'
				}else {
					this.isMrImg = true
					this.ptContentImg = '使用上传头像'
					this.f_photourl_is_default = '0'
				}
				//console.log(this.f_photourl_is_default)
				let userTsr = JSON.parse(window.localStorage.getItem('userTsr'))
				let tsrno = userTsr.TSR_SESSION.tsrno
				var pisDefaultData = new FormData()
					pisDefaultData.append('p_is_default', this.f_photourl_is_default)
					pisDefaultData.append('tsrcard', tsrno)
				this.pisDefault({
					pisDefaultData,
					successCallback: () => {
					},
					failCallback: () => {
					}
				})
			},
			tsrCardMessage() {
				let userTsr = JSON.parse(window.localStorage.getItem('userTsr'))
				let tsrno = userTsr.TSR_SESSION.tsrno
				// console.log(tsrno)
				var tsrcardData = new FormData()
					tsrcardData.append('tsrcard', tsrno)
					this.clientCompile({
					tsrcardData,
					successCallback: () => {
						this.cardDataList = this.$store.getters.cardData
						//console.log(this.cardDataList)
						this.Ctsrname = this.cardDataList.tsrInfo.tsrname
						this.Ctsrno = this.cardDataList.tsrInfo.tsrno
						this.Caccessphotourl = this.cardDataList.tsrInfo.accessphotourl
						if(this.cardDataList.tsrInfo.accessphotourl != '' && this.cardDataList.tsrInfo.accessphotourl != null && this.cardDataList.tsrInfo.accessphotourl != undefined){
							this.isDisabledImg = false
						}
					//	console.log(this.cardDataList.tsrInfo.f_photourl_is_default)
						if (this.cardDataList.tsrInfo.f_photourl_is_default == '0'){
							this.isMrImg = true
							this.ptContentImg = '使用上传头像'
						}else{
							this.isMrImg = false
							this.ptContentImg = '使用默认头像'
						}
						this.mpStyle()
					},
					failCallback: () => {
					}
					})
			},
			deleteRow(index, rows) {
				rows.splice(index, 1)
				this.mpStyle()
			},
			toDwon(index, rows) {
				let numOne = index
				let num = numOne + 2
				let rowsData = rows[index]
				rows.splice(num, 0, rowsData)
				rows.splice(index, 1)
				this.mpStyle()
			},
			toTop(index, rows) {
				if (index != 0){
					let numOne = index
					let numTwo = index + 1
					let num = numOne - 1
					let rowsData = rows[index]
					rows.splice(num, 0, rowsData)
					rows.splice(numTwo, 1)
					this.mpStyle()
				}

			},
			//名片样式
			mpStyle(indexData) {
				this.tableData3 = this.cardDataList.TEXTLIST
				this.imgList.length = 0
				for (let i = 0;i < 4 && i < this.tableData3.length; i++){
					this.imgList.push(this.tableData3[i])
				}
				this.listData = []
				for (let i = 4;i < 7 && i< this.tableData3.length; i++){
					this.listData.push(this.tableData3[i])
				}
        console.log(this.listData);
			},
			//添加
			addContent() {

				let addArr = {}
				if (this.valueSelectOne == '' || this.valueSelectTwo == ''){
					return false
				}
				if (this.cardDataList.TEXTLIST.length > 6){
					this.$message.error('信息最多为7条！');
					return false
				}
				let num = this.cardDataList.TEXTLIST.length
				num++
				addArr = {
					MODEL: this.addOne,
          // TITLE: this.addTwo,
          SLUG: this.addTwo,
					ID: num,
					IMGURL: this.objImg,
					SUBTITLE: this.subtitle,
					UNIONID: this.unionid,
					URL: this.addressUrl,
					UNIONID: this.unionId,
					ACCESSIMGURL: this.accessimgUrl,
				}
				this.cardDataList.TEXTLIST.push(addArr)
				this.mpStyle()
			},
			//还原
			restore() {
				this.valueSelectOne = ''
				this.valueSelectTwo = ''
				this.optionsTwo.length = 0
				this.cardDataList.length = 0
				this.tsrCardMessage()
				// this.restorData({
				// 	successCallback: () => {
				// 		this.cardDataList.TEXTLIST = this.$store.getters.cardDataListData
						this.$message.success('还原成功');
				// 	},
				// 	failCallback: () => {
				// 		this.$message.error('err');
				// 	}
				// })
				// this.mpStyle()
			},
			//保存
			saveNew() {
				let saveListData = this.cardDataList.TEXTLIST

				let arrId = []
					for (let i= 0; i < saveListData.length; i ++){
						arrId.push(saveListData[i].UNIONID)
					}
				if (saveListData.length < 7){
					this.$message.error('信息必须为7条！');
					return false
				}
					saveListData = JSON.stringify(arrId)
					// console.log(saveListData)
//				let saveList = this.tableData3
				var saveList = new FormData()
					saveList.append('savelist', saveListData)
				this.saveListData({
					saveList,
					successCallback: () => {
						this.$message.success('保存成功！');
					},
					failCallback: () => {
						this.$message.error('err');
					}
				})
			},
			valueSelectDataTwo(value) {
				let obj = {}
				obj = this.optionsTwo.find((item) => {
					return item.TITLEIDTWO ===value
				})
				// console.log(obj)
				this.objImg = obj.IMGURL
				this.addTwo = obj.TEXTTITLE
				this.subtitle = obj.SUBTITLE
				this.unionid = obj.UNIONID
				this.addressUrl = obj.URL
				this.unionId = obj.UNIONID
				this.accessimgUrl = obj.ACCESSIMGURL
			},
			valueSelectData(value) {
				let obj = {}
				obj = this.cardDataList.MODELIST.find((item) => {
					return item.ID ===value
				})
				this.addOne = obj.NAME
				var ValueData = new FormData()
				ValueData.append('id', this.valueSelectOne)
				this.titleListData({
					ValueData,
					successCallback: () => {
						this.optionsTwo = []
						this.valueSelectTwo = ''

						this.optionsTwo.push(...this.$store.getters.cardDataList);
						for (let i = 0; i < this.$store.getters.cardDataList.length; i ++){
							let num = i
							num ++
							// console.log(num)
							// this.optionsTwo.push(this.$store.getters.cardDataList[i]);
							// this.optionsTwo[i].TEXTTITLE = this.$store.getters.cardDataList[i].TEXTTITLE
							this.optionsTwo[i].TITLEIDTWO = num
						}
						// console.log(this.optionsTwo)
						// this.optionsTwo = this.$store.getters.cardDataList;
					},
					failCallback: () => {
						//console('无数据')
					}
				})
			},
			ListIndex (value) {
		    		value++;
		    		this.saveIndex = value
		      return value
		    },
            closeWindow () {
                this.$emit('fetch')
            }
		},
	}
</script>

<style lang="scss" scoped="scoped">
.bc-box {
  width: 90%;
  height: 80%;
  background: #fff;
  margin: 7% auto;
  position: relative;
}
.el-row {
  height: 100%;
  .el-col-16 {
    border-right: 1px solid #e6ebf5;
  }
}

.of-select .el-select {
  width: auto;
}

.of-header {
  border-left: 1px solid #fff;
}

.visiting_card_style {
  width: 340px;
  height: 500px;
  margin: 10px auto 0;
  background: #f1f1f1;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  .card_style_box {
    min-height: 550px;
    position: relative;
  }
  .card_name {
    width: 100%;
    height: 150px;
    background: #f7fef0;
    position: relative;
    .card_name_font {
      font-size: 80px;
      text-align: center;
      line-height: 150px;
      color: #a0cb7c;
      /*font-family: ;*/
    }
    .card_name_content {
      width: 100%;
      height: 150px;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      text-align: center;
      color: #fff;
      box-sizing: border-box;
      div {
        width: 65px;
        height: 65px;
        border: 2px solid #fff;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        margin: 10px auto;
        overflow: hidden;
        img {
          width: 65px;
          height: 65px;
          display: block;
        }
      }
      p {
        margin: 5px auto;
      }
    }
  }
}

.banner_box {
  .banner_box_img {
    width: 95%;
    padding: 5px;
    margin: 5px auto;
    box-sizing: border-box;
    background: #fff;
  }
  .banner_img {
    width: 100%;
  }
}

.list_content {
  width: 95%;
  background: #fff;
  margin: 5px auto;
  .list_content_li {
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #eee;
    padding: 7px;
    box-sizing: border-box;
    .list_left {
      width: 80%;
      color: #333333;
      p:last-child {
        font-size: 12px;
        margin-top: 3px;
        color: #999999;
      }
    }
    .list_right {
      width: 20%;
      img {
        width: 62px;
        height: 62px;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 60px;
  .footer_content {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    p {
      width: 50%;
      text-align: center;
      color: #fff;
      background: #4ccf9f;
    }
    p:last-child {
      background: #fe6e4c;
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
</style>
