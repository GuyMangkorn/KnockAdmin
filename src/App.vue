<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TestModule from "@/components/TestModule.vue";
export default {
  components: {
    'app-header':Header,
    'app-test':TestModule
  },

  data: () => ({
  }),
};
</script>
