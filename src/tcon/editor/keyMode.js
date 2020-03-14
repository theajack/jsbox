import {editor} from "./editor";
import tool from "../lib/tool";
import {cursor, retab, tab, render} from "./cursor";
import {initHeight} from "../main";
import codeStack from "./codeStack";
import {funcs} from "./func";
import {symbol} from "./input";

let key = {
    el:null,
    enable:false,
    use:useKeyMode,
    set:setKeyModeValue,
    forbid:forbidKeyMode
}
function useKeyMode(){
    key.enable = true;
    // if(importScripts())
    cursor.hide();
    console[console.tc?'tc':'log']('键盘模式已启用')
    if(key.el){
        key.el.style.display = 'block';
    }else{
        key.el = tool.create('textarea','editor-textarea editor-keymode');
        tool.append(editor.el.main,key.el);
        editor.el.textKeyMode = key.el;
        tool.attr(key.el,'spellcheck',"false");
        key.el.value = cursor.value;
        initHeight();
        key.el.oninput=function(e){
            cursor.val(this.value)
            cursor.initPos(this.value.substring(0,this.selectionEnd));
        }
        key.el.onfocus=function(e){
            cursor.show();
        }
        key.el.onblur=function(e){
            cursor.hide();
        }
        key.el.onscroll=function(e){
            if(!key.enable){return};
            editor.el.textArea.scrollTop = this.scrollTop
            editor.el.textArea.scrollLeft = this.scrollLeft
        }
        let keytimer = null,keyInterval;
        let cursorChange = [37,38,39,40,33,34,35];
        let arrows = [37,38,39,40,33,34];
        key.el.onkeydown=function(e){
            if(!key.enable){return};
            let start = this.selectionStart,end = this.selectionEnd;
            if(e.keyCode === 9){
                e.preventDefault();
            }else if(arrows.indexOf(e.keyCode) !== -1){
                keytimer=setTimeout(()=>{
                    keyInterval=setInterval(()=>{
                        cursor.initPos(this.value.substring(0,end));
                    },10)
                },500)
            }else if(e.keyCode === 13){
                if(e.shiftKey){
                    funcs.execute();
                }else{
                    if(start>end){
                        let temp = start;
                        start = end;
                        end = temp;
                    }
                    let str = '\n'+cursor.getTabs();
                    this.value = this.value.substring(0,start)+ str +this.value.substring(end);
                    this.selectionStart = start + str.length;
                    this.selectionEnd = start + str.length;
                    cursor.val(this.value)
                    cursor.initPos(this.value.substring(0,this.selectionEnd));
                }
                e.preventDefault();
            }
        }
        key.el.onkeyup=function(e){
            if(!key.enable){return};
            if(e.keyCode === 9){ // tab键
                e.preventDefault();
                let start = this.selectionStart,end = this.selectionEnd;
                if(start>end){
                    let temp = start;
                    start = end;
                    end = temp;
                }
                let line = this.value.substring(0,start).split('\n').length-1;
                let lines = this.value.substring(start,end).split('\n').length;
                if(e.shiftKey){
                    retab.call(cursor,'',line,0,lines);
                }else{
                    tab.call(cursor,'',line,0,lines);
                }
                codeStack.push(cursor);
                render()
                let newStart,newEnd,tabLength = symbol.tab.length;
                if(lines>1){
                    newEnd = cursor.lines.slice(0,line+lines).join('\n').length;
                    newStart = cursor.lines.slice(0,line).join('\n').length+((line===0)?0:1);
                }else{
                    if(e.shiftKey){
                        if(cursor.position.index<=tabLength){
                            newStart = start - cursor.position.index;
                            newEnd = end - cursor.position.index;
                        }else{
                            newStart = start - tabLength;
                            newEnd = end - tabLength;
                        }
                    }else{
                        newStart = start + tabLength;
                        newEnd = end + tabLength;
                    }
                }
                this.selectionStart = newStart;
                this.selectionEnd = newEnd;
                cursor.initPos(this.value.substring(0,this.selectionEnd));
            }else if(cursorChange.indexOf(e.keyCode) !== -1){
                cursor.initPos(this.value.substring(0,this.selectionEnd));
                if(e.keyCode !== 35){
                    clearTimeout(keytimer);
                    clearInterval(keyInterval);
                }
            }
        }
    }
    key.el.focus();
    cursor.initPos(key.el.value.substring(0,key.el.value.length));
}
function forbidKeyMode(){
    key.enable = false;
    if(!key.el)return;
    cursor.show();
    key.el.style.display = 'none';
}

function setKeyModeValue(v){
    if(key.enable){
        key.el.value = v;
    }
}
export default key;