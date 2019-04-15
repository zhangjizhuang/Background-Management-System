<template>
  <div>
    <div class="box">
      <div class="biaoti">
        <p>
          <span>In</span>sight
        </p>
      </div>
      <!-- <div class="qdv" v-show="!isshow">
        <p @click="qdv">请登录</p>
      </div> -->
      <div class="liebiao">
        <!-- 头部下拉菜单组 -->
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#">@ddddddddddddd</a>
            </li>
            <li>
              <a href="#">Another action</a>
            </li>
            <li>
              <a href="#">Something else here</a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="#">Separated link</a>
            </li>
          </ul>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#">@</a>
            </li>
            <li>
              <a href="#">Another action</a>
            </li>
            <li>
              <a href="#">Something else here</a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="#">Separated link</a>
            </li>
          </ul>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#">@</a>
            </li>
            <li>
              <a href="#">Another action</a>
            </li>
            <li>
              <a href="#">Something else here</a>
            </li>
            <li role="separator" class="divider"></li>
            <li>，
              <a href="#">Separated link</a>
            </li>
          </ul>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#">用户资料</a>
            </li>
            <li>
              <a href="#">设置</a>
            </li>
            <li role="separator" class="divider"></li>
            <li @click="tuichu">
              <a href="#">退出</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <loginModel v-show="tccshow" @closel="closes" @success='successd'></loginModel>
  </div>
</template>

<script>
import loginModel from "@/components/loginModel";
export default {
  name: "indexheader",
  components: { loginModel },
  data() {
    return {
      tccshow: false,
    };
  },
  methods: {
    // 点击登录
    qdv() {
      this.tccshow = true;
    },
    // 点击退出
    tuichu() {
      this.$router.push({path:'/'});
      // this.bus.$emit('tuichu');
    },
    // 接受到子组件关闭请求，关闭弹出框
    closes() {
      this.tccshow = false;
    },
    // 接受登录成功状态
    successd(i){
      console.log(i)
      this.tccshow=false;
      this.isshow=true;
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.biaoti {
  color: #fff;
  width: 260px;
  height: 60px;
  float: left;
  font-size: 30px;
  font-weight: 700;
  line-height: 30px;
  background: #32323a;
}
.biaoti p {
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  text-align: left;
  line-height: 60px;
  margin-left: 15px;
}
.biaoti p span {
  color: #2dafcb;
}
.biaoti p:hover {
  color: #2dafcb;
  cursor: pointer;
}
.liebiao {
  float: right;
}
.liebiao .btn-default {
  border: none;
}
.glyphicon {
  left: -5px;
}
.btn-group > .btn:first-child {
  margin-left: 20px;
}
.qdv {
  margin-right: 50px;
}
</style>

