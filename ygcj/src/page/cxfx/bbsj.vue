<template>
  <div>
    <iframe
      v-show="iframeState"
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      style="width:100%;height:900px;"
      src="http://localhost:18080/cxbb/modules/rdp/rdpDesign.html"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      iframeState: true,
      goBackState: false
    }
  },
  mounted() {
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
  },
};
</script>
<style scoped>
</style>
