<template>
  <div id="loaderImage">
    <img src="../../static/loading/20140524124237518.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style scoped>
#loaderImage{
  position: fixed;
  z-index: 999;
  top: 50%;
  left:50%;
  transform: translate(-50% -50%);
}
</style>
