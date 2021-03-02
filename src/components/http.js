import axios from 'axios'
import {
	Message
} from 'element-ui';

let baseUrl = process.env.NODE_ENV === 'production' ? '/noobiekartsadmin/services/' : '/api';
let service = axios.create({
	baseURL: baseUrl,
	timeout: 60000,
})

service.interceptors.request.use((config) => {
	//在发送请求之前如果为post序列化请求参数
	if (config.method === 'post' && typeof config.data == "object") {
		var formData = new FormData();
		for (let [key, value] of Object.entries(config.data)) {
			formData.append(key,value);
		}
		config.data = formData;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

// use里面放两个函数，第一个函数是成功做什么，第二个是失败做什么
service.interceptors.response.use((res) => {
	// 响应成功做什么 返回响应res res本质是Promise
	//后台返回204	No Content
	if (res.status == 204) {
		return []
	}
	return res
}, (err) => {
	Message.error({
		message: 'Oops，服务器开了小差'
	})
	return Promise.reject(err)
})

export default service;
