const routers = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: "/index",
    name: "首页",
    component: resolve => require(["@/index.vue"], resolve),
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: resolve => require(["@/page/login.vue"], resolve),
  // },

  {
    path: "/funding/application",
    name: "经费申请表填报",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/application.vue"], resolve),
  },
  {
    path: "/funding/applySupplement",
    name: "经费(补)申请表填报",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/applySupplement.vue"], resolve),
  },
  {
    path: "/funding/sptlist",
    name: "经费(补)申请查询",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/applySupList.vue"], resolve),
  },
  {
    path: "/funding/yhtz",
    name: "用汇通知书",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/foreignNotice.vue"], resolve),
  },
  {
    path: "/funding/thtz",
    name: "退汇通知书",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/thForeignNotice.vue"], resolve),
  },
  {
    path: "/funding/yhtzlist",
    name: "用汇通知书查询",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/yhtzList.vue"], resolve),
  },
  {
    path: "/funding/thtzlist",
    name: "退汇通知书查询",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/thtzList.vue"], resolve),
  },




  {
    path: "/funding/applicationBL",
    name: "2019年1-7月经费补报",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/application_BL.vue"], resolve),
  },

  {
    path: "/systemSetup/Usedepartment",
    name: "使用部门设置",
    component: resolve => require(["@/page/systemSetup/Usedepartment.vue"], resolve),
  },
  {
    path: "/systemSetup/userSetting",
    name: "使用人设置",
    component: resolve => require(["@/page/systemSetup/userSetting.vue"], resolve),
  },


  {
    path: "/systemSetup/pxbz",
    name: "培训费用标准维护",
    component: resolve => require(["@/page/systemSetup/btbzTrain.vue"], resolve),
  },
  {
    path: "/systemSetup/btbz",
    name: "支出费用标准维护",
    component: resolve => require(["@/page/systemSetup/btbz.vue"], resolve),
  },
  {
    path: "/systemSetup/pxbzlist",
    name: "培训费用标准查询",
    component: resolve => require(["@/page/systemSetup/btbzTrainFind.vue"], resolve),
  },
  {
    path: "/systemSetup/btbzlist",
    name: "支出费用标准查询",
    component: resolve => require(["@/page/systemSetup/btbzFind.vue"], resolve),
  },
  {
    path: "/systemSetup/ysxe",
    name: "预算限额设置",
    component: resolve => require(["@/page/systemSetup/ysxe.vue"], resolve),
  },
  {
    path: "/systemSetup/roles",
    name: "角色管理",
    component: resolve => require(["@/page/systemSetup/roles.vue"], resolve),
  },
  {
    path: "/systemSetup/framWorks",
    name: "组织机构",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/systemSetup/framWorks.vue"], resolve),
    
  },
  {
    path: "/systemSetup/userManagers",
    name: "用户管理",
    component: resolve => require(["@/page/systemSetup/userManagers.vue"], resolve),
  },
  {
    path: "/systemSetup/ydyl",
    name: "一带一路国家查询",
    component: resolve => require(["@/page/systemSetup/ydylListFind.vue"], resolve),
  },


  {
    path: "/funding/userSinks",
    name: "用汇申请表",
    meta: {
      keepAlive: true
    },

    component: resolve => require(["@/page/fundingApplication/useSinksApplication.vue"], resolve),
  },
  {
    path: "/funding/foreign",
    name: "用汇核销单",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/foreignExch.vue"], resolve),
  },
  {
    path: "/funding/foreignQuery",
    name: "用汇查询",
    component: resolve => require(["@/page/fundingApplication/foreignQuery.vue"], resolve),
  },
  {
    path: "/funding/foreignMaintain",
    name: "汇率维护",
    component: resolve => require(["@/page/fundingApplication/foreignMaintain.vue"], resolve),
  },
  {
    path: "/funding/foreignMainFind",
    name: "汇率查询",
    component: resolve => require(["@/page/fundingApplication/foreignMainFind.vue"], resolve),
  },
  {
    path: "/funding/fore",
    name: "组团表填报",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/forecastTable.vue"], resolve),
  },
  {
    path: "/funding/ctdw",
    name: "参团表填报",
    meta: {
      keepAlive: true
    },
    component: resolve => require(["@/page/fundingApplication/ctdw.vue"], resolve),
  },
  {
    path: "/funding/special",
    name: "特殊事项申请表",
    component: resolve => require(["@/page/fundingApplication/specialtask.vue"], resolve),
  },
  // {
  //   path: '/funding/find',
  //   name: '组团表查询',
  //   component: resolve => require(["@/page/fundingApplication/applicationFind.vue"], resolve),
  // },
  
  {
    path:'/funding/ysqqk',
    name:'预申请情况明细表',
  },

  {
    path: '/funding/search',
    name: '经费正式查询表',
    component: resolve => require(["@/page/fundingApplication/applictionSearch.vue"], resolve),
  },
  {
    path:'/funding/ctlist',
    name:'参团表查询',
    component:resolve => require(["@/page/fundingApplication/ctlist.vue"], resolve),
  },
  {
    path:'/funding/ztlist',
    name:'组团表查询',
    component:resolve => require(["@/page/fundingApplication/ztlist.vue"], resolve),
  },
  {
    path: '/funding/zslist',
    name: '经费申请表查询',
    component: resolve => require(["@/page/fundingApplication/zslist.vue"], resolve),
  },
  {
    path: '/funding/zssplist',
    name: '经费申请审核/退回',
    component: resolve => require(["@/page/fundingApplication/zslistPt.vue"], resolve),
  },
  {
    path:'/funding/detailedlist',
    name:'综合查询表',
    component: resolve => require(["@/page/fundingApplication/cxlist.vue"], resolve),
  },
  {
    path: '/funding/bllist',
    name: '2019年1-7月补报经费查询',
    component: resolve => require(["@/page/fundingApplication/zslistBL.vue"], resolve),
  },
  {
    path: '/funding/blsplist',
    name: '2019年1-7月补报经费审核/退回',
    component: resolve => require(["@/page/fundingApplication/zslistBLFind.vue"], resolve),
  },
  {
    path: '/cxfx/analysis',
    name: '经费使用情况查询',
    component: resolve => require(["@/page/cxfx/analysis.vue"], resolve),
  },
  {
    path: '/cxfx/apply',
    name: '经费正式申请统计',
    component: resolve => require(["@/page/cxfx/apply.vue"], resolve),
  },
  {
    path: '/cxfx/bbsj',
    name: '报表设计器',
    component: resolve => require(["@/page/cxfx/bbsj.vue"], resolve),
  },
  {
    path: '/cxfx/bbcx',
    name: '报表查询',
    component: resolve => require(["@/page/cxfx/bbcx.vue"], resolve),
  },
  {
    path: '/cxfx/monitor',
    name: '总预算使用情况监控',
    component: resolve => require(["@/page/cxfx/monitor.vue"], resolve),
  },
  {
    path: '/cxfx/statistics',
    name: '政策查询',
    component: resolve => require(["@/page/cxfx/statistics.vue"], resolve),
  },



]
export default routers