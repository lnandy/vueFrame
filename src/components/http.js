import axios from 'axios'
import { Message } from 'element-ui';

let baseUrl = process.env.DOMAIN_ENV === 'prod' ? 'http://58.87.113.200/noobiekartscloudservices' : '/api';
let service = axios.create({
	baseURL: baseUrl,
	timeout: 60000,
})


// use里面放两个函数，第一个函数是成功做什么，第二个是失败做什么
service.interceptors.response.use((res) => {
	// 响应成功做什么 返回响应res res本质是Promise
	//后台返回204	No Content
	if(res.status == 204){
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
