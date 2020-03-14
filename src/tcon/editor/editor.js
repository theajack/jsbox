import tool from '../lib/tool'
import {cursor} from './cursor'
import {setEl} from './countSize'
import {textFont,textStyle,VAR} from './style'
// import {testStr} from './color'
export let editor = {
    el:{},
    position:0,
    resize(height){
        editor.el.main.style.height = (height)+'px';
        editor.el.textArea.style.height = (height)+'px';
        if(editor.el.textKeyMode)
            editor.el.textKeyMode.style.height = (height)+'px';
    },
    value(v){
        return cursor.val(v);
    },
    insert(str){
        // 插入选中的word
        // let _editor = this.el.text;
        // this.value(_editor.innerText+str);
        cursor.onInsert(str);
    }
}


// let testStr = `
// function pipe(text,array){
//     for(var i=0;i<array.length;i++){
//         text = +replace(text,...array[i])
//         console.log(text);
//     }
//     :
//     11+12-12/2=1
//     /aa/g11
//     /aa/.test(11)
//     //aaa<
//     var data = new Date('a')
//     return text;
// }`

export function generateEditorInput(){
    let main = tool.create('div','editor','',function(e){
        cursor.countPos(e.clientX+editor.el.textArea.scrollLeft,e.clientY+editor.el.textArea.scrollTop)
    });
        let placeholder = tool.create('span','editor-placeholder','Type some javascript:');
        editor.el.placeholder = placeholder;
        let textArea = tool.create('div','editor-textarea');
            let text = tool.create('div','editor-text');
            setEl(text);
            let _cursor = cursor.generate(text);
            let curLine = cursor.generateCline();
            let lines = cursor.generateLines();
            // setTimeout(()=>{
            //     cursor.onInsert('1.11;\tvar');
            // },100)
        tool.append(textArea,[text,_cursor,lines,curLine]);
    tool.append(main,[placeholder,textArea]);
    // let _main = tool.attr(tool.create('textarea','editor'),'placeholder','Type some javascript:');
    editor.el.main = main;
    editor.el.text = text;
    editor.el.textArea = textArea;
    return main;
}


export let editorStyle = /*css*/`
    .tc-editor {
        resize:none;
        position:relative;
        background-color: rgba(240,240,240,.8);
        transition:background-color .3s ease;
    }
    .tc-editor-placeholder{
        ${textFont}
        color: #aaa;
        display:inline;
        position: relative;
    }
    .tc-editor:active,.tc-editor:focus {
        border:none;
    }
    .tc-editor-cursor{
        position: absolute;
        top:6px;
        left:29px;
        border-left: 2px solid #000;
        height: ${VAR.lineHeight}px;
        transition: border-color .3s ease;
    }
    .tc-editor,.tc-editor-textarea{
        color:#000;
        padding:5px;
        height:667px;
        border:none;
        width: 100%;
        ${textFont}
        overflow:auto;
        padding-bottom: 35px;
        padding-left: 30px;
    }
    .tc-editor-textarea{
        position: absolute;
        top: 0;
        left: 0;
        white-space: pre;
        cursor:text;
        background-color: transparent;
        line-height:${VAR.lineHeight}px;
    }
    .tc-editor-keymode{
        color: transparent!important;
        outline:none;
        resize:none;
    }
    .tc-editor-text{
        ${textStyle}
    }
    .tc-editor-cline{
        top: 5px;
        position: absolute;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        min-width: 100%;
        height: 18px;
        left: 0;
        background-color: rgba(200,200,200,.1);
    }
    .tc-ed-lines{
        position: absolute;
        top: 0;
        left: 0;
        width: 22px;
        padding-top:6px;
        transition: background-color .3s ease;
        padding-bottom:35px;
    }
    .tc-ed-lines div{
        height:${VAR.lineHeight}px;
        line-height:${VAR.lineHeight}px;
        background-color:#fafafa;
        font-size:11px;
        text-align:right;
        padding-right:2px;
        ${textFont}
    }
`