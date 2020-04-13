window.jsbox_envs = {
    'element-ui': {
        lang: 'html',
        code:
        /* html*/`<div id='app'>
<el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
    <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
    </el-form-item>
</el-form>
</div>
<script>
var app = new Vue({
    el: '#app',
    data() {
        return {
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!', this.form);
        }
    }
})
</script>`,
        deps: ['element-ui']
    },

    'cnchar': {
        code:
        /* javascript*/`
log('中华人民共和国'.spell());
log('中华人民共和国'.stroke('array'));
`,
        deps: ['cnchar-all']
    },
    'vue': {
        code: /* html*/`
<div id="app">
  {{ message }}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })
</script>
        `,
        lang: 'html',
        deps: ['vue']
    },
    'react': {
        code: /* html*/`<div id="example"></div>
<script babel react>
    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
    );
</script>`,
        lang: 'html',
        deps: ['react-dom']
    },
    'angularjs': {
        code: `<div ng-app="myApp" ng-controller="myCtrl">
    名字: <input ng-model="name">
    <h1>你输入了: {{name}}</h1>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});
</script>`,
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