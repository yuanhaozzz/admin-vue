<template>
    <div>
        <el-upload :action="action"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :headers="uploadHeaders"
                   :on-remove="handleRemove"
                   :on-success="handleSuccess"
                   :limit="limit"
                   :file-list="fileList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"
                   size="tiny">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="" />
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => {
        return {
            uploadHeaders: {},
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            action: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3003/server/upload/images'
                : 'http://yuanhao-web.cn/server/upload/images'
        };
    },
    props: {
        limit: {
            type: Number,
            default: 1
        }
    },
    mounted () {
        this.uploadHeaders = {
            Authorization: 'Bearer ' + this.userinfo.token
        };
    },
    methods: {
        /**
         * 删除图片
         */
        handleRemove (file, fileList) {
            this.fileList.splice(0, 1);
            this.$emit('getUploadImages', this.fileList);
        },

        /**
         * 上传成功
         */
        handleSuccess (response, file, fileList) {
            this.fileList.push({
                path: response.path,
                url: response.filename
            });
            this.$emit('getUploadImages', this.fileList);
        },

        /**
         * 设置初始图片
         */
        setInitImageList (fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    computed: {
        ...mapState(['userinfo'])
    }
};
</script>

<style></style>
