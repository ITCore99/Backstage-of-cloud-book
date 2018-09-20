<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="图书类别"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图书图标"
          width="auto">
          <template slot-scope="scope">
            <img :src="scope.row.icon" class="bookIcon"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="图书数量"
          width="auto">
        </el-table-column>
        <el-table-column  width="auto" label="操作">
          <template slot-scope="temp" >
            <el-button type="primary" size="small" @click="handleGo(temp.row._id)">前往书库</el-button>
            <el-button type="primary" size="small" @click="handleUpdate(temp.row._id)">修改分类</el-button>
            <el-button type="danger" size="small" @click="handleDel(temp.row._id)">删除分类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "allsort",
        data(){
          return{
            tableData:[],
          }
        },
        methods:{
          getData()
          {
            this.$axios.get("/category",{"pn":1,"size":500}).then(res=>{
              if(res.code==200)
              {
                res.data.forEach(item=>{
                   item.number=item.books.length;
                })
                this.tableData=res.data;
              }
            }).catch(err=>{
              console.log(err);
            })
          },
          handleGo(id)
          {
            this.$router.push({path:"/layout/bookstore",query:{"bookKey":id}})
          },
          handleDel(id)
          {
            this.$axios.delete(`/category/${id}`).then(res=>{
              if(res.code==200)
              {
                this.$message({
                  type:"success",
                   message:res.msg,
                });
                this.getData()
              }
          }).catch(err=>{
              this.$message({
                type:"error",
                message:res.msg,
              })
            })
          },
          handleUpdate(id)
          {
            this.$router.push({path:"/layout/editsort",query:{"id":id}});
          }
        },
        created()
        {
          this.getData();
        }
    }
</script>

<style scoped lang="scss">
  .bookIcon
  {
    width:80px;
    height:80px;
  }
  .crumbs {
    margin-bottom: 20px;
  }
</style>
