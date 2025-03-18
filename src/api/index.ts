import request from "@/utils/request";

export const uploadImg = (data) => {
    return request.post('/upload', data);
}