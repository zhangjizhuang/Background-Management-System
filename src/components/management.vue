<template>
  <div class="box">
    <div class="spgl">
      <p>商品管理</p>
      <button @click="tianjia">添加商品</button>
    </div>
    <div class="sousuo">
      <select name id @change="dianji">
        <option value='1'>按名称查询</option>
        <option value='2'>按ID查询</option>
      </select>
      <input type="text" placeholder="关键字/ID" v-model="sousuo">
      <button @click="sousuos">搜索</button>
    </div>
    <div class="liebiaos">
      <table class="table table-striped table-bordered table-hover mb10">
        <thead>
          <tr>
            <!-- <th class="wd24">
              <input type="checkbox" name id="all">
            </th> -->
            <th class="wd45">商品ID</th>
            <th>商品信息</th>
            <th>图片</th>
            <th>价格</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody class="student_list">
          <tr v-for="(v,i) in list" :key="i">
          <td>{{v.id}}</td>
          <td>{{v.name}}</td>
          <td>
            <img :src="imgsrc(v.imageHost,v.mainImage)" alt>
          </td>
          <td>￥{{v.price}}</td>
          <td>
            <input type="radio"  value="1" v-model="v.status">上架
            <input type="radio"  value="2" v-model="v.status">下架
          </td>
          <td>
            <button @click="xiangqing(v.id)">详情</button>
            <button @click="bianji(v.id)">编辑</button>
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
<!--
Paging属性
page-size 每页显示条目个数
total 总条目数
current-page 当前页数
layout 布局 默认不显示 jumper,total

Paging事件
change 当前页改变时触发
 -->
<script>
import Paging from "@/components/Paging";
import axios from "axios";
import qs from "qs";
export default {
  name: "indexcontent1",
  components: { Paging },
  data() {
    return {
      msg: "",
      name: "",
      size: 10, //一页多少数量
      total: 201,// 总条目数
      curPage: 1, //页码
      list: [],//数据
      sousuo:'',//搜索商品
      num:1,
      values:1,
    };
  },
  methods: {
    dianji(evt){
      this.values=evt.target.value;
    },
    // 点击分页根据页码渲染页数
    onPageChange: function(page) {
      this.curPage = page.curPage;
      console.log(this.curPage);
      if(this.num==1){
         this.getdata();
      }else if(this.num==2){
        this.sousuos();
      }
      // var obj = qs.stringify({
      //   pageNum: this.curPage,
      //   pageSize: this.size
      // });
      // axios.post("/manage/product/list.do", obj).then(res => {
      //   this.list = res.data.data.list;
      //   this.total = res.data.data.total;
      //   console.log(this.list);
      // });

    },
    // 详情
    xiangqing(){

    },
    // bianji
    bianji(id){
      this.$router.push({path:'/xiugai',query:{
      id
      }});
    },
    // 点击搜索按钮
    sousuos(){
      if(this.values==1){
        console.log(this.values)
        var obj=qs.stringify({
          productName:this.sousuo,
          // productId:this.productId,
          pageNum:this.curPage,
          pageSize: this.size
        })
        axios.post('/manage/product/search.do',obj).then((res)=>{
          this.list=[];
          this.list=res.data.data.list;
          this.total = res.data.data.total;
          this.num=2;
        })
      }else if(this.values==2){
        console.log(this.values)
        var obj=qs.stringify({
          productId:this.sousuo,
          pageNum:this.curPage,
          pageSize: this.size
        })
        axios.post('/manage/product/search.do',obj).then((res)=>{
          this.list='';
          this.list=res.data.data.list;
          this.total = res.data.data.total;
          this.num=2;
        })
      }
    },
    // 图片
    imgsrc:function(host,src){
				var imgsrc='';
				if(src===null){
					imgsrc= host;
				}else if(typeof(src)=='string'&&src.indexOf('http:')!=-1){
					imgsrc= src;
				}else{
					imgsrc= host+src;
				}
				return imgsrc;
			},
    // 点击添加按钮
    tianjia(){
      this.$router.push({path:'/xiugai'});
    },
    //页面挂载后渲染数据
    getdata: function() {
      var obj = qs.stringify({
        pageNum: this.curPage,
        pageSize: this.size
      });
      axios.post("/manage/product/list.do", obj).then(res => {
        this.list = res.data.data.list;
        this.total = res.data.data.total;

      });
    },
    // 检测用户是否登录
    getdenglu:function(){
      var data=qs.stringify({
        pageNum:1,
        pageSize:10,
      })
      axios.post('/manage/product/list.do',data).then((res) =>{
        if(res.data.status==10){
          this.$router.push({path:'/'});
        }
      })
    }
  },
  mounted() {
    this.getdata();
    this.getdenglu();
  }
};
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.spgl p {
  font-size: 30px;
  font-weight: bold;
}
.spgl button {
  width: 80px;
  height: 30px;
  background: #357ab5;
  color: #fff;
}
.sousuo {
  width: 95%;
  margin: 0 auto;
  height: 50px;
  /* background: skyblue; */
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.sousuo select {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin-right: 10px;
}
.sousuo input {
  width: 250px;
  height: 30px;
  border-radius: 5px;
  margin-right: 10px;
}
.sousuo button {
  width: 60px;
  height: 30px;
  border-radius: 5px;
  color: #fff;
  background: #357ab5;
}
.liebiaos {
  width: 95%;
  margin: 0 auto;
  /* background: yellow; */
  margin-top: 15px;
}
table {
  width: 100%;
}
table th {
  width: 16%;
  text-align: center;
  font-size: 20px;
  background: #d9ecf6;
}
table tr td {
  text-align: center;
  background: #fff;
}
table tr td img {
  width: 60px;
  height: 60px;
}
table tr td button {
  width: 60px;
  height: 30px;
  border-radius: 5px;
  color: #fff;
  background: #357ab5;
}
.fenye{
  margin: 0 auto;
  width: 60%;
}
</style>
