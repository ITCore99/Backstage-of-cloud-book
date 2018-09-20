<template>
    <div class="user-manage">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>分类用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="nickname"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="HandleDate"
          label="日期"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="desc"
          width="auto"
          label="个性签名">
        </el-table-column>
        <el-table-column
          prop="desc"
          width="130"
          label="用户头像">
           <template slot-scope="scope">
              <img :src="scope.row.avatar" class="avatar">
           </template>
        </el-table-column>
        <el-table-column  width="auto" label="操作">
          <template slot-scope="temp" >
            <el-button type="primary" @click="handleDetails(temp.row)">详请</el-button>
            <el-button type="danger"  @click="handlerDel(temp.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="AllWatch">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "users",
        data(){
          return{
            tableData:[],
            id:"",
            All:0,
            pageSize:"",
          }
        },
        methods:{
          getData(pn)
          {
              this.$axios.get("/user",pn).then(res=>{
                console.log(res);
                if(res.code==200)
                {
                  res.data.map(item=>{
                    let HandleDate=new Date(item.createdTime);
                       item.HandleDate=HandleDate.toLocaleString();
                  })
                  console.log(res);
                  this.All=res.count;
                  this.tableData=res.data;
                }
              }).catch(err=>{
                console.log(err);
              })
          },
          handleDetails(data)
          {
            this.$router.push({path:"/layout/detail"});
            let date=new Date(data.updatedTime);
            data.HandleUpdateTime=date.toLocaleString();
            this.$store.commit("SETSTATE_USERINFODETAIL",data);

          },
          handlerDel(id)
          {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post("/user/delete",{"userIds":id}).then(res=>{
                if(res.code==200)
                {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getData({pn:1});
                }else
                {
                  this.$message({
                    message:res.msg
                  });
                }
              }).catch()
            }).catch(() => {

              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          handleCurrentChange(val)
          {
              this.getData({pn:val})
          },
      },
      created(){
        this.getData({pn:1}); /**当组件即将被挂载之前*/
      },
      computed:{
        AllWatch()
        {
          return this.All;
        }
      }
    }
</script>

<style scoped lang="scss">
.user-manage
{
  .crumbs {
    margin-bottom: 20px;
  }
  .avatar{
      width:60px;
      height:60px;
  }
   .el-pagination
  {
    text-align: center;
  }
  .block
  {
    padding:20px 0;
  }
}
</style>
