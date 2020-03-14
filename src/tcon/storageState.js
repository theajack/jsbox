import {funcs} from './main'
import {openState} from './panel'
import {funcs as fc} from './editor/func'
import {setActiveTabs} from './editor/input'
import {cursor} from './editor/cursor';
let state = {
    view:'full',
    panelState:'hide',
    mainState:'hide',
    theme:'light',
    activeTabs:[],
    code:'',
    keyMode:'false',
}
export let STATE = {
    view:'view',panelState:'panelState',mainState:'mainState',theme:'theme',activeTabs:'activeTabs',code:'code',keyMode:'keyMode'
}
export function storageEnable(v){
    return storage('__tcon_enable',v);
}

export function initStorage(initalState){
    let s = storage("__tcon_state");
    let hasState = false;
    if(s){
        state = JSON.parse(s);
        hasState = true;
    }
    if(typeof initalState === 'object'){
        for(let key in initalState){
            if(typeof state [key] !== 'undefined'){
                state[key] = initalState[key];
            }
        }
        saveState();
    }
    if(hasState){
        openState.state = state.panelState;
        openState.render();
        if(state.mainState === 'open'){
            funcs.open();
        }
        if(state.theme === 'dark'){
            fc.theme(document.querySelector('.tc-func-theme'))
        }
        if(state.view === 'small'){
            fc.small(document.querySelector('.tc-func-small'))
        }
        if(state.activeTabs.length>0){
            setActiveTabs(state.activeTabs);
        }
        if(state.code!==''){
            cursor.onInsert(state.code);
        }
        if(state.keyMode === 'true' || state.keyMode === true){
            fc.key(document.querySelector('.tc-func-key'))
        }
    }
}

export function storageState(k,v){
    if(k in STATE){
        state[k] = v;
        saveState()
    }
}

function saveState(){
    storage("__tcon_state",JSON.stringify(state));
}
// export function 

function storage(k,v){
    if(typeof v === 'undefined'){
        return window.localStorage.getItem(k);
    }else{
        window.localStorage.setItem(k,v);
    }
}