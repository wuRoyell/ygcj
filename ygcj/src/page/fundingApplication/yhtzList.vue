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
        <Col span="4"
             style="margin-left:30px;min-width:250px">
        {{tableWidth}}
        时间：
        <DatePicker type="daterange"
                    :start-date="new Date(1991, 4, 14)"
                    placement="bottom-start"
                    placeholder="请选择时间范围"
                    style="width: 200px"></DatePicker>
        </Col>
        <Col span="4"
             style="min-width:250px">
        部门：
        <Select v-model="depart"
                style="width:200px">
          <Option v-for="item in department"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="4"
             style="min-width:250px">
        币种：
        <Select v-model="curr"
                style="width:200px">
          <Option v-for="item in currency"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="4"
             style="min-width:250px">
        类型：
        <Select v-model="lx"
                style="width:200px">
          <option value="0">全部</option>
          <Option v-for="item in type"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>

        <Col span="4"
             style="float:right;margin-right:50px;">
        <Button style="float:right"
                type="primary"
                icon="ios-search">查询</Button>
        </Col>
      </Row>
      <!-- {{checkList}} -->
      <Button type="primary"
              style="float:right;margin:12px"
              @click="checkA">重置</Button>
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
      <tabDragYh v-if="flag"
               @mainChange="mainC($event)"
               :titleData="titleData"
               :pageNum="pageNum"
               :mainData="mainData"
               :sele="sele"></tabDragYh>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ["reload"],
    computed: {
      tableWidth: function () {
        return this.a;
      }
    },
    methods: {

      // 接收组件信息，改变传入的值
      mainC(msg) {
        // console.log(msg,222)
        this.mainData = msg;
        
      },
      ckChang(val, index) {
        this.titleData.forEach((item, index) => {
          if (item.title == val) {
            item.ifc = !item.ifc;
          }
          
        });
        console.log(this.titleData,'data')
      },
      checkA() {
        this.titleData.forEach((item, index) => {
          item.ifc = true;
        });
        this.checkList = this.checkData;
        console.log(this.checkList,this.checkData,'checka')
        if(localStorage.getItem(id + 'yhtz') != undefined){
          localStorage.removeItem(id+'yhtz')
        }
        this.reload()
      
      },
      yhtzGetList(obj){
        this.$axios.yhtzGetList(obj).then(res=>{
          console.log(res.data,'55555')
          if (res.data.ret == 1) {
            this.loading = false;
            console.log(1);

            this.mainData = res.data.data.list;
            // console.log(res.data.data.pageInfo, "1");
            this.pageNum = res.data.data.pageInfo.count;
            // console.log(this.pageInfo, 11);
            this.flag = true;
          } else {
            this.$Message.error("查询出错");
          }
        })
      },
      //页面刚进来默认加载
      firstLoad() {
        let data = { page: 1, row: 10 };
        this.loading = true;
       this.yhtzGetList(data);
      }
    },
    created: function () {
      //页面刚进来默认加载
      this.firstLoad();

    },
    mounted: function () {
      let id = this.$store.state.info.userId;
      if(JSON.parse(localStorage.getItem(id+'yhtz')) != undefined){
        this.titleData = JSON.parse(localStorage.getItem(id+'yhtz'));
      }
      console.log(23)  
        this.titleData.forEach((item, index) => {
          if (item.ifc) {
            this.checkList.push(item.title);
          }
          this.checkData.push(item.title);
        });
        console.log(this.titleData,'2data')
     
    },
    data() {
      return {
        loading:false,
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
            value: 0,
            label: "人民币"
          },
          {
            value: 1,
            label: "美元"
          },
          {
            value: 2,
            label: "欧元"
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
            title: "顺序号",
            name: "yhtzNo",
            width: 294,
            color: "#fff",
            ifc: true
          },
          {
            title: "用汇项目",
            name: "yhtzProject",
            width: 294,
            color: "#fff",
            ifc: true
          },
          {
            title: "金额",
            name: "yhtzMoney",
            width: 194,
            color: "#fff",
            ifc: true
          },
          {
            title: "币种",
            name: "yhtzCurrency",
            width: 132,
            color: "#fff",
            ifc: true
          },
          {
            title: "折合人民币数",
            name: "yhtzRmbMoney",
            width: 320,
            color: "#fff",
            ifc: true
          },
        ],
        mainData: [], //查询的数组
        pageNum: "" //查询的信息
      };
    }
  };
</script>

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
