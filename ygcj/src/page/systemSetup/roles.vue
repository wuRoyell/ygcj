<template>
  <div id="roles" >
    <Row :gutter="16" type="flex" justify="center" class="code-row-bg">
      <Col span="6">
        <div>
          <Card style="width:100%;text-align:left;height:84vh;min-width: 300px;position: relative;">
            <Spin fix v-if="loading">
              <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            <p class="title">角色列表</p>
            <Button
              class="fr"
              style="margin-top:-20px;"
              :disabled="roleActive == null"
              type="primary"
              @click="roleSee"
            >查看</Button>

            <Button
              class="fr"
              type="primary"
              @click="modal1 = true"
              style="margin:-20px 10px 12px 0;float:right"
            >新增</Button>

            <Modal v-model="modal1" title="新增用户" @on-visible-change="roleMAChange">
              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="90"
              >
                <!-- 用户账号 -->
                <FormItem label="角色编号 :" prop="roleCode" required>
                  <Input type="number" v-model="formValidate.roleCode" placeholder="输入角色编号"></Input>
                </FormItem>
                <!-- 用户名 -->
                <FormItem label="角色名 :" prop="roleName" required>
                  <Input v-model="formValidate.roleName" placeholder="输入角色名"></Input>
                </FormItem>
              </Form>
              <!-- 自定义按钮 -->
              <div slot="footer" style="text-align: center;">
                <Button size="large" @click="showRejectModal">取消</Button>
                <Button type="primary" size="large" @click="doSomething('formValidate')">新增</Button>
              </div>
            </Modal>

            <Modal v-model="modal2" title="编辑用户" @on-visible-change="roleMUChange">
              <Form
                ref="formValidate2"
                :model="formValidate2"
                :rules="ruleValidate2"
                :label-width="90"
              >
                <!-- 用户名 -->
                <FormItem label="角色名 :" prop="roleName" required>
                  <Input
                    v-model="formValidate2.roleName"
                    :value="formValidate2.roleName"
                    placeholder="输入角色名"
                  ></Input>
                </FormItem>
              </Form>
              <!-- 自定义按钮 -->
              <div slot="footer" style="text-align: center;">
                <Button size="large" @click="modal2 = false">取消</Button>
                <Button type="primary" size="large" @click="roleSubmit('formValidate2')">编辑</Button>
              </div>
            </Modal>
            <Modal v-model="modal3">
              <p>用户角色列表</p>
              <Table border :columns="columnsRole" :data="dataRole"></Table>
            </Modal>

            <div class="roleList">
              <ul>
                <li
                  v-for="(item,index) in roleList"
                  :key="index"
                  :class="roleActive == index?'active':null"
                  @click="roleLiClick(index,item)"
                >
                  <span :title="item.roleCode">{{item.roleCode}}</span>
                  <span :title="item.roleName">{{item.roleName}}</span>
                  <Button @click="roleEdit(item)">编辑</Button>
                  <Button style="margin-right: 5px;" @click="roleDel(index,item)">删除</Button>
                </li>
              </ul>
            </div>
          </Card>

        </div>
      </Col>
      <Col span="6">
        <div>
          <Card style="width:100%;height:84vh;overflow:auto">
            <div style="text-align:left">
              <p class="title">应用功能授权</p>
              <Button class="fr" style="margin-top:-20px;" type="primary" @click="toGrant">授权</Button>
              <Input
                style="height: 30px;line-height: 30px;margin: 12px 0;"
                placeholder="输入关键字"
                v-model="filterText"
              />
              <el-tree
                v-if="this.roleActive != null"
                :data="treeData"
                class="filter-tree"
                show-checkbox
                node-key="id"
                ref="tree"
                :filter-node-method="filterNode"
                @check-change="treeChange"
                :default-checked-keys="defaultKeys"
                name="tree"
                auto-expand-parent
                :default-expanded-keys="defaultKeys"
                :props="defaultProps"
              ></el-tree>
            </div>
          </Card>
        </div>
      </Col>
      <Col span="11">
        <div>
          <Card style="width:100%;height:84vh;">
            <div style="text-align:left">
              <a href="#" class="link-primary title">资源列表</a>
              <Table border :columns="columns7" :data="data6"></Table>
              <Page
                :total="0"
                style="padding-top:15px;float:right"
                show-total
                show-elevator
                show-sizer
              />
            </div>
          </Card>
        </div>
      </Col>
    </Row>
    <!-- </TabPane> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, //遮罩层
      flag: true,
      //  tab0:true,
      //新增模态框
      modal1: false,
      //编辑模态框
      modal2: false,
      //查看模态框
      modal3: false,
      //新增按钮的对话框部分
      roleList: [],
      roleActive: null, //当前选中的角色
      defaultKeys: [], //默认勾选的菜单集合
      expendKeys:[],// 默认展开的菜单集合
      // 新增遮罩层信息里的内容
      formValidate: {
        roleCode: "", //角色编号
        roleName: "" //角色名
      },
      // 如果表单为空返回的信息
      ruleValidate: {
        roleCode: [
          { required: true, message: "角色编号不能为空", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" }
        ]
      },
      // 修改遮罩层信息里的内容
      formValidate2: {
        id: null, //角色id
        roleName: "" //角色名
      },
      // 如果表单为空返回的信息
      ruleValidate2: {
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" }
        ]
      },
      //查看里面的用户角色列表
      columnsRole: [
        {
          title: "角色编号",
          key: "roleCode"
        },
        {
          title: "角色名称",
          key: "roleName"
        }
      ],
      dataRole: [],
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "permissionName"
      },
      //资源列表表格数据
      columns7: [
        {
          title: "编码",
          key: "coding",
          sortable: true
        },
        {
          title: "名称",
          key: "name",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },

        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: [],
      updateRole: {
        roleId: null,
        permissionList: []
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getRole();
    this.getPermission();
  },
  methods: {
    //授权
    toGrant() {
      this.$nextTick(function() {

        this.updateRole.permissionList = this.$refs.tree.getCheckedKeys();
        // console.log(this.$refs.tree.getHalfCheckedKeys());
       this.updateRole.permissionList = this.updateRole.permissionList.concat(this.$refs.tree.getHalfCheckedKeys());
      });
      this.loading = true;
      console.log(this.updateRole,'rolee')
      this.$axios.updateRolePermission(this.updateRole).then(res => {
        this.loading = false;
        if (res.data.ret === 1) {
          // this.roleActive = null;
          this.getRole();
          this.$Message.success("角色授权成功");
        } else {
          this.$Message.warning(res.data.retMsg);
        }
      });
    },
    //菜单节点改变
    treeChange(data, ifc, node) {},
    //当前选中角色
    roleLiClick(index, row) {
      console.log(index,row)
      this.defaultKeys = [];
      this.expendKeys = [];
      row.permissionInfo.forEach((item, index) => {
        if(item.permissionLevel == 1){
          this.expendKeys.push(item.id);
        }else{
          this.defaultKeys.push(item.id);
        }

      });
      this.roleActive = index;
      this.updateRole.roleId = row.id;
      console.log(this.defaultKeys,233)
      if (this.$refs.tree !== undefined) {

          this.$refs.tree.setCheckedNodes(this.defaultKeys);

      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.permissionName.indexOf(value) !== -1;
    },
    //关闭修改模态框
    roleMUChange(index) {
      if (!index) {
        this.$refs["formValidate2"].resetFields();
      }
    },
    //关闭新增模态框
    roleMAChange(index) {
      if (!index) {
        this.$refs["formValidate"].resetFields();
      }
    },
    //角色修改
    roleSubmit(name) {
      let that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          that.loading = true;
          that.$axios.updateRole(this.formValidate2).then(res => {
            that.loading = false;
            if (res.data.ret === 1) {
              this.modal2 = false;
              that.getRole();
              that.$refs[name].resetFields();
              that.$Message.success("角色修改成功");
            } else {
              that.$Message.warning(res.data.retMsg);
            }
          });
        }
      });
    },
    //查询所有角色
    getRole() {
      this.loading = true;
      this.$axios.getRoleVO().then(res => {
        this.loading = false;
        console.log(res,'role')
        if (res.data.ret === 1) {
          this.roleList = res.data.data.roleVOList;
        } else {
          this.$Message.warning(res.data.retMsg);
        }
      });
    },
    //查询权限菜单
    getPermission() {
      this.loading = true;
      this.$axios.getPermission().then(res => {
        console.log(res);
        this.loading = false;
        if (res.data.ret === 1) {
          this.treeData = res.data.data.permissionTree;
        } else {
          this.$Message.warning(res.data.retMsg);
        }
      });
    },
    //新增按钮弹出来的对话框
    doSomething(name) {
      let that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          that.loading = true;
          that.$axios.addRole(this.formValidate).then(res => {
            console.log(res);
            that.loading = false;
            if (res.data.ret === 1) {
              that.modal1 = false;
              this.roleActive = null;
              that.getRole();
              that.$refs[name].resetFields();
              that.$Message.success("添加成功");
            } else {
              that.$Message.warning(res.data.retMsg);
            }
          });
        }
      });
    },
    showRejectModal() {
      this.$Message.info("已取消");
      this.modal1 = false;
    },
    //点击li查看按钮变可用
    formValidatelist(obj) {
      this.flag = false;
    },
    //查看功能
    roleSee() {
      this.dataRole = [];
      this.dataRole.push(this.roleList[this.roleActive]);
      this.modal3 = true;
    },
    //角色列表的删除按钮
    roleDel(index, row) {
      let that = this;
      this.$Modal.confirm({
        title: "删除角色",
        content: "<p>是否确定删除角色:  " + row.roleName + "</p>",
        onOk: () => {
          that.loading = true;
          that.$axios.delRole({ id: row.id }).then(res => {
            that.loading = false;
            this.roleActive = null;
            if (res.data.ret === 1) {
              that.getRole();
              that.$Message.success("删除成功！");
            } else {
              that.$Message.warning(res.data.retMsg);
            }
          });
        },
        onCancel: () => {
          this.$Message.warning("已取消");
        }
      });
    },
    //角色列表的编辑按钮
    roleEdit(row) {
      this.formValidate2.id = row.id;
      this.formValidate2.roleName = row.roleName;
      this.modal2 = true;
    },
    show(index) {
      this.$Modal.info({
        title: "用户信息",
        content: `编码：${this.data6[index].coding}<br>名称：${
          this.data6[index].name
        }`
      });
    },
    //删除一行
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>

<style scope lang="less">
#roles {
  .fr {
    float: right;
  }
  .title {
    font-weight: 700;
  }

  /* content部分 */
  .homeContent {
    height: 93vh;
    background-color: white;
  }
  .contentHeader {
    width: 100%;
    /* background-color: #f5f7fa; */
    padding: 15px 0 0 15px;
  }

  .ivu-tag {
    position: absolute;
    left: 10px;
    top: 77px;
    height: 32px;
    line-height: 32px;
    padding: 0px 21px;
  }
  .roleList {
    ul {
      clear: both;
      li {
        height: 40px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid #fff;
        padding: 5px;
        border-radius: 4px;
        transition: all 0.3s;
        &:hover {
          border: 2px solid #66b1ff;
          color: #66b1ff;
        }
        &.active {
          border: 2px solid #66b1ff;
          background: #66b1ff;
          color: #fff;
        }
        > span {
          display: inline-block;
          width: 90px;
          height: 100%;
          line-height: 30px;
          margin-left: 8px;
          float: left;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          &:first-child {
            margin: 0;
            width: 60px;
          }
        }
        button {
          float: right;
          padding: 4px 8px;
        }
      }
    }
  }
}
</style>
