<template>
  <div id="box" class="text-box">
    <div v-html="text"></div>
    <!-- 上海市商务委主任、进博会城市服务保障领导小组办公室常务副主任朱民7月24日在第七届中国国际进口博览会新闻通气会上表示，今年上半年，上海新设外资企业3007家，同比增长18.3%。全市新认定跨国公司地区总部29家、外资研发中心14家，分别累计认定985家、575家。（来源：上证报） -->
  </div>
  <button @click="handleClick">截图</button>
  <img :src="src" alt="" />
</template>

<script setup lang="ts">
  import html2canvas from 'html2canvas'

  const src = ref('')

  let text =
    '<p style=\\"text-align: left;\\"><span style=\\"font-family: 宋体; font-size: 12.0000pt;\\">上海市商务委主任、进博会城市服务保障领导小组办公室常务副主任朱民7月24日在第七届中国国际进口博览会新闻通气会上表示，今年上半年，上海新设外资企业3007家，同比增长18.3%。全市新认定跨国公司地区总部29家、外资研发中心14家，分别累计认定985家、575家。（来源：上证报）</span></p >'

  const handleClick = async () => {
    const element = document.getElementById('box')
    if (!element) return
    const canvas = await html2canvas(element, {
      backgroundcolor: '#fff', //画布背景色(如果未在DOM中指定)。设置nu11为透明
      useCoRs: true, //允许跨域
      scale: 1, // 用于渲染的比例
    })
    src.value = canvas.toDataURL('image/png')
  }
</script>

<style>
  .text-box {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    text-align: left;
    word-break: break-all;
  }
  .text-box div {
    padding: 0 10px;
  }
</style>
