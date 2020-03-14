import tool from "../lib/tool";
import {VAR} from "./style";

VAR.regist('lineHeight',(value)=>{
    let style = window.document.getElementById('tconEditor');
    if(style!==null){
        if(value<17)value=17;
        style.innerHTML = style.innerHTML + `.tc-ed-lines div{height:${value}px;line-height:${value}px;}.tc-editor-textarea{line-height:${value}px;}`;
    }
})

export let lines = {
    el:null,
    generate(){
        this.el = tool.create('div','ed-lines')
        tool.append(this.el,tool.create('div','','1'))
        return this. el;
    },
    render(line){
        let child = this.el.children;
        if(line ===0 ){line=1}
        if(child.length < line){
            for(var i = child.length;i<line;i++){
                tool.append(this.el,tool.create('div','',(i+1)));
            }
        }else if(child.length > line){
            for(var i = child.length-1;i>=line;i--){
                this.el.removeChild(child[i])
            }
        }
    }
}