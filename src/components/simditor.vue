<template>
  <div class="simditor">
    <textarea :id="id" :value='detail'></textarea>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Simditor from 'simditor'
  import 'simditor/styles/simditor.css'
  export default {
    name: 'simditor',
    data() {
      return {
        editor: '',
        dd:'',
      }
    },
    props: {
      id:{
        type:Number,
        default:1001
      },  //这里传入动态id，一个页面能使用多个编辑器
      options: {  //配置参数
        type: Object,
        default() {
          return {}
        }
      },
      detail:{
        type:String,
      }
    },
    mounted() {
      let vm = this
      this.editor = new Simditor(Object.assign({}, {
        textarea: $(`#${vm.id}`)
      }, this.options))
      this.editor.on('valuechanged', (e, src) => {
        this.valueChange(e, src)
      })
    },
    methods: {
      valueChange(e, val) {
        this.$emit('change', this.editor.getValue())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
