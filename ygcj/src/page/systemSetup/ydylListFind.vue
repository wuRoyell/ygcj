<template>
    <div id="fundingMaintain">
        <div class="funding-buttom">
        </div>
        <div id="funding-a">
            <div class="funding-table">
                <el-table

                        :data="tableData"

                        border
                        ref="table"
                        style="width: 100%;height:100%;overflow-y:auto;">
                    <el-table-column
                            prop="id"
                            label="序号"

                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="country"

                            label="国家（地区）"
                            width="600">
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            // 查询 预算数据 方法
            getSysBudgetList(data){
                this.$axios.getSysBudgetList(data).then(res=>{
                    if(res.data.ret == 1){
                        this.ysList = res.data.data;
                    }else{
                        this.$Message.error(res.data.retMsg);
                    }
                    console.log(res,33);
                })
            },
            //修改 预算数据 方法
            updateSysBudget(data){
                this.$axios.updateSysBudget(data).then(res=>{
                    if(res.data.ret == 1){
                        this.$Message.success(res.data.retMsg)
                    }else{
                        this.$Message.error(res.data.retMsg);
                    }
                })
            },
            // 点击修改后 保存
            updateYs(){
                for (let i = 0;i< this.ysList.length;i++){
                    let obj = {
                        id:this.ysList[i].id,
                        budget:this.ysList[i].budget
                    };
                    this.updateSysBudget(obj);

                }

            },

        },
        computed:{

        },
        mounted(){

            this.getSysBudgetList();
        },
        data() {
            return {
                onSelect: true,
                tableHeight:'500',
                ysList:[],// 查询的预算经费表
                tableData:[
                    {id:1,country:'泰国'},
                    {id:2,country:'柬埔寨'},
                    {id:3,country:'孟加拉国'},
                    {id:4,country:'乌兹别克斯坦'},
                    {id:5,country:'土库曼斯坦'},
                    {id:6,country:'朝鲜'},
                    {id:7,country:'蒙古'},
                    {id:8,country:'俄罗斯'},
                    {id:9,country:'哈萨克斯坦'},
                    {id:10,country:'吉尔吉斯'},
                    {id:11,country:'塔吉克斯坦'},
                    {id:12,country:'阿富汗'},
                    {id:13,country:'巴基斯坦'},
                    {id:14,country:'印度'},
                    {id:15,country:'尼泊尔'},
                    {id:16,country:'缅甸'},
                    {id:17,country:'老挝'},
                    {id:18,country:'越南'},
                    {id:19,country:'伊朗'},
                    {id:20,country:'印度尼西亚'},
                    {id:21,country:'沙特阿拉伯'},
                    {id:22,country:'白俄罗斯'},
                    {id:23,country:'菲律宾'},
                    {id:24,country:'马来西亚'},

                ],
            };
        }
    };
</script>
<style>
    .el-table .cell{
        text-align:center;
    }
</style>
<style scoped lang="less">
    input {
        outline: none;
        border: none;
        width: 210px;
        height: 26px;
        text-align: right;
    }
    #fundingMaintain {
        height:100%;
        .funding-buttom {
            float: right;
            margin-bottom: 20px;
            span {
                display: inline-block;
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
        #funding-a {
            clear: both;
            width: 930px;
            height:100%;
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
                width: 930px;
                height:85%;
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
                    }
                }
            }
        }
    }
</style>
