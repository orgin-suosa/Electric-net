
export default {
    // // 身份证校验
    // codeCrad: (result) => {
    //     let code = result
    //     let resultFlag = true
    //     let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    //     if (code.length == 18) {
    //         if (!city[code.substr(0, 2)]) {
    //             resultFlag = false;
    //             return;
    //         }
    //         //18位身份证需要验证最后一位校验位
    //         if (code.length == 18) {
    //             if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    //                 resultFlag = false;
    //                 return;
    //             }
    //             code = code.split('');
    //             //∑(ai?¨￠Wi)(mod 11)
    //             //加权因子
    //             var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //             //校验位
    //             var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    //             var sum = 0;
    //             var ai = 0;
    //             var wi = 0;
    //             for (var i = 0; i < 17; i++) {
    //                 ai = code[i];
    //                 wi = factor[i];
    //                 sum += ai * wi;
    //             }
    //             var last = parity[sum % 11];
    //             if (parity[sum % 11] != code[17]) {
    //                 resultFlag = false;
    //             }
    //         }
    //     } else {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // // 邮编校验
    // zipFn: (zipData) => {
    //     let regex = /^[0-9]{6}$/;
    //     let resultFlag = true
    //     if (!regex.exec(zipData)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // //邮箱校验
    // emailFn: (emailData) => {
    //     let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
    //     let resultFlag = true
    //     if (!regex.exec(emailData)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // //手机号码校验
    // phoneFn: (phoneData) => {
    //     let regex = /^1\d{10}$/;
    //     let resultFlag = true
    //     if (!regex.exec(phoneData)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // //验证码校验
    // VcCode: (VcCodeData) => {
    //     let regex = /^(?![0-9]+$)[a-zA-Z_]+[0-9A-Za-z]{4,30}$/;
    //     let resultFlag = true
    //     if (!regex.exec(VcCodeData)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // //校验只让输入正整数
    // IntegerFn:(text) => {
    //     let reg = /^\d*[1-9]{1,}\d*$/;
    //     let resultFlag = true
    //     if (!reg.exec(text)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // },
    // //校验只银行卡
    // payCardFn: (cardData) => {
    //     let reg2 = /^([0-9]{1,19})?$/;
    //     let resultFlag = true
    //     if (!reg2.test(cardData)) {
    //         resultFlag = false;
    //     }
    //     return resultFlag;
    // }

}