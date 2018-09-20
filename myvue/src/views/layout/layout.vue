<template>
    <div class="layout">
      <div class="header">
        <h1 class="title ml-200">云书后台管理系统</h1>
        <img :src="url" class="ImpressImg" @click="userClick"/>
        <div class="userDoWith" v-show="handleFlag">
          <ul class="ClickHandle" style="list-style: none;padding:10px;border: 1px solid #f1f1f1;width:100px;">
            <li class="ChanPas" @click="handlerClick">修改密码</li>
            <li class="SignOut" @click="singout">退出登录</li>
          </ul>
        </div>
      </div>
      <div class="side-nav">
        <el-menu
          class="menu"
          background-color="#545c64"
          text-color="#fff"
          :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/index">首页</el-menu-item>
              <el-menu-item index="/layout/users">管理员管理页</el-menu-item>
              <el-menu-item index="/layout/addUser">管理员添加</el-menu-item>
              <el-menu-item index="/layout/modifyAdmin">个人信息修改</el-menu-item>
              <el-menu-item index="/layout/test">前往测试页</el-menu-item>
              <el-menu-item index="/login">前往登录页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/allSort">书籍分类</el-menu-item>
              <el-menu-item index="/layout/addsort">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>书籍管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/booklist">书籍列表</el-menu-item>
              <el-menu-item index="/layout/addbook">添加图书</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span>轮播管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/viewList">轮播图列表</el-menu-item>
              <el-menu-item index="/layout/addView">添加轮播图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main-content ml-200">
        <router-view></router-view>
      </div>
      <div class="mask" v-if="isShow">
          <div class="change">
            <el-form ref="Form" :rules="rule" status-icon :model="Form"  label-width="100px" >
              <el-form-item label="旧密码：" prop="olderPassword"  autocomplete="off">
                <el-input v-model="Form.olderPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="newPassword">
                <el-input v-model="Form.newPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="confirmPassword">
                <el-input v-model="Form.confirmPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item>
               <el-button type="primary" @click="submitFrom('Form')">修改</el-button>
                <el-button type="primary" @click="HandlerCancel">取消</el-button>
              </el-form-item>

            </el-form>
          </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "layout",
        data(){
          let checkOlderPassword=function(rule,value,callback)
          {
              if(value==="")
              {
                callback(new Error("旧密码不能为空!"))
              }else
              {
                callback();
              }
          };
          let checkNewPassword=function(rule,value,callback)
          {
              if(value==="")
              {
                callback(new Error("新密码密码不能为空!"))
              }else
              {
                callback();
              }
          };
          let that=this;
          let checkConfirmPassword=function(rule,value,callback)
          {

              if (value === '')
              {
                callback(new Error('请再次输入密码'));

              } else if (value!=that.Form.newPassword)
              {
                callback(new Error('两次输入密码不一致!'));

              } else {

                callback();
              }
          };
          return{
            flag:false,
            url:"",
            isShow:false,
            Form:{
              olderPassword:"",
              newPassword:"",
              confirmPassword:"",
              },
            rule:{
              olderPassword:[{validator:checkOlderPassword,trigger:"blur"}],
              newPassword:[{validator:checkNewPassword,trigger:"blur"}],
              confirmPassword:[{validator:checkConfirmPassword,trigger:"blur"}],
            }
          }
        },
        methods:{
          userClick()
          {
            this.flag=!this.flag;
          },
          singout()
          {
            this.$confirm('此操作将退出管理系统, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.get("/logout").then(res=>{
                console.log(res);
                if(res.code==200)
                {
                  this.$router.push("/login");
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
            })
            });
          },
          handlerClick()
          {
            this.isShow=true;
          },
          HandlerCancel()
          {
            this.Form={};
            this.isShow=false;
            this.flag=false;

          },
          submitFrom(formName)
          {
            this.$refs[formName].validate((valid)=>{
              if(valid)
              {
                this.$axios.input("/user/password",{"password":this.Form.olderPassword, "new_password":this.Form.newPassword}).then(res=>{
                  console.log(res)   ;
                  if(res.code==200)
                  {
                    this.$message({
                      type:"success",
                      message:`${res.msg},请重新登陆！`,
                    })
                    setTimeout(()=>{
                      this.$router.push("/login");
                    },500)
                  }else{
                    this.$message({
                      type:"error",
                      message:`${res.msg}`,
                    })
                  }
                }).catch(err=>{
                  console.log(err);
                  this.$message({
                    type:"error",
                    message:`${res.msg}`,
                  })
                })
              }else
              {
                alert('error submit!!');
                return false;
              }
            })
          }
        },
        computed:{
          handleFlag(){
            return this.flag;
          }
        },
       created()
       {
         this.url=this.$store.state.userInfo.avatar;
       }
    }
</script>

<style scoped lang="scss">
  .layout{
    .header
    {
      position: relative;
    }
    .title
    {
      text-align: center;
      font-weight:400;
      color:#333;
      height:60px;
      line-height: 60px;
      border-bottom:1px solid #f1f1f1;
      font-size:20px;
    }
    .ml-200
    {
      margin-left: 200px;
    }
    .side-nav
    {
      width: 200px;
      position: fixed;
      top:0;
      left:0;
      bottom:0;
      border-right: 1px solid #f1f1f1;
      overflow: hidden;
      padding-top:60px;
      background: #545c64;

       /deep/   /*深度选择器vue2.0可以直接的选择组件内部的样式*/
       {
         .menu{
           border-right: none ;
         }
       }
    }
    .main-content
    {
      padding: 15px;
    }
    .ImpressImg
    {
      width:50px ;
      height:50px;
      position:absolute ;
      top:0%;
      right:5%;
      padding:5px;
      border-radius: 50%;
    }
    .userDoWith
    {
      z-index: 998;
      position: absolute;
      top:100%;
      right:0%;
      transform: translateX(-40%);
      text-align: center;
      color:#333;
      background: #f1f1f1;
    }
    .ChanPas
    {
      border-bottom:1px solid #FFF;
      padding:0 10px 10px 10px;
    }
    .ChanPas:hover
    {
      color:#0000ff;
      text-decoration:underline;
    }
    .SignOut
    {
      padding:10px 10px 0px 10px;
    }
    .SignOut:hover
    {
      color:#0000ff;
      text-decoration:underline;
    }
    .mask
    {
      display: flex;
      justify-content: center;
      align-items: center;
      position:absolute;
      top:0px;
      left:0px;
      right:0px;
      bottom:0px;
      z-index:1000;
      background:#ccc;
      opacity: 0.9;

      .change
      {
        width:400px;
        background: #ffff;
        padding:40px 30px 20px 0;
      }
    }
  }
</style>
