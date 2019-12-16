<template>
    <!-- 首页内容 -->
    <div class="index_content">
        <!-- 顶部分栏 -->
        <div class="indexTop">
            <!-- 主内容card -->
            <div class="tabContent">
                <!-- 左边滑块专栏 -->
                <div style="width:34%;float:left">


                <Card style="max-height:380px;">
                    <!-- 进度查询Tab栏 -->
                    <div class="progress">
            <span id="warning"
                  @click="cur=0"
                  v-if="($store.state.info.userAuditType == 1 ||$store.state.info.userAuditType == 2 ||$store.state.info.userAuditType == -1)"

                  :class="{active:cur==0}">预警提示</span>
                        <span id="notice"
                              @click="cur=1"
                              :class="{active:cur==1}">通知公告</span>
                        <img src="../public/new.png"/>
                        <span class="money"></span>
                    </div>
                    <div class="line"></div>
                    <!-- tab栏切换 -->
                    <div class="progressTig">
                        <!-- 总预算使用进度 -->
                        <div v-show="cur==0&&($store.state.info.userAuditType == 1 ||$store.state.info.userAuditType == 2 ||$store.state.info.userAuditType == -1)" >
                            <!-- 总预算使用进度 -->
                            <div class="budget">
                                <span>{{indexConstant.ybp1}}</span>
                            </div>
                            <div class="budget">
                                <!-- <img style="margin-left:85px" src="../public/gre.png"/> -->
                                <div id="myChart"
                                     ref="myChart"
                                     style="width:120px;height:100px;margin-left: 60px;"></div>
                                <span style="padding-top: 18px;margin-right: 40px;">
                  <font class="bud-name">目前使用：</font>
                  <font style="font-size:20px;color:#02C874;float:left">{{ysySum}}</font>
                  <font class="bud-name"> 万元</font>
                  <br/><br/>
                  <font class="bud-name">总&nbsp;&nbsp;&nbsp;额度：</font>
                  <font style="font-size:20px;color:#D94600;float:left">{{zeb}}</font>
                  <font class="bud-name"> 万元</font>
                </span>
                            </div>
                            <!--预申报批次进度 -->
                            <div class="budget">
                                <span>{{indexConstant.ybp2}}</span>
                            </div>
                            <div class="budget">
                <span class="bud-nub">
                 {{indexConstant.ybp6}}&nbsp;<font>{{ysbNum}}</font>&nbsp;件，总金额&nbsp;<font>{{ysbSum}}</font>&nbsp;万元
                </span>
                            </div>
                            <!--在途批次进度 -->
                            <div class="budget">
                                <span>{{indexConstant.ybp3}}</span>
                            </div>
                            <div class="budget">
                <span class="bud-nub">
                  {{indexConstant.ybp7}}<font>&nbsp;{{ztNum}}</font>&nbsp;件，总金额&nbsp;<font>{{ztSum}}</font>&nbsp;万元
                </span>
                            </div>
                            <!--预申报批次进度 -->
                            <div class="budget">
                                <span>{{indexConstant.ybp4}}</span>
                            </div>
                            <div class="budget">
                <span class="bud-nub">
                  {{indexConstant.ybp8}}<font>&nbsp;{{ypfNum}}</font>件，总金额&nbsp;<font>{{ypfSum}}</font>&nbsp;万元
                </span>
                            </div>


                            <div class="budget">
                               {{indexConstant.ybp5}}
                            </div>
                        </div>

                        <!-- 通知公告内容 -->
                        <div  v-if="cur==1">
                            <div  class="notify" v-show="tzggList.length == 0" >暂无通知公告</div>

                            <div  class="dbMatterCon" v-show="tzggList.length != 0" >
                                <table cellspacing="0"
                                       cellpadding="0"
                                       style="border-bottom:none;width:100%">
                                    <thead>
                                    <tr style="line-height:40px;text-align:left;">
                                        <th style="border-bottom:1px solid #E7E7E7;width:55%;text-align:left;">公告标题</th>
                                        <th style="border-bottom:1px solid #E7E7E7;width:30%;text-align:left;">时间</th>
                                        <th style="border-bottom:1px solid #E7E7E7;width:15%;text-align:left;">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(tableCon,index) in tzggList"
                                        :key="tableCon.id"
                                        style="line-height:55px;">
                                        <td style="border-bottom:1px solid #E7E7E7;">
                                            <span>{{tableCon.title}}</span>
                                        </td>
                                        <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.createTime | time}}</td>
                                        <td style="border-bottom:1px solid #E7E7E7;">
                                        <span @click="zcfgModel(index,'tzgg')"
                                              style="cursor:pointer;color:#499cde;">查看</span>
                                        </td>
                                        <td style="border-bottom:1px solid #E7E7E7;"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>
                    <Card style="width:34%;font-size:16px;color:#000;position: fixed;left:0px;bottom:20px;">
                        <p style="margin:8px 0 8px 0;">{{indexConstant.tip1}}</p>
                        <p>{{indexConstant.tip2}}</p>
                        <p>指定换汇银行：中国银行南京城中支行（唯一指定换汇点）</p>
                        <p style="margin-top:8px;">指定换汇银行地址：南京市玄武区中山东路105号</p>

                        <p style="margin-top:8px;">指定换汇银行联系电话：84417888转分机号8302</p>

                    </Card>
                </div>
                <!-- 右边事项内容图 -->
                <Card style="width:65%;float:right">
                    <!-- 待办事项，已办事项，政策法规tab栏 -->
                    <div class="matter">
                        <span id="dbMatter" v-if="$store.state.info.userAuditType == 1 ||$store.state.info.userAuditType == 2 "
                            @click="cure=2"
                            :class="{actived:cure==2}">待办事项</span>

                        <span  id="ybMatter"  v-if="$store.state.info.userAuditType == 1 ||$store.state.info.userAuditType == 2"
                              @click="cure=3"
                              :class="{actived:cure==3}">已办事项</span>
                        <span id="policy"
                              @click="cure=4"
                              :class="{actived:cure==4}">政策法规</span>
                        <span id="newExchange"
                              @click="cure=5"
                              :class="{actived:cure==5}">当前汇率</span>
                    </div>
                    <div class="line"></div>
                    <!--  待办事项，已办事项，政策法规tab内容 -->
                    <div class="matterCon">
                        <!-- 待办事项内容 -->
                        <div  class="dbMatterCon"
                             v-show="cure==2">
                            <table cellspacing="0"
                                   cellpadding="0"
                                   style="border-bottom:none;width:100%" >
                                <thead>
                                <tr style="line-height:40px;text-align:left;">
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">类型</th>

                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">单位名称</th>
                                    <!--                    <th style="border-bottom:1px solid #E7E7E7;">单位部门</th>-->
                                    <!-- <th style="border-bottom:1px solid #E7E7E7;">编号</th> -->
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">填报人</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">团组名称</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">经费</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">填报日期</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(tableCon,i) in $store.state.conList "
                                    :key="i"
                                    style="line-height:55px;">
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditType | todoType}}</td>

                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditDep}}</td>
                                    <!--                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditDep}}</td>-->
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditSubmitter}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.groupName}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditFeeSum}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditDate | time}}</td>

                                    <td style="border-bottom:1px solid #E7E7E7;"
                                        @click='spC(i)'>
                                        <span style="cursor:pointer;color:#499cde;">审批</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        <!-- 已办事项内容 -->
                        <div  class="dbMatterCon" v-if="$store.state.info.userAuditType == 1 ||$store.state.info.userAuditType == 2"
                            v-show="cure==3" >
                            <table cellspacing="0"
                                   cellpadding="0"
                                   style="border-bottom:none;width:100%">
                                <thead>
                                <tr style="line-height:40px;text-align:left;">
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">单位名称</th>
                                    <!--                    <th style="border-bottom:1px solid #E7E7E7;">单位部门</th>-->
                                    <!-- <th style="border-bottom:1px solid #E7E7E7;">编号</th> -->
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">填报人</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">团组名称</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">经费</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">填报日期</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(tableCon,i) in $store.state.conListDone"
                                    :key="i"
                                    style="line-height:55px;">
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditCompany}}</td>
                                    <!--                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditDep}}</td>-->
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditSubmitter}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.groupName}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditFeeSum}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.auditDate | time}}</td>

                                    <td style="border-bottom:1px solid #E7E7E7;"
                                        @click='spDone(i)'>
                                        <span style="cursor:pointer;color:#499cde;">查看</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        <!-- 政策法规内容 -->
                        <div class="dbMatterCon"
                             v-show="cure==4">
                            <table cellspacing="0"
                                   cellpadding="0"
                                   style="border-bottom:none;width:100%">
                                <thead>
                                <tr style="line-height:40px;text-align:left;">
                                    <th style="border-bottom:1px solid #E7E7E7;width:65%;text-align:left;">政策标题</th>
                                    <th style="border-bottom:1px solid #E7E7E7;width:15%;text-align:left;">时间</th>
                                    <th style="border-bottom:1px solid #E7E7E7;width:15%;text-align:left;">操作</th>
                                    <!-- <th style="border-bottom:1px solid #E7E7E7;">
                                      <Button type="primary" style="font-size:16px;margin-left:12px;"><Icon type="ios-add-circle-outline" size="20"/>&nbsp;录入</Button>
                                    </th> -->
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(tableCon,index) in zcfgList"
                                    :key="tableCon.id"
                                    style="line-height:55px;">
                                    <td style="border-bottom:1px solid #E7E7E7;">
                                        <span>{{tableCon.title}}</span>
                                    </td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.createTime | time}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">
                      <span @click="zcfgModel(index,'zcfg')"
                            style="cursor:pointer;color:#499cde;">查看</span>
                                    </td>
                                    <td style="border-bottom:1px solid #E7E7E7;"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--  汇率查询-->
                        <div class="dbMatterCon"
                             v-show="cure==5">
                            <table cellspacing="0"
                                   cellpadding="0"
                                   style="border-bottom:none;width:100%">
                                <thead>
                                <tr style="line-height:40px;text-align:left;">
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">日期</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">美元：人民币</th>
                                    <th style="border-bottom:1px solid #E7E7E7;">英镑：人民币</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">欧元：人民币</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">日元：人民币</th>
                                    <th style="border-bottom:1px solid #E7E7E7;text-align:left;">港币：人民币</th>

                                    <!-- <th style="border-bottom:1px solid #E7E7E7;">
                                      <Button type="primary" style="font-size:16px;margin-left:12px;"><Icon type="ios-add-circle-outline" size="20"/>&nbsp;录入</Button>
                                    </th> -->
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(tableCon,index) in newExchange"
                                    :key="tableCon.id"
                                    style="line-height:55px;">
                                    <td style="border-bottom:1px solid #E7E7E7;">
                                        <span>{{tableCon.time}}</span>
                                    </td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.rmbM}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.rmbY}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.rmbO}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.rmbR}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;">{{tableCon.rmbG}}</td>
                                    <td style="border-bottom:1px solid #E7E7E7;"></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </Card>
            </div>
        </div>
        <Modal v-model="modal1"
               title="政策法规"
               width="70%"
               @on-ok="ok"
               @on-cancel="cancel">
            <p style="text-align:center">
                <span class="m-title">{{zcfgMain.title}}</span>
            </p>

            <div v-html="zcfgMain.content"></div>
            <div style="border-top:1px solid #e8eaec;width:100%;display:flex;">
                <div style="font-size:16px;color:#000;line-height:40px;">附件信息：</div>
                <div>
                      <div v-for="(fileName,index) in fileTNames" style="margin-left:10px;line-height:40px;">
                         {{fileName}}
                        <Icon type="ios-cloud-download"
                            @click="downloadFile(index)"
                            style="cursor:pointer;fontSize:20px"/>

                </div>
                </div>
              
            </div>
        </Modal>
    </div>

</template>
<script>
    import Bus from './assets/js/bus.js';
    import FileSaver from "file-saver";
    import {formatDate} from "../public/formatDate.js";

    export default {
        data() {
            return {
                ypfNum: 0,
                ypfSum: 0,
                ysbNum: 0,
                ysbSum: 0,
                ztNum: 0,
                ztSum: 0,
                ysySum: 0,//已使用预算
                zeb: 0,//总额度
                formInline: {
                    user: "",
                    password: "",
                    loginId: '',
                    list: null
                },
                // 政策法规 弹出层的内容
                zcfgMain: {
                    title: '',
                    content: ''
                },
                modal1: false,
                //   默认选中第一个
                cur: 0,
                cure: 2,
                // 滑块的取值
                value1: 2589,
                value2: 238,
                value3: 1469,
                value4: 1469,
                value5: 1257,
                number: [
                    {num: 0},
                    {num: 500},
                    {num: 1000},
                    {num: 1500},
                    {num: 2000},
                    {num: 2500},
                    {num: 2800},
                    {num: 3000}
                ],
                number2: [
                    {num: 0},
                    {num: 50},
                    {num: 100},
                    {num: 150},
                    {num: 200},
                    {num: 300},
                    {num: 350},
                    {num: 400}
                ],
                //代办事项
                conList: [],
                //已办事项
                conListDone: [],
                zcfgList: [],
                tzggList: [],//通知公告
                // 最近的汇率
                newExchange: [],
                budData: {
                    a1: 2100,
                    b1: 3000,
                    a2: 280,
                    b2: 400
                },
                fileTNames: [],//附件的name
                fileId: [],// 接收的政策查询附件的id

                userAuditTypeFlag:'',
                indexConstant:{
                  

                },
            };
        },
        filters: {
            fromDate: function (value) {
                var date = new Date(value);
                var year = date.getFullYear();
                var month = (date.getMonth() + 1).toString().padStart(2, "0");
                var day = date
                    .getDate()
                    .toString()
                    .padStart(2, "0");
                return `${year} - ${month} - ${day}`;
            },
            todoType:function(value){
                let item;
                switch (value){
                    case 3:
                        item = '正式申请';
                        break;
                    case 5:
                        item = '补申请';
                        break;
                 

                }
                console.log(item,'itemmmmm')
                return item;
            }
        },
        methods: {

            downloadFile(index) {
                let id = this.fileId[index];
                FileSaver.saveAs(this.$axios.fileDownload() + id, this.fileTNames[index]);
                //
            },
            ok() {
                // this.$Message.info('Clicked ok');
            },
            //点击审批 进入正式表
            spC(i) {
                let id = this.$store.state.conList[i].auditNo;
                if (this.$store.state.conList[i].auditType == 3) {
                    this.$store.commit('saveZsAuditNo', id);
                    let obj = [];
                    obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                    console.log(obj,233333333)
                    obj.forEach((item,index)=>{
                        if(item.route == '/funding/application'){
                            obj.splice(index,1);
                            this.$store.state.includeOption.splice(index,1);
                        }
                    })
                    this.$router.push({path: '/funding/application'});

                } else if (this.$store.state.conList[i].auditType == 4) {
                    this.$store.commit('saveZsBlAuditNo', id);
                    let obj = [];
                    obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                    console.log(obj,233)
                    obj.forEach((item,index)=>{
                        if(item.route == '/funding/applicationBL'){
                            obj.splice(index,1);
                            this.$store.state.includeOption.splice(index,1);
                        }
                    })
                    this.$router.push({path: '/funding/applicationBL'});
                } else if (this.$store.state.conList[i].auditType == 5) {
                    console.log(this.$store.state.conList[i],'lisss')
                    let itemList = this.$store.state.conList[i];
                    this.$axios.getApplySupAuditSpt({auditSptNo:itemList.auditNo}).then(res=>{
                        console.log(res,'233')
                         let supObj = {auditNo:res.data.data.auditSpt.auditNo,applyNo:res.data.data.auditSpt.auditSptNo};
                         console.log(supObj)
                         this.$store.commit('saveApplySupNo', supObj);
                         let obj = [];
                         obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                         console.log(obj,233)
                         obj.forEach((item,index)=>{
                            if(item.route == '/funding/applySupplement'){
                                obj.splice(index,1);
                                this.$store.state.includeOption.splice(index,1);
                            }
                        })
                      this.$router.push({path: '/funding/applySupplement'});

                    })
                   

                  
                  
                }

            },
            //点击查看 进入正式表
            spDone(i) {
                let id = this.$store.state.conListDone[i].auditNo;
                if (this.$store.state.conListDone[i].auditType == 3) {

                    this.$store.commit('saveZsAuditNo', id);
                    this.$router.push({path: '/funding/application'});
                } else if (this.$store.state.conListDone[i].auditType == 4) {
                    this.$store.commit('saveZsBlAuditNo', id);
                    this.$router.push({path: '/funding/applicationBL'});
                }

            },
            // 点击政策法规 操作 弹出 Model层
            zcfgModel(i, type) {
                console.log(i);
                console.log(this.zcfgList[i], '3333')
                this.modal1 = true;

                if (type == 'zcfg') {
                    this.zcfgMain.title = this.zcfgList[i].title;
                    this.zcfgMain.content = this.zcfgList[i].content;
                    var id = this.zcfgList[i].id;
                } else {
                    this.zcfgMain.title = this.tzggList[i].title;
                    this.zcfgMain.content = this.tzggList[i].content;
                    var id = this.tzggList[i].id;
                }
                let data = {id: id};
                this.$axios.getPolicyStatute(data).then(res => {
                    // console.log(res,'res')
                    console.log(res.data);
                    if (res.data.ret == 1) {
                        let list = res.data.data;
                        this.params = list.policyType;

                        var fileNameIds = [];
                        var fileTNames = [];
                        for (let i = 0; i < list.file.length; i++) {
                            fileNameIds.push(list.file[i].fileId);
                            fileTNames.push(list.file[i].fileName);
                        }
                        console.log(this.fileTNames, 'name')
                        this.fileId = fileNameIds;
                        this.fileTNames = fileTNames;

                    }
                });


            },
            cancel() {
                // this.$Message.info('Clicked cancel');
            },
            //构造方法
            setChart(obj, data) {
                var colorTemplate1 = [[0.2, "rgba(255,0,0,0.8)"], [0.8, "rgba(0,255,255,0.8)"], [1, "rgba(0,255,0,0.8)"]];
                // 绘制图表
                obj.setOption({
                    backgroundColor: "#fff",
                    series: [{
                        name: '刻度1',
                        type: 'gauge',
                        radius: '75%',
                        min: 0, //最小刻度
                        max: 100, //最大刻度
                        splitNumber: 1, //刻度数量
                        startAngle: 225,
                        endAngle: -45,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: [
                                    [1, 'rgba(0,0,0,0)']
                                ]
                            }
                        }, //刻度标签。
                        axisTick: {
                            show: true,
                            splitNumber: 10,
                            lineStyle: {
                                color: '#5c53de', //用颜色渐变函数不起作用
                                width: 1,
                            },
                            length: -10
                        }, //刻度样式
                        splitLine: {
                            show: false,
                        }, //分隔线样式
                        detail: {
                            show: false
                        },
                        pointer: {
                            show: false
                        }
                    },
                        {
                            "name": "仪表盘1",
                            "type": "gauge",
                            radius: '100%',
                            "splitNumber": 10,
                            "axisLine": {
                                "lineStyle": {
                                    "color": [
                                        [data.value / 100, data.color.value],
                                        [1, "grey"]
                                    ],
                                    "width": 5
                                }
                            },
                            axisLabel: {
                                show: false,
                            },
                            "axisTick": {
                                show: false,

                            },
                            "splitLine": {
                                "show": false,
                            },
                            "itemStyle": {
                                show: false,
                            },
                            "detail": {
                                "formatter": function (value) {
                                    if (value !== 0) {
                                        var num = Math.round(data.value);
                                        return parseInt(num).toFixed(0) + "%";
                                    } else {
                                        return 0;
                                    }
                                },
                                "offsetCenter": [0, "80%"],
                                "textStyle": {
                                    padding: [0, 0, 80, 0],
                                    "fontSize": 18,
                                    fontWeight: '700',
                                    "color": data.color.value
                                },
                            },
                            "title": {
                                color: '#fff',
                                "fontSize": 10,
                                "offsetCenter": [0, "-25%"]
                            },
                            pointer: {
                                show: false,
                                length: '75%',
                                width: 20, //指针粗细
                            },
                        },
                    ]


                });
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                console.log(this.$refs,233);

                this.$nextTick(()=>{
                    setTimeout(()=>{
                        console.log(document,345)
                        console.log(document.querySelector('#app'),2345)
                        var myChart = this.$echarts.init(document.getElementById('myChart'))
                        var data = {

                                value: (100 * this.ysySum / this.zeb).toFixed(2),
                                color: {
                                    value: '#02C874', //底部数值颜色
                                },
                            },
                            data1 = {

                                value: (100 * this.budData.a2 / this.budData.b2).toFixed(2),
                                color: {
                                    value: '#2894FF', //底部数值颜色
                                },
                            }
                        console.log(data, '587')
                        this.setChart(myChart, data)
                    })
                })


                // this.setChart(myChart1, data1)
            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            },
            getConstant(){
                
                this.$axios.getConstant('').then(res=>{
                    console.log(res,'首页的');
                    this.indexConstant = res.data.data;


                })
            }
        },
        created:async function() {

            if (window.location.search) {
                let arr = window.location.search;
                let arr2 = arr.split('=');
                let u1 = arr2[1];//登录id
                this.$cookies.set('JSESSIONID', u1);
                // console.log(this.$cookies.get('JSESSIONID'),'JSESSIONID');
                this.$store.commit("ps_Login", 0, {});
                this.$store.commit("loginState", 0, {});
                //判断用户信息是否存在，并返回数据
                await this.$axios.getUser({loginId: u1}).then(res => {
                    console.log(res,'用户信息3333333');
                    if (this.$store.state.numOption == 1) {
                        let options = [
                            {
                                name: '首页',
                                route: '/index',
                            }
                        ];
                        this.$store.commit('showOption', options);
                        this.$store.commit('addNumOption', 2);
                    }
                    if (res.data.ret) {
                        this.formInline.user = res.data.data.fullName;
                        this.formInline.loginId = u1;
                        this.$store.commit("ps_Login", this.formInline);
                        this.$store.commit("loginState", res.data.data.data);
                        // 利用bus总线传递userId的值；
                        let busId = this.$store.state.info.userId;

                        Bus.$emit('userId', busId);
                        let userCode = this.$store.state.info.departCode;
                        let fullName = this.$store.state.info.fullName;

                        fullName = encodeURI(fullName);
                        // 首次加载进来 请求代办事项 已办事项
                        if(this.$store.state.info.userAuditType == 1 ||this.$store.state.info.userAuditType == 2){
                            let obj2 = {departCode: userCode, userNick: fullName,userAuditType:this.$store.state.info.userAuditType};
                            this.$axios.getTodo(obj2).then(res => {
                                console.log(res, 'tode');
                                if (res.data.ret == 1) {
                                    let list = res.data.data;
                                    console.log(list, 'list55555');
                                    let listN = [];
                                    this.conList = list;
                                    this.$store.commit('addConList', list);
                                }
                            })
                            let obj3 = {userId: busId};
                            console.log(obj3)
                            this.$axios.getDoneTodo(obj3).then(res => {
                                console.log(res, 'tode');
                                if (res.data.ret == 1) {
                                    let list = res.data.data;
                                    console.log(list, 'list');
                                    let listN = [];
                                    this.conListDone = list;
                                    this.$store.commit('addConListDone', list);
                                    // console.log(this.conList, 'conl')
                                }
                            })
                        }
                        // console.log(this.$store.state.info.userAuditType != 1 &&this.$store.state.info.userAuditType != 2)
                        // console.log(this.$store.state.info.userAuditType)
                        if(this.$store.state.info.userAuditType != 1 &&this.$store.state.info.userAuditType != 2 ){
                            console.log(this.cure,"cure")
                            this.cure = 4;
                            if(this.$store.state.info.userAuditType !=-1){
                                this.cur = 1;
                            }
                        }else{
                            this.cure = 2;
                        }
                    }
                })
                if (u1) {
                    localStorage.setItem('token1', u1);

                }

            }
        },
        mounted: async function () {

            console.log(this.$store.state.menuData, 'menuDataa')
            // 政策法规 数据
            let obj = {
                page: 1,
                row: 10,
                policyType: 3
            }
            console.log(this.$store.state.info, 'info')
            console.log(this.conList, 'list2222')
            this.$axios.getPolicyStatuteList1(obj).then(res => {
                console.log(res.data.data.list, '3334444');
                let list = res.data.data.list;
                list = list.filter(item => {
                    return item.title != '';
                })
                console.log(list, 33)

                this.zcfgList = list;
            })
            this.getConstant();

            // 通知公告 数据
            let obj2 = {
                page: 1,
                row: 10,
                policyType: 1
            }
            this.$axios.getPolicyStatuteList1(obj2).then(res => {
                let list = res.data.data.list;
                list = list.filter(item => {
                    return item.title != '';
                })
                console.log(list, '77777')

                this.tzggList = list;
                console.log(this.tzggList.length,222233333)

            })
            // 根据用户信息查询 代办事项
            let userCode = this.$store.state.info.departCode;
            let fullNames = this.$store.state.info.fullName;
            console.log(typeof (fullNames),55555)
            if (userCode) {
                if(this.$store.state.info.userAuditType == 1 ||this.$store.state.info.userAuditType == 2) {
                    let obj2 = {departCode: userCode, userNick: fullNames};
                    this.$axios.getTodo(obj2).then(res => {
                        console.log(res, 'todee');
                        if (res.data.ret == 1) {
                            let list = res.data.data;
                            console.log(list, 'list');
                            let listN = [];
                            this.conList = list;
                            this.$store.commit('addConList', list);
                            // console.log(this.conList, 'conl')
                        }
                    })
                    // 根据用户信息查询 已办事项
                    let userId = this.$store.state.info.userId;
                    if (userId) {
                        let obj2 = {userId: userId};
                        console.log(obj2)

                        this.$axios.getDoneTodo(obj2).then(res => {
                            console.log(res, 'tode');
                            if (res.data.ret == 1) {
                                let list = res.data.data;
                                console.log(list, 'list');
                                let listN = [];
                                this.conListDone = list;
                                this.$store.commit('addConListDone', list);
                                // console.log(this.conList, 'conl')
                            }
                        })
                    }
                }
            }
            // 查询最新汇率
            this.$axios.getExchangeList().then(res => {
                console.log(res.data, '454545');
                if (res.data.ret == 1) {
                    console.log(2345, res.data.data.length, 5)
                    let datas = res.data.data;
                    let newData = [];
                    for (let i = 0; i < datas.length; i++) {
                        let obj = {};
                        console.log(res.data, 345)
                        obj.time = this.formatDate(datas[i].UPDATE_TIME);
                        obj.rmbM = Number(datas[i].RATE[0]);
                        obj.rmbY = Number(datas[i].RATE[1]);
                        obj.rmbO = Number(datas[i].RATE[2]);
                        obj.rmbR = Number(datas[i].RATE[3]);
                        obj.rmbG = Number(datas[i].RATE[4]);
                        console.log(obj, 677)
                        newData.push(obj)

                    }
                    this.newExchange = newData;
                    console.log(this.newExchange, '4444')

                }
            });


            // 批次进度
            this.$axios.pcjd().then(res => {
                console.log(res, 'resssss');
                if (res.data.ret == 1) {
                    let datas = res.data.data;
                    this.ypfNum = datas.ypfNum;
                    this.ypfSum = datas.ypfSum.toFixed(2);
                    ;
                    this.ysbNum = datas.ysbNum;
                    this.ysbSum = datas.ysbSum.toFixed(2);
                    this.ztNum = datas.ztNum;
                    this.ztSum = datas.ztSum.toFixed(2);
                    this.ysySum = (Number(datas.ypfSum) + 1565.61).toFixed(2)

                } else {
                    this.$Message.error(res.data.retMsg);
                }
            })
            //首页总预算已使用预算

            await this.$axios.zedysyed().then(res => {
                console.log(res, 'zed');
                if (res.data.ret == 1) {

                    this.zeb = res.data.data.zed[0].budget.toFixed(2);
                }
            })
            this.drawLine()



        }
    };
</script>

<style lang="less" scoped>

    .bud-name {
        text-align: right;
        display: block;
        float: left;
        font-size: 12px;
        color: #333;
        line-height: 25px;
    }

    .bud-nub {
        float: right;
        width: 100%;
        font-size: 12px;
        color: #333 !important;
        text-align: right;

        font {
            font-size: 24px;
            color: #228ffe;
            margin-top: 10px;
        }
    }

    .dbMatterCon {
        tr {
            cursor: pointer;

            &:hover {
                background: #f9f9f9;
                color: #000;
                font-weight: bold;
            }
        }
    }

    .m-title {
        line-height: 42px;
        text-align: center;
        font-family: "Microsoft YaHei";
        font-size: 28px;
        color: #000;
    }

    // 分兰卡片
    .tabCard {
        height: 150px;
        line-height: 150px;
    }

    .left,
    .right {
        color: #fff;
        float: left;
        cursor: pointer;
    }

    .left {
        margin-left: 100px;
    }

    .right {
        position: relative;
        right: 100px;
    }

    // 分栏图片
    .tabPic {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .tabIcon {
        position: relative;
        left: -43px;
    }

    .tabIcon img {
        width: 115px;
        height: 95px;
        margin: 10px 14px 0 40px;
    }

    // 主页下半部分内容
    .tabContent {
        margin-top: 30px;
    }

    // 警示
    .progress #warning {
        float: left;
        // color: #e2bebe;

        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        cursor: pointer;
    }

    // 通告
    .progress #notice {
        float: left;
        // font-size: 16px;
        // color: #e2bebe;
        margin-left: 20px;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid #4495ff;
        color: #4495ff;
    }

    .actived {
        border-bottom: 2px solid #4495ff;
        color: #4495ff;
    }

    .progress .money {
        float: right;
        line-height: 30px;
        color: #e2bebe;
    }

    .line {
        width: 100%;
        border-bottom: 1px solid #e2bebe;
        margin-top: 30px;
    }

    // tab切换
    .progressTig .budget {

        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .progressTig .notify {
        margin-top: 20px;
    }

    .jdBar {
        border-bottom: 1px solid #e2bebe;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
    }

    .jdBar span {
        display: inline-block;
        color: #e2bebe;
        margin: 0 0 0 0;
    }

    // 通告
    .matter #dbMatter,
    #ybMatter,
    #policy,
    #newExchange {
        float: left;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        cursor: pointer;
    }

    #ybMatter,
    #policy, #newExchange {
        margin-left: 20px;
    }

    .matterCon {
        margin-top: 10px;
    }

    .ivu-slider-disabled .ivu-slider-bar {
        background-color: #57a3f3;
    }
</style>
