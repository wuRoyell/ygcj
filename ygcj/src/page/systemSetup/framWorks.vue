<template>
  <div id="farmworks">
    <div class="organizationTotal">
      <!-- 左右联级面板 -->
      <div class="demo-split">
        <!-- 左边联级面板设置最小宽度300px -->
        <Split v-model="split"
               min="320px">
          <!-- 左边联级面板里面的机构管理内容 -->
          <div slot="left"
               class="demo-split-pane splitLeft">
            <div class="panel-header">
              <span>机构管理</span>
            </div>
            <!-- 添加单位 -->
            <div class="add">
              <!-- <Button type="primary" size="small" icon="md-add" @click="addOrganization">添加单位</Button> -->
            </div>
            <!-- 树形联动-->
            <div class="organizationTree">
              <Tree :data="dataTree"
                    :render="renderContent"
                    @on-select-change="handleSelect"
                    @on-toggle-expand='handleToggle'
                    ref="tree4"></Tree>
            </div>
            <!-- 右键菜单 -->
            <Dropdown transfer
                      ref="contentMenu"
                      style="display: none;"
                      trigger="click"
                      placement="right-start"
                      @on-click="append">
              <DropdownMenu slot="list"
                            ref="ppp"
                            style="min-width: 80px;">
                <DropdownItem name="add">增加</DropdownItem>
                <DropdownItem name="change">修改菜单</DropdownItem>
                <DropdownItem name="del">删除菜单</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <!-- 联级面板右边设置 -->
          <div slot="right"
               class="demo-split-pane">
            <!-- 公司 -->
            <div v-show="companyShow"
                 style="height:100%">
              <!-- 江苏财政局基本信息 -->
              <div class="message">
                <div class="tabWrap">
                  <!-- 单位基本信息tab设置 -->
                  <ul class="tab">
                    <li>
                      <span>
                        <Icon type="md-settings"
                              style="padding-right:3px;color:#017462;"
                              size="17" />
                      </span>
                      <span>单位基本信息</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 所有单位的table表格里面的内容 -->
              <div class="tableList">
                <table align="center"
                       cellspacing="0px"
                       cellpadding="10px"
                       style="height:120px;overflow:auto">
                  <tbody>
                    <!-- 第一个tr -->
                    <tr v-for="item in comPanyList1"
                        :key="item.id">
                      <!-- 左边为所填的基本信息 -->
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <!-- 第二个位input框 -->
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input v-model="item.key"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input v-model="item.num"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList2"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Input v-model="item.key"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model1"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in companyStype"
                                  :value="item.value"
                                  :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList3"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Input v-model="item.key"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">{{item.code}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Input v-model="item.num"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList4"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model2"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in lists"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model3"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in usermake"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList5"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">{{item.name}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model4"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in workList"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model5"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in companyType"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList6"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model6"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in fincLevel"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Input v-model="item.num"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList7"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model7"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in provence"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model8"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in city"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList8"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Select v-model="model9"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in area"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none;">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none;">
                        <Input v-model="item.num"
                               style="width:150px"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList9"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none">{{item.name}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.key"
                               style="width:150px;"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none">
                        <span style="color:#F99898">*</span>
                        {{item.code}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.num"
                               style="width:150px;"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList10"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;;border-top:none">
                        <span style="color:#F99898">*</span>
                        {{item.name}} :
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.key"
                               style="width:150px;"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none">{{item.code}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.num"
                               style="width:150px;border-top:none"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr v-for="item in comPanyList11"
                        :key="item.id">
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-top:none">{{item.name}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.key"
                               style="width:150px;"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none;border-top:none">{{item.code}} :</td>
                      <td style="background:white;padding-left:10px;border-left:none;border-top:none">
                        <Input v-model="item.num"
                               style="width:150px;border-top:none"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr style="background:white;width:100%">
                      <td align="right"
                          style="border-top:none;min-width:110px;width:280px;background:#f5f5f5;padding:20px 10px 15px 0px;">政府职能 ：</td>
                      <td style="border-left:none;border-top:none;border-right:none;padding-left:10px;">
                        <Input v-model="policy"
                               style="width:300px;margin-top:10px;margin-bottom:10px;min-height:50px;"
                               type="textarea"
                               :readonly="personflag"></Input>
                      </td>
                      <td style="border-left:none;border-top:none;border-right:none;"></td>
                      <td style="border-left:none;border-top:none;"></td>
                    </tr>
                    <tr style="background:white;width:100%">
                      <td align="right"
                          style="border-top:none;min-width:110px;width:280px;background:#f5f5f5;padding:20px 10px 15px 0px;"></td>
                      <td style="border-left:none;border-top:none;border-right:none;padding-left:10px;">
                        <!-- <Button type="primary"
                                @click="keep"
                                v-if="saveflag"
                                style="margin-left:5px;">保存</Button>
                        <Button type="primary"
                                icon="md-archive"
                                style="margin-left:5px;"
                                @click="saveUpdate"
                                v-if="updatesave">修改保存</Button>
                        <Button type="primary"
                                @click="minus"
                                style="margin-left:5px;"
                                v-if="updatesave">删除</Button>
                        <Button type="primary"
                                icon="md-archive"
                                style="margin-left:5px;"
                                @click="update"
                                v-if="updateflag">修改</Button> -->
                      </td>
                      <td style="border-left:none;border-top:none;border-right:none;"></td>
                      <td style="border-left:none;border-top:none;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- tab栏 -->
              <div class="tabWrap">
                <!-- 底部tab栏切换3个头部 -->
                <ul class="tab-tilte">
                  <li @click="cur=0"
                      :class="{active:cur==0}">
                    <span>
                      <Icon type="ios-search" />
                    </span>
                    <span>单位信息</span>
                  </li>
                  <li @click="cur=1"
                      :class="{active:cur==1}">
                    <span>
                      <Icon type="ios-search" />
                    </span>
                    <span>单位系统代码信息</span>
                  </li>
                  <li @click="cur=2"
                      :class="{active:cur==2}">
                    <span>
                      <Icon type="ios-search" />
                    </span>
                    <span>单位账套信息</span>
                  </li>
                </ul>
                <!-- 所有单位信息的tab切换内容联动 -->
                <div class="tab-content"
                     style="height:150px">
                  <!-- 第一个tab单位信息所对应的内容 -->
                  <div v-show="cur==0"
                       class="companyMsg">
                    <!-- 增加和删除按钮 -->
                    <div class="btnGroup"
                         style="border-bottom:1px solid #DDDDDD;">
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="add1">增加</Button>
                      <Button type="primary"
                              icon="md-trash"
                              size="small"
                              style="margin-left:5px;"
                              @click="del1">删除</Button>
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="keep3">保存</Button>
                    </div>
                    <!-- 单位信息的table表格 -->
                    <div class="compMsg">
                      <Table border
                             ref="selection"
                             :columns="columns4"
                             height="92"
                             :data="data1"
                             @on-selection-change="sele1">
                        <template slot="usertype">
                          <Select v-model="selectUser"
                                  style="60px">
                            <Option v-for="row in selectType"
                                    :value="row.value"
                                    :key="row.value">{{ row.usertype }}</Option>
                          </Select>
                        </template>
                        <template slot="accounFull">
                          <Select v-model="selectAccount"
                                  style="60px">
                            <Option v-for="row in selectFull"
                                    :value="row.value"
                                    :key="row.value">{{ row.accounFull }}</Option>
                          </Select>
                        </template>
                      </Table>
                    </div>
                  </div>
                  <!-- 单位系统代码信息 -->
                  <div v-show="cur==1">
                    <!-- 单位系统代码btn -->
                    <div class="btnGroup"
                         style="border-bottom:1px solid #DDDDDD;">
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="add2">增加</Button>
                      <Button type="primary"
                              icon="md-trash"
                              size="small"
                              style="margin-left:5px;"
                              @click="del2">删除</Button>
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="keep2">保存</Button>
                    </div>
                    <!-- 单位系统代码table表格 -->
                    <div class="compMsg">
                      <Table border
                             ref="selection"
                             :columns="columns5"
                             height="92"
                             :data="data2"
                             @on-selection-change="sele2">
                        <template slot="orgName">
                          <Select v-model="companys"
                                  @on-change="perChange">
                            <Option v-for="row in companyOrg"
                                    :value="row.value"
                                    :key="row.value">{{ row.orgName }}</Option>
                          </Select>
                        </template>
                      </Table>
                    </div>
                  </div>
                  <!-- 单位账套信息 -->
                  <div v-show="cur==2">
                    <!-- 单位账套信息头部button框 -->
                    <div class="btnGroup"
                         style="border-bottom:1px solid #DDDDDD;">
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="add3">增加</Button>
                      <Button type="primary"
                              icon="md-trash"
                              size="small"
                              style="margin-left:5px;"
                              @click="del3">删除</Button>
                      <Button type="primary"
                              icon="md-add"
                              size="small"
                              @click="keep4">保存</Button>
                    </div>
                    <!-- 单位帐套信息里的table表格 -->
                    <div class="compMsg">
                      <Table border
                             ref="selection"
                             :columns="columns6"
                             height="92"
                             :data="data3"
                             @on-selection-change="sele3">
                        <!-- slot-scope="{ row }" -->
                        <template slot="years">
                          <Select v-model="years">
                            <Option v-for="row in companyYear"
                                    :value="row.value"
                                    :key="row.value">{{ row.years }}</Option>
                          </Select>
                        </template>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 部门 -->
            <div v-show="department">
              <!-- button-group 按钮 -->
              <div class="tabWrap">
                <div class="tab"
                     style="height:39px;">
                  <!-- <Button type="primary"
                          icon="md-add"
                          style="margin-left:5px;"
                          @click="plus">增加</Button>
                  <Button type="primary"
                          icon="md-archive"
                          style="margin-left:5px;"
                          @click="save"
                          v-if="saveflag">保存</Button>
                  <Button type="primary"
                          icon="md-archive"
                          style="margin-left:5px;"
                          @click="saveUpdate"
                          v-if="updatesave">修改保存</Button>
                  <Button type="primary"
                          icon="md-trash"
                          style="margin-left:5px;"
                          @click="minus"
                          v-if="updatesave">删除</Button>
                  <Button type="primary"
                          icon="md-archive"
                          style="margin-left:5px;"
                          @click="update"
                          v-if="updateflag">修改</Button> -->
                </div>
              </div>
              <!-- 机构部门标题 -->
              <div class="depTit">
                <span>组织机构级部门</span>
              </div>
              <!-- 机构部门表单 -->
              <div class="depForm">
                <!-- 机构部门左边内容 -->
                <!-- <div class="formLeft">
                  <div v-for="item in formLeft" :key="item.id">
                    <span style="font-size:14px;font-weight:600">{{item.name}}</span>
                    <span style="color:#DF0009;font-size:16px;margin-right:10px;">{{item.num}}</span>
                   
                    <input
                      type="text"
                      v-model="item.key"
                      style="border:none;border-bottom:1px solid;width:200px;"
                    >
                  </div>
                </div>-->
                <table align="center"
                       cellspacing="0px"
                       cellpadding="10px">
                  <tbody>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                        <span style="color:#F99898">*</span>
                        单位代码
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;">{{depOrgCode}}</td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">单位名称</td>
                      <td style="background:white;padding-left:10px;border-left:none;">{{depOrgName}}</td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                        <span style="color:#F99898">*</span>
                        使用部门
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepCode"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">
                        <span style="color:#F99898">*</span>办公室名称
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepName"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">编码规则</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depCodeRule"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">
                        <span style="color:#F99898">*</span>
                        是否末级
                      </td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Select v-model="depbot"
                                style="width:150px"
                                :disabled="personflag">
                          <Option v-for="item in lists"
                                  :value="item.value"
                                  :key="item.value">{{item.label}}</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级内部机构代码</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepParentCode"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">年度</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depyear"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级内部机构名称</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepParentName"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">组织类别码</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepType"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">助记码</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepFastCode"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">电话</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepPhone"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                    <tr>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">负责人</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepDirector"
                               :readonly="personflag"></Input>
                      </td>
                      <td align="right"
                          style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;border-left:none">联系人</td>
                      <td style="background:white;padding-left:10px;border-left:none;">
                        <Input style="width:150px"
                               v-model="depDepLinkman"
                               :readonly="personflag"></Input>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 机构部门·右边内容· -->
                <!-- <div class="formRight">
                  <div v-for="item in formRight" :key="item.id">
                    <span style="font-size:14px;font-weight:600">{{item.name}}</span>
                    <span style="color:#DF0009;font-size:16px;margin-right:10px;">{{item.num}}</span>
                    <input
                      type="text"
                      v-model="item.key"
                      style="border:none;border-bottom:1px solid;width:200px"
                    >
                  </div>
                </div>-->
              </div>
              <!-- 内部机构职位 -->
              <div class="innerDep">
                <span class="innerJob">内部机构职位</span>
                <div class="jobContent">
                  <div style="width:98%;margin:8px 0px 8px 14px;">
                    <!-- 复用组件 -->
                    <!-- <Table
                      border
                      ref="selection"
                      :columns="departmentHead"
                      :data="departmentBody"
                      @on-selection-change="jobSele"
                    ></Table>-->
                    <Table border
                           :columns="columns7"
                           :data="data6"></Table>
                  </div>
                  <div>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="insert">增加</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="remove">删除</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;">保存</Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 岗位 -->
            <div v-show="station">
              <div class="station">
                <!-- button-group 按钮 -->
                <div class="tabWrap">
                  <div class="tab"
                       style="height:39px;">
                    <!-- <Button type="primary"
                            icon="md-add"
                            style="margin-left:5px;"
                            @click="plus">增加</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="save"
                            v-if="saveflag">保存</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="saveUpdate"
                            v-if="updatesave">修改保存</Button>
                    <Button type="primary"
                            icon="md-trash"
                            style="margin-left:5px;"
                            @click="minus"
                            v-if="updatesave">删除</Button>
                    <Button type="primary"
                            icon="md-trash"
                            style="margin-left:5px;"
                            @click="update"
                            v-if="updateflag">修改</Button> -->
                  </div>
                  <!-- 岗位 -->
                  <div class="depTit">
                    <span>岗位</span>
                  </div>
                  <!--岗位内容 -->
                  <div class="depForm">
                    <table align="center"
                           cellspacing="0px"
                           cellpadding="10px">
                      <tbody>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                            <span style="color:#F99898">*</span>
                            岗位码
                          </td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <!-- <Input style="width:150px" v-model="positionCode"></Input> -->
                            <!-- <Select
                              style="width:200px"
                              @on-change="choosePost"
                              :value="positionCode"
                              :disabled="personflag"
                            >
                              <Option
                                v-for="item in data6"
                                :value="item.postCode"
                              >{{ item.postCode }}</Option>
                            </Select>-->
                            <Input :readonly="personflag"
                                   v-model="positionCode" />
                          </td>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                            <span style="color:#F99898">*</span>
                            岗位名称
                          </td>
                          <td style="background:white;padding-left:10px;border-left:none;width:29%">
                            <Input v-model="positionName"
                                   :readonly="personflag" />
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                            <span style="color:#F99898">*</span>
                            部门代码
                          </td>
                          <td style="background:white;padding-left:10px;border-left:none;">{{depDepCode}}</td>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                            <span style="color:#F99898">*</span>
                            部门名称
                          </td>
                          <td style="background:white;padding-left:10px;border-left:none;">{{depDepName}}</td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级部门代码</td>
                          <td style="background:white;padding-left:10px;border-left:none;">{{depDepParentCode}}</td>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级部门名称</td>
                          <td style="background:white;padding-left:10px;border-left:none;">{{depDepParentName}}</td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级岗位代码</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <!-- <Input style="width:150px"></Input> -->
                          </td>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">上级岗位名称</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <!-- <Input style="width:150px"></Input> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- <div class="formLeft">
                      <div v-for="item in postLeft" :key="item.id">
                        <span style="font-size:14px;font-weight:600">{{item.name}}</span>
                        <span style="color:#DF0009;font-size:16px;margin-right:10px;">{{item.num}}</span>
                        <input
                          type="text"
                          v-model="item.key"
                          style="border:none;border-bottom:1px solid;width:200px"
                        >
                      </div>
                    </div>
                    <div class="formRight">
                      <div v-for="item in postRight" :key="item.id">
                        <span style="font-size:14px;font-weight:600">{{item.name}}</span>
                        <span style="color:#DF0009;font-size:16px;margin-right:10px;">{{item.num}}</span>
                        <input
                          type="text"
                          v-model="item.key"
                          style="border:none;border-bottom:1px solid;width:200px"
                        >
                      </div>
                    </div>-->
                  </div>
                  <!-- 岗位内容的table表格 -->
                  <div class="postList"
                       style="width:98%;margin:50px 0px 8px 14px;">
                    <Button type="primary"
                            icon="md-add"
                            @click="addRol"> 添加角色</Button>
                    <Modal v-model="modal1"
                           title="角色列表"
                           >
                      <div class="roleList">
                        <ul>
                          <li v-for="(item,index) in roleList"
                              :key="index">
                            <span :title="item.roleCode">{{item.roleCode}}</span>
                            <span :title="item.roleName">{{item.roleName}}</span>
                            <Button @click="roleEdit(item)">新增</Button>

                          </li>
                        </ul>
                      </div>
                    </Modal>
                    <Table border
                           ref="selection"
                           :columns="postHead"
                           :data="postBody"></Table>

                  </div>
                </div>
              </div>
            </div>
            <!-- 人员 -->
            <div v-show="person">
              <div class="person">
                <!-- button-group 按钮 -->
                <div class="tabWrap">
                  <div class="tab"
                       style="height:39px;">
                    <!-- <Button type="primary"
                            icon="md-add"
                            style="margin-left:5px;"
                            @click="plus">增加</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="save2"
                            v-if="saveflag">保存</Button>
                    <Button type="primary"
                            icon="md-archive"
                            style="margin-left:5px;"
                            @click="saveUpdate"
                            v-if="updatesave">修改保存</Button>
                    <Button type="primary"
                            icon="md-trash"
                            style="margin-left:5px;"
                            @click="minus"
                            v-if="updatesave">删除</Button>
                    <Button type="primary"
                            icon="md-trash"
                            style="margin-left:5px;"
                            @click="update"
                            v-if="updateflag">修改</Button> -->
                  </div>
                  <!-- 人员 -->
                  <div class="depTit">
                    <span>人员</span>
                  </div>
                  <div class="depForm">
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
                                   v-model="code"
                                   :readonly="personflag"></Input>
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
                                   v-model="userName"
                                   :readonly="personflag"></Input>
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
                                   v-model="nickName"
                                   :readonly="personflag"></Input>
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
                                   v-model="sex"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">职称</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="title"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">电话</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="mobilephone"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">EMAIL</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="email"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">身份证号码</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="citizenNo"
                                   :readonly="personflag"></Input>
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
                                    v-model="userStatus"
                                    :disabled="personflag">
                              <Option v-for="item in lists"
                                      :value="item.value"
                                      :key="item.value">{{item.label}}</Option>
                            </Select>
                          </td>
                        </tr>
                        <!-- <tr>
                          <td
                            align="right"
                            style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;"
                          >内部QQ号</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"></Input>
                          </td>
                        </tr>-->
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">
                            <span style="color:#F99898">*</span>
                            账号代码
                          </td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="accountCode"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">人员排序号</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="pNumber"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                        <tr>
                          <td align="right"
                              style="min-width:110px;width:280px;height:40px;background:#f5f5f5;padding-right:10px;">证书序列号</td>
                          <td style="background:white;padding-left:10px;border-left:none;">
                            <Input style="width:150px"
                                   v-model="cNumber"
                                   :readonly="personflag"></Input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--  -->
                  <div class="innerDep">
                    <span class="innerJob">任职情况</span>
                    <div class="jobContents">
                      <div style="width:98%;margin:8px 0px 8px 14px;">
                        <Table border
                               ref="selection"
                               :columns="personHead"
                               :data="personBody"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Split>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        updatesave: true,
        //人员修改按钮的显示隐藏
        personflag: true,
        //点击修改
        updateflag: true,
        //保存按钮显示隐藏
        saveflag: false,
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
        //新增岗位码
        positionCode: "",
        //新增岗位名称
        positionName: "",
        //内部机构职位
        //内部机构职位下拉
        selDepartment: "",
        columns7: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "岗位码",
            key: "name",
            render: (h, params) => {
              return h(
                "Select",
                {
                  props: {
                    // value: this.data[params.index].volumeType
                  },
                  on: {
                    "on-change": event => {
                      // this.data[params.index].volumeType = event;
                      console.log(event);
                    }
                  }
                },
                this.data6.map(function (type) {
                  return h(
                    "Option",
                    {
                      props: { value: type.postCode }
                    },
                    type
                  );
                })
              );
            }
          },
          {
            title: "岗位名称",
            key: "postName"
          },
          {
            title: "上级职位名称",
            key: "postParentName"
          },
          {
            title: "上级内部机构名称",
            key: "depParentName"
          }
        ],
        data6: [],
        //部门单位代码
        depOrgCode: "",
        //部门单位名称
        depOrgName: "",
        //使用部门代码
        depDepCode: "",
        //部门名称
        depDepName: "",
        //编码规则
        depCodeRule: "",
        //上级部门代码
        depDepParentCode: "",
        //上级部门名称
        depDepParentName: "",
        //部门年份
        depyear: "",
        //部门组织类别码
        depDepType: "",
        //部门助记码
        depDepFastCode: "",
        //部门电话
        depDepPhone: "",
        //部门负责人
        depDepDirector: "",
        //部门联系人
        depDepLinkman: "",
        //部门是否末级
        depbot: "",
        father: "",
        //根据部门查岗位的id
        postID: "",
        sysName: "",
        originalOrgCode: "",
        originalOrgName: "",
        flag: false,
        policy: "",
        cur: 0,
        companyShow: false,
        department: false,
        station: false,
        person: false,
        //删除时对应的id
        orgID: "",
        //新增单位传递信息
        orgCode: "",
        obj2: "",
        //新增部门code
        orgCode2: "",
        // orgName2:"",
        // depCode2:"",
        // depName2:"",
        // depParentCode2:"",
        // depParentName2:"",
        //   单位信息所对应的的table头部信息
        columns4: [
          {
            title: "序号",
            key: "",
            width: 60
          },
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "账户类型",
            slot: "usertype"
          },
          {
            title: "账号",
            // key: "accountNo"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data1[params.index].accountNo
                },
                on: {
                  "on-blur": event => {
                    this.data1[params.index].accountNo = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "用户名称",
            // key: "accountName"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data1[params.index].accountName
                },
                on: {
                  "on-blur": event => {
                    this.data1[params.index].accountName = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "开户行代码",
            // key: "bankCode"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data1[params.index].bankCode
                },
                on: {
                  "on-blur": event => {
                    this.data1[params.index].bankCode = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "开户行名称",
            // key: "bankName"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data1[params.index].bankName
                },
                on: {
                  "on-blur": event => {
                    this.data1[params.index].bankName = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "核算单位代码",
            key: "orgCode"
          },
          {
            title: "核算单位名称",
            key: "orgName"
          },
          {
            title: "核算套餐",
            slot: "accounFull"
          },
          {
            title: "核算科目",
            key: "accountingSubject"
          }
        ],
        //   单位信息所对应的table里面的  tbody里面的内容
        data1: [],
        //   单位系统代码信息所对应的头部信息 thead
        columns5: [
          {
            title: "序号",
            key: "",
            width: 60
          },
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "单位名称",
            key: "orgName"
          },
          {
            title: "单位代码",
            key: "orgCode"
          },
          {
            title: "系统名称",
            slot: "orgName"
          },
          {
            title: "对应单位名称",
            // slot: "originalOrgName"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data2[params.index].originalOrgName
                },
                on: {
                  "on-blur": event => {
                    // let ind = this.data2.length-1
                    // let last = this.data2[ind]
                    // last.originalOrgName =event.target.value
                    //  console.log(last.originalOrgName)
                    // this.originalOrgName =last.originalOrgName
                    this.originalOrgName = event.target.value;
                    this.data2[params.index].originalOrgName = event.target.value;

                    let ind = this.data2.length - 1;
                    console.log(this.data2[ind].originalOrgName);
                  }
                }
              });
            }
          },
          {
            title: "对应单位代码",
            // slot: "originalOrgCode"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data2[params.index].originalOrgCode
                },
                on: {
                  "on-blur": event => {
                    console.log(event.target.value);
                    this.originalOrgCode = event.target.value;
                    this.data2[params.index].originalOrgCode = event.target.value;
                  }
                }
              });
            }
          }
        ],
        //   单位帐套信息头部信息 thead
        columns6: [
          {
            title: "序号",
            key: "",
            width: 60
          },
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "单位代码",
            key: "orgCode"
          },
          {
            title: "单位名称",
            key: "orgName"
          },
          {
            title: "账套代码",
            // key: "accountSetCode"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data3[params.index].accountSetCode
                },
                on: {
                  "on-blur": event => {
                    this.data3[params.index].accountSetCode = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "账套名称",
            // key: "accountSetName"
            render: (h, params) => {
              return h("Input", {
                props: {
                  type: "text",
                  value: this.data3[params.index].accountSetName
                },
                on: {
                  "on-blur": event => {
                    this.data3[params.index].accountSetName = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "年度",
            slot: "years"
          }
        ],
        //   单位系统信息所对应的tbody
        data2: [],
        data3: [],
        companyOrg: [
          { orgName: "--请选择--", value: "--请选择--" },
          { orgName: "网络系统", value: "网络系统" },
          { orgName: "OA系统", value: "OA系统" }
        ],
        companyYear: [
          { years: "--请选择--", value: "--请选择--" },
          { years: "2017", value: "2017" },
          { years: "2018", value: "2018" }
        ],
        compantStyle: "--请选择--",
        selectUser: "--请选择--",
        selectAccount: "--请选择--",
        companys: "--请选择--",
        years: "--请选择--",
        //   单位信息头部第一层  单位名称以及单位代码
        comPanyList1: [
          {
            name: "单位名称（简称)",
            key: "江苏省财务局",
            code: "单位代码",
            num: "141012001"
          }
        ],
        //   单位信息第二部分单位全称 以及单位性质
        comPanyList2: [
          {
            name: "单位全称",
            key: "江苏省南京市财政总局",
            code: "单位性质",
            stype: ""
          }
        ],
        //   单位性质下拉框
        companyStype: [
          { value: "--请选择--", label: "--请选择--" },
          { value: "国企", label: "国企" },
          { value: "私企", label: "私企" },
          { value: "民营", label: "民营" }
        ],
        //   单位性质默认选中请选择
        model1: "--请选择--",
        //   单位信息第三部分  统一社会·信用代码以及上级单位代码
        comPanyList3: [
          { name: "统一社会信用代码", key: "", code: "组织机构代码", num: "" },
          {
            name: "上级单位代码",
            key: "141012",
            code: "上级单位名称",
            num: "江苏财政"
          }
        ],
        //   单位信息第四部分是否末级
        comPanyList4: [{ name: " 是否末级", key: "", code: "是否使用", num: "" }],
        //   是否末级下拉框
        lists: [
          { value: "--请选择--", label: "--请选择--" },
          { value: 1, label: "是" },
          { value: 0, label: "否" }
        ],
        //   是否使用
        usermake: [
          { value: "--请选择--", label: "--请选择--" },
          { value: 1, label: "是" },
          { value: 0, label: "否" }
        ],
        //   是否末级默认选择
        model2: 0,
        //   是否使用默认选择
        model3: 0,
        //   单位信息第五部分行业分类
        comPanyList5: [{ name: "行业分类", key: "", code: "单位类型", num: "" }],
        //   单位类型
        companyType: [
          { value: "--请选择--", label: "--请选择--" },
          { value: "财政单位", label: "财政单位" },
          { value: "基层单位", label: "基层单位" },
          { value: "主管单位", label: "主管单位" }
        ],
        //   单位信息第六部分
        comPanyList6: [
          { name: "财政级别", key: "", code: "预算单位代码", num: "" }
        ],
        //   财政级别分类
        fincLevel: [
          { value: "--请选择--", label: "--请选择--" },
          { value: "中央", label: "中央" },
          { value: "省级", label: "省级" },
          { value: "市级", label: "市级" }
        ],
        //   财政级别默认选择
        model6: 0,
        //   单位信息第七部分
        comPanyList7: [{ name: "所在省", key: "", code: "所在市", num: "" }],
        provence: [
          { value: "--全国--", label: "--全国--" },
          { value: "江苏省", label: "江苏省" }
        ],
        //   单位信息第八部分
        comPanyList8: [{ name: "所在区", key: "", code: "单位地址", num: "" }],
        area: [
          { value: "--请选择--", label: "--请选择--" },
          { value: "江宁区", label: "江宁区" },
          { value: "浦口区", label: "浦口区" },
          { value: "朝阳区", label: "朝阳区" }
        ],
        model7: "--全国--",
        model9: "--请选择--",
        city: [
          { value: "--请选择--", label: "--请选择--" },
          { value: "南京市", label: "南京市" },
          { value: "杭州市", label: "杭州市" },
          { value: "北京市", label: "北京市" }
        ],
        model8: "--请选择--",
        //   单位信息第九部分
        comPanyList9: [
          { name: "邮政编码", key: "", code: "法定负责人", num: "" }
        ],
        //   单位信息地十部分
        comPanyList10: [{ name: "财务负责人", key: "", code: "联系人", num: "" }],
        //   单位信息第十一部分
        comPanyList11: [
          { name: "联系电话", key: "", code: "预算档次代码", num: "" }
        ],
        selectType: [{ usertype: "--请选择--", value: "--请选择--" }],
        selectFull: [{ accounFull: "--请选择--", value: "--请选择--" }],
        workList: [{ value: "--请选择--", label: "--请选择--" }],
        model4: "--请选择--",
        //单位类型
        model5: "--请选择--",
        split: 0.2,
        info: "",
        dataTree: [],
        // 机构部门
        formLeft: [
          { name: "单位代码", key: "14301200", num: "*" },
          { name: "使用部门", key: "00010001", num: "*" },
          { name: "编码规则", key: "4-4", num: "" },
          { name: "上级内部机构代码", key: "00001", num: "" },
          { name: "上级内部机构名称", key: "警司部", num: "" },
          { name: "助记码", key: "", num: "" },
          { name: "负责人", key: "", num: "" }
        ],
        postLeft: [{ name: "职位码", num: "*", key: "SH1" }],
        personLeft1: [
          { name: "代码", num: "*", key: "084669" },
          { name: "姓名", num: "*", key: "高萍" },
          { name: "性别", num: "*", key: "女" },
          { name: "职称", num: "", key: "" },
          { name: "电话", num: "", key: "" },
          { name: "EMAIL", num: "", key: "" },
          { name: "身份证号码", num: "", key: "" },
          { name: "是否允许登录", num: "*", key: "是" },
          { name: "内部QQ号", num: "", key: "" },
          { name: "账号代码", num: "*", key: "084669" },
          { name: "人员排序号", num: "", key: "" },
          { name: "证书序列号", num: "", key: "" }
        ],
        postRight: [{ name: "职位名称", num: "*", key: "初审" }],
        formRight: [
          { name: "单位名称", key: "珠海市公安局本部", num: "" },
          { name: "办公室名称", key: "局长办", num: "*" },
          { name: "是否末级", key: "是", num: "*" },
          { name: "年度", key: "2019", num: "" },
          { name: "组织类别码", key: "", num: "" },
          { name: "电话", key: "", num: "" },
          { name: "联系人", key: "", num: "" }
        ],
        // 机构部门
        departmentHead: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "职位码",
            key: "jobCode"
          },
          {
            title: "职位名称",
            key: "jobName"
          },
          {
            title: "上级职位名称",
            key: "firstjobName"
          },
          {
            title: "上级内部机构名称",
            key: "firstInnerJobName"
          }
        ],
        departmentBody: [],
        //岗位头部
        postHead: [
          {
            title: "角色ID",
            key: "roleCode",
            align:'center'
          },
          {
            title: "角色名称",
            key: "roleName",
            align:'center'
           
          },
          {
            title: '操作',
            key: 'cz',
            align:'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delRole(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        // 岗位主体内容
        postBody: [],
        personHead: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "单位代码",
            key: "orgCode"
          },
          {
            title: "单位名称",
            key: "orgName"
          },
          {
            title: "使用部门",
            key: "depCode"
          },
          {
            title: "科处室名称",
            key: "depName"
          },
          {
            title: "职位码",
            key: "postCode"
          },
          {
            title: "职位名称",
            key: "postName"
          }
        ],
        personBody: [],
        //   将选中的数据放进空数组里
        selectIds1: [],
        selectIds2: [],
        selectIds3: [],
        selectIds4: [],
        //绑定角色的模态框
        modal1: false,
        roleList: [],
      };
    },
    mounted() {
      this.getOrganization();
      console.log(222)
    },
    inject: ['reload'],
    methods: {
      //点击 查询角色
      addRol() {
        // console.log(1)
        this.modal1 = true;
        // this.loading = true;
        this.$axios.getRoleVO().then(res => {
          // this.loading = false;
          console.log(res, 'role')
          if (res.data.ret === 1) {
            this.roleList = res.data.data.roleVOList;
          } else {
            this.$Message.warning(res.data.retMsg);
          }
        });
      },
      // 绑定角色模态框
      // 点击新增角色
      roleEdit(item) {
        console.log(item);
        let roleId = item.id;
        let postId = this.$store.state.postId;
        this.$axios.addPostUserById({ roleId, postId }).then(res => {
          console.log(res)
          if (res.data.ret == 1) {
            this.$Message.success('绑定 ' + item.roleName + ' 角色成功');

            this.getPostInfoAllByPostId(postId);
          }else{
            this.$Message.error(res.data.retMsg)
          }
        })
      },
      // 点击删除角色
      delRole(val) {
        console.log(val);
        console.log(this.postBody)
        let roleId = this.postBody[val].roleCode;
        let postId = this.$store.state.postId;
        this.$axios.delPostInfoByPostId({roleId,postId}).then(res=>{
          if(res.data.ret == 1){
            this.$Message.success('解绑 ' + this.postBody[val].roleName + ' 角色成功');
             this.getPostInfoAllByPostId(postId);
          }else{
            this.$Message.error(res.data.retMsg)
          }
          // console.log(res)
        })

      },

      //查询 岗位下角色
      getPostInfoAllByPostId(id) {

        this.$axios.getPostInfoAllByPostId({ postId: id }).then(res => {
          console.log(res, 33333);
          this.postBody = [];
          res.data.data.forEach(item => {
            let arr = {};
            arr.roleCode = item.id;
            arr.roleName = item.roleName;
            arr.cz = '操作'
            this.postBody.push(arr);

          })
          console.log(this.postBody, 1760)
          // this.postBody = []


        })
      },
      //点击修改后的保存
      saveUpdate() {
        let { data, node, root } = this.info;
        if (data.orgType == 4) {
          console.log(data);
          let obj = {
            code: this.code,
            userName: this.userName,
            nickname: this.nickName,
            title: this.title,
            email: this.email,
            accountCode: this.accountCode,
            peNumber: this.pNumber,
            ceNumber: this.cNumber,
            mobilephone: this.mobilephone,
            sex: this.sex,
            citizenNo: this.citizenNo,
            userStatus: this.userStatus,
            postList: [data.parCode],
            id: data.id
          };
          // console.log(obj);
          this.$axios.updateUser(obj).then(res => {
            // console.log(res);
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              // console.log(data.id);
              // console.log(id);
              this.$axios.getUserVO(data.id).then(res => {
                // console.log(res);
                this.$set(data, "title", res.data.data.userName);
              });
            }
          });
        }
        if (data.orgType == 3) {
          let obj = {
            postCode: this.positionCode,
            postName: this.positionName,
            depCode: this.depDepCode,
            depName: this.depDepName,
            depParentCode: this.depDepParentCode,
            depDepParentName: this.depDepParentName,
            postParentCode: "",
            postParentName: "",
            id: data.id
          };
          // console.log(obj);
          this.$axios.updatePostById(obj).then(res => {
            // console.log(res);
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              let depCode = { depCode: data.depCode };
              this.$axios.getPostById(depCode).then(res => {
                console.log(res);
                this.$set(data, "title", this.positionName);
              });
            } else {
              this.$Message.err(res.data.retMsg);
            }
          });
        }
        if (data.orgType == 2) {
          let obj = {};
          obj.orgCode = this.depOrgCode;
          obj.orgName = this.depOrgName;
          obj.depCode = this.depDepCode;
          obj.depName = this.depDepName;
          obj.codeRule = this.depCodeRule;
          obj.depParentCode =
            this.depDepParentCode == undefined ? "" : this.depDepParentCode;
          obj.depParentName =
            this.depDepParentName == undefined ? "" : this.depDepParentName;
          obj.year = this.depyear;
          obj.depType = this.depDepType;
          obj.depFastCode = this.depDepFastCode;
          obj.depPhone = this.depDepPhone;
          obj.depDirector = this.depDepDirector;
          obj.depLinkman = this.depDepLinkman;
          obj.depIsbot = this.depbot;
          obj.id = data.id;
          // console.log(obj);
          this.$axios.updateDepartmentById(obj).then(res => {
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              let id = { id: data.id };
              this.$axios.findDepartment(id).then(res => {
                console.log(res);
                this.$set(data, "title", res.data.data.depName);
              });
            }
          });
        }
        if (data.orgType == 1) {
          // console.log(this.orgCode);
          let obj = {
            orgName: this.comPanyList1[0].key,
            orgCode: this.comPanyList1[0].num,
            orgParentCode: this.comPanyList3[1].key,
            orgParentName: this.comPanyList3[1].num,
            orgFullname: this.comPanyList2[0].key,
            orgUscc: this.comPanyList3[0].key,
            orgNoc: this.comPanyList3[0].num,
            orgBudgetUnitCode: this.comPanyList6[0].num,
            orgAdress: this.comPanyList8[0].num,
            orgPostNo: this.comPanyList9[0].key,
            orgLegalPerson: this.comPanyList9[0].num,
            orgFinancialManager: this.comPanyList10[0].key,
            orgLinkman: this.comPanyList10[0].num,
            orgPhone: this.comPanyList11[0].key,
            orgBudgetLevelCode: this.comPanyList11[0].num,
            orgGovernmentFunction: this.policy,
            orgProperty: this.model1,
            orgIsbot: this.model2,
            orgIsable: this.model3,
            // orgType: this.model5,
            orgFinancialLevel: this.model6,
            id: data.id
          };
          // console.log(obj);
          this.$axios.updateOrganization(obj).then(res => {
            console.log(res, 44444);
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              let id = { id: data.id };
              this.$axios.getOrgByid(id).then(res => {
                console.log(res);
                this.comPanyList1[0].key = res.data.data.orgName;
                this.comPanyList1[0].num = res.data.data.orgCode;
                this.comPanyList3[1].key = res.data.data.orgParentCode;
                this.comPanyList3[1].num = res.data.data.orgParentName;
                this.comPanyList2[0].key = res.data.data.orgFullname;
                this.comPanyList3[0].key = res.data.data.orgUscc;
                this.comPanyList3[0].num = res.data.data.orgNoc;
                this.comPanyList6[0].num = res.data.data.orgBudgetUnitCode;
                this.comPanyList8[0].num = res.data.data.orgAdress;
                this.comPanyList9[0].key = res.data.data.orgPostNo;
                this.comPanyList9[0].num = res.data.data.orgLegalPerson;
                this.comPanyList10[0].key = res.data.data.orgFinancialManager;
                this.comPanyList10[0].num = res.data.data.orgLinkman;
                this.comPanyList11[0].key = res.data.data.orgPhone;
                this.comPanyList11[0].num = res.data.data.orgBudgetLevelCode;
                this.policy = res.data.data.orgGovernmentFunction;
                this.model1 = res.data.data.orgProperty;
                this.model2 = res.data.data.orgIsbot;
                this.model3 = res.data.data.orgIsable;
                this.model5 = res.data.data.orgType;
                this.model6 = res.data.data.orgFinancialLevel;
              });
            } else {
              this.$Message.warning(res.data.retMsg);
            }
          });
        }
      },
      //所有的修改事件
      update() {
        let { data, node, root } = this.info;
        this.personflag = !this.personflag;
        this.updateflag = false;
      },
      //新增岗位页面选择岗位码的下拉选中事件
      //点击岗位码自动带入岗位名称
      // choosePost(value) {
      //   this.positionCode = value;
      //   this.data6.map(val => {
      //     // console.log(val);
      //     if (val.postCode == value) {
      //       this.positionName = val.postName;
      //     }
      //   });
      // },
      //增加tab左边单位信息保存
      keep3() {
        let { data } = this.info;
        let ind = this.data1.length - 1;
        let obj = {};
        obj.accountNo = this.data1[ind].accountNo;
        obj.accountName = this.data1[ind].accountName;
        obj.bankName = this.data1[ind].bankName;
        obj.bankCode = this.data1[ind].bankCode;
        obj.orgCode = data.orgCode;
        obj.orgName = data.title;
        obj.accountingSubject = "";
        this.$axios.addBankinfo(obj).then(res => {
          if (res.data.ret === 1) {
            this.$Message.success("添加成功");
          } else {
            this.$Message.warning(res.data.retMsg);
          }
        });
      },
      perChange(e) {
        this.sysName = e;
      },
      //增加中间单位系统信息
      keep2() {
        let ind = this.data2.length - 1;
        let obj = {};
        obj.orgName = this.comPanyList1[0].key;
        obj.orgCode = this.comPanyList1[0].num;
        obj.sysName = this.sysName;
        obj.originalOrgName = this.data2[ind].originalOrgName;
        obj.originalOrgCode = this.data2[ind].originalOrgCode;
        this.$axios.addSysCodeInfo(obj).then(res => {
          if (res.data.ret === 1) {
            this.$Message.success("添加成功");
          } else {
            this.$Message.warning(res.data.retMsg);
          }
        });
      },

      save() {
        let { data, node, root } = this.info;
        // let obj = this.obj2;

        // console.log(data);
        if (data.orgType == 1) {
          let obj = {};
          obj.orgCode = data.orgCode;
          obj.orgName = data.title;
          obj.depCode = this.depDepCode;
          obj.depName = this.depDepName;
          obj.codeRule = this.depCodeRule;
          obj.depParentCode = this.depDepParentCode;
          obj.depParentName = this.depDepParentName;
          obj.year = this.depyear;
          obj.depType = this.depDepType;
          obj.depFastCode = this.depDepFastCode;
          obj.depPhone = this.depDepPhone;
          obj.depDirector = this.depDepDirector;
          obj.depLinkman = this.depDepLinkman;
          obj.depIsbot = this.depbot;
          console.log(obj);
          this.$axios.addDepartment(obj).then(res => {
            console.log(res);
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              let str = { orgCode: data.orgCode };
              this.$axios.getDepartmentAllByOrgCode(str).then(res => {
                // console.log(res);
                let len = res.data.data.length - 1;
                const children = data.children || [];
                children.push({
                  title: res.data.data[len].depName,
                  expand: true,
                  id: res.data.data[len].id,
                  orgType: "2",
                  orgCode: res.data.data[len].orgCode,
                  orgName: res.data.data[len].orgName,
                  depCode: res.data.data[len].depCode,
                  depType: res.data.data[len].depType
                });
                this.$set(data, "children", children);
              });
              // const children = data.children || [];
              // children.push({
              //   title: data.title,
              //   expand: true
              // });
              // this.$set(data, "children", children);
              //   console.log(res);
            } else {
              this.$Message.warning(res.data.retMsg);
            }
          });
        }
        if (data.orgType == 2) {
          console.log(data);
          let obj = {
            postCode: this.positionCode,
            postName: this.positionName,
            depCode: this.depDepCode,
            depName: this.depDepName,
            depParentCode: this.depDepParentCode,
            depDepParentName: this.depDepParentName,
            postParentCode: "",
            postParentName: ""
          };
          this.$axios.addPost(obj).then(res => {
            console.log(res);
            if (res.data.ret === 1) {
              this.$Message.success(res.data.retMsg);
              let depCode = { depCode: data.depCode };
              this.$axios.getPostById(depCode).then(res => {
                // console.log(res);
                let len = res.data.data.length - 1;
                const children = data.children || [];
                children.push({
                  title: res.data.data[len].postName,
                  expand: true,
                  id: res.data.data[len].id,
                  orgType: "3",
                  postCode: res.data.data[len].postCode,
                  depCode: res.data.data[len].depCode,
                  depName: res.data.data[len].depName
                });
                this.$set(data, "children", children);
              });
            } else {
              this.$Message.warning(res.data.retMsg);
            }
          });
        }
        // console.log(this.postRight[0].key);
        // if (node.parent < 2) {
        //   const children = data.children || [];
        //   children.push({
        //     title: this.formRight[1].key,
        //     expand: true
        //   });
        //   this.$set(data, "children", children);
        // }
      },
      save2() {
        let { data, node, root } = this.info;
        // this.personflag = true;
        // console.log(data);
        if (data.orgType == 3) {
          let obj = {
            code: this.code,
            userName: this.userName,
            nickname: this.nickName,
            title: this.title,
            email: this.email,
            accountCode: this.accountCode,
            peNumber: this.pNumber,
            ceNumber: this.cNumber,
            mobilephone: this.mobilephone,
            sex: this.sex,
            citizenNo: this.citizenNo,
            userStatus: this.userStatus,
            postList: [data.id]
          };
          console.log(obj);
          this.$axios.addUser(obj).then(res => {
            // console.log(res);
            if (res.data.ret === 1) {
              this.$Message.success("新增人员成功");
              let id1 = { id: data.id };
              this.$axios.getPostUserList(id1).then(res => {
                // console.log(res);
                let len = res.data.data.length - 1;
                // console.log(res.data.data[len]);
                const children = data.children || [];
                children.push({
                  title: res.data.data[len].userName,
                  expand: true,
                  id: res.data.data[len].id,
                  orgType: "4"
                });
                this.$set(data, "children", children);
                // console.log(data);
              });
            }
          });
        }
        // if (node.parent < 2) {
        //   const children = data.children || [];
        //   children.push({
        //     title: this.personLeft1[1].key,
        //     expand: true
        //   });
        //   this.$set(data, "children", children);
        // }
      },
      // 新增分支
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
                  console.log(data, '2129');

                  //点击查询岗位
                  if (data.type == "3") {
                    // console.log(data);
                    this.updateflag = true;
                    this.personflag = true;
                    this.updatesave = true;
                    this.saveflag = false;

                    this.positionCode = data.orgCode;
                    this.positionName = data.title;
                    let children = node.node.children;
                    this.companyShow = false;
                    this.department = false;
                    this.station = true;
                    this.person = false;

                    // console.log(str);
                    //查询岗位下的所有角色信息
                    let id1 = { id: data.id };
                    let postChildren = data.children || [];
                    this.$axios.getPostUserList(id1).then(res => {
                      console.log(res, 'ry');
                      if (res.data.ret == 1) {
                        let arr = res.data.data;
                        arr.forEach(item => {
                          console.log(item);
                          let obj = {};

                          obj.title = item.fullName;
                          obj.userId = item.userId
                          obj.type = 4;// 自定义人员种类
                          // console.log(obj, data.children);
                          postChildren.push(obj);
                          console.log(postChildren, 'postChildren1')
                          //点击字体 查询往树里面添加人员的时候去重
                          var obj2 = {};
                          var arr = postChildren.reduce(function (item, next) {
                            console.log(next)
                            obj2[next.userId]
                              ? ""
                              : (obj2[next.userId] = true && item.push(next));
                            return item;
                          }, []);
                          postChildren = arr;
                          console.log(postChildren, 'postChildren2')
                          data.children = postChildren;
                        })
                      }
                    })
                    // });
                  }
                  //点击查询人员
                  if (data.type == "4") {
                    // this.updateflag = true;
                    this.updateflag = true;
                    this.personflag = true;
                    this.updatesave = true;
                    this.saveflag = false;
                    // console.log(data);
                    this.companyShow = false;
                    this.department = false;
                    this.station = false;
                    this.person = true;
                    //查询人员上部门基本信息
                    // console.log(data);
                    // console.log(data.id,'id')
                    this.$axios.getUserVO(data.userId).then(res => {
                      console.log(res);
                      if (res.data.ret === 1) {
                        this.code = res.data.data.userCode;
                        this.userName = res.data.data.fullName;
                        this.nickName = res.data.data.userNick;
                        this.title = res.data.data.title;
                        this.email = res.data.data.email;
                        this.accountCode = res.data.data.accountCode;
                        this.pNumber = res.data.data.peNumber;
                        this.cNumber = res.data.data.ceNumber;
                        this.mobilephone = res.data.data.phoneNo;

                        this.sex = res.data.data.sex;
                        this.citizenNo = res.data.data.citizenNo;
                        this.userStatus = res.data.data.status;
                      }
                    });
                    //查询人员下面任职情况信息
                    this.$axios.getUserServing(data.id).then(res => {
                      // console.log(res);
                      if (res.data.ret === 1) {
                        this.personBody = res.data.data;
                      }
                    });
                  }
                  this.info = { root, node, data };
                  const parentKey = root.find(el => el === node).parent;
                  const parent = root.find(el => el.nodeKey === parentKey).node;
                  this.formRight[0].key = parent.title;
                  if (parent.orgType == 1) {
                    this.companyShow = false;
                    this.department = true;
                    this.station = false;
                    this.person = false;
                  }
                },
                // 右键菜单事件
                contextmenu: e => {
                  e.preventDefault();
                  this.$refs.contentMenu.$refs.reference = event.target;
                  this.$refs.contentMenu.currentVisible = !this.$refs.contentMenu
                    .currentVisible;
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
                  this.info = { root, node, data };
                  console.log(data);
                  if (data.type == 3) {
                    this.companyShow = false;
                    this.department = false;
                    this.station = true;
                    this.person = false;
                    this.positionCode = data.orgCode;
                    this.positionName = data.title;
                    console.log(data.id)
                    let postChildren = data.children || []
                    this.$axios.getPostUserList({ id: data.id }).then(res => {
                      console.log(res, 'ry');
                      if (res.data.ret == 1) {
                        let arr = res.data.data;
                        arr.forEach(item => {
                          console.log(item);
                          let obj = {};

                          obj.title = item.fullName;
                          obj.userId = item.userId
                          obj.type = 4;// 自定义人员种类
                          // console.log(obj, data.children);
                          postChildren.push(obj);
                          console.log(postChildren, 'postChildren1')
                          //点击字体 查询往树里面添加人员的时候去重
                          var obj2 = {};
                          var arr = postChildren.reduce(function (item, next) {
                            console.log(next)
                            obj2[next.userId]
                              ? ""
                              : (obj2[next.userId] = true && item.push(next));
                            return item;
                          }, []);
                          postChildren = arr;
                          console.log(postChildren, 'postChildren2')
                          data.children = postChildren;

                        })
                      }
                    })
                  }
                  if (data.orgType === "2") {
                    this.companyShow = false;
                    this.department = true;
                    this.station = false;
                    this.person = false;
                    let id = { id: data.id };
                    this.$axios.findDepartment(id).then(res => {
                      this.depOrgCode = res.data.data.orgCode;
                      this.depOrgName = res.data.data.orgName;
                      this.depDepCode = res.data.data.depCode;
                      this.depDepName = res.data.data.depName;
                      this.depCodeRule = res.data.data.codeRule;
                      this.depDepParentCode = res.data.data.depParentCode;
                      this.depDepParentName = res.data.data.depParentName;
                      this.depyear = res.data.data.year;
                      this.depDepType = res.data.data.depType;
                      this.depDepFastCode = res.data.data.depFastCode;
                      this.depDepPhone = res.data.data.depPhone;
                      this.depDepDirector = res.data.data.depDirector;
                      this.depDepLinkman = res.data.data.depLinkman;
                      this.depbot = res.data.data.depIsbot;
                    });

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

                  // if (node.parent == undefined) {
                  //   this.companyShow = true;
                  //   this.department = false;
                  //   this.station = false;
                  //   this.person = false;
                  // } else if (node.parent == 0) {
                  //   this.companyShow = false;
                  //   this.department = true;
                  //   this.station = false;
                  //   this.person = false;
                  // } else if (node.parent == 1) {
                  //   this.companyShow = false;
                  //   this.department = false;
                  //   this.station = true;
                  //   this.person = false;
                  // } else if (node.parent == 2) {
                  //   this.companyShow = false;
                  //   this.department = false;
                  //   this.station = false;
                  //   this.person = true;
                  // }
                },
                // 右键菜单事件
                contextmenu: e => {
                  // console.log(e);
                  e.preventDefault();
                  this.$refs.contentMenu.$refs.reference = event.target;
                  this.$refs.contentMenu.currentVisible = !this.$refs.contentMenu
                    .currentVisible;
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
        }
      },
      //右键新增删除
      // 增加/删除子集
      append(name) {
        let { data, node, root } = this.info;
        // this.formLeft[0].key = node.node.orgCode;
        // this.formRight[0].key = node.node.title;
        if (name == "add" && node.node.orgType == 1) {
          this.personflag = false;
          this.updateflag = false;
          this.saveflag = true;
          this.updatesave = false;
          console.log(data);
          this.companyShow = false;
          this.department = true;
          this.station = false;
          this.person = false;
          // console.log(data);
          this.depOrgCode = data.orgCode;
          this.depOrgName = data.title;
          this.depDepCode = "";
          this.depDepName = "";
          this.depCodeRule = "";
          this.depDepParentCode = "";
          this.depDepParentName = "";
          this.depyear = "";
          this.depDepType = "";
          this.depDepFastCode = "";
          this.depDepPhone = "";
          this.depDepDirector = "";
          this.depDepLinkman = "";
          this.depbot = "";
          // let obj = {};
          // obj.orgCode = this.formLeft[0].key;
          // obj.orgName = this.formRight[0].key;
          // obj.depCode = this.formLeft[1].key;
          // obj.depName = this.formRight[1].key;
          // obj.depParentCode = "";
          // obj.depParentName = "";
          // this.obj2 = obj;
        } else if (name == "add" && node.node.orgType == 2) {
          // console.log(data);
          this.personflag = false;
          this.updateflag = false;
          this.saveflag = true;
          this.updatesave = false;

          console.log(2222);
          this.companyShow = false;
          this.department = false;
          this.station = true;
          this.person = false;

          this.positionCode = "";
          this.positionName = "";
        } else if (name == "add" && node.node.orgType == 3) {
          // console.log(23323333);
          // this.personflag = !this.personflag;
          // this.updateflag = false;
          this.personflag = false;
          this.updateflag = false;
          this.saveflag = true;
          this.updatesave = false;

          this.companyShow = false;
          this.department = false;
          this.station = false;
          this.person = true;
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

          //清空人员任职情况
          this.personBody = [];
        } else if (name == "add" && node.parent == 1) {
          this.companyShow = false;
          this.department = false;
          this.station = false;
          this.person = true;
        } else if (name == "del") {
          // let { data, node, root } = this.info;
          // console.log(data);
          // const parentKey = root.find(el => el === node).parent;
          // const parentKey = root.find(el => el === node);
          // const parent = root.find(el => el.nodeKey === parentKey).node;
          // console.log(node);
          // console.log(parentKey);
          // console.log(parent);
          // const index = parent.children.indexOf(data);
          // parent.children.splice(index, 1);
          // console.log(this.orgID);
          // let id = { id: this.orgID };
          // this.$axios.delOrganization(id).then(res => {
          //   console.log(res);
          // });
        }
      },
      // 增加删除同级
      minus() {
        let { data, node, root } = this.info;
        //删除单位
        if (data.orgType == 1) {
          let that = this;
          console.log(data);
          let obj = { id: data.id };
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              this.$axios.delOrganization(obj).then(res => {
                if (res.data.ret === 1) {
                  this.$Message.success("删除成功");
                  that.companyShow = false;
                  that.department = false;
                  that.station = false;
                  that.person = false;
                  that.getOrganization();
                }
              });
            }
          });
        }
        //删除部门
        if (data.orgType == 2) {
          let obj = { id: data.id };
          let that = this;
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              this.$axios.delDepartment(obj).then(res => {
                if (res.data.ret === 1) {
                  this.$Message.success("删除成功");
                  that.companyShow = false;
                  that.department = false;
                  that.station = false;
                  that.person = false;
                  const parentKey = root.find(el => el === node).parent;
                  const parent = root.find(el => el.nodeKey === parentKey).node;
                  const index = parent.children.indexOf(data);
                  parent.children.splice(index, 1);
                }
              });
            }
          });
        }
        //删除岗位
        if (data.orgType == 3) {
          let obj = { id: data.id };
          let that = this;
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              this.$axios.delPost(obj).then(res => {
                if (res.data.ret === 1) {
                  this.$Message.success("删除成功");
                  that.companyShow = false;
                  that.department = false;
                  that.station = false;
                  that.person = false;
                  const parentKey = root.find(el => el === node).parent;
                  const parent = root.find(el => el.nodeKey === parentKey).node;
                  const index = parent.children.indexOf(data);
                  parent.children.splice(index, 1);
                }
              });
            }
          });
        }
        //删除人员
        if (data.orgType == 4) {
          let obj = { id: data.id };
          let that = this;
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              this.$axios.delUser(obj).then(res => {
                if (res.data.ret === 1) {
                  that.companyShow = false;
                  that.department = false;
                  that.station = false;
                  that.person = false;
                  this.$Message.success(res.data.retMsg);
                  const parentKey = root.find(el => el === node).parent;
                  const parent = root.find(el => el.nodeKey === parentKey).node;
                  const index = parent.children.indexOf(data);
                  parent.children.splice(index, 1);
                }
              });
            }
          });
        }
      },
      plus() {
        // let { data, node, root } = this.info;
        // const parentKey = root.find(el => el === node).parent;
        // const parent = root.find(el => el.nodeKey === parentKey).node;
        // const children = parent.children || [];
        // children.push({
        //   title: "appended node",
        //   expand: false
        // });
        // this.$set(parent, "children", children);
      },
      modify() {
        this.flag = !this.flag;
      },
      //选中当前节点
      handleSelect(data) {
        // console.log(this.$refs.tree4.getSelectedNodes(), 1);
        console.log(data, 'ddd');

      },
      handleToggle(data) {
        console.log(2);
        console.log(data);
        let OC = { orgCode: data.orgCode };
        //查询指定单位下部门列表
        let postChildren = data.children;
        // if(data.children.type)
        console.log(data.type == undefined, 'und')
        // 防止岗位下拉继续增加岗位
        if (data.type == undefined) {
          this.$axios.getPostByOrgCode(OC).then(res => {
            console.log(res, 'res');
            if (res.data.ret == 1) {
              console.log(res.data.data);
              let arr = res.data.data;
              arr.forEach(item => {
                console.log(item);
                let obj = {};
                obj.children = [];
                obj.id = item.id;
                obj.orgCode = item.postCode;
                obj.title = item.postName;
                obj.type = 3;
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
                          // console.log(1)
                          if (data.type == 3) {
                            this.companyShow = false;
                            this.department = false;
                            this.station = true;
                            this.person = false;
                            this.positionCode = data.orgCode;
                            this.positionName = data.title;

                            console.log(data.id);
                            this.$store.commit('addPostId', data.id)
                            //根据岗位id查询 角色
                            this.getPostInfoAllByPostId(data.id);
                            let postChildren = data.children || [];
                            this.$axios.getPostUserList({ id: data.id }).then(res => {
                              console.log(res, 'ry');
                              if (res.data.ret == 1) {
                                let arr = res.data.data;
                                arr.forEach(item => {
                                  console.log(item);
                                  let obj = {};
                                  obj.title = item.fullName;
                                  obj.userId = item.userId
                                  obj.type = 4;// 自定义人员种类
                                  // console.log(obj, data.children);
                                  postChildren.push(obj);
                                  console.log(postChildren, 'postChildren1')
                                  //点击字体 查询往树里面添加人员的时候去重
                                  var obj2 = {};
                                  var arr = postChildren.reduce(function (item, next) {
                                    console.log(next)
                                    obj2[next.userId]
                                      ? ""
                                      : (obj2[next.userId] = true && item.push(next));
                                    return item;
                                  }, []);
                                  postChildren = arr;
                                  console.log(postChildren, 'postChildren2')
                                  data.children = postChildren;

                                })
                              }
                            })
                          }

                        },
                      }
                    },
                    [
                      h("span", [
                        h("img", {
                          attrs: {
                            src: require("../../assets/image/下拉.png")
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

                console.log(obj, data.children)
                postChildren.push(obj);
                // console.log(postChildren, 'postChildren1')
                //点击下拉 查询往树里面添加岗位的时候去重
                var obj2 = {};
                var arr = postChildren.reduce(function (item, next) {
                  // console.log(next)
                  obj2[next.id]
                    ? ""
                    : (obj2[next.id] = true && item.push(next));
                  return item;
                }, []);
                postChildren = arr;
                console.log(postChildren, 'postChildren2')
                data.children = postChildren;
              })
            }
          })
        }



      },
      //   点击添加行，
      add1() {
        let { data } = this.info;
        var totalList = {
          id: 1,
          accountNo: "12312",
          accountName: "3123",
          bankCode: "12321",
          bankName: "12312",
          orgCode: data.orgCode,
          orgName: data.title,
          accountingSubject: "110110"
        };
        this.data1.push(totalList);
      },
      sele1(selection) {
        let that = this;
        that.selectIds1 = [];
        if (selection.length > 0) {
          this.disabled = false;
          for (let i = 0; i < selection.length; i++) {
            that.selectIds1.push(selection[i].id);
          }
        } else {
          this.disabled = true;
        }
        console.log(this.selectIds1);
      },
      // 点击删除行
      del1() {
        if (this.selectIds1 == "") {
          this.$Message.warning("请选择删除项");
        } else {
          let that = this;
          let ids = that.selectIds1; //join() 方法用于把数组中的所有元素放入一个字符串。
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              that.data1.splice({ ids: ids }, ids.length);
              let arr = that.selectIds1;
              let obj2 = arr.join(",");
              let obj = { ids: obj2 };
              console.log(obj);
              // that.$axios.delSysOrgSyscodeinfo(obj).then(res => {
              //   console.log(res);
              // });
            }
          });
        }
      },
      add2() {
        let { data } = this.info;
        var list = {
          id: 1,
          orgName: data.title,
          orgCode: data.orgCode,
          originalOrgCode: "",
          originalOrgName: ""
        };
        this.data2.push(list);
      },
      del2() {
        if (this.selectIds2 == "") {
          this.$Message.warning("请选择删除项");
        } else {
          let that = this;
          let ids = that.selectIds2; //join() 方法用于把数组中的所有元素放入一个字符串。
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              that.data2.splice({ ids: ids }, ids.length);
              let arr = that.selectIds2;
              let obj2 = arr.join(",");
              let obj = { ids: obj2 };
              that.$axios.delSysOrgSyscodeinfo(obj).then(res => {
                console.log(res);
                if (res.data.ret === 1) {
                  this.$Message.success("删除成功");
                } else {
                  this.$Message.warning(res.data.retMsg);
                }
              });
            }
          });
        }
      },
      sele2(selection) {
        let that = this;
        that.selectIds2 = [];
        if (selection.length > 0) {
          this.disabled = false;
          for (let i = 0; i < selection.length; i++) {
            that.selectIds2.push(selection[i].id);
          }
        } else {
          this.disabled = true;
        }
        console.log(this.selectIds2);
      },
      add3() {
        let { data } = this.info;
        var account = {
          id: 1,
          accountSetCode: "141012",
          accountSetName: "江苏财政局",
          orgCode: data.orgCode,
          orgName: data.title
        };
        this.data3.push(account);
      },
      del3() {
        if (this.selectIds3 == "") {
          this.$Message.warning("请选择删除项");
        } else {
          let that = this;
          let ids = that.selectIds3; //join() 方法用于把数组中的所有元素放入一个字符串。
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              that.data3.splice({ ids: ids }, ids.length);
            }
          });
        }
      },
      keep4() {
        let { data } = this.info;
        let ind = this.data3.length - 1;
        let obj = {};
        obj.accountSetCode = this.data3[ind].accountSetCode;
        obj.accountSetName = this.data3[ind].accountSetName;
        obj.orgCode = data.orgCode;
        obj.orgName = data.title;
        obj.year = "";
        this.$axios.addAccountsetinfo(obj).then(res => {
          if (res.data.ret === 1) {
            this.$Message.success("添加成功");
          } else {
            this.$Message.warning(res.data.retMsg);
          }
        });
      },
      sele3(selection) {
        let that = this;
        that.selectIds3 = [];
        if (selection.length > 0) {
          this.disabled = false;
          for (let i = 0; i < selection.length; i++) {
            that.selectIds3.push(selection[i].id);
          }
        } else {
          this.disabled = true;
        }
        console.log(this.selectIds3);
      },
      insert() {
        var department = {
          // id: "",
          // jobCode: "np01",
          // jobName: "财务内勤",
          // firstjobName: "财务总内勤",
          // firstInnerJobName: "警令部"
        };
        this.data6.push(department);
      },
      jobSele(selection) {
        let that = this;
        that.selectIds4 = [];
        if (selection.length > 0) {
          this.disabled = false;
          for (let i = 0; i < selection.length; i++) {
            that.selectIds4.push(selection[i].jobCode);
          }
        } else {
          this.disabled = true;
        }
        console.log(this.selectIds4);
      },
      remove() {
        if (this.selectIds4 == "") {
          this.$Message.warning("请选择删除项");
        } else {
          let that = this;
          let ids = that.selectIds4; //join() 方法用于把数组中的所有元素放入一个字符串。
          this.$Modal.confirm({
            title: "确定删除？",
            onOk() {
              that.departmentBody.splice({ ids: ids }, ids.length);
            }
          });
        }
      },
      //新增顶层同级单位，返回空白页，清空所有数据
      addOrganization() {
        this.personflag = false;
        this.updateflag = false;
        this.saveflag = true;
        this.updatesave = false;

        this.companyShow = true;
        this.department = false;
        this.station = false;
        this.person = false;

        this.policy = "";
        this.comPanyList1[0].key = "";
        this.comPanyList1[0].num = "";
        this.comPanyList2[0].key = "";
        this.comPanyList3[0].key = "";
        this.comPanyList3[0].num = "";
        this.comPanyList3[1].key = "";
        this.comPanyList3[1].num = "";
        this.comPanyList6[0].num = "";
        this.comPanyList8[0].num = "";
        this.comPanyList9[0].key = "";
        this.comPanyList9[0].num = "";
        this.comPanyList10[0].num = "";
        this.comPanyList10[0].key = "";
        this.comPanyList11[0].num = "";
        this.comPanyList11[0].key = "";
        this.model2 = 0;
        this.model3 = 0;
        this.model1 = 0;
      },
      //增加单位
      keep() {
        let obj = {
          orgName: this.comPanyList1[0].key,
          orgCode: this.comPanyList1[0].num,
          orgParentCode: this.comPanyList3[1].key,
          orgParentName: this.comPanyList3[1].num,
          orgFullname: this.comPanyList2[0].key,
          orgUscc: this.comPanyList3[0].key,
          orgNoc: this.comPanyList3[0].num,
          orgBudgetUnitCode: this.comPanyList6[0].num,
          orgAdress: this.comPanyList8[0].num,
          orgPostNo: this.comPanyList9[0].key,
          orgLegalPerson: this.comPanyList9[0].num,
          orgFinancialManager: this.comPanyList10[0].key,
          orgLinkman: this.comPanyList10[0].num,
          orgPhone: this.comPanyList11[0].key,
          orgBudgetLevelCode: this.comPanyList11[0].num,
          orgGovernmentFunction: this.policy,
          orgProperty: this.model1,
          orgIsbot: this.model2,
          orgIsable: this.model3,
          orgType: this.model5,
          orgFinancialLevel: this.model6
        };
        // console.log(this.model2);
        // console.log(obj);
        this.$axios.addOrganization(obj).then(res => {
          // console.log(res);
          if (res.data.ret == 1) {
            this.$Message.success("新增单位成功");
            this.getOrganization();
          } else {
            this.$Message.error("新增单位失败");
          }
        });
      },
      //查询组织机构信息
      getOrganization() {
        this.$axios.getOrganization().then(res => {
          console.log(res, 'zation');
          var that = this;
          function getTree(treeNodes) {
            let data = [];
            if (!!treeNodes && treeNodes.length !== 0) {
              treeNodes.forEach(item => {
                // console.log(item);
                let obj = {};
                obj.title = item.orgName;
                obj.orgType = item.orgType;
                obj.children = getTree(item.children);
                obj.orgCode = item.orgCode;
                obj.orgFullname = item.orgFullname;
                obj.orgParentName = item.orgParentName;
                obj.id = item.orgId;
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
                          console.log(data, 'click');

                          that.updateflag = true;
                          that.personflag = true;
                          that.updatesave = true;
                          that.saveflag = false;

                          that.orgCode = node.node.orgCode;
                          // if (data.orgType === "2") {
                          //   // console.log(data);
                          //   // this.updateflag = true;
                          //   // this.personflag = true;
                          //   // this.updatesave = true;
                          //   // this.saveflag = false;
                          //   that.companyShow = false;
                          //   that.department = true;
                          //   that.station = false;
                          //   that.person = false;
                          //   //根据depCode查询部门下的岗位
                          //   that.$axios.getPostList().then(res => {
                          //     // console.log(res);
                          //     that.data6 = res.data.data;
                          //   });
                          //   //点击单位下的部门的时候显示相应的信息
                          //   // this.depOrgCode = data.orgCode;
                          //   // this.depOrgName = data.orgName;
                          //   let id = { id: data.id };
                          //   // console.log(id);
                          //   that.$axios.findDepartment(id).then(res => {
                          //     console.log(res);
                          //     //部门信息返回页面
                          //     that.depOrgCode = res.data.data.orgCode;
                          //     that.depOrgName = res.data.data.orgName;
                          //     that.depDepCode = res.data.data.depCode;
                          //     that.depDepName = res.data.data.depName;
                          //     that.depCodeRule = res.data.data.codeRule;
                          //     that.depDepParentCode = res.data.data.depParentCode;
                          //     that.depDepParentName = res.data.data.depParentName;
                          //     that.depyear = res.data.data.year;
                          //     that.depDepType = res.data.data.depType;
                          //     that.depDepFastCode = res.data.data.depFastCode;
                          //     that.depDepPhone = res.data.data.depPhone;
                          //     that.depDepDirector = res.data.data.depDirector;
                          //     that.depDepLinkman = res.data.data.depLinkman;
                          //     that.depbot = res.data.data.depIsbot;
                          //   });
                          //   //查询指定部门下的岗位列表
                          //   let depCode = { depCode: node.node.depCode };
                          //   let postChildren = node.node.children;
                          //   that.$axios.getPostById(depCode).then(res => {
                          //     // console.log(res);
                          //     let list = res.data.data;
                          //     list.forEach(item => {
                          //       let obj = {};
                          //       obj.depCode = item.depCode;
                          //       obj.depName = item.depName;
                          //       obj.postCode = item.postCode;
                          //       obj.title = item.postName;
                          //       obj.orgType = item.orgType;
                          //       obj.id = item.id;
                          //       obj.children = [];
                          //       postChildren.push(obj);
                          //       //查询往树里面添加岗位的时候去重
                          //       var obj2 = {};
                          //       var arr = postChildren.reduce(function (item, next) {
                          //         obj2[next.id]
                          //           ? ""
                          //           : (obj2[next.id] = true && item.push(next));
                          //         return item;
                          //       }, []);
                          //       postChildren = arr;
                          //       node.node.children = postChildren;
                          //     });
                          //   });
                          // }
                          // console.log(node.node.children);
                          let children = node.node.children;
                          // console.log(children)
                          let OC = { orgCode: that.orgCode };
                          //查询指定单位下岗位
                          that.$axios.getPostByOrgCode(OC).then(res => {
                            // console.log(res);
                            let list = res.data.data;
                            list.forEach(item => {
                              let obj = {};
                              obj.children = [];
                              obj.id = item.id;
                              obj.orgCode = item.postCode;
                              obj.title = item.postName;
                              obj.type = 3;
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
                                        if (data.type == 3) {
                                          that.companyShow = false;
                                          that.department = false;
                                          that.station = true;
                                          that.person = false;
                                          that.positionCode = data.orgCode;
                                          that.positionName = data.title;
                                          console.log(data.id);
                                          that.$store.commit('addPostId', data.id)
                                          //根据岗位id查询 角色
                                          that.getPostInfoAllByPostId(data.id);
                                          that.$axios.getPostUserList({ id: data.id }).then(res => {
                                            console.log(res, 'ry');
                                            let postChildren = data.children;
                                            if (res.data.ret == 1) {
                                              let arr = res.data.data;
                                              arr.forEach(item => {
                                                console.log(item);
                                                let obj = {};

                                                obj.title = item.fullName;
                                                obj.userId = item.userId
                                                obj.type = 4;// 自定义人员种类
                                                // console.log(obj, data.children);
                                                postChildren.push(obj);
                                                console.log(postChildren, 'postChildren1')
                                                //点击字体 查询往树里面添加人员的时候去重
                                                var obj2 = {};
                                                var arr = postChildren.reduce(function (item, next) {
                                                  console.log(next)
                                                  obj2[next.userId]
                                                    ? ""
                                                    : (obj2[next.userId] = true && item.push(next));
                                                  return item;
                                                }, []);
                                                postChildren = arr;
                                                console.log(postChildren, 'postChildren2')
                                                data.children = postChildren;

                                              })
                                            }
                                          })
                                        }
                                      },
                                    }
                                  },
                                  [
                                    h("span", [
                                      h("img", {
                                        attrs: {
                                          src: require("../../assets/image/下拉.png")
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
                              children.push(obj);
                              console.log(obj)
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
                              // console.log(that.father);
                            });
                          });

                          //根据orgCode查询单位下所有系统信息
                          that.$axios.getSysOrg(OC).then(res => {
                            that.data2 = res.data.data;
                            // console.log(res);
                          });
                          let id = { id: data.id };
                          that.$axios.getOrgByid(id).then(res => {
                            that.companyShow = true;
                            that.department = false;
                            that.station = false;
                            that.person = false;
                            console.log(res);
                            that.comPanyList1[0].key = res.data.data.orgName;
                            that.comPanyList1[0].num = res.data.data.orgCode;
                            that.comPanyList3[1].key =
                              res.data.data.orgParentCode;
                            that.comPanyList3[1].num =
                              res.data.data.orgParentName;
                            that.comPanyList2[0].key = res.data.data.orgFullname;
                            that.comPanyList3[0].key = res.data.data.orgUscc;
                            that.comPanyList3[0].num = res.data.data.orgNoc;
                            that.comPanyList6[0].num =
                              res.data.data.orgBudgetUnitCode;
                            that.comPanyList8[0].num = res.data.data.orgAdress;
                            that.comPanyList9[0].key = res.data.data.orgPostNo;
                            that.comPanyList9[0].num =
                              res.data.data.orgLegalPerson;
                            that.comPanyList10[0].key =
                              res.data.data.orgFinancialManager;
                            that.comPanyList10[0].num = res.data.data.orgLinkman;
                            that.comPanyList11[0].key = res.data.data.orgPhone;
                            that.comPanyList11[0].num =
                              res.data.data.orgBudgetLevelCode;
                            that.policy = res.data.data.orgGovernmentFunction;
                            that.model1 = res.data.data.orgProperty;
                            that.model2 = res.data.data.orgIsbot;
                            that.model3 = res.data.data.orgIsable;
                            that.model5 = res.data.data.orgType;
                            that.model6 = res.data.data.orgFinancialLevel;
                          });
                          //点击单位节点显示相应的单位页面
                          // that.comPanyList1[0].key = node.node.title;
                          // that.comPanyList1[0].num = node.node.orgCode;
                          // that.comPanyList2[0].key = node.node.orgFullname;
                          // console.log(data);
                          // that.comPanyList3[1].key = node.node.orgParentName;
                          // 行业分类
                          //所在省
                          //所在市
                          //所在区
                          //单位地址

                          // console.log(res);
                          res.data.data.forEach(val => {
                            if (node.node.id == val.id) {
                              that.comPanyList3[0].key = val.orgUscc;
                              that.comPanyList3[0].num = val.orgNoc;
                              that.comPanyList3[1].key = val.orgParentCode;
                              that.comPanyList3[1].num = val.orgParentName;
                              //预算单位代码
                              that.comPanyList6[0].num = val.orgBudgetUnitCode;
                              //单位地址
                              that.comPanyList8[0].num = val.orgAdress;
                              //邮政编码
                              that.comPanyList9[0].key = val.orgPostNo;
                              // /法定负责人
                              that.comPanyList9[0].num = val.orgLegalPerson;
                              //财务负责人
                              that.comPanyList10[0].key = val.orgFinancialManager;
                              //联系人 :
                              that.comPanyList10[0].num = val.orgLinkman;
                              // /联系电话
                              that.comPanyList11[0].key = val.orgPhone;
                              // /预算档次代码
                              that.comPanyList11[0].num = val.orgBudgetLevelCode;
                              //政府职能
                              that.policy = val.orgGovernmentFunction;
                              //单位性质
                              that.model1 = val.orgProperty;
                              //是否末级
                              that.model2 = val.orgIsbot;
                              // 是否使用
                              that.model3 = val.orgIsable;
                              //单位类型
                              that.model5 = val.orgType;
                              //财政级别
                              that.model6 = val.orgFinancialLevel;
                            }
                          });
                          that.orgID = node.node.id;
                          if (node.node.orgType === "1" || node.node.orgType === "2") {
                            that.companyShow = true;
                            that.department = false;
                            that.station = false;
                            that.person = false;
                            that.info = { root, node, data };
                          }
                          //获取tab单位信息
                          that.$axios.bankinfo(OC).then(res => {
                            // console.log(res.data.data)
                            that.data1 = res.data.data;
                          });
                          //获取tab账套信息
                          that.$axios.accountsetinfo(OC).then(res => {
                            // console.log(res);
                            that.data3 = res.data.data;
                          });
                        },
                        // 右键菜单事件
                        contextmenu: e => {
                          e.preventDefault();
                          that.$refs.contentMenu.$refs.reference = event.target;
                          that.$refs.contentMenu.currentVisible = !that.$refs
                            .contentMenu.currentVisible;
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
      }
    }
  };
</script>
<style lang="less" scoped>
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
</style>

<style scoped>
  .splitLeft {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
  .demo-split {
    height: 810px;
    border: 1px solid #dcdee2;
  }
  .show {
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }
  /* 左边联级面板头部设置 */
  .panel-header {
    width: 100%;
    background-color: #f9f9f9;
    background-repeat: repeat-x;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    border-bottom: 1px solid #e7eaec !important;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }
  .add {
    margin-top: 10px;
    margin-left: 10px;
  }
  .tab {
    list-style-type: none;
    height: 36px;
    margin: 0px;
    padding: 5px 0px 0px 3px;
    font-size: 12px;
    width: 100%;
    border: 1px solid #ddd;
    border-width: 0 0 1px 0;
  }
  .tab-tilte {
    list-style-type: none;
    height: 36px;
    margin: 0px;
    padding: 5px 0px 0px 3px;
    font-size: 12px;
    width: 100%;
    border: 1px solid #ddd;
    border-width: 0 0 1px 0;
    display: flex;
  }
  .tab-tilte li {
    width: 116px;
    height: 30px;
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    margin-top: 1px;
    border-radius: 5px 5px 0 0;
  }
  .tab-tilte .active {
    background: #4c9ce7;
    color: white;
  }
  .tab-content {
    padding: 10px 0 0 28px;
  }
  .tab li {
    width: 116px;
    height: 30px;
    background: #4c9ce7;
    border: 1px solid;
    text-align: center;
    color: white;
    line-height: 30px;
    margin-left: 10px;
    margin-top: 1px;
    border-radius: 5px 5px 0 0;
  }
  /* 表格 */
  .tableList {
    margin-top: 10px;
    /* height: 503px; */
    overflow: auto;
  }

  table {
    width: 98%;
    margin: 0 auto;
  }
  tbody tr td {
    border: 1px solid #e7e7e7;
  }

  /* 单位信息table表格 */
  .compMsg {
    margin: 10px auto;
    width: 98%;
  }
  /*机构部门标题 depTit */
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
  .formRight {
    margin-right: 15%;
    margin-top: 30px;
    text-align: right;
  }
  .formRight div {
    padding: 20px 0 0 0;
  }
  .innerDep {
    width: 85%;
    margin: 50px auto;
  }

  .innerJob {
    width: 100px;
    height: 30px;
    position: relative;
    top: 1px;
    text-align: center;
    line-height: 25px;
    display: inline-block;
    border: 1px solid #909090;
    border-top: 2px solid orange;
    border-bottom: 1px solid white;
    border-radius: 2px 2px 0 0;
  }
  .jobContent {
    width: 100%;
    height: 350px;
    overflow: auto;
    border: 1px solid #909090;
  }
  .jobContents {
    width: 100%;
    height: 150px;
    overflow: auto;
    border: 1px solid #909090;
  }
  .personRight {
    text-align: left;
    width: 48%;
    margin-top: 50px;
  }
</style>
