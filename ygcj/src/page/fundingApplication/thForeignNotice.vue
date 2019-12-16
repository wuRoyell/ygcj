<!--非贸易非经营性退汇通知书-->
<template>
    <div id="funding-useSinks">
        <div class="funding-buttom" style="position:fixed;top:115px;right:20px;">
            <!-- <span><i class="iconxiugai"></i>修改</span> -->
            <span @click="usSave" v-if="!this.$store.state.thtzNo&&this.$store.state.info.userAuditType==0">
        <i class="iconbaocun"></i>保存
      </span>
            <span @click="usSave2"
                  v-if="$store.state.thtzNo && !updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="update"
                  v-if="$store.state.thtzNo && updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconxiugai"></i>修改
            </span>
            <span @click="del"
                  v-if="$store.state.thtzNo && updateFlag && this.$store.state.info.userAuditType==0">
                 <Icon type="ios-close-circle-outline" style="font-size:18px;"/>删除
            </span>
            <span v-if="$store.state.thtzNo && updateFlag" @click="dayin">
        <i class="icondayin"></i>打印
      </span>
        </div>
        <div id="funding-a">
            <span class="title">非贸易非经营性退汇通知书</span>
            <div class="cut"></div>
            <div class="funding-input"
                 style="clear: both;margin-bottom:10px;">
                限额账户账号：
                <input style="width:200px;margin-right:50px;border-bottom:1px solid #000;"
                       :readonly="updateFlag"
                       v-model="saveTitle.thtzXezhAccount">
                用汇项目：
                <input style="width:150px;border-bottom:1px solid #000;margin-right:50px;"
                       :readonly="updateFlag"
                       v-model="saveTitle.thtzProject">
                填报人：
                <input style="width:150px;border-bottom:1px solid #000;margin-right:30px;"
                       :readonly="updateFlag"
                       v-model="saveTitle.thtzOperator">
                顺序号：
                <input style="width:150px ;display:inline-block" readonly v-model="saveTitle.thtzNo">

            </div>
            <div class="funding-table">
                <table class="fundingTableMain" style="word-wrap:break-word;word-break:break-all">
                    <tr>
                        <td rowspan="3" style="width:40px;">
                            <div style="width:20px;height:100%;margin-left:10px;">退汇数</div>
                        </td>
                        <td style="width:100px;"
                        >币种
                        </td>
                        <td>金额</td>
                        <td>折合率</td>
                        <td colspan="9">折合人民币数</td>

                        <td>备注</td>
                    </tr>
                    <tr>

                        <td rowspan="2">
                            <select style="width:100%;" :disabled="updateFlag" v-model="saveTitle.thtzCurrency">

                                <option v-for="(item,index) in classSelect"
                                        :key="index"
                                        :value="item.value"> {{item.name}}
                                </option>

                            </select>
                        </td>
                        <td rowspan="2">
                            <input type="number"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2" :readonly="updateFlag" v-model="saveTitle.thtzMoney">
                        </td>
                        <td rowspan="2">
                            <input type="number"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2" :readonly="updateFlag" v-model="saveTitle.thtzZhl">
                        </td>
                        <td style="width:40px;">亿</td>
                        <td style="width:40px;">千</td>
                        <td style="width:40px;">百</td>
                        <td style="width:40px;">十</td>
                        <td style="width:40px;">万</td>
                        <td style="width:40px;">千</td>
                        <td style="width:40px;">百</td>
                        <td style="width:40px;">十</td>
                        <td style="width:40px;">元</td>
                        <td rowspan="2"><input type="text" :readonly="updateFlag" v-model="saveTitle.thtzRemark"></td>
                    </tr>
                    <tr>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[0]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[1]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[2]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[3]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[4]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[5]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[6]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[7]"></td>
                        <td><input type="number" :readonly="updateFlag"
                                   oninput="if(value.length>1)value=value.slice(0,1)"
                                   v-model="moneyList[8]"></td>


                    </tr>
                    <tr>
                        <td rowspan="2">
                            <div style='width:20px;height:100%;margin-left:10px;'>用途说明</div>
                        </td>
                        <td colspan="13">
                            <div style='overflow: hidden;margin-bottom:15px;margin-left:10px;'>
                                <p style="text-align: left;">以上系 <input type="number" v-model="year" :readonly="updateFlag"
                                                                        oninput="if(value.length>4)value=value.slice(0,4)"
                                                                                   style="width:50px;border-bottom:1px solid #000">
                                    年 <input
                                            type="number" v-model="mouth" :readonly="updateFlag" oninput="if(value.length>2)value=value.slice(0,2)"
                                            style="width:50px;border-bottom:1px solid #000"> 月
                                    <input type="number" v-model="day"
                                           style="width:50px;border-bottom:1px solid #000" :readonly="updateFlag" oninput="if(value.length>2)value=value.slice(0,2)"> 日 </p>

                            </div>
                            <div style="overflow:hidden;margin-bottom:15px;margin-left:10px;">
                                <p style="text-align: left;float:left;"> 顺序号为 <input type="text" v-model="saveTitle.thtzNo" readonly

                                                                                           style="width:200px;">
                                </p>
                                <p style="text-align: left;float:left;">项目退汇部分
                                </p>
                                <p style='text-align: left;float:left;margin-left:20px;'>请将人民币退到
                                    <input type="text" :readonly="updateFlag" v-model="saveTitle.useBank"
                                           style='width:100px;border-bottom:1px solid #000'> 银行 </p>
                            </div>
                            <p style="text-align:left;margin-left:10px;margin-bottom:10px;"> 户名：<input type="text" :readonly="updateFlag" v-model="saveTitle.useHm"
                                                                                    style='width:150px;border-bottom:1px solid #000'>
                            </p>
                            <p style="text-align:left;margin-left:10px;">账号：<input type="text" :readonly="updateFlag" v-model="saveTitle.useZh"
                                                                                   style='width:150px;border-bottom:1px solid #000'>
                            </p>

                        </td>


                    </tr>

                </table>
            </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "thtz",
        inject: ['reload'],
        methods: {
            handleChange1(date) {
                this.saveTitle.departDate = date;
            },
            handleChange2(date) {
                this.saveTitle.entryDate = date;
            },
            dayin() {
                console.log('dayin')
                window.open(this.$axios.print() + '?reportlet=thtz' + this.$axios.printCs() + '.cpt&thtzNo=' +this.$store.state.thtzNo)
            },
            update() {
                this.updateFlag = false;
                this.$Message.info('开始修改');

            },
            timeChange: function (value, formatString) {
                formatString = formatString || "YYYY-MM-DD";
                return moment(value).format(formatString);

            },
            //字符串变时间戳
            timeC(value) {
                return moment(value).valueOf();
            },
            //保存
            thtzAdd(data) {
                this.$axios.thtzAdd(data).then(res => {
                    if (res.data.ret == 1) {
                        this.updateFlag = true;

                        this.$Message.success('保存成功');
                        this.$store.commit('thtzNoSave', res.data.data.thtzNo);
                        console.log(res.data, '5555555555')
                        this.reload();
                    }else {
                        this.$Message.error(res.data.retMsg)
                    }
                })
            },
            thtzGet(obj) {

                this.$axios.thtzGet(obj).then(res => {
                    console.log(res, 'resssssssjj888j')
                    if (res.data.ret == 1) {
                        let list = res.data.data;

                        this.saveTitle = JSON.parse(JSON.stringify(list));
                        console.log(this.saveTitle,'888888')

                        let time = this.saveTitle.useDate;

                        time = time.split('-');
                        console.log(time)
                        this.year = time[0];
                        this.mouth = time[1];
                        this.day = time[2];



                        let money = list.thtzRmbMoney.toString().split('');
                       console.log(money)
                        this.moneyList.forEach(item => {
                            item = '';
                        })
                        console.log(this.moneyList, 'mommmmm')
                        var i = this.moneyList.length - 1;
                        for (let j = money.length - 1; j > -1; j--) {
                            this.moneyList[i] = money[j];
                            i--;
                        }
                        this.thtzUseList = list.thtzUse.split('+');


                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                }).catch(error => {

                })
            },

            //删除整个页面
            del() {
                let no = this.$store.state.thtzNo;
                let obj = {thtzNo: no};
                this.$axios.thtzDel(obj).then(res => {
                    if (res.data.ret == 1) {
                        this.$Message.success('删除成功');
                        let options = this.$store.state.options;
                        let tab = this.$store.state.tab;
                        // 删除 页签 去除缓存
                        let obj1 = [];
                        let obj2 = [];
                        obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
                        obj1.forEach((item,i)=>{

                            if(item.route != '/funding/thtz'){
                                obj2.push(item)
                            }
                        })
                        this.$store.commit('add_includeOptions',obj2);
                        for (let i = 0; i < options.length; i++) {
                            if (tab == options[i].route) {
                                options.splice(i, 1);
                                this.$router.push({path: options[options.length - 1].route});
                            }
                        }
                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                })

            },
            // 保存
            usSave() {
                if (Number(this.mouth) < 10 && this.mouth != "") {
                    this.mouth = "0" + Number(this.mouth);
                }
                if (Number(this.day) < 10 && this.day != "") {
                    this.day = "0" + Number(this.day);
                }
                let timeNow = new Date();
                timeNow = this.timeChange(time);
                this.saveTitle.thtzDate = timeNow;
                let time = this.year + '-' + this.mouth + '-' + this.day;
                this.saveTitle.useDate = time;
                this.saveTitle.thtzDepCode = this.$store.state.info.departCode;
                this.saveTitle.thtzDepName = this.$store.state.info.departName;
                this.saveTitle.userId = this.$store.state.info.userId;
                for (let i = 0; i < this.moneyList.length; i++) {
                    if (this.moneyList[i] == '') {
                        this.moneyList[i] = 0;
                    }
                }
                this.saveTitle.thtzRmbMoney = Number(this.moneyList.join(''));
                // 日期填写校验
                if(this.year == '' || this.mouth == '' || this.day == ''){
                    this.$Message.warning('请填写说明日期');
                    return false;
                }
                if(this.saveTitle.thtzOperator == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                // console.log(this.saveTitle.thtzXezhAccount, '555')
                this.thtzAdd(this.saveTitle);


            },
            handleInput2(e) {

                if(e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
                    //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
                    return
                }
                // 通过正则过滤小数点后两位
                if(e.keyCode != 9){
                if( e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0])) {
                    e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
                }}
            },
            //修改后保存
            usSave2() {
                if (Number(this.mouth) < 10 && this.mouth != "") {
                    this.mouth = "0" + Number(this.mouth);
                }
                if (Number(this.day) < 10 && this.day != "") {
                    this.day = "0" + Number(this.day);
                }
                let no = this.$store.state.thtzNo;
                this.saveTitle.thtzDate = '';
                this.saveTitle.thtzNo = no;
                let time = this.year + '-' + this.mouth + '-' + this.day;
                this.saveTitle.useDate = time;

                for (let i = 0; i < this.moneyList.length; i++) {
                    if (this.moneyList[i] == '') {
                        this.moneyList[i] = 0;
                    }
                }
                if(this.saveTitle.thtzOperator == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                // 日期填写校验
                if(this.year == '' || this.mouth == '' || this.day == ''){
                    this.$Message.warning('请填写说明日期');
                    return false;
                }
                this.saveTitle.thtzRmbMoney = Number(this.moneyList.join(''));
                this.$axios.thtzUpdate(this.saveTitle).then(res => {
                    if (res.data.ret == 1) {
                        this.updateFlag = true;

                        this.$Message.success('更新成功');
                        this.$store.commit('thtzNoSave', res.data.data.thtzNo);
                        this.updateFlag = true;
                        this.reload()

                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                })


            },

        },
        computed: {},
        filters: {
            // 过滤时间器

            time: function (value, formatString) {
                formatString = formatString || "YYYY-MM-DD";
                return moment(value).format(formatString);

            },
        },
        mounted() {
            let no = this.$store.state.thtzNo;

            console.log(no)
            if (no == "") {
                this.updateFlag = false;


            } else {
                this.updateFlag = true;
                let obj = {thtzNo: no};
                this.thtzGet(obj);

            }

            this.time = Date.parse(new Date());
        },
        data() {
            return {

                updateFlag: true,//修改状态
                classSelect: [
                    {
                        value: "美元",
                        name:'美元'
                    },
                    {
                        value: "日元",
                        name:'日元'
                    },
                    {
                        value: "欧元",
                        name:'欧元'
                    },
                    {
                        value: "英镑",
                        name:'英镑'
                    },
                    {
                        value: "港币",
                        name:'港币'
                    },
                ],
                userInfo: "",
                onSelect: true,

                time: "",
                year: '',
                mouth: '',
                day: '',
                moneyList: ['', '', '', '', '', '', '', '', ''],//thtzMoney
                thtzUseList:['','',''],//thtzUse
                saveTitle: {
                    thtzCurrency: "",
                    thtzDate: '',
                    thtzLeader: '',
                    thtzMoney: '',
                    thtzNo: "",
                    thtzOperator: '',
                    thtzProject: "",
                    thtzRemark: "",
                    thtzRmbMoney: '',
                    thtzStatus: 1,
                    thtzUse: "",
                    thtzXezhAccount: "",
                    thtzZhl: '',
                    thtzUse:'',
                    useDate:'', // 用户说明
                    useBank:'',
                    useHm:'',
                    useZh:'',

                }
            };
        }
    };
</script>
<style scoped>

    .table-addF {
        padding-top: 4px !important;
    }

    .table-add {
        cursor: pointer;
        text-align: center;
        margin-left: 10px;
        height: 21px;

        background: url("../../assets/image/加号.png") no-repeat 88px;
    }

    .table-del {
        width: 20px !important;
        text-align: center;
        cursor: pointer;
        margin-left: 10px;
        height: 20px;
        background: url("../../assets/image/减少.png") no-repeat left;
    }

    .tDel-int {
        background: #c2e8ff;
        text-align: left;
        margin-left: 8px;
        width: 100px !important;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        text-align: right;
    }

    input[type="number"] {
        text-align: right;
    }

    input:focus {
        outline: none;
    }

    textarea {
        resize: none;
        outline: none;
        scrollbar-width: none;
        border: 0;

    }

    textarea::-webkit-scrollbar {
        display: none;

    }

</style>
<style scoped lang="less">
    #funding-useSinks {
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
                border-radius: 5px;

                i {
                    font-size: 18px;
                    margin-right: 5px;
                }
            }
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

            > .cut {
                height: 6px;
                width: 600px;
                margin: 10px auto 40px;
                border-top: 2px solid #000;
                border-bottom: 1px solid #000;
            }

            .funding-input {
                font-size: 14px;
                float: left;

                input {
                    outline: none;
                    border: none;
                    margin: 0 6px;
                }

                &.underline > input {
                    border-bottom: 1px solid #3c3c3c;
                    margin-bottom: 30px;
                }
            }

            .funding-table {
                width: 1200px;
                float: left;
                border: 1px solid #4b98de;
                padding: 8px 6px;
                margin: 0px 0 8px 0;

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
                        padding: 6px 0px;
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
                        padding: 8px 0px;
                        text-align: center;
                        border: 1px solid #4b98de;

                        &.table-title {
                            background: #c2e8ff;
                            padding: 8px 0px;
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
                            padding: 8px 0px;
                            color: #fff;
                            line-height: 20px;

                            font-size: 16px;
                        }

                        .upload {
                            cursor: pointer;
                            color: #9d9d9d;

                            i {
                                font-size: 20px;
                            }
                        }

                        &.number {
                            background: #fbffe8;
                        }

                        .describe,
                        &.describe {
                            font-size: 16px;
                            color: #9d9d9d;
                        }

                        .del-user {
                            display: block;
                            color: #169aef;
                            cursor: pointer;

                            &:hover {
                                color: #94d5fb;
                            }
                        }

                        input, select {
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
                                // background: #fbffe8;
                            }

                            &::-ms-input-placeholder {
                                text-align: center;
                            }

                            &::-webkit-input-placeholder {
                                text-align: center;
                            }
                        }

                        select {
                            height: 20px;


                            cursor: pointer;
                            appearance: none;
                            -moz-appearance: none;
                            -webkit-appearance: none;
                            background-size: 10px 10px;
                            background: url("../../assets/image/下拉.png") no-repeat 80px center;

                            option {
                                color: #3c3c3c;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
