<template>
  <div class="login">
    <el-tabs class="login__tab"  type="card" v-model="activeName" @tab-click="clickTab">
      <el-tab-pane label="登录" name="login">登录</el-tab-pane>
      <el-tab-pane label="注册" name="register">注册</el-tab-pane>
    </el-tabs>
    <div>
      <p>账号</p>
      <el-input class="login__username" v-model="username" type="text"></el-input>
    </div>
    <div>
      <p>密码</p>
      <el-input class="login__password" v-model="password" type="password"></el-input>
    </div>
    <el-button class="login__btn" v-show="activeName === 'login'" @click="tologin">登录</el-button>
    <el-button class="login__btn" v-show="activeName === 'register'" @click="toregister">注册并登陆</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'login',
      username: '',
      password: '',
    };
  },
  methods: {
    clickTab() {
      console.log(this.activeName);
    },
    toregister() {
      if (this.username) {
        if (this.password) {
          this.$bus.register({
            username: this.username,
            password: this.password,
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '注册成功',
              });
              this.$bus.id = res.data[0]._id;
              this.$router.push({
                path: '/',
                query: {
                  id: res.data[0]._id,
                },
              });
            } else {
              this.$message({
                message: `${res.msg}`,
                type: 'error',
              });
            }
          });
        } else {
          this.$message({
            message: '请输入密码',
            type: 'error',
          });
        }
      } else {
        this.$message({
          message: '请输入用户名',
          type: 'error',
        });
      }
    },
    tologin() {
      if (this.username) {
        if (this.password) {
          this.$bus.login({
            username: this.username,
            password: this.password,
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '登录成功',
              });
              this.$bus.id = res.data[0]._id;
              this.$router.push({
                path: '/',
                query: {
                  id: res.data[0]._id,
                },
              });
            } else {
              this.$message({
                message: `${res.msg}`,
                type: 'error',
              });
            }
          });
        } else {
          this.$message({
            message: '请输入密码',
            type: 'error',
          });
        }
      } else {
        this.$message({
          message: '请输入用户名',
          type: 'error',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  text-align: center;
  padding: 10vh 0;
  p {
    display: inline-block;
    font-size: 18px;
    margin-right: 10px;
  }
  &__tab {
    margin: 0 auto;
    width: 50vw;
  }
  &__username {
    width: 50vw;
  }
  &__password {
    width: 50vw;
    margin-bottom: 5vh;
  }
  &__btn {
    margin: 0 auto;
    display: block;
  }
}
</style>
