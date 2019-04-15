<template>
<div class="box">
  <div class="left">
    <img src="../../static/img/logo01.png" alt="">
  </div>
  <div class="right">
    <div class="boxs">
      <h3>欢迎登陆</h3>
      <p class="xengxian"></p>
      <div class="con">
        <form action="">
          <p class="p1">
             <input type="text" placeholder="用户名" v-model="username">
          </p>
         <p class="p2">
           <input type="password" placeholder="密码" v-model="password">
         </p>
         <button class="denglu" @click="denglu">
           登录
         </button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name:'logo',
  data() {
    return {
      username:'admin',
      password:'admin'
    }
  },
  methods: {
    denglu(){
      if(this.username==''||this.username==''){
        console.log('不能为空')
      }else{
         var obj = qs.stringify({
        username: this.username,
        password: this.password
      });
      axios.post("/manage/user/login.do", obj).then(res => {
        this.name = res.data.data.username;
        if (res.data.status == 0) {
          this.$router.push({path:'/index'});
          // 成功
          this.bus.$emit("success",2333);
        }
      });
      }

    }
  },
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
  .left{
    width: 50%;
    height: 100%;
    float: left;
  }
  .left img{
    width: 100%;
    height: 100%;
  }
  .right{
    width: 50%;
    height: 100%;
    background: #fff;
    float: right;
  }
  .boxs{
    width: 80%;
    height: 80%;
    /* background: skyblue; */
    margin: 10% auto;
  }
  .boxs h3{
    font-size: 30px;
    font-weight: bold;
    color:#626365;
    text-align: center;
  }
  .xengxian{
    width:50px;
    height: 3px;
    /* background: blue; */
    margin: 10px auto;
  }
  .con{
    width: 80%;
    /* background: yellow; */
    margin-top: 50px;
    margin: 50px auto;
  }
  .p2{
    margin-top: 20px;
  }
  form input{
    width: 100%;
    height: 40px;
    border-radius: 10px;
  }
  .denglu{
    width: 100%;
    height: 65px;
    background: #38c7ae;
    font-size: 20px;
    color:#fff;
     border-radius: 10px;
     margin-top: 20px;
  }
</style>
