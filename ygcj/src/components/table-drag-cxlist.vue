<!--综合查询表 使用该组件-->
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


                    :style="'width:'+tabWidth1+'px'"
            >
                <tr>
                    <td :colspan="cellYb" style="height: 40px;">预报阶段（根据经费预申请表生成）</td>
                    <td :colspan="cellZs" style="height: 40px;">正式申请阶段（根据正式经费申请表生成）</td>
                    <td style="height: 40px;">经费执行阶段（执行系统）</td>
                </tr>
                <tr style="height:40px;">

                    <!-- 预报单列-->
                    <td
                            v-for="(item,index) in titleData"
                            :key="index+'-tgz'"
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
                        <div style="width:30px;display:inline-block;height:36px;position:relative;">
                            <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                    <Icon type="md-arrow-dropup" v-show="item.select"
                                          @click.stop="upFilter(item.name,index,'1')"/>
                                    <Icon type="md-arrow-dropdown" v-show="!item.select"
                                          @click.stop="downFilter(item.name,index,'1')"/>
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
                    <!-- tab1预算明细-->
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

                                <td colspan="12" style="height:40px;">
                                             <span v-on:mouseup.stop="mouseup()"
                                                   v-on:mousedown.stop="mousedown(index)">{{item.title}}
                                             </span>


                                </td>

                            </tr>
                            <tr>
                                <td rowspan="2" v-for="(child,i) in columnYb2" :key="i" v-if="i<8"
                                    :style="'width:'+child.width+'px;'">{{child.title}}
                                    <!--  // 排序-->
                                    <div style="width:30px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                            <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child.select"
                                                      @click.stop="upFilter(child.name,i,'2')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child.select"
                                                      @click.stop="downFilter(child.name,i,'2')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td colspan="4" v-for="(child,i) in columnYb2" :key="i+'-ts'" v-if="i>7"
                                    :style="'width:'+child.width+'px;'" style="height:52px;">{{child.title}}
                                </td>

                            </tr>
                            <tr>
                                <td v-for="(child2,j) in columnYb3" :key="j"
                                    :style="'width:'+child2.width+'px;'">{{child2.title}}
                                    <!--  // 排序-->
                                    <div style="width:30px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                            <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child2.select"
                                                      @click.stop="upFilter(child2.name,j,'3')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child2.select"
                                                      @click.stop="downFilter(child2.name,j,'3')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </table>


                    </td>
                    <!-- tab1经费来源-->
                    <td
                            v-for="(item,index) in titleData"
                            :key="index"
                            v-if="item.ifc&&index==titleChildIndex1"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            style="padding:0;height:133px;"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >

                        <table :style="'width:'+item.width+'px;background:'+item.color"
                               style="border-collapse: collapse;height:100%;width:100%;">
                            <tr>
                                <td colspan="6" style="height:40px;">
                                             <span v-on:mouseup.stop="mouseup()"
                                                   v-on:mousedown.stop="mousedown(index)">{{item.title}}
                                             </span>

                                </td>

                            </tr>
                            <tr>
                                <td rowspan="2" v-for="(child,i) in columnJf" :key="i"
                                    :style="'width:'+child.width+'px;'">{{child.title}}
                                    <!--  // 排序-->
                                    <div style="width:30px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                            <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child.select"
                                                      @click.stop="upFilter(child.name,i,'4')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child.select"
                                                      @click.stop="downFilter(child.name,i,'4')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>


                    </td>
                    <!--                    正式表单列-->
                    <td
                            v-for="(item,index) in titleData"
                            :key="index+'-ghz'"
                            v-if="item.ifc&&(index<titleChildIndex2&&index>titleChildIndex1)"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >
                        <span v-on:mouseup.stop="mouseup()" v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
                        <!--  // 排序-->
                        <div style="width:30px;display:inline-block;height:36px;position:relative;">
                            <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                    <Icon type="md-arrow-dropup" v-show="item.select"
                                          @click.stop="upFilter(item.name,index,'1')"/>
                                    <Icon type="md-arrow-dropdown" v-show="!item.select"
                                          @click.stop="downFilter(item.name,index,'1')"/>
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
                            :key="index+'-vie'"
                            v-if="item.ifc&&(index>titleChildIndex2)&&item.title!='指标下达及执行情况'"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >
                        <span v-on:mouseup.stop="mouseup()" v-on:mousedown.stop="mousedown(index)">{{item.title}}</span>
                        <!--  // 排序-->
                        <div style="width:30px;display:inline-block;height:36px;position:relative;">
                            <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                    <Icon type="md-arrow-dropup" v-show="item.select"
                                          @click.stop="upFilter(item.name,index,'1')"/>
                                    <Icon type="md-arrow-dropdown" v-show="!item.select"
                                          @click.stop="downFilter(item.name,index,'1')"/>
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
                    <!--                    正式表的预算明细-->
                    <td
                            v-for="(item,index) in titleData"
                            :key="index+'-tr'"
                            v-if="item.ifc&&index==titleChildIndex2"
                            v-on:mouseenter.stop="mouseenter(index)"
                            :style="'width:'+item.width+'px;background:'+item.color"
                            style="padding:0"
                            :class="endIndex==0?
                        (index == endIndex?'left-red table-title super':'table-title super'):starIndex<endIndex?
                        (index == endIndex?'right-red table-title super':'table-title super'):(index == endIndex-1?
                        'right-red table-title super':'table-title super')"
                    >

                        <table
                                style="border-collapse: collapse;height:100%;width:100%;">
                            <tr>
                                <td colspan="12" style="height:40px;">
                                             <span v-on:mouseup.stop="mouseup()"
                                                   v-on:mousedown.stop="mousedown(index)">{{item.title}}
                                             </span>

                                </td>

                            </tr>
                            <tr>
                                <td rowspan="2" v-for="(child,i) in columnZs2" :key="i" v-if="i<8"
                                    :style="'width:'+child.width+'px;'">{{child.title}}
                                    <!--  // 排序-->
                                    <div style="width:40px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                            <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child.select"
                                                      @click.stop="upFilter(child.name,i,'z2')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child.select"
                                                      @click.stop="downFilter(child.name,i,'z2')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td colspan="4" style="height: 52px;" v-for="(child,i) in columnZs2" :key="i+'-ts'" v-if="i>7"
                                    :style="'width:'+child.width+'px;'">{{child.title}}
                                </td>

                            </tr>
                            <tr>
                                <td v-for="(child2,j) in columnZs3" :key="j" :style="'width:'+child2.width+'px;'">
                                    {{child2.title}}
                                    <!--  // 排序-->
                                    <div style="width:40px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:40px;">
                                            <div style="width:40px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child2.select"
                                                      @click.stop="upFilter(child2.name,j,'z3')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child2.select"
                                                      @click.stop="downFilter(child2.name,j,'z3')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </table>


                    </td>
                    <!--                    执行阶段-->
                    <td
                            v-for="(item,index) in titleData"
                            :key="index+'-iu'"
                            v-if="item.ifc&&item.title=='指标下达及执行情况'"

                            style="padding:0px;height:133px;"
                            :style="'width:'+item.width+'px;background:'+item.color"


                    >

                        <table :style="'width:'+item.width+'px;background:'+item.color"
                               style="border-collapse: collapse;height:100%">
                            <tr>
                                <td colspan="4" style="height:40px;">
                                             <span v-on:mouseup.stop="mouseup()"
                                                   v-on:mousedown.stop="mousedown(index)">{{item.title}}
                                             </span>

                                </td>

                            </tr>
                            <tr>
                                <td rowspan="2" v-for="(child,i) in columnTodo" :key="i+'-poq'"
                                    :style="'width:'+child.width+'px;'">{{child.title}}
                                    <!--  // 排序-->
                                    <div style="width:30px;display:inline-block;height:36px;position:relative;">
                                        <div style="position:absolute;left:0;bottom:-4px;width:30px;">
                                            <div style="width:30px;font-size:26px;height:18px;line-height:18px;color:#4b98de;">
                                                <Icon type="md-arrow-dropup" v-show="child.select"
                                                      @click.stop="upFilter(child.name,i,'td')"/>
                                                <Icon type="md-arrow-dropdown" v-show="!child.select"
                                                      @click.stop="downFilter(child.name,i,'td')"/>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>


                    </td>

                </tr>
                <!--//数据渲染-->
                <tr v-for="(item,index) in mainData" :key="index+'-data'" style="height:40px;" :id="index" @click="selectRow(index)" :class="{selected:index==isSelected}">
                    <!-- 选择 -->
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-zhq'"
                            v-if="titleData[tdx].ifc&&(tdx<titleChildIndex)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{item[td.name]| NumToFixed(td.align)}}
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-ssg'"
                            v-if="titleData[tdx].ifc&&(tdx==titleChildIndex)"
                            :style=""
                            style="padding:0;height:40px;"

                    >
                        <table :style="'width:'+td.width+'px;'"
                               style="border-collapse: collapse;height:40px;">

                            <tr :id="index">
                                <td v-for="(child,index) in columnDataYb" :key="index+'-qs'"
                                    :style="'width:'+child.width+'px;textAlign:'+child.align"
                                    style="border:0;border-right:1px solid #ccc;height:100%;"
                                  >
                                    {{item[child.name]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!--    经费来源-->
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-spq'"
                            v-if="titleData[tdx].ifc&&(tdx==titleChildIndex1)"
                            :style=""
                            style="padding:0;"

                    >
                        <table :style="'width:'+td.width+'px;'"
                               style="border-collapse: collapse;height:40px;">

                            <tr :id="index">
                                <td v-for="(child,index) in columnJf" :key="index+'-qs'"
                                    :style="'width:'+child.width+'px;textAlign:'+child.align"
                                    style="border:0;border-right:1px solid #ccc;height:100%;"
                                    >
                                    {{item[child.name]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!--                    正式表-->
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-zn'"
                            v-if="titleData[tdx].ifc&&(tdx<titleChildIndex2&&tdx>titleChildIndex1)"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{item[td.name]| NumToFixed(td.align)}}
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-zv'"
                            v-if="titleData[tdx].ifc&&(tdx>titleChildIndex2&&td.title!='指标下达及执行情况')"
                            :style="'width:'+td.width+'px;textAlign:'+td.align"

                    >
                        {{item[td.name]| NumToFixed(td.align)}}
                    </td>
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-sx'"
                            v-if="titleData[tdx].ifc&&(tdx==titleChildIndex2)"
                            :style=""
                            style="padding:0;"

                    >
                        <table :style="'width:'+td.width+'px;'"
                               style="border-collapse: collapse;height:40px;">

                            <tr :id="index">
                                <td v-for="(child,index) in columnData1" :key="index+'-qs'"
                                    :style="'width:'+child.width+'px;textAlign:'+child.align"
                                    style="border:0;border-right:1px solid #ccc;height:100%;"
                                  >
                                    {{item[child.name]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!--                    执行阶段-->
                    <td
                            v-for="(td,tdx) in titleData"
                            :key="tdx+'-qs'"
                            v-if="titleData[tdx].ifc&&td.title=='指标下达及执行情况'"
                            :style=""
                            style="padding:0;"

                    >
                        <table :style="'width:'+td.width+'px;'"
                               style="border-collapse: collapse;height:40px;">

                            <tr :id="index">
                                <td v-for="(child,index) in td.children" :key="index+'-qs'"
                                    :style="'width:'+child.width+'px;textAlign:'+child.align"

                                   >
                                    {{item[child.name]| NumToFixed(child.align)}}
                                </td>
                            </tr>
                        </table>
                    </td>


                </tr>


            </table>


        </div>
        <div id="info" v-if="ifGo" ref="info" style="clear:both;" :style="'left:'+sX+'px;top:'+sY+'px'">{{tdItem}}</div>
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
        props: ["titleData", "mainData", "pageNum", 'titleChildIndex',
            'titleChildIndex1', 'titleChildIndex2'],
        inject: ['reload'],
        computed: {
            tabWidth1() {
                let width = 0;
                this.titleData.forEach(item => {
                    width += item.width;
                });
                return width;
            },


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
                    //监听到 显示的title ,并把预报表和正式表的分界线算出来
                    let titleNew = [];
                    for (let j = 0; j < this.titleData.length; j++) {
                        if (this.titleData[j].ifc == true) {
                            //显示的标题部分拿到一个新数组里面
                            titleNew.push(this.titleData[j])
                        }
                    }
                    titleNew.forEach((item, index) => {
                        if (item.title == '经费来源') {
                            this.cellYb = Number(index) + 1;

                        } else if (item.title == '指标下达及执行情况') {
                            this.cellZs = Number(index) - this.cellYb;
                        }


                    })


                    this.$emit('ygcgIndex', this.titleData);

                    if (id != undefined) {
                        localStorage.setItem(id + 'cxlist', JSON.stringify(this.titleData));
                    }
                },
                deep: true
            },


            sele(newVal, oldVal) {
                this.pages = 1;
                this.findData.row = newVal;
                this.findData.page = this.pages;
                this.$emit('mainChange', this.findData)
            },
            pages(newVal, oldVal) {
                this.findData.row = this.sele;
                this.findData.page = newVal;
                this.$emit('mainChange', this.findData)
            },
            selectBoxList: {
                handler(newVal, oldVal) {
                    // console.log(newVal,'watchSelect');
                    var flag = true;
                    for (var i = 0; i < newVal.length; i++) {
                        if (newVal[i].AUDIT_NO == undefined) {
                            flag = false;
                        }
                    }
                    if (this.mainData.length == newVal.length && flag) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                },
                deep: true
            },
            mainData:{
                handler(newVal,oldVal) {
                    //数据重新加载时  取消行选择
                    this.isSelected=-1;
                },
                deep: true
            }
        },
        methods: {
            // 上排序
            upFilter(name, index, type) {
                console.log(type)
                switch (type) {
                    case '1' :
                        this.titleData[index].select = false;
                        break
                    case '2':
                        this.columnYb2[index].select = false;
                        break
                    case '3':
                        this.columnYb3[index].select = false;
                        break
                    case '4':
                        this.columnJf[index].select = false;
                        break
                    case 'z2':
                        this.columnZs2[index].select = false;
                        break
                    case 'z3':
                        this.columnZs3[index].select = false;
                        break
                    case 'td':
                        this.columnTodo[index].select = false;

                }
                console.log('升序')

                console.log(name);
                console.log(this.activeShow, '666')
                let arr = this.mainData;
                arr.sort(this.sortNum('asc', name))
                this.$emit('mainChange', arr);
            },
            //根据数字排序 'desc:降序' asc:升序
            sortNum(order, key) {
                var ordAlpah = (order == 'asc') ? '>' : '<';
                var sortFun = new Function('a', 'b', 'return a.' + key + ordAlpah + 'b.' + key + '?1:-1');
                return sortFun;
            },
            //
            downFilter(name, index, type) {
                console.log('降序')
                console.log(type)
                this.titleData.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnYb2.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnYb3.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnJf.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnZs2.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnZs3.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })
                this.columnTodo.forEach(item => {
                    if (item.select) {
                        item.select = false;
                    }
                })

                switch (type) {
                    case '1' :

                        this.titleData[index].select = true;
                        break
                    case '2':

                        this.columnYb2[index].select = true;
                        break
                    case '3':

                        this.columnYb3[index].select = true;
                        break
                    case '4':
                        this.columnJf[index].select = true;
                        break
                    case 'z2':
                        this.columnZs2[index].select = true;
                        break

                    case 'z3':
                        this.columnZs3[index].select = true;
                        break
                    case 'td':
                        this.columnTodo[index].select = true;
                }

                let arr = this.mainData;
                arr.sort(this.sortNum('desc', name))
                this.$emit('mainChange', arr);
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
                this.$router.push({path: '/funding/application'});
            },
            //td鼠标按下事件
            mousedown(index) {
                console.log(index, 'down')
                this.ifGo = true;
                this.starIndex = index;
                this.tdItem = this.titleData[this.starIndex].title;
                console.log(this.titleData[index].name)

            },
            //td鼠标经过事件
            mouseenter(index) {
                // console.log(index, 'mouseenter经过')
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
                    return false;
                }
                console.log(this.endIndex, 'endIndex')
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
            },
            //单击行 变颜色
            selectRow(index){
                if(index==this.isSelected){
                    this.isSelected=-1;
                }else{
                    this.isSelected=index;
                }
            }

        },
        data() {
            return {
                cellYb: 20,//预报表要合并的单元格数
                cellZs: 15,//正式表要合并的单元格数
                //第三列 预报表标题
                columnYb3: [
                    {
                        title: "宴请",
                        name: "YQ_MONEY",
                        width: 130,
                        color: "#fff",
                        select: false,
                        align:'right',
                        ifc: true
                    },
                    {
                        title: "礼品",
                        name: "LP_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "超标准住宿",
                        name: "CBZZS_MONEY",
                        width: 160,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他",
                        name: "QT",
                        align:'right',
                        width: 130,
                        color: "#fff",
                        select: false,
                        ifc: true
                    }
                ],//复杂表头的第三列
                columnZs3: [
                    {
                        title: "宴请",
                        name: "ZS_YQ_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "礼品",
                        name: "ZS_LP_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "超标准住宿",
                        name: "ZS_CBZZS_MONEY",
                        width: 160,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他",
                        name: "ZS_QT",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    }
                ],//复杂表头的第三列
                columnYb2: [ // 复杂表格的第二列  预算明细标题
                    {
                        title: "合计",
                        name: "AUDIT_FEE_SUM",
                        width: 120,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "国际旅费（含境外城市间机票费用）",
                        name: "GJLFYS",
                        width: 320,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "住宿费",
                        name: "STAY_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "FOOD_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "OTHER_FEE",
                        width: 140,
                        color: "#fff",
                        select: false,
                        align:'right',
                        ifc: true
                    },
                    {
                        title: "培训费",
                        name: "TRAIN_FEE",
                        width: 140,
                        color: "#fff",
                        select: false,
                        align:'right',
                        ifc: true
                    },
                    {
                        title: "签证、保险及防疫费用",
                        name: "QZBXFY",
                        width: 250,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "境外城市间交通费用（不含机票）",
                        name: "CSNJTFY",
                        width: 310,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他特殊支出事项费用",
                        name: "eee",
                        width: 300,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true,
                    },

                ],
                columnTodo: [ // 执行阶段
                    {
                        title: "支付系统项目代码",
                        name: "ZS_AUDIT_XMDM",
                        width: 302,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "下达指标金额",
                        name: "ZS_ZBJE",
                        width: 302,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "用款计划申报情况",
                        name: "ZS_JHJE",
                        width: 302,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "实际支付情况",
                        name: "ZS_ZFJE",
                        width: 302,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                ],
                columnZs2: [ // 复杂表格的第二列  正式预算明细
                    {
                        title: "正式申请经费（一般公共预算资金来源）小计",
                        name: "ZS_AUDIT_FEE_SUM",
                        width: 380,
                        color: "#fff",
                        select: false,
                        align:'right',
                        ifc: true
                    },
                    {
                        title: "国际旅费（含境外城市间机票费用）",
                        name: "ZS_GJLFYS",
                        width: 330,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "住宿费",
                        name: "ZS_STAY_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "ZS_FOOD_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "ZS_OTHER_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "培训费",
                        align:'right',
                        name: "ZS_TRAIN_FEE",
                        width: 140,
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "签证、保险及防疫费用",
                        name: "ZS_QZBXFY",
                        width: 260,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "境外城市间交通费用（不含机票）",
                        name: "ZS_CSNJTFY",
                        width: 320,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他特殊支出事项费用",
                        name: "eee",
                        width: 550,
                        color: "#fff",
                        select: false,
                        ifc: true,
                    },

                ],
                columnJf: [  // 预报的经费来源
                    {
                        title: "合计",
                        name: "ZBJE",
                        align:'right',
                        width: 130,
                        color: "#fff",
                        index: 4,
                        ifc: true,
                        select: false
                    },
                    {
                        title: "市本级一般公共财政预算资金",
                        align:'right',
                        width: 290,
                        color: "#fff",
                        select: false,
                        ifc: true,
                        name: "AUDIT_CS_CITY_BUDGET"
                    },
                    {
                        title: "市本级专户非税资金",
                        align:'right',
                        width: 240,
                        color: "#fff",
                        select: false,
                        ifc: true,
                        name: "AUDIT_CS_CITY_FS"
                    },
                    {
                        title: "省及中央补助的资金",
                        align:'right',
                        width: 240,
                        select: false,
                        color: "#fff",
                        ifc: true,
                        name: "AUDIT_DS_DISTRICT_UPPER_SUBSIDY"
                    },
                    {
                        title: "其他资金（如国企负担资金等）",
                        align:'right',
                        width: 300,
                        select: false,
                        color: "#fff",
                        ifc: true,
                        name: "AUDIT_DS_DISTRICT_OTHER"
                    }
                ],
                // 查询字段
                findData: {
                    auditCompany: '',
                    auditPjh1: '',
                    groupMission: '',
                    groupIsyearplan: '',
                    groupIsbar: '',
                    groupUnit: '',
                    userAuditType:'',
                    auditType: '3',
                    row: '',
                    jfly: '',
                    page: ''
                },
                checkBoxList: [],//
                checked: false, //全选框
                selectBoxList: [],//选中的数据

                //正式表 预算明细 数据渲染
                columnData1: [

                    {
                        title: "正式申请经费（一般公共预算资金来源）小计",
                        name: "ZS_AUDIT_FEE_SUM",
                        width: 380,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "国际旅费（含境外城市间机票费用）",
                        name: "ZS_GJLFYS",
                        width: 330,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "住宿费",
                        name: "ZS_STAY_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "ZS_FOOD_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "ZS_OTHER_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "培训费",
                        name: "ZS_TRAIN_FEE",
                        width: 140,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "签证、保险及防疫费用",
                        name: "ZS_QZBXFY",
                        width: 260,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "境外城市间交通费用（不含机票）",
                        name: "ZS_CSNJTFY",
                        width: 320,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "宴请",
                        name: "ZS_YQ_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "礼品",
                        name: "ZS_LP_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "超标准住宿",
                        name: "ZS_CBZZS_MONEY",
                        width: 160,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他",
                        name: "ZS_QT",
                        align:'right',
                        width: 130,
                        color: "#fff",
                        select: false,
                        ifc: true
                    }


                ],
                //预报表 预算明细 数据渲染
                columnDataYb: [
                    {
                        title: "合计",
                        name: "AUDIT_FEE_SUM",
                        width: 120,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "国际旅费（含境外城市间机票费用）",
                        name: "GJLFYS",
                        width: 320,
                        color: "#fff",
                        align:'right',
                        select: false,
                        ifc: true
                    },
                    {
                        title: "住宿费",
                        name: "STAY_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "伙食费",
                        name: "FOOD_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "公杂费",
                        name: "OTHER_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "培训费",
                        name: "TRAIN_FEE",
                        width: 140,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "签证、保险及防疫费用",
                        name: "QZBXFY",
                        width: 250,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "境外城市间交通费用（不含机票）",
                        name: "CSNJTFY",
                        width: 310,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "宴请",
                        name: "YQ_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "礼品",
                        name: "LP_MONEY",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "超标准住宿",
                        name: "CBZZS_MONEY",
                        width: 160,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    },
                    {
                        title: "其他",
                        name: "QT",
                        width: 130,
                        align:'right',
                        color: "#fff",
                        select: false,
                        ifc: true
                    }
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
                ygcgjEndFlag: false,// 拖拽到因公出国项
                sX: 0,
                sY: 0,
                pages: "1",
                color6: "#ffff",
                color7: "#ffff",

                sele:500,
                seleList: [
                    {value: 50, label: 50},
                    {value: 100, label: 100},
                    {value: 500, label: 500},
                ],
                zcId: "", //政策id

                isSelected:-1,

            };
        }
    };
</script>
<style scoped>
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }

    .clearfix {
        display: inline-block
    }

    * html
    .clearfix {
        height: 1%
    }

    td >>> .ivu-input-icon {
        display: none;
    }

    td >>> .ivu-input-icon-normal + .ivu-input {
        padding-right: 7px;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number']{-moz-appearance: textfield}
    .selected {
        background-color: #2780d0;
    }

</style>

<style lang="less" scoped>
    #index {
        overflow: auto;
        clear: both;

        .table {
            height: 460px;
            overflow: auto;
            border: 1px solid #ccc;

        }

        #headTable {
            color: #3c3c3c;
            font-size: 14px;
            text-align: center;
            border-collapse: collapse;
            border: 1px solid #ccc;

            td {

                border: 1px solid #ccc;
                border-bottom: none;
                vertical-align: middle;
                text-align: center;
                display:table-cell;
                line-height:40px;
                overflow:hidden;
                white-space: nowrap;

                span {
                    margin-right: 1px;
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
                    height:40px;
                    width: 6px;
                    cursor: col-resize;
                    float: right;
                    opacity: 0;
                    background-color: #f8f8f9;
                }

                &.table-title {
                    background: #c2e8ff;



                    border: 1px solid #ccc;

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

        float: left;
    }

    #index::after {
        content: '';
        clear: both;
        display: block;
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
