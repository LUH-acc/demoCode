<template>
  <div class="calendar-container">
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-header-left"> {{ currentYear }}年{{ currentMonth + 1 }}月 </div>

        <div class="calendar-header-right">
          <button class="prev" @click="prevMonth">上一月</button>
          <button class="next" @click="nextMonth">下一月</button>
        </div>
      </div>

      <div class="calendar-body">
        <div class="week-name">
          <div class="week-cell" v-for="item in weekList" :key="item"> {{ item }}</div>
        </div>
        <div class="date-name">
          <div
            class="date-cell"
            :class="{
              today: item.isToday,
              currentMonth: !item.isCurrentMonth,
              selected: startDate === item.fullDate || endDate === item.fullDate || item.selected,
            }"
            v-for="(item, index) in daysList"
            :key="index"
            @click="selectDate(item)"
          >
            {{ item.day }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="toToday" v-show="isTodayShow" @click="toToday"> 今 </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  type MonthListType = {
    isCurrentMonth: boolean
    day: number
    isToday: boolean
    fullDate: Date
    selected?: boolean
  }
  const weekList = ['日', '一', '二', '三', '四', '五', '六']
  const weekLen = 7
  // 当前月份和年份
  const currentYear = ref<number>(0)
  const currentMonth = ref<number>(0)
  // 当前月份列表
  const currentMonthList = ref<MonthListType[]>([])
  // 上一个月列表
  const prevMonthList = ref<MonthListType[]>([])
  // 下一个月列表
  const nextMonthList = ref<MonthListType[]>([])
  // 月份列表
  const daysList = ref<MonthListType[]>([])
  // 是否显示今天
  const isTodayShow = ref(false)
  // 今天日期
  const year = ref(0)
  const month = ref(0)
  const day = ref(0)
  // 开始日期
  const startDate = ref<Date>()
  // 结束日期
  const endDate = ref<Date>()
  // 初始化
  onMounted(() => {
    init()
    getToday()
  })
  let count = 0
  // 初始化选中
  const initSelected = () => {
    daysList.value.map((item) => {
      item.selected = false
      if (item.fullDate >= startDate.value && item.fullDate <= endDate.value) {
        item.selected = true
      }
    })
  }
  // 选择日期组
  const selectDate = (date) => {
    count++
    switch (count) {
      case 1:
        startDate.value = date.fullDate
        break
      case 2:
        endDate.value = date.fullDate
        if (endDate.value < startDate.value) {
          startDate.value = date.fullDate
          endDate.value = undefined
          count = 1
        }
        break
      default:
        startDate.value = date.fullDate
        endDate.value = undefined
        count = 1
    }
    initSelected()
  }

  // 回到今天
  const toToday = () => {
    currentMonth.value = month.value
    currentYear.value = year.value
    init()
  }
  // 监听当前月份和年份变化
  watchEffect(() => {
    if (currentMonth.value !== month.value || currentYear.value !== year.value) {
      isTodayShow.value = true
    } else {
      isTodayShow.value = false
    }
  })
  // 上一个月
  const prevMonth = () => {
    currentMonth.value--
    if (currentMonth.value === -1) {
      currentYear.value--
      currentMonth.value = 11
    }
    init()
  }
  // 下一个月
  const nextMonth = () => {
    currentMonth.value++
    if (currentMonth.value === 12) {
      currentYear.value++
      currentMonth.value = 0
    }
    init()
  }
  // 初始化
  const init = () => {
    if (!currentYear.value) {
      const now = new Date()
      currentYear.value = now.getFullYear()
      currentMonth.value = now.getMonth() // 当前月份，0表示1月，11表示12月
    }
    getCurrentMonth()
    getPrevMonth()
    getNextMonth()
    daysList.value = Array<MonthListType>().concat(
      prevMonthList.value,
      currentMonthList.value,
      nextMonthList.value,
    )
  }
  // 获取当月天数
  const getCurrentMonth = () => {
    const monthNum = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    currentMonthList.value = Array.from({ length: monthNum }, (_, i) => {
      let isToday =
        new Date().toLocaleDateString() ===
        new Date(currentYear.value, currentMonth.value, i + 1).toLocaleDateString()
      return {
        isCurrentMonth: true,
        day: i + 1,
        isToday,
        fullDate: new Date(currentYear.value, currentMonth.value, i + 1),
      }
    })
  }
  // 获取上一个月天数
  const getPrevMonth = () => {
    const prevMonthNum = new Date(currentYear.value, currentMonth.value, 0).getDate()
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const firstDayWeek = firstDay.getDay() // 0表示星期日，1表示星期一，以此类推

    prevMonthList.value = Array.from({ length: firstDayWeek % weekLen }, (_, i) => prevMonthNum - i)
      .reverse()
      .map((item) => {
        return {
          isCurrentMonth: false,
          day: item,
          isToday: false,
          fullDate: new Date(currentYear.value, currentMonth.value - 1, item),
        }
      })
    // daysList.value = prevMonthList.value.concat(currentMonthList.value)
  }
  // 获取下一个月天数
  const getNextMonth = () => {
    const len = prevMonthList.value.length + currentMonthList.value.length
    const nextMonthNum = len - 35 > 0 ? 42 - len : 35 - len
    nextMonthList.value = Array.from({ length: nextMonthNum }, (_, i) => i + 1).map((item) => {
      return {
        isCurrentMonth: false,
        day: item,
        isToday: false,
        fullDate: new Date(currentYear.value, currentMonth.value + 1, item),
      }
    })
  }
  // 获取今天日期
  const getToday = () => {
    const now = new Date()
    year.value = now.getFullYear() // 当前年
    month.value = now.getMonth() // 当前月份，0表示1月，11表示12月
    day.value = now.getDate() // 当前日
    return now.toLocaleDateString()
  }
</script>

<style lang="less">
  .calendar-container {
    width: 492px;
    margin: auto;
  }
  .toToday {
    width: 50px;
    height: 50px;
    background-color: #4b95e8;
    border-radius: 100px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
    user-select: none;
  }
  .calendar {
    border: 1px solid #ccc;
    width: 100%;
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
    .prev,
    .next {
      padding: 5px 10px;
      outline: none;
    }
    .next {
      margin-left: 10px;
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
      background-color: #eee;
    }
    .date-cell.today {
      background-color: #4b95e8;
      color: #fff;
    }
    .date-cell.currentMonth {
      opacity: 0.4;
    }
    .date-cell.selected {
      background-color: #c86f26;
    }
  }
</style>
