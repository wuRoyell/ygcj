<template>
  <div id="funding-application">
    <div id="funding-a">
      <span class="title">南京市行政事业单位因公出国（境）任务特殊支出事项申请表</span>
      <div class="cut"></div>
      <div class="funding-table">
        <table>
          <tr>
            <td colspan="6" class="table-start">（一）因公出国（境）任务情况</td>
          </tr>
          <tr>
            <td class="table-title" style="width:20%">组团单位</td>
            <td colspan="3">
              <input type="text">
            </td>
            <td class="table-title" style="width:13%">组团单位性质</td>
            <td style="width:30%">
              <input type="text">
            </td>
          </tr>
          <tr>
            <td class="table-title">团组名称</td>
            <td colspan="3">
              <input type="text">
            </td>
            <td class="table-title" style="width:13%">是否为培训团组</td>
            <td>
              <input type="text">
            </td>
          </tr>
        </table>
      </div>


      




    </div>
  </div>
</template>

<style scoped lang="less">
#funding-application {
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
              background: #fbffe8;
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
            background: url(../../../public/select-bottom.png) no-repeat scroll
              90% center transparent;
          }
        }
      }
    }
  }
}
</style>

