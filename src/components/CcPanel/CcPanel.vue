<template>
  <div class='panel'>
    <div class='panel-title'
         v-if='title'>
      <span v-if='icon' class='iconfont' :class='icon'></span> {{title}}
      <span class='panel-subtitle'
            v-if='subTitle'>
        {{subTitle}}
      </span>
    </div>
    <div class='panel-body'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cc-panel',
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
    },
    data() {
      return {}
    },
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {}
  }
</script>

<style lang='scss'
       scoped>
  @import "src/styles/variables.scss";

  .panel {
    // border: 1px solid $border-color;
    margin-bottom: 20px;
    background: #fff;
    .panel-title {
      // border-bottom: 1px solid $border-color;
      padding: 30px;
      height: 80px;
      color: #454545;
      font-size: 16px;
      font-weight: bold;
      // background: #F5FBFF;
      position: relative;
     /* &:before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 20px;
        // background: #39d2aa;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }*/
      .panel-subtitle {
        font-size: 14px;
        color: #999;
        margin-left: 20px;
      }
    }
    .panel-body {
      padding: 20px;
      background: #fff;
      overflow-y: auto;
      &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
      }
    }
  }

</style>
