let strCn = '';
let strEn = '';
let strLine = '';
const length = 100;
let textEl = null;
let onCountSize = null
export function countSize(el){
    for(var i=0;i<length;i++){strCn += '一';strEn+='a';strLine+='1\n'}
    strLine.trim();
    el = el || textEl
    // let text = el.innerText;
    let html = el.innerHTML;
    let res={};
    el.innerHTML = strCn;
    res.cnWidth = el.offsetWidth/length;
    el.innerHTML = strEn;
    res.enWidth = el.offsetWidth/length;
    el.innerHTML = strLine;
    res.lineHeight = el.offsetHeight/length;
    el.innerHTML = html;
    if(typeof onCountSize === 'function'){
        onCountSize(res);
    }
    return res;
}
export function setEl(el){
    textEl = el;
}
export function setOnCountSize(func){
    onCountSize = func;
}