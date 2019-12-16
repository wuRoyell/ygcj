<!--汇率查询-->
<template>
    <div id="fundingMaintain">
        <div class="funding-head">
            日期：
            <DatePicker :options="options"

                        @on-change='exChangeTime'
                        type="date"
                        placeholder="请选择日期"
                        style="width: 200px"></DatePicker>
            <!-- <Button style="margin-left:100px;" type="primary" icon="ios-search">查询</Button> -->
        </div>
        <div class="funding-buttom">
      <span @click="getChange">
        <i class="iconxiugai"></i>修改
      </span>
            <span @click="save">
        <i class="iconbaocun"></i>保存
      </span>
        </div>
        <div id="funding-a">
            <div class="funding-table">
                <table>
                    <tr>
                        <td colspan="6"
                            class="table-start">
                            人民币汇率表
                            <div style="float:right;margin-right:30px;">日期：{{timeData == ''? '未选择时间':timeData}}</div>
                        </td>
                    </tr>
                    <tr>
                        <!-- <td class="table-title super" style="width:20%">日期</td> -->
                        <td class="table-title super"
                            style="width:40%">类别
                        </td>
                        <td class="table-title super"
                            style="width:40%">汇率
                        </td>
                    </tr>
                    <tr v-for="(item,index) in tabData"
                        :key="index">
                        <td class="table-title">{{item.name}}</td>
                        <!-- <td class="rate" v-if="!upDate">{{item.time!= 1?(formatDate(item.time)=='2019-05-06'?item.value:item.oldValue):''}}</td> -->
                        <td class="rate">
                            <input type="number"
                                   v-model="item.exchangeRate"
                                   :readonly="read1">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../../public/formatDate.js";

    export default {
        methods: {
            //根据时间查询 汇率
            exChangeTime(date1, date2) {
                console.log(date1,123);
                this.timeData = date1;
                this.getExchangeByDate({date:date1});

            },
            //修改
            getChange() {
                this.$Message.success("开始修改");
                this.read1 = false;

            },
            // 保存
            save() {

                var obj = {};
                obj.data = [];
                for (let i = 0; i < this.tabData.length; i++) {

                    obj.date = this.formatDate(this.timeData);
                    let arr = {};
                    arr.id = this.tabData[i].id;

                    arr.exchangeRate = this.tabData[i].exchangeRate;
                    obj.data.push(arr);
                }
                // console.log(arr)

                console.log(obj, 'obj2')
                this.$axios.batchUpdateExchange(obj).then(res => {
                    console.log(res);
                    if (res.data.ret) {
                        this.$Message.success(res.data.retMsg);
                        this.read1 = true;

                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                }).catch(error => {
                    this.$Message.error("保存出错");
                });
                this.read1 = true;
            },
            upTime() {
                this.upDate = true;
                var date = new Date();
                // 获取当前年
                var year = date.getFullYear();
                // 获取当前月
                var month = date.getMonth() + 1;
                // 获取当前日
                var day = date.getDate();

            },
            saveTime() {
                this.upDate = false;
                console.log(this.tabData);
            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            },

            getExchangeByDate(data) {
                this.$axios.getExchangeByDate(data).then(res => {
                    console.log(res.data);
                    if (res.data.ret) {

                        console.log(this.tabData,'333')
                        for(let i =0;i<5;i++){
                            console.log(res.data.data[i] != undefined)
                            if( res.data.data[i]!= undefined){
                                this.tabData[i].exchangeRate = res.data.data[i].exchangeRate;
                                console.log()
                            }else{
                                this.tabData[i].exchangeRate = '';
                            }


                        }
                        console.log(this.tabData,'4444444444')
                    }
                })
            }
        },
        mounted() {
            this.timeData = this.$store.state.exchangeDate;
            console.log(this.timeData == '')
            // console.log(exchangeDate, 3344556)
            if ( this.timeData == '') {

            } else {
                this.getExchangeByDate({date:  this.timeData});
            }


        },
        watch: {

        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
        },
        data() {
            return {
                onSelect: true,
                timeData: "",
                open: false,
                upDate: false,
                read1: true,
                tabData: [
                    {
                        id:1,
                        name: '美元：人民币',
                        exchangeRate:''

                    },
                    {
                        id:2,
                        name: '英镑：人民币',
                        exchangeRate:''

                    },
                    {
                        id:3,
                        name: '欧元：人民币',
                        exchangeRate:''

                    },
                    {
                        id:4,
                        name: '日元：人民币',
                        exchangeRate:''

                    },
                    {
                        id:5,
                        name: '港币：人民币',
                        exchangeRate:''

                    }
                ],
                options: {
                    disabledDate(date) {
                        return date && date.valueOf() >= Date.now();
                    }
                },
                options2: {
                    disabledDate(date) {
                        return date && date.valueOf() >= Date.now();
                    }
                }
            };
        }
    };
</script>

<style scoped lang="less">
    #fundingMaintain {
        .funding-buttom {
            float: right;
            margin-bottom: 20px;

            span {
                display: inline-block;
                border-radius: 5px;
                padding: 8px 12px;
                font-size: 17px;
                color: #fff;
                margin-left: 12px;
                cursor: pointer;
                background: #169aef;

                i {
                    font-size: 18px;
                    margin-right: 5px;
                }
            }
        }

        .funding-head {
            float: left;
            margin: 12px 0 20px 12px;
            font-size: 16px;
        }

        #funding-a {
            clear: both;
            width: 1200px;
            margin: auto;
            overflow: hidden;

            h3 {
                float: left;
                clear: both;
                font-size: 18px;
                margin-bottom: 20px;
            }

            > .title {
                display: block;
                margin: auto;
                font-size: 28px;
                color: #4b98de;
                text-align: center;
                letter-spacing: 2px;
            }

            .funding-table {
                width: 1200px;
                float: left;
                border: 1px solid #4b98de;
                padding: 8px 6px;
                margin: 5px 0 20px 0;

                table {
                    color: #3c3c3c;
                    width: 100%;
                    font-size: 14px;
                    text-align: center;
                    border: 1px solid #4b98de;
                    border-collapse: collapse;
                    border: none;

                    th {
                        background: #67bef3;
                        border: 1px solid #4b98de;
                        color: #fff;
                        line-height: 45px;
                        font-weight: 100;
                        font-size: 18px;
                    }

                    td {
                        padding: 8px 2px;
                        height: 49px;
                        text-align: center;
                        border: 1px solid #4b98de;

                        &.table-title {
                            background: #c2e8ff;
                            padding: 8px 16px;
                            text-align: center;
                            border: 1px solid #4b98de;

                            &.super {
                                color: #000;
                                background: #94d5fb;
                            }
                        }

                        &.rate {
                            color: #4b98de;
                        }

                        &.table-start {
                            background: #67bef3;
                            border: 1px solid #4b98de;
                            padding: 8px 16px;
                            color: #fff;
                            line-height: 20px;

                            font-size: 16px;
                        }

                        input,
                        select {
                            outline: none;
                            border: none;
                            width: 100%;
                            font-size: 14px;

                            &::-webkit-outer-spin-button,
                            &::-webkit-inner-spin-button {
                                -webkit-appearance: none !important;
                            }

                            &::-ms-expand {
                                display: none;
                            }

                            &[type="number"] {
                                text-align: right;
                            }

                            &::-ms-input-placeholder {
                                text-align: center;
                            }

                            &::-webkit-input-placeholder {
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
