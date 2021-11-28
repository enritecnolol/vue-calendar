<template>
  <div class="home">
    <div class="home__inner">
      <Calendar />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Calendar: () => import('@/components/calendar'),
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0 0 0;
  // align-items: center;
  background-color: #f5f5f5;
  &__inner {
    width: 100%;
    padding: 10px;
  }
}
</style>
