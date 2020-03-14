import main from './main'
import f from './func'
import panel from './panel'
import tool from './lib/tool'
import {editor} from './editor/editor'
import stack from './editor/codeStack'
import {initStorage,storageEnable} from './storageState'
import version from './version.js'
// import {choose} from './editor/input'
let TCon = {
    version:version,
    use:panel.use.bind(panel),
    f:f,
    tool:tool,
    plugins:{},
    text:{
        insert:editor.insert,
        value:editor.value
        // tab:choose.setTab
    },
    undoMax(value){
        if(typeof value === 'number' && value > 0){
            stack.setUndoMax(value)
        }
    },
    init
}
if(typeof window === "object"){window.TCon = TCon;}

function init(config = {}){
    let byUrlParam = config.byUrlParam;
    delete config.byUrlParam;
    var _init = function(){
        let container = main.init();
        panel.init(container);
        initStorage(config);
    }

    if(byUrlParam===true||byUrlParam===1){
        let s = window.location.search
        if(/(^\?|\&)tcon=/.test(s)){ // 有 tcon 参数
            if(/(^\?|\&)tcon=(1|true)(\&|$)/.test(window.location.search)){
                storageEnable('true');
                _init();
            }else{
                storageEnable('false');
            }
        }else{
            if(storageEnable() === 'true'){
                _init();
            }
        }
    }else{
        _init();
    }
}


// TCon.init();
export default TCon;