<template>
   <div>
     <div class="crumbs" style="margin-bottom: 20px;">
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/layout/allSort'}">分类列表</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/layout/bookstore'}">书库</el-breadcrumb-item>
         <el-breadcrumb-item>修改图书</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="wrap">
       <h2 class="title">修改图书</h2>
       <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="图书ID">
           <el-input v-model="form._id"></el-input>
         </el-form-item>
         <el-form-item label="书名">
           <el-input v-model="form.title"></el-input>
         </el-form-item>
         <el-form-item label="作者">
           <el-input v-model="form.author"></el-input>
         </el-form-item>
         <el-form-item label="排序值">
           <el-input v-model="form.index"></el-input>
         </el-form-item>
         <el-form-item label="封面">
           <el-upload
             class="avatar-uploader"
             action="https://upload-z1.qiniup.com"
             auto-upload
             :data=upLoadToken
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="form.img" :src="form.img" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
         <el-form-item label="图书类型">
           <el-select v-model="value" filterable placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item._id"
               :label="item.title"
               :value="item._id">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="图书简介">
           <el-input   type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="handleUP">点击修改</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
    import  axios from "axios"
    export default {
        name: "editBook",
        data()
        {
          return{
            form:{
              _id:"",
              desc:"",
              author:"",
              img:"",
              title:""
            },
            options:[],
            value:"",
            upLoadToken:{token:""}
          }
        },
       methods: {
           getData()
           {
             this.$axios.get(`/book/${this.$route.query.id}`).then(res=>{
               console.log(res.data)
               if(res.code==200)
               {
                  this.form={...res.data}
                  this.value=res.data.type; /**存储选中的值*/
               }
             })
           },
          handleAvatarSuccess(res, file) {
           this.form.img =res.url ;
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
          getSortData()
          {
            this.$axios.get("/category").then(res=>{
              console.log(res);
              if(res.code==200)
              {
                this.options=res.data;
              }
            })
          },
         handleUP()
         {
           let data={
             "book_id":this.form._id,
             "index":this.form.index,
             "desc":this.form.desc,
             "author":this.form.author,
             "img":this.form.img,
             "type":this.value,
             "title":this.form.title,
           }
           this.$axios.input("/book",data).then(res=>{
             if(res.code==200)
             {
               this.$message({
                 type:"success",
                 message:res.msg,
               })
               this.$router.push("/layout/booklist");
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
         this.getToken();
         this.getSortData();
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
  }

</style>
