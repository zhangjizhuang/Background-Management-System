<template>
  <div class="box">
    <div class="spgl">
      <p>用户管理</p>
    </div>
    <div class="tables">
      <table class="table table-striped table-bordered table-hover mb10">
        <thead>
          <tr class="tr">
            <!-- <th class="wd24">
              <input type="checkbox" name id="all">
            </th> -->
            <th class="wd45">ID</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>电话</th>
            <th>创建时间</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody class="student_list">
          <tr v-for="(v,i) in list" :key="i">
          <td>{{v.id}}</td>
          <td>{{v.username}}</td>
          <td>
           {{v.email}}
          </td>
          <td>{{v.phone}}</td>
          <td>
          {{v.createTime | getTime}}
          </td>
          <td>
           {{v.updateTime | getTime}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页组件 -->
    <Paging
      :name="name"
      @change="onPageChange"
      :page-size="size"
      :total="total"
      layout="jumper,total"
      :current-page="curPage"
     class="fenye"/>
  </div>
</template>

<script>
import Paging from "@/components/Paging";
import axios from 'axios'
import qs from 'qs'

export default {
  name:'user',
  data() {
    return {
      name:'',
      list:[],
       size: 10, //一页多少数量
      total: 201,// 总条目数
      curPage: 1, //页码
    }
  },
  components:{Paging},
  methods: {
    // 点击分页根据页码渲染页数
    onPageChange: function(page) {
      this.curPage = page.curPage;
      this.getdata();
    },
    getdata:function(){
      var data=qs.stringify({
        pageSize:this.size,
        pageNum:this.curPage
      })
      axios.post('/manage/user/list.do',data).then((res) =>{
        this.list=res.data.data.list;
        this.total=res.data.data.total;
        console.log(res.data)
      })
    }
  },
  mounted() {
    this.getdata();
  },
}
</script>

<style scoped>
.box {
  width: 81%;
  height: 100%;
  position: absolute;
  top: 60px;
  right: 0;
  background: #f3f3f3;
}
.spgl {
  width: 95%;
  height: 80px;
  /* background: red; */
  margin: 0 auto;
}
.spgl p {
  line-height: 80px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: bold;
}
.tables{
   width: 95%;
  margin: 0 auto;
  /* background: red; */
}
.tr{
  background: #D9ECF6;
}
.fenye{
  margin: 0 auto;
  width: 60%;
}
</style>
