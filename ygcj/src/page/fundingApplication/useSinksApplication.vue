<!--用汇预算申报表-->
<template>
  <div id="funding-useSinks">
    <div class="funding-buttom" style="position:fixed;top:115px;right:20px;">
      <!-- <span><i class="iconxiugai"></i>修改</span> -->
      <span @click="usSave" v-if="!$store.state.forexSqNo">
        <i class="iconbaocun"></i>保存
      </span>
      <span @click="usSave2"
            v-if="$store.state.forexSqNo && !updateFlag">
                <i class="iconbaocun"></i>保存
            </span>
      <span @click="update"
            v-if="$store.state.forexSqNo && updateFlag">
                <i class="iconbaocun"></i>修改
            </span>
      <span @click="del"
            v-if="$store.state.forexSqNo && updateFlag">
                <i class="iconbaocun"></i>删除
            </span>

      <!-- <span>
        <i class="iconshenpi"></i>送审
      </span>-->
      <!-- <span><i class="iconshenhe"></i>审核</span>
      <span><i class="icontuihui"></i>退回</span>-->
      <span v-if="$store.state.forexSqNo && updateFlag" @click="dayin">
        <i class="icondayin"></i>打印
      </span>
    </div>
    <div id="funding-a">
      <span class="title">非贸易非经营性用汇预算申报表</span>
      <div class="cut"></div>
      <div class="funding-input underline">
        经：
        <input style="width:180px;text-align:center;"
               :readonly="updateFlag"
               v-model="saveTitle.pzCompany">批准，
        <input style="width:180px;  text-align:center;"
               :readonly="updateFlag"
               v-model="saveTitle.groupName">代表团（组）
        <input style="width:40px;  text-align:center;"
               :readonly="updateFlag"
               v-model="saveTitle.capacity"
               type="number"
               onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">人，赴
        <input style="width:180px;  text-align:center;"
               :readonly="updateFlag"
               v-model="saveTitle.destination">国（地区），
        <input style="width:35px;  text-align:center;"
               :readonly="updateFlag"
               v-model="saveTitle.tripdays"
               type="number"
               onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">天
      </div>
      <div class="funding-input underline">
        预计出国日期&nbsp;&nbsp;&nbsp;&nbsp;
        <input style="width:50px;  text-align:center;"
               v-model="year"
               :readonly="updateFlag"
               type="number"
               oninput="if(value.length>4)value=value.slice(0,4)">年
        <input style="width:50px;  text-align:center;"
               v-model="mouth"
               :readonly="updateFlag"
               type="number"
               oninput="if(value.length>2)value=value.slice(0,2)">月
        <input style="width:50px;  text-align:center;"
               v-model="day"
               :readonly="updateFlag"
               type="number"
               oninput="if(value.length>2)value=value.slice(0,2)">日
      </div>
      <div class="funding-input underline"
           style="clear: both;">
        现申请使用外汇
        <input style="width:300px;  text-align:center;"
               v-model="saveTitle.forexMoney"
               :readonly="updateFlag"

               type="text">
      </div>
      <h3>预算申报如下:</h3>
      <div class="funding-input"
           style="clear: both;margin-bottom:5px;">
        申请单位：
        <input style="width:300px"
               v-model="saveTitle.company"
               readonly>
        填报人：
        <input style="width:150px;border-bottom:1px solid #000;margin-right:50px;"
               :readonly="updateFlag"
               v-model="saveTitle.submitter"
               >
        电话：
        <input style="width:180px;border:0;border-bottom:1px solid #000;margin-right:50px;"
               :readonly="updateFlag"
               @blur="checkPhone(saveTitle.tel)"
               v-model="saveTitle.tel"
               >
        填报日期：
        <p style="width:150px ;display:inline-block">{{time1 | time}}</p>

        <!-- <input style="width:150px" v-model="time"> -->
      </div>
      <div class="funding-table">
        <table class="fundingTabMain">
          <tr>
            <td class="table-start tabS1">
              <div class = 'w100'>
                <span class="s1">项目</span>

                <span class="s2"> 币种</span>
              </div>

            </td>
            <td class="table-start">
              <select style="width:240px;" v-model="saveTitle.currency1" :disabled="updateFlag">

                <option v-for="(item, index) in classSelect"
                        :key="index"
                        :value="item.value">{{item.name}}</option>
              </select>

            </td>
            <td class="table-start">
              <select style="width:240px;" v-model="saveTitle.currency2" :disabled="updateFlag">

                <option v-for="(item, index) in classSelect"
                        :key="index"
                        :value="item.value">{{item.name}}</option>
              </select>
            </td>
            <td class="table-start">
              <select style="width:240px;" v-model="saveTitle.currency3" :disabled="updateFlag">

                <option v-for="(item, index) in classSelect"
                        :key="index"
                        :value="item.value">{{item.name}}</option>
              </select>
            </td>
            <td class="table-start">
              <div>备注</div>
            </td>
          </tr>

          <tr v-for="(item,index) in saveTitle.forexSqSub"
              v-if="index < 4">
            <td class="table-title">
              <div>{{saveTitle.forexSqSub[index].project}}</div>
            </td>
            <td>
              <input type="number" :readonly="updateFlag" @keydown="handleInput2"
                     onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                     v-model="saveTitle.forexSqSub[index].money1">
            </td>
            <td>
              <div>
                <input type="number" :readonly="updateFlag" @keydown="handleInput2"
                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                       v-model="saveTitle.forexSqSub[index].money2">
              </div>
            </td>
            <td>
              <div class="fileUp">
                <input type="number" :readonly="updateFlag" @keydown="handleInput2"
                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                       v-model="saveTitle.forexSqSub[index].money3">
              </div>

              <!-- <input type="text" v-model="saveTitle.forexSqSub[index].fileName"> -->
            </td>
            <td>
              <div>
                <input type="text" :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].remark">
              </div>
            </td>
          </tr>

          <!-- // 删除预算申报的项目 -->
          <tr v-for="(item,index) in saveTitle.forexSqSub"
              v-if="index>3">
            <td class="table-title">
              <div>
                <input @click="delProject($event,index)"
                       class="tDel-btn table-del">
                <input type="text"
                       class="tDel-int"
                       :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].project"
                       placeholder="请输入项目名称">
              </div>
            </td>
            <td>
              <div>
                <input type="number" @keydown="handleInput2"
                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                       :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].money1">
              </div>
            </td>
            <td>
              <div>
                <input type="number" @keydown="handleInput2"
                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                       :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].money2">
              </div>
            </td>
            <td>
              <div class="fileUp">
                <input type="number" @keydown="handleInput2"
                       onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"

                       :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].money3">
              </div>
            </td>
            <td>
              <div>
                <input type="text"
                       :readonly="updateFlag"
                       v-model="saveTitle.forexSqSub[index].remark">
              </div>
            </td>
          </tr>

          <tr v-if="!updateFlag">
            <td class="table-title"
                @click="addProject">
              <div>
                <input type="text"
                       class="table-add"
                       value="增加"
                       readonly>
              </div>
            </td>
            <td>
              <div>
                <input type="text"
                       readonly>
              </div>
            </td>
            <td>
              <div>
                <input type="text"
                       readonly>
              </div>
            </td>
            <td>
              <div>
                <input type="text"
                       readonly>
              </div>
            </td>
            <td>
              <div>
                <input type="text"
                       readonly>
              </div>
            </td>
          </tr>

          <tr>
            <td>合计</td>
            <td>
              <input type="number" v-model="moneySum1"
                     readonly>

            </td>
            <td>
              <input type="number" v-model="moneySum2"
                     readonly>

            </td>
            <td>
              <input type="number" v-model="moneySum3"
                     readonly>

            </td>
            <td></td>
          </tr>

        </table>
      </div>


    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import FileSaver from "file-saver";
  export default {
    name: "userSinks",
    inject: ['reload'],
    methods: {
      //电话校验
      checkPhone(data) {
        if (data.length == '8' || data.length == '11') {

        } else {

          this.$Message.warning('电话号码格式有误');
          this.saveTitle.tel = '';
        }
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
          }
        }


      },
      dayin() {
        console.log('dayin')
        window.open(this.$axios.print() + '?reportlet=yhsq'+ this.$axios.printCs()+'.cpt&forexSqNo=' + this.$store.state.forexSqNo)
      },
      del(){
        let obj = { forexSqNo:this.$store.state.forexSqNo};
        this.$axios.delForexsq(obj).then(res=>{
          if(res.data.ret == 1){
            this.$Message.success(res.data.retMsg);
            let options = this.$store.state.options;
            let tab = this.$store.state.tab;
            // 删除 页签 去除缓存
            let obj1 = [];
            let obj2 = [];
            obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
            obj1.forEach((item,i)=>{

              if(item.route != '/funding/userSinks'){
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
          }else{
            this.$Message.error(res.data.retMsg)
          }

          console.log(res,555)
        })
      },
      update(){
        this.updateFlag = false;
        this.$Message.info('开始修改')
      },
      onRemove() { },
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
      //把fileName filePath 转换成数组
      fileToArr(data) {
        console.log(data)
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
      //删除上传文件
      delFile(rowIndex, fileIndex) {
        this.defaultList[rowIndex].fileName.splice(fileIndex, 1);
        this.defaultList[rowIndex].filePath.splice(fileIndex, 1);

      },
      // 下载上传文件
      downloadFile(filePath) {
        FileSaver.saveAs(this.$axios.downloadPath() + filePath);
      },
      //点击上传的文件下载
      onProgress(event, file, fileList) {
        console.log(event);
      },
      //点击上传文件
      onSuccess(response, file, data) {
        this.saveTitle.forexSqSub[response.data.no].fileName = this.saveTitle.forexSqSub[response.data.no].fileName.concat(response.data.nameList)
        this.saveTitle.forexSqSub[response.data.no].filePath = this.saveTitle.forexSqSub[response.data.no].filePath.concat(response.data.pathList)
      },
      // 点击保存
      usSave() {
        //连接的时间

        console.log(this.saveTitle)
        let saveData = {
          forexSqSub: this.saveTitle.forexSqSub,

          company: this.saveTitle.company,
          submitter: this.saveTitle.submitter,
          tel: this.saveTitle.tel,
          submitDate: this.saveTitle.submitDate,
          pzCompany: this.saveTitle.pzCompany,
          groupName: this.saveTitle.groupName,
          capacity: this.saveTitle.capacity,
          destination: this.saveTitle.destination,
          tripdays: this.saveTitle.tripdays,
          departDate: this.saveTitle.departDate,
          forexMoney: this.saveTitle.forexMoney,

          moneySum1: this.moneySum1,
          moneySum2: this.moneySum2,
          moneySum3: this.moneySum3,
          forexStatus: "1",

          currency1:this.saveTitle.currency1,
          currency2:this.saveTitle.currency2,
          currency3:this.saveTitle.currency3,

          userId:this.$store.state.info.userId,
          depCode:this.$store.state.info.departCode,


        }
        for(let j=0;j<saveData.forexSqSub.length;j++){
          if(saveData.forexSqSub[j].project == ''){
              saveData.forexSqSub.splice(j,1);
          }
        }
        console.log(saveData.forexSqSub,'5555555')
        if (Number(this.mouth) < 10 && this.mouth != "") {
          this.mouth = "0" + Number(this.mouth);
        }
        if (Number(this.day) < 10 && this.day != "") {
          this.day = "0" + Number(this.day);
        }
        // 出国日期填写校验
        if(this.year == '' || this.mouth == '' || this.day == ''){
          this.$Message.warning('请填写预计出国日期');
          return false;
        }
        if(this.saveTitle.submitter == ''){
          this.$Message.warning('请填写填报人信息');
          return false;
        }
        let departDate = this.year + "-" + this.mouth + "-" + this.day;
        saveData.departDate = departDate;
        //   console.log(this.saveTitle);
        console.log(saveData, 11);
        this.$axios.addForexsq(saveData).then(res => {
          console.log(res,3333);
          if (res.data.ret == 1) {
            console.log(res.data.retMsg);
            this.$store.commit('saveForexSqNo',res.data.data.forexSqNo);
            console.log(this.$store.state.forexSqNo)
            this.$Message.success(res.data.retMsg);
            this.updateFlag = true;
            this.reload();

          } else {
            this.$Message.error(res.data.retMsg);
          }
          this.reload();
        });
      },
   //点击修改后的保持
      usSave2(){
        this.updateFlag = true;
        //连接的时间

        let saveData = {
          forexSqSub: this.fileToString(this.saveTitle.forexSqSub),
          // forexStatus: "1",
          company: this.saveTitle.company,
          submitter: this.saveTitle.submitter,
          tel: this.saveTitle.tel,
          submitDate: this.saveTitle.submitDate,
          pzCompany: this.saveTitle.pzCompany,
          groupName: this.saveTitle.groupName,
          capacity: this.saveTitle.capacity,
          destination: this.saveTitle.destination,
          tripdays: this.saveTitle.tripdays,
          departDate: this.saveTitle.departDate,
          forexMoney: this.saveTitle.forexMoney,

          moneySum1: this.moneySum1,
          moneySum2: this.moneySum2,
          moneySum3: this.moneySum3,
          forexStatus: "1",
          forexSqNo:this.$store.state.forexSqNo,

          currency1:this.saveTitle.currency1,
          currency2:this.saveTitle.currency2,
          currency3:this.saveTitle.currency3,
        }
        for(let j=0;j<saveData.forexSqSub.length;j++){
          if(saveData.forexSqSub[j].project == ''){
            saveData.forexSqSub.splice(j,1);
          }
        }
        console.log(saveData.forexSqSub,'5555555')
        if (Number(this.mouth) < 10 && this.mouth != "") {
          this.mouth = "0" + Number(this.mouth);
        }
        if (Number(this.day) < 10 && this.day != "") {
          this.day = "0" + Number(this.day);
        }
        // 出国日期填写校验
        if(this.year == '' || this.mouth == '' || this.day == ''){
          this.$Message.warning('请填写预计出国日期');
          return false;
        }
        if(this.saveTitle.submitter == ''){
          this.$Message.warning('请填写填报人信息');
          return false;
        }
        let departDate = this.year + "-" + this.mouth + "-" + this.day;
        saveData.departDate = departDate;
        //   console.log(this.saveTitle);
        console.log(saveData, 11);
        this.$axios.updateForexsq(saveData).then(res => {
          console.log(res,3333);
          if (res.data.ret == 1) {
            console.log(res.data.retMsg);
            this.$store.commit('saveForexSqNo',res.data.data.forexSqNo);
            this.updateFlag = true;
            this.$Message.success(res.data.retMsg);
            this.reload();
          } else {
            this.$Message.error(res.data.retMsg);
          }
          this.reload();
        });

      },
      // 添加预算申报的项目
      addProject() {
        console.log(1);
        console.log(this.saveTitle.forexSqSub.length, 4);
        let i = this.saveTitle.forexSqSub.length + 1;
        i = i + "";
        let obj = {
          no: i,
          currency: "",
          money: "",
          fileName: [],
          filePath: [],
          remark: "",
          project: ""
        };
        this.saveTitle.forexSqSub.push(obj);

        //    console.log(this.saveTitle.forexSqSub,2);
        // 删除预算申报的项目
      },
      delProject(e, index) {
        console.log(index, "del");

        this.saveTitle.forexSqSub.splice(index, 1);
        console.log(this.saveTitle.forexSqSub);
      }
    },
    //计算属性
    computed: {
      moneySum1:function () {
        let sum = 0;
        this.saveTitle.forexSqSub.forEach(item=>{
          if(item.money1){
            sum += Number(item.money1)
          }

        })
        return sum.toFixed(2);
      },
      moneySum2:function () {
        let sum = 0;
        this.saveTitle.forexSqSub.forEach(item=>{
          if(item.money2){
            sum += Number(item.money2)
          }

        })
        return sum.toFixed(2);
      },
      moneySum3:function () {
        let sum = 0;
        this.saveTitle.forexSqSub.forEach(item=>{
          if(item.money3){
            sum += Number(item.money3)
          }

        })
        return sum.toFixed(2);
      }
    },
    mounted() {
      // console.log(this.$store.state.forexSqNo, 11);
      console.log('44444')
      let no = this.$store.state.forexSqNo;
      if (no == "") {
        this.updateFlag = false;
        this.userInfo = this.$store.state.info;
        this.saveTitle.company = this.userInfo.companyName;
        this.time1 = Date.parse(new Date());
        this.saveTitle.submitDate = this.time1.toString();
        this.addProject();

      } else {
        this.updateFlag = true;
        this.$axios.getForexsq(no).then(res => {
          console.log(res.data, 3345);
          if (res.data.ret == 1) {
            this.saveTitle = res.data.data;
            // this.year = res.data.data.departDate;
            let arr = res.data.data.departDate;
            console.log(arr, "split");
            arr = arr.split(" ");
            arr = arr[0].split("-");
            // console.log(arr, 1);
            this.year = arr[0];
            this.mouth = arr[1];
            this.day = arr[2];
            this.time1 = res.data.data.submitDate;
            // 拿到 文件 名和地址的集合
            let files = res.data.data.forexSqSub;
            this.saveTitle.forexSqSub = this.fileToArr(res.data.data.forexSqSub);
console.log(this.saveTitle.forexSqSub,3344)
            // console.log(this.defaultList, "defaultList");
            // console.log(this.time);
          } else {
            this.$Message();
          }
        });
      }
    },

    filters: {
      // 过滤时间器
      formDate: function (value, index) {
        let str = value;
        str = str.split("-");
        return str[index];
      },
      time: function (value, formatString) {
        formatString = formatString || "YYYY-MM-DD";
        return moment(value).format(formatString);
      }
    },
    data() {
      return {
        // moneySum:'', // 资金合计
        updateFlag:true,//修改状态
        onSelect: true,
        userInfo: "",
        time1: "",
        year: "",
        mouth: "",
        day: "",
        imgSrc: "",
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
            value: "港币",
            name:'港币'
          },
          {
            value: "欧元",
            name:'欧元'
          }

        ],
        saveTitle: {
          forexSqSub: [
            {
              no: "1",
              money1: "",
              money2:'',
              money3:'',
              remark: "",
              project: "住宿费"
            },
            {

              no: "2",
              money1: "",
              money2:'',
              money3:'',
              remark: "",
              project: "伙食费"
            },
            {

              no: "3",
              money1: "",
              money2:'',
              money3:'',
              remark: "",
              project: "公杂费"
            },
            {

              no: "4",
              money1: "",
              money2:'',
              money3:'',
              remark: "",
              project: "城市间交通费"
            }
          ],
          currency1:'',
          currency2:'',
          currency3:'',
          company: "",
          submitter: "",
          tel: "",
          submitDate: "",
          pzCompany: "",
          groupName: "",
          capacity: "",
          destination: "",
          tripdays: "",
          departDate: "",
          forexMoney: "",
          moneySum: "",
          forexStatus: "1",
          forexSqNo: ''
        }
      };
    }
  };
</script>
<style scope>
  .fundingTabMain tr td div {
    width: 246px;
  }
  .fundingTabMain tr td:first-child div {
    width: 193px;
  }
  select {
    background: url("../../assets/image/下拉.png") no-repeat 220px center;
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
  .fileUp {
    position: relative;
  }

  .fileUp2 {
    width: 240px;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
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
          margin-bottom: 15px;
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
            padding: 6px 8px;
            margin: 10px 0 6px 0;
            background: #4b98de;
            border: none;

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
            padding: 7px 0px;
            text-align: center;
            border: 1px solid #4b98de;

            &.table-title {
              // background: #c2e8ff;

              text-align: center;
              border: 1px solid #4b98de;

              &.super {
                color: #000;
                background: #94d5fb;
              }
              .tDel-btn {
                width: 40px;
                height: 20px;
                text-align: center;
                // margin-left:100px;
              }

              .table-add {
                width: 100px;
                height: 21px;
                text-align: center;
                margin-left: 10px;
                cursor: pointer;
                background: url("../../assets/image/加号.png") no-repeat 10px;
              }
              .table-del {
                background: url("../../assets/image/减少.png") no-repeat 10px;
                margin-left: 10px;
                cursor: pointer;
              }
              .tDel-int {
                width: 100px;
                text-align: left;
                // margin-left: 20px;
              }
            }

            &.tabS1{
              padding:0;
            }
            &.table-start {
              background: #67bef3;
              border: 1px solid #4b98de;
              color: #000;
              line-height: 20px;
              font-size: 14px;
              .w100{
                border-top:34px #67bef3 solid;/*上边框宽度等于表格第一行行高*/
                width:0px;/*让容器宽度为0*/
                height:0px;/*让容器高度为0*/
                border-left:194px #fff solid;/*左边框宽度等于表格第一行第一格宽度*/
                position:relative;
                .s1{
                  position: absolute;
                  display:inline-block;
                  width:28px;
                  right: 123px;
                  color:#000;
                  top: -22px;
                }
                .s2{
                  display:inline-block;
                  width:28px;
                  position: absolute;
                  color:#000;
                  left: -63px;
                  top: -35px;
                }

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
                ime-mode:disabled;
                // background: #fbffe8;
              }
              &[type="text"] {
                text-align: center;
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
              text-align-last: center;

              cursor: pointer;
              appearance: none;
              -moz-appearance: none;
              -webkit-appearance: none;
              background-size: 10px 10px;

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
