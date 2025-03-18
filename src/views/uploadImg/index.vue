<template>
    <div class="uploadImg">
        <div>图片上传</div>
        <van-uploader v-model="fileList" :before-read="afterRead" />
    </div>
</template>

<script setup lang='ts'>
import { uploadImg } from '@/api/index';

const fileList  = ref<{ url: string }[]>([]);
const afterRead = (file: File) => {
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file); 
    formData.append('filename', file.name); 
    uploadImg(formData).then(res => {
        console.log(res);
        fileList.value.push({
            url: res.data.imgUrl,
        });
        
    })
}
</script>

<style lang='less' scoped>
.uploadImg {
    margin: 30px auto;
    text-align: center;
}
</style>