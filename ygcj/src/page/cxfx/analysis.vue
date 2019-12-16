<template>
    <div id="foreignQuery">
        <div id="funding-a">
            <Row>
                <Col span="4" style="margin-left:30px;">
                 <div style="display:flex">
                   <span style="width:190px;line-height:30px;">单位名称:</span>
                   <Input v-model="unitId" placeholder="请填写单位名称" style="width: 300px" />
                 </div>  
                </Col>
                <Col span="4">
                   <div style="display:flex;margin-left:40px;">
                   <span style="width:180px;line-height:30px;">团组名称:</span>
                   <Input v-model="applicate" placeholder="请填写团组信息" style="width: 300px" />
                 </div>  
                </Col>
                <Col span="4">
                    <div style="display:flex;margin-left:40px;">
                   <span style="width:180px;line-height:30px;">国别名称:</span>
                   <Input v-model="department" placeholder="请填写国别" style="width: 300px" />
                 </div>  
                </Col>
                <Col span="4">
                    <div style="display:flex;margin-left:40px;">
                   <span style="width:180px;line-height:30px;">时间区间:</span>
                    <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="Select date" style="width: 300px"></DatePicker>
                 </div>  
                </Col>
                <Col span="5" style="margin-right:50px;">
                    <Button style="float:right" type="primary" icon="ios-search" @click="search">查询</Button>
                </Col>
            </Row>
            <Button type="primary" style="float:right;margin:12px" @click="checkA">重置</Button>
            <Dropdown style="margin: 20px 12px 0 0;float:right">
                <a href="javascript:void(0)">
                    <Button type="primary" style="margin-bottom: 12px;margin-top: -7px;">选择表格展示列：<Icon type="ios-arrow-down"></Icon></Button>
                </a>
                <DropdownMenu slot="list">
                    <CheckboxGroup v-model="checkList">
                        <Checkbox style="float: left;clear: both;line-height: 30px;padding:0 12px;" v-for="(item,index) in checkData" :key="index" :label="item" vertical
                            @click.native="ckChang(item,index)">
                            <span @click="ckChang(item,index)">{{item}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </DropdownMenu>
            </Dropdown>
            <tabDrag :titleData = "titleData" :mainData = "mainData" :sele = "sele"></tabDrag>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        tableWidth:function(){
    　　　　return this.a;
    　　}
    },
    methods:{
        ckChang(val,index){
            this.titleData.forEach((item,index)=>{
                if(item.title==val){
                    item.ifc = !item.ifc;
                }
            })
        },
        checkA(){
            this.titleData.forEach((item,index)=>{
                item.ifc = true;
            })
            this.checkList = this.checkData;
        }
    },
    mounted:function(){
        if(this.$store.state.userInfo[this.$store.state.userName].list
        &&this.$route.path==this.$store.state.userInfo[this.$store.state.userName].list.router){
            this.titleData = this.$store.state.userInfo[this.$store.state.userName].list.data;
            this.sele =  this.$store.state.userInfo[this.$store.state.userName].list.sele;
        }
        this.$nextTick(function() {
            this.titleData.forEach((item,index)=>{
                if(item.ifc){
                    this.checkList.push(item.title)
                }
                this.checkData.push(item.title)
            })
        })
    },
    data(){
        return{
            sele:100,
            checkData:[],
            checkList:[],
            depart:'',
            curr:'',
              // 单位编号
            unitId:'',
            // 填报人
            applicate:'',
            // 填报部门
            department:'',
            titleData:[
               {title:'组团单位',name:'reportId',width:294,color:'#fff',ifc:true},
                {title:'团组名称',name:'unitId',width:206,color:'#fff',ifc:true},
                {title:'参团单位',name:'applicate',width:294,color:'#fff',ifc:true},
                {title:'是否列为年初计划',name:'department',width:230,color:'#fff',ifc:true},
                {title:'是否为一带一路',name:'tableDate',width:152,color:'#fff',ifc:true},
                {title:'出访任务',name:'tableState',width:150,color:'#fff',ifc:true},
                {title:'是否为培训组团',name:'tableState',width:150,color:'#fff',ifc:true},
                {title:'出访天数',name:'tableState',width:150,color:'#fff',ifc:true},
                {title:'经费总预算（万元）',name:'tableState',width:170,color:'#fff',ifc:true}
            ],
            mainData:[
                {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                },
                 {
                    reportId:'南京市外事办',
                    unitId:"出行团",
                    applicate:'南京市外事办',
                    department:'是',
                    tableDate:'是',
                    tableState:'参观和培训',
                    department:'是',
                    tableDate:'15',
                    tableState:'18',
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
#foreignQuery{
    #funding-a{
        clear: both;
        width: 100%;
        margin: auto;
        overflow: hidden;
        .ivu-row{
            margin: 20px auto;
        }
        .funding-table{
            width: 1200px;
            float: left;
            margin: 5px 0 20px 0;
            table{
                color: #3C3C3C;
                width: 100%;
                font-size: 14px;
                text-align: center;
                border: 1px solid #4B98DE;
                border-collapse:collapse;border:none;
                .add-user{
                    float: left;
                    padding: 6px 8px;
                    margin: 10px 0 6px 0;
                    background: #4B98DE;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    &:hover{
                        background: #67BEF3;
                    }
                }
                th{
                    background: #67BEF3;
                    border: 1px solid #4B98DE;
                    color: #fff;
                    line-height: 45px;
                    font-weight: 100;
                    font-size: 18px;
                }
                td{
                    padding: 8px 2px;
                    text-align: center;
                    border: 1px solid #4B98DE;
                    td:hover{
                        background: #EBF7FF
                    }
                    &.table-title{
                        background:#C2E8FF;
                        padding: 8px 16px;
                        text-align: center;
                        border: 1px solid #4B98DE;
                        &.super{
                            color: #000;
                            background: #94D5FB;
                        }
                    }
                    &.table-start{
                        background: #67BEF3;
                        border: 1px solid #4B98DE;
                        padding: 8px 16px;
                        color: #fff;
                        line-height: 20px;
                        font-weight: 100;
                        font-size: 16px;
                    }
                    .upload{
                        cursor: pointer;
                        color: #9D9D9D;
                        i{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
