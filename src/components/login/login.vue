<template>
  <div id="login">
      <img src="@/assets/logo.png" alt="" class="login-img">
      <div class="phone">
          {{telephone}}
          <a href="##" @click="tologin">
              <van-icon name="edit" color='#fff' />
          </a>
          <p class="small-size">天翼飞账号提供认证服务</p>
      </div>
      <van-button class="login-button" :disabled='ischeck' @click="login">一键登录</van-button>
        <div class="isok">
            <input type="checkbox" @change="ifchecked" ref="checkbox"><span class="small-size">同意《用户协议》《儿童隐私协议》《隐私政策》</span>
        </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
import { Button } from 'vant';
import { request } from '../../network/request';

export default {
name:'login',
components:{
    [Icon.name]:Icon,
    [Button.name]:Button
},
data(){
    return{
        telephone:this.$store.state.tel,
        ischeck:true
    }
},
methods: {
      getlist(){
      return request({
        url:'/search',
        params:{
          keywords:'海阔天空'
        }
      }).then(res=>{
        console.log(res.result.songs);
      })
    },
    ifchecked(){
        if(this.$refs.checkbox.checked){
            this.ischeck=false
        }else{
            this.ischeck=true
        }
    },
    tologin(){
        this.$router.push('/logining')
    },
    login(){
        return request({
            url:'/cellphone/existence/check',
            params:{
                phone:this.$store.state.tel
            }
        }).then(res=>{
            if(res.exist==-1){
                this.$router.push('/resgin')
            }else{
               this.$router.push('/loginIn') 
            }
        })
    }
},
}
</script>

<style>
#login{
    background-color: red;
    height: 100vh;
    display: flex;
   
    flex-direction: column;
    align-items: center;
    color: #fff;
    
}
.login-img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 100px;
 
}
.phone{
    margin-top: 250px;
    
}
.small-size{
    font-size: 10px;
    opacity: 0.7;
}
.login-button{
    margin-top: 10px;
    color: red;
    width: 70%;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 700;
}
.isok{
    margin-top: 50px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    position: relative;
    
}
.isok input{
    position: absolute;
    top: 10px;
    /* margin-top: 10px; */
}
.isok span{
    margin-left: 20px;
}
</style>