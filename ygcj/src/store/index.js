import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        options: [
            {
                name: '首页',
                route: '/index',
            }
        ],
        //存放缓存的页面
        includeOption: [
            {
                name: '首页',
                route: '/index',
            }
        ], // 缓存的页面
        xgId: '',// btbz 的修改id
        numOption: 1,//判断用户首次进入index页的option计数
        tab: '',//点击tab栏时的router
        routePath: '',//页面此时的路由
        userInfo: {},
        userName: '',
        loginId: '',//登录id
        activeIndex: '/index',
        menuData: [],//登录后菜单
        ifLogin: false,//登录状态
        spRead: true,// 正式申请表按钮状态
        sele: 100,
        info: "",
        info2: '',
        ztAuditNo: '',
        ctAuditNo: '',
        flag: true,
        groupnum: 0,
        zsAuditNo: "",
        zsBlAuditNo: '',//正式补录申请表id
        flag1: true,//
        forexSqNo: '',//用汇预算申报id
        forexSqNo2: '',// 外汇费用核销id
        yhtzNo: '',//用汇通知表id
        thtzNo: '',//退汇通知表id
        applySupNo:{},//申请补表

        exchangeDate: '',//查询汇率日期
        uploadPath: 'http://localhost:8090/ygcgj/sys/upload',
        downloadPath: 'http://localhost:8090/ygcgj/file/',
        conList: [],//代办事项
        conListDone: [],//已办事项
        zcfgId: '',//政策法规id
        // 岗位id
        postId: '',

        auditStatusList: [
            {
                name: "新增待确认",
                value: "1"
            },
            {
                name: "已确认",
                value: "2"
            },
            {
                name: "已保存",
                value: "3"
            },
            {
                name: "待业务处室审核",
                value: "4"
            },
            {
                name: "业务处室已审",
                value: "5"
            },
            {
                name: "业务处退回",
                value: "6"
            },
            {
                name: "扎口处已审",
                value: "7"
            },
            {
                name: "扎口处退回",
                value: "8"
            },

        ],
        Mission: [

            {
                name: "友好交流",
                value: "友好交流"
            },
            {
                name: "学习交流",
                value: "学习交流"
            },
            {
                name: "文化交流",
                value: "文化交流"
            },
            {
                name: "科技交流",
                value: "科技交流"
            },
            {
                name: "教育交流",
                value: "教育交流"
            },
            {
                name: "技术交流",
                value: "技术交流"
            },

            {
                name: "交流访问",
                value: "交流访问"
            },
            {
                name: "卫生医药交流",
                value: "卫生医药交流"
            },
            {
                name: "创新集聚",
                value: "创新集聚"
            },
            {
                name: "经贸招商",
                value: "经贸招商"
            },
            {
                name: "招才引智",
                value: "招才引智"
            },
            {
                name: "教学科研",
                value: "教学科研"
            },
            {
                name: "学术会议",
                value: "学术会议"
            },

            {
                name: "省教培训",
                value: "省教培训"
            },
            {
                name: "旅游推介",
                value: "旅游推介"
            },

            {
                name: "研修",
                value: "研修"
            },
            {
                name: "体育",
                value: "体育"
            },
            {
                name: "培训",
                value: "培训"
            },
            {
                name: "其他",
                value: "其他"
            },


        ],
        auditSub: [
            {
                no: "1",
                projectName: "本次因公出国（境）经费总预算",
                money: 0,
                remark: "",
                fileName: ['123123'],
                filePath: ['asfasd']
            },
            {
                no: "2",
                projectName: "1、国际旅费预算：",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            },
            {
                no: "3",
                projectName: "其中：国际旅费预算（抵离岸）",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            },
            {
                no: "4",
                projectName: "国（境）外城市间机票",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            },
            {
                no: "5",
                projectName: "2、境内经费预算 :",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            },
            {
                no: "6",
                projectName: "其中：签证费用",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            },
            {
                no: "7",
                projectName: "保险、防疫费",
                money: 0,
                remark: "",
                fileName: [],
                filePath: []
            }
        ],
        auditJwfde1: [
            {
                no: "1",
                projectName: "国（境）外城市间交通费（非机票）",
                remak: "",
                fileName: [],
                filePath: [],
                money: ""
            },
            {
                no: "2",
                projectName: "超标准住宿费用",
                remak: "",
                fileName: [],
                filePath: [],
                money: ""
            },
            {
                no: "3",
                projectName: "宴请费用",
                remak: "",
                fileName: [],
                filePath: [],
                money: ""
            }
        ],
        tabIcon1: [
            {name: '/funding/fore', flag: false},
            {name: '/funding/ctdw', flag: false},
            {name: '/funding/application', flag: false},
            {name: '/funding/userSinks', flag: false},
            {name: '/funding/foreign', flag: false},
            {name: '/funding/foreignMaintain', flag: false},
            {name: '/systemSetup/Usedepartment', flag: false},
            {name: '/funding/foreignQuery', flag: false},
            {name: '/funding/detailedlist', flag: false},


        ],
    },
    mutations: {
        //首页tabIcon展示
        tabIconChange(state, data) {
            this.state.tabIcon1 = data;
        },
        //用汇通知
        yhtzNoSave(state, data) {
            this.state.yhtzNo = data;
        },
        thtzNoSave(state, data) {
            this.state.thtzNo = data;
        },
        // btbz的修改id
        xgIdC(state, data) {
            this.state.xgId = data;
        },
        // 查询汇率日期
        saveExchangeDate(state, data) {
            this.state.exchangeDate = data;
        },
        //正式申请补录id
        saveZsBlAuditNo(state, data) {
            this.state.zsBlAuditNo = data;
        },
        //政策法规id
        addZcfgId(state, data) {
            this.state.zcfgId = data;
        },
        //岗位id
        addPostId(state, data) {
            this.state.postId = data;
        },
        //添加tab
        addTab(state, data) {
            // console.log(this.state.tab, 'this.tab')
            this.state.tab = data;
        },
        //添加routePath
        addRoutePath(state, data) {
            // console.log(this.state.tab, 'this.tab')
            this.state.routePath = data;
        },
        //菜单数据
        showMenu(state, data) {
            this.state.menuData = data;
            console.log(this.state.menuData, 'menu')
        },
        //添加首页conList
        addConList(state, data) {
            this.state.conList = data;
        },
        //添加首页已办事项
        addConListDone(state, data) {
            this.state.conListDone = data;
        },
        //添加 缓存页面
        add_includeOption(state, data) {
            this.state.includeOption.push(data);
        },
        add_includeOptions(state, data) {
            this.state.includeOption = data;
        },
        // 添加tabs
        add_tabs(state, data) {
            this.state.options.push(data);
            console.log(this.state.options);
        },
        //首次进来 展示一个tab首页
        showOption(state, obj) {
            this.state.options = obj;
        },
        addNumOption(state, data) {
            this.state.numOption = data;
        },

        // 删除tabs
        delete_tabs(state, route) {
            console.log(123,999)

            // 删除 页签 去除缓存
            // let obj1 = [];
            // let obj2 = [];
            // obj1 = JSON.parse(JSON.stringify(this.$store.state.includeOption));
            //
            // obj1.forEach((item,i)=>{
            //     console.log(item)
            //     if(item.route != route){
            //         obj2.push(item)
            //     }
            // })
            // console.log(this.$store.state.includeOption,"includeOption");
            // this.$store.commit('add_includeOptions',obj2);



            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.activeIndex = index;
        },
        // 设置保存的表格颜色
        set_tableColor(state, data) {
            if (data) {
                // console.log( this.state.userInfo[this.state.userName],'list');
                // console.log(this.state.userName)
                // console.log(this.state.userInfo,'info')
                // this.state.userInfo[this.state.userName].list = data;
            }
        },
        // 登录状态修改
        ps_Login(state, data) {

            if (data) {
                console.log(data, '1')
                this.state.ifLogin = true;
                this.state.userName = data.user;
                this.state.loginId = data.loginId;
                if (!this.state.userInfo[data.user]) {
                    this.state.userInfo[data.user] = data;
                }
            } else {
                console.log(data, '2')
                this.state.ifLogin = false;
                this.state.userName = '';
            }

        },
        //保存登录成功返回的数据
        loginState(state, data) {
            this.state.info = data;
            if (data) {
                this.state.userName = data.userNick;
            }

            // console.log(this.state.userName,'info')
            // this.state.info2 = data
        },
        //保存参团auditNo
        saveCtAuditNo(state, data) {
            this.state.ctAuditNo = data
        },
        //保存组团auditNo
        saveZtAuditNo(state, data) {
            this.state.ztAuditNo = data
        },

        // 保存参团人数
        saveGroupnum(state, data) {
            this.state.groupnum = data
            console.log(this.state.groupnum)
        },
        // //新增正式表保存auditNo
        // savezsAuditNo(state, data) {
        //     this.state.zsAuditNo = data
        // },
        // //头部点击进入正式表删除auditNo
        // delzsAuditNo(state, data) {
        //     this.state.zsAuditNo = ""
        // },
        //保存forexSqNo
        saveForexSqNo(state, data) {
            this.state.forexSqNo = data
        },
        
        //删除forexSqNo
        delForexSqNo(state, data) {
            this.state.forexSqNo = ""
        },
        //保存forexSqNo2
        saveForexSqNo2(state, data) {
            this.state.forexSqNo2 = data
        },
        //删除forexSqNo
        delForexSqNo2(state, data) {
            this.state.forexSqNo2 = ""
        },
        //保存 正式申请表编号
        saveZsAuditNo(state, data) {
            this.state.zsAuditNo = data
        },
        //删除 经费补申请表编号
        saveApplySupNo(state,data){
            console.log(data,'datastore',this.state.applySupNo)
            this.state.applySupNo = data;
           

        }


    }
});

export default store;
