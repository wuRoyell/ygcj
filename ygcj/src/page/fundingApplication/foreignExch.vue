<!--非贸易非经营性外汇费用核销表-->
<template>
    <div id="funding-useSinks">
        <div class="funding-buttom" style="position:fixed;top:115px;right:20px;">
            <!-- <span><i class="iconxiugai"></i>修改</span> -->
            <span @click="usSave" v-if="!this.$store.state.forexSqNo2">
        <i class="iconbaocun"></i>保存
      </span>
            <span @click="usSave2"
                  v-if="$store.state.forexSqNo2 && !updateFlag">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="update"
                  v-if="$store.state.forexSqNo2 && updateFlag">
                <i class="iconxiugai"></i>修改
            </span>
            <span @click="del"
                  v-if="$store.state.forexSqNo2 && updateFlag">
                 <Icon type="ios-close-circle-outline" style="font-size:18px;"/>删除
            </span>
            <span v-if="$store.state.forexSqNo2 && updateFlag" @click="dayin">
        <i class="icondayin"></i>打印
      </span>
        </div>
        <div id="funding-a">
            <span class="title">非贸易非经营性外汇费用核销表</span>
            <div class="cut"></div>
            <div class="funding-input"
                 style="clear: both;margin-bottom:10px;">
                申请单位：
                <input style="width:200px;margin-right:50px;"
                       readonly
                       v-model="saveTitle.company">
                填报人：
                <input style="width:150px;border-bottom:1px solid #000;margin-right:30px;"
                       :readonly="updateFlag"
                       v-model="saveTitle.submitter">
                填报日期：
                <p style="width:150px ;display:inline-block" readonly>{{time | time}}</p>
                        审批表编号：
                        <input style="width:180px;border-bottom:1px solid #000;" v-model="saveTitle.spbNo" :readonly="updateFlag">
            </div>
            <div class="funding-table">
                <table class="fundingTableMain">
                    <tr>
                        <td class="table-title"
                            rowspan="2"
                            colspan="2">
                            <div>出国代表团组（人员）名称</div>
                        </td>
                        <td rowspan="2" colspan="3">
                            <div>
                                <input type="text"
                                       style="height:30px;"
                                       :readonly="updateFlag"
                                       v-model="saveTitle.groupName">
                            </div>
                        </td>
                        <td class="table-title" colspan="3">
                            <div>实际出访地点</div>
                        </td>
                        <td colspan="3">
                            <div>
                                <input type="text"
                                       style="height:100%;"
                                       :readonly="updateFlag"
                                       v-model="saveTitle.destination">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title" colspan="3">
                            <div>实际出访天数</div>
                        </td>
                        <td colspan="3">
                            <div>
                                <input type="number"
                                       :readonly="updateFlag"
                                       onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                       v-model="saveTitle.daysActual">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title"
                            rowspan="2"
                            colspan="2">
                            <div>实际出国（境）人数</div>
                        </td>
                        <td rowspan="2" colspan="3">
                            <div>
                                <input type="number"
                                       onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                       :readonly="updateFlag"
                                       v-model="saveTitle.capacityActual">
                            </div>
                        </td>
                        <td class="table-title" colspan="3">
                            <div>出境日期</div>
                        </td>
                        <td colspan="3">
                            <div>
                                <DatePicker type="date"
                                            placeholder="选择出境日期"
                                            style="width:100%;height:100%;"
                                            @on-change="handleChange1"
                                            :value="saveTitle.departDate"
                                            :disabled="updateFlag"
                                            size="small"></DatePicker>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title" colspan="3">
                            <div>入境日期</div>
                        </td>
                        <td colspan="3">
                            <div>
                                <DatePicker type="date"
                                            placeholder="选择入境日期"
                                            style="width: 100%;"
                                            @on-change="handleChange2"
                                            :value="saveTitle.entryDate"
                                            :disabled="updateFlag"
                                            size="small"></DatePicker>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title"
                            rowspan="11">
                            <div>外汇费用核销记录</div>
                        </td>
                        <td class="table-title">
                            <div>费用项目</div>
                        </td>
                        <td class="table-title" colspan="3">
                            <div>实际预支金额</div>
                        </td>
                        <td class="table-title" colspan="3">
                            <div>实际开支金额</div>
                        </td>
                        <td class="table-title" colspan="3">
                            <div>结余（超支）</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">
                            <div>币种</div>
                        </td>
                        <td>
                            <select v-model="saveTitle.yzCurrency1" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.yzCurrency2" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.yzCurrency3" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.kzCurrency1" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.kzCurrency2" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.kzCurrency3" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.jyCurrency1" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.jyCurrency2" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select v-model="saveTitle.jyCurrency3" :disabled="updateFlag">

                                <option v-for="(item, index) in classSelect"
                                        :key="index"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                    </tr>

                    <tr v-for="(item,index) in saveTitle.forexHxSub"
                        v-if="index < 4">
                        <td class="table-title">
                            <div>{{item.project}}</div>
                        </td>

                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz1 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz2 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz3"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz1 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz2 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 ) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz3 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy1 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy2 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy3 "
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>

                    </tr>
                    <!-- 删除外汇费用核销记录 -->
                    <tr v-for="(item,index) in saveTitle.forexHxSub"
                        v-if="index>3">
                        <td class="table-title">
                            <div>
                                <input @click="delProject($event,index)"
                                       class="tDel-btn table-del">
                                <input type="text"
                                       class="tDel-int"
                                       :readonly="updateFlag"
                                       v-model="item.project"
                                       placeholder="请输入名称">
                            </div>
                        </td>

                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz1"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz2"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyYz3"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz1"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz2"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput2"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyKz3"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy1"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy2"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       @keydown="handleInput1"
                                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57 && event.keyCode !=109 && event.keyCode !=189) event.returnValue=false"

                                       :readonly="updateFlag"
                                       v-model="item.moneyJy3"
                                       @keyup="jySumIn1(index)">
                            </div>
                        </td>

                    </tr>
                    <!-- 增加外汇费用核销记录 -->
                    <tr v-if="!updateFlag">
                        <td class="table-title table-addF"
                            @click="addProject">
                            <div>
                                <input type="text"
                                       class="table-add"

                                       value="增加"
                                       readonly>
                            </div>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                        <td>
                            <input type="text"
                                   readonly>
                        </td>
                    </tr>

                    <tr>
                        <td class="table-title">
                            <div>合计</div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="yzSum1">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="yzSum2">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="yzSum3">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="kzSum1">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="kzSum2">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="kzSum3">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="jySum1">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="jySum2">
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="number"
                                       readonly
                                       v-model="jySum3">
                            </div>
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
        name: "foreign",
        inject: ['reload'],
        methods: {
            handleInput2(e) {
                if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
                    //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
                    return
                }
                // 通过正则过滤小数点后两位
                if(e.keyCode != 9){
                if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0])) {
                    e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
                }}

            },
            handleInput1(e) {
                if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
                    //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
                    return
                }
                if(e.keyCode != 9){
                // 通过正则过滤小数点后两位
                if (e.target.value.toString() !== (e.target.value.match(/^[-]?\d*(\.?\d{0,1})/g)[0])) {
                    e.target.value = (e.target.value.match(/^[-]?\d*(\.?\d{0,1})/g)[0]) || null
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
                console.log(this.$store.state.forexSqNo2, 'dayin')
                window.open(this.$axios.print() + '?reportlet=yhhx' + this.$axios.printCs() + '.cpt&forexHxNo=' + this.$store.state.forexSqNo2)
            },
            update() {
                this.updateFlag = false;
                this.$Message.info('开始修改');
                console.log(this.saveTitle.forexHxSub, 'xiugai')
            },
            // 增加外汇费用核销记录
            addProject() {
                let i = this.saveTitle.forexHxSub.length + 1;
                i = i + "";
                let obj = {
                    no: i,
                    project: "",
                    moneyYz: "",
                    moneyKz: "",
                    moneyJy: ""
                };
                this.saveTitle.forexHxSub.push(obj);
            },
            // 删除预算申报的项目
            delProject(e, index) {
                console.log(index, "del");

                this.saveTitle.forexHxSub.splice(index, 1);
                // console.log(this.saveTitle.forexSqSub);
            },
            //删除整个页面
            del() {

                let obj = {forexHxNo: this.$store.state.forexSqNo2};
                this.$axios.delForexhx(obj).then(res => {
                    if (res.data.ret == 1) {

                        let options = this.$store.state.options;
                        let tab = this.$store.state.tab;
                        // 删除 页签 去除缓存
                        let obj1 = [];
                        let obj2 = [];
                        obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
                        obj1.forEach((item,i)=>{

                            if(item.route != '/funding/foreign'){
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
                        this.$Message.success(res.data.retMsg);
                    } else {
                        this.$Message.error(res.data.retMsg)
                    }

                    console.log(res, 555)
                })
            },
            // 保存
            usSave() {
                if(this.saveTitle.submitter == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                this.saveTitle.submitDate = this.time;
                this.saveTitle.userId = this.$store.state.info.userId;
                this.saveTitle.depCode = this.$store.state.info.departCode;
                this.saveTitle.yzSum1 = this.yzSum1;
                this.saveTitle.yzSum2 = this.yzSum2;
                this.saveTitle.yzSum3 = this.yzSum3;

                this.saveTitle.kzSum1 = this.kzSum1;
                this.saveTitle.kzSum2 = this.kzSum2;
                this.saveTitle.kzSum3 = this.kzSum3;

                this.saveTitle.jySum1 = this.jySum1;
                this.saveTitle.jySum2 = this.jySum2;
                this.saveTitle.jySum3 = this.jySum3;


                let saveData = JSON.parse(JSON.stringify(this.saveTitle));
                let hxSubData = [];
                for (let i = 0; i < this.saveTitle.forexHxSub.length; i++) {
                    hxSubData[i] = this.saveTitle.forexHxSub[i]
                }

                for (let j = 0; j < hxSubData.length; j++) {
                    if (hxSubData[j].project == '') {
                        hxSubData.splice(j, 1);
                    }
                }
                console.log(this.saveTitle.forexHxSub, 'save111')
                saveData.forexHxSub = hxSubData;
                console.log(saveData.forexHxSub, 11);
                this.$axios.addForexhx(saveData).then(res => {
                    console.log(res);
                    if (res.data.ret == 1) {
                        console.log(res.data.retMsg);
                        this.$store.commit('saveForexSqNo2', res.data.data.forexHxNo)
                        this.$Message.success(res.data.retMsg);
                        this.updateFlag = true;
                        this.reload();

                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                    this.reload();

                });
            },
            //修改后保存
            usSave2() {
                if(this.saveTitle.submitter == ''){
                    this.$Message.warning('请填写填报人信息');
                    return false;
                }
                this.saveTitle.submitDate = this.time;
                this.saveTitle.forexHxNo = this.$store.state.forexSqNo2;
                let saveData = this.saveTitle;
                this.saveTitle.yzSum1 = this.yzSum1;
                this.saveTitle.yzSum2 = this.yzSum2;
                this.saveTitle.yzSum3 = this.yzSum3;

                this.saveTitle.kzSum1 = this.kzSum1;
                this.saveTitle.kzSum2 = this.kzSum2;
                this.saveTitle.kzSum3 = this.kzSum3;

                this.saveTitle.jySum1 = this.jySum1;
                this.saveTitle.jySum2 = this.jySum2;
                this.saveTitle.jySum3 = this.jySum3;
                let hxSubData = [];
                for (let i = 0; i < this.saveTitle.forexHxSub.length; i++) {
                    hxSubData[i] = this.saveTitle.forexHxSub[i]
                }

                for (let j = 0; j < hxSubData.length; j++) {
                    if (hxSubData[j].project == '') {
                        hxSubData.splice(j, 1);
                    }
                }

                saveData.forexHxSub = hxSubData;

                console.log(this.time);

                console.log(saveData.forexHxSub, 11);
                this.$axios.updateForexhx(saveData).then(res => {
                    console.log(res);
                    if (res.data.ret == 1) {
                        console.log(res.data.retMsg);
                        this.$store.commit('saveForexSqNo2', res.data.data.forexHxNo)
                        this.$Message.success(res.data.retMsg);
                        this.updateFlag = true;

                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                    this.reload();
                });
            },
            // 聚焦计算结余金额
            jySumIn1(index) {
                if (
                    this.saveTitle.forexHxSub[index].moneyYz != "" &&
                    this.saveTitle.forexHxSub[index].moneyKz != ""
                ) {
                    // console.log('wanc')
                    let a = "";
                    a =
                        this.saveTitle.forexHxSub[index].moneyYz -
                        this.saveTitle.forexHxSub[index].moneyKz;
                    Vue.set(this.saveTitle.forexHxSub[index], "moneyJy", a.toFixed(2));
                }
            }
        },
        watch: {},
        computed: {
            yzSum1: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyYz1){
                        num += Number(st[j].moneyYz1);
                    }

                }
                console.log(num,2345)
                return num.toFixed(2);
            },
            yzSum2: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyYz2)
                    num += Number(st[j].moneyYz2);
                }
                return num.toFixed(2);
            },
            yzSum3: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyYz3)
                    num += Number(st[j].moneyYz3);
                }
                return num.toFixed(2);
            },

            kzSum1: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyKz1)
                    num += Number(st[j].moneyKz1);
                }
                return num.toFixed(2);
            },
            kzSum2: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyKz2)
                    num += Number(st[j].moneyKz2);
                }
                return num.toFixed(2);;
            },
            kzSum3: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyKz3)
                    num += Number(st[j].moneyKz3);
                }
                return num.toFixed(2);
            },
            jySum1: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyJy1)
                    num += Number(st[j].moneyJy1);
                }
                return num.toFixed(2);
            },
            jySum2: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyJy2)
                    num += Number(st[j].moneyJy2);
                }
                return num.toFixed(2);
            },
            jySum3: function () {
                let st = this.saveTitle.forexHxSub;
                let num = 0;
                for (let j = 0; j < st.length; j++) {
                    if(st[j].moneyJy3)
                    num += Number(st[j].moneyJy3);
                }
                return num.toFixed(2);
            },
        },
        filters: {
            // 过滤时间器

            time: function (value, formatString) {
                formatString = formatString || "YYYY-MM-DD";
                return moment(value).format(formatString);

            },
        },
        mounted() {
            let no = this.$store.state.forexSqNo2;
            console.log(no)
            if (no == "") {
                this.updateFlag = false;
                this.userInfo = this.$store.state.info;
                this.saveTitle.company = this.userInfo.companyName;
                this.addProject()

            } else {
                this.updateFlag = true;
                console.log(this.updateFlag,3333444)
                this.$axios.getForexhx(no).then(res => {
                    console.log(res, 3);
                    if (res.data.ret == 1) {
                        this.saveTitle = res.data.data;

                    }
                });
            }

            this.time = Date.parse(new Date());
        },
        data() {
            return {
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
                        value: "人民币",
                        name:'人民币'
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
                updateFlag: true,//修改状态
                userInfo: "",
                onSelect: true,
                time: "",

                saveTitle: {
                    forexHxSub: [
                        {
                            no: 1,
                            project: "住宿费",
                            moneyYz1: "",
                            moneyYz2: "",
                            moneyYz3: "",
                            moneyKz1: "",
                            moneyKz2: "",
                            moneyKz3: "",
                            moneyJy1: "",
                            moneyJy2: "",
                            moneyJy3: "",
                        },
                        {
                            no: 2,
                            project: "伙食费",
                            moneyYz1: "",
                            moneyYz2: "",
                            moneyYz3: "",
                            moneyKz1: "",
                            moneyKz2: "",
                            moneyKz3: "",
                            moneyJy1: "",
                            moneyJy2: "",
                            moneyJy3: "",
                        },
                        {
                            no: 3,
                            project: "公杂费",
                            moneyYz1: "",
                            moneyYz2: "",
                            moneyYz3: "",
                            moneyKz1: "",
                            moneyKz2: "",
                            moneyKz3: "",
                            moneyJy1: "",
                            moneyJy2: "",
                            moneyJy3: "",
                        },
                        {
                            no: 4,
                            project: "城市间交通费",
                            moneyYz1: "",
                            moneyYz2: "",
                            moneyYz3: "",
                            moneyKz1: "",
                            moneyKz2: "",
                            moneyKz3: "",
                            moneyJy1: "",
                            moneyJy2: "",
                            moneyJy3: "",
                        }
                    ],
                    forexStatus: "1",
                    company: "",
                    submitter: "",
                    forexHxNo: "",
                    submitDate: "",
                    groupName: "",
                    capacity: "",
                    capacityActual: "",
                    destination: "",
                    departDate: "",
                    entryDate: "",
                    yzCurrency1: '',
                    yzCurrency2: '',
                    yzCurrency3: '',
                    kzCurrency1: '',
                    kzCurrency2: '',
                    kzCurrency3: '',
                    jyCurrency1: '',
                    jyCurrency2: '',
                    jyCurrency3: '',

                    yzSum1: "",
                    yzSum2: "",
                    yzSum3: "",
                    kzSum1: "",
                    kzSum2: "",
                    kzSum3: "",
                    jySum1: "",
                    jySum2: "",
                    jySum3: "",
                    spbNo:'',
                    daysActual:'',
                }
            };
        }
    };
</script>
<style scoped>
    .fundingTableMain tr td div {

    }

    .fundingTableMain tr:nth-child(1) td:nth-child(1) div {
        width: 187px;
    }

    .fundingTableMain tr:nth-child(1) td:nth-child(1) div,
    .fundingTableMain tr:nth-child(2) td:nth-child(1) div,
    .fundingTableMain tr:nth-child(3) td:nth-child(1) div,
    .fundingTableMain tr:nth-child(4) td:nth-child(1) div {

    }

    .fundingTableMain tr:nth-child(5) td:nth-child(1) div {
        width: 20px;
        margin: 0 10px;
        height: 100%;
    }

    .fundingTableMain tr:nth-child(5) td:nth-child(2) div {

    }

    .fundingTableMain tr:nth-child(2) td:nth-child(1) div,
    .fundingTableMain tr:nth-child(4) td:nth-child(1) div {

    }

    .fundingTableMain tr:nth-child(1) td:nth-child(2) div,
    .fundingTableMain tr:nth-child(2) td:nth-child(2) div {

    }

    .table-addF {
        padding-top: 4px !important;
    }

    .table-add {
        cursor: pointer;
        text-align: center;
        margin-left: 10px;
        height: 21px;

        background: url("../../assets/image/加号.png") no-repeat 4px;
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
                            background: url("../../assets/image/下拉.png") no-repeat 90px center;


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
