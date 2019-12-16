<template>
  <div id="componets-head">
    <span class="head-name">南京市本级因公出国(境)经费管理平台</span>

    <Icon class="arrow-left"
          type="ios-arrow-back"
          size="25"
          @click="arrowLeft"
          />
    <div class="head-poptip"
         ref="poptip">
      <div class="tip-box"
           :style="'left:-'+tip_l+'px;'">
        <Poptip transfer
                v-for="(item,index) in menuData"
                :key="index"
                v-model="item.visible"
                content="content"
                placement="bottom"
                :disabled="item.name == '首页'">
          <p @click.stop="indexOn(item.name == '首页'?'/index':index)">
            <Button class="poptip-click">{{item.name}}</Button>
          </p>
          <div class="api"
               slot="content">
            <ul id="head-ul">
              <li class="name">{{item.son.title}}</li>
              <li @click="addOptions(list,index)"
                  v-for="(list,indexl) in item.son.li"
                  :key="indexl">{{list.name}}</li>
            </ul>
          </div>
        </Poptip>
      </div>
    </div>
    <Icon class="arrow-right"
          type="ios-arrow-back"
          size="25"
          @click="arrowRight"
          />

    <div class="head-user">
      <div v-model="visible"
           transfer>
        <span>
          <Icon type="ios-contact"
                size="24" />
          <span style="float:right;border:0;height:20px;line-height:20px"
                :title="$store.state.userName">{{$store.state.userName}}</span>

        </span>
        <!-- <div slot="content">
          <ul id="user-tip">
            <li v-for="(item,index) in userTipData"
                :key="index"
                @click="userTip(index)"
                :class="index == 3?'out':null">
              <Icon v-if="index==4"
                    type="md-log-out"
                    size="16" />
            </li>
          </ul>
        </div> -->
      </div>
      <span class="head-out"
            @click="headOut">
        <Icon type="md-log-out"
              size="22" />退出
      </span>
    </div>
  </div>
</template>

<script>
  // import { mapState } from 'vuex';
  import Bus from '../assets/js/bus.js';
  export default {

    computed: {
      tip_w: function () {
        return this.menuData.length * 130;
      },
      userName: function () {
        return this.$store.state.info.userNick;
      },
      menuData: function () {
        // console.log(this.$store.state.menuData, 'computed')
        return this.$store.state.menuData;
      }

    },
    watch: {
    },
    mounted() {

      this.$nextTick(() => {
        // console.log(11111111111)
        Bus.$on('userId', busId => {
          this.userHeadId = busId;
          console.log(busId, 3);
          let id = this.userHeadId;
          if (id) {
            this.showMenu(id);
          }
        })
      })
    },
    methods: {
      // 根据用户Id 显示对应菜单权限
      showMenu(id) {
        console.log(id, 'ddddddd');
        var indexIcon = JSON.parse(JSON.stringify(this.$store.state.tabIcon1));
        indexIcon.forEach(item=>{
          item.flag = false;
        })


        this.$axios.getUserMenu({ userId: id }).then(res => {
          console.log(res, 'userMeusshow');
          if (res.data.ret == 1) {
            let list = res.data.data;
            list =  list.sort(this.sortNum('asc', 'permissionCode'))
            console.log(list,'5555555555555')
            var menuData = [{ // 菜单接收数据
              name: "首页",
              visible: false,
              son: {
                title: "首页",
                li: [{ name: "首页", router: "/index" }]
              }
            }];

            for (let i = 0; i < list.length; i++) {
              let obj = {};
              obj.name = list[i].permissionName;
              obj.visible = false;
              let objSon = {};
              objSon.title = list[i].permissionName;
              let liBox = [];
              let listChild = list[i].children;
              listChild = listChild.sort(this.sortNum('asc', 'permissionSort'));
              console.log(listChild,'5565656565')

              for (let j = 0; j < listChild.length; j++) {

                let liSon = {};
                liSon.name = listChild[j].permissionName;
                liSon.router = listChild[j].permissionUrl;
                console.log(liSon.router,'router');
                // 判断首页是否存在 快捷方式


                for(let k = 0;k < indexIcon.length;k++){
                  if(indexIcon[k].name == liSon.router){
                    indexIcon[k].flag = true;
                  }
                }


                liBox.push(liSon);
              }

              objSon.li = liBox;
              obj.son = objSon;
              this.poptipData.push(obj);
            }
            this.$store.commit('tabIconChange',indexIcon);
            var newArr = [];
            for (var k = 0; k < this.poptipData.length; k++) {
              for (var l = k + 1; l < this.poptipData.length; l++) {
                if (this.poptipData[k].name === this.poptipData[l].name) {
                  l = ++k
                }
              }
              newArr.push(this.poptipData[k])
            }

            this.$store.commit('showMenu', newArr);

          }
        })

      },
      //根据数字排序 'desc:降序' asc:升序
      sortNum(order, key) {
        var ordAlpah = (order == 'asc') ? '>' : '<';
        var sortFun = new Function('a', 'b', 'return a.' + key + ordAlpah + 'b.' + key + '?1:-1');
        return sortFun;
      },
      //退出账户
      headOut() {
        // this.$router.push({ path: "/ygcgj/login/sso" });
        console.log(this.$store.state.loginId);
        let loginIdN = this.$store.state.loginId;
        console.log(loginIdN, 'idn')
        let api = this.$axios.loginOut2();
        this.$axios.logout2({ loginId: loginIdN }).then(res => {

          // console.log(res,344444444);
          if(res.data.ret == 1){
            window.location.href =   api
          }else{
            this.$Message.error(res.data.retMsg)
          }



        })
        this.$store.commit("ps_Login", 0, {});
        this.$store.commit("loginState", 0, {});
        this.$store.commit('addNumOption', 1);
        let options = [
          {
            name: '首页',
            route: '/index',
          }
        ];
        this.$store.commit('showOption', options);

      },
      //头部tabs位置移动
      arrowLeft() {
        if (this.tip_l == 0) {
          return false;
        }
        this.tip_l >= 0 ? (this.tip_l -= 130) : (this.tip_l = 0);
      },
      arrowRight() {
        let w = this.$refs.poptip.offsetWidth;
        // console.log(w,233);

        this.tip_l = this.tip_l + 100;

      },
      //头部tabs标签按钮的点击，添加标签页进路由
      addOptions(list, index) {
        console.log(list.router,2333)

        //判断页签是否已存在
        let obj1 =[]
        let obj2 =[]
        let exsistFlag;
        obj1 = JSON.parse(JSON.stringify(this.$store.state.options));
        obj1.forEach((item,i)=>{
          //如果存在 页签
          if(item.route == list.router){
            exsistFlag=true;
          }
        })


        if(list.router == '/funding/ctdw'){



          if(!exsistFlag){
            this.$store.commit("saveCtAuditNo",'');
          }
          // console.log(exsistFlag,"exsistFlag")
          // console.log(this.$store.state.ctAuditNo,"ctNo")

          // // 去除缓存
          // let obj1 = [];
          // let obj2 = [];
          // obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
          //
          // obj1.forEach((item,i)=>{
          //   // console.log(item)
          //   if(item.route != list.router){
          //     obj2.push(item)
          //   }
          // })
          // this.$store.commit('add_includeOptions',obj2);
          //
          // console.log(this.$store.state.includeOption, "includeOption")
          //
          // this.$store.commit("saveCtAuditNo",'');


          // this.$store.commit('delete_tabs',list.router);
          // this.$store.commit('add_tabs',obj3);
        }
        if(list.router == '/funding/fore'){
          if(!exsistFlag)
          this.$store.commit("saveZtAuditNo",'');
        }
        if (list.router == '/funding/application') {
          if(!exsistFlag)
          this.$store.commit("saveZsAuditNo",'');
          // console.log(this.$store.state.zsAuditNo,34444444444)
        }

        //清除正式申请补录 的 no值
        if (list.router == '/funding/applicationBL') {
          if(!exsistFlag)
            this.$store.commit('saveZsBlAuditNo','');
        }
          //清除正式(补)申请补录 的 no值
        if (list.router == '/funding/applySupplement') {
          if(!exsistFlag)
            this.$store.commit('saveApplySupNo',{});
        }

        //清除用汇预算申报 的no值
        if (list.router == '/funding/userSinks') {
          this.$store.commit("delForexSqNo");
        }
        //清除外汇核销 的no值
        if (list.router == '/funding/foreign') {
          this.$store.commit("delForexSqNo2");
        }
        // 清除 汇率日期 的date值
        this.$store.commit('saveExchangeDate','')

        //清除 用汇通知表的no
        if (list.router == '/funding/yhtz') {
          this.$store.commit('yhtzNoSave','')
        }

        //清除 退汇通知表的no
        if (list.router == '/funding/thtz') {
          this.$store.commit('thtzNoSave','')
        }
        // // 删除 页签 去除缓存
        // let obj1 = [];
        // let obj2 = [];
        // obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
        //
        // obj1.forEach((item,i)=>{
        //   // console.log(item)
        //   if(item.route != list.router){
        //     obj2.push(item)
        //   }
        // })
        // this.$store.commit('add_includeOptions',obj2);


        // console.log(list, index, "head");
        // console.log(list.router,'roter')
        
        // this.$store.commit('add_tabs', {route: list.router , name: list.name });
        this.$router.push({path:list.router});

        // console.log(this.$store.state.info.userNick, 'userNickClcik')
        this.menuData[index].visible = false;
      },
      //用户名点击事件
      userTip(index) {
        console.log(index);
        console.log(1)
        this.visible = false;
      },
      indexOn(index) {
        for(let i=0;i<this.menuData.length;i++){
          this.menuData[i].visible = false;
        }


        if (index == "/index") {
          this.$router.push(index);
          return false;
        } else {
            this.menuData[index].visible = true;
        }
      }
    },
    data() {
      return {
        tip_l: 0,
        visible: false, //控制弹出框显示隐藏
        arrowrIf: true,
        userHeadId: '',
        info: '',
        userTipData: [
        ],
        activeData: null,
        poptipData1: [
          {
            name: "首页",
            visible: false,
            son: {
              title: "首页",
              li: [{ name: "首页", router: "/index" }]
            }
          },
        ],
        poptipData: [
          {
            name: "首页",
            visible: false,
            son: {
              title: "首页",
              li: [{ name: "首页", router: "/index" }]
            }
          },


          // {
          //   name: "查询分析",
          //   visible: false,
          //   son: {
          //     title: "基础资料",
          //     li: [
          //       { name: "经费使用情况查询", router: "/cxfx/analysis" },
          //       // {name:'经费正式申请统计',router:'/cxfx/apply'},
          //       // {name:'总预算使用情况监控',router:'/cxfx/monitor'},
          //       { name: "政策查询", router: "/cxfx/statistics" },
          //       { name: "预申请情况明细查询", router: "/cxfx/preapplication" }
          //     ]
          //   }
          // },

        ]

      };
    }
  };
</script>
<style scoped>
  .ivu-poptip-inner{
    /*width:185px;*/
  }

</style>
<style scoped lang="less">
  #componets-head {
    height: 70px;
    width: 100%;
    background: #2780d0;
    min-width: 1110px;
    .head-name {
      font-size: 22px;
      color: #fff;
      text-indent: 30px;
      float: left;
      margin: 20px 20px 0 0;
    }

    .arrow-left,
    .arrow-right {
      color: #fff;
      float: left;
      margin-top:23px;
      cursor: pointer;
      transition: all 0.3s;
      border: 1px solid #2780d0;
      &:hover {
        border: 1px solid #fff;
        border-radius: 4px;
      }
    }
    .arrow-right {
      -webkit-transform: rotate(180deg);
    }
    .head-poptip {
      position: relative;
      float: left;
      width: calc(~"100% - 750px");
      height: 30px;
      overflow: auto;
     scrollbar-width:none;
      margin-top: 23px;
      &::-webkit-scrollbar {
        display: none;
      }

      .tip-box {
        position: absolute;
        height: 22px;
        transition: all 0.2s;
        .ivu-poptip:last-child {
          .ivu-poptip-rel > p::after {
            content: "";
            width: 0;
            height: 0;
          }
        }
      }
      p,
      .poptip-click {

        background: transparent;
        border: none;
        border-radius: 4px;
        position: relative;
        float: left;
        padding:0 8px;
        font-size: 16px;
        text-align: center;
        text-indent: -1px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        &:hover,
        &:active,
        &:focus {
          color: #e0e0e0;
        }
      }
      p {
        &::after {
          content: "";
          width: 2px;
          height: 16px;
          position: absolute;
          top: 7px;
          right: 0;
          background: #fff;
        }
      }
    }
    .head-user {
      float: right;
      margin: 17px 5px 0 0;
      span,
      > div {
        float: left;
        color: #fff;
        font-size: 16px;
        display: block;
      }
      > div {
        margin: 7px 10px 0 20px;
      }
      span {
        cursor: pointer;
        border: 1px solid #2780d0;
        transition: all 0.3s;
        i {
          margin: -2px 0 0 0;
        }
        &:hover {
          color: #e0e0e0;
        }
      }
      .head-out {
        margin: 7px 5px 0 5px;
      }
    }
    .head-fullScreen {
      color: #fff;
      float: left;
      cursor: pointer;
      -webkit-transform: rotate(45deg);
      transition: all 0.3s;
      margin: 5px 0 0 20px;
      &:hover {
        color: #e0e0e0;
      }
    }
  }
  #user-tip {
    text-align: center;
    li {
      list-style: none;
      line-height: 32px;
      margin: 0;
      width: 92px;
      font-size: 14px;
      color: #606266;
      cursor: pointer;
      outline: none;
      &:hover {
        color: #66b1ff;
        background: #ecf5ff;
      }
      &.out {
        margin: 4px 0;
        cursor: auto;
        border-top: 1px solid #ebeef5;
      }
      i {
        margin-top: -2px;
      }
    }
  }
  #head-ul {

    li {
      list-style-type: none;
      font-size: 13px;
      line-height: 31px;
      cursor: pointer;
      border-bottom: 1px solid #fff;
      &:hover {
        color: #46a3ff;
      }
      &.name {
        cursor: auto;
        font-size: 14px;
        font-weight: bold;
        color: #303133;
        border-bottom: 1px solid #000;
      }
    }
  }
</style>
