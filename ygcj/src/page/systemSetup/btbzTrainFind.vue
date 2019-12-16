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
                <Col span="5"
                     style="float:left;margin-left:20px;">
                    <div style="float:left;font-size:15px;line-height:32px;">请选择洲查询：</div>

                    <Select v-model="stateFind" style="width:200px;">
                        <Option v-for="(item,index) in stateList"
                                :value="item.value">{{item.name}}
                        </Option>
                    </Select>

                </Col>
                <Col span="5"
                     style="float:left;margin-left:20px;">
                    <div style="float:left;font-size:15px;line-height:32px;">请输入国家（地区）查询：</div>
                    <Input v-model="cityName" style="width: 200px"/>


                </Col>

                <Col span="4"
                     style="float:right;margin-right:50px;">
                    <Button style="float:right"
                            type="primary"
                            @click="findCity"
                            icon="ios-search">查询
                    </Button>
                </Col>
            </Row>
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
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="addTrainRule">新增

            </Button>
            <dragBtTrainF v-if="flag"
                          @mainChange="mainC($event)"
                          @xgIdChange='xgId($event)'
                          @delIdChange="delId($event)"
                          :titleData="titleData"
                          :pageNum="pageNum"
                          :mainData="mainData"
            ></dragBtTrainF>
        </div>
        <Modal
                v-model="modal1"
                title=""
                @on-ok="ok"
                @on-cancel="cancel">

            <div class="modalBox">
                <select v-model="state">

                    <option v-for="(item,index) in stateList"
                            :key="index"
                            :value="item.value"> {{item.name}}
                    </option>
                </select>
                <span>洲：</span></div>
            <div class="modalBox"><input type="text" v-model="country"></input> <span>国家（地区）：</span></div>
            <div class="modalBox">

                <select v-model="moneyType">

                    <option v-for="(item,index) in currency"
                            :key="index"
                            :value="item.value"> {{item.name}}
                    </option>
                </select>
                <span>币种：</span>

            </div>
            <div class="modalBox"><input type="text" v-model="trainFee"></input> <span>培训费：</span></div>


        </Modal>
    </div>
</template>

<script>
    import dragBtTrainF from '@/components/table-drag-btbzTrainFind.vue';

    export default {
        inject: ["reload"],
        computed: {
            tableWidth: function () {
                return this.a;
            }
        },
        components: {
            dragBtTrainF
        },

        methods: {
            // 根据tabDrag emit的mainData实现换页
            mainC(msg) {
                console.log(msg, 44556)
                this.mainData = msg;
            },
            //根据城市查询
            findCity() {

                this.getCityAll({country: this.cityName, row: '', page: 1, state: this.stateFind});
            },
            // 新增
            addTrainRule() {
                this.modal1 = true;
                this.updateFlag = false;

            },
            // 弹出框的 确定取消
            //根据id 确定 修改
            ok() {
                if (this.updateFlag == true) {
                    let obj = {}

                    obj.id = this.dataId;
                    obj.country = this.country;
                    obj.state = this.state;
                    obj.trainFee = this.trainFee;
                    obj.currency = this.moneyType;

                    this.$axios.trainUpdate(obj).then(res => {
                        console.log(res)
                        if (res.data.ret == 1) {
                            this.$Message.success(res.data.retMsg);
                            this.reload()
                        } else {
                            this.$Message.error(res.data.retMsg);
                        }
                    })
                } else {
                    let obj = {}
                    obj.country = this.country;
                    obj.state = this.state;
                    obj.trainFee = this.trainFee;
                    obj.currency = this.moneyType;
                    this.$axios.trainAdd(obj).then(res => {
                        if (res.data.ret == 1) {
                            this.$Message.success('新增成功');
                            this.reload()
                        } else {
                            this.$Message.error(res.data.retMsg);
                        }
                    })
                }


            },
            cancel() {
                this.updateFlag = false;

            },
            //币种过滤
            exIdFilter(value) {
                if (!value) return ''
                switch (value.toString()) {
                    case '1':
                        return '美元'
                    case '2':
                        return '英镑'
                    case '3':
                        return '欧元'
                    case '4':
                        return '日元'
                    case '5':
                        return '港币'
                }
            },
            exMoneyFilter(value) {
                if (!value) return ''
                switch (value.toString()) {
                    case '美元':
                        return '1'
                    case '英镑':
                        return '2'
                    case '欧元':
                        return '3'
                    case '日元':
                        return '4'
                    case '港币':
                        return '5'
                }
            },

            // 根据id 弹框
            xgId(id) {
                console.log(id, 'btbz')
                this.updateFlag = true;
                console.log(this.mainData[id])
                this.dataId = id;
                this.modal1 = true;
                this.country = this.mainData[id].country;
                this.state = this.mainData[id].state;

                this.trainFee = this.mainData[id].trainFee;
                this.moneyType = this.exMoneyFilter(this.mainData[id].currency);


            },
            // 删除
            delId(id) {
                this.$axios.trainDel({id: id}).then(res => {
                    console.log(res)
                    if (res.data.ret == 1) {
                        this.$Message.success('删除成功')
                        this.reload();
                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                })
            },


            // 查询所有
            getCityAll(data) {
                this.$axios.trainGetList(data).then(res => {
                    console.log(res.data, 'resList');
                    if (res.data.ret == 1) {
                        let datas = res.data.data.list;
                        let newDatas = [];
                        for (let i = 0; i < datas.length; i++) {
                            let obj = {};
                            obj.state = datas[i].state;
                            obj.currency = this.exIdFilter(datas[i].currency);
                            obj.country = datas[i].country;
                            obj.trainFee = datas[i].trainFee;
                            obj.id = datas[i].id;
                            newDatas.push(obj);

                        }
                        this.mainData = newDatas;
                        this.pageNum = res.data.data.pageInfo.count;


                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                });
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
                if (localStorage.getItem(id + 'btbzTrainFind') != undefined) {
                    localStorage.removeItem(id + 'btbzTrainFind')
                }
                this.reload()
            },

        },
        created: function () {
            //页面刚进来默认加载

        },
        mounted: function () {
            let id = this.$store.state.info.userId;
            if (JSON.parse(localStorage.getItem(id + 'btbzTrainFind')) != undefined) {
                this.titleData = JSON.parse(localStorage.getItem(id + 'btbzTrainFind'));
            }
            this.$nextTick(function () {
                this.titleData.forEach((item, index) => {
                    if (item.ifc) {
                        this.checkList.push(item.title);
                    }
                    this.checkData.push(item.title);
                });
            });
            let obj = {state: '', row: 500, page: 1, country: ''}
            this.getCityAll(obj);

        },
        data() {
            return {
                stateFind:'', // 查询洲
                cityName: '',
                regionName: '',
                regionPname: '',
                updateFlag: false,
                dataId: '',
                state: '',
                country: '',
                moneyType: '',
                trainFee: '', // 弹出框内容

                modal1: false,
                loading: false,
                sele: 500,
                depart: "",
                curr: "",
                lx: "0",
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
                stateList: [
                    {
                        value: "亚洲",
                        name: "亚洲"
                    },
                    {
                        value: "非洲",
                        name: "非洲"
                    },
                    {
                        value: "欧洲",
                        name: "欧洲"
                    },
                    {
                        value: "美洲",
                        name: "美洲"
                    },
                    {
                        value: "大洋洲",
                        name: '大洋洲'
                    }
                ],
                currency: [
                    {
                        value: 1,
                        name: "美元"
                    },
                    {
                        value: 2,
                        name: "英镑"
                    },
                    {
                        value: 3,
                        name: "欧元"
                    },
                    {
                        value: 4,
                        name: "日元"
                    },
                    {
                        value: 5,
                        name: '港币'
                    }

                ],
                type: [
                    {
                        value: "0",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "用汇预算申报表"
                    },
                    {
                        value: 2,
                        label: "外汇费用核销表"
                    }
                ],
                checkData: [],
                checkList: [],

                titleData: [
                    {
                        title: "洲",
                        name: "state",

                        width: 180,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "国家（地区）",
                        name: "country",

                        width: 180,
                        color: "#fff",
                        ifc: true
                    },

                    {
                        title: '币种',
                        name: 'currency',
                        width: 180,
                        color: '#fff',
                        ifc: true
                    },
                    {
                        title: "培训费",
                        name: "trainFee",
                        width: 180,
                        color: "#fff",
                        ifc: true
                    },
                ],
                mainData: [], //查询的数组
                pageNum: 0 //查询的信息
            };
        }
    };
</script>
<style scoped>
    .modalBox {
        margin: 0 auto;
        width: 300px;
        margin-bottom: 8px;
        overflow: hidden;

    }

    .modalBox input, .modalBox select {
        width: 200px;
        float: right;
    }

    .modalBox span {
        float: right;
    }

</style>
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
