<template>
  <div class="ly-emotion" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ly-emotion',
  mounted () {
    const name = this.$el.innerHTML
    // const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
    const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '囧', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '可怜', '菜刀', '西瓜', '啤酒', '咖啡', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '炸弹', '便便', '月亮', '太阳', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', 'OK', '跳跳', '发抖', '怄火', '转圈', '笑脸', '生病', '破涕为笑', '吐舌', '脸红', '恐惧', '失望', '无语', '嘿哈', '捂脸','奸笑','机智','皱眉','耶','鬼魂','合十','强壮','庆祝','礼物','红包','發','小狗']
    let index = list.indexOf(name)
    let imgHTML = `<img src="./static/images/emotion/${index}.png" alt="${name}" width="24px">`
    this.$nextTick(() => {
      this.$el.innerHTML = imgHTML
    })
  },
}
</script>
<style scoped>
.ly-emotion {
  display: inline-block
}
.ly-static-emotion {
  width: 24px;
  height: 24px;
  display: inline-block;
}
.ly-emotion img{
  width: 24px;
  height: 24px;
}
</style>
