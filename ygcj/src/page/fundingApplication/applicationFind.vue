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
             style="margin-left:30px;">
        <div style="display:flex">
          <span style="width:190px;line-height:30px;">单位编号:</span>
          <Input v-model="unitId"
                 placeholder="请填写单位编号"
                 style="width: 300px" />
        </div>
        </Col>
        <Col span="4">
        <div style="display:flex;margin-left:40px;">
          <span style="width:190px;line-height:30px;">填报人:</span>
          <Input v-model="applicate"
                 placeholder="请填写填报人"
                 style="width: 300px" />
        </div>
        </Col>
        <Col span="4">
        <div style="display:flex;margin-left:40px;">
          <span style="width:90px;line-height:30px;">部门:</span>
          <Input v-model="department"
                 placeholder="请填写部门"
                 style="width: 300px" />
        </div>
        </Col>
        <Col span="5"
             style="float:right;margin-right:50px;">
        <Button style="float:right"
                type="primary"
                icon="ios-search">查询</Button>
        </Col>
      </Row>
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
      <!-- 表格 全局组件 -->
      <!-- <tabDrag :titleData="titleData" :mainData="mainData" :sele="sele"></tabDrag> -->
      <!--  -->

      <div id="index"
           v-on:mouseup="mouseup"
           :class="ifGo?'no-select-text':null"
           v-on:mousemove="mousemove($event)">
        <!-- <table>
          <tr>
            <td v-for="(item,index) of titleData">{{item.title}}</td>
          </tr>
          <tr v-for="(item,index) of auditlist" :key="index">
            <td>{{item.auditNo}}</td>
            <td>{{item.auditCompany}}</td>
            <td>{{item.auditSubmitter}}</td>
            <td>{{item.auditDep}}</td>
            <td>{{item.auditDate}}</td>
            <td>{{item.auditStatus}}</td>
          </tr>
        </table>-->

        <div class="table">
          <table id="headTable"
                 cellpadding="0"
                 border="0"
                 cellspacing="0"
                 ref="moveTb">
            <tr style="height:40px;">
              <!-- 选择 -->
              <td style="width:30px;height:40px;cursor:default"
                  align="center"
                  bgcolor="#f8f8f9"></td>
              <td v-for="(item,index) in titleData"
                  :key="index"
                  v-if="item.ifc"
                  v-on:mouseenter.stop="mouseenter(index)"
                  :style="'width:'+item.width+'px;background:'+item.color"
                  :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')">
                <span v-on:mouseup.stop="mouseup"
                      v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
                <div class="cut"
                     v-on:mouseup.stop="cutSeup($event)"
                     v-on:mouseenter.stop="cutSeenter(index)"
                     v-on:mousedown.stop="cutDown(index,$event)"></div>
              </td>
            </tr>
            <tr v-for="(item,index) of auditlist"
                :key="index"
                @dblclick="double"
                ref="list">
              <td style="width:30px;cursor:default;"
                  align="center"
                  bgcolor="#f8f8f9">
                <input type="checkbox"
                       name="check">
              </td>
              <td v-for="(td,tdx) in titleData"
                  :key="tdx"
                  v-if="titleData[tdx].ifc && tdx<5"
                  :style="'background:'+titleData[tdx].color">{{item[td.name]}}</td>
                <td v-if="titleData[5].ifc" :style="'background:'+titleData[5].color">{{item.auditStatus|auditStatus}}</td>
                <td v-if="titleData[6].ifc" :style="'background:'+titleData[6].color">{{item.auditType|type}}</td>
            </tr>
          </table>
        </div>
        <!-- 底部应用 -->
        <Affix>
          <div class="tableFoot">
            <!-- 左边内容 -->
            <div class="tableFootLeft">
              <!-- 下拉选择框 -->
              <Select style="width:80px"
                      v-model="sele"
                      @on-change="footLeft">
                <Option v-for="item in seleList"
                        :value="item.value"
                        :key="item.value">{{item.label}}</Option>
              </Select>
              <span class="division"></span>
              <!-- 左右翻页按钮以及刷新按钮 -->
              <span class="nextPage">
                <img src="../../assets/image/retreatquickly.png"
                     alt
                     width="15px;">
                <img src="../../assets/image/shangyiye.png"
                     alt
                     width="15px;">
              </span>
              <span class="division"></span>
              <!-- 页码框 -->
              <span class="pagesKuang">
                <input type="text"
                       v-model="pages"
                       style="width:30px;height:24px;">/1
              </span>
              <span class="division"></span>
              <span class="prevPage">
                <img src="../../assets/image/xiayiye.png"
                     alt
                     width="15px;">
                <img src="../../assets/image/forward.png"
                     alt
                     width="15px;">
              </span>
              <span class="division"></span>
              <span class="refresh">
                <img src="../../assets/image/shuaxin.png"
                     alt
                     width="15px;">
              </span>
            </div>
            <!-- 右边内容 -->
            <div class="tableFootRight">
              <span>1-66</span>
              <span>共66条</span>
            </div>
          </div>
        </Affix>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    //   computed: {
    //     tableWidth: function() {
    //       return this.a;
    //     }
    //   },

    //局部过滤器
    filters: {
      status(val) {
        if (val == 1) {
          return "草稿  ";
        } else if (val == 2) {
          return "在途";
        } else if (val == 3) {
          return "业务处室审核";
        } else if (val == 4) {
          return "行政政法处审核";
        } else if (val == 5) {
          return "已确认";
        } else if (val == 6) {
          return "审核完成";
        } else if (val == 99) {
          return "已删除";
        }
      }
    },
    methods: {
      footLeft(val) {
        console.log(val);
        let data = {
          data: this.titleData,
          router: this.$route.path,
          sele: val
        };
        this.sele = val;
        // console.log("改变下标");
        // console.log(data)
        this.$store.commit("set_tableColor", data);
      },
      ckChang(val, index) {
        console.log(index,val,'255')
        this.titleData.forEach((item, index) => {
          if (item.title == val) {

            item.ifc = !item.ifc;
            console.log(item.ifc,'ifc')
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
      cutSeenter(index) { },
      // 点击全选
      changeState() { },
      changeColor() {
        // alert(11)
      },

      double(e) {
        let no = e.target.parentNode.childNodes[1].innerText
        this.$store.commit("saveAuditNo", no);
        // console.log(this.$store.state.info, this.$store.state.info.userNick, 'userNickD')
        this.$router.push("/funding/ctdw");
        // console.log(this.$store.state.info, this.$store.state.info.userNick, 'userNickD2')
      }
    },
    created() {
      // console.log(this.$store.state.info, this.$store.state.info.userNick, 'userNickF');
      this.loading = true;
      this.$axios.getAuditList().then(res => {
        this.loading = false;
        if (res.data.ret === 1) {
          // console.log(res)
          this.auditlist = res.data.data.list;
        }
      });
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
      // console.log(this.titleData, this.$store.state.userInfo);

      // console.log(this.checkData, '333')
      this.$nextTick(function () {
        this.titleData.forEach((item, index) => {
          if (item.ifc) {
            this.checkList.push(item.title)
          }
          this.checkData.push(item.title)
        })
        // console.log(this.checkData, '333')
      })
    },
    data() {
      return {
        loading: false,//z遮罩层
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
            title: "单据编号",
            name: "auditNo",
            width: 294,
            color: "#fff",
            index: 0,
            ifc: true
          },
          {
            title: "单位名称",
            name: "auditCompany",
            width: 294,
            color: "#fff",
            index: 1,
            ifc: true
          },
          {
            title: "填报人",
            name: "auditSubmitter",
            width: 294,
            color: "#fff",
            index: 2,
            ifc: true
          },
          {
            title: "部门",
            name: "auditDep",
            width: 294,
            color: "#fff",
            index: 3,
            ifc: true
          },
          {
            title: "填报日期",
            name: "auditDate",
            width: 302,
            color: "#fff",
            index: 4,
            ifc: true
          },
          {
            title: "报表状态",
            name: "auditStatus",
            width: 320,
            color: "#fff",
            index: 5,
            ifc: true
          },
          {
            title: "报表类型",
            name: "auditType",
            width: 320,
            color: "#fff",
            index: 6,
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
      height: 460px;
      border: 1px solid #e8eaec;
      // position: relative;
      overflow: auto;
    }
    #headTable {
      margin: 0 auto;
      // width: 1800px;
      width: 100%;
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
        width: 1200px;
        float: left;
        padding: 8px 6px;
        border: 1px solid #4b98de;
        margin: 80px 0 20px 300px;
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
