<template>
<!-- 使用部门设置 -->
    <div class="useDepartment">
       <!-- 新增。删除按钮 -->
       <div class="btn">
           <Button type="primary" icon='md-add' size="large">新增</Button>
           <Button type="primary" icon='md-trash' size="large" class="del">删除</Button>
       </div>
       <!-- table表格 -->
       <div class="tableContent">
           <Table border ref="selection" :columns="tableContent" :data="tableList" height='460'></Table>
       </div>
       <!-- 底部应用 -->
       <Affix>
       <div class="tableFoot">
           <!-- 左边内容 -->
           <div class="tableFootLeft">
               <!-- 下拉选择框 -->
               <Select style="width:80px" v-model="sele">
                   <Option v-for="item in seleList" :value="item.value" :key="item.value">{{item.label}}</Option>
               </Select>
               <span class="division"></span>
               <!-- 左右翻页按钮以及刷新按钮 -->
               <span class="nextPage">
                   <img src="../../assets/image/retreatquickly.png" alt="" width="15px;">
                   <img src="../../assets/image/shangyiye.png" alt="" width="15px;">
               </span>
               <span class="division"></span>
               <!-- 页码框 -->
                <span class="pagesKuang">
                <input type="text" v-model="pages" style="width:30px;height:24px;">/1
                </span>
                <span class="division"></span>
               <span class="prevPage">
                   <img src="../../assets/image/xiayiye.png" alt="" width="15px;">
                   <img src="../../assets/image/forward.png" alt="" width="15px;">
               </span>
               <span class="division"></span>
               <span class="refresh">
               <img src="../../assets/image/shuaxin.png" alt="" width="15px;">
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
</template>
<script>
export default {
    data(){
        return{
          sele:100,
          pages:"1",
          tableContent:[
              {title:'编号',key:'id',width:60,align:'center'},
              {type:'selection',width:60,align:"center"},
              {title:'使用部门编码',key:'useCode'},
              {title:'使用部门名称',key:'useName',align:'center'},
              {title:'是否未及',key:'useTimely',align:'center'},
              {title:'是否使用',key:'useYn',align:'center'},
              {title:'单位代码',key:'companyCode'},
              {title:'单位名称',key:'companyName',align:'center'}
          ],
          tableList:[
              {id:1,useCode:'001',useName:'主任室(312)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'002',useName:'主任室(313)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'003',useName:'主任室(314)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'004',useName:'主任室(352)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'005',useName:'主任室(316)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'006',useName:'主任室(317)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'007',useName:'主任室(382)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'008',useName:'主任室(392)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'009',useName:'主任室(319)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'},
              {id:1,useCode:'010',useName:'主任室(372)',useTimely:'否',useYn:'是',companyCode:'001001',companyName:'区委办公室'}
          ],
          seleList:[
              {value:100,label:100},
              {value:200,label:200},
              {value:300,label:300}
          ]
        }
    },
    methods:{}
}
</script>
<style scoped>
  .useDepartment{
      width: 90%;
      margin: 0 auto;
  }
  .btn{
      margin-top: 30px;
  }
  .btn .del{
      margin-left: 25px;
  }
  .tableContent{
      margin-top: 30px;
  }
  .tableFoot{
      width: 100%;
      height: 40px;
      line-height: 35px;
      padding: 0 0 0 20px;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      background: #f9f9f9;
  }
  .tableFootLeft{
      float: left;
  }
  .division{
      display: inline-block;
      height: 30px;
      border: 1px solid #e7e7e7;
      vertical-align: middle;
      margin-left: 10px;
  }
  /* 上一页 */
  .nextPage img,.prevPage img,.refresh img{
    vertical-align: middle;
    margin: 0 10px 0 15px;
    cursor: pointer;
  }
  .pagesKuang{
      margin-left: 10px;
  }
  /* 底部右边内容 */
  .tableFootRight{
      float: right;
  }
  .tableFootRight span:first-child{
      font-size: 13px;
      font-weight: 600;
     margin-right: 20px;
  }
  .tableFootRight span:last-child{
     margin-right: 20px;
      font-size: 13px;
      font-weight: 600;
  }
</style>
