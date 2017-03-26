<template>
<div id="app">
    <div class= 'page'>
      <header>
        <Topbar/> 
      </header>
      <main>
        <ResumeEditor/>
        <ResumePreview/>       
      </main>
    </div>
  </div>  
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'
  import Topbar from './components/Topbar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'
  import icons from './assets/icons'
  import store from './store/index'
  import AV from './lib/leancloud'
  import getAVUser from './lib/getAVUser'

  export default {
    name: 'app',
    store,
    components: { Topbar, ResumeEditor, ResumePreview },
    created(){
      document.body.insertAdjacentHTML('afterbegin',icons) //将SVG 插入 body
      let state = localStorage.getItem('state');
      if (state) {
        state = JSON.parse(state);
      }
      this.$store.commit('initState', {});
      this.$store.commit('setUser',getAVUser());
    }
  }
</script>

<style lang='scss'>
    .page{
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #EAEBEC;    
      main{
        flex-grow:1; /*高度等分剩余空间*/
        min-width: 1024px;
        max-width: 1440px;
        margin-top: 16px;
        margin-bottom: 16px;     
        display: flex;
        justify-content: space-between;
        padding:0 16px;
        width: 100%;
        align-self: center; /*垂直居中*/
      }
    }
    #resumeEditor{
      min-width: 35%;
    }
    #resumePreview{
      width: 61.66667%;
      flex-grow: 1; /*水平等分剩余空间*/
      margin-left: 16px;
    }
    svg.icon{
      height: 1em;
      width: 1em;
      fill: currentColor; /*active时继承父元素li的样式*/
      vertical-align: -0.1em;
      font-size: 16px;
    }
</style>
