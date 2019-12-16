<template>
  <div id="fundingMaintain">
    <div class="funding-head">
      日期：
      <DatePicker :options="options"
                  v-model="startDate"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 200px"></DatePicker>-
      <DatePicker :options="options"
                  v-model="endDate"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 200px"></DatePicker>
      <!-- <Button style="margin-left:100px;" type="primary" icon="ios-search">查询</Button> -->
    </div>
    <div class="funding-buttom">
       <span @click="find">
        <i class="iconxiugai"></i>查询
      </span>
      <span @click="newAdd">
        <i class="iconbaocun"></i>新增
      </span>
    </div>
    <div id="funding-a">
      <div class="funding-table">
        <Table border :columns="columns1" :data="exChangeData"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from "../../../public/formatDate.js";
  export default {
    methods: {
      find(){
        let obj = {
          startDate: this.formatDate(this.startDate),
          endDate : this.formatDate(this.endDate)
        }
        console.log(obj,333)
        this.getExchangeList(obj);
      },
      newAdd(){
        // 清除 汇率日期 的date值
        this.$store.commit('saveExchangeDate','');
        this.$router.push('/funding/foreignMaintain');
      },
      //查看 跳入详情页
      showDetail(index){
        console.log(index);
        console.log(this.exChangeData)
        let data = this.exChangeData[index].time
        this.$store.commit('saveExchangeDate',data)
        this.$router.push('/funding/foreignMaintain');
      },
      //修改
      getChange() {
        this.$Message.success("开始修改");
        this.read1 = false;
      },
      // 保存
      save() {
        let arr = [];
        for (let i = 0; i < this.tabData.length; i++) {
          let obj = {};
          obj.id = this.tabData[i].id;
          obj.exchangeRate = Number(this.tabData[i].exchangeRate);
          arr.push(obj);
        }
        // console.log(arr)
        let obj2 = {};
        obj2.data = arr;
        console.log(obj2, 'obj2')
        this.$axios.batchUpdateExchange(obj2).then(res => {
          console.log(res);
          if (res.data.ret) {
            this.$Message.success("保存成功");
            this.read1 = true;

          } else {
            this.$Message.success("保存出错");
          }
        }).catch(error => {
          this.$Message.success("保存出错");
        });
        this.read1 = true;
      },
      upTime() {
        this.upDate = true;
        var date = new Date();
        // 获取当前年
        var year = date.getFullYear();
        // 获取当前月
        var month = date.getMonth() + 1;
        // 获取当前日
        var day = date.getDate();

        this.tabData.forEach((item, index) => {
          item.time =
            year +
            "-" +
            (month > 9 ? month : "0" + month) +
            "-" +
            (day > 9 ? day : "0" + day);
        });
      },
      saveTime() {
        this.upDate = false;
        console.log(this.tabData);
      },
      handleClick(index) {
        this.tabData[index].open = !this.tabData[index].open;
      },
      handleChange(index, date) {
        // this.value3 = date;
      },
      handleClear(index) {
        this.tabData[index].open = false;
      },
      handleOk(index) {
        this.tabData[index].open = false;
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      // 查询所有
      getExchangeList(data){
        this.$axios.getExchangeList(data).then(res => {
          console.log(res.data);
          if (res.data.ret == 1) {
            console.log(2345,res.data.data.length,5)
            let datas = res.data.data;
            let newData = [];
           for(let i = 0;i<datas.length;i++){
             let obj = {};
             console.log(res.data,345)
             obj.time = this.formatDate(datas[i].UPDATE_TIME);
             obj.rmbM = Number(datas[i].RATE[0]);
             obj.rmbY = Number(datas[i].RATE[1]);
             obj.rmbO = Number(datas[i].RATE[2]);
             obj.rmbR = Number(datas[i].RATE[3]);
             obj.rmbG = Number(datas[i].RATE[4]);
              console.log(obj,677)
             newData.push(obj)

           }
            this.exChangeData = newData;

            console.log(this.exChangeData,333);



          }
        });
      },
    },
    mounted() {

     this.getExchangeList();
    },
    watch: {
      timeData(val, oldVal) {
        this.tabData.forEach((item, index) => {
          item.time = this.formatDate(val);
        });
      }
    },

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    data() {
      return {
        onSelect: true,
        timeData: "",
        startDate:'',// 开始日期
        endDate:'',// 结束日期
        open: false,
        upDate: false,
        read1: true,
        tabData: [],
        options: {
          disabledDate(date) {
            return date && date.valueOf() >= Date.now();
          }
        },
        options2: {
          disabledDate(date) {
            return date && date.valueOf() >= Date.now();
          }
        },
        exChangeData:[],
        columns1:[
          {
            title: '日期',
            align: 'center',
            key: 'time'
          },
          {
            title: '美元：人民币',
            align: 'center',
            key: 'rmbM'
          },
          {
            title: '英镑：人民币',
            align: 'center',
            key: 'rmbY'
          },
          {
            title: '欧元：人民币',
            align: 'center',
            key: 'rmbO'
          },
          {
            title: '日元：人民币',
            align: 'center',
            key: 'rmbR'
          },
          {
            title: '港币：人民币',
            align: 'center',
            key: 'rmbG'
          },

          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.index)
                    }
                  }
                }, '查看'),

              ]);
            }
          }
        ]
      };
    }
  };
</script>

<style scoped lang="less">
  #fundingMaintain {
    .funding-buttom {
      float: right;
      margin-bottom: 20px;
      span {
        display: inline-block;
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 17px;
        color: #fff;
        margin-left: 12px;
        cursor: pointer;
        background: #169aef;
        i {
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
    .funding-head {
      float: left;
      margin: 12px 0 20px 12px;
      font-size: 16px;
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
      .funding-table {
        width: 1200px;
        float: left;
        border: 1px solid #4b98de;
        padding: 8px 6px;
        margin: 5px 0 20px 0;
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
            padding: 8px 2px;
            height: 49px;
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
            &.rate {
              color: #4b98de;
            }
            &.table-start {
              background: #67bef3;
              border: 1px solid #4b98de;
              padding: 8px 16px;
              color: #fff;
              line-height: 20px;

              font-size: 16px;
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
              }
              &::-ms-input-placeholder {
                text-align: center;
              }
              &::-webkit-input-placeholder {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
