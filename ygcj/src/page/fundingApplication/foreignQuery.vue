<template>
    <div id="foreignQuery">
        <div id="funding-a">
            <Spin fix
                  v-if="loading">
                <Icon type="ios-loading"
                      size="18"
                      class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
            <Row>
<!--                <Col span="4"-->
<!--                     style="margin-left:30px;min-width:250px">-->
<!--                    {{tableWidth}}-->
<!--                    时间：-->
<!--                    <DatePicker type="daterange"-->
<!--                                :start-date="new Date(1991, 4, 14)"-->
<!--                                placement="bottom-start"-->
<!--                                placeholder="请选择时间范围"-->
<!--                                style="width: 200px"></DatePicker>-->
<!--                </Col>-->
                <Col span="4"
                     style="min-width:250px">
                    部门：
                    <Input type="text" style="width:200px;" v-model="depart"/>

                </Col>

                <Col span="4"
                     style="min-width:250px">
                    类型：
                    <Select v-model="forexType"
                            style="width:200px">

                        <Option v-for="item in type"
                                :value="item.value"
                                :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </Col>

                <Col span="4"
                     style="float:right;margin-right:50px;">
                    <Button style="float:right"
                            type="primary"
                            @click="findFor"
                            icon="ios-search">查询
                    </Button>
                </Col>
            </Row>
            <!-- {{checkList}} -->
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="checkA">重置
            </Button>
            <Dropdown style="margin: 20px 12px 0 0;float:right">
                <a href="javascript:void(0)">
                    <Button type="primary"
                            style="margin-bottom: 12px;margin-top: -7px;">
                        选择表格展示列：
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                </a>
                <DropdownMenu slot="list">
                    <CheckboxGroup v-model="checkList">
                        <Checkbox style="float: left;clear: both;line-height: 30px;padding:0 12px;"
                                  v-for="(item,index) in checkData"
                                  :key="index"
                                  :label="item"
                                  vertical
                                  @click.native="ckChang(item,index)">
                            <span @click="ckChang(item,index)">{{item}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </DropdownMenu>
            </Dropdown>
            <tabDrag v-if="flag"
                     @mainChange="mainC($event)"
                     :titleData="titleData"
                     :pageNum="pageNum"
                     :mainData="mainData"
                     :sele="sele"></tabDrag>
        </div>
    </div>
</template>

<script>
    export default {
        inject: ["reload"],
        computed: {
            tableWidth: function () {
                return this.a;
            }
        },
        methods: {
            findFor(){
                let data = {page: 1, row: 10, userAuditType: this.$store.state.info.userAuditType,dep:this.depart,forexType:this.forexType};
                this.firstLoad(data)
            },
            // 接收组件信息，改变传入的值
            mainC(msg) {
                // console.log(msg,222)
                this.mainData = msg;

            },
            ckChang(val, index) {
                this.titleData.forEach((item, index) => {
                    if (item.title == val) {
                        item.ifc = !item.ifc;
                    }

                });
                console.log(this.titleData, 'data')
            },
            checkA() {
                this.titleData.forEach((item, index) => {
                    item.ifc = true;
                });
                this.checkList = this.checkData;
                let id = this.$store.state.info.userId;
                if(localStorage.getItem(id + 'query') != undefined){
                    localStorage.removeItem(id+'query')
                }

                this.reload()

            },
            // auditStatus 类型改变
            statusChange(val) {
                switch (val.toString()) {


                    case '1':
                        return '用汇申请表'
                    case '2':
                        return '用汇核销表'

                    case '3':
                        return '用汇通知书'
                    case '4':
                        return '退汇通知书'
                }
            },
            // 用汇的状态
            typeChange(val){
                if(val == 1){
                    return '已保存'
                }else{
                    return val;
                }
            },
            //时间过滤
            timeChange(date){
                if (!date) return '';

                date = date.toString().substring(0, 10)
                return date
            },
            //页面刚进来默认加载
            firstLoad(data) {

                this.loading = true;
                this.$axios.getForeignLists(data).then(res => {
                    // console.log(res.data,'for');
                    console.log(res)
                    this.loading = false;
                    if (res.data.ret == 1) {

                        this.mainData = res.data.data.list;
                        this.mainData.forEach(item => {
                            item.forexType = this.statusChange(item.forexType);
                            item.submitDate = this.timeChange(item.submitDate);
                            item.forexStatus = this.typeChange(item.forexStatus);
                        })
                        console.log(data.dev,23333)


                        if(data.dev){
                            this.$Message.success('查询成功')
                        }



                        this.pageNum = res.data.data.pageInfo.count;

                        this.flag = true;
                    } else {
                        this.$Message.error("查询出错");
                    }
                });
            }
        },
        created: function () {
            //页面刚进来默认加载
            let data = {page: 1, row: 10, userAuditType: this.$store.state.info.userAuditType,dep:'',forexType:''};
            this.firstLoad(data);

        },
        mounted: function () {
            let id = this.$store.state.info.userId;
            if (JSON.parse(localStorage.getItem(id + 'query')) != undefined) {
                this.titleData = JSON.parse(localStorage.getItem(id + 'query'));
            }
            console.log(23)
            this.titleData.forEach((item, index) => {
                if (item.ifc) {
                    this.checkList.push(item.title);
                }
                this.checkData.push(item.title);
            });
            console.log(this.titleData, '2data')

        },
        data() {
            return {
                loading: false,
                sele: 500,
                depart: "",
                curr: "",
                forexType: "0",
                flag: "false",

                department: [
                    {
                        value: 0,
                        label: "财政部门"
                    },
                    {
                        value: 1,
                        label: "技术部门"
                    },
                    {
                        value: 2,
                        label: "测试部门"
                    }
                ],
                currency: [
                    {
                        value: 0,
                        label: "人民币"
                    },
                    {
                        value: 1,
                        label: "美元"
                    },
                    {
                        value: 2,
                        label: "欧元"
                    }
                ],
                type: [
                    {
                        value: 1,
                        label: "用汇申请表"
                    },
                    {
                        value: 2,
                        label: "用汇核销表"
                    },
                    {
                        value: 3,
                        label: "用汇通知书"
                    },
                    {
                        value: 4,
                        label: "退汇通知书"
                    }
                ],
                checkData: [],
                checkList: [],
                titleData: [
                    {
                        title: "单据编号",
                        name: "forexNo",
                        select:false,
                        width: 294,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "单位名称",
                        name: "company",
                        width: 294,
                        select: false,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "填报人",
                        name: "submitter",
                        width: 294,
                        select: false,
                        color: "#fff",
                        ifc: true
                    },

                    {
                        title: "填报日期",
                        name: "submitDate",
                        width: 302,
                        select: false,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "报表状态",
                        name: "forexStatus",
                        width: 320,
                        select: false,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "报表类型",
                        name: "forexType",
                        width: 200,
                        select: false,
                        color: "#fff",
                        ifc: true
                    }
                ],
                mainData: [], //查询的数组
                pageNum: "" //查询的信息
            };
        }
    };
</script>

<style lang="less" scoped>
    #foreignQuery {
        #funding-a {
            clear: both;
            // width: 1800px;
            width: 100%;
            margin: auto;
            min-height: 350px;
            overflow: hidden;

            .ivu-row {
                margin: 20px auto;
            }

            .funding-table {
                width: 1200px;
                float: left;
                margin: 5px 0 20px 0;

                table {
                    color: #3c3c3c;
                    width: 100%;
                    font-size: 14px;
                    text-align: center;
                    border: 1px solid #4b98de;
                    border-collapse: collapse;
                    border: none;

                    .add-user {
                        float: left;
                        padding: 6px 8px;
                        margin: 10px 0 6px 0;
                        background: #4b98de;
                        border: none;
                        color: #fff;
                        cursor: pointer;

                        &:hover {
                            background: #67bef3;
                        }
                    }

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

                        &.table-start {
                            background: #67bef3;
                            border: 1px solid #4b98de;
                            padding: 8px 16px;
                            color: #fff;
                            line-height: 20px;
                            font-weight: 100;
                            font-size: 16px;
                        }

                        .upload {
                            cursor: pointer;
                            color: #9d9d9d;

                            i {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
