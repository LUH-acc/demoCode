<template>
  <div class="toast" :id="toastId" :class="type">
    {{ msg }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  msg: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  },
  toastId: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  padding: 12px 24px;
  background: #333;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transform: translateX(-50%);
  animation: fadeIn 0.3s ease-out;
}
.toastEnd {
  animation: fadeOut 0.3s ease-out;
}



.toast.success {
  background: #4CAF50;
}
.toast.error {
  background: #F44336;
}
.toast.warning {
  background: #FF9800;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
  to { opacity: 1; transform: translateY(0) translateX(-50%); }
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0) translateX(-50%); }
  to { opacity: 0; transform: translateY(-10px) translateX(-50%); }
}
</style>
