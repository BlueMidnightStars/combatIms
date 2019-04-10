import axios from 'axios'
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default{
    get: function(url='', data={}){
        return axios.get(url,data);
    },
    post: function(url='', data={}){
        return axios.post(url,data);
    },
    put: function(url='', data={}){
        return axios.put(url,data);
    },
    delete: function(url='', data={}){
        return axios.delete(url,data);
    },
}