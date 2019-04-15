<template>
  <div id="app">
    <div>
        <indexheader></indexheader>
    <indexleft :ljname='ljname'></indexleft>
    </div>
    <router-view/>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import indexheader  from '@/components/indexheader'
import indexleft  from '@/components/indexleft'
import loading  from '@/components/loading'
import {mapState} from 'vuex'
import qs from 'qs'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      ljname:'',
    }
  },
  computed: {
    ...mapState(['showLoading'])
  },
  methods: {
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
  // mounted() {
  //   this.bus.$on('success',()=>{
  //   this.isshow=true;
  //   });
  //    this.bus.$on('tuichu',() =>{
  //       this.isshow=false;
  //   });
  //   // this.isshow=true;
  // },
  mounted() {
      this.ljname=this.$route.name;
      this.getdenglu();
  },
  updated() {
    this.ljname=this.$route.name;
  },
  components:{indexheader,indexleft,loading}
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
/* .btn-default{
  border:none;
} */
input[type=file] {
  position: absolute;
      top: 0px;
    left: 0px;
   /* opacity:0; */
   cursor: pointer;
}
.upload_content{
  position: relative;
}
</style>
