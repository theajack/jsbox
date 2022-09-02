"use strict";

window.jsbox_libs = {
  'jquery': {
    'version': '3.4.1',
    'url': 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js'
  },
  'vue': {
    'version': '2.6.11',
    'url': 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js'
  },
  'vue3': {
    'version': 'latest',
    'url': 'https://cdn.jsdelivr.net/npm/vue'
  },
  'echarts': {
    'version': 'latest',
    'url': 'https://cdn.jsdelivr.net/npm/echarts'
  },
  'react': {
    'version': '16.13.1',
    'url': 'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js'
  },
  'react-dom': {
    'version': '16.13.1',
    'url': 'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js',
    'deps': ['react']
  },
  'angularjs': {
    'version': '1.7.9',
    'url': 'https://cdn.bootcss.com/angular.js/1.7.9/angular.min.js'
  },
  'vuex': {
    'version': '3.1.3',
    'url': 'https://cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js'
  },
  'redux': {
    'version': '4.0.5',
    'url': 'https://cdn.jsdelivr.net/npm/redux@4.0.5/lib/redux.min.js'
  },
  'loadsh': {
    'version': '0.0.4',
    'url': 'https://cdn.jsdelivr.net/npm/loadsh@0.0.4/lodash.min.js'
  },
  'virtual-dom': {
    'version': '2.1.1',
    'url': 'https://cdn.jsdelivr.net/npm/virtual-dom@2.1.1/dist/virtual-dom.js'
  },
  'node-html-parser': {
    'version': '1.2.13',
    'url': 'https://cdn.jsdelivr.net/npm/node-html-parser@1.2.13/dist/index.min.js'
  },
  'jest': {
    'version': '25.1.0',
    'url': 'https://cdn.jsdelivr.net/npm/jest@25.1.0/build/jest.min.js'
  },
  'mocha': {
    'version': '7.1.1',
    'url': 'https://cdn.jsdelivr.net/npm/mocha@7.1.1/lib/mocha.js'
  },
  'moment': {
    'version': '2.24.0',
    'url': 'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js'
  },
  'dayjs': {
    'version': '1.8.23',
    'url': 'https://cdn.jsdelivr.net/npm/dayjs@1.8.23/dayjs.min.js'
  },
  'underscore': {
    'version': '1.9.2',
    'url': 'https://cdn.jsdelivr.net/npm/underscore@1.9.2/underscore.min.js'
  },
  'axios': {
    'version': '0.19.2',
    'url': 'https://cdn.jsdelivr.net/npm/axios@0.19.2/index.min.js'
  },
  'qrcode': {
    'version': '1.4.4',
    'url': 'https://cdn.jsdelivr.net/npm/qrcode@1.4.4/lib/index.min.js'
  },
  'backbone': {
    'version': '1.4.0',
    'url': 'https://cdn.jsdelivr.net/npm/backbone@1.4.0/backbone.min.js'
  },
  'js-xlsx': {
    'version': '0.8.22',
    'url': 'https://cdn.jsdelivr.net/npm/js-xlsx@0.8.22/dist/xlsx.min.js'
  },
  'recast': {
    'version': '0.18.7',
    'url': 'https://cdn.jsdelivr.net/npm/recast@0.18.7/main.min.js'
  },
  'cnchar': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar/cnchar.min.js'
  },
  'cnchar-poly': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-poly/cnchar.poly.min.js',
    deps: ['cnchar']
  },
  'cnchar-order': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-order/cnchar.order.min.js',
    deps: ['cnchar']
  },
  'cnchar-trad': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-trad/cnchar.trad.min.js',
    deps: ['cnchar']
  },
  'cnchar-draw': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-draw/cnchar.draw.min.js',
    deps: ['cnchar']
  },
  'cnchar-idiom': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-idiom/cnchar.idiom.min.js',
    deps: ['cnchar']
  },
  'cnchar-xhy': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-xhy/cnchar.xhy.min.js',
    deps: ['cnchar']
  },
  'cnchar-radical': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-radical/cnchar.radical.min.js',
    deps: ['cnchar']
  },
  'cnchar-words': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-words/cnchar.words.min.js',
    deps: ['cnchar']
  },
  'cnchar-explain': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-explain/cnchar.explain.min.js',
    deps: ['cnchar']
  },
  'cnchar-voice': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-voice/cnchar.voice.min.js',
    deps: ['cnchar']
  },
  'cnchar-all': {
    url: 'https://cdn.jsdelivr.net/npm/cnchar-all/cnchar.all.min.js'
  },
  'easy-icon': {
    'url': 'https://cdn.jsdelivr.net/gh/theajack/easy-icon/dist/easy-icon.min.css',
    'type': 'style'
  },
  'element-ui': {
    'url': 'https://cdn.jsdelivr.net/npm/element-ui@2.13.0/lib/index.js',
    'deps': ['vue', 'element-ui-style']
  },
  'element-ui-style': {
    'url': 'https://cdn.jsdelivr.net/npm/element-ui@2.13.0/lib/theme-chalk/index.css',
    'type': 'style'
  }
};