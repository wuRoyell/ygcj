<template>
    <div
            id="index"
            v-on:mouseup="mouseup()"
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
                     <td style="width:50px;height:40px;cursor:default" align="center" bgcolor="#f8f8f9">
                         全选 <input type="checkbox" style="width:18px;height:18px;" @click="checkAll" v-model="checked"></input>
                     </td>
                    <td
                            v-for="(item,index) in titleData"
                            :key="index+'-labal'"
                            v-if="item.ifc&&(index<titleChildIndex)"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >
                        <span v-on:mouseup.stop="mouseup()" v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
                        <!--  // 排序-->
                        <div style="width:40px;display:inline-block;height:36px;position:relative;">
                            <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;"  >
                                    <Icon  type="md-arrow-dropup" v-show="item.select"  @click.stop="upFilter(item.name,index,'1')"/>
                                    <Icon  type="md-arrow-dropdown" v-show="!item.select" @click.stop="downFilter(item.name,index,'1')"/>
                                </div>
                            </div>
                        </div>
                        <div
                                class="cut"
                                v-on:mouseup.stop="cutSeup($event)"
                                v-on:mouseenter.stop="cutSeenter(index)"
                                v-on:mousedown.stop="cutDown(index,$event)"
                        ></div>
                    </td>

                    <td
                            v-for="(item,index) in titleData"
                            :key="index"
                            v-if="item.ifc&&titleChildIndex != ''&&index==titleChildIndex"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            style="padding:0"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >

                        <table :style="'width:'+item.width+'px;background:'+item.color"
                               style="border-collapse: collapse;height:100%">
                            <tr>
                                <td colspan="12">
                                    <span v-on:mouseup.stop="mouseup()"
                                          v-on:mousedown.stop="mousedown(index)">{{item.title}}
                                    </span>

                                    <div
                                            class="cut"
                                            v-on:mouseup.stop="cutSeup($event)"
                                            v-on:mouseenter.stop="cutSeenter(index)"
                                            v-on:mousedown.stop="cutDown(index,$event)"
                                    ></div>
                                </td>

                            </tr>
                            <tr>
                                <td rowspan="2" v-for="(child,i) in column2" :key="i" v-if="i<8" :style="'width:'+child.width+'px;'">{{child.title}}
                                    <!--  // 排序-->
                                    <div style="width:40px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                            <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;"  >
                                                <Icon  type="md-arrow-dropup" v-show="child.select"  @click.stop="upFilter(child.name,i,'2')"/>
                                                <Icon  type="md-arrow-dropdown" v-show="!child.select" @click.stop="downFilter(child.name,i,'2')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td colspan="4" style="height: 40px;" v-for="(child,i) in column2" :key="i+'-ts'" v-if="i>7" :style="'width:'+child.width+'px;'">{{child.title}}
                                </td>

                            </tr>
                            <tr>
                                <td v-for="(child2,j) in column3" :key="j" :style="'width:'+child2.width+'px;'">{{child2.title}}
                                    <!--  // 排序-->
                                    <div style="width:40px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                            <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;"  >
                                                <Icon  type="md-arrow-dropup" v-show="child2.select"  @click.stop="upFilter(child2.name,j,'3')"/>
                                                <Icon  type="md-arrow-dropdown" v-show="!child2.select" @click.stop="downFilter(child2.name,j,'3')"/>
                                            </div>
                                        </div>
                                    </div></td>

                            </tr>
                        </table>
                        <div
                                class="cut"
                                style="height:100%;"
                                v-on:mouseup.stop="cutSeup($event)"
                                v-on:mouseenter.stop="cutSeenter(index)"
                                v-on:mousedown.stop="cutDown(index,$event)"
                        ></div>

                    </td>

                    <td
                            v-for="(item,index) in titleData"
                            :key="index"
                            v-if="item.ifc&&(index>titleChildIndex)"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >
                        <span v-on:mouseup.stop="mouseup(index)"
                              v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
                        <!--  // 排序-->
                        <div style="width:40px;display:inline-block;height:36px;position:relative;">
                            <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;"  >
                                    <Icon  type="md-arrow-dropup" v-show="item.select"  @click.stop="upFilter(item.name,index,'1')"/>
                                    <Icon  type="md-arrow-dropdown" v-show="!item.select" @click.stop="downFilter(item.name,index,'1')"/>
                                </div>

                            </div>
                        </div>
                        <div
                                class="cut"

                                v-on:mouseup.stop="cutSeup($event)"
                                v-on:mouseenter.stop="cutSeenter(index)"
                                v-on:mousedown.stop="cutDown(index,$event)"
                        ></div>
                    </td>

                </tr>
                <!--//数据渲染-->
                <tr v-for="(item,index) in mainData" :key="index+'-data'" style="height:40px;" :id="index">
                    <!-- 选择 -->
                    <td style="width:30px;cursor:default;" align="center" bgcolor="#f8f8f9">
                        <input type="checkbox" v-if="item.reportId!='总计'" style="width:18px;height:18px;" name="check" v-model="checkBoxList[index]" @click="selectBox(index,item.id)">
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-zs'"
                            v-if="titleData[tdx].ifc&&(tdx<titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{item[td.name] | NumToFixed(td.align)}}
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-ss'"
                            v-if="titleData[tdx].ifc&&(tdx==titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"
                            style="padding:0;"

                    >
                        <table :style="'width:'+td.width+'px'"  style="border-collapse: collapse;height:40px;">

                            <tr :id="index">
                                <td v-for="(child,index) in column1" :key="index+'-qs'" :style="'width:'+child.width+'px;textAlign:'+child.align" style="border:0;border-right:1px solid #e8eaec" >

                                    {{item[child.key]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-cs'"
                            v-if="titleData[tdx].ifc&&(tdx>titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{item[td.name]| NumToFixed(td.align)}}
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-zs'"
                            v-if="titleData[tdx].ifc&&(tdx<titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{dataAdd[td.name]| NumToFixed(td.align)}}
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-ss'"
                            v-if="titleData[tdx].ifc&&(tdx==titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"
                            style="padding:0;"

                    >
                        <table :style="'width:'+td.width+'px'"  style="border-collapse: collapse;height:40px;">

                            <tr >
                                <td v-for="(child,index) in column1" :key="index+'-qs'" :style="'width:'+child.width+'px;textAlign:'+child.align" style="border:0;border-right:1px solid #e8eaec" >
                                    {{dataAdd[child.key]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-cs'"
                            v-if="titleData[tdx].ifc&&(tdx>titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"
                    >
                        {{dataAdd[td.name]| NumToFixed(td.align)}}
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
        props: ["titleData", "mainData", "pageNum", 'titleChildIndex','dataAdd'],
        inject: ['reload'],
        computed: {
            tabWidth() {
                let width = 0;
                this.titleData.forEach(item => {
                    width += item.width;
                });
                return width;
            }
        },
        mounted() {
        },


        watch: {
            // 监听titleData
            titleData: {
                handler(val, oldVal) {
                    let data = {
                        data: val,
                        router: this.$route.path,
                        sele: this.sele
                    };
                    let id = this.$store.state.info.userId;
                    console.log(id, 'iddddd');
                    this.titleData.forEach((item,index)=>{
                        if(item.name == 'ygcgj'){
                            console.log(index,'jjjj')
                            this.$emit('ygcgIndex', index);

                        }
                    })
                    if (id != undefined) {
                        localStorage.setItem(id + 'zslistPt', JSON.stringify(this.titleData));
                    }
                },
                deep: true
            },
            sele(newVal, oldVal) {
                this.pages = 1;
                this.findData.row = newVal;
                this.findData.page = this.pages;
                this.$emit('mainChange',this.findData)
            },
            pages(newVal, oldVal) {
                this.findData.row = this.sele;
                this.findData.page = newVal;
                this.$emit('mainChange',this.findData)
            },
            selectBoxList:{
                handler(newVal,oldVal){
                    // console.log(newVal,'watchSelect');
                    var flag = true;
                    for(var i =0;i<newVal.length;i++){
                        if(newVal[i].AUDIT_NO == undefined){
                            flag = false;
                        }
                    }
                    if(this.mainData.length == newVal.length && flag){
                        this.checked = true;
                    }else{
                        this.checked = false;
                    }
                },
                deep:true
            }
        },
        methods: {
            // 上排序
            upFilter(name,index,type){
                console.log(type)
                switch (type) {
                    case '1' :
                        this.titleData[index].select = false;
                        break
                    case '2':
                        this.column2[index].select = false;
                        break
                    case '3':
                        this.column3[index].select = false;
                        break
                }
                console.log('升序')

              console.log(name);
              console.log(this.activeShow,'666')
              let arr = this.mainData;
                arr.sort(this.sortNum('asc',name))
                this.$emit('mainChange',arr);
            },
            //根据数字排序 'desc:降序' asc:升序
            sortNum(order,key){
                var ordAlpah = (order == 'asc') ? '>' : '<';
                var sortFun = new Function('a','b','return a.'+key+ordAlpah + 'b.'+key + '?1:-1');
                return sortFun;
            },
            //
            downFilter(name,index,type){
                console.log('降序')
                console.log(type)
                this.titleData.forEach(item=>{
                    if(item.select){
                        item.select = false;
                    }
                })
                this.column2.forEach(item=>{
                    if(item.select){
                        item.select = false;
                    }
                })
                this.column3.forEach(item=>{
                    if(item.select){
                        item.select = false;
                    }
                })
                switch (type) {
                    case '1' :

                        this.titleData[index].select = true;
                        break
                    case '2':

                        this.column2[index].select = true;
                        break
                    case '3':

                        this.column3[index].select = true;
                        break
                }

                let arr = this.mainData;
                arr.sort(this.sortNum('desc',name))
                this.$emit('mainChange',arr);
            },
            // 全选
            checkAll(){
                if(this.checked){
                    this.selectBoxList = [];
                    this.mainData.forEach((item,index)=>{
                        this.checkBoxList[index] = false;
                    })
                }else {
                    this.selectBoxList = [];

                    this.mainData.forEach((item,index)=>{
                        this.checkBoxList[index] = true;
                        this.selectBoxList.push(item)

                    })
                }
                this.$emit('selectBox',this.selectBoxList);
            },
            // 选中复选框
            selectBox(index){
                console.log(this.mainData[index])
                console.log(this.checkBoxList,this.checkBoxList[index],88)
                if(this.checkBoxList[index] == true){
                    this.selectBoxList.splice(index,1,{})
                }else{
                    this.selectBoxList.splice(index,1,this.mainData[index]);
                }
                console.log(this.selectBoxList,555);
                this.$emit('selectBox',this.selectBoxList);
            },
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
                console.log(e.currentTarget.parentNode);
                let i = e.currentTarget.parentNode.id;
                console.log(i);
                let id = this.mainData[i].AUDIT_NO;
                console.log(this.mainData[i], "id");
                let obj = {id: id};
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
                // i = this.mainData[i].id;
                let data = this.mainData[i];
                this.$store.commit('saveZsAuditNo', data.AUDIT_NO);
                // console.log(this.$store.state.forexSqNo,222)
                let obj = [];
                obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                obj.forEach((item,index)=>{
                    if(item.route == '/funding/application'){
                        obj.splice(index,1);
                        this.$store.state.includeOption.splice(index,1);
                    }
                })
                this.$router.push({path: '/funding/application'});
            },
            //td鼠标按下事件
            mousedown(index) {
                console.log(index, 'down')
                this.ifGo = true;
                this.starIndex = index;
                this.tdItem = this.titleData[this.starIndex].title;
                console.log(this.titleData[index].name)
                if (this.titleData[index].name == 'ygcgj') {
                    this.ygcgjFlag = true;
                    console.log(2333)
                } else {
                    this.ygcgjFlag = false;
                }
            },
            //td鼠标经过事件
            mouseenter(index) {
                console.log(index, 'mouseenter经过')
                if (this.ifGo) {
                    this.endIndex = index;


                }
            },
            //td鼠标放开事件
            mouseup(index) {
                console.log(index, '3333333')
                if (this.starIndex == -1 || this.endIndex == -1) {
                    this.ifGo = false;
                    this.cutGo = false;
                    this.ygcgjFlag = false;
                    this.ygcgjEndFlag = false;
                    return false;
                }
                if (this.titleData[this.endIndex].name == 'ygcgj') {
                    this.ygcgjEndFlag = true;
                    console.log(2333,'429')
                } else {
                    this.ygcgjEndFlag = false;
                }
                if (this.ygcgjEndFlag == true) {
                    console.log(23333,'end')
                    // if(this.starIndex < this.endIndex){
                    //     this.$emit('ygcgIndex', Number(this.endIndex-1))
                    // }else if(this.starIndex > this.endIndex){
                    //     this.$emit('ygcgIndex', Number(this.endIndex+1))
                    // }

                }
                console.log(this.endIndex, 'endIndex')
                if (this.ygcgjFlag == true) {
                    console.log('ygcgjflag')
                    this.$emit('ygcgIndex', this.endIndex)
                }
                this.ifGo = false;
                this.cutGo = false;

                let a = this.titleData[this.starIndex];
                console.log(a, 'startIndex')

                this.titleData.splice(this.starIndex, 1);
                console.log(333)
                console.log(this.titleChildIndex, index, '4444')
                this.titleData.splice(this.endIndex, 0, a);
                this.starIndex = -1;
                this.endIndex = -1;
                this.ygcgjFlag = false;
                this.ygcgjEndFlag = false;
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
                console.log(ev, 'ev')
                let e = ev || event;
                this.oldX = e.x;
                this.oldWidth = this.$refs.moveTb.rows[0].clientWidth;
                this.cutGo = false;
            },
            //边界鼠标按下事件
            cutDown(index, ev) {
                console.log(ev, 33333)
                let e = ev || event;
                this.ifGo = false;
                this.cutGo = true;
                this.cutIndex = index;
                this.oldX = e.x;
                this.oldWidth = this.$refs.moveTb.rows[0].clientWidth;
                this.tdOldWidth = this.titleData[this.cutIndex].width;
            },
            //边界经过事件
            cutSeenter(index) {
            },
            // 点击全选
            changeState() {
            },
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
                column3:[
                    {
                        title: "宴请",
                        name: "YQ_MONEY",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "礼品",
                        name: "LP_MONEY",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "超标准住宿",
                        name: "CBZZS_MONEY",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "其他",
                        name: "QT",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    }
                ],//复杂表头的第三列

                column2:[
                    {
                        title: "合计",
                        name: "AUDIT_FEE_SUM",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "国际旅费",
                        name: "GJLFYS",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "住宿费",
                        name: "STAY_FEE",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "FOOD_FEE",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "OTHER_FEE",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "培训费",
                        name: "TRAIN_FEE",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "签证、保险及防疫费用",
                        name: "QZBXFY",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "境外城市间交通费用",
                        name: "CSNJTFY",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true
                    },
                    {
                        title: "其他特殊事项费用",
                        name: "eee",
                        width: 200,
                        color: "#fff",
                        select:false,
                        ifc: true,
                    }
                ],// 复杂表格的第二列

                // 查询字段
                findData: {
                    auditCompany: '',
                    auditPjh1: '',
                    groupMission: '',
                    groupIsyearplan: '',
                    groupIsbar: '',
                    groupUnit: '',
                    auditType: 3,
                    auditStatus:48,
                    userAuditType:'',
                    row: '',
                    jfly: '',
                    page: ''
                },
                checkBoxList:[],//
                checked: false, //全选框
                selectBoxList:[],//选中的数据

                column1: [

                    {
                        title: "合计",
                        key: "AUDIT_FEE_SUM",
                        align: 'right',

                        width: 200
                    },
                    {
                        title: "国际旅费",
                        key: "GJLFYS",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "住宿费",
                        key: "STAY_FEE",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "伙食费",
                        key: "FOOD_FEE",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "公杂费",
                        key: "OTHER_FEE",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "培训费",
                        key: "TRAIN_FEE",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "签证、保险及防疫费用",
                        key: "QZBXFY",
                        align: "right",
                        width: 200
                    },
                    {
                        title: "境外城市间交通费用",
                        key: "CSNJTFY",
                        align: "right",
                        width: 200
                    },

                    {
                        title: "宴请",
                        align: "right",
                        width: 200,
                        key: "YQ_MONEY"
                    },
                    {
                        title: "礼品",
                        align: "right",
                        width: 200,
                        key: "LP_MONEY"
                    },
                    {
                        title: "超标准住宿",
                        align: "right",
                        width: 200,
                        key: "CBZZS_MONEY"
                    },
                    {
                        title: "其他",
                        align: "right",
                        width: 200,
                        key: "QT"
                    },

                ],
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
                ygcgjFlag: false,//因公出国项按下flag
                ygcgjEndFlag:false,// 拖拽到因公出国项
                sX: 0,
                sY: 0,
                pages: "1",
                color6: "#ffff",
                color7: "#ffff",

                sele:500,
                seleList: [
                    { value: 50, label: 50 },
                    { value: 100, label: 100 },
                    { value: 500, label: 500 },
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
    td >>> .ivu-input-icon {
        display: none;
    }

    td >>> .ivu-input-icon-normal + .ivu-input {
        padding-right: 7px;
    }
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
                    height: 40px;
                    width: 6px;
                    float:right;
                    cursor: col-resize;

                    opacity: 0;
                    background-color: #f8f8f9;
                }

                &.table-title {
                    background: #c2e8ff;

                    vertical-align: middle;
                    text-align: center;
                    display:table-cell;
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
