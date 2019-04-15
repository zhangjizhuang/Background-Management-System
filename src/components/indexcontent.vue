<template>
  <div>
     <div class="right">
      <div class="boxx">
        <div class="box1">
          <h3>数据摘要</h3>
          <ol class="breadcrumb">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Library</a>
            </li>
            <li class="active">Data</li>
          </ol>
          <div class="shujuzs">
            <div class="lists">
              <div class="list">
                <h4>{{list.orderCount}}</h4>
                <p>每日访问</p>
              </div>
              <div class="list1">
                <h4>{{list.productCount}}</h4>
                <p>商品数量</p>
              </div>
              <div class="list2">
                <h4>{{list.userCount}}</h4>
                <p>用户数量</p>
              </div>
              <div class="list3">
                <h4>36752</h4>
                <p>访问次数</p>
              </div>
            </div>
            <div class="lists1">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'indexcontent',
  data() {
    return {
      list:[],
      dd:'',
    }
  },
  methods: {
    getdata(){
      axios.post('/manage/statistic/base_count.do',).then((res) =>{
        this.list=res.data.data;
          console.log(res.data.data)
      })
    }
  },
  mounted() {
    this.getdata();
    this.bus.$on('success',(i)=>{
      this.dd=i;
      console.log(i)
    })
  },
}
</script>

<style scoped>
.right {
  width: 81%;
  height: 100%;
  position: absolute;
  top: 60px;
  right: 0;
  background: #f3f3f3;
}
.boxx {
  margin: 0 auto;
  width: 94%;
}
.box1 {
  margin-top: 50px;
}
.box1 h3 {
  font-size: 22px;
  color: #828282;
  padding-bottom: 20px;
}
.shujuzs{
  width: 100%;
  height: 420px;
  /* background: skyblue; */
}
.lists{
  width: 100%;
  display: flex;
justify-content: space-between;
}
.list{
  height: 158px;
  width: 230px;
  /* background: #5CB85C; */
  background: url(../../static/img/tu1.png);
  background-size: 100% 100%;
}
.list1{
  height: 158px;
  width: 230px;
  /* background: #5CB85C; */
  background: url(../../static/img/tu2.png);
  background-size: 100% 100%;
}
.list2{
  height: 158px;
  width: 230px;
  /* background: #5CB85C; */
  background: url(../../static/img/tu3.png);
  background-size: 100% 100%;
}
.list3{
  height: 158px;
  width: 230px;
  /* background: #5CB85C; */
  background: url(../../static/img/tu4.png);
  background-size: 100% 100%;
}
.list h4,.list1 h4,.list2 h4,.list3 h4{
  color: #fff;
  font-size: 50px;
  text-align: center;
  padding-top: 30px;
}
.list p,.list1 p,.list2 p,.list3 p{
  color: #fff;
  font-size: 20px;
  text-align: center;
  padding-top: 10px;

}
.zhiti{
  font-size: 150px;
  color: #74C274;
  text-align: center;
}
.span{
  font-size: 32px;
  text-align: center;
  display: inline-block;
}
</style>
