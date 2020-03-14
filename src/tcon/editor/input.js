// 输入字符
import tool from '../lib/tool'
import {generateFunc} from './func'
import {editor} from './editor'
import {onlong} from '../lib/touchevent'
import {toggleKeyboard,generateKeyboard} from './keyboard'
import {pbtn} from './pressBtn'
import {storageState, STATE} from '../storageState';
let activeTabsBackUp=[];
export let choose = {
    activeTabs:[],
    setTab(str){
        symbol.tab=str;
    },
    el:{},
    editor:null
}

const words = {
    '键盘':'',
    '符号':'" \' ` , ; : . ( ) { } [ ] + - * / _ | \\ & % $ ! < = > ... ^ ~ @ # tab retab space enter delete',
    '关键字':'function return var let const new delete typeof this for in while if else switch case default break continue async await yield try catch finally throw',
    '系统':'window document localStorage sessionStorage setTimeout setInterval alert console ArrayBuffer Uint8Array',
    '值':'true false undefined null Object Array Number String Boolean Function Error Date Math Symbol',
    '输入':''
}
const wordKeys = ['值','系统','关键字','符号','键盘','输入'];
const cnIndex = wordKeys.indexOf('输入');

export let symbol = {
    tab:'    ',
    retab:'--tab',
    space:' ',
    enter:'\r',
    'delete':'',
    'del':''
}

function isBtn(el){
    return tool.attr(el,'type') === 'button'
}

function addWordTouchEvent(panel){
    // if(typeof panel.ontouchstart==='undefined'){
    //     panel.addEventListener('click',function(e){
    //     })
    //     return;
    // }
    // onclick(panel,(e)=>{
    //     if(e.target.tagName === 'BUTTON')
    //         onTouchWord(e.target);
    // })
    onlong({
        el:panel,
        onemit(e){
            if(isBtn(e.target)){ // 只有 word 是BUTTON元素
                onTouchWord(e.target);
            }
        },
        onstart(e){
            if(isBtn(e.target)){ // 只有 word 是BUTTON元素
                e.target.className='tc-touch-active';
                pbtn.onPress(e.target);
            }
        },
        onend(e){
            if(isBtn(e.target)){ // 只有 word 是BUTTON元素
                e.target.className='';
                onTouchWord(e.target);
                pbtn.onRelease(e.target);
            }
        },
        delay:1000,
        time:100,
    })
    // panel.addEventListener('touchstart',function(e){
    // })
    // panel.addEventListener('touchend',function(e){
    // })
}
function generatePages(){
    let pages=[];
    let tabs=[];
    wordKeys.forEach((key,index)=>{
        let _page = tool.create('div','choose-page');
        if(index === cnIndex){
            _page.style.padding = '0px';
        }
        let _tab = tool.create('div','tab-item'+((index === cnIndex)?' tab-cn':''),key,function(){
            // 切换tab事件
            let current = parseInt(tool.attr(this,'data-index'));
            if(current === cnIndex && !tool.hasClass(this,'tc-active')){
                activeCn(this);
                choose.el.cnText.focus();
            }else{
                if(current === cnIndex){
                    if(choose.el.cnText.value!==''){
                        editor.insert(choose.el.cnText.value);
                        choose.el.cnText.value = '';
                    }
                }
                if(choose.activeTabs[0] === cnIndex && choose.activeTabs.length===1){ // 如果当前是中文输入状态
                    resetActiveTabs();
                    if(choose.activeTabs.indexOf(current)===-1 && current !== cnIndex){
                        setActiveTab(current);
                    }
                }else{
                    setActiveTab(current);
                }
            }

        });
        tool.attr(_tab,'data-index',index)
        if(choose.activeTabs.indexOf(index)!==-1){
            _page.className+=' tc-active';
            _tab.className+=' tc-active';
        }
        tabs.push(_tab);
        let child;
        if(index === 4){ // 键盘
            child=generateKeyboard();
            choose.el.keyboard = _page;
        }else if(index === cnIndex){ // 中文
            child=generateCnInput();
        }else{
            child=words[key].split(' ').map((word)=>{
                return tool.attr(tool.create('input','',word),'type','button');
            })
        }
        tool.append(_page,child)
        pages.push(_page);
    })
    // tabs.push(tool.create('div','tab-item','all',function(){
    //     // show all
    //     setActiveTab(wordKeys.all);
    // }))
    return {pages,tabs};
}

function generateCnInput(){
    let cnText = tool.create('textarea','cn-textarea')
    choose.el.cnText = cnText;
    // let t1 = tool.create('button','','button')
    // let t2 = tool.create('input','','aa')
    // tool.attr(t2,'type','button');
    // t2.value = 'button'
    return [cnText];
}

function storageTabs(){
    storageState(STATE.activeTabs,choose.activeTabs);
}

// 点击tab
function setActiveTab(index){
    let pc=choose.el.page.children,tc=choose.el.tab.children
    if(choose.activeTabs.indexOf(index)===-1){
        choose.activeTabs.push(index);
        storageTabs();
        tool.active(tc[index],pc[index])
    }else{
        choose.activeTabs.splice(choose.activeTabs.indexOf(index),1);
        storageTabs();
        tool.inactive(tc[index],pc[index])
    }
    choose.editor.parent.initHeight();
}

function activeCn(el){
    el.innerText = '插入'
    activeTabsBackUp = choose.activeTabs;
    setActiveTabs([cnIndex])
}

function resetActiveTabs(){
    choose.el.tab.children[cnIndex].innerText = wordKeys[cnIndex];
    setActiveTabs(activeTabsBackUp);
    activeTabsBackUp=[];
}

export function setActiveTabs(tabs){
    choose.activeTabs = tabs;
    storageTabs();
    let pc=choose.el.page.children,tc=choose.el.tab.children
    for(var i=0;i<tc.length;i++){
        let index = parseInt(tool.attr(tc[i],'data-index'));
        if(tabs.indexOf(index)!==-1){
            tool.active(tc[index],pc[index])
        }else{
            tool.inactive(tc[index],pc[index])
        }
    }
    choose.editor.parent.initHeight();
}

function onTouchWord(el){
    let word = el.value;
    if(word === 'shift'){
        toggleKeyboard(choose.el.keyboard);
        return;
    }
    if(symbol.hasOwnProperty(word)){
        word = symbol[word];
    }
    editor.insert(word);
    // editor.focus()
}


export function generateChoose(ed){
    choose.editor = ed;
    let _choose_panel = tool.create('div','choose-panel');
        let res = generatePages();
        let _choose_panel_pw = tool.create('div','choose-page-w');
        addWordTouchEvent(_choose_panel_pw);
        let _choose_tab = tool.create('div','choose-tab');
        tool.append(_choose_panel_pw,res.pages);
        tool.append(_choose_tab,res.tabs);
        let _funcs = tool.create('div','func-panel');
        tool.append(_funcs,generateFunc());

    tool.append(_choose_panel,[_choose_panel_pw,_choose_tab,_funcs,pbtn.generate()]);
    choose.el.main = _choose_panel;
    choose.el.page = _choose_panel_pw;
    choose.el.tab = _choose_tab;
    return _choose_panel;
}