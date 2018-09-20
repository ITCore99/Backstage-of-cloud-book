<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-wrap">
        <h2 class="title">修改个人信息</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" :disabled=true></el-input>
          </el-form-item>
          <el-form-item label="昵称:" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址:" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="个人头像:" prop="impress">
            <el-upload
              class="avatar-uploader"
              action="https://upload-z1.qiniup.com"
              auto-upload
              :data=upLoadToken
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="个性签名" prop="desc">
            <el-input  type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleEdit">点击修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import axios  from "axios";
     export default {
        name: "ModifyAdmin",
        data(){
          return{
            form:{
              username:"",
              nickname:"",
              email:"",
              desc:"",
              avatar:"",
            },
            upLoadToken:{token:""}
          }
        },
      methods:{
        initData()
        {
          this.form={
            ...this.$store.state.userInfo,/**注意这里使用扩展运算符展开后重名的属性仍然或覆盖*/
          }
        },
        handleAvatarSuccess(res,file)
        {
          this.form.avatar=res.url;
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
        handleEdit()
        {
          this.$axios.input("/user/userInfo",this.form).then(res=>{
            console.log(res);
            if(res.code==200)
            {
              this.$store.commit("SETSTATE_USERINFO",res.data); /**注意这里的更新store只能通过mutations来进行更新*/
              this.initData();
              this.$message({
                showClose: true,
                message:res.msg,
                type: 'success'
              });
              this.$router.push("/layout/bookstore");
            }
          }).catch(err=>{
            this.$message({
              showClose: true,
              message:"修改失败",
              type: 'err'
            });
            console.log(err);
          })
        }
      },
      computed:{
        ...mapState(["nickname","username","avatar","desc","email"])
      },
      created()
      {
        /**注意vuex不能直接v-medol*/
        this.initData();
        this.getToken();
      }
    }
</script>

<style scoped lang="scss">
  .form-wrap
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

  }

</style>
