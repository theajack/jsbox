import tool from '../lib/tool'
import {setOnCountSize} from './countSize'
import {symbol} from './input'
import {theme,view, viewRate} from './func'
import {checkRule,TYPE} from './insertRule'
import {editor} from './editor'
import {renderColor} from './color'
import {VAR} from './style'
import {cline} from './curLine'
import stack from './codeStack'
import {storageState, STATE} from '../storageState';
import {lines} from './lines';
import key from './keyMode';
export const paddingLeft = 30;
export const paddingTop = 5;
let enWidth = 7.697236;
let cnWidth = 14;
const cnRegG = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
const cnReg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/;
const retabReg = /^ {1,4}$/;
const retabBeginReg = /^ {1,4}/;
const tabNLReg = /^ {0,}/;
VAR.regist('lineHeight',(value)=>{
    cursor.el.style.height = value+'px'
    cline.setHeight(value+1);
})

export let cursor = {
    position:{
        x:0,
        y:0,
        line:0,
        index:0
    },
    el:null,
    timer:null,
    lines:[''],
    value:'',
    textArea:null,
    generate(textArea,value){
        initFlash();
        this.el = tool.create('div','editor-cursor');
        this.textArea = textArea;
        if(typeof value==='string'){
            this.onInsert(value);
        }
        setOnCountSize(res=>{
            enWidth = res.enWidth;
            cnWidth = res.cnWidth;
            VAR.set('lineHeight',res.lineHeight);
        })
        return this.el;
    },
    generateCline(){return cline.generate()},
    generateLines(){return lines.generate()},
    countPos,
    onInsert(str,nopush){
        str = str.replace(/	/g,symbol.tab);
        let res = null;
        if(!nopush){
            stack.push(cursor);
            res = checkRule(str);
            str = res.str;
        }
        // console.log(str);
        let line = this.position.line,index=this.position.index;
        let lineStr = this.lines[line];
        if(str === symbol.tab){
            tab.call(this,lineStr,line,index)
        }else if(str === symbol.retab){
            retab.call(this,lineStr,line,index)
        }else if(str === symbol.enter){
            enter.call(this,lineStr,line,index)
        }else if(str === symbol.delete){
            del.call(this,lineStr,line,index)
        }else{
            if(str.indexOf('\n')===-1){
                singleLine.call(this,str,lineStr,line,index)
            }else{
                mutilLine.call(this,str,lineStr,line,index)
            }
        }
        if(res)
            rePosition(res.type);
        // console.log(this.lines);
        render();
    },
    val(v){
        if(typeof v!=='undefined'){
            stack.push(cursor);
            this.lines=[''];
            setPos(0,0,0,0);
            cursor.onInsert(v,true);
            return;
        }
        return cursor.value;
    },
    onClear(){
        stack.push(cursor);
        this.lines=[''];
        setPos(0,0,0,0);
        render();
    },
    render(){
        cursor.textArea.innerHTML = renderColor(cursor.value);
        placeholder();
        cline.setWidth(cursor.textArea,paddingLeft);
        lines.render(this.lines.length);
    },
    show(){
        cursor.el.style.display = 'block';
    },
    hide(){
        cursor.el.style.display = 'none';
    },
    initPos(str){
        let arr = str.split('\n');
        let line = arr.length-1;
        let s = arr[line];
        let x = countStrWidth(s);
        setPos(x,line*VAR.lineHeight,s.length,line);
    },
    setPos,
    getTabs
}

export function render(){
    cursor.value = cursor.lines.join('\n');
    cursor.render();
    key.set(cursor.value);
    storageState(STATE.code,cursor.value);
}

function singleLine(str,lineStr,line,index){
    this.lines[line] = lineStr.substring(0,index)+str+lineStr.substring(index);
    setCursorPosX(this.position.x + countStrWidth(str));
    setIndex(index+str.length);
}
function mutilLine(str,lineStr,line,index){
    let array = str.split('\n');
    checkNextLine(lineStr,array);
    this.lines[line] = lineStr.substring(0,index)+array[0];
    array[array.length-1] = array[array.length-1]+lineStr.substring(index);
    this.lines.splice(line+1,0,...array.slice(1,array.length));
    setCursorPos(countStrWidth(array[array.length-1]),this.position.y+(array.length-1)*VAR.lineHeight);
    setStrPos(this.position.line+array.length-1,array[array.length-1].length);
}

function enter(lineStr,line,index){
    let array = ['','']
    checkNextLine(lineStr,array);
    let newLineStr = array[1]+lineStr.substring(index);
    this.lines[line] = lineStr.substring(0,index);
    this.lines.splice(line+1,0,newLineStr);
    setCursorPos(countStrWidth(array[1]),this.position.y+VAR.lineHeight);
    setIndex(array[1].length);
    setLine(line+1);
}
// 使换行可以维持tab
function checkNextLine(lineStr,array){
    if(array.length<=1){
        return;
    }
    let tabs = getTabs(lineStr);
    
    if(tabs.length>0){
        for(var i = 1;i<array.length;i++){
            array[i] = tabs + array[i]
        }
    }
}

function getTabs(s){
    let t = symbol.tab;
    let str = s||cursor.lines[cursor.position.line];
    let spaces = str.match(tabNLReg)[0];
    let tabs = Math.floor(spaces.length/t.length);
    str = '';
    for(var i=0;i<tabs;i++){
        str += t;
    }
    return str;
}

function del(lineStr,line,index){
    if(index===0){
        if(line!==0){
            setIndex(this.lines[line-1].length);
            setCursorPos(countStrWidth(this.lines[line-1]),this.position.y-VAR.lineHeight);
            this.lines[line-1] += lineStr;
            this.lines.splice(line,1);
            setLine(line-1);
        }
    }else{
        this.lines[line] = lineStr.substring(0,index-1)+lineStr.substring(index);
        setCursorPosX(this.position.x - countStrWidth(lineStr.substr(index-1,1)));
        setIndex(index-1);
    }
}

export function retab(lineStr,line,index,n){
    if(typeof n === 'number'){
        for(var i=0;i<n;i++){
            retab.call(this,this.lines[line+i],line+i,0)
        }
    }else{
        let l = symbol.tab.length;
        let s = lineStr.substring(index-l,index);
        if(retabReg.test(s)){
            lineStr = lineStr.substring(0,index-s.length)+lineStr.substring(index);
            this.lines[line] = lineStr;
            setCursorPosX(this.position.x - countStrWidth(s));
            setIndex(index-s.length);
        }else{
            let res = lineStr.match(retabBeginReg)
            if(res){
                lineStr = lineStr.substring(res[0].length);
                this.lines[line] = lineStr;
                setCursorPosX(this.position.x - countStrWidth(res[0]));
                setIndex(index-res[0].length);
            }
        }
    }
}

export function tab(lineStr,line,index,n){
    if(typeof n === 'number'){
        for(var i=0;i<n;i++){
            this.lines[line+i] = symbol.tab+this.lines[line+i];
        }
    }else{
        this.lines[line] = symbol.tab+lineStr;
        setCursorPosX(this.position.x + countStrWidth(symbol.tab));
        setIndex(index+symbol.tab.length);
    }
}
function placeholder(){
    let p = editor.el.placeholder;
    if(cursor.value === ''){
        if(p._hide){
            p._hide = false;
            p.style.display = 'inline';
        }
    }else{
        if(!p._hide){
            p._hide = true;
            p.style.display = 'none';
        }
    }
}
function initFlash(){
    cursor.timer = setInterval(()=>{
        cursor.el.style.borderColor = 'transparent';
        setTimeout(()=>{
            cursor.el.style.borderColor = theme==='light'?'#333':'#fff';
        },600)
    },1300)
}

function countStrWidth(str){
    let cnNum = (str.match(cnRegG)||[]).length;
    return cnNum * cnWidth + (str.length-cnNum)*enWidth
}

function countPos(x,y){
    if(view === 'small'){
        y -= (1-viewRate) * window.innerHeight;
    }
    y=y-paddingTop;
    x=x-paddingLeft;
    // console.log(`${x},${y}`)
    var line = Math.floor(y/VAR.lineHeight);
    if(line>=cursor.lines.length){
        line = cursor.lines.length-1;
    }
    if(line<=0){
        line = 0;
    }
    y=line*VAR.lineHeight;
    let str = cursor.lines[line];
    if(typeof str === 'string'){
        // console.log(cursor.lines,line);
        let maxWidth = countStrWidth(str);
        let index = 0;
        if(x>=maxWidth){
            x = maxWidth;
            index = str.length;
        }else if(x<0){
            x = 0;
            index = 0;
        }else{
            let res = fixPosX(x,str);
            x = res.x;
            index = res.index;
        }
        setPos(x,y,index,line);
    }
}
function setPos(x,y,index,line){
    if(typeof x === 'object'){
        y = x.y;index = x.index;line = x.line;x=x.x;
    }
    setCursorPos(x,y);
    setStrPos(line,index);
}
function setCursorPos(x,y){
    setCursorPosX(x);
    setCursorPosY(y);
}
function setCursorPosX(x){
    // debugger
    if(x !== null){
        x = (x<0)?0:x;
        cursor.position.x=x;
        cursor.el.style.left=(x+paddingLeft-1)+'px';
    }
}
function setCursorPosY(y){
    if(y !== null){
        y = (y<0)?0:y;
        cursor.position.y=y;
        let top =(y+paddingTop);
        cline.setTop(top);
        cursor.el.style.top=top+'px';
    }
}
function setStrPos(line,index){
    setLine(line);
    setIndex(index);
}
function setLine(line){
    if(line !== null){
        cursor.position.line=(line<0)?0:line;
    }
}
function setIndex(index){
    if(index !== null){
        cursor.position.index=(index<0)?0:index;
    }
}
function fixPosX(x,str){
    // console.log(x,str)
    let width = 0;
    for(var i = 0;i<str.length;i++){
        let w = cnReg.test(str[i])?cnWidth:enWidth;
        if(width+w/2 > x){
            return {
                x:width,
                index:i
            }
        }
        width=width+w;
    }
    return {
        x:width,
        index:str.length
    };
}

function rePosition(type){ // (x,y,index,line)
    if(!type){
        return;
    }
    if(type === TYPE.backstep){
        setCursorPosX(cursor.position.x-enWidth);
        setIndex(cursor.position.index-1);
    }else if(type === TYPE.brace || type === TYPE.function_brace){
        setLine(cursor.position.line-3);
        setCursorPosY(cursor.position.line*VAR.lineHeight);
        let index = cursor.lines[cursor.position.line].length-2;
        if(type === TYPE.function_brace){
            index--;
        }
        setIndex(index);
        setCursorPosX(
            countStrWidth(
                cursor.lines[cursor.position.line].substring(0,index)
            )
        );
    }
}