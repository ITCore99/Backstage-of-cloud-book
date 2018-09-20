<template>
    <div class="container">
        <h1 class="title">欢迎来到MINI-Book后台管理系统</h1>
        <div class="login-box">
          <h2 style="text-align: center;color:#333;font-weight: 400">请登录</h2>
          <el-form ref="form" :rules="rule" :model="form">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input><!--注意这里要声明type-->
            </el-form-item>
          </el-form>
          <el-button type="primary" class="btn" @click="handleLogin('form')" :loading="isLoading">登陆</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data()
        {
          let checkName=(rule,value,callback)=>{
            if(!value)
            {
              return callback(new Error("用户名不能为空！"));
            }else
            {
              callback();
            }
          };
          let checkPassword=(rule,value,callback)=>
          {
            if(value && value.length>=5)
            {
              callback();
            }else
            {
              return callback(new Error("密码为空或密码至少为5位"));
            }
          };
          return{
            form:{
              username:"",
              password:"",
            },
            isLoading:false,
            name:"",
            rule:{      /**注意return里面*/
              username:[{ validator: checkName,trigger:"blur"}],
              password: [{ validator: checkPassword, trigger: 'blur' }],
            },
          }
        },
        methods:{
          handleLogin(formName)
          {
              let that=this;
              this.$refs[formName].validate(valid=>{
                if(valid)
                {
                  this.isLoading=true;
                  this.$axios.post("/login",this.form).then(res=>{
                    console.log(res);
                    if(res.code==200)
                    {
                      this.$message({
                        message:res.msg,
                        type:"success"
                      });
                      this.$store.commit("SETSTATE_USERINFO",res.data);
                      setTimeout(()=>{
                        this.$router.push("/layout");
                      },1000)
                    }else
                    {
                      this.$message.error(res.msg);
                    }
                    that.isLoading=false;
                  }).catch(err=>{
                    console.log(err);
                    that.isLoading=false;
                  })
                }else
                {
                  alert('error submit!!');
                  return false;
                }
              });
          },
        }
    }
</script>

<style scoped lang="scss">
.container
{
  width:100%;
  min-height:100vh;
  background: #FAFAD2;
  overflow: hidden;
  .title
  {
    margin-top: 100px;
    text-align: center;
    color:#111;
    font-weight: 400;
  }
  .login-box
  {
    background: #e8e8e8;
    width: 400px;
    height:300px;
    border: 1px solid #f1f1f1;
    margin: 20px auto;
    border-radius:10px;
    padding:40px;
  }
  .btn
  {
    width:400px;
    margin:20px auto;
    box-sizing: border-box;
  }
}

</style>
