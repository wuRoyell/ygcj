<template>
  <div class="layout">
    <p style="font-size:34px;padding-top:10px">南京市本级因公出国(境)经费管理平台</p>
    <span class="link-primary login-upload">资源下载</span>
    <div class="login-con">
      <Card style="width:100%;height:100%;">
        <div class="login-header">
          <Icon type="md-contacts" size="22"/>欢迎登录
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
              <Icon type="md-person" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
              <Icon type="md-lock" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit('formInline')" class="btn">登录</Button>
          </FormItem>
        </Form>
      </Card>
    </div>

    <div class="login-copyright">Copyright &copy; 2019 南京财信网络科技有限公司</div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  // name: "login",
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        list: null
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      
      let obj = {
        userName: this.formInline.user,
        password: this.formInline.password
      };
      this.$axios.login(obj).then(res => {
        if (res.data.ret === 1) {
          this.$Message.success("登录成功!");
          this.$refs[name].validate(valid => {
            if (valid) {
              this.$store.commit("ps_Login", this.formInline);
              this.$store.commit("loginState", res.data.data);
              console.log(this.$store.state.info);
              // console.log(this.$store.state.info2);

              // this.$store.commit("ps_Login",1)
              this.$router.push({ path: "/index" });
            }
          });
        } else {
          this.$Message.error("请输入正确的用户名和密码!");
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.layout {
  background: url("../assets/image/group.png") no-repeat;
  width: 100%;
  height: 100vh;
  // background-size: cover;
  background-position: center 115px;
  position: relative;
  min-width: 500px;
  p {
    position: absolute;
    top: 0;
    left: 18%;
    line-height: 80px;
    font-size: 34px;
  }
  .login-header {
    padding: 5px;
    margin-bottom: 40px;
    text-align: left;
    i {
      margin-top: -2px;
    }
  }
  .login-upload {
    font-size: 12px;
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .login-copyright {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
    line-height: 60px;
    text-align: center;
  }
  .link-primary {
    color: #66b1ff;
  }

  .login-con {
    position: absolute;
    right: 10%;
    top: 52%;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
    width: 352px;
    height: 300px;
  }
  .ivu-form-item {
    margin-bottom: 30px;
  }
  .btn {
    box-shadow: 10px 10px 10px;
  }
}
</style>