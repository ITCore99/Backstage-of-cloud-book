<template>
    <div>
      <div class="crumbs" style="margin-bottom: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="wrap">
        <h2 class="title">添加轮播图</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="轮播头图">
            <upload :img="form.img" @uploadSuccess="getUrl"></upload>
          </el-form-item>
          <el-form-item label="指定书籍">
            <el-select v-model="categoryId" filterable placeholder="请选择该指定的书籍" @change="getBook()">
              <el-option
                v-for="item in categoryData"
                :key="item._id"
                :label="item.title"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="this.book[0]" >
            <template>
              <div class="container" style="width:380px;height:120px;display: flex;justify-content: space-between;border: 1px solid #aaa;padding:10px;border-radius: 6px;">
                <div class="picture" style="width: 30%">
                  <img :src="this.book[0].img" style="width:100px;height:120px;"/>
                </div>
                <div class="book-desc" style="width: 70%">
                  <p style="color:#333; width:100% ;font-weight: bold;white-space: nowrap;text-overflow:ellipsis;overflow: hidden">书名：{{this.book[0].title}}</p>
                  <p style="color:#333; font-weight: bold">作者：{{this.book[0].author}}</p>
                </div>
              </div>
            </template>
          </el-form-item>
          <el-form-item label="排序值">
            <el-input-number v-model="form.index":min="1"></el-input-number>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="handleAdd">点击添加</el-button>
          </el-form-item>
        </el-form>
        <div class="eject">
          <el-dialog title="书籍列表" :visible.sync="isShowDialog">
            <el-table :data="bookData">
              <el-table-column property="title" label="书名" width="auto"></el-table-column>
              <el-table-column property="author" label="作者" width="auto"></el-table-column>
              <el-table-column label="封面" width="auto">
                <template slot-scope="scope">
                  <img :src="scope.row.img" class="img"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="auto">
                <template slot-scope="temp">
                  <el-button type="primary" @click="clickBook(temp.row._id)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>
    </div>
</template>
<script>
    import upload from "../myComponent/UpLoadViews";
    export default {
        name: "addView",
        data(){
          return{
            form:{
              title:"",
              index:"",
              img:"",
            },
            isShowDialog:false,
            categoryData:[],
            categoryId:"",
            bookData:[],
            bookCount:0,
            book:[],
          }
        },
        methods:{
          getUrl(param)
          {
            this.form.img=param;
          },
          async getBook()
          {
            this.isShowDialog=true;
            console.log(this.categoryId);
            let {data}= await this.$axios.get(`/category/${this.categoryId}/books`,{"pn":1,"size":200});
            this.bookData=data.books;
            console.log(data.books);
          },
          getCategory()
          {
            this.$axios.get("/category",{"pn":1,"size":200}).then(res=>{
              if(res.code==200)
              {
                this.categoryData=res.data;
              }
            })
          },
          handleAdd()
          {
            this.form.book=this.book[0]._id;
            this.$axios.post("/swiper",this.form).then(res=>{
              if(res.code==200)
              {
                this.$message({
                  type:"success",
                  message:res.msg,
                })
                thi.$router.push("/layout/viewList")
              }
            }).catch(err=>{
              this.$message({
                type:"error",
                message:res.msg,
              });
            })
          },
          clickBook(id)
          {
            this.isShowDialog=false;
            this.book=this.bookData.filter(item=>item._id==id);
            console.log(this.book);
          }
        },
        created()
        {
            this.getCategory()
        },
        components:{
          "upload":upload
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
    .img
    {
      width:80px;
      height:100px;
    }
  }

</style>
