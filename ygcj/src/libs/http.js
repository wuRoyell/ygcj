import axios from 'axios'
import qs from 'querystring'

export default {
    get: function (url,params,type) {
        const config = {
            url: url,
            params:params,
            method: type,
            transformRequest: [
                function (data) {
                    return qs.stringify(data)  //在请求前序列化参数
                }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': '*/*'
            }
        };
        return axios(config)
    },
    post: function (url,params,type) {
        var config = {
            url: url,
            method: type,
            headers: {
                'Content-Type':'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            data:params
        };
        if(type == 'formdata'){
            config = {
                url: url,
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    
                },
                data:params,
                transformRequest:[function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }]
            };
        }
        return axios(config)
    },
    delete: function (url,params,type) {
        const config = {
            baseURL:'',
            url: url,
            method: type,
            headers: {
                'Content-Type':'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            data:params
        };
        return axios(config)
    }
}
