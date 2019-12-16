<template>
    <div id="funding-application">
        <div class="funding-buttom" style="position:fixed;top:115px;right:20px;">
            <div v-show="false">{{moneyTrueObj.auditJwfdeSum}}</div>
            <span @click="update"
                  v-if="this.$store.state.zsBlAuditNo && updateFlag && (auditStatus == 3 ||auditStatus == 6) && $store.state.info.userAuditType == 0">
                <i class="iconxiugai"></i>修改
            </span>
            <span @click="dayin"
                  v-if="this.updateFlag "
                  class="print"
                  ref="dayin">

                打印
            </span>

            <span @click="save"
                  v-if="!this.$store.state.zsBlAuditNo">
                <i class="iconbaocun"></i>保存
            </span>

            <span @click="showEditor"
                  v-if=" (auditStatus == 4 &&$store.state.info.userAuditType == 1)||(auditStatus == 5 &&$store.state.info.userAuditType == 2)&& updateFlag && this.$store.state.zsAuditNo ">
                <i class="icontuihui"></i>退回
            </span>
            <span @click="save2"
                  v-if="this.$store.state.zsBlAuditNo && !updateFlag">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="delAudit"
                  v-if="(auditStatus == 3 || auditStatus == 6 )&& this.$store.state.zsBlAuditNo && updateFlag && $store.state.info.userAuditType == 0">
               <Icon type="ios-close-circle-outline" style="font-size:18px;"/>删除
            </span>

            <span @click="auditNext"
                  v-if="(((auditStatus == 3 ||auditStatus == 6 ) && $store.state.info.userAuditType == 0) ||
                  ((auditStatus == 4 ||auditStatus == 8 )&&$store.state.info.userAuditType == 1)||
                   ((auditStatus == 5 )&& $store.state.info.userAuditType == 2))
                  && this.$store.state.zsBlAuditNo && updateFlag">
                <i class="iconshenpi"></i>送审
            </span>
        </div>
        <Spin fix
              v-if="loading">
            <Icon type="ios-loading"
                  size="18"
                  class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <div id="funding-a" style="margin-top:50px;">
            <span class="title">因公出国&nbsp;&nbsp;(境)&nbsp;&nbsp;&nbsp;&nbsp;(本市一般公共财政预算资金)&nbsp;&nbsp;经费申请表(补录)</span>
            <div class="cut"></div>
            <!-- 左上角下拉框 -->
            <div >
                <!-- <div class="funding-input">
                    预报表编号:
                    <select v-model="auditYbNo"
                            :disabled="updateFlag">
                        <option value></option>
                        <option v-for="(item,index) in formal"
                                :value="item.value">{{item.name}}</option>
                    </select>
                </div> -->
                <div class="funding-input"
                     style="marginLeft:25px;line-height:22px;float:left;">
                    经费申请单位：
                    <input style="width:250px;"
                           v-model="departName"
                           type="text"
                           readonly>
                </div>


                <div class="funding-input"
                     style="marginLeft:85px;width:400px;line-height:22px;float:right">正式表编号:{{auditNo}}
                </div>
            </div>
            <div class="funding-table">
                <table style="word-wrap:break-word;word-break:break-all">
                    <tr>
                        <td colspan="6"
                            class="table-start"
                            style="fontWeight:600">（一）因公出国（境）任务情况
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title"
                            style="width:210px">参团单位
                        </td>
                        <td style="width:270px">
                            <input type="text"
                                   v-model="groupUnit"
                                   :readonly="updateFlag"
                                   >
                        </td>
                        <td style="width:150px;"
                            class="table-title">参团单位性质
                        </td>
                        <td style="width:150px">
                            <select style="width:150px"
                                    v-model="groupUnitType"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in UnitType"
                                        :value="item.value">{{item.value}}
                                </option>
                            </select>
                        </td>
                        <td class="table-title">是否列入年初出国（境）计划</td>
                        <td>
                            <select v-model="groupIsyearplan"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in Istrain"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title" rowspan="2"
                            style="width:210px;padding:0;text-align:center;">因公出国(境)任务批件号码：
                        </td>
                        <td style="padding:0" rowspan="2">
                            <select v-model="auditPjh1"
                                    :disabled="updateFlag"
                                    style="width:120px;text-align-last:left;float:left">
                                <option v-for="(item,index) in taskbatch"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                            <select v-model="auditPjhYear"
                                    :disabled="updateFlag"
                                    style="width:80px;text-align-last:left;float:left">
                                <option v-for="(item,index) in pjYears"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                            <input v-model="auditPjh2"
                                   :readonly="updateFlag"
                                   style="borderBottom:1px solid;paddingLeft:5px;width:50px;float:left">号
                        </td>
                        <td class="table-title" rowspan="2"
                            style="width:150px;">批件下达日期
                        </td>
                        <td style="width:150px" rowspan="2">
                            <DatePicker type="date"
                                        placeholder="选择出访日期"
                                        @on-change="handleChange2"
                                        :value="groupPjDate"
                                        :disabled="updateFlag"
                                        size="small"></DatePicker>
                        </td>

                        <td class="table-title">批件文件</td>
                        <td style="height:35px;padding:0">
                            <div v-if="pjFile.filePath!=''">
                                {{pjFile.fileName}}
                                <Icon type="md-close"
                                      @click="delFile(0,0,'pjFile')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(pjFile.filePath,pjFile.fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    :show-upload-list="false"
                                    :data="{type:'pjFile'}"
                                    v-if="!updateFlag&&pjFile.filePath == ''">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">行程单文件</td>
                        <td style="height:35px;padding:0">
                            <div v-if="xcFile.filePath!=''">
                                {{xcFile.fileName}}
                                <Icon type="md-close"
                                      @click="delFile(0,0,'xcFile')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(xcFile.filePath,xcFile.fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    :show-upload-list="false"
                                    :data="{type:'xcFile'}"
                                    v-if="!updateFlag&&xcFile.filePath == ''">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title"
                            style="width:210px">团组名称
                        </td>
                        <td style="width:180px">
                            <input type="text"
                                   v-model="groupName"
                                   :readonly="updateFlag">
                        </td>
                        <td class="table-title"
                            style="width:150px">是否为一带一路
                        </td>
                        <td style="width:150px">
                            <select v-model="groupIsbar"
                                    style="width:100%;"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in Istrain"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td class="table-title">本单位参团人数</td>
                        <td>
                            <input type="number"
                                   v-model="groupCapacity"
                                   :readonly="updateFlag"
                                   @keydown="groupnum"
                                   onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                   oninput="if(value.length>3)value=value.slice(0,3)">
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title"
                            style="width:210px">出访任务
                        </td>
                        <td style="width:180px">
                            <select v-model="groupMission"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in Mission"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td class="table-title"
                            style="width:150px">是否为培训团组
                        </td>
                        <td style="width:150px">
                            <select v-model="groupIstrain"
                                    style="width:100%;"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in Istrain"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>
                        <td class="table-title">出访天数</td>
                        <td>
                            <input type="number"
                                   v-model="groupTripdays"
                                   :readonly="updateFlag"
                                   onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                   oninput="if(value.length>3)value=value.slice(0,3)">
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">组团单位</td>
                        <td>
                            <input type="text" v-model="ztGroupUnit"
                                   :readonly="updateFlag"></input>
                        </td>
                        <td class="table-title">组团单位级别</td>
                        <td>
                            <select v-model="ztGroupUnitType"
                                    style="width:100%;"
                                    :disabled="updateFlag">
                                <option v-for="(item,index) in ztdwList"
                                        :value="item.value">{{item.name}}
                                </option>
                            </select>
                        </td>

                        <td class="table-title">预计出访日期</td>
                        <td>
                            <DatePicker type="date"
                                        placeholder="选择出访日期"
                                        style="width: 200px"
                                        @on-change="handleChange"
                                        :value="groupDepartDate"
                                        :disabled="updateFlag"
                                        size="small"></DatePicker>

                        </td>

                    </tr>
                    <tr>
                        <td class="table-title">任务目的地国家（地区）</td>
                        <td colspan="5">
                            <input type="text" :readonly="updateFlag" v-model="groupDestination">
                        </td>
                    </tr>
                </table>
            </div>
            <!--团员信息-->
            <div class="funding-table">
                <table style="word-wrap:break-word;word-break:break-all">
                    <tr>
                        <td class="table-start"
                            colspan="7">团员详细信息
                        </td>
                    </tr>
                    <tr>

                        <td class=""
                            colspan="7">
                            <div style="width:300px;height:30px;">
                                <button class="add-user"
                                        v-if="!this.updateFlag"
                                        @click="addUser">添加团员
                                </button>

                                <button class="add-user"
                                        style="position: relative;"
                                        v-if="!this.updateFlag"

                                >导入
                                    <input type="file" ref="dataFile" @change="sendFile"
                                           style="opacity: 0;width:100%;position:absolute;left:0;top:0;"></input>
                                </button>


                                <button class="add-user"
                                        v-if="!this.updateFlag"
                                        @click="excelDown">导出
                                </button>
                                <button class="add-user"
                                        v-if="!this.updateFlag"
                                        @click="downloadFile('/templates/团员信息-模板.xlsx','团员信息-模板.xlsx')">模板下载
                                </button>
                            </div>
                        </td>

                    </tr>


                    <tr>
                        <td class="table-title" style="width:50px;"
                        >
                            <div style="width: 100px;">序号</div>
                        </td>
                        <td class="table-title"
                            style="width:200px;">姓名
                        </td>

                        <td class="table-title" style="width: 300px;">单位</td>
                        <td class="table-title"
                            style="width:250px;">职务
                        </td>

                        <td class="table-title" v-if="!updateFlag">操作</td>
                    </tr>
                    <tr v-for="(item,index) of userData">
                        <td style="width:50px;">
                            <input type="text"
                                   :value="(Number(index)+1)"
                                   style="textAlign:center;width:100%;"
                                   readonly>
                        </td>
                        <td style="width:120px;">
                            <input type="text"
                                   style="width:100%;"
                                   v-model="userData[index].mebName"
                                   :readonly="updateFlag">
                        </td>

                        <td>
                            <input type="text"
                                   v-model="userData[index].mebDep"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   v-model="userData[index].mebJob"
                                   :readonly="updateFlag">
                        </td>

                        <td v-if="!updateFlag">
                            <span class="del-user"
                                  @click="delUser(index)">删除</span>
                        </td>
                    </tr>
                </table>
            </div>
            <!--            （二）因公出国（境）经费预算构成情况-->
            <div class="funding-table">
                <table>
                    <tr>
                        <td class="table-start"
                            colspan="12"
                            style="fontWeight:600">（二）因公出国（境）经费预算构成情况
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7"
                            class="table-title super"
                            style="width:38%">经费项目
                        </td>
                        <td class="table-title super"
                            style="width:13%">金额（元）
                        </td>
                        <td colspan="2"
                            class="table-title super"
                            style="width:28%">测算情况及相关说明
                        </td>
                        <td class="table-title super"
                            colspan="2">附件上传
                        </td>
                    </tr>

                    <tr v-show="false">{{auditFeeSum}}</tr>

                    <!-- 经费项目  auditSub 子表 -->
                    <tr v-for="(item,index) of auditSub">
                        <td colspan="7"
                            ref="jfxmmc">
                            <font class="add"
                                  v-if="index!=0 &&index!=1 && index!=2 && index!=3&& index!=4&& index!=5&& index!=6 &&!updateFlag"
                                  @click="delJfxm(index)">
                                <Icon type="md-remove-circle"/>
                            </font>
                            <input ref="jfxmip"
                                   type="text"
                                   v-model="item.projectName"
                                   style="textAlign:center;width:60%"
                                   :readonly="index < 7"
                                   :class="{'table-start':index==0 || index==1 || index==4}">
                        </td>
                        <td ref="jfxmjetd">
                            <input type="number"
                                   v-model="auditSub[index].money"
                                   ref="jfxmje"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   oninput="if(value.length>9)value=value.slice(0,9)"
                                   :readonly="updateFlag || index==0 || index==1 || index==4">
                        </td>
                        <td colspan="2">
                            <input type="text"
                                   v-model="auditSub[index].remark"
                                   :readonly="updateFlag">
                        </td>
                        <td colspan="2">
                            <div v-for="(fileName,fileIndex) in item.fileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile(index,fileIndex,'auditSub')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(item.filePath[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:index,type:'auditSub'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <!--新增行-->
                    <tr v-if="!updateFlag">
                        <td colspan="7">
                            <font class="add"
                                  @click="addRow(auditSub)">
                                <Icon type="md-add-circle"/>
                            </font>
                            <font class="describe">
                                <input style="text-align:center;width:60%"
                                       placeholder="（其他经费（需要分项详细申报说明））"
                                       readonly>
                            </font>
                        </td>
                        <td>
                            <input type="number"
                                   readonly
                                   placeholder="金额">
                        </td>
                        <td colspan="2">
                            <input type="text"
                                   placeholder="需填报特殊支出事项申请表并上传附件"
                                   readonly
                                   style="textAlign:center">
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr>
                        <td colspan="7"
                            class="table-title">3、境外经费预算（以下表中外汇金额和填表日汇率测算）：
                        </td>
                        <td class="number">
                            <input v-model="jwjf"
                                   type="number"
                                   readonly
                                   style="background:#e9e4e4">
                        </td>
                        <td colspan="2">
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td colspan="2">
                            <!--                            <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="onSuccess">-->
                            <!--                                <div class="upload">-->
                            <!--                                    <i class="iconshangchuan"></i>-->
                            <!--                                </div>-->
                            <!--                            </Upload>-->
                        </td>
                    </tr>

                    <!-- 3、境外经费预算  auditJwde 子表 -->
                    <tr>
                        <td class="table-title">新增</td>
                        <td class="table-title">洲</td>
                        <td class="table-title">国家(地区)</td>
                        <td class="table-title">城市</td>
                        <td class="table-title">行程天数</td>
                        <td class="table-title">实际住宿天数</td>
                        <td class="table-title">币种</td>
                        <td class="table-title">住宿费（根据实际住宿天数计算）</td>
                        <td class="table-title">伙食费</td>
                        <td class="table-title">公杂费</td>
                        <td class="table-title" ><div style="width:90px;"> 培训费<br/>（培训团组）</div></td>
                        <td class="table-title" style="padding:0 8px"> 合计<br/>（外币金额）</td>
                    </tr>

                    <!--                    <jwde v-for="(row,index) in auditJwde" :showdata="row" :rowindex="index" ref="jwde" @resultData="getChild"></jwde>-->

                    <tr v-for="(row,index) in auditJwde">
                        <td>
                            <font class="add"
                                  @click="delRow(auditJwde,index)"
                                  v-if="!updateFlag">
                                <Icon type="md-remove-circle"/>
                            </font>
                        </td>
                        <td style="width:130px">
                            <!-- 洲 -->
                            <select name="continent"
                                    v-model="row.continent"
                                    :disabled="updateFlag">
                                <option v-for="ctt in continents"
                                        v-bind:value="ctt.id">{{ctt.regionName}}
                                </option>
                            </select>
                        </td>
                        <td style="width:130px">
                            <!-- 国家 -->
                            <select name="continent"
                                    v-model="row.country"
                                    :disabled="updateFlag">
                                <option v-for="cty in countrys[row.continent]"
                                        v-bind:value="cty.id">{{cty.regionName}}
                                </option>
                            </select>

                        </td>
                        <td style="width:130px">
                            <!-- 城市 -->
                            <select name="continent"
                                    v-model="row.city"
                                    :disabled="updateFlag">
                                <option v-for="cit in citys[row.country]"
                                        v-bind:value="cit.id">{{cit.regionName}}
                                </option>
                            </select>

                        </td>
                        <td>
                            <!-- 行程天数 -->
                            <input v-model="row.tripDays"
                                   :readonly="updateFlag"
                                   onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                   type="number">
                        </td>
                        <td>
                            <!-- 实际住宿天数 -->
                            <input v-model="row.stayDays"
                                   :readonly="updateFlag"
                                   onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
                                   type="number">
                        </td>
                        <td class="number"
                            :title="row.exchangeRate">
                            <!-- 币种 -->
                            {{row.currency |money}}
                        </td>
                        <td class="">
                            <!-- 住宿费（根据实际住宿天数计算） -->
                            <input v-model="row.stayFee" :readonly="updateFlag"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   type="number">
                        </td>
                        <td class="">
                            <!-- 伙食费 -->
                            <input v-model="row.foodFee" :readonly="updateFlag"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   type="number">
                        </td>
                        <td class="">
                            <!-- 公杂费 -->
                            <input v-model="row.otherFee" :readonly="updateFlag"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   type="number">
                        </td>
                        <td :style="{'background':(groupIstrain?'#fff':'#e9e4e4')}">
                            <!-- 培训费（培训团组） -->
                            <input v-model="row.trainFee"
                                   type="number"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   :readonly="updateFlag||!groupIstrain"
                                   :style="{'background':(groupIstrain?'#fff':'#e9e4e4')}">
                        </td>
                        <td class="number">
                            <!-- 合计（外币金额） -->
                            <input v-model="row.sumFee"
                                   type="number"
                                   readonly
                                   style="background:#e9e4e4">
                        </td>
                    </tr>

                    <!--                    新增行-->
                    <tr v-if="!updateFlag">
                        <td>
                            <Icon type="md-add-circle"
                                  class="add"
                                  @click="addRow(auditJwde)"/>
                        </td>
                        <td style="width:130px">
                            <!-- 洲 -->
                        </td>
                        <td style="width:130px">
                            <!-- 国家 -->
                        </td>
                        <td style="width:130px">
                            <!-- 城市 -->
                        </td>
                        <td>
                            <!-- 行程天数 -->
                        </td>
                        <td>
                            <!-- 实际住宿天数 -->
                        </td>
                        <td class="number">
                            <!-- 币种 -->
                        </td>
                        <td class="">
                            <!-- 住宿费（根据实际住宿天数计算） -->
                        </td>
                        <td class="">
                            <!-- 伙食费 -->
                        </td>
                        <td class="">
                            <!-- 公杂费 -->
                        </td>
                        <td>
                            <!-- 培训费（培训团组） -->
                        </td>
                        <td class="number">
                            <!-- 合计（外币金额） -->
                        </td>
                    </tr>

                    <tr>
                        <td colspan="10"
                            class="table-title">境外定额标准支出项目合计（元）
                        </td>
                        <td class=""
                            colspan="2">
                            <input v-model="jwdeSum"
                                   type="number"
                                   :readonly="updateFlag"
                                   placeholder="手工录入"
                                   >
                        </td>
                    </tr>

                    <tr>
                        <td colspan="8"
                            class="table-title"
                            style="width:40%">其他事项预算（需要分项目申报审批）
                        </td>
                        <td colspan="3"
                            class="table-title"
                            style="width:30%">测算情况及相关说明
                        </td>
                        <td class="table-title"
                            colspan="2">金额
                        </td>
                    </tr>

                    <!--  境外非定额   auditJwfde 子表-->
                    <tr v-for="(item,index) in auditJwfde">

                        <td colspan="8">
                            <input type="text"
                                   v-model="item.projectName"
                                   style="textAlign:center;width:60%"
                                   :readonly="index<3">
                        </td>
                        <td colspan="3">
                            <input type="text"
                                   v-model="auditJwfde[index].remark"
                                   :readonly="updateFlag">
                        </td>
                        <td colspan="2">
                            <input type="number"
                                   v-model="auditJwfde[index].money"
                                   :readonly="updateFlag"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   oninput="if(value.length>9)value=value.slice(0,9)">
                        </td>
                    </tr>
                    <tr>
                        <td :rowspan="3+specialSub.length" style="width:5%;">
                            <div style="width:50%;margin-left:25%;">特殊支出事项</div>
                            <div style="font-size:12px;">(元)</div>
                        </td>
                        <td colspan="7">
                            宴请费用

                        </td>
                        <td colspan="3">
                            (见特殊支出事项申请表)
                        </td>
                        <td colspan="2"
                            style="background:#e9e4e4">
                            <input type="number"
                                   style="background:#e9e4e4"
                                   readonly=true
                                   v-model="yqMoney">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            礼品费用

                        </td>
                        <td colspan="3">
                            (见特殊支出事项申请表)
                        </td>
                        <td colspan="2"
                            style="background:#e9e4e4">
                            <input type="number"
                                   style="background:#e9e4e4"
                                   readonly
                                   v-model="lpMoney">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            超标准住宿费用

                        </td>
                        <td colspan="3">

                            (见特殊支出事项申请表)
                        </td>
                        <td colspan="2"
                            style="background:#e9e4e4">
                            <input type="number"
                                   style="background:#e9e4e4"
                                   readonly=true
                                   v-model="cbzzsMoney">
                        </td>
                    </tr>
                    <tr v-for="(item,index) in specialSub"
                        :key="index">
                        <td colspan="7">
                            <input style="text-align:center;width:60%"
                                   type="text"
                                   v-model="item.project"
                                   readonly=true>
                        </td>
                        <td colspan="3">
                        </td>
                        <td colspan="2"
                            style="background:#e9e4e4">
                            <input type="number"
                                   style="background:#e9e4e4"
                                   v-model="specialSub[index].money"
                                   readonly=true>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="11"
                            class="table-title">境外非定额标准支出项目合计（元）
                        </td>
                        <td class=""
                            colspan="2">
                            <input v-model="jwfdeSum"
                                   type="number"
                                   :readonly="updateFlag"
                                   placeholder="手工录入"
                            >
                        </td>
                    </tr>
                </table>
                <!--  -->
            </div>
            <!--三 特殊支出事项申请  -->
            <div class="funding-table">
                <table>
                    <tr>
                        <td colspan="6"
                            class="table-start"
                            style="fontWeight:600">（三）特殊支出事项申请
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title super">事项</td>
                        <td class="table-title super"
                            style="width:20%">对象
                        </td>
                        <td class="table-title super">人数</td>
                        <!-- <td class="table-title super">标准</td> -->
                        <td colspan="2"
                            class="table-title super">金额
                        </td>
                        <td class="table-title super">附件</td>
                    </tr>
                    <tr>
                        <td class="table-title">1、宴请</td>
                        <td>
                            <input type="text"
                                   v-model="yqTarget"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="number"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   v-model="yqPersons"
                                   :readonly="updateFlag">
                        </td>
                        <!-- <td>
                            <input type="number"
                                   v-model="yqStandard"
                                   :readonly="updateFlag">
                        </td> -->
                        <td colspan="2"><input type="number"
                                               v-model="yqMoney"
                                               @keydown="handleInput2"
                                               onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                               :readonly="updateFlag"></td>
                        <td>
                            <div v-for="(fileName,fileIndex) in yqFileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile('yq',fileIndex,'special')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>
                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(yqFilePath[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'yq',type:'special'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">2、礼品</td>
                        <td>
                            <input type="text"
                                   v-model="lpTarget"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="number"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   v-model="lpPersons"
                                   :readonly="updateFlag">
                        </td>
                        <!-- <td>
                            <input type="number"
                                   v-model="lpStandard"
                                   :readonly="updateFlag">
                        </td> -->
                        <td colspan="2"><input type="number"
                                               v-model="lpMoney"
                                               @keydown="handleInput2"
                                               onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                               :readonly="updateFlag"></td>
                        <td>
                            <div v-for="(fileName,fileIndex) in lpFileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile('lp',fileIndex,'special')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>
                                <!-- <button @click="downloadFile(lpFileName[fileIndex])">download</button> -->
                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(lpFilePath[fileIndex],fileName,fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'lp',type:'special'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2"
                            class="table-title">3、超标准住宿
                        </td>
                        <td colspan="2"
                            class="table-title">超标准原因
                        </td>
                        <td colspan="2"
                            class="table-title">超标准部分金额
                        </td>
                        <td></td>
                    </tr>
                    <tr style="height:30px">
                        <td colspan="2">
                            <input type="text"
                                   v-model="cbzzsReason"
                                   :readonly="updateFlag">
                        </td>
                        <td colspan="2">
                            <input type="number"
                                   v-model="cbzzsMoney"
                                   :readonly="updateFlag"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2">
                        </td>
                        <td>
                            <div v-for="(fileName,fileIndex) in cbzzsFileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile('cbzzs',fileIndex,'special')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>
                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(cbzzsFilePath[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'cbzzs',type:'special'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <tr>
                        <td :rowspan="specialSub.length+3"
                            class="table-title">4、其他事项
                        </td>
                        <td colspan="2"
                            class="table-title">事项
                        </td>
                        <td colspan="2"
                            class="table-title">金额
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input style="text-align:center;width:60%"
                                   type="text" value="双跨团组支出事项说明" readonly
                                            >
                        </td>
                        <td colspan="2" style="background:#e9e4e4">

                        </td>
                        <td>
                            <div v-if="sktzFile.filePath !== ''">
                                {{sktzFile.fileName}}
                                <Icon type="md-close"
                                      @click="delFile(0,0,'sktzFile')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>
                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(sktzFile.filePath,sktzFile.fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{type:'sktzFile'}"
                                    v-if="!updateFlag && sktzFile.filePath == ''">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>

                    </tr>

                    <tr v-for="(item,index) of specialSub">
                        <td colspan="2">
                            <font class="add"
                                  @click="delRow(specialSub,index)"
                                  v-if="!updateFlag">
                                <Icon type="md-remove-circle"/>
                            </font>
                            <input style="text-align:center;width:60%"
                                   v-model="specialSub[index].project"
                                   :readonly="updateFlag">
                        </td>
                        <td colspan="2">
                            <input type="number"
                                   v-model="specialSub[index].money"
                                   :readonly="updateFlag"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   @keydown="handleInput2">
                        </td>
                        <td>
                            <div v-for="(fileName,fileIndex) in item.fileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile(index,fileIndex,'specialSub')"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>
                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(specialSub[index].filePath,fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                    :on-remove="onRemove"
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:index,type:'specialSub'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                        </td>
                    </tr>
                    <!--                    新增行-->
                    <tr>
                        <td colspan="2">
                            <font class="add"
                                  @click="addRow(specialSub)"
                                  v-if="!updateFlag">
                                <Icon type="md-add-circle"/>
                            </font>
                            <input placeholder="（事项）"
                                   readonly
                                   style="width:60%">
                        </td>
                        <td colspan="2">
                            <input type="number"
                                   placeholder="（金额）"
                                   readonly>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <!--            （四）预算资金来源情况（必填项）-->
            <div class="funding-table">
                <table style="table-layout:fixed">
                    <tr>
                        <td class="table-start"
                            colspan="4"
                            style="fontWeight:600">（四）预算资金来源情况（必填项）
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"
                            class="table-title super"
                            style="width:40%">项目
                        </td>
                        <td colspan="2"
                            class="table-title super">团组全部人员及经费负担来源情况（元）
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"
                            class="table-title">本次因公出国（境）经费总预算
                        </td>
                        <td colspan="2"
                            class="number">
                            <input v-model="auditFeeSum"
                                   type="number"
                                   readonly
                                   style="background:#e9e4e4">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"
                            class="table-title">经费具体来源情况
                        </td>
                        <td colspan="2"
                            class="table-title">预算金额
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">市本级一般公共财政预算资金
                        </td>
                        <td colspan="2">
                            <input type="number"
                                   v-model="auditCsCityBudget"
                                   :readonly="updateFlag"
                                   @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                                   oninput="if(value.length>9)value=value.slice(0,9)">
                        </td>
                    </tr>
                </table>
            </div>


            <div class="funding-auditMsg"
                 style="font-size:14px;height:30px;margin:0 auto;margin-top:5px;width:95%;display:flex;flex-direction:row;justify-content:space-between">
                <div>
                    <label>填报人：</label> <input type="text"
                                               v-model="userNick"
                                               :readonly="updateFlag"
                                               style="border:0;border-bottom:1px solid #000;">
                </div>
                <div>
                    <label>联系电话：</label> <input type="number" :readonly="updateFlag" v-model="auditTel" @blur="checkPhone(auditTel)"
                                                style="border:0;border-bottom:1px solid #000;">
                </div>
                <div>
                    <label>填报日期：</label><span style="width:100px">{{auditDate |time}}</span>
                </div>
            </div>
            <ul id="funding-app-remarks">
                <li>备注：</li>
                <li>1、其他需事先报批的用汇事项及有关经费事项包括：国（境）外城市间交通费、超标准住宿费用、宴请费用、对外赠送礼品费用等。</li>
                <li>2、本表一式三份：一份报出国（境）任务审批部门、一份报市财政局业务处室审批经费留存、一份本单位留存备查。</li>
                <li>3、市财政局表格填报咨询电话：51808737 51808736。</li>
                <li>4、培训团组特指经国家外专局批准并批复下达的培训团组。</li>
            </ul>
            <!--            审批情况-->
            <div class="funding-table">
                <table>
                    <tr>
                        <td class="table-start"
                            colspan="6"
                            style="fontWeight:600">审批情况
                        </td>
                    </tr>
                    <tr>
                        <th class="table-title">流程节点</th>
                        <th class="table-title">审批部门</th>
                        <th class="table-title">审批时间</th>
                        <th class="table-title">审批人</th>
                        <th class="table-title"
                            style="width:20%">审批意见
                        </th>
                        <th class="table-title"
                            style="width:20%">备注说明
                        </th>
                    </tr>
                    <tr v-for="item in workStream">
                        <td>
                            {{item.auditNode}}
                        </td>
                        <td>
                            {{item.auditDep}}
                        </td>
                        <td>
                            {{item.auditDate}}
                        </td>
                        <td>
                            {{item.auditAuditer}}
                        </td>
                        <td>
                            {{item.auditSuggestion}}
                        </td>
                        <td>
                            {{item.auditRemark}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                        <td>
                            <input type="text"
                                   :readonly="updateFlag">
                        </td>
                    </tr>

                </table>
            </div>
        </div>

        <Modal v-model="editorShow"
               :maskClosable=false
               width="400">
            <div class="editorHeader"
                 slot="header">
                退回
            </div>
            <div class="editor-main"
                 v-if="editorShow">

                <div class="spBox">
                    <span>退回意见：</span> <input type="text"
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
    // import { O_RDONLY } from "constants";
    import FileSaver from "file-saver";
    import XLSX from 'xlsx';

    export default {
        name: "applicationbl",
        inject: ['reload'],
        methods: {

            //表格导出
            excelDown() {
                let obj = ['序号', '姓名', '身份证号码', '单位', '职务', '联系方式'];
                var excelArr = [];
                console.log(this.userData)
                for (let i = 0; i < this.userData.length; i++) {
                    let arr = [];
                    arr.push(Number(i)+1);
                    arr.push(this.userData[i].mebName);
                    arr.push(this.userData[i].mebId);
                    arr.push(this.userData[i].mebDep);
                    arr.push(this.userData[i].mebJob);
                    arr.push(this.userData[i].mebTel);
                    excelArr.push(arr);
                }
                excelArr.unshift(obj);
                console.log(this.userData);
                var sheet = XLSX.utils.aoa_to_sheet(excelArr);
                FileSaver.saveAs(this.sheet2blob(sheet),  '团员信息.xlsx');
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

                return blob;
            },

            // 文件点击监听 导入
            sendFile() {
                let obj = this.$refs.dataFile;
                console.log(obj, 'ddd')
                let that = this;
                var f = obj.files[0]

                var rABS = false; //是否将文件读取为二进制字符串

                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        //outdata就是你想要的东西
                        console.log(outdata, 'dataaaaa')
                        // this.da = [...outdata]
                        for (let k = 0; k < outdata.length; k++) {
                            console.log(1)
                            let obj = {
                                mebNo: '',
                                mebName: '',
                                mebId: '',
                                mebDep: '',
                                mebJob: '',
                                mebTel: '',
                            };

                            console.log(that.userData,)

                            obj.mebNo = outdata[k].序号;
                            obj.mebName = outdata[k].姓名;
                            obj.mebId = outdata[k].身份证号码;
                            obj.mebDep = outdata[k].单位;
                            obj.mebJob = outdata[k].职务;
                            obj.mebTel = outdata[k].联系方式;
                            that.userData.push(obj);

                        }
                        let arr = []

                        // let para = {
                        //     //withList: JSON.stringify(this.da)
                        //     withList: arr
                        // }
                    }
                    reader.readAsArrayBuffer(f);
                }
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }

                obj.value = null;

            },


            //电话校验
            checkPhone(data) {

                if (data.length == '8' || data.length == '11') {

                }else{
                    this.$Message.warning('电话号码格式有误');
                    this.auditTel = '';
                }
            },

            dayin() {
                console.log('dayin')
                window.open(this.$axios.print() + '?reportlet=blbb'+ this.$axios.printCs()+'.cpt&auditNo=' + this.$store.state.zsBlAuditNo)
            },
            //点击退回 按钮
            quit() {
                // let no = this.$store.state.zsBlAuditNo;
                let obj = {
                    auditNo: this.auditNo,
                    auditDep: this.$store.state.info.departName,
                    auditDepCode: this.$store.state.info.departCode,
                    auditSuggestion: this.auditSuggestion,
                    auditRemark: this.auditRemark,
                    auditAuditer: this.$store.state.info.userNick,
                    auditUserId: this.$store.state.info.userId
                }
                this.$axios.auditBack(obj).then(res => {
                    if(res.data.ret == 1){
                        this.$Message.success(res.data.retMsg)
                        this.editorShow = false;
                    }else{
                        this.$Message.error(res.data.retMsg)
                    }
                    this.reload()
                })

            },
            //审核 按钮
            shCheck() {
                let obj = {
                    auditNo: this.auditNo,
                    auditDep: this.$store.state.info.departName,
                    auditDepCode: this.$store.state.info.departCode,
                    auditAuditer: this.$store.state.info.userNick,
                    auditUserId: this.$store.state.info.userId
                }
                this.$axios.auditCheck(obj).then(val => {
                    console.log(val, 1068)
                    if (val.data.ret == 1) {
                        this.$Message.success(val.data.retMsg)
                    } else {
                        this.$Message.error(val.data.retMsg)
                    }
                    this.reload()
                })
            },
            //
            showEditor() {
                this.editorShow = true;
            },
            hideEditor() {
                this.editorShow = false;
            },
            // 验证方法
            testFun() {


                if (this.groupUnit === '' || this.groupUnitType === '' || this.groupIsyearplan === '' || this.auditPjh1 === '' ||
                    this.auditPjhYear === '' || this.auditPjh2 === '' || this.groupPjDate === '' || this.pjFile.fileName === '' ||
                    this.groupDepartDate === '' || this.xcFile.filePath === '' ||
                    this.groupName === '' || this.groupIsbar === '' || this.groupCapacity === '' ||this.groupDepartDate === ''||
                    this.groupMission === '' || this.groupIstrain === '' || this.groupTripdays === ''|| this.xcFile.filePath===''
                    || this.groupDestination === ''|| this.ztGroupUnit=== ""|| this.ztGroupUnitType ==="") {
                    this.$Message.warning('请将任务情况填写完整');

                    return false;
                } else if (this.auditSub[0].money == 0) {
                    this.$Message.warning('总预算金额不能为0');
                    return false;
                } else if (this.userNick == '' || this.auditTel == '') {
                    this.$Message.warning('请填写填报人信息')
                    return false;
                } else if (this.mainfuncCode === '') {
                    this.$Message.warning('请填写功能科目')
                    return false;
                } else if(!(this.auditCsCityBudget === Number(this.auditFeeSum))){
                    this.$Message.warning('资金来源与总预算金额不等')
                    return false;
                }
                if (this.userData.length != this.groupCapacity) {
                    this.$Message.warning('参团人数填写有误');
                    return false;
                }
            },
            //送审
            auditNext() {
                if(this.testFun() == false){
                    return false;
                }
                let obj = {
                    auditNo: this.auditNo,
                    auditDep: this.$store.state.info.departName,
                    auditDepCode: this.$store.state.info.departCode,
                    auditAuditer: this.$store.state.info.userNick,
                    auditUserId: this.$store.state.info.userId

                }
                // this.loading = true;
                this.$axios.auditNext(obj).then(val => {
                    console.log(val, 333333)
                    if (val.data.ret == 1) {
                        this.$Message.success(val.data.retMsg)
                    } else {
                        this.$Message.error(val.data.retMsg)
                    }

                    // this.loading = false;
                    // this.$router.push('/funding/application');
                    this.reload()
                })
            },
            //审核
            auditCheck() {
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
            groupnum() {
                this.$store.commit("saveGroupnum", this.groupCapacity);
            },
            getRegion() {
                this.$axios.getDictRegionTop().then(res => {
                    this.continents = res.data.data
                })
                this.$axios.getCountrys().then(res => {
                    this.countrys = res.data.data
                })
                this.$axios.getCitys().then(res => {
                    this.citys = res.data.data
                })
            },
            getCityInfo() {

                this.auditJwde.forEach((val, index) => {
                    this.$axios.getCityInfo({id: this.auditJwde[index].city}).then(res => {
                        this.auditJwde[index].hotelExpense = res.data.data[0].hotelExpense
                        this.auditJwde[index].mealsCost = res.data.data[0].mealsCost
                        this.auditJwde[index].publicExpense = res.data.data[0].publicExpense
                        this.auditJwde[index].currency = res.data.data[0].exchangeId
                        this.exchangeRate = res.data.data[0].exchangeRate
                    })
                })
                console.log(this.auditJwde)
                console.log(this.exchangeRate)

            },
            save() {
                let tyFlag = false;
                try{
                    this.userData.forEach((item,index)=>{
                        item.mebNo = Number(index)+1;
                        if(item.mebDep == '' || item.mebJob == '' || item.mebName == ''){
                            this.$Message.warning('请将团员信息填写完整');
                            tyFlag = true;
                            throw Error();
                        }
                    })
                }catch(e){

                }

                if(tyFlag){
                    return false;
                }
                this.auditSub.forEach((item, index) => {
                    if (item.projectName == undefined) {
                        this.auditSub.splice(index, 1)
                    }
                })
                console.log(this.specialSub)
                this.specialSub.forEach((item, index) => {
                    if (item.project == undefined) {
                        this.specialSub.splice(index, 1)
                    }
                })
                let auditMain = {
                    auditSubmitter: this.userNick,
                    // auditDep: this.departName,
                    // auditCompany: this.conpanyName1,
                    //提交填报人信息
                    auditPjFilePath: this.pjFile.filePath,


                    auditDep: this.departName,
                    auditTel: this.auditTel,//联系电话
                    auditSubmitterId: this.userId,
                    auditDepCode: this.departCode,
                    auditCompanyCode: this.companyCode,
                    auditCompany: this.companyName,
                    auditType: "4",
                    auditStatus: "3",
                    auditDate: this.auditDate,
                    groupUnit: this.groupUnit,
                    groupUnitType: this.groupUnitType,
                    groupUnitJoin: this.ztGroupUnit,
                    groupUnitJoinType: this.ztGroupUnitType,

                    groupName: this.groupName,
                    groupMission: this.groupMission,
                    groupCapacity: this.groupCapacity,
                    groupTripdays: this.groupTripdays,
                    groupDepartDate: this.groupDepartDate,
                    groupPjDate: this.groupPjDate,//批件下达日期
                    groupIsyearplan: this.groupIsyearplan,
                    groupIsbar: this.groupIsbar,
                    groupIstrain: this.groupIstrain,
                    auditFeeSum: this.auditSub[0].money,
                    exchangeRate: this.exchangeRate,

                    auditSkFilePath:this.sktzFile.filePath,

                    auditCsCityBudget: this.auditCsCityBudget,
                    auditCsCityUpperSubsidy: this.auditCsCityUpperSubsidy,
                    auditCsCityOther: this.auditCsCityOther,
                    auditCsCityFs: this.auditCsCityFs,
                    auditDsDistrictBudget: this.auditDsDistrictBudget,
                    auditDsDistrictUpperSubsidy: this.auditDsDistrictUpperSubsidy,
                    auditDsDistrictOther: this.auditDsDistrictOther,
                    auditMember: this.userData,
                    auditJwfde: this.auditJwfde,
                    auditSub: this.fileToString(this.auditSub),
                    auditJwde: this.auditJwde,
                    //任务批件号
                    auditPjh1: this.auditPjh1,
                    auditPjh2: this.auditPjh2,
                    auditPjhYear: this.auditPjhYear,

                    //预报表NO
                    auditYbNo: this.auditYbNo,
                    groupDestination:this.groupDestination,
                    //境外非定额
                    auditJwfdeSum: this.jwfdeSum,
                    //境外定额
                    auditJwdeSum: this.jwdeSum,
                    //境外定额 分类合计
                    stayFeeSum: this.stayFeeSum,
                    foodFeeSum: this.foodFeeSum,
                    otherFeeSum: this.otherFeeSum,
                    trainFeeSum: this.trainFeeSum,

                    auditXcFilePath: this.xcFile.filePath,
                    groupDestination: this.groupDestination,
                };

                let obj2 = {
                    yqTarget: this.yqTarget,
                    yqPersons: this.yqPersons,
                    yqStandard: this.yqStandard,
                    yqMoney: this.yqMoney,
                    lpTarget: this.lpTarget,
                    lpPersons: this.lpPersons,
                    lpStandard: this.lpStandard,
                    lpMoney: this.lpMoney,
                    cbzzsReason: this.cbzzsReason,
                    cbzzsMoney: this.cbzzsMoney,

                    yqFileName: this.yqFileName ? this.yqFileName.join(',') : null,
                    yqFilePath: this.yqFilePath ? this.yqFilePath.join(',') : null,
                    lpFileName: this.lpFileName ? this.lpFileName.join(',') : null,
                    lpFilePath: this.lpFilePath ? this.lpFilePath.join(',') : null,
                    cbzzsFileName: this.cbzzsFileName ? this.cbzzsFileName.join(',') : null,
                    cbzzsFilePath: this.cbzzsFilePath ? this.cbzzsFilePath.join(',') : null,

                    auditSpecialSub: this.fileToString(this.specialSub)
                };
                if(this.userData.length != this.groupCapacity){
                    this.$Message.warning('参团人数填写有误');
                    return false;
                }
                let feeSum = 0;
                if (this.userNick == '') {
                    this.$Message.warning('请填填报人');
                    return false;
                }
                // 控制金额变量
                if (this.auditFeeSum == '') {
                    this.$Message.warning('请填写金额');
                    return false;
                }
                // 身份id校验

                if (this.auditPjh2 == '') {
                    this.$Message.warning('请填写批件号');
                    return false;
                }
                for (let k = 0; k < this.specialSub.length; k++) {
                    if (this.specialSub[k].money == null) {
                        break;
                    }
                    if (this.specialSub[k].money != '' && this.specialSub[k].fileName.length == 0 && this.specialSub[k].filePath.length == 0) {
                        this.$Message.warning('请将其他事项附件上传完整');
                        console.log(this.specialSub[k].money != '', this.specialSub, '444')
                        return false;
                    }
                }
                if (this.mebIdFlag == false) {
                    this.$Message.warning('团员身份信息填写有误');
                    return false;
                }

                console.log(this.yqMoney != '' && this.yqFileName.length == 0 || this.yqFilePath.length == 0, 'mmmmm')
                if (this.yqMoney != '' && this.yqFileName.length == 0 && this.yqFilePath.length == 0) {
                    this.$Message.warning('请上传宴请附件');
                    return false;
                }
                if (this.lpMoney != '' && this.lpFileName.length == 0 && this.lpFilePath.length == 0) {
                    this.$Message.warning('请上传礼品附件');
                    return false;
                }
                if (this.cbzzsMoney != '' && this.cbzzsFileName.length == 0 && this.cbzzsFilePath.length == 0) {
                    this.$Message.warning('请上传超标准住宿附件');
                    return false;
                }

                this.$axios.addAudit(auditMain).then(res => {
                    console.log(res);
                    if (res.data.ret === 1) {
                        //正式表NO(res.data.data.auditNo)
                        // this.$store.commit("saveZsAuditNo", res.data.data.auditNo);
                        //查询特殊支出事项申请
                        obj2.auditNo = res.data.data.auditNo;
                        this.$axios.auditspecial(obj2).then(res => {
                        });
                        this.updateFlag = true;
                        this.$Message.success("新增成功");
                        let auditNo1 = res.data.data.auditNo;
                        this.$store.commit('saveZsBlAuditNo', auditNo1);
                        //刷新页面
                        this.reload();

                    } else {
                        this.$Message.error("新增失败");
                    }
                });
            },
            save2() {

                // 团员信息的序号 赋值
                let tyFlag = false;
                try{
                    this.userData.forEach((item,index)=>{
                        item.mebNo = Number(index)+1;
                        if(item.mebDep == '' || item.mebJob == '' || item.mebName == ''){
                            this.$Message.warning('请将团员信息填写完整');
                            tyFlag = true;
                            throw Error();
                        }
                    })
                }catch(e){

                }

                if(tyFlag){
                    return false;
                }
                this.auditSub.forEach((item, index) => {
                    if (item.projectName == undefined) {
                        this.auditSub.splice(index, 1)
                    }
                })
                console.log(this.specialSub)
                this.specialSub.forEach((item, index) => {
                    if (item.project == undefined) {
                        this.specialSub.splice(index, 1)
                    }
                })

                let obj = {
                    auditNo: this.$store.state.zsBlAuditNo,
                    auditPjFilePath: this.pjFile.filePath,
                    auditTel: this.auditTel,
                    groupUnit: this.groupUnit,
                    groupUnitType: this.groupUnitType,
                    groupUnitJoin: this.ztGroupUnit,//组团性质
                    groupUnitJoinType: this.ztGroupUnitType,
                    groupName: this.groupName,
                    groupMission: this.groupMission,
                    groupCapacity: this.groupCapacity,
                    groupTripdays: this.groupTripdays,
                    groupDepartDate: this.groupDepartDate,
                    groupPjDate: this.groupPjDate,
                    groupIsyearplan: this.groupIsyearplan,
                    groupIsbar: this.groupIsbar,
                    groupIstrain: this.groupIstrain,
                    auditFeeSum: this.auditFeeSum,
                    auditCsCityBudget: this.auditCsCityBudget,
                    auditCsCityUpperSubsidy: this.auditCsCityUpperSubsidy,
                    auditCsCityOther: this.auditCsCityOther,
                    auditCsCityFs: this.auditCsCityFs,
                    auditDsDistrictBudget: this.auditDsDistrictBudget,
                    auditDsDistrictUpperSubsidy: this.auditDsDistrictUpperSubsidy,
                    auditDsDistrictOther: this.auditDsDistrictOther,
                    auditMember: this.userData,
                    auditJwfde: this.auditJwfde,
                    auditSub: this.fileToString(this.auditSub),
                    auditJwde: this.auditJwde,
                    exchangeRate: this.exchangeRate,
                    //任务批件号
                    auditPjh1: this.auditPjh1,
                    auditPjh2: this.auditPjh2,
                    auditPjhYear: this.auditPjhYear,
                    //预报表NO
                    auditYbNo: this.auditYbNo,
                    auditSkFilePath:this.sktzFile.filePath,
                    groupDestination:this.groupDestination,
                    //境外非定额
                    auditJwfdeSum: this.jwfdeSum,
                    //境外定额
                    auditJwdeSum: this.jwdeSum,
                    //境外定额 分类合计
                    stayFeeSum: this.stayFeeSum,
                    foodFeeSum: this.foodFeeSum,
                    otherFeeSum: this.otherFeeSum,
                    trainFeeSum: this.trainFeeSum,

                    auditXcFilePath: this.xcFile.filePath,
                    groupDestination: this.groupDestination,


                };
                let obj2 = {
                    yqTarget: this.yqTarget,
                    yqPersons: this.yqPersons,
                    yqStandard: this.yqStandard,
                    yqMoney: this.yqMoney,
                    lpTarget: this.lpTarget,
                    lpPersons: this.lpPersons,
                    lpStandard: this.lpStandard,
                    lpMoney: this.lpMoney,
                    cbzzsReason: this.cbzzsReason,
                    cbzzsMoney: this.cbzzsMoney,

                    yqFileName: this.yqFileName ? this.yqFileName.join(',') : null,
                    yqFilePath: this.yqFilePath ? this.yqFilePath.join(',') : null,
                    lpFileName: this.lpFileName ? this.lpFileName.join(',') : null,
                    lpFilePath: this.lpFilePath ? this.lpFilePath.join(',') : null,
                    cbzzsFileName: this.cbzzsFileName ? this.cbzzsFileName.join(',') : null,
                    cbzzsFilePath: this.cbzzsFilePath ? this.cbzzsFilePath.join(',') : null,

                    auditSpecialSub: this.fileToString(this.specialSub),
                    auditNo: this.$store.state.zsBlAuditNo
                };
                if(this.userData.length != this.groupCapacity){
                    this.$Message.warning('参团人数填写有误');
                    return false;
                }



                if (this.userNick == '') {
                    this.$Message.warning('请填填报人');
                    return false;
                }

                // 控制金额变量
                if (this.auditFeeSum == '') {
                    this.$Message.warning('请填写具体金额');
                    return false;
                }
                // 身份id校验
                if (this.mebIdFlag == false) {
                    this.$Message.warning('团员身份信息填写有误');
                    return false;
                }

                for (let k = 0; k < this.specialSub.length; k++) {
                    if (this.specialSub[k].money == null) {
                        break;
                    }
                    if (this.specialSub[k].money != "" && this.specialSub[k].fileName.length == 0 && this.specialSub[k].filePath.length == 0) {
                        this.$Message.warning('请将其他事项附件上传完整');
                        return false;
                    }
                }

                console.log(this.yqFileName.length == 0)
                console.log(this.yqMoney != '' && this.yqFileName.length == 0 || this.yqFilePath.length == 0, 'mmmmm')
                if (this.yqMoney != '' && this.yqFileName.length == 0 && this.yqFilePath.length == 0) {
                    this.$Message.warning('请上传宴请附件');
                    return false;
                }
                if (this.lpMoney != '' && this.lpFileName.length == 0 && this.lpFilePath.length == 0) {
                    this.$Message.warning('请上传礼品附件');
                    return false;
                }
                if (this.cbzzsMoney != '' && this.cbzzsFileName.length == 0 && this.cbzzsFilePath.length == 0) {
                    this.$Message.warning('请上传超标准住宿附件');
                    return false;
                }
                this.$axios.update(obj).then(res => {
                    if (res.data.ret === 1) {
                        this.$axios.UpdateAuditspecial(obj2).then(res => {
                            if (res.data.ret === 1) {
                                this.$Message.success('修改成功');
                                this.updateFlag = true;
                                this.reload();
                            }else{
                                this.$Message.error(res.data.retMsg);
                            }
                        });
                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                });
            },

            getChild(data) {
                // console.log(data)
                this.otherData4[data.no - 1] = data;
                this.otherData4Temp = data.no + Math.random();
                // console.log(this.otherData4);
            },
            //查询特殊事项表并赋值
            setAuditSpecial(auditNo) {
                this.$axios.getAuditspecial(auditNo).then(res => {
                    if (res.data.ret === 1) {
                        this.yqTarget = res.data.data.yqTarget;
                        this.yqPersons = res.data.data.yqPersons;
                        this.yqStandard = res.data.data.yqStandard;
                        this.yqMoney = res.data.data.yqMoney;
                        this.lpTarget = res.data.data.lpTarget;
                        this.lpPersons = res.data.data.lpPersons;
                        this.lpStandard = res.data.data.lpStandard;
                        this.lpMoney = res.data.data.lpMoney;
                        this.cbzzsReason = res.data.data.cbzzsReason;
                        this.cbzzsMoney = res.data.data.cbzzsMoney;

                        this.yqFileName = res.data.data.yqFileName ? res.data.data.yqFileName.split(',') : []
                        this.yqFilePath = res.data.data.yqFilePath ? res.data.data.yqFilePath.split(',') : []
                        this.lpFileName = res.data.data.lpFileName ? res.data.data.lpFileName.split(',') : []
                        this.lpFilePath = res.data.data.lpFilePath ? res.data.data.lpFilePath.split(',') : []
                        this.cbzzsFileName = res.data.data.cbzzsFileName ? res.data.data.cbzzsFileName.split(',') : null
                        this.cbzzsFilePath = res.data.data.cbzzsFilePath ? res.data.data.cbzzsFilePath.split(',') : null

                        this.specialSub = this.fileToArr(res.data.data.auditSpecialSub);
                    }
                });
            },
            update() {
                // 修改
                this.updateFlag = !this.updateFlag;

                //开启auditYbNo的监听
                this.watchFlag = true;


                this.$Message.success(this.updateFlag ? "不可修改" : "可修改");
            },
            handleChange(date) {
                this.groupDepartDate = date;
            },
            handleChange2(date) {
                this.groupPjDate = date;
            },
            delAudit() {
                this.$axios.delAudit(this.auditNo).then(res => {
                    if (res.data.ret == 1) {
                        this.$Message.success("删除成功")
                        this.$store.commit("saveZsBlAuditNo", '');
                        console.log(this.$store.state.options, this.$store.state.tab, '333');
                        let options = this.$store.state.options;
                        let tab = this.$store.state.tab;
                        // 删除 页签 去除缓存
                        let obj1 = [];
                        let obj2 = [];
                        obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
                        obj1.forEach((item,i)=>{

                            if(item.route != '/funding/applicationBL'){
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
                        this.$Message.success("删除失败")
                    }
                })
            },
            addJwfde() {
                console.log(this.auditJwfde, 'jwfde');

                this.auditJwfde.push({});
            },

            delJwfde(index) {
                this.auditJwfde.splice(index, 1);
            },
            //增加删除经费项目
            addJfxm() {
                this.auditSub.push({});
            },
            delJfxm(index) {
                this.auditSub.splice(index, 1);
            },

            addRow(data) {
                var newRow = {}
                console.log(data, 'addd')
                if (data == this.specialSub || data == this.auditSub) {
                    newRow = {fileName: [], filePath: [], no: data.length + 1}
                } else if (data == this.auditJwde) {
                    newRow = {no: data.length + 1}
                }
                data.push(newRow)
            },
            delRow(data, index) {
                data.splice(index, 1)
                console.log(index)
                console.log(this.auditJwde)
            },


            addUser() {
                this.userData.push({
                    mebNo: this.userData.length + 1,
                    mebJob:'',
                    mebName:'',
                    mebDep:''
                });
            },
            delUser(index) {
                this.userData.splice(index, 1);
            },

            //把fileName filePath 转换成数组
            fileToArr(data) {
                var result = JSON.parse(JSON.stringify(data))
                result.forEach((val, index) => {
                    if (val.fileName == '' || val.fileName == null) {
                        result[index].fileName = []
                        result[index].filePath = []
                    } else {
                        result[index].fileName = val.fileName.split(',')
                        result[index].filePath = val.filePath.split(',')
                    }
                })
                return result
            },
            //把fileName filePath 转换回字符串
            fileToString(data) {
                var result = JSON.parse(JSON.stringify(data))
                result.forEach((val, index) => {
                    result[index].fileName = val.fileName.join(',')
                    result[index].filePath = val.filePath.join(',')
                })
                // console.log(result)
                return result
            },
            //文件上传
            onSuccess(response, file, data) {
                console.log("上传成功");
                switch (response.data.type) {
                    case "auditSub":
                        this.auditSub[response.data.no].fileName = this.auditSub[response.data.no].fileName.concat(response.data.nameList)
                        this.auditSub[response.data.no].filePath = this.auditSub[response.data.no].filePath.concat(response.data.pathList)
                        // console.log(this.auditSub)
                        break
                    case "special":
                        this[response.data.no + 'FileName'] = this[response.data.no + 'FileName'].concat(response.data.nameList)
                        this[response.data.no + 'FilePath'] = this[response.data.no + 'FilePath'].concat(response.data.pathList)
                        console.log(this.cbzzsFileName)
                        console.log(this.cbzzsFilePath)
                        break
                    case "specialSub":
                        this.specialSub[response.data.no].fileName = response.data.nameList.concat(this.specialSub[response.data.no].fileName)
                        this.specialSub[response.data.no].filePath = response.data.pathList.concat(this.specialSub[response.data.no].filePath)
                        console.log(this.specialSub)
                        break
                    case "ybFile":


                        this.ybFile.filePath = response.data.pathList[0];
                        break
                    case 'pjFile':


                        this.pjFile.filePath = response.data.pathList[0];
                        break
                    case 'xcFile':
                        this.xcFile.filePath = response.data.pathList[0];
                        break;
                    case 'sktzFile':

                        this.sktzFile.filePath = response.data.pathList[0];
                        console.log(this.sktzFile.filePath)

                        break;

                }

            },
            onRemove(file, fileList) {
            },
            delFile(rowIndex, fileIndex, type) {
                switch (type) {
                    case 'auditSub':
                        this.auditSub[rowIndex].fileName.splice(fileIndex, 1)
                        this.auditSub[rowIndex].filePath.splice(fileIndex, 1)
                        break
                    case "special":
                        this[rowIndex + 'FileName'].splice(fileIndex, 1)
                        this[rowIndex + 'FilePath'].splice(fileIndex, 1)
                        console.log(this.cbzzsFileName)
                        console.log(this.cbzzsFilePath)
                        break
                    case 'specialSub':
                        this.specialSub[rowIndex].fileName.splice(fileIndex, 1)
                        this.specialSub[rowIndex].filePath.splice(fileIndex, 1)
                        break
                    case 'ybFile':

                        this.ybFile.filePath = '';
                        break;
                    case 'pjFile':
                        this.pjFile.filePath = '';
                        break;
                    case 'xcFile':
                        this.xcFile.filePath = '';
                        break;

                    case 'sktzFile':

                        this.sktzFile.filePath = '';
                        console.log(this.sktzFile.filePath,'33')
                        break;
                }
            },
            downloadFile(filePath, fileName) {
                FileSaver.saveAs(this.$axios.downloadPath() + filePath, fileName);
            },



        },
        data() {
            return {
                jwdeSum: '',//境外定额总金额
                jwfdeSum: '',//境外非定额总金额
                specialSubSum: 0,//特殊事项子表求和
                // auditJwfdeSum: 0,// 境外非定额子表求和
                trainZero: 0,
                userId: '',
                conpanyName: "",
                mebIdFlag: true,//身份id校验
                //选择批件号字段
                auditPjh1: "苏政外出",
                //输入批件号字段
                auditPjh2: "",
                //输入批件年份
                auditPjhYear: '',
                loading: false,
                //批件号年份
                pjYears: [],
                //批件号字段
                taskbatch: [
                    {
                        name: "苏政外出",
                        value: "苏政外出"
                    },
                    {
                        name: "宁政外出字",
                        value: "宁政外出字"
                    },
                    {
                        name: "宁政外出确字",
                        value: "宁政外出确字"
                    },
                    {
                        name: "国台赴字",
                        value: "国台赴字"
                    },
                    {
                        name: "苏台赴台字",
                        value: "苏台赴台字"
                    },
                    {
                        name: "宁外专字",
                        value: "宁外专字"
                    }
                ],
                //点击选中的AuditNo
                auditYbNo: "",
                //正式表左上角下拉
                formal: [],

                //单据状态
                auditStatus: '',
                //宴请对象
                yqTarget: "",
                //宴请人数
                yqPersons: "",
                //宴请标准
                yqStandard: "",
                //宴请金额
                yqMoney: "",
                yqFileName: [],
                yqFilePath: [],
                //礼品对象
                lpTarget: "",
                //礼品人数
                lpPersons: "",
                //礼品标准
                lpStandard: "",
                //礼品金额
                lpMoney: "",
                lpFileName: [],
                lpFilePath: [],
                //超标准原因
                cbzzsReason: "",
                //超标准部分金额
                cbzzsMoney: "",
                cbzzsFileName: [],
                cbzzsFilePath: [],


                continents: [],
                countrys: {},
                citys: {},
                // cityInfo:{7:{exchangeId:0,hotelExpense:0}},

                length: "2",
                m11: "0",
                m22: "0",
                m33: "0",
                all: 0,
                all3: 0,

                visible: false,
                updateFlag: true,
                watchFlag: true,
                flag: true,
                chengshi: "",
                auditNo: "",

                auditNoList: {},
                remak: "sdfsd",
                auditSub: [],
                auditJwfde: [],
                auditJwde: [],
                specialSub: [],
                ybFile: {fileName: '预报表盖章文件', filePath: ''},//预报表盖章文件
                pjFile: {fileName: '批件文件', filePath: ''},//批件文件
                groupDestination: '',//目的地
                xcFile: {fileName: '行程单文件', filePath: ''},//形成单文件

                userData: [],
                otherData: [{}],
                otherData2: [{}],
                otherData3: [{}],

                userNick: "",
                auditTel: '',//联系电话
                groupDestination:'',
                departName: '',
                departCode: '',
                companyCode: '',
                companyName: '',
                ztGroupUnit: '',
                ztGroupUnitType: '',// 组团单位性质
                auditDate: '',
                ztdwList: [
                    {name: '国家', value: '国家'},
                    {name: '省', value: '省'},
                    {name: '市', value: '市'},
                    {name: '区', value: '区'},
                    {name: '其他', value: '其他'}
                ],
                //双跨 团组附件
                sktzFile:{fileName:'双跨团组说明附件',filePath:''},
                //经费总预算
                // auditFeeSum: "",
                //参团单位
                groupUnit: "",
                //团组名称
                groupName: "",
                //出访任务
                groupMission: "",
                //是否为培训团组
                groupIstrain: "",
                //组团单位性质
                groupUnitType: "",
                //是否列入年初出国计划
                groupIsyearplan: "",
                //是否为一带一路
                groupIsbar: "",
                //本参团人数
                groupCapacity: '',
                //出访天数
                groupTripdays: "",
                //预计出访日期
                groupDepartDate: "",
                //批件下达日期
                groupPjDate: '',
                Mission: [],
                Istrain: [
                    {
                        name: "否",
                        value: 0
                    },
                    {
                        name: "是",
                        value: 1
                    }
                ],
                UnitType: [
                    {name: "行政单位（含参公）", value: "行政单位（含参公）"},
                    {name: "事业单位", value: "事业单位"},

                    {name: "其他单位", value: "其他单位"}
                ],
                remark: "dasddas",
                remark8: "sdfs",
                remark9: "sdfs",
                //市本级财政财政预算资金
                auditCsCityBudget: null,
                //省及中央补助的资金
                auditCsCityUpperSubsidy: null,
                //其他资金 （如国企负担资金等）
                auditCsCityOther: null,
                auditCsCityFs: null,
                //区（园内）财政预算资金
                auditDsDistrictBudget: null,
                //省及中央补助的资金
                auditDsDistrictUpperSubsidy: null,
                //其他资金 （如国企负担资金等）
                auditDsDistrictOther: null,
                workStream: [],

                auditSuggestion: '',
                auditRemark: '',


                auditJwdeTemp: 0,
                exchangeRate: 0,
                currency: 0,

                //境外定额 分类合计
                stayFeeSum: 0,
                foodFeeSum: 0,
                otherFeeSum: 0,
                trainFeeSum: 0,
                moneyTrueObj:{

                },// 没有两位小说的金钱


                //显示蒙层
                editorShow: false,
            };
        },
        created() {
            //批件年份获取最新两年
            let date = new Date;
            let year = date.getFullYear();
            this.auditPjhYear = '[' + year + ']';
            console.log(year, 333);
            this.pjYears = [
                {
                    name: '[' + year + ']',
                    value: '[' + year + ']'
                },
                {
                    name: '[' + Number(year - 1) + ']',
                    value: '[' + Number(year - 1) + ']'
                },
                {
                    name: '[' + Number(year - 2) + ']',
                    value: '[' + Number(year - 2) + ']'
                },

            ]
            this.info = this.$store.state.info;
            console.log(this.$store.state.info, 'info')
            // this.time = new Date();

            //公共部分赋值
            this.Mission = this.$store.state.Mission;
            this.auditSub = [
                {
                    no: "1",
                    projectName: "本次因公出国（境）经费总预算",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "2",
                    projectName: "1、国际旅费预算：",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "3",
                    projectName: "其中：国际旅费预算（抵离岸）",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "4",
                    projectName: "国（境）外城市间机票",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "5",
                    projectName: "2、境内经费预算 :",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "6",
                    projectName: "其中：签证费用",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                },
                {
                    no: "7",
                    projectName: "保险、防疫费",
                    money: 0,
                    remark: "",
                    fileName: [],
                    filePath: []
                }
            ];
            // this.auditJwde=[{currency:null}]
            this.auditJwfde = [
                {
                    no: "1",
                    projectName: "国（境）外城市间交通费（非机票）",
                    remak: "",
                    fileName: [],
                    filePath: [],
                    money: ""
                },

            ]

            this.getRegion()

            //判断新表
            if (this.$store.state.zsBlAuditNo == "") {
                this.flag = false;

                //使得表单可修改
                this.updateFlag = false;
                //填报日期赋值
                this.auditDate = this.$commonUtil.dateFormat(new Date())
                // this.userNick = this.$store.state.info.userNick;
                this.userId = this.$store.state.info.userId;
                this.groupUnit = this.$store.state.info.departName;
                this.departName = this.$store.state.info.departName;
                this.departCode = this.$store.state.info.departCode;
                this.companyCode = this.$store.state.info.companyCode;
                this.companyName = this.$store.state.info.companyName;
                this.addRow(this.auditSub);
                this.addRow(this.auditJwde);
                this.addRow(this.specialSub);
                console.log(this.auditJwfde, 'jwfdeCreate')
                // this.addJwfde();


            }
            //判断查询表
            if (this.$store.state.zsBlAuditNo != "") {
                this.groupUnitType = this.UnitType[0].value;
                this.$axios.byAuditNo(this.$store.state.zsBlAuditNo).then(res => {
                    if (res.data.data.auditStatus === 5) {
                    }
                    if (res.data.ret === 1) {
                        console.log(res,23333333333333)
                        //关闭auditYbNo的监听
                        this.watchFlag = false

                        this.auditNo = res.data.data.auditNo;
                        //查询（四）特殊支出事项申请表
                        this.setAuditSpecial(res.data.data.auditNo)
                        //用户信息赋值
                        this.departName = res.data.data.auditDep;
                        this.departCode = res.data.data.auditDepCode;
                        this.companyCode = res.data.data.auditCompanyCode;
                        this.companyName = res.data.data.auditCompany;

                        this.auditYbNo = res.data.data.auditYbNo;
                        this.auditStatus = res.data.data.auditStatus;
                        this.auditType = res.data.data.auditType;
                        this.auditDate = res.data.data.auditDate;

                        this.auditPjh1 = res.data.data.auditPjh1;
                        this.auditPjh2 = res.data.data.auditPjh2;
                        this.auditPjhYear = res.data.data.auditPjhYear;
                        this.pjFile.filePath = res.data.data.auditPjFilePath;
                        this.ybFile.filePath = res.data.data.auditYbFilePath;
                        this.groupUnit = res.data.data.groupUnit;
                        this.groupName = res.data.data.groupName;
                        this.groupCapacity = res.data.data.groupCapacity;
                        this.groupTripdays = res.data.data.groupTripdays;
                        //附件处理
                        this.auditSub = this.fileToArr(res.data.data.auditSub);

                        //获得城市标准和汇率
                        this.auditJwde = res.data.data.auditJwde;
                        // this.getCityInfo();
                        this.auditJwfde = res.data.data.auditJwfde;
                        this.auditCsCityBudget = res.data.data.auditCsCityBudget;
                        this.auditCsCityUpperSubsidy = res.data.data.auditCsCityUpperSubsidy;
                        this.auditCsCityOther = res.data.data.auditCsCityOther;
                        this.auditCsCityFs = res.data.data.auditCsCityFs;
                        this.auditDsDistrictBudget = res.data.data.auditDsDistrictBudget;
                        this.auditDsDistrictUpperSubsidy = res.data.data.auditDsDistrictUpperSubsidy;
                        this.auditDsDistrictOther = res.data.data.auditDsDistrictOther;
                        this.userData = res.data.data.auditMember;
                        this.userNick = res.data.data.auditSubmitter;
                        this.groupUnitType = res.data.data.groupUnitType;
                        this.ztGroupUnitType = res.data.data.groupUnitJoinType;
                        this.ztGroupUnit = res.data.data.groupUnitJoin;
                        this.groupIsyearplan = res.data.data.groupIsyearplan;
                        this.groupIsbar = res.data.data.groupIsbar;
                        this.groupIstrain = res.data.data.groupIstrain;
                        this.groupDepartDate = res.data.data.groupDepartDate;
                        this.groupPjDate = res.data.data.groupPjDate;
                        this.groupMission = res.data.data.groupMission;

                        this.workStream = res.data.data.workStream;
                        this.auditTel = res.data.data.auditTel;
                        this.sktzFile.filePath = res.data.data.auditSkFilePath;
                        this.groupDestination = res.data.data.groupDestination;
                        this.xcFile.filePath = res.data.data.auditXcFilePath;

                        this.jwdeSum = res.data.data.auditJwdeSum;
                        this.jwfdeSum = res.data.data.auditJwfdeSum;

                        //境外定额 分类合计
                        this.stayFeeSum = res.data.data.stayFeeSum;
                        this.foodFeeSum = res.data.data.foodFeeSum;
                        this.otherFeeSum = res.data.data.otherFeeSum;
                        this.trainFeeSum = res.data.data.trainFeeSum;


                    }
                });
            }
        },
        mounted() {
            this.$refs.jfxmip[0].setAttribute(
                "style",
                "background:#c2e8ff;text-align:center"
            );
            this.$refs.jfxmip[1].setAttribute(
                "style",
                "background:#c2e8ff;text-align:center"
            );
            this.$refs.jfxmip[4].setAttribute(
                "style",
                "background:#c2e8ff;text-align:center"
            );
            this.$refs.jfxmmc[0].setAttribute("class", "table-title");
            this.$refs.jfxmmc[1].setAttribute("class", "table-title");
            this.$refs.jfxmmc[4].setAttribute("class", "table-title");
            this.$refs.jfxmje[0].setAttribute("style", "background:#e9e4e4");
            this.$refs.jfxmje[1].setAttribute("style", "background:#e9e4e4");
            this.$refs.jfxmje[4].setAttribute("style", "background:#e9e4e4");
            this.$refs.jfxmjetd[4].setAttribute("style", "background:#e9e4e4");
            this.$refs.jfxmjetd[0].setAttribute("style", "background:#e9e4e4");
            this.$refs.jfxmjetd[1].setAttribute("style", "background:#e9e4e4");
            //正式表左上角获取下拉框
            let obj = "auditType=2&auditStatus=5";
            this.$axios.getListDetailed2(obj).then(res => {
                console.log(res.data)
                if (res.data.ret === 1) {
                    let arr = [];
                    res.data.data.list.forEach(val => {
                        var item = {name: val.AUDIT_NO, value: val.AUDIT_NO};
                        arr.push(item);
                    });
                    this.formal = arr;
                }
            });
            this.conpanyName = this.$store.state.info.conpanyName;
        },
        computed: {
            jwjf: function () {
                var jwfde = this.jwfdeSum;
                var jwde = this.jwdeSum;
                var result = 0;

                if (this.auditJwde.length != 0) {
                    result = (Number(jwfde) + Number(jwde));
                }
                if (isNaN(result)) {
                    result = 0;
                }
                this.moneyTrueObj.jwjf = result;
                return result.toFixed(2);
            },
            auditFeeSum: function () {
                // return this.jwjf
                // console.log(this.jwjf);
                var jfSum =
                    Number(this.auditSub[1].money) +
                    Number(this.auditSub[4].money) +
                    Number(this.jwjf);
                this.auditSub[0].money = jfSum.toFixed(2);
                this.moneyTrueObj.auditFeeSum = jfSum;
                return jfSum.toFixed(2);
            },
            // jwfdeSum: function () {
            //
            //
            //     let sum = Number(this.specialSubSum) + Number(this.auditJwfdeSum) + Number(this.yqMoney) + Number(this.lpMoney) + Number(this.cbzzsMoney);
            //     return sum.toFixed(2);
            // }
        },
        watch: {
            groupIstrain(newVal, oldVal) {
                console.log(newVal)
                if (newVal == 0) {
                    if (this.auditJwde.length != 0) {
                        this.auditJwde.forEach(item => {
                            item.trainFee = 0;
                        })
                    }
                }
            },
            auditSub: {
                handler: function (newVal) {
                    this.auditSub[1].money =
                        Number(this.auditSub[2].money) + Number(this.auditSub[3].money);

                    let arr = this.auditSub.slice(5);
                    let sum = 0;
                    arr.forEach(val => {
                        sum += Number(isNaN(val.money) ? 0 : val.money);
                    });
                    this.auditSub[4].money = sum.toFixed(2);
                },
                deep: true //深度监听
            },
            auditJwfde: {
                handler:async function (newVal) {
                    var sum = 0;
                    var exchangeRate = 1;
                    await this.$axios.getCityInfo({
                        id: 363,
                        cfDate: this.auditDate
                    }).then(res=>{
                        exchangeRate = res.data.data[0].exchangeRate;
                    })
                    this.auditJwfde[0].exchangeRate = exchangeRate;
                    this.auditJwfde.forEach(val => {
                        console.log(val.money == '')
                        if (val.money != '' && !isNaN(val.money)) {
                            // if (Number(val.money) > 500 * this.groupCapacity) {
                            //     this.$Message.warning('超出城市间交通费上线');
                            //     val.money = '';
                            // }
                            sum += Number(val.money) * exchangeRate;
                        }
                    });
                    this.moneyTrueObj.auditJwfdeSum = sum;
                    this.auditJwfde[0].moneyRmb = sum;
                    // this.auditJwfdeSum = sum.toFixed(2);
                },
                deep: true
            },
            specialSub: {
                handler: function (newVal) {
                    var sum = 0;
                    console.log(this.specialSub, 33344)
                    this.specialSub.forEach(val => {
                        console.log(val.money == '')
                        if (val.money != '' && !isNaN(val.money)) {
                            sum += Number(val.money);
                        }

                    });


                    this.specialSubSum = sum.toFixed(2);
                },
                deep: true
            },


            auditJwde: {
                handler: function (newVal) {
                    if (this.watchFlag == false) {
                        return false;
                    }
                    //初始化 费用合计
                    this.stayFeeSum = 0;
                    this.foodFeeSum = 0;
                    this.otherFeeSum = 0;
                    this.trainFeeSum = 0;
                    this.auditJwde.forEach((val, index) => {

                        //选择城市后 获取币种  汇率 和标准
                        if (this.auditJwde[index].city) {
                            this.$axios.getCityInfo({
                                id: this.auditJwde[index].city,
                                cfDate: this.auditDate
                            }).then(res => {
                                this.auditJwde[index].hotelExpense = res.data.data[0].hotelExpense
                                this.auditJwde[index].mealsCost = res.data.data[0].mealsCost
                                this.auditJwde[index].publicExpense = res.data.data[0].publicExpense

                                // this.auditJwde[index].currency = res.data.data[0].exchangeId
                                Vue.set(this.auditJwde[index], 'currency', res.data.data[0].exchangeId)
                                this.exchangeRate = res.data.data[0].exchangeRate;
                                    //保存汇率
                                this.auditJwde[index].exchangeRate = res.data.data[0].exchangeRate;
                                var showStatus = this.auditJwde[index].city && this.auditJwde[index].stayDays && this.auditJwde[index].tripDays
                                if (showStatus) {
                                    this.auditJwde[index].stayFeeS = Number(this.auditJwde[index].hotelExpense) * Number(this.auditJwde[index].stayDays) * Number(this.groupCapacity)
                                    this.auditJwde[index].foodFeeS = this.auditJwde[index].mealsCost * this.auditJwde[index].tripDays * this.groupCapacity
                                    this.auditJwde[index].otherFeeS = this.auditJwde[index].publicExpense * this.auditJwde[index].tripDays * this.groupCapacity


                                }
                                if (this.auditJwde[index].trainFee != null && showStatus) {
                                    // this.auditJwde[index].trainFee=0
                                    this.auditJwde[index].sumFee = Number(this.auditJwde[index].stayFee)
                                        + Number(this.auditJwde[index].foodFee)
                                        + Number(this.auditJwde[index].otherFee)
                                        + Number(this.auditJwde[index].trainFee)
                                }

                                    this.$axios.getCityInfo({
                                        id: this.auditJwde[index].country,
                                        cfDate: this.auditDate
                                    }).then(res => {
                                        this.auditJwde[index].countryName = res.data.data[0].regionName;
                                    })

                                //获取 培训费 标准
                                    let data = {country: this.auditJwde[index].countryName, row: '', page: '', state: ''}

                                        this.$axios.trainGetList(data).then(res => {
                                        if (res.data.ret == 1) {
                                            if (res.data.data.list.length == 0) {
                                                    this.auditJwde[index].trainFeeBase = 0
                                            } else {
                                        this.auditJwde[index].trainFeeBase = res.data.data.list[0].trainFee;
                                                }
                                                this.auditJwde[index].trainFeeS = this.auditJwde[index].trainFeeBase * this.auditJwde[index].tripDays * this.groupCapacity
                                    }
                                })
                            })
                        }
                        //选择城市 且填写住宿天数和出行天数时
                        var showStatus = this.auditJwde[index].city && this.auditJwde[index].stayDays && this.auditJwde[index].tripDays
                        if (showStatus) {
                            this.auditJwde[index].stayFeeS = Number(this.auditJwde[index].hotelExpense) * Number(this.auditJwde[index].stayDays) * Number(this.groupCapacity)
                            this.auditJwde[index].foodFeeS = this.auditJwde[index].mealsCost * this.auditJwde[index].tripDays * this.groupCapacity
                            this.auditJwde[index].otherFeeS = this.auditJwde[index].publicExpense * this.auditJwde[index].tripDays * this.groupCapacity;
                            this.auditJwde[index].trainFeeS = this.auditJwde[index].trainFeeBase * this.auditJwde[index].tripDays * this.groupCapacity;


                            //判断是否超标准
                            if (this.auditJwde[index].stayFee > this.auditJwde[index].stayFeeS) {
                                this.$Message.warning('住宿费用超标准')
                                this.auditJwde[index].stayFee = null
                            }
                            if (this.auditJwde[index].foodFee > this.auditJwde[index].foodFeeS) {
                                this.$Message.warning('伙食费用超标准')
                                this.auditJwde[index].foodFee = null
                            }
                            if (this.auditJwde[index].otherFee > this.auditJwde[index].otherFeeS) {
                                this.$Message.warning('公杂费用超标准')
                                this.auditJwde[index].otherFee = null
                            }
                            if (this.auditJwde[index].trainFee > this.auditJwde[index].trainFeeS) {
                                this.$Message.warning('培训费用超标准')
                                this.auditJwde[index].trainFee = null
                            }

                        }
                        if (showStatus) {
                            if (this.auditJwde[index].trainFee == undefined) {
                                this.auditJwde[index].sumFee = Number(this.auditJwde[index].stayFee)
                                    + Number(this.auditJwde[index].foodFee)
                                    + Number(this.auditJwde[index].otherFee)
                            } else {
                                this.auditJwde[index].sumFee = Number(this.auditJwde[index].stayFee)
                                    + Number(this.auditJwde[index].foodFee)
                                    + Number(this.auditJwde[index].otherFee)
                                    + Number(this.auditJwde[index].trainFee);
                            }
                            var moumou = this.auditJwdeTemp;
                            // console.log(moumou)
                            var sum = 0;
                            // console.log(this.otherData4);
                            this.auditJwde.forEach(val => {
                                if (val.sumFee != '' && !isNaN(val.sumFee)) {
                                    sum += Number(val.sumFee) * Number(val.exchangeRate);
                                }
                            });
                            // 境外定额合计 手填
                            // this.jwdeSum = sum.toFixed(2);
                        }


                            //计算 住宿 伙食等 合计人民币金额
                            this.stayFeeSum += this.auditJwde[index].stayFee * this.auditJwde[index].exchangeRate;
                            this.foodFeeSum += this.auditJwde[index].foodFee * this.auditJwde[index].exchangeRate;
                            this.otherFeeSum += this.auditJwde[index].otherFee * this.auditJwde[index].exchangeRate;
                            this.trainFeeSum += this.auditJwde[index].trainFee * this.auditJwde[index].exchangeRate;
                            // console.log(this.stayFeeSum,101)
                        }
                    )
                }
                ,
                deep: true //深度监听

            },
            groupCapacity: function () {

                this.auditJwde.push({})
                this.auditJwde.pop()
            },


            //监听下拉
            auditYbNo: function () {
                if (this.auditYbNo != "" && this.watchFlag) {

                    console.log(this.auditYbNo)

                    let obj = this.auditYbNo;
                    this.$axios.byAuditNo(obj).then(res => {
                        if (res.data.ret === 1) {
                            console.log(res, 'res下拉')
                            //查询（四）特殊支出事项申请表
                            this.setAuditSpecial(obj)

                            this.groupUnit = res.data.data.groupUnit;
                            this.groupName = res.data.data.groupName;
                            this.groupCapacity = res.data.data.groupCapacity;
                            this.groupTripdays = res.data.data.groupTripdays;
                            //附件处理
                            this.auditSub = this.fileToArr(res.data.data.auditSub);

                            this.auditJwde = res.data.data.auditJwde;
                            this.auditJwfde = res.data.data.auditJwfde;
                            this.auditCsCityBudget = res.data.data.auditCsCityBudget;
                            this.auditCsCityUpperSubsidy = res.data.data.auditCsCityUpperSubsidy;
                            this.auditCsCityOther = res.data.data.auditCsCityOther;
                            this.auditCsCityFs = res.data.data.auditCsCityFs;
                            this.auditDsDistrictBudget = res.data.data.auditDsDistrictBudget;
                            this.auditDsDistrictUpperSubsidy =
                                res.data.data.auditDsDistrictUpperSubsidy;
                            this.auditDsDistrictOther = res.data.data.auditDsDistrictOther;
                            this.userData = res.data.data.auditMember;
                            // this.userNick = res.data.data.auditSubmitter;
                            this.groupUnitType = res.data.data.groupUnitType;
                            this.groupIsyearplan = res.data.data.groupIsyearplan;
                            this.groupIsbar = res.data.data.groupIsbar;
                            this.groupIstrain = res.data.data.groupIstrain;
                            this.groupDepartDate = res.data.data.groupDepartDate;
                            this.groupPjDate = res.data.data.groupPjDate;
                            this.groupMission = res.data.data.groupMission;
                            this.jwdeSum = res.data.data.auditJwdeSum;

                        }
                    });

                }
                if (this.auditYbNo == "") {
                    console.log(65465);
                }
            }
        }
    };
</script>
<style>
    input[type="number"] {
        border: 0;
        -moz-appearance: textfield;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type='number']:focus {
        box-shadow: none;
    }

    .ivu-input,
    .ivu-input-small,
    .ivu-input-with-suffix {
        border: 0;
    }

    .ivu-input:focus {
        box-shadow: none;
    }

    .bwd {
        padding: 0 10px;
        text-align: right;
    }

    .print {
        width: 81px;
        background: #169aef url("../../assets/image/print1.png") no-repeat 5px center;
        background-size: 31px;
        text-align: right;
    }
</style>

<style scoped>
    .editorBg {
        width: 100%;
        height: 100%;
        position: fixed;

        top: 0px;
        left: 0px;

        filter: Alpha(opacity=50);
        opacity: 0.5;
        background-color: #000;
        z-index: 1;
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

    .ivu-modal-close {
        top: 20px !important;
    }

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

<style scoped lang="less">
    #funding-application {
        .funding-buttom {

            margin-bottom: 20px;
            width:100%;
            background:#fff;
            z-index:2;

            span {
                display: inline-block;
                padding: 8px 12px;
                font-size: 17px;
                color: #fff;
                border-radius: 5px;
                margin-left: 12px;
                cursor: pointer;
                background-color: #169aef;
                float:right;

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
                width: 880px;
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
                }
            }

            #funding-app-remarks {
                float: left;
                margin: -5px 0 15px 0;
                font-size: 14px;
                color: #4b98de;

                li {
                    line-height: 20px;
                }
            }

            .funding-table {
                width: 1200px;
                float: left;
                border: 1px solid #4b98de;
                padding: 8px 6px;
                margin: 0 0 8px 0;

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
                        margin: 10px 5px 6px 0;
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

                        &.table-start {
                            background: #67bef3;
                            border: 1px solid #4b98de;
                            padding: 8px 16px;
                            color: #fff;
                            line-height: 20px;
                            font-weight: 100;
                            font-size: 16px;
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

                        .upload {
                            cursor: pointer;
                            color: #9d9d9d;

                            i {
                                font-size: 20px;
                            }
                        }

                        &.number {
                            background: #e9e4e4;
                        }

                        .describe,
                        &.describe {
                            font-size: 16px;
                            color: #9d9d9d;
                        }

                        .add,
                        &.add {
                            font-size: 18px;
                            color: #169aef;
                            cursor: pointer;

                            &:hover {
                                text-decoration: underline;
                            }
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
                                border: 0;
                                -moz-appearance: textfield;

                            }

                            &[type="number"]::-webkit-inner-spin-button,
                            &[type="number"]::-webkit-outer-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
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
                            background: url(../../../public/select-bottom.png) no-repeat scroll 90% center transparent;
                        }
                    }
                }
            }
        }
    }
</style>

