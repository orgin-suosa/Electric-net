// export function toMoney(money = 0) {

//     return money.toFixed(2);
// }

export function toPhone(phoneNo, hallid) {
    console.log('mmmmmmm', hallid)
    let newphoneNo = phoneNo;
    if (!newphoneNo){
        return
    }
    if (hallid == 3){
        newphoneNo = newphoneNo.substring(0, 3) + "********";
    } else {
        newphoneNo = newphoneNo.substring(0, 3) + "*****" + newphoneNo.substring(8, 11);
    }
    // chencao 的需求
    // newphoneNo = newphoneNo.substring(0, 3) + "*****" + newphoneNo.substring(8, 11);
    return newphoneNo;
}