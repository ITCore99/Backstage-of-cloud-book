<template>
    <div class="user-add">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item >用户添加</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <h2 class="title">添加用户信息</h2>
        <el-input placeholder="请输入用户名" v-model="username">
          <template slot="prepend" style="width:180px">用户名</template>
        </el-input>
        <div class="mt-15">
          <el-input placeholder="请输入昵称" v-model="nickName" >
            <template slot="prepend">昵称&nbsp;&nbsp;&nbsp;</template>
          </el-input>
        </div>
        <div class="mt-15">
           <el-input placeholder="请填写密码" v-model="password" type="password">
            <template slot="prepend">密码&nbsp;&nbsp;&nbsp;</template>
          </el-input>
        </div>
        <div class="mt-15">
          <el-input placeholder="个性签名" v-model="desc">
            <template slot="prepend">个性签名</template>
          </el-input>
        </div>
        <div class="mt-15">
          <el-input placeholder="123@qq.com" v-model="email">
            <template slot="prepend">邮箱地址</template>
          </el-input>
        </div>
        <el-upload
              class="avatar-uploader"
              action="https://upload-z1.qiniup.com"
              auto-upload
              :data=upLoadToken
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="submit" class="mt-20 btn" @click="addUser">点击添加</el-button>
      </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "addUser",
        data(){
          return{
            username:"",
            password:"",
            desc:"",
            email:"",
            nickName:"",
            imageUrl:"",
            upLoadToken:{token:""}
          }
        },
        methods:{
            handleAvatarSuccess(res, file) {
              this.imageUrl =res.url ;
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
          addUser()
          {
            let data={
              "username":this.username,
              "password":this.password,
              "desc":this.desc,
              "avatar":this.imageUrl,
              "email":this.email,
              "nickname":this.nickName,
            };
            console.log(data);
            this.$axios.post("/user",data).then(res=>{
              this.$message({
                showClose: true,
                message:'添加成功',
                type: 'success'
              });
              this.username="";
              this.password="";
              this.desc="";
              this.email="";
              this.imageUrl="";
              this.nickName="";
            }).catch(err=>{
              this.$message({
                showClose: true,
                message: '添加失败',
                type: 'error'
              });
              console.log(err);
            })
          },
          getToken()
          {
            axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
              console.log(res)
              if(res.data.code==200)
                {
                  this.upLoadToken.token=res.data.data; /**保存token*/
                }
            }).catch(err=>{
              console.log(err);
            })
          }
        },
        created()
        {
          this.getToken();
        },
    }
</script>

<style scoped >

  .content {
    width: 850px;
    margin: 20px auto;
    border: 1px solid #f1f1f1;
    background: #f1f1f1;
    padding: 20px;
  }
    .title
    {
        text-align: center;
        font-weight: 400;
        padding-bottom: 20px;
    }
    .mt-15{
      margin-top:15px;
    }

    .btn
    {
      width:150px;
      magin-top:20px;
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

</style>
