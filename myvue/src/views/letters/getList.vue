<template>
  <div>
    <div class="crumbs" style="margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop=""
          label="封面"
          width="120px">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="BookImg"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="handleTime"
          label="创建时间"
          width="auto">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="desc"
          width="auto"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="looknums"
          label="浏览量"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="index"
          label="排序值"
          width="80px">
        </el-table-column>
        <el-table-column  width="auto" label="操作">
          <template slot-scope="temp" >
            <el-button type="primary" size="small" @click="handleLook(temp.row._id)">图书详情</el-button>
            <el-button type="danger" size="small" @click="handleDel(temp.row._id)">删除图书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "getList",
        data()
        {
          return{
            tableData:[],
          }
        },
        methods:{
          getData()
          {
            this.$axios.get("/book",{"pn":1,size:200}).then(res=>{
              if(res.code==200)
              {
                res.data.forEach(item=>{
                  item.handleTime=new Date(item.createTime).toLocaleString()
                })
                this.tableData=res.data;
              }
              console.log(res);
            })
          },
          handleLook(id)
          {
            this.$router.push({path:"/layout/lookBook",query:{"id":id}})
          },
          handleDel(id)
          {
            this.$axios.delete(`/book/${id}`).then(res=>{
              console.log("res");
              if(res.code==200)
              {
                this.$message({
                  type:"success",
                  message:res.msg,
                }),
                this.getData()
              }
            }).catch(err=>{
              console.log(err);
              this.$message({
                type:"error",
                message:res.msg,
              })
            })
          },
        },
        created()
        {
          this.getData()
        }
    }
</script>

<style scoped>
  .BookImg
  {
    width:80px;
    height:80px;
  }

</style>
