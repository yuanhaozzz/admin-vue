<template>
  <div class="detail-wrapper">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="150px"
             class="demo-ruleForm">
      <!-- 文章标题 -->
      <el-form-item label="文章标题"
                    prop="title">
        <el-input v-model.trim="ruleForm.title"
                  maxlength="30"
                  clearable></el-input>
      </el-form-item>
      <!-- 作者  -->
      <el-form-item label="作者">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <!-- 文章简介  -->
      <el-form-item label="文章简介"
                    prop="description">
        <el-input type="textarea"
                  :autosize="{ minRows: 2 }"
                  clearable
                  placeholder="请输入..."
                  v-model.trim="ruleForm.description">
        </el-input>
      </el-form-item>
      <!-- 浏览量  -->
      <el-form-item label="浏览量"
                    prop="pageViews">
        <el-input v-model.trim="ruleForm.pageViews"></el-input>
      </el-form-item>
      <!-- 创作时间 -->
      <el-form-item label="发布时间"
                    prop="date">
        <el-date-picker v-model="ruleForm.date"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="文章封面">
        <Upload ref="upload"
                @getUploadImages="getUploadImages"></Upload>
      </el-form-item>
      <!-- 编辑器 -->
      <el-form-item label="">
        <Editor ref="editor"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button type="info"
                   @click="handleSave">保存</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import Upload from '@/components/Upload.vue';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        author: '袁浩',
        date: '',
        pageViews: 1,
        description: '',
      },
      article: '',
      uploadHeaders: {},
      imageList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入文章简介',
            trigger: 'change',
          },
          {
            min: 5,
            max: 100,
            message: '长度在 5 到 100 个字符',
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: '请选择创作时间',
            trigger: 'change',
          },
        ],
        pageViews: [
          {
            required: true,
            message: '请填写浏览量',
            trigger: 'change',
          },
        ],
      },
    };
  },
  mounted () {

    let draft = localStorage.getItem('draft')
    let { title, description, article } = JSON.parse(draft)
  },
  methods: {
    /**
    * 保存到本地
    */
    handleSave () {
      let draft = localStorage.getItem('draft')
      if (draft) {
        this.openMessageBox(draft)
      } else {
        this.saveLocal()
        this.$message({
          message: '已保存，注：只能同时存在一篇文章草稿',
          type: 'success'
        });
      }

    },

    /**
    *   二次确认
    *   @params {Object} draft 
     */
    openMessageBox (draft) {
      let { title, description, article } = JSON.parse(draft)

      this.$confirm('此操作将会覆盖上一次缓存文章，是否替换？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveLocal()
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });
      });
    },

    /**
    *   保存到本地
     */
    saveLocal () {
      let { title, description, article } = this
      let params = {
        title,
        description,
        article
      }
      localStorage.setItem('draft', JSON.stringify(params))
    },
    /**
     * 上传图片
     */
    getUploadImages (imageList) {
      this.imageList = imageList;
    },
    /**
     * 获取详情
     * @param {Object} detail 详情数据
     */
    getDetail (data) {
      this.ruleForm.title = data.title;
      this.ruleForm.author = data.author;
      this.ruleForm.date = data.releaseTime;
      this.ruleForm.pageViews = data.pageViews;
      this.ruleForm.description = data.description;

      this.$refs.editor.setEditorContent(data.article);
      let imagesList = [{ url: data.imageUrl, path: data.cover }];
      this.$refs.upload.setInitImageList(imagesList);
      this.imageList = imagesList;
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.imageList.length === 0) {
            this.$message.error('请上传文章封面！');
            return;
          }
          this.article = this.$refs.editor.getEditorContent();
          if (!this.article) {
            this.$message.error('请书写文章！');
            return;
          }
          let {
            title,
            author,
            date,
            pageViews,
            releaseTime,
            description,
          } = this.ruleForm;

          let params = {
            title,
            author,
            releaseTime: date,
            pageViews,
            article: this.article,
            cover: this.imageList[0].path,
            imageUrl: this.imageList[0].url,
            userId: this.userinfo.id,
            type: 1,
            description,
          };

          this.$emit('submit', params);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back (formName) {
      this.$router.back();
    },
  },
  computed: {
    ...mapState(['userinfo']),
  },
  components: {
    Editor,
    Upload,
  },
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
}
</style>
