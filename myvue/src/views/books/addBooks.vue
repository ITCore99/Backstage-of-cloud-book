<template>
    <div>
      <div class="crumbs" style="margin-bottom: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>添加图书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="wrap">
        <h2 class="title">添加图书</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="链接：">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="作者：">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="封面：">
            <upload :img="form.img" @uploadSuccess="getUrl"></upload>
          </el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="form.typeId" filterable placeholder="请选择图书的类别">
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.title"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="handlerClick">点击添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
   import upload from "../myComponent/UpLoadViews";
    export default {
        name: "addBooks",
        data(){
          return{
            form:{
              url:"",
              typeId:"",
              img:"",
            },
            options:[],
          }
        },
        methods:{
          getUrl(param)
          {
            this.form.img=param;
          },
          getData()
          {
            this.$axios.get("/category",{pn:1,size:200}).then(res=>{
              console.log(res);
              if(res.code==200)
              {
                this.options=res.data;
              }
            })
          },
          handlerClick()
          {
            console.log(this.form);
            this.$axios.post("/book",this.form).then(res=>{
              if(res.code==200)
              {
                this.$message({
                  type:"success",
                  message:res.msg,
                });
                this.form={
                  url:"",
                  typeId:"",
                  img:"",
                };
              }else
              {
                this.$message({
                  type:"error",
                  message:res.msg,
                });
              }

            }).catch(err=>{
              console.log(err);
              this.$message({
                type:"error",
                message:res.msg,
              });
            })
          }
        },
        components:{
          "upload":upload,
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
        margin-bottom: 15px;
      }
  }

</style>
