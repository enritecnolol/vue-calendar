<template>
  <div class="badge" @click='selectBadged'>
    <span
      :class="['badge__title']"
      :style='{backgroundColor: color}'
    > {{dateString}} {{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'badge',
  props: {
    id: Number,
    city: String,
    color: String,
    dateTime: Object,
    date: String,
    time: String,
    title: String,
  },
  methods:{
    selectBadged()
    {
      this.$emit('selectBadge');
    }
  },
  computed: {
    dateString() {
      return `${this.dateTime.format('hh:mm a')}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  font-size: 14px;
  margin: 0 0 3px 0;
  width: 100%;
  position: relative;
  text-align: left;
  padding: 0 !important;

  &__time {
    color: white;
  }

  &__title {
    border-radius: 5px;
    padding: 0 3px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 98%;
  }
}
</style>