<template>
    <div class="flight-item">
        <div @click='handleclick'>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info"  >
                <el-col :span="6">
                    <span>{{dataList.airline_name}}</span>{{dataList.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{dataList.dep_time}}</strong>
                            <span>{{dataList.org_airport_name}} {{dataList.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{rankTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{dataList.arr_time}}</strong>
                            <span>{{dataList.dst_airport_name}} {{dataList.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{dataList.base_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle" v-if='isShow'>
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20" >
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
                    v-for="(item,index) in dataList.seat_infos" :key='index'>
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <!-- 点击选定按钮跳转到订单页 -->
                            <nuxt-link :to="`/air/order?id=${dataList.id}&seat_xid=${item.seat_xid}`">
                            <el-button 
                            type="warning" 
                            size="mini"
                            >
                            选定
                            </el-button>
                            </nuxt-link>
                            <p>剩余:{{item.discount}}</p>
                        </el-col>
                    </el-row>
               </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return{
        //低价推荐列表是否显示 参数的控制
        isShow:false
      }
    },
    props: {
        // 航班详情数据
        dataList: {
            type: Object,
            // 默认是空数组
            default: []
        },
      //航班总数据
      flightsData: {
            type: Object,
            // 默认是空数组
            default: {}
        }
    },
    methods:{
        handleclick(){
           this.isShow = !this.isShow
        }
    },    
    computed:{
        //出发城市到到达城市所需要的时间的计算
        rankTime(){
            //将字符串转换成数组
            var arr_time = this.dataList.arr_time.split(':')
            var dep_time = this.dataList.dep_time.split(':')
            //出发时间和到达时间转换成分钟数
            var arr = +arr_time[0]*60+ +arr_time[1]
            var dep = +dep_time[0]*60+ +dep_time[1]
            //到达时间减去出发时间
            var result = arr - dep
            //如果超过了一天的时间就再加上24小时
            if(result<0){
                result = arr+60*24-dep
            }
            //将分钟数转换成时分显示出来
            return `${Math.floor(result/60)}时${result%60}`
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>