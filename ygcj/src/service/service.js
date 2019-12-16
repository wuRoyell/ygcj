import httpService from '@/libs/http'
import axios from 'axios';
import store from '../store';
import VueCookie from 'vue-cookies';
// const api = '/api';

//打印
const baseUrl = 'http://ygcg.njcz.gov.cn:8091/WebReport/ReportServer';
// const baseUrl = 'http://ygcg.njcz.gov.cn:8091/WebReport/ReportServer';

//测试
//
    // const api = 'http://ygcg.njcz.gov.cn:8090/ygcgj';
    const api2 = 'http://stg.cas.njcz.gov.cn/cas/logout?service=';
    const tcApi = 'http://stg.portal.njcz.gov.cn:8080'; // 退出的地址
//本地
    const api = 'http://10.64.170.52:8090/ygcgj';
    
    // const api = 'http://10.64.175.61:8090/ygcgj';

// 生产
    // const api = 'http://ygcg.njcz.gov.cn:8088/ygcgj';
    // const api2 = 'http://cas.njcz.gov.cn/cas/logout?service='
    // const tcApi = 'http://portal.njcz.gov.cn'; // 退出的地址


axios.default.widthCredentials = true
axios.interceptors.request.use(config => {
    // console.log(VueCookie.get('JSESSIONID'), 'JSESSIONID');
    const token = VueCookie.get('JSESSIONID');
    if (token) {
        config.headers['JSESSIONID'] = token; //后台接收的参数
    }
    if (config.method === 'get'){
        config.params = {
            t:Date.parse(new Date()) /1000,
            ...config.params
        }
    }
    return config;
})
export default {
    //打印变量
    printCs(){

        return '_dev'; // 测试的
        // return ''; // 正式的
    },
    //批次进度
    pcjd(data) {
        return httpService.post(api + '/Yjts/pcjd', data, 'formdata')
    },
    // 退出地址
    loginOut(){
        return api2 + api;
    },
    // 正式退出地址
    loginOut2(){
      return tcApi;
    },


    //打印请求
    print(data) {
        return baseUrl;
    },
    //主页请求
    getUser(data) {
        return httpService.get(api + '/login/getUser?loginId=' + data.loginId, {}, 'GET')
    },
    //登录请求
    login(data) {
        return httpService.post(api + '/sys/login', data, 'formdata')
    },
    // 首页
    getConstant(data){
        return httpService.get(api + '/constant/get' + data, {}, 'GET')

    },
    //applySupplement
    //
    getApplySupAuditSpt(data){
        return httpService.get(api + '/auditspt/get?auditSptNo=' + data.auditSptNo, {}, 'GET')
    },
    addApplySupAuditSpt(data){
        return httpService.post(api + '/auditspt/add', data, 'post')
    },
    delApplySupAuditSpt(data){
        return httpService.post(api + '/auditspt/del', data, 'formdata')
    },
    upDateApplySupAuditSpt(data){
        return httpService.post(api + '/auditspt/update', data, 'post')
    },


    checkApplySupAuditSpt(data){
        return httpService.post(api + '/auditspt/auditcheck', data, 'formdata')
    },
      //退回
    backApplySupAuditSpt(data) {
        return httpService.post(api + '/auditspt/auditback', data, 'formdata')
    },
    // 收回
    withdrawApplySupAuditSpt(data) {
        return httpService.post(api + '/auditspt/auditwithdraw', data, 'formdata')
    },

    // applyList
    getApplyList(data){
        return httpService.get(encodeURI(api + '/auditspt/getlist?' + data), {}, 'GET')

    },

    logout2(data) {
        console.log(data)
        return httpService.post(api + '/login/logout', data, 'formdata')
    },
    //获取用户菜单
    getUserMenu(data) {
        return httpService.get(api + '/permission/get/usermenu?userId=' + data.userId, {}, 'GET')
    },
    //获取代办事项
    getTodo(data) {
        return httpService.get(api + '/todo/get?departCode=' + data.departCode + '&userNick=' + data.userNick+'&userAuditType='+data.userAuditType, {}, 'GET')
    },
    //获取已办事项
    getDoneTodo(data) {
        return httpService.get(api + '/todo/get/done?userId=' + data.userId, {}, 'GET')
    },
    //首页总预算已使用预算

    zedysyed(data) {
        return httpService.post(api + '/Yjts/zedysyed', data, 'POST')
    },
    //增加审批表 1 组团 2 参团 3 正式 4 补录
    addAudit(data) {
        console.log(data)
        return httpService.post(api + '/audit/add', data, 'POST')
    },
    //删除参团单位表
    delAudit(auditNo) {
        console.log(auditNo)
        return httpService.post(api + '/audit/del', {auditNo: auditNo}, 'formdata')
    },

    //获取顶级地区
    getDictRegionTop() {
        return httpService.post(api + '/dictRegion/getDictRegion', {}, 'POST')
    },
    //获取国家列表
    getCountrys() {
        return httpService.post(api + '/dictRegion/getCountryAll', {}, 'POST')
    },
    //获取城市列表
    getCitys() {
        return httpService.post(api + '/dictRegion/getCityAll', {}, 'POST')
    },
    //获取城市标准 币种 汇率
    getCityInfo(data) {
        return httpService.post(api + '/dictRegion/getDictRegionByid', data, 'formdata')
    },
    //获取下级地区
    getDictRegionNext(data) {
        return httpService.post(api + '/dictRegion/getDictRegionNext', data, 'POST')
    },
    //查询审批单详情
    getAudit(data) {
        return httpService.get(api + '/audit/get?auditNo=' + data, {}, 'GET')
    },
    // 获取新表列表
    getAuditList(data) {
        return httpService.get(api + '/audit/getlist?' + data, {}, 'GET')
    },
    //获取  可供填报正式表的  参团预报表 列表
    getCTList(data) {
        return httpService.get(api + '/audit/getctlist?' + data, {}, 'GET')
    },
    //根据auditNo查询信息
    byAuditNo(data) {
        return httpService.get(api + '/audit/get?auditNo=' + data, {}, 'GET')
    },
    // 查询一般公共预算科目信息

    getPublic(data) {
        return httpService.get(api + '/apiYbggys/getall', data, 'GET')
    },
    //修改
    update(data) {
        return httpService.post(api + '/audit/update', data, 'POST')
    },

    exchange(data) {
        return httpService.post(api + '/dictRegion/getDictRegionByid', data, 'POST')
    },
    //根据id查询汇率
    getExchange(data) {
        return httpService.post(api + '/Exchange/getExchange', data, 'POST')
    },
    //新增特殊支出事项申请
    auditspecial(data) {
        return httpService.post(api + '/auditspecial/add', data, 'POST')
    },
    //查询特殊支出事项申请
    getAuditspecial(data) {
        return httpService.get(api + '/auditspecial/get?auditNo=' + data, {}, 'GET')
    },
    //修改特殊支出事项申请
    UpdateAuditspecial(data) {
        return httpService.post(api + '/auditspecial/update', data, 'POST')
    },
    //新增正式申请表
    addzs(data) {
        return httpService.post(api + '/audit/addzs', data, 'POST')
    },
    //草稿保存
    draftcheck(data) {
        return httpService.post(api + '/audit/draftcheck', data, 'formdata')
    },

    // 外汇查询表 foreignQuery
    //查找
    getForeignLists(data) {
        // console.log(data);

        return httpService.get(api + '/forexsq/getlistall?page=' + data.page + '&row=' + data.row+'&userAuditType='+
            data.userAuditType+'&dep='+data.dep+'&forexType='+data.forexType, {}, 'GET')
    },

    // 用汇预算申报表
    // 保存
    addForexsq(data) {
        console.log(data);
        return httpService.post(api + '/forexsq/add', data, 'POST')
    },
    //修改
    updateForexsq(data){
        return httpService.post(api + '/forexsq/update', data, 'POST')
    },
    // 删除
    delForexsq(data) {
        console.log(data);
        return httpService.post(api + '/forexsq/del', data, 'formdata')
    },
    //查找
    getForexsq(data) {
        return httpService.get(api + '/forexsq/get?forexSqNo=' + data, {}, 'GET')
    },
    //外汇费用核销表
    // 保存
    addForexhx(data) {
        return httpService.post(api + '/forexhx/add', data, 'POST')
    },
    //查找
    getForexhx(data) {
        return httpService.get(api + '/forexhx/get?forexHxNo=' + data, {}, 'GET')
    },
    //修改
    updateForexhx(data){
        return httpService.post(api + '/forexhx/update', data, 'POST')
    },
    // 删除
    delForexhx(data) {
        console.log(data);
        return httpService.post(api + '/forexhx/del', data, 'formdata')
    },

    downloadFile(data) {
        return httpService.get(api + '/sys/download', data, 'GET')
    },
    downloadPath() {
        return api + '/file/'
    },
    uploadPath() {
        return api + '/sys/upload'
    },
    //  政策法规
    addFile() {
        return api + '/PolicyStatute/addFile'
    },
    fileDownload(data) {
        return api + '/PolicyStatute/fileDownload?fileId='


    },


    //政策查询表
    // 新增
    addPolicyStatute(data) {
        return api + '/PolicyStatute/addPolicyStatute'
    },
    //修改
    updatePolicyStatute() {
        return api + '/PolicyStatute/updatePolicyStatute'
    },
    //查询
    getPolicyStatuteList(data) {
        return httpService.post(encodeURI(api + '/PolicyStatute/getPolicyStatuteList?page=' + data.page + '&title=' + data.title + '&row=' + data.row + '&createName=' + data.createName + '&depName=' + data.depName), {}, 'GET')
    },
    //查询
    getPolicyStatuteList1(data) {
        return httpService.post(api + '/PolicyStatute/getPolicyStatuteList?policyType='+data.policyType , {}, 'GET')
    },
    //根据id查询
    getPolicyStatute(data) {
        return httpService.post(api + '/PolicyStatute/getPolicyStatute', data, 'POST');
    },
    //根据id删除
    delPolicyStatute(data) {
        return httpService.post(api + '/PolicyStatute/delPolicyStatute', data, 'formdata');
    },
    // 系统管理 => 补贴标准设置
    // 查询所有
    getSysSubsidyList(data) {
        return httpService.post(api + '/sysSubsidy/getSysSubsidyList', data, 'POST');
    },
    // 查看所有城市补贴标准
    getCityAll(data) {
        return httpService.post(api + '/dictRegion/getCitySuperAll', data, 'POST');
    },
    //更新一个
    updateDictRegion(data) {
        return httpService.post(api + '/dictRegion/updateDictRegion', data, 'formdata');
    },

    // 更新所有
    batchUpdateSysSubsidy(data) {
        return httpService.post(api + '/sysSubsidy/batchUpdateSysSubsidy', data, 'POST');
    },
    // 用汇管理 => 外汇维护表
    // 查询所有
    getExchangeList(data) {
        return httpService.post(api + '/Exchange/getExchangeList', data, 'formdata');
    },
    getExchangeByDate(data) {
        return httpService.post(api + '/Exchange/getExchangeByDate', data, 'formdata');
    },
    // 更新所有
    batchUpdateExchange(data) {
        return httpService.post(api + '/Exchange/batchUpdateExchange', data, 'POST');
    },


    // framWorks 组织机构
    //查询角色
    getRoleVO() {
        return httpService.get(api + '/role/getRoleVO', {}, 'GET')
    },
    //查询权限菜单
    getPermission() {
        return httpService.get(api + '/permission/getPermission', {}, 'GET')
    },
    //查询所有组织机构
    getOrganization() {
        return httpService.get(api + '/organization/getorgtree', {}, 'GET')
    },
    //
    getPostByOrgCode(data) {
        return httpService.get(api + '/post/getPostByOrgCode?orgCode=' + data.orgCode, {}, 'GET')
    },
    //根据orgCode查询单位下所有系统信息
    getSysOrg(data) {
        return httpService.post(api + '/OrgSyscodeinfo/getSysOrgSyscodeinfoAllByOrgCode', data, 'POST')
    },
    //
    getOrgByid(data) {
        console.log(data)
        return httpService.get(api + '/organization/getOrgByid', data, 'GET')
    },
    //tab查询单位信息
    bankinfo(data) {
        return httpService.post(api + '/organization/bankinfo/getlist', data, 'formdata')
    },
    //查询账套信息
    accountsetinfo(data) {
        return httpService.post(api + '/organization/accountsetinfo/getlist', data, 'formdata')
    },
    //根据部门查询所有岗位信息
    getPostById(data) {
        return httpService.post(api + '/post/getPostAllByDepCode', data, 'formdata')
    },
    //根据岗位id查岗位下用户信息
    getPostUserList(data) {
        return httpService.post(api + '/post/getPostUserList', data, 'formdata')
    },
    //新增单位
    addOrganization(data) {
        return httpService.post(api + '/organization/addOrganization', data, 'formdata')
    },
    //删除单位
    delOrganization(data) {
        return httpService.post(api + '/organization/delOrganization', data, 'formdata')
    },
    //删除部门
    delDepartment(data) {
        console.log(data)
        return httpService.post(api + '/department/delDepartmentById', data, 'formdata')
    },
    //新增部门
    addDepartment(data) {
        return httpService.post(api + '/department/addDepartment', data, 'formdata')
    },
    //根据部门id查询部门信息
    findDepartment(data) {
        return httpService.post(api + '/department/getDepartmenById', data, 'formdata')
    },
    //新增岗位
    addPost(data) {
        return httpService.post(api + '/post/addPost', data, 'formdata')
    },
    //删除岗位
    delPost(data) {
        return httpService.post(api + '/post/delPostById', data, 'formdata')
    },
    // 查询岗位下角色
    getPostInfoAllByPostId(data) {
        return httpService.post(api + '/post/getPostInfoAllByPostId', data, 'formdata')
    },
    // 绑定岗位下角色
    addPostUserById(data) {
        return httpService.post(api + '/post/addPostUserById', data, 'formdata')
    },
    // 解除岗位下角色
    delPostInfoByPostId(data) {
        return httpService.post(api + '/post/delPostInfoByPostIdAndPostRoleId', data, 'formdata')
    },


    //部门下内部机构职位下拉接口
    getPostList(data) {
        return httpService.post(api + '/post/getPostAll', data, 'formdata')
    },
    //根据岗位postCode查询所有的角色信息
    getPostInfoAllByPostCode(data) {
        return httpService.post(api + '/post/getPostInfoAllByPostCode', data, 'formdata')
    },
    //新增岗位下的人员
    addUser(data) {
        return httpService.post(api + '/user/addUser', data, 'POST')
    },
    //根据人员id查询人员信息
    getUserVO(data) {
        return httpService.get(api + '/user/getVO?id=' + data, {}, 'GET')
    },
    //查询人员任职情况
    getUserServing(data) {
        return httpService.get(api + '/user/getUserServing?id=' + data, {}, 'GET')
    },
    //根据人员id删除人员
    delUser(data) {
        return httpService.post(api + '/user/delUser', data, 'formdata')
    },
    //更新人员
    updateUser(data) {
        return httpService.post(api + '/user/updateUser', data, 'POST')
    },
    //更新岗位
    updatePostById(data) {
        return httpService.post(api + '/post/updatePostById', data, 'formdata')
    },
    //更新部门
    updateDepartmentById(data) {
        return httpService.post(api + '/department/updateDepartmentById', data, 'formdata')
    },
    //更新单位
    updateOrganization(data) {
        console.log(data)
        return httpService.post(api + '/organization/updateOrganization', data, 'formdata')
    },


    //角色管理新增角色
    addRole(data) {
        return httpService.post(api + '/role/addRole', data, 'formdata')
    },
    //删除角色
    delRole(data) {
        return httpService.post(api + '/role/delRole', data, 'formdata')
    },
    //更新角色
    updateRole(data) {
        return httpService.post(api + '/role/updateRole', data, 'formdata')
    },
    //更新授权
    updateRolePermission(data) {
        return httpService.post(api + '/permission/updateRolePermission', data, 'POST')
    },


    //条件查询所有用户
    getVOlist(data) {
        console.log(data)
        let {row, page} = data
        return httpService.get(api + '/user/getVOlist?row=' + row + '&page=' + page, data, 'GET')
    },

    //正式表送审
    auditNext(data) {
        return httpService.post(api + '/audit/auditcheck', data, 'formdata')
    },
    //正式表审核
    auditCheck(data) {
        return httpService.post(api + '/audit/auditcheck', data, 'formdata')
    },

    //正式表审核退回
    auditBack(data) {
        return httpService.post(api + '/audit/auditback', data, 'formdata')
    },
    //正式表审核  收回
    auditWithdraw(data) {
        return httpService.post(api + '/audit/auditwithdraw', data, 'formdata')
    },

    //预报表详情查询表
    getListDetailed(data) {
        // console.log(data)
        let {
            auditType, row, page, auditCompany,
            auditPjh1,
            groupMission,
            groupIsyearplan,
            userAuditType,
            groupIsbar,
            auditStatusArray,
            groupUnit, jfly
        } = data

        return httpService.get(encodeURI(api + '/audit/getListDetailed?auditType=' + auditType + '&row=' + row + '&page=' + page + '&auditCompany=' + auditCompany +
            '&auditPjh1=' + auditPjh1 + '&groupMission=' + groupMission + '&groupIsyearplan='
            + groupIsyearplan + '&groupIsbar=' + groupIsbar + '&groupUnit=' + groupUnit + '&jfly=' + jfly+'&userAuditType='+ userAuditType+'&auditStatusArray='+auditStatusArray), {}, 'GET')
    },
    getListDetailed2(data) {

        return httpService.get(api + '/audit/getListDetailed?' + data, {}, 'GET')
    },

    getListDetailedTotal(data) {
        // console.log(data)
        let {
            auditType, row, page, auditCompany,
            auditPjh1,
            groupMission,
            groupIsyearplan,
            userAuditType,
            groupIsbar,
            auditStatusArray,
            groupUnit, jfly
        } = data
        return httpService.get(encodeURI(api + '/audit/getListDetailed2?auditType=' + auditType +'&auditStatusArray='+auditStatusArray+ '&row=' + row + '&page=' + page + '&auditCompany=' + auditCompany +
            '&auditPjh1=' + auditPjh1 + '&groupMission=' + groupMission + '&groupIsyearplan='
            + groupIsyearplan + '&groupIsbar=' + groupIsbar + '&groupUnit=' + groupUnit + '&jfly=' + jfly+'&userAuditType='+userAuditType), {}, 'GET')
    },
// 预算限额
    // 查询 限额
    getSysBudgetList(data) {
        return httpService.post(api + '/SysBudget/getSysBudgetList', data, 'POST')
    },
    // 修改 限额
    updateSysBudget(data) {
        return httpService.post(api + '/SysBudget/updateSysBudget', data, 'formdata')

    },

    // 用汇通知书
    //保存
    yhtzAdd(data){
        return httpService.post(api + '/yhtz/add', data, 'post')
    },
    //删除
    yhtzDel(data){
        return httpService.post(api + '/yhtz/del', data, 'formdata')
    },
    //更新
    yhtzUpdate(data){
        return httpService.post(api + '/yhtz/update', data, 'post')
    },

    // 查询
    yhtzGet(data){
        return httpService.get(api + '/yhtz/get?yhtzNo='+data.yhtzNo, {}, 'get')
    },
    yhtzGetList(data){
        return httpService.get(api + '/yhtz/getlist?row='+data.row+'&page='+data.page, {}, 'get')
    },

    //退汇通知书
    //保存
    thtzAdd(data){
        return httpService.post(api + '/thtz/add', data, 'post')
    },
    //删除
    thtzDel(data){
        return httpService.post(api + '/thtz/del', data, 'formdata')
    },
    //更新
    thtzUpdate(data){
        return httpService.post(api + '/thtz/update', data, 'post')
    },

    // 查询
    thtzGet(data){
        return httpService.get(api + '/thtz/get?thtzNo='+data.thtzNo, {}, 'get')
    },
    thtzGetList(data){
        return httpService.get(api + '/thtz/getlist?row='+data.row+'&page='+data.page, data, 'get')
    },

    // 培训费用标准
    //保存
    trainAdd(data){
        return httpService.post(api + '/dicttrain/add', data, 'post')
    },
    //删除
    trainDel(data){
        return httpService.post(api + '/dicttrain/del', data, 'formdata')
    },
    //更新
    trainUpdate(data){
        return httpService.post(api + '/dicttrain/update', data, 'post')
    },

    // 查询
    trainGet(data){
        return httpService.get(api + '/dicttrain/get?id='+data.id, {}, 'get')
    },
    trainGetList(data){
        return httpService.get(encodeURI(api + '/dicttrain/getlist?row='+data.row+'&page='+data.page+'&state='+data.state+'&country='+data.country), {}, 'get')
    },









}
