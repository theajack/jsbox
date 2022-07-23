"use strict";

window.jsbox_envs = {
  'element-ui': {
    lang: 'html',
    code:
    /* html*/
    "<div id='app'>\n<el-form ref=\"form\" :model=\"form\" label-width=\"80px\">\n    <el-form-item label=\"\u6D3B\u52A8\u540D\u79F0\">\n    <el-input v-model=\"form.name\"></el-input>\n    </el-form-item>\n    <el-form-item label=\"\u6D3B\u52A8\u533A\u57DF\">\n    <el-select v-model=\"form.region\" placeholder=\"\u8BF7\u9009\u62E9\u6D3B\u52A8\u533A\u57DF\">\n        <el-option label=\"\u533A\u57DF\u4E00\" value=\"shanghai\"></el-option>\n        <el-option label=\"\u533A\u57DF\u4E8C\" value=\"beijing\"></el-option>\n    </el-select>\n    </el-form-item>\n    <el-form-item label=\"\u6D3B\u52A8\u65F6\u95F4\">\n    <el-col :span=\"11\">\n        <el-date-picker type=\"date\" placeholder=\"\u9009\u62E9\u65E5\u671F\" v-model=\"form.date1\" style=\"width: 100%;\"></el-date-picker>\n    </el-col>\n    <el-col class=\"line\" :span=\"2\">-</el-col>\n    <el-col :span=\"11\">\n        <el-time-picker placeholder=\"\u9009\u62E9\u65F6\u95F4\" v-model=\"form.date2\" style=\"width: 100%;\"></el-time-picker>\n    </el-col>\n    </el-form-item>\n    <el-form-item label=\"\u5373\u65F6\u914D\u9001\">\n    <el-switch v-model=\"form.delivery\"></el-switch>\n    </el-form-item>\n    <el-form-item label=\"\u6D3B\u52A8\u6027\u8D28\">\n    <el-checkbox-group v-model=\"form.type\">\n        <el-checkbox label=\"\u7F8E\u98DF/\u9910\u5385\u7EBF\u4E0A\u6D3B\u52A8\" name=\"type\"></el-checkbox>\n        <el-checkbox label=\"\u5730\u63A8\u6D3B\u52A8\" name=\"type\"></el-checkbox>\n        <el-checkbox label=\"\u7EBF\u4E0B\u4E3B\u9898\u6D3B\u52A8\" name=\"type\"></el-checkbox>\n        <el-checkbox label=\"\u5355\u7EAF\u54C1\u724C\u66DD\u5149\" name=\"type\"></el-checkbox>\n    </el-checkbox-group>\n    </el-form-item>\n    <el-form-item label=\"\u7279\u6B8A\u8D44\u6E90\">\n    <el-radio-group v-model=\"form.resource\">\n        <el-radio label=\"\u7EBF\u4E0A\u54C1\u724C\u5546\u8D5E\u52A9\"></el-radio>\n        <el-radio label=\"\u7EBF\u4E0B\u573A\u5730\u514D\u8D39\"></el-radio>\n    </el-radio-group>\n    </el-form-item>\n    <el-form-item label=\"\u6D3B\u52A8\u5F62\u5F0F\">\n    <el-input type=\"textarea\" v-model=\"form.desc\"></el-input>\n    </el-form-item>\n    <el-form-item>\n    <el-button type=\"primary\" @click=\"onSubmit\">\u7ACB\u5373\u521B\u5EFA</el-button>\n    <el-button>\u53D6\u6D88</el-button>\n    </el-form-item>\n</el-form>\n</div>\n<script>\nvar app = new Vue({\n    el: '#app',\n    data() {\n        return {\n            form: {\n            name: '',\n            region: '',\n            date1: '',\n            date2: '',\n            delivery: false,\n            type: [],\n            resource: '',\n            desc: ''\n            }\n        }\n    },\n    methods: {\n        onSubmit() {\n            console.log('submit!', this.form);\n        }\n    }\n})\n</script>",
    deps: ['element-ui']
  },
  'cnchar': {
    code:
    /* javascript*/
    "\nlog(cnchar.version);\nlog('\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD'.spell());\nlog('\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD'.stroke('array'));\n",
    deps: ['cnchar-all']
  },
  'vue': {
    code:
    /* html*/
    "<div id=\"app\">\n    <div>{{ message }}</div>\n    <button @click='add'>btn</button>\n</div>\n<script>\n    var app = new Vue({\n        el: '#app',\n        data () {\n            return {\n                message: 'Hello Vue!'\n            }\n        },\n        methods: {\n            add(){\n                this.message += '!';\n            }\n        }\n    })\n</script>",
    lang: 'html',
    deps: ['vue']
  },
  'vue3': {
    code:
    /* html*/
    "<div id=\"app\">{{ message }}</div>\n<script babel>\n    const { createApp } = Vue;\n    createApp({\n        data() {\n            return {\n                message: 'Hello Vue!'\n            }\n        }\n    }).mount('#app')\n</script>",
    lang: 'html',
    deps: ['vue@3']
  },
  'react': {
    code:
    /* html*/
    "<div id=\"example\"></div>\n<script babel react>\n    ReactDOM.render(\n        <h1>Hello, world!</h1>,\n        document.getElementById('example')\n    );\n</script>",
    lang: 'html',
    deps: ['react-dom']
  },
  'angularjs': {
    code: "<div ng-app=\"myApp\" ng-controller=\"myCtrl\">\n    \u540D\u5B57: <input ng-model=\"name\">\n    <h1>\u4F60\u8F93\u5165\u4E86: {{name}}</h1>\n</div>\n\n<script>\nvar app = angular.module('myApp', []);\napp.controller('myCtrl', function($scope) {\n    $scope.name = \"John Doe\";\n});\n</script>",
    lang: 'html',
    deps: ['angularjs']
  }
};
/**
log([
    '测试'.spell(), // 返回 'CeShi'
    '测试'.spell('up'), // 返回 'CESHI'
    '测试'.spell('low'), // 返回 'ceshi'
    '测试'.spell('first'), // 返回 'CS'
    '测试'.spell('first', 'low'), // 返回 'cs'
    '测试'.spell('array'), // 返回 ['Ce','Shi']
    '测试'.spell('array', 'first', 'low'), // 返回 ['c','s']
    '测试'.spell('tone'), // 返回 'CèShì'
    '长大了'.spell('poly'), // 返回 '(Zhang|Chang)(Da|Dai)(Le|Liao)'
    cnchar.spell('长大了', 'poly', 'tone')
]);
log(cnchar.spell('长大了', 'tone'));
log([
    '中华人民共和国'.stroke(),
    '中华人民共和国'.stroke('array'),
    cnchar.stroke('我爱中华人民共和国', 'array')
]);
log([
    '一个'.stroke('order'),
    '一个'.stroke('order', 'detail'),
    '一个'.stroke('order', 'shape'),
    cnchar.stroke('一个', 'order', 'name'),
    cnchar.stroke('一个', 'order', 'count'),
]);
log([
    cnchar.orderToWord(['横', '撇', '捺']),
    cnchar.orderToWord(['横', '撇', '捺'], 'array'),
    cnchar.orderToWord(['横', '撇', '捺'], 'start'),
    cnchar.orderToWord(['横', '撇', '捺'], 'start', 'simple')
]);
log([
    cnchar.spellToWord('shàng'),
    cnchar.spellToWord('shàng', 'alltone'),
    cnchar.spellToWord('shang4', 'alltone'),
    cnchar.spellToWord('shang4', 'alltone', 'trad'),
    cnchar.spellToWord('lv2', 'simple')
]);
log([
    cnchar.strokeToWord(25),
    cnchar.strokeToWord(25, 'simple'),
    cnchar.strokeToWord(2, 'array')
]);
log([
    cnchar.convert.simpleToTrad('一个人'),
    '一个人'.convertSimpleToSpark(),
    '壹個人'.convertTradToSimple()
]);
 */