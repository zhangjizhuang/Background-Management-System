<template>
  <div>
    <div class="box">
      <!-- <ul class="ul">
        <li :class="cur==i?'active':''" v-for="(v,i) in list" :key='i' @click="dianji(i)">
          <p>{{v}}</p>
        </li>
      </ul> -->
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading" @click="dianji(1)" :class="luyouname=='index'?'active':''" >
      <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion"  class="a1">首页</a></h4>
    </div>
    <!-- <div id="collapseOne" class="panel-collapse collapse in ye">
      <div class="panel-body">标题一对应的内容</div>
    </div> -->
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" @click="dianji(2)" :class="luyouname=='management'?'active':''" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
      <h4 class="panel-title"><a  class="a1">商品</a></h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse ye">
      <div class="panel-body" @click="management">商品管理</div>
       <div class="panel-body">品类管理</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" @click="dianji(3)" :class="cur==3?'active':''" data-toggle="collapse" href="#collapseThree">
      <h4 class="panel-title"><a  class="a1" data-parent="#accordion">订单</a></h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse ye">
      <div class="panel-body">订单管理</div>
    </div>
  </div>
   <div class="panel panel-default">
    <div class="panel-heading" @click="dianji(4)" :class="luyouname=='user'?'active':''" data-toggle="collapse" href="#collapseThree1">
      <h4 class="panel-title"><a data-parent="#accordion" class="a1" @click="user">用户</a></h4>
    </div>
    <div id="collapseThree1" class="panel-collapse collapse ye">
      <div class="panel-body">用户管理</div>
    </div>
  </div>
</div>



    </div>
  </div>
</template>

<script>
export default {
  name: "indexleft",
  data() {
    return {
      cur:'1',
      luyouname:'',
    };
  },
  props:['ljname'],
  methods: {
    // 点击改变背景色
    dianji(i){
      console.log(i)
      this.cur=i
      if(i==2){
         this.$router.push({path:'/management'});
      };
      if(i==1){
         this.$router.push({path:'/index'});
      }
    },
    // 点击商品管理
    management(){
      this.$router.push({path:'/management'});
    },
    // 点击用户管理
    user(){
        this.$router.push({path:'/user'});
    }
  },
  watch: {
    ljname(i){
      this.luyouname=i;
    }
  },
};
</script>

<style scoped>
.box {
  width: 260px;
  height: 100%;
  background: #2b2e33;
  position: fixed;
  top: 60px;
  left: 0px;
  z-index: 222;
}
.ul li {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #37393d;
  cursor: pointer;
}
.ul li p {
  font-size: 15px;
  color: #fff;
  line-height: 55px;
  text-align: center;
}
.active {
  background: #2dafcb!important;
}
.a1{
  display: inline-block;
  width: 100%;
  cursor: pointer;
}
.panel-heading{
  background: #2b2e33;
  color:#fff;
  border:none;
}
.panel-default {
    border-color: #2b2e33;
}
.ye{
  background: #000;
}
.panel-group .panel-heading+.panel-collapse>.panel-body {
    border-top: 1px solid #000;
    color:#fff;
}
</style>
