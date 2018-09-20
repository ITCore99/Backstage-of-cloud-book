<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/layout/users'}">管理员管理</el-breadcrumb-item>
          <el-breadcrumb-item>管理员详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="wrap">
        <h2 class="title">管理员详情</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名:">
            <el-input v-model="form.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input v-model="form.nickname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址:">
            <el-input v-model="form.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="个人头像:">
            <img  :src="form.avatar" class="impress"/>
          </el-form-item>
          <el-form-item label="个性签名:">
            <el-input v-model="form.desc" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-input v-model="form.HandleDate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="最近更新:">
            <el-input v-model="form.HandleUpdateTime" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "AdminDetails",
        data(){
          return{
            form:{
              username:"",
              nickname:"",
              email:"",
              desc:"",
              HandleDate:"",
              avatar:"",
              HandleUpdateTime:"",
            }
          }
        },
       methods:{
          InitData()
          {
            this.form ={
              ...this.$store.state.userInfoDetail,
            }
          }
       },
      created()
      {
        this.InitData();
       }
    }
</script>

<style scoped lang="scss">
  .wrap{

    width:850px ;
    background: #f1f1f1;
    border: 1px solid #f1f1f1;
    margin: 20px auto;
    padding:20px;

    .title{
      font-weight: 400;
      text-align: center;
      margin-bottom:15px;
    }
    .impress
    {
      width:114px;
      height:114px;
      margin-bottom: -16px;

    }
  }

</style>
