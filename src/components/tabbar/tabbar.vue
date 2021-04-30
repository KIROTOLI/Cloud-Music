<template>
  <div class="tabbar">
      <van-row class="row">
        <van-col span="3">
            <van-icon name="wap-nav" size='30px' @click="showPopup"/>
        </van-col>
        <van-col span="14" offset='2' class="center-bar">
           <div v-for='(item ,i) in name' :key='i'  @click="changehome($event)" :class="{ activeclass:changeRed == i}">
                <span :name="'item'+i" >{{item}}</span>
           </div>
           
        </van-col>
        <van-col span="3" offset='2'>
            <van-icon name="search"  size='30px' />
        </van-col>
      </van-row>

      <van-popup v-model:show="show" position="left" :style="{ width:'70%',height:'100%'}"  />
  </div>
</template>


<script>
import { Col } from 'vant';
import { Row } from 'vant';
import { Icon } from 'vant';
import { Popup } from 'vant';
export default {
name:'tabbar',
data(){
    return{
        // isacive:true,
        name:['我的','发现','云村','视频'],
        changeRed:1,
        show:false
    }
},
components:{
    [Col.name]:Col,
    [Row.name]:Row,
    [Icon.name]:Icon,
    [Popup.name]:Popup
},
computed:{
    
    
},
methods:{
    changehome(e){
        if(e.srcElement.getAttribute('name')=='item0'){
            this.changeRed=0
            this.$router.replace('/mine')
        }else if(e.srcElement.getAttribute('name')=='item1'){
            this.changeRed=1
            this.$router.replace('/descover')
        }else if(e.srcElement.getAttribute('name')=='item2'){
            this.changeRed=2
            this.$router.replace('/yuncun')
        }else{
            this.changeRed=3
            this.$router.replace('/movie')
        }     
    },
    showPopup(){
        this.show=true
    }
}
}
</script>

<style>
.row{
    height: 42px;
    text-align: center;
    line-height: 42px;
    font-size: 20px;
    
}
.center-bar{
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
}
.van-icon {
    margin-top: 10px;
}
.activeclass{
    font-weight: 1000;
    color: red;
    transition: 0.3s;
}
</style>