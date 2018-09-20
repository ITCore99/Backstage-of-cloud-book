<template>
 <div>
   <h2>我是学习测试页</h2>
   <h1>上传文件的测试页</h1>
   <!--<h2>传统的表单上传</h2>-->
   <!--<form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">-->
      <!--<input type="file" name="file">&lt;!&ndash;注意上传图片请求头编码方式和一般post请求的请求头是不一样的multipart/form-data&ndash;&gt;-->
      <!--<br>-->
      <!--<input type="text" name="token" v-model="token"/>-->
      <!--<br>-->
      <!--<button type="submit">点击进行文件的上传</button>-->
   <!--</form>-->
   <h2>使用axios进行上传图片</h2>
   <input type="file" @change="handleChange"/>
   <img :src="imgData">
   <h2>通过分装的图片上传组件进行图片的上传</h2>
   <up-load @uploadSuccess="handleSuccess"></up-load>
 </div>
</template>

<script>
    import axios from "axios";
    import  upLoadView from "../myComponent/UpLoadViews";
    export default {
        name: "test",
        data(){
          return{
            token:"",
            imgData:"",
            ImgUrl:"",/**从子组件传过来的值*/
          }
        },
        methods:{
          getToken(){
            axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
              if(res.data.code==200)
              {
                this.token=res.data.data; /**保存token*/
                console.log(this.token);
              }
            }).catch(err=>{
              console.log(err);
            })
          },
          handleChange(Event)
          {
             console.log(Event);
             let file=Event.target.files[0]; /**通过事件对象来进行获取到上传的文件，无论是表单上传还是ajax上传都是上传了一个表单对象*/
             let formData=new  FormData();/**创建一个表单对象*/
             formData.append("file",file)   /**参数一是列名，参数二是内容，参数名(可有可无)*/
             formData.append("token",this.token);
             axios.post("https://upload-z1.qiniup.com",formData,{headers:{
               // "Content-Type":"multipart/form-data"
             }}).then(res=>{
               this.imgData=res.data.url;
             })
          },
          handleSuccess(Param)
          {
            this.ImgUrl=Param;
            console.log(this.ImgUrl);
          }

        },
        created(){
          this.getToken();
        },
        components:{
          "up-load":upLoadView,
        }
    }
</script>

<style scoped>

</style>
