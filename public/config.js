/*
 * @Author: tackchen
 * @Date: 2022-07-08 08:57:44
 * @Description: config dev debug
 */

window.jsboxConfig = {
    libs: {
    // 'cnchar': 'https://cdn.jsdelivr.net/gh/theajack/cnchar/dist/cnchar.latest.min.js',
    // 'jQuery': 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
    // 'easy-icon': {
    //     type: 'style',
    //     versio: '1.0.1',
    //     url: 'https://cdn.jsdelivr.net/gh/theajack/easy-icon/dist/easy-icon.min.css'
    // },
        'jsbox.cnchar': '',
        'cnchar-order': 'jsbox.cnchar-order',
        'tc-store': 'https://cdn.jsdelivr.net/npm/tc-store',
    },
    iifeMap: {
        'cnchar': 'cnchar',
        'tc-store': 'TCStore',
    },
    // theme: 'light',
    codes: {
    //
        'testIifeMap': {
            title: 'Base',
            hideLog: true,
            code: 'import {version} from "cnchar";\nconsole.log(version);',
            dep: ['jsbox.cnchar'],
            doc: '# 11\n ## 22 \n- aa\n- bb\n ```\nvar a = 1; \n```'
        },
        'helloWorld': {
            code: 'console.log("Hello world")',
            needUI: true,
            hideLog: true,
            doc: '# 11\n ## 22 \n- aa\n- bb\n ```html\n<div>11</div> \n```'
        },
        //
        'helloWorld2': {
            code: 'console.log("Hello world")',
            needUI: false,
        },
        'helloWorldHtml1111111111111111': {
            lang: 'html',
            code: '<h1>Hello world</h1>',
            hideLog: true,
        },
        // 默认使用上面定义的所有依赖
        'testCnchar': {
            title: 'Second',
            desc: '测试',
            code: 'cnchar.spell("你好")',
            dep: ['cnchar-order'] // 定义依赖，优先从当前文件中查找，如果没有会尝试在jsbox预定义库中查找
        },

        'test': {
            lang: 'html',
            code: '<div>111</div><script>cnchar.spell("你好")</script>',
            dep: ['cnchar-order'] // 定义依赖，优先从当前文件中查找，如果没有会尝试在jsbox预定义库中查找
        },
        testStore: {
            code: `import { createStore, bind, watchImme} from 'tc-store';
const store = createStore({
    content: 'test',
});

const div = document.createElement('div');
watchImme(store.content, (v) => {
    div.innerText = v;
});

const input = document.createElement('input'); // this is A Input Element(input, textarea, select, etc.)
bind(input, store.content); // This results in a two-way binding

const button = document.createElement('button');
button.innerText = 'Add ! to content'
button.onclick = () => {
  store.content += '!';
}

$app.append(div);
$app.append(input);
$app.append(button);
`,
            needUI: true,
            hideLog: true,
            dep: ['tc-store'],
        },
        testStore2: {
            lang: 'html',
            needUI: true,
            hideLog: true,
            dep: ['tc-store'],
            code: `<div>
  <div id='content'></div>
  <input class='jx-input' id='input'/>
  <button class='jx-button' id='button'>Add ! to content</button>
</div>
<script>
import { createStore, bind, watchImme} from 'tc-store';
const store = createStore({
    content: 'test',
});
watchImme(store.content, (v) => {
  $('#content').innerText = v;
});
$('#button').onclick = () => {
  store.content += '!';
}
bind($('#input'), store.content);
</script>
`,
        },
    }
};

// https://cdn.jsdelivr.net/npm/virtual-dom@2.1.1/dist/virtual-dom.js