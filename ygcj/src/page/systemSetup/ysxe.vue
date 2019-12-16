<template>
  <div id="fundingMaintain">
    <div class="funding-buttom">
      <span>
        <i class="iconxiugai"></i>修改
      </span>
      <span @click="updateYs">
        <i class="iconbaocun"></i>保存
      </span>
    </div>
    <div id="funding-a">
      <div class="funding-table">
        <table>
          <tr>
            <td colspan="6" class="table-start">预算限额设置</td>
          </tr>
          <tr>
            <td class="table-title super" style="width:50%">单位/部门</td>
            <td class="table-title super" style="width:50%">额度（万）</td>
          </tr>
          <tr v-for="(item,index) in ysList" :key="index">
            <td class="table-title">{{item.depName}}</td>
            <td class="rate">
              <input type="number" v-model="item.budget">万
            </td>
          </tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 查询 预算数据 方法
    getSysBudgetList(data){
      this.$axios.getSysBudgetList(data).then(res=>{
        if(res.data.ret == 1){
          this.ysList = res.data.data;
        }else{
          this.$Message.error(res.data.retMsg);
        }
        console.log(res,33);
      })
    },
    //修改 预算数据 方法
    updateSysBudget(data){
      this.$axios.updateSysBudget(data).then(res=>{
        if(res.data.ret == 1){
          this.$Message.success(res.data.retMsg)
        }else{
          this.$Message.error(res.data.retMsg);
        }
      })
    },
    // 点击修改后 保存
    updateYs(){
      for (let i = 0;i< this.ysList.length;i++){
        let obj = {
          id:this.ysList[i].id,
          budget:this.ysList[i].budget
        };
        this.updateSysBudget(obj);

      }

    },
  },
  mounted(){

    this.getSysBudgetList();
  },
  data() {
    return {
      onSelect: true,
      ysList:[],// 查询的预算经费表
    };
  }
};
</script>

<style scoped lang="less">
input {
  outline: none;
  border: none;
  width: 210px;
  height: 26px;
  text-align: right;
}
#fundingMaintain {
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
        }
      }
    }
  }
}
</style>
