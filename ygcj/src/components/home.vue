<template>
  <tr>
    <td>
      <font class="add">
        <Icon type="md-add-circle" />
      </font>
      <!-- <font class="add" @click="delOther4(index)" v-else>删除</font> -->
    </td>
    <td>
      <!-- 洲 -->
      <select name="continent"
              v-model="continent">
        <option v-for="ctt in continents"
                v-bind:value="ctt.id">{{ctt.regionName}}</option>
      </select>
    </td>
    <td>
      <!-- 国家 -->
      <select name="country"
              v-model="country">
        <option v-for="ct in countrys"
                v-bind:value="ct.id">{{ct.regionName}}</option>
      </select>
    </td>
    <td>
      <!-- 城市 -->
      <select name="city"
              v-model="city">
        <option v-for="c in citys"
                v-bind:value="c.id">{{c.regionName}}</option>
      </select>
    </td>
    <td>
      <!-- 行程天数 -->
      <input type="number"
             v-model="tripDays"
             onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
             oninput="if(value.length>3)value=value.slice(0,3)">
      <!-- <input type="text" v-if="!flag" v-model="dayTrip" @keyup="keyup2">
      <input type="text" v-model="otherData3[index].tripDays" :readonly="flag" v-if="flag">-->
    </td>
    <td>
      <!-- 实际住宿天数 -->
      <input type="number"
             v-model="stayDays"
             onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
             oninput="if(value.length>3)value=value.slice(0,3)">
    </td>
    <td class="number">
      <!-- 币种 -->
      {{currency}}
    </td>
    <td class="number">
      <!-- 住宿费（根据实际住宿天数计算） -->
      {{stayFee}}
    </td>
    <td class="number">
      <!-- 伙食费 -->
      {{foodFee}}
    </td>
    <td class="number">
      <!-- 公杂费 -->
      {{otherFee}}
    </td>
    <td>
      <!-- 培训费（培训团组） -->
      <input type="number"
             v-model="trainFee"
             @keydown="handleInput2"
             oninput="if(value.length>9)value=value.slice(0,9)">
      <!-- {{resultData}} -->
    </td>
    <td class="number">
      <!-- 合计（外币金额） -->
      {{sumFee}}
    </td>
  </tr>
</template>


<script>
  export default {
    data: function () {
      return {
        auditNo: "",
        no: 1,
        continents: [],
        countrys: [],
        citys: [],

        continent: 0,
        country: 0,
        city: 0,
        tripDays: 0,
        stayDays: 0,

        hotelExpense: 0,
        mealsCost: 0,
        publicExpense: 0,

        trainFee: 0,
        currency: 0,
        resultData: {},

        change: true
      };
    },
    computed: {
      stayFee: function () {
        // console.log(this.$parent.group_capacity);
        return this.hotelExpense * this.stayDays * this.$parent.group_capacity;
      },
      foodFee: function () {
        return this.mealsCost * this.tripDays * this.$parent.group_capacity;
      },
      otherFee: function () {
        return this.publicExpense * this.tripDays * this.$parent.group_capacity;
      },
      sumFee: function () {
        var temp =
          parseFloat(this.stayFee) +
          parseFloat(this.foodFee) +
          parseFloat(this.otherFee) +
          parseFloat(this.trainFee);
        // console.log(temp)
        return temp;
      }
    },
    props: ["showdata"],
    created: function () {
      // console.log(this.$store.state.groupnum);
    },
    mounted: function () {
      this.group_capacity = 0;
      this.dataInit();
    },
    methods: {
      handleInput2(e) {
        // 通过正则过滤小数点后两位
        e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
      },
      castData: function (obj) {
        this.$emit("resultData", obj);
      },
      dataInit: function () {
        //处理大洲
        this.$axios.getDictRegionTop().then(
          res => {
            this.continents = res.data.data;
            //判空
            if (this.showdata.continent == null) {
              return;
            }
            //接数据
            // console.log(this.showdata)
            this.continent = this.showdata.continent;
            this.no = this.showdata.no;
            this.auditNo = this.showdata.auditNo;
            this.currency = this.showdata.currency;
            this.stayDays = this.showdata.stayDays;
            this.tripDays = this.showdata.tripDays;
            // this.stayDays=this.showdata.stayDays
            // this.stayDays=this.showdata.stayDays

            // console.log(this.continent+' '+this.country+' '+this.city)
            //处理国家
            this.$axios.getDictRegionNext({ pid: this.showdata.continent }).then(
              res => {
                this.countrys = res.data.data;
                this.country = this.showdata.country;

                // console.log(this.continent+' '+this.country+' '+this.city)
                //处理城市
                if (this.showdata.country == "") {
                  return;
                }
                this.$axios
                  .getDictRegionNext({ pid: this.showdata.country })
                  .then(
                    res => {
                      this.citys = res.data.data;
                      this.city = this.showdata.city;
                      // console.log(this.citys);

                      this.citys.forEach(val => {
                        if (this.city == val.id) {
                          this.currency = val.exchangeId;
                          this.mealsCost = val.mealsCost;
                          this.hotelExpense = val.hotelExpense;
                          this.publicExpense = val.publicExpense;
                        }
                      });
                      this.change = true;
                      // console.log(this.continent+' '+this.country+' '+this.city)
                    },
                    function () {
                      console.log("请求失败");
                    }
                  );
              },
              function () {
                console.log("请求失败");
              }
            );
          },
          function () {
            console.log("请求失败");
          }
        );

        // console.log(this.continent+' '+this.country+' '+this.city)
      }
    },
    watch: {
      continent: function () {
        if (!this.change) {
          return;
        }
        this.country = 0;
        //   console.log(this.continent);
        // this.city=0
        this.$axios.getDictRegionNext({ pid: this.continent }).then(
          res => {
            this.countrys = res.data.data;
            // console.log(this.resultData)
          },
          function () {
            console.log("请求失败");
          }
        );
      },
      country: function () {
        if (!this.change) {
          return;
        }
        this.city = 0;
        this.$axios.getDictRegionNext({ pid: this.country }).then(
          res => {
            this.citys = res.data.data;
          },
          function () {
            console.log("请求失败");
          }
        );
      },
      city: function () {
        if (!this.change) {
          return;
        }
        if (this.citys != null) {
          this.citys.forEach(val => {
            if (this.city == val.id) {
              this.currency = val.exchangeId;
              this.mealsCost = val.mealsCost;
              this.hotelExpense = val.hotelExpense;
              this.publicExpense = val.publicExpense;
            }
          });
        }
      },
      sumFee: function () {
        let obj = {};
        obj.auditNo = this.auditNo;
        obj.currency = this.currency;
        obj.no = this.no;
        obj.continent = this.continent;
        obj.country = this.country;
        obj.city = this.city;
        obj.tripDays = this.tripDays;
        obj.stayDays = this.stayDays;
        obj.stayFee = this.stayFee;
        obj.foodFee = this.foodFee;
        obj.otherFee = this.otherFee;
        obj.trainFee = this.trainFee;
        obj.sumFee = this.sumFee;
        // console.log(obj)
        this.castData(obj);
        this.resultData = obj;
      }
    }
  };
</script>


<style scoped lang="less">
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
      background: #fbffe8;
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
      height: 20px;
      text-indent: 12px;
      cursor: pointer;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-size: 10px 10px;
      background: url(../../public/select-bottom.png) no-repeat scroll 90% center
        transparent;
    }
  }
</style>