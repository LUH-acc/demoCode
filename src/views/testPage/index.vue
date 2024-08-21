<template>
  <div>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
  </div>
</template>

<script setup lang="ts">
  const a = (list) => {
    let flag = false
    const taskResult = []
    let i = 0
    return {
      startTask() {
        return new Promise(async (resolve) => {
          if (flag) return
          flag = true
          while (i < list.length) {
            if (!flag) return
            console.log(`startTask ${i} start`)
            const result = await list[i]()
            taskResult.push(result)
            console.log(`startTask ${i} done`)
            i++
          }
          resolve(taskResult)
          flag = false
        })
      },
      puaseTask() {
        flag = false
        console.log('stopTask')
      },
    }
  }
  const tasks: any[] = []
  for (let i = 0; i < 5; i++) {
    tasks.push(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(i)
          }, 1000)
        }),
    )
  }
  const task = a(tasks)

  const start = () => {
    task.startTask().then((res) => {
      console.log(res)
    })
  }
  const stop = () => {
    task.puaseTask()
  }
</script>

<style></style>
