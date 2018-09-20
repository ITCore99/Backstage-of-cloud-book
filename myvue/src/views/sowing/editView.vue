<template>
    <div>
      <div class="crumbs" style="margin-bottom: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/viewList'}">轮播图列表</el-breadcrumb-item>
          <el-breadcrumb-item>修改轮播图</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="wrap">
        <h2 class="title">修改轮播图</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <upload :img="form.img" @uploadSuccess="getImg"></upload>
          </el-form-item>
          <el-form-item label="排序值">
            <el-input v-model="form.index"></el-input>
          </el-form-item>
          <el-form-item label="对应图书">
            <el-select v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.title"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">点击修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    import upLoad from "../myComponent/UpLoadViews"
    export default {
        name: "editView",
        data(){
          return{
            form:{
              index:"",
              title:"",
              img:"",
            },
            value:"",
            options:[],
          }
        },
        methods:{
          getData()
          {
            this.$axios.get(`/swiper/${this.$route.query.id}`).then(res=>{
              console.log(res);
              if(res.code==200)
              {
                this.form={
                  ...res.data
                }
                this.value=res.data.book._id;
              }
            })
          },
          getImg(param)
          {
            this.form.img=param;
            console.log(param);
          },
          getBook()
          {
            this.$axios.get("/book",{"pn":1,"size":200}).then(res=>{
              console.log(res);
              if(res.code==200)
              {
                this.options=res.data;
              }
            })
          },
          handleUpdate()
          {
            let data={
                "title":this.form.title,
                "img":this.form.img,
                "book":this.value,
                "index":this.form.index,
            }
            this.$axios.input(`/swiper/${this.$route.query.id}`,data).then(res=>{
              if(res.code==200)
              {
                this.$message({
                  type:"success",
                  message:res.msg,
                })
                this.$router.push("/layout/viewList")
              }
            }).catch(err=>{
              console.log(err);
              this.$message({
                type:"error",
                message:res.msg,
              })
            })
          }
        },
        created()
        {
          this.getData();
          this.getBook();
        },
        components:{
          "upload":upLoad
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
