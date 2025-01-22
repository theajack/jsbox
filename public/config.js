"use strict";

/*
 * @Author: tackchen
 * @Date: 2022-07-08 08:57:44
 * @Description: config dev debug
 */

window.jsboxCodeMap = {
  libs: {
    // 'cnchar': 'https://cdn.jsdelivr.net/gh/theajack/cnchar/dist/cnchar.latest.min.js',
    // 'jQuery': 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
    // 'easy-icon': {
    //     type: 'style',
    //     versio: '1.0.1',
    //     url: 'https://cdn.jsdelivr.net/gh/theajack/easy-icon/dist/easy-icon.min.css'
    // },
    // 'jsbox.cnchar': '',
    // 'cnchar-order': 'jsbox.cnchar-order'
  },
  codes: {
    //
    'helloWorld': {
      code: 'console.log("Hello world")',
      needUI: true,
    },
    'helloWorldHtml': {
      lang: 'html',
      code: '<h1>Hello world</h1>',
      hideLog: true,
    },
    // 默认使用上面定义的所有依赖
    'testCnchar': {
      desc: '测试',
      code: 'cnchar.spell("你好")',
      // dep: ['cnchar-order'] // 定义依赖，优先从当前文件中查找，如果没有会尝试在jsbox预定义库中查找
    },

    'test': {
      lang: 'html',
      code: '<div>111</div><script>cnchar.spell("你好")</script>',
      // dep: ['cnchar-order'] // 定义依赖，优先从当前文件中查找，如果没有会尝试在jsbox预定义库中查找
    }
  }
};

// https://cdn.jsdelivr.net/npm/virtual-dom@2.1.1/dist/virtual-dom.js