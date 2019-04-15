<template>
  <div class="box">
    <div class="spgl">
      <p>{{title}}</p>
      <button @click="fanhui">返回</button>
    </div>
    <div class="boxs">
      <div class="div1">
        <span>所属分类：</span>
        <select name id @change="jianting($event)">
          <option :value="v.id" v-for="(v,i) in list" :key="i">{{(i+1)+"---"+v.name}}</option>
        </select>
        <select name id>
          <option :value="v.id" v-for="(v,i) in lists" :key="i">{{(i+1)+"---"+v.name}}</option>
        </select>
      </div>
      <div class="div1">
        <span>商品名：</span>
        <input type="text" v-model="shanpinm">
      </div>
      <div class="div1">
        <span>副标题：</span>
        <input type="text" v-model="fubiaoti">
      </div>
      <div class="tupian ffff">
        <div class="imgs">
          <p>图片：</p>
          <div class="tubk" v-for="(v,i) in imgs" :key="i">
            <img :src="v.url" alt>
          </div>
        </div>
        <tupianshangchuan @uploadsuss="uploadsuss"></tupianshangchuan>
      </div>
      <div class="div11">
        <span>状态：</span>
        <input type="radio" value="1" v-model="zt">上架
        <input type="radio" value="2" v-model="zt">下架
      </div>
      <div class="div1">
        <span>价格：</span>
        <input type="text" v-model.number="jiage">
      </div>
      <div class="div1">
        <span>库存：</span>
        <input type="text" v-model.number="kucun">
      </div>
      <div>
        <!--simditor编辑器  -->
        <div class="index">simditor编辑器
          <br>
          <simditor v-if="isshow" :options="options" @change="change" :detail="detail"></simditor>
        </div>
        <div class="div1">
          <button @click="tijiao" class="login-button">{{btnname}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Simditor from "@/components/Simditor";
import tupianshangchuan from "@/components/tupianshangchuan";
export default {
  name: "xiugai",
  components: { Simditor, tupianshangchuan },
  data() {
    return {
      content: "",
      options: {
        placeHolder: "this is placeHolder",
        toolbarFloat: false,
        toolbar: [
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "fontScale",
          "color",
          "|",
          "ol",
          "ul",
          "blockquote",
          "code",
          "table",
          "|",
          "link",
          "image",
          "hr",
          "|",
          "indent",
          "outdent",
          "alignment"
        ],
        pasteImage: true,
        upload: {
          url: `/manage/product/richtext_img_upload.do`, //文件上传的接口地址
          params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
          fileKey: "upload_file", //服务器端获取文件数据的参数名
          connectionCount: 3,
          leaveConfirm: "正在上传文件"
        }
      },
      list: [], //一级标题列表
      lists: [], //二级标题列表
      yijibtid: 100000, //一级标题id
      shanpinm: "", //商品名
      fubiaoti: "", //副标题
      imgs: [], //图片列表
      zt: 1, //上架true,下架false
      jiage: 0, //价格
      kucun: 0, //库存,
      fwb: "", //富文本内容,
      categoryIds: -1, //id,
      detail: "", //详情
      subImages: "",
      ID: 0,
      isshow: false,
      title: "新增商品",
      btnname: "提交商品",
      biaoshi: false
    };
  },
  methods: {
    //  监听富文本
    change(val) {
      // console.log(val)  //以html格式获取simditor的正文内容
      this.fwb = val;
    },
    // 监听一级数据
    jianting(evt) {
      this.yijibtid = evt.target.value;
      this.getdata2();
      console.log(this.yijibtid);
    },
    // 监听图片上传成功回调
    uploadsuss(res) {
      this.imgs.push(res.data);
      // this.subImages=res.data.url;
      //  console.log(this.subImages);
    },
    // 监听图片上传失败回调
    uploaderr(res) {
      console.log(res);
    },
    fanhui() {
      this.$router.push({ path: "/management" });
    },
    // 点击提交
    tijiao() {
      if (this.biaoshi == false) {
        if (this.shanpinm == "") {
          alert("请输入商品名");
        } else if (this.fubiaoti == "") {
          alert("请输入副标题");
        } else if (this.jiage == "") {
          alert("请输入价格");
        } else if (this.kucun == "") {
          alert("请输入库存");
        } else {
          this.getshuju();
        }
      }else if(this.biaoshi == true){
            if (this.shanpinm == "") {
          alert("请输入商品名");
        } else if (this.fubiaoti == "") {
          alert("请输入副标题");
        } else if (this.jiage == "") {
          alert("请输入价格");
        } else if (this.kucun == "") {
          alert("请输入库存");
        } else {
          this.getxiugai();
        }
      }
    },
    // 品类接口一级分类
    getdata() {
      axios.post("manage/category/get_category.do").then(res => {
        this.list = res.data.data;
      });
    },
    // 品类接口二级分类
    getdata2() {
      var obj = qs.stringify({
        categoryId: this.yijibtid
      });
      axios.post("manage/category/get_category.do", obj).then(res => {
        this.lists = res.data.data;
      });
    },
    // 点击提交请求数据
    getshuju() {
      var obj = qs.stringify({
        categoryId: this.categoryIds,
        name: this.shanpinm,
        subtitle: this.fubiaoti,
        mainImage: this.subImages,
        subImages: this.subImages,
        detail: this.detail,
        price: this.jiage,
        stock: this.kucun,
        status: this.zt
      });
      axios.post("/manage/product/save.do", obj).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          alert(res.data.data);
          this.$router.push({ path: "/management" });
        } else if (res.data.status != 0) {
          alert(res.data.data);
        }
      });
    },
    // 提交商品修改数据
    getxiugai(){
      var obj=qs.stringify({
          categoryId: this.categoryIds,
        name: this.shanpinm,
        subtitle: this.fubiaoti,
        subImages: this.subImages,
        detail: this.detail,
        price: this.jiage,
        stock: this.kucun,
        status: this.zt,
        id:this.$route.query.id
      })
      axios.post('/manage/product/save.do',obj).then((res) =>{
         if (res.data.status == 0) {
          alert(res.data.data);
          this.$router.push({ path: "/management" });
        } else if (res.data.status != 0) {
          alert(res.data.data);
        }
      })
    },
    getdata3() {
      let sel = this;
      var ddd = 0;
      new Promise((resolve, reject) => {
        //  通过id获取商品信息
        var obj = qs.stringify({
          productId: sel.ID
        });
        axios.post("/manage/product/detail.do", obj).then(res => {
          console.log(res.data.data);
          var ress = res.data.data;
          var img = ress.imageHost + ress.mainImage;
          if (res.data.status == 0) {
            this.shanpinm = ress.name;
            this.fubiaoti = ress.subtitle;
            this.subImages = ress.subImages;
            this.imgs = this.imgtoarr(this.subImages);
            this.zt = ress.status;
            this.detail = ress.detail;
            this.isshow = true;
            this.jiage = ress.price;
            this.kucun = ress.stock;
            this.yijibtid = ress.categoryId;
            ddd = ress.categoryId;
          }
          resolve(); //执行完毕状态
        });
      }).then(function() {
        return new Promise((resolve, reject) => {
          var obj2 = qs.stringify({
            categoryId: ddd
          });
          setTimeout(res => {
            axios.post("manage/category/get_category.do", obj2).then(res => {
              sel.list = res.data.data;
              console.log(res);
            });
          }, 2000);
          resolve();
        });
      });
    },
    imgtoarr: function(str) {
      //把图片字符串 转换成 数组
      if (typeof str == "string") {
        var arr = str.split(",");
        var rarr = [];
        arr.forEach(val => {
          rarr.push({
            uri: "e6604558-c0ff-41b9-b6e1-30787a1e3412.jpg",
            url: val
          });
        });
        return rarr;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.getdata();
    this.getdata2();
    // 获取商品id
    if (this.$route.query.id != undefined) {
      this.ID = this.$route.query.id;
      this.getdata3();
      this.title = "编辑商品";
      this.btnname = "提交修改";
      this.biaoshi = true;
    }
  },
  watch: {
    imgs: function(newdata) {
      var arr = [];
      for (var i = 0; i < newdata.length; i++) {
        arr.push(newdata[i].url);
      }
      this.subImages = arr.join(",");
    }
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
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background: #357ab5;
  color: #fff;
}
.boxs {
  width: 90%;
  margin: 0 auto;
}
.sctp {
  width: 80px;
  height: 30px;
  border-radius: 5px;
  background: #357ab5;
  color: #fff;
  margin-top: 10px;
  margin-left: 60px;
}
.div1,
.div11 {
  margin-top: 20px;
}
.div1 select {
  width: 188px;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.div1 input {
  width: 300px;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.tubk {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border: 1px solid #ccc;
}
.tubk img {
  width: 100%;
  height: 100%;
}
.imgs {
  display: flex;
  align-items: center;
}
.imgs p {
  margin-right: 20px;
}
.tupian {
  margin-top: 20px;
}
.ffff {
  position: relative;
}
.login-button {
  /* 按钮美化 */
  width: 100px; /* 宽度 */
  height: 40px; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #1e90ff; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 17px; /* 字体大小 */
}
.login-button:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}
</style>
