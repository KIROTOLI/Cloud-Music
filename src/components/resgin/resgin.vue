<template>
  <div>
        <van-row class="login-van-row">
        <van-col span="4" @click="back">
            <van-icon name="arrow-left" size='25px' style="margin-top:8px"/>
        </van-col>
        <van-col span="20">设置密码</van-col>
        <p style="font-size:14px;color:#bbb;margin:20px;margin-bottom:0">请设置登陆密码，8-20位字符，至少包含字母/数字/符号2种组合</p>
        <van-field v-model="password" type="password"  class='phone-login' placeholder="请输入密码"
        :rules="[{ required: true,min:8, message: '请输入正确内容' }]"
        @focus="showKeyboard = true"/>

        <van-button class="next" @click="log" :disabled="isreg">完成</van-button>
        </van-row>
       
        <van-number-keyboard
            v-model="password"
            :show="showKeyboard"
             @input="pasinput"
            @blur="showKeyboard = false"
            @delete='deletepas'
            />
  </div>
</template>

<script>
import {request} from '@/network/request.js'
import { Col, Row } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { PasswordInput,NumberKeyboard  } from 'vant';
import { Toast } from 'vant';

export default {
name:'resgin',
data(){
    return{
        password:'',
        showKeyboard:false,
        isreg:true
    }
},
components:{
    [Col.name]:Col,
    [Row.name]:Row,
    [Icon.name]:Icon,
    [Field.name]:Field,
    [Button.name]:Button,
    [PasswordInput.name]:PasswordInput,
    [NumberKeyboard.name]:NumberKeyboard,
    [Toast.name]:Toast,
    request
},
methods: {
    
  
    pasinput(){
        console.log(this.password.length);
        if(this.password.length+1!=0){
            this.isreg=false
        }else{
            this.isreg=true
        }
    },
    deletepas(){

        if(this.password.length-1==0){
            this.isreg=true
        }
    },
    back(){
        this.$router.go(-1)
    },
    log(){
        return request({
            url:'/login/cellphone',
            params:{
                phone:this.$store.state.tel,
                password:this.password
            }
        }).then(res=>{
            console.log(res);
        })
    }
},
}
</script>

<style>
.login-van-row{
    padding-top: 10px;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    
    
}
.phone-login{
    border-bottom: 2px solid #ccc;
    margin-top: 20px;
}
.next{
    margin-top: 20px;
    background-color: red;
    border-radius: 50px;
    width: 70%;
    color: #fff;
    font-weight: 700;
}
.inppp{
    margin-top: 200px;
}
</style>