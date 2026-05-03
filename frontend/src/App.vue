<template>
  <TopHeader />
  <MiddleHeader />

  <main class="body-wrap">
    <router-view />
  </main>

  <Footer />
</template>

<script>
import TopHeader from "@components/TopHeader.vue";
import MiddleHeader from "./components/MiddleHeader.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    TopHeader,
    MiddleHeader,
    Footer,
  },
};
</script>
