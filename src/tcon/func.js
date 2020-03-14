const c = window.console;
export default function f(err,that){
    // 搭配前端调试工具一起使用 如 vconsole erude
    c.error(err.stack);
    if(typeof that!=="undefined"){
        c.error({context:that});
    }
}
f.trace = function(err,that){
    f(err,that);
    if(typeof c.trace === 'function'){
        c.trace();
    }
}
f.trace.thr = function(err,that){
    f.trace(err,that);
    throw new Error(err);
}

f.thr = function(err,that){
    f(err,that);
    throw new Error(err);
}