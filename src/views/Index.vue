<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <main-card></main-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MainCard } from "@/components";

export default {
  components: {
    MainCard
  },
  bodyClass: "main-page",
  data() {
    return {
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/cinema.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css">
</style>
