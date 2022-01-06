<template>
  <div id="app">
    <Header></Header>
    <Slider></Slider>
    <Test></Test>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Slider from "./components/Slider.vue";
import Test from "./components/Test.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Slider,
    Test,
    Footer,
  },
};
</script>

<style>

</style>
