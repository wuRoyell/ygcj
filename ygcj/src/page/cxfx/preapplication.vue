<template>
  <div id="foreignQuery">
    <div id="funding-a">
      <Row>
        <Col span="4" style="margin-left:30px;">
          <div style="display:flex">
            <span style="width:190px;line-height:30px;">单位编号:</span>
            <Input v-model="unitId" placeholder="请填写单位编号" style="width: 300px"/>
          </div>
        </Col>
        <Col span="4">
          <div style="display:flex;margin-left:40px;">
            <span style="width:190px;line-height:30px;">填报人:</span>
            <Input v-model="applicate" placeholder="请填写填报人" style="width: 300px"/>
          </div>
        </Col>
        <Col span="4">
          <div style="display:flex;margin-left:40px;">
            <span style="width:90px;line-height:30px;">部门:</span>
            <Input v-model="department" placeholder="请填写部门" style="width: 300px"/>
          </div>
        </Col>
        <Col span="5" style="float:right;margin-right:50px;">
          <Button style="float:right" type="primary" icon="ios-search" >查询</Button>
        </Col>
      </Row>
      <!-- <Button type="primary" style="float:right;margin:12px" @click="checkA">重置</Button> -->

      <Dropdown style="margin: 20px 12px 0 0;float:right">
        <a href="javascript:void(0)">
          <!-- <Button type="primary" style="margin-bottom: 12px;margin-top: -7px;">
            选择表格展示列：
            <Icon type="ios-arrow-down"></Icon>
          </Button>-->
        </a>
        <DropdownMenu slot="list">
          <CheckboxGroup v-model="checkList">
            <Checkbox
              style="float: left;clear: both;line-height: 30px;padding:0 12px;"
              v-for="(item,index) in checkData"
              :key="index"
              :label="item"
              vertical
              @click.native="ckChang(item,index)"
            >
              <span @click="ckChang(item,index)">{{item}}</span>
            </Checkbox>
          </CheckboxGroup> 
        </DropdownMenu>
      </Dropdown>

      <div
        id="index"
        v-on:mouseup="mouseup"
        :class="ifGo?'no-select-text':null"
        v-on:mousemove="mousemove($event)"
      >
        <div class="funding-table">
          <Table :columns="columns1" style="width:100%" :data="mainData" border height="600"></Table>
        </div>
        <!-- 底部应用 -->
        <Affix>
          <div class="tableFoot">
            <!-- 左边内容 -->
            <div class="tableFootLeft">
              <!-- 下拉选择框 -->
              <Select style="width:80px" v-model="sele" @on-change="footLeft">
                <Option
                  v-for="item in seleList"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
              <span class="division"></span>
              <!-- 左右翻页按钮以及刷新按钮 -->
              <span class="nextPage">
                <img
                  src="../../assets/image/retreatquickly.png"
                  alt
                  width="15px;"
                  @click="firstpage"
                >
                <img src="../../assets/image/shangyiye.png" alt width="15px;" @click="beforePage">
              </span>
              <span class="division"></span>
              <!-- 页码框 -->
              <span class="pagesKuang">
                <input type="text" v-model="pages" style="width:30px;height:24px;">
                /{{pageTotal}}
              </span>
              <span class="division"></span>
              <span class="prevPage">
                <img src="../../assets/image/xiayiye.png" alt width="15px;" @click="nextPage">
                <img src="../../assets/image/forward.png" alt width="15px;" @click="lastPage">
              </span>
              <span class="division"></span>
              <span class="refresh">
                <img src="../../assets/image/shuaxin.png" alt width="15px;">
              </span>
            </div>
            <!-- 右边内容 -->
            <div class="tableFootRight">
              <span>1-{{sele}}</span>
              <span>共{{recordTotal}}条</span>
            </div>
          </div>
        </Affix>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
  methods: {
    //减少页数
    beforePage() {
      if (this.pages > 1) {
        this.pages--;
        this.getListDetailed();
      }
    },
    //增加页数
    nextPage() {
      if (this.pageTotal > this.pages) {
        this.pages++;
        this.getListDetailed();
      }
    },
    //第一页
    firstpage() {
      this.pages = 1;
      this.getListDetailed();
    },
    //最后一页
    lastPage() {
      this.pages = this.pageTotal;
      this.getListDetailed();
    },
    getListDetailed() {
      let auditType = { auditType: 1, row: this.sele, page: this.pages };
      this.$axios.getListDetailed(auditType).then(res => {
        // console.log(res);
        if (res.data.ret === 1) {
          let len = res.data.data.list.length;

          res.data.data.list.forEach((val, index) => {
            val.reportId = index + 1;
          });
          console.log(res.data.data.list);
          this.mainData = res.data.data.list;
          this.recordTotal = res.data.data.recordTotal;
          this.pageTotal = res.data.data.pageTotal;
          // console.log(this.auditlist);
        }
      });
    },
    footLeft() {
      this.getListDetailed();
      // console.log(val);
      // let data = {
      //   data: this.titleData,
      //   router: this.$route.path,
      //   sele: val
      // };
      // this.sele = val;
      // console.log("改变下标");
      // // console.log(data)
      // this.$store.commit("set_tableColor", data);
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
      this.checkList = this.checkData;
    },
    //颜色切换事件
    colorChang(color, title, index) {
      // let data = {
      //     index:index,
      //     color:color,
      //     router:this.$route.path,
      // }
      // this.$store.commit("set_tableColor",data)
    },
    //td鼠标按下事件
    mousedown(index) {
      this.ifGo = true;
      this.starIndex = index;
      this.tdItem = this.titleData[this.starIndex].title;
    },
    //td鼠标经过事件
    mouseenter(index) {
      if (this.ifGo) {
        this.endIndex = index;
      }
    },
    //td鼠标放开事件
    mouseup() {
      if (this.starIndex == -1 || this.endIndex == -1) {
        this.ifGo = false;
        this.cutGo = false;
        return false;
      }
      this.ifGo = false;
      this.cutGo = false;
      let a = this.titleData[this.starIndex];
      this.titleData.splice(this.starIndex, 1);
      this.titleData.splice(this.endIndex, 0, a);
      this.starIndex = -1;
      this.endIndex = -1;
    },
    //td鼠标移动事件
    mousemove(ev) {
      let e = ev || event;
      if (this.ifGo && !this.cutGo) {
        this.sX = e.clientX + 5;
        this.sY = e.clientY - 50;
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      } else if (!this.ifGo && this.cutGo && this.cutIndex != -1) {
        this.titleData[this.cutIndex].width =
          this.tdOldWidth + (e.x - this.oldX);
      }
    },
    //边界鼠标放开事件
    cutSeup(ev) {
      let e = ev || event;
      this.oldX = e.x;
      this.oldWidth = this.$refs.moveTb.rows[0].clientWidth;
      this.cutGo = false;
    },
    //边界鼠标按下事件
    cutDown(index, ev) {
      let e = ev || event;
      this.ifGo = false;
      this.cutGo = true;
      this.cutIndex = index;
      this.oldX = e.x;
      this.oldWidth = this.$refs.moveTb.rows[0].clientWidth;
      this.tdOldWidth = this.titleData[this.cutIndex].width;
    },
    //边界经过事件
    cutSeenter(index) {},
    // 点击全选
    changeState() {},
    changeColor() {
      // alert(11)
    },

    double(e) {
      this.$store.commit(
        "saveAuditNo",
        e.target.parentNode.childNodes[1].innerText
      );
      this.$router.push("/funding/ctdw");
      //   console.log(this.$store.state.getDictRegionTop);
      // console.log(e.target.parentNode.childNodes[1].innerText)
    }
  },
  created() {
    this.getListDetailed();
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
  mounted: function() {},
  data() {
    return {
      //总页数
      pageTotal: "",
      //总条数
      recordTotal: "",
      columns1: [
        {
          title: "序号",
          key: "reportId",
          align: "center",
          width: 150
        },
        {
          title: "预算单位代码",
          key: "AUDIT_NO",
          align: "center",
          width: 150
        },
        {
          title: "预算单位名称",
          key: "AUDIT_COMPANY",
          align: "center",
          width: 150
        },
        {
          title: "出国（境）任务批件文号",
          key: "AUDIT_PJH1",
          align: "center",
          width: 180
        },
        {
          title: "批件下达日期",
          key: "AUDIT_DATE",
          align: "center",
          width: 150
        },
        {
          title: "团组出访日期",
          key: "GROUP_DEPART_DATE",
          align: "center",
          width: 150
        },
        {
          title: "团组名称",
          key: "GROUP_NAME",
          align: "center",
          width: 150
        },
        {
          title: "任务性质",
          key: "GROUP_MISSION",
          align: "center",
          width: 150
        },
        {
          title: "是否列入年初出国计划",
          key: "GROUP_ISYEARPLAN",
          align: "center",
          width: 170
        },
        {
          title: "是否出访“一带一路”沿线国家",
          key: "GROUP_ISBAR",
          align: "center",
          width: 220
        },
        {
          title: "组团单位",
          key: "GROUP_UNIT",
          align: "center",
          width: 150
        },
        {
          title: "出访国家（城市）",
          key: "dq",
          align: "center",
          width: 150
        },
        {
          title: "出访天数（天）",
          key: "GROUP_TRIPDAYS",
          align: "center",
          width: 150
        },
        {
          title: "本单位负担经费人数",
          key: "GROUP_CAPACITY",
          align: "center",
          width: 150
        },
        {
          title: "因公出国（境）经费预算情况（根据经费预申请表生成）",
          align: "AUDIT_FEE_SUM",
          key: "age",
          align: "center",
          children: [
            {
              title: "合计",
              key: "www",
              align: "center",
              width: 200
            },
            {
              title: "国际旅费",
              key: "gjlfys",
              align: "center",
              width: 200
            },
            {
              title: "住宿费",
              key: "STAY_FEE",
              align: "center",
              width: 200
            },
            {
              title: "伙食费",
              key: "FOOD_FEE",
              align: "center",
              width: 200
            },
            {
              title: "公杂费",
              key: "OTHER_FEE",
              align: "center",
              width: 200
            },
            {
              title: "培训费",
              key: "TRAIN_FEE",
              align: "center",
              width: 200
            },
            {
              title: "签证、保险及防疫费用",
              key: "qzbxfy",
              align: "center",
              width: 200
            },
            {
              title: "境外城市间交通费用",
              key: "csnjtfy",
              align: "center",
              width: 200
            },
            {
              title: "其他特殊事项费用",
              key: "eeee",
              align: "center",
              width: 200,
              children: [
                {
                  title: "宴请",
                  align: "center",
                  width: 200,
                  key: "yq_money"
                },
                {
                  title: "礼品",
                  align: "center",
                  width: 200,
                  key: "lp_money"
                },
                {
                  title: "超标准住宿",
                  align: "center",
                  width: 200,
                  key: "cbzzs_money"
                },
                {
                  title: "其他",
                  align: "center",
                  width: 200,
                  key: "qt"
                }
              ]
            },
            {
              title: "经费来源",
              key: "street",
              align: "center",
              width: 200,
              children: [
                {
                  title: "市本级一般公共财政预算资金",
                  align: "center",
                  width: 200,
                  key: "AUDIT_CS_CITY_BUDGET"
                },
                {
                  title: "市本级专户非税资金",
                  align: "center",
                  width: 200,
                  key: "AUDIT_DS_DISTRICT_BUDGET"
                },
                {
                  title: "省及中央补助的资金",
                  align: "center",
                  width: 200,
                  key: "AUDIT_DS_DISTRICT_UPPER_SUBSIDY"
                },
                {
                  title: "其他资金（如国企负担资金等）",
                  align: "center",
                  width: 220,
                  key: "AUDIT_DS_DISTRICT_OTHER"
                }
              ]
            }
          ]
        },
        {
          title: "备注",
          key: "REMARKS",
          align: "center",
          width: 150
        }
      ],
      endIndex: -1,
      starIndex: -1,
      ifGo: false,
      pages: "1",
      auditlist: [],
      sele: 10,
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
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 }
      ],
      titleData: [
        {
          title: "序号",
          name: "reportId",
          width: 294,
          color: "#fff",
          index: 0,
          ifc: true
        },
        {
          title: "预算单位代码",
          name: "unitId",
          width: 294,
          color: "#fff",
          index: 1,
          ifc: true
        },
        {
          title: "预算单位名称",
          name: "applicate",
          width: 294,
          color: "#fff",
          index: 2,
          ifc: true
        },
        {
          title: "出国（境）任务批件文号",
          name: "department",
          width: 294,
          color: "#fff",
          index: 3,
          ifc: true
        },
        {
          title: "批件下达日期",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "团组出访日期",
          name: "tableState",
          width: 320,
          color: "#fff",
          index: 5,
          ifc: true
        },
        {
          title: "团组名称",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "任务性质",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "是否列入年初出国计划",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "是否出访“一带一路”沿线国家",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "组团单位",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "出访国家（城市）",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "出访天数（天）",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "本单位负担经费人数",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        }
      ],

      titleData2: [
        {
          title: "合计",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "国际旅费",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "住宿费",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "伙食费",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "公杂费",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "培训费",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "签证、保险及防疫费用",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "境外城市间交通费用",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        }
      ],
      titleData3: [
        {
          title: "宴请",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "礼品",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "超标准住宿",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "其他",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "市本级一般公共财政预算资金",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "市本级专户非税资金",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "省及中央补助的资金",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        },
        {
          title: "其他资金（如国企负担资金等）",
          name: "tableDate",
          width: 302,
          color: "#fff",
          index: 4,
          ifc: true
        }
      ],
      mainData: []
    };
  }
};
</script>

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
