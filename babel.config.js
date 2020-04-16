const presets = [
    "@babel/env",
];

const plugins = [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ]
];

module.exports = { presets, plugins };