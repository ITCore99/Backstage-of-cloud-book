import axios from "axios";
import { Message  } from 'element-ui';
import  router from "../router/index";/**注意这不是vue的作用域*/
/**进行封装器请求*/
const baseURL="api/admin";
const myFetch=axios.create({
  baseURL, /**写这个的目的是让每一个请求地址都带上api/main当vue配置的跨域检测到就会自动的将这个地址变为正确的请求地址*/
  timeout:10000,
});
const xhr={
  get(url,data,config)
  {
    return new Promise((resolve,reject)=>{
      myFetch.get(url,{params:data},config).then(res=>{
            if(res.data.code==401)
            {
              Message.warning({
                title:"提示：",
                message:"登陆状态失效,请重新登陆"
              });
              router.push("/login");
            }
            resolve(res.data);
      }).catch(err=>{
            reject(err)
      });
    })
  },
  post(url,data,config)
  {
    return new Promise((resolve,reject)=>{
        myFetch.post(url,data,config).then(res=>{
          if(res.data.code==401)
          {
            Message.warning({
              title:"提示：",
              message:"登陆状态失效,请重新登陆"
            });
            router.push("/login");
          }
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetch(url,data,config,method)
  {
    return new Promise((resolve,reject)=>{
      myFetch[method](url,data,config).then(res=>{
        if(res.data.code==401)
        {
          Message.warning({
            title:"提示：",
            message:"登陆状态失效,请重新登陆"
          });
          router.push("/login");
        }
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  input(url,data,config)
  {
    return this.fetch(url,data,config,"put");
  },
  delete(url,data,config)
  {
    return this.fetch(url,data,config,"delete");
  }

}
export const $axios=xhr;

