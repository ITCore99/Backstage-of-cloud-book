<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/layout/allSort'}">书籍分类</el-breadcrumb-item>
          <el-breadcrumb-item>书库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="rr"
            width="auto"
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="bookImg"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="handleTime"
            label="创建时间"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="desc"
            :show-overflow-tooltip="true"
            width="auto"
            label="简述">
          </el-table-column>
          <el-table-column
            prop="looknums"
            label="浏览量"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="startsnums"
            label="好评人数"
            width="100">
          </el-table-column>
          <el-table-column  width="auto" label="操作">
            <template slot-scope="temp" >
              <el-button type="primary" size="mini" @click="handleEdit(temp.row._id)">修改图书</el-button>
              <el-button type="danger" size="mini" @click="handleDel(temp.row._id)">删除图书</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
    export default {
        name: "Bookstore",
        data()
        {
          return{
            tableData:[],
          }
        },
        methods:{
          getData()
          {
            this.$axios.get(`/category/${this.$route.query.bookKey}/books`).then(res=>{
              if(res.code==200)
              {
                res.data.books.forEach(item=>{
                     item.handleTime=new Date(item.createTime).toLocaleString();
                })
                this.tableData=res.data.books;

              }
            })
          },
          handleDel(bookId)
          {
            this.$axios.delete(`/category/${this.$route.query.bookKey}/book/${bookId}`).then(res=>{
              if(res.code==200)
              {
                this.$message.success("删除成功！");
                this.getData();
              }else
              {
                  this.$message.error("删除失败！");
              }
            }).catch(err=>{
              console.log(err);
              this.$message.error("删除失败！");
            })
          },
          handleEdit(id)
          {
            this.$router.push({path:"/layout/editBook",query:{"id":id}});
          }
        },
        created()
        {
          this.getData();
        }
    }
</script>

<style scoped>
  .bookImg
  {
    width:80px;
    height:80px;
  }
  .crumbs {
    margin-bottom: 20px;
  }
</style>
