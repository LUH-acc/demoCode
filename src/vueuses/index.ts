import { ref } from 'vue'

export function testUse(val?: any) {
  console.log(val)

  const testText = ref('hello')
  if (val) {
    testText.value = val
  }
  return {
    testText,
  }
}
