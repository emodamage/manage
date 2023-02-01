<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right: 10px">
                <el-card class="box-card">
                    <div class="user">
                        <img src="@/assets/logo.png" alt="">
                        <div class="userInfo">
                            <p class="name">admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录的时间: <span>2021-7-19</span></p>
                        <p>上次登录的地点: <span>武汉</span></p>
                    </div>
                </el-card>
                <el-card class="card">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column v-for="(value, key) in tableLabel" :prop="key" :label="value" :key="key"/>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="padding-left: 10px">
                <div class="num">
                    <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: '0'}">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                        <div class="detail">
                            <p class="price">￥{{item.value}}</p>
                            <p class="desc">{{item.name}}</p>
                        </div>
                    </el-card>
                </div>
                <!-- 折线图 -->
                <el-card style="height: 280px;">
                    <!-- <div ref="echarts1" style="height: 280px; width: 800px; margin-left: 150px;"></div> -->
                    <div ref="echarts1" style="height: 280px">
                    </div>
                </el-card>
                <div class="graph">
                    <!-- 柱状图 -->
                    <el-card style="height: 260px">
                        <!-- <div  ref="echarts2" style="height: 260px; width: 100%;"></div> -->
                        <div ref="echarts2" style="height: 260px"></div>
                    </el-card>
                    <!-- 饼图 -->
                    <el-card style="height: 260px">
                        <div ref="echarts3" style="height: 240px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getData } from '@/api/index'
import * as echarts from 'echarts'
export default {
    name: 'myHome',

    data() {
        return {
            tableData: [
                {
                    name: 'oppo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: 'vivo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '苹果',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '小米',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '三星',
                    todayBuy:100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '魅族',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
            ],
            tableLabel: {
                name: '品牌',
                todayBuy: '今日销售量',
                monthBuy: '月销售量',
                totalBuy: '总销售量'
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
            ]
        }
    },

    mounted() {
        getData().then(({data}) => {
            const { tableData } = data.data
            // console.log(data.data.orderData)
            // console.log(data.data.orderData.data)
            // console.log(data.data.orderData.data[1])
            this.tableData = tableData

            const { orderData, userData, videoData } = data.data
            // console.log(userData)

            //折线图
            const echarts1 = echarts.init(this.$refs.echarts1)

            //#region 
            var option1 = {
                // gard: {
                //     right: '3%'
                // }
            }

            const legend = Object.keys(orderData.data[0])
            const xAxis = orderData.date

            // const xAxisData = {
            //     data: xAxis
            // }
            option1.xAxis = {
                data: xAxis
            }
            option1.legend = {
                data: legend
            }
            option1.yAxis = {}
            option1.series = []

            legend.forEach(key => {
                option1.series.push({
                    name: key,
                    type: 'line',
                    data: orderData.data.map(item => item[key])
                })
            })
            //#endregion

            echarts1.setOption(option1)
            // console.log(option1)

            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const option2 = {
                legend: {
                    textStyle: {
                        color: '#333'
                    }
                },
                grid: {
                    left: '20%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: '#17b3a3'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#333'
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        }
                    }
                ],
                color: ['#2ec7c9', '#b6a2de'],
                series: [
                    {
                        name: '新增用户',   
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ]
            }

            echarts2.setOption(option2)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const option3 = {
                tooltip: {
                    trigger: 'item'
                },
                color: [
                    '#0f78f4',
                    '#dd536b',
                    '#9862e5',
                    '#a6a6a6',
                    '#e1bb22',
                    '#39c362',
                    '#3ed1cf'
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ]
            }

            echarts3.setOption(option3)
        })
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .userInfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999999;
        }
    }
}
.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}
.card {
    margin-top: 20px;
    height: 460px;
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
            font-size: 30px;
            margin-bottom: 10px;
            height: 30px;
            line-height: 30px;
        }
        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
        height: 260px;
        width: 48%;
    }
}
</style>