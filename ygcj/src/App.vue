<template>
    <div id="app" v-cloak>
        <div>
            <header-page></header-page>
            <Tabs type="card"
                  :animated="false"
                  closable
                  :before-remove="befRemove"
                  :value="activeIndex"
                  @on-click="tabClick">
                <TabPane v-for="(item,index) in options"
                         :key="index"
                         :label="item.name"
                         :name="item.route"
                         :closable="item.name=='首页'?false:true">
                </TabPane>
            </Tabs>
        </div>
        <div class="appMain">
            <keep-alive :include="arr">
                <router-view v-if="isRouterAlive" :key="key"></router-view>
            </keep-alive>

        </div>

    </div>
</template>
<style>
    [v-cloak] {
        display: none !important;
    }
</style>
<script>
    import "@/assets/icon/iconfont.css";

    export default {
        name: "app",
        provide() {
            return {
                reload: this.reload
            };
        },
        created() {
            // console.log(this.isRouterAlive,999999);

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                localStorage.setItem("store", JSON.stringify(this.$store.state));
            });
            //在页面加载时读取sessionStorage里的状态信息并清空
            if (localStorage.getItem("store")) {
                this.$store.replaceState(
                    Object.assign(
                        {},
                        this.$store.state,
                        JSON.parse(localStorage.getItem("store"))
                    )
                );
                // localStorage.removeItem("store")
            }



        },
        computed: {
            key() {

                return this.$store.state.routePath;
            },
            options() {
                return this.$store.state.options;
            },
            includeArr() {
                return this.$store.state.includeOption;
            },

            ifLogin() {
                // console.log(this.$store.state.ifLogin,'iflogin');
                // console.log(this.$route.path);
                // if(this.$route.path == '/index'){

                // }
                // if (!this.$store.state.ifLogin) {
                //   console.log('iflogin','appLogin')
                //   this.$router.push({ path: "/" });
                // } else if (this.$store.state.ifLogin) {
                //   // console.log('ifLogin')
                //   this.$router.push({ path: this.activeIndex });
                // }
                // return this.$store.state.ifLogin;
            },
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex;
                },
                set(val) {
                    this.$store.commit("set_active_index", val);
                }
            }
        },
        data() {
            return {
                a: "abc",
                isRouterAlive: true,
                arr: []
            };
        },
        //全局方法
        methods: {
            // 刷新页面
            reload() {
                // console.log(this.$route.path,55)
                //
                // let obj=[];
                // let currentPage={}
                // obj= JSON.parse((JSON.stringify((this.$store.state.includeOption))));
                // obj.forEach((item,index)=>{
                //     if(item.route==this.$route.path){
                //         currentPage=JSON.parse((JSON.stringify(item)));
                //         obj.splice(index,1);
                //         this.$store.state.includeOption.splice(index,1)
                //     }
                // });


                let time = new Date().getTime()
                let data = this.$route.path + time;
                this.$store.commit('addRoutePath', data);


                // this.$store.commit('add_includeOption', {route: currentPage.route, name: currentPage.name});


            },
            // activated() {
            //   //只刷新数据，不改变整体的缓存
            //   console.log('00000000')
            //
            // },
            //删除之前的操作，阻止事件链
            befRemove(index) {
                // 删除页签时 去除缓存
                let path = this.options[index];
                this.options.splice(index, 1);
                let obj = [];
                let obj2 = []
                obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                obj.forEach((item, i) => {
                    if (item.route != path.route) {
                        obj2.push(item)
                    }
                })
                this.$store.commit('add_includeOptions', obj2);

                console.log(obj, 23333333, this.$store.state.includeOption)

                this.$router.push({path: this.options[this.options.length - 1].route});
                return new Promise(function (resolve, reject) {
                    // resolve('删除');
                    //reject('不删除');
                });

            },
            // tab切换时，动态的切换路由
            tabClick(tab) {
                this.$store.commit('addTab', tab);

                this.$router.push({path: tab});
            },


        },

        //监听路由变换操作标签页渲染数据
        watch: {

            $route(to) {
                // console.log(to.path, '77777777777')
                this.$store.commit('addRoutePath', to.path);
                this.$store.commit('addTab', to.path);
                let flag = false;
                if (to.name === "login") return false;

                for (let option of this.options) {
                    // console.log(option.name, to.name)
                    if (option.name === to.name) {
                        flag = true;
                        this.$store.commit("set_active_index", to.path);
                        break;
                    }
                }
                if (!flag) {

                    this.$store.commit('add_includeOption', {route: to.path, name: to.name});
                    this.$store.commit("add_tabs", {route: to.path, name: to.name});
                    this.$store.commit('addTab', to.path);
                    this.$store.commit("set_active_index", to.path);
                }


            },
            includeArr: {
                handler(newVal, oldVal) {
                    let obj = [];
                    this.arr = [];
                    let str = [
                        {name: '经费申请表填报', title: 'application'},
                        {name: '2019年1-7月经费补报', title: 'applicationbl'},
                        {name: '用汇申请表', title: 'userSinks'},
                        {name: '用汇核销单', title: 'foreign'},
                        {name: '组团表填报', title: 'fore'},
                        {name: '参团表填报', title: 'ctdw'},
                        {name: '用汇通知书', title: 'yhtz'},
                        {name: '退汇通知书', title: 'thtz'},
                        {name: '参团表查询', title: 'ctlist'},
                        {name: '组团表查询', title: 'ztlist'},
                        


                        {name: '经费申请表查询', title: 'zslist'},
                        {name: '2019年1-7月补报经费查询', title: 'zslistBL'},
                        {name: '2019年1-7月补报经费审核/退回', title: 'zslistBLFind'},
                        {name: '经费申请审核/退回', title: 'zslistPt'},
                        {name: '综合查询表', title: 'cxlist'},


                    ]
                    obj = JSON.parse(JSON.stringify(this.$store.state.includeOption))
                    console.log(obj, 5555555);

                    //只有在str中声明的页面 才会展示缓存内容
                    for (var i = 0; i < str.length; i++) {
                        for (var j = 0; j < obj.length; j++) {
                            if (obj[j].name == str[i].name) {
                                this.arr.push(str[i].title);
                            }
                        }

                    }
                    // console.log(this.arr, '6666666')

                },
                deep: true

            }
        }
    };
</script>
<style>
    [v-cloak] {
        display: none !important;
    }
</style>
<style lang="less">

    .ivu-message-notice-content {
        padding: 40px 40px;
        border-radius: 10px;
    }

    .ivu-message-notice-content-text {
        font-size: 18px;
    }

    .ivu-message .ivu-icon {
        font-size: 18px;
    }

    .ivu-poptip-popper {
        min-width: 100px;
    }

    .ivu-poptip-body {
        padding: 8px 8px;
    }

    .ivu-upload-list {
        margin-top: 0 !important;
    }

    .ivu-tabs-bar .ivu-tabs-nav-container {
        height: 45px;
    }

    html {
        height: 100%;
        overflow: hidden;
    }

    body {
        height: 100%;
        line-height: unset;
        // background: #F4F3F8;
    }

    #app {
        font-family: "微软雅黑";
        min-width: 1200px;
        color: #606266;

        .ivu-tabs {
            float: left;
            width: 100%;
            padding: 3px 14px;
            z-index: 999;
        }

        .ivu-tabs-bar {
            border-bottom: 2px solid #169aef;
            margin-bottom: 8px;
        }

        .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active .ivu-tabs-close,
        .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab:hover .ivu-tabs-close {
            color: #ccc;
        }

        .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
            background: #169aef;
            color: #fff;
        }

        .ivu-tabs-tabpane {
            height: 0px;
        }

        .appMain {
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            height: 84vh;
        }

        input {
            box-shadow: none;
        }

        input[type="number"] {
            border: 0;
            ime-mode: disabled;
            -moz-appearance: textfield;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        select {
            text-align-last: center;
        }
    }
</style>
