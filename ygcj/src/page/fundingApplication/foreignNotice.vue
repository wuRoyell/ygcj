<!--非贸易非经营性用汇通知书-->
<template>
    <div id="funding-useSinks">
        <div class="funding-buttom" style="position:fixed;top:115px;right:20px;">
            <!-- <span><i class="iconxiugai"></i>修改</span> -->
            <span @click="usSave" v-if="!this.$store.state.yhtzNo&&this.$store.state.info.userAuditType==0">
        <i class="iconbaocun"></i>保存
      </span>
            <span @click="usSave2"
                  v-if="$store.state.yhtzNo && !updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="update"
                  v-if="$store.state.yhtzNo && updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconxiugai"></i>修改
            </span>
            <span @click="del"
                  v-if="$store.state.yhtzNo && updateFlag&&this.$store.state.info.userAuditType==0">
                 <Icon type="ios-close-circle-outline" style="font-size:18px;"/>删除
            </span>
            <span v-if="$store.state.yhtzNo && updateFlag" @click="dayin">
        <i class="icondayin"></i>打印
      </span>
        </div>
        <div id="funding-a">
            <span class="title">非贸易非经营性用汇通知书</span>
            <div class="cut"></div>
            <div class="funding-input"
                 style="clear: both;margin-bottom:10px;">
                限额账户账号：
                <input style="width:200px;margin-right:50px;border-bottom:1px solid #000;"
                       :readonly="updateFlag"
                       v-model="saveTitle.yhtzXezhAccount">
                用汇项目：
                <input style="width:150px;border-bottom:1px solid #000;margin-right:50px;"
                       :readonly="updateFlag"
                       v-model="saveTitle.yhtzProject">
                填报人：
                <input style="width:150px;border-bottom:1px solid #000;margin-right:30px;"
                       :readonly="updateFlag"
                       v-model="saveTitle.yhtzOperator">
                顺序号：
                <input style="width:150px ;display:inline-block" readonly v-model="saveTitle.yhtzNo">

            </div>
            <div class="funding-table">
                <table class="fundingTableMain" style="word-wrap:break-word;word-break:break-all">
                    <tr>
                        <td rowspan="3" style="width:40px;">
                            <div style="width:20px;height:100%;margin-left:10px;">用汇数</div>
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
                            <select style="width:100%;" v-model="saveTitle.yhtzCurrency" :readonly="updateFlag">

                                <option v-for="(item,index) in classSelect"
                                        :key="index"
                                        :value="item.value"> {{item.name}}
                                </option>

                            </select>
                        </td>
                        <td rowspan="2">
                            <input type="number" v-model="saveTitle.yhtzMoney"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2" :readonly="updateFlag">
                        </td>
                        <td rowspan="2">
                            <input type="number" v-model="saveTitle.yhtzZhl"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2" :readonly="updateFlag">
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
                        <td rowspan="2"><input type="text" v-model="saveTitle.yhtzRemark" :readonly="updateFlag"></td>
                    </tr>
                    <tr>


                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[0]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[1]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[2]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[3]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[4]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[5]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[6]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[7]"></td>
                        <td><input type="number" oninput="if(value.length>1)value=value.slice(0,1)"
                                   :readonly="updateFlag" v-model="moneyList[8]"></td>


                    </tr>
                    <tr>
                        <td rowspan="2">
                            <div style='width:20px;height:100%;margin-left:10px;'>用途说明</div>
                        </td>
                        <td colspan="13" rowspan="2">
                            <textarea name="" id="" cols="30" rows="10" style="width:100%;height:100%;"
                                      :readonly="updateFlag"
                                      v-model="saveTitle.yhtzUse"></textarea>
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
        name: "yhtz",
        inject: ['reload'],
        methods: {
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
            handleChange1(date) {
                this.saveTitle.departDate = date;
            },
            handleChange2(date) {
                this.saveTitle.entryDate = date;
            },
            dayin() {
                console.log('dayin')
                window.open(this.$axios.print() + '?reportlet=yhtz' + this.$axios.printCs() + '.cpt&yhtzNo=' +  this.$store.state.yhtzNo)
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
            yhtzAdd(data) {

                this.$axios.yhtzAdd(data).then(res => {
                    if (res.data.ret == 1) {
                        this.updateFlag = true;
                        this.$Message.success('保存成功');
                        this.$store.commit('yhtzNoSave', res.data.data.yhtzNo);
                        this.updateFlag = true;
                        this.reload();
                    } else {
                        this.$Message.error(res.data.retMsg)
                    }
                })
            },
            yhtzGet(obj) {

                this.$axios.yhtzGet(obj).then(res => {
                    console.log(res, 'resssssssjjj')
                    if (res.data.ret == 1) {
                        console.log(44445554)
                        let list = res.data.data;
                        this.saveTitle = JSON.parse(JSON.stringify(list));

                        let time = this.saveTitle.yhtzDate;
                        time = this.timeChange(time).split('-');
                        this.year = time[0];
                        this.mouth = time[1];
                        this.day = time[2];

                        let money = list.yhtzRmbMoney.toString().split('');
                        console.log(money, 'money')
                        this.moneyList.forEach(item => {
                           console.log(item)
                            // item = ''
                        })
                        console.log(this.moneyList, 'mommmmm')
                        var i = this.moneyList.length - 1;
                        for (let j = money.length - 1; j > -1; j--) {
                            this.moneyList[i] = money[j];
                            i--;
                        }
                        console.log(this.moneyList, 'listtttttt')


                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                }).catch(error => {

                })
            },

            //删除整个页面
            del() {
                let no = this.$store.state.yhtzNo;
                let obj = {yhtzNo: no};
                this.$axios.yhtzDel(obj).then(res => {
                    if (res.data.ret == 1) {
                        this.$Message.success('删除成功');
                        let options = this.$store.state.options;
                        let tab = this.$store.state.tab;
                        // 删除页签 去除缓存
                        let obj1 = [];
                        let obj2 = [];
                        obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
                        obj1.forEach((item,i)=>{

                            if(item.route != '/funding/yhtz'){
                                obj2.push(item)
                            }
                        })
                        this.$store.commit('add_includeOptions',obj2);
                        for (let i = 0; i < options.length; i++) {
                            if (tab == options[i].route) {
                                console.log(i)
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
                let time = new Date();
                time = this.timeChange(time);
                if(this.saveTitle.yhtzOperator == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                this.saveTitle.yhtzDate = time;
                this.saveTitle.yhtzDepCode = this.$store.state.info.departCode;
                this.saveTitle.yhtzDepName = this.$store.state.info.departName;
                this.saveTitle.userId = this.$store.state.info.userId;
                for (let i = 0; i < this.moneyList.length; i++) {
                    if (this.moneyList[i] == '') {
                        this.moneyList[i] = 0;
                    }
                }
                this.saveTitle.yhtzRmbMoney = Number(this.moneyList.join(''));

                this.yhtzAdd(this.saveTitle);


            },
            //修改后保存
            usSave2() {
                if(this.saveTitle.yhtzOperator == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                let no = this.$store.state.yhtzNo;
                this.saveTitle.yhtzNo = no;
                this.saveTitle.yhtzDate = '';
                for (let i = 0; i < this.moneyList.length; i++) {
                    if (this.moneyList[i] == '') {
                        this.moneyList[i] = 0;
                    }
                }
                this.saveTitle.yhtzRmbMoney = Number(this.moneyList.join(''));

                this.$axios.yhtzUpdate(this.saveTitle).then(res => {
                    if (res.data.ret == 1) {
                        this.updateFlag = true;
                        this.$Message.success('更新成功');
                        this.$store.commit('yhtzNoSave', res.data.data.yhtzNo);
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
            let no = this.$store.state.yhtzNo;

            console.log(no)
            if (no == "") {
                this.updateFlag = false;
            } else {
                this.updateFlag = true;
                let obj = {yhtzNo: no};
                this.yhtzGet(obj);

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
                        value: "英镑",
                        name:'英镑'
                    },
                    {
                        value: "欧元",
                        name:'欧元'
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
                moneyList: ['', '', '', '', '', '', '', '', ''],//yhtzMoney
                saveTitle: {

                    yhtzCurrency: "",
                    yhtzDate: '',
                    yhtzLeader: '',
                    yhtzMoney: '',
                    yhtzNo: "",
                    yhtzOperator: '',
                    yhtzProject: "",
                    yhtzRemark: "",
                    yhtzRmbMoney: '',
                    yhtzStatus: 1,
                    yhtzUse: "",
                    yhtzXezhAccount: "",
                    yhtzZhl: '',

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
                            height: 30px;


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
