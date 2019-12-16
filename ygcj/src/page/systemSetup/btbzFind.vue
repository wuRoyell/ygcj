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
                    <Input v-model="countryFind" style="width: 200px" />

                </Col>
                <Col span="5"
                     style="float:left;margin-left:20px;">
                    <div style="float:left;font-size:15px;line-height:32px;">请输入城市查询：</div>
                    <Input v-model="cityName" style="width: 200px" />

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
            <tabBtFind v-if="flag"
                       @mainChange="mainC($event)"
                       @xgIdChange='xgId($event)'
                       :titleData="titleData"
                       :pageNum="pageNum"
                       :mainData="mainData"
                       ></tabBtFind>
        </div>
        <Modal
                v-model="modal1"
                title=""
                @on-ok="ok"
                @on-cancel="cancel">

            <div class="modalBox" > <input type="text" v-model="regionName"></input> <span>国家（地区）：</span></div>
            <div class="modalBox"><input type="text" v-model="regionPname"></input> <span>城市：</span></div>
            <div class="modalBox">

                <select  v-model="exchangeId">

                    <option v-for="(item,index) in currency"
                            :key="index"
                            :value="item.value"> {{item.name}}
                    </option>
                </select>
                <span>币种：</span>

            </div>
            <div class="modalBox"><input type="text" v-model="hotelExpense"></input><span>住宿费：</span></div>
            <div class="modalBox"><input type="text" v-model="mealsCost"></input><span>伙食费：</span></div>
            <div class="modalBox"><input type="text" v-model="publicExpense"></input><span>公杂费：</span></div>
            <div class="modalBox"><input type="text" v-model="trainingFee"></input> <span>培训费：</span></div>


        </Modal>
    </div>
</template>

<script>
    import tabBtFind from '@/components/table-drag-btbzFind.vue';
    export default {
        inject: ["reload"],
        computed: {
            tableWidth: function () {
                return this.a;
            }
        },
        components:{
            tabBtFind,
        },

        methods: {
            // 根据tabDrag emit的mainData实现换页
            mainC(msg){
                console.log(msg,44556)
                this.mainData = msg;
            },
            //根据城市查询
            findCity(){
                let obj = {regionName:this.cityName,state:this.stateFind,regionPname:this.countryFind}
                console.log(obj)
                this.getCityAll(obj);
            },
            // 弹出框的 确定取消
            //根据id 确定 修改
            ok() {
                let obj = {}
                let id = this.$store.state.xgId;
                obj.id = id;
                obj.regionName = this.regionName;
                obj.regionPname = this.regionPname;
                obj.hotelExpense = this.hotelExpense;
                obj.mealsCost = this.mealsCost;
                obj.publicExpense = this.publicExpense;
                obj.trainingFee = this.trainingFee;
                obj.exchangeId = this.exchangeId;

                this.$axios.updateDictRegion(obj).then(res => {
                    console.log(res)
                    if (res.data.ret == 1) {
                        this.$Message.success(res.data.retMsg);
                        this.reload()
                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                })

            },
            cancel() {
                this.$Message.info('点击取消');
            },
            //币种过滤
            exIdFilter(value){
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
            exMoneyFilter(value){
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
                let id1 = this.mainData[id].id;
                this.$store.commit('xgIdC', id1);
                console.log(this.mainData[id])
                this.modal1 = true;
                this.regionName = this.mainData[id].regionName;
                this.regionPname = this.mainData[id].regionPname;
                this.hotelExpense = this.mainData[id].hotelExpense;
                this.mealsCost = this.mainData[id].mealsCost;
                this.publicExpense = this.mainData[id].publicExpense;
                this.trainingFee = this.mainData[id].trainingFee;
                this.exchangeId = this.exMoneyFilter(this.mainData[id].exchangeId);
            },


            // 查询所有
            getCityAll(data) {
                this.$axios.getCityAll(data).then(res => {
                    console.log(res.data,'resList');
                    if (res.data.ret == 1) {
                        let datas = res.data.data.object;
                        let newDatas = [];
                        for (let i = 0; i < datas.length; i++) {
                            let obj = {};
                            obj.state = datas[i].state;
                            obj.regionName = datas[i].regionName;
                            obj.regionPname = datas[i].regionPname;
                            obj.hotelExpense = datas[i].hotelExpense;
                            obj.mealsCost = datas[i].mealsCost;
                            obj.publicExpense = datas[i].publicExpense;
                            obj.trainingFee = datas[i].trainingFee;
                            obj.exchangeId = this.exIdFilter(datas[i].exchangeId);

                            newDatas.push(obj);
                            obj.id = datas[i].id;
                        }
                        this.mainData = newDatas;
                        this.pageNum = res.data.data.recordTotal;



                    }else{
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
                if(localStorage.getItem(id + 'btbzFind') != undefined){
                    localStorage.removeItem(id+'btbzFind')
                }

                this.reload();

            },
            //页面刚进来默认加载
            firstLoad() {

            }
        },
        created: function () {
            //页面刚进来默认加载

        },
        mounted: function () {
            let id = this.$store.state.info.userId;
            if(JSON.parse(localStorage.getItem(id+'btbzFind')) != undefined){
                this.titleData = JSON.parse(localStorage.getItem(id+'btbzFind'));
            }
            this.$nextTick(function () {
                this.titleData.forEach((item, index) => {
                    if (item.ifc) {
                        this.checkList.push(item.title);
                    }
                    this.checkData.push(item.title);
                });
            });
            let obj = {state:''}
            this.getCityAll(obj)

        },
        data() {
            return {
                stateFind:'', // 查询时的洲
                countryFind:'',// 查询时的国家
                cityName:'', //查询时的城市
                stateList:[
                    {value:'亚洲',name:'亚洲'},
                    {value:'非洲',name:'非洲'},
                    {value:'美洲',name:'美洲'},
                    {value:'欧洲',name:'欧洲'},
                    {value:'大洋州及太平洋岛屿',name:'大洋州及太平洋岛屿'},
                ],
                regionName: '',
                regionPname: '',
                hotelExpense: '',
                mealsCost: '',
                publicExpense: '',
                exchangeId:'',
                trainingFee: '', // 弹出框内容

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
                        select:false,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "国家（地区）",
                        name: "regionPname",
                        select:false,
                        width: 180,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "城市",
                        name: "regionName",
                        width: 294,
                        select:false,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title:'币种',
                        name:'exchangeId',
                        width:170,
                        select:false,
                        color:'#fff',
                        ifc:true
                    },
                    {
                        title: "住宿费",
                        name: "hotelExpense",
                        select:false,
                        width: 170,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "mealsCost",
                        select:false,
                        width: 170,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "publicExpense",
                        select:false,
                        width: 170,
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
    .modalBox{
        margin:0 auto;
        width:300px;
        margin-bottom:8px;
        overflow: hidden;

    }
    .modalBox input,.modalBox select{
        width:200px;
        float:right;
    }
    .modalBox span{
        float:right;
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
