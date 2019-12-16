<template>
  <div
    id="index"
    v-on:mouseup="mouseup"
    :class="ifGo?'no-select-text':null"
    v-on:mousemove="mousemove($event)"
  >
    <div class="table">
      <table
        id="headTable"
        cellpadding="0"
        border="0"
        cellspacing="0"
        ref="moveTb"
        @dblclick="double($event)"
        :style="'width:'+tabWidth+'px'"
      >
        <tr style="height:40px;">
          <!-- 选择 -->
          <!-- <td style="width:30px;height:40px;cursor:default" align="center" bgcolor="#f8f8f9"></td> -->
          <td
            v-for="(item,index) in titleData"
            :key="index"
            v-if="item.ifc"
            v-on:mouseenter.stop="mouseenter(index)"
            :style="'width:'+item.width+'px;background:'+item.color"
            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
          >
            <span v-on:mouseup.stop="mouseup" v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
            <div
              class="cut"
              v-on:mouseup.stop="cutSeup($event)"
              v-on:mouseenter.stop="cutSeenter(index)"
              v-on:mousedown.stop="cutDown(index,$event)"
            ></div>
          </td>
          <td style="width:50px;height:40px;cursor:default" align="center" bgcolor="#f8f8f9">操作</td>
        </tr>
        <tr v-for="(item,index) in mainData" :key="index" style="height:40px;" :id="index">
          <!-- 选择 -->
          <!-- <td style="width:30px;cursor:default;" align="center" bgcolor="#f8f8f9">
            <input type="checkbox" name="check">
          </td>-->
          <td
            v-for="(td,tdx) in titleData"
            :key="tdx"
            v-if="titleData[tdx].ifc"
            :style="'background:'+titleData[tdx].color"
            v-text="item[td.name]"
          ></td>
          <td @click="cxDelete($event)">
            <img src="../assets/image/减少.png" alt="删除">
          </td>
        </tr>
      </table>
    </div>
    <div id="info" v-if="ifGo" ref="info" :style="'left:'+sX+'px;top:'+sY+'px'">{{tdItem}}</div>
    <!-- 底部应用 -->
    <Affix>
      <div class="tableFoot">
        <!-- 左边内容 -->
        <div class="tableFootLeft">
          <!-- 下拉选择框 -->
          <Select style="width:80px" v-model="sele" @on-change="footLeft">
            <Option v-for="item in seleList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <span class="division"></span>
          <!-- 左右翻页按钮以及刷新按钮 -->
          <span class="nextPage">
            <img src="../assets/image/retreatquickly.png" alt width="15px;" @click="firstPage">
            <img src="../assets/image/shangyiye.png" alt width="15px;" @click="proPage">
          </span>
          <span class="division"></span>
          <!-- 页码框 -->
          <span class="pagesKuang">
            <input type="number" v-model="pages" @input="intSize" style="width:30px;height:24px;">
            /{{pageNum==0?1:Math.ceil(pageNum/sele)}}
          </span>
          <span class="division"></span>
          <span class="prevPage">
            <img @click="nextPage" src="../assets/image/xiayiye.png" alt width="15px;">
            <img @click="endPage" src="../assets/image/forward.png" alt width="15px;">
          </span>
          <span class="division"></span>
          <span class="refresh">
            <img src="../assets/image/shuaxin.png" alt width="15px;" @click="refresh">
          </span>
        </div>
        <!-- 右边内容 -->
        <div class="tableFootRight">
          <span>共{{pageNum}}条</span>
        </div>
      </div>
    </Affix>
  </div>
</template>
<script>
export default {
  props: ["titleData", "mainData", "pageNum"],
  inject:['reload'],
  computed: {
    tabWidth() {
      let width = 0;
      this.titleData.forEach(item => {
        width += item.width;
      });
      return width;
    }
  },
  mounted() {},
  // 监听titleData
  watch: {
    titleData: {
      handler(val, oldVal) {
        let id = this.$store.state.info.userId;
        console.log(id, 'iddddd');
        if (id != undefined) {
          localStorage.setItem(id + 'tabDrag33', JSON.stringify(this.titleData));
        }
      },

      deep: true
    },
  },
  watch: {
    zcId: function(newVal, oldVal) {
      console.log(newVal, 333);
      let zcId1 = newVal;
      this.$emit("zcIdChange", zcId1);
    },
    sele(newVal, oldVal) {
      console.log(newVal, "sele");
      this.pages = 1;
      let p = 1;
      let row = newVal;
      let data = { page: p, row: row, title: "", createName: "", depName: "" };
      console.log(data);
      this.$axios.getPolicyStatuteList(data).then(res => {
        // console.log(res);
        if (res.data.ret) {
          let mainData1 = res.data.data.list;
          console.log(mainData1, "pro");
          this.$emit("mainChangeT", mainData1);
          this.row = row;

          console.log(this.row);
        }
      });
    },
    pages(newVal, oldVal) {
      console.log(newVal,'pages111')
      let p = newVal;
      let row = this.sele;
      let data = {
        page: p,
        row: row,
        title: "",
        createName: "",
        depName: ""
      };

      this.$axios.getPolicyStatuteList(data).then(res => {
        // console.log(res);
        if (res.data.ret) {
          let mainData1 = res.data.data.list;
          console.log(mainData1, "pro");
          this.$emit("mainChangeT", mainData1);
        }
      });
    }
  },
  methods: {
    //控制输入框输入值
    intSize() {
      // console.log(1)
      let p = this.pages;
      let num = Math.ceil(this.pageNum / this.sele);
      if (p > num) {
        p = num;
        this.pages = p;
       
      }
      if (p < 1) {
        this.pages = 1;
       
      }
    },
    //上一页
    proPage() {
      console.log(this.pages);

      if (this.pages > 1) {
        this.pages = this.pages - 1;
      }
    },
    //刷新
    refresh() {
     this.reload();
    },
    //下一页
    nextPage() {
      // console.log(this.pages)
      console.log(this.pages);
      let num = Math.ceil(this.pageNum / this.sele);
      console.log(num);
      if (this.pages < num) {
        this.pages = Number(this.pages) + 1;
       
      }
    },
    // 第一页
    firstPage() {
      console.log(1);
      if (this.pages != 1) {
        this.pages = 1;
        
      }
    },
    // 最后一页
    endPage() {
      console.log(2);
      let num = Math.ceil(this.pageNum / this.sele);
      console.log(num);
      if (this.pages != num) {
        this.pages = num;
       
      }
    },
    //点击删除查询一列
    cxDelete(e) {
      console.log(1);
      // console.log(e.currentTarget.parentNode.id);
      let i = e.currentTarget.parentNode.id;
      let id = this.mainData[i].id;
      console.log(id, "id");
      let obj = { id: id };
      this.$axios
        .delPolicyStatute(obj)
        .then(res => {
          console.log(res, 2);
          if (res.data.ret == 1) {
            console.log(res.data.retMsg);
            this.$Message.success(res.data.retMsg);
            // 更改mainData
            this.$emit("mainChange");
          } else {
            this.$Message.error(res.data.retMsg);
          }
        })
        .catch(error => {
          this.$Message.error(error);
        });
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
    //双击事件
    double(e) {
      console.log(e.target.parentNode, "222");
      let i = e.target.parentNode.id;
      console.log(this.mainData[i]);
      i = this.mainData[i].id;
      //   console.log(this.mainData[i].id);
      this.zcId = i;
      this.$emit("zcIdChange", this.zcId);
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
    footLeft(val) {
      let data = {
        data: this.titleData,
        router: this.$route.path,
        sele: val
      };
      this.sele = val;
      console.log("改变下标");
      this.$store.commit("set_tableColor", data);
    }
  },
  data() {
    return {
      index1: "#fff",
      index2: "#fff",
      index3: "#fff",
      index4: "#fff",
      index5: "#fff",
      index6: "#fff",
      ifGo: false,
      cutGo: false,
      tdItem: "",
      oldWidth: 0,
      tdOldWidth: 0,
      oldX: 0,
      cutIndex: -1,
      endIndex: -1,
      starIndex: -1,
      sX: 0,
      sY: 0,
      pages: "1",
      color6: "#ffff",
      color7: "#ffff",

      sele:10,
      seleList: [
        { value: 10, label: 20 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
      ],
      zcId: "" //政策id
    };
  }
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number']{-moz-appearance: textfield}
</style>

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

      border: 1px solid #e8eaec;
      border-bottom: none;
      // border-right: none;
      vertical-align: middle;
      text-align: center;
      display:table-cell;
      line-height:40px;
      overflow:hidden;
      white-space: nowrap;
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
        cursor: col-resize;
        float: right;
        opacity: 0;
        background-color: #f8f8f9;
      }
      &.table-title {
        background: #c2e8ff;
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
</style>
