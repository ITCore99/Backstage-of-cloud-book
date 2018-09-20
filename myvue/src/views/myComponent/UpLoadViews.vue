<template>
    <!--此组件是用来封装图片上传的功能-->
    <label class="upload-wrap">
      <i class="el-icon-plus" v-if="!img"></i>
      <input type="file" style="display:none" @change="upload"/>
      <img :src="img" v-if="img" class="IMg"/>
    </label>
</template>

<script>
    import axios from "axios";
    export default {
        name: "UpLoadViews",
        props:{
          img:{
            type:String,
          }
        },
        data()
        {
          return{
            token:"",
            imgUrl:"",
          }
        },
        methods:{
          getToken()
          {
            axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
              if(res.data.code==200)
              {
                this.token=res.data.data; /**保存token*/
              }
            }).catch(err=>{
              console.log(err);
            })
          },
          upload(event)
          {
            console.log(event);
            /*创建一个表单对象*/
            let formData =new FormData();
            formData.append("file",event.target.files[0]);
            formData.append("token",this.token)
            axios.post("https://upload-z1.qiniup.com",formData,{header:{"Conent-type":"multipart/form-data"}}).then(res=>{
              this.$emit("uploadSuccess",res.data.url )
            }).catch(err=>{
              console.log(err);
            })
          }
        },
        created()
        {
          this.getToken();
        }
    }
</script>

<style scoped lang="scss">
  .upload-wrap
  {
    position:relative;
    display:block;
    width: 100px;
    height: 100px;
    border: 1px solid #e8e8e8;
    border-radius:6px;
    cursor:pointer;

    .el-icon-plus{
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
    .IMg
    {
      width: 100px;
      height:100px;
    }
  }
</style>
