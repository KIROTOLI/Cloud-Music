<template>
  <div>
        <van-row class="login-van-row">
        <van-col span="4" @click="back">
            <van-icon name="arrow-left" size='25px' style="margin-top:8px"/>
        </van-col>
        <van-col span="20">手机号登录</van-col>
        <p style="font-size:14px;color:#bbb;margin-top:20px">未注册手机号登录后将自动创建手机号</p>
        <van-field v-model="$store.state.tel" type="tel" label="手机号" class='phone-login' placeholder="请输入手机号"/>

        <van-button class="next" @click="tonext">下一步</van-button>
        </van-row>
         <van-password-input class="inppp"
            :value="value"
            :length="4"
            :focused="showKeyboard"
           
            ref="pas"
            @focus="showKeyboard = true"
            />
        <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
             @input="isdeg"
            @blur="showKeyboard = false"
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
name:'logining',
data(){
    return{
        tel:'',
        showKeyboard:false,
        value:''
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
    
    tonext(){
        return request({
            url:'/captcha/sent',
            params:{
                phone:$store.state.tel
            }
        }).then(res=>{
            Toast('已向手机发送验证码');
            this.showKeyboard=true
        })

        
    },
    isdeg(){
       
        if(this.value.length==3){
            return request({
                url:'/captcha/verify',
                params:{
                    phone:$store.state.tel,
                    captcha:this.value
                }
            }).then(res=>{
                console.log(res);
            })
        }
    },
    back(){
        this.$router.push('/login')
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