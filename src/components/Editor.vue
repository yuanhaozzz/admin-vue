<template>
    <div class="editor-wrapper">
        <!-- <button @click="insertImage" @select="selectText()">插入</button> -->
        <div class="editor-package-wrapper">
            <!-- 功能区 -->
            <div class="editor-top">
                <!-- 粗体 -->
                <button
                    type="button"
                    class="fa fa-bold"
                    @click="insertText('bold')"
                    title="粗体 (ctrl+b)"
                ></button>
                <!-- 斜体 -->
                <button
                    type="button"
                    class="fa fa-italic"
                    @click="insertText('italic')"
                    title="下划线 (ctrl+i)"
                ></button>
                <!-- 下划线 -->
                <button
                    type="button"
                    class="fa fa-mavon-underline"
                    @click="insertText('underline')"
                    title="下划线 (ctrl+u)"
                ></button>
                <!-- 中划线 -->
                <button
                    type="button"
                    class="fa fa-mavon-strikethrough"
                    @click="insertText('strikethrough')"
                    title="中划线 (ctrl+ shift + d)"
                ></button>
                <!-- 标记 -->
                <button
                    type="button"
                    class="fa fa-mavon-thumb-tack"
                    @click="insertText('mark')"
                    title="标记 (ctrl+ m)"
                ></button>
                <!-- 段落引用 -->
                <button
                    type="button"
                    class="fa fa-mavon-quote-left"
                    @click="insertText('quote')"
                    title="段落引用 (ctrl+ q)"
                ></button>

                <!-- 链接 -->
                <button
                    type="button"
                    class="fa fa fa-mavon-link"
                    @click="insertText('link')"
                    title="链接 (ctrl+ l)"
                ></button>
                <!-- 上传图片 -->
                <button
                    type="button"
                    class="fa fa-mavon-picture-o"
                    @click="insertText('upload')"
                ></button>
                <!-- 代码块 -->
                <button
                    type="button"
                    class="fa fa-mavon-code"
                    @click="insertText('code')"
                    title="代码块 (ctrl+ alt + c)"
                ></button>
                <!-- 清除 -->
                <button
                    type="button"
                    class="fa fa-mavon-trash-o"
                    @click="clearValue"
                    title="代码块 (ctrl+ backspace)"
                ></button>
            </div>
            <div class="editor-bottom flex-start">
                <div class="editor-bottom-edit">
                    <pre class="editor-bottom-edit-pre">{{ value }}</pre>
                    <textarea
                        class="editor-bottom-edit-input"
                        v-model="value"
                        ref="textarea"
                    ></textarea>
                </div>
                <div
                    class="editor-bottom-view editor-bottom-common "
                    v-html="compiledMarkdownValue"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
// markdown编辑器
import { mavonEditor } from 'mavon-editor';
import marked from 'marked';
import 'mavon-editor/dist/css/index.css';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import { EDITOR_LEFT } from '@/util/editor';

export default {
    data() {
        return {
            value: '',
            textareaEl: null,
        };
    },
    mounted() {
        this.textareaEl = this.$refs.textarea;
    },
    methods: {
        /**
         * 键盘按下监听
         * keycode
         * 17   ctrl
         * 66   b
         * 68   d
         * 73   i
         * 85   u
         * 77   m
         */
        watchKeydown(e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            var shiftKey = e.shiftKey;
            var altKey = e.altKey;
            console.log(e);
            console.log(keyCode);
            // 加粗
            if (ctrlKey && !shiftKey && !altKey) {
                switch (keyCode) {
                    // 粗体
                    case 66:
                        this.insertText('bold');
                        break;
                    // 斜体
                    case 73:
                        this.insertText('italic');
                        break;
                    // 下划线
                    case 85:
                        this.insertText('underline');
                        e.preventDefault();
                        break;
                    // 标记
                    case 77:
                        this.insertText('mark');
                        e.preventDefault();
                        break;
                    // 段落引入
                    case 81:
                        this.insertText('quote');
                        e.preventDefault();
                        break;
                    // 链接
                    case 76:
                        this.insertText('link');
                        e.preventDefault();
                        break;
                    // 清除
                    case 9:
                        this.clearValue();
                        e.preventDefault();
                        break;
                }
            } else if (ctrlKey && shiftKey) {
                switch (keyCode) {
                    // 中划线
                    case 68:
                        this.insertText('strikethrough');
                        break;
                }
            } else if (ctrlKey && !shiftKey && altKey) {
                switch (keyCode) {
                    // 代码块
                    case 67:
                        this.insertText('code');
                        break;
                }
            }
        },

        /**
         * 功能区
         */
        insertText(type) {
            console.log(this.textareaEl.selectionStart);
            // 光标位置
            let { selectionStart, selectionEnd } = this.textareaEl;
            let startIndex = selectionStart;
            let endIndex = selectionEnd;
            let value = this.value;

            this.textareaEl.focus();
            let { prefix, subfix, str } = EDITOR_LEFT[type];

            // 不是选中
            if (startIndex === endIndex) {
                this.value =
                    value.substring(0, startIndex) +
                    prefix +
                    str +
                    subfix +
                    value.substring(endIndex, value.length);
                this.$nextTick(() => {
                    this.textareaEl.selectionStart = startIndex + prefix.length;
                    this.textareaEl.selectionEnd =
                        startIndex + str.length + prefix.length;
                });
            } else {
                /**
                 * 判断选中是否包含特殊标签
                 */
                if (
                    value.substring(startIndex - prefix.length, startIndex) ===
                        prefix &&
                    value.substring(endIndex + subfix.length, endIndex) ===
                        subfix
                ) {
                    this.value =
                        value.substring(0, startIndex - prefix.length) +
                        str +
                        value.substring(endIndex + subfix.length, value.length);
                    this.$nextTick(() => {
                        this.textareaEl.selectionStart =
                            startIndex - prefix.length;
                        this.textareaEl.selectionEnd = endIndex - prefix.length;
                    });
                } else {
                    this.value =
                        value.substring(0, startIndex) +
                        prefix +
                        value.substring(startIndex, endIndex) +
                        subfix +
                        value.substring(endIndex, value.length);

                    this.$nextTick(() => {
                        this.textareaEl.selectionStart =
                            startIndex + prefix.length;
                        this.textareaEl.selectionEnd =
                            startIndex + str.length + prefix.length;
                    });
                }
            }
            this.textareaEl.focus();
        },

        /**
         * 清除全部内容
         */
        clearValue() {
            this.value = '';
        },
        selectText() {
            let { selectionStart, selectionEnd } = this.textarea;

            alert(selectionStart + selecter + selectionEnd);
        },

        /**
         * 加粗
         */
        handleBold() {
            let { selectionStart, selectionEnd } = this.$refs.textarea;
            let value = this.value;
            let insertValue = '**加粗**';
            if (selectionStart === selectionEnd) {
                this.value =
                    value.substring(0, selectionStart) +
                    insertValue +
                    value.substring(selectionEnd, value.length);
            }
            console.log(selectionStart, selectionEnd);
        },
        insertImage(e) {
            console.log(selectionStart, this.$refs.textarea.selectionEnd);

            let start = selectionStart;
            let str =
                this.test.substring(0, start) +
                '~我是插入的值~' +
                this.test.substring(start, start.length);
            this.test = str;
        },
        /**
         * 设置编辑器内容
         * @param {String} value 内容
         */
        setEditorContent(html) {
            this.value = html;
        },

        /**
         * 获取编辑器内容
         */
        getEditorContent() {
            return this.value;
        },
    },

    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        compiledMarkdownValue: function() {
            return marked(this.value, {
                highlight: function(code) {
                    //新加的，用来配置语法高亮
                    return hljs.highlightAuto(code).value;
                },
            });
        },
    },
    components: {
        mavonEditor,
    },
};
</script>

<style lang="scss">
.editor-wrapper {
    min-height: 400px;
    align-items: flex-start;
    margin-bottom: 40px;
    .quill-editor {
        height: 80%;
    }
    .editor-view {
        width: 900px;
        height: 100%;
        margin-left: 30px;
        border: 1px solid #eee;
    }
    .editor-package-wrapper {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
        position: relative;
        .editor-top {
            background: #fff;
            border-bottom: 1px solid #f2f6fc;
            padding-left: 10px;
            position: sticky;
            top: -20px;
            left: 0;
            z-index: 99999;
            button {
                box-sizing: border-box;
                display: inline-block;
                cursor: pointer;
                height: 28px;
                width: 28px;
                margin: 6px 0 5px 0px;
                font-size: 14px;
                padding: 4.5px 6px 5px 3.5px;
                color: #757575;
                border-radius: 5px;
                text-align: center;
                background: none;
                border: none;
                outline: none;
                line-height: 1;
                transition: all 0.2s linear 0s;
            }
            button:hover {
                color: rgba(0, 0, 0, 0.8);
                background: #e9e9eb;
            }
        }
        .editor-bottom {
            font-family: Menlo, 'Ubuntu Mono', Consolas, 'Courier New',
                'Microsoft Yahei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei',
                sans-serif;
            color: #2c3e50;
            font-size: 14px;
            align-items: flex-start;
            .editor-bottom-edit {
                width: 50%;
                padding: 30px;
                box-sizing: border-box;
                cursor: text;
                border-right: 5px solid #e5e5e5;
                font-family: Menlo, 'Ubuntu Mono', Consolas, 'Courier New',
                    'Microsoft Yahei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei',
                    sans-serif;
                color: #2c3e50;
                font-size: 14px;
                position: relative;
                height: 100%;
                .editor-bottom-edit-pre {
                    width: 100%;
                    padding-right: 10px !important;
                    min-height: 400px;
                }
                .editor-bottom-edit-input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    resize: none;
                    padding: 10px 15px;
                    box-sizing: border-box;
                    font-family: Menlo, 'Ubuntu Mono', Consolas, 'Courier New',
                        'Microsoft Yahei', 'Hiragino Sans GB',
                        'WenQuanYi Micro Hei', sans-serif;
                }
            }
            .editor-bottom-view {
                width: 50%;
            }
            .editor-bottom-common {
                min-height: 400px;
                padding: 10px 15px;
                box-sizing: border-box;
            }
        }
        *::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
<style lang="scss">
pre {
    padding: 16px;
    overflow: auto;
    font-size: 18px;
    line-height: 1.45;
    border-radius: 3px;
    background: #fdf6e3;
    font-family: Menlo, 'Ubuntu Mono', Consolas, 'Courier New',
        'Microsoft Yahei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', sans-serif !important;
}
.hljs-keyword {
    color: #dc322f !important;
}
.hljs-string {
    color: #2aa198 !important;
}
.hljs-params {
    color: #657b83 !important;
}
.hljs-subst {
    color: #859900 !important;
}
.hljs-title {
    color: #268bd2 !important;
}
.hljs-built_in {
    color: #dc322f !important;
}
blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
}
.hljs-comment {
}
</style>
