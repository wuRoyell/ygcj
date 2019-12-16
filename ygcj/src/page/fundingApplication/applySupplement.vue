<!--非贸易非经营性用汇通知书-->
<template>
    <div id="funding-useSinks">
        <div class="funding-buttom"
             style="position:fixed;top:115px;right:20px;">
            <!-- <span><i class="iconxiugai"></i>修改</span> -->
            <span @click="usSave"
                  v-if="!this.$store.state.applySupNo.applyNo&&this.$store.state.info.userAuditType==0">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="usSave2"
                  v-if="$store.state.applySupNo.applyNo && !updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconbaocun"></i>保存
            </span>
            <span @click="update"
                  v-if="$store.state.applySupNo.applyNo &&(saveData.auditStatus == 3 ||saveData.auditStatus == 6)&& updateFlag&&this.$store.state.info.userAuditType==0">
                <i class="iconxiugai"></i>修改
            </span>
            <span @click="del"
                  v-if="$store.state.applySupNo.applyNo &&(saveData.auditStatus == 3 ||saveData.auditStatus == 6)&& updateFlag&&this.$store.state.info.userAuditType==0">
                <Icon type="ios-close-circle-outline"
                      style="font-size:18px;" />删除
            </span>
              <span @click="showEditor"
               v-if="((saveData.auditStatus == 4 ||saveData.auditStatus == 8 ) && $store.state.info.userAuditType == 1)||(saveData.auditStatus == 5 &&$store.state.info.userAuditType == 2)&& this.$store.state.applySupNo.applyNo && updateFlag "
                  >
                <i class="icontuihui"></i>退回
               
            </span>
            <span @click="withdraw"
                  v-if="((saveData.auditStatus == 5  ) && $store.state.info.userAuditType == 1)&& this.$store.state.applySupNo.applyNo && updateFlag ">
                <i class="icontuihui"></i>收回
            </span>
                <span @click="auditNext"
                  v-if="(
                  ((saveData.auditStatus == 3 ||saveData.auditStatus == 6 )  && $store.state.info.userAuditType == 0) ||
                  ((saveData.auditStatus == 4 ||saveData.auditStatus == 8 )&& $store.state.info.userAuditType == 1)||
                ((saveData.auditStatus == 5 )&& $store.state.info.userAuditType == 2)
                )&& this.$store.state.applySupNo.applyNo && updateFlag">
                <i class="iconshenpi"></i>送审
            </span>
            <span v-if="$store.state.applySupNo && updateFlag"
                  @click="dayin">
                <i class="icondayin"></i>打印
            </span>
             <span @click="bwd"
                  v-if="(Number(saveData.auditStatus)== 8 || Number(saveData.auditStatus)== 4 ) && this.updateFlag && $store.state.info.userAuditType == 1 "
                  class="bwd"
                  ref="dayin">

                生成办文单
            </span>
        </div>
        <div id="funding-a">
            <span class="title">因公出国（境）补申请表</span>
            <div class="cut"></div>
            <div class="tabTop" >
                <div class="funding-input">
                    正式申请表编号：
                  
                    <select v-model="auditNo"
                            :disabled="updateFlag">
                        <option value></option>
                        <option v-for="(item,index) in applyList"
                                :value="item.value">{{item.name}}
                        </option>
                    </select>
                </div>
                  <div class="funding-input" style="padding-right:30px;">
                    正式补申请表编号：
                  
                    {{saveData.auditSptNo}}
                </div>


            </div>
                <div class="funding-table">
                    <table class="fundingTableMain"
                           style="word-wrap:break-word;word-break:break-all">
                        <tr>
                            <td class="table-title">
                                经费申请单位
                            </td>
                            <td class="table-gray">
                                <input type="text"
                                       v-model="baseData.auditCompany"
                                       disabled>
                            </td>
                            <td class="table-title">任务批件号</td>
                            <td class="table-gray">
                               <p style='text-align:left;color:rgb(84, 84, 84);'>{{baseData.auditPjh1}}{{baseData.auditPjhYear}}{{baseData.auditPjh2}}</p>
                            </td>

                        </tr>
                        <tr>
                            <td class="table-title">
                                团组名称
                            </td>
                            <td class="table-gray">
                                <input type="text"
                                        v-model="baseData.groupName"
                                        disabled>
                            </td>
                            <td class="table-title">任务目的地国家</td>
                            <td class="table-gray">
                                <input type="text"
                                        v-model="baseData.groupDestination"
                                        disabled>
                            </td>

                        </tr>
                        <tr>

                            <td class="table-title">
                                出访日期
                            </td>
                            <td class="table-gray">
                                  <input type="text"
                                   v-model="baseData.groupDepartDate"
                                        disabled>
                                      
                            </td>
                            <td class="table-title">出访人数</td>
                            <td class="table-gray">
                                  <input type="text"
                                   v-model="baseData.groupCapacity"
                                        disabled>
                            </td>

                        </tr>
                        <tr>
                            <td class="table-title">
                                已申请经费（元）
                            </td>
                            <td class="table-gray">
                                  <input type="text" style='text-align:right;'
                                    v-model="baseData.auditFeeSum"
                                
                                        disabled>
                            </td>
                            <td class="table-title">   补申请表盖章文件<span >（必填）</span> </td>
                            <td>
                                <div v-for="(fileName,fileIndex) in saveData.sptFileName">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile({no:'sptFileName',type:'sptFilePath'},fileIndex)"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(saveData.sptFilePath[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                   
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'sptFileName',type:'sptFilePath'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4"
                                class="table-start">补申请经费构成情况</td>
                        </tr>
                        <tr>
                            <td class="table-title">补申请项目</td>
                            <td class="table-title">补申请金额</td>
                            <td class="table-title">测算过程及说明</td>
                            <td class="table-title">附件上传</td>
                        </tr>

                        <tr>
                            <td class="table-title">1、机票采购价差</td>
                            <td>   
                                <input type="number" v-model="saveData.money1" 
                                 @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                                 :readonly='updateFlag'>
                            </td>
                            <td>
                                 <input type="text" v-model="saveData.remark1"  
                                
                                  :readonly='updateFlag'>
                            </td>

                            <td>
                                  <div v-for="(fileName,fileIndex) in saveData.fileName1">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile({no:'fileName1',type:'filePath1'},fileIndex)"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(saveData.filePath1[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                  
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'fileName1',type:'filePath1'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-title">2、其他特殊补申请事项*</td>
                            <td>
                                 <input type="text" v-model="saveData.money2" style='text-align:right;'
                                  @keydown="handleInput2"
                                   onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                                  :readonly='updateFlag'>
                            </td>
                            <td>
                                 <input type="text" v-model="saveData.remark2"  :readonly='updateFlag'>
                            </td>

                            <td>
                                  <div v-for="(fileName,fileIndex) in saveData.fileName2">
                                {{fileName}}
                                <Icon type="md-close"
                                      @click="delFile({no:'fileName2',type:'filePath2'},fileIndex)"
                                      v-if="!updateFlag"
                                      style="cursor:pointer;fontSize:20px"/>

                                <Icon type="ios-cloud-download"
                                      @click="downloadFile(saveData.filePath2[fileIndex],fileName)"
                                      style="cursor:pointer;fontSize:20px"/>
                            </div>
                            <Upload :action=$axios.uploadPath()
                                    :on-success="onSuccess"
                                   
                                    multiple
                                    :show-upload-list="false"
                                    :data="{no:'fileName2',type:'filePath2'}"
                                    v-if="!updateFlag">
                                <div class="upload">
                                    <i class="iconshangchuan"></i>
                                </div>
                            </Upload>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-title">合计</td>
                            <td>
                                <input style='text-align:right' type="text" v-model="hj" readonly>
                            </td>
                            <td></td>

                            <td></td>
                        </tr>

                    </table>
                </div>
                 <div class="funding-auditMsg"
                        style="font-size:14px;height:30px;margin:0 auto;margin-top:5px;width:95%;display:flex;flex-direction:row;justify-content:space-between">
                        <div>
                            <label>填表人：</label> <input type="text"
                                                    v-model="saveData.auditSubmitter"
                                                    :readonly="updateFlag"
                                                    style="border:0;border-bottom:1px solid #000;">
                        </div>
                    
                        <div>
                            <label>填表日期：</label><span style="width:100px">{{saveData.auditDate |time}}</span>
                        </div>
                    </div>
                    <ul id="funding-app-remarks">
                        <li>备注：其他特殊补申请事项*是指因不可抗力导致行程变化产生的住宿、伙食及公杂费用等。</li>
                        
                    </ul>
            <div class="funding-table" style="margin-top:5px;">
                <table>
                    <tr>
                        <td class="table-start"
                            colspan="6"
                            style="fontWeight:600">审批情况
                        </td>
                    </tr>
                    <tr>
                        <th class="table-title" >流程节点</th>
                        <th class="table-title" style="width:20%;">审批部门</th>
                        <th class="table-title" style="width:15%;">审批时间</th>
                        <th class="table-title" style="width:15%;">审批人</th>
                        <th class="table-title"
                            style="width:15%;">审批意见
                        </th>
                        <th class="table-title"
                            >备注说明
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
                                                  v-model="th.auditSuggestion"></input>
                    </div>
                    <div class="smBox">
                        <span>说明：</span><input type="text"
                                              v-model="th.auditRemark"></input>
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
    import moment from 'moment';
     import FileSaver from "file-saver";

    export default {
        name: "applySupplement",
        inject: ['reload'],
           data() {
            return {
                applyList:[],
                updateFlag: false,//修改状态
                userInfo: "",
                onSelect: true,
                time: "",
                year: '',
                mouth: '',
                day: '',
                saveData: {
                    fileName1:[],
                    fileName2:[],
                    filePath1:[],
                    filePath2:[],
                    sptFileName:[],
                    sptFilePath:[],
                },
                workStream:[],
                baseData:{

                },
                auditNo:'',
                itemList: [],
                watchFlag:false,
                editorShow:false,
                th:{
                  auditSuggestion:'',
                  auditRemark:'',
                },

            };
        },
        watch:{
            auditNo:function(newVal){
              console.log(this,'sss')
               console.log(this.auditNo,'watch')
                if(this.auditNo != ''&&this.watchFlag){
                    this.$axios.getAudit(this.auditNo).then(res=>{
                        console.log(res,'auditNo详情')
                        this.baseData = res.data.data;
                        this.baseData.auditFeeSum = (this.baseData.auditFeeSum).toFixed(2)
                        this.baseData.auditPjh = this.baseData.auditPjh1 + ' ['+ this.baseData.auditPjhYear + '] '+ this.baseData.auditPjh2
                        this.baseData.groupDepartDate = this.timeChange(this.baseData.groupDepartDate);
                        
                    })
                }
            }
        },
     
        methods: {
            onSuccess(response, file, data){
                console.log(response,data)    
                  
                this.saveData[response.data.no] = this.saveData[response.data.no]?this.saveData[response.data.no].concat(response.data.nameList):[].concat(response.data.nameList);
                this.saveData[response.data.type] = this.saveData[response.data.type]?this.saveData[response.data.type].concat(response.data.pathList):[].concat(response.data.pathList);               
                console.log(this.saveData,'233')
            },

          
            downloadFile(filePath, fileName) {
                FileSaver.saveAs(this.$axios.downloadPath() + filePath, fileName);
            },
            // 删除上传文件
              delFile(data, fileIndex) {
              
                 this.saveData[data.no].splice(fileIndex, 1)
                 this.saveData[data.type].splice(fileIndex, 1)
                
            },
              handleInput2(e) {

                if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
                    //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
                    return
                }
                // 通过正则过滤小数点后两位
                if (e.keyCode != 9) {
                    if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0])) {
                        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
                    }                }
            },
            dayin() {
                console.log('dayin')
                window.open(this.$axios.print() + '?reportlet=bsq' + this.$axios.printCs() + '.cpt&auditSptNo=' + this.$store.state.applySupNo.applyNo)
            },
            //报文单
            bwd() {
                window.open(this.$axios.print() + '?reportlet=bwd_bsq' + this.$axios.printCs() + '.cpt&auditSptNo=' + this.$store.state.applySupNo.applyNo)
            },
            update() {
                this.updateFlag = false;
                this.$Message.info('开始修改');


            },
       
          
              timeChange(date){
                if (!date) return '';

                date = date.toString().substring(0, 10)
                return date
            },
            applySupGet(obj) {
                this.$axios.getApplySupAuditSpt(obj).then(res=>{
                 this.saveData  = this.fileToArr( res.data.data.auditSpt,[{fileName:"fileName1",filePath:"filePath1"},{fileName:"fileName2",filePath:"filePath2"},{fileName:"sptFileName",filePath:"sptFilePath"}])
                this.workStream = res.data.data.workStream;
                
                    console.log(this.saveData,'applySup')
                })

            },
            //退回显示
            showEditor() {
                this.editorShow = true;
            },
            hideEditor() {
                this.editorShow = false;
            },
            quit(){
                let obj = {
                    auditNo: this.saveData.auditSptNo,
                    auditDep: this.$store.state.info.departName,
                    auditDepCode: this.$store.state.info.departCode,
                    auditSuggestion: this.th.auditSuggestion,
                    auditRemark: this.th.auditRemark,
                    auditAuditer: this.$store.state.info.userNick,
                    auditUserId: this.$store.state.info.userId
                }
                 this.$axios.backApplySupAuditSpt(obj).then(res=>{
                    console.log(res,'song');
                    if(res.data.ret == 1){
                      this.$Message.success('退回成功');
                     
                    }else{
                      this.$Message.error('退回失败');
                    }
                     this.editorShow = false;
                    this.reload();
                  }
              ) 
            },
            //收回
            withdraw(){
                let data = {
                 auditNo: this.saveData.auditSptNo,
                  auditDep: this.$store.state.info.departName,
                  auditDepCode: this.$store.state.info.departCode,
                  auditAuditer: this.$store.state.info.userNick,
                  auditUserId: this.$store.state.info.userId

              }
              this.$axios.withdrawApplySupAuditSpt(data).then(res=>{
                console.log(res,'song');
                if(res.data.ret == 1){
                   this.$Message.success('收回成功');
                }else{
                   this.$Message.error('收回失败');
                }
                this.reload();
              }
              )
            },

            //送审
            auditNext(){
              let data = {
                 auditNo: this.saveData.auditSptNo,
                  auditDep: this.$store.state.info.departName,
                  auditDepCode: this.$store.state.info.departCode,
                  auditAuditer: this.$store.state.info.userNick,
                  auditUserId: this.$store.state.info.userId

              }
              this.$axios.checkApplySupAuditSpt(data).then(res=>{
                console.log(res,'song');
                if(res.data.ret == 1){
                   this.$Message.success('送审成功');
                }else{
                   this.$Message.error('送审失败');
                }
                this.reload();
              }
              )
            },

            //删除整个页面
            del() {
                let no = this.$store.state.applySupNo.applyNo;
                let obj = { auditSptNo: no };
                this.$axios.delApplySupAuditSpt(obj).then(res => {
                    if (res.data.ret == 1) {
                        this.$Message.success('删除成功');
                        this.$store.commit('saveApplySupNo', {});
                        let options = this.$store.state.options;
                        let tab = this.$store.state.tab;
                        // 删除页签 去除缓存
                        let obj1 = [];
                        let obj2 = [];
                        obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
                        obj1.forEach((item, i) => {

                            if (item.route != '/funding/applySupplement') {
                                obj2.push(item)
                            }
                        })
                        this.$store.commit('add_includeOptions', obj2);
                        for (let i = 0; i < options.length; i++) {
                            if (tab == options[i].route) {
                                console.log(i)
                                options.splice(i, 1);
                                this.$router.push({ path: options[options.length - 1].route });
                            }
                        }
                    } else {
                        this.$Message.error(res.data.retMsg);
                    }
                })

            },
               //把fileName filePath 转换成数组
            fileToArr(data,fileNamePath) {
                var val = JSON.parse(JSON.stringify(data))
               fileNamePath.forEach(item=>{
                    if (val[item.fileName] == '' || val[item.fileName] == null) {
                        val[item.fileName] = []
                        val[item.filePath] = []
                    } else {
                        
                        val[item.fileName] = val[item.fileName].split(',')
                        val[item.filePath] = val[item.filePath].split(',')
                    }
               })
                   
              
                return val
            },
            //把fileName filePath 转换回字符串
            fileToString(data,fileNamePath) {
                var result = JSON.parse(JSON.stringify(data));
                console.log(result)
                 fileNamePath.forEach(item=>{
                   if(result[item.fileName]){
                       result[item.fileName] = result[item.fileName].join(',')
                   }
                   if( result[item.filePath]){
                       result[item.filePath] = result[item.filePath].join(',')
                   }
                   
                   
                 })
                
               
                // console.log(result)
                return result
            },
               // 校验
           test(data){
              if(!data.auditNo){
                    this.$Message.warning('请选择正式申请表编号')
                    return false;
                }
                if(!data.auditSubmitter){
                    this.$Message.warning('请填写填表人')
                    return false;

                }
                  if(!data.sptFileName|| !data.sptFilePath){
                    this.$Message.warning('请上传补申请表盖章文件')
                    return false;
                }else{
                  return true;
                }
           },
            //保存
            applySupAdd(data) {
            
               if(!this.test(data)){
                 return false;
               }else{
                 console.log(122)
                    this.$axios.addApplySupAuditSpt(data).then(res=>{
                    console.log(res,'333')
                    if(res.data.ret == 1){
                        this.$message.success('新增成功');
                        let obj = {auditNo:res.data.data.auditNo,applyNo:res.data.data.auditSptNo}
                         this.$store.commit('saveApplySupNo', obj);
                        this.updateFlag = true;
                    }else{
                        this.$message.error('新增失败')
                    }
                    this.reload();
                })
               }
            },
            // 保存
            usSave() {
               
              this.saveData.auditNo = this.auditNo;             
              let saveData  = this.fileToString(this.saveData,[{fileName:"fileName1",filePath:"filePath1"},{fileName:"fileName2",filePath:"filePath2"},{fileName:"sptFileName",filePath:"sptFilePath"}])
              console.log(saveData,'usSave')
              this.applySupAdd(saveData);
              

            },
            //修改后保存
            usSave2() {
               
                let saveData  = this.fileToString(this.saveData,[{fileName:"fileName1",filePath:"filePath1"},{fileName:"fileName2",filePath:"filePath2"},{fileName:"sptFileName",filePath:"sptFilePath"}])
                saveData.auditSptNo = this.$store.state.applySupNo.applyNo;
                if(!this.test(saveData)){
                 return false;
               }
                console.log(saveData,'233')
                this.$axios.upDateApplySupAuditSpt(saveData).then(res => {
                    console.log(res,'3333')
                    if (res.data.ret == 1) {
                        this.updateFlag = true;
                        this.$Message.success('修改成功');
                        let obj = {auditNo:res.data.data.auditNo,applyNo:res.data.data.auditSptNo}
                         this.$store.commit('saveApplySupNo', obj);
                       
                    } else {
                        this.$Message.error('修改失败');
                    }
                    this.reload();
                })


            },
            getListDetailed(data){

                 this.$axios.getListDetailed2(data).then(res => {
                    console.log(res, 'resss');
                    if (res.data.ret === 1) {
                        this.applyList = [];
                        res.data.data.list.forEach(item=>{
                            this.applyList.push({name:item.AUDIT_NO,value:item.AUDIT_NO});
                        
                        })
                    }
                    console.log(this.applyList,'applyList')
            })
            },
            

        },
        computed: {
            hj(){
                console.log(this.saveData,233)
                this.saveData.sumMoney = (Number(this.saveData.money1?this.saveData.money1:0) + Number(this.saveData.money2?this.saveData.money2:0)).toFixed(2);
                return this.saveData.sumMoney;
            }
        },
        filters: {
            // 过滤时间器

            time: function (value, formatString) {
                formatString = formatString || "YYYY-MM-DD";
                return moment(value).format(formatString);

            },
        },
        mounted() {
            let no = this.$store.state.applySupNo;

            console.log(no,'moooo')
            if (!no.applyNo) {
                this.watchFlag = true;
                this.updateFlag = false;
                this.saveData.auditDate =  Date.parse(new Date());
                let obj = {};
                obj.userAuditType = this.$store.state.info.userAuditType;
                let data = `userAuditType=${obj.userAuditType}&row=${1000}&auditType=3&auditStatusArray=7`
                this.getListDetailed(data);
            } else {
                this.watchFlag = true;
                console.log(no.auditNo,'audit')
                this.updateFlag = true;
                this.applyList = [{"value":no.auditNo,"name":no.auditNo}];
                this.auditNo = no.auditNo;
                console.log(no.applyNo,'233')
                
                let obj = { auditSptNo: no.applyNo };
            
                this.applySupGet(obj);

            }
        },
     
    };
</script>
<style scoped>
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
        width: 280px;
        height: 30px;
        margin-top: 60px;
    }

    .editor-main .smBox {
        margin: 0 auto;
        width: 280px;
        height: 30px;
        margin-top: 10px;
    }

    .spBox span,
    .smBox span {
        float: left;
        width: 86px;
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
        .tabTop{
          display: flex;
          justify-content:space-between;
        }

        .funding-input {
          font-size: 14px;
          display:flex;
          align-items: center;
          float: left;

          select {
            outline: none;
          
            margin: 3px 6px;
          
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
            .fundingTableMain{
               td:first-child {
              width: 20%;
            }
            td:nth-child(3) {
              width: 30%;
            }
            }
           
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
              &.table-gray{
                background:rgb(235, 235, 228);
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
