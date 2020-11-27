<template>
  <div class="index">
    <div class="index__list" v-for="(item,index) in list" :key="index" @click="updata(item)">{{ item.text }}</div>
    <div class="index__title">备忘录</div>
    <div class="index__tips">请输入</div>
    <input class="index__input" v-model="text" type="text">
    <div class="index__btn" @click="submit">提交</div>
    <el-dialog
      title="修改内容"
      :visible.sync="showmask"
      width="30%"
      :before-close="close">
      <el-input type="text" v-model="nowtext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDate">删除</el-button>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      nowtext: '',
      list: [],
      id: null,
      showmask: false,
    };
  },
  methods: {
    submit() {
      if (this.text) {
        this.$bus.submitText({
          text: this.text,
        });
      }
    },
    updata(item) {
      this.showmask = true;
      this.id = item._id;
      this.nowtext = item.text;
    },
    confirm() { // 提交修改
      if (this.id && this.nowtext) {
        this.$bus.updata({
          id: this.id,
          text: this.nowtext,
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.showmask = false;
            this.id = '';
            this.nowtext = '';
            this.getData();
          }
        });
      }
    },
    close() {
      this.showmask = false;
      this.nowtext = '';
      this.id = null;
    },
    getData() {
      this.$bus.getList().then((res) => {
        if (res.code === 0) {
          this.list = res.data;
        }
      });
    },
    deleteDate() {
      if (this.id) {
        this.$bus.remove({
          id: this.id,
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.showmask = false;
            this.id = '';
            this.nowtext = '';
            this.getData();
          }
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss">
.index {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  &__list {
    cursor: pointer;
  }
  &__title {
    text-align: center;
  }
  &__tips {
    font-size: 20px;
  }
  &__input {
    width: 200px;
    padding: 2px;
    box-sizing: border-box;
  }
  &__btn {
    width: 50px;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 2px;
  }
}
</style>
