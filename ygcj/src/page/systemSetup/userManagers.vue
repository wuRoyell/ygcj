<template>
  <div id="userManagers">
    <div class="managerCon">
      <!-- 部门选择 -->
      <div class="departManager">
        <!-- form表单 -->
        <Form :label-width="80"
              style="display:flex;">
          <FormItem label="用户账号 :">
            <!-- <Select v-model="forms.userNum" style="width:160px" placeholder="请选择用户账号" clearable>
              <Option
                v-for="(item,index) in number"
                :value="item.number"
                :key="index"
              >{{ item.number }}</Option>
            </Select> -->
            <Input v-model="forms.department"
                   placeholder="请填写用户账号"
                   style="width:160px;"
                
                   @on-focus="choose()"></Input>
          </FormItem>
          <!-- <FormItem label="选择部门 :">
            <Input v-model="forms.department"
                   placeholder="请选择部门"
                   style="width:160px;"
                   value="消息A"
                   @on-focus="choose()"></Input>
          </FormItem> -->
        </Form>
      </div>
      <!-- 查询按钮 -->
      <div class="btn">
        <Button type="primary"
                style="margin-right:20px;"
                icon="ios-search">查询</Button>
        <Button type="primary"
                icon="md-refresh">重置</Button>
      </div>
    </div>
    <!-- 8个按钮 -->
    <div class="btnGroup">
      <Button type="primary"
              icon="md-add"
              size="small"
              @click=" add = true">用户录入</Button>
      <Button type="primary"
              icon="md-create"
              size="small"
              @click="compile = true">用户编辑</Button>
      <Button type="primary"
              icon="md-create"
              size="small">密码重置</Button>
      <Button type="primary"
              icon="md-create"
              size="small">锁定用户</Button>
      <Button type="primary"
              icon="md-create"
              size="small">激活用户</Button>
      <Button type="primary"
              icon="md-cloud-download"
              size="small">导入</Button>
      <Button type="primary"
              icon="ios-cloud-upload"
              size="small">导出</Button>
      <Button type="primary"
              icon="ios-cloud-upload"
              size="small">模板下载</Button>
    </div>
    <!-- table表格头部 -->
    <div class="tableList">
      <Table border
             :columns="columns1"
             :data="data1"
             height="660"
             @on-row-click="row"
             highlight-row></Table>
    </div>
    <!-- 尾部固定在离底部10px的位置上 -->
    <Affix :offset-bottom="20">
      <div class="footerContent">
        <!-- select -->
        <div style="float:left">
          <span>
            <Select v-model="forms.row"
                    style="width:80px;"
                    @on-change="selectRow">
              <Option v-for="item in pages"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span class="line"></span>
          <span class="pagination-first"
                @click="firstpage"
                style="cursor:pointer"></span>
          <span class="pagination-second"
                @click="beforePage"
                style="cursor:pointer"></span>
          <span class="line"></span>
          <Input v-model="forms.page"
                 style="width: 50px"
                 @on-change="selectPage"
                 type="number" />
          /{{pageTotal}}
          <span class="line"></span>
          <span class="pagination-third"
                @click="nextPage"
                style="cursor:pointer"></span>
          <span class="pagination-fourth"
                @click="lastPage"
                style="cursor:pointer"></span>
          <span class="line"></span>
          <span class="pagination-fifth"
                @click="fresh"
                style="cursor:pointer"></span>
        </div>
        <div class="partFoot"
             style="float:right;">
          <span>1-{{forms.row}}</span>
          <span>&nbsp共{{recordTotal}}条</span>
        </div>
      </div>
    </Affix>
    <!-- 一级模态框 -->
    <!-- 点击用户录入进行添加 -->
    <Modal v-model="add"
           width="800"
           @on-ok="addUser"
           @on-visible-change="visible">
      <div class="depTit">
        <span>人员</span>
      </div>
      <table align="center"
             cellspacing="0px"
             cellpadding="10px">
        <tbody>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              代码
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="code"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              姓名
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="userName"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              昵称
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="nickName"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              性别
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="sex"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">职称</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="title"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">电话</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="mobilephone"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">EMAIL</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="email"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">身份证号码</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="citizenNo"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              是否允许登录
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Select style="width:150px"
                      v-model="userStatus">
                <Option v-for="item in lists"
                        :value="item.value"
                        :key="item.value">{{item.label}}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              岗位
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="postStation"
                     readonly></Input>
              <Button type="primary"
                      @click="post = true"
                      style="marginLeft:10px">选择</Button>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              账号代码
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="accountCode"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">人员排序号</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="pNumber"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">证书序列号</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="cNumber"></Input>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="depForm">
        <div class="formLeft">
          <div v-for="item in personLeft1" :key="item.name">
            <span style="font-size:14px;font-weight:600">{{item.name}}</span>
            <span style="color:#DF0009;font-size:16px;margin-right:10px;">{{item.num}}</span>
            <input
              type="text"
              v-model="item.key"
              style="border:none;border-bottom:1px solid;width:200px；outline:none"
            >
          </div>
        </div>
        <div class="personRight">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="width:200px;height:200px;"
          >
            <div style="padding: 20px 0">
              <Icon type="md-person" size="52" style="color: #3399ff"></Icon>
              <p>点击上传头像</p>
            </div>
          </Upload>
          <Button type="primary" style="marginLeft:-120px;marginTop:145px" @click="post = true">选择</Button>
        </div>
      </div>-->
    </Modal>

    <!-- 修改模态框 -->
    <Modal v-model="compile"
           width="800"
           @on-visible-change="update"
           @on-ok="updateUser">
      <div class="depTit">
        <span>人员</span>
      </div>
      <table align="center"
             cellspacing="0px"
             cellpadding="10px">
        <tbody>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              代码
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="code"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              姓名
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="userName"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              昵称
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="nickName"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              性别
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="sex"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">职称</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="title"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">电话</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="mobilephone"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">EMAIL</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="email"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">身份证号码</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="citizenNo"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              是否允许登录
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Select style="width:150px"
                      v-model="userStatus">
                <Option v-for="item in lists"
                        :value="item.value"
                        :key="item.value">{{item.label}}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              岗位
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="postStation"
                     readonly></Input>
              <Button type="primary"
                      style="marginLeft:10px"
                      @click="post = true">选择</Button>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
              <span style="color:#F99898">*</span>
              账号代码
            </td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="accountCode"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">人员排序号</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="pNumber"></Input>
            </td>
          </tr>
          <tr>
            <td align="right"
                style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">证书序列号</td>
            <td style="background:white;padding-left:10px;border-left:none;">
              <Input style="width:150px"
                     v-model="cNumber"></Input>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>

    <!-- 二级模态框 -->
    <Modal v-model="post"
           class-name="vertical-center-modal"
           title="岗位设置"
           @on-ok="ok"
           @on-visible-change="choice"
           ref="secondTree">
      <div style="height:514px;overflow:auto;overflow-x:hidden">
        <Tree :data="dataTree"
              :render="renderContent"
              ref="tree"
              show-checkbox
              @on-check-change="getNodes"></Tree>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    inject: ["reload"],
    data() {
      return {
        postList: [],
        //修改弹框
        compile: false,
        //总共多少条
        recordTotal: "",
        //人员代码
        code: "",
        //人员姓名
        userName: "",
        //人员昵称
        nickName: "",
        //人员职称
        title: "",
        //人员EMAIL
        email: "",
        //人员账号代码
        accountCode: "",
        //人员排序号
        pNumber: "",
        //人员证书序列号
        cNumber: "",
        //人员电话
        mobilephone: "",
        //人员性别
        sex: "",
        //人员身份证号码
        citizenNo: "",
        //人员是否登录下拉
        userStatus: "",
        //岗位
        postStation: "",
        //   是否末级下拉框
        lists: [
          { value: "--请选择--", label: "--请选择--" },
          { value: 1, label: "是" },
          { value: 0, label: "否" }
        ],
        userId: "",
        dataTree: [],
        childTree: [],
        defaultProps: {
          children: "children",
          label: "orgName"
        },
        personLeft1: [
          { name: "代码", num: "*", key: "084669" },
          { name: "姓名", num: "*", key: "高萍" },
          { name: "性别", num: "*", key: "女" },
          { name: "职称", num: "", key: "" },
          { name: "电话", num: "", key: "" },
          { name: "EMAIL", num: "", key: "" },
          { name: "身份证号码", num: "", key: "" },
          { name: "是否允许登录", num: "*", key: "是" },
          { name: "岗位", num: "", key: "" },
          { name: "账号代码", num: "*", key: "084669" },
          { name: "人员排序号", num: "", key: "" },
          { name: "证书序列号", num: "", key: "" }
        ],
        forms: {
          userNum: "",
          department: "",
          userName: "", //用户名
          nickname: "", //账号
          orgName: "", //组织机构名
          row: 10, //每页多少条
          page: 1 //第几页
        },
        add: false,
        post: false,
        station: "",
        number: [
          { number: "xiaoming" },
          { number: "admin" },
          { number: "zuhaong" }
        ],
        columns1: [
          { title: "序号", key: "id", align: "center", width: 60 },
          { title: "用户账号", key: "user_name" },
          { title: "用户名称", key: "nickname" },
          { title: "用户类型", key: "user_type" },
          { title: "组织机构", key: "ORG" },
          { title: "岗位", key: "POST" },
          { title: "角色", key: "role" },
          { title: "创建时间", key: "create_time" },
          { title: "状态", key: "user_status" },
          {
            title: "操作",
            key: "operation",
            align: "left",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {},
                    on: {
                      click: () => {
                        let that = this;
                        let userID = { id: this.userId };
                        this.$Modal.confirm({
                          title: "确定删除？",
                          onOk() {
                            this.$axios.delUser(userID).then(res => {
                              if (res.data.ret === 1) {
                                this.$Message.success(res.data.retMsg);
                                that.getVOlist();
                              } else {
                                this.$Message.success(res.data.retMsg);
                              }
                            });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        // orgGetData:{
        //   orgName:'',
        //   orgType:'',
        //   row:10,
        //   page:1,
        // },
        data1: [],
        pages: [
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 30, label: "30" }
        ],
        page: "10",
        //总页数
        pageTotal: 1
      };
    },
    mounted() {
      this.getVOlist();
      this.getOrganization();
    },
    methods: {
      //控制最大值
      // max() {
      //   console.log(this.forms.page);
      //   if (Number(this.forms.page) > this.pageTotal) {
      //     this.$set(this.forms, "page", this.pageTotal);
      //     console.log(this.forms.page);
      //   }
      // },
      fresh() {
        this.reload();
      },
      //二级对话框出来的时候保存节点
      choice() {
        // console.log(this.$refs.secondTree);
        // if (this.$refs.tree !== undefined) {
        // this.$refs.secondTree.setCheckedNodes(this.postList);
        // }
      },
      //获取所有的选中的节点
      getNodes() {
        // console.log(this.$refs.tree.getCheckedNodes());
        let arr = [];
        let arr2 = [];
        this.$refs.tree.getCheckedNodes().forEach(val => {
          if (val.orgType == "3") {
            arr.push(val.id);
            arr2.push(val.title);
          }
        });

        this.postList = arr;
        // console.log(arr2);
        // console.log(this.postList);
        var str = arr2.toString();
        console.log(str);
        this.postStation = str;
      },
      //提交更新
      updateUser() {
        let that = this;
        let obj = {
          code: this.code,
          userName: this.userName,
          nickName: this.nickName,
          title: this.title,
          email: this.email,
          accountCode: this.accountCode,
          peNumber: this.pNumber,
          ceNumber: this.cNumber,
          mobilephone: this.mobilephone,
          sex: this.sex,
          citizenNo: this.citizenNo,
          userStatus: this.userStatus,
          postList: this.postList,
          id: this.userId
        };
        console.log(obj);
        this.$axios.updateUser(obj).then(res => {
          // console.log(res);
          if (res.data.ret === 1) {
            this.$Message.success(res.data.retMsg);
            that.getVOlist();
          } else {
            this.$Message.err(res.data.retMsg);
          }
        });
      },
      //用户编辑
      update() {
        this.$axios.getUserVO(this.userId).then(res => {
          let arr = [];
          res.data.data.postList.forEach(val => {
            arr.push(val.postName);
          });
          let str = arr.toString();
          this.code = res.data.data.code;
          this.userName = res.data.data.userName;
          this.nickName = res.data.data.nickname;
          this.title = res.data.data.title;
          this.email = res.data.data.email;
          this.accountCode = res.data.data.accountCode;
          this.pNumber = res.data.data.peNumber;
          this.cNumber = res.data.data.ceNumber;
          this.mobilephone = res.data.data.mobilephone;
          this.sex = res.data.data.sex;
          this.citizenNo = res.data.data.citizenNo;
          this.userStatus = res.data.data.userStatus;
          this.postStation = str;
        });
      },
      //用户录入的时候清空数据
      visible() {
        this.code = "";
        this.userName = "";
        this.nickName = "";
        this.title = "";
        this.email = "";
        this.accountCode = "";
        this.pNumber = "";
        this.cNumber = "";
        this.mobilephone = "";
        this.sex = "";
        this.citizenNo = "";
        this.userStatus = "";
      },
      //一级模态框点击确认用户录入
      addUser() {
        let obj = {
          code: this.code,
          userName: this.userName,
          nickName: this.nickName,
          title: this.title,
          email: this.email,
          accountCode: this.accountCode,
          peNumber: this.pNumber,
          ceNumber: this.cNumber,
          mobilephone: this.mobilephone,
          sex: this.sex,
          citizenNo: this.citizenNo,
          userStatus: this.userStatus,
          postList: this.postList
          // postStation: this.postStation
        };
        this.$axios.addUser(obj).then(res => {
          // console.log(res);
          if (res.data.ret === 1) {
            this.$Message.success(res.data.retMsg);
            this.getVOlist();
          }
        });
      },
      selectRow() {
        this.getVOlist();
      },
      selectPage() {
        if (Number(this.forms.page) > this.pageTotal) {
          // this.forms.page = this.pageTotal;
          this.$set(this.forms, "page", this.pageTotal);
          console.log(this.forms.page);
        }
        this.getVOlist();
      },
      //增加页数
      nextPage() {
        if (this.pageTotal > this.forms.page) {
          this.forms.page++;
          this.getVOlist();
        }
      },
      //减少页数
      beforePage() {
        if (this.forms.page > 1) {
          this.forms.page--;
          this.getVOlist();
        }
      },
      //第一页
      firstpage() {
        this.forms.page = 1;
        this.getVOlist();
      },
      //最后一页
      lastPage() {
        this.forms.page = this.pageTotal;
        this.getVOlist();
      },
      treeChange(data, ifc, node) {
        let org = data;
        let orgCode = data.orgCode;
        this.$axios.getDepartmentAllByOrgCode(orgCode).then(res => {
          if (res.data.ret === 1) {
            // console.log(org)
            console.log(res.data.data);
            // console.log(this.dataTree)
            // let child = res.data.data
            // org["children"] = child

            // this.childTree = res.data.data;
          } else {
            this.$Message.err(res.data.retMsg);
          }
        });
      },
      ok() { },
      // 点击行拿回数据
      row(row, index) {
        this.userId = row.user_id;
      },
      choose() { },
      // 获取全部信息
      getVOlist() {
        // console.log(this.page);
        this.$axios.getVOlist(this.forms).then(res => {
          console.log(res, 'getlist');
          if (res.data.ret === 1) {
            // this.rowcount = res.data.data.pageInfo.count;
            this.data1 = res.data.data.list;
            // console.log(res.data.data.list);
            res.data.data.list.forEach((val, index) => {
              val.id = index + 1;
            });
            this.pageTotal = res.data.data.pageTotal;
            this.recordTotal = res.data.data.recordTotal;
          } else {
            this.$Message.error(res.data.retMsg);
          }
        });
      },
      //查询组织机构信息
      // getOrganization() {
      // this.$axios.getOrganization(this.orgGetData).then(res => {
      //   // console.log(res);
      //   if (res.data.ret === 1) {
      //     this.dataTree = res.data.data[0].children;
      //   } else {
      //     this.$Message.warning(res.data.retMsg);
      //   }
      // });
      // }
      getOrganization() {
        this.$axios.getOrganization().then(res => {
          // console.log(res);
          var that = this;
          function getTree(treeNodes) {
            let data = [];
            if (!!treeNodes && treeNodes.length !== 0) {
              treeNodes.forEach(item => {
                let obj = {};
                obj.title = item.orgName;
                obj.orgType = item.orgType;
                obj.children = getTree(item.children);
                obj.orgCode = item.orgCode;
                obj.orgFullname = item.orgFullname;
                obj.orgParentName = item.orgParentName;
                obj.id = item.id;
                obj.render = (h, { root, node, data }) => {
                  return h(
                    "div",
                    {
                      style: {
                        display: "inline-block",
                        width: "100%",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          // console.log(data);
                          that.orgCode = node.node.orgCode;
                          let children = node.node.children;
                          let OC = { orgCode: that.orgCode };
                          //查询指定单位下部门列表
                          that.$axios.getDepartmentAllByOrgCode(OC).then(res => {
                            // console.log(res);
                            let list = res.data.data;
                            list.forEach(item => {
                              let obj = {};
                              obj.depCode = item.depCode;
                              obj.title = item.depName;
                              obj.id = item.id;
                              obj.depType = item.depType;
                              obj.orgCode = item.orgCode;
                              obj.orgName = item.orgName;
                              obj.children = [];
                              obj.depCode = item.depCode;
                              obj.orgType = item.orgType;
                              children.push(obj);
                              //查询往树里面添加部门的时候去重
                              var obj2 = {};
                              var arr = children.reduce(function (item, next) {
                                obj2[next.id]
                                  ? ""
                                  : (obj2[next.id] = true && item.push(next));
                                return item;
                              }, []);
                              children = arr;
                              node.node.children = children;
                              that.father = node.node.children;
                            });
                          });
                        }
                      }
                    },
                    [
                      h("span", [
                        h("img", {
                          attrs: {
                            src: require("../../assets/image/renli.png")
                          },
                          style: {
                            marginRight: "5px"
                          }
                        }),
                        h("span", data.title)
                      ]),
                      h("span", {
                        style: {
                          display: "inline-block",
                          float: "right",
                          marginRight: "32px"
                        }
                      })
                    ]
                  );
                };
                data.push(obj);
              });
            }
            return data;
          }
          if (res.data.ret === 1) {
            this.dataTree = getTree(res.data.data);
          } else {
            this.$Message.warning(res.data.retMsg);
          }
        });
      },
      //新增分支
      renderContent(h, { root, node, data }) {
        if (node.parent > 1) {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                cursor: "pointer"
              },
              on: {
                click: () => {
                  if (data.orgType === "2") {
                    //查询指定部门下的岗位列表
                    let depCode = { depCode: node.node.depCode };
                    let postChildren = node.node.children;
                    this.$axios.getPostById(depCode).then(res => {
                      // console.log(res);
                      let list = res.data.data;
                      list.forEach(item => {
                        let obj = {};
                        obj.depCode = item.depCode;
                        obj.depName = item.depName;
                        obj.postCode = item.postCode;
                        obj.title = item.postName;
                        obj.orgType = item.orgType;
                        obj.id = item.id;
                        obj.children = [];
                        postChildren.push(obj);
                        //查询往树里面添加岗位的时候去重
                        var obj2 = {};
                        var arr = postChildren.reduce(function (item, next) {
                          obj2[next.id]
                            ? ""
                            : (obj2[next.id] = true && item.push(next));
                          return item;
                        }, []);
                        postChildren = arr;
                        node.node.children = postChildren;
                      });
                    });
                  }
                  if (data.orgType === "3") {
                    let arr = [];

                    console.log(data);
                  }
                  //点击查询人员
                  // if (node.node.orgType === "3") {
                  //   let children = node.node.children;
                  //   let id = { id: node.node.id };
                  //   let str = { postCode: data.postCode };
                  //   // console.log(str);
                  //   //查询岗位下的所有角色信息
                  //   this.$axios.getPostInfoAllByPostCode(str).then(res => {
                  //     // console.log(res);
                  //     if (res.data.ret === 1) {
                  //       this.postBody = res.data.data;
                  //     }
                  //   });
                  //   this.$axios.getPostUserList(id).then(res => {
                  //     // console.log(res);
                  //     let list = res.data.data;
                  //     list.forEach(item => {
                  //       // console.log(item);
                  //       let obj = {};
                  //       obj.title = item.userName;
                  //       obj.id = item.id;
                  //       obj.orgType = item.orgType;
                  //       obj.parCode = data.id;
                  //       // console.log(obj);
                  //       children.push(obj);
                  //       //去重
                  //       var obj2 = {};
                  //       var arr = children.reduce(function(item, next) {
                  //         obj2[next.id]
                  //           ? ""
                  //           : (obj2[next.id] = true && item.push(next));
                  //         return item;
                  //       }, []);
                  //       children = arr;
                  //       node.node.children = children;
                  //     });
                  //   });
                  // }

                  // if (node.node.orgType === "4") {
                  //查询人员上部门基本信息
                  // console.log(data);
                  // this.$axios.getUserVO(data.id).then(res => {
                  // console.log(res);
                  // if (res.data.ret === 1) {
                  // this.code = res.data.data.code;
                  // this.userName = res.data.data.userName;
                  // this.title = res.data.data.title;
                  // this.email = res.data.data.email;
                  // this.accountCode = res.data.data.accountCode;
                  // this.pNumber = res.data.data.peNumber;
                  // this.cNumber = res.data.data.ceNumber;
                  // this.mobilephone = res.data.data.mobilephone;
                  // this.sex = res.data.data.sex;
                  // this.citizenNo = res.data.data.citizenNo;
                  // this.userStatus = res.data.data.userStatus;
                  // }
                  // });
                  //查询人员下面任职情况信息
                  // this.$axios.getUserServing(data.id).then(res => {
                  //   // console.log(res);
                  //   if (res.data.ret === 1) {
                  //     this.personBody = res.data.data;
                  //   }
                  // });
                  // }
                  // this.info = { root, node, data };
                  // const parentKey = root.find(el => el === node).parent;
                  // const parent = root.find(el => el.nodeKey === parentKey).node;
                  // this.formRight[0].key = parent.title;
                }
              }
            },
            [
              h("span", [
                h("img", {
                  attrs: {
                    src: require("../../assets/image/renli.png")
                  },
                  style: {
                    marginRight: "5px"
                  }
                }),
                h("span", data.title)
              ]),
              h("span", {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              })
            ]
          );
        } else {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                cursor: "pointer"
              },
              on: {
                click: () => {
                  // console.log(node.nodeKey);
                  this.info = { root, node, data };
                }
              }
            },
            [
              h("span", [
                h("img", {
                  attrs: {
                    src: require("../../assets/image/lou (1).png")
                  },
                  style: {
                    marginRight: "5px"
                  }
                }),
                h("span", data.title)
              ]),
              h("span", {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              })
            ]
          );
        }
      }
    }
  };
</script>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
<style scoped>
  .managerCon {
    display: flex;
    justify-content: space-between;
  }
  .btnGroup button {
    margin: 0 11px 0 0;
  }
  .tableList {
    width: 98%;
    margin: 20px auto;
  }
  /* 删除样式 */
  .del {
    background-color: #21b9bb;
    border-color: #21b9bb;
    color: #ffffff;
    border-radius: 3px;
    padding: 2px 6px;
    font-size: 12px;
    line-height: 1.5;
    display: inline-block;
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  /* 尾部内容 */
  .footerContent {
    width: 98%;
    height: 45px;
    line-height: 40px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    background: #f5f7fa;
  }
  .line {
    display: inline-block;
    vertical-align: middle;
    height: 25px;
    border: 1px solid #ddd;
    margin: 0 10px 0 9px;
  }
  .pagination-first {
    display: inline-block;
    width: 20px;
    height: 13px;
    background: url(../../assets/image/nrxt.png) no-repeat 0 0;
  }
  .pagination-second {
    display: inline-block;
    width: 20px;
    height: 13px;
    background: url(../../assets/image/nrxt.png) no-repeat -16px 0;
  }
  .pagination-third {
    display: inline-block;
    width: 20px;
    height: 13px;
    background: url(../../assets/image/nrxt.png) no-repeat -32px 0;
  }
  .pagination-fourth {
    display: inline-block;
    width: 20px;
    height: 13px;
    background: url(../../assets/image/nrxt.png) no-repeat -47px 0;
  }
  .pagination-fifth {
    display: inline-block;
    width: 20px;
    height: 13px;
    background: url(../../assets/image/nrxt.png) no-repeat -64px 0;
  }
  .depTit {
    color: black;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .depTit span {
    display: inline-block;
    text-align: center;
    margin-top: 20px;
  }
  .depForm {
    display: flex;
    justify-content: space-between;
  }
  .formLeft {
    margin-left: 15%;
    margin-top: 30px;
    text-align: right;
  }
  .formLeft div {
    padding: 20px 0 0 0;
  }
  .personRight {
    margin-top: 50px;
    margin-right: 50px;
  }
</style>
