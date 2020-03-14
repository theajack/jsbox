import {cursor} from './cursor'
import keyMode from './keyMode';
let stack = [];
let redoStack = [];

let stackMaxSize = 30;

export default {
    redo,
    undo,
    push(){
        push(cursor.value,pick(cursor.position,['x','y','index','line']))
    },
    setUndoMax(v){stackMaxSize = v}
}

function undo(){
    if(stack.length===0){
        return;
    }
    let res = stack.pop();
    redoStack.push({
        code:cursor.value,
        pos:pick(cursor.position,['x','y','index','line'])
    });
    // console.log('stack',stack)
    // console.log('redoStack',redoStack)
    render(res);
}
function redo(){
    if(redoStack.length===0){
        return;
    }
    let res = redoStack.pop();
    stack.push({
        code:cursor.value,
        pos:pick(cursor.position,['x','y','index','line'])
    });
    // console.log('stack',stack)
    // console.log('redoStack',redoStack)
    render(res);
}
function render(res){
    cursor.setPos(res.pos)
    cursor.value = res.code;
    keyMode.set(res.code);
    cursor.lines = cursor.value.split('\n')
    cursor.render();
}
function push(code,pos){
    stack.push({code,pos});
    if(stack.length>stackMaxSize){
        stack.shift();
    }
    // console.log('stack',stack)
}
function pick(obj,keys){
    let res={};
    keys.forEach(k => {
        res[k] = obj[k];
    });
    return res;
}