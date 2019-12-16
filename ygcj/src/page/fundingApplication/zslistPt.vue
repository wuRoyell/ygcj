<!--正式表审批-->
<template>
    <div id="foreignQuery">
        <div id="funding-a">

            <Row>
                <Col span="4"
                     style="margin-left:30px;">
                    <div style="display:flex">
                        <span style="width:190px;line-height:30px;">预算单位名称:</span>
                        <Input v-model="findData.auditCompany"
                               placeholder="请填写单位名称"
                               style="width: 300px"/>
                    </div>
                </Col>
                <Col span="7">
                    <div style="display:flex;margin-left:40px;">
                        <span style="display:block;width:280px;line-height:30px;">出国（境）任务批件文号:</span>
                        <Input v-model="findData.auditPjh1"

                               placeholder="请填写批件文号"
                               style="width: 320px"/>
                    </div>
                </Col>
<!--                <Col span="6">-->
<!--                    <div style="display:flex;margin-left:40px;">-->
<!--                        <span style="width:100px;line-height:30px;">申请表状态:</span>-->
<!--                        <Select v-model="auditMulStatus" multiple style="width:260px">-->
<!--                            <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.name }}</Option>-->
<!--                        </Select>-->
<!--                    </div>-->
<!--                </Col>-->

                <Col span="5">
                    <div style="display:flex;margin-left:40px;">
                        <span style="width:60px;line-height:30px;">任务性质:</span>

                        <Select v-model="findData.groupMission" style="width:200px;">
                            <Option v-for="(item,index) in Mission"
                                    :value="item.value">{{item.name}}
                            </Option>
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="5">
                    <div style="display:flex;margin-left:40px;">
                        <span style="width:135px;line-height:30px;">组团单位:</span>
                        <Input v-model="findData.groupUnit"
                               placeholder="请填写单位名称"
                               style="width: 300px"/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="5"
                     style="float:right;margin-right:13px;">

                    <Button type="primary"
                            style="float:right;margin-left:15px"
                            @click="findNew">重置
                    </Button>
                    <Button style="float:right"
                            type="primary"
                            icon="ios-search"
                            @click="find">查询
                    </Button>
                </Col>

            </Row>

            <Button type="primary"
                    style="float:left;margin:12px"
                    v-if="$store.state.info.userAuditType != 0 "
                    @click="thSelect">批量退回
            </Button>
            <Button style="float:left;margin:12px;"
                    type="primary"
                    v-if="$store.state.info.userAuditType != 0 "
                    @click="spSelect">
                <i class="iconshenpi" style="line-height:20px;font-size:12px"></i> 批量审批
            </Button>
            <!--            </Row>-->
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="excelDown">导出
            </Button>
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="checkA">重置
            </Button>
            <Dropdown style="margin: 20px 12px 0 0;float:right">
                <a href="javascript:void(0)">
                    <Button type="primary" style="margin-bottom: 12px;margin-top: -7px;">
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

            <div>
                <div class="funding-table">
                    <tabDragZs
                            @mainChange="mainC($event)"
                            @ygcgIndex="indexChange"
                            @selectBox="selectList"
                            listType="zslist"
                            :titleData="titleData"
                            :dataAdd='dataAdd'
                            :titleChildIndex="titleChildIndex"
                            :pageNum="pageNum"
                            :mainData="mainData"
                            :sele="sele"></tabDragZs>
                </div>
            </div>
        </div>
        <Modal v-model="editorShow"
               :maskClosable=false
               width="400">
            <div class="editorHeader"
                 slot="header">
                审批
            </div>
            <div class="editor-main"
                 v-if="editorShow">

                <div class="spBox">
                    <span>审批意见：</span> <input type="text"
                                              v-model="auditSuggestion"></input>
                </div>
                <div class="smBox">
                    <span>说明：</span><input type="text"
                                           v-model="auditRemark"></input>
                </div>

            </div>
            <div class="editor-bottom"
                 slot="footer">

                <button class="btn2"
                        @click="hideEditor">关闭
                </button>
                <button class="btn1"
                        @click="quit($event)">确定
                </button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import moment from "moment";
    import XLSX from 'xlsx';
    import FileSaver from "file-saver";
    import tabDragPt from '@/components/table-drag-zslistPt.vue';

    export default {
        name:'zslistPt',
        inject: ['reload'],
        components: {
            tabDragPt
        },
        //局部过滤器
        filters: {
            whether(val) {
                if (val == 1) {
                    return "是";
                } else if (val == 2) {
                    return "否";
                }
            }
        },
        watch: {
            sele(newVal, oldVal) {
                console.log(newVal, "sele");
                this.pages = 1;
                let p = 1;
                let row = newVal;
                this.findData.row = newVal;
                this.findData.page = this.pages;
                this.getListDetailed(this.findData);


            },
            pages(newVal, oldVal) {
                console.log(newVal, 'pages111')
                this.findData.row = this.sele;
                this.findData.page = newVal;
                this.getListDetailed(this.findData);


            }
        },
        methods: {
            //表格导出
            excelDown() {
                // let obj = ['序号', '姓名', '身份证号码', '单位', '职务', '联系方式'];
                //如果有复杂表头
                let obj1 = []; //第一行表头标题
                let obj2 = []; //第二行标题
                let obj3 = [];//第三行标题
                //没有复杂表头 的标题
                let obj4 = [];
                var data = []; //有复杂的 标题的name
                var data2 = [];//么有 的 标题的name
                var titleNewIndex = '';// 显示的数组 复杂表格的位置
                console.log(this.titleData, 2323)
                console.log(this.titleData[this.titleChildIndex]);
                let titleNew = [];
                for (let j = 0; j < this.titleData.length; j++) {
                    if (this.titleData[j].ifc == true) {
                        //显示的标题部分拿到一个新数组里面
                        titleNew.push(this.titleData[j])
                    }
                }
                titleNew.forEach((item, index) => {
                    if (item.children && item.ifc == true) {
                        titleNewIndex = index;
                    }
                })
                console.log(titleNew, '333')
                for (let j = 0; j < titleNew.length; j++) {

                    if (titleNewIndex == '') { // 显示的标题没有复杂表格
                        obj4.push(titleNew[j].title); //
                        data2.push(titleNew[j].name);

                    } else {
                        if (titleNew[j].children) { //如果显示的标题中含有复杂表格 复杂表格处理
                            console.log(j, '99999999')
                            obj1.push(titleNew[j].title);
                            for (let k = 0; k < 12; k++) { //复杂表格的 循环 12个 cell
                                if (k < 8) {  // 前8个cell
                                    obj1.push(null)
                                    obj2.push(titleNew[j].children[k].title)
                                    obj3.push(null);
                                    data.push(titleNew[j].children[k].name);
                                } else if (k == 8) { //第9个cell
                                    obj2.push(titleNew[j].children[k].title);
                                    for (let x = 0; x < 4; x++) {
                                        obj3.push(titleNew[j].children[8].children[x].title);
                                        data.push(titleNew[j].children[8].children[x].name);
                                    }
                                } else {
                                    obj1.push(null)
                                    obj2.push(null);
                                }
                            }
                        } else {
                            obj1.push(titleNew[j].title);
                            obj2.push(null);
                            obj3.push(null);
                            data.push(titleNew[j].name);

                        }
                    }
                }
                var excelArr = [];
                console.log(data, '33333')
                console.log(this.dataAdd, '66666')
                for (let i = 0; i < this.mainData.length; i++) {
                    let arr2 = [];
                    var arrAnd = [];
                    if (titleNewIndex == '') {
                        for (let j = 0; j < data2.length; j++) {
                            arr2.push(this.mainData[i][data2[j]]);
                            arrAnd.push(this.dataAdd[data2[j]])
                        }

                    } else {
                        for (let j = 0; j < data.length; j++) {
                            arr2.push(this.mainData[i][data[j]]);
                            arrAnd.push(this.dataAdd[data[j]])
                        }
                    }
                    excelArr.push(arr2);
                }
                excelArr.push(arrAnd);
                if (titleNewIndex == '') {
                    excelArr.unshift(obj4);
                } else {
                    excelArr.unshift(obj3);
                    excelArr.unshift(obj2);
                    excelArr.unshift(obj1);
                }
                console.log(excelArr, 66)
                var sheet = XLSX.utils.aoa_to_sheet(excelArr);
                console.log(titleNewIndex, '9999')
                if (titleNewIndex != '') {
                    let ec = Number(titleNewIndex) + 11;
                    let arrAnds = [{s: {r: 0, c: titleNewIndex}, e: {r: 0, c: ec}}];
                    for (let j = 0; j < titleNew.length; j++) { //在显示的标题数组循环
                        if (j == titleNewIndex) {
                            var newIndex = j;
                            //如果是复杂表格
                            for (let k = 0; k < 12; k++) {
                                if (k < 8) {
                                    let cellAnd2 = {s: {r: 1, c: j + k}, e: {r: 2, c: j + k}};
                                    arrAnds.push(cellAnd2)
                                } else if (k == 8) {
                                    let cellAnd3 = {s: {r: 1, c: j + k}, e: {r: 1, c: j + 11}};
                                    arrAnds.push(cellAnd3)
                                }
                            }
                        } else if (j < titleNewIndex) {
                            let cellAnd1 = {s: {r: 0, c: j}, e: {r: 2, c: j}};
                            arrAnds.push(cellAnd1);
                        } else if (j > titleNewIndex) {
                            ec += 1;
                            let cellAnd4 = {s: {r: 0, c: ec}, e: {r: 2, c: ec}};
                            arrAnds.push(cellAnd4);
                        }
                    }

                    console.log(arrAnds, 333)
                    // 表格的单元格合并
                    sheet['!merges'] = arrAnds;

                }
                FileSaver.saveAs(this.sheet2blob(sheet), '经费正式申请表.xlsx');
                // this.openDownloadDialog(this.sheet2blob(sheet), '经费正式申请表.xlsx')
            },

            // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
            sheet2blob(sheet, sheetName) {
                sheetName = sheetName || 'sheet1';
                var workbook = {
                    SheetNames: [sheetName],
                    Sheets: {}
                };
                workbook.Sheets[sheetName] = sheet;
                // 生成excel的配置项
                var wopts = {
                    bookType: 'xlsx', // 要生成的文件类型
                    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                    type: 'binary'
                };
                var wbout = XLSX.write(workbook, wopts);

                var blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});

                // 字符串转ArrayBuffer
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }

                console.log(blob, '7777777777777777')


                return blob;
            },
            //接收子组件 的字段，改变maindata
            mainC(msg) {

                if (msg instanceof Array) {
                    this.mainData = msg;
                    this.mainData.splice()
                } else {
                    console.log(msg);
                    msg.userAuditType = this.$store.state.info.userAuditType;
                    this.getListDetailed(msg);
                }
            },
            selectList(msg) {
                let msgArr = [];
                for (var i = 0; i < msg.length; i++) {
                    if (msg[i].AUDIT_NO != undefined) {
                        msgArr.push(msg[i]);
                    }
                }
                console.log(msgArr, 'newselectList')
                this.spSelectList = msgArr;

            },
            // 子组件传的复杂表头拖拽后的index
            indexChange(msg) {
                this.titleChildIndex = msg;
                console.log(msg, 'ggggg')
            },

            // 退回显示model
            thSelect() {
                let getSelect = this.spSelectList;

                if (getSelect.length == 0) {
                    this.$Message.warning('选择内容不能为空');
                    return false;
                }

                for (var i = 0; i < getSelect.length; i++) {
                    if (getSelect[i].AUDIT_STATUS != "扎口处退回" && getSelect[i].AUDIT_STATUS != "待业务处室审核" &&getSelect[i].AUDIT_STATUS != "业务处室已审") {
                        this.$Message.warning('编号' + getSelect[i].AUDIT_NO + '的申请表状态为' + getSelect[i].AUDIT_STATUS + '\n请重新选择')
                        return false;
                    }
                }
                console.log(333)
                this.editorShow = true;
            },
            //批量退回
            quit() {
                let getSelect = this.spSelectList;

                var selectFlag = true;
                getSelect.forEach(item => {
                    console.log(item.AUDIT_NO)
                    let obj = {
                        auditNo: item.AUDIT_NO,
                        auditDep: this.$store.state.info.departName,
                        auditDepCode: this.$store.state.info.departCode,
                        auditSuggestion: this.auditSuggestion,
                        auditRemark: this.auditRemark,
                        auditAuditer: this.$store.state.info.fullName,
                        auditUserId: this.$store.state.info.userId
                    }

                    this.$axios.auditBack(obj).then(res => {
                        console.log(res);
                        if (res.data.ret == 1) {
                            // console.log(123)
                            this.editorShow = false;
                            this.reload();
                        } else {
                            selectFlag = false;
                            this.$Message.error('编号' + item.AUDIT_NO + res.data.retMsg);
                            this.reload();
                        }
                    })

                })
                if (selectFlag == true) {
                    this.$Message.success('审批成功');
                    this.reload();
                }

            },
            hideEditor() {
                this.editorShow = false;
            },
            //批量审核
            spSelect() {
                console.log(1)
                let getSelect = this.spSelectList;
                console.log(getSelect, 3344)
                if (getSelect.length == 0) {
                    this.$Message.warning('选择内容不能为空');
                    return false;
                }
                for (var i = 0; i < getSelect.length; i++) {
                    if (getSelect[i].AUDIT_STATUS != "扎口处退回" && getSelect[i].AUDIT_STATUS != "待业务处室审核" &&getSelect[i].AUDIT_STATUS != "业务处室已审") {
                        this.$Message.warning('编号' + getSelect[i].AUDIT_NO + '的申请表状态为' + getSelect[i].AUDIT_STATUS + '\n请重新选择')
                        return false;
                    }
                }
                var selectFlag = true;
                getSelect.forEach(item => {

                    console.log(item.AUDIT_NO)
                    let obj = {
                        auditNo: item.AUDIT_NO,
                        auditDep: this.$store.state.info.departName,
                        auditDepCode: this.$store.state.info.departCode,
                        auditAuditer: this.$store.state.info.fullName,
                        auditUserId: this.$store.state.info.userId
                    }

                    this.$axios.auditCheck(obj).then(res => {
                        console.log(res);
                        if (res.data.ret == 1) {
                            // console.log(123)
                            this.reload();
                        } else {
                            this.$Message.error('编号' + item.AUDIT_NO + res.data.retMsg);
                            selectFlag = false;
                            this.reload();
                        }
                    })

                })
                if (selectFlag == true) {
                    this.$Message.success('审批成功');
                    this.reload();

                }
            },
            //时间过滤
            timeChange(val, formatString) {
                formatString = formatString || "YYYY-MM-DD";
                if (val == null) {
                    return ''
                } else {
                    return moment(val).format(formatString);
                }
            },
            //点击跳转到申请表
            zsDouble(data, index) {
                console.log(data, index);
                console.log(this.mainData[index]);
                this.$store.commit('saveZsAuditNo', data.AUDIT_NO);
                // console.log(this.$store.state.forexSqNo,222)
                this.$router.push({path: '/funding/application'});
            },
            // 1，0转换是否
            numChange(num) {
                if (num == 0) {
                    return '否';
                } else if (num == 1) {
                    return '是'
                }
            },
            // auditStatus 状态改变
            statusChange(val) {
                if (val == 1) {
                    return "新增待确认";
                } else if (val == 2) {
                    return "已确认";
                } else if (val == 3) {
                    return "已保存";
                } else if (val == 4) {
                    return "待业务处室审核";
                } else if (val == 5) {
                    return "业务处室已审";
                } else if (val == 6) {
                    return "业务处退回";
                } else if (val == 7) {
                    return "扎口处已审";
                }
                else if (val == 8) {
                    return "扎口处退回";
                } else if (val == 99) {
                    return "已删除";
                } else {
                    return val;
                }
            },
            //查询
            find() {
                //如果不处理  groupMission 就会是空值
                if(!this.findData.groupMission){
                    this.findData.groupMission=''
                }

                this.findData.row = this.sele;
                this.findData.page = this.pages;
                this.findData.userAuditType = this.$store.state.info.userAuditType;
                // this.findData.auditStatusArray = this.auditMulStatus.join(',');
                this.getListDetailed(this.findData);
            },
            //查询 重置
            findNew() {
                this.findData={
                    auditCompany: '',
                    auditPjh1: '',
                    groupMission: '',
                    groupIsyearplan: '',
                    groupIsbar: '',
                    groupUnit: '',
                    auditType: 3,
                    auditStatusArray:48,
                    userAuditType:'',
                    row: '',
                    jfly: '',
                    page: ''
                }
                this.auditMulStatus=[]
                this.find()
               // this.reload()
            },

            getListDetailed(data) {

                this.$axios.getListDetailed(data).then(res => {
                    console.log(res, 'resss');
                    if (res.data.ret === 1) {
                        let len = res.data.data.list.length;
                        console.log(res.data.data.recordTotal, '44556');
                        res.data.data.list.forEach((val, index) => {
                            val.reportId = index + 1;
                        });
                        this.mainData = res.data.data.list;
                        let sum = 0;
                        let CBZZS_MONEY_SUM = 0;
                        let FOOD_FEE_SUM = 0;
                        let GJLFYS_SUM = 0;
                        let LP_MONEY_SUM = 0;
                        let OTHER_FEE_SUM = 0;
                        let QZBXFY_SUM = 0;
                        let STAY_FEE_SUM = 0;
                        let TRAIN_FEE_SUM = 0;
                        let YQ_MONEY_SUM = 0;
                        let CSNJTFY_SUM = 0;
                        let QT_SUM = 0;
                        let GROUP_TRIPDAYS_SUM = 0;
                        let GROUP_CAPACITY_SUM =0;
                        let ZBJE_SUM = 0;

                        this.mainData.forEach(item => {
                            sum += Number(item.AUDIT_FEE_SUM);
                            CBZZS_MONEY_SUM += Number(item.CBZZS_MONEY);
                            FOOD_FEE_SUM += Number(item.FOOD_FEE);
                            GJLFYS_SUM += Number(item.GJLFYS);
                            LP_MONEY_SUM += Number(item.LP_MONEY);
                            OTHER_FEE_SUM += Number(item.OTHER_FEE);
                            QZBXFY_SUM += Number(item.QZBXFY);
                            STAY_FEE_SUM += Number(item.STAY_FEE);
                            TRAIN_FEE_SUM += Number(item.TRAIN_FEE);
                            YQ_MONEY_SUM += Number(item.YQ_MONEY);
                            CSNJTFY_SUM += Number(item.CSNJTFY);
                            QT_SUM += Number(item.QT);
                            GROUP_CAPACITY_SUM += Number(item.GROUP_CAPACITY);
                            GROUP_TRIPDAYS_SUM += Number(item.GROUP_TRIPDAYS);
                            ZBJE_SUM += Number(item.ZBJE);
                            item.GROUP_ISBAR = this.numChange(item.GROUP_ISBAR);
                            item.GROUP_ISYEARPLAN = this.numChange(item.GROUP_ISYEARPLAN);
                            item.GROUP_DEPART_DATE = this.timeChange(item.GROUP_DEPART_DATE);
                            item.AUDIT_DATE = this.timeChange(item.AUDIT_DATE);
                            item.GROUP_PJ_DATE = this.timeChange(item.GROUP_PJ_DATE);
                            item.AUDIT_STATUS = this.statusChange(item.AUDIT_STATUS);
                            item.cellClassName = {
                                AUDIT_FEE_SUM: 'auditNumStyle',
                                CSNJTFY: 'auditNumStyle',
                                STAY_FEE: 'auditNumStyle',
                                gjlfys: 'auditNumStyle',
                                qzbxfy: 'auditNumStyle',
                                YQ_MONEY: 'auditNumStyle',
                                cbzzs_money: 'auditNumStyle',
                                TRAIN_FEE: 'auditNumStyle',
                                OTHER_FEE: 'auditNumStyle',
                                FOOD_FEE: 'auditNumStyle',
                                lp_money: 'auditNumStyle',
                            }

                        })
                        let dataAdd = {
                            reportId: '总计',
                            _disabled: true,
                            AUDIT_FEE_SUM: sum,
                            CBZZS_MONEY: CBZZS_MONEY_SUM,
                            FOOD_FEE: FOOD_FEE_SUM,
                            GJLFYS: GJLFYS_SUM,
                            LP_MONEY: LP_MONEY_SUM,
                            OTHER_FEE: OTHER_FEE_SUM,
                            QZBXFY: QZBXFY_SUM,
                            STAY_FEE: STAY_FEE_SUM,
                            TRAIN_FEE: TRAIN_FEE_SUM,
                            YQ_MONEY: YQ_MONEY_SUM,
                            CSNJTFY: CSNJTFY_SUM,
                            QT:QT_SUM,
                            ZBJE:ZBJE_SUM,
                            GROUP_CAPACITY:GROUP_CAPACITY_SUM,
                            GROUP_TRIPDAYS:GROUP_TRIPDAYS_SUM,
                            cellClassName: {AUDIT_FEE_SUM: 'auditNumStyle'}
                        }
                        this.dataAdd = dataAdd;

                        console.log(dataAdd, 'addddd');
                        this.pageNum = res.data.data.recordTotal;
                        this.pageTotal = res.data.data.pageTotal;
                        // console.log(this.auditlist);
                    }
                });
            },
            footLeft(val) {

                console.log(val)
                this.sele = val;
            },
            ckChang(val, index) {
                this.titleData.forEach((item, index) => {
                    if (item.title == val) {
                        item.ifc = !item.ifc;
                    }
                });
            },
            checkA() {
                this.titleData.forEach((item, index) => {
                    item.ifc = true;
                });
                let id = this.$store.state.info.userId;
                if (localStorage.getItem(id + 'zslistPt') != undefined) {
                    localStorage.removeItem(id + 'zslistPt')
                }
                this.reload();
                this.checkList = this.checkData;
            },

        },
        created() {
            this.Mission = this.$store.state.Mission;
            this.findData.row = this.sele;
            this.findData.page = this.pages;
            this.findData.userAuditType = this.$store.state.info.userAuditType;
            this.getListDetailed(this.findData);
        },
        computed: {
            tabWidth() {
                let width = 0;
                this.titleData.forEach(item => {
                    width += item.width;
                });
                return width;
            }
        },
        mounted: function () {
            this.titleData.forEach((item, index) => {
                if (item.ifc) {
                    this.checkList.push(item.title);
                }
                this.checkData.push(item.title);
            });
            let id = this.$store.state.info.userId;
            if (JSON.parse(localStorage.getItem(id + 'zslistPt')) != undefined) {
                this.titleData = JSON.parse(localStorage.getItem(id + 'zslistPt'));

                for (var i = 0; i < this.titleData.length; i++) {

                    if (this.titleData[i].children) {
                        this.titleChildIndex = i;
                        console.log(i, 'index');
                        return false;
                    } else {
                        this.titleChildIndex = -1;
                    }
                }
            }

        },
        data() {
            return {
                titleChildIndex: 20,//titleData的复杂表格项
                editorShow: false,//显示蒙层
                spSelectList: [],// 接受子组件的选中值
                auditSuggestion: '',
                auditRemark: '',
                // 查询字段
                findData: {
                    auditCompany: '',
                    auditPjh1: '',
                    groupMission: '',
                    groupIsyearplan: '',
                    groupIsbar: '',
                    groupUnit: '',
                    auditType: 3,
                    auditStatusArray:48,
                    userAuditType:'',
                    row: '',
                    jfly: '',
                    page: ''
                },
                auditMulStatus:[],
                //单据状态列表
                auditStatusList:[
                    {
                        name: "待业务处室审核",
                        value: "4"
                    },
                    {
                        name: "业务处室已审",
                        value: "5"
                    },
                    {
                        name: "业务处退回",
                        value: "6"
                    },
                    {
                        name: "扎口处退回",
                        value: "8"
                    },

                ],
                //任务性质
                Mission: [],
                //总页数
                pageTotal: "",
                //总条数
                recordTotal: "",

                ifGo: false,
                pages: "1",//页码
                pageNum: '',//总条数
                auditlist: [],
                sele: 500,
                checkData: [],
                checkList: [],
                depart: "",
                curr: "",
                // 单位编号
                unitId: "",
                // 填报人
                applicate: "",
                // 填报部门
                department: "",
                seleList: [
                    {value: 10, label: 10},
                    {value: 20, label: 20},
                    {value: 30, label: 30}
                ],
                titleData: [
                    {
                        title: "序号",
                        name: "reportId",
                        width: 194,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "编号",
                        name: "AUDIT_NO",
                        width: 190,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "状态",
                        name: "AUDIT_STATUS",
                        width: 194,
                        color: "#fff",
                        ifc: true,
                        select: false,
                    },
                    {
                        title: "预算单位代码",
                        name: "AUDIT_DEP_CODE",
                        width: 234,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "预算单位名称",
                        name: "AUDIT_COMPANY",
                        width: 294,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: '合计',
                        name: "AUDIT_FEE_SUM",
                        width: 174,
                        color: "#fff",
                        select: false,
                        align:'right',
                        ifc: true
                    },
                    {
                        title: "出国（境）任务批件文号",
                        name: "AUDIT_PJH1",
                        width: 314,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "批件下达日期",
                        name: "GROUP_PJ_DATE",
                        width: 292,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "团组出访日期",
                        name: "GROUP_DEPART_DATE",
                        width: 292,
                        color: "#fff",
                        ifc: true,
                        select:false,
                    },
                    {
                        title: "填表日期",
                        name: "AUDIT_DATE",
                        width: 292,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },

                    {
                        title: "团组名称",
                        name: "GROUP_NAME",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "任务性质",
                        name: "GROUP_MISSION",
                        width: 252,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "业务处室",
                        name: "AUDIT_YWCS_NAME",
                        width: 222,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "专管员",
                        name: "AUDIT_ZGY_NAME",
                        width: 222,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "是否列入年初出国（境）计划",
                        name: "GROUP_ISYEARPLAN",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "是否出访“一带一路”沿线国家（地区）",
                        name: "GROUP_ISBAR",
                        width: 352,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "组团单位",
                        name: "GROUP_UNIT_JOIN",
                        width: 282,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "出访国家（地区）城市",
                        name: "DQ",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "出访天数（天）",
                        name: "GROUP_TRIPDAYS",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "本单位负担经费人数",
                        name: "GROUP_CAPACITY",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "因公出国（境）经费情况（根据正式经费申请表生成）",
                        name: "ygcgj",
                        width: 2400,
                        color: "#fff",
                        ifc: true,
                        children: [
                            {
                                title: "合计",
                                name: "AUDIT_FEE_SUM",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "国际旅费",
                                name: "GJLFYS",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "住宿费",
                                name: "STAY_FEE",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "伙食费",
                                name: "FOOD_FEE",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "公杂费",
                                name: "OTHER_FEE",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "培训费",
                                name: "TRAIN_FEE",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "签证、保险及防疫费用",
                                name: "QZBXFY",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "境外城市间交通费用",
                                name: "CSNJTFY",
                                width: 200,
                                color: "#fff",

                                ifc: true
                            },
                            {
                                title: "其他特殊事项费用",
                                name: "eee",
                                width: 200,
                                color: "#fff",

                                ifc: true,
                                children: [
                                    {
                                        title: "宴请",
                                        name: "YQ_MONEY",
                                        width: 200,
                                        color: "#fff",

                                        ifc: true
                                    },
                                    {
                                        title: "礼品",
                                        name: "LP_MONEY",
                                        width: 200,
                                        color: "#fff",

                                        ifc: true
                                    },
                                    {
                                        title: "超标准住宿",
                                        name: "CBZZS_MONEY",
                                        width: 200,
                                        color: "#fff",

                                        ifc: true
                                    },
                                    {
                                        title: "其他",
                                        name: "QT",
                                        width: 200,
                                        color: "#fff",

                                        ifc: true
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        title: "支付系统项目代码",
                        name: "AUDIT_XMDM",
                        width: 302,
                        color: "#fff",
                        index: 4,
                        ifc: true,
                        select: false
                    },
                    {
                        title: "下达指标金额",
                        name: "ZBJE",
                        width: 302,
                        color: "#fff",
                        align:'right',
                        ifc: true,
                        select:false
                    },
                    {
                        title: "用款计划申报情况",
                        name: "JHJE",
                        width: 302,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "实际支付情况",
                        name: "ZFJE",
                        width: 302,
                        color: "#fff",
                        index: 4,
                        ifc: true,
                        select: false
                    },


                ],
                mainData: [],
                dataAdd: [],//总计
            };
        }
    };
</script>
<style>
    .auditNumStyle {
        text-align: right !important;
    }

    .editor-top {
        height: 50px;
        background: #449be1;
    }

    .editor-top span,
    .back {
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin-left: 20px;
        font-size: 20px;
        color: #fff;
    }

    .editor-top .back {
        float: right;
        margin-right: 10px;
        cursor: pointer;
    }

    .editor-main {
        width: 368px;
        height: 150px;
        z-index: 10;
        background: #fff;
    }

    .editorHeader {
        width: 100%;
        height: 20px;
        background: #67bef3;
        line-height: 20px;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 18px;
        color: #fff;
    }

    /*.ivu-modal-close {*/
    /*    top: 20px !important;*/
    /*}*/
    .editor-main .spBox {
        margin: 0 auto;
        width: 250px;
        height: 30px;
        margin-top: 60px;
    }

    .editor-main .smBox {
        margin: 0 auto;
        width: 250px;
        height: 30px;
        margin-top: 10px;
    }

    .spBox span,
    .smBox span {
        float: left;
        width: 60px;
        line-height: 25px;
    }

    .spBox input,
    .smBox input {
        float: left;
        height: 25px;
        width: 180px;
    }

    .editor-bottom {
        width: 300px;
        margin: 0 auto;
        height: 20px;
    }

    .editor-bottom .btn1,
    .editor-bottom .btn2 {
        float: right;
        margin-right: 10px;
        color: #fff;
        margin-left: 12px;
        cursor: pointer;
        background: #169aef;
        border: none;
        width: 35px;
        height: 25px;
        border-radius: 5px;
    }

    .editor-bottom .btn2 {
        margin-left: 0;
        margin-right: 0;
    }
</style>

<style lang="less" scoped>
    #index {
        overflow: auto;
        clear: both;

        .table {
            height: 615px;
            border: 1px solid #e8eaec;
            // position: relative;
            overflow: auto;
        }

        #headTable {
            margin: 0 auto;
            width: 3000px;
            // width: 100%;
            color: #3c3c3c;
            font-size: 14px;
            text-align: center;
            border-collapse: collapse;
            border: 1px solid #e8eaec;

            td {
                padding: 8px 0;
                border: 1px solid #e8eaec;
                border-bottom: none;
                // border-right: none;
                position: relative;

                span {
                    margin-right: 12px;
                    cursor: all-scroll;

                    &:hover {
                        color: #2780d0;
                    }
                }

                .kuang {
                    height: 15px;
                    width: 15px;
                    border: 1px solid #dcdee2;
                    border-radius: 3px;
                }

                .cut {
                    height: 33px;
                    width: 6px;
                    right: -2px;
                    top: 0;
                    cursor: col-resize;
                    position: absolute;
                    opacity: 0;
                    background-color: #f8f8f9;
                }

                &.table-title {
                    background: #c2e8ff;
                    padding: 8px 16px;
                    text-align: center;
                    border: 1px solid #e8eaec;

                    &.super {
                        color: #000;
                        background-color: #f8f8f9;
                    }
                }

                &.left-red {
                    border-left: 4px solid red;
                }

                &.right-red {
                    border-right: 4px solid red;
                }
            }
        }
    }

    #headTable {
        position: relative;
    }

    .no-select-text {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    #info {
        text-align: center;
        background: #94d5fb;
        border: 1px solid #4b98de;
        width: 80px;
        height: 30px;
        line-height: 30px;
        opacity: 0.9;
        position: absolute;
    }

    .tableFoot {
        margin: 0 auto;
        height: 40px;
        line-height: 35px;
        padding: 0 0 0 20px;
        border-top: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        background: #f9f9f9;
    }

    .tableFootLeft {
        float: left;
    }

    .division {
        display: inline-block;
        height: 30px;
        border: 1px solid #e7e7e7;
        vertical-align: middle;
        margin-left: 10px;
    }

    /* 上一页 */
    .nextPage img,
    .prevPage img,
    .refresh img {
        vertical-align: middle;
        margin: 0 10px 0 15px;
        cursor: pointer;
    }

    .pagesKuang {
        margin-left: 10px;
    }

    /* 底部右边内容 */
    .tableFootRight {
        float: right;
    }

    .tableFootRight span:first-child {
        font-size: 13px;
        font-weight: 600;
        margin-right: 20px;
    }

    .tableFootRight span:last-child {
        margin-right: 20px;
        font-size: 13px;
        font-weight: 600;
    }

    //   =======================================
    #foreignQuery {
        #funding-a {
            clear: both;
            width: 100%;
            margin: auto;
            overflow: hidden;

            .ivu-row {
                margin: 20px auto;
            }

            .funding-table {
                width: 100%;
                float: left;
                padding: 8px 6px;
                background: #fff;
                border: 1px solid #4b98de;
                // margin: 80px 0 20px 300px;
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

                        td:hover {
                            background: #ebf7ff;
                        }

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
