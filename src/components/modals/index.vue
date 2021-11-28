<template>
  <b-modal
    :id="id"
    :title="title"
    :size='size'
    :hide-footer='true'
    :no-close-on-backdrop='true'
    :no-close-on-esc='true'
    :hide-header-close='hideHeaderClose'
  >
    <slot></slot>
  </b-modal>
</template>
<script>
export default {
  props: {
    id:String,
    title:String,
    size:{
      type:String,
      default: 'sm'
    },
    hideHeaderClose:{
      type:Boolean,
      default: false
    }
  }
}
</script>