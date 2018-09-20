<template>
   <div>
     <div>
       <div class="crumbs" style="margin-bottom: 20px;">
         <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
         </el-breadcrumb>
       </div>
       <el-table
         :data="tableData"
         border
         style="width: 100%">
         <el-table-column
           prop="title"
           label="书名"
           width="auto">
         </el-table-column>
         <el-table-column
           prop="ff"
           width="auto"
           label="图片">
           <template slot-scope="scope">
             <img :src="scope.row.img" class="img"/>
           </template>
         </el-table-column>
         <el-table-column
           prop="index"
           label="排序值"
           width="auto">
         </el-table-column>
         <el-table-column
           prop="sort"
           width="auto"
           label="分类">
         </el-table-column>
         <el-table-column  width="auto" label="操作">
           <template slot-scope="temp" >
             <el-button type="primary" size="small" @click="handleUpdate(temp.row._id)">修改轮播图</el-button>
             <el-button type="danger" size="small" @click="handleDel(temp.row._id)">删除轮播图</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
   </div>
</template>

<script>
    export default {
        name: "getViewList",
        data()
        {
          return{
            tableData:[],
          }
        },
        methods:{
          getData()
          {
            this.$axios.get("/swiper",{"pn":1,"size":200}).then(res=>{
              console.log(res);
              if(res.code==200)
              {
               this.tableData=res.data;
              }
            })
          },
          handleDel(id)
          {
            this.$axios.post("/swiper/delete",{ids:[id]}).then(res=>{
             if(res.code==200)
             {
               this.$message({
                 type:"success",
                 message:res.msg,
               })
               this.getData();
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
              this.$router.push({path:"/layout/editView",query:{"id":id}});
          }
        },

        created()
        {
          this.getData();
        }
    }
</script>

<style scoped>
.img{
  width:80px;
  height:80px;
}

</style>
