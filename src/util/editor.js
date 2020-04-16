export const EDITOR_LEFT = {
    bold: {
        prefix: '**',
        subfix: '**',
        str: '加粗'
    },
    italic: {
        prefix: '*',
        subfix: '*',
        str: '斜体'
    },
    underline: {
        prefix: '++',
        subfix: '++',
        str: '下划线'
    },
    strikethrough: {
        prefix: '~~',
        subfix: '~~',
        str: '中划线'
    },
    mark: {
        prefix: '==',
        subfix: '==',
        str: '标记'
    },
    code: {
        prefix: '```',
        subfix: '\n\n```\n',
        str: 'language'
    },
    table: {
        prefix: '',
        subfix: '',
        str:
            '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
    },
    center: {
        prefix: '::: hljs-center\n\n',
        subfix: '\n\n:::\n',
        str: '居中'
    },
    right: {
        prefix: '::: hljs-right\n\n',
        subfix: '\n\n:::\n',
        str: '右对齐'
    },
    left: {
        prefix: '::: hljs-left\n\n',
        subfix: '\n\n:::\n',
        str: '左对齐'
    },
    link: {
        prefix: '[](',
        subfix: ')',
        str: '链接'
    },
    upload: {
        prefix: '![](',
        subfix: ')',
        str: '图片'
    },
    quote: {
        prefix: '> ',
        subfix: '',
        str: '引用'
    }
};
