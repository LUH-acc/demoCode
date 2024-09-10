<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-left"> {{ currentYear }}年{{ currentMonth + 1 }}月 </div>

      <div class="calendar-header-right">
        <span class="prev" @click="prevMonth">上一月</span>
        <span class="next" @click="nextMonth">下一月</span>
      </div>
    </div>

    <div class="calendar-body">
      <div class="week-name">
        <div class="week-cell" v-for="item in weekList" :key="item"> {{ item }}</div>
      </div>
      <div class="date-name">
        <div class="date-cell" v-for="(item, index) in daysList" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const weekList = ['日', '一', '二', '三', '四', '五', '六']
  const weekLen = 7
  const currentYear = ref<number>(0)
  const currentMonth = ref<number>(0)
  const currentMonthList = ref<number[]>([])
  const prevMonthList = ref<number[]>([])
  const nextMonthList = ref<number[]>([])
  const daysList = ref<number[]>([])
  onMounted(() => {
    init()
  })

  const prevMonth = () => {
    currentMonth.value--
    if (currentMonth.value === -1) {
      currentYear.value--
      currentMonth.value = 11
    }
    init()
  }
  const nextMonth = () => {
    currentMonth.value++
    console.log(currentMonth.value)

    if (currentMonth.value === 12) {
      currentYear.value++
      currentMonth.value = 0
    }
    init()
  }
  const init = () => {
    if (!currentYear.value) {
      const now = new Date()
      currentYear.value = now.getFullYear()
      currentMonth.value = now.getMonth() // 当前月份，0表示1月，11表示12月
    }

    getDaysInCurrentMonth()
    getFirstDayOfMonth()
  }
  // 获取当月天数
  const getDaysInCurrentMonth = () => {
    const monthNum = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    currentMonthList.value = Array.from({ length: monthNum }, (_, i) => i + 1)
  }
  const getFirstDayOfMonth = () => {
    const prevMonthNum = new Date(currentYear.value, currentMonth.value, 0).getDate()
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const firstDayWeek = firstDay.getDay() // 0表示星期日，1表示星期一，以此类推

    prevMonthList.value = Array.from(
      { length: firstDayWeek % weekLen },
      (_, i) => prevMonthNum - i,
    ).reverse()
    daysList.value = prevMonthList.value.concat(currentMonthList.value)
  }
</script>

<style scoped lang="less">
  .calendar {
    border: 1px solid #ccc;
    width: 492px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
  }
  .calendar-header-left {
    font-size: 18px;
    font-weight: bold;
    padding: 0 20px;
  }
  .calendar-header-right {
    display: flex;
    align-items: center;
    padding: 0 20px;
    span {
      cursor: pointer;
    }
    .next {
      padding: 0 10px;
    }
  }
  .calendar-body {
    // border: 1px solid red;
  }
  .week-name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
    .week-cell {
      width: 70px;
      text-align: center;
    }
  }
  .date-name {
    display: flex;
    flex-wrap: wrap;
    .date-cell {
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      cursor: pointer;
    }
    .date-cell:hover {
      background-color: #ccc;
    }
  }
</style>
