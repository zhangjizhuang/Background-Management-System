<template>
  <div class="loginModel_wp">
    <div class="loginModel">
      <div class="loginModelTitle">
        <span class="closeLogin" @click="clickClose">×</span>
      </div>
      <div class="loginModelContent">
        <p class="loginModelContent_title">Login in</p>
        <p>
          <input type="text" v-model="userName">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
        </p>
        <p>
          <input type="password" v-model="passWord">
          <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
        </p>
        <button @click="readyLogin">登录</button>
        <p class="error">{{errorMsg}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
import qs from "qs";
export default {
  name: "loginModel",
  data: function() {
    return {
      userName: "admin",
      passWord: "admin",
      errorMsg: "",
      name: ""
    };
  },
  methods: {
    // 通知父组件关闭弹出框
    clickClose() {
      this.$emit("closel");
    },
    // 点击登录
    readyLogin() {
      var obj = qs.stringify({
        username: this.userName,
        password: this.passWord
      });
      axios.post("/manage/user/login.do", obj).then(res => {
        this.name = res.data.data.username;
        if (res.data.status == 0) {
          // 成功
          this.$emit("success", this.name);
        }
      });
    }
  }
};
</script>

<style type="text/css" scoped="scoped">
.loginModel_wp {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 333;
}
.loginModel {
  width: 530px;
  height: 310px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginModelTitle {
  height: 40px;
  line-height: 40px;
  font-size: 25px;
}
.loginModelTitle span {
  float: right;
  padding: 0px 15px;
}
.loginModelContent {
  padding: 0px 50px;
}
.loginModelContent .loginModelContent_title {
  font-size: 22px;
  line-height: 40px;
}
.loginModelContent p {
  margin: 10px 0px;
  position: relative;
}
.loginModelContent p input {
  display: block;
  width: 100%;
  padding: 0px 10%;
  padding-left: 12%;
  line-height: 40px;
  margin: 0px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.loginModelContent span {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
  left: 5px;
}
.loginModelContent button {
  line-height: 40px;
  width: 100%;
  background-color: #009de6;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 20px;
  letter-spacing: 7px;
  padding-left: 7px;
  margin-top: 10px;
}
.loginModelContent .error {
  color: firebrick;
  font-size: 18px;
  line-height: 26px;
}
</style>
