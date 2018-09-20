<template>
   <div>
     <div class="crumbs">
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{path: '/layout/index' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="{path:'/layout/allSort'}">书籍分类</el-breadcrumb-item>
         <el-breadcrumb-item>书库</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="wrap">
       <h2 class="title">修改分类</h2>
       <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="分类名称">
           <el-input v-model="form.title"></el-input>
         </el-form-item>
         <el-form-item label="分类图标">
           <el-upload
             class="avatar-uploader"
             action="https://upload-z1.qiniup.com"
             auto-upload
             :data=upLoadToken
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="form.icon" :src="form.icon" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
         <el-form-item label="分类排序">
           <el-input v-model="form.index"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="handleUpdate">点击修改</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "EditSort",
        data()
        {
          return{
            form:{
              title:"",
              index:"",
              icon:"",
            },
            upLoadToken:{token:""}
          }
        },
        methods:{
          handleAvatarSuccess(res, file) {
            this.form.icon =res.url ;
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          getToken()
          {
            axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
              if(res.data.code==200)
              {
                this.upLoadToken.token=res.data.data; /**保存token*/
              }
            }).catch(err=>{
              console.log(err);
            })
          },
          getData()
          {
            this.$axios.get(`category/${this.$route.query.id}`).then(res=>{
              if(res.code==200)
              {
                 this.form={
                   ...res.data,
                 }
              }
            })
          },
          handleUpdate()
          {
            this.$axios.input(`/category/${this.$route.query.id}`,this.form).then(res=>{
             if(res.code==200)
             {
               this.form={};
               this.$message({
                 type:"success",
                 message:res.msg,
               })

             }
            }).catch(err=>{
              this.$message({
                type:"error",
                message:res.msg,
              })
            })
          }
        },
        created()
        {
          this.getToken();
          this.getData();
        }
    }
</script>

<style scoped lang="scss">
  .wrap
  {
      width:850px;
      margin:20px auto;
      border: 1px solid #f1f1f1;
      background: #f1f1f1;
      padding: 20px;
      .title
      {
        text-align: center;
        font-weight: 400;
        margin-bottom: 15px;
      }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .crumbs{
      margin-bottom: 20px;
    }
  }

</style>
