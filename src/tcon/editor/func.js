// 功能按钮
import tool from '../lib/tool'
import {editor} from './editor'
import {tc} from '../main'
import {VAR} from './style'
import stack from './codeStack'
import {initHeight} from '../main'
import {resetTop} from '../ui/arrow'
import {storageState,STATE} from '../storageState'
import Key from './keyMode';
const funcKeys = ['execute','theme','key','small','clear','undo','redo'];
export let theme = 'light'
export let view = 'full'
export let viewRate = 0.7
export let keyMode = 'false'
export let funcs = {
    theme(el){
        let newTheme = theme==='dark'?'light':'dark';
        tool.replaceClass([tc.el.main,tc.editor.el.main,el],'tc-'+theme,'tc-'+newTheme);
        theme=newTheme;
        storageState(STATE.theme,theme);
    },
    clear(){
        editor.value('')
    },
    execute(){
        let value = editor.value()
        if(value===''){
            console.tc('执行代码不可为空')
            return;
        }
        let code = value;
        try{
            let res = (new Function(code))()
            if(typeof res!=='undefined'){
                console[console.tc?'tc':'log'](res)
            }
        }catch(e){
            console.error('输入的js语法有错误:',value)
            console.error(e.stack)
        }
    },
    undo(){
        stack.undo();
    },
    redo(){
        stack.redo();
    },
    small(el){
        if(view === 'full'){
            tool.active(el)
            view = 'small'
            initHeight(window.innerHeight * viewRate);
        }else{
            tool.inactive(el)
            view = 'full'
            initHeight()
        }
        storageState(STATE.view,view);
        resetTop();
    },
    key(el){
        if(keyMode === 'false'){
            tool.active(el)
            keyMode = 'true'
            Key.use();
        }else{
            tool.inactive(el)
            keyMode = 'false'
            Key.forbid();
        }
        storageState(STATE.keyMode,keyMode);
    }
}

// 生成 func 列表
export function generateFunc(){
    return funcKeys.map((key)=>{
        let _func = tool.create('div','func func-'+key,'',function(){
            // func 点击事件
            funcs[key](this);
        });
        if(key!=='theme'){
            tool.append(_func,[
                tool.create('span','func-line func-line1'),
                tool.create('span','func-line func-line2'),
                tool.create('span','func-line func-line3')
            ])
        }else{
            tool.addClass(_func,'tc-'+theme)
        }
        return _func;
    })
}

export let themeStyle = /*css*/`
.tc-dark .tc-editor{
    background-color: rgba(20,20,20,.9);
}
.tc-dark .tc-editor-textarea{
    color:#9cdcfe;
}
.tc-dark .tc-editor-cursor{
    border-color:#fff;
}
.tc-dark .tc-func{
    background-color:#666;
}
.tc-dark .tc-func-line{
    border-color:#fff;
    background-color:#fff;
}
.tc-dark .tc-func-execute {
    background-color: ${VAR.colorBlue};
}
.tc-dark .tc-func-theme{
    background-color: #eee;
}
.tc-dark .tc-arrow-w{
    background-color: rgba(150,150,150,.7);;
}
.tc-dark .tc-choose-panel{
    color: #fff;
    background-color: #444;
}
.tc-dark .tc-tab-item.tc-active {
    background-color: #888;
}
.tc-dark .tc-tab-item.tc-tab-cn.tc-active{
    background-color:${VAR.colorBlue};
}
.tc-dark .tc-cn-textarea{
    background-color: #555;
    color: #fff;
}
.tc-dark .tc-touch-active{
    background-color: #888!important;
}
.tc-dark .tc-panel{
    box-shadow:-1px -1px 10px 1px #666;
}
.tc-dark .tc-ed-shift{
    background-color: #fff!important;
    color: #000!important;
}
`;