<template>
   <div>
     <div class="crumbs" style="margin-bottom: 20px;">
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>添加分类</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="wrap">
       <h2 class="title">添加分类</h2>
       <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="分类题目">
           <el-input v-model="form.title"></el-input>
         </el-form-item>
         <el-form-item label="分类图标">
           <upload @uploadSuccess="getIMgURl" :img="form.icon"></upload>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="upStore">点击添加</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
    import upload from "../myComponent/UpLoadViews";
    export default {
        name: "addsort",
        data(){
          return{
            form:{
              title:"",
              icon:"",
            }
          }
        },
        methods:{
          getIMgURl(param)
          {
            this.form.icon=param;
          },
          upStore()
          {
            this.$axios.post("/category",this.form).then(res=>{
             if(res.code==200)
             {
               this.$message({
                 type:"success",
                 message:res.msg,
               })
               this.title="";
               this.$router.push("/layout/allSort");
             }
            }).catch(err=>{
              this.$message({
                type:"error",
                message:res.msg,
              })
            })
          }
        },
      components:{
          "upload":upload,
      }
    }
</script>

<style scoped lang="scss">
  .wrap{
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
  }

</style>
