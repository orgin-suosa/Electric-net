<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./style/reset.scss";
// @import "/static/fonts/iconfont.css";
body{

  min-height: 700px;
	width: 100%;
	overflow-x: auto;
	background: url("../static/images/loginbg.jpg") no-repeat;
  background-size: 100% 100%;
	height: 100vh;
}
#app{
  width: 100%;
  height: 100%;

}
// .el-checkbox__inner{
//   width: 26px!important;
//   height: 26px!important;
// }
// .el-checkbox__inner::after{
//   height: 17px!important;
//   left: 7px!important;
//   top: 0px!important;
//   width: 10px!important;
// }
.el-tag{
  margin: 5px!important;
  font-size: 16px!important;
  padding: 0 16px!important;
  background: #fff!important;
  border-color: #67c23a!important;
}

	/*公共样式*/

	.of-header {
		box-sizing: border-box;
		height: 80px;
		width: 100%;
		background: #eee;
		padding: 22px 30px 0;
		font-size: 0;
		span {
			font-size: 16px;
			margin-right: 10px;
		}
		.of-header-title {
			font-size: 18px;
			font-weight: bold;
			margin-right: 20px;
		}
	}

	.of-select {
		box-sizing: border-box;
		height: 80px;
		width: 100%;
		padding: 22px 12px 0;
		font-size: 0;
		span {
			font-size: 16px;
			margin: 0 5px 0;
		}
		.search {
			width: 200px;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			display: inline-block;
			font-size: 14px;
			height: 36px;
			line-height: 1;
			outline: none;
			padding: 3px 10px;
		}
		.el-select {
			width: 100px;
		}
		.btn_select {
			margin-left: 10px;
		}
	}

	.input_text {
		width: 25px;
		height: 25px;
		text-align: center;
		border-radius: 3px;
		-webkit-border-radius: 3px;
	}

	.btn-xinjian {
		text-align: center;
		height: 80px;
		line-height: 80px;
	}
	.el-carousel__button{
			width: 5px!important;
			height: 5px!important;
			border-radius: 50%!important;
		}
.el-table__body-wrapper {
    overflow: auto;
    position: relative;
    max-height: 40vh;
}
.mc_main_title{
	text-decoration: underline;
    color: #419eff;
    cursor: pointer;
}
input[type='number'] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #CACACA !important;
	}

	 :-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #CACACA !important;
	}

	 ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #CACACA !important;
	}

	 :-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #CACACA !important;
	}
	.el-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
}
.chat_box .chat_content .chat_content_dwon .chat_interface .chat_input .el-textarea__inner {
    border: none;
    outline: 0px;
    resize: none;
    font-size: 16px;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    color: #5a5e66;
    background-color: #fff;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>
