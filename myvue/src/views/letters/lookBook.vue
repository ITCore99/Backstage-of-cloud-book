<template>
 <div>
   <div class="crumbs" style="margin-bottom: 20px;">
     <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item :to="{ path: '/layout/booklist'}">书籍列表</el-breadcrumb-item>
       <el-breadcrumb-item>书籍详情</el-breadcrumb-item>
     </el-breadcrumb>
   </div>
   <div class="wrap">
     <h2 class="title">书籍详情</h2>
     <div class="content ">
       <div class="imgDiv">
         <img :src="form.img" class="img"/>
       </div>
       <div class="detailDiv">
         <el-form ref="form" :model="form" label-width="80px" style="color:#333">
           <el-form-item label="书名:">
             <el-input v-model="form.title" style="width:370px" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="作者:">
             <el-input v-model="form.author"  style="width:370px" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="创建时间:">
             <el-input v-model="form.handleTime"  style="width:370px" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="浏览量:">
             <el-input v-model="form.looknums"  style="width:370px" :disabled="true"></el-input>
           </el-form-item>
           <el-form-item label="简述:">
             <el-input v-model="form.desc" type="textarea" style="width:370px;height:80px;" :disabled="true"></el-input>
           </el-form-item>
         </el-form>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
    export default {
        name: "lookBook",
        data()
        {
          return{
            form:{
              title:"",
              author:"",
              handleTime:"",
              desc:"",
              looknums:"",
              img:"",
            },
          }
        },
       methods:{

          getData()
          {
            this.$axios.get(`/book/${this.$route.query.id}`).then(res=>{
              console.log(res);
              if(res.code==200)
              {
                res.data.handleTime=new Date(res.data.createTime).toLocaleString();
                this.form={
                  ...res.data
                }
              }
            }).catch(err=>{
              console.log(err);
              this.$message({
                type:"err",
                message:res.msg,
              })
            })
          }
       },
      created()
      {
        this.getData();
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
      margin-bottom: 20px;
    }
    .content
    {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .imgDiv
      {
        width:45%;
        border: 1px solid transparent;
      }
      .detailDiv
      {
        display: flex;
        width:53%;
        border: 1px solid transparent;
        padding-top:20px;
      }
      .img{
        padding:20px 50px;
        width:250px;
        height:300px;
      }
    }

  }

</style>
