<template>
    <div id="foreignQuery">
        <div id="funding-a">
            <Row>
                <Col span="4"
                     style="margin-left:30px;">
                    <div style="display:flex">
                        <span style="width:190px;line-height:30px;">政策标题:</span>
                        <Input placeholder="请填写政策标题"
                               style="width: 300px"
                               v-model="fTitle"/>
                    </div>
                </Col>
                <Col span="4">
                    <div style="display:flex;margin-left:40px;">
                        <span style="width:170px;line-height:30px;">发布人:</span>
                        <Input placeholder="请填写发布人"
                               style="width: 300px"
                               v-model="fCreateName"/>
                    </div>
                </Col>
                <Col span="4">
                    <div style="display:flex;margin-left:40px;">
                        <span style="width:160px;line-height:30px;">部门:</span>
                        <Input placeholder="请填写部门"
                               style="width: 300px"
                               v-model="fDepName"/>
                    </div>
                </Col>
                <Col span="5"
                     style="margin-right:50px;">
                    <Button style="float:right"
                            type="primary"
                            icon="ios-search"
                            @click="find">查询
                    </Button>
                </Col>
            </Row>
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="checkA">重置
            </Button>
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
            <Button type="primary"
                    style="float:right;margin:12px"
                    @click="showAdd">添加
            </Button>
            <tabDrag3 ref="tg3"
                      @zcIdChange="zcIdC($event)"
                      @mainChange="zcFind"
                      @mainChangeT="mainC($event)"
                      :titleData="titleData"
                      :mainData="mainData"
                      :pageNum="pageNum"></tabDrag3>
        </div>

        <Modal v-model="editorShow" :maskClosable=false width="1020">
            <div slot="header"
                 class="editor-top">
                <span>{{updateFlag?'修改': '录入'}}</span>

            </div>
            <div slot="close" class="back"
                 @click="quit">X
            </div>
            <div class="editor-main"
                 v-if="editorShow">

                <form enctype="multipart/form-data"
                      method="post"
                      action>
                    <table cellpadding="0"
                           cellspacing="0">
                        <tr>
                            <td>
                                <div>标题：</div>
                            </td>
                            <td>
                                <div>
                                    <input type="text"
                                           v-model="title">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>内容：</div>
                            </td>
                            <td>
                                <div>
                                    <quill-editor v-model="content"
                                                  ref="myQuillEditor"
                                                  :options="editorOption"></quill-editor>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>上传附件</td>
                            <td>

                                <div style="width:80px;float:left;height:30px;margin-left:10px;background:#dddfdc;line-height:30px;font-size:14px;
                                text-align:center;" @click="choseFile" id="choseFile">选择文件</div>
                                <div v-for="(fileName,index) in fileTNames" style="float:left;width:160px;margin-left:10px;">
                                    <p style="line-height:20px;height:20px;overflow:hidden;">{{fileName}}</p>

                                    <Icon type="md-close"
                                          @click="delFile(index)"
                                          style="cursor:pointer;fontSize:20px"/>
                                    <Icon type="ios-cloud-download"
                                          @click="downloadFile(index)"
                                          style="cursor:pointer;fontSize:20px"/>

                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>类型</div>
                            </td>
                            <td>
                                <div>
                                    <input type="radio"
                                           name="identity"
                                           value="1"
                                           v-model="params">通知、公告
                                    <input type="radio"
                                           name="identity"
                                           value="3"
                                           v-model="params">政策法规
                                </div>
                            </td>
                        </tr>
                    </table>

                </form>
            </div>
            <div slot="footer"
                 class="editor-bottom">
                <button class="btn1"
                        @click="editorSure($event)">确定
                </button>
                <button class="btn2"
                        @click="quit">关闭
                </button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import FileSaver from "file-saver";
    import $ from 'jquery';
    export default {
        computed: {
            tableWidth: function () {
                return this.a;
            }
        },
        inject: ['reload'],
        watch: {

        },
        methods: {
            choseFile(){
                var that = this;
                var newFileInput = '<input id="uploadInput" style="display: none" type="file" >'
                $('#choseFile').parent().append($(newFileInput));
                console.log( $('#choseFile'))

                $('#uploadInput').bind('change',function(e){
                    $(this).removeAttr('id');
                    console.log(that.fileNames);
                    that.fileTNames.push(e.target.files[0].name)
                    that.fileNames.push(e.target.files[0]);
                    console.log(e.target.files[0], 334456)
                });
                $('#uploadInput').click();
            },
            downloadFile(index) {
                let id = this.fileId[index];
                // window.open(this.$axios.fileDownload()+ id);
                FileSaver.saveAs(this.$axios.fileDownload() + id,this.fileTNames[index]);
                //
            },
            //删除的上传文件
            delFile(index) {
                if(this.updateFlag == true){
                    this.fileId.splice(index, 1);
                    this.fileTNames.splice(index, 1);
                }else{
                    this.fileNames.splice(index,1);
                    this.fileTNames.splice(index,1);
                }

                console.log(this.fileId,'delid');
            },
            ckChang(val, index) {
                this.titleData.forEach((item, index) => {
                    if (item.title == val) {
                        item.ifc = !item.ifc;
                    }
                });
            },
            // 翻页

            mainC(msg) {
                let list = msg;
                let arr = [];
                for (let i = 0; i < list.length; i++) {
                    let obj = {};
                    obj.title = list[i].title;
                    obj.depName = list[i].depName;
                    obj.createName = list[i].createName;
                    obj.updateTime = list[i].updateTime;
                    //内容转换为纯文本
                    // 正则去除p 标签
                    var s = list[i].content;
                    s = s.replace(/<\/?p[^>]*>/gi, "");
                    console.log(s);
                    obj.content = s;
                    obj.id = list[i].id;

                    arr.push(obj);
                }
                this.mainData = arr;
                console.log(msg, "333");
            },
            // 请求页面法则方法
            getPolicyStatuteList(data) {
                this.$axios.getPolicyStatuteList(data).then(res => {
                    console.log(res)
                    if (res.data.ret) {
                        console.log(1);
                        let list = res.data.data.list;
                        let arr = [];
                        for (let i = 0; i < list.length; i++) {
                            let obj = {};
                            obj.title = list[i].title;
                            obj.depName = list[i].depName;
                            obj.fbrName = list[i].fbrName;
                            obj.updateTime = list[i].updateTime;
                            //内容转换为纯文本
                            // 正则去除p 标签
                            var s = list[i].content;
                            // s = s.replace(/&lt;/g, '<');
                            // s = s.replace(/&gt;/g, '>');
                            s = s.replace(/<\/?.[^>]*>/gi, "");
                            console.log(s);
                            obj.content = s;
                            obj.id = list[i].id;
                            arr.push(obj);
                        }
                        this.mainData = arr;
                        console.log(this.mainData, 222);
                    } else {
                        this.$Message.error("查询出错");
                    }
                    if (res.data.data.list.length == 0) {
                        // console.log(0)
                        this.$Message.error("数据为空");
                    }
                });
            },
            zcFind() {
                //渲染 查询页
                let data = {
                    page: 1,
                    row: 10,
                    title: "",
                    createName: "",
                    depName: ""
                };
                this.getPolicyStatuteList(data);
            },
            // 双击后 根据id 查询
            zcIdC(id) {
                console.log(id, 444);
                this.$store.commit('addZcfgId', id);
                this.editorShow = true;
                this.fileNames = [];
                this.fileId = [];
                this.fileTNames = [];
                let data = {id: id};
                this.$axios.getPolicyStatute(data).then(res => {
                    // console.log(res,'res')
                    console.log(res.data);
                    if (res.data.ret == 1) {
                        let list = res.data.data;
                        this.content = list.content;
                        this.title = list.title;
                        this.params = list.policyType;
                        this.updateFlag = true;
                        var fileNameIds = [];
                        var fileTNames = [];
                        for (let i = 0; i < list.file.length; i++) {
                            fileNameIds.push(list.file[i].fileId);
                            fileTNames.push(list.file[i].fileName);
                        }
                        console.log(this.fileTNames, 'name')
                        this.fileId = fileNameIds;
                        this.fileTNames = fileTNames;

                    }
                });
            },
            // 根据输入的查询条件 点击查询列表
            find() {
                let data = {
                    page: 1,
                    row: 10,
                    title: this.fTitle,
                    createName: this.fCreateName,
                    depName: this.fDepName
                };
                console.log(data);
                this.getPolicyStatuteList(data);
            },

            checkA() {
                this.titleData.forEach((item, index) => {
                    item.ifc = true;
                });
                this.checkList = this.checkData;
                this.fTitle = "";
                this.fCreateName = "";
                this.fDepName = "";
                this.reload();
            },
            //富文本添加弹出框
            showAdd() {
                console.log(1);
                console.log(this.fTitle,this.fCreateName,33445567)
                this.editorShow = true;
                this.title = '';
                this.content = '';
                this.params = 1;
                this.fileId = [];
                this.fileTNames = [];
                this.fileNames = [];
            },

            //点击 x 号退出
            quit() {

                this.title = '';
                this.content = '';

                this.fileId = [];
                this.fileTNames = [];
                this.fileNames = [];
                this.editorShow = false;
                this.updateFlag = false;
            },
            //点击确定按钮提交
            editorSure(event) {

                if (this.updateFlag == true) {
                    event.preventDefault();
                    let formData = new FormData();
                    formData.append("title", this.title);
                    formData.append("content", this.content);
                    formData.append("policyType", this.params);
                    formData.append("id", this.$store.state.zcfgId);
                    formData.append('fbrName', this.$store.state.info.fullName);
                    formData.append('fbrId', this.$store.state.info.userId);
                    formData.append('file',this.fileId);
                    console.log(this.fileId,'xiugaiId');
                    for(var j = 0;j<this.fileNames.length;j++){
                        console.log(this.fileNames[j],55555)
                        formData.append('newFile',this.fileNames[j]);
                    }
                    // formData.append('file', this.fileNames);
                    let config = {
                        headers: {"Content-Type": "multipart/form-data"}
                    };
                    this.$http
                        .post(this.$axios.updatePolicyStatute(), formData, config)
                        .then(res => {
                            console.log(res);
                            if (res.data.ret == 1) {
                                let data = {
                                    page: 1,
                                    row: 10,
                                    title: "",
                                    createName: "",
                                    depName: ""
                                };
                                this.$Message.success("修改成功");
                                this.getPolicyStatuteList(data);
                            }
                        });

                } else {
                    if (this.title == "") {
                        this.$Message.error("标题为空");
                    } else {
                        event.preventDefault();
                        let formData = new FormData();
                        console.log(this.fileNames)
                        console.log(this.$store.state.info, 'infoinfoinfo')
                        formData.append("title", this.title);
                        formData.append("content", this.content);
                        formData.append("policyType", this.params);
                        console.log(this.$store.state.info.departName, this.$store.state.info.fullName)
                        formData.append('depName', this.$store.state.info.departName);
                        formData.append('depCode', this.$store.state.info.departCode);
                        formData.append('fbrName', this.$store.state.info.fullName);
                        formData.append('fbrId', this.$store.state.info.userId);
                        for(var j = 0;j<this.fileNames.length;j++){
                            console.log(this.fileNames[j],55555)
                            formData.append('file',this.fileNames[j]);
                        }
                        let config = {
                            headers: {"Content-Type": "multipart/form-data"}
                        };
                        this.$http
                            .post(this.$axios.addPolicyStatute(), formData, config)
                            .then(res => {
                                console.log(res);
                                if (res.data.ret == 1) {
                                    let data = {
                                        page: 1,
                                        row: 10,
                                        title: "",
                                        createName: "",
                                        depName: ""
                                    };
                                    this.getPolicyStatuteList(data);
                                    this.$Message.success("添加成功");
                                }
                            });

                    }
                }
                this.updateFlag = false;
                this.editorShow = false;
            },

        },
        mounted: function () {
            let id = this.$store.state.info.userId;
            if (JSON.parse(localStorage.getItem(id + 'tabDrag33')) != undefined) {
                this.titleData = JSON.parse(localStorage.getItem(id + 'tabDrag33'));

            }
            this.$nextTick(function () {
                this.titleData.forEach((item, index) => {
                    if (item.ifc) {
                        this.checkList.push(item.title);
                    }
                    this.checkData.push(item.title);
                });
            });
            //渲染 查询页
            let data = {
                page: 1,
                row: 10,
                title: "",
                createName: "",
                depName: ""
            };
            this.$axios.getPolicyStatuteList(data).then(res => {
                console.log(res);
                console.log(res.data.data.list);
                if (res.data.ret) {
                    console.log(1);
                    let list = res.data.data.list;
                    let arr = [];
                    for (let i = 0; i < list.length; i++) {
                        let obj = {};
                        obj.title = list[i].title;
                        obj.depName = list[i].depName;
                        obj.fbrName = list[i].fbrName;
                        obj.updateTime = list[i].updateTime;

                        // console.log(list[i].content, 33);
                        // 正则去除p 标签
                        var s = list[i].content;
                        s = s.replace(/<\/?p[^>]*>/gi, "");
                        obj.content = s;
                        obj.id = list[i].id;
                        arr.push(obj);
                    }
                    this.mainData = arr;
                    this.pageNum = res.data.data.recordTotal;
                    // console.log(this.pageNum,'1111')
                    console.log(this.mainData, 222);
                }
            });
        },
        data() {
            return {
                sele: 100,
                fTitle: "",
                fCreateName: "",
                fDepName: "",
                params: "1", // 弹出框类型默认值
                fileNames: [],
                fileId:[],
                fileTNames: [],
                fileId: [],
                updateFlag: false,
                checkData: [],
                checkList: [],
                depart: "",
                editorShow: false,
                curr: "",
                // 单位编号
                unitId: "",
                // 填报人
                applicate: "",
                // 填报部门
                department: "",
                content: "", //富文本器内容
                title: "", // 弹出框标题
                // policyType: "", //弹出框内容类型
                editorOption: {
                    modules: {
                        toolbar: [
                            [{header: 1}, {header: 2}],
                            [{header: [1, 2, 3, 4, 5, 6, false]}],
                            [{size: ["small", false, "large", "huge"]}],
                            [{direction: "rtl"}],
                            [{list: "ordered"}, {list: "bullet"}],
                            [{indent: "-1"}, {indent: "+1"}],
                            [{script: "sub"}, {script: "super"}],
                            ["bold", "italic", "underline", "strike"], // toggled buttons
                            ["blockquote", "code-block"]
                        ]
                    }
                },

                titleData: [
                    {
                        title: "政策标题",
                        name: "title",
                        width: 394,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "发布部门",
                        name: "depName",
                        width: 254,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "发布人",
                        name: "fbrName",
                        width: 294,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "发布时间",
                        name: "updateTime",
                        width: 200,
                        color: "#fff",
                        ifc: true
                    },
                    {
                        title: "政策描述",
                        // name: "content",
                        width: 521,
                        color: "#fff",
                        ifc: true
                    }
                ],
                mainData: [],
                pageNum: "" //查询的条数
            };
        }
    };
</script>
<style scoped>
    /* html,
                      body {
                        display: block;
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 100%;
                        height: 100%;



                      } */
    .editorBg {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 3;
        top: 0px;
        left: 0px;

        filter: Alpha(opacity=50);
        opacity: 0.5;
        background-color: #000;
    }

    .editor-top {
        height: 50px;
        background: #449be1;
    }

    .editor-top span,
    .back {
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin-left: 20px;
        font-size: 20px;
        color: #fff;
    }

    .editor-top .back {
        float: right;
        margin-right: 10px;
        cursor: pointer;
    }

    .editor-main {
        width: 1000px;
        height: 510px;

        z-index: 10;
        background: #fff;
    }

    .editor-main table {
        width: 983px;
        height: 500px;
        overflow-y: auto;
        /* margin:0 auto; */
        border-collapse: collapse;
    }

    .editor-main table tr td {
        border: 1px solid #ccc;
    }

    .editor-main table tr td:nth-child(1) div {
        text-align: center;
    }

    .editor-main table tr td:nth-child(1) div {
        width: 80px;
    }

    .editor-main table tr td:nth-child(2) div {
        width: 900px;
    }

    .editor-main table tr:nth-child(1) td {
        height: 50px;
    }

    .editor-main table tr:nth-child(2) td:nth-child(2) {
        position: relative;
        height: 400px;
    }

    .editor-main table tr:nth-child(2) td:nth-child(1) {
        /* position: relative; */
        height: 400px;
    }

    .editor-main table tr:nth-child(3) td {
        height: 50px;
    }

    .editor-main table tr:nth-child(1) td:nth-child(2) div input {
        width: 100%;
        border: none;
        height: 50px;
        font-size: 20px;
        color: #434343;
    }

    .quill-editor {
        position: absolute;
        left: 0;
        top: 0;
        height: 358px;
    }

    .editor-bottom {
        text-align: right;
        margin-right: 48px;
        margin-top: 5px;
    }

    .editor-bottom .btn1,
    .editor-bottom .btn2 {
        width: 50px;
        height: 30px;
        text-align: center;
        font-size: 16px;
        line-height: 30px;
        background: #449be1;
        border: none;
        border-radius: 4px;
    }

    .editor-bottom .btn2 {
        background: #dddfdc;
        margin-left: 20px;
    }
</style>
<style lang="less" scoped>
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
