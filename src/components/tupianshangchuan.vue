<template>
<div>
<div id="upload_content">
	<vue-file-upload
	  url='/manage/product/upload.do'
	  ref="vueFileUploader"
	  :filters = "filters"
	  :events = 'cbEvents'
	  :request-options = "reqopts"
	  :name="'upload_file'"
	  :autoUpload="true"
	  v-on:onAdd = "onAddItem"
	  >
	  <span slot="label">
	  	<button class="btn btn-primary btns1">请选择图片</button>
	  </span>
	  </vue-file-upload>
 </div>
<table style="display:none;">
  <thead>
    <tr>
      <th> name</th>
      <th> size </th>
      <th> progress</th>
      <th> status </th>
      <th> action </th>
    </tr>
   </thead>
  <tbody>
    <tr v-for='file in files'>
      <td v-text='file.name'></td>
      <td v-text='file.size'></td>
      <td v-text='file.progress'></td>
      <td v-text='onStatus(file)'></td>
      <td>
      	 <button type='button' @click="uploadItem(file)"> 上传</button>
		 <button type='button' @click="uploadAll">上传所有文件</button>
		 <button type='button' @click="clearAll"> 清空文件列表</button>
      </td>
    </tr>
  </tbody>
 </table>

</div>
</template>
<script>
import VueFileUpload from 'vue-file-upload';
export default{
  name:'tupianshangchuan',
  data(){
    return{
      files:[],
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log("finish upload;")
        },
        //上传失败回调
        onErrorUpload:(file,response,status,headers)=>{
        	this.$emit('uploaderr',response);
        },
        //上传成功回调
      	onSuccessUpload:(file,response,status,headers)=>{
      		this.$emit('uploadsuss',response);

      	}
      },
      //xhr请求附带参数
      reqopts:{
        responseType:'json',
        withCredentials:false
      }
    }
  },
  mounted(){
    //设置formData数据
    this.$refs.vueFileUploader.setFormDataItem('authorization',"123");
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    onAddItem(files){
        this.files = files;
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$refs.vueFileUploader.uploadAll();
    },
    clearAll(){
      //清空所有文件
      this.$refs.vueFileUploader.clearAll();
    }
  },
  components:{
    VueFileUpload
  }
}
</script>

<style scoped>
table,tr,td,th{
	border:1px solid #000;
}
input[type=file] {
    display: none;
    
}
</style>
