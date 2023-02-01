<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="less" >
  html, body, h3, p{
    margin: 0;
    padding: 0;
  }
</style>



<!-- 问题 -->
<!-- 如何解决导航点击两次报错 -->

<!-- 在新增或编辑用户信息时有bug -->
<!-- //如果是采用下面的引用，在先点击新增,再点击编辑，然后关闭对话框，会清空form中的数据，而from数据指向的是当前行，所以当前行会被清空
//在先点击编辑时，会使form的数据指向当前行，再点击新增，新增中的数据变成了当前行的数据，此时再点击编辑不会再清空，因为resetFields只会返回到第一次读取form中的数据
// this.form = row
//改成深拷贝时，在先点击编辑，再点击新增，对话框会显示第一次编辑的数据，因为在resetFields读取之前from数据变成了第一次编辑的数据
 this.form = JSON.parse(JSON.stringify(row)) -->

<!-- 在上一个用户有面包屑记录而下一个用户登录的时候没刷新,登进去会继承上一个用户的面包屑纪律 -->

<!-- 在先登管理员的账号然后再等用户的,还是可以访问到管理员的页面,刷新就没有了 -->

<!-- 学习 -->
 <!-- 正则 -->
 <!-- mock -->

<!-- 插件 -->
<!-- js-cookie -->
<!-- mockjs -->
