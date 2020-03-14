
/**
 * 运行js代码
 */
import tool from './lib/tool'
import Arrow from './ui/arrow'
import generateEditor from './editor'
import {theme,view,viewRate} from './editor/func'
import {storageState,STATE} from './storageState'
import panel from './panel';
export let tc={
    init(){
        addStyle();
        initMainPanel.call(this);
        initArrow();
        initHeight();
        initOnresize();
        initOnTouchmove();
        return this.el.main;
    },
    editor:null,
    el:{},
    initHeight:initHeight
}

export let funcs = {
    open(){
        tc.el.main.style.setProperty('transform', 'translateX(0%)');
        storageState(STATE.mainState,'open');
    },
    hide(){
        tc.el.main.style.setProperty('transform', 'translateX(100%)');
        storageState(STATE.mainState,'hide');
    },
}


// 初始化dom
function initMainPanel(){
    this.editor = generateEditor(this);
    let _main = tool.create('div','main '+theme);
        let _editor = this.editor.el.main;
    tool.append(_main,[_editor]);
    tool.append(document.body,[_main]);
    this.editor.countSize();
    this.el.main = _main;
    this.el.editor = _editor;
}
function initArrow(){
    tc.el.openArrow = new Arrow({
        direction:'left',
        parent:tc.el.main,
        click:()=>{
            funcs.open();
        }
    })
    tc.el.hideArrow = new Arrow({
        direction:'right',
        parent:tc.el.main,
        click:()=>{
            funcs.hide();
        }
    })
    
}
// 计算编辑器高度
export function initHeight(){
    let wh;
    if(view === 'small'){
        wh = window.innerHeight * viewRate
        tc.el.main.style.borderTop = '1px solid #649eff';
    }else{
        wh = window.innerHeight
        tc.el.main.style.borderTop = 'none';
    }
    panel.setHeight(wh);
    let bottomHeight = tc.editor.choose.el.main.offsetHeight;
    tc.editor.resize(wh-bottomHeight);
    tc.el.main.style.height = wh+'px';
}
function initOnTouchmove(){
    let bodyEl = window.document.body
    let top = 0
    function stopBodyScroll (isFixed) {
        if (isFixed) {
            top = window.scrollY
            bodyEl.style.position = 'fixed'
            bodyEl.style.top = -top + 'px'
        } else {
            bodyEl.style.position = ''
            bodyEl.style.top = ''
            window.scrollTo(0, top) // 回到原先的top
        }
    }
    tc.el.main.addEventListener('touchstart',()=>{
        stopBodyScroll(true);
    })
    tc.el.main.addEventListener('touchend',()=>{
        stopBodyScroll(false);
    })
}
// 添加window onresize 事件
function initOnresize(){
    window.addEventListener('resize',function(){
        setTimeout(()=>{
            initHeight();
        },10)
    })
}


function addStyle(){
    tool.addStyle(/*css*/`
    .tc-bodyfix{
        position:fixed;
    }
    .tc-main {
        position:fixed;
        bottom:0;
        left:0;
        z-index:1000000;
        width:100%;
        height:667px;
        background-color:rgba(255,255,255,.9);
        transition:transform .3s ease;
        /*transform:translateX(100%);*/
        transform:translateX(100%);
    }
    .tc-main,.tc-main * {
        box-sizing:border-box;
        font-family:Microsoft YAHEI;
        font-size:14px;
        text-align:left;
    }
    .tc-arrow-w {
        position:fixed;
        width:18px;
        height:36px;
        background-color: rgba(100,100,100,.4);
        top:-36px;
        left:0;
        border-radius:0 20px 20px 0;
        touch-action: none;
    }
    .tc-arrow-w-left {
        border-radius:20px 0 0 20px;
        left:-18px;
    }
    .tc-arrow-line {
        position:absolute;
        border:1px solid #fff;
        width:8px;
        transform:rotate(45deg);
        top: 14px;
        left: 4px;
    }
    .tc-arrow-line2 {
        transform:rotate(-45deg);
        top: 20px;
        left: 4px;
    }
    .tc-arrow-w-left .tc-arrow-line {
        top:19px;
        left:7px;
    }
    .tc-arrow-w-left .tc-arrow-line2 {
        top:14px;
    }
    .tc-panel {
        position:absolute;
        width:100%;
        height:100%;
        left:0;
        transition:all .3s ease;
        transform:translateX(100%);
        border-left:1px solid #eee;
        top:0;
        background-color:rgba(255,255,255,.9);
        box-shadow:-1px -1px 10px 1px #ddd;
        display:none;
        z-index: 2;
    }
    .tc-panel-tabs {
        height:40px;
        font-size:16px;
        overflow-x:auto;
        white-space:nowrap;
        background-color:#eee;
        position:relative;
        display:flex;
    }
    .tc-panel-tab {
        height:40px;
        flex:1;
        font-size:16px;
        padding:10px;
        border-right:1px solid #fff;
        border-bottom:1px solid #fff;
        text-align:center;
        cursor: pointer;
    }
    .tc-panel-tab.tc-active {
        background-color:#f7f7f7;
    }
    .tc-panel-pages-w {
        overflow:hidden;
        width:375px;
        height:627px;
        position:absolute;
    }
    .tc-panel-pages {
        position:absolute;
        top:0;
        white-space:nowrap;
        transition:transform .3s ease;
        transform:translate(0px);
        display:flex;
    }
    .tc-panel-page {
        width:375px;
        height:627px;
        overflow-y:auto;
        overflow-x:hidden;
        white-space:normal;
        word-break:break-all;
        vertical-align:text-top;
        flex:1;
        position:relative;
    }`,'tconMain');
}
export default tc;