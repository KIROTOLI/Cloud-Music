<template>
  <div class="discover">
      <!-- 首页banner -->
        <van-col offset='2' span='20'>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for='(item,i) in banner[0]' :key='i'>
                <img :src="item.imageUrl" alt="">
            </van-swipe-item> 
        </van-swipe>
        </van-col>
        <!-- 首页球形 -->
        <div class="out-ball">
            <div class="ball" v-for="item in ball" :key="item.id">
                <img :src="item.iconUrl" alt="" >
                 {{item.name}}
            </div>  
        </div>
        <!-- 推荐歌单 -->
        <div>
            <van-row>
                <van-col span='6' class="rec-left">首页推荐</van-col>
                <van-col offset='12' class="rec-right">
                    <div>
                        查看更多
                    </div>
                </van-col>
            </van-row>
            <div class="recommed-out">
                <div class="recommed" v-for="item in playlists" :key="item.id">
                    <img :src="item.picUrl" alt="">
                    <div class="van-multi-ellipsis--l2">
                    {{item.rcmdtext}}
                    </div>
                    <div class="play"><van-icon name="play"/>
                        {{Math.floor(item.playCount/10000)}}万</div>
                                    
                </div>
            </div>
        </div>
        <!-- 热门歌曲 -->
           <div>
            <van-row>
                <van-col span='6' class="rec-left">热门歌曲</van-col>
                <van-col offset='12' class="rec-right">
                    <div>
                        查看更多
                    </div>
                </van-col>
            </van-row>
           <div class="dsa">
                <div v-for="(item,index) in songList" :key="index" class="out-img">
                <div  v-for="items in item" :key="items.id">
                    <div>
                        <img :src="items.picUrl" alt="">
                        <div>
                            <div>{{items.name}}-{{items.artists[0].name}} <van-icon name="play" color='red' /></div>
                            
                        </div>
                    </div>
                </div>
            </div>
           </div>
          
        </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { Col } from 'vant';
import { Row } from 'vant';
import { request } from '@/network/request';
import { Icon } from 'vant';
export default {
name:'descover',
data(){
    return{
        banner:[],
        ball:[],
        playlists:[],
        songList: [[], [], []],
    }
},
components:{
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [Col.name]:Col,
    [Row.name]:Row,
    [Icon.name]:Icon,
},
created(){
    request({
        url:'/banner',
        type:1
    }).then(res=>{
        // console.log(res);
        this.banner.push(res.banners)
        // console.log(this.banner);
    })
    
     request({
            url:'/homepage/dragon/ball'
        })
    .then(res=>{
        // console.log(res);
        this.ball=res.data
        // console.log(this.ball);
    })

    
    request({
        url: '/top/playlist',
        params: {
            order:'order',
            cat:'全部',
            limit:6,
            offset:-6
        }
    }).then((res)=>{
        console.log(res);
        for(let item of res.playlists){
            this.playlists.push({
                 id: item.id,
                rcmdtext: item.name,
                desc: item.description,
                picUrl: item.coverImgUrl,
                playCount: item.playCount+0,
            })

        }
        // console.log(this.playlists[0]);
    })
  request({
        url: '/top/song',
        params: {
            type:0
        }
    }).then(res=>{
        console.log(res);
              let path = res.data;
      for (let i = 10; i < 20; i++) {
        if (i >= 10 && i < 13) {
          this.songList[0].push({
            id: path[i].album.id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].album.name, // 歌曲名称
            artists: path[i].album.artists,  // 演唱者 
          });
        } else if (i >= 13 && i <16) {
            this.songList[1].push({
            id: path[i].album.id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].album.name, // 歌曲名称
            artists: path[i].album.artists,  // 演唱者
          });
        } else if (i >= 16 && i < 19) {
            this.songList[2].push({
            id: path[i].album.id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].album.name, // 歌曲名称
            artists: path[i].album.artists,  // 演唱者
          });
        }
      }

    })

}
}
</script>

<style>
 .my-swipe .van-swipe-item {
     margin-top: 10px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    height: 150px;
    text-align: center;
    border-radius: 10px;
  }
  .my-swipe .van-swipe-item img{
      height: 150px;
      border-radius: 10px;
  }
  .ball{
      width: 60px;
      height: 50px;
      background-color: red;
      border-radius: 50%;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
 
  }
  .ball img{
      margin-top: 20px;
      width: 50px;
      height: 50px;
  }
  .out-ball{
      margin-top: 15px;
      display: flex;
      overflow: scroll;
      height: 100px;
      font-size: 12px;
      
  }
  .rec-left{
      font-size: 20px;
      font-weight: 700;
  }
  .rec-right{
      font-size: 13px;
      font-weight: 700;
      padding: 3px;
      border: 1px solid #ccc;
      border-radius: 10px;
  }
  .recommed-out{
    display: flex;

    font-size: 14px;
    overflow: scroll;
    height: 150px;
  }
  .recommed{
      /* width: 100px;
      height: 100px; */
      margin: 10px;
      position: relative;
      
  }
  .recommed img{
      width: 100px;
      height: 100px;
      border-radius: 10px;
  }
  .play{
      position: absolute;
      top: -10px;
      right: 3px;
      color: #fff;
  }
  .out-img{
      display: flex;
      width: 80%;
      flex-direction: column;
      margin-top: 10px;
  }
  .out-img div{
      margin-top: 5px;
  }
  .out-img>div>div{
      display: flex;
      width: 350px;
      font-size: 14px;
      line-height: 40px;
      
  }
  .out-img img{
      width: 50px;
      height: 50px;
      margin-right: 15px;
  }
  .dsa{
      display: flex;
      /* width: 80vh; */
      overflow: scroll;
  }
  .discover{
      margin-top: 42px;
  }
</style>